import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A): the Mix view renders its pane heading.
 * Picker is the left pane in mix mode; right pane is the Mix surface.
 */
test("mix view renders Mix heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    await openView(page, "Mix");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Mix" }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
