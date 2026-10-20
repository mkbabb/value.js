// SERVED MODEL: claude-opus-5-5 · SS-8 B24 U-9 — L-16's static closure re-take at HEAD (local demo modules,
// relative specifiers, .ts/.vue/index.ts), full vs with usePalettePorts.ts cut. No browser.
import fs from "node:fs";
import path from "node:path";
import { save } from "./lib.mjs";
const REPO = path.resolve(import.meta.dirname, "../../../../../../..");
const ENTRY = path.join(REPO, "demo/workbenches/mix/MixSourceSelector.vue");
const CUT = path.join(REPO, "demo/palettes/usePalettePorts.ts");
const RE = /(?:import|export)\s[^'"]*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)/g;
function resolve(from, spec) {
    if (!spec.startsWith(".")) return null;
    const base = path.resolve(path.dirname(from), spec.replace(/\?.*$/, ""));
    for (const c of [base, base + ".ts", base + ".vue", path.join(base, "index.ts")]) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    return null;
}
function closure(cut) {
    const seen = new Map();
    const stack = [ENTRY];
    while (stack.length) {
        const f = stack.pop();
        if (seen.has(f) || f === cut) continue;
        const src = fs.readFileSync(f, "utf8");
        seen.set(f, Buffer.byteLength(src));
        for (const m of src.matchAll(RE)) { const r = resolve(f, m[1] ?? m[2] ?? m[3]); if (r && /\.(ts|vue)$/.test(r)) stack.push(r); }
    }
    return seen;
}
const full = closure(null), cut = closure(CUT);
const sum = (m) => [...m.values()].reduce((a, b) => a + b, 0);
const delta = [...full.keys()].filter((k) => !cut.has(k)).map((k) => path.relative(REPO, k));
const r = { full: { modules: full.size, bytes: sum(full) }, cut: { modules: cut.size, bytes: sum(cut) }, delta: { modules: full.size - cut.size, bytes: sum(full) - sum(cut) },
    adminInDelta: delta.filter((d) => /admin|Admin/.test(d)), deltaList: delta.sort() };
save("u9-closure.out.json", r);
console.log(JSON.stringify({ ...r, deltaList: r.deltaList.length }, null, 1));
