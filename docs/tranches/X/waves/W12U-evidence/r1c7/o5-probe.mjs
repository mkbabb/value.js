// SERVED MODEL: claude-opus-5-5
// X-W12U Repair 1 (C7-1, O-5 leg): the o5-boot-pacing window, re-read with a
// source census. Same collector as e2e/smoke/perf/frame-budget.ts (rAF deltas +
// longtask), same launch args as playwright.config.ts (SwiftShader), same
// 4000 ms window after the main pane is visible; ADDS: rAF timestamps (to
// locate the max gap), longtask start+duration, long-animation-frame entries
// (script attribution), and the hero chunk fetch time.
// Usage: node o5-probe.mjs <origin> <label> [sittings=3]
import { chromium } from "@playwright/test";
const [origin, label, nArg] = process.argv.slice(2);
const N = Number(nArg ?? 3);
const MAIN = process.env.O5_MAIN ?? 'main[aria-labelledby="route-title"]:has(> h1#route-title)';
const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
try {
  for (let s = 1; s <= N; s++) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    try {
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        const w = window; w.__ts = []; w.__lt = []; w.__loaf = []; w.__canvasAt = [];
        new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1 && (n.tagName === 'CANVAS' || n.querySelector?.('canvas'))) w.__canvasAt.push([performance.now(), (n.tagName === 'CANVAS' ? n : n.querySelector('canvas')).className?.toString().slice(0, 40)]); }).observe(document, { childList: true, subtree: true });
        const tick = (now) => { w.__ts.push(now); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        try { new PerformanceObserver((l) => { for (const e of l.getEntries()) w.__lt.push([e.startTime, e.duration]); }).observe({ entryTypes: ["longtask"] }); } catch {}
        try { new PerformanceObserver((l) => { for (const e of l.getEntries()) w.__loaf.push({ start: e.startTime, dur: e.duration, block: e.blockingDuration, render: e.renderStart, style: e.styleAndLayoutStart, scripts: e.scripts.map((x) => [x.sourceURL?.split("/").pop(), x.invoker, Math.round(x.duration)]) }); }).observe({ type: "long-animation-frame", buffered: true }); } catch {}
      });
      await page.goto(origin + "/");
      await page.locator(MAIN).waitFor({ state: "visible", timeout: 20000 });
      const t0 = await page.evaluate(() => performance.now());
      await page.waitForFunction((a) => performance.now() - a >= 4000, t0, { timeout: 9000, polling: 100 });
      const r = await page.evaluate(() => ({ ts: window.__ts, lt: window.__lt, loaf: window.__loaf.map((e) => ({ ...e })), res: performance.getEntriesByType("resource").filter((e) => /HeroBlob|goo|blob/i.test(e.name)).map((e) => [e.name.split("/").pop(), Math.round(e.startTime)]), canvas: window.__canvasAt.map(([t, c]) => [Math.round(t), c]) }));
      const d = []; for (let i = 1; i < r.ts.length; i++) d.push([r.ts[i] - r.ts[i - 1], r.ts[i - 1]]);
      const deltas = d.map((x) => x[0]).filter((x) => x > 0); const sorted = [...deltas].sort((a, b) => a - b);
      const med = sorted[Math.floor(sorted.length / 2)]; const max = d.reduce((a, b) => (b[0] > a[0] ? b : a), [0, 0]);
      const gapS = max[1], gapE = max[1] + max[0];
      const ltIn = r.lt.filter(([st, du]) => st < gapE && st + du > gapS);
      const loafIn = r.loaf.filter((e) => e.start < gapE && e.start + e.dur > gapS);
      console.log(`[o5-probe ${label} s${s}] mainVisible@${t0.toFixed(0)} frames=${deltas.length} median=${med?.toFixed(1)} max=${max[0].toFixed(1)} (${(max[0] / med).toFixed(1)}x) gap=[${gapS.toFixed(0)},${gapE.toFixed(0)}] longtasks=${JSON.stringify(r.lt.map(([a, b]) => [Math.round(a), Math.round(b)]))} longtasksInGap=${ltIn.length} loafInGap=${JSON.stringify(loafIn.map((e) => ({ start: Math.round(e.start), dur: Math.round(e.dur), block: Math.round(e.block), renderAt: Math.round(e.render - e.start), styleAt: Math.round(e.style - e.start), scripts: e.scripts.slice(0, 4) })))} hero=${JSON.stringify(r.res)} canvas=${r.canvas}`);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
