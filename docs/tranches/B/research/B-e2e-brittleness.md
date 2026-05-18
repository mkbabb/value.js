# B — E2E Brittleness Audit

**Lane:** e2e-brittleness. Read-only. Date: 2026-05-18.
**Basis:** 16 specs under `e2e/`, `playwright.config.ts`, prior tranche-A audit `Bd-w5-audit.md §3`.

---

## 1. Brittleness Table

Column key:

- **lucide** — count of `.lucide-*` class selectors (icon-class; breaks whenever an icon is swapped in glass-ui)
- **css-class** — count of raw structural CSS-class selectors (`.glass-dock`, `.spectrum-picker`, `.glass-carousel-item`, `.pane-shell`, `.pane-scroll-fade`, `.slug-pill`, `.dock-layer-item-host`, `.toggle-btn`, `.markdown-wrapper`, `h3.flex`)
- **xpath** — count of `xpath=ancestor::` traversal selectors (break on any DOM restructure)
- **layout/px** — count of lines asserting `boundingBox`, `getBoundingClientRect`, `getComputedStyle`, `scrollWidth`, `scrollHeight`, `clientHeight`, `clientWidth` (fails on any design change)
- **waits** — count of `waitForTimeout` calls (fixed-delay races)
- **live-API** — requires running Hono+MongoDB backend
- **gate** — `PALETTE_API_E2E=1` env var controls live tests

| Spec | lucide | css-class | xpath | layout/px | waits | live-API? | Nonsense Score 0–5 |
|---|---|---|---|---|---|---|---|
| `admin-login-live.spec.ts` | 2 | 0 | 0 | 0 | 3 | YES (hard gate) | **3** |
| `admin-panel.spec.ts` | 1 | 2 | 0 | 0 | 16 | mock | **3** |
| `browse-palettes.spec.ts` | 2 | 2 | 0 | 0 | 9 | mock | **2** |
| `color-docs-rendering.spec.ts` | 0 | 4 | 0 | 0 | 1 | none | **2** |
| `color-header-layout.spec.ts` | 0 | 4 | 1 | 2 | 2 | none | **4** |
| `color-picker.spec.ts` | 0 | 11 | 0 | 3 | 8 | none | **3** |
| `color-space-switching.spec.ts` | 0 | 3 | 0 | 0 | 0 | none | **1** |
| `color-visual-validation.spec.ts` | 0 | 0 | 0 | 1 | 0 | none | **1** |
| `edge-cases.spec.ts` | 2 | 4 | 1 | 8 | 8 | none | **3** |
| `mobile-layout.spec.ts` | 2 | 3 | 0 | 9 | 5 | none | **3** |
| `palette-api-live.spec.ts` | 7 | 3 | 3 | 0 | 2 | YES (hard gate) | **4** |
| `palette-browser.spec.ts` | 7 | 2 | 0 | 0 | 10 | mock | **3** |
| `palette-dialog-layout.spec.ts` | 1 | 3 | 0 | 6 | 4 | none | **4** |
| `palette-features.spec.ts` | 6 | 2 | 0 | 0 | 10 | mock | **2** |
| `palette-slug-management.spec.ts` | 11 | 3 | 0 | 0 | 51 | mock | **4** |
| `propose-name.spec.ts` | 2 | 2 | 0 | 0 | 3 | none | **5** |

**Total brittle selectors: 43 `.lucide-*` + ~52 CSS-class + 5 xpath = ~100 selector fragility points across 3,510 lines.**

---

## 2. Worst Offenders

### `propose-name.spec.ts` — Score 5 (pure nonsense)

Five tests in this file. Four are unconditionally `test.skip()` because of a known app bug (`is-active` vs `layer-active` class mismatch in the dock). Only one test runs at all ("tag icon is visible for unnamed colors"), and it exercises 3 separate CSS-class selectors (`.glass-dock`, `.glass-dock.expanded`) and 2 lucide selectors (`.lucide-type`, `.lucide-tag`) to reach a single `toBeVisible` assertion. The test body requires a random color cycle via `button[aria-label="Random color"]` and multi-step dock activation. This is 106 lines to ship 1 test that might run, 4 tests that never run, and a comment block documenting the app bug responsible for the skips. It is waste. Zero regression protection, high maintenance surface.

### `palette-slug-management.spec.ts` — Score 4 (severe)

