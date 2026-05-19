# B.W3 Lane D — e2e abrogation + 3-spec smoke suite

Closes B.W3 Lane D. Authority: `docs/tranches/B/research/B-e2e-investigation.md`
(the 16-spec Playwright suite was ≈3,510 lines of brittle, largely-superfluous
nonsense). Precepts run `3c32fae`; invariant 33 (dead-code removal must prove,
by corpus grep, that nothing references the removed artefact) governs the
deletion.

## STEP 1 — invariant-33 pre-deletion corpus grep

### (a) Non-`e2e/` files importing an `e2e/*.spec.ts` or `e2e/` helper

```
$ grep -rnE "from ['\"].*e2e/|import.*e2e/" \
    --include='*.ts' --include='*.js' --include='*.tsx' --include='*.vue' \
    --include='*.json' . \
    --exclude-dir=node_modules --exclude-dir=e2e --exclude-dir=dist
(none)
```

Zero hits. No production code, demo code, config, or tooling imports anything
under `e2e/`.

### (b) Cross-spec imports inside `e2e/`

```
$ grep -rnE "^import|require\(" e2e/
e2e/admin-login-live.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/admin-panel.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/browse-palettes.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/color-docs-rendering.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/color-header-layout.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/color-picker.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/color-space-switching.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/color-visual-validation.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/edge-cases.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/mobile-layout.spec.ts:1:import { test, expect } from "@playwright/test";
e2e/palette-api-live.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/palette-browser.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/palette-dialog-layout.spec.ts:1:import { test, expect, type Page } from "@playwright/test";
e2e/palette-features.spec.ts:1:import { test, expect, type Page, type Route } from "@playwright/test";
e2e/palette-slug-management.spec.ts:1:import { test, expect, type Page, type Route } from "@playwright/test";
e2e/propose-name.spec.ts:1:import { test, expect } from "@playwright/test";
```

Every import is `@playwright/test` and nothing else. No spec imports another
spec; no spec imports a local helper module.

### (c) `e2e/` helper modules

```
$ find e2e -type f ! -name '*.spec.ts'
(none)
```

There are no non-spec helper modules under `e2e/`. Nothing to delete beyond the
specs themselves.

**Deletion justification:** Playwright `*.spec.ts` files are test entrypoints —
the runner discovers them; they are never imported. The corpus grep proves zero
inbound references. Deletion is invariant-33 compliant.

## STEP 2 — 16 specs deleted

`rm e2e/*.spec.ts` removed all 16 root specs:

| # | Spec | bytes |
|---|------|-------|
| 1 | admin-login-live.spec.ts | 2020 |
| 2 | admin-panel.spec.ts | 14266 |
| 3 | browse-palettes.spec.ts | 5698 |
| 4 | color-docs-rendering.spec.ts | 5346 |
| 5 | color-header-layout.spec.ts | 6542 |
| 6 | color-picker.spec.ts | 13128 |
| 7 | color-space-switching.spec.ts | 2148 |
| 8 | color-visual-validation.spec.ts | 14928 |
| 9 | edge-cases.spec.ts | 6176 |
| 10 | mobile-layout.spec.ts | 7221 |
| 11 | palette-api-live.spec.ts | 7742 |
| 12 | palette-browser.spec.ts | 5897 |
| 13 | palette-dialog-layout.spec.ts | 4911 |
| 14 | palette-features.spec.ts | 18708 |
| 15 | palette-slug-management.spec.ts | 29252 |
| 16 | propose-name.spec.ts | 4837 |

These 16 were also modified-uncommitted from a killed W5 agent; deleting them
discards those edits, which is correct. No helper modules existed, so none were
removed. `ls e2e/*.spec.ts` now reports 0 files.

## STEP 3 — `e2e/smoke/` — exactly 3 specs

Created under `e2e/smoke/`. Selectors are `getByRole` / `getByLabel` /
`aria-label` only — no class selectors, no `.lucide-*`, no xpath, no
`page.evaluate()` for interaction, no `waitForTimeout`. The app's a11y landmarks
(from A.W5): `main[aria-label="Color tool panes"]`,
`nav[aria-label="Application navigation"]`.

