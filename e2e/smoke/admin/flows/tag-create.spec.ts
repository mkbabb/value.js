import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #9 — tag-create. Admin Tags panel: type a
 * name + category, click Create → POST /admin/tags fires with body
 * `{name, category}`.
 */
test("admin tag create POSTs /admin/tags with name+category", async ({ page }) => {
    let postBody: { name?: string; category?: string } | null = null;
    await page.route("**/admin/tags", (route) => {
        const m = route.request().method();
        if (m === "POST") {
            postBody = JSON.parse(route.request().postData() ?? "{}");
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ name: postBody?.name, category: postBody?.category }),
            });
        }
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: "[]",
        });
    });

    await page.goto("/#/admin/tags");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByPlaceholder("Tag name...").last().fill("ew3-tag");
    await main.getByPlaceholder("Category...").last().fill("ew3-cat");
    await main.getByRole("button", { name: "Create tag" }).last().click();
    await expect.poll(() => postBody?.name).toBe("ew3-tag");
    expect(postBody?.category).toBe("ew3-cat");
});
