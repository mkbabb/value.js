# Dl — Challenge (read-only adversarial review of Dl-interpolation.md)

Adversarial pass against `Dl-interpolation.md`. Working tree at the same commit
as the original research; no edits beyond this doc.

The original research's headline claims:

- 25 entry points inventoried, **0 true duplicates**.
- Canonical surface "already exists" (scalar `lerp` + `lerpValue`/`InterpolatedVar`
  + `mixColors`/`mixColorsN` + `slerp`/`interpolateDecomposed`).
- 5 missing cases — length↔%, `currentColor`, same-name `FunctionValue`,
  incompatible transform list, hue boundary.
- P1 = `lerpColorValue` ignores `hueMethod`; fix is "one-branch".

Verdict in advance: **2 of the 5 are real and load-bearing, 1 partially real,
2 are speculative/misclassified.** P1 is real but the "one-branch" claim is
wrong — InterpolatedVar lacks the field to land the hue method on.

---

## §1 0-duplicates re-verification

**Inventory of every `lerp` / `interpolate` / `mix` / `tween` / `slerp` symbol
across both repos:**

### value.js (`src/**`)

| Symbol | File:line | Status |
|--------|-----------|--------|
| `lerp` | `math.ts:27` | canonical scalar |
| `logerp` | `math.ts:33` | scalar (no consumer; flagged in research) |
| `deCasteljau` | `math.ts:41` | bezier helper |
| `cubicBezier` | `math.ts:54` | bezier helper |
| `interpBezier` | `math.ts:60` | bezier helper |
| `interpolateHue` | `units/color/utils.ts:1049` | cylindrical-space hue blend |
| `mixColors` | `units/color/utils.ts:1092` | CSS color-mix() |
| `mixColorsN` | `units/color/mix.ts:28` | N-way fold of mixColors |
| `lerpComputedValue` | `units/interpolate.ts:15` | var/calc dispatch |
| `lerpColorValue` | `units/interpolate.ts:46` | per-channel ValueUnit<Color> lerp |
| `lerpNumericValue` | `units/interpolate.ts:68` | ValueUnit<number> lerp |
| `lerpValue` | `units/interpolate.ts:84` | top-level dispatch |
| `slerp` | `transform/decompose.ts:386` | quaternion |
| `interpolateDecomposed` | `transform/decompose.ts:510` | decomposed matrix (has its own local `lerp`) |

### keyframes.js (`src/animation/**`)

| Symbol | File:line | Status |
|--------|-----------|--------|
| `lerp` (call) | `numeric.ts:159` | imported from value.js, called direct |
| `lerp` (call) | `group.ts:251` | imported from value.js, called direct |
| `lerpValue` (call) | `index.ts:618` | imported from value.js, hot path |
| `lerpColorValue/ComputedValue/NumericValue/lerpValue` | `utils.ts:8–35` | RE-EXPORTS only |
| `createInterpVarValue` | `utils.ts:219` | wraps `normalizeValueUnits` + `prepareInterpVar` |
| `smooth.ts:117` | single-pole filter | not a lerp (damping) |

### Re-verification verdict

**Confirmed: zero parallel implementations.** Every `lerp` site in keyframes.js
is either:

- `import { lerp } from "@mkbabb/value.js"` and a direct call (numeric.ts,
  group.ts), or
- `import { lerpValue } from "@mkbabb/value.js"` and a direct call (index.ts),
  or
- a re-export shim (utils.ts:32-36) for back-compat.

`interpolateDecomposed` redefines `lerp` locally as a curried closure
(`const lerp = (v0, v1) => v0 + (v1 - v0) * t`); cosmetic, not duplication. The
research's classification of this as "DUPLICATION, minor" is fair but
overstated — it's a one-line closure, not a parallel implementation.

`smooth.ts:117` uses single-pole damping (`current += (target − current) *
damping`), which is *not* two-endpoint linear interpolation. The research
correctly excluded it from the lerp count.

**No additional duplicates discovered.** The 0-duplicates claim survives.

---

## §2 P1 — `lerpColorValue` ignores `hueMethod`

### The claim

`normalizeColorUnits` returns `hueMethod` as the 3rd tuple element; the
downstream dispatch discards it; `lerpColorValue` falls through to per-channel
`lerp` on every component including `h`. Fix is "one-branch".

### Trace verification

`src/units/color/normalize.ts:114-128`:

