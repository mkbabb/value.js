# S-24 · Library core — VALUE half audit

**Scope:** `src/units/{index,constants,utils,normalize,interpolate}.ts`, `src/math.ts`,
`src/easing.ts`, `src/transform/decompose.ts`, `src/units/color-soa.ts`.
**Repo:** value.js @ c5aa091 (branch tranche-q, pkg 2.0.1). Probes ran against `dist/value.js`.
**Mode:** AUDIT ONLY. Evidence-first; every conversion + interpolation path spot-verified live.

## Verdict summary

The numeric core is **correct**. Every unit conversion, the parse→normalize→lerp pipeline,
cylindrical hue interpolation, matrix decompose/recompose round-trips, easing evaluation, and
the cssLinear piecewise machinery all returned correct values under live probe (see §Evidence).
Targeted unit suites green: `tranche-f` (17) + `tranche-q-1.2.0` (22) + `recursion-guard` (5) = 44/44.

The defects are **API-coherence + speculative-generality + doc-accuracy**, not math bugs. Two P1s
route to `value.js src`: a dead public export shipped into the 2.0.0 surface, and an arg-order
footgun on the public math surface.

---

## P1 findings

### P1-1 · `color-soa.ts` is an orphan public API — speculative generality shipped in 2.0.0
**Route: value.js src.** `src/units/color-soa.ts` (124 LoC) exports `buildColorChannelPlan`,
`packColorChannels`, `lerpColorChannels`, `ColorChannelPlan` (barrel `src/index.ts:184-188`). Its
own header (color-soa.ts:1-24) declares it exists for "the keyframes.js P.W2 SoA compositor" and
that "the kf-side Amdahl-slice authorization … is the CONSUMER's grounding gate per VJ-Q8."

**That consumer never adopted it.** `grep -rIl lerpColorChannels\|packColorChannels\|ColorChannelPlan`
across `../keyframes.js/{src,dist}` hits **zero** shipping files — only `bench/interp-buffer.bench.ts`
and tranche-audit `docs/`. Contrast `lerpArray` (math.ts:60), whose identical "built-for-keyframes"
claim IS honored: keyframes `src/animation/physics/numeric.ts:4` + `internal/leaves.ts:28` import and
fold through it per-frame. So `lerpArray` = KEEP; `color-soa` = a measured-but-ungrounded carrier
that shipped into the public surface + carries a passing test (`test/tranche-q-1.2.0.test.ts:22-25`)
that only proves it equals `lerp`, not that anyone calls it.
**Candidate item:** excise `color-soa.ts` + its barrel re-exports + its test, OR gate re-introduction
on a real keyframes consume-edge (the VJ-Q8 "grounding gate" its own doc names but never met). The
internal color interp already has its own frozen SoA plan (`interpolate.ts` `_colorPlan`,
`buildColorInterpPlan`) — color-soa duplicates that layout for a phantom external consumer.

### P1-2 · `logerp` arg-order is a public-surface footgun (t-first while `lerp` is t-last)
**Route: value.js src.** `math.ts:28` `lerp(start, end, t)` — comment *explicitly* declares
"Canonical (a, b, t) — value-pair first, parameter last." But its semantic sibling `math.ts:75`
`logerp(t, start, end)` puts t **first**, and both are public (`src/index.ts:230,233`). A consumer
who reads the lerp signature and calls `logerp(10, 20, 0.5)` gets `1.9e-15` (silently ≈0-wrong)
instead of `logerp(0.5, 10, 20) = 14.14` (probe-verified). `deCasteljau`/`cubicBezier`/`interpBezier`
are also t-first, so the surface is genuinely split: `lerp`/`lerpArray` t-last, everything else
t-first — no honored convention despite the comment claiming one.
**Candidate item:** unify on one order. `logerp → logerp(start, end, t)` to match its `lerp` sibling
(cleanest for the interpolation pair) is a breaking change but this is the S/2.x window to make it;
at minimum, correct the "Canonical" comment that the file itself violates.

