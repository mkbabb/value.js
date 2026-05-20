# Dl — Interpolation API audit (value.js + keyframes.js)

Read-only research. Lane Dμ. No code edits; the only artefact is this doc.

The question: is there one canonical way to interpolate a value, a colour, a
CSS-shaped value, an animation keyframe — or are there parallel paths?

Scope reviewed:
- `src/units/interpolate.ts` (B.W3-committed)
- `src/units/normalize.ts` (interpolation setup)
- `src/units/color/utils.ts` (`mixColors`, `interpolateHue`)
- `src/units/color/mix.ts` (`mixColorsN`)
- `src/units/color/normalize.ts` (`normalizeColorUnits`, `colorUnit2`)
- `src/math.ts` (`lerp`, `logerp`, `deCasteljau`)
- `src/easing.ts` (eased lerping inside `cssLinear`)
- `src/transform/decompose.ts` (`slerp`, `interpolateDecomposed`)
- keyframes.js: `src/animation/{index,utils,group,numeric,smooth,constants}.ts`

---

## §1 Inventory of every interpolation entry point

| # | Location | Signature | What it does |
|---|----------|-----------|--------------|
| 1 | `src/math.ts:27` | `lerp(t, start, end)` | scalar linear |
| 2 | `src/math.ts:33` | `logerp(t, start, end)` | scalar logarithmic (no consumer in repo) |
| 3 | `src/math.ts:41` | `deCasteljau(t, points[])` | iterated lerp for bezier |
| 4 | `src/math.ts:54` | `cubicBezier(t, x1, y1, x2, y2)` | bezier path point |
| 5 | `src/math.ts:60` | `interpBezier(t, points[][])` | generalised bezier |
| 6 | `src/easing.ts:90` | `cssLinear(stops)` → inner `lerp(segmentT, p0.output, p1.output)` | piecewise-linear easing |
| 7 | `src/easing.ts:CSSCubicBezier` | `(x) => y` | not interpolation per se but consumed alongside |
| 8 | `src/units/color/utils.ts:1049` | `interpolateHue(h1, h2, t, method?)` | cylindrical-space hue blend; `method ∈ shorter\|longer\|increasing\|decreasing` |
| 9 | `src/units/color/utils.ts:1092` | `mixColors(c1, c2, p1, p2, space?, hueMethod?)` | CSS `color-mix()` semantics (premul alpha, NaN propagation) |
| 10 | `src/units/color/mix.ts:28` | `mixColorsN(colors[], weights?, space?, hueMethod?)` | N-color left-fold over `mixColors` |
| 11 | `src/units/interpolate.ts:15` | `lerpComputedValue(t, iv)` | `var`/`calc`/`vh` resolved per-frame via computed style |
| 12 | `src/units/interpolate.ts:46` | `lerpColorValue(t, iv)` | per-channel lerp on a normalized `ValueUnit<Color>` |
| 13 | `src/units/interpolate.ts:68` | `lerpNumericValue(t, iv)` | scalar lerp on `ValueUnit<number>` |
| 14 | `src/units/interpolate.ts:84` | `lerpValue(t, iv)` | dispatch (uses prepared `_lerp` fast-path) |
| 15 | `src/units/interpolate.ts:117` | `prepareInterpVar(iv)` | pre-binds dispatch onto the InterpolatedVar |
| 16 | `src/units/normalize.ts:341` | `normalizeValueUnits(left, right, opts)` | builds the `InterpolatedVar` (colour-space collapse, unit collapse, computed flag) |
| 17 | `src/units/normalize.ts:209` | `normalizeNumericUnits(a, b, inplace?)` | length→px, angle→deg, time→ms, resolution→dpi |
| 18 | `src/units/color/normalize.ts:114` | `normalizeColorUnits(a, b, to?, …, hueMethod?)` | converts both colour units to a shared space |
| 19 | `src/transform/decompose.ts:386` | `slerp(qa, qb, t)` | quaternion shorter-arc |
| 20 | `src/transform/decompose.ts:510` | `interpolateDecomposed(a, b, t)` | inlines its own `lerp` then `slerp` for rotation |
| 21 | keyframes.js `animation/utils.ts:219` | `createInterpVarValue(varName, startIx, endIx, vars, colorSpace?, hueMethod?)` | wraps `normalizeValueUnits` + `prepareInterpVar` over a ValueArray pair |
| 22 | keyframes.js `animation/index.ts:618` | `lerpValue(eased, iv)` inside `interpFrames(t)` | hot-path call, scalar t already eased |
| 23 | keyframes.js `animation/numeric.ts:159` | `lerp(eased, startVals[i], stopVals[i])` | parallel scalar pipeline for `Record<string, number>` keyframes |
| 24 | keyframes.js `animation/group.ts:251` | `lerp(weight, existing.value, incoming.value)` | layer blend (`weighted` mode) |
| 25 | keyframes.js `animation/smooth.ts:117` | `current += (target − current) * damping` | inline single-pole filter (damping, not lerp) |

