// SERVED MODEL: claude-opus-5-5
// Inclusive time per function (each sample counts a function once however deep it recurses).
// node harness/profincl.mjs <file.cpuprofile> [N] [filter-regex]
import { readFileSync } from "node:fs";
const p = JSON.parse(readFileSync(process.argv[2], "utf8"));
const N = +(process.argv[3] ?? 40); const F = process.argv[4] ? new RegExp(process.argv[4]) : null;
const byId = new Map(p.nodes.map((n) => [n.id, n])); const parent = new Map();
for (const n of p.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
const key = (n) => `${n.callFrame.functionName || "(anon)"} ${n.callFrame.url.split("/").pop()}:${n.callFrame.lineNumber + 1}`;
const incl = new Map(); let total = 0;
for (let i = 0; i < p.samples.length; i++) {
    const dt = p.timeDeltas[i] ?? 0; total += dt; const seen = new Set();
    for (let id = p.samples[i]; id !== undefined; id = parent.get(id)) { const k = key(byId.get(id)); if (!seen.has(k)) { seen.add(k); incl.set(k, (incl.get(k) ?? 0) + dt); } }
}
for (const [k, t] of [...incl].sort((a, b) => b[1] - a[1]).filter(([k]) => !F || F.test(k)).slice(0, N)) console.log((100 * t / total).toFixed(1).padStart(5) + "%", k);
