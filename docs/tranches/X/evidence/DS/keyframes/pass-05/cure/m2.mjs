// X-DS kf pass 5 cure seat — the shortcuts dialog width probe (headless real Chrome, §0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4000);
await page.keyboard.press("Shift+Slash");
await page.waitForTimeout(1500);
console.log(JSON.stringify(await page.evaluate(() => {
  const d = document.querySelector('[data-slot="dialog-content"]');
  const cs = getComputedStyle(d);
  const rows = [...d.querySelectorAll("dt")].map((e) => [e.textContent.trim(), Math.round(e.getBoundingClientRect().height)]);
  return { w: d.getBoundingClientRect().width, maxW: cs.maxWidth, maxIS: cs.maxInlineSize, width: cs.width, cls: d.className, wrapped: rows.filter((r) => r[1] > 30) };
}), null, 1));
await browser.close();
