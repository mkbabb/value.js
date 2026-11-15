import { test, expect, type CDPSession, type Page } from "@playwright/test";

/**
 * The picker under a finger (smoke-mobile, Pixel 7 at 390): a drag tracks
 * from the first touch, and a vertical swipe that starts on a channel slider
 * scrolls the page and leaves the value alone. Before, the first touch only
 * "armed" each control (the drag moved nothing), and once armed a vertical
 * swipe moved the thumb to the finger and held the page still.
 *
 * Touches are dispatched through CDP (`Input.dispatchTouchEvent`), the
 * browser's own touch path, so `touch-action` and the pan decide exactly as
 * they would under a finger.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

async function boot(page: Page): Promise<CDPSession> {
    await page.goto("/", { waitUntil: "load" });
    await page.locator(".spectrum-picker").first().waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1500);
    return page.context().newCDPSession(page);
}

function touch(cdp: CDPSession) {
    return (type: "touchStart" | "touchMove" | "touchEnd", x = 0, y = 0) =>
        cdp.send("Input.dispatchTouchEvent", {
            type,
            touchPoints: type === "touchEnd" ? [] : [{ x, y }],
        });
}

test("the spectrum dot follows the first touch", async ({ page }) => {
    const t = touch(await boot(page));
    const plane = await page.locator(".spectrum-picker").first().boundingBox();
    expect(plane).not.toBeNull();
    const x0 = plane!.x + 40;
    const y0 = plane!.y + plane!.height - 30;
    await t("touchStart", x0, y0);
    let x = x0;
    let y = y0;
    for (let i = 1; i <= 12; i++) {
        x = x0 + i * 10;
        y = y0 - i * 4;
        await t("touchMove", x, y);
        await page.waitForTimeout(30);
    }
    await page.waitForTimeout(100);
    const dot = await page.locator(".spectrum-dot").first().boundingBox();
    await t("touchEnd");
    const err = Math.hypot(dot!.x + dot!.width / 2 - x, dot!.y + dot!.height / 2 - y);
    expect(err, "dot distance from the finger after the first drag (px)").toBeLessThan(8);
});

test("a sideways touch drags a channel thumb from the first touch", async ({ page }) => {
    const t = touch(await boot(page));
    const thumb = page.locator('[role=slider][aria-label="L channel"]').first();
    await thumb.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const track = await page.locator(".channel-slider").first().boundingBox();
    const tb = await thumb.boundingBox();
    const y = tb!.y + tb!.height / 2;
    const x0 = track!.x + track!.width * 0.3;
    await t("touchStart", x0, y);
    const centre = (b: { x: number; width: number }) => b.x + b.width / 2;
    const gap: number[] = [];
    for (let i = 1; i <= 20; i++) {
        const x = x0 + i * 4;
        await t("touchMove", x, y);
        await page.waitForTimeout(30);
        if (i % 5 === 0) gap.push(centre((await thumb.boundingBox())!) - x);
    }
    await t("touchEnd");
    // From the first sample (20 px of travel) the thumb sits at the finger,
    // and it holds the same place under it as the finger moves (1:1). The
    // thumb's centre sits a few px from the press point by the slider's own
    // contain alignment, the same for a mouse press on the track.
    const note = `thumb centre minus finger, px (${gap.map((g) => g.toFixed(1)).join(", ")})`;
    for (const g of gap) expect(Math.abs(g), note).toBeLessThan(16);
    expect(Math.max(...gap) - Math.min(...gap), note).toBeLessThan(6);
});

test("a vertical swipe on a slider scrolls the page and keeps the value", async ({ page }) => {
    const t = touch(await boot(page));
    const thumb = page.locator('[role=slider][aria-label="L channel"]').first();
    await thumb.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const track = await page.locator(".channel-slider").first().boundingBox();
    const tb = await thumb.boundingBox();
    const y = tb!.y + tb!.height / 2;
    // A sideways drag first (on the old gate this armed the slider), then,
    // straight after it, a vertical swipe that starts on the track.
    const xd = track!.x + track!.width * 0.4;
    await t("touchStart", xd, y);
    for (let i = 1; i <= 6; i++) {
        await t("touchMove", xd + i * 4, y);
        await page.waitForTimeout(25);
    }
    await t("touchEnd");
    await page.waitForTimeout(300);
    const before = await thumb.getAttribute("aria-valuenow");
    const scrollBefore = await page.evaluate(() => scrollY);
    const x = track!.x + track!.width * 0.8;
    await t("touchStart", x, y);
    for (let i = 1; i <= 15; i++) {
        await t("touchMove", x + i * 0.6, y - i * 8);
        await page.waitForTimeout(20);
    }
    await t("touchEnd");
    await page.waitForTimeout(500);
    expect(await thumb.getAttribute("aria-valuenow"), "the value is unchanged").toBe(before);
    expect((await page.evaluate(() => scrollY)) - scrollBefore, "the page scrolled").toBeGreaterThan(40);
});
