# B.W3 Lane A — value.js `src/` library gap audit

**Wave**: B.W3 Lane A (read-only). **Date**: 2026-05-19. **Posture**: declarative, evidence-led, read-only — no edits to `src/`.

Tranche A's Mandate 12 asked for "gaps in value.js AND glass-ui"; A scoped `src/` out. This audit fulfils the value.js half of the AND.

## Sub-gate A (verbatim)

> "audit/B.W3-library-gap.md exists with a per-area finding count, a prioritized gap table, the view-schema verdict, the invariant-30 compliance check, and the K1–K5 keyframes.js-parity dispositions."

This document satisfies sub-gate A: a per-area finding count (below), a prioritized gap table (§2), the view-schema verdict (§3), the invariant-30 compliance check incl. the contract-v2 recommendation (§4), and the K1–K5 dispositions (§5).

## 1. Per-area finding count

| Area | Findings | Severity spread |
|---|---|---|
| `src/parsing/` | 3 | 1 P1, 1 P2, 1 P3 |
| `src/units/` | 3 | 1 P1, 1 P2, 1 P3 |
| `src/transform/decompose.ts` | 1 | 1 P3 |
| `src/quantize/` | 1 | 1 P3 |
| Cross-cutting (demo → library internals) | 2 | 1 P1, 1 P2 |
| Documentation coverage | 1 | 1 P2 |
| **Total** | **11** | **3 P1, 4 P2, 4 P3** |

Overall finding: the library surface is sound and well-factored. The gaps are *barrel-completeness* gaps — public functions that exist, are correct, and are consumed by the demo through deep `@src/...` paths instead of the `value.js` root. No missing primitive was found; the demo is not blocked. The debt is *publish-surface debt*, not capability debt.

## 2. Prioritized gap table

