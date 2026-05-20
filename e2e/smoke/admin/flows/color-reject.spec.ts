import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #14 — color-reject. Names panel pending tab:
 * mock /admin/queue to return one pending proposal, click Reject,
 * assert POST /admin/colors/<id>/reject fires.
 */
test("admin reject color name POSTs /admin/colors/<id>/reject", async ({ page }) => {
    let rejectCalled = false;
    await page.route("**/admin/queue**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [{
                    id: "prop-reject-1",
                    name: "ew3-reject-target",
                    css: "#abcdef",
                    status: "pending",
                }],
                total: 1,
                limit: 50,
                offset: 0,
            }),
        }),
    );
    await page.route("**/admin/colors/prop-reject-1/reject", (route) => {
        rejectCalled = true;
        return route.fulfill({ status: 200, body: "" });
    });

    await page.goto("/#/admin/names");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page
        .getByRole("button", { name: "Reject color name ew3-reject-target" })
        .last()
        .click();
    await expect.poll(() => rejectCalled).toBe(true);
});
