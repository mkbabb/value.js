import { test, expect, devices } from "@playwright/test";

/**
 * G.W3 Lane G — E2E-1: Pixel-7 mobile-walk spec.
 *
 * Per `docs/tranches/G/audit/G-AUDIT-6-api-e2e-ci.md §2.3`: the existing
 * `page-load-mobile.spec.ts` boot probe only asserts the mobile shell
 * *mounts* — it never exercises the mobile-only interaction paths. This
 * spec is the documented FOLD-INTO-G "mobile-walk" addition that takes a
 * coherent walk through the mobile UI:
 *
 *   1. The mobile shell boots; the dock is always-expanded on mobile
 *      (`Dock.vue` :always-expanded="!isDesktop"), so the segmented
 *      control + view-select are directly reachable.
 *   2. The `PaneSegmentedControl` (a glass-ui `BouncyTabs` pill living in
 *      `Dock.vue`) toggles the single mobile pane slot between the view's
 *      left-pane and right-pane components — at the Pixel-7 viewport the
 *      desktop dual-pane grid is hidden via `lg:flex`, so the segmented
 *      control IS the mobile pane router (`usePaneRouter.mobile`).
 *   3. Switching the dock view-select to a different dual-pane view
 *      re-labels the segmented control and resets the mobile pane index
 *      (`useViewManager`).
 *
 * Engine note (per `D-HARDEN-5 §4` / `page-load-mobile.spec.ts`): Pixel-7
 * in Playwright runs **Chromium**, not WebKit — this catches mobile-layout
 * + mobile-interaction bugs, not iOS-Safari engine-specific bugs (the
 * `smoke-safari` project owns that surface).
 *
 * Selectors: role/label only, per the B.W3 invariant. The segmented
 * control's `BouncyTabs` pill renders each option as a `<button>` carrying
 * `aria-pressed` — the button text is the pane label (`Picker`, `About`,
 * `Mix`, … from `VIEW_MAP` in `viewSchema.ts`), and the active option
 * carries `aria-pressed="true"`. The segmented-control buttons are scoped
 * to the `navigation` landmark: a pane's content can carry its own
 * same-named button (the Mix pane has a "Mix" action button), so an
 * unscoped `getByRole("button", { name: "Mix" })` is ambiguous.
 *
 * A segmented-control toggle is proven by a content landmark unique to
 * the toggled-in pane — the About pane's "Detailed Guide" heading. The
 * mobile slot is a `KeepAlive` cache (`PaneSlot.vue`), so an inactive pane
 * stays cached; the *visibility* of its heading — not its mere presence —
 * is the meaningful "is this pane showing" signal.
 *
 * The view-select reroute is proven by the segmented control's own
 * re-labelling + `aria-pressed` state, which is route-derived and
 * synchronous; the pane-content swap it triggers runs a `Transition
 * mode="out-in"` and is already covered by the in-view toggle steps.
 */

test.use({ ...devices["Pixel 7"] });

// Per-test timeout: this is a 6-step interaction walk — each pane swap runs
// a `Transition mode="out-in"` (out-then-in) plus the dock view-select's
// reka-ui open animation. The sequential animated transitions push the
// wall-clock past the 30s playwright.config.ts default; 60s gives the walk
// headroom without masking a genuine hang (same posture as
// `e2e/smoke/safari/sustained-30s.spec.ts`).
test.setTimeout(60_000);

