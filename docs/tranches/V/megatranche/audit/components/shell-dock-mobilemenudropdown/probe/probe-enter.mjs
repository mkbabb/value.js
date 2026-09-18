import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

const opened = [];
ctx.on("page", (p) => opened.push(p.url()));

await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.locator('button[aria-label="Menu"]').tap();
await page.waitForTimeout(500);

// walk to GitHub
await page.keyboard.press("ArrowDown"); // Login
await page.keyboard.press("ArrowDown"); // Share color
await page.keyboard.press("ArrowDown"); // GitHub
const focused = await page.evaluate(() => (document.activeElement.textContent || "").trim().slice(0, 12));
const before = { url: page.url(), popups: opened.length };
await page.keyboard.press("Enter");
await page.waitForTimeout(1200);
const after = {
    focusedRow: focused,
    urlChanged: page.url() !== before.url,
    newPages: opened.length - before.popups,
    menuStillOpen: await page.evaluate(() => !!document.querySelector('[role="menu"]')),
};

// contrast: TAP the same row
await page.locator('[role="menu"] [role="menuitem"]', { hasText: "GitHub" }).first().tap().catch(() => {});
await page.waitForTimeout(1200);
after.newPagesAfterTapOnRow = opened.length - before.popups;

console.log(JSON.stringify(after, null, 2));
await browser.close();
