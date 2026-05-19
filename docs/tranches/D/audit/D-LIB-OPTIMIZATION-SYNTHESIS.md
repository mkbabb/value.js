# D library/perf optimization — synthesis after 6 research + 6 challenge

**Round**: 6 research lanes (Di–Dn) + 6 adversarial challenge lanes audited every claim. This doc records only what SURVIVED challenge — research-backed, conservative, KISS.

**Authority**: every surviving claim cites both the research doc and the challenge doc that upheld it.

**Mode**: planning-only. The claims fold into D's existing waves (D.W1 / D.W2 / D.W3 / D.W6); no new wave is needed.

## §1 — Surviving P1 set (the 6 that passed challenge)

| # | Finding | Research → Challenge | Wave | Cost / shape |
|---|---|---|---|---|
| **L1** | **Flatten `Color<T>.components` from `Map<string,T>` to own properties** — the largest-evidence finding across all 6 lanes; eliminates `Map.get` per-channel-read in every lerp hot path, the per-frame `keys()`/`values()`/`entries()` allocations (Color.clone() double-init + normalizeColor.forEach + ~8 Map.get per InterpVar). | Di §1-3 F2/F3/N1/N2/N3 → CHALLENGE upholds (with F1/S1 demoted from P1 to P2) | **D.W1 Lane L8 (new)** | `src/units/color/index.ts` rewrite of `Color<T>` storage; ripple to ~20 consumers; ≤300 LoC net |
| **L2** | **Memoise `cssColorToRgb`** in goo-blob renderer (per-frame 2D-canvas `getImageData` + 3-element array alloc) | Da §3 item 13 / A.W7 / Dj C3 → CHALLENGE upholds | **D.W3 Lane C** (already filed; confirmed) | 5-line memo on input-string key |
| **L3** | **Memoise `parseCSSColor` + invalidation hook for `registerColorNames`** — sibling parsers (`parseCSSValue`, `parseCSSPercent`, `parseCSSTime`, `parseAnimationShorthand`, `parseCSSStylesheet`, `getComputedValue`) all memoize today; `parseCSSColor` (the most-called color entry point) is not, despite CLAUDE.md promising parity. | Dj P1 → CHALLENGE upholds; magnitude clarified (~8 calls/recompute in gradient build, but the load-bearing site is `useSafeAccentFn().safeCss()` non-debounced list-render) | **D.W3 Lane C** (extend) | ≤10 lines library-side (mirror `parseCSSValue`); + JSDoc "returned ValueUnit MUST NOT be mutated" |
| **L4** | **Route `evaluateSimpleCalc`'s `new Function()` through the existing `parsing/math.ts` AST evaluator** — D6 invariant violation ("no effusive dynamicism") + redundant with a real calc AST the lib already ships. | Di F7/B1 + Dm FE7 (both lanes flagged independently) → CHALLENGE upholds | **D.W2 Lane D** | Replace ~10-line `new Function` block at `src/parsing/color.ts:78` with delegation to `evaluateCalc(parseCSSMath(input))` |
| **L5** | **Wire `hueMethod` through `lerpColorValue`** — `normalizeColorUnits` returns `hueMethod` in a 3-tuple that the downstream destructure drops; animations between `oklch(50% 0.2 350°) → oklch(50% 0.2 10°)` go the long way round (340° via 180°) instead of the spec-default `shorter` (20° via 360→0). | Dl P1 → CHALLENGE upholds AS LOAD-BEARING **but rejects the "one-branch fix" claim** — `InterpolatedVar<T>` has 4 fields, none for `hueMethod`/`colorSpace`; fix is type extension + producer + consumer (3 files) | **D.W3 Lane C** (extend) | 3-file change: `InterpolatedVar` type extension, `normalizeColorUnits` carry-through, `lerpColorValue` dispatch on the new field |
| **L6** | **Fix `parseCSSValue("inherit")` losing its `CSSWideKeyword` `superType`** — `ValuesValue` is missing `CSSWideKeyword` in `src/parsing/index.ts:251` while line 235's internal `Value` has it; `inherit`/`unset`/`initial`/`revert` parse as opaque strings to the public API. Medium-severity behavioural defect. | Dm cross-cutting → CHALLENGE upholds | **D.W1 Lane L6** (library barrel) | 1-line fix in `parseCSSValue`'s combinator chain |

