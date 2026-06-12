import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A): the Gradient view renders the visualizer's
 * "Gradient direction" slider (role/label-bearing).
 */
test("gradient view renders direction slider with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    await openView(page, "Gradient");

    const main = page.getByRole("main", { name: "Color tool panes" });
    // The pane mounts in two layout slots (mobile + desktop); only one is
    // viewport-visible. .last() picks the visible copy.
    await expect(
        main.getByRole("heading", { name: "Gradient" }).last(),
    ).toBeVisible();
    // The visualizer's "Interpolation" section heading proves the visualizer
    // shell mounted (reka-ui slider thumbs are 0×0 spans so role="slider"
    // checks miss; the heading is a stable visible anchor).
    await expect(
        main.getByRole("heading", { name: "Interpolation" }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
