# B-e2e — Investigation: the 16-spec Playwright suite

**Tranche B e2e assay** — a 4-lane read-only investigation, 2026-05-18 (census, overlap, brittleness, target). Consolidated into one doc by the 2026-05-19 hardening pass (the 4 separate lane docs were apparatus bloat). Verdict: **abrogate all 16, replace with a 3-spec smoke suite.**

## §1 — Census (intrinsic value)

16 specs, ≈3,510 lines. By intrinsic value: **4 NONSENSE, 6 SUPERFLUOUS, 6 essential-but-entangled.**

- **NONSENSE (4)** — `color-visual-validation` (injects `parseCSSColor`/`colorUnit2` into Chromium, exercises zero UI — a unit test in a browser sandbox), `palette-dialog-layout` (asserts a CSS `overflow-y` value + reads back a `scrollTop` it set itself; the dialog it names was removed in W4), `color-header-layout` (2/5 `test.skip`'d "CATEGORY-B APP BUG"; pixel bbox math on an xpath ancestor), `color-docs-rendering` (120 iterations asserting the docs author's prose contains the right symbols).
- **SUPERFLUOUS (6)** — `browse-palettes` (duplicates `palette-browser`), `color-space-switching`, `edge-cases`, `mobile-layout`, `propose-name` (4/5 `test.skip`'d), partial `color-docs`.
- **Essential-but-entangled (6)** — `admin-panel`, `color-picker`, `palette-browser`, `palette-features`, `palette-slug-management`, + the 2 live-API specs (`admin-login-live`, `palette-api-live`, gated by `PALETTE_API_E2E=1`, zero CI coverage). Genuine flows — but entangled in brittle selectors (see §3).

## §2 — Overlap with the vitest suite

value.js has 1409 vitest unit tests. An e2e test earns its keep only by testing integration a unit test cannot. **`color-visual-validation` is a unit test routed through a headless browser** — 3 of its 4 blocks run `parseCSSColor`+`colorUnit2` on the same 100+20+22 inputs already exhaustively covered by `color-validation.test.ts` (567 tests, identical pipeline). ~120–140 e2e assertions duplicate unit coverage, almost all in this one spec; it multiplies runtime ~100× for no added coverage. The other 15 specs carry no material library-logic redundancy.

## §3 — Brittleness

≈100 selector-fragility points across the suite: **~42 `.lucide-*` icon-class selectors, ~52 raw CSS-class selectors, 5 `xpath=ancestor::` traversals.** Plus **~144 `waitForTimeout` fixed-delay sleeps** (51 in `palette-slug-management` alone — ≈50s of pure sleeping per full run, the root of the W5 "hung" diagnostic), ~29 `test.skip`, and several tautological tests (`expect(true).toBe(true)`, tests with no `expect` at all, `// passes if we got here`). 10 of 16 score ≥3/5 on nonsense.

Layout-pixel e2e assertions (`boundingBox`/`getComputedStyle` math in `color-header-layout`, `palette-dialog-layout`, `edge-cases`, `mobile-layout`) are categorically wrong for a restyle-heavy project: they encode the *current* geometry as an oracle, so every intentional restyle breaks them — they catch *all* layout change, not *unintended* change.

**Dissent (recorded).** The brittleness lane recommended keep-and-migrate and called `color-visual-validation` "the best spec in the suite." The orchestrator **overrode** it: keep-and-migrate (selector migration across 16 specs) is exactly the W5-C task that hung, and "best spec" is refuted by §2's proof that `color-visual-validation` is a misplaced unit test. The dissent is preserved here, not dropped.

## §4 — Target: abrogate and replace

**Delete all 16 `e2e/*.spec.ts`** (≈3,510 lines). The suite is not salvageable by selector migration — that *was* the W5-C task and it hung. Per precept "abrogate before patch": delete, write fresh.

**Create `e2e/smoke/` — exactly 3 specs**, `getByRole`/`getByLabel`/`aria-label` selectors only (no class selectors, no `.lucide-*`, no xpath, no `page.evaluate()` for interaction, no `waitForTimeout`):

1. `smoke/page-load.spec.ts` — navigate `/`, wait `main[aria-label="Color tool panes"]`, assert zero console errors + `<nav>` landmark + the color-space trigger present.
2. `smoke/color-space-switching.spec.ts` — switch to OKLab via the role-named option, assert the trigger text + the URL-hash space parameter.
3. `smoke/view-switch.spec.ts` — switch to the Palettes view, assert `getByText("My Palettes")`; a mobile-viewport single-pane assertion.

**No `smoke/admin-login.spec.ts`** — admin-login mocking + dock slug-edit navigation is the most fragile flow and was the W5-C hang root; not smoke-critical.

**`playwright.config.ts`** gains a `smoke` project, loses `mobile`. **`.github/workflows/node.js.yml`** gains `playwright test --project=smoke` — the project's first automated browser CI gate. The 2 live-API specs are replaced by nothing (a live API belongs in a separate staging harness); `color-visual-validation` is replaced by the existing vitest suite; the 13 palette/admin/browse/docs/layout specs are replaced by the per-wave orchestrator live probe.

Net: −3,510 lines of brittle nonsense, +≈120 lines of clean smoke coverage, +the project's first browser CI gate. Folded into **B.W3 Lane D**.
