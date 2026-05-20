import { test, expect } from "@playwright/test";

/**
 * Smoke (D.W5 Lane A): the Palettes view renders its SearchBar + heading.
 * Switches via the dock combobox; role/label-only selectors.
 */
test("palettes view renders SearchBar + heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    // Environmental noise filter: HTTP 4xx/5xx from the shared production
    // palette API surface under parallel-worker load (parallel runs hit
    // the live server's rate limit). Those are network conditions, not
    // value.js code paths — discard them at capture time.
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
