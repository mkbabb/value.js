# O.W3 — Color-math zero-alloc

- **Band:** B · **Class:** perf / zero-alloc · **Dep:** O.W2 (the subpath split must be
  authored first — O.W3 imports from the `./color` subpath, not from the root barrel; the
  bench also gates on a built `dist/color.js`) · **Gate (new):** `proof:gamut-alloc`
- **Folds (campaign lanes):** CONSTELLATION-CAMPAIGN §3 O.W3 (color-math zero-alloc:
  `gamutMapToRgbSpace` scalar bisection, `transformMat3Into` out-param, JND early-exit,
  kf-side co-bench); the MEASURE-FIRST gate discipline (CAMPAIGN §0 born-RED law)
- **Precept cures:** no-legacy (the probe-closure allocation per bisection step), KISS
  (scalar-only operations replace the Object-allocating `probe` closure)

---

## Context

The `gamutMapToRgbSpace` hot path (`src/units/color/dispatch.ts:223`) runs on every
wide-gamut animation frame — any `display-p3`, `rec2020`, `a98-rgb`, `prophoto-rgb`, or
`srgb-linear` egress that is out-of-gamut routes here. Its current implementation
allocates **2 + CHROMA_SEARCH_STEPS Color objects** per call:

```
gamutMapToRgbSpace (verified live, src/units/color/dispatch.ts:223-257)
  color2(color, "oklch")          → 1 OKLCHColor       [always]
  probe() closure, 24 iterations:
    new OKLCHColor(L, c, H, alpha)  → 24 OKLCHColor    [loop]
    color2(candidate, target)       → 24 Color (egress) [loop]
  new OKLCHColor(L, lo, H, alpha)   → 1 OKLCHColor     [final]
  color2(mapped, target)            → 1 Color (egress)  [final]
  new <EgressClass>(…)              → 1 Color           [clamp]
  color2(clamped, color.colorSpace) → 1 Color           [back]
─────────────────────────────────────────────────────────────────
TOTAL:  ≥ 52 Color allocs/call   (24×2 loop + 5 bookend)
```

The CSS Color 4 §13.2 bisection's inner loop (`probe(mid)`) allocates two objects per step
purely to satisfy the OO interface — the underlying math is scalar-only
(L,C,H → RGB component extraction). The bisection needs three numbers out of each probe; it
does not need a heap-allocated Color pair.

The kf-side `lerpColorValue` path (`src/units/interpolate.ts`) drives `mixColors` per frame
for every color keyframe pair. `mixColors` itself (dispatch.ts:391) calls `color2` on both
inputs — two Color allocations before interpolation starts — and then creates a `new
ResultClass(…resultComponents, resultAlpha)` for the output. The kf-side pattern is
measurement-first: the co-bench (`bench/color-alloc-hotpath.mjs`, S1) must be authored
before any cure is scoped, and the `mixColors` path is included there.

Three surgical targets emerge in ROI order:

1. **`gamutMapToRgbSpace` scalar bisection** — kills 48 of the ~52 per-call allocs (the
   loop body) by hoisting the L/H scalars out of `probe()` and computing RGB components
   inline without Color wrappers. The `color2(oklch → target)` dispatch is replicated
   inline for the sRGB case (already present as `directOklchToRgb` in `direct.ts`) and
   via a module-scoped scratch OKLCHColor for the non-sRGB case.

2. **`transformMat3` out-param variant** — `matrix.ts:19` currently returns a new
   `[number,number,number]` tuple per call. A `transformMat3Into(v, m, out)` out-param
   variant writes into a caller-owned `Vec3` (module-scoped scratch in
   `conversions/oklab.ts`). The two `transformMat3` calls in `oklab2xyz` + `xyz2oklab`
   (four hot XYZ-hub paths) each save one tuple allocation.

3. **JND early-exit in `gamutMap`** — `dispatch.ts:269` already has an in-gamut fast-path
   (line 285). Adding a second fast-path: if the color is already close to in-gamut
   (within `DELTA_E_OK_JND = 0.02`) in OKLab, skip the full bisection and clamp. This
   is the CSS Color 4 §13.2 local-MINDE break applied to the value.js egress path — a
   perceptually correct early exit (a difference < JND is imperceptible; the bisection
   would converge to a result indistinguishable from a clamp anyway).

