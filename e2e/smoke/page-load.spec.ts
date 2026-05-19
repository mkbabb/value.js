import { test, expect } from "@playwright/test";

/**
 * Smoke: the app shell mounts cleanly.
 * Asserts the main a11y landmark renders, no uncaught console errors fire,
 * and the navigation landmark + a color-space select control are present.
 *
 * Note: the <nav> landmark wraps a position:fixed dock, so its own box
 * collapses to zero height — it is asserted attached (present in the
 * accessibility tree), and its rendered content is proven separately via
 * the visible "Select view" combobox it contains.
 */
test("page loads with shell landmarks and zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => {
        consoleErrors.push(err.message);
    });

    await page.goto("/");

    // Primary landmark — proves the pane shell mounted.
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // Navigation landmark — present in the a11y tree (wraps the fixed dock).
    await expect(
        page.getByRole("navigation", { name: "Application navigation" }),
    ).toBeAttached();

    // The dock view-select inside the nav renders visibly.
    await expect(
        page.getByRole("combobox", { name: "Select view" }),
    ).toBeVisible();

    // A color-space select control is present in the pane content.
    await expect(
        main.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
