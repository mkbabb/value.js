# boundary-api — `sampleGamutBoundary` library-API design packet (Pass 2, seed 5)

**Lane**: boundary-api · 2026-07-02 · branch `tranche-q` @ `e80b359` (1.2.0)
**Charter**: PASS1-VERDICT §5 P1-#10 + §7 seed 5 — commit F8.1's either/or (export matrices vs ship the API) to the API; spec the exact surface, zero-alloc `Into` variant, matrix visibility, perf contract, test plan, landing wave.
**Grounding**: `scratchpad/pass1/proto-gamut-overlay.md` (F1/F2/F6/F7/F8, geometry spec, measurements) · the prototype's working implementation at `.claude/worktrees/wf_a8d3e05b-52e-11/sandbox/gamut-overlay/geometry.ts` · `src/units/color/gamut.ts` · `src/units/color/conversions/xyz-extended.ts` · `src/units/color/dispatch.ts:258-321` (`color2Into` idiom) · `src/subpaths/color.ts` (O.W2 parse-that-ZERO subpath).

---

## §0 — Verdict

**Ship the API, not the matrices.** One new module `src/units/color/boundary.ts` beside `gamut.ts`, exporting exactly two functions and four types. The per-space RGB↔XYZ matrices become **package-internal exports** of `conversions/xyz-extended.ts` (visible to `boundary.ts`, absent from every barrel) — the public surface stays geometry-only. **Landing wave: R.W1**, inside the 2.0.0 cut (additive — it does not *require* the major; it rides R.W1 because that is the tranche's only publish event before R.W3 consumes; §7). The ColorInput gamut-verdict echo needs **zero new exports** — its verdict rides the already-public `gamutMapOKLab`/`deltaEOK`/`DELTA_E_OK_JND` (`src/subpaths/color.ts:120-134`); the shared substance of "one field, two consumers" (F2) is the JND constant and the Ottosson map, both public since O.W2.

---

## §1 — Module and placement

```
src/units/color/boundary.ts        # NEW — the sampler + its field (est. ~190 LoC)
src/units/color/gamut.ts           # +2 Into companions (srgbToOKLabInto, gamutMapOKLabInto), ~55 LoC
src/units/color/conversions/xyz-extended.ts  # matrices: const → export const (5 identifiers, 0 new LoC)
src/subpaths/color.ts              # barrel: +2 fns, +4 types
src/index.ts                       # root barrel: same additions
test/gamut-boundary.test.ts        # NEW (§8)
```

`boundary.ts` imports only from `units/color/*` (`conversions/transfer`, `conversions/xyz-extended`, `matrix`, `gamut`, `constants`) — the `./color` subpath's parse-that-ZERO invariant (`src/subpaths/color.ts:4-7`) holds by construction. It deliberately does **not** import `conversions/cylindrical.ts` — the class-based `hsv2xyz` (`cylindrical.ts:175`) allocates wrappers and speaks normalized channels; the sampler carries a module-private scalar `hsvToRgbInto` (the prototype's `geometry.ts:83-101`), the same inline-to-avoid-baggage precedent as `gamut.ts:22-46`'s inlined sRGB transfer.

## §2 — Public signature (exact)

