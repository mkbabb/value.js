import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";

/**
 * Forced colours keep the data ramps (critique C-32).
 *
 * Under forced colours the picker's channel tracks lost their ramps (bare
 * black bars) and the gradient's render tile was an empty box: both paint
 * colour content, and neither was on the keep-colour roster.
 */

test.use({ viewport: { width: 1440, height: 900 } });

test("the channel ramps and the gradient tile keep their colour under forced colours", async ({ page }) => {
    await page.emulateMedia({ forcedColors: "active" });

    await page.goto("/#/");
    await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
    const tracks = page.locator('.channel-slider .slider-track');
    await expect(tracks.first()).toBeVisible();
    const channel = await tracks.evaluateAll((els) =>
        els.map((el) => {
            const cs = getComputedStyle(el);
            return { adjust: cs.forcedColorAdjust, image: cs.backgroundImage };
        }),
    );
    expect(channel.length).toBeGreaterThanOrEqual(3);
    for (const t of channel) {
        expect(t.adjust).toBe("none");
        expect(t.image).toContain("gradient");
    }

    await page.goto("/#/gradient");
    const tile = page.getByTestId("gradient-render-tile");
    await expect(tile).toBeVisible({ timeout: 60_000 });
    const paint = await tile.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { adjust: cs.forcedColorAdjust, image: cs.backgroundImage };
    });
    expect(paint.adjust).toBe("none");
    expect(paint.image).toContain("gradient");
});
