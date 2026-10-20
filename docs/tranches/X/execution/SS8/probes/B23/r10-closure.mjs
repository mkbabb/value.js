// SERVED MODEL: claude-opus-5-5 · SS-8 B23 R-10 (wb-mix-resultdisplay): the static module closure
// of the installed glass-ui dist from the root barrel vs the `dom` subpath (challenge-L's
// "barrel 66 / 224 184 B vs dom 8 / 12 599 B"), re-measured at the CURRENT pin. Also reports
// which specifier MixResultDisplay.vue imports useClipboard from at HEAD.
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
const ROOT = resolve(process.argv[2] ?? "/Users/mkbabb/Programming/value.js");
const PKG = resolve(ROOT, "node_modules/@mkbabb/glass-ui");
const pkg = JSON.parse(readFileSync(resolve(PKG, "package.json"), "utf8"));
const entry = (k) => { const e = pkg.exports[k]; const v = typeof e === "string" ? e : e.import?.default ?? e.import ?? e.default; return resolve(PKG, typeof v === "string" ? v : v.default); };
function closure(file) {
    const seen = new Set(); const stack = [file]; let bytes = 0;
    while (stack.length) {
        const f = stack.pop(); if (seen.has(f) || !existsSync(f)) continue; seen.add(f);
        const src = readFileSync(f, "utf8"); bytes += Buffer.byteLength(src);
        for (const m of src.matchAll(/(?:import|export)\s*(?:[^'"]*?\sfrom\s*)?["'](\.{1,2}\/[^"']+)["']/g)) stack.push(resolve(dirname(f), m[1]));
    }
    return { modules: seen.size, bytes };
}
const sfc = readFileSync(resolve(ROOT, "demo/workbenches/mix/MixResultDisplay.vue"), "utf8");
console.log(JSON.stringify({ glassUi: pkg.version, barrel: closure(entry(".")), dom: closure(entry("./dom")),
    mixResultDisplayClipboardImport: sfc.match(/import\s*\{[^}]*useClipboard[^}]*\}\s*from\s*"([^"]+)"/)?.[1] }, null, 1));
