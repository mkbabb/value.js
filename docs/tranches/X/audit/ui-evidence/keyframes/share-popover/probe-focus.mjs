// focus-order probe — READ-ONLY; where does Tab go from the share field, and is a ring painted?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const b = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1100);
await page.getByRole("button", { name: "@mbabb menu" }).first().click(); await page.waitForTimeout(800);
await page.locator("[aria-label='Share animation']").first().click(); await page.waitForTimeout(800);
const f = () => page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { el: a.tagName + ":" + (a.getAttribute("title") || a.getAttribute("aria-label") || a.getAttribute("role") || a.className.slice(0, 40)), inPopover: !!a.closest("[role=dialog]"), shadow: c.boxShadow.slice(0, 80), outline: c.outlineStyle + " " + c.outlineWidth, fv: a.matches(":focus-visible") }; });
const out = [await f()];
for (let i = 0; i < 4; i++) { await page.keyboard.press("Tab"); await page.waitForTimeout(250); out.push(await f()); }
await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(250); out.push({ shiftTab: await f() });
console.log(JSON.stringify(out, null, 1)); await browser.close();