The scope boundary is tightly drawn: this wave rewrites **the allocation budget of the
color-math hot paths**, not the color science (which is N.W11's territory). Corrections to
`gamutMapToRgbSpace` from O.W3 must be numerically equivalent to the current implementation
within floating-point epsilon (the bench oracle verifies this).

---

## Scope

Each S-clause is a concrete, falsifiable deliverable.

### S1 — The born-RED bench exists and establishes baselines
  (`bench/color-alloc-hotpath.mjs`)

**Breach.** No allocation bench exists for `gamutMapToRgbSpace` or the `mixColors` rAF
path today (verified: `ls bench/` — the existing benches cover channel-access, direct-paths,
parser-namelookup, computed-endpoint, and color-interp; none measures Color alloc counts per
call through the gamut-map path). The MEASURE-FIRST discipline (CAMPAIGN §0 born-RED law)
requires the gate be born-RED on the current tree, not authored against a known-good N.

**Deliverable.** `bench/color-alloc-hotpath.mjs` — a Node.js measurement harness that:

- Uses a lightweight alloc-count shim: patches the OKLCHColor / RGBColor / OKLABColor /
  XYZColor constructors at module level, increments a counter, then restores. No external
  heap profiler dependency — a pure JS constructor-count approach, suitable for
  `node ≥ 22`, that runs in the same process as the built dist.
- Measures `gamutMapToRgbSpace` alloc/call baseline over 100 cold calls on a known
  out-of-gamut `display-p3` color (e.g. `color(display-p3 1.2 0.3 0.5)`).
- Measures `mixColors` alloc/call baseline over 100 cold calls on an oklch→oklch pair.
- Records `sampleColorRamp(from, to, 16)` alloc total (the N.W11.D ramp path; included
  because the kf-K.W10 CC-2 consumer drives ramps on every keyframe densify).
- Prints a structured baseline table: `{scenario, allocsPerCall, allocTypes}`.
- **Exits 1** (born-RED today) because the bench verifies the threshold `N` against
  the POST-CURE targets — which are not yet met on the current tree.

**Falsifiable check.** `node bench/color-alloc-hotpath.mjs` exits 1 on today's tree
(no cure applied yet — the observed `gamutMapToRgbSpace` alloc count, nominally ≥ 52,
exceeds the gate threshold). The EXACT threshold `N` for `proof:gamut-alloc` is
**derived from this baseline run** (CAMPAIGN §0: "< N Color allocs/call, N from baseline"),
not pre-specified — the baseline run on `dist/value.js` before any O.W3 code lands is the
source of `N`. The spec does not hard-code `N`; the gate does.

**kf-side co-bench.** The same measurement harness includes a `mixColors`-driven section
that exercises the kf animation interpolation path: a simulated 60fps rAF loop for 1000
frames, measuring total Color allocs / wall-clock ms. This is the CAMPAIGN O.W3 "kf-side
color-interp co-bench" deliverable. It runs from `bench/color-alloc-hotpath.mjs`; the kf
repo does not need a symmetric bench for this wave.

### S2 — `gamutMapToRgbSpace` scalar bisection rewrite (highest ROI)

**Breach (verified live, `src/units/color/dispatch.ts:223-257`).**
The `probe` closure (line 231) wraps `new OKLCHColor(L, c, H, alpha)` + `color2(candidate,
target)` — two Color heap allocations per bisection step — for 24 steps
(`CHROMA_SEARCH_STEPS = 24`). The closure returns a `{ r, g, b }` object literal as a
third allocation per step. Total: ~72 allocations in the loop alone (24 × 3), plus the 5
bookend allocations.

**Cure.** Replace `gamutMapToRgbSpace` with a scalar implementation:

1. Hoist `L`, `H`, and the initial OKLCh→target conversion scalars from the `probe`
   closure. The only variable per probe step is `c` (the chroma trial value).
2. For the sRGB target path: use `directOklchToRgb` (`direct.ts:127`) — already
   implemented, produces three raw `r,g,b` numbers without a persistent Color heap
   object. Since `directOklchToRgb` returns a new `RGBColor`, the further optimization
   is to inline its scalar core (L/c/H → r,g,b scalars) directly into the bisection loop.
   This is justified because the function is small, pure arithmetic, and the inline is
   guarded by the sRGB branch already present in `gamutMap` (`dispatch.ts:301`).
3. For non-sRGB wide-gamut targets: allocate ONE module-scoped scratch `OKLCHColor`
   (`_scratchOKLCH`). In the bisection loop, mutate its `l`, `c`, `h`, `alpha` fields in
   place and call `color2(_scratchOKLCH, target)` — one reused Color object replaces
   24 new ones. The `color2` result is read for `r`, `g`, `b` scalars immediately and
   discarded; the result Color IS an allocation, but it is one per step (not two) and can
   be further eliminated with a future `color2Into` out-param variant (deferred — out of
   O.W3 scope).
4. Replace the bookend `new OKLCHColor(L, lo, H, alpha)` + `color2(mapped, target)` with
   the same scalar path (sRGB inline / non-sRGB scratch reuse).

**Numerical equivalence.** The scalar path is arithmetically identical to the Object path —
same coefficients, same order of operations. The bench oracle (S1) verifies
`Math.abs(scalarR - objectR) < 1e-10` for all test inputs.

**Falsifiable check.** After the cure: `node bench/color-alloc-hotpath.mjs` exits 0 for the
`gamutMapToRgbSpace` scenario — alloc count per call drops to ≤ 6 (the bookend Color allocs
that remain after the loop is de-allocated: the `color2(color, "oklch")` source lift, the
final result Color, and the clamped-clamp Color). The gate threshold `N` (from S1 baseline)
is satisfied. `npm run test` still passes (the existing color conversion tests verify
numerical equivalence end-to-end).

### S3 — `transformMat3Into` out-param variant + module-scoped scratch Vec3

**Breach (verified live, `src/units/color/matrix.ts:19`).**
`transformMat3(v, m)` returns `[m[0]*x+…, m[3]*x+…, m[6]*x+…]` — a new `[number,number,number]`
tuple per call. The two callers in `conversions/oklab.ts`:
- `oklab2xyz` line 45: `const lms = transformMat3([l, a, b] as Vec3, OKLAB_TO_LMS_MATRIX)` —
  allocates an input Vec3 AND captures the output Vec3.
- `xyz2oklab` line 61: `const lmsLinear = transformMat3([x, y, z] as Vec3, XYZ_TO_LMS_MATRIX)` —
  same pattern.

Each of these four call sites (input + output) allocates a tuple. The two `oklab.ts`
functions are on the XYZ-hub hot path for every conversion that routes through OKLab/OKLCH.

**Cure.** Add `transformMat3Into(v: Vec3, m: Mat3, out: Vec3): Vec3` to `matrix.ts` —
writes the result in-place into `out` and returns `out`. Add two module-scoped
`const _scratch{A,B}: Vec3 = [0, 0, 0]` in `conversions/oklab.ts` (pre-allocated,
never reallocated). Rewrite `oklab2xyz` and `xyz2oklab` to use `transformMat3Into` +
the scratch buffers instead of allocating input/output tuples:

```ts
// Before (oklab2xyz — 2 Vec3 allocs per call)
const lms = transformMat3([l, a, b] as Vec3, OKLAB_TO_LMS_MATRIX);
const [x, y, z] = transformMat3(lmsLinear, LMS_TO_XYZ_MATRIX);

// After (0 Vec3 allocs)
_scratchA[0] = l; _scratchA[1] = a; _scratchA[2] = b;
transformMat3Into(_scratchA, OKLAB_TO_LMS_MATRIX, _scratchB);
_scratchB[0] = _scratchB[0] ** 3; /* … */ // cube in place
transformMat3Into(_scratchB, LMS_TO_XYZ_MATRIX, _scratchA);
```

**Re-entrancy.** `transformMat3Into` writes into a caller-owned buffer; the module-scoped
scratch approach is safe in the value.js rAF context because JS is single-threaded AND
`oklab2xyz`/`xyz2oklab` never re-enter themselves (they are leaf functions; no
sub-call touches these scratch buffers). This is the same re-entrancy argument the
`ANIMATION_SCRATCH` string buffer in `units/color/index.ts:75` already relies on.

**Scope.** Only `oklab2xyz` and `xyz2oklab` are modified. The other `conversions/*.ts`
callers (`cylindrical.ts`, `lab.ts`, `xyz-extended.ts`) retain `transformMat3` — they are
not on the OKLab/OKLCH rAF hot path and the refactor is KISS-bounded to the ROI sites.

**Falsifiable check.** `npm run test` passes (matrix operations are numerically identical).
`bench/color-alloc-hotpath.mjs` shows reduced Vec3 alloc count on the XYZ-hub scenario
(included as a secondary measurement in S1 alongside the Color-alloc primary). A
`grep "new \[" src/units/color/conversions/oklab.ts` → 0 (no inline tuple literals remain
in the two hot functions).

### S4 — JND early-exit in `gamutMap` (CSS Color 4 §13.2 local-MINDE break)

**Breach.** `gamutMap` (`dispatch.ts:269`) has an in-gamut fast-path (lines 285 and 291) but
no JND early-exit. A color that is very slightly out-of-gamut (e.g. `r=1.005`) currently
routes through the full bisection path (`gamutMapToRgbSpace`) even though the perceptual
difference between it and a clamped-to-gamut version is zero at any observable display.

**Cure.** Add a third fast-path in `gamutMap` before the bisection branch: convert the
color to OKLab and measure `deltaEOK` between the as-is OKLab and the gamut-boundary OKLab
of the clamped version. If `deltaEOK < DELTA_E_OK_JND` (0.02, `gamut.ts:51`) — the
difference is sub-JND — clamp directly without bisection. This is the CSS Color 4 §13.2
"local-MINDE" convergence break condition applied as an early-exit gate: the spec says stop
bisecting when `deltaEOK(current, boundary) < 2` (in ΔE2000 on a 0–100 scale; translated
to OKLab Euclidean ≈ 0.02 — `DELTA_E_OK_JND` is already the canonical constant).

**Scope.** The fast-path is inserted AFTER the current `rgbInGamut(r,g,b,GAMUT_EPSILON)`
clamp-only path and BEFORE the `gamutMapToRgbSpace` dispatch. It does NOT affect:
- the sRGB branch (line 301) — Ottosson's analytical map is already zero-iteration;
- the in-gamut path (line 285) — a color already in gamut never reaches this code.

The new path triggers only for colors that are out-of-gamut-but-close in BOTH the display
gamut AND OKLab space — the typical FP-overshoot case from wide-gamut color arithmetic.

**Falsifiable check.** A unit test in `test/color-gamut.test.ts` (new or amended): a color
with `r=1.001, g=0.999, b=0.998` (mildly out of sRGB by FP arithmetic) routes through the
JND fast-path and the result is within `DELTA_E_OK_JND` of the full-bisection result.
`bench/color-alloc-hotpath.mjs` shows the JND-eligible scenario costs 0 bisection
iterations (alloc count matches the fast-path baseline, not the bisection baseline).

### S5 — `proof:gamut-alloc` gate exists and is born-RED on today's tree

**Breach.** No `proof:gamut-alloc` script exists in `package.json` today (verified:
`grep "proof:gamut-alloc" package.json` → empty). The gate is ABSENT — a structural gap
the CAMPAIGN mandates filling (born-RED gate law: every wave authors its gate first).

**Deliverable.** `scripts/proof-gamut-alloc.mjs` — a thin gate script that:

1. Imports the built `dist/color.js` (or the O.W2 subpath output — the exact import path
   depends on O.W2's multi-entry output; the gate must be updated to consume the correct
   built artifact).
2. Runs the same constructor-count shim as S1 (`bench/color-alloc-hotpath.mjs`).
3. Asserts `gamutMapToRgbSpace` alloc/call < `N` (where `N` = the S1 baseline, stored as a
   constant in the script once measured, e.g. `const GAMUT_ALLOC_THRESHOLD = N_BASELINE_MINUS_1`).
4. Exits 0 (PASS) iff the assertion holds; exits 1 otherwise.

`package.json` gains `"proof:gamut-alloc": "node scripts/proof-gamut-alloc.mjs"`.

**Today's tree result.** `proof:gamut-alloc` exits 1 (born-RED) because:
- `scripts/proof-gamut-alloc.mjs` does not exist (the script is absent — the gate cannot
  run = failure), AND
- once S1's baseline is measured, the observed alloc count on the current tree (≥ 52 for
  `gamutMapToRgbSpace`) exceeds the post-cure threshold.

