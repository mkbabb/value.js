import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { extractedCard, loadExtractImage, LANDSCAPE, PORTRAIT } from "./fixtures/extract-image";

/**
 * Extract's image box on a desk (color-40 M; his FORTIETH order, and "the
 * subject fills the screen"): the photo is shown whole at its own shape, as on
 * a phone, but under the desk's cap, min(32rem, 50svh, 100svh - 27rem) from
 * `lg`, not the phone column's min(20rem, 40svh). Under the phone cap a 3:4
 * photo at 1440x900 was 238x318 in a card about 780 wide; production showed
 * it card wide and cropped.
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

for (const photo of [PORTRAIT, LANDSCAPE]) {
    test(`a ${photo.width}x${photo.height} photo is shown whole under the desk cap`, async ({ page }) => {
        await loadExtractImage(page, photo);
        await page.waitForTimeout(500);
        const b = await photoBox(page);
        // The box is the photo: its shape is the photo's, so nothing is cropped.
        expect(Math.abs(b.w - b.h * b.natural), `box ${b.w}x${b.h}`).toBeLessThanOrEqual(1);
        // Under min(32rem, 50svh, 100svh - 27rem): 450 px at 900, never the phone's 320.
        expect(b.h).toBeLessThanOrEqual(450.5);
        expect(b.h).toBeGreaterThan(440);
    });
}

test("a 720 px desk keeps the result's strip on the first screen", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await loadExtractImage(page, PORTRAIT);
    await page.waitForTimeout(500);
    const b = await photoBox(page);
    // 100svh - 27rem = 288 px at 720: the phone column's own cap.
    expect(b.h).toBeLessThanOrEqual(288.5);
    const strip = await extractedCard(page).evaluate((el) => el.getBoundingClientRect().top + 40 - innerHeight);
    expect(strip, "the strip's foot is above the fold").toBeLessThanOrEqual(0);
});
