# B.W3 — value.js library audit + WIP disposition + typecheck cluster + e2e abrogation

**Opens after**: B.W2 close.
**Lanes**: 4 — A (read-only library gap audit), B (WIP disposition), C (custom typecheck cluster), D (e2e abrogation + smoke suite). Lane A is read-only; B sequences with A's output; C and D are file-disjoint from A/B and each other and run in parallel.
**Status**: planned.

> **Hardening note (2026-05-19).** This was B.W4. Renumbered (six waves → five). Lane A's scope picks up the `useViewManager` view-schema unification routed from B.W2.

## Scope

`research/Be-mandate-coverage.md §5` (Mandate 12 AND) + `research/Bα §1-2` (typecheck baseline + src/ WIP) + `research/B-e2e-investigation.md` (the consolidated e2e assay).

### Lane A — value.js library gap audit (READ-ONLY)

Deliverable: `audit/B.W3-library-gap.md`. Mandate 12 asked for "gaps in value.js AND glass-ui." A scoped `src/` out; B fulfils the AND.

Scope: `src/parsing/` (parser surface coverage vs the demo's needs, missing color-space-aware helpers), `src/units/` (`ValueUnit`/`FunctionValue`/`ValueArray`, conversion tables, missing interpolation/gamut primitives), `src/transform/decompose.ts`, `src/quantize/`, and the cross-cutting question of where the demo's color composables reach into library internals that should be public. Documentation coverage against `assets/docs/`.

**View-schema unification (routed from B.W2).** `useViewManager.ts` (~237 lines) owns both the view *schema* (`VIEW_MAP` — the pane route table) and the runtime *state* (current view, mobile pane index). After B.W2 collapses the dual router, `usePaneRouter` still re-derives shapes from that schema. Lane A audits whether the schema should be extracted (a `viewSchema.ts` consumed by both `useViewManager` and `usePaneRouter`) — a cohesion finding, recorded with a proposed destination; not implemented in this read-only lane.

**Invariant-30 compliance (precepts `3c32fae`).** value.js is itself a cross-repo publisher. Lane A verifies: `package.json` `exports` carries the 4-key shape `development`/`types`/`import`/`default` (already true — `package.json:23-27`); every subpath export follows the same shape; the consumer-side `resolve.conditions` are explicit; zero hard `dist/` aliases survive. Record whether value.js should port glass-ui's `proof-resolution-contract.mjs` fail-closed gate — recommendation only.

**Sub-gate A**: `audit/B.W3-library-gap.md` exists with a per-area finding count, a prioritized gap table, the view-schema verdict, and the invariant-30 compliance check.

### Lane B — `src/` WIP disposition

Five untracked files (`parsing/animation-shorthand.ts` 286, `parsing/extract.ts` 200, `parsing/serialize.ts` 156, `parsing/stylesheet.ts` 515, `units/interpolate.ts` 124), all re-exported from `src/index.ts` — public-API debt. Plus 3 modified (`src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`) and `plugins/vite-source-export.ts`.

Default: **commit all five** + the related modifications (the work is in the public API surface; the library owner clearly intended these to ship). If on inspection the WIP is genuinely abandoned, retire and remove from `src/index.ts`. The orchestrator + user decide per-file at wave open.

**Sub-gate B**: `git status` shows no untracked `src/**.ts`; the library build emits the expected `dist/` shape; the library test suite shows no regression.

### Lane C — custom typecheck cluster

Target: vue-tsc count from ~290 to ≤135 by fixing ~155 custom-component errors — `useInertiaGesture.ts` (18, index-narrowing), `useWatercolorBlob.ts` (16, index-narrowing), `GenerateControls.vue` (5), `GradientVisualizer.vue` (4), `BrowsePane.vue` (3), + ~6 SFCs. The ~104 generated shadcn-vue errors route to a future generator-update effort (recorded in `audit/B.W3-typecheck.md`); hero-lab's ~31 closed in B.W2.

**Sub-gate C**: `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` ≤ 135.

### Lane D — e2e abrogation + 3-spec smoke suite

`research/B-e2e-investigation.md` (the consolidated four-lane assay) found the 16-spec suite is ≈3,510 lines of brittle, largely-superfluous nonsense — ~42 `.lucide-*` selectors, ~132 `waitForTimeout`, ~34 `page.evaluate()` interaction-workarounds, ~29 `test.skip`, 2 dead live-API specs; `color-visual-validation` is a library unit test routed through a browser. The brittleness lane dissented (keep-and-migrate); the orchestrator overrode it — keep-and-migrate is the W5-C hang pattern, and the precept is "abrogate before patch."

1. **Invariant-33 pre-deletion corpus grep, then delete all 16 specs.** First (precepts `3c32fae`, invariant 33): grep the whole repo for any non-`e2e/` file importing an `e2e/*.spec.ts` or an `e2e/` helper, and grep `e2e/` for cross-spec imports — expect zero (spec files are Playwright entrypoints). Record the grep output in `audit/B.W3-smoke.md` as the deletion-justification proof. Then `rm e2e/*.spec.ts` — all 16: `admin-login-live`, `admin-panel`, `browse-palettes`, `color-docs-rendering`, `color-header-layout`, `color-picker`, `color-space-switching`, `color-visual-validation`, `edge-cases`, `mobile-layout`, `palette-api-live`, `palette-browser`, `palette-dialog-layout`, `palette-features`, `palette-slug-management`, `propose-name` — plus any `e2e/` helper modules the grep shows only those specs imported.
2. **Create `e2e/smoke/` with exactly 3 specs.** `getByRole`/`getByLabel`/`aria-label` selectors ONLY — no class selectors, no `.lucide-*`, no xpath, no `page.evaluate()` for interaction, no `waitForTimeout`:
   - `smoke/page-load.spec.ts` — navigate `/`, wait `main[aria-label="Color tool panes"]`, assert zero uncaught console errors, assert `<nav aria-label="Application navigation">` + `button[aria-label="Select color space"]` present.
   - `smoke/color-space-switching.spec.ts` — click `button[aria-label="Select color space"]`, pick "OKLab" via `getByRole("option", { name: "OKLab" })`, assert the trigger text + the URL-hash space parameter.
   - `smoke/view-switch.spec.ts` — click `button[aria-label="Select view"]`, pick "Palettes", assert `getByText("My Palettes")` visible; a mobile-viewport assertion of the single-pane layout.
   - No `smoke/admin-login.spec.ts` — admin-login mocking + dock slug-edit navigation was the W5-C hang root and is not smoke-critical. Record the exclusion in `audit/B.W3-smoke.md`.
3. **`playwright.config.ts`** — add a `smoke` project (desktop Chromium, `testDir: "./e2e/smoke"`); REMOVE the `mobile` project.
4. **`.github/workflows/node.js.yml`** — add after `npx vitest run`: `npx playwright install --with-deps chromium` then `npx playwright test --project=smoke`. The project's first automated CI gate on browser behaviour.

The per-wave orchestrator live Playwright probe stays the primary wave-gate (see `B.md §6` for the probe-qualification rule). The 2 live-API specs are replaced by nothing — a live API belongs in a separate staging harness, not the committed suite.

**Sub-gate D**: `e2e/*.spec.ts` (root) has 0 files (deletion proof); `e2e/smoke/` has exactly 3 specs; `playwright.config.ts` has `smoke`, no `mobile`; `grep -rE 'lucide|page\.evaluate\(|waitForTimeout|xpath=' e2e/smoke/` returns nothing; `npx playwright test --project=smoke` green; the CI workflow carries the smoke step.

## File bounds

| Lane | Files |
|---|---|
| A | `audit/B.W3-library-gap.md` (new) — read-only audit |
| B | `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts` |
| C | `useInertiaGesture.ts`, `useWatercolorBlob.ts`, `GenerateControls.vue`, `GradientVisualizer.vue`, `BrowsePane.vue`, + ~6 SFCs (finalized from `vue-tsc` output at wave open) |
| D | `e2e/*.spec.ts` (16 deleted); `e2e/smoke/{page-load,color-space-switching,view-switch}.spec.ts` (new); `playwright.config.ts`; `.github/workflows/node.js.yml` |

## Gate

Per `B.md §6`: the conjunction of sub-gates A–D plus the Playwright probe. `npm run build` clean; `npm test` 1409+ (library suite no regression after Lane B); `vue-tsc` ≤ 135.

## Verification artefacts

`audit/B.W3-library-gap.md`, `audit/B.W3-wip-disposition.md`, `audit/B.W3-typecheck.md` (before/after errors per file), `audit/B.W3-smoke.md` (the invariant-33 grep proof; the 16 deletions; the 3 smoke specs; the admin-login exclusion rationale).

## Commit plan

- `audit(tranche-b/w3): value.js library gap audit (Mandate 12 AND)` — Lane A.
- `feat(library/w3): commit src/ WIP — parsing/{animation-shorthand,extract,serialize,stylesheet}, units/interpolate` — Lane B (or `chore(library/w3): retire src/ WIP` on the retire path).
- `fix(types/w3): close custom-component typecheck cluster (-155 errors)` — Lane C.
- `test(e2e): abrogate the 16-spec Playwright suite, replace with a 3-spec role-based smoke suite + CI gate` — Lane D. Body cites `research/B-e2e-investigation.md`, lists the 16 deletions, names the brittleness-lane dissent and the override.

## Dependencies

- Depends on: B.W2.
- Blocks: B.W4.
