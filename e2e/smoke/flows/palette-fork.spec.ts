import { userTest as test, expect } from "../fixtures/user-auth";

/**
 * E.W3 Lane A flow #6 — palette-fork (remix a non-owned remote palette).
 *
 * Open Browse → open the menu on a non-owned remote palette → click
 * Remix → POST /palettes/<slug>/fork fires. The server returns a new
 * palette with its own slug and `parentSlug` set.
 */
const REMOTE_PALETTE = {
    slug: "deep-sea-glow",
    name: "Deep Sea Glow",
    colors: [{ css: "#048" }, { css: "#0bf" }],
    userSlug: "another-user",
    voteCount: 12,
    voted: false,
    isLocal: false,
};

test("remix a remote palette POSTs /palettes/<slug>/fork with parent slug", async ({
    page,
}) => {
    let forkCalled = false;
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [REMOTE_PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/deep-sea-glow/fork", (route) => {
        forkCalled = true;
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                ...REMOTE_PALETTE,
                slug: "deep-sea-glow-fork",
                parentSlug: "deep-sea-glow",
            }),
        });
    });

    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Remix/ }).click();
    await expect.poll(() => forkCalled).toBe(true);
});
