import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * Smoke (D.W5 Lane A): the Palettes view renders its SearchBar + heading.
 * Switches via the dock combobox; role/label-only selectors.
 */
test("palettes view renders SearchBar + heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Palettes", exact: true }).click();

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "My Palettes" }),
    ).toBeVisible();
    // Two inputs share the placeholder (PalettesPane + BrowsePane both render);
    // assert at least one is visible via the heading-anchored .last() lookup.
    await expect(
        main.getByPlaceholder("Search palettes...").last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