Largest file at 691 lines. 51 `waitForTimeout` calls — the highest count in the suite. This is not automation; it is a prayer ceremony. Each wait is a fixed-delay race against an animation, a Vue re-render, or a reka-ui Select portal. The `openSlugEditViaProfile` helper has a fallback chain: aria-label → `.lucide-user-circle` → `.lucide-log-in`, meaning the spec silently degrades to icon-class selectors whenever aria-labels are absent. Two tests pass unconditionally because their assertion bodies contain no actual `expect` calls ("invalid slug shows error" has no assertions at all; "entering admin token activates admin mode" ends with `// Test passes if we got here without throwing`). These are not tests; they are script skeletons that green-light without verifying behaviour.

### `palette-api-live.spec.ts` — Score 4 (severe, offline-dead)

The single 148-line test requires a live Hono+MongoDB backend at `http://127.0.0.1:3100`. It is gated by `PALETTE_API_E2E=1` and **cannot run offline** — it will immediately skip and silently pass. The test itself is structurally sound (publish, vote, propose, admin approve, delete, verify HTTP 404), but its 7 `.lucide-*` selectors, 3 `xpath=ancestor::` traversals against Tailwind utility classes (`group`, `relative`, `rounded-md border`), and reliance on hardcoded mock slugs/tokens make it brittle even when the API is live. The xpath traversals are particularly bad: `ancestor::div[contains(@class, 'rounded-md border')]` will break the instant a single Tailwind class name changes on the queue row element.

### `color-header-layout.spec.ts` — Score 4 (layout-pixel failure by design)

Two of four tests are permanently `test.skip()` — not because of infrastructure limits but because they are marked "CATEGORY-B APP BUG" in the comments. They assert that the ColorComponentDisplay row does not wrap across color spaces, and they find that it wraps. The test found a real bug and was then disabled rather than fixed. The one remaining non-skipped layout test ("header does not overflow card width") calls `boundingBox()` twice and asserts pixel-level containment via `headerBox.x + headerBox.width <= cardBox.x + cardBox.width + 1`. The card ancestor is found via `xpath=ancestor::div[contains(@class, 'rounded')]` — a Tailwind-class-anchored xpath. This test breaks on: (a) any restyle that changes the `rounded` class name, (b) any component restructure that introduces or removes a wrapping `div`, (c) any layout change that affects the computed widths. That is the definition of a restyle project. A test that breaks on every wave of work in a restyle-heavy repo is an active cost, not a regression guard.

### `palette-dialog-layout.spec.ts` — Score 4

Name is historically stale — there is no palette dialog (it was removed in W4). The spec now tests the PalettesPane scroll layout with 8 `savePalette` calls in a loop. Layout assertions: `getBoundingClientRect` for `top/right/bottom/left/viewportWidth/viewportHeight`, then `getComputedStyle` for `overflowY`, `clientHeight`, and `scrollHeight`. These are pixel-level assertions on a pane that gets restyled. The only assertions that are not inherently brittle are the overflow check (a `scrollHeight > clientHeight` condition that trivially passes once 8 palettes exist) and the `overflowY in ["auto","scroll"]` check (which is a CSS property value, not a pixel value, and is fairly stable). The bounding-rect assertions make this brittle.

---

## 3. Why Layout-Pixel E2E Assertions Are Categorically Wrong for This Project

The explicit mandate of the Tranche B work is **visual restyle**: new glassmorphism layout, glass-ui dock components, component restructure across multiple waves. Every wave of B work is, by design, a set of changes that will cause layout geometry to shift.

A layout-pixel e2e assertion encodes the _current implementation's geometry_ as a test oracle. When the restyle changes that geometry (intentionally), the test fails — not because the app regressed, but because the test is asserting the old design. The developer must now fix both the layout and the test. The test provides no signal about whether the new layout is _correct_; it only signals that it is _different_.

This is the opposite of what a regression test should do. A regression test should catch unintended changes. A layout pixel test catches all layout changes, intended or not. For a restyle-heavy project, that means the test will break on every wave, requiring test maintenance on every wave even when there is no regression.