Twenty-five distinct interpolation-shaped surfaces. Removing the helpers that
are *building blocks* not user-callable lerps (`deCasteljau`, `cubicBezier`,
`interpBezier`, `cssLinear`, `CSSCubicBezier`, `prepareInterpVar`, the three
`normalize*` setup functions, and the smooth-progress damping which is not a
two-endpoint lerp) leaves **15 user-facing interpolation entry points** spread
across both repos.

---

## §2 Duplication findings

### D-1 — Argument order on `lerp` vs `mixColors`/`mixColorsN`/`lerpValue` (API-DRIFT)

- `lerp(t, start, end)` — `t` first
- `lerpValue(t, iv)` / `lerpNumericValue(t, iv)` / `lerpColorValue(t, iv)` /
  `lerpComputedValue(t, iv)` — `t` first
- `interpolateHue(h1, h2, t, method?)` — `t` third
- `mixColors(c1, c2, p1, p2, space?, hueMethod?)` — t-equivalents third/fourth
  (two percentages, not one)
- `mixColorsN(colors[], weights?, …)` — weight array
- `slerp(qa, qb, t)` — `t` third
- `interpolateDecomposed(a, b, t)` — `t` third

Three different `t`-positions and two distinct ways to express the blend factor
(scalar `t` vs paired `(p1, p2)`). Severity: **API-DRIFT**, not duplication.

### D-2 — `lerp` is inlined in two animation hot paths (DUPLICATION, minor)

- `transform/decompose.ts:515` — `interpolateDecomposed` redefines `lerp`
  locally because it needs a curried form (`(v0, v1) => v0 + (v1 − v0) * t`).
- keyframes.js `animation/index.ts:586` — `interpFrames` calls
  `lerpValue(eased, iv)` (correct path).
- keyframes.js `animation/numeric.ts:159` — `lerp(eased, …)` directly
  bypassing `lerpValue` because the keyframes are plain numbers, not
  `ValueUnit`.

`numeric.ts` is a *deliberate* second pipeline (zero-allocation, no DOM, no
parsing). The `interpolateDecomposed` redefine is purely a closure-capture
ergonomic; substituting `(v0, v1) => lerp(t, v0, v1)` would be a one-liner. Not
worth touching on its own; flag if `lerp` ever gains side effects.

### D-3 — `mixColors` and `lerpColorValue` are two paths to "blend two colours" (DUPLICATION + OPAQUE)

- `mixColors(c1, c2, p1, p2, space?, hueMethod?)` — operates on raw `Color`
  objects, full CSS `color-mix()` semantics (premultiplied alpha, NaN
  propagation, hue method, two-percentage weighting).
- `lerpColorValue(t, { start, stop, value })` — operates on `ValueUnit<Color>`
  *after* `normalizeColorUnits` has put both endpoints in the same space.
  Per-channel lerp. **Does not premultiply alpha. Does not handle NaN.**

The two implementations are *not equivalent*. `mixColors` is more correct
(spec-compliant), `lerpColorValue` is faster and lossier. Consumers cannot
discover this difference without reading both implementations. The choice is
made implicitly by which constructor path you went through:
- `normalizeValueUnits` + `lerpValue` → `lerpColorValue` (lossy)
- `parseCSSColor` → `color-mix()` literal → `mixColors` (correct)
- direct user call to `mixColors` → correct
- direct user call to `mixColorsN` → correct

This is **OPAQUE**. The same logical operation has two implementations with
different semantics, and the docstring on `lerpColorValue` (`"The surrounding
normalizeColorUnits step is responsible for putting start / stop in the same
colour space (oklab, oklch, etc.) and for hue handling"`) is misleading —
`normalizeColorUnits` does *not* in fact perform hue-method handling; it just
threads `hueMethod` through and discards it (see `normalizeColorUnits` return
tuple — `hueMethod` is in the tuple but never consumed downstream by
`lerpColorValue`).

### D-4 — Hue interpolation is handled in `mixColors` but not in `lerpColorValue` (MISSING)

