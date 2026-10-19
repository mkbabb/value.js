// SERVED MODEL: claude-opus-5-5
// Summarizes a .cpuprofile: top-N self-time frames. node harness/proftop.mjs <file.cpuprofile> [N]
import { readFileSync } from "node:fs";
const p = JSON.parse(readFileSync(process.argv[2], "utf8"));
const N = +(process.argv[3] ?? 30);
const self = new Map(); const byId = new Map(p.nodes.map((n) => [n.id, n]));
const dt = new Map(); for (let i = 0; i < p.samples.length; i++) dt.set(p.samples[i], (dt.get(p.samples[i]) ?? 0) + (p.timeDeltas[i] ?? 0));
let total = 0;
for (const [id, t] of dt) { const n = byId.get(id); const cf = n.callFrame; const k = `${cf.functionName || "(anon)"} ${cf.url.split("/").pop()}:${cf.lineNumber + 1}`; self.set(k, (self.get(k) ?? 0) + t); total += t; }
for (const [k, t] of [...self].sort((a, b) => b[1] - a[1]).slice(0, N)) console.log((100 * t / total).toFixed(1).padStart(5) + "%", k);
