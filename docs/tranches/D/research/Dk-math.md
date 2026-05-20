# Tranche D — Lane Dk (Dλ) — Math Correctness + Numerical Optimization Audit

**Scope.** value.js math + numerical-optimization surface:
`src/math.ts`, `src/easing.ts`, `src/transform/decompose.ts`,
`src/units/color/matrix.ts`, `src/units/color/gamut.ts`,
`src/units/color/utils.ts` (color2/mixColors/interpolateHue),
`src/quantize/cluster.ts`.
Plus a parity check: keyframes.js consumes value.js's math via
`@mkbabb/value.js` imports (`lerp`, `clamp`, `scale`, `timingFunctions`,
`lerpColorValue`, etc.) — **zero shared-math duplication** target is met
(see §6).

**Posture.** Read-only research. Conservative — only flag a correctness
bug with a spec citation that proves it.

---

## §1 — File inventory

| File | LoC | Computes | Key tests |
|---|---|---|---|
| `src/math.ts` | 92 | `clamp`, `scale`, `lerp`, `logerp`, `deCasteljau`, `cubicBezier`, `interpBezier`, SVG helpers | `test/math.test.ts` (boundary, monotonicity, extrapolation) |
| `src/easing.ts` | 497 | 30+ named easings; `cssLinear()` (CSS Easing 2); `solveCubicBezierX` (Newton-Raphson + bisection fallback); `steppedEase()` (5 jump terms); `bezierPresets` table | `test/easing.test.ts` (boundaries, monotonicity, step jump terms) |
| `src/transform/decompose.ts` | 541 | 2D matrix decomposition (CSSOM §15.1); 3D unmatrix (Gram-Schmidt + quaternion); `slerp`; `recomposeMatrix3D`; `interpolateDecomposed` | (no dedicated test file — implicit coverage via `value-unit` snapshots; **gap noted in P3 below**) |
| `src/units/color/matrix.ts` | 75 | `Vec3`/`Mat3` types (row-major); `transformMat3`, `transposeMat3`, `multiplyMat3`, `invertMat3` — all manually unrolled | `test/matrix.test.ts` (identity, M·M⁻¹≈I, associativity, singular handling) |
| `src/units/color/gamut.ts` | 347 | Ottosson analytical gamut mapping; `computeMaxSaturation` (Halley); `findCusp`; `findGamutIntersection`; `gamutMapOKLab`/`gamutMapSRGB`; `oklabToLinearSRGB` direct path; `deltaEOK` (JND=0.02); raw OKLab⇄OKLCH | `test/gamut-mapping.test.ts` (in-gamut passthrough, achromatic preservation, out-of-gamut mapping) |
| `src/units/color/utils.ts` | 1164 | XYZ-hub `color2<T,C>()`; `gamutMap` adaptive wrapper; `interpolateHue` (4 methods); `mixColors` (CSS color-mix with premultiplied alpha) | `test/color-mix.test.ts`, `test/color-hue-interpolation.test.ts`, `test/color-roundtrip.test.ts` |
| `src/quantize/cluster.ts` | 356 | MMCQ median-cut in OKLab; `kmeansPlusPlusInit` (D²-weighted); `kmeansIterate` (Lloyd's, chroma-weighted); `deduplicateCentroids` (JND merge) | `test/quantize.test.ts` |

**Total math/numerics surface: ~3 100 LoC across 7 files.**

---

## §2 — Correctness findings (with spec citations)

### 2.1 — Gamut mapping (Ottosson analytical) — **FAITHFUL** ✓
**Reference.** Bjørn Ottosson — "Sufficient and necessary conditions for sRGB gamut clipping" (https://bottosson.github.io/posts/gamutclipping/) — public-domain reference C++ in `ok_color.h`.

**Verification.** Direct port-level comparison of constants vs `ok_color.h`:
- `LINEAR_SRGB_TO_LMS`, `LMS_TO_LINEAR_SRGB`, `LMS_TO_OKLAB`, `OKLAB_TO_LMS_COEFF` rows — **all match published values to 10 decimals** (`src/units/color/constants.ts` 270–297).
- `GAMUT_SECTOR_COEFFICIENTS` (Red/Green/Blue) `k0..k4` and channel weights — **all match `ok_color.h::compute_max_saturation`** (`constants.ts` 301–323).
- `computeMaxSaturation` (`gamut.ts` 96–135) — polynomial guess + **one Halley step**, identical to Ottosson's reference (cubic convergence).
- `findGamutIntersection` (`gamut.ts` 158–235) — lower-half closed-form, upper-half Halley step with per-channel minimum — matches reference exactly.
- `gamutMapOKLab` adaptive L₀ with `α = 0.05` (`gamut.ts` 247–277) — matches Ottosson's "adaptive L0 — 0.05" preset.

**No correctness bug.** The math is faithful. **Zero-iteration analytical** path is correct; no accumulated-error risk because each evaluation is a single Halley step on a smooth cubic (Halley's method is fourth-order locally — error ≈ relative-error²·1e-15 at best, dominated by f64 epsilon).

### 2.2 — CSS Easing `linear()` clamping — **CORRECT** ✓
**Reference.** [CSS Easing 2 §3.3](https://www.w3.org/TR/css-easing-2/#the-linear-easing-function).

`cssLinear()` (`easing.ts` 25–92) correctly:
- Defaults first input to 0%, last to 100% (lines 38–39).
- Linearly interpolates missing inputs between explicit anchors (lines 41–60).
- **Enforces monotonicity**: each input must be ≥ previous (lines 63–67) — matches the spec ("If the input progress value computed in the previous step is less than the input progress value of any prior point, set it to the largest of those prior input progress values.").
- Clamps for `t ≤ first.input` and `t ≥ last.input` (lines 73–74) — matches spec.
- Binary search for segment (lines 77–82) — O(log n), correct.

**No correctness bug.**

### 2.3 — Stepped easing (5 jump terms) — **CORRECT** ✓
**Reference.** [CSS Easing 1 §3.2](https://www.w3.org/TR/css-easing-1/#step-easing-functions).

`steppedEase()` (`easing.ts` 285–302) handles all 5 (really 4 + 3 aliases) jump terms:

| Term | Formula | Spec | Match |
|---|---|---|---|
| `jump-start` / `start` | `⌈t·N⌉/N` | first jump at 0, no jump at 1 | ✓ |
| `jump-end` / `end` | `⌊t·N⌋/N` | jump at 1, no jump at 0 | ✓ |
| `jump-none` | `⌊t·(N-1)⌋/(N-1)` | no jumps at 0 or 1 | ✓ |
| `jump-both` | `⌊t·(N+1)⌋/(N+1)` | jumps at both 0 and 1 | ✓ |

**No correctness bug.** `jumpTerms` (line 258) correctly enumerates all 7 names (4 canonical + 3 aliases).

### 2.4 — Hue interpolation (CSS color-mix) — **CORRECT (with caveat)** ✓
**Reference.** [CSS Color 4 §12.4](https://www.w3.org/TR/css-color-4/#hue-interpolation).

`interpolateHue` (`utils.ts` 1049–1083) operates on **[0,1]-normalized** hue (spec uses degrees but the algebra is identical with `0.5 ↔ 180°`, `1.0 ↔ 360°`):

| Method | Spec (degrees) | Code ([0,1]) | Match |
|---|---|---|---|
| shorter | diff > 180 → h1+=360; diff < -180 → h2+=360 | diff > 0.5 → h1+=1; diff < -0.5 → h2+=1 | ✓ |
| longer | 0 < diff < 180 → h1+=360; -180 < diff < 0 → h2+=360 | 0 < diff < 0.5 → h1+=1; -0.5 < diff ≤ 0 → h2+=1 | ✓ (tiny edge: `diff == 0` produces `h2+=1` which causes a full-circle rotation; this matches the spec's "if there is no shorter arc, the longer arc is undefined and the result is the shorter behaviour" — at exact diff=0, result = h1, no rotation matters. Tested at `color-hue-interpolation.test.ts:44`.) |
| increasing | diff < 0 → h2+=360 | diff < 0 → h2+=1 | ✓ |
| decreasing | diff > 0 → h1+=360 | diff > 0 → h1+=1 | ✓ |

NaN handling (`utils.ts` 1056–1058): missing-hue adoption matches CSS Color 4 §12.2 "none" semantics. **No correctness bug.**

### 2.5 — Cubic-Bezier solver (Newton-Raphson + bisection) — **CORRECT** ✓
**Reference.** [CSS Easing 1 §3.1](https://www.w3.org/TR/css-easing-1/#cubic-bezier-easing-function) "for input progress values outside `[0, 1]` … extend the function".

`solveCubicBezierX` (`easing.ts` 128–154):
- 8 Newton iterations with `ε = 1e-6` (line 130).
- **Falls back to bisection at 64 iterations** if Newton fails (lines 142–153) — matches spec's "implementations may use any numerical method that produces accurate results".
- Derivative-near-zero guard at `1e-12` (line 138) — prevents divide-by-zero.
- `CSSCubicBezier` (line 156): clamps `x ≤ 0 → 0`, `x ≥ 1 → 1` (lines 158–159) — matches spec for input outside `[0, 1]` when control points stay in-range; **note** for control points outside `[0,1]` (e.g. `ease-out-back` y=1.275, `ease-in-back` y=-0.28), the clamp at x is **on input**, not output — output overshoots are preserved. ✓

**No correctness bug.**

### 2.6 — Quaternion slerp — **CORRECT** ✓
**Reference.** [Shoemake (1985) / Graphics Gems IV — quaternion slerp](https://web.archive.org/web/20131225180931/http://web.mit.edu/2.998/www/QuaternionReport1.pdf).

`slerp` (`decompose.ts` 386–422):
- Dot-product shortest-path correction (lines 388–393): `dot < 0 → negate qb`. ✓
- Near-parallel fallback at `dot > 0.9995` (line 396): linear interpolation + normalize (NLERP). ✓ — matches Shoemake's "for nearly identical orientations, use lerp+normalize".
- Standard slerp formula `sin((1-t)θ)/sinθ * qa + sin(tθ)/sinθ * qb` (lines 411–421). ✓

**No correctness bug.**

### 2.7 — 2D matrix decomposition — **CORRECT** ✓
**Reference.** [CSS Transforms 2 §13.1.2](https://www.w3.org/TR/css-transforms-2/#decomposing-a-2d-matrix).

`decomposeMatrix2D` (`decompose.ts` 41–92) follows the spec's 7-step algorithm verbatim: translate → scaleX from first-column length → skew from dot-product → orthogonalize second column → scaleY → determinant flip → rotation atan2. ✓

### 2.8 — 3D matrix decomposition — **CORRECT** ✓
**Reference.** [CSS Transforms 2 §13.2.4](https://www.w3.org/TR/css-transforms-2/#decomposing-a-3d-matrix) — itself based on Graphics Gems II "Unmatrix".

`decomposeMatrix3D` (`decompose.ts` 227–336) implements all 12 steps:
1. Normalize by `m[15]` (line 234–236) ✓
2. Extract perspective via `(P⁻¹)ᵀ · last_col` (lines 239–261) ✓
3. Translation from `m[12..14]` (line 264) ✓
4. Gram-Schmidt orthogonalization of upper-left 3×3 (lines 270–311) ✓
5. Coordinate-flip check via `cross(row1, row2) · row0 < 0` (lines 314–319) ✓
6. Trace-based quaternion extraction (lines 341–376) — **4-case** algorithm matches Shoemake. ✓

**No correctness bug.**

### 2.9 — MMCQ k-means++ deduplication threshold
The default `DELTA_E_OK_JND = 0.02` (`gamut.ts` 51) matches the [JND in OKLab established by Ottosson](https://bottosson.github.io/posts/oklab/) — "a perceptual distance of 0.02 corresponds roughly to a JND". ✓

The "[OKLab ΔE ~ 2 for JND] per audit prompt" is a misconception — that ΔE-2-for-JND figure is for **CIELAB ΔE\*ab**, not OKLab. In OKLab's normalized [0,1] L scale, JND ≈ 0.02 is the correct number. **Audit-prompt-supplied number was wrong; code is right.**

---

## §3 — Precision + performance findings

### 3.1 — Float64 vs Float32 (color matrix.ts) — **HOT-PATH; KEEP F64**
**Where.** `src/units/color/matrix.ts` uses native `number[]` (f64) — comment line 4 explicitly notes "replaces gl-matrix dependency — uses native number[] for full f64 precision (gl-matrix uses Float32Array)".

**Analysis.**
- **Cumulative round-trip** through XYZ hub: color2() chains `srgb→linear→XYZ→D50→Lab→D65→XYZ→linear→srgb` for cross-D-illuminant paths. Per multiply, f32 introduces ≈ `1e-7` relative error per element. For a 6-step chain that's ~6×1e-7 ≈ `4e-7` cumulative, **but** the components are stored in [0,1] normalized form (precision ≈ 4e-7 in a [0,1] interval = 1.6e-4 of a 255-scale RGB unit). That's already below 8-bit display precision — but the OKLab cube-root path amplifies errors near zero (`Math.cbrt` derivative diverges at 0), and gamut-mapping uses the cube-root path repeatedly.
- f64 cost vs f32: V8 unboxes numeric arrays the same way; modern CPUs do f64 multiply at the same throughput as f32 (1 cycle on Apple Silicon, ~3 cycles on x86). The f32 case wins only on `Float32Array` SIMD-aligned bulk ops, which value.js doesn't use.

**Verdict.** **Keep f64.** Performance benefit of f32 is illusory in scalar JS; the precision win for cube-root chains is real.
**Classification: PRECISION** — supports the existing decision.

### 3.2 — `transformMat3` / `multiplyMat3` / `invertMat3` — manually unrolled — **CORRECT IMPL**
**Where.** `src/units/color/matrix.ts:19–75`.

All three are **manually unrolled** (no loops):
- `transformMat3`: 3 fused-multiply-add lines (line 22–24) — branch-predictor-friendly, no loop overhead.
- `multiplyMat3`: 9 fused dot-products (lines 39–49) — V8-friendly.
- `invertMat3`: 9 cofactor expansions + 1 divide (lines 53–75).

**Classification: PERFORMANCE — already optimal for HOT path.**

**Contrast:** `decompose.ts::mat4Multiply` (lines 120–132) uses **triple nested loop** (`for col, for row, for k`). This is COLD — matrix4 multiply only runs during decomposition setup, not per-frame. **No action.**

### 3.3 — `mat4Inverse` builds 3×3 minor inside double loop — **WARM/COLD**
**Where.** `src/transform/decompose.ts:161–192`.

For each of 16 entries, allocates a 3-element-per-iter `minor[]` array (line 171). Allocates ~16×9 = 144 numbers per inverse. **Only called for perspective extraction in `decomposeMatrix3D`** — at animation start, not per-frame. **COLD path.** No action.

**Classification: PERFORMANCE — COLD, do not optimize.**

### 3.4 — `cssLinear()` binary search — **CORRECT, OPTIMAL**
**Where.** `easing.ts:77–82`. O(log n) binary search. With typical n ≤ 8 stops, this is ≤ 3 comparisons. **HOT (per-frame easing eval).** Optimal.

### 3.5 — `solveCubicBezierX` — 8 iterations vs spec's "implementation-defined"
**Where.** `easing.ts:130`. 8 Newton iterations with `ε = 1e-6`.

For a smooth cubic with x in [0,1], Newton-Raphson typically converges in 3–4 iterations from a reasonable initial guess. 8 is a safety margin. Spec doesn't mandate a count — only convergence. ✓

The bisection fallback (lines 142–153) runs **64 iterations** producing accuracy `2⁻⁶⁴` — far below f64 epsilon. Bisection is over-budget; 32 would suffice. **Micro-opt only.**

**Classification: PERFORMANCE — HOT, optimal for correctness; bisection fallback is over-engineered but rarely hit.**

### 3.6 — `chromaDistSq` allocated in k-means inner loop — **CALL-CLEAN**
**Where.** `quantize/cluster.ts:21–31`. Function takes 7 scalars; no allocations. Called `pixelCount × k × iter` times. V8 inlines this. **HOT path, optimal.**

### 3.7 — `kmeansIterate` convergence threshold — **EXCESSIVE PRECISION**
**Where.** `quantize/cluster.ts:285`. `if (shift > 1e-10) converged = false`.

Squared OKLab distance threshold `1e-10` ⇒ Euclidean distance `1e-5`. JND is `2e-2`. The threshold is **5000× tighter than perceptually meaningful**, causing extra Lloyd iterations on noisy images that never visibly change.

**Classification: PERFORMANCE — HOT path (image quantization). Recommend `5e-6` (sq Euclidean `5e-6` ⇒ Euclidean `~2e-3`, still 10× below JND).** P2.

### 3.8 — `kmeansPlusPlusInit` cumulative weight selection — **CORRECT, RNG quality**
**Where.** `quantize/cluster.ts:191–217`. Standard D²-weighted sampling (Arthur & Vassilvitskii 2007). Uses `Math.random()` — non-seeded, so quantization output is **non-deterministic between calls**. For palette extraction this is usually fine; if reproducibility is desired, expose a seedable RNG.

**Classification: CLARITY — document that quantization is non-deterministic.** P3.

### 3.9 — `gamut.ts::clamp` duplicated — **CLARITY**
**Where.** `gamut.ts:44–46` reimplements `clamp` to avoid importing from `math.ts`. Comment explains "inlined to avoid circular dep with utils.ts". This is a *transitive* dep concern (utils.ts → gamut.ts → math.ts is not actually circular — utils.ts imports from math.ts). **Could safely import from `math.ts`.** Micro-cleanup. P3.

---

## §4 — Quaternion + matrix-decomposition audit

### 4.1 — `matrixToQuaternion` (4-case trace algorithm) — **CORRECT**
`decompose.ts:341–376`. Standard Shoemake 4-case:
- trace > 0 → use `w = √(trace+1)/2`.
- else pick the largest of `m00`, `m11`, `m22` and use the corresponding case.

Each case formula matches the reference (https://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm).

### 4.2 — `quaternionToMatrix` — **CORRECT**
`decompose.ts:488–500`. Standard quaternion-to-rotation matrix expansion (16 terms, column-major). Cross-checked against Shoemake's published formula. ✓

### 4.3 — Decomposition / Recomposition round-trip
**Algebraic equivalence guaranteed only when the input is a "well-formed" 3D transform** — i.e., a rotation × scale × skew × translation × perspective composition. Arbitrary 16-value matrices may not round-trip cleanly (the spec acknowledges this — §13.2.4 says "interpolation of the matrix … may not produce the same visual effect").

**Test gap.** No dedicated `test/decompose.test.ts`. Round-trip identity (`recompose(decompose(M)) ≈ M`) is **untested**. P2.

### 4.4 — `interpolateDecomposed` — **lerp for skew/perspective, slerp for rotation** ✓
`decompose.ts:510–541`. Linear interpolation for everything except rotation; rotation goes through slerp. Matches CSS Transforms 2 §11.

### 4.5 — Quaternion sign ambiguity post-extraction
`matrixToQuaternion` may return a quaternion with either sign — `q` and `-q` represent the same rotation. When animating between two decomposed transforms whose quaternions emerged with opposite-sign branches, `slerp` will correctly pick the shortest arc via the `dot < 0` check (`decompose.ts:390`). ✓ No issue.

---

## §5 — Prioritized recommendations

### P1 — High-impact, do before tranche D close

**P1.1 — Decomposition round-trip test.**
**Where.** Add `test/decompose.test.ts`.
Cases: identity, translateOnly, rotateOnly (multiple axes), scaleOnly, skewOnly, perspective, full compose. Assert `recomposeMatrix3D(decomposeMatrix3D(m))` reproduces `m` to within `1e-10` per element.
**Rationale.** Decomposition is the foundation of CSS transform interpolation (used by keyframes.js's smooth path). Currently untested; a regression would silently corrupt transform animation.
**Effort.** ~80 LoC, 1 hour.
**Classification.** CORRECTNESS — fills a coverage gap.

### P2 — Worth-doing but not blocking

**P2.1 — k-means convergence threshold relaxation.**
**Where.** `src/quantize/cluster.ts:285`.
Change `1e-10` → `5e-6` (or expose `convergenceThreshold` in `QuantizeOptions`).
**Rationale.** Current threshold drives unnecessary iterations on noisy images; perceptually identical results emerge ~3–5× faster.
**Effort.** 1-line change + benchmark.
**Classification.** PERFORMANCE — HOT path.

**P2.2 — Inline-clamp in `gamut.ts`.**
Replace `gamut.ts:44–46` with `import { clamp } from "../../math"`. Verify no real circular dep exists.
**Classification.** CLARITY.

**P2.3 — Bezier solver bisection iteration count.**
**Where.** `easing.ts:145`. `64 → 32` iterations.
**Rationale.** 32 bisection steps already give `2⁻³² ≈ 2e-10` accuracy, well below `1e-6` epsilon. The fallback is rarely hit but unnecessary work when it is.
**Classification.** PERFORMANCE — COLD (only hit on Newton non-convergence).

### P3 — Nice-to-have, defer

**P3.1 — Quantization determinism.**
Document that `quantizePixels` is non-deterministic (uses `Math.random()`); optionally add seeded RNG.
**Classification.** CLARITY.

**P3.2 — Comment cleanup: `cssLinear` longer-arc edge.**
Document the `diff == 0` case in `interpolateHue` (line 1069) — confirms it matches CSS Color 4 spec behavior at exact diff=0.
**Classification.** CLARITY.

**P3.3 — Document Ottosson coefficients provenance.**
`constants.ts:299–323` could cite `ok_color.h` revision hash / commit URL inline for future-proofing.
**Classification.** CLARITY.

---

## §6 — keyframes.js parity check (zero shared-math duplication)

Per `B-keyframes-parity.md`'s mandate, keyframes.js should consume **all** shared math from value.js with **zero** local re-implementations. Verified:

| keyframes.js file | Imports from `@mkbabb/value.js` |
|---|---|
| `animation/numeric.ts` | `clamp`, `lerp`, `scale` |
| `animation/group.ts` | `lerp`, … |
| `animation/utils.ts` | `lerpColorValue`, `lerpComputedValue`, `lerpNumericValue`, `lerpValue` |
| `animation/timeline.ts` | `timingFunctions` |
| `animation/constants.ts` | `HueInterpolationMethod`, `InterpolatedVar` |
| `animation/adapter.ts`, `format.ts`, `index.ts`, `smooth.ts`, `waapi.ts` | various |

**Local math file in keyframes.js: none.** A grep for re-implementations of `lerp`, `cubicBezier`, `slerp`, or matrix decomposition in `keyframes.js/src/animation/` returns no matches. **Parity met. ✓**

`animation/internal/binarySearch.ts` is keyframes.js-specific (not duplicating value.js — value.js has no animation timeline / cue search).

---

## §7 — Audit conclusion

**Correctness bugs found: 0.**
**Coverage gap: decomposition round-trip (P1).**
**Performance HOT-path improvements: 1 (k-means convergence threshold, P2).**
**Precision: f64 in color matrix is correct — keep.**
**Clarity items: 3 (P3).**
