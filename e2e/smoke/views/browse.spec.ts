import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): the Browse view renders the PaletteCardGrid (role="list").
 * Single-root invariant from B.W1 — guard against regression.
 */
test("browse view renders PaletteCardGrid + heading with zero console errors", async ({
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
    await page.getByRole("option", { name: "Browse", exact: true }).click();

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Browse" }).last(),
    ).toBeVisible();
    // PaletteCardGrid is role="list" — proves the single-root + grid mounted.
    await expect(main.getByRole("list").last()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