The correct model for layout correctness in a restyle project is:
1. **Semantic assertions** (`toBeVisible`, `not.toBeVisible`, `toContainText`, `toHaveRole`) — verify the element is present and accessible, not where it sits in pixels.
2. **Overflow invariants as functional tests** — "no horizontal scroll on mobile" is a functional constraint, not a pixel value. The current `scrollWidth <= clientWidth + 1` test in `edge-cases.spec.ts` is defensible on this basis, even if it uses `scrollWidth`.
3. **Visual regression as a separate, opt-in layer** — if pixel-level visual regression is needed, use Playwright's `toHaveScreenshot` with baseline images that are explicitly updated on restyle waves. Do not scatter `boundingBox()` math throughout functional specs.

The four specs with layout/pixel assertions (`color-header-layout`, `palette-dialog-layout`, `edge-cases`, `mobile-layout`) break this rule to varying degrees.

---

## 4. Flakiness: The `waitForTimeout` Problem

`palette-slug-management.spec.ts` has 51 `waitForTimeout` calls in 691 lines — one every ~14 lines of actual code. This is a structural confession that the spec does not know when state changes have settled. The correct pattern is `waitForSelector`, `toBeVisible`, or `page.waitForFunction`. Fixed delays race: on a slow CI runner the 300ms wait for a Vue re-render may be insufficient; on a fast dev machine 500ms may be wasteful. Neither guarantees correctness.

The 16-spec suite accumulates 144 `waitForTimeout` calls total. At a conservative average of 350ms each, that is ~50 seconds of fixed sleeping per full suite run, before any actual assertion time. This is also the primary reason the suite felt "hung" in the W5 diagnostic.

The `color-picker.spec.ts` "rapid spectrum dragging" test uses `Date.now()` delta measurements to compute a p95 frame time and asserts `< 100ms`. This is an environment-dependent performance assertion. On a CI container that is CPU-throttled or running other jobs, this will flap.

---

## 5. Live-API Specs: Can They Run Offline?

**`admin-login-live.spec.ts`**: Gated by `test.skip(!RUN_LIVE, ...)` where `RUN_LIVE = process.env.PALETTE_API_E2E === "1"`. Without the env var, the entire describe block skips. **Offline: silently passes (skips).** Meaningful: NO.

**`palette-api-live.spec.ts`**: Same gate. `RUN_LIVE = process.env.PALETTE_API_E2E === "1"`. The spec also hardcodes `API_BASE_URL = process.env.VITE_API_URL ?? "http://127.0.0.1:3100"`. Without the env var, **offline: silently passes (skips).** Without the running API (even with the env var set), the `page.waitForResponse` assertions will time out at 30s. **Offline with env set: full 30s timeout then hard fail.** There is no mock fallback.

Both live specs are **meaningless in CI without a separate API service**. The suite's CI configuration (`playwright.config.ts`) does not spin up the API (`webServer` only starts Vite at port 8090). The live specs provide zero regression coverage in any standard CI run.

---

## 6. Tautology and Empty Assertions

Several tests pass regardless of application behaviour:

- `admin-panel.spec.ts:325` — `expect(true).toBe(true)`. This is in the success branch of a `.then()` that fires if `adminToggle.isVisible()` resolves. The failure branch has a comment "admin auth not activated by token in mock — pass gracefully." The test cannot fail.
- `admin-panel.spec.ts:269` — `expect(paneVisible || await emptyState.isVisible().catch(() => false)).toBe(true)`. One of these will always be true (either the pane is visible or it isn't and the empty state is shown, or the empty state isn't shown but `catch(() => false)` suppresses it). Cannot fail.
- `palette-slug-management.spec.ts:433` — "invalid slug shows error" has no `expect` call at all. The test exits with success by exhaustion.
- `palette-slug-management.spec.ts:564–567` — "entering admin token activates admin mode" stores the `isAdminVisible` boolean and then comments "Test passes if we got here without throwing." The boolean is never used in an assertion.
- `propose-name.spec.ts:89–104` — 4 of 5 tests are `test.skip()` (unconditional). The spec contributes zero runtime assertions and documents a blocking app bug in its skip reasons.
- `edge-cases.spec.ts:47–50` — "slug preview appears" has a wrapped `if (await slugText.isVisible(...))` block; if the element is absent the test exits with the comment "// If no slug preview, the test still passes." Cannot fail.

These are not tests. They are documentation scaffolds with green lights attached.

---

## 7. Config: `retries: 0` in Non-CI

`playwright.config.ts`:
```
retries: process.env.CI ? 2 : 0,
timeout: 30000,
expect: { timeout: 8000 },
```

