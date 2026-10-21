// glass-10.1.1 live re-read (keyframes): the scene fallback's Skeleton shimmer and the
// dock menus' z rung with the consumer `z-popover` class retired. Headless chromium,
// one browser, a context per cell, closed in finally.
// Usage (from the keyframes repo, so @playwright/test resolves): node <this> <origin> <out.json>
import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const [origin, out] = process.argv.slice(2);
const cells = [
    { name: "1440", viewport: { width: 1440, height: 900 } },
    { name: "390", viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
];
const result = {};
const browser = await chromium.launch({ headless: true });
try {
    for (const cell of cells) {
        const ctx = await browser.newContext({ viewport: cell.viewport, hasTouch: !!cell.hasTouch, isMobile: !!cell.isMobile });
        try {
            const page = await ctx.newPage();
            let release;
            const held = new Promise((r) => (release = r));
            await page.route(/AmigaScene\.vue/, async (r) => {
                await held;
                await r.continue().catch(() => {});
            });
            // Deep link into the held scene: the Suspense fallback stands until release.
            await page.goto(`${origin}/#/amiga`, { waitUntil: "load", timeout: 120_000 });
            let skeleton = null;
            try {
                const s = page.locator(".scene-skeleton .skeleton").first();
                await s.waitFor({ state: "attached", timeout: 20_000 });
                const read = () =>
                    s.evaluate((el) => {
                        const a = getComputedStyle(el, "::after");
                        return { shimmer: el.getAttribute("data-shimmer"), afterAnimation: a.animationName, afterTransform: a.transform,
                            hostText: el.closest(".scene-skeleton")?.textContent.trim() };
                    });
                const t0 = await read();
                await page.waitForTimeout(400);
                const t1 = await read();
                skeleton = { t0, t1, moving: t0.afterTransform !== t1.afterTransform };
            } catch (e) {
                const host = await page.evaluate(() => ({ hash: location.hash,
                    sceneHostHtml: (document.querySelector("[data-scene-host], .scene-host, main")?.innerHTML ?? "").slice(0, 400),
                    skeletons: document.querySelectorAll(".scene-skeleton").length }));
                skeleton = { error: String(e).slice(0, 200), host };
            } finally {
                release();
                await page.unrouteAll({ behavior: "ignoreErrors" });
            }

            let menu = null;
            try {
                await page.waitForTimeout(1500);
                const summary = page.getByRole("button", { name: "Scene" }).first();
                if (await summary.isVisible().catch(() => false)) {
                    if (cell.hasTouch) await summary.tap().catch(() => {});
                    else await summary.hover().catch(() => {});
                    await page.waitForTimeout(800);
                }
                const trigger = page.locator('[aria-label="@mbabb menu"]').first();
                await trigger.click({ timeout: 10_000 });
                const content = page.locator("[role='menu']").first();
                await content.waitFor({ timeout: 5000 });
                await page.waitForTimeout(700); // past the reveal
                menu = await content.evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    const pts = [[r.left + 12, r.top + 12], [r.right - 12, r.top + 12], [r.left + 12, r.bottom - 12], [r.right - 12, r.bottom - 12], [r.left + r.width / 2, r.top + r.height / 2]];
                    const misses = pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return el.contains(h) ? null : (h?.tagName + "." + String(h?.className).slice(0, 60)); });
                    return { hasZPopoverClass: /\bz-popover\b/.test(el.className), zIndex: getComputedStyle(el).zIndex,
                        wrapperZ: getComputedStyle(el.parentElement).zIndex, rect: [r.left, r.top, r.width, r.height].map(Math.round), misses };
                });
                await page.keyboard.press("Escape");
            } catch (e) {
                menu = { error: String(e).slice(0, 300) };
            }
            result[cell.name] = { skeleton, menu };
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
writeFileSync(out, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 1).slice(0, 3000));
