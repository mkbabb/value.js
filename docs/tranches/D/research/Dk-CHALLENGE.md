# Tranche D — Lane Dk (Dλ) — CHALLENGE

**Posture.** Adversarial spot-check of `Dk-math.md`'s "0 correctness bugs across
~3 100 LoC" claim. Read-only. Each finding is paired with a concrete numerical
test executed via `tsx` against the live source. If 5 / 5 spot-checks UPHOLD,
the original verdict is **robust** (not just thorough).

---

## §1 — 5-site spot-check

### 1.1 — Ottosson gamut mapping (`src/units/color/gamut.ts`)

**Claim.** "Direct port-level comparison of constants vs `ok_color.h`… `gamut.ts`
96–135 — polynomial guess + one Halley step, identical to Ottosson's
reference."

**Test.** Convert sRGB primaries through `srgbToOKLab()` and compare against
Ottosson's published OKLab values for pure (1,0,0) / (0,1,0) / (0,0,1):

| sRGB | Computed OKLab | Reference (Ottosson blog) |
|---|---|---|
| red (1,0,0) | `0.627955  0.224863  0.125846` | `0.627955  0.224863  0.125846` |
| green (0,1,0) | `0.866440 -0.233888  0.179498` | `0.866440 -0.233888  0.179498` |
| blue (0,0,1) | `0.452014 -0.032457 -0.311528` | `0.452014 -0.032457 -0.311528` |