```ts
return [
    colorUnit2(a, to, normalized, inverse, inplace),
    colorUnit2(b, to, normalized, inverse, inplace),
    hueMethod,
] as const;
```

`src/units/normalize.ts:360-368`:

```ts
const [leftCollapsed, rightCollapsed] = normalizeColorUnits(
    asColorValueUnit(left),
    asColorValueUnit(right),
    colorSpace as any,
    false, true, false,
    hueMethod,
);
```

Destructure takes only the first two elements. **`hueMethod` is genuinely
threaded in and then dropped at the call site.** Claim confirmed.

`src/units/interpolate.ts:46-65`:

```ts
export function lerpColorValue(t, { start, stop, value }) {
    start.value.keys().forEach((key) => {
        const sv = ...
        const ev = ...
        const result = lerp(t, sn, en);
        ...
    });
}
```

Every key — `l`, `c`, `h`, `alpha` for `oklch` — is lerped linearly with no
hue-method awareness. Claim confirmed.

### Long-way-round trace (oklch 350° → 10°)

In normalized [0,1] space, `h1 = 350/360 ≈ 0.972` and `h2 = 10/360 ≈ 0.028`.

At `t = 0.5`, `lerp(0.5, 0.972, 0.028) = 0.500`. That maps back to
**180° (the long way through cyan/green)**, not the short way through 0°/360°
which would land at the desired hue ~0°. The shortest-arc would jump
0.972 → 1.028 (wraparound), giving `lerp(0.5, 0.972, 1.028) = 1.000 ≡ 0`.

CSS Color 4 §12.4 default is `shorter` (shortest arc). The current code path
violates that default. Claim **UPHELD**.

### "One-branch fix" claim — REJECTED

`prepareInterpVar` (interpolate.ts:117) sets a `_lerp` dispatch function based
on `iv.start.unit === "color"`. To use `hueMethod` inside `lerpColorValue` the
fix would need:

1. `InterpolatedVar<T>` (units/index.ts:209) must carry `hueMethod` and the
   target `colorSpace` (so `lerpColorValue` knows which key is the hue
   component — `CYLINDRICAL_HUE_COMPONENT[space]` lookup). **The type has 4
   fields and none of them is `hueMethod` or `colorSpace`**:
   ```ts
   export type InterpolatedVar<T> = {
       start: ValueUnit<T>; stop: ValueUnit<T>;
       value: ValueUnit<T>; computed: boolean;
   };
   ```
2. `normalizeValueUnits` must write those fields onto `out`.
3. `lerpColorValue` must branch on `hueComponent` and call `interpolateHue`.

That is three changes across three files: the type, the producer, the
consumer. Not "one-branch". The behavioural fix is small; the API change is
small but **not negligible**, because `InterpolatedVar<T>` is a public type
re-exported by keyframes.js (`animation/constants.ts:9`). Adding fields is
back-compat-safe, but it is a public-surface change and merits being called
out as such.

**Verdict: P1 is genuine; severity rating (silent bug in every oklch
animation crossing a hue boundary) is correct; "one-branch" framing is
misleading. UPHELD with caveat.**

---

## §3 Five missing cases — per-case verdict

### 3.1 length ↔ percentage (`10px ↔ 50%`)

CSS Values 4 §3.5: "If the two values are of different types but compatible
(e.g., length and percentage), they animate as a `calc()` expression."

**Trace:** `normalizeValueUnits` calls `normalizeNumericUnits`, which bails at
`a.superType[0] !== b.superType[0]` (`"length"` vs `"percentage"`). Endpoints
left as-is. In `lerpValue`, the dispatch checks `typeof start.value ===
"number"` — both `10` and `50` are numbers — and takes the fast path
`lerp(t, 10, 50)`. Output is a bare number with the *first* operand's unit
(`px`). At `t=0.5`, result is `30px` not `calc(30px + 5%) = calc(50% * 0.5 +
10px * 0.5)`. **Spec-violation, silent.**

Counter-argument considered: "consumers should resolve % first." That's true
for *non-animated* layout, but per spec the animated form is `calc()`, and
value.js *has* `calc()` AST nodes (`parsing/math.ts`). So the lib could
synthesize a calc-shaped interpolation result. This is genuinely a lib-level
concern.

**Verdict: REAL.**

### 3.2 `currentColor` deferral

