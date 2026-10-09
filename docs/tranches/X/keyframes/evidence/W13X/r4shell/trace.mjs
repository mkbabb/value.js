// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · long-task trace of the home Play gesture (KFA-22 freeze limb) and of a warm scene swap (KFA-76 / KFA-81 mount-cost limb). READ-ONLY measurement.
// Usage: BASE=http://localhost:5393 RUN=before-r1 MODE=play|swap node trace.mjs
// Prints: max rAF gap, LoAF entries (>50 ms) with script attribution, and the CPU profile's top self-time frames inside the longest gap.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import os from "node:os";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:5393";
const RUN = process.env.RUN || "run";
const MODE = process.env.MODE || "play";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const load0 = os.loadavg()[0].toFixed(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.addInitScript(() => {
  window.__loaf = [];
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__loaf.push({ start: Math.round(e.startTime), dur: Math.round(e.duration), blocking: Math.round(e.blockingDuration ?? 0), scripts: (e.scripts || []).map((s) => ({ inv: s.invoker, src: (s.sourceURL || "").replace(/^.*\/\/[^/]+/, "").slice(0, 90), fn: s.sourceFunctionName, dur: Math.round(s.duration) })) }); }).observe({ type: "long-animation-frame", buffered: true }); } catch {}
});
await p.goto(`${BASE}/#/${MODE === "swap" ? "cube" : ""}`);
await sleep(6000);
const cdp = await ctx.newCDPSession(p);
await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start");
const t0 = await p.evaluate(() => { window.__loaf.length = 0; return performance.now(); });
const sP = p.evaluate(() => new Promise((res) => { const out = []; const s = performance.now(); let last = s;
  const tick = (t) => { out.push({ t: Math.round(t), dt: Math.round(t - last), hash: location.hash }); last = t; if (t - s < 3000) requestAnimationFrame(tick); else res(out); }; requestAnimationFrame(tick); }));
await sleep(120);
if (MODE === "play") await p.locator('[data-dock-tether=bottom] [aria-label="Play animation"]').first().click();
else await p.evaluate(() => { location.hash = "#/amiga"; });
const frames = await sP;
const { profile } = await cdp.send("Profiler.stop");
const loaf = await p.evaluate(() => window.__loaf);
let gi = 1; for (let i = 1; i < frames.length; i++) if (frames[i].dt > frames[gi].dt) gi = i;
const gap = { from: frames[gi - 1].t, to: frames[gi].t, dt: frames[gi].dt };
// self time per callFrame inside the gap window (profile timestamps are µs since profile start, aligned to page time via startTime offset)
const nodes = new Map(profile.nodes.map((n) => [n.id, n]));
const self = new Map(); let tt = profile.startTime;
const pStart = profile.startTime; // µs (monotonic); align with page performance.now via first sample ≈ t0
const offsetMs = t0 - 0; // approx: profile started just before t0
for (let i = 0; i < profile.samples.length; i++) { tt += profile.timeDeltas[i]; const tm = (tt - pStart) / 1000 + t0; if (tm < gap.from || tm > gap.to) continue;
  const n = nodes.get(profile.samples[i]); const cf = n.callFrame; const key = `${cf.functionName || "(anon)"} ${cf.url.replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, "").slice(0, 80)}:${cf.lineNumber + 1}`;
  self.set(key, (self.get(key) || 0) + profile.timeDeltas[i] / 1000); }
// also: self time inside the LoAF that carries the most script time (the mount's task)
const lw = loaf.filter((e) => e.scripts.length).sort((a, c) => c.scripts.reduce((x, y) => x + y.dur, 0) - a.scripts.reduce((x, y) => x + y.dur, 0))[0];
const selfL = new Map(); { let t2 = profile.startTime; for (let i = 0; i < profile.samples.length; i++) { t2 += profile.timeDeltas[i]; const tm = (t2 - pStart) / 1000 + t0; if (!lw || tm < lw.start || tm > lw.start + lw.dur) continue;
  const cf = nodes.get(profile.samples[i]).callFrame; const key = `${cf.functionName || "(anon)"} ${cf.url.replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, "").slice(-70)}:${cf.lineNumber + 1}`; selfL.set(key, (selfL.get(key) || 0) + profile.timeDeltas[i] / 1000); } }
const topLoaf = [...selfL.entries()].sort((a, c) => c[1] - a[1]).slice(0, 16).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
const top = [...self.entries()].sort((a, c) => c[1] - a[1]).slice(0, 14).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
// aggregate by url (file) too
const byFile = new Map(); for (const [k, v] of self) { const f = k.split(" ")[1]?.replace(/:\d+$/, "") || "?"; byFile.set(f, (byFile.get(f) || 0) + v); }
const topFiles = [...byFile.entries()].sort((a, c) => c[1] - a[1]).slice(0, 10).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
const load1 = os.loadavg()[0].toFixed(2);
const long = loaf.filter((e) => e.dur > 50);
const res = { run: RUN, mode: MODE, load: [load0, load1], maxGap: gap.dt, gapAt: gap.from - Math.round(t0), loafOver50: long.length, loafMax: Math.max(0, ...long.map((e) => e.dur)), loafMaxBlocking: Math.max(0, ...long.map((e) => e.blocking)), loaf: long, topSelf: top, topFiles, scriptLoaf: lw ?? null, topLoaf };
fs.writeFileSync(`${OUT}trace-${MODE}-${RUN}.json`, JSON.stringify(res, null, 1));
console.log(`${MODE} ${RUN} load ${load0}->${load1} · max rAF gap ${gap.dt} ms at +${res.gapAt} ms · LoAF>50: ${long.length}, max ${res.loafMax} ms (blocking ${res.loafMaxBlocking})`);
console.log("top files in gap:\n  " + topFiles.join("\n  "));
console.log("top self in gap:\n  " + top.join("\n  "));
console.log(`top self in the script-heaviest LoAF (${lw?.start} +${lw?.dur} ms):\n  ` + topLoaf.join("\n  "));
await b.close();
