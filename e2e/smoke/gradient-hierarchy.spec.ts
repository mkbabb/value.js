import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";

/**
 * Gradient's hierarchy (critique R-05, R-08; R-04 is held by o21's removal
 * owner): the gradient is the largest thing on its pane, and the titles that
 * named what plainly is the stops and the CSS are gone, the copy action
 * seated in the code well's corner.
 *
 * Before: the ramp was a 40 px strip in an 830 px pane; "Stops" and "CSS"
 * headed the rail and the code well, the copy action on the CSS title's row.
 */

for (const width of [1440, 390]) {
    test(`the ramp leads the pane; no Stops or CSS title (${width})`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        await page.goto("/#/gradient");
        const main = mainPane(page);
        const rail = main.locator(".gradient-rail");
        await expect(rail).toBeVisible({ timeout: 60_000 });

        const railBox = (await rail.boundingBox())!;
        expect(railBox.height).toBeGreaterThanOrEqual(width === 390 ? 56 : 72);
        // Taller than any control on the pane (the selects and the slider).
        const fieldHeights = await main
            .locator("[role=combobox], .glass-slider")
            .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
        expect(Math.max(...fieldHeights)).toBeLessThan(railBox.height);

        await expect(main.getByRole("heading", { name: /^(Stops|CSS)$/ })).toHaveCount(0);

        const well = main.getByRole("textbox", { name: "Gradient CSS" });
        const copy = main.getByRole("button", { name: /^Copy rendered CSS/ });
        const wellBox = (await well.boundingBox())!;
        const copyBox = (await copy.boundingBox())!;
        expect(copyBox.y).toBeGreaterThanOrEqual(wellBox.y);
        expect(copyBox.x + copyBox.width).toBeLessThanOrEqual(wellBox.x + wellBox.width + 1);
        expect(copyBox.y + copyBox.height).toBeLessThanOrEqual(wellBox.y + wellBox.height);
    });
}
