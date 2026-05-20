import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — admin-audit smoke spec.
 * Asserts the W5-introduced `aria-label="Refresh audit log"` button.
 */
test("admin-audit view renders Refresh button + zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/audit");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    // PaneHeader emits two matching headings (mobile + desktop slots both
    // mount the same admin pane; one is `lg:hidden`); pick the visible one.
    await expect(page.getByRole("heading", { name: "Audit Log" }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Refresh audit log" }).first()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