**Green condition.** S2 (scalar bisection) + S3 (Vec3 scratch) + S4 (JND early-exit) are
implemented; `node scripts/proof-gamut-alloc.mjs` exits 0; `npm run test` is green.

---

## Born-RED gate

**Gate name:** `proof:gamut-alloc` (NEW).
**Tier:** hygiene (a node gate — no browser; added to `proof:hygiene` membership).

**The REAL observable.** The proxy to AVOID: asserting "the `probe` closure is gone from
`dispatch.ts`" (a source-shape check that an equally-allocating rewrite could pass while
still producing the same alloc count). The gate must bite the ACTUAL failure mode —
*"a per-frame gamut-map call allocates N Color objects, pressuring the GC in the rAF loop."*

**Structure.** `scripts/proof-gamut-alloc.mjs` (S5):

| Clause | Mechanism | Today | After cure |
|---|---|---|---|
| C1 — gamutMapToRgbSpace alloc | constructor-count shim; 100 calls on OOG display-p3 color | ≥ 52 allocs/call (exits 1) | < N (exits 0) |
| C2 — sampleColorRamp alloc | constructor-count; 16-stop ramp | measured baseline | within expected budget |
| C3 — mixColors alloc | constructor-count; 60fps×1000 frame sim | measured baseline | within expected budget |
| C4 — numerical equivalence | scalar path result vs object path result, Euclidean distance in OKLab < 1e-10 | n/a (cure absent) | passes |
| C5 — test suite still green | `npm run test` exits 0 | baseline green | green |