There is zero `currentColor` handling in `src/`. CSS `currentColor` is a
computed value that resolves to the element's `color` property at use time
(CSS Color 3 §4.4). `lerpComputedValue` exists for the analogous case of
`var()` / `calc()` and uses `getComputedValue` to round-trip through the live
element.

The lift to support `currentColor` is non-trivial:

- Detection — the parser would need to flag `currentColor` as a deferred unit.
- Resolution — both endpoints would need a target element; the resolution
  reads `getComputedStyle(target).color` and substitutes.
- Re-resolution per frame is unnecessary (color is constant during a frame),
  but still requires consistent semantics with `lerpComputedValue`.

**Is this load-bearing?** Realistic consumer scenario: `transition: background
1s linear` where the `from` is `currentColor`. Without lib support, the
keyframes.js consumer would resolve `currentColor` externally before parsing.
That's a documented pattern, and the existence of `lerpComputedValue`
suggests the lib *intends* to own this kind of resolution.

**Verdict: REAL but BORDERLINE — could legitimately be handled by the
consumer (parsing layer at adapter time), but the lib's existing pattern for
`var()`/`calc()` argues for parity.** Soft-real.

### 3.3 same-name `FunctionValue` pair (`rotate(30deg)` ↔ `rotate(60deg)`)

The research claims: "no `clone+interp` path; keyframes.js flattens via
`flattenToValueUnits`, which loses the function wrapper."

**Trace:** `keyframes.js/animation/utils.ts:40` walks the `FunctionValue` and
yields its leaves as a `ValueUnit[]`. For `rotate(30deg)`, the leaves are
`[ValueUnit(30, "deg")]`. For `rotate(60deg)`, `[ValueUnit(60, "deg")]`.
`createInterpVarValue` pads to common length and produces an
`InterpolatedVar` per leaf via `normalizeValueUnits`. At lerp time,
`lerpNumericValue(t, iv)` runs — and the result is `45deg` at `t=0.5`.

**The wrapper is lost in the InterpolatedVar but is reconstructed at
write-time** via `unflattenObjectToString` (keyframes.js consumes the leaf
back into a `transform` CSS string). The same-shape, same-arity case
**actually produces correct results**.

The research's case-6 claim ("no association preserved → wrong results") is
**not borne out by the code path**. The association is reconstructed by
keyframes.js's serialization step. For *same-name same-arity* function pairs,
the existing pipeline works.

**Verdict: SPECULATIVE.** The mechanism described (loss of association) is
real, but the "broken" classification is wrong for the example the case
describes. The actual breakage only manifests when arity or function name
differs — which is case 3.4 (incompatible transforms), already separately
listed. **REJECTED as a distinct case.**

### 3.4 incompatible transform list (`rotate(30deg)` ↔ `scale(2)`)

CSS Transforms 2 §13 mandates matrix decomposition when transform lists are
incompatible. Primitives exist in `src/transform/decompose.ts`:
`decomposeMatrix3D`, `interpolateDecomposed`, `recomposeMatrix3D`.

**Trace:** `grep -r slerp keyframes.js/src/` returns zero hits. `grep -r
interpolateDecomposed keyframes.js/src/` returns zero hits. No dispatch
wires the primitives into either repo's interpolation kernel.

`keyframes.js/animation/utils.ts:flattenToValueUnits` walks both
`FunctionValue`s and yields bare leaves. Left: `[ValueUnit(30, "deg")]`.
Right: `[ValueUnit(2, "")]` (scale is unitless). `normalizeNumericUnits`
bails (superType differs). `lerpValue` takes the typeof-number fast path:
`lerp(0.5, 30, 2) = 16`. The leaf is then serialized via
`unflattenObjectToString`, which reconstructs `transform: rotate(16deg)` (or
`scale(16)` — depending on which leaf wins the property reconstruction). Both
are visually wrong.

**Verdict: REAL.** The spec-mandated decompose-fallback is unwired in both
repos despite the primitives existing.

### 3.5 hue boundary in cylindrical spaces

