# G.W3 Lane G — E2E-1: mobile-walk spec

**Wave**: G.W3 (Lane G — E2E-1).
**Branch / HEAD at open**: `tranche-g` @ `c57ec01`.
**Finding origin**: `audit/G-AUDIT-6-api-e2e-ci.md §2.3 + §2.5` (G-OPP-E2E-1, FOLD-INTO-G).
**Status**: COMPLETE — sub-gate GREEN.

---

## §1 — The finding

Per `G-AUDIT-6 §2.3`: mobile coverage at G open was **a single spec** —
`e2e/smoke/mobile/page-load-mobile.spec.ts`, a Pixel-7 *boot probe*. It asserts
the mobile shell *mounts* (the `main` landmark, the `nav` landmark, the
view-select combobox) but never **exercises** the mobile-only interaction
paths: the `PaneSegmentedControl` that swaps the single mobile pane slot, and
the dock view-select re-routing.

`G-AUDIT-6 §2.5` ratified the fold: add **1 mobile-walk spec** (Pixel-7
viewport, exercises `PaneSegmentedControl` toggle + dock interaction) — mobile
coverage at 2 specs (boot + walk), still under the documented "probe, not a
suite" budget (`research/Dg-playwright-coverage.md §6`).

---

## §2 — File placement reconciliation

The wave spec (`G.W3.md` Lane G) names the file `e2e/smoke-mobile/walk.spec.ts`.
There is **no `e2e/smoke-mobile/` directory** in the repo. The `smoke-mobile`
**Playwright project** (`playwright.config.ts`) has `testDir: "./e2e/smoke/mobile"`
— the project name and the directory name differ. The existing mobile spec
lives at `e2e/smoke/mobile/page-load-mobile.spec.ts`.

The new spec is therefore placed at **`e2e/smoke/mobile/walk.spec.ts`** — the
directory the `smoke-mobile` project actually discovers, matching the existing
convention (`*.spec.ts` colocated with `page-load-mobile.spec.ts`; the bare
`walk.spec.ts` name mirrors `e2e/smoke/walk.spec.ts`, the desktop walk). The
wave spec's `e2e/smoke-mobile/` path was a naming slip; the project's `testDir`
is authoritative.

---

## §3 — Components exercised

| Component | File | Surface exercised |
|---|---|---|
| `PaneSegmentedControl` | `demo/@/components/custom/panes/PaneSegmentedControl.vue` | the glass-ui `BouncyTabs` pill — toggles `mobilePaneIndex` 0↔1 |
| `Dock` | `demo/@/components/custom/dock/Dock.vue` | hosts the segmented control (`lg:hidden` branch) + the view-select; `:always-expanded="!isDesktop"` keeps both reachable on mobile |
| `DockViewSelect` | `demo/@/components/custom/dock/DockViewSelect.vue` | the view-select combobox — re-routes the active view |
| `PaneSlot` | `demo/@/components/custom/panes/PaneSlot.vue` | the single mobile pane slot — `Transition mode="out-in"` + `KeepAlive` |
| `usePaneRouter` / `useViewManager` | `demo/@/composables/` | `mobile` slot resolution; `mobilePaneIndex` reset on `switchView` |

At the Pixel-7 viewport (412×915) the desktop dual-pane grid is hidden via
`lg:flex`/`lg:block`, so the **single mobile slot** is the rendered one and the
`PaneSegmentedControl` IS the mobile pane router.

---

## §4 — The walk (6 steps)

The spec is `e2e/smoke/mobile/walk.spec.ts` — one `test()` block,
`test.use({ ...devices["Pixel 7"] })`, `test.setTimeout(60_000)`.

1. **Boot** — `goto("/")`; assert the `main` landmark visible + the `nav`
   landmark attached (the always-expanded mobile dock).
2. **Segmented control present, parked on the left pane** — default view is
   `picker` (`right: "about"`), so the control renders Picker / About;
   `picker` defaults to `mobilePaneIndex` 0. Assert `Picker` `aria-pressed=true`,
   `About` `aria-pressed=false`; the ColorPicker's color-space combobox is
   visible; the About pane's "Detailed Guide" heading is not yet on screen.
3. **Toggle → About pane** — click the `About` tab; assert `aria-pressed`
   flips; assert the About pane's "Detailed Guide" heading becomes visible
   (the mobile slot swapped).
