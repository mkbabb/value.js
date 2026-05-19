# D.W5 — Playwright coverage — 3 → ~20 specs across 3 projects

**Opens after**: D.W4 close.
**Lanes**: 3 — A (user-facing view specs + cross-view walk + WebGL), B (admin specs + admin-mock fixture), C (`smoke-mobile` Pixel-7 probe + `playwright.config.ts` updates + CI). All three are file-disjoint (different spec files, one `playwright.config.ts` touch sequenced last).
**Status**: planned.

Source: `research/Dg-playwright-coverage.md`. **Binding invariant** (inherited from B.W3 Lane D): role/label-only selectors. NO class selectors. NO `.lucide-*`. NO xpath. NO `page.evaluate()` for interaction. NO `waitForTimeout`. Per-spec budget: 25–35 lines (per-view), 35–45 (WebGL), ~55 (walks). Aggregate ~600 lines vs the abrogated suite's 3,510.

## Scope

`research/Dg-playwright-coverage.md §1` enumerated 14 views (9 user-facing + 5 admin); the 3 current smoke specs cover boot + 2 transitions. D.W5 expands to ~20:

### Lane A — user-facing view specs + walk + WebGL

`e2e/smoke/views/`:
- `picker.spec.ts` — open color-picker view, exercise the SpectrumCanvas pointer (role/label-only — assert `role="img"` aria-label updates on drag), assert the dock view-select reads "Home".
- `palettes.spec.ts` — switch to palettes view, assert the `Search palettes...` SearchBar + the empty-state copy + zero console errors.
- `browse.spec.ts` — switch to browse view, assert it renders the PaletteCardGrid (its post-B.W2 single-root + `useSortable` clean — invariant against the B.W1 regression).
- `extract.spec.ts` — switch to extract; assert the drop-zone (`role="button"` with the keyboard a11y from W5).
- `generate.spec.ts` — switch to generate, exercise the preset Select (role/label).
- `gradient.spec.ts` — switch to gradient; assert the visualizer renders.
- `mix.spec.ts` — switch to mix view.

`e2e/smoke/walk.spec.ts` — one spec walks ALL user views in sequence (`picker → palettes → browse → extract → generate → gradient → mix → back`), asserts 0 console errors throughout (exercises `usePaneRouter`'s component registry under transition load).

`e2e/smoke/webgl.spec.ts` — locate the atmosphere canvas (root-mounted, always alive) + the goo-blob canvas; assert no `webglcontextlost` and no `[stale prop]` console substrings during a 2s warm-up + a view switch. The `addInitScript`-installed `webglcontextlost` listener pattern is per `research/Dg-playwright-coverage.md §3`. Recommend `data-testid` additions to the canvases to eliminate the lone class selector.

**Sub-gate A**: `ls e2e/smoke/views/*.spec.ts` = 7; the walk + webgl specs exist; `npx playwright test --project=smoke` green (the 3 existing + ~9 new = 12 specs); zero banned-pattern hits in any spec.

### Lane B — admin specs + admin-mock fixture

`e2e/smoke/admin/`:
- `fixtures/admin-auth.ts` — the `addInitScript` fixture: seed `localStorage["palette-admin-token"]` with a fake token BEFORE `useAdminAuth()`'s lazy-init runs; install `page.route("**/api/admin/**")` wildcards returning empty-but-shape-correct JSON. The pattern is the categorical opposite of the killed W5-C login-flow mocking (`research/Dg-playwright-coverage.md §2`).
- `admin-users.spec.ts` — switch to admin-users via the dock; assert the AdminUsersPanel renders + the SearchBar placeholder is "Search users...".
- `admin-names.spec.ts` — admin-names; SearchBar "Search color names...".
- `admin-audit.spec.ts` — admin-audit; assert the refresh button (`aria-label="Refresh audit log"` from W5).
- `admin-flagged.spec.ts` — admin-flagged.
- `admin-tags.spec.ts` — admin-tags.

`e2e/smoke/admin-walk.spec.ts` — walk all 5 admin views in sequence; 0 console errors.

**Sub-gate B**: `ls e2e/smoke/admin/*.spec.ts` = 5; `e2e/smoke/admin/fixtures/admin-auth.ts` carries the mock; `e2e/smoke/admin-walk.spec.ts` exists; `npx playwright test --project=smoke-admin` green.

### Lane C — `smoke-mobile` + `playwright.config.ts` + CI

1. `e2e/smoke/mobile/page-load-mobile.spec.ts` — Pixel-7 viewport; one spec exercising the mobile-only paths (`PaneSegmentedControl` toggle, the mobile dock layer, the iOS-Safari-class bug surfaces). Per `research/Dg-playwright-coverage.md §6`: ONE probe, not a full mobile suite (Pixel-7 single-spec, 5-second budget).
2. `playwright.config.ts` — add `smoke-admin` (desktop Chromium + the admin fixture project setup) and `smoke-mobile` (Pixel-7) projects. The `smoke` project stays for user-facing specs. Sequence: `npx playwright test` runs all three when invoked without `--project`.
3. `.github/workflows/node.js.yml` — extend the CI step from `--project=smoke` to run all three projects: `npx playwright test --project=smoke --project=smoke-admin --project=smoke-mobile`. The Chromium install command may need `--with-deps` already; verify.
4. CI runtime budget — aggregate ~30–40 s across all three (per the research doc's estimate).

**Sub-gate C**: `playwright.config.ts` carries `smoke`/`smoke-admin`/`smoke-mobile` projects; CI workflow runs all three; `npx playwright test` (no `--project` flag) runs ~20 specs all green; CI runtime ≤ 60 s.

## File bounds

| Lane | Files |
|---|---|
| A | `e2e/smoke/views/*.spec.ts` (7 new), `e2e/smoke/walk.spec.ts` (new), `e2e/smoke/webgl.spec.ts` (new), `demo/@/components/custom/goo-blob/GooBlob.vue` + the atmosphere canvas (one `data-testid` add each — the only demo edits Lane A needs) |
| B | `e2e/smoke/admin/*.spec.ts` (5 new), `e2e/smoke/admin/fixtures/admin-auth.ts` (new), `e2e/smoke/admin-walk.spec.ts` (new) |
| C | `e2e/smoke/mobile/page-load-mobile.spec.ts` (new), `playwright.config.ts`, `.github/workflows/node.js.yml` |

## Gate

The conjunction of sub-gates A + B + C. **All projects green**: `npx playwright test --project=smoke` 12+ specs green; `--project=smoke-admin` 6+ specs green; `--project=smoke-mobile` 1 spec green. `vue-tsc` 126; `vitest` 1409. No banned patterns anywhere.

## Verification artefacts

`audit/D.W5-coverage.md` — per-spec list, the role/label selectors used, the admin-mock pattern, the CI runtime measurement, the data-testid additions.

## Commit plan

- `test(e2e/w5): expand smoke suite to all user views + walk + WebGL probe (12 specs)` — Lane A.
- `test(e2e/w5): admin-mock fixture + 5 admin-view smoke specs + admin-walk (smoke-admin project)` — Lane B.
- `test(e2e/w5): Pixel-7 single-spec smoke-mobile project + config + CI` — Lane C.

## Dependencies

- Depends on: D.W4 (cosmetic; no hard block).
- Blocks: D.W6 (close needs the expanded suite green).
