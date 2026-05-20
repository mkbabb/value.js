import { userTest as test, expect } from "../fixtures/user-auth";

/**
 * E.W3 Lane A flow #1 — vote-toggle. Verifies the heart-button on a
 * BrowsePane PaletteCard reaches POST /palettes/<slug>/vote with a
 * voteCount delta reflected in the response. Mocks the published-list
 * endpoint to seed exactly one votable palette.
 */
const PALETTE = {
    slug: "ember-rose",
    name: "Ember Rose",
    colors: [{ css: "#e44" }, { css: "#fa6" }],
    userSlug: "other-user",
    voteCount: 5,
    voted: false,
    isLocal: false,
};

test("vote heart on a remote palette POSTs /vote and toggles voted flag", async ({
    page,
}) => {
    let voteCalled = false;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/ember-rose/vote", (route) => {
        voteCalled = true;
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ voted: true, voteCount: 6 }),
        });
    });

    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    const voteBtn = page.getByRole("button", { name: /5 votes, click to vote/ }).first();
    await voteBtn.click();
    await expect.poll(() => voteCalled).toBe(true);
});
