// Read-only probe: Metric label/value type at 1440 fine pointer vs 390 coarse pointer.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ headless: false });
const out = {};
for (const [vp, size, touch] of [["d", { width: 1440, height: 900 }, false], ["m", { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: touch, isMobile: touch });
  const page = await ctx.newPage(); await page.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await page.waitForTimeout(1000);
  out[vp] = await page.evaluate(() => [...document.querySelectorAll(".demo-info")].filter((e) => e.offsetParent).flatMap((g) => [...g.querySelectorAll(".metric")].slice(0, 2).map((m) => [...m.querySelectorAll("*")].filter((c) => c.children.length === 0).map((c) => { const s = getComputedStyle(c); return [c.className, c.textContent.trim(), s.fontSize, s.fontWeight, s.fontFamily.slice(0, 16), s.fontVariantCaps, s.textTransform, s.letterSpacing]; }))));
  await ctx.close();
}
await browser.close(); writeFileSync(new URL("./probe-metric.json", import.meta.url), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out));
