import type { Plugin } from "vite";
import { readFileSync } from "fs";

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
 * import { rgb2hsl, hsl2rgb } from "@src/units/color/utils?source";
 * // rgb2hsl is an HTML string: '<pre><code class="hljs typescript">...</code></pre>'
 * ```
 */
export function sourceExportPlugin(): Plugin {
    let prettier: typeof import("prettier") | null = null;
    let hljs: typeof import("highlight.js/lib/core").default | null = null;

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

            return resolved.id + QUERY;
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

            const filePath = id.slice(0, -QUERY.length);
            const raw = readFileSync(filePath, "utf-8");

            return await extractExports(raw, prettier, hljs);
        },
    };
}

/**
 * Extract all `export const` and `export function` declarations from
 * raw TypeScript source, format with Prettier, highlight with highlight.js,
 * and return a module where each export is a pre-rendered HTML string.
 */
async function extractExports(
    raw: string,
    prettier: typeof import("prettier"),
    hljs: typeof import("highlight.js/lib/core").default,
): Promise<string> {
    const exportRe = /export\s+(?:const|function)\s+(\w+)/g;
    const entries: string[] = [];
    let m: RegExpExecArray | null;

    while ((m = exportRe.exec(raw)) !== null) {
        const name = m[1];
        const start = m.index;

        const openBrace = raw.indexOf("{", start);
        if (openBrace === -1) continue;

        let depth = 0;
        let inStr = false;
        let strChar = "";
        let end = -1;

        for (let i = openBrace; i < raw.length; i++) {
            const ch = raw[i];
            if (inStr) {
                if (ch === "\\") { i++; continue; }
                if (ch === strChar) inStr = false;
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") {
                inStr = true;
                strChar = ch;
                continue;
            }
            if (ch === "{") depth++;
            if (ch === "}") {
                depth--;
                if (depth === 0) {
                    end = raw[i + 1] === ";" ? i + 2 : i + 1;
                    break;
                }
            }
        }

        if (end === -1) continue;

        const source = raw.slice(start, end).replace(/^export\s+/, "");

        // Format with Prettier (fixed 80-col width)
        let formatted: string;
        try {
            formatted = await prettier.format(source, {
                parser: "typescript",
                printWidth: 80,
                tabWidth: 4,
            });
        } catch {
            formatted = source;
        }

        // Highlight with highlight.js
        const highlighted = hljs.highlight(formatted.trimEnd(), { language: "typescript" });
        const html = `<pre class="hljs typescript"><code>${highlighted.value}</code></pre>`;

        entries.push(`export const ${name} = ${JSON.stringify(html)};`);
    }

    return entries.join("\n");
}
