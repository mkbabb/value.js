// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.r4shell · KFA-76 / KFA-81 mount-cost attribution (READ-ONLY): the CPU profile of a warm swap (cube -> TO) or a cold entry (COLD=1, #/TO), JS self time by source file, plus the LoAF entries with script attribution.
// Usage: BASE=http://localhost:5393 TO=amiga node swapprof.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import os from "node:os";
const BASE = process.env.BASE || "http://localhost:5393"; const TO = process.env.TO || "amiga"; const COLD = !!process.env.COLD;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
await p.addInitScript(() => { window.__loaf = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 50) window.__loaf.push({ start: Math.round(e.startTime), dur: Math.round(e.duration), scripts: (e.scripts || []).filter((s) => s.duration > 5).map((s) => `${s.invoker.slice(0, 40)} ${(s.sourceURL || "").replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, "").slice(-50)} ${Math.round(s.duration)}`) }); }).observe({ type: "long-animation-frame", buffered: true }); });
const cdp = await ctx.newCDPSession(p); await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 250 });
if (COLD) { await p.goto(`${BASE}/#/`); await sleep(1500); await cdp.send("Profiler.start"); await p.goto(`${BASE}/#/${TO}`); await p.reload(); await sleep(4000); }
else { await p.goto(`${BASE}/#/cube`); await sleep(6000); await p.evaluate(() => (window.__loaf.length = 0)); await cdp.send("Profiler.start"); await p.evaluate((t) => { location.hash = `#/${t}`; }, TO); await sleep(2500); }
const { profile } = await cdp.send("Profiler.stop"); const loaf = await p.evaluate(() => window.__loaf);
const nodes = new Map(profile.nodes.map((n) => [n.id, n])); const byFile = new Map(); const byFn = new Map();
for (let i = 0; i < profile.samples.length; i++) { const cf = nodes.get(profile.samples[i]).callFrame; if (!cf.url) continue; const f = cf.url.replace(/^.*\/\/[^/]+/, "").replace(/\?.*$/, ""); const d = profile.timeDeltas[i] / 1000;
  byFile.set(f, (byFile.get(f) || 0) + d); const k = `${cf.functionName || "(anon)"} ${f.slice(-55)}:${cf.lineNumber + 1}`; byFn.set(k, (byFn.get(k) || 0) + d); }
const top = (m, n) => [...m].sort((a, c) => c[1] - a[1]).slice(0, n).map(([k, v]) => `${v.toFixed(1)}ms ${k}`).join("\n  ");
console.log(`${COLD ? "cold #/" : "swap cube->"}${TO} · load ${os.loadavg()[0].toFixed(2)} · LoAF>50 ${JSON.stringify(loaf)}`);
console.log("JS self by file:\n  " + top(byFile, 12)); console.log("JS self by function:\n  " + top(byFn, 12));
await b.close();