```ts
/** The wide RGB-family spaces whose sRGB excess the sampler measures. */
export type GamutBoundaryTarget =
    | "display-p3"
    | "a98-rgb"
    | "prophoto-rgb"
    | "rec2020";

/**
 * "jnd" (default) — the perceptual locus: ΔE_OK(wide, gamutMapOKLab(wide)) >
 * DELTA_E_OK_JND ("sRGB clipping of this coordinate is VISIBLE" — F2, the
 * drawn instrument line). "raw" — exact cube-membership excess > 1e-6 (the
 * mathematically-true locus; for captions/diagnostics — F2 REFUTED it as the
 * drawn line: it permanently hugs the top edge for any strictly-wider target).
 */
export type GamutBoundaryMode = "jnd" | "raw";

export interface SampleGamutBoundaryOptions {
    /** s-axis intervals across the square (samples = columns+1). Integer ≥ 2; default 96. */
    columns?: number;
    /** default "jnd" */
    mode?: GamutBoundaryMode;
}

export interface GamutBoundary {
    /**
     * Interleaved [s0,v0, s1,v1, …] polyline in UNIT-SQUARE coordinates:
     * s ∈ [0,1] rightward (HSV saturation), v ∈ [0,1] UPWARD from black
     * (HSV value — v=1 is the top edge; canvas y = (1−v)·height is the
     * consumer's affair). Point 0 is the tip on the top edge; subsequent
     * points are per-column roots, s strictly increasing, ending at s=1.
     * Capacity is 2·(columns+2); only the first 2·count entries are valid.
     */
    points: Float64Array;
    /** valid point count. 0 ⇔ the whole square renders inside sRGB (absence is content — F3). */
    count: number;
    /** fraction of the top edge outside the locus (1 − tipS); 0 when count === 0. The breathing metric. */
    oogTopFrac: number;
}

/** Allocating form — constructs a GamutBoundary sized to `columns` and delegates to the Into form. */
export function sampleGamutBoundary(
    hueDeg: number,
    target: GamutBoundaryTarget,
    options?: SampleGamutBoundaryOptions,
): GamutBoundary;

/**
 * Zero-alloc out-param twin (the color2Into / mixColorsInto / transformMat3Into
 * idiom — dispatch.ts:258, :690; matrix.ts). Writes into the caller-owned `out`
 * (typically the object a prior sampleGamutBoundary call returned), sets
 * out.count / out.oogTopFrac, returns `out`. Requires
 * out.points.length ≥ 2·(columns+2) — throws RangeError otherwise.
 * `out` MUST be caller-owned; single-threaded re-entrancy per the
 * dispatch.ts:231-238 scratch argument (the sampler never re-enters itself).
 */
export function sampleGamutBoundaryInto(
    hueDeg: number,
    target: GamutBoundaryTarget,
    out: GamutBoundary,
    options?: SampleGamutBoundaryOptions,
): GamutBoundary;
```

The demo's rAF loop allocates once (`sampleGamutBoundary` on mount) and rides `sampleGamutBoundaryInto` per hue/space change thereafter — the exact seed/reuse split `gamutMapToRgbSpace` uses for its egress scratch (`dispatch.ts:397-410`).

### Contracts, edge and NaN semantics