Roundtrip `oklabToLinearSRGB(L_red, a_red, b_red)` → `[1.000000, -0, -0]`.
Red-hue cusp via `findCusp()` → `L=0.6280, C=0.2577` — matches published
red-channel cusp (Ottosson's gamutclipping post Fig. 2).

**Verdict. UPHOLD.** Constants match to 6 decimals; roundtrip identity holds;
cusp matches reference. The audit's claim is correct.

---

### 1.2 — Quaternion slerp (`src/transform/decompose.ts:386–422`)

**Claim.** Shortest-arc correction via `dot < 0 → negate qb`; NLERP fallback at
`dot > 0.9995`; standard sin-weighted formula otherwise.

**Test.** Five inputs, exact arithmetic:

| Input | Expected | Computed |
|---|---|---|
| `slerp(I, I, 0.5)` | `[0, 0, 0, 1]` | `[0, 0, 0, 1]` ✓ |
| `slerp(q, -q, 0.5)` for `q = [0,0,√½,√½]` (shortest-arc test) | same orientation as q | `[0, 0, 0.707107, 0.707107]` ✓ |
| `slerp(I, q_tiny, 0.5)` where `dot ≈ 0.999997 > 0.9995` (NLERP path) | half-rotation | `[0.001250, 0, 0, 0.999999]` matches `[sin(0.0025), 0, 0, cos(0.0025)]` ✓ |
| `slerp(I, q_90°y, 0.5)` (full slerp path) | `[0, sin(π/8), 0, cos(π/8)] = [0, 0.382683, 0, 0.923880]` | `[0, 0.382683, 0, 0.923880]` ✓ |
| `slerp(qa, qb, 0)` and `slerp(qa, qb, 1)` | endpoints | exact ✓ |

**Verdict. UPHOLD.** Shortest-arc, NLERP fallback at the documented threshold,
and the closed-form sin-weighted interpolation all produce exact values to 6
decimals.

---

### 1.3 — `cssLinear()` boundary clamping (`src/easing.ts:25–92`)

**Claim.** Defaults first/last input; linearly interpolates missing inputs;
enforces monotonicity; clamps `t ≤ first.input` and `t ≥ last.input`; binary
search for segment.

**Test.** Stops `[{0@0%}, {0.5@50%}, {1@100%}]`:

| t | Expected (spec) | Computed |
|---|---|---|
| `-0.5` | `0` (clamped) | `0` ✓ |
| `0` | `0` | `0` ✓ |
| `0.25` | `0.25` | `0.25` ✓ |
| `0.5` | `0.5` | `0.5` ✓ |
| `0.75` | `0.75` | `0.75` ✓ |
| `1.0` | `1` | `1` ✓ |
| `1.5` | `1` (clamped) | `1` ✓ |

Asymmetric stops `[{0}, {0.25@75%}, {1}]`:

| t | Expected | Computed |
|---|---|---|
| `0.75` (at stop) | `0.25` | `0.25` ✓ |
| `0.5` (within first segment 0…0.75) | `0.5/0.75 · 0.25 ≈ 0.1667` | `0.16667` ✓ |
| `0.875` (midway in second segment 0.75…1) | `0.625` | `0.625` ✓ |

**Verdict. UPHOLD.** Clamping at both ends works, evenly-distributed inputs
resolve correctly, exact-at-stop returns the stop's output, and intermediate
linear interpolation matches the spec algebra.

---

### 1.4 — `steppedEase()` jump terms (`src/easing.ts:285–302`)

**Claim.** All 4 canonical jump terms (plus 3 aliases) implement
`ceil/floor/floor` over N or N±1.

**Test.** N=4, full input grid:

| t | jump-start (`⌈t·N⌉/N`) | jump-end (`⌊t·N⌋/N`) | jump-none (`⌊t·(N-1)⌋/(N-1)`) | jump-both (`⌊t·(N+1)⌋/(N+1)`) |
|---|---|---|---|---|
| 0 | 0 ✓ | 0 ✓ | 0 ✓ | 0 ✓ |
| 0.1 | 0.25 ✓ | 0 ✓ | 0 ✓ | 0 ✓ |
| 0.3 | 0.5 ✓ | 0.25 ✓ | 0 ✓ | 0.2 ✓ |
| 0.5 | 0.5 ✓ | 0.5 ✓ | 0.333… ✓ | 0.4 ✓ |
| 0.75 | 0.75 ✓ | 0.75 ✓ | 0.666… ✓ | 0.6 ✓ |
| 0.99 | 1 ✓ | 0.75 ✓ | 0.666… ✓ | 0.8 ✓ |
| 1 | 1 ✓ | 1 ✓ | 1 ✓ | 1 ✓ |

All formulas match CSS Easing 1 §3.2 verbatim. **Note.** `jump-both` at exact
t=1 returns 1 (algebraically `⌊5⌋/5 = 1`), whereas the spec's "after-flag"
interpretation says `N/(N+1) = 0.8`. This matches WebKit/Blink behavior when
the easing function is called directly with t=1, not when the timeline
animates to its endpoint. The implementation is **defensible** but borderline;
the audit didn't surface this. Marking it a clarity nit, not a bug.

**Verdict. UPHOLD (with one nit).** All 4 canonical terms compute correctly;
the `jump-both` t=1 case is a spec-interpretation edge that no real consumer
will observe because the WAAPI runtime sources t in `[0, 1)` for stepped
easings.

---

### 1.5 — Hue interpolation 4 methods at wrap (`src/units/color/utils.ts:1049–1083`)

**Claim.** `shorter` / `longer` / `increasing` / `decreasing` per CSS Color 4
§12.4, normalized to [0,1] (hue/360).

**Test.** Two complementary hue pairs across the 360/0 wrap, t=0.5:

| 350° → 10° | shorter | longer | increasing | decreasing |
|---|---|---|---|---|
| Expected (spec) | 0° (short via 0°) | 180° (long via 180°) | 0° (h2+=360 → midpoint of 350 & 370) | 180° (no adj → midpoint of 350 & 10) |
| Computed | 0° ✓ | 180° ✓ | 0° ✓ | 180° ✓ |

| 10° → 350° | shorter | longer | increasing | decreasing |
|---|---|---|---|---|
| Expected | 0° | 180° | 180° (no adj → midpoint of 10 & 350) | 0° (h1+=360 → midpoint of 370 & 350) |
| Computed | 0° ✓ | 180° ✓ | 180° ✓ | 0° ✓ |

NaN handling: `interpolateHue(NaN, 0.5, t, …) → 0.5`; `interpolateHue(0.3,
NaN, t, …) → 0.3`; both-NaN → `0`. Matches CSS Color 4 §12.2 "none" semantics.

**Verdict. UPHOLD.** All 4 methods produce the correct expected midpoint
across the wrap, and asymmetric ordering correctly inverts `increasing` and
`decreasing`.

---

### §1 SCOREBOARD: 5 / 5 UPHOLD.

The "0 correctness bugs" claim is **robust**, not just thorough. The
spot-checks didn't merely repeat the audit's text — they re-derived expected
values from spec language and ran them against the live source. Every site
matches to 6 decimals or exact integer/rational form.

---

## §2 — k-means convergence threshold challenge

**Audit recommendation (P2.1).** Relax `1e-10` → `5e-6`, reasoning: current
threshold is 5000× tighter than JND, drives unnecessary iterations.

**Critique surface.** The audit had no benchmark. "5000× tighter than JND" is
a unit-conversion observation, not a measurement of whether the iterations
ever fire.

**Test.** Instrumented `kmeansIterate` with `maxIterations=10` (the
`DEFAULTS`) across 3 synthetic 141×141 OKLab images:

| Scenario | iters @ 1e-10 | iters @ 5e-6 | speedup |
|---|---|---|---|
| Tight clusters (5 pure colors) | 1 | 1 | 1.0× (both bail immediately) |
| Noisy photo-like (5 cluster centers + ±60/255 noise) | **9** | **3** | **3.0×** |
| Smooth gradient (continuous L,a,b) | 10 (capped) | 10 (capped) | 1.0× (both hit `maxIterations`) |

**Observations.**
- The threshold relaxation **does** save iterations in the realistic
  middle-noise regime — 3× speedup on noisy-photo data, no quality difference
  (Euclidean shift ≈ 2.7e-3 in OKLab at iter 3 is ~10× below JND).
- For tight clusters the optimization is moot (1 iter either way).
- For gradients the binding constraint is `maxIterations=10`, not the
  threshold; relaxing 1e-10 → 5e-6 changes nothing because neither converges
  within the iteration budget.

**Verdict. PARTIALLY UPHOLD.** The recommendation is *not* premature
optimization — there's a real 3× win on realistic noisy images — but the
audit did not supply the empirical evidence. Adding the benchmark is the
gating step; the per-image speedup is real but conditional on image
character. **The audit should be amended to (a) cite the benchmark and (b)
note that the gradient case is bound by `maxIterations`, so relaxing the
threshold without raising `maxIterations` leaves the gradient case unchanged
— a coupled tuning question, not a single-knob fix.**

---

## §3 — `test/decompose.test.ts` (P1) gap re-evaluation

**Audit claim.** "No dedicated `test/decompose.test.ts`. Round-trip identity
… is **untested**. P2." (Section 4.3, later promoted to P1 in §5.)

**Spot-check.** `test/refactor-fixes.test.ts` already contains:

- `describe("Matrix decomposition round-trip")` (lines 221–355)
- 2D decompose: identity, translation, 90° rotation (3 cases)
- 3D decompose → recompose: identity, rotation+translation (2 cases)
- `slerp` (3 cases): I→90°z at t=0.5 = 45°z; t=0 = qa; t=1 = qb.

**Reality check.** The coverage gap is **smaller than the audit implies**.
Existing tests cover identity, translation, rotation+translation, and three
slerp edge cases. **Missing:** scale-only, skew-only, perspective, full
compose (R × S × Sk × T × P), non-trivial quaternion sign branches (`m00 >
m11 > m22`, `m11 > m22`, `m22` largest).

**Verdict.** P1 is **partly insurance theater, partly real**. The "no
dedicated test file" framing was misleading — the audit should have
inventoried `refactor-fixes.test.ts` first. The remaining gap is genuine
(perspective is untested, the 4 quaternion-extraction branches are not
individually exercised) but ~50% of the work is already done. The
recommendation should be **rewritten** as: "extend
`refactor-fixes.test.ts::Matrix decomposition round-trip` (or extract to
`test/decompose.test.ts`) with scale-only, skew-only, perspective, full
compose, and all 4 quaternion-extraction branches." Effort ~40 LoC, not ~80.

---

## §4 — Missed math sites

### 4.1 — `src/units/color/colorFilter.ts` SPSA optimizer (305 LoC) — **NOT AUDITED**

The audit's §1 inventory omits this file entirely. SPSA (Spall, 1992) is a
stochastic numerical optimization algorithm. The implementation:

- 6-parameter perturbation with `±1` random deltas (line 208 — `Math.random()
  > 0.5 ? 1 : -1`).
- Learning-rate decay `ak = a[i] / (A + k + 1)^α` with `α = 1` (lines
  217–218).
- Perturbation decay `ck = c / (k+1)^γ` with `γ = 1/6` (line 206).
- Wide solve (3 restarts of 1000 iters) → narrow solve (500 iters).

**Concerns:**
1. `Math.random()` — same non-determinism observation as `kmeansPlusPlusInit`
   (§3.8 in the audit). Should be flagged consistently.
2. The hue-rotate matrix (lines 57–67) uses the classic SVG `0.143/0.14/0.283`
   constants. These are W3C SVG `<feColorMatrix>` matrix recipe values —
   approximations, not exact color preservation. Browsers implement these
   approximations too, so the solver fitting against them is consistent — but
   the audit should note this as a "matches-CSS-by-design" not a math bug.
3. SPSA convergence depends on `A`, `a`, `c`, `α`, `γ` tuning. The chosen
   values produce loss ≈ 25 (line 266) as the wide-solve target — empirical
   tuning, no convergence proof.

**Classification: COVERAGE GAP.** P3 — file is well-tested at the I/O level
(`test/color-filter.test.ts`) but the optimizer internals are not audited
against the SPSA paper.

### 4.2 — `src/math.ts::logerp` edge case (line 33–37) — **MINOR**

```ts
export function logerp(t, start, end) {
    start = start === 0 ? 1e-9 : start;
    return start * Math.pow(end / start, t);
}
```

If `end <= 0` and `start > 0` (or vice versa), `Math.pow(negative, non-integer)`
returns NaN. The function silently produces NaN for any mixed-sign endpoint
pair. The audit didn't surface this; not a correctness bug because all
in-tree callers pass positive values, but the function lacks a domain
precondition. **Classification: CLARITY P3.**

### 4.3 — `src/transform/decompose.ts::mat4Multiply` row/column convention — **VERIFIED CORRECT**

Triple-nested loop (lines 120–132) implementing column-major matrix multiply.
Cross-checked: for column-major `A`, `B`, `C = A·B` computes
`C[col*4 + row] = Σ_k A[k*4 + row] · B[col*4 + k]`. The code reads `A[k*4 +
row] * B[col*4 + k]` and writes to `result[col*4 + row]`. **Matches.** Not a
new finding; the audit dismissed this as COLD, which is correct.

### 4.4 — Gram-Schmidt orthogonalization sign of row0 — **VERIFIED**

In `decomposeMatrix3D` step 11 (line 314–319), the coordinate-flip test is
`cross(row1, row2) · row0 < 0`. The audit cites Graphics Gems II "Unmatrix"
for this; I confirmed the original Unmatrix algorithm uses exactly this dot
sign as the determinant-of-rotation indicator. Correct.

### 4.5 — Audit-prompt-supplied JND number — **AUDIT'S CORRECTION IS CORRECT**

The audit prompt said "OKLab ΔE ~ 2 for JND". The audit caught this: **ΔE_ab
~ 2.3** is the CIELAB JND figure from Sharma (2017) / Hill (1997). OKLab's
JND, per Ottosson's own blog ("A perceptual color space for image
processing"), is approximately `0.01–0.02` in OKLab's [0,1] L-scale. The
code's `DELTA_E_OK_JND = 0.02` is correct, and the audit's correction of the
prompt is correct.

---

## §5 — Post-challenge synthesis

| Verdict | Detail |
|---|---|
| **5/5 spot-checks UPHOLD** | Ottosson, slerp, cssLinear, steppedEase, hue interp — all exact to 6 decimals against spec language. |
| **k-means threshold: PARTIAL UPHOLD** | Recommendation has real merit (3× speedup on noisy images), but audit was missing the benchmark. Coupling with `maxIterations=10` not discussed. |
| **decompose test P1: REDUCED** | `refactor-fixes.test.ts` already covers ~50% of the cases. Remaining gaps: scale, skew, perspective, full compose, all 4 quaternion branches. P1 effort halved. |
| **Missed site: `colorFilter.ts` SPSA** | 305 LoC not audited. Determinism + SPSA paper alignment needs review. P3. |
| **Missed minor: `logerp` mixed-sign** | NaN on negative endpoints. Not bug — no consumer hits this. P3. |
| **Audit-prompt JND correction** | Correct: OKLab JND is 0.02 (not 2). |
| **Overall** | The 0-bugs claim survives adversarial spot-checking. The audit underspecified its k-means benchmark, overcounted the decompose gap, and missed `colorFilter.ts` from its inventory. |

**Net.** The audit is **substantively correct** but should be **amended**
with: (a) the k-means benchmark numbers above; (b) acknowledgement that
`test/refactor-fixes.test.ts` already covers half the decompose round-trip
matrix; (c) inclusion of `colorFilter.ts` in the audited surface.
