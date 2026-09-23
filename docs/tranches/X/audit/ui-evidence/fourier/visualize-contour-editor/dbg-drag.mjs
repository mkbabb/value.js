// probe: does a point drag register (position + undo enablement)? client-side only, no save.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/w/lofty-winding-steel-beetle", { waitUntil: "networkidle" });
await page.locator(".play-control").waitFor({ timeout: 60000 }); await page.waitForTimeout(1500);
const e = page.locator("[aria-label='Edit contour']").first();
await e.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1200);
const pts = page.locator(".control-point"); const n = await pts.count();
const i = Math.floor(n / 4); const p = pts.nth(i);
const attrs = async () => [await p.getAttribute("cx"), await p.getAttribute("cy"), await page.locator("[aria-label='Undo']").getAttribute("aria-disabled")];
console.log("before", await attrs());
const bb = await p.boundingBox(); const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
const top = await page.evaluate(({x,y}) => { const el = document.elementFromPoint(x,y); return el?.tagName + "." + el?.getAttribute("class"); }, { x: cx, y: cy });
console.log("hit at point center:", top, bb);
await page.mouse.move(cx, cy); await page.mouse.down(); await page.mouse.move(cx + 30, cy - 25, { steps: 8 }); await page.mouse.move(cx + 60, cy - 50, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(500);
console.log("after drag", await attrs());
await page.keyboard.press("Meta+z"); await page.waitForTimeout(300); console.log("after cmd-z", await attrs());
// smooth → undo?
await page.evaluate(() => document.querySelector("[aria-label='Smooth contour']").click()); await page.waitForTimeout(500);
console.log("after smooth", await attrs(), await pts.count());
await b.close();