| # | Pri | Area | Finding | Evidence | Proposed disposition (recommendation only) |
|---|---|---|---|---|---|
| G1 | **P1** | parsing | `registerColorNames` / `clearCustomColorNames` are public exported functions but **absent from the barrel**. The demo imports them via the deep path `@src/parsing/color`. | `src/parsing/color.ts:520,526` (defns); barrel `src/index.ts:322` exports only `CSSColor, parseCSSColor` from `./parsing/color`; consumer `demo/@/components/custom/color-picker/composables/useCustomColorNames.ts:2`. | Add both to the `./parsing/color` re-export block in `src/index.ts`. Zero-cost; closes a real deep-import. |
| G2 | **P1** | units | `src/units/color/contrast.ts` is imported directly by 2 demo composables via `@src/units/color/contrast`, even though its 4 functions ARE in the barrel (re-exported through `units/color/utils.ts:1000`). The demo bypasses both the barrel and the canonical `utils` re-export. | barrel `src/index.ts:179-182` (`computeSafeAccent, safeAccentColor, needsContrastAdjustment, getOklchLightness`); `src/units/color/utils.ts:1000` re-exports from `./contrast`; deep consumers `demo/.../useContrastSafeColor.ts:4`, `demo/.../markdown/composables/useMarkdownColors.ts:4`. | This is a consumer-side hygiene gap, not a library gap — the API is fully public. Recommend the consumer migrate to the `value.js` barrel; library needs no change. Recorded as cross-cutting (see §6). |
| G3 | **P1** | cross-cutting | The demo reaches into **14 distinct `@src/...` deep paths** rather than the `value.js` root barrel — `@src/units/color/{constants,utils,gamut,normalize,mix,contrast}`, `@src/units/utils`, `@src/parsing/color`, `@src/parsing`, `@src/units/color`, `@src/units`, `@src/easing`, `@src/math`, `@src/quantize`. Every symbol used IS in the barrel except G1. | grep of `@src/` across `demo/` (60+ import lines). | Every deep import is barrel-satisfiable today (post-G1). Recommend a B-or-later demo sweep to route all `@src/...` imports through the `value.js` package root, exercising the actual published surface. Not a `src/` edit. |
| G4 | **P2** | units | `interpolate.ts`'s 5 functions are barrel-exported (`src/index.ts:51-57`) but the InterpolatedVar fast-path uses an untyped hidden `_lerp` field stamped via `(iv as any)._lerp`. The dispatch contract is invisible to TypeScript. | `src/units/interpolate.ts:88,118`. | Add an optional `_lerp?` to the `InterpolatedVar` type so the fast-path is type-checked. Internal robustness, not a missing primitive. |
| G5 | **P2** | parsing | `src/parsing/units.ts` is a `git` -modified file; the WIP `parsing/{animation-shorthand,extract,serialize,stylesheet}.ts` (4 files) + `units/interpolate.ts` are untracked yet already re-exported from the barrel (`src/index.ts:278-318`). The public API names a surface that is not committed. | `git status`: 5 untracked `src/**.ts`; barrel `src/index.ts:278-318` re-exports `parseCSSStylesheet`, `extractKeyframes`, `parseAnimationShorthand`, `serializeStylesheet`, etc. | **Routes to Lane B** (WIP disposition). This audit only records the coupling: the barrel currently exports symbols from untracked files — a `npm run build` from a clean checkout of `master` would fail. Lane B must commit or retire. |
| G6 | **P2** | docs | `assets/docs/` has 11 color-space reference pages (hex, rgb, hsl, hsv, hwb, lab, lch, oklab, oklch, xyz, kelvin). **Zero documentation** covers the non-color library surface: `parsing/` (stylesheet AST, animation-shorthand, calc/math), `units/` value classes, `transform/decompose.ts`, `quantize/`, `easing.ts`. `docs/` holds only `color-theory`-adjacent material + tranches/precepts. | `ls assets/docs/` (11 `.md`, all color spaces); no `decompose`/`easing`/`stylesheet` doc. | Recommend a `docs/` (or `assets/docs/`) page set for the parsing + transform + easing surface. P2: the code is self-documented with thorough headers; absence is a discoverability gap, not a correctness gap. |
| G7 | **P3** | units | `mixColors` (`utils.ts:1092`) and `mixColorsN` (`color/mix.ts:28`) are two separate N-vs-2 mixing entry points exported from two different modules (`src/index.ts:177` vs `:187`). No single "mix any number of colors" primitive. | `src/index.ts:177,187`. | Optional: a unified `mix(colors[], opts)` facade. Low value — both are already public and the demo uses them correctly (`demo/@/lib/palette/mix.ts:12-13`). Record only. |
| G8 | **P3** | parsing | `interpolateHue` / `HueInterpolationMethod` are barrel-exported (`src/index.ts:176,184`) but there is no color-space-aware *gradient-stop* interpolation helper — the demo re-implements stop interpolation in `useGradientInterpolation.ts` / `useGradientCSS.ts` on top of `mixColors`. | `demo/.../gradient/composables/useGradientInterpolation.ts:10`, `useGradientCSS.ts:11`. | Optional: a library `interpolateColorStops(stops, space, hueMethod)` primitive would absorb demo-side logic. The current primitives are sufficient; this is a convenience gap. |
| G9 | **P3** | transform | `decompose.ts` (541 loc) exports `decomposeMatrix2D/3D`, `recomposeMatrix3D`, `slerp`, `interpolateDecomposed` — but `recomposeMatrix2D` is absent (only the 3D recompose is public). 2D decomposition has no inverse. | `src/index.ts:342-348` (no 2D recompose); `src/transform/decompose.ts`. | Optional asymmetry fix — add `recomposeMatrix2D` for parity. No consumer needs it today. Record only. |
| G10 | **P3** | quantize | `quantize/` exports `quantizePixels`, `dominantColor`, `QuantizeOptions`, `QuantizedColor`. The `DEFAULTS` constant (`types.ts:44`) is not exported — consumers cannot read the default option set without re-declaring it. | `src/quantize/index.ts:25` (re-exports types only); `src/quantize/types.ts:44` (`DEFAULTS`). | Optional: export `DEFAULTS` (or `QUANTIZE_DEFAULTS`) from the barrel. Demo uses `quantizePixels` with explicit opts (`demo/@/lib/quantize-worker.ts:6`), so no break. Record only. |
| G11 | **P3** | easing | `solveCubicBezierX` is a private helper. See K5 §5. | `src/easing.ts:128`. | Export from barrel — zero-cost public-API completion. |

**Severity key**: P1 = real deep-import / clean-checkout build break; P2 = surface incompleteness with a live workaround; P3 = optional symmetry / convenience.

## 3. View-schema unification verdict (routed from B.W2)

