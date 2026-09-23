// select each dock Controls-tab surface on the easing scene — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
for (const vp of [[1440, 900], [390, 844]]) {
const ctx = await browser.newContext({ viewport: { width: vp[0], height: vp[1] }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage(); const errs = []; page.on("pageerror", e => errs.push(String(e).slice(0, 160)));
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const out = [];
for (const name of ["Controls", "Keyframes", "Timeline", "Curve"]) {
  const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1200);
  const c = page.getByRole("combobox", { name: "Controls tab" }).first(); await c.click(); await page.waitForTimeout(600);
  await page.getByRole("option", { name }).first().click(); await page.waitForTimeout(1200); await page.mouse.move(5, vp[1] / 2); await page.waitForTimeout(800);
  out.push({ name, url: page.url(), panel: await page.evaluate(() => { const p = [...document.querySelectorAll("[role=tabpanel], .panel-content, .controls-pane, [class*=controls-pane]")].filter(e => e.getBoundingClientRect().height > 20).map(e => String(e.className).slice(0, 50) + ":" + e.textContent.trim().slice(0, 60)); return p; }) });
  await page.screenshot({ path: OUT + `13-dock-tab-${name.toLowerCase()}-${vp[0]}-light.png` });
}
console.log(vp[0], JSON.stringify(out, null, 1), errs);
await ctx.close();
}
await browser.close();
