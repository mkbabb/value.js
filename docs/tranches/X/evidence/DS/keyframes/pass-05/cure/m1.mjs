// X-DS kf pass 5 cure seat — measurement probe (headless real Chrome, §0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/";
const KEY = "animation-groups-control-options-store";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
for (const w of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}#/square`, { waitUntil: "load" });
  await page.evaluate((k) => { localStorage.clear(); localStorage.setItem(k, JSON.stringify({ square: { selectedControl: "keyframes", isTimelineExpanded: false } })); }, KEY);
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(5000);
  out[`ribbon-${w}`] = await page.evaluate(() => {
    const t = [...document.querySelectorAll("button")].find((b) => b.textContent.trim().startsWith("Apply"));
    if (!t) return null;
    const row = t.parentElement;
    return { row: Math.round(row.getBoundingClientRect().width), scrollW: row.scrollWidth, btns: [...row.children].map((b) => [b.textContent.trim(), Math.round(b.getBoundingClientRect().width), Math.round(b.getBoundingClientRect().height), Math.round(b.getBoundingClientRect().y)]) };
  });
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
