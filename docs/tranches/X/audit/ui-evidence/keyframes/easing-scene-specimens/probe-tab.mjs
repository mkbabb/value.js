// dock Controls-tab options on the easing scene — READ-ONLY; headed Chromium.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1200);
await page.screenshot({ path: OUT + "12-dock-expanded-1440-light.png" });
const c = page.getByRole("combobox", { name: "Controls tab" }).first(); await c.click(); await page.waitForTimeout(700);
console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("[role=option]")].map(e => e.textContent.trim()))));
await page.screenshot({ path: OUT + "12b-dock-controls-tab-open-1440-light.png" });
await browser.close();