- **Column count**: `columns` is the interval count; the top edge is probed at `columns+1` samples; **`count ≤ columns + 2`** always (tip + at most `columns+1` column roots). Non-integer or `< 2` → `RangeError` (fail-fast; no silent clamping). Default 96 per the validated geometry spec (proto §"Geometry spec"; 64 is visually indistinguishable if a consumer wants cheaper — F7).
- **Empty locus**: `count = 0`, `oogTopFrac = 0`, `points` untouched. **No NaN sentinels** — emptiness is a count, not a poisoned coordinate. (Verified honest at hue 240 / display-p3 — zero contour, "sRGB holds every blue this square can name", F3.)
- **Non-finite `hueDeg`** (the CSS `none` hue): returns the empty boundary. This is the *defined* behavior, not an accident — a `none` hue is achromatic, greys never leave sRGB, and the NaN-poisoned field comparisons (`NaN > 0 === false`) produce exactly that result with zero branching. Finite hues wrap mod 360.
- **Degenerate columns** (F7's ≤8% monotonicity violations, all AT the JND threshold): the single per-column bisection stands (proto F7 — the missed sliver is imperceptible by definition); columns whose span re-enters gamut yield a root within 2⁻¹⁴ of the true first crossing. Columns entirely in-gamut right of the tip (possible only under non-monotone top-edge noise) converge to v≈1 — a top-edge point, visually inert.
- **Alpha**: none. The field is opaque geometry; paint, hatch, ink, DPR, tokens (`--gamut-edge`/`--gamut-hatch`) are 100% demo-owned (token-free boundary — the charter's binding constraint).
- **Precision**: 14 bisection iterations ≈ 6·10⁻⁵ in v — sub-pixel on any plausible field (proto: 224 px).

## §3 — Target set: the four wide RGB-family spaces, no more

`GamutBoundaryTarget` is a **narrow union, not `ColorSpace`**: the field is only defined for RGB-family spaces strictly wider than sRGB with an exported transfer decode. The prototype shipped 3 (`geometry.ts:65`); this spec adds **`prophoto-rgb`** because the consumer is `selectedColorSpace`-keyed (SYNTHESIS §2.1) and ProPhoto is a selectable wide space in the picker — consumer-driven, not speculative. Its D50-native matrix folds into the same combined form with one extra multiply at module load: `M = XYZ_RGB · WHITE_POINT_D50_D65 · PROPHOTO_XYZ_D50` (`constants.ts:382` already exports the Bradford adaptation) — zero new mechanism.

Excluded, with reasons the doc comment carries:

- `rgb` / `srgb-linear` — gamut-identical to sRGB; the contour is vacuous by F1 (the HSV square is a bijection of the sRGB cube). The demo renders *no overlay* for sRGB-family selections — the honest state, per proto F1.
- `oklch` / `lab` / unbounded spaces — need a chroma-extension convention that does not exist; proto F1 scoped overlay-v1 to wide-RGB targets. Widening the union later is additive.

The combined `wide-linear → linear-sRGB` matrices are computed **once at module load** (`multiplyMat3(XYZ_RGB_MATRIX, TARGET_XYZ_MATRIX)`, `matrix.ts` ops) into a module-private `Record<GamutBoundaryTarget, {M: Mat3; decode: (c:number)=>number}>` — the prototype's `TARGETS` table (`geometry.ts:73-77`) verbatim, minus the re-inlined constants.

## §4 — Matrix visibility: package-internal export, NOT public API

F8.1's either/or resolves as **both-and-neither**: the API ships (the SYNTHESIS "value.js alone computes the contour cheaply" claim becomes literally true), and the matrices get exactly the visibility the API needs — `const` → `export const` on five identifiers in `conversions/xyz-extended.ts`:

| identifier | line |
|---|---|
| `RGB_XYZ_MATRIX` | `xyz-extended.ts:46` |
| `XYZ_RGB_MATRIX` | `xyz-extended.ts:52` (already-inverted sRGB — boundary.ts uses this directly) |
| `DISPLAY_P3_XYZ_MATRIX` | `xyz-extended.ts:88` |
| `ADOBE_RGB_XYZ_MATRIX` | `xyz-extended.ts:96` |
| `PROPHOTO_XYZ_D50_MATRIX` | `xyz-extended.ts:104` |
| `REC2020_XYZ_MATRIX` | `xyz-extended.ts:112` |

(Six listed; `RGB_XYZ_MATRIX` is optional — `XYZ_RGB_MATRIX` suffices; export both for symmetry or the inverse alone, implementer's call. Line numbers per the current tree — the P2 sweep item 14's corrected cites.)

They are added to **no barrel** — not `conversions/index.ts` (check: if the aggregate barrel re-exports `*`, add an explicit export list or keep the matrices under a non-re-exported name; the implementer verifies the barrel's form), not `subpaths/color.ts`, not `src/index.ts`. Rationale: the matrices are CSS Color 4 spec constants with a single in-package consumer beyond their home module; publishing them invites consumers to hand-roll conversions the dispatch layer owns. The single source of truth moves from "copied verbatim into the sandbox" (the F8.1 defect) to one import statement. KISS: no `constants.ts` relocation — that churns `xyz-extended.ts`'s ten existing call sites for zero benefit.

## §5 — The zero-alloc plan (the `Into` discipline, end-to-end)

`sampleGamutBoundaryInto` is only honestly zero-alloc if the **inner field** is — and today it is not: each JND evaluation calls `srgbToOKLab` and `gamutMapOKLab`, which return fresh 3-tuples (`gamut.ts:287-303`, `:251-281`), and an OOG `gamutMapOKLab` additionally allocates `findCusp`'s `{L, C}` (`gamut.ts:145-154`). At 96 columns × 14 iterations that is the ~2.8k tuples/frame proto F8.2 measured. The cure is two exported companions in `gamut.ts`, precedent `oklchToXYZTuple` (`gamut.ts:370`, the VJ-P1 out-param) and the VJ-Q2 `xyz2rgbFamilyInto` family (`xyz-extended.ts:241-265`):

```ts
/** Out-param twin of srgbToOKLab — writes (L,a,b) into `out`, returns `out`. */
export function srgbToOKLabInto(
    r: number, g: number, b: number,
    out: [number, number, number],
): [number, number, number];

/**
 * Out-param twin of gamutMapOKLab — same algorithm, byte-identical math
 * (in-gamut early-out copies L,a,b through; OOG path reuses one module-scoped
 * cusp scratch passed to findGamutIntersection). Never aliases hazardously:
 * out is fully written before return; single-threaded re-entrancy per the
 * VJ-Q2 scratch argument (xyz-extended.ts:236-240).
 */
export function gamutMapOKLabInto(
    L: number, a: number, b: number,
    out: [number, number, number],
): [number, number, number];
```

- The cusp scratch is a module-scoped `{L: 0, C: 0}` mutated by an internal `findCuspInto`-shaped block (or by inlining `findCusp`'s 5-line body); `findGamutIntersection` already takes the cusp as a parameter (`gamut.ts:162-167`) — **no signature churn** on the existing exports.
- `boundary.ts` owns two module-private tuple scratches (RGB + LIN — the prototype's `geometry.ts:81/:107`) plus two OKLab scratches for the Into companions. Per-call allocation in `sampleGamutBoundaryInto`: **zero**.
- The companions are exported from `gamut.ts` (cross-module consumers: `boundary.ts`) but — like the matrices — **kept out of the barrels** until a public consumer is named. The existing wrapper forms stay untouched; parity is gate-asserted (§8), the `color-into.test.ts` pattern.

The allocating `sampleGamutBoundary` is a 4-line veneer: build `{points: new Float64Array(2*(columns+2)), count: 0, oogTopFrac: 0}`, call the Into form. One code path, two entry points — exactly `color2`/`color2Into`'s relationship inverted (here the Into form is primary because the sole known consumer is a rAF loop).

## §6 — Perf contract

The API inherits the prototype's **proven envelope** (proto §Measurements — 1440×900, dpr 2, 96-column JND contour, continuous 1.2°/frame hue drag; node probe `sampleBoundary(96, jnd)` = 0.286 ms):

| bound | value |
|---|---|
| mean per call, 96 col / jnd / display-p3 | **0.20–0.25 ms** (the charter envelope) |
| p95 | ≤ 0.4 ms · **contract ceiling: 0.5 ms** |
| max observed | 0.8 ms (rec2020 jnd: mean 0.27) |
| raw mode | ~0.10 ms mean (2.9× cheaper — F2) |
| 4× CPU throttle | 0.46 mean / 1.1 p95 — still inside the <2 ms overlay budget |

Cost model (what the contract rests on, so regressions are attributable): ≤ `columns+1` top-edge field evals + ≤ `(columns−firstOOG+2)·14` bisection evals; each jnd eval = closed-form HSV→RGB + 3 transfer decodes + one Mat3 transform + (OOG only) 3 encodes + `srgbToOKLabInto` + `gamutMapOKLabInto` + `deltaEOK`. The production module should land **at or below** the sandbox geometry cost: it removes the sandbox's per-eval tuple returns (§5), so the honest gate is "≤ 1.2× the sandbox `geometry.ts` per-call time at 96/jnd/p3" measured once at landing (a `bench/gamut-boundary.mjs` entry alongside the ten existing `bench/*.mjs`; recommended, not gate-blocking — the retired-`proof:*` precedent says no standing grep/threshold scripts, the number goes in R.W1's FINAL.md).

Steady-state allocation contract: `sampleGamutBoundaryInto` performs **0 allocations** per call (§5); `sampleGamutBoundary` performs exactly 2 (the result object + its Float64Array).

## §7 — Landing wave: R.W1, riding the 2.0.0 cut

**Recommendation: R.W1** (the library wave; SYNTHESIS §3 "R.W1 — GAMUT + PERCEPTUAL, the U10 head"), with R.W3 as pure consumer. The semver argument, stated honestly in both directions:

- The API is **purely additive** — under semver it needs only a minor. It does *not* justify the major; the 2.0.0 case is carried entirely by the KF-1 rename + gamut-policy output change (SYNTHESIS §3.1:75).
- It rides R.W1 anyway because (a) R.W1 is the **only publish event** between now and R.W3 — landing the API there means R.W3's overlay consumes a registry-pinned `@mkbabb/value.js/color` export instead of forcing a mid-tranche 2.1.0 or a `file:`-dep drift; (b) the module is *gamut machinery* — same files (`gamut.ts`, `xyz-extended.ts`), same review context, same oracle mindset as U10; splitting it out of the gamut wave manufactures a second touch of the same code; (c) the kf/glass-ui dispatch letters already ride the R.W1 cut — one ceremony.
- **Q6 insensitivity**: if ratification collapses 2.0.0 → 1.3.0 (policy-only minor), the boundary API rides that cut unchanged — it constrains the version question in no way.
- **Sequencing INSIDE R.W1 (load-bearing)**: the U10 head changes `GAMUT_ALPHA` 0.05 → 1.0 (`gamut.ts:242`), which changes `gamutMapOKLab`'s output for OOG colors, which **moves the JND locus**. The boundary goldens (§8) must be generated **after** the α change lands, and the proto F3 fractions (measured at α=0.05) are seed expectations with a widened tolerance, not lockable goldens. Order within the wave: α-tune → boundary module → golden generation → publish.

## §8 — Test plan (`test/gamut-boundary.test.ts`)

**Golden hues** (seeded from proto F3, regenerated post-α per §7, then locked at 1e-3):

| target | hue | expectation (α=0.05 seed; tolerance ±0.03 pre-regeneration) |
|---|---|---|
| display-p3 | 0 | `oogTopFrac ≈ 0.747` (red flood) |
| display-p3 | 300 | `≈ 0.827` (magenta — the maximum) |
| display-p3 | 60 | `≈ 0.219` (yellow corner balloon) |
| display-p3 | 240 | `count === 0`, `oogTopFrac === 0` (the blue-absence beat) |
| rec2020 | 0 / 60 / 240 | `≈ 0.897 / 0.686 / 0.328` |
| a98-rgb + prophoto-rgb | 0, 120, 240 | regenerated goldens (no proto seed; prophoto is net-new) |

**Property tests** (12-hue × 4-target sweep, 64 columns):

1. **Shape**: `count ≤ columns+2`; all valid coords in [0,1]; `points[0..1]` on the top edge (`v === 1`); s strictly increasing across column roots; last root at `s === 1`.
2. **Root truth**: for every returned column root `(s, v)`, the field changes sign across `v ± 2⁻¹³` (evaluated via the module's own field at the same mode/target) — the bisection found a real crossing.
3. **Consistency**: `oogTopFrac === 1 − points[0]` when `count > 0`; `0` when empty.
4. **Monotonicity bound** (F7's dev-gate as a test, coarsened: hueStep 15, grid 32): per-column sign-change count > 1 in ≤ 10% of columns for jnd/display-p3, ≤ 2% for raw/a98 + raw/rec2020 — locks the "column-bisection is sufficient" premise against future field edits.
5. **Into/allocating parity**: `sampleGamutBoundaryInto` output bit-identical to `sampleGamutBoundary` (the `color-into.test.ts` discipline), and a second Into call with identical args reproduces the first (scratch hygiene / idempotence).
6. **gamut.ts companions parity**: `srgbToOKLabInto`/`gamutMapOKLabInto` bit-identical to their wrapper twins over a 500-sample random corpus including deep-OOG inputs (exercises the cusp scratch).
7. **Edges**: `hueDeg = NaN/±Infinity` → empty boundary; `hueDeg = 360.5` ≡ `0.5`; `columns: 1`/`96.5` → RangeError; undersized `out.points` → RangeError; `mode:"raw"` at display-p3/240 → non-empty (raw hugs the top edge — F2's refuted-as-ink, correct-as-math locus), while jnd is empty — the pair pins the two modes apart forever.
8. **Barrel/subpath**: the two functions + four types resolve through `@mkbabb/value.js/color` (extend the existing subpath-resolution test if present; otherwise a static import in the test file suffices) and the matrices/companions do **not** appear in the subpath's export set.

## §9 — Consumers, re-derived surface check (KISS gate)

- **Overlay (R.W3)**: consumes `sampleGamutBoundary`/`Into` + reads `points` into a `Path2D`. Everything else it needs is already public or demo-owned: the **innermost-point crosshair** (F6's replacement for the vacuous cusp tick) is a 4-line `min(s+v)` scan over `points` — consumer-side derivation, not API (`geometry.ts:251-261` shows it; shipping it would be a second way to spell a loop); the **cusp caption readout** (`cusp L 0.968 C 0.211`) rides the already-public `findCusp` (`subpaths/color.ts:126`) — F6 proved the on-square projection is always the (1,1) corner, so no projection helper is needed.
- **ColorInput gamut-verdict echo (R.W3/W4, SYNTHESIS §2.3)**: a per-color point verdict, not a sampled polyline — `deltaEOK(L,a,b, ...gamutMapOKLab(L,a,b)) > DELTA_E_OK_JND` over the parsed color's OKLab coordinates, all public (`subpaths/color.ts:120-134`). **No new export.** The F2 "one field, two consumers" claim is satisfied at the level that matters: both instruments share `DELTA_E_OK_JND` and `gamutMapOKLab`, so the drawn contour and the typed verdict can never disagree about what "visible clipping" means.
- **Recorded conditional (not shipped)**: if seed 4's snap-resist re-spec survives and demands sub-sample *field* queries at the pointer position, distance-to-polyline over the returned points is the first resort (97 points, trivially smooth); only if that proves insufficient does a `gamutBoundaryFieldAt(hueDeg, s, v, target, mode)` scalar export get added — additive, deferred until the consumer exists.

## §10 — Risks / open edges

1. **Golden drift vs U10** — handled by §7 sequencing; the F3 numbers in this packet are α=0.05 seeds, never to be locked verbatim.
2. **`conversions/index.ts` barrel form** — if it star-re-exports `xyz-extended.ts`, the newly-exported matrices would leak into the aggregate barrel; the implementer must confirm it uses named exports (the G.W1 Lane B decomposition style suggests it does) and keep the matrices out.
3. **prophoto-rgb goldens are net-new** (no prototype measurements) — the property suite (§8 items 1-4) is the safety net; expect ProPhoto's imaginary-primary corner to produce the largest `oogTopFrac` of the family.
4. **Float64Array vs Float32Array** — f64 chosen to match the library's uniform f64 discipline (`matrix.ts` — "row-major, f64"); the buffer is ≤ 1.6 KB at 96 columns, memory is a non-argument.
