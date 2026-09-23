// Pass 2: long-animation-frame attribution for the mount settle + the Play stall.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const browser = await chromium.launch({ headless: false });
const runs = [];
for (let run = 0; run < 2; run++) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    const A = (window.__a = { loaf: [], graph: [], marks: {} });
    const t0 = performance.timeOrigin;
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) A.loaf.push({ st: Math.round(e.startTime), dur: Math.round(e.duration), block: Math.round(e.blockingDuration), render: Math.round(e.renderStart ? e.duration - (e.renderStart - e.startTime) : 0), scripts: (e.scripts || []).sort((a, b) => b.duration - a.duration).slice(0, 4).map((s) => ({ d: Math.round(s.duration), inv: (s.invoker || "").slice(0, 70), src: (s.sourceURL || "").replace(/^.*localhost:5173/, "").slice(0, 90), fn: (s.sourceFunctionName || "").slice(0, 40), fwd: Math.round(s.forcedStyleAndLayoutDuration || 0) })) }); }).observe({ type: "long-animation-frame", buffered: true }); } catch (e) { A.err = String(e); }
    const loop = (now) => { const g = document.querySelector(".graph"); if (g) A.graph.push([Math.round(now), getComputedStyle(g).transform.slice(0, 40)]); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  });
  await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(6000);
  const clickAt = await page.evaluate(() => performance.now());
  await page.locator("[aria-label='Play animation']").first().click();
  await page.waitForTimeout(4000);
  const a = await page.evaluate((c) => ({ ...window.__a, clickAt: Math.round(c), nav: performance.getEntriesByType("navigation").map((n) => ({ dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) })) }), clickAt);
  runs.push(a);
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, "loaf.json"), JSON.stringify({ khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, runs }, null, 1));
console.log("ok");
