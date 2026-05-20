import { userTest as test, expect } from "../fixtures/user-auth";

/**
 * E.W3 Lane A flow #4 — palette-edit (rename a remote palette).
 *
 * Open the Browse view → open the menu on an owned remote palette →
 * click Rename → inline `PaletteRenameInput` opens with the name
 * selected → type new name → submit → PATCH /palettes/<slug> fires
 * with the new name.
 */
const OWNED_PALETTE = {
    slug: "midnight-bloom",
    name: "Midnight Bloom",
    colors: [{ css: "#234" }, { css: "#456" }],
    userSlug: "test-user", // matches the user-auth fixture's FAKE_SLUG
    voteCount: 0,
    voted: false,
    isLocal: false,
};

test("rename a remote palette PATCHes /palettes/<slug> with new name", async ({
    page,
}) => {
    let patchBody: unknown = null;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [OWNED_PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/midnight-bloom", (route) => {
        if (route.request().method() === "PATCH") {
            patchBody = JSON.parse(route.request().postData() ?? "{}");
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ ...OWNED_PALETTE, name: "Renamed" }),
            });
        }
        return route.continue();
    });

    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Rename/ }).click();
    const renameInput = main.getByPlaceholder("Palette name...").last();
    await renameInput.fill("Renamed");
    await renameInput.press("Enter");
    await expect.poll(() => (patchBody as { name?: string } | null)?.name).toBe("Renamed");
});
