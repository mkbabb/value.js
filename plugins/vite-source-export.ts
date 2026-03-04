import type { Plugin } from "vite";
import { readFileSync } from "fs";

const QUERY = "?source";

/**
 * Vite plugin: `?source` query modifier for TypeScript files.
 *
 * Appending `?source` to any TS import rewrites each exported
 * function/const into a named string export containing the original
 * source text — preserving formatting through minified builds.
 *
 * Works like `?raw` but per-export instead of whole-file.
 *
 * @example
 * ```ts
 * import { rgb2hsl, hsl2rgb } from "@src/units/color/utils?source";
 * // rgb2hsl is a string containing the function's source code
 * ```
 */
export function sourceExportPlugin(): Plugin {
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

        load(id) {
            if (!id.endsWith(QUERY)) return;

            const filePath = id.slice(0, -QUERY.length);
            const raw = readFileSync(filePath, "utf-8");

            return extractExports(raw);
        },
    };
}

/**
 * Extract all `export const` and `export function` declarations from
 * raw TypeScript source, returning a module where each export is a
 * string literal of the original source text.
 */
function extractExports(raw: string): string {
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
        entries.push(`export const ${name} = ${JSON.stringify(source)};`);
    }

    return entries.join("\n");
}
