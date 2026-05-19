# Dj — Memoization Opportunities (READ-ONLY research)

Lane **Dj** (Dκ). Surveys value.js + keyframes.js library + parsing + math + color + animation code for pure functions called repeatedly with stable inputs in hot paths.

The `cssColorToRgb` per-frame finding (`demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:174`, A.W7 / D.W3 Lane C) is the existing exemplar — a 1×1 canvas-2D round-trip every RAF tick on a usually-stable input string. This survey looks for **other** candidates with the same shape: pure function × repeated same-input call × hot path.

The user's guidance is conservative — **do not claim a memo without evidence**. Many findings below are "NOT-WORTH" or "already-done" precisely to avoid changing things just to change them.

## What already exists

`src/utils.ts:104` exports a `memoize<T>()` helper with `maxCacheSize`, `ttl`, `keyFn`, `shouldCache`. Already applied to:

| Function | File:Line | Key | Notes |
|----------|-----------|-----|-------|
| `parseCSSValue` | `src/parsing/index.ts:258` | `JSON.stringify` | unbounded cache |
| `parseCSSPercent` | `src/parsing/index.ts:262` | `JSON.stringify` | unbounded |
| `parseCSSTime` | `src/parsing/index.ts:266` | `JSON.stringify` | unbounded |
| `parseAnimationShorthand` | `src/parsing/animation-shorthand.ts:200` | default | unbounded |
| `parseCSSStylesheet` | `src/parsing/stylesheet.ts:512` | default | unbounded |
| `getComputedValue` | `src/units/normalize.ts:128` | `${value.toString()}-${elementId}` | `shouldCache` suppresses caching of disconnected targets; `WeakMap<HTMLElement, number>` for element identity |

keyframes.js also has a private `tryParseCache` (`src/animation/utils.ts:139`) for shorthand-value parsing in `parseAndFlattenObject`. Cache returns clones, so consumer mutation is safe.

So **the parser side of the library is already covered**. The gaps are on the color / interpolation side.

---

## §1 Candidate inventory