**Today's tree result.** `proof:gamut-alloc` exits 1 by construction: the script does not
exist (C1–C4 cannot run), and even if run against the current dist, C1 fails (alloc count
≥ 52 >> N).

**Why this is the genuine defect, not a proxy.** C1 runs the REAL `gamutMapToRgbSpace` from
the REAL built dist against a REAL Color object and counts REAL constructor calls via the
shim. No source-grep, no file-presence check — the gate runs the runtime and reads the
output. A scalar rewrite that still allocates via a different mechanism (e.g. intermediate
tuple) fails C1. An in-gamut color that never enters the function trivially exits the fast
path and produces 0 loop allocs — C1 is the binding instrument over the genuine rAF
scenario.

---

## Dependencies

- **O.W1 / O.W2 (structural pre-work + subpath build).** `proof:gamut-alloc` imports from
  the built `./color` subpath. O.W2 must produce a built `dist/color.js` before this gate
  can run. O.W3's implementation work (S2–S4) is value.js-internal and can be authored in
  parallel with O.W2 — only the GATE (S5) is O.W2-gated. If O.W2 lands after O.W3 source
  work, the gate can temporarily import from the root `dist/value.js` and is re-pointed at
  the subpath output when O.W2 lands.
- **N.W11 (value.js — gamut policy).** O.W3 is NUMERICALLY NEUTRAL with respect to
  N.W11's gamut-policy re-anchor. O.W3 rewrites the ALLOCATION pattern of `gamutMapToRgbSpace`
  without changing its POLICY (the Ottosson adaptive-L0 α and cusp anchoring are unchanged
  here). N.W11 is the policy wave; O.W3 is the alloc wave. They commute cleanly: apply
  N.W11's cusp re-anchor to the scalar bisection body of O.W3's rewrite and both improvements
  are in effect simultaneously.
