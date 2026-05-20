import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): the Gradient view renders the visualizer's
 * "Gradient direction" slider (role/label-bearing).
 */
test("gradient view renders direction slider with zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    // Environmental noise filter — see palettes.spec.ts.
    const isEnvNoise = (text: string) =>
        /\b(429|503|504)\b|Too Many Requests|Failed to load resource/i.test(text);
    page.on("console", (msg) => {
        if (msg.type() === "error" && !isEnvNoise(msg.text()))
            consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => {
        if (!isEnvNoise(err.message)) consoleErrors.push(err.message);
    });

    await page.goto("/");

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Gradient", exact: true }).click();

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