## §2 — P2 — held over from the challenges (cheap, correctness-class, bundle here)

| # | Finding | Source | Wave |
|---|---|---|---|
| L7 | **Color function case-insensitivity** — `colorOptionalAlpha`/`relativeColorParser`/`math.ts` use case-sensitive `string()` instead of `istring()`; `RGB(...)` / `OKLCH(...)` / `CALC(...)` rejected despite CSS Color L4 + CSS Values 4 explicitly specifying ASCII case-insensitive function names. `colorMixSpace` already uses `istring` — internal inconsistency confirms the bug. | Dm cross-cutting → CHALLENGE upholds | D.W1 Lane L6 |
| L8 | **`parseCSSValueUnit` memo (parity)** — sibling to L3; same CLAUDE.md contract; same call-pattern stability. | Dj M1 (added at challenge) | D.W3 Lane C |
| L9 | **Targeted `decompose` test coverage** — REDUCED from research's "no direct coverage" (`test/refactor-fixes.test.ts:221-355` already covers identity/translation/rotation+translation/slerp). Genuine gaps: scale, skew, perspective, full-compose, the 4 quaternion-extraction branches. ~40 LoC of additional tests. | Dk P1 → CHALLENGE reduces scope | D.W1 Lane L7 |
| L10 | **Export `TimingFunction = (t: number) => number` type alias from `src/easing.ts`** — keyframes.js parallel-defines this 3-line type with no shared canonical home; value.js exports no equivalent (no `EasingFunction` either). Genuine ~3-line ship; value-add is canonicality. | Dn K7 → CHALLENGE upholds | D.W1 Lane L6 |
| L11 | **Argument-order drift across `lerp(t, a, b)` / `interpolateHue(a, b, t, method)` / `slerp(a, b, t)`** — ~8 sites; bundle with L5 (the hueMethod wiring) so the interpolation surface is touched once. | Dl P4 → CHALLENGE upholds as cheap | D.W3 Lane C (bundle with L5) |

## §3 — P3 — small wins, optional, gated on bandwidth

| # | Finding | Source | Wave |
|---|---|---|---|
| L12 | **`evaluateSimpleCalc` byproducts** — once L4 lands, the closure-allocation hot-spot Di F1/S1 (the `_lerp` bolt-on bimorphism) is downgraded to a P3 cleanup. | Di F1 (post-challenge demotion) | D.W3 Lane C (small) |
| L13 | **k-means threshold relaxation** — `1e-10` squared OKLab distance is 5000× tighter than JND; benchmark showed 3× speedup on noisy-photo synthesis (9→3 Lloyd iterations). Coupled with `maxIterations=10` — relax threshold AND lower max-iter together, or neither (the cap may be doing the actual gating today). | Dk → CHALLENGE PARTIAL UPHOLD with benchmark | D.W1 Lane L7 (small) |
| L14 | **`nameParser` 156-branch `any()`** (corrected from "148" at challenge) — every `display: flex` traverses 156 regex tests before falling through. Replace with `parse-that`'s `dispatch(map)` (already shipped, currently unused). Modest speedup; KISS-aligned by deleting a hand-rolled loop. | Dm HP3 → CHALLENGE upholds with count correction | D.W1 Lane L6 (optional) |
| L15 | **`bbnf-equivalence.test.ts` is misnamed** — imports zero BBNF runtime; the test snapshots hand-written parsers. Either rename to reflect that, or actually wire it to execute the BBNF grammars. | Dm BBNF section → CHALLENGE elevates this above the "10 drift items" | D.W6 doc-drift |

## §4 — Coordination — keyframes.js cross-repo (filed, not value.js work)

Per the invariant "value.js cannot write keyframes.js" — these route to `coordination/Q.md §9`:

