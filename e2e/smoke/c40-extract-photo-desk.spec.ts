import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { extractedCard, loadExtractImage, LANDSCAPE, PORTRAIT } from "./fixtures/extract-image";

/**
 * Extract's image box on a desk (color-40 M; his FORTIETH order, and "the
 * subject fills the screen"): the photo is shown whole at its own shape, as on
 * a phone, under the desk's cap from `lg`: the height the first screen has
 * left once the extracted palette's swatches are on it, up to half the screen
 * and 32rem, never under the phone column's min(20rem, 40svh). Under the phone
 * cap a 3:4 photo at 1440x900 was 240x320 in a card about 780 wide; production
 * showed it card wide and cropped. Half the screen alone (450 at 900) pushed
 * the palette's swatches off the first screen.
 */

test.use({ viewport: { width: 1440, height: 900 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

async function photoBox(page: Page) {
    const zone = mainPane(page).getByRole("button", { name: "Sample colors from the image" });
    await expect(zone.locator("img")).toBeVisible({ timeout: 30_000 });
    await zone.locator("img").evaluate((img) => Promise.all(img.getAnimations().map((a) => a.finished)));
    return zone.evaluate((zone) => {
        const img = zone.querySelector("img")!;
        const z = zone.getBoundingClientRect();
        return { w: z.width, h: z.height, natural: img.naturalWidth / img.naturalHeight };
    });
}

/** How far the extracted palette's first swatch ends below the first screen (<= 0: on it). */
const swatchBelowFold = (page: Page) =>
    extractedCard(page)
        .locator(".swatch-button")
        .first()
        .evaluate((el) => el.getBoundingClientRect().bottom - innerHeight);

for (const photo of [PORTRAIT, LANDSCAPE]) {
    test(`a ${photo.width}x${photo.height} photo is shown whole under the desk cap, the swatches on the first screen`, async ({
        page,
    }) => {
        await loadExtractImage(page, photo);
        await page.waitForTimeout(500);
        const b = await photoBox(page);
        // The box is the photo: its shape is the photo's, so nothing is cropped.
        expect(Math.abs(b.w - b.h * b.natural), `box ${b.w}x${b.h}`).toBeLessThanOrEqual(1);
        // 100svh - 35rem = 340 px at 900: larger than the phone's 320.
        expect(b.h).toBeLessThanOrEqual(340.5);
        expect(b.h).toBeGreaterThan(330);
        expect(await swatchBelowFold(page), "the palette's first swatch is on the first screen").toBeLessThanOrEqual(0);
    });
}

test("a 720 px desk keeps the phone column's cap", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await loadExtractImage(page, PORTRAIT);
    await page.waitForTimeout(500);
    const b = await photoBox(page);
    // min(20rem, 40svh) = 288 at 720: the desk cap never goes under it.
    expect(b.h).toBeLessThanOrEqual(288.5);
    expect(b.h).toBeGreaterThan(287.5);
});
