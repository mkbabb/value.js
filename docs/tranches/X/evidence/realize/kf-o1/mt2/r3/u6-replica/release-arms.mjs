// U6 release falsifier: one 120 px CDP touch swipe over the host's own content, paced one move a frame,
// released after a real 30 ms hold. Arm "wall": events carry wall-clock times (the probe's swipe).
// Arm "stamped": every event carries its own timestamp (moves 16 ms apart, release 300 ms after the last).
// One browser, a context per trial, both closed in finally.
import { writeFileSync } from "node:fs";
const { chromium } = await import("/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs");
const N = +(process.argv[2] ?? 8), OUT = process.argv[3], HOLD = +(process.argv[4] ?? 30);
const embed = "https://keyframes.babb.dev/embed/#/cube", host = "https://daraksha.babb.dev/__kf-assay-host";
const body = `<!doctype html><meta name=viewport content="width=device-width"><body style="margin:0"><div style="height:300px"></div><iframe id=f src="${embed}" style="display:block;width:100%;aspect-ratio:1;border:0"></iframe><div style="height:3000px"></div></body>`;
const browser = await chromium.launch();
const res = { wall: [], stamped: [] };
try {
  for (let i = 0; i < N; i++) for (const arm of ["wall", "stamped"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    try {
      await ctx.route(host, (r) => r.fulfill({ status: 200, contentType: "text/html", body }));
      const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
      await page.goto(host, { waitUntil: "domcontentloaded" });
      const fr = await (await page.waitForSelector("#f")).contentFrame();
      await fr.waitForSelector(".graph > div", { timeout: 20000 });
      await page.waitForTimeout(800); await page.evaluate(() => scrollTo(0, 200)); await page.waitForTimeout(200);
      const a = await page.evaluate(() => scrollY);
      const T = Date.now() / 1000;
      const ts = (t) => (arm === "stamped" ? { timestamp: T + t } : {});
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }], ...ts(0) });
      for (let k = 1; k <= 10; k++) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - 12 * k }], ...ts(0.016 * k) });
        await page.evaluate(() => new Promise(requestAnimationFrame));
      }
      await page.waitForTimeout(HOLD);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [], ...ts(0.16 + 0.3) });
      await page.waitForTimeout(600);
      res[arm].push((await page.evaluate(() => scrollY)) - a);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
const spread = (a) => Math.max(...a) - Math.min(...a);
const summary = { n: N, holdMs: HOLD, ...res, wallSpread: spread(res.wall), stampedSpread: spread(res.stamped) };
if (OUT) writeFileSync(OUT, JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary));
