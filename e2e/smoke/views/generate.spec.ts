import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";

/**
 * Smoke (D.W5 Lane A): the Generate view renders the preset Select control
 * (aria-label="Generation preset" from GenerateControls).
 */
test("generate view renders preset Select with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Generate", exact: true }).click();

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Generate" }).last(),
    ).toBeVisible();
    await expect(
        main.getByRole("combobox", { name: "Generation preset" }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
