import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #13 — color-approve. Names panel pending tab:
 * mock /admin/queue to return one pending proposal, click Approve,
 * assert POST /admin/colors/<id>/approve fires.
 */
test("admin approve color name POSTs /admin/colors/<id>/approve", async ({ page }) => {
    let approveCalled = false;
    await page.route("**/admin/queue**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [{
                    id: "prop-approve-1",
                    name: "ew3-approve-target",
                    css: "#123456",
                    status: "pending",
                }],
                total: 1,
                limit: 50,
                offset: 0,
            }),
        }),
    );
    await page.route("**/admin/colors/prop-approve-1/approve", (route) => {
        approveCalled = true;
        return route.fulfill({ status: 200, body: "" });
    });

    await page.goto("/#/admin/names");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page
        .getByRole("button", { name: "Approve color name ew3-approve-target" })
        .last()
        .click();
    await expect.poll(() => approveCalled).toBe(true);
});