**Verdict: EXTRACT — recommended, not implemented (read-only lane).**

`demo/@/composables/useViewManager.ts` (238 loc) conflates two responsibilities:

1. **Schema** — the `ViewId` / `LeftPane` / `RightPane` / `PaneConfig` types (`useViewManager.ts:20-58`) and the `VIEW_MAP` route table (`useViewManager.ts:60-173`, 113 lines, 14 view entries with lucide icon imports).
2. **Runtime state** — `currentView`, `previousView`, `mobilePaneIndex`, `switchView`, `goBack`, router wiring (`useViewManager.ts:190-237`).

After B.W2 collapsed the dual router into `usePaneRouter.ts`, the coupling is concrete and visible:

- `usePaneRouter.ts` imports `type { ViewManager }` from `useViewManager` (`usePaneRouter.ts:22`) and re-derives slot shapes from `currentConfig.value.left` / `.right` (`usePaneRouter.ts:162-178`).
- `usePaneRouter.ts` carries its **own** component registry (`usePaneRouter.ts:66-80`, 10 `defineAsyncComponent` entries) — a name→component table that is logically a *projection of the same schema* `VIEW_MAP` describes by name only. The schema (which view → which pane name) and the registry (which pane name → which component) are split across two files with no shared source of truth.
- `demo/@/router/index.ts` also enumerates the `ViewId` set as route definitions — a third copy of the same enumeration.

The schema is currently imported transitively (via `useViewManager`); a leaf consumer wanting only the `PaneConfig` shape pulls in the runtime composable and its 14 lucide icon imports.

**Proposed destination**: extract a `demo/@/composables/viewSchema.ts` owning `ViewId`, `LeftPane`, `RightPane`, `PaneConfig`, `VIEW_MAP`, and the icon imports. `useViewManager.ts` imports the schema and keeps *only* runtime state; `usePaneRouter.ts` imports `VIEW_MAP` directly instead of re-deriving from `ViewManager`; `router/index.ts` derives its route list from `VIEW_MAP` keys. Cohesion finding: schema and state are independently versioned concerns — the schema is static config, the state is reactive — and three files re-enumerate the `ViewId` set today. This is a routed-from-B.W2 cleanup; appropriate for a B.W4 or later lane, not this read-only lane.

## 4. Invariant-30 compliance check

**Reference**: precepts submodule `docs/precepts/` pinned at `3c32fae`; `cross-repo-dev-resolution.md` codifies Q invariant 30.

### 4.1 As pinned at precepts `3c32fae` (invariant-30 / contract-v1)

Invariant 30 requires `exports["."]` to declare the **4-key shape** `development` → `types` → `import` → `default`, in that order (`cross-repo-dev-resolution.md:47,58,156`).

| Check | Status | Evidence |
|---|---|---|
| `exports["."]` declares all 4 keys | **PASS** (after working-tree edit) | `package.json:23-28` now has `development`, `types`, `import`, `default`. The `default` key was added in the uncommitted working-tree edit (`git diff package.json`) — precepts `3c32fae` `cross-repo-dev-resolution.md:250` explicitly lists "Add `"default": "./dist/value.js"`" as the value.js remediation. |
| Key order `development` precedes the rest | **PASS** | `package.json:24-27`: `development` first, `default` last. |
| Every subpath export follows the same shape | **N/A** | value.js's `exports` map has **only** the `.` root — zero subpath entries (`package.json:22-28`). The "every subpath" clause is vacuously satisfied. |
| Zero hard `dist/` aliases in consumer config | **PASS** | `vite.config.ts:21-30` aliases only `@src`/`@styles`/etc. to source dirs; no `dist/`. `vitest.config.ts` aliases only `@src` → `src/`. The demo resolves siblings through `resolve.conditions = ["development", "module", "browser"]` (`vite.config.ts:45`) — the `development` branch, not a `dist/` alias. |
| `resolve.conditions` explicit in dev/serve config | **PASS** | `vite.config.ts:45` — `demoConditions` includes `development`. (keyframes.js-parity item K2/K3 — see §5.) |

**Verdict against `3c32fae`**: value.js is **compliant with invariant-30 / contract-v1**, contingent on committing the working-tree `package.json` `default`-key edit (Lane B territory).

### 4.2 Stale relative to glass-ui contract-v2 — **YES**