`lerpColorValue` walks every key of `start.value` and lerps independently. For
a cylindrical space (`hsl`, `hwb`, `lch`, `oklch`), the `h` channel needs
shortest-arc / longer / increasing / decreasing handling — `interpolateHue`
exists for exactly this and is used inside `mixColors`. **It is not invoked
from `lerpColorValue`**. Animation between two oklch colours will produce
wrong hues at hue boundaries (e.g. `oklch(0.7 0.2 350deg)` → `oklch(0.7 0.2
10deg)` lerps the long way round through 180°).

This is **MISSING** behaviour, not duplication. Severity P1 because
keyframes.js's `colorSpace: "oklch"` option is currently silently broken for
cross-boundary hues.

### D-5 — N-color blend exists only in colour land (DUPLICATION risk, OPAQUE)

`mixColorsN` is the only "blend N endpoints with weights" surface. For scalar
values, the equivalent pattern is to wire up an `Animation` keyframe sequence
or to write your own pairwise fold. The asymmetry is intentional (per the
mix.ts docstring) but creates discovery friction: if a consumer wants
*"blend three numbers at weights [0.2, 0.5, 0.3]"*, they have to roll their
own. `NumericAnimation` from keyframes.js solves the *time-driven* version;
there is no static N-way scalar lerp.

Not load-bearing — flagging only.

---

## §3 Missing cases

| Case | Status |
|------|--------|
| `lerp(10px, 20px, t)` (same length unit) | covered: `normalizeValueUnits` → `lerpNumericValue` |
| `lerp(10px, 2em, t)` (mixed length units, no DOM) | partially covered: `normalizeNumericUnits` no-ops when superType matches but units differ in *relative* class — `convertToPixels` needs an element for `em`/`rem`/`vh`; falls back to `1em=16px` only if the conversion code supports that — see `units/utils.ts:convertToPixels`. **Without a target, `em` lerps may resolve to a default-16px assumption.** |
| `lerp(30deg, 0.5turn, t)` | covered |
| `lerp(10px, 50%, t)` (length ↔ percentage; spec: interpolate as `calc(50% + 10px*(1-t))`) | **not covered** — `normalizeNumericUnits` bails out (`superType[0]` differs), endpoints kept as-is, `lerpValue` falls into the typeof-number fast path and produces nonsense |
| `lerp(currentColor, red, t)` | **not covered** — `currentColor` has no resolved value at parse time; no path to deferred resolution |
| `lerp(rotate(30deg), rotate(90deg), t)` (same-function FunctionValue) | **not covered** at the value.js level — `FunctionValue` has no `clone+interp` path; keyframes.js handles transform by flattening to leaf `ValueUnit`s via `flattenToValueUnits` (see `animation/utils.ts:40`), which loses the function wrapper. |
| `lerp(rotate(30deg), translate(10px), t)` (incompatible transforms) | **not covered** — the CSS Transforms 2 spec demands matrix decomposition fallback (`decomposeMatrix3D` → `interpolateDecomposed` → `recomposeMatrix3D`). Those primitives exist in `src/transform/decompose.ts` but **nothing in `units/interpolate.ts` or keyframes.js wires them up**. |
| `lerp(transform: rotate(30deg) translate(10px), transform: scale(2) translate(40px), t)` (transform list) | same as above — primitives exist, dispatch missing |
| Color hue at boundary (`hue 350→10`) | **broken** in `lerpColorValue` (see D-4) |
| Color with NaN component (CSS `none`) | broken in `lerpColorValue` (no NaN handling); correct in `mixColors` |
| Premultiplied alpha across two colours | broken in `lerpColorValue`; correct in `mixColors` |

Three of these (`length ↔ %`, transform-list, hue boundary) are spec-required
behaviour that the test suite probably doesn't cover; the remaining items are
ergonomic gaps.

---

## §4 keyframes.js's consumption pattern

The pattern is healthy and one-directional. keyframes.js consumes value.js's
interpolation surface as the **single source of truth** for value-level
interpolation, and adds *time-domain* machinery on top.

Wiring:

```
addFrame(percent, vars)              parse → ParsedVarMap (ValueArray per leaf)
   ↓ parse()
templateFrames → frames               createFrame builds pair-frames between
                                       adjacent templates
   ↓ reconcileVars
createInterpVarValue                 calls normalizeValueUnits + prepareInterpVar
   = InterpolatedVar[]
   ↓
frame.allInterpVars                   pre-flattened for zero-alloc hot path
   ↓ interpFrames(t)
seg.timingFunction(scaled)           ease
   ↓
lerpValue(eased, iv)                 value.js dispatch (uses _lerp fast path)
   ↓
transformTargetsStyle                writes element.style
```

Two notable points:

