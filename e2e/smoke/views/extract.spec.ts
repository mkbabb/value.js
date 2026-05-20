import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): the Extract view renders the image drop-zone
 * (role="button" + keyboard a11y from W5).
 */
test("extract view renders drop-zone with zero console errors", async ({
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
    await page.getByRole("option", { name: "Extract", exact: true }).click();

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Extract" }).last(),
    ).toBeVisible();
    // ImageDropZone — role="button" with the upload aria-label from W5 a11y.
    // Two copies render (mobile + desktop layout slots); .last() picks the
    // viewport-visible one.
    await expect(
        main.getByRole("button", { name: /Upload image/i }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
