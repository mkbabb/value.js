/**
 * U.W-A11Y AUTHED (U-F56 · BR-9 + U-F58 error a11y half) — the admin half of
 * the driven-live a11y battery, born-RED.
 *
 * The registry §16 / census static-zd3-admin pointer: the admin moderation
 * surface + the thrown-error a11y half were NEVER driven live. This spec drives
 * the POPULATED admin panels (users / names / flagged) against the
 * admin-populated fixture and runs the a11y battery over each, PLUS the two
 * born-RED flips this lane cures:
 *
 *   BR-9 keyboard-operability — the AdminUsersPanel user-row EXPANDER is a bare
 *   clickable <div> (no role / tabindex / key handler) with NO alternative
 *   keyboard path to a user's palettes: WCAG 2.1.1 (Keyboard) fail. Cure:
 *   role=button + tabindex=0 + Enter/Space + aria-expanded.
 *
 *   U-F58 thrown-error a11y half — an INDUCED error over the authed surface (a
 *   broken admin response: a user row with a null slug the panel render chokes
 *   on) currently white-screens with NO focus-managed, NO announced surface.
 *   Cure: a focus-managed role=alert ErrorBoundary — never a silent dead plate.
 *
 * a11y is deterministic-headless (the accessibility tree + DOM geometry), so
 * every assertion here is a real machine gate — no U-F54 GPU annex applies.
 */
import { adminPopulatedTest as test, expect } from "./fixtures/admin-populated";
import { runBattery, keyboardFacts } from "./fixtures/a11y-battery";

const ADMIN_VIEWS: { hash: string; heading: string }[] = [
    { hash: "/#/admin/users", heading: "Users" },
    { hash: "/#/admin/names", heading: "Names" },
    { hash: "/#/admin/flagged", heading: "Flagged" },
];

for (const view of ADMIN_VIEWS) {
    test(`battery: ${view.heading} populated admin passes accessible-name + target-size`, async ({
        page,
    }) => {
        await page.goto(view.hash);
        await expect(
            page.getByRole("heading", { name: view.heading }).filter({ visible: true }).first(),
        ).toBeVisible();

        const report = await runBattery(page, `admin-${view.heading}`);

        // The hard gate: no VISIBLE operable control in the pane region is
        // nameless or under the fine-pointer target floor.
        const nameless = report.violations.filter((v) => v.leg === "accessible-name");
        const undersized = report.violations.filter((v) => v.leg === "target-size");

        expect(
            nameless,
            `nameless controls: ${JSON.stringify(nameless, null, 2)}`,
        ).toEqual([]);
        expect(
            undersized,
            `sub-24px controls: ${JSON.stringify(undersized, null, 2)}`,
        ).toEqual([]);
        // The battery saw real controls (guards against an empty-scope false green).
        expect(report.controlsChecked).toBeGreaterThan(0);
    });
}

/**
 * BR-9 keyboard-operability — the user-row expander. `azure-fox-01` has
 * paletteCount 4, so its header row is the click-to-expand affordance. The row
 * MUST be genuinely keyboard-operable (focusable + role + Enter expands),
 * because there is NO other keyboard path to a user's palettes.
 */
test("BR-9: the admin user-row expander is keyboard-operable (role + focusable + Enter expands)", async ({
    page,
}) => {
    await page.goto("/#/admin/users");
    await expect(
        page.getByRole("heading", { name: "Users" }).filter({ visible: true }).first(),
    ).toBeVisible();

    // Locate the clickable header row (its `cursor-pointer` class survives the
    // cure) via the slug text's ancestor — robust pre- and post-cure.
    const expander = page
        .getByText("azure-fox-01", { exact: true })
        .first()
        .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")][1]');
    await expect(expander).toBeVisible();

    const facts = await keyboardFacts(expander);
    // Born-RED: a bare <div> (focusable:false, role:null). GREEN: role=button,
    // tabindex 0, aria-expanded present.
    expect(facts.focusable, `expander keyboard facts: ${JSON.stringify(facts)}`).toBe(true);
    expect(facts.role).toBe("button");
    expect(facts.ariaExpanded).not.toBeNull();

    // Operate it by keyboard: focus + Enter expands (aria-expanded → true, the
    // palettes region loads).
    await expander.focus();
    await expect(expander).toBeFocused();
    await expander.press("Enter");
    await expect(expander).toHaveAttribute("aria-expanded", "true");
});

/**
 * U-F58 thrown-error a11y half — the induced-error boundary.
 *
 * Override the /admin/users envelope with a BROKEN row (a null slug the panel's
 * `slugHead()` render chokes on — "an admin action against a broken response").
 * Born-RED: the app white-screens with no announced, no focus-managed surface.
 * GREEN: a focus-managed role=alert ErrorBoundary catches it — never a silent
 * dead plate.
 */
test("U-F58: an induced admin render error surfaces a focus-managed role=alert boundary", async ({
    page,
}) => {
    // Most-recent route wins in Playwright — this overrides the fixture's
    // /admin/** handler for the users envelope only.
    await page.route("**/admin/users**", (route) => {
        if (!new URL(route.request().url()).pathname.startsWith("/admin/")) {
            return route.continue();
        }
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            // A null slug — a contract-violating response. `slugHead(null)`
            // throws `Cannot read properties of null (reading 'length')` in the
            // v-for render, an UNCAUGHT throw over the authed surface.
            body: JSON.stringify({
                data: [{ slug: null, createdAt: "2026-07-05T00:00:00.000Z", lastSeenAt: "2026-07-05T00:00:00.000Z", status: "active", paletteCount: 2 }],
                total: 1,
                limit: 50,
                offset: 0,
            }),
        });
    });

    await page.goto("/#/admin/users");

    // The focus-managed announced boundary — a role=alert live region — appears
    // in place of the dead plate.
    const alert = page.getByRole("alert").filter({ visible: true }).first();
    await expect(alert).toBeVisible({ timeout: 10_000 });

    // It is ANNOUNCED (assertive live region) and NAMED (a heading a screen
    // reader reads, not an anonymous plate).
    await expect(alert).toHaveAttribute("aria-live", /assertive|polite/);
    const alertText = (await alert.textContent())?.trim() ?? "";
    expect(alertText.length).toBeGreaterThan(0);

    // It is FOCUS-MANAGED: focus moved INTO the boundary (the alert container or
    // a descendant), so a keyboard/SR user is not stranded on the dead tree.
    const focusInsideAlert = await alert.evaluate(
        (el) => el === document.activeElement || el.contains(document.activeElement),
    );
    expect(focusInsideAlert, "focus is inside the error boundary").toBe(true);

    // A recovery affordance is reachable (never a terminal dead end).
    await expect(
        alert.getByRole("button").filter({ visible: true }).first(),
    ).toBeVisible();
});
