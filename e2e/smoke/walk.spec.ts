import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "./fixtures/env-noise";
import { openView } from "./fixtures/dock";

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

    const views = [
        "Palettes",
        "Browse",
        "Extract",
        "Generate",
        "Gradient",
        "Mix",
    ];
    for (const name of views) {
        await openView(page, name);
        // Main landmark must remain visible across the transition.
        await expect(main).toBeVisible();
    }
    // Return to the picker (label "Home" per VIEW_MAP).
    await openView(page, "Home");
    await expect(main).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
