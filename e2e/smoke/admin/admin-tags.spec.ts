import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — admin-tags smoke spec.
 * Asserts the W5-introduced `aria-label="Refresh tags"` button.
 */
test("admin-tags view renders Refresh button + zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/tags");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    // PaneHeader emits two matching headings (mobile + desktop slots both
    // mount the same admin pane; one is `lg:hidden`); pick the visible one.
    await expect(page.getByRole("heading", { name: "Tags" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh tags" }).first()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
