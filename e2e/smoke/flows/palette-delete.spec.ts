import { userTest as test, expect } from "../fixtures/user-auth";

/**
 * E.W3 Lane A flow #5 — palette-delete (delete an owned remote palette).
 *
 * Open Browse → open the menu on an owned remote palette → click
 * Delete → DELETE /palettes/<slug> fires. The PaletteCard's @delete is
 * wired to `useBrowsePalettes.onDeleteOwned` which calls
 * `deletePaletteUser` directly (no confirm dialog for remote-owned).
 */
const OWNED_PALETTE = {
    slug: "fading-amber",
    name: "Fading Amber",
    colors: [{ css: "#ec0" }, { css: "#b80" }],
    userSlug: "test-user",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

test("delete an owned remote palette DELETEs /palettes/<slug>", async ({
    page,
}) => {
    let deleteCalled = false;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [OWNED_PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/fading-amber", (route) => {
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

    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /^Delete$/ }).click();
    await expect.poll(() => deleteCalled).toBe(true);
});
