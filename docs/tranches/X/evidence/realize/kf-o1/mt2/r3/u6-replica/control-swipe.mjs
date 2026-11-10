// U6 control-swipe falsifier: the same 120 px CDP touch swipe over the host page's own content,
// unpaced (10 moves back to back) vs paced (one move a frame). One browser, a context per trial, closed in finally.
import { writeFileSync } from "node:fs";
const { chromium } = await import("/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs");
const N = +(process.argv[2] ?? 8), OUT = process.argv[3], JANK = +(process.argv[4] ?? 0);
const embed = "https://keyframes.babb.dev/embed/#/cube", host = "https://daraksha.babb.dev/__kf-assay-host";
const body = `<!doctype html><meta name=viewport content="width=device-width"><body style="margin:0"><div style="height:300px"></div><iframe id=f src="${embed}" style="display:block;width:100%;aspect-ratio:1;border:0"></iframe><div style="height:3000px"></div></body>`;
const browser = await chromium.launch();
const res = { unpaced: [], paced: [] };
try {
  for (let i = 0; i < N; i++) for (const mode of ["unpaced", "paced"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    try {
      await ctx.route(host, (r) => r.fulfill({ status: 200, contentType: "text/html", body }));
      const page = await ctx.newPage(); const cdp = await ctx.newCDPSession(page);
      await page.goto(host, { waitUntil: "domcontentloaded" });
      const fr = await (await page.waitForSelector("#f")).contentFrame();
      await fr.waitForSelector(".graph > div", { timeout: 20000 });
      await page.waitForTimeout(800); await page.evaluate(() => scrollTo(0, 200)); await page.waitForTimeout(200);
      if (JANK) await page.evaluate((j) => { const f = () => { const b = performance.now(); while (performance.now() - b < j); requestAnimationFrame(f); }; requestAnimationFrame(f); }, JANK);
      const a = await page.evaluate(() => scrollY);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 700 }] });
      for (let k = 1; k <= 10; k++) {
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y: 700 - 12 * k }] });
        if (mode === "paced") await page.evaluate(() => new Promise(requestAnimationFrame));
      }
      await page.waitForTimeout(100);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      await page.waitForTimeout(400);
      res[mode].push((await page.evaluate(() => scrollY)) - a);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
const spread = (a) => Math.max(...a) - Math.min(...a);
const summary = { n: N, jankMs: JANK, unpaced: res.unpaced, paced: res.paced, unpacedSpread: spread(res.unpaced), pacedSpread: spread(res.paced) };
if (OUT) writeFileSync(OUT, JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary));