| # | Function | Definition | Call-site / hot-path | Heat | Cache-shape rec |
|---|----------|-----------|----------------------|------|-----------------|
| C1 | `cssColorToRgb` (demo-local) | `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:53` | `:174` — every RAF tick | **HOT** | monomorphic-cell on `color.value` string (last-seen) — **already filed as A.W7 / D.W3 Lane C** |
| C2 | `parseCSSColor` | `src/parsing/color.ts:534` | demo: 25 call-sites; the **hot ones** are `cssToRawColor` (`demo/@/lib/color-utils.ts:22`) called from `useGradientCSS.ts:82-83` (per-stop, per-coalesce, per-keystroke) and `useMarkdownColors.ts:24` (every theme toggle / color change) | **WARM** | **Map keyed by input string** (mirrors `parseCSSValue`). The full Value parser is the most expensive parse in the library. |
| C3 | `cssToRawColor` (demo) | `demo/@/lib/color-utils.ts:21` | `useGradientCSS.ts:82-83` inside a `for i × stepsPerInterval` loop — **dozens-to-hundreds of calls per coalesced-gradient build**; same `stops[i].cssColor` is re-resolved every recompute | **HOT** | **Map keyed by `${space}:${css}`** in the demo (or move the cache one level down by memoizing `parseCSSColor`). |
| C4 | `colorUnit2(unit, to, normalized, …)` | `src/units/color/normalize.ts:81` | end of every parse pipeline + `useSliderGradients.ts:37` (via `toCSSColorString`) × 10 steps × all components | **WARM** | Inputs are mutable `ValueUnit` instances — **NOT a memo target by itself**; cache the upstream `parseCSSColor → normalizeColorUnit → colorUnit2` triplet at the string level (i.e. via C2/C3) and leave this raw. |
| C5 | `normalizeColorUnit(color, inverse=true)` | `src/units/color/normalize.ts:65` | `useColorModel.ts:178`, `useColorNameResolution.ts:66`, `useAppColorModel.ts:59`, `index.ts:75`, `usePaletteManagerWiring.ts:52,57` — called inside palette-equality scans and binding-render paths | **WARM** | Pure on input — but the input is a freshly-mutated `ValueUnit` whose identity changes per call; **NOT-WORTH** at this layer. The savings live one layer up at the `Color` math layer (C7). |
| C6 | `color2(color, targetSpace)` | `src/units/color/utils.ts:975` | `mixColors:1101-1102` (2× per mix), `gamutMap:1005,1024,1029` (3× per map), `safeAccentColor`, `useGradientCSS:rawColorToCSS:52`, every `colorUnit2` call | **HOT** | Input is a mutable `Color` instance (no stable identity); **WeakMap+`to`** would work but the per-conversion cost is small (≤2 matrix multiplies + transfer functions). **NOT-WORTH** for the general case — but worth caching for the **gradient stop endpoint** colors where the same source color is converted to the same space repeatedly (already covered by C3). |
| C7 | `mixColors(c1, c2, p1, p2, space, hueMethod)` | `src/units/color/utils.ts:1092` | gradient: `useGradientCSS.ts:94` (`stepsPerInterval × (stops-1)` times per build), spectrum picker, aurora derivation, `mixColorsN` (left-fold of `mixColors`) | **WARM-HOT for gradients** | Inputs vary continuously (`p1`, `p2` swept across steps); only the **endpoint conversions** repeat. C3 already covers the endpoint memo. The mix itself is **CONTINUOUS-INPUTS → NOT-WORTH**. |
| C8 | `gamutMap(color)` | `src/units/color/utils.ts:1004` | `rawColorToCSS` path for any gradient/animation that crosses sRGB boundary; gamut.ts's `gamutMapSRGB` is the inner Ottosson — analytical, zero-iteration | **WARM** | Ottosson is **already analytical**; the function is fast. **NOT-WORTH** memoizing the whole `gamutMap` — but `safeAccentColor` (`useContrastSafeColor.ts:78`) calls `parseCSSColor → colorUnit2 → computeSafeAccent` per `cssColorOpaque` change × per theme toggle. Memo handled by C2. |
| C9 | `toFormattedString(digits)` (on `Color`) | `src/units/color/index.ts:48` | demo: ≥20 call-sites in render-path (`useColorModel.ts:31,75,85,159,178`, `useColorUrl.ts:59`, `useColorNameResolution.ts:29,56,61,66`, `useCustomColorNames.ts:35`, `useAppColorModel.ts:28,59`, `usePaletteManagerWiring.ts:52,57`, `useSliderGradients.ts:37` (via `toCSSColorString`), `index.ts:75,77`, `ImageEyedropper.vue:216`, `HeroBlob.vue:13`, `ColorInput.vue:95`) | **WARM** | Input is a `Color` instance — components are `ValueUnit<number>` cells mutated in place on every slider drag. **WeakMap<Color, Map<digits, string>>** would invalidate on every component mutation. **NOT-WORTH** at this layer; the gain is at the demo level where the same `Color` is formatted twice with the same `digits` in the same render (e.g. `usePaletteManagerWiring.ts:52,57` formats `newStr` and then formats every `savedColors[i]` to compare). Already 2-call equality scan — micro savings. |
| C10 | `solveCubicBezierX(x, x1, x2)` + `CSSCubicBezier(x1,y1,x2,y2)` | `src/easing.ts:128,156` | per-tick on `frame.timingFunction(scaled)` in `keyframes.js/src/animation/index.ts:615`. Newton-Raphson up to 8 iterations + bisection fallback up to 64. | **HOT** (animation tick loop) | The closure is created once per `getTimingFunction` resolution; the **inner solve** runs every tick with `(x1, x2)` stable but `x` continuous → **CONTINUOUS-INPUTS** → memoizing on `x` is **NOT-WORTH** (cache lookup ≈ Newton step). The closure *itself* could be **memoized on `(x1,y1,x2,y2)` tuple** (LRU of, say, 32 entries) so that `cubic-bezier(.2,.1,.3,1)` parsed from a stylesheet, or `getTimingFunction("ease-out-back")` called repeatedly during fromString resolution, returns the same closure — but that gain is at setup time, not per-tick. **P3.** |
| C11 | `easeInBounce` / `bounceInEase` / `bounceOutEase` / `bounceInOutEase` etc. | `src/easing.ts:164-216` | These functions call `CSSCubicBezier(...)` or `interpBezier(t, points)` with **module-level constants every invocation** — i.e. allocate a fresh closure / array literal on every t value. `easeInBounce` and `bounceInEase` are **identical implementations**. | **HOT if used** | **Lift the array literal + bezier closure to module scope** — this is **closure-hoisting, not memoization**. Almost a free fix, mostly cosmetic perf. **P3, low-impact micro-cleanup** that overlaps with simplify pass. |
| C12 | `XYZ-hub conversions` (`rgb2xyz`, `xyz2oklab`, etc.) | `src/units/color/utils.ts` | All called by `color2()` (C6) — inner step of every conversion | **HOT** | Inputs are `Color` instances; no stable identity. **NOT-WORTH** memoizing the inner conversions; the matrices are already module-level constants (`RGB_XYZ_MATRIX`, `LMS_TO_XYZ_MATRIX`, etc. — verified `:480-488` and `constants.ts:262-301`). |
| C13 | Matrix constants (`RGB_XYZ_MATRIX`, `XYZ_RGB_MATRIX`, `LMS_TO_XYZ_MATRIX`, `WHITE_POINT_D50_D65`, etc.) | `src/units/color/constants.ts:233-301`, `utils.ts:480-486` | Constructed once at module load (`invertMat3` is called at the top level on the imports) | n/a | **VERIFIED safe** — no per-conversion reconstruction. |
| C14 | `interpolateHue(h1, h2, t, method)` | `src/units/color/utils.ts:1049` | Inside every `mixColors` call for cylindrical spaces | per-mix | Inputs `(h1, h2)` stable per gradient, but `t` continuous. **CONTINUOUS-INPUTS → NOT-WORTH** memoizing on the whole tuple. Could pre-compute the "adjusted h1/h2 anchors" per method (a 5-line refactor inside `mixColors` if both endpoints stable) — but it's a 4-branch `switch` on `diff`. **NOT-WORTH** without a profile pointing here. |
| C15 | `parseAndFlattenObject` `tryParseCache` (keyframes.js) | `src/animation/utils.ts:139` | Hit on every animation frame parse | n/a | **already memoized** — Map keyed by `${childKey}:${strValue}`, cached `.clone()`. |
| C16 | `getTimingFunction(name-or-literal)` | `keyframes.js/src/animation/utils.ts:106` | Called from `index.ts:221, 420, 952` — at frame-setup / fromString time, not per-tick | warm at setup | Returns `timingFunctions[name]` (constant lookup) or a fresh `CSSCubicBezier` closure (per-call allocation). **P3 overlap with C10/C11**: memoize on `(typeof tf === 'string' ? tf : null)` only — bypass for callable inputs. LRU(32). |
| C17 | `harmony` / `generatePalette` | `useColorGeneration.ts:217` | user-click triggered, not hot | cold | **NOT-WORTH** — purely on-demand. |
| C18 | `safeAccentColor` / `computeSafeAccent` / `getOklchLightness` | `src/units/color/contrast.ts:90,26,64` | `useContrastSafeColor.ts`, `useMarkdownColors.ts` | warm on theme/color change | Pure on `(color, bgLightness)`. The expensive step is `color2(color, "oklch")` inside `getOklchLightness` and `safeAccentColor`. Same color is rarely re-asked at the same `bgLightness` within a frame — memoizing would just leak. **NOT-WORTH** at the library layer; the demo already memoizes the result via Vue's `computed()`. |
| C19 | `oklchToCss`, `rawOklabToOklch` | `src/quantize/cluster.ts:34`, `src/units/color/gamut.ts` | quantize is one-shot per image | cold | **NOT-WORTH** — outside hot paths. |
| C20 | `decomposeMatrix2D/3D`, `recomposeMatrix3D`, `slerp` | `src/transform/decompose.ts` | Inside `getComputedValue` (already memoized) | cold | covered by `getComputedValue` memo upstream. |
| C21 | `flattenObject`, `unflattenObject`, `unflattenObjectToString` | `src/units/utils.ts` | Per-frame in `transformTargetsStyle` (`keyframes.js/utils.ts:299`) | warm | Inputs are mutated style records — no stable identity; memo would invalidate every frame. **NOT-WORTH**. |
| C22 | `pixelsToOKLab` / `oklabToRgb255` (quantize) | `src/quantize/cluster.ts` | k-means iteration | hot during k-means | Each pixel is unique; **NOT-WORTH**. |

