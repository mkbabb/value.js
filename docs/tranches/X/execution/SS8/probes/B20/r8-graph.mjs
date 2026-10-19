// R-8 witness: closure over RELATIVE imports (the corpus's own graph2 method) from
// GradientVisualizer.vue, with and without the edge to usePalettePorts.ts. Static, node-only.
import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
const [root, entryRel] = process.argv.slice(2);
const entry = resolve(root, entryRel);
const RX = /(?:import|export)\s[^;]*?from\s+["'](\.{1,2}\/[^"']+)["']|import\s*\(\s*["'](\.{1,2}\/[^"']+)["']\s*\)|import\s+["'](\.{1,2}\/[^"']+)["']/g;
function res(from, spec) {
    const b = resolve(dirname(from), spec);
    for (const c of [b, b + ".ts", b + ".vue", b + ".js", b + "/index.ts"]) if (existsSync(c) && statSync(c).isFile()) return c;
    return null;
}
function closure(cut) {
    const seen = new Set(), stack = [entry];
    while (stack.length) {
        const f = stack.pop(); if (seen.has(f)) continue; seen.add(f);
        if (!/\.(ts|vue|js)$/.test(f)) continue;
        const src = readFileSync(f, "utf8");
        for (const m of src.matchAll(RX)) {
            const r = res(f, m[1] || m[2] || m[3]); if (!r) continue;
            if (cut && f === entry && /usePalettePorts\.ts$/.test(r)) continue;
            stack.push(r);
        }
    }
    return seen.size;
}
const full = closure(false), cut = closure(true);
console.log(JSON.stringify({ root, entry: entryRel, full, withoutPortsEdge: cut, delta: full - cut }));