test("mobile walk: segmented control toggles panes + view-select re-routes", async ({
    page,
}) => {
    // Narrower env-noise filter (4xx/5xx HTTP codes only) — matches the
    // posture of `page-load-mobile.spec.ts`; the shared production palette
    // API rate-limits under parallel-worker load.
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() !== "error") return;
        const text = msg.text();
        if (/Failed to load resource:.*\b(4\d\d|5\d\d)\b/.test(text)) return;
        consoleErrors.push(text);
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/");

    // ── Step 1: the mobile shell boots ──────────────────────────────────
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Application navigation" });
    await expect(nav).toBeAttached();

    // Segmented-control tabs live inside the dock (the `nav` landmark).
    // Scope to `nav` so a pane's own same-named content button never aliases.
    const pickerTab = nav.getByRole("button", { name: "Picker", exact: true });
    const aboutTab = nav.getByRole("button", { name: "About", exact: true });

    // ── Step 2: the segmented control is present, parked on the left pane ─
    // The default view is "Home" (`picker`): right === "about", so the
    // PaneSegmentedControl renders Picker / About; `picker` defaults to
    // mobilePaneIndex 0 (the left pane — the ColorPicker).
    await expect(pickerTab).toBeVisible();
    await expect(aboutTab).toBeVisible();
    await expect(pickerTab).toHaveAttribute("aria-pressed", "true");
    await expect(aboutTab).toHaveAttribute("aria-pressed", "false");
    // The left pane (the ColorPicker) renders a color-space select control;
    // the right pane's "Detailed Guide" heading is not on screen yet.
    await expect(
        main.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();
    await expect(
        main.getByRole("heading", { name: "Detailed Guide" }),
    ).toHaveCount(0);

    // ── Step 3: toggle the segmented control → the right (About) pane ────
    await aboutTab.click();
    await expect(aboutTab).toHaveAttribute("aria-pressed", "true");
    await expect(pickerTab).toHaveAttribute("aria-pressed", "false");
    // The mobile slot swapped to the About pane — its "Detailed Guide"
    // heading is now on screen.
    await expect(
        main.getByRole("heading", { name: "Detailed Guide" }),
    ).toBeVisible();

    // ── Step 4: toggle back → the left (Picker) pane returns ────────────
    await pickerTab.click();
    await expect(pickerTab).toHaveAttribute("aria-pressed", "true");
    await expect(aboutTab).toHaveAttribute("aria-pressed", "false");
    // Back on the ColorPicker; the About heading is off screen again.
    await expect(
        main.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();
    await expect(
        main.getByRole("heading", { name: "Detailed Guide" }),
    ).toBeHidden();

    // ── Step 5: re-route via the dock view-select → control re-labels ───
    // Switching to "Mix" (right === "mix") re-labels the segmented control
    // Picker / Mix and — per useViewManager — resets mobilePaneIndex to 1
    // (the right pane) because `mix` is an index-1-default view.
    //
    // The segmented control's labels + `aria-pressed` are driven by
    // `currentConfig`/`mobilePaneIndex` (route-derived, synchronous), so
    // they re-render deterministically the moment the route resolves — the
    // reliable signal for the reroute. The pane *content* swap behind it
    // runs a `Transition mode="out-in"` and is verified separately by the
    // toggle steps above; here we assert the control, the dock's own
    // surface, which is what this lane targets.
    const viewSelect = page.getByRole("combobox", { name: "Select view" });
    await expect(viewSelect).toBeVisible();
    await viewSelect.click({ force: true });
    await page.getByRole("option", { name: "Mix", exact: true }).click();

    // `nav`-scoped — the Mix pane carries its own "Mix" content button.
    const mixTab = nav.getByRole("button", { name: "Mix", exact: true });
    await expect(mixTab).toBeVisible();
    // `mix` defaults to pane-index 1 — the Mix tab is the active option.
    await expect(mixTab).toHaveAttribute("aria-pressed", "true");
    // The stale "About" option is gone from the re-labelled control.
    await expect(
        nav.getByRole("button", { name: "About", exact: true }),
    ).toHaveCount(0);

    // ── Step 6: toggle the re-labelled control → its state flips ───────
    const pickerTabMix = nav.getByRole("button", { name: "Picker", exact: true });
    await expect(pickerTabMix).toBeVisible();
    await pickerTabMix.click();
    await expect(pickerTabMix).toHaveAttribute("aria-pressed", "true");
    await expect(mixTab).toHaveAttribute("aria-pressed", "false");
    // The dock + pane shell survived every interaction in the walk.
    await expect(main).toBeVisible();
    await expect(nav).toBeAttached();

    // No uncaught console errors fired across the entire mobile walk.
    expect(consoleErrors).toEqual([]);
});
