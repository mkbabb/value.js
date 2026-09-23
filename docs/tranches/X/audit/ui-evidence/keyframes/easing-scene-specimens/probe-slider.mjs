// duration-slider + tile-geometry probe — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const r = await page.evaluate(() => {
  const d = document.querySelector(".duration-field");
  const q = (s) => [...d.querySelectorAll(s)].map(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { cls: String(e.className).slice(0, 60), role: e.getAttribute("role"), rect: [b.x, b.y, b.width, b.height].map(Math.round), bg: cs.backgroundColor, op: cs.opacity, vis: cs.visibility, radius: cs.borderRadius, now: e.getAttribute("aria-valuenow") }; });
  const tiles = [...document.querySelectorAll(".specimen-tile")].slice(0, 8).map(t => { const b = t.getBoundingClientRect(); const st = t.querySelector(".tile-stage").getBoundingClientRect(); return [t.textContent.trim(), Math.round(b.width), Math.round(b.height), Math.round(st.width)]; });
  return { slider: q("[data-slot=slider] *, [role=slider]"), labelAttrs: [...d.attributes].map(a => a.name), tiles };
});
console.log(JSON.stringify(r, null, 1));
const s = await page.locator(".duration-field").boundingBox();
await page.screenshot({ path: OUT + "00e-duration-slider-crop-1440-light.png", clip: { x: s.x - 10, y: s.y - 10, width: s.width + 20, height: s.height + 20 } });
await page.locator(".duration-field [role=slider]").first().focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(400);
await page.screenshot({ path: OUT + "00f-duration-slider-focus-crop-1440-light.png", clip: { x: s.x - 10, y: s.y - 10, width: s.width + 20, height: s.height + 20 } });
await browser.close();
