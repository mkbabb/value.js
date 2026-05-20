import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #10 — tag-delete. Seed the tag list with a
 * single tag, hover its pill so the delete button reveals, click it
 * → DELETE /admin/tags/<name> fires.
 */
test("admin tag delete DELETEs /admin/tags/<name>", async ({ page }) => {
    let deleteCalled = false;
    await page.route("**/admin/tags", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([{ name: "ew3-doomed", category: "ew3-cat" }]),
        }),
    );
    await page.route("**/admin/tags/ew3-doomed", (route) => {
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

    await page.goto("/#/admin/tags");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    // Wait for the tag pill to render (the GET /admin/tags fulfilment is
    // async; the delete button is `opacity-0` group-hover-revealed but
    // present in the DOM once the parent pill mounts — wait on the pill
    // text rather than the button's visibility).
    await expect(page.getByText("ew3-doomed").last()).toBeVisible();
    // The delete button has `focus-visible:opacity-100` — focusing it
    // unhides without needing a hover synthesis. dispatchEvent('click')
    // via Playwright's `dispatchEvent` API bypasses the visibility
    // check entirely (vs. real `click()` which actionability-waits) and
    // fires the synthetic event the @click handler responds to.
    await page
        .getByRole("button", { name: "Delete tag ew3-doomed" })
        .last()
        .dispatchEvent("click");
    await expect.poll(() => deleteCalled).toBe(true);
});
