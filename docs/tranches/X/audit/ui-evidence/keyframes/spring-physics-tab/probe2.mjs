import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await page.mouse.move(720, 70); await page.waitForTimeout(900);
await page.screenshot({ path: OUT + `probe2-dock-hover.png` });
const c = page.getByRole("combobox", { name: "Controls tab" });
await c.click(); await page.waitForTimeout(700);
console.log(await page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim())));
await page.screenshot({ path: OUT + `probe2-tab-select.png` });
const opt = page.getByRole("option", { name: "Keyframes" });
if (await opt.count()) { await opt.click(); await page.waitForTimeout(1500); await page.mouse.move(1400,450); await page.waitForTimeout(800); await page.screenshot({ path: OUT + `probe2-keyframes-tab.png` }); }
const info = await page.evaluate(() => {
  const r = e => { const b = e.getBoundingClientRect(); return [b.x,b.y,b.width,b.height].map(Math.round); };
  const sl = [...document.querySelectorAll(".labeled-field-grid [role=slider]")].map(e => r(e));
  const tracks = [...document.querySelectorAll(".labeled-field-grid *")].filter(e => /track|range|slider/i.test(e.className?.toString?.() || "")).slice(0,8).map(e => e.tagName + "." + e.className.toString().slice(0,80) + " " + r(e) + " bg=" + getComputedStyle(e).backgroundColor + " r=" + getComputedStyle(e).borderRadius);
  return { sl, tracks };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
