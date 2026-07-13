/**
 * U.W-A11Y AUTHED (U-F56 · BR-9) — the user half of the driven-live a11y
 * battery: the authed identity surface (the logged-in Profile menu — the login
 * entry's populated state) + the POPULATED public browse wall.
 *
 * The registry §16 gap: the login surface + the populated palette-card grid had
 * ZERO gestalt-or-a11y coverage — the audit ran on the empty plate. This spec
 * drives both populated states against the user-auth + browse fixtures and runs
 * the a11y battery (accessible-name + target-size, computed over the live
 * composited surface) over each.
 *
 * a11y is deterministic-headless — the accessibility tree + DOM geometry, no
 * U-F54 GPU annex.
 */
import { userTest as test, expect } from "../fixtures/user-auth";
import { routeBrowsePalettes, PAGE1_COUNT } from "../fixtures/browse-palettes";
import { runBattery } from "./fixtures/a11y-battery";

test("battery: the populated browse wall passes accessible-name + target-size", async ({
    page,
}) => {
    await routeBrowsePalettes(page);
    await page.goto("/#/browse");

    // The wall renders as role=list with role=article cards (the seeded rows).
    const grid = page.getByRole("list").filter({ visible: true }).first();
    await expect(grid).toBeVisible();
    await expect(
        page.getByRole("article").filter({ visible: true }).first(),
    ).toBeVisible();

    // A populated wall — the battery must see many controls (card menus, votes).
    const report = await runBattery(page, "populated-browse");
    const nameless = report.violations.filter((v) => v.leg === "accessible-name");
    const undersized = report.violations.filter((v) => v.leg === "target-size");

    expect(nameless, `nameless controls: ${JSON.stringify(nameless, null, 2)}`).toEqual([]);
    expect(
        undersized,
        `sub-24px controls: ${JSON.stringify(undersized, null, 2)}`,
    ).toEqual([]);
    expect(report.controlsChecked).toBeGreaterThan(PAGE1_COUNT / 2);
});

test("battery: the authed Profile identity menu passes accessible-name (the login surface)", async ({
    page,
}) => {
    await page.goto("/#/palettes");

    // The authed login surface — the Profile trigger (desktop dock, lg+).
    const profileTrigger = page
        .getByRole("button", { name: "Profile" })
        .filter({ visible: true })
        .first();
    await expect(profileTrigger).toBeVisible();

    // It opens a keyboard-navigable menu (reka DropdownMenu semantics).
    await profileTrigger.click();
    const menu = page.getByRole("menu").filter({ visible: true }).first();
    await expect(menu).toBeVisible();

    // Every menu item resolves an accessible name.
    const report = await runBattery(page, "authed-profile-menu", '[role="menu"]');
    const nameless = report.violations.filter((v) => v.leg === "accessible-name");
    expect(nameless, `nameless menu items: ${JSON.stringify(nameless, null, 2)}`).toEqual([]);
    expect(report.controlsChecked).toBeGreaterThan(0);

    // Keyboard-reachable: the first item takes focus on ArrowDown (reka
    // roving-tabindex), proving the menu is operable, not merely present.
    await page.keyboard.press("ArrowDown");
    const focusedRole = await page.evaluate(
        () => document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName,
    );
    expect(focusedRole === "menuitem" || focusedRole === "MENUITEM").toBe(true);
});
