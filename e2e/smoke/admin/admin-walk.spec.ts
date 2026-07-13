import { adminTest as test, expect } from "./fixtures/admin-auth";

/**
 * D.W5 Lane B — the admin-view CENSUS (the single admin mount gate).
 *
 * Walks all 5 admin views in sequence, exercising `usePaneRouter`'s
 * component-registry under transition load between admin sub-views, and — the
 * T.W0 W0-CI fold — asserting per view BOTH the PaneHeader heading AND the
 * view's distinctive control. This is the population census that retired the
 * five one-view-each cold-boot specs (admin-audit/flagged/names/tags/users):
 * their whole assertion set (heading + Refresh button / SearchBar + zero
 * console errors) lives here, in ONE boot instead of six.
 *
 * Selectors: role + accessible-name / placeholder only. No class selectors, no
 * xpath, no `waitForTimeout`. The search inputs render in both responsive
 * layout slots (one hidden), so they are picked by `.filter({ visible: true })`
 * (DOM order across the wrappers is not stable — the retired admin-users/names
 * specs' own convention); the Refresh buttons resolve with `.first()` (the
 * retired audit/flagged/tags specs' convention).
 */
type Control =
    | { kind: "search"; name: RegExp }
    | { kind: "button"; name: string };

const WALK: { path: string; heading: string; control: Control }[] = [
    {
        path: "/#/admin/users",
        heading: "Users",
        control: { kind: "search", name: /Search users/i },
    },
    {
        path: "/#/admin/names",
        heading: "Names",
        control: { kind: "search", name: /Search color names/i },
    },
    {
        path: "/#/admin/audit",
        heading: "Audit Log",
        control: { kind: "button", name: "Refresh audit log" },
    },
    {
        path: "/#/admin/flagged",
        heading: "Flagged",
        control: { kind: "button", name: "Refresh flagged palettes" },
    },
    {
        path: "/#/admin/tags",
        heading: "Tags",
        control: { kind: "button", name: "Refresh tags" },
    },
];

test("walk all 5 admin views sequentially with zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    const main = page.getByRole("main", { name: "Color tool panes" });

    for (let i = 0; i < WALK.length; i++) {
        const { path, heading, control } = WALK[i];
        // Boot / hash-navigate — vue-router re-resolves the ViewId in
        // useViewManager; usePaneRouter's KeepAlive wraps the admin sub-views,
        // so each step exercises mount/unmount races between sibling panels.
        // The seeded token (the fixture's addInitScript) makes useAdminAuth read
        // authenticated before any pane mounts.
        await page.goto(path);
        await expect(main).toBeVisible();
        // PaneHeader renders twice (mobile + desktop slots); `.first()` picks the
        // visible one — the retired per-view specs' proven convention.
        await expect(
            page.getByRole("heading", { name: heading }).first(),
        ).toBeVisible();
        if (control.kind === "search") {
            await expect(
                page.getByPlaceholder(control.name).filter({ visible: true }),
            ).toBeVisible();
        } else {
            await expect(
                page.getByRole("button", { name: control.name }).first(),
            ).toBeVisible();
        }
    }

    expect(consoleErrors).toEqual([]);
});