- **kf-M (downstream consumer).** The kf-side `color-interp co-bench` in S1 targets the
  `mixColors` rAF path used by `lerpColorValue`. No kf source changes in O.W3 — this is
  a measurement-only deliverable on the value.js side.

---

## DAG position

```
O.W1 (parse-that edge sever + lazify) ──►  O.W2 (subpath build + exports map)
                                                    │
                                              ┌─────┘
                                              ▼
               O.W3 (color-math zero-alloc) — can author S2–S4 in parallel;
                     gate S5 re-pointed at the O.W2 subpath artifact at O.W2 merge
```

O.W3 is parallel to O.W4/O.W5/O.W6 (grammar waves). O.W3 → kf-M.W9/W10/W11 (the consume
edge — a published `./color` subpath with the zero-alloc path is what kf-M consumes).

---

## Bite — what regression each clause catches

| Clause | Regression it prevents |
|---|---|
| S1 bench + baseline | Prevents the "we optimized the source but the alloc count didn't change" trap — forces measurement before claim |
| S2 scalar bisection | A future rewrite of `gamutMapToRgbSpace` that re-introduces a per-iteration Color allocation (e.g. "just one per step") — C1 bites the runtime alloc count |
| S3 Vec3 scratch | A refactor of `oklab2xyz`/`xyz2oklab` that reallocates the scratch or returns a new Vec3 — the secondary alloc count in S1 catches it |
| S4 JND early-exit | A removal of the early-exit causing the bisection to run on sub-JND colors (regressing GC pressure on the epsilon-overshoot case) |
| C4 numerical equiv | A scalar rewrite that introduces a floating-point ordering error (e.g. fused-multiply-add in a different grouping) accumulating > 1e-10 error |
| C5 test suite green | A refactor of the conversion pipeline that changes behavior while reducing allocs — the existing color conversion test corpus catches it |

