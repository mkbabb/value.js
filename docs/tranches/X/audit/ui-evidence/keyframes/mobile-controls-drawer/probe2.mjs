import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);
const out = await page.evaluate(() => {
  const px = (e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const d = [...document.querySelectorAll(".glass-dock")].pop();
  return [...d.querySelectorAll("button,[role=combobox],[role=tab],[role=radio]")].filter(e => !e.closest("[inert]")).map(e => ({ l: e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20), role: e.getAttribute("role"), sel: e.getAttribute("aria-selected") || e.getAttribute("aria-checked") || e.getAttribute("data-state"), b: px(e) }));
});
console.log(JSON.stringify(out));
await browser.close();
