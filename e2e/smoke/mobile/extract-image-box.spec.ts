import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "../fixtures/dock";
import { loadExtractImage, PORTRAIT } from "../fixtures/extract-image";

/**
 * Extract's image box on a phone (color-40 M and I-1; his FORTIETH order: "the
 * extract page, on scroll, resizes the entire image and container?" and
 * "remove the extra open camera button on extract").
 *
 * The box is the photo, whole, at its own shape, under min(20rem, 40svh). Its
 * cap was in dvh, which Safari's bars move during a scroll (265.6, 300 and
 * 320 px at visible heights 664, 750 and 844), and it had no real height, so
 * the image overflowed it and only its middle 73 % showed.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

async function photoBox(page: Page) {
    const zone = mainPane(page).getByRole("button", { name: "Sample colors from the image" });
    // the photo is in the box once its image has decoded and its morph in
    // (a scale) has landed
    await expect(zone.locator("img")).toBeVisible({ timeout: 30_000 });
    await zone.locator("img").evaluate((img) => Promise.all(img.getAnimations().map((a) => a.finished)));
    return zone.evaluate((zone) => {
            const img = zone.querySelector("img")!;
            const z = zone.getBoundingClientRect();
            // the photo fills the box inside its 1 px frame
            const inner = { w: zone.clientWidth, h: zone.clientHeight };
            const i = img.getBoundingClientRect();
            const actions = document.querySelector('[role="group"][aria-label="Image actions"]');
            return {
                zone: { w: z.width, h: z.height, top: z.top },
                inner,
                img: { w: i.width, h: i.height },
                natural: img.naturalWidth / img.naturalHeight,
                below: actions ? actions.getBoundingClientRect().top - z.top : null,
            };
        });
}

test("a 3:4 photo is shown whole, at its own shape, under the cap", async ({ page }) => {
    await loadExtractImage(page, PORTRAIT);
    await page.waitForTimeout(500);
    const b = await photoBox(page);
    // The box is the photo: its shape is the photo's, so nothing is cropped.
    expect(Math.abs(b.zone.w - b.zone.h * b.natural), `box ${b.zone.w}x${b.zone.h}`).toBeLessThanOrEqual(1);
    expect(Math.abs(b.img.w - b.inner.w)).toBeLessThanOrEqual(1);
    expect(Math.abs(b.img.h - b.inner.h)).toBeLessThanOrEqual(1);
    // Under min(20rem, 40svh): 320 px at 844.
    expect(b.zone.h).toBeLessThanOrEqual(320.5);
    expect(b.zone.h).toBeGreaterThan(300);
});

test("a scroll never resizes the box or moves what sits under it", async ({ page }) => {
    await loadExtractImage(page, PORTRAIT);
    await page.waitForTimeout(500);
    const rest = await photoBox(page);
    await page.mouse.move(195, 640);
    for (const dy of [120, 240, 360, 0]) {
        await page.mouse.wheel(0, dy === 0 ? -720 : 120);
        await page.waitForTimeout(150);
        const b = await photoBox(page);
        expect(Math.abs(b.zone.h - rest.zone.h)).toBeLessThanOrEqual(0.5);
        expect(Math.abs(b.zone.w - rest.zone.w)).toBeLessThanOrEqual(0.5);
        expect(Math.abs((b.below ?? 0) - (rest.below ?? 0))).toBeLessThanOrEqual(0.5);
    }
});

test("one camera: the actions are Replace image and Reset on one line, and no in-page camera", async ({ page }) => {
    await page.goto("/#/extract", { waitUntil: "domcontentloaded" });
    await expect(mainPane(page).getByRole("button", { name: "Upload image" })).toBeVisible({ timeout: 60_000 });
    await expect(mainPane(page).getByRole("group", { name: "Image actions" })).toHaveCount(0);
    await loadExtractImage(page, PORTRAIT);
    const row = mainPane(page).getByRole("group", { name: "Image actions" });
    const buttons = row.getByRole("button");
    await expect(buttons).toHaveText(["Replace image", "Reset"]);
    const tops = await buttons.evaluateAll((els) => new Set(els.map((e) => Math.round(e.getBoundingClientRect().top))).size);
    expect(tops, "one line at 390").toBe(1);
    await expect(mainPane(page).getByRole("button", { name: /camera/i })).toHaveCount(0);
    await expect(mainPane(page).locator("video")).toHaveCount(0);
});
