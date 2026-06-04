import { adminTest as test, expect } from "../fixtures/admin-auth";

/**
 * E.W3 Lane A admin flow #12 — palette-feature.
 *
 * Admin-authenticated session in the BROWSE view: the PaletteCardMenu
 * exposes an admin-only Feature toggle (`v-if="isAdmin && paletteKind
 * === 'remote'"`). The mocked admin-auth fixture sets isAdmin=true; the
 * mocked palette list returns one remote palette; the Feature menu
 * item POSTs /admin/palettes/<slug>/feature.
 */
test("admin feature palette POSTs /admin/palettes/<slug>/feature", async ({ page }) => {
    let featureCalled = false;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [{
                    slug: "ew3-feature-target",
                    name: "Feature Target",
                    colors: [{ css: "#abc" }],
                    userSlug: "other-user",
                    voteCount: 0,
                    voted: false,
                    isLocal: false,
                    tier: "standard",
                }],
                total: 1,
                limit: 50,
                offset: 0,
            }),
        }),
    );
    await page.route("**/admin/palettes/ew3-feature-target/feature", (route) => {
        featureCalled = true;
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ slug: "ew3-feature-target", tier: "featured" }),
        });
    });

    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /^Feature$/ }).click();
    await expect.poll(() => featureCalled).toBe(true);
});
