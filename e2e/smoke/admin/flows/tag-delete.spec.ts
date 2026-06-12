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
    // text rather than the button's visibility). The Tags panel mounts in
    // both layout slots (the off-breakpoint copy is `display:none`), so
    // target the visible-pane pill by its rendered visibility rather than a
    // positional `.last()`.
    await expect(page.getByText("ew3-doomed").filter({ visible: true })).toBeVisible();
    // The delete button is `opacity-0` group-hover-revealed (still a real,
    // visible box in the rendered pane — Playwright treats opacity:0 as
    // visible). The off-breakpoint pane's copy is `display:none` (zero box),
    // so `{ visible: true }` resolves the visible-pane button. dispatchEvent
    // fires the synthetic click the @click handler responds to without an
    // actionability hover synthesis.
    await page
        .getByRole("button", { name: "Delete tag ew3-doomed" })
        .filter({ visible: true })
        .dispatchEvent("click");
    await expect.poll(() => deleteCalled).toBe(true);
});
