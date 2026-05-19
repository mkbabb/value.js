import { test, expect } from "@playwright/test";

/**
 * Smoke: the dock view-select switches panes.
 * Switches to the "Palettes" view, asserts the Palettes pane heading
 * ("My Palettes") becomes visible. Role/label-based selectors only.
 *
 * Note: the dock's collapsed-summary layer overlays the view-select
 * trigger and intercepts the synthetic pointer event; `force` dispatches
 * the click straight to the combobox (the reka-ui Select still opens).
 */
test("dock view-select switches to the Palettes pane", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await expect(viewSelect).toBeVisible();

    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Palettes", exact: true }).click();

    await expect(
        page.getByRole("heading", { name: "My Palettes" }),
    ).toBeVisible();
});
