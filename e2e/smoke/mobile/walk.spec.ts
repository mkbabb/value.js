import { test, expect, devices } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * G.W3 Lane G — E2E-1: Pixel-7 mobile-walk spec.
 *
 * Per `docs/tranches/G/audit/G-AUDIT-6-api-e2e-ci.md §2.3`: the existing
 * `page-load-mobile.spec.ts` boot probe only asserts that the mobile shell
 * *mounts* — it never exercises the mobile interaction paths. This spec is
 * the documented FOLD-INTO-G "mobile-walk" addition that takes a coherent
 * walk through the mobile UI.
 *
 * ── X.W5.c — RE-POINTED FROM AMPUTATION TO PRESENCE (gates C1 / N10) ────────
 *
 * What this spec used to walk was a mobile pane SWITCHER: a
 * `PaneSegmentedControl` in the dock that toggled the single mobile slot
 * between a view's two panes, because below the breakpoint only one of them
 * was mounted. Every step therefore proved the amputation was working.
 *
 * The switcher is deleted and the amputation with it (X.W5.c · V·L2): the
 * scene's `regions[]` all mount, at every viewport, and the grid stacks them
 * into one scrolling column at phone widths. So the walk now proves PRESENCE,
 * and it keeps the proof SHAPE the toggle walk established — ⟨PSC-8⟩, binding:
 * a content landmark unique to a region (the About pane's "Detailed Guide"
 * heading), asserted in BOTH DIRECTIONS PLUS RETURN. The directions are route
 * directions now, because there is no longer an in-scene direction to travel:
 *
 *   Home → (both regions present, both landmarks visible)
 *   Mix  → (the re-composed scene's own regions, both present)
 *   Home → (the return: the landmarks are back, and still visible)
 *
 * ⟨AboutPane · AB-6⟩ CARVE LOCK, honoured: the "Detailed Guide" assertions are
 * AboutPane's only live coverage while the AB-2 void stands. They are carried
 * through this re-point unchanged in kind — not deleted, not weakened to a
 * presence-only count. Deleting them would convert a vacuous-but-honest
 * surface into a falsely green one.
 *
 * ⟨PSC-17 / gate N10⟩, the three false prose claims, all corrected here — and
 * corrected by RETIRING the words, not by rewording around them, because the
 * gate greps this file for exactly the claims the retired header made:
 *   · it named a glass-ui bouncy-tab component as the control's implementation.
 *     That component does not exist in glass 7.0.0, and the wrapper that
 *     imported it is deleted at X.W5.c;
 *   · it named a width-only responsive display utility as the mechanism that
 *     hid the desktop grid. That mechanism was retired at T round-4 (MOB-1) in
 *     favour of the `[data-layout]` stamp, and the stamp went with the fork at
 *     X.W5.c — the panes carry no display utility at all now, which is what
 *     `dual-pane-1440.spec.ts` asserts as the D8-1 immunity;
 *   · it justified the 60s timeout with an out-then-in Transition handoff that
 *     `PaneSlot.vue` has not run since the R.W3 close (it runs the DEFAULT,
 *     simultaneous mode and says so at its own bytes). Same number, and a
 *     reason that can be re-derived, stated at the timeout below.
 *
 * Engine note (per `D-HARDEN-5 §4` / `page-load-mobile.spec.ts`): Pixel-7 in
 * Playwright runs **Chromium**, not WebKit — this catches mobile-layout +
 * mobile-interaction bugs, not iOS-Safari engine-specific bugs (the
 * `smoke-safari` project owns that surface).
 *
 * Selectors: role/label only, per the B.W3 invariant. Each region is a
 * `role="region"` named by the schema's own `SceneRegion.label`, so a region
 * is addressable by what it IS without any knowledge of where it sits.
 */

test.use({ ...devices["Pixel 7"] });

// Per-test timeout: this walk pays two route changes, each one a pane swap
// through `PaneSlot`'s Transition (default/simultaneous mode — both panes
// animating at once) plus the dock view-select's reka-ui open animation, plus
// the async chunk fetch for a pane the session has not loaded yet, all
// SEQUENTIALLY. That is what pushes wall-clock past the 30s
// playwright.config.ts default; 60s gives the walk headroom without masking a
// genuine hang (same posture as `e2e/smoke/safari/sustained-30s.spec.ts`).
test.setTimeout(60_000);

test("mobile walk: every region of every scene is present, across routes and back", async ({
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
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Application navigation" });
    await expect(nav).toBeAttached();

    // ── Step 2: BOTH of the Home scene's regions are present at 412 ──────
    // `picker` declares regions [stage: color-picker "Picker",
    // inspector: about "About"]. Neither is behind a viewport predicate.
    await expect(main.getByRole("region", { name: "Picker" })).toBeVisible();
    await expect(main.getByRole("region", { name: "About" })).toBeVisible();

    // The content landmarks of BOTH regions, on screen at the same time —
    // the stage's color-space control and the inspector's "Detailed Guide"
    // heading. This single assertion pair is what the six-step toggle walk
    // was spending itself to approximate one pane at a time.
    await expect(
        main.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();
    await expect(main.getByRole("heading", { name: "Detailed Guide" })).toBeVisible();

    // ── Step 3: direction one — re-route to a differently-composed scene ──
    // `mix` declares [stage: color-picker "Picker", inspector: mix "Mix"], so
    // the inspector swaps and the stage persists. Both regions are present
    // before and after; what changes is WHAT the inspector seats.
    await openView(page, "Mix");
    await expect(page.getByRole("main", { name: "Mix" })).toBeVisible();
    const mixMain = page.getByRole("main", { name: "Mix" });
    await expect(mixMain.getByRole("region", { name: "Picker" })).toBeVisible();
    await expect(mixMain.getByRole("region", { name: "Mix" })).toBeVisible();
    // The About landmark belongs to a region this scene does not seat.
    await expect(mixMain.getByRole("heading", { name: "Detailed Guide" })).toHaveCount(
        0,
    );

    // ── Step 4: direction two, and the return ────────────────────────────
    await openView(page, "Home");
    const home = page.getByRole("main", { name: "Home" });
    await expect(home).toBeVisible();
    await expect(home.getByRole("region", { name: "Picker" })).toBeVisible();
    await expect(home.getByRole("region", { name: "About" })).toBeVisible();
    // The landmark is back AND VISIBLE — presence alone would pass on a
    // KeepAlive-cached subtree that is no longer on screen, which is exactly
    // the distinction the retired toggle walk drew and this one keeps.
    await expect(home.getByRole("heading", { name: "Detailed Guide" })).toBeVisible();
    await expect(
        home.getByRole("combobox", { name: "Select color space" }).first(),
    ).toBeVisible();

    // The dock + pane shell survived every navigation in the walk.
    await expect(home).toBeVisible();
    await expect(nav).toBeAttached();

    // No uncaught console errors fired across the entire mobile walk.
    expect(consoleErrors).toEqual([]);
});