---

## §2 High-confidence recommendations

### P1 — memoize `parseCSSColor` (mirror `parseCSSValue`)

- **Where**: `src/parsing/color.ts:534`
- **Shape**: wrap with `memoize(parseCSSColor, { maxCacheSize: 256 })` — same pattern as `parseCSSValue` (`src/parsing/index.ts:258`).
- **Why now**:
  - 25 demo call-sites; **at least 3 hot ones**: `cssToRawColor` (called from gradient build, ≥`steps × (stops-1)` times per recompute), `useMarkdownColors`, `useContrastSafeColor` (run on every color change × theme toggle).
  - The full grammar — `rgb / hsl / hwb / lab / lch / oklab / oklch / xyz / kelvin / hex / named / color-mix / color() / relative-color` — runs in `Value`. Skipping it on stable inputs is a clear win.
  - **The CLAUDE.md in `src/parsing/` already promises this**: "Top-level parse functions are memoized via `utils.memoize()`". `parseCSSColor` was missed.
  - Cache key is the input string (already what `JSON.stringify` produces for single-string args).
  - Bound cache to 256 entries (typical session has ≤50 unique color strings: theme tokens + saved palette + active edits).
- **Cost-benefit**: 1 line change; downstream `cssToRawColor → normalizeColorUnit → colorUnit2` chain still runs, but the parse step (the dominant cost) is skipped on repeats.
- **Risk**: the runtime custom-color-name registry (`customColorNames` Map) is read on the fallback path (`color.ts:540-545`). The cache must invalidate when `registerColorNames` / `clearCustomColorNames` is called. **Solution**: bump a generation counter on registry mutation and include it in the cache key, OR (simpler) call `parseCSSColor.cache.clear()` at the top of `registerColorNames` and `clearCustomColorNames`. The `memoize` helper already exposes `.cache: Map`.

