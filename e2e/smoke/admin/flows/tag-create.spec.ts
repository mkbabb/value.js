import { adminTest as test, expect } from "../fixtures/admin-auth";
import { mainPane } from "../../fixtures/dock";

/**
 * E.W3 Lane A admin flow #9 — tag-create. Admin Tags panel: type a
 * name + category, click Create → POST /admin/tags fires with body
 * `{name, category}`.
 */
test("admin tag create POSTs /admin/tags with name+category", async ({ page }) => {
    // X-W1 · G-1 — the capture lives on a HOLDER. `let postBody = null`
    // assigned only inside the route callback narrows to `null` for control-flow
    // analysis, so `postBody?.category` read as a property of `never` and the
    // assertion below was type-vacuous.
    const captured: { body: { name?: string; category?: string } | null } = {
        body: null,
    };
    await page.route("**/admin/tags", (route) => {
        const m = route.request().method();
        if (m === "POST") {
            captured.body = JSON.parse(route.request().postData() ?? "{}");
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    name: captured.body?.name,
                    category: captured.body?.category,
                }),
            });
        }
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: "[]",
        });
    });

    await page.goto("/#/admin/tags");
    const main = mainPane(page);
    await expect(main).toBeVisible();
    // The Tags panel mounts in both layout slots (the off-breakpoint copy is
    // `display:none`); target the visible copy's controls rather than `.last()`
    // (DOM order across the responsive wrappers is not stable).
    await main
        .getByPlaceholder("Tag name...")
        .filter({ visible: true })
        .fill("ew3-tag");
    await main
        .getByPlaceholder("Category...")
        .filter({ visible: true })
        .fill("ew3-cat");
    await main
        .getByRole("button", { name: "Create tag" })
        .filter({ visible: true })
        .click();
    await expect.poll(() => captured.body?.name).toBe("ew3-tag");
    expect(captured.body?.category).toBe("ew3-cat");
});
