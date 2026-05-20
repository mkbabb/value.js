# Dj — Memoization CHALLENGE (READ-ONLY adversarial review)

Stress-test of `Dj-memoization.md`. Verdict shape mirrors Di.

Methodology: for every claim, re-read the cited file:line. A memo is **REJECTED** unless the call-site pattern is confirmed *stable + hot* AND the recompute is more expensive than the cache lookup. An ANTI-recommendation is **OVERTURNED** only if the challenge finds a hot consumer the research missed.

---

## §1 — P1 challenge verdict: memoize `parseCSSColor`

**Research claim**: wrap `parseCSSColor` (`src/parsing/color.ts:534`) with `memoize(...)` (256-entry LRU), mirroring `parseCSSValue` (`src/parsing/index.ts:258`). 25 demo call-sites; at least 3 hot.

### Findings

- **Pattern parity with `parseCSSValue`** — VERIFIED. `parseCSSValue` at `src/parsing/index.ts:258` is a single-string-arg pure function wrapped in `memoize` with default `JSON.stringify` key. `parseCSSColor` has the same signature (`(input: string) → ValueUnit`). The memo wrap is a 1-line analogue.
- **CLAUDE.md promise** — VERIFIED. `src/parsing/CLAUDE.md` line "Top-level parse functions are memoized via `utils.memoize()`" lists this as a contract; `parseCSSColor` is currently the only top-level parse function NOT memoized (`parseCSSValue`, `parseCSSPercent`, `parseCSSTime`, `parseCSSValueUnit` checked — see §3.M1 for `parseCSSValueUnit`).
- **Call-site count** — research says 25 demo call-sites. Actual count: 22 import/use references across 11 demo files (`grep -rn "parseCSSColor" demo/`). Some files have 2-3 internal uses, putting the *call-line* count near the research's number. **Close enough; the magnitude claim holds.**
- **Hot-path verification**:
  - **`cssToRawColor` → gradient build** (`useGradientCSS.ts:82-83`): research says "≥ stepsPerInterval × (stops-1) calls per recompute." **PARTIALLY WRONG.** Reading the loop: `resolveColor` is called in the OUTER `for (i in stops-1)` loop only (lines 82-83), NOT in the inner `j` loop. So per recompute the count is `2 × (stops - 1)`, not `stepsPerInterval × (stops - 1)`. For a 5-stop gradient that's 8 calls per recompute — still meaningful when slider-drag triggers ~60 recomputes/s, but the order of magnitude is smaller than the research suggested. Strings are stable (only the actively-edited stop's `cssColor` changes per drag).
  - **`useMarkdownColors.ts:24`**: inside Vue `computed()` — Vue already caches the result against `(colorStr, isDark)`. The memo win here is **near-zero** because Vue's reactivity has already short-circuited stable inputs. Research over-states this site.
  - **`useContrastSafeColor.ts:80`** (`safeAccentFromCss`): called from `safeCss(css)` in `useSafeAccentFn` — this is a plain function, NOT a computed, returned for arbitrary palette items in list render. **CONFIRMED hot.** A palette of 50 items × 2 contexts = 100 calls per render, all on stable CSS strings. **Genuine win.**
  - **`useColorParsing.ts:88`**: `parseAndSetColorDebounced` (debounce 2000 ms) — debounced, not hot. The default-init at `:34` runs once.
  - **`usePaletteManagerWiring.ts:47`**: `emitAddColor` — user-action triggered. Not hot.
  - **`color-picker/index.ts:40`**: module-init constant. One-shot.
