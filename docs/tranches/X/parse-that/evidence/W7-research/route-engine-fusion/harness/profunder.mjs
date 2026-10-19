// SERVED MODEL: claude-opus-5-5
// Self time of frames UNDER a given function (by name): node harness/profunder.mjs <cpuprofile> <fnName> [N]
import { readFileSync } from "node:fs";
const p = JSON.parse(readFileSync(process.argv[2], "utf8")); const target = process.argv[3]; const N = +(process.argv[4] ?? 30);
const byId = new Map(p.nodes.map((n) => [n.id, n])); const parent = new Map();
for (const n of p.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
const key = (n) => `${n.callFrame.functionName || "(anon)"} :${n.callFrame.lineNumber + 1}`;
const self = new Map(); let under = 0, total = 0;
for (let i = 0; i < p.samples.length; i++) {
    const dt = p.timeDeltas[i] ?? 0; total += dt; let hit = false;
    for (let id = p.samples[i]; id !== undefined; id = parent.get(id)) if (byId.get(id).callFrame.functionName === target) { hit = true; break; }
    if (!hit) continue; under += dt; const k = key(byId.get(p.samples[i])); self.set(k, (self.get(k) ?? 0) + dt);
}
console.log(`${target}: ${(100 * under / total).toFixed(1)}% of total`);
for (const [k, t] of [...self].sort((a, b) => b[1] - a[1]).slice(0, N)) console.log((100 * t / under).toFixed(1).padStart(5) + "%", k);
