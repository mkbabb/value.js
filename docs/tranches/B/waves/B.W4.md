# B.W4 — value.js library audit + WIP disposition + typecheck cluster + e2e smoke

**Opens after**: B.W3 close.
**Agents**: 4 lanes (A — read-only library gap audit; B — WIP disposition decisions; C — custom typecheck cluster fixes; D — e2e smoke suite). Lane A is read-only; B sequences with A's output. C and D are file-disjoint from A/B. Per the dispatch contract, A is a research lane; B/C/D are implementation.
**Hard gate**: `audit/B.W4-library-gap.md` exists with cohesion+coverage findings; 5 untracked WIP files dispositioned (commit / route / retire) and the public-API barrel (`src/index.ts`) reflects the decision; vue-tsc custom-component cluster drops by ~155 (target total ≤ 135 errors); `e2e/smoke/` has 4–5 specs; `playwright.config.ts` has a smoke project; `npm run test:e2e -- --project=smoke` green.
**Status**: planned.

## Scope

Folded from `research/Be-mandate-coverage.md §5` (Mandate 12 AND) + `research/Bα §1, §2` (typecheck baseline + src/ WIP) + `research/Bd-w5-audit.md §3` (e2e strategy shift).

### Lane A — value.js library gap audit (READ-ONLY)

The audit's deliverable is `audit/B.W4-library-gap.md`. Mandate 12 from the user's original prompt explicitly asked for "gaps in value.js AND glass-ui." A scoped `src/` out as out-of-mandate. B fulfils the AND.

Scope of the audit:
1. `src/parsing/` — `parseCSSValue`, gradient parsers, transform parsers, the bbnf grammars. Does the parser surface cover the demo's parsing needs idiomatically? Where does the demo invoke parser features that aren't well-exposed in the public API? Are there missing color-space-aware parse helpers?
2. `src/units/` — `ValueUnit`, `FunctionValue`, `ValueArray`, the conversion tables, the color sub-system. Where does the demo do unit math the library should expose? Are there missing conversion functions, interpolation helpers, gamut-mapping primitives?
3. `src/transform/decompose.ts` — does the matrix decomposition cover what `useAppColorModel` and `useContrastSafeColor` need?
4. `src/quantize/` — color quantization. Demo consumers in `image-palette-extractor/`. Is the quantize API idiomatic for the demo's call patterns?
5. Cross-cutting: the demo's `useAppColorModel`, `useColorParsing`, `useSliderGradients`, `useColorNameResolution`, `useColorModel`, `useColorUrl` — do they reach into library internals that should be public? Are there demo-side reimplementations of library-shaped logic?
6. Documentation coverage: `assets/docs/` has 10 color-space reference pages. Are there src/ surfaces undocumented? Are there documented surfaces with no src/ implementation?

Output: `audit/B.W4-library-gap.md` — a table of (gap | evidence file:line | proposed destination: library wave / B.W4 fix / future tranche). The audit is read-only; any actionable items become B's call after the audit lands.

**Sub-gate A**: `audit/B.W4-library-gap.md` exists with a per-area finding count + a prioritized table.

### Lane B — `src/` WIP disposition

Five untracked files (`parsing/animation-shorthand.ts` 286 lines, `parsing/extract.ts` 200, `parsing/serialize.ts` 156, `parsing/stylesheet.ts` 515, `units/interpolate.ts` 124) plus 3 modified (`src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`) plus 1 committed-but-imported (`plugins/vite-source-export.ts`).

All 5 untracked files are re-exported from `src/index.ts` (the barrel). They are public-API debt: the library currently exports surfaces whose source isn't tracked. The build emits their `.d.ts` into `dist/`.

Per-file decision (orchestrator + user at wave open):

| File | Lines | Re-exported? | Decision |
|---|---|---|---|
| `parsing/animation-shorthand.ts` | 286 | yes | commit, OR remove the export and retire |
| `parsing/extract.ts` | 200 | yes | commit, OR retire |
| `parsing/serialize.ts` | 156 | yes | commit, OR retire |
| `parsing/stylesheet.ts` | 515 | yes | commit, OR retire |
| `units/interpolate.ts` | 124 | yes | commit, OR retire |
| `src/index.ts` (modified) | — | itself the barrel | commit the additions; or revert and retire WIP |
| `src/parsing/units.ts` (modified) | — | — | inspect diff; commit if related to library cohesion |
| `src/units/normalize.ts` (modified) | — | — | inspect diff; commit if related |
| `plugins/vite-source-export.ts` (modified) | — | imported by vite.config | commit (it runs in production) |

Default: **commit all five** (and the related modifications). The work is in the public API surface; the alternative (retiring 1281 lines of unfinished library work) is a bigger decision than B has scope for, and the library owner clearly intended these to ship. If on inspection the WIP is genuinely abandoned, retire — but assume commit absent counter-evidence.

**Sub-gate B**: `git status` shows no untracked `src/**.ts`; `git diff src/index.ts` returns no change (or shows intentional barrel additions only); the library build (`npm run build`) emits the expected `dist/` shape; no behavioural regression in the library test suite.