glass-ui shipped **contract-v2** at commit `ce5aad8` (v1.9.3, 2026-05-19), which **abrogates the `development` condition entirely**:

- glass-ui deleted the `development` key from `exports["."]` and all 41 subpath entries (42 keys total); root collapses to the **3-key** `types`/`import`/`default` shape (`git -C ../glass-ui show ce5aad8`).
- glass-ui's precept submodule advanced `3c32fae → 68d9b20`; `cross-repo-dev-resolution.md` was rewritten to contract-v2 — publisher 3-key shape, consumer half struck, a watch-build (`build:watch`) contract added, invariant 30 redefined in place.
- glass-ui's `scripts/proof-resolution-contract.mjs` was **inverted**: `REQUIRED_EXPORT_KEYS = ["types", "import", "default"]` and the gate now **FORBIDS** `development` anywhere in any `exports` map (`proof-resolution-contract.mjs:135,138`) — "it forbids what it once required." It additionally **REQUIRES** every `@mkbabb/*` publisher to declare a `build:watch` script (`proof-resolution-contract.mjs:141`).

value.js, pinned at precepts `3c32fae`, still carries `development` in `package.json:24` and `resolve.conditions` (`vite.config.ts:45`). **Therefore value.js's invariant-30 stance is now stale relative to glass-ui's contract-v2.** Under glass-ui's inverted proof gate, value.js's current `package.json` would **FAIL** (it contains the now-forbidden `development` key) and value.js declares **no `build:watch` script** (`package.json:scripts` has `dev`, `build`, `gh-pages`, `prepare`, `typecheck`, `test`, `test:e2e` — no `build:watch`).

### 4.3 Recommendation (recommendation only — no edits)

**Recommend value.js FOLLOW glass-ui's contract-v2.** Rationale:

