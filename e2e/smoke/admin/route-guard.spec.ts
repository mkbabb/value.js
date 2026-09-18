// SERVED MODEL: claude-opus-5[1m]
//
// X-W3 · X.W3.6 — the admin route guard + the source-realized not-found route.
//
// Gates: G-18 (P0) · G-20. Authored BORN-RED per fold S-11 ("the born-RED route
// spec lands FIRST"): at the baseline commit every assertion below fails for its
// one intended reason —
//
//   G-18  `demo/color-picker/router/index.ts:31-35` declares `meta: { admin: true }`
//         on five records while `grep -rn "beforeEach\|beforeEnter" demo` → 0.
//         The flag is decorative; an anonymous visitor who types the URL mounts
//         `AdminPane` in full.
//   G-20  `:37` `{ path: "/:pathMatch(.*)*", redirect: "/" }` — an unknown URL is
//         REWRITTEN to the picker. "A correct render of the wrong thing."
//
// Falsifier discipline (L-19): the third test seeds the very token the guard
// reads, so a guard that fail-closed on the ROUTE rather than on the TOKEN reds
// there. The three tests cannot all pass for any reason but the intended one.
//
// SEAM (COHESION §0k.3 S-6 · fold §CrossEdges §A). This file proves NAVIGATION is
// fail-closed. It does NOT prove the admin PANE's unauthorized state, which is
// X-W7's (the 21 `if (!token)` early-returns across five composables). Neither
// wave reports the AdminGate identity closed alone; X-W7 inherits the seam and
// its gate may not go green over this edit.
//
// Anonymity is the point, so this spec deliberately does NOT take the
// `adminTest` fixture (whose `addInitScript` seeds an admin token before the
// first page script). It uses the base `test`, and `smoke-admin`'s project
// config applies no fixture of its own.

import { test, expect } from "@playwright/test";

/**
 * The five `meta: { admin: true }` records, each with the heading its
 * `AdminPane` sub-view renders through `PaneHeader` (`AdminPane.vue:97-104`).
 * The heading is the mount oracle: it renders unconditionally on mount, before
 * any admin XHR, so it cannot be confused with an empty-data state.
 */
const ADMIN_ROUTES: { path: string; heading: string }[] = [
    { path: "/#/admin/users", heading: "Users" },
    { path: "/#/admin/names", heading: "Names" },
    { path: "/#/admin/audit", heading: "Audit Log" },
    { path: "/#/admin/flagged", heading: "Flagged" },
    { path: "/#/admin/tags", heading: "Tags" },
];

/** The not-found pane's heading (`demo/scenes/notfound/NotFoundPane.vue`). */
const NOT_FOUND_HEADING = "Not Found";

test("G-18 — anonymous deep-link to every admin route fail-closes; AdminPane never mounts", async ({
    page,
}) => {
    const main = page.getByRole("main", { name: "Color tool panes" });

    for (const { path, heading } of ADMIN_ROUTES) {
        await page.goto(path);
        await expect(main).toBeVisible();

        // The guard resolved to a non-admin route — the not-found record.
        // PaneHeader renders in both the mobile and desktop slots (one hidden);
        // `.first()` is the suite's proven convention (admin-walk.spec.ts:71-75).
        await expect(
            page.getByRole("heading", { name: NOT_FOUND_HEADING }).first(),
        ).toBeVisible();

        // …and the admin surface is absent entirely, not merely hidden.
        await expect(page.getByRole("heading", { name: heading })).toHaveCount(0);
    }
});

test("G-20 — an unknown URL renders the source-realized not-found route, not a redirect", async ({
    page,
}) => {
    const main = page.getByRole("main", { name: "Color tool panes" });

    await page.goto("/#/does-not-exist");
    await expect(main).toBeVisible();

    await expect(
        page.getByRole("heading", { name: NOT_FOUND_HEADING }).first(),
    ).toBeVisible();

    // The retired catch-all REWROTE the URL to "/". A source-realized record
    // renders in place, so the address the visitor typed survives.
    expect(new URL(page.url()).hash).toBe("#/does-not-exist");
});

test("G-18 falsifier — the guard fail-closes on the TOKEN, not on the admin route", async ({
    page,
}) => {
    // The same seed `e2e/smoke/admin/fixtures/admin-auth.ts` uses: `useAdminAuth`
    // is a module-level singleton whose lazy init reads this key exactly once, so
    // the page is authenticated before the first pane mounts. No admin XHR is
    // mocked here — the header renders on mount, independent of the network, and
    // this test asserts nothing about console noise.
    await page.addInitScript(
        ({ key, val }) => {
            localStorage.setItem(key, val);
        },
        { key: "palette-admin-token", val: "test-admin-token" },
    );

    await page.goto("/#/admin/users");

    await expect(page.getByRole("heading", { name: "Users" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: NOT_FOUND_HEADING })).toHaveCount(0);
});
