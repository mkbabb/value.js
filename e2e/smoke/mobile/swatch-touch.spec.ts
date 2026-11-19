import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "../fixtures/dock";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";
import { loadExtractImage } from "../fixtures/extract-image";

/**
 * Palette swatches on a phone (color-40 L, smoke-mobile: a coarse pointer at
 * 390). A swatch's seat is one length on both axes, so the paint is never a
 * tall oval, and no seat is under the 44 px touch target.
 *
 * Today glass's icon-only Button holds `min-block-size` at the coarse control
 * rung while the swatch sets only its width and height classes: the Current
 * palette drew 44x66 and Generate 56x60.
 */

test.use({ viewport: { width: 390, height: 844 } });

async function swatchSeats(page: Page) {
    return mainPane(page)
        .locator(".swatch-button")
        .evaluateAll((els) =>
            els
                .map((el) => el.getBoundingClientRect())
                .filter((r) => r.width > 0 && r.height > 0)
                .map((r) => ({ w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 })),
        );
}

function expectSquareTargets(seats: { w: number; h: number }[], where: string) {
    for (const s of seats) {
        expect(Math.abs(s.w - s.h), `${where}: a ${s.w}x${s.h} seat is not square`).toBeLessThanOrEqual(1);
        expect(Math.min(s.w, s.h), `${where}: a ${s.w}x${s.h} seat is under the touch target`).toBeGreaterThanOrEqual(44);
    }
}

for (const [where, hash, required] of [
    ["Home", "/", false],
    ["Palettes", "/#/palettes", false],
    ["Generate", "/#/generate", true],
    ["Mix", "/#/mix", false],
] as const) {
    test(`every swatch seat on ${where} is square and 44 px or more`, async ({ page }) => {
        await routeBrowsePalettes(page);
        await page.goto(hash, { waitUntil: "domcontentloaded" });
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
        if (required) await expect(mainPane(page).locator(".swatch-button").first()).toBeVisible({ timeout: 30_000 });
        await page.waitForTimeout(400);
        const seats = await swatchSeats(page);
        if (required) expect(seats.length).toBeGreaterThan(0);
        expectSquareTargets(seats, where);
    });
}

test("every swatch seat on Extract's result is square and 44 px or more", async ({ page }) => {
    await loadExtractImage(page);
    await page.waitForTimeout(400);
    const seats = await swatchSeats(page);
    expect(seats.length).toBeGreaterThan(0);
    expectSquareTargets(seats, "Extract");
});