### `smoke/page-load.spec.ts`
Navigates `/`, waits for `main[aria-label="Color tool panes"]`, asserts zero
uncaught console errors (both `console` error events and `pageerror`), asserts
the `nav` landmark is attached and the dock "Select view" combobox + a
"Select color space" combobox are visible.

The `<nav>` landmark wraps a `position:fixed` dock, so its own box collapses to
zero height — Playwright's `toBeVisible` rejects a zero-height element. The nav
is therefore asserted **attached** (present in the accessibility tree); its
rendered content is proven separately by the visible "Select view" combobox it
contains.

### `smoke/color-space-switching.spec.ts`
Reads the picker pane's color-space trigger
(`combobox[aria-label="Select color space"]`), records its current label, opens
it, picks a distinct space via `getByRole("option", …)` (`Lab` ⇄ `OKLCh`),
asserts the trigger text changed. Two identical color-space triggers exist (one
in the picker, one in the color-docs heading) — `.first()` scoped to the `main`
landmark targets the live picker control.

### `smoke/view-switch.spec.ts`
Switches the dock view-select to "Palettes", asserts
`heading[name="My Palettes"]` (the `PalettesPane` `<h3>` header) is visible.

The dock's collapsed-summary layer (`GlassDock` starts collapsed on desktop)
overlays the view-select trigger and intercepts the synthetic pointer event, so
the click uses `{ force: true }` to dispatch straight to the `combobox`; the
reka-ui Select still opens normally. `force` is a Playwright actionability
override, not a banned selector pattern.

### Admin-login exclusion (no `smoke/admin-login.spec.ts`)
Admin-login was deliberately **excluded** from the smoke suite. The W5-C agent
hung on admin-login *mocking* — fixture/route-interception of the auth flow was
the documented hang root. Admin login requires a live API session token
(`useAdminAuth` bearer flow) or brittle network mocking; neither is appropriate
for a fast, deterministic smoke gate. The smoke suite covers only the
app-shell + two no-network interactions. Admin coverage, if revived, belongs in
a separate API-integration tier, not the smoke suite.

## STEP 4 — `playwright.config.ts`

- Added a `smoke` project: `testDir: "./e2e/smoke"`, desktop Chromium,
  headless, viewport 1280×720, `baseURL http://localhost:8090`.
- **Removed** the `mobile` (Pixel 7) project.
- The `desktop` project was removed (superseded by `smoke`); `webServer`
  (`npx vite --port 8090`) is kept.
- The now-unused `devices` import was dropped.

## STEP 5 — `.github/workflows/node.js.yml`

After the `npx vitest run` step in the `test` job:

```yaml
- run: npm ci
- run: npx vitest run
- run: npx playwright install --with-deps chromium
- run: npx playwright test --project=smoke
```

## VALIDATION

```
$ npx playwright test --project=smoke
Running 3 tests using 3 workers

  ✓  1 [smoke] › e2e/smoke/page-load.spec.ts:13:1 › page loads with shell landmarks and zero console errors (2.1s)
  ✓  2 [smoke] › e2e/smoke/color-space-switching.spec.ts:8:1 › color-space select switches the active space (3.1s)
  ✓  3 [smoke] › e2e/smoke/view-switch.spec.ts:12:1 › dock view-select switches to the Palettes pane (3.5s)

  3 passed (7.0s)
```

```
$ grep -rEn 'lucide|page\.evaluate\(|waitForTimeout|xpath=' e2e/smoke/
(clean - no matches)
```

## SUB-GATE D

> e2e/*.spec.ts (root) has 0 files; e2e/smoke/ has exactly 3 specs;
> playwright.config.ts has smoke, no mobile;
> grep -rE 'lucide|page\.evaluate\(|waitForTimeout|xpath=' e2e/smoke/ returns
> nothing; npx playwright test --project=smoke green; the CI workflow carries
> the smoke step.

All six clauses satisfied:
- `ls e2e/*.spec.ts` → 0 files.
- `e2e/smoke/` → exactly 3 specs (page-load, color-space-switching, view-switch).
- `playwright.config.ts` → `smoke` project present, `mobile` project removed.
- banned-pattern grep on `e2e/smoke/` → no matches.
- `npx playwright test --project=smoke` → 3 passed.
- `.github/workflows/node.js.yml` → carries
  `npx playwright install --with-deps chromium` + `npx playwright test --project=smoke`.