---

## Excluded from this wave

- **`mixColors` alloc cure (the Color-per-frame output).** `mixColors` allocates a `new
  ResultClass(…)` per call (dispatch.ts:459). Making this zero-alloc requires an out-param
  `mixColorsInto(c1, c2, p1, p2, space, hueMethod, out: Color)` API — a public-surface
  change that belongs in O.W5 (semantic-idempotence + API hardening) or a dedicated
  O.W-MIXCOLORS wave. O.W3 MEASURES this path (S1 C3) to establish the baseline; it does
  NOT cure it. Deferred, not dropped.
- **`color2` out-param (`color2Into`).** The XYZ-hub `color2` path allocates on every call.
  An `Into` variant would eliminate those. Same scope argument — public API surface, O.W5
  territory. O.W3's scalar bisection rewrite avoids most `color2` calls in the loop; the
  residual is measured and recorded.
- **The wide-gamut `xyz2displayP3` / `xyz2rec2020` clampless path** (the N.W11 lane-C
  hole in `xyz-extended.ts:149-221`). That is a correctness fix (values silently exceeding
  `[0,1]`), not an allocation fix. N.W11 owns it.
- **`gamutMapOKLab` (the sRGB analytical map in `gamut.ts:247`).** The Ottosson analytical
  path (`gamutMapSRGB`) calls `srgbToOKLab` + `gamutMapOKLab` + `oklabToLinearSRGB` +
  `linearToSrgb` — all operating on raw scalar tuples (the `[number,number,number]` return
  from the `gamut.ts` freestanding functions, not Color objects). This path has NO Color
  object allocations — it is already zero-alloc at the Color level. O.W3 does not modify
  `gamut.ts` (no ROI).
- **Conversion paths outside OKLab/OKLCH** (`cylindrical.ts`, `lab.ts`, `xyz-extended.ts`).
  These are not on the rAF hot path for the kf animation use-case (kf interpolates in OKLab
  or OKLCH by default) and the KISS principle bounds the scope to the measured ROI.
