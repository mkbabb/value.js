import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): the Generate view renders the preset Select control
 * (aria-label="Generation preset" from GenerateControls).
 */
test("generate view renders preset Select with zero console errors", async ({
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
