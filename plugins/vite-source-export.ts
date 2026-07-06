import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import ts from "typescript";

const QUERY = "?source";

/**
 * Vite plugin: `?source` query modifier for TypeScript files.
 *
 * Appending `?source` to any TS import rewrites each exported
 * function/const into a named string export containing the original
 * source text — pre-formatted with Prettier and pre-highlighted with
 * highlight.js at build time.
 *
 * The exports are HTML strings wrapped in `<pre><code class="hljs typescript">`.
 * No runtime formatting or highlighting libraries are needed.
 *
 * @example
 * ```ts
 * import { rgb2hsl, hsl2rgb } from "@src/units/color/conversions/cylindrical?source";
 * // rgb2hsl is an HTML string: '<pre><code class="hljs typescript">...</code></pre>'
 * ```
 */
export function sourceExportPlugin(): Plugin {
    let prettier: typeof import("prettier") | null = null;
    let hljs: typeof import("highlight.js/lib/core").default | null = null;

    // Vite dev mode mangles resolved.id into /@alias/... URLs.
    // Store the real filesystem path from resolveId for use in load.
    const idToPath = new Map<string, string>();

    return {
        name: "source-export",

        async resolveId(source, importer, options) {
            if (!source.endsWith(QUERY)) return;

            const basePath = source.slice(0, -QUERY.length);
            const resolved = await this.resolve(basePath, importer, {
                ...options,
                skipSelf: true,
            });
            if (!resolved) return;

            const virtualId = resolved.id + QUERY;
            idToPath.set(virtualId, resolved.id);
            return virtualId;
        },

        async load(id) {
            if (!id.endsWith(QUERY)) return;

            // Lazy-init prettier + hljs (Node-side only, not shipped to client)
            if (!prettier) {
                prettier = await import("prettier");
            }
            if (!hljs) {
                const mod = await import("highlight.js/lib/core");
                hljs = mod.default;
                const ts = await import("highlight.js/lib/languages/typescript");
                hljs.registerLanguage("typescript", ts.default);
            }

            const filePath = idToPath.get(id) ?? id.slice(0, -QUERY.length);
            const raw = readFileSync(filePath, "utf-8");

            return await renderExports(raw, prettier, hljs, filePath);
        },
    };
}

/**
 * Parse `raw` TypeScript with the TypeScript compiler and return each top-level
 * `export const` / `export function` as `{ name, source }`, where `source` is
 * the COMPLETE declaration text with the leading `export ` stripped.
 *
 * This is a real parse, NOT a brace scan. The prior first-`{`-then-balance scan
 * (W4-4 root, `design-docs-about.md` P0-1) truncated every export whose first
 * parameter is destructured (`({ l, c, h }: T)`) at the destructuring brace —
 * 15/18 doc-imported conversions shipped as one invalid line — and mis-sliced
 * or skipped brace-free initializers (array literals, `invertMat3(…)` calls).
 * A parse yields the exact declaration span for every form: destructured
 * params, object return types, arrow/array/call initializers, multi-line bodies.
 *
 * Pure + side-effect-free so the per-page snippet golden
 * (`test/docs-source-snippets.test.ts`) can exercise it directly — vitest does
 * not register this Vite plugin, so it cannot resolve `?source` imports.
 */
export function extractExportSources(
    raw: string,
    fileName = "source.ts",
): { name: string; source: string }[] {
    const sourceFile = ts.createSourceFile(
        fileName,
        raw,
        ts.ScriptTarget.Latest,
        /* setParentNodes */ true,
        ts.ScriptKind.TS,
    );

    const out: { name: string; source: string }[] = [];

    for (const stmt of sourceFile.statements) {
        const modifiers = ts.canHaveModifiers(stmt)
            ? ts.getModifiers(stmt)
            : undefined;
        const isExported =
            modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ??
            false;
        if (!isExported) continue;

        const declText = raw
            .slice(stmt.getStart(sourceFile), stmt.getEnd())
            .replace(/^export\s+/, "");

        if (ts.isFunctionDeclaration(stmt) && stmt.name) {
            out.push({ name: stmt.name.text, source: declText });
        } else if (ts.isVariableStatement(stmt)) {
            for (const decl of stmt.declarationList.declarations) {
                if (ts.isIdentifier(decl.name)) {
                    out.push({ name: decl.name.text, source: declText });
                }
            }
        }
    }

    return out;
}

/**
 * Extract every exported declaration from `raw`, format each with Prettier,
 * highlight with highlight.js, and return a module where each export is a
 * pre-rendered HTML string.
 *
 * A Prettier failure THROWS (build-failing guard, W4-4). Because the extractor
 * now emits complete declarations, Prettier never fails in normal operation; a
 * throw here means a future extractor regression produced an invalid fragment,
 * and the build must fail loudly rather than ship a truncated snippet — the
 * precept-violating silent `catch` this replaces is exactly what hid P0-1.
 */
async function renderExports(
    raw: string,
    prettier: typeof import("prettier"),
    hljs: typeof import("highlight.js/lib/core").default,
    fileName: string,
): Promise<string> {
    const entries: string[] = [];

    for (const { name, source } of extractExportSources(raw, fileName)) {
        // Format with Prettier (fixed 80-col width)
        let formatted: string;
        try {
            formatted = await prettier.format(source, {
                parser: "typescript",
                printWidth: 80,
                tabWidth: 4,
            });
        } catch (err) {
            throw new Error(
                `[source-export] Prettier failed to format export \`${name}\` ` +
                    `from ${fileName}: ${(err as Error).message}\n` +
                    `The extracted source is not a complete, valid declaration — ` +
                    `refusing to ship a truncated snippet (W4-4 build-failing guard).`,
            );
        }

        // Highlight with highlight.js
        const highlighted = hljs.highlight(formatted.trimEnd(), {
            language: "typescript",
        });
        const html = `<pre class="hljs typescript"><code class="language-typescript">${highlighted.value}</code></pre>`;

        entries.push(`export const ${name} = ${JSON.stringify(html)};`);
    }

    return entries.join("\n");
}
