// SERVED MODEL: claude-opus-5-5
// route-ts-compiler — CPU profile of one arm × one entry (never a timing of record): passes over the
// corpus for ~N seconds under `node --cpu-prof`, then prints the top self-time frames.
//   node harness/profile.mjs <arm> <entry> [seconds=4]
import { Session } from "node:inspector/promises";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { INPUTS, arm } from "./common.mjs";
const [name = "proto", entry = "parseStylesheet", secs = "4"] = process.argv.slice(2);
const fn = (await arm(name))[entry];
for (let w = 0; w < 3; w++) for (const s of INPUTS) fn(s);
const session = new Session(); session.connect();
await session.post("Profiler.enable"); await session.post("Profiler.setSamplingInterval", { interval: 200 });
await session.post("Profiler.start");
const t0 = performance.now(); let passes = 0;
while (performance.now() - t0 < Number(secs) * 1000) { for (const s of INPUTS) fn(s); passes++; }
const { profile } = await session.post("Profiler.stop");
const self = new Map(); let total = 0;
const dt = profile.timeDeltas; const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const count = new Map(); for (const id of profile.samples) count.set(id, (count.get(id) ?? 0) + 1);
for (const [id, c] of count) { const n = byId.get(id); const f = n.callFrame; const key = `${f.functionName || "(anon)"} ${path.basename(f.url)}:${f.lineNumber + 1}`; self.set(key, (self.get(key) ?? 0) + c); total += c; }
// Self time by bundled MODULE (esbuild marks each module with a `// <path>` line).
const bundle = (await import("node:fs")).readFileSync(path.join((await import("./common.mjs")).OUT, `${name}.mjs`), "utf8").split("\n");
const starts = []; bundle.forEach((l, i) => { const m = /^\/\/ ((?:src|docs|node_modules|\.\.|\/)[^ ]*\.(?:ts|js|mjs))$/.exec(l); if (m) starts.push([i + 1, m[1].replace(/^.*route-ts-compiler\//, "seat:").replace(/^.*node_modules\//, "nm:")]); });
const modOf = (line) => { let lo = 0, hi = starts.length - 1, ans = "(other)"; while (lo <= hi) { const mid = (lo + hi) >> 1; if (starts[mid][0] <= line) { ans = starts[mid][1]; lo = mid + 1; } else hi = mid - 1; } return ans; };
const byMod = new Map();
for (const [id, c] of count) { const f = byId.get(id).callFrame; const key = f.url.endsWith(".mjs") ? modOf(f.lineNumber + 1) : `(${f.functionName || "vm"})`; byMod.set(key, (byMod.get(key) ?? 0) + c); }
const mods = [...byMod].sort((a, b) => b[1] - a[1]).slice(0, 16).map(([k, c]) => `${(100 * c / total).toFixed(1).padStart(5)}%  [module] ${k}`);
const top = [...self].sort((a, b) => b[1] - a[1]).slice(0, 40);
const lines = [`${name} ${entry} passes=${passes} samples=${total}`, ...mods, "", ...top.map(([k, c]) => `${(100 * c / total).toFixed(1).padStart(5)}%  ${k}`)];
console.log(lines.join("\n"));
writeFileSync(path.join(import.meta.dirname, "..", "results", `prof-${name}-${entry}.top.txt`), lines.join("\n") + "\n");