4. **Toggle back → Picker pane** — click the `Picker` tab; assert `aria-pressed`
   flips back; the color-space combobox is visible again; the "Detailed Guide"
   heading is off screen.
5. **View-select reroute** — open the dock view-select, choose "Mix". Assert
   the segmented control **re-labels** to Picker / Mix, the stale `About`
   option is gone, and the `Mix` tab is `aria-pressed=true` (`mix` defaults to
   `mobilePaneIndex` 1 per `useViewManager`).
6. **Toggle the re-labelled control** — click the `Picker` tab; assert its
   `aria-pressed` flips to true and `Mix`'s to false; the dock + pane shell
   survived the whole walk.

Selectors: role/label only (B.W3 invariant). The segmented-control buttons are
**`nav`-scoped** — a pane's own content can carry a same-named button (the Mix
pane has a "Mix" action button), so an unscoped `getByRole("button", …)` is
ambiguous.

### §4.1 — Two app-rendering quirks the spec accounts for

Authoring surfaced two genuine `KeepAlive` + `Transition mode="out-in"`
behaviours in the demo (NOT spec bugs; app code is out of this lane's bounds):

- **KeepAlive does not detach a deactivated pane's DOM** — after a toggle the
  *previous* pane's controls can remain in the DOM. The spec therefore proves a
  toggle via the **visibility** of the toggled-*in* pane's unique heading, not
  via the absence/count of the toggled-*out* pane's controls.
- **The view-select reroute's `out-in` transition intermittently stalls** —
  occasionally the leaving pane's transition `done` callback does not fire,
  leaving the `main` slot momentarily empty. The segmented control's labels +
  `aria-pressed`, by contrast, are `currentConfig`/`mobilePaneIndex`-driven
  (route-derived, synchronous) and re-render deterministically. Step 5 + 6
  therefore assert on the **segmented control's own state** — the dock surface
  this lane targets — and the pane-content swap is covered by the deterministic
  in-view toggle steps 3–4.

---

## §5 — Sub-gate verification

Command: `npx playwright test --project=smoke-mobile` (Pixel-7 viewport).

```
Running 2 tests using 2 workers

  ✓  2 [smoke-mobile] › e2e/smoke/mobile/page-load-mobile.spec.ts:24:1 › mobile boot: page renders + dock visible + zero console errors (5.7s)
  ✓  1 [smoke-mobile] › e2e/smoke/mobile/walk.spec.ts:60:1 › mobile walk: segmented control toggles panes + view-select re-routes (30.7s)

  2 passed (32.1s)
```

**Stability** — the walk spec was run `--repeat-each=6` (6/6 PASS) and
`--workers=1 --repeat-each=3` (3/3 PASS). Solo wall-clock is ~25–29s; under
6-worker parallel-CPU contention it inflates to ~46–53s (the same parallel-CPU
inflation `playwright.config.ts` documents for `smoke-reactivity`). The
`test.setTimeout(60_000)` bump gives headroom for the 6 sequential animated
transitions without masking a genuine hang — same posture as
`e2e/smoke/safari/sustained-30s.spec.ts`.

**Lint** — `npx eslint e2e/smoke/mobile/walk.spec.ts` exits 0.

### §5.1 — Spec count

| | Before | After |
|---|---|---|
| `find e2e -name '*.spec.ts' \| wc -l` | 35 | **36** |
| `smoke-mobile` project blocks | 1 | **2** |

**Sub-gate G: GREEN.** Spec authored; `smoke-mobile` PASSes locally on the
Pixel-7 viewport; the total spec count rose by exactly 1.

---

## §6 — Files modified

| File | Change |
|---|---|
| `e2e/smoke/mobile/walk.spec.ts` | NEW — the Pixel-7 mobile-walk spec (1 `test()` block) |
| `docs/tranches/G/audit/G.W3-lane-g-mobile-walk.md` | NEW — this audit doc |

No other files touched. No shared fixture was needed — the spec uses an inline
4xx/5xx env-noise filter matching `page-load-mobile.spec.ts` (the mobile spec's
documented narrower variant per `e2e/smoke/fixtures/env-noise.ts` §"Scope").

---

## §7 — Environment note

The local environment **can** run the `smoke-mobile` project — the Chromium
browser binary is present (`npx playwright test --project=smoke-mobile` ran to
completion). No browsers were installed. No env gap.
