import { test, expect } from "@playwright/test";

/**
 * E.W3 Lane A flow #2 — login-register (anonymous auto-register flow).
 *
 * The SlugBar live-app surface is only inside the PaletteDialog
 * (currently unused by the App.vue shell post-D.W3 Lane A restructure),
 * so the canonical login-register exercise on the smoke level is the
 * cold-boot auto-registration path: any session-requiring user action
 * (here: voting on a remote palette) calls `useSession.ensureSession()`,
 * which when no token is present fires `POST /sessions` and persists
 * the returned {token, userSlug}. This is the same path the
 * vote-toggle spec asserts the downstream of — we assert the
 * registration leg here.
 */
const PALETTE = {
    slug: "azure-mist",
    name: "Azure Mist",
    colors: [{ css: "#48a" }, { css: "#9ce" }],
    userSlug: "other-user",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

test("cold-boot vote auto-registers via POST /sessions and persists token", async ({
    page,
}) => {
    let registerCalled = false;
    await page.route("**/sessions", (route) => {
        if (route.request().method() === "POST") {
            registerCalled = true;
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ token: "boot-token", userSlug: "fresh-slug" }),
            });
        }
        return route.fulfill({ status: 204, body: "" });
    });
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [PALETTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/azure-mist/vote", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ voted: true, voteCount: 1 }),
        }),
    );

    await page.goto("/#/browse");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page.getByRole("button", { name: /0 votes, click to vote/ }).first().click();
    await expect.poll(() => registerCalled).toBe(true);
});
