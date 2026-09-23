import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const out = {};
for (const theme of ["light", "dark"]) {
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage();
await page.goto(`http://localhost:5173/#/spring`, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
for (const tab of ["Keyframes", "Controls", "Timeline"]) {
  const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100);
  await page.getByRole("combobox", { name: "Controls tab" }).first().click(); await page.waitForTimeout(600);
  await page.getByRole("option", { name: tab, exact: true }).first().click(); await page.waitForTimeout(1200);
  await page.mouse.move(1430, 450); await page.waitForTimeout(600);
  out[theme + tab] = await page.evaluate(() => ({ kfEditors: document.querySelectorAll(".keyframes-editor-scroll").length, presets: document.querySelectorAll(".preset-grid").length, pane: (() => { const e = document.querySelector(".controls-pane"); return e && [Math.round(e.getBoundingClientRect().height), e.scrollHeight]; })(), stageText: document.querySelector(".spring-target h2")?.textContent.trim() }));
  await page.screenshot({ path: OUT + `15-tab-${tab.toLowerCase()}-1440-${theme}.png` });
}
await ctx.close();
}
console.log(JSON.stringify(out));
await b.close();
