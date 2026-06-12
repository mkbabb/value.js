import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A): the Palettes view renders its SearchBar + heading.
 * Switches via the dock combobox; role/label-only selectors.
 */
test("palettes view renders SearchBar + heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    await openView(page, "Palettes");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "My Palettes" }),
    ).toBeVisible();
    // The pane mounts in both layout slots (the off-breakpoint copy is
    // `display:none` inside `.pane-wrapper.hidden`); DOM order is not stable
    // across the responsive wrappers, so target the actually-visible copy by
    // its rendered visibility rather than a positional `.last()`.
    await expect(
        main.getByPlaceholder("Search palettes...").filter({ visible: true }),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
