// spring-physics-tab probe — READ-ONLY; maps dock tab controls.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const vp = process.argv[2] || "1440";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: vp === "390" ? { width: 390, height: 844 } : { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => {
  const r = e => { const b = e.getBoundingClientRect(); return [b.x,b.y,b.width,b.height].map(Math.round); };
  return {
    combos: [...document.querySelectorAll("[role=combobox]")].map(e => (e.getAttribute("aria-label")||"") + " | " + e.textContent.trim().slice(0,30) + " " + r(e)),
    tabs: [...document.querySelectorAll("[role=tab]")].map(e => (e.getAttribute("aria-label")||"") + " | " + e.textContent.trim().slice(0,30) + " " + e.getAttribute("data-state") + " " + r(e)),
    buttons: [...document.querySelectorAll("button")].filter(e => e.getBoundingClientRect().width>0).map(e => (e.getAttribute("aria-label")||e.textContent.trim().slice(0,20))).slice(0,60),
  };
});
console.log(JSON.stringify(info, null, 1));
await page.screenshot({ path: OUT + `probe-${vp}.png` });
const combo = page.getByRole("combobox").first();
for (let i = 0; i < await page.getByRole("combobox").count(); i++) {
  const c = page.getByRole("combobox").nth(i);
  if (!(await c.isVisible())) continue;
  await c.click(); await page.waitForTimeout(600);
  console.log("combo", i, await page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim())));
  await page.screenshot({ path: OUT + `probe-${vp}-combo${i}.png` });
  await page.keyboard.press("Escape"); await page.waitForTimeout(400);
}
await b.close();
