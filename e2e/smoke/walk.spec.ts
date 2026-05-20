import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "./fixtures/env-noise";

/**
 * Smoke (D.W5 Lane A): walk every user-facing view in sequence.
 * Exercises `usePaneRouter`'s component registry under transition load —
 * any leaked watcher, missing dispose, or stale-prop write would fire a
 * console error during one of the swaps.
 */
test("walk all user views sequentially with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    const views = [
        "Palettes",
        "Browse",
        "Extract",
        "Generate",
        "Gradient",
        "Mix",
    ];
    for (const name of views) {
        await viewSelect.click({ force: true });
        await page.getByRole("option", { name, exact: true }).click();
        // Main landmark must remain visible across the transition.
        await expect(main).toBeVisible();
    }
    // Return to the picker (label "Home" per VIEW_MAP).
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Home", exact: true }).click();
    await expect(main).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
