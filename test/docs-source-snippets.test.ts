import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import prettier from "prettier";

import { extractExportSources } from "../plugins/vite-source-export";

/**
 * Per-page snippet golden (W4-4 / `design-docs-about.md` P0-1).
 *
 * Every `?source` import on every docs page must resolve to a COMPLETE,
 * syntactically-valid TypeScript declaration. The prior extractor truncated
 * 15/18 destructured-param conversions to one invalid line and the plugin's
 * silent `catch` shipped the fragment; this golden fails the moment any page's
 * snippet truncates, independent of the build-failing prettier guard in the
 * plugin itself.
 *
 * vitest does not register the `sourceExportPlugin` Vite plugin, so it cannot
 * resolve `?source` imports — the golden drives the pure `extractExportSources`
 * against the same source files the plugin reads at build time.
 */

const repoRoot = path.resolve(import.meta.dirname, "..");
const docsDir = path.resolve(repoRoot, "assets/docs");

const SOURCE_IMPORT_RE =
    /import\s*(?:type\s+)?\{([^}]*)\}\s*from\s*["']([^"']*\?source)["']/g;

interface SourceImport {
    /** module specifier with `?source` stripped, resolved to an absolute path */
    filePath: string;
    /** the named exports the page pulls from it */
    names: string[];
}

function resolveSpecifier(spec: string): string {
    // `@src/units/color/conversions/oklab?source` -> <repo>/src/.../oklab.ts
    const base = spec.slice(0, -"?source".length);
    const rel = base.startsWith("@src/") ? base.replace(/^@src\//, "src/") : base;
    return path.resolve(repoRoot, `${rel}.ts`);
}

function parseSourceImports(md: string): SourceImport[] {
    const imports: SourceImport[] = [];
    for (const m of md.matchAll(SOURCE_IMPORT_RE)) {
        const names = m[1]
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            // handle `foo as bar` -> the ORIGINAL export name is what the
            // extractor emits; the alias is irrelevant to completeness.
            .map((s) => s.split(/\s+as\s+/)[0].trim());
        imports.push({ filePath: resolveSpecifier(m[2]), names });
    }
    return imports;
}

const docPages = readdirSync(docsDir).filter((f) => f.endsWith(".md"));

describe("docs source-export snippets are complete", () => {
    it("covers all 11 color-space docs pages", () => {
        expect(docPages.length).toBe(11);
    });

    for (const page of docPages) {
        const md = readFileSync(path.resolve(docsDir, page), "utf-8");
        const imports = parseSourceImports(md);

        describe(page, () => {
            if (imports.length === 0) {
                it("imports no ?source snippets", () => {
                    expect(imports.length).toBe(0);
                });
                return;
            }

            for (const { filePath, names } of imports) {
                const raw = readFileSync(filePath, "utf-8");
                const extracted = new Map(
                    extractExportSources(raw, filePath).map((e) => [
                        e.name,
                        e.source,
                    ]),
                );

                for (const name of names) {
                    it(`\`${name}\` ships a complete declaration`, async () => {
                        const source = extracted.get(name);
                        // The export was found by the extractor at all.
                        expect(source, `export \`${name}\` not extracted`).toBeTypeOf(
                            "string",
                        );

                        // It is a COMPLETE, syntactically-valid declaration:
                        // Prettier (the same tool the build uses) parses it
                        // without throwing. A truncated fragment
                        // (`function oklch2oklab({ l, c, h }`) throws here.
                        await expect(
                            prettier.format(source as string, {
                                parser: "typescript",
                            }),
                        ).resolves.toBeTypeOf("string");

                        // A declaration, not a bare fragment: it closes its own
                        // body/initializer (balanced braces or a `;`).
                        const s = (source as string).trimEnd();
                        expect(/[}\];]$/.test(s)).toBe(true);
                    });
                }
            }
        });
    }
});
