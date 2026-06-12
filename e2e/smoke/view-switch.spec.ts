import { test, expect } from "@playwright/test";
import { openView } from "./fixtures/dock";

/**
 * Smoke: the dock view-select switches panes.
 * Switches to the "Palettes" view, asserts the Palettes pane heading
 * ("My Palettes") becomes visible. Role/label-based selectors only.
 *
 * The open is the real-user idiom (`openView`): the desktop dock boots
 * expanded (N.W5 Defect-B), so the `Select view` combobox is reachable on
 * first paint and a REAL click opens it — no `force:true` (which reka-ui 2.9
 * ignores).
 */
test("dock view-select switches to the Palettes pane", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    await openView(page, "Palettes");

    await expect(
        page.getByRole("heading", { name: "My Palettes" }),
    ).toBeVisible();
});