| # | Finding | Source | Disposition |
|---|---|---|---|
| C1 | **`AnimationOptions` name collision** — value.js (`src/parsing/extract.ts:16-25` — CSS-shorthand-string type) and keyframes.js (`src/animation/constants.ts:73-91` — engine-callable type) define genuinely-different shapes under the same name. **Recommend: value.js renames its export to `CSSAnimationOptions`** at L6 above; keyframes.js keeps `AnimationOptions` as its engine type. | Dn K6 → CHALLENGE upholds | **value.js-side rename folds into D.W1 Lane L6** (since value.js owns the rename); the keyframes.js-side import update is filed in `coordination/Q.md §9` |
| C2 | **parse-that pin desync REFRAMED** — `^0.8.1` (keyframes.js) vs `^0.8.2` (value.js) is cosmetic; the **real hazard** is cross-realm doubling from `file:..` linking: nested `node_modules/@mkbabb/value.js/node_modules/@mkbabb/parse-that` confirmed to exist. Pin alignment cannot fix this; only `package.json`'s `peerDependencies` or workspace hoisting can. | Dn K8 → CHALLENGE REFRAMES | `coordination/Q.md §9` — files the reframed cross-realm Parser-class hazard; recommends peerDep declaration on keyframes.js for parse-that |
| C3 | **kf-1 — keyframes.js's 965-line `animation/index.ts` 7-module split sketch** — CHALLENGE verified the sketch FAITHFUL (with 2 minor caveats: `setOptions` boundary belongs in `1.2 options.ts` not `1.1 animation.ts`; `_boundDraw` bridges `1.1/1.3` and resolves cleanly via module augmentation). The sketch (a `animation.ts` ~250 / `options.ts` ~140 / `playback.ts` ~180 / `interp.ts` ~80 / `events.ts` ~25 / `css-keyframes.ts` ~110 / `index.ts` barrel ~50) goes into `coordination/Q.md §9 kf-1-refresh`. | Dn §1 → CHALLENGE upholds | `coordination/Q.md §9` |
| C4 | **keyframes.js still lacks `sideEffects: false`** — verified at D-HARDEN-6 / Dn; standing kf-3 filing refreshed. | Dn §4 → confirmed | `coordination/Q.md §9` (refresh) |

## §5 — Explicit REJECTS (the challenge protected against premature optimization)

The user's directive: "we mustn't change things just to change them. Converge upon an optimum and challenged and research-backed claims. KISS." These claims FAILED challenge and DO NOT fold into D:

| # | Rejected claim | Why |
|---|---|---|
| R1 | Dn K9 P1 — ship `resolveTimingFunction` from value.js to absorb keyframes.js's cubic-bezier regex | DOWNGRADED to HOLD/P3: the regex is an **arithmetic shortcut** (regex → 4 floats → `CSSCubicBezier(…)`), NOT parser-shaped; lifting it through value.js's full parser would slow keyframes.js or be a net-wash byte move |
| R2 | Dn K10 P3 — `flattenValueTree` helper | DROPPED: single consumer (17-line local helper in keyframes.js), no second site; KISS gate |
| R3 | Di F1/S1 — `_lerp` bolt-on creates **bimorphic** call site | REVISED: bimorphism downgraded to monomorphic (all IVs pass through `prepareInterpVar` per `keyframes.js/src/animation/utils.ts:275`); fix sketch retained but demoted from P1 to P3 (kept as L12) |
| R4 | Di F2 — `Color<T>`'s `[key: string]: any` TS index-signature affects V8 hidden class | REJECTED: TS types erase at runtime; V8 sees only the Map storage. The underlying Map-storage finding stands (L1), but the TS-index-signature framing was wrong |
| R5 | Di F4 doc-drift — `units/color/CLAUDE.md` says "f64 typed arrays" but matrix.ts uses plain tuples | REJECTED: research misread the doc — it says "f64 precision" (the data type), not "f64 typed arrays" (the container). No drift |
| R6 | Di F9 — XYZ_FUNCTIONS dispatch creates megamorphic call site | REJECTED: conflates type-test branching with megamorphic call-site polymorphism; string-keyed object lookup is V8-monomorphic-friendly |
| R7 | Di S3 — speculative shape concern | REJECTED (self-flagged speculative by Di) |
| R8 | Dj — memoize `color2`, `normalizeColorUnit`, `gamutMap`, `mixColors`, `interpolateHue`, `toFormattedString`, `solveCubicBezierX`, XYZ-hub leaves, `flattenObject`, `harmony`, `decomposeMatrix3D` | REJECTED en bloc (all 11 anti-recommendations upheld by challenge with 0 overturned). `solveCubicBezierX` reject confirmed (per-tick `x` is continuous → cache thrash); `toFormattedString` reject confirmed (Color components mutate in place → stale-cache hazard) |
| R9 | Dl — "5 missing cases" inflated framing | REDUCED to 3 (length-%, incompatible transform list, hue boundary which is duplicate of L5/P1); `currentColor` SOFT (consumer concern); same-name FunctionValue REJECTED (flatten+relift actually works) |
| R10 | Dl — "one-branch fix" for hueMethod wiring | REJECTED: required 3-file change (type + producer + consumer); fix shape revised at L5 |
| R11 | Dm FE1 — `stylesheet.ts:212` silent declaration-value fallback as "high" D3 violation | REVISED: CSS Syntax 3 spec is intentionally permissive at the declaration-value boundary; severity high → medium |
| R12 | Dm FE3 — `animation-shorthand.ts:184` silent unknown-token drop as "medium" violation | REVISED: CSS Animations Level 1 explicitly says "any unrecognized values are ignored"; severity medium → low (spec-compliant permissiveness) |

