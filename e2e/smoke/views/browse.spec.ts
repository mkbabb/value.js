import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * Smoke (D.W5 Lane A): the Browse view renders the PaletteCardGrid (role="list").
 * Single-root invariant from B.W1 — guard against regression.
 */
test("browse view renders PaletteCardGrid + heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Browse", exact: true }).click();

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Browse" }).last(),
    ).toBeVisible();
    // PaletteCardGrid is role="list" — proves the single-root + grid mounted.
    await expect(main.getByRole("list").last()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
