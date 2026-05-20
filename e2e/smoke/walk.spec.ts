import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): walk every user-facing view in sequence.
 * Exercises `usePaneRouter`'s component registry under transition load —
 * any leaked watcher, missing dispose, or stale-prop write would fire a
 * console error during one of the swaps.
 */
test("walk all user views sequentially with zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    // Environmental noise filter — see views/palettes.spec.ts.
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
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    const views = [
        "Palettes",
        "Browse",
        "Extract",
        "Generate",
        "Gradient",
        "Mix",
    ];
    for (const name of views) {
        await viewSelect.click({ force: true });
        await page.getByRole("option", { name, exact: true }).click();
        // Main landmark must remain visible across the transition.
        await expect(main).toBeVisible();
    }
    // Return to the picker (label "Home" per VIEW_MAP).
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Home", exact: true }).click();
    await expect(main).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
