import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const page = await ctx.newPage();
const out = {};
for (const scene of ["spring", "amiga"]) {
  await page.goto(`http://localhost:5173/#/${scene}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1100);
  const c = page.getByRole("combobox", { name: "Controls tab" }).first();
  await c.click(); await page.waitForTimeout(700);
  out[scene] = await page.getByRole("option").allTextContents();
  await page.screenshot({ path: OUT + `14-controls-tab-options-${scene}-1440-light.png` });
  await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  if (scene === "spring") {
    await page.mouse.move(700, 790); await page.waitForTimeout(800);
    const s = page.getByRole("combobox", { name: "Select animation" }).first();
    await s.click().catch(e => out.selErr = String(e).slice(0, 100)); await page.waitForTimeout(700);
    out.channels = await page.getByRole("option").allTextContents();
    await page.screenshot({ path: OUT + "11-channel-select-open-1440-light.png" });
    await page.keyboard.press("Escape");
  }
}
console.log(JSON.stringify(out));
await b.close();
