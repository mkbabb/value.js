// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · KFA-185: the long animation frames that follow a click on the cube's visible Pause
// usage: node pause.mjs <baseUrl>   (4 cold loads; LoAF duration max in the 800 ms after the click)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ headless: false }); const out = [];
for (let i = 0; i < 4; i++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { window.__lt = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "long-animation-frame", buffered: true }); });
  const p = await ctx.newPage(); await p.goto(process.argv[2] + "/#/cube"); await p.waitForSelector(".cube-side"); await p.waitForTimeout(3500);
  const m = await p.evaluate(() => performance.now()); await p.locator("button[aria-label='Pause animation']").first().click(); await p.waitForTimeout(800);
  out.push(await p.evaluate((m) => Math.round(Math.max(0, ...window.__lt.filter((x) => x[0] >= m - 5).map((x) => x[1]))), m));
  await ctx.close();
}
console.log(JSON.stringify({ pauseLoAFmaxMs: out })); await b.close();