### Lane C — custom typecheck cluster

Target: drop the vue-tsc count from ~290 (current) to ≤135 by fixing the ~155 custom-component errors:

- `useInertiaGesture.ts` (18 errors) — index-narrowing.
- `useWatercolorBlob.ts` (16 errors) — index-narrowing.
- `GenerateControls.vue` (5 errors) — needs investigation.
- `GradientVisualizer.vue` (4 errors) — needs investigation.
- `BrowsePane.vue` (3 errors) — needs investigation.
- Plus ~6 other SFCs with smaller error counts.

The remaining ~135 errors after this lane: ~104 generated shadcn-vue (`auto-form`/`ui/button`/`ui/chart`/`ui/form`) + ~0 hero-lab (B.W3 closed those) + ~31 other (likely tied to color-library type narrowing — paired with Lane A).

**Sub-gate C**: `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` ≤ 135. The 104 generated cluster routes to a future generator-update effort (recorded in `audit/B.W4-typecheck.md`).

### Lane D — e2e smoke suite

Stand up `e2e/smoke/` with 4–5 specs using role/label selectors only:

1. `smoke/page-load.spec.ts` — desktop: navigate, wait `main[aria-label="Color tool panes"]`, confirm dock + color-picker + nutrition-label present, no console errors.
2. `smoke/color-space-switching.spec.ts` — open `combobox "Select color space"`, pick OKLab, confirm URL updates and color-picker rerenders with OKLab labels.
3. `smoke/palette-create.spec.ts` — open palettes pane (or dialog), add a color, save with a name, confirm it appears in saved palettes.
4. `smoke/admin-login.spec.ts` — open profile menu, click Login, complete auth flow against the local mock (do not hit the live API), confirm admin views accessible.
5. `smoke/mobile-layout.spec.ts` — mobile: page-load + open dock menu + switch view.

`playwright.config.ts` gains a `smoke` project (extends desktop project but `testDir: "./e2e/smoke"`). The existing 16-spec full suite stays under `e2e/` (root), runs on `playwright test` without project filter; the smoke suite runs on `--project=smoke`.

Update `dispatch/AGENT.md` (already present) and `B.md §6` (already present) — wave gates run smoke; nightly runs full.

**Sub-gate D**: `e2e/smoke/` contains 4–5 specs; `playwright.config.ts` has a `smoke` project; `npx playwright test --project=smoke` green (desktop + mobile if configured); selector strategy is role/label only (no `.lucide-*`, no class-based, no xpath in smoke specs).

## File bounds

| Lane | Files |
|---|---|
| A | `audit/B.W4-library-gap.md` (new) — read-only audit |
| B | `src/parsing/{animation-shorthand,extract,serialize,stylesheet}.ts`, `src/units/interpolate.ts`, `src/index.ts`, `src/parsing/units.ts`, `src/units/normalize.ts`, `plugins/vite-source-export.ts` |
| C | `useInertiaGesture.ts`, `useWatercolorBlob.ts`, `GenerateControls.vue`, `GradientVisualizer.vue`, `BrowsePane.vue`, + ~6 other SFCs (full list determined by `vue-tsc` output at wave open) |
| D | `e2e/smoke/page-load.spec.ts`, `e2e/smoke/color-space-switching.spec.ts`, `e2e/smoke/palette-create.spec.ts`, `e2e/smoke/admin-login.spec.ts`, `e2e/smoke/mobile-layout.spec.ts` (new); `playwright.config.ts` |

Lanes A and B both touch `src/` but A is read-only. Lanes C and D are disjoint from A/B and each other.

## Hard gate

1. `audit/B.W4-library-gap.md` exists with substantive findings (not "nothing to report").
2. `git status` shows no untracked `src/**.ts` files; all 5 WIP files committed or formally retired (with a recorded decision).
3. `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` ≤ 135.
4. `e2e/smoke/` has 4-5 specs; `playwright.config.ts` has the `smoke` project; `npx playwright test --project=smoke` exits green.
5. `npm run build` clean; `npm test` 1409+; library test suite no regression after Lane B WIP commit.
6. Playwright re-probe (full suite optional; smoke required) clean.

## Format and lint cadence

Lint per lane; gate before close.

## Verification artefacts

`audit/B.W4-library-gap.md`, `audit/B.W4-wip-disposition.md` (Lane B decisions), `audit/B.W4-typecheck.md` (Lane C — before/after errors per file), `audit/B.W4-smoke.md` (Lane D — selector strategy + spec list).

## Commit plan

- `audit(tranche-b/w4): value.js library gap audit (Mandate 12 AND)` — Lane A docs.
- `feat(library/w4): commit src/ WIP — parsing/{animation-shorthand,extract,serialize,stylesheet}, units/interpolate` — Lane B (or `chore(library/w4): retire src/ WIP — remove from barrel` if retire path).
- `fix(types/w4): close custom-component typecheck cluster (-155 errors)` — Lane C.
- `test(e2e/smoke): stand up critical-path smoke suite — 5 role-based specs` — Lane D.

## Dependencies

- Depends on: B.W3.
- Blocks: B.W5.
