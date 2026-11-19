import { test, expect } from "@playwright/test";

/**
 * Phone text fields are 16 px or larger (smoke-mobile, Pixel 7 at 390, a
 * coarse pointer). Under 16 px iOS zooms the page when a field takes focus.
 * glass's own inputs hold the floor; the Gradient CSS field is the site's
 * own contenteditable and was 14 px.
 */

test.use({ viewport: { width: 390, height: 844 } });

test("the Gradient CSS field is at least 16 px on a phone", async ({ page }) => {
    await page.goto("/#/gradient");
    const field = page.getByRole("textbox", { name: "Gradient CSS" });
    await expect(field).toBeVisible({ timeout: 60_000 });
    const px = await field.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(px).toBeGreaterThanOrEqual(16);
});
