import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const opened = [];
ctx.on("page", (p) => opened.push(p.url()));
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

async function open() {
    await page.locator('button[aria-label="Menu"]').tap();
    await page.waitForTimeout(500);
}

async function rowBox() {
    return await page.evaluate(() => {
        const row = [...document.querySelectorAll('[role="menu"] [role="menuitem"]')].find((e) => /GitHub/.test(e.textContent));
        const a = row.querySelector("a");
        const r = row.getBoundingClientRect(), ar = a.getBoundingClientRect();
        return { row: { x: r.x, y: r.y, w: r.width, h: r.height }, anchor: { x: ar.x, y: ar.y, w: ar.width, h: ar.height } };
    });
}

await open();
const b = await rowBox();
// tap the row's far-right dead zone (inside the row, outside the anchor)
const deadX = b.anchor.x + b.anchor.w + (b.row.x + b.row.w - (b.anchor.x + b.anchor.w)) / 2;
const deadY = b.row.y + b.row.h / 2;
await page.touchscreen.tap(deadX, deadY);
await page.waitForTimeout(1200);
const afterDead = { deadX: +deadX.toFixed(1), deadY: +deadY.toFixed(1), newPages: opened.length, menuOpen: await page.evaluate(() => !!document.querySelector('[role="menu"]')) };

// now tap the anchor itself
if (!afterDead.menuOpen) await open();
const b2 = await rowBox();
await page.touchscreen.tap(b2.anchor.x + b2.anchor.w / 2, b2.anchor.y + b2.anchor.h / 2);
await page.waitForTimeout(1500);
const afterAnchor = { newPagesTotal: opened.length, urls: opened };

console.log(JSON.stringify({ boxes: b, afterDead, afterAnchor }, null, 2));
await browser.close();