---

## P2 findings

### P2-1 · `vh`/`cqw`/viewport-unit "computed/deferred" docstring is materially false
**Route: value.js src (doc-fix or wire-through).** `normalize.ts:489-491` and `interpolate.ts:10-13`
both state viewport units (`vh`, `vw`, `cqw`, "etc.") are "left as-is and marked `computed: true`"
with "resolution … later in `lerpComputedValue`." **They are not.** `COMPUTED_UNITS = ["var","calc"]`
only (constants.ts:54), so `isComputedUnit("vh")` is false. Probe: `normalizeValueUnits("10vh","20vh")`
→ `iv.computed = false`. Real behavior: same-unit vh→vh lerps *symbolically* (`"15vh"`, resize-safe —
good) because the `left.unit !== right.unit` branch is also skipped; but **mixed** `10vh → 100px`
resolves vh eagerly to px at normalize (via `window`, `normalizeNumericUnits`→`convertToPixels`) and
is NOT marked computed, so it does NOT track resize — despite the whole `bumpLayoutEpoch`/layout-epoch
apparatus (normalize.ts:139-201) existing for exactly that. `lerpComputedValue`→`getComputedValue`
only branches on `unit==="var"`/`"calc"` (normalize.ts:259,266); a raw `vh` never reaches a deferred
resolver. **Candidate:** either correct both docstrings to say only `var`/`calc` are deferred, or
route viewport/container units through the computed path so mid-animation resize tracks them.

### P2-2 · `src/units/utils.ts` (722 LoC) + `constants.ts` (799 LoC) breach the >500 hard cap
**Route: value.js src.** Per the god-module precept (>500 hard). `utils.ts` is genuinely
mixed-concern — unit conversion (`convertToPixels`, `convertTo{Ms,Degrees,Hz,DPI}`, `convert2`) +
the flatten/unflatten machinery + `unpackMatrixValues` + `isCSSStyleName` + viewport/font-metric
resolvers — a clean 3-way split (conversion / flatten / matrix). `constants.ts` is data-dominated
(632 of 799 lines are the `STYLE_NAMES` tuple) — arguably exempt as a generated data table, but it is
literally over; **candidate:** extract `STYLE_NAMES` to a `constants/style-names.ts` data module and
document the exemption, so the cap means something.

### P2-3 · `flattenObject` re-flattens the whole ValueArray on every leaf push — O(N²)
**Route: value.js src.** `utils.ts:120` and `:162`: `flat[key] = flat[key].flat()` runs *inside* the
per-leaf recursion, so a property accumulating N leaves pays `flat()` N times = O(N²) copying.
Compile-time only (not per-frame — keyframes consumes `flattenObject` at `parse-flatten.ts:148`,
`unflattenObjectToString` per-frame at `waapi/emission.ts:58` which already has the `out` reuse arg),
but a large keyframe set scales quadratically. **Candidate:** flatten once after the push loop, or
push into a plain array and wrap in `ValueArray` at the end.

### P2-4 · No canonical `resolveEasing(string → TimingFunction)` in value.js (DRY, touches S-13)
**Route: value.js src (add) + consumers migrate.** value.js owns all the parts — `timingFunctions`
(named lookup), `bezierPresets`, `cssLinear`, `steppedEase`, `solveCubicBezierX`, `parseLinearStops`/
`parseSteps`/`parseSpring` (parsing/easing) — but NOT the one-call resolver that maps an arbitrary
easing *string* (`"cubic-bezier(…)"`, `"steps(4)"`, `"linear(0,1)"`, a named key) to an evaluable
`TimingFunction`. keyframes has `resolveEasing`/`toEasing`; glass-ui `useEasingPicker.ts` +
`motion/curves.ts` re-derive against value's set. For S-13 (easing pane "functional + animated like
keyframes.js"), the animated preview needs exactly this resolver + `bezierPresets` control points +
`cubicBezierToSVG` (already exported, math.ts:110). **Candidate:** hoist a canonical `resolveEasing`
into value.js as the single source of truth the pane + keyframes + glass-ui all consume.