1. **Single hot-path call.** `interpFrames` does exactly one `lerpValue(eased,
   iv)` per InterpolatedVar per frame. Easing is applied *before* the lerp.
   This is the canonical pattern.

2. **Parallel scalar pipeline exists for canvas/WebGL.** `NumericAnimation`
   (numeric.ts) bypasses `ValueUnit` entirely and calls `lerp(eased, …)` on
   raw numbers. This is deliberate — the docstring calls it a "zero-allocation
   numeric keyframe interpolator". It is *not* a duplication to be removed;
   it's a second tier of the interpolation surface aimed at hot graphics
   loops. But it does mean keyframes.js has two interpolators (`Animation` and
   `NumericAnimation`) with different keyframe shapes and different DX.

3. **Re-exports are clean.** `keyframes.js/animation/utils.ts:28-37` re-exports
   `lerpValue`, `lerpColorValue`, `lerpComputedValue`, `lerpNumericValue`
   from `@mkbabb/value.js` "for API compatibility — new code should import
   from `@mkbabb/value.js` directly". Migration story is documented.

4. **`mixColors` / `mixColorsN` are not consumed by keyframes.js.** They are
   only invoked from value.js's own parser (`parseCSSColor`'s `color-mix()`
   handler). The keyframe pipeline goes through `lerpColorValue` exclusively —
   which means animated colours skip the spec-compliant path (see D-3 / D-4).

5. **Transform interpolation is unwired.** `slerp` and `interpolateDecomposed`
   are exported from value.js's barrel, but `keyframes.js/src/animation`
   contains zero references to them. `grep slerp` against the keyframes.js src
   tree returns nothing. Transform keyframes today are parsed by
   `parseAndFlattenObject` and treated as a flat list of leaf `ValueUnit`s;
   if `transform: rotate(30deg)` is paired with `transform: scale(2)`, the
   underlying `flattenToValueUnits` walks both `FunctionValue`s and yields
   bare `ValueUnit`s with no association back to their parent function. The
   per-leaf lerp will produce semantically wrong results.

---

## §5 Proposed canonical interpolation surface — sketch only

> Conservative caveat: this is a **sketch**, not a recommendation to implement.
> Most of the surface is already canonical; the gaps in §3 are the only places
> that arguably need new code. The directive said "discover, don't impose" —
> what follows is what the existing surface looks like if you squint, plus the
> three holes.

### Canonical signatures (already mostly correct)

```ts
// scalar
lerp(t: number, a: number, b: number): number                  // math.ts ✓ canonical

// CSS value (ValueUnit), pre-prepared
lerpValue(t: number, iv: InterpolatedVar<unknown>): ValueUnit  // units/interpolate.ts ✓

// preparation step
normalizeValueUnits(a, b, opts?): InterpolatedVar<unknown>     // units/normalize.ts ✓
prepareInterpVar(iv): InterpolatedVar<unknown>                 // units/interpolate.ts ✓

// raw Color objects, two endpoints
mixColors(a, b, p1, p2, space?, hueMethod?): Color             // units/color/utils.ts ✓
mixColorsN(colors[], weights?, space?, hueMethod?): Color      // units/color/mix.ts ✓

// quaternion / decomposed-transform
slerp(qa, qb, t): Vec4                                         // transform/decompose.ts ✓
interpolateDecomposed(a, b, t): DecomposedMatrix3D             // transform/decompose.ts ✓
```

Two distinct signature families are unavoidable because the two domains have
fundamentally different blend semantics:
- **scalar `t`** for animation lerps (`lerp`, `lerpValue`, `slerp`,
  `interpolateDecomposed`, `interpolateHue`) — `t ∈ [0,1]` driven by a clock.
- **paired `(p1, p2)`** for CSS `color-mix()` — percentages that can sum to
  less than 1 (in which case alpha is multiplied).

Force-merging these would distort one or the other. Leave them as two
families.

### Gaps to close (the only changes worth making)

1. **`lerpColorValue` must call `interpolateHue` for cylindrical spaces.**
   `normalizeColorUnits` already returns `hueMethod` as the third tuple
   element — the type tells you it's there, the runtime ignores it.
   `prepareInterpVar`'s dispatch for `unit === "color"` should be aware of
   the colour space and, when cylindrical, route through a per-channel helper
   that calls `interpolateHue(h1, h2, t, method)` on `h` and `lerp(t, …)` on
   the rest. This closes D-4.

2. **`lerpColorValue` should optionally route through `mixColors`** when the
   user opts in to spec-compliant semantics (premultiplied alpha, NaN
   propagation). The simplest path is an option on `NormalizeValueUnitsOptions`
   — `premultipliedAlpha: boolean` — and have `prepareInterpVar` choose
   `lerpColorValue` (current, fast) vs a new `mixColorValue` wrapper. Closes
   D-3.

