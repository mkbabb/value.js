import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #11 — user-status (admin user-state change).
 *
 * The AdminUsersPanel exposes Delete user + Delete palettes affordances
 * but no UI-surfaced status-toggle (the `setUserStatus` API in
 * lib/palette/api.ts exists but has zero consumers in demo/ — filed as
 * an E.W3 Lane A finding). The closest user-state-change exercise
 * present in the UI is the "Delete user" path (DELETE /admin/users/<slug>),
 * which is the strongest mutating-state coverage available; this spec
 * asserts that mutation reaches the backend.
 */
test("admin delete user DELETEs /admin/users/<slug>", async ({ page }) => {
    let deleteCalled = false;
    await page.route("**/admin/users?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [{ slug: "doomed-user-one", paletteCount: 0 }],
                total: 1,
                limit: 50,
                offset: 0,
            }),
        }),
    );
    await page.route("**/admin/users/doomed-user-one", (route) => {
        if (route.request().method() === "DELETE") {
            deleteCalled = true;
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ deleted: true }),
            });
        }
        return route.continue();
    });

    await page.goto("/#/admin/users");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page.getByRole("button", { name: "Delete user doomed-user-one" }).last().click();
    // Confirmation dialog renders (delete is destructive); confirm via the
    // "Delete user" action button in the dialog footer.
    await page.getByRole("button", { name: /Delete user/ }).last().click();
    await expect.poll(() => deleteCalled).toBe(true);
});
