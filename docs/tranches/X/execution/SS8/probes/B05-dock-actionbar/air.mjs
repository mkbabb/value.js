// SERVED MODEL: claude-opus-5-5 — SS-8 B05 CURE diagnostic: the action face's separator air (0125).
import { chromium } from "playwright";
const ORIGIN = process.env.ORIGIN;
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    const page = await ctx.newPage();
    await page.goto(ORIGIN + "/#/", { waitUntil: "load", timeout: 240000 });
    await page.waitForTimeout(2500);
    const b = await page.locator(".glass-dock").boundingBox();
    await page.mouse.move(b.x + 3, b.y + b.height / 2);
    await page.locator('[aria-label="Toggle action bar"]').click();
    await page.waitForTimeout(900);
    await page.mouse.move(b.x + 3, b.y + b.height / 2);
    console.log(JSON.stringify(await page.evaluate(() => {
        const row = document.querySelector('[data-testid="scene-action-row"]');
        const root = row.closest(".dock-crossfade").parentElement;
        const fc = root.closest(".dock-face-content");
        const r = (e) => { const x = e.getBoundingClientRect(); return [+x.left.toFixed(1), +x.right.toFixed(1)]; };
        const m = (e) => { const c = getComputedStyle(e); return `${c.marginLeft}/${c.marginRight} w${e.getBoundingClientRect().width.toFixed(1)}`; };
        return {
            fcm: [...fc.children].map(m), rootm: [...root.children].map(m),
            fc: [...fc.children].map((c) => ({ cls: String(c.className).slice(0, 50), box: r(c), ml: getComputedStyle(c).marginLeft, mr: getComputedStyle(c).marginRight })),
            root: [...root.children].map((c) => ({ cls: String(c.className).slice(0, 50), box: r(c), ml: getComputedStyle(c).marginLeft, mr: getComputedStyle(c).marginRight })),
            rootGap: getComputedStyle(root).columnGap, fcGap: getComputedStyle(fc).columnGap,
        };
    }), null, 0));
} finally { await browser.close(); }
