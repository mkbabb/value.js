/**
 * The FORTIETH order, C-1 (and P: "such that we can ACTUALLY scroll the
 * screen"): on an upright phone the document is the one scroller.
 *
 * Measured on production at 390: Home's page scrolled until the picker left
 * the top, then the About card took the swipe over with its title pinned (a
 * 5,283 px port in 485 px), so where a swipe went depended on where it
 * started. The contract: at 390x844 and 375x667, on every route, no element
 * inside `<main>` both overflows and scrolls on the block axis.
 */
import { test, expect, type Page } from "@playwright/test";

const ROUTES = [
    "#/",
    "#/palettes",
    "#/browse",
    "#/extract",
    "#/mix",
    "#/generate",
    "#/gradient",
    "#/atmosphere",
    "#/blob",
] as const;

/** Every element inside main that scrolls its own block axis, with its sizes. */
function innerScrollers(page: Page) {
    return page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("main *")]
            .filter((el) => {
                const oy = getComputedStyle(el).overflowY;
                return (oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1;
            })
            .map((el) => {
                const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
                return `${el.tagName.toLowerCase()}${cls ? `.${cls}` : ""} ${el.scrollHeight} in ${el.clientHeight}`;
            }),
    );
}

async function settled(page: Page) {
    await page.waitForFunction(
        async () => {
            const row = document.querySelector(".pane-container");
            if (!row || row.querySelector(".vj-enter-enter-active, .vj-enter-leave-active")) return false;
            const running = row
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running" && Number.isFinite(a.effect?.getComputedTiming().endTime ?? Infinity));
            await Promise.allSettled(running.map((a) => a.finished));
            return true;
        },
        undefined,
        { timeout: 30_000 },
    );
    await page.waitForTimeout(400);
}

for (const [width, height] of [
    [390, 844],
    [375, 667],
] as const) {
    test(`c40 · ${width}x${height} upright: the document is the one scroller on every route`, async ({ page }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width, height });
        await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
        await page.locator(".pane-container > .pane-wrapper").first().waitFor({ timeout: 60_000 });
        const found: Record<string, string[]> = {};
        for (const hash of ROUTES) {
            await page.evaluate((h) => (location.hash = h), hash);
            await page.waitForTimeout(300);
            await settled(page);
            const inner = await innerScrollers(page);
            if (inner.length) found[hash] = inner;
        }
        expect(found, "elements inside main that scroll their own block axis").toEqual({});
    });
}
