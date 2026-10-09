// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · §0ev.1 statistic over a paired JSONL: per-round ratio after/before for maxGap and longestTaskMs; the median and its 95% bootstrap upper bound (10 000 resamples, seeded).
// Usage: node paired-stat.mjs paired-play-pairA.jsonl
import fs from "node:fs";
const rows = fs.readFileSync(process.argv[2], "utf8").split("\n").filter((l) => l.startsWith("{")).map((l) => JSON.parse(l)).filter((r) => !r.error);
const rounds = new Map(); for (const r of rows) { const o = rounds.get(r.round) || {}; o[r.arm] = r; rounds.set(r.round, o); }
const pairs = [...rounds.values()].filter((o) => o.before && o.after);
const med = (a) => { const s = [...a].sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
let seed = 12345; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const boot = (a) => { const m = []; for (let i = 0; i < 10000; i++) { const s = a.map(() => a[Math.floor(rnd() * a.length)]); m.push(med(s)); } m.sort((x, y) => x - y); return m[Math.floor(0.975 * m.length)]; };
const loads = rows.flatMap((r) => r.load.map(Number));
for (const k of ["maxGap", "longestTaskMs"]) { const ratios = pairs.map((o) => o.after[k] / o.before[k]);
  console.log(`${k}: rounds ${pairs.length} · median before ${med(pairs.map((o) => o.before[k]))} · median after ${med(pairs.map((o) => o.after[k]))} · median ratio ${med(ratios).toFixed(3)} · 95% bootstrap upper ${boot(ratios).toFixed(3)} · ${med(ratios) < 1 && boot(ratios) < 1 ? "GREEN" : "RED"}`); }
console.log(`load range ${Math.min(...loads)}–${Math.max(...loads)}`);