1. value.js consumes glass-ui (`package.json:62`, `@mkbabb/glass-ui: file:../glass-ui`). A cross-repo resolution contract only works if all `@mkbabb/*` repos agree on one shape; holding at the 4-key shape while glass-ui has moved guarantees a desync — exactly the failure mode invariant 30 exists to prevent.
2. contract-v2 is strictly simpler (3 keys, no condition-ordering subtlety) and the watch-build (`build:watch` keeping `dist/` fresh) replaces the `development → src/` mechanism without the `server.fs.allow` sibling-`src/` widening (`vite.config.ts:50` `demoServerFsAllow` exists *solely* to reach siblings' `src/` — contract-v2 retires that need).
3. The migration is mechanical: delete `development` from `package.json:24` and `vite.config.ts:45`; add a `build:watch` script; advance the precept submodule `3c32fae → 68d9b20`.

Concretely, value.js's contract-v2 alignment is: `exports["."]` → `{ types, import, default }` (drop `development`); add `"build:watch": "vite build --mode production --watch"` to `package.json` scripts; drop `development` from `demoConditions`.

**Port glass-ui's `proof-resolution-contract.mjs` fail-closed gate: YES, recommended.** value.js has **no `scripts/` resolution gate** today (`scripts/` holds only `generate-favicon.mjs`). value.js is itself a cross-repo publisher; the precepts edict (`cross-repo-dev-resolution.md:210` — "the canonical escalation is a fail-closed script") applies to it as much as to glass-ui. Porting the contract-v2 version of `proof-resolution-contract.mjs` + a `proof:resolution` npm script + CI wiring gives value.js the same anti-regression guarantee. This is a recommendation for a future wave (sequence it *after* the contract-v2 `package.json` migration, since the inverted gate fails-closed against the current `development` key).

## 5. K1–K5 keyframes.js-parity dispositions

From `research/B-keyframes-parity.md §2`. The value.js↔keyframes.js coupling is sound; these are the value.js-side items.

| Item | Finding | Verified | Disposition |
|---|---|---|---|
| **K1** | `@mkbabb/keyframes.js` is a `package.json:64` devDependency (`file:../keyframes.js`). `grep -rn 'keyframes' src/ demo/` returns **zero `@mkbabb/keyframes.js` import sites** — every `keyframes` hit is either (a) a doc comment (`src/easing.ts:321`, `src/parsing/units.ts:114`), (b) the `@keyframes` CSS at-rule in the stylesheet parser (`src/parsing/{extract,stylesheet,serialize}.ts`), or (c) literal `@keyframes` blocks in demo SFC `<style>` (e.g. `demo/.../PaneHeader.vue:47`). **None** is a JS/TS module import of the keyframes.js package. | YES — grep confirmed zero `@mkbabb/keyframes` / `keyframes.js` module-import lines in `src/` or `demo/`. | **Vestigial — recommend REMOVE** from `package.json` devDependencies. The dependency genuinely has no import site. (Caveat: the orchestrator decides per `research/B-keyframes-parity.md` with Lane B — if the `file:../keyframes.js` link exists to keep the sibling checkout present for cross-repo work, document that rationale instead. On the evidence in this repo, removal is correct.) |
| **K2** | `tsconfig.json` hard-aliases `vue` → `./node_modules/vue` and `@vue/*` → `./node_modules/@vue/*` (`tsconfig.json:25-26`). keyframes.js does not carry these aliases. The value.js aliases are over-prescriptive — they exist to force single-Vue-instance resolution (mirrored by `vite.config.ts:31-38`'s dedupe comment). | YES — `tsconfig.json:25-26` confirmed. | **Record only — do NOT converge.** The `vue`/`@vue/*` aliases are load-bearing: glass-ui ships a nested `vue` and without the alias value.js's typecheck (and Vite) would see two Vue copies (`vite.config.ts:31-38`). Removing them is *not* low-risk. keyframes.js not needing them reflects a different dependency graph, not a value.js defect. Keep as-is. |
| **K3** | `vitest.config.ts` carries only a minimal single `@src` alias (`vitest.config.ts:6-10`). keyframes.js mirrors the full vite alias set in its vitest config. | YES — `vitest.config.ts` confirmed: one alias, `@src` → `src/`. | **Record only — converge only if low-risk; here it is acceptable to leave.** value.js's unit tests live in `test/` and import library code via `@src` exclusively (the demo `@components`/`@composables`/etc. aliases are never needed by `test/*.ts`). The minimal alias is *correct for the test surface*. Converging to the full set would add unused aliases. No action. |
| **K4** | (no K4 in the routed item set for this lane — `research/B-keyframes-parity.md §2` items routed to Lane A are K1, K2, K3, K5.) | — | N/A. |
| **K5** | `solveCubicBezierX` (`src/easing.ts:128-154`) is a private (non-exported) Newton-Raphson + bisection cubic-bezier-X solver. It backs the public `CSSCubicBezier` (`easing.ts:156`). | YES — `src/easing.ts:128` confirmed `function` (no `export`); barrel `src/index.ts:251-263` exports `CSSCubicBezier` but not the solver. | **Recommend EXPORT from the barrel** — zero-cost public-API completion. It is a genuinely useful standalone primitive (solve cubic-bezier X(t)=x) that consumers building custom easing pipelines would want. Add `solveCubicBezierX` to the `./easing` re-export block in `src/index.ts`. Recommendation only — not implemented in this read-only lane. |

## 6. Cross-cutting note — demo reach into library internals

The demo's color composables import from **14 deep `@src/...` paths** (§2 G3). Audit conclusion: with the single exception of G1 (`registerColorNames`/`clearCustomColorNames`, genuinely missing from the barrel), **every symbol the demo deep-imports is already in the `value.js` root barrel**. The deep imports are therefore consumer-side hygiene debt, not library encapsulation failures. The library does not leak internals it should hide; the demo simply does not route through the published root.

Recommended sequencing: (1) close G1 by adding the 2 missing exports to the barrel; (2) a later demo-side sweep routes all `@src/...` imports through `value.js`, which would then exercise the actual published surface and catch any future barrel gap at the consumer. Neither is a `src/` edit beyond G1's two-line barrel addition.

## 7. Summary

The value.js library is structurally sound — no missing primitive blocks the demo. The 11 findings are dominated by *barrel-completeness* and *publish-surface* debt: one genuine missing-export (G1, P1), a clean-checkout build hazard from barrel-exported untracked WIP (G5, P1 → Lane B), and a cross-repo contract drift (§4 — value.js's invariant-30 stance is **stale** vs glass-ui contract-v2). The view-schema verdict is **EXTRACT** a `viewSchema.ts`. K1 disposition: keyframes.js devDependency is **vestigial — remove**. K2/K3: record only. K5: export `solveCubicBezierX` — zero-cost.
