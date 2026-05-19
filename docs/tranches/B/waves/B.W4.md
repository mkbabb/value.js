# B.W4 — value.js library audit + WIP disposition + typecheck cluster + e2e abrogation

**Opens after**: B.W3 close.
**Agents**: 4 lanes (A — read-only library gap audit; B — WIP disposition decisions; C — custom typecheck cluster fixes; D — e2e abrogation + smoke suite). Lane A is read-only; B sequences with A's output. C and D are file-disjoint from A/B and each other.
**Hard gate**: `audit/B.W4-library-gap.md` exists; 5 untracked WIP files dispositioned; vue-tsc custom-component cluster drops by ~155 (target total ≤ 135); **all 16 `e2e/*.spec.ts` deleted**; `e2e/smoke/` has exactly 3 role/label specs; `playwright.config.ts` has a `smoke` project and no `mobile` project; CI runs the smoke step; `npm run test:e2e -- --project=smoke` green.
**Status**: planned.

## Scope

Folded from `research/Be-mandate-coverage.md §5` (Mandate 12 AND) + `research/Bα §1, §2` (typecheck baseline + src/ WIP) + the four e2e assay lanes (`research/B-e2e-census.md`, `B-e2e-overlap.md`, `B-e2e-brittleness.md`, `B-e2e-target.md`).

### Lane A — value.js library gap audit (READ-ONLY)

Deliverable: `audit/B.W4-library-gap.md`. Mandate 12 asked for "gaps in value.js AND glass-ui." A scoped `src/` out; B fulfils the AND.

