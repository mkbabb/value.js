import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — admin-names smoke spec.
 */
test("admin-names view renders SearchBar + zero console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/names");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    // The pane mounts in BOTH mobile (`lg:hidden`) + desktop slots; the
    // mobile copy renders first in DOM, so `.last()` picks the visible
    // desktop one at the 1280×720 smoke viewport.
    await expect(page.getByRole("heading", { name: "Names" }).last()).toBeVisible();
    await expect(page.getByPlaceholder(/Search color names/i).last()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