The original tranche-A audit cited `timeout: 15000` as evidence. The current config has `timeout: 30000` globally, so the suite was updated. However `retries: 0` in non-CI means a locally flaky test that intermittently passes on CI (with 2 retries) will look green in CI and flap locally, creating a false signal. The correct approach for a flaky-heavy suite is to fix the flakiness sources (the 144 `waitForTimeout` calls, the icon-class selectors, the reka-ui event dispatch workarounds) rather than rely on retries.

The `palette-api-live.spec.ts` has `test.setTimeout(120_000)` — 2 minutes for a single test. The `palette-dialog-layout.spec.ts` has `test.setTimeout(60_000)`. These are signals that the authors knew these tests were slow, not that they were correct.

---

## 8. Specs That Survive a Brittleness Lens

Three specs are substantially sound:

**`color-visual-validation.spec.ts` — Score 1.** No lucide selectors, no CSS-class selectors, no xpath, zero `waitForTimeout` calls. It injects the library's own parsing module into the browser via Vite's `/@fs/` import, parses 100+ color strings, and compares the output against the browser's native CSS engine. This is the spec most tightly coupled to actual library correctness — it tests the `parseCSSColor` + `normalizeColorUnit` pipeline rather than UI presentation. The screenshot at line 350 is write-only (to `test-results/`) and not a snapshot assertion. The one weakness: it imports from `src/parsing/units.ts` and `src/units/color/normalize.ts` by hardcoded path, so file renames break it. Still the best spec in the suite.

**`color-space-switching.spec.ts` — Score 1.** 49 lines. Uses 3 CSS-class selectors (`.glass-carousel-item`, `.spectrum-picker`) as a necessary concession where no aria-label exists on those components. Otherwise all aria-label / role selectors. No pixel assertions, no timeouts, no live API. Tests all 10 color spaces for slider label correctness and spectrum presence. Compact and purposeful.

**`palette-features.spec.ts` — Score 2.** Uses mock API routes correctly, tests vote toggle state, sort, featured badge, session header, and color count badge. The assertions are semantic (`toHaveClass(/fill-red-500/)`, `getByText`, `toBeVisible`). The `lucide-heart`, `lucide-clock`, `lucide-trending-up`, `lucide-award` selectors are the brittleness source (6 icon-class usages), but they are anchored to specific domain behaviour (heart fill = voted, award icon = featured badge). If those icons are swapped, the test fails appropriately. The 10 `waitForTimeout` calls are the main concern but the mock API avoids network races.

---

## 9. Disposal Recommendation

| Spec | Recommendation |
|---|---|
| `propose-name.spec.ts` | **Delete.** 4 of 5 tests skip unconditionally due to a known app bug. The 1 remaining test is a navigation exercise with no regression value. Re-write from scratch when the dock layer-active bug is fixed. |
| `color-header-layout.spec.ts` | **Delete the 2 skipped layout tests; retain the 2 semantic tests** ("component values render valid numbers", "component display has correct aria labels"). The xpath+boundingBox overflow test should be rewritten without pixel math. |
| `palette-dialog-layout.spec.ts` | **Rewrite.** The `getBoundingClientRect` / `getComputedStyle` layout assertions should be replaced with scroll-presence and visibility assertions. |
| `palette-slug-management.spec.ts` | **Reduce scope.** 691 lines, 51 timeouts, 4 tautological tests. Cull the empty-assertion tests. Replace `waitForTimeout` chains with `waitForSelector` / `toBeVisible`. |
| `admin-panel.spec.ts` | **Reduce scope.** Strip the tautological `expect(true).toBe(true)` and `expect(paneVisible || ...)` patterns. Replace with real assertions or skip explicitly with a reason. |
| `admin-login-live.spec.ts` | **Keep with gate.** 53 lines, clean, properly gated. Only brittle point: `.lucide-palette` + `.lucide-ellipsis` for dialog open and menu trigger; migrate to aria-label selectors. |
| `palette-api-live.spec.ts` | **Keep with gate.** Structurally sound integration test. The xpath traversals need migration to aria-label anchors. Cannot run offline by design — acceptable. |
| `color-visual-validation.spec.ts` | **Keep as-is.** The best spec in the suite. |
| `color-space-switching.spec.ts` | **Keep as-is.** Minimal, correct. |
| `palette-features.spec.ts` | **Keep, migrate 6 icon selectors to aria-label.** |
| All others | Audit each `waitForTimeout` and replace with event-driven waits. |
