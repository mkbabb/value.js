import { test, expect } from "@playwright/test";
import { expandDock, mainPane } from "./fixtures/dock";

/**
 * Home is the dock's first seat on every view (critique C-06; the 12 Nov law,
 * Home on every page).
 *
 * The first seat was the view select wearing the current view's glyph (a
 * magnifier on Browse, a camera on Extract), and Home was a row behind it.
 * Now Home is a seat of its own, first in the main layer; the select lists
 * the other pages, so Home is never shown twice.
 */

for (const width of [1440, 390]) {
    test(`the dock's first seat is Home, from any view (${width})`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        await page.goto("/#/extract");
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
        await expandDock(page);

        const dock = page.locator(".glass-dock");
        const seats = dock.locator(".dock-layer.is-active").locator("button, [role=combobox]");
        await expect(seats.first()).toHaveAccessibleName("Home");

        const home = dock.getByRole("button", { name: "Home", exact: true });
        await expect(home).not.toHaveAttribute("aria-current", "page");
        await home.click();
        await expect(page.getByRole("main", { name: "Home" })).toBeVisible();
        await expect(home).toHaveAttribute("aria-current", "page");

        // The select lists the other pages, not Home a second time.
        await page.getByRole("combobox", { name: "Select view" }).click();
        await expect(page.getByRole("option", { name: "Palettes", exact: true })).toBeVisible();
        await expect(page.getByRole("option", { name: "Home", exact: true })).toHaveCount(0);
    });
}