### P1 — memoize `cssToRawColor` in the demo (or rely on P1 above + `colorUnit2` short-circuit)

- **Where**: `demo/@/lib/color-utils.ts:21`
- **Shape**: `Map<string, Color<number> | null>` keyed by `${space}:${css}`. Bound to 128 entries.
- **Why now**:
  - The same `stops[i].cssColor` is re-resolved every gradient recompute (`useGradientCSS.ts:82-83`).
  - Each call: `parseCSSColor` (covered by P1) + `normalizeColorUnit` + `colorUnit2` + per-component `ValueUnit` unwrap + ctor allocation. Even with P1 applied, the post-parse work is meaningful (`colorUnit2` chains through `color2` → XYZ hub).
  - **Alternative**: rely on P1 alone and accept the residual `colorUnit2` cost. Reasonable choice if the user wants to keep all caching in `src/`.
- **Decision pivot**: do P1 first; only add this if a profile shows the post-parse work is still hot.

### P2 — invalidation hooks on `parseCSSColor` cache for the custom-color-name registry

- **Where**: `src/parsing/color.ts:520-528` — `registerColorNames`, `clearCustomColorNames`.
- **Shape**: After mutation, call `parseCSSColor.cache.clear()`. (Once `parseCSSColor` is `memoize`'d, `.cache` is the exposed Map.)
- **Why**: prevents a stale cache hit returning the pre-registration fallback. The custom-name registry is mutated by `useCustomColorNames` at app start.

---

## §3 Anti-recommendations (do NOT memoize)

These places look tempting but are NOT-WORTH or actively harmful to add caches to. The user has explicitly said "we mustn't change things just to change them" — these stay raw.

1. **`color2(color, to)`** (`src/units/color/utils.ts:975`) — inputs are mutable `Color` instances with no stable identity. A `WeakMap<Color, Map<space, Color>>` would invalidate on every component mutation (slider drag). The two-matrix-multiply cost is small relative to the cache plumbing.

2. **`normalizeColorUnit(color, inverse)`** (`src/units/color/normalize.ts:65`) — same issue. Each call receives a freshly-cloned `ValueUnit`; cache key would require deep-comparing the wrapped Color. The savings live at the **input string** layer (P1), not here.

3. **`gamutMap` / `gamutMapSRGB`** (`src/units/color/utils.ts:1004`, `gamut.ts`) — Ottosson is **already analytical** (zero-iteration, polynomial + 1 Halley step). Per-call cost is microseconds. Memoizing would add lookup overhead.

4. **`mixColors`** (`src/units/color/utils.ts:1092`) — `p1, p2, t` are continuous (sweep across gradient steps). The only stable subterm is the per-endpoint `color2(col1, space)` / `color2(col2, space)` conversion, and that's already covered by the cssToRawColor / parseCSSColor cache one layer up.

5. **`interpolateHue(h1, h2, t, method)`** — `t` is continuous. The 4-branch switch on `diff` is constant-time. No memo target.

6. **`toFormattedString(digits)`** on `Color` (`src/units/color/index.ts:48`) — components are mutated in place on every slider drag. WeakMap cache would invalidate every frame. The right fix (if any) is at the demo render layer via Vue's reactivity, not the library.

7. **`solveCubicBezierX(x, x1, x2)`** (`src/easing.ts:128`) — inner loop of `CSSCubicBezier`. Called per animation tick with continuous `x`. Memoizing on `(x, x1, x2)` is exactly cache-thrash territory — each `x` is unique per tick.

8. **XYZ-hub leaf conversions** (`rgb2xyz`, `xyz2oklab`, etc.) — atomic 6-multiply + transfer-function operations. Memo overhead > recompute.

9. **`flattenObject` / `unflattenObject`** — inputs change every frame in the animation tick loop.

10. **`harmony` / `generatePalette`** — purely user-action triggered, not in a loop.

11. **`decomposeMatrix3D`, `slerp`, `recomposeMatrix3D`** — already covered upstream by `getComputedValue`'s memo (`src/units/normalize.ts:128`).

---

## §4 Prioritized

| Priority | Item | Effort | Risk | Notes |
|----------|------|--------|------|-------|
| **P1** | Memoize `parseCSSColor` (§2.1) with custom-name-registry invalidation (§2.3) | XS — 1-line `memoize()` wrap + 1-line `.cache.clear()` in 2 sites | LOW | mirrors `parseCSSValue`; CLAUDE.md already promised this; 25 demo call-sites benefit. **Single highest-value memo.** |
| P2 | Memoize `cssToRawColor` in demo (`color-utils.ts`) | S — 5-line Map + size-cap | LOW | only do this if a profile after P1 still shows `colorUnit2` hot in the gradient build path. Otherwise SKIP. |
| P3 | Lift `easeInBounce`/`bounceInEase`/`bounceOutEase`/`bounceInOutEase` control-point arrays + bezier closures to module scope (`src/easing.ts:164-216`) | S — ~10 lines | LOW | closure-hoisting, not memo. Overlaps with simplify pass / dedup (these 4 functions have identical bodies). KISS-friendly. |
| P3 | Memoize `getTimingFunction` for string inputs only (LRU 32) (`keyframes.js/src/animation/utils.ts:106`) | S | LOW | setup-time saving (re-parse of `"ease-out-back"` per frame in `fromString`'s frame-loop). Marginal; do only if joined with C16 cleanup. |
| **Skip** | Everything in §3 | — | — | KISS — too cheap, or unstable inputs. |

### Recommended landing

- **D.W3 Lane C** is already the file for the `cssColorToRgb` (demo-side) micro-fix. **Fold P1 + P2 (invalidation hook) into the same lane** — both are 1-2 line library-side fixes. Total diff <10 lines.
- P3 items (easing closure-hoisting, `getTimingFunction` LRU) are KISS-overlapping micro-cleanups. Route to a future "simplify" / dedup pass, NOT to Dj's deliverable.

### Anti-pattern guard for implementation

When P1 lands, **do NOT also wrap `colorUnit2`, `normalizeColorUnit`, `color2`, `mixColors`, `gamutMap`, or `toFormattedString`** — those are all in §3 anti-list. The user-stated KISS / "don't change things just to change them" overrides the temptation to "while we're at it".
