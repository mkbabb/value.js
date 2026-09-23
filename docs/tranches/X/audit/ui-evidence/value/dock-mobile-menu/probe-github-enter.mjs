// READ-ONLY probe: does keyboard Enter on the GitHub menu row open the link (as-child on a glass item with no asChild prop)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.route("https://github.com/**", (r) => r.fulfill({ status: 200, body: "stub" }));
const p = await ctx.newPage();
await p.goto("http://localhost:9000/", { waitUntil: "load", timeout: 60000 }); await p.waitForTimeout(2500);
await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(600);
for (let i = 0; i < 6; i++) { await p.keyboard.press("ArrowDown"); const t = await p.evaluate(() => document.activeElement?.textContent.trim()); if (t === "GitHub") break; }
console.log("focused:", await p.evaluate(() => document.activeElement?.outerHTML.slice(0, 160)));
const pagesBefore = ctx.pages().length;
await p.keyboard.press("Enter"); await p.waitForTimeout(1500);
console.log("Enter → pages", pagesBefore, "->", ctx.pages().length, "menuOpen", await p.locator('[role="menu"]').isVisible().catch(() => false), "url", p.url());
// pointer click on the row padding (not the text)
await p.locator('[aria-label="Menu"]').first().click(); await p.waitForTimeout(600);
const row = p.locator('[role="menu"] [role="menuitem"]').filter({ hasText: "GitHub" });
const bb = await row.boundingBox(); console.log("row box", JSON.stringify(bb));
await p.mouse.click(bb.x + bb.width - 12, bb.y + bb.height / 2); await p.waitForTimeout(1500);
console.log("click row right-padding → pages", ctx.pages().length);
await b.close();
