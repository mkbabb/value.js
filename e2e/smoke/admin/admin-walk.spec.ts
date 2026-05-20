import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — admin-walk smoke spec.
 *
 * Walks all 5 admin views in sequence, exercising `usePaneRouter`'s
 * component-registry under transition load between admin sub-views.
 *
 * Selectors: role + accessible-name only. No class selectors, no xpath,
 * no `waitForTimeout`. Each step asserts the pane main landmark stays
 * visible + the per-view PaneHeader heading resolves.
 */
const WALK: { path: string; heading: string }[] = [
    { path: "/#/admin/users", heading: "Users" },
    { path: "/#/admin/names", heading: "Names" },
    { path: "/#/admin/audit", heading: "Audit Log" },
    { path: "/#/admin/flagged", heading: "Flagged" },
    { path: "/#/admin/tags", heading: "Tags" },
];

test("walk all 5 admin views sequentially with zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    // Boot at the first admin view via direct hash navigation — the seeded
    // token (via the fixture's addInitScript) makes useAdminAuth read as
    // authenticated before any pane mounts.
    await page.goto(WALK[0].path);
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    // PaneHeader renders twice (mobile + desktop slots); `.first()` picks the
    // visible one. Lane A applies the same convention.
    await expect(page.getByRole("heading", { name: WALK[0].heading }).first()).toBeVisible();

    // Remaining 4 transitions — hash navigation triggers vue-router which
    // re-resolves the ViewId in useViewManager. usePaneRouter's KeepAlive
    // wraps the admin sub-views, so this exercises mount/unmount races
    // between sibling admin panels.
    for (let i = 1; i < WALK.length; i++) {
        await page.goto(WALK[i].path);
        await expect(main).toBeVisible();
        await expect(
            page.getByRole("heading", { name: WALK[i].heading }).first(),
        ).toBeVisible();
    }

    expect(consoleErrors).toEqual([]);
});