- **Cache key**: `JSON.stringify(["red"])` ≠ `JSON.stringify(["RED"])` — duplicate entries for case-variants. Not a correctness bug; minor inefficiency. Same as `parseCSSValue`.
- **Throw semantics**: `memoize` only caches on successful returns (`src/utils.ts:132-135`). Invalid color strings throw via `tryParse` (`color.ts:548`) and are NOT cached. **VERIFIED safe.**
- **Custom-color-name registry hazard** (P2): VERIFIED. `parseCSSColor` reads `customColorNames` (`color.ts:540-545`) on the fallback path. If `registerColorNames` adds `lavendi → oklch(...)` AFTER `parseCSSColor("lavendi")` threw, the memo would have NO cache entry to invalidate (throws don't cache) — the next call goes through and parses correctly. So the failure direction is **safe by default**. The hazard is the *other* direction: `registerColorNames` REPLACES an existing custom name's CSS — the prior call's cached ValueUnit is now stale. Calling `parseCSSColor.cache.clear()` from `registerColorNames` / `clearCustomColorNames` resolves this. The P2 hook is sufficient.
- **Mutation hazard** — RESEARCH MISSED. The memoize helper caches the **reference** to the ValueUnit, not a clone. If any consumer mutates the returned object (e.g. `parsed.value.alpha = 0.5`), all subsequent cache hits return the mutated version. Audit of all 11 demo call-sites: every consumer either passes the result straight to `normalizeColorUnit` (default `inplace=false` → clones) or extracts read-only metadata. **No current consumer mutates.** The cache is safe TODAY. But this invariant is implicit — the implementation should add a JSDoc note ("returned ValueUnit MUST NOT be mutated") to harden against future regressions. The same risk exists for the already-deployed `parseCSSValue` memo and has not bitten anyone; this is consistent precedent.
- **Cost-per-miss benchmark**: research has none. The `Value` parser is the union of 15 color-space parsers + math + named + hex + relative-color. A rough estimate: ~10-50 µs per miss vs. ~0.5 µs per Map.get hit. For the `safeCss` palette-render site (50× per render), worst-case saved time is ~2.5 ms per render at the gradient build — meaningful but not transformative. **The win is real but the magnitude is small.**

### Verdict — **P1 STANDS, with two refinements**

- **CONFIRMED**: Wrap `parseCSSColor` with `memoize(...)` mirroring `parseCSSValue`. Single-source-of-truth gain (CLAUDE.md contract), and a real per-render win for the `safeCss` list-rendering site.
- **REFINEMENT 1**: The research over-states the gradient-build hot-path (8 calls/recompute, not "dozens-to-hundreds"). Justify the memo primarily by the `safeAccentFromCss` / `useSafeAccentFn` palette-render path and by CLAUDE.md contract parity — not by the gradient build.
- **REFINEMENT 2**: Add a JSDoc note on `parseCSSColor` ("returned ValueUnit MUST NOT be mutated by consumer; clone first if mutation required"). Mirrors the implicit invariant on `parseCSSValue`.
- **P2 invalidation hook** is **NECESSARY and SUFFICIENT** — `parseCSSColor.cache.clear()` in `registerColorNames` + `clearCustomColorNames`. The throw-doesn't-cache semantic means the "register-after-failed-parse" direction is automatically safe; only the "re-register a name" direction needs explicit invalidation.

---

## §2 — ANTI-recommendation challenges (11 verdicts)

### A1. `color2(color, to)` — research says NOT-WORTH (mutable Color, no stable identity)

- **Definition**: `src/units/color/utils.ts:975` — converts a `Color` instance to another space via XYZ hub.
- **Inputs**: mutable `Color` instances; per-conversion cost is 2 matrix multiplies + transfer functions (~3-10 µs).
- **Consumer audit**:
  - `mixColors:1101-1102` — 2× per mix call. Mix inputs are typically the same endpoint Colors swept by `p1, p2`. Endpoint stability is real, but the inputs are objects with no stable identity (no WeakMap-able tag) — and a WeakMap keyed by Color would need a secondary keyed Map by `to` (space string).
  - `gamutMap:1005,1024,1029` — 3× per map. Inner color, not user-facing.
  - `colorUnit2:94` — 1× per call, the outer wrapper layer used by demo.
- **Challenge**: could the memo at the `cssToRawColor` layer (P1+P2) absorb 100% of the win? **Verified — yes.** Every Color reaching `color2` originates from `parseCSSColor → normalizeColorUnit → colorUnit2`. P1 caches the parse step; the downstream `color2` work is the post-parse residue. Adding a `color2` memo would double-cache work already covered upstream.
- **VERDICT — REJECT STANDS**. The research is correct. A WeakMap<Color, Map<space, Color>> cache would invalidate on every slider drag (Color mutated in place) and add lookup overhead.

### A2. `normalizeColorUnit(color, inverse)` — research says NOT-WORTH

- **Definition**: `src/units/color/normalize.ts:65`.
- **Inputs**: `ValueUnit<Color>` instances — research says "freshly-cloned per call." **Verified.** Line 70: `color = inplace ? color : color.clone()`. So even if cached, the input identity is new each time.
- **Challenge**: could a memo on the result `toString()` work? No — `toString()` is what we'd compute *after* normalization. The cycle is backwards.
- **VERDICT — REJECT STANDS**. Cache key would require deep-comparing the wrapped Color; the cost of the key would exceed the work saved.

### A3. `gamutMap` / `gamutMapSRGB` — research says NOT-WORTH (already analytical)

- **Definition**: `src/units/color/gamut.ts` and `utils.ts:1004`. Ottosson analytical method.
- **Cost**: polynomial guess + 1 Halley step. Microseconds per call.
- **Cache lookup overhead**: `JSON.stringify(color)` or WeakMap-with-secondary cost ≥ recompute.
- **VERDICT — REJECT STANDS**. Memo overhead > work saved. Verified.

### A4. `mixColors` — research says NOT-WORTH (continuous p1/p2)

- **Definition**: `src/units/color/utils.ts:1092`.
- **Continuous inputs**: `p1, p2` are gradient sweep parameters. Each step has a unique `(p1, p2)` tuple.
- **Cache thrash**: a cache keyed by `(col1, col2, p1, p2, space, hueMethod)` would have ~`stepsPerInterval × (stops-1)` unique entries per gradient build, then never re-hit.
- **Stable subterm — `color2(col1, space)`**: the only repeating work. Covered upstream by `cssToRawColor` cache (which calls `color2` once per stop).
- **VERDICT — REJECT STANDS**. Stable subterm is captured upstream; the continuous inputs make a `mixColors`-level memo cache-thrash.

### A5. `interpolateHue(h1, h2, t, method)` — research says NOT-WORTH

- **Definition**: `src/units/color/utils.ts:1049`.
- **Continuous `t`**: gradient sweep parameter.
- **Body**: 4-branch `switch` on `diff = h2 - h1` — constant time.
- **VERDICT — REJECT STANDS**. The function IS the cache lookup, semantically. Memoizing would replace ~5 ns with ~500 ns.

### A6. `toFormattedString(digits)` on Color — research says NOT-WORTH (mutable components)

- **Definition**: `src/units/color/index.ts:48`.
- **Hot consumer claim by research**: "≥20 call-sites in render-path." Verified — multiple sites in `useColorModel`, `useColorUrl`, `useColorNameResolution`, `useSliderGradients`, etc.
- **Challenge — picker slider drag re-renders**: every slider drag mutates `model.value.color.value.{l,c,h}.value` in place. So `Color` reference identity is stable but component values change. A WeakMap<Color, Map<digits, string>> cache would return STALE strings.
- **The 2-call pattern at `usePaletteManagerWiring.ts:52,57`**: formats `newStr` once, then formats every `savedColors[i]` to compare. The same `savedColors[i]` Color is NOT mutated during this scan (the user added a new color; saved colors are static). So WITHIN one scan, each saved Color could be cached IF the scan re-ran on the same array. But `findIndex` only iterates once per `emitAddColor` call. **No intra-call re-use.**
- **Render-path re-call**: between paints, Vue's reactivity may re-execute the computed. But the dependent `Color` has mutated in place → the cached entry is stale → the cache hit would be WRONG.
- **VERDICT — REJECT STANDS**. The mutable-in-place invariant makes any Color-keyed cache a correctness hazard. Fix this at the demo layer via reactivity (Vue's `computed` already does it for the read paths) or by converting Color to immutable snapshots — neither is in scope for this lane.

### A7. `solveCubicBezierX(x, x1, x2)` — research says NOT-WORTH (continuous x)

- **Definition**: `src/easing.ts:128`. Newton-Raphson up to 8 iterations + bisection fallback up to 64.
- **Consumer audit**:
  - Used inside `CSSCubicBezier(x1, y1, x2, y2)` closure at `:160`. The closure IS the timing function returned from `getTimingFunction`.
  - Named timing functions (`ease`, `ease-in`, etc.) construct their `CSSCubicBezier` closures **once at module load** (`easing.ts:487-493`), so the SAME closure is reused across all callers. Per-tick calls hit the same `(x1, x2)` pair.
  - `easeInBounce`/`bounceInEase` (`:164-170`) construct a fresh `CSSCubicBezier(0.09, 0.91, 0.5, 1.5)` closure on EVERY t invocation — but this is closure-creation waste, not solver waste. Research correctly routes this to C11/P3.
- **Per-tick `x` is continuous**: each animation frame produces a unique `x ∈ [0, 1]` (60 fps × 1000 ms / duration ≈ N unique values). Memoizing on `x` is cache-thrash territory.
- **Challenge — could `x` be quantized?**: 16-bit quantization (1/65536) would yield cache hits across animations of similar duration. But this changes semantics (rounding error in the Newton solve) and the cost saved (~Newton 4-8 iterations) is microseconds. Not worth the complexity.
- **Challenge — does the inner solve get called with SAME `x` repeatedly?**: only if two animations sample the same exact `x`. Across animation tick loops on different `(x1, x2)` curves, hits are coincidental.
- **VERDICT — REJECT STANDS**. The research correctly tags this as continuous-input cache thrash. The C11/P3 closure-hoisting fix in `easeInBounce`/`bounceInEase` is the real win and belongs to the simplify pass.

### A8. XYZ-hub leaf conversions (`rgb2xyz`, `xyz2oklab`, etc.) — research says NOT-WORTH

- **Definition**: `src/units/color/utils.ts` — atomic 6-multiply + transfer-function operations.
- **Per-call cost**: ~1-2 µs. Map.get overhead: ~0.5 µs.
- **Stable identity**: none — Color instances are mutable.
- **VERDICT — REJECT STANDS**. Memo overhead > recompute. The matrices are already module-level constants (`constants.ts:262-301` — verified row-major literals).

### A9. `flattenObject` / `unflattenObject` — research says NOT-WORTH (frame-mutated inputs)

- **Definition**: `src/units/utils.ts`.
- **Per-frame mutation**: in keyframes.js's `transformTargetsStyle`, inputs are the per-frame style records — mutated every tick.
- **No stable input**: cache key would need a deep object hash; rebuilding the hash IS the work.
- **VERDICT — REJECT STANDS**.

### A10. `harmony` / `generatePalette` — research says NOT-WORTH (user-triggered)

- **Definition**: `useColorGeneration.ts:217`.
- **Frequency**: user-click only. Not in a loop or RAF.
- **VERDICT — REJECT STANDS**. Cold path.

### A11. `decomposeMatrix3D`, `slerp`, `recomposeMatrix3D` — research says NOT-WORTH (covered by getComputedValue)

- **Definition**: `src/transform/decompose.ts`.
- **Hot consumer**: `getComputedValue` (`src/units/normalize.ts:128`) — already memoized.
- **Cache layer**: getComputedValue's memo captures the outer call (`(value, target)`); the decompose work runs once per cache miss.
- **VERDICT — REJECT STANDS**. Covered upstream.

### Summary — ANTI verdicts: **11/11 STAND**

No anti-recommendation overturned. The research's rejections are consistent with the call-site evidence. The two challenges I attempted to mount (`solveCubicBezierX` per-tick on stable curves; `toFormattedString` on stable savedColors during palette scans) both fail on closer inspection — `x` is continuous per tick, and `savedColors[i]` is only iterated once per scan (no intra-call re-hit).

---

## §3 — Missed-candidate additions

### M1. `parseCSSValueUnit` — **MISSED P2-tier candidate**

- **Definition**: `src/parsing/units.ts:106`. Single-string-arg pure parse.
- **Consumers**:
  - `src/units/normalize.ts:137` (inside `getComputedValue`'s body — covered by the outer memo).
  - `src/parsing/color.ts:480` (inside the color parser — covered by P1's parseCSSColor memo once added).
- **Standalone external use**: re-exported from `src/index.ts:315` for library consumers.
- **CLAUDE.md contract**: same family as parseCSSValue/parseCSSPercent/parseCSSTime, which says "Top-level parse functions are memoized." This one is NOT.
- **Verdict**: **P2** — add the memo for contract parity, but the win is small because both internal call-sites are covered by outer memos. Library consumers may benefit if they call it in loops.
- **Effort**: 1 line, mirrors siblings.
- **Recommendation**: ADD to Dj's deliverable, folded into the same diff as P1.

### M2. `safeAccentFromCss` (demo, `useContrastSafeColor.ts:78`) — possible demo-side memo

- **Definition**: local helper used by `useSafeAccentFn().safeCss()`.
- **Hot consumer**: arbitrary palette item rendering — non-debounced, non-computed, called from template `safeCss(palette[i].css)` style usage.
- **Verdict**: covered by P1 (parseCSSColor is the dominant cost inside safeAccentFromCss). The residual `colorUnit2` + `computeSafeAccent` work is small. **No separate memo needed** if P1 lands.

### M3. `NORMALIZED_COLOR_NAMES` reverse-lookup (demo, `useColorNameResolution.ts:41-44`)

- **Issue**: `Object.entries(NORMALIZED_COLOR_NAMES).find(...)` — O(n) scan on ~147+ entries every time `currentXYZString` changes.
- **Not a memo target**: a data-structure fix (reverse Map at module load). Out of scope for Dj.
- **Recommendation**: NOTE in the simplify pass / De-frontend-god-modules lane.

### M4. Stale `memoize` import in `src/units/color/utils.ts:36`

- **Finding**: `utils.ts` imports `memoize` but does NOT use it. Dead import.
- **Recommendation**: cleanup — remove the import. Trivial, route to simplify pass.

### M5. `colorToHexString` / `toCSSColorString` (`demo/@/components/custom/color-picker/index.ts:57,70`)

- **Considered as missed memo**: render-path call sites.
- **Input**: `ValueUnit<Color<...>>` — Color components mutated in place per slider drag.
- **Verdict**: same hazard as `toFormattedString` (A6). Cache-key would either need a deep value hash (defeats the purpose) or a Color-reference key (returns stale data). **NOT a memo target.**

### Net new candidates: **1 P2 (parseCSSValueUnit) + 2 cleanup notes (M3, M4)**

---

## §4 — Post-challenge synthesis

### What survives

| Priority | Item | Source | Effort | Confidence |
|----------|------|--------|--------|------------|
| **P1** | Memoize `parseCSSColor` (`src/parsing/color.ts:534`) | Dj §2.1 | XS — 1 line | HIGH — CLAUDE.md contract parity + verified hot palette-render site (`safeAccentFromCss`) |
| **P1** | `parseCSSColor.cache.clear()` in `registerColorNames` and `clearCustomColorNames` (Dj §2.3) | Dj §2.3 | XS — 2 lines | HIGH — required for correctness of P1 |
| P1 refinement | JSDoc note: "returned ValueUnit MUST NOT be mutated by consumer" | **CHALLENGE addition** | XS — 1 comment | MEDIUM — hardens implicit invariant shared with `parseCSSValue` |
| P2 | Memoize `parseCSSValueUnit` (`src/parsing/units.ts:106`) for CLAUDE.md contract parity | **CHALLENGE addition** | XS — 1 line | MEDIUM — internal call-sites covered; external library win only |
| P2 (defer) | Demo-side `cssToRawColor` Map cache | Dj §2.2 | S — 5 lines | LOW — do only if P1 profile still shows hot post-parse work |
| P3 (defer to simplify) | Hoist `easeInBounce`/`bounceInEase` closures to module scope | Dj §3 / §4 P3 | S | LOW priority — KISS/dedup, not memo |
| P3 (defer to simplify) | `getTimingFunction` LRU(32) for string inputs | Dj §4 P3 | S | LOW |
| Cleanup | Remove unused `memoize` import in `src/units/color/utils.ts:36` | **CHALLENGE addition** | XS | trivial |

### What does NOT survive

- All 11 ANTI-recommendations stand: `color2`, `normalizeColorUnit`, `gamutMap`, `mixColors`, `interpolateHue`, `toFormattedString`, `solveCubicBezierX`, XYZ-hub leaves, `flattenObject`, `harmony`, `decomposeMatrix3D`. The research correctly classified each. No challenge-overturn.

### Recommended Dj deliverable scope

Minimal diff (≤10 lines library-side):

1. Wrap `parseCSSColor` with `memoize(parseCSSColor, { maxCacheSize: 256 })`.
2. Add `parseCSSColor.cache.clear()` to `registerColorNames` and `clearCustomColorNames`.
3. Wrap `parseCSSValueUnit` with `memoize(...)` for contract parity (P2).
4. Add JSDoc note on `parseCSSColor` ("returned ValueUnit must not be mutated").
5. (Optional cleanup) remove unused `memoize` import from `color/utils.ts:36`.

**Do NOT** wrap any of the §2 ANTI-list functions. The user-stated KISS / "don't change things just to change them" guardrail is consistent with every challenge-confirmed rejection.

### Confidence summary

- **P1 (parseCSSColor)**: HIGH confidence — clear contract gap, real palette-render hot consumer, low-risk implementation, P2 invalidation hook closes the only correctness gap.
- **Anti-recommendations**: HIGH confidence — all 11 challenged sites confirm continuous inputs, mutable identities, or upstream coverage.
- **Missed candidates**: MEDIUM confidence on M1 (parseCSSValueUnit contract parity); LOW marginal value but trivial cost.

### Risk register (post-challenge)

- **R1**: mutation-of-cached-ValueUnit hazard exists in theory for `parseCSSColor` (and the already-deployed `parseCSSValue`). Mitigation: JSDoc note + current consumer audit shows zero mutation. Future regressions caught by adding a `clone()` to the memo wrapper if needed (mirrors keyframes.js `tryParseCache` pattern).
- **R2**: Cache key case-sensitivity (`"RED"` ≠ `"red"`) creates duplicate entries. Inefficiency, not correctness. Acceptable.
- **R3**: 256-entry cache cap may be tight if a session works through palette libraries (hundreds of unique colors). Recommend monitoring or bumping to 512 if profile shows eviction churn.

---

**End of challenge.**
