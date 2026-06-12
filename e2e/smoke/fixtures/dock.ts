/**
 * N.W5 Defect-B — the dock view-select OPEN idiom (shared fixture).
 *
 * Replaces the `click({ force: true })` open the smoke suite carried at every
 * view-switch site. That idiom was authored around a now-fixed app defect: the
 * dock booted COLLAPSED on desktop, so the `.glass-dock.collapsed` overlay
 * intercepted the trigger's pointer and the specs reached for `force` to punch
 * the click through. But reka-ui 2.9's `<Select>` IGNORES (and sometimes
 * mis-toggles) a synthetic forced click, so `force:true` left `data-state`
 * `closed` — the click landed on the button but the listbox never opened.
 *
 * The app fix (N.W5 Defect-B): the desktop dock now boots EXPANDED
 * (`Dock.vue` `:start-collapsed="false"`), so the view-select trigger is a
 * top-level reachable control on first paint — exactly as on mobile (where the
 * dock is `always-expanded`). A REAL click then opens the listbox
 * deterministically (live-probed: WebGL-off 5/5; SwiftShader-on 3/4, the lone
 * miss being the orthogonal Defect-A WebGL hit-test stall the CI `retries`
 * absorb). This helper is that real-user interaction, factored once:
 *
 *   1. If the dock is collapsed (a narrow-viewport pill, or a post-idle
 *      auto-collapse), click the pill to expand it first — a real user taps the
 *      pill before reaching the controls inside. No-op when already expanded.
 *   2. Real-click the `Select view` combobox (NO force) and assert the listbox
 *      opened (the named option becomes visible), so a regression to the
 *      closed-listbox failure mode surfaces HERE with a clear message rather
 *      than as an opaque downstream timeout.
 *   3. Click the named option.
 *
 * `expandDock(page)` is exported separately for the specs that interact with
 * other dock controls (the action-bar toggle) and need the dock open without
 * driving the view-select.
 */
import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * Ensure the dock is expanded. A real user clicks the collapsed pill before
 * reaching the controls inside it. No-op when the dock is already expanded
 * (mobile `always-expanded`, or desktop's expanded first-paint).
 */
export async function expandDock(page: Page): Promise<void> {
    const collapsedPill = page.locator(".glass-dock.collapsed");
    if (await collapsedPill.count()) {
        // Real click on the pill body; the dock un-collapses on the click.
        await collapsedPill.click();
        // The collapse↔expand morph runs the dock's single settling spring;
        // wait for `[data-morphing]` to clear so the controls inside are at rest.
        await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
            timeout: 5000,
        });
    }
}

/**
 * Open the dock view-select and switch to the named view. The real-user idiom:
 * expand the dock if collapsed, real-click the combobox, assert it opened, pick
 * the option. `name` matches a `VIEW_MAP` label ("Palettes", "Home", …).
 */
export async function openView(page: Page, name: string): Promise<void> {
    await expandDock(page);

    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await expect(viewSelect).toBeVisible();
    await viewSelect.click();

    // Assert the listbox actually opened, so a closed-listbox regression
    // surfaces HERE with a clear message rather than as a downstream
    // option-not-found timeout. NOTE: once the reka-ui Select opens, the
    // combobox's *computed accessible name* changes (it pulls in the live
    // listbox's `aria-activedescendant`), so `getByRole("combobox", { name:
    // "Select view" })` no longer resolves the same element — asserting
    // `data-state` through that named locator is a false negative. The stable
    // open-signal is the listbox itself: the named option becomes visible only
    // when the listbox is open. That `option` locator is also what we click,
    // so the assertion and the action share one truth.
    const option = page.getByRole("option", { name, exact: true });
    await expect(option).toBeVisible();
    await option.click();
}
