// CPU profile of one variant/entry: warm-up then N passes; prints top self-time frames.
import { INPUTS } from "./equiv.mjs";
import path from "node:path";
import { Session } from "node:inspector/promises";
import { writeFileSync } from "node:fs";
const [variant, entry, passes = "20"] = process.argv.slice(2);
const here = path.resolve(import.meta.dirname, "..");
const m = await import(path.join(here, "out", `${variant}.mjs`));
const f = m[entry];
for (let i = 0; i < 3; i++) for (const s of INPUTS) { try { f(s); } catch {} }
const session = new Session(); session.connect();
await session.post("Profiler.enable"); await session.post("Profiler.setSamplingInterval", { interval: 200 }); await session.post("Profiler.start");
for (let i = 0; i < +passes; i++) for (const s of INPUTS) { try { f(s); } catch {} }
const { profile } = await session.post("Profiler.stop");
const self = new Map(); const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const dt = profile.timeDeltas; let total = 0;
profile.samples.forEach((id, i) => { const n = byId.get(id); const k = `${n.callFrame.functionName || "(anon)"} ${path.basename(n.callFrame.url)}:${n.callFrame.lineNumber + 1}`; self.set(k, (self.get(k) ?? 0) + dt[i]); total += dt[i]; });
const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([k, v]) => `${(100 * v / total).toFixed(1).padStart(5)}%  ${k}`);
const parent = new Map(); for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
const incl = new Map();
profile.samples.forEach((id, i) => { const seen = new Set(); for (let x = id; x !== undefined; x = parent.get(x)) { const n = byId.get(x); const k = `${n.callFrame.functionName || "(anon)"}:${n.callFrame.lineNumber + 1}`; if (!seen.has(k)) { seen.add(k); incl.set(k, (incl.get(k) ?? 0) + dt[i]); } } });
const inclTop = [...incl].filter(([k]) => !/^\(root\)|^\(anon\):0|^(pass|post|file)/.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => `${(100 * v / total).toFixed(1).padStart(5)}%  ${k}`);
const cat = {}; for (const [k, v] of self) { const fnm = k.split(" ")[0]; const c = /^(r|q)_/.test(fnm) || /^hq?\d+$/.test(fnm) ? "generated parser" : /^\(/.test(fnm) ? fnm : "value.js (actions + layer)"; cat[c] = (cat[c] ?? 0) + v; }
const cats = Object.entries(cat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${(100 * v / total).toFixed(1).padStart(5)}%  [${k}]`);
const txt = `${variant} ${entry} passes=${passes}\n` + cats.join("\n") + "\n--self--\n" + top.join("\n") + "\n--inclusive--\n" + inclTop.join("\n");
writeFileSync(path.join(here, "prof", `${variant}-${entry}.top.txt`), txt); console.log(txt);