## §6 — Wave fold-in map

```
D.W1 Lane L6 (library barrel completeness)
    ├── L6 CSSWideKeyword fix (parseCSSValue)
    ├── L7 case-insensitivity fix (RGB/OKLCH/CALC function names)
    ├── L10 export TimingFunction type alias
    ├── L14 (optional) nameParser dispatch refactor
    └── C1 value.js-side AnimationOptions rename to CSSAnimationOptions

D.W1 Lane L7 (test coverage + lint)
    ├── L9 targeted decompose test cases (scale/skew/perspective/full-compose)
    └── L13 (optional, benchmark-gated) k-means threshold + maxIter pair-tune

D.W1 Lane L8 (NEW — Color<T> storage transposition)
    └── L1 flatten Color<T>.components Map → own properties (~300 LoC, ~20 consumers)

D.W2 Lane D (legacy excision)
    └── L4 route evaluateSimpleCalc through parsing/math.ts AST evaluator (D6 invariant)

D.W3 Lane C (codemod + micro-fixes)
    ├── L2 cssColorToRgb memoise (already filed)
    ├── L3 parseCSSColor memo + invalidation hook
    ├── L5 hueMethod wiring (3-file change)
    ├── L8 parseCSSValueUnit memo parity
    ├── L11 lerp-family argument-order canonicalisation (bundle with L5)
    └── L12 _lerp bolt-on cleanup (P3, optional, after L4)

D.W6 close-residuals
    └── L15 bbnf-equivalence.test.ts misnamed-or-rewire decision

coordination/Q.md §9 (cross-repo file)
    ├── C1 AnimationOptions rename ask
    ├── C2 parse-that cross-realm hazard (reframed)
    ├── C3 kf-1 7-module god-module split sketch
    └── C4 sideEffects: false refresh
```

## §7 — Net library-side delta (D after fold-in)

- **D.W1** gains Lane L8 (Color<T> storage flatten) — the load-bearing performance + ergonomic win across the lerp / mixColors / color2 hot paths.
- **D.W1 Lane L6** gains 4 small library-barrel fixes (CSSWideKeyword + case-insensitivity + TimingFunction + AnimationOptions rename).
- **D.W1 Lane L7** gains targeted decompose tests + optional k-means tune.
- **D.W2 Lane D** gains the `evaluateSimpleCalc` D6-violation excision.
- **D.W3 Lane C** gains 4 micro-fixes (parseCSSColor memo + hueMethod wiring + parseCSSValueUnit + arg-order canonicalisation).
- **D.W6** gains the bbnf-test rewire/rename close-residual.
- **coordination/Q.md §9** gains the 4 keyframes.js coordination items (refreshes existing kf-1, kf-3 filings + new K6/K8 reframes).

All 6 P1 + 5 P2 + 4 P3 surviving items + 4 coordination items fold into existing D infrastructure without a new wave. No scope dropped; every research finding either landed or REJECTS with documented reasoning.

KISS gate held: 12 originally-flagged items REJECTED in §5 because the challenge could not independently confirm them (R8 alone covers 11 anti-recommendations standing).
