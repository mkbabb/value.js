// probe: which rule paints (or fails to paint) the back button's focus-visible ring. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
await p.getByRole("button", { name: "Edit easing curve" }).first().click(); await p.waitForTimeout(1200);
await p.keyboard.press("Shift+Tab"); await p.keyboard.press("Tab"); await p.waitForTimeout(600);
const info = await p.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); const out = { label: e.getAttribute("aria-label"), cls: e.className, fv: e.matches(":focus-visible"), outline: c.outline, shadow: c.boxShadow, ringVar: c.getPropertyValue("--focus-ring-shadow"), after: getComputedStyle(e, "::after").boxShadow + " | " + getComputedStyle(e, "::after").outline, before: getComputedStyle(e, "::before").boxShadow };
  const pc = e.closest(".panel-content"); out.clipAncestor = pc ? getComputedStyle(pc).overflow : null; return out; });
console.log(JSON.stringify(info, null, 1));
const bb = await p.locator(":focus").boundingBox(); await p.screenshot({ path: OUT + "probe-back-focus-1440-light.png", clip: { x: bb.x - 30, y: bb.y - 30, width: bb.width + 60, height: bb.height + 60 } });
await b.close();
