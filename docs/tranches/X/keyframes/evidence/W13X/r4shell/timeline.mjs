// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · a Chrome performance trace (devtools.timeline) of the home Play (MODE=play) or a warm swap cube→amiga (MODE=swap): the longest main-thread task, broken down by trace event (READ-ONLY measurement)
// Usage: BASE=http://localhost:5393 RUN=before-r1 MODE=play node timeline.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import os from "node:os";
const OUT = new URL(".", import.meta.url).pathname;
const BASE = process.env.BASE || "http://localhost:5393"; const RUN = process.env.RUN || "run"; const MODE = process.env.MODE || "play";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const load0 = os.loadavg()[0].toFixed(2);
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto(`${BASE}/#/${MODE === "swap" ? "cube" : ""}`); await sleep(6000);
const tf = `${OUT}timeline-${MODE}-${RUN}.trace.json`;
await b.startTracing(p, { path: tf, categories: ["devtools.timeline", "disabled-by-default-devtools.timeline", "blink", "v8.execute"] });
const gapP = p.evaluate(() => new Promise((res) => { let last = performance.now(), max = 0; const s = last; const tick = (t) => { max = Math.max(max, t - last); last = t; if (t - s < 2500) requestAnimationFrame(tick); else res(Math.round(max)); }; requestAnimationFrame(tick); }));
await sleep(120);
if (MODE === "play") await p.locator('[data-dock-tether=bottom] [aria-label="Play animation"]').first().click();
else await p.evaluate(() => { location.hash = "#/amiga"; });
const maxGap = await gapP; await sleep(300);
await b.stopTracing();
const ev = JSON.parse(fs.readFileSync(tf, "utf8")).traceEvents;
// renderer main thread = the thread with the most RunTask events named CrRendererMain
const tn = ev.find((e) => e.name === "thread_name" && e.args?.name === "CrRendererMain" && ev.some((x) => x.pid === e.pid && x.name === "RunTask"));
const main = ev.filter((e) => e.pid === tn.pid && e.tid === tn.tid && e.ph === "X" && e.dur);
const tasks = main.filter((e) => e.name === "RunTask").sort((a, c) => c.dur - a.dur);
const L = tasks[0]; const inL = main.filter((e) => e.ts >= L.ts && e.ts + e.dur <= L.ts + L.dur && e !== L);
const agg = new Map(); for (const e of inL) { const k = e.name + (e.args?.data?.url ? " " + e.args.data.url.replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, "").slice(-60) : e.args?.data?.functionName ? " " + e.args.data.functionName : ""); agg.set(k, (agg.get(k) || 0) + e.dur / 1000); }
const top = [...agg.entries()].sort((a, c) => c[1] - a[1]).slice(0, 18).map(([k, v]) => `${v.toFixed(1)}ms ${k}`);
const over50 = tasks.filter((t) => t.dur > 50000).length;
const res = { run: RUN, mode: MODE, load: [load0, os.loadavg()[0].toFixed(2)], maxGap, longestTaskMs: +(L.dur / 1000).toFixed(1), tasksOver50: over50, top };
fs.writeFileSync(`${OUT}timeline-${MODE}-${RUN}.json`, JSON.stringify(res, null, 1));
if (!process.env.KEEP) fs.unlinkSync(tf);
console.log(`${MODE} ${RUN} load ${res.load.join("->")} · max rAF gap ${maxGap} ms · longest task ${res.longestTaskMs} ms · tasks > 50 ms: ${over50}`);
console.log("  " + top.join("\n  "));
await b.close();
