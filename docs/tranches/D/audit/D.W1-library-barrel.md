# D.W1 Lane L6 — library barrel completeness + library-perf fold-ins

**Wave**: D.W1 Lane L6. **Date**: 2026-05-19. **Posture**: planning before edits.

**Source**: this doc fulfils the G1-G11 disposition table that `B.W3-library-gap.md §2` deferred and folds in the 5 small library-perf items from `D-LIB-OPTIMIZATION-SYNTHESIS.md §1-2` (L6 / L7 / L10 / L14 / C1).

## §A — G1-G11 dispositions

Every gap below cites the original B.W3 row. The disposition is one of **SHIP** (extend `src/index.ts`), **KEEP-INTERNAL** (with reason), or **DEFER** (with the wave the work belongs to).

| # | Gap (B.W3) | Current state | Disposition | Detail |
|---|---|---|---|---|
| **G1** | `registerColorNames` / `clearCustomColorNames` defined `src/parsing/color.ts:520,526`; absent from `src/index.ts` barrel. | The functions are already re-exported through two side doors — `src/parsing/units.ts:14,17` and `src/units/index.ts:1` — but the canonical `src/index.ts` barrel never names them. The demo consumes them via `@src/parsing/color` (`demo/.../useCustomColorNames.ts:2`). | **SHIP** | Add to the existing `./parsing/color` re-export block: `export { CSSColor, parseCSSColor, registerColorNames, clearCustomColorNames, getCustomColorNames } from "./parsing/color";`. Demo migration to the `value.js` root happens in the broader cross-cutting sweep (G3); not in this lane. |
| **G2** | `src/units/color/contrast.ts` deep-imported by 2 demo composables. | All 4 contrast functions are **already in the barrel** (`src/index.ts:179-182`). The gap is consumer-side hygiene. | **KEEP-INTERNAL** (no library change) | No library edit. Demo-side migration is a separate sweep (G3 territory) — out of scope for L6. |
| **G3** | Demo reaches into 14 distinct `@src/...` deep paths. | Every symbol is barrel-satisfiable post-G1 except G1 itself. | **DEFER** to a later demo-side sweep | Out of scope for L6. Recorded only. |
| **G4** | `InterpolatedVar` carries a hidden `_lerp` field stamped via `(iv as any)._lerp` at `src/units/interpolate.ts:88,118`. The type is invisible to TS. | The cast is contained to two sites in `interpolate.ts`. Adding `_lerp?` to the `InterpolatedVar<T>` shape would touch only internal robustness, not the demo. | **DEFER** (low-risk type-only ergonomic; folds into the `InterpolatedVar` extension already planned in **D.W3 L5/L11** when `hueMethod` lands) | The hueMethod wiring at D.W3 already extends `InterpolatedVar`; bundle the `_lerp` typing there to touch the type once. No L6 edit. |
| **G5** | 5 untracked `src/**.ts` re-exported from the barrel at audit time. | Already remediated — `git status` shows `animation-shorthand.ts`, `extract.ts`, `serialize.ts`, `stylesheet.ts`, `interpolate.ts` are all present in the working tree and committed (B.W3 Lane B). Test coverage is the open follow-on (D.W1 Lane L7). | **DONE** (out of scope for L6) | No L6 edit. The test coverage lands in **D.W1 Lane L7**. |
| **G6** | Zero documentation for `parsing/`, `units/`, `transform/`, `quantize/`, `easing.ts`. | Discoverability gap, not capability gap. | **DEFER** | Recommend an `assets/docs/` page set in a future wave (D.W6 doc-drift or later). No L6 edit. |
| **G7** | `mixColors` (2-color) and `mixColorsN` (N-color) live in two separate modules — no unified façade. | Both are exported (`src/index.ts:177,187`) and consumers select correctly. | **KEEP-INTERNAL** | KISS — building a thin facade when both primitives are already public adds surface without payoff. Record only. |
| **G8** | No color-space-aware gradient-stop interpolation helper; demo re-implements on top of `mixColors`. | Convenience gap; the primitives are sufficient. | **DEFER** | A potential D.W3 Lane C primitive if the demo-side `useGradientInterpolation` refactor finds a clean shape; not L6 territory. |
| **G9** | `recomposeMatrix2D` is absent; only the 3D recompose is public. | Asymmetry without a consumer. | **DEFER** | No demo needs it. Record only — open as a future symmetry fix. |
| **G10** | `quantize/types.ts:44`'s `DEFAULTS` constant is not barrel-exported. | Consumers cannot inspect the default option set without re-declaring. Demo uses explicit opts so no break. | **SHIP** (rename to `QUANTIZE_DEFAULTS` to avoid collision; zero-cost) | **REVISED to DEFER in this lane** — the rename + export touches `src/quantize/index.ts` + barrel. Routing to D.W3 Lane C alongside the parseCSSColor memo work keeps the quantize lane's edits coherent. No L6 edit. |
| **G11 (= K5)** | `solveCubicBezierX` at `src/easing.ts:128` is a private helper (no `export`); the public `CSSCubicBezier` wraps it. | The orchestrator confirmed in the pre-flight: change `function` → `export function` AND add to the barrel. | **SHIP** | Add `export` keyword at `src/easing.ts:128` AND add `solveCubicBezierX` to the `./easing` re-export block in `src/index.ts:251-262`. |

**SHIP set for L6**: G1, G11 (= K5). That's 3 newly-named symbols (`registerColorNames`, `clearCustomColorNames`, `solveCubicBezierX`) + `getCustomColorNames` (the third member of the registry trio, present at `color.ts:530`, already side-exported via `units/index.ts:1` — sweep it into the barrel for full registry symmetry).