Scope: `src/parsing/` (parser surface coverage vs the demo's needs, missing color-space-aware helpers), `src/units/` (`ValueUnit`/`FunctionValue`/`ValueArray`, conversion tables, missing interpolation/gamut primitives), `src/transform/decompose.ts`, `src/quantize/`, and the cross-cutting question of where the demo's color composables reach into library internals that should be public. Documentation coverage against `assets/docs/`.

**Invariant-30 compliance (precepts `3c32fae`).** value.js is itself a cross-repo publisher. Lane A verifies: `package.json` `exports` carries the 4-key shape `development`/`types`/`import`/`default` (already true — `package.json:23-27`); every subpath export follows the same shape; `vite.config.ts` consumer `resolve.conditions` are explicit; zero hard `dist/` aliases survive. Record in the audit doc whether value.js should port glass-ui's `proof-resolution-contract.mjs` fail-closed gate (a `npm run proof:resolution` script) — recommendation only; Lane A is read-only.

Output: a table of (gap | evidence file:line | proposed destination). Read-only; actionable items become B's call after the audit lands.

**Sub-gate A**: `audit/B.W4-library-gap.md` exists with a per-area finding count + a prioritized table.

### Lane B — `src/` WIP disposition

Five untracked files (`parsing/animation-shorthand.ts` 286, `parsing/extract.ts` 200, `parsing/serialize.ts` 156, `parsing/stylesheet.ts` 515, `units/interpolate.ts` 124), all re-exported from `src/index.ts` — public-API debt. Plus 3 modified (`src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`) and 1 imported-but-tracked (`plugins/vite-source-export.ts`).

Default: **commit all five** + the related modifications (the work is in the public API surface; the library owner clearly intended these to ship). If on inspection the WIP is genuinely abandoned, retire and remove from `src/index.ts`. The orchestrator + user decide per-file at wave open.

**Sub-gate B**: `git status` shows no untracked `src/**.ts`; the library build emits the expected `dist/` shape; library test suite no regression.

### Lane C — custom typecheck cluster

Target: vue-tsc count from ~290 to ≤135 by fixing ~155 custom-component errors — `useInertiaGesture.ts` (18, index-narrowing), `useWatercolorBlob.ts` (16, index-narrowing), `GenerateControls.vue` (5), `GradientVisualizer.vue` (4), `BrowsePane.vue` (3), + ~6 SFCs. The remaining ~104 generated shadcn-vue errors route to a future generator-update effort (recorded in `audit/B.W4-typecheck.md`); hero-lab's ~31 were closed in B.W3.

**Sub-gate C**: `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` ≤ 135.

### Lane D — e2e abrogation + 3-spec smoke suite

The four e2e assay lanes (`research/B-e2e-*`) reached a near-unanimous verdict — the census found 10 of 16 specs superfluous-or-nonsense; the overlap lane found `color-visual-validation` is a unit test routed through a browser (≈120 redundant assertions); the target lane recommends abrogating **all 16** (≈3,510 lines: ~42 `.lucide-*` selectors, ~132 `waitForTimeout`, ~34 `page.evaluate()` interaction-workarounds, ~29 `test.skip`, 2 dead live-API specs). The brittleness lane dissented (it recommended keep-and-migrate); the orchestrator overrode that dissent — keep-and-migrate is the exact W5-C hang pattern and the precept is "abrogate before patch."

**Lane D actions:**

1. **Invariant-33 pre-deletion corpus grep, then delete all 16 specs.** First (precepts `3c32fae`, invariant 33 — dead-code-removal corpus grep): grep the whole repo for any non-`e2e/` file importing an `e2e/*.spec.ts` or an `e2e/` helper module, and grep `e2e/` for cross-spec imports — expect zero (spec files are Playwright entrypoints, imported by nothing; `playwright.config.ts` references the dir, not individual files). Record the grep output in `audit/B.W4-smoke.md` as the deletion-justification proof. Then `rm e2e/*.spec.ts` — `admin-login-live`, `admin-panel`, `browse-palettes`, `color-docs-rendering`, `color-header-layout`, `color-picker`, `color-space-switching`, `color-visual-validation`, `edge-cases`, `mobile-layout`, `palette-api-live`, `palette-browser`, `palette-dialog-layout`, `palette-features`, `palette-slug-management`, `propose-name`. Plus any helper modules under `e2e/` that only those specs imported (the grep identifies them).
2. **Create `e2e/smoke/` with exactly 3 specs.** `getByRole` / `getByLabel` / `aria-label` selectors ONLY — no class selectors, no `.lucide-*`, no xpath, no `page.evaluate()` for interaction, no `waitForTimeout`:
   - `smoke/page-load.spec.ts` — navigate `/`, wait `main[aria-label="Color tool panes"]`, assert zero uncaught console errors, assert `<nav aria-label="Application navigation">` + `button[aria-label="Select color space"]` present.
   - `smoke/color-space-switching.spec.ts` — click `button[aria-label="Select color space"]`, pick "OKLab" via `getByRole("option", { name: "OKLab" })`, assert the trigger text + the URL hash space parameter.
   - `smoke/view-switch.spec.ts` — click `button[aria-label="Select view"]`, pick "Palettes" via `getByRole("option", …)`, assert `getByText("My Palettes")` visible; a mobile-viewport assertion of the single-pane layout.
   - Do NOT write a `smoke/admin-login.spec.ts` — admin-login mocking + dock slug-edit-layer navigation is the most fragile flow and was the W5-C hang root. It is not smoke-critical (the app boots and functions without admin). Record the exclusion in `audit/B.W4-smoke.md`.
3. **`playwright.config.ts`** — add a `smoke` project (desktop Chromium, `testDir: "./e2e/smoke"`); **remove** the `mobile` project (a 3-spec suite does not warrant a second browser download in CI; mobile viewport is covered by the orchestrator's per-wave live probe at 375×667 plus the `view-switch` viewport assertion).
4. **`.github/workflows/node.js.yml`** — add to the `test` job, after `npx vitest run`:
   ```yaml
   - run: npx playwright install --with-deps chromium
   - run: npx playwright test --project=smoke
   ```
   This is the project's first automated CI gate on browser behaviour.

The per-wave orchestrator live Playwright probe (3 viewports, console-error + network-2xx check, screenshots to `audit/`) continues unchanged as the primary wave-gate mechanism. Palette/admin/browse flows that the 13 deleted specs covered are covered by that live probe; if such a flow is actively modified in a future wave, a targeted spec is written then under a `full` project. The 2 live-API specs are replaced by nothing — a live API belongs in a separate staging-integration harness, not the committed repo suite.

**Sub-gate D**: `e2e/*.spec.ts` (root) has 0 files (deletion proof); `e2e/smoke/` has exactly 3 specs; `playwright.config.ts` has `smoke`, no `mobile`; `grep -rE 'lucide|page\.evaluate\(|waitForTimeout|xpath=' e2e/smoke/` returns nothing (clean-selector proof); `npx playwright test --project=smoke` green; the CI workflow carries the smoke step.

## File bounds

| Lane | Files |
|---|---|
| A | `audit/B.W4-library-gap.md` (new) — read-only audit |
| B | `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts` |
| C | `useInertiaGesture.ts`, `useWatercolorBlob.ts`, `GenerateControls.vue`, `GradientVisualizer.vue`, `BrowsePane.vue`, + ~6 other SFCs (list finalized from `vue-tsc` output at wave open) |
| D | `e2e/*.spec.ts` (16 deleted); `e2e/smoke/page-load.spec.ts`, `e2e/smoke/color-space-switching.spec.ts`, `e2e/smoke/view-switch.spec.ts` (new); `playwright.config.ts`; `.github/workflows/node.js.yml` |

## Hard gate

1. `audit/B.W4-library-gap.md` exists with substantive findings.
2. `git status` shows no untracked `src/**.ts`; all 5 WIP files committed or formally retired.
3. `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` ≤ 135.
4. `ls e2e/*.spec.ts` returns nothing; `e2e/smoke/` has 3 specs; `playwright.config.ts` has `smoke` and no `mobile`; `npx playwright test --project=smoke` green; `.github/workflows/node.js.yml` carries the Playwright smoke step.
5. `npm run build` clean; `npm test` 1409+; library test suite no regression after Lane B WIP commit.
6. Orchestrator per-wave Playwright live probe (3 viewports light+dark) clean.

## Format and lint cadence

Lint per lane; gate before close.

## Verification artefacts

`audit/B.W4-library-gap.md`, `audit/B.W4-wip-disposition.md`, `audit/B.W4-typecheck.md` (before/after errors per file), `audit/B.W4-smoke.md` (the 16 deletions + reasons; the 3 smoke specs; the admin-login exclusion rationale).

## Commit plan

- `audit(tranche-b/w4): value.js library gap audit (Mandate 12 AND)` — Lane A.
- `feat(library/w4): commit src/ WIP — parsing/{animation-shorthand,extract,serialize,stylesheet}, units/interpolate` — Lane B (or `chore(library/w4): retire src/ WIP` if retire path).
- `fix(types/w4): close custom-component typecheck cluster (-155 errors)` — Lane C.
- `test(e2e): abrogate the 16-spec Playwright suite, replace with a 3-spec role-based smoke suite + CI gate` — Lane D. Body: cite the four assay docs; list the 16 deletions; name the brittleness-lane dissent and why it was overridden.

## Dependencies

- Depends on: B.W3.
- Blocks: B.W5.
