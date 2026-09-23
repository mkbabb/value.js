import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ headless: false });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" })).newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
await page.getByRole("combobox", { name: "Select animation" }).first().click(); await page.waitForTimeout(400);
await page.getByRole("option", { name: /Entry/ }).first().click(); await page.waitForTimeout(1200);
const out = [];
await page.locator("[aria-controls].btn-playback-accent").first().focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
for (let i = 0; i < 3; i++) { out.push(await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return { el: e.tagName + " " + (e.getAttribute("aria-label") || e.className.toString().slice(0, 30)), fv: e.matches(":focus-visible"), outline: s.outline, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow.slice(0, 160) }; })); await page.keyboard.press("Tab"); }
writeFileSync(new URL("focus-probe.json", import.meta.url).pathname, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out, null, 1));
await b.close();