### P2-5 · `unpackMatrixValues` emits nonsense `rotateX`/`rotateY` for 2D matrices
**Route: value.js src.** `utils.ts:304-306`: the 2D `matrix(a,b,c,d,e,f)` branch computes
`rotateY = atan2(-c, a)` and `rotateX = atan2(b, d)` — meaningless for a planar transform (2D has only
`rotateZ`). Latent-wrong for a consumer reading `rotateX`/`rotateY` off a decomposed 2D matrix (the
`getComputedValue` calc-on-transform-subproperty path, normalize.ts:292-304, indexes exactly these
keys). **Candidate:** return `0` for the two out-of-plane rotations in the 2D branch, or omit them.

### P2-6 · `ValueUnit.toFixed` trailing-zero trimming is inconsistent
**Route: value.js src.** `index.ts:125` `.replace(/\.0+$/, "")` strips a fraction only when it is
*all* zeros: probe → `VU(15.001).toFixed(2)="15px"`, `VU(15.0)="15px"`, but `VU(15.5)="15.50px"`
(trailing zero kept). Cosmetic, but a formatting helper that drops `.00` yet keeps `.50` is
surprising. **Candidate:** trim trailing zeros generally (`.replace(/\.?0+$/, "")` after a decimal) or
not at all.

---

## P3 / notes (no action urged)

- **Low-chroma hue drift.** oklch interp of two near-achromatic colors serializes a garbage hue
  (probe: `#808080↔#404040 @0.5` → `oklch(48.6% 4.1e-11 342deg)`); chroma≈0 so it renders correct
  gray. Documented `atan2` class in MEMORY; benign. No fix.
- **`scale()` dead compute.** `math.ts:15` computes `slope` (→ `Infinity`) *before* the
  `fromMax===fromMin` throw at :18. Harmless; reorder for clarity only.
- **Core generics default to `any`.** `ValueUnit<T=any>`, `FunctionValue<T=any>`, `ValueArray<T=any>`
  (index.ts:16,183,308) — a known ergonomics/soundness tradeoff, not a regression.
- **Into-idiom coverage (VALUE half) is good.** `unflattenObjectToString(out?)` (utils.ts:217) and
  `lerpArray(…,out)` (math.ts:60) both offer caller-owned buffer reuse; the color half's Into fleet
  (`color2Into`, `mixColorsInto`, `sampleGamutBoundaryInto`, `transformMat3Into`, `gamutMapOKLabInto`)
  is dense — the buffer-reuse discipline is real, not a gap. Only `color-soa` (P1-1) is unearned.

## Evidence (live probes vs dist)

- Conversions all exact: `turn→deg 0.5=180`, `rad(π)=180`, `grad 100=90`, `in→px 1=96`, `pt 72=96`,
  `cm 2.54=96`, `s→ms 2=2000`, `dppx→dpi=96`, `dpcm→dpi=2.54`, `kHz→Hz 2=2000`; `convert2` round-trips
  (`turn→deg 1=360`, `in→cm 1=2.54`) + throws `Incompatible units: s and px`.
- Interp: `red→blue oklch @{0,.5,1}` correct short-arc hue (29.2→326.6→264); `10px→20px @.5=15px`;
  `0deg→1turn @.5=180deg`; `interpolateHue 350→10` shorter `@.5=0`, longer `@.5=180`.
- Easing: `ease-in-out(.5)=.5`, `smooth-step-3(.5)=.5`, `steps(4,jump-{end,none})(1)=1`,
  `cssLinear` overshoot stop `@.5=1.5`. Decompose/recompose translate round-trips `[10,20,30]`.
- Footgun: `logerp(10,20,.5)=1.9e-15` vs `logerp(.5,10,20)=14.14`.
- `iv.computed`: `10vh→20vh` = **false**; `var→var` = **true**.
