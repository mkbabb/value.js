// Probe: where does the playhead track land in the stage grid (rest state)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await page.goto("http://localhost:5173/#/sequence", { waitUntil: "load" });
await page.waitForSelector('.seq-stage:not(.is-powering-on) .seq-row', { timeout: 10000 });
await page.waitForTimeout(800);
console.log(JSON.stringify(await page.evaluate(() => {
  const q = (s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return { s, y: +r.y.toFixed(2), h: +r.height.toFixed(2), x: +r.x.toFixed(1), w: +r.width.toFixed(1), gridRow: c.gridRowStart + '/' + c.gridRowEnd, gtr: c.gridTemplateRows }; };
  return [q('.seq-stage'), q('.seq-axis'), q('.seq-playhead-track'), q('.seq-playhead'), q('.seq-rows')];
})));
await browser.close();
