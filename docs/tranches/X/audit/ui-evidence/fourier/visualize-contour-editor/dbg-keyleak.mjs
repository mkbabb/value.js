// probe: the hidden editor's window keydown handler vs a sidebar text field (client-side only, no save).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/w/lofty-winding-steel-beetle", { waitUntil: "networkidle" });
await page.locator(".play-control").waitFor({ timeout: 60000 }); await page.waitForTimeout(1500);
const e = page.locator("[aria-label='Edit contour']").first();
await e.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1200);
const p = page.locator(".control-point").nth(40); const bb = await p.boundingBox();
await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(300);
await e.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1200); // leave edit mode
const inputs = page.locator(".viz-panel-left input:not([type=file]):not([type=range])");
console.log("inputs", await inputs.count(), await inputs.evaluateAll((els) => els.map((x) => x.outerHTML.slice(0, 120))));
const inp = inputs.first(); await inp.click(); await page.keyboard.press("End");
const v0 = await inp.inputValue(); const n0 = await page.locator(".control-point").count();
await page.keyboard.press("Backspace"); await page.waitForTimeout(300);
console.log("field", v0, "->", await inp.inputValue(), "points", n0, "->", await page.locator(".control-point").count());
await b.close();