This is the same defect as P1. Same root cause (lerpColorValue is unaware of
hueMethod and of the hue component's identity). Same fix.

**Verdict: REAL but DUPLICATE of P1.** Counting this as a separate missing
case inflates the count.

### Tally

| Case | Status |
|------|--------|
| length ↔ % | REAL |
| `currentColor` | SOFT-REAL (borderline lib/consumer split) |
| same-name FunctionValue | SPECULATIVE — works fine; rejected |
| incompatible transform list | REAL |
| hue boundary | REAL but DUPLICATE of P1 |

**2 REAL distinct + 1 SOFT-REAL + 1 SPECULATIVE + 1 DUPLICATE.** Saying "5
missing cases" overstates by ~2. The honest count is **3 distinct issues**
(length-%, transform decompose fallback, hue boundary) and one borderline
ergonomic gap (`currentColor`).

Per the directive — "5 missing cases is plural; if any are speculative,
REJECT" — **the headline framing is REJECTED**. The underlying findings are
mostly valid but the count is inflated.

---

## §4 Canonical-surface ergonomics challenge

The research's claim: `lerp` (scalar) + `lerpValue` (CSS value) + `mixColors`
(raw Color) + `mixColorsN` (N-way color) + `slerp` (quaternion) +
`interpolateDecomposed` (matrix) — already-canonical, two unavoidable
signature families.

### Ergonomic re-check

A consumer reads the barrel (`src/index.ts`). What do they see?

- `lerp(t, a, b)` — t-first scalar.
- `lerpValue(t, iv)` — t-first; **requires an InterpolatedVar** built by
  `normalizeValueUnits` + `prepareInterpVar`. Three-step setup; not
  discoverable from the signature alone.
- `mixColors(c1, c2, p1, p2, space, hueMethod)` — t-equivalent in *fourth
  position*, expressed as *two percentages*; produces a `Color`, not a
  `ValueUnit<Color>`.
- `mixColorsN(colors, weights, space, hueMethod)` — different blend-factor
  shape again.
- `slerp(qa, qb, t)` — t-third; produces `Vec4`.
- `interpolateDecomposed(a, b, t)` — t-third; produces `DecomposedMatrix3D`.

### Discoverability test

A consumer who wants "lerp two colors at t=0.3" must choose among
`mixColors(c1, c2, 0.7, 0.3)`, `lerpValue(0.3, iv)`, or `lerpColorValue(0.3,
iv)`. Each requires different preparation and produces a different output
type. **There is no signature-level guidance that one is more
spec-compliant than another.**

The research correctly noted in D-3 that this divergence is "OPAQUE". The
"canonical surface" verdict is too generous: the surface is *audit-canonical*
(every entry point is justified), not *use-canonical* (consumers cannot
choose without reading source).

### Verdict on "the canonical surface already exists"

**Partial agreement.** The set of entry points is complete and (modulo the
behavioural gaps) correct. But "canonical" carries an ergonomic claim that
the surface does not earn. A doc page mapping consumer-goals → entry-point
would help more than a refactor.

The research's claim that signatures are "consistent within each subdomain"
is also weakened by the fact that `interpolateHue` (which lives in the
*color* subdomain alongside `mixColors`) uses `t`-third with a scalar `t`,
not the `(p1, p2)` pair. So the "scalar t-first vs paired-percentages-at-end"
clean split actually has an exception inside the color subdomain.

### P4 (argument-order drift) — challenge

The research deemed P4 "not load-bearing". Counter:

- `lerp(t, a, b)` vs `slerp(qa, qb, t)` — same conceptual operation, opposite
  argument order. A consumer animating a quaternion alongside scalars will
  put `t` in different positions, depending on which they call. Easy bug.
- `interpolateHue(h1, h2, t, method)` and `interpolateDecomposed(a, b, t)`
  both put `t` at position 3 but inside the "color subdomain" `mixColors`
  puts blend factors at position 3–4 as `(p1, p2)`. Not actually consistent
  by subdomain.

**Fix cost:** rename and deprecate. ~8 consumer sites in keyframes.js + the
re-export shim. One commit, one PR, low risk.

**Verdict:** P4 is *cheap* to fix and *would* improve discoverability.
Calling it "not worth a refactor" is a real judgement call but I would lean
toward fixing it during any other touch of these files. **CHALLENGED but not
overturned.**

---

## §5 keyframes.js consumption — 5-import spot-check

I checked 5 keyframes.js source files that import from `@mkbabb/value.js`:

1. `keyframes.js/animation/utils.ts:1-19` — imports
   `lerpColorValue, lerpComputedValue, lerpNumericValue, lerpValue,
   normalizeValueUnits, prepareInterpVar, …` from `@mkbabb/value.js` and
   re-exports the four `lerp*` for back-compat. No shadow impl.

2. `keyframes.js/animation/numeric.ts:1` — imports `clamp, lerp, scale`
   from `@mkbabb/value.js` and uses them directly. `lerp` at line 159 is
   *the value.js lerp*, not a redefined one. The "second pipeline" for
   raw numbers stays inside the same primitive.

3. `keyframes.js/animation/group.ts:1-6` — imports
   `cancelAnimationFrame, lerp, requestAnimationFrame, type ValueUnit` from
   `@mkbabb/value.js`. The `lerp` at line 251 is the same primitive used
   for layer blending. No shadow impl.

4. `keyframes.js/animation/index.ts:5-19` — imports `lerpValue` (used at
   line 618 in `interpFrames`), plus `unflattenObject`, `ValueUnit`,
   `PropertyDescriptor`, `Stylesheet`. The hot-path interpolation call is
   `lerpValue(eased, iv)`. No shadow impl.

5. `keyframes.js/animation/constants.ts:8-9` — `export type
   { HueInterpolationMethod, InterpolatedVar } from "@mkbabb/value.js"`. The
   types flow upward; no parallel type definitions.

Bonus 6th: `keyframes.js/animation/morph.ts` — uses `NumericAnimation`
internally, no direct interpolation, no shadow.

Bonus 7th: `keyframes.js/animation/smooth.ts` — single-pole damping, not a
lerp; uses its own arithmetic. Correctly excluded from the canonical-surface
inventory.

**Consumption pattern verdict: clean, one-directional, single source of
truth.** The research's claim "keyframes.js consumes value.js cleanly via
re-exports" is correct.

The one ambiguity worth noting: keyframes.js' `numeric.ts` *deliberately*
keeps a parallel path (raw-number keyframes, zero-allocation). That's not a
duplicate of `lerpValue` — it's a different DX surface for hot graphics
loops. The research called this out as intentional, and that judgement is
fair.

---

## §6 Post-challenge synthesis

The research's structural claims hold:

- 0 duplicate implementations — **confirmed**.
- Canonical surface exists, two unavoidable signature families — **partially
  confirmed; the surface is audit-canonical, not use-canonical, and there is
  one exception (interpolateHue) to the "subdomain-consistent argument order"
  claim**.
- keyframes.js consumes cleanly — **confirmed**.

The behavioural defects are real but the count is inflated:

- P1 (hue method ignored) — **UPHELD as the load-bearing finding**.
  "One-branch fix" framing is **wrong**: needs InterpolatedVar type
  extension + producer change + consumer change. Three files, not one
  branch. (The behavioural fix is still small, just not a single edit.)
- "5 missing cases" — **REJECTED as a count**. Honest count is 3 distinct
  issues:
  1. length ↔ percentage (REAL, spec-required)
  2. incompatible transform list (REAL, spec-required, primitives exist)
  3. hue boundary (REAL but **duplicate of P1**)
  Plus 1 borderline (`currentColor`) and 1 speculative (same-name
  FunctionValue actually works through the existing flatten-relift path).

- P4 (argument-order drift) — research says "not worth a refactor"; I'd
  challenge that lightly. Fix cost is ~8 sites, risk low, DX win real. If
  any of these files is touched for P1 or transform-list dispatch, fold P4
  in.

### Net prioritization

| Original | Verdict | Action |
|---------|---------|--------|
| P1 (hue method) | **UPHELD** — real, silent, high impact | Fix; expect 3 files |
| P2 (transform list) | **UPHELD** — real, spec-required | Fix; new dispatch path |
| P3 (alpha / NaN) | **UPHELD** — real, low impact | Optional flag, low priority |
| P4 (argument-order) | **CHALLENGED** — cheap if folded in | Bundle with P1 work |
| P5 (logerp) | **UNCHANGED** — flag-only | None |
| length ↔ % | **NEW** — research listed but didn't prioritize | Should be P2.5 |
| `currentColor` | **BORDERLINE** | Consumer-side acceptable |

### Final verdict on the research

The research is **structurally correct and substantively over-counted**. The
canonical-surface verdict is too generous (audit-canonical ≠ use-canonical).
The "5 missing cases" framing inflates by counting the hue boundary as a
distinct case from P1 and counting the same-name-function pair as broken
when it actually works through the existing serialization path. The
"one-branch fix" framing for P1 understates the type-surface change.

**Recommendation:** accept the research as the *inventory*, downgrade the
"5 missing cases" to a 3-issue list (length-%, transform-list,
hue-method-already-P1), and budget P1 as a small but multi-file change
rather than a one-line patch.