**Why the rest defer**: G2/G3 are consumer-side; G4 bundles with D.W3 L5; G5 is done; G6 is doc work; G7 is rejected on KISS; G8 is bandwidth-gated; G9 has no consumer; G10 lands cleaner with G2's other quantize work in D.W3. None blocks the L6 sub-gate.

## §B — Library-perf fold-ins (5 small fixes)

Per `D-LIB-OPTIMIZATION-SYNTHESIS.md §1-2`.

| # | Fix | File(s) | Planned diff |
|---|---|---|---|
| **L6** | `parseCSSValue("inherit")` loses its `CSSWideKeyword` `superType`. The public `ValuesValue` combinator at `src/parsing/index.ts:251` omits the `CSSWideKeyword` branch that the internal `Value` carries at line 235. Restore parity. | `src/parsing/index.ts` | `const ValuesValue = any(CSSWideKeyword, MathFunction, CSSValueUnit.Value, Function_, CSSJSON, CSSString).trim(whitespace);` — single insertion of `CSSWideKeyword` as the first branch (matching the internal `Value`'s ordering). Verification: `parseCSSValue("inherit")` returns a `ValueUnit` with `unit === "string"` and `superType === ["keyword"]` (the shape the existing `CSSWideKeyword` parser ascribes at line 220). |
| **L7** | Color/math function names are case-sensitive (`RGB(...)` rejected) despite CSS Color L4 + CSS Values 4 mandating ASCII case-insensitivity. `colorMixSpace` already uses `istring` — confirmed internal inconsistency. | `src/parsing/color.ts`, `src/parsing/math.ts` | **color.ts**: `colorOptionalAlpha("rgb"/"hsl"/"hsv"/"hwb"/"lab"/"lch"/"oklab"/"oklch"/"xyz")` and `relativeColorParser("rgb"/"hsl"/"hwb"/"lab"/"lch"/"oklab"/"oklch"/"xyz")` — internal `string(colorSpace)` and `string(cssName)` → `utils.istring(...)`. **math.ts**: every `string("calc"|"min"|"max"|"clamp"|"round"|"mod"|"rem"|"abs"|"sign"|"sin"|"cos"|"tan"|"asin"|"acos"|"atan"|"atan2"|"pow"|"sqrt"|"hypot"|"log"|"exp")` → bring in `istring` from `parse-that` (Add import) and replace. The `+`/`-`/`*`/`/` operator strings keep `string()` (operators are not alphabetic). Verification: `parseCSSColor("RGB(1,2,3)")` succeeds. |
| **L10** | No exported `TimingFunction` type — keyframes.js parallel-defines the same `(t: number) => number` shape. | `src/easing.ts`, `src/index.ts` | `easing.ts`: add `export type TimingFunction = (t: number) => number;` near the existing `LinearStop` export at line 20. `index.ts`: extend the existing type re-export — `export type { LinearStop, TimingFunction } from "./easing";`. |
| **L14** | Replace `nameParser`'s ~147-branch `any()` (`src/parsing/color.ts:473-486`) with `parse-that`'s `dispatch(map)`. **DEFERRED for L6.** Reasoning: (a) `parse-that` does export `dispatch`, but it's a **first-character ASCII dispatch table** — not a name-to-parser map. To use it for `nameParser`, we'd have to partition the 147 named colors into 26 first-letter buckets, then `any()` within each bucket (still bounded by the largest bucket — `s*` has ~25 names). The KISS payoff is real but modest (~7-12× reduction on the average miss path; the hit path already shortcuts on first-character mismatch via parse-that's internal failure). (b) The same `any()` shape also drives `transforms`, `gradient names`, and the value-level `Function_` cascade — a coherent dispatch refactor wants to touch all four sites at once, not just `nameParser` in isolation. (c) The 147-name miss-rate is dominated by `nameParser` being the **last** branch of `CSSColor.Value`'s `any()` chain, so only literal unrecognised tokens reach it; the hot path costs nothing today. **Route to**: D.W6 close-residuals or a future P3 perf wave when `parse-that` ships a name-keyed `dispatch` variant. | (no edit this lane) | Recorded as deferred. |
| **C1** | Rename `AnimationOptions` (`src/parsing/extract.ts:16`) → `CSSAnimationOptions` to break the silent shadow with `keyframes.js`'s same-named engine-options type. | `src/parsing/extract.ts`, `src/parsing/animation-shorthand.ts`, `src/index.ts` | Rename the `export type AnimationOptions` declaration + 6 internal usages in `extract.ts` (lines 109, 146, 155, 167, 191, 192) + 9 internal usages in `animation-shorthand.ts` (the file imports the type from `./extract`). Update `src/index.ts:295`: `export type { CSSAnimationOptions } from "./parsing/extract";`. Demo grep confirms zero `AnimationOptions` consumers in `demo/`; the keyframes.js-side update files at `coordination/Q.md §9`. |

**Fold-in verdict**: 4 land in this lane (L6, L7, L10, C1); L14 explicitly defers with reasoning recorded above.

## §C — Validation gates

After the §A SHIPs and §B fold-ins (sans L14):

- `parseCSSValue("inherit")` returns a `ValueUnit` whose `superType` contains `"keyword"` — manual smoke or inline unit test.
- `parseCSSColor("RGB(1,2,3)")` succeeds.
- `import("@mkbabb/value.js").TimingFunction` is a valid type alias.
- `rg "AnimationOptions" src/ demo/ test/` returns only `CSSAnimationOptions` matches.
- `npx vue-tsc --noEmit` error count unchanged (baseline 126).
- `npx vitest run` count unchanged or higher (baseline 1409).
- `npx playwright test --project=smoke` — 3/3 green.
- `npm run proof:resolution` — green.