3. **Wire transform-list interpolation through `decomposeMatrix3D` /
   `interpolateDecomposed` / `recomposeMatrix3D`** when a keyframe pair has
   `FunctionValue` transforms with incompatible shape. The primitives exist;
   what's missing is dispatch logic in `normalizeValueUnits` (or a new
   `normalizeTransformValueUnits`) that detects "same `FunctionValue` name +
   same arg count → pairwise lerp; otherwise → decompose-recompose fallback".
   Closes the §3 transform-list gap.

These three changes are *closing gaps in the existing canonical surface*, not
introducing a new one. The signatures stay the same; only the dispatch and the
hue/alpha handling change.

### What NOT to do

- Don't unify the `(t, …)` vs `(…, t)` argument orders. Six files would
  change. The existing order is consistent within each subdomain (scalar
  family = `t` first; color-mix family = blend factors at the end). The cost
  is a doc cross-reference, not a refactor.
- Don't merge `NumericAnimation` (zero-alloc) with `Animation` (full CSS).
  The two have different keyframe shapes and different DX targets.
- Don't merge `lerp` with `lerpValue`. `lerp` is a math primitive consumed by
  many call sites including non-animation code (`scale`, `cssLinear`,
  `easing`). `lerpValue` is animation-domain.

---

## §6 Prioritized findings

### P1 — Hue boundary bug in `lerpColorValue` (D-4)

Animation between two cylindrical-space colours across the hue boundary
produces the wrong result. `interpolateHue` exists and is used by `mixColors`;
it must also be used by `lerpColorValue` when the colour is in a cylindrical
space (`hsl`/`hsv`/`hwb`/`lch`/`oklch`). `normalizeColorUnits` already returns
`hueMethod` — the wiring is one function call away.

**Impact:** silent visual bug in keyframes.js for any `colorSpace: "oklch"`
animation, with no observability. **Effort:** small (one branch in the
dispatch). **Risk:** low — the only ABI change is `lerpColorValue` becoming
hue-aware, which is strictly more correct than current behaviour.

### P2 — Transform-list interpolation is unwired (§3)

`slerp` and `interpolateDecomposed` are exported but never reach the
keyframes.js animation kernel. `transform: rotate(30deg)` → `transform:
scale(2)` keyframes today produce per-leaf lerps with no decomposition
fallback. The CSS Transform 2 spec demands matrix decomposition for
incompatible transform lists; the primitives exist; only dispatch is missing.

**Impact:** transform animations between incompatible lists produce visually
wrong intermediate frames. **Effort:** medium — needs a new dispatch path in
`normalizeValueUnits` (or a sibling) that recognises `FunctionValue` transforms
and routes through decompose-interpolate-recompose. **Risk:** medium — touches
the hot path; needs tests.

### P3 — `lerpColorValue` is not spec-compliant for alpha/NaN (D-3)

`mixColors` premultiplies alpha and propagates NaN per CSS Color 4;
`lerpColorValue` does neither. For most animations this is invisible (alpha
is constant, NaN doesn't occur), but the divergence is a long-tail bug source.

**Impact:** edge-case visual divergence between CSS `color-mix()` and animated
colours that use the same endpoints. **Effort:** small. **Risk:** small —
gated behind an option flag, default off.

### P4 (informational, no action) — Argument-order drift across `lerp` family

Three different positions for `t`. Already documented above; not worth a
refactor unless we're already touching all the call sites for P1/P2/P3.

### P5 (informational) — `logerp` has no consumer

`src/math.ts:33` is exported and unused anywhere in either repo. Either expose
it more prominently (it's useful for exponential-feel animations) or remove.
No urgency.

---

## Summary

Fifteen user-facing interpolation entry points across two repos. The surface
is genuinely well-factored: keyframes.js consumes value.js cleanly, and the
two "families" of signature (`t`-first scalar lerp vs `(p1, p2)` colour-mix)
correspond to two distinct domains and shouldn't be merged.

The real defects are *behavioural*, not structural:
1. P1 — `lerpColorValue` ignores `hueMethod`, producing wrong hues across the
   boundary in cylindrical spaces. This is the load-bearing finding.
2. P2 — Transform-list interpolation is unwired; matrix decomposition exists
   but never dispatched.
3. P3 — `lerpColorValue` is not spec-compliant for premultiplied alpha / NaN
   compared to `mixColors`.

No new canonical surface is needed. The fix is to close the three gaps within
the existing surface.
