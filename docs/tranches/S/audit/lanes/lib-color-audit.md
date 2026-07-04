# S-24 · value.js COLOR-half library audit

**Scope:** `src/units/color/**` (15 spaces + `conversions/`, `dispatch.ts`, `mix.ts`,
`normalize.ts`, `gamut.ts`, `boundary.ts`, `okhsl.ts`, `difference.ts`, `contrast.ts`,
`colorFilter.ts`) + `src/quantize/**`. Numerical truth via `vite-node` probes against
CSS Color 4 / Sharma-CIEDE2000 / BT.2100 reference values.
**Repo:** `4963f33` (tranche-q). **Mode:** AUDIT ONLY — no product-code edits.
**Result:** color test suite GREEN (204/204 across the 5 files I ran). One P1
numerical defect, one P1 DRY/defect-duplication, several P2 god-module + hygiene items.

---

## P1 — the `srgbToLinear` decode-threshold defect (numerical correctness)

**Root routing: value.js `src`.** `src/units/color/conversions/transfer.ts:30`.

`srgbToLinear` (the sRGB→linear EOTF, decode) branches on the **wrong** threshold. The
input to the decode is a *gamma-encoded* channel, whose piecewise breakpoint is
**0.04045** (`SRGB_TRANSITION`). The code instead compares against
`SRGB_LINEAR_TRANSITION = 0.04045/12.92 = 0.0031308` — which is the *encode*-domain
breakpoint (correct only for `linearToSrgb`, transfer.ts:45). For every channel value in
`(0.0031308, 0.04045]` the decode takes the **power** branch where it should take the
**linear** branch.

CSS Color 4 §10.2 / IEC 61966-2-1:  `C_lin = C/12.92  if C ≤ 0.04045`, else the power form.

### Measured blast radius (probe: `scratchpad/transfer_probe.mjs`)
- **max abs error 7.10e-4**, **max relative error 292%**, at srgb ≈ 0.00314.
- 8-bit dark channels are wrong by a lot: `rgb 1/255` linear is **+224%** too high
  (9.84e-4 vs correct 3.04e-4); `2/255` +89%; `3/255` +46%; `4/255` +25%; converging to
  0 at `10/255` (0.0392, just below the 0.04045 breakpoint).
- **Self-inconsistency proof:** `srgbToLinear(linearToSrgb(x))` roundtrip max err
  **7.06e-4**; the corrected decode gives **4.4e-16** (machine-ε). Since `linearToSrgb`
  (encode) is *correct*, the encode/decode pair is **not an inverse** in the dark band.

### Confirmed at the class level (probe via `vite-node`, real modules)
`color2(new RGBColor(1/255,1/255,1/255), "xyz").y = 9.84e-4` — should be **3.04e-4**
(a **3.2×** luminance error for near-black).

### Consumers that inherit the error
`rgb2xyz` (xyz-extended.ts:64), the OKLab/OKLCH **direct paths** (`directRgbToOklab`,
`directRgbToOklch`, direct.ts), `wcagRelativeLuminance` → `contrastColor` /
`wcagContrastRatio` (contrast.ts via `color2(...,"srgb-linear")`), and — through the
**duplicate** in gamut.ts (see next finding) — `srgbToOKLab` → OKHSL/OKHSV (okhsl.ts) and
**image quantization** of dark pixels (`quantize/cluster.ts`).
Practical note: `contrastColor`'s black/white crossover sits at luminance ≈ 0.179, far
above the broken band, so its *decisions* are unaffected; the bite is in OKLab conversions
and roundtrip fidelity of dark colors — exactly the "numerical truth" the library sells.

### Why it went unnoticed (the interplay the ledger asked about)
1. **Parity masks it.** The `DIRECT_PATHS` hot path and the XYZ-hub path share the *same*
   `srgbToLinear`, so `color2` direct-vs-hub parity (probe: oklab l/a/b identical to 6
   digits) holds — two wrong-but-equal routes satisfy the K-DISP parity discipline.
2. **Tests don't cover the band.** `color-roundtrip.test.ts` uses `rgb(128,64,32)` etc.,
   never `< 10/255`.
3. **Circular oracle.** `gamut-boundary.test.ts:29,41` imports the buggy `srgbToLinear`
   *as its own reference decode* — it cannot catch the defect.

**Candidate wave-item:** change transfer.ts:30 to `if (abs <= SRGB_TRANSITION)` (decode) —
leaving linearToSrgb:45 on `SRGB_LINEAR_TRANSITION` (encode, correct). Add a dark-band
regression (`rgb(1..10/255) → XYZ.Y` vs hand-computed) and a self-inverse roundtrip test
that does NOT reuse the library function as oracle.

---

## P1 — transfer functions DUPLICATED in `gamut.ts` (DRY + defect twin)

**Root routing: value.js `src`.** `src/units/color/gamut.ts:25-52`.

gamut.ts inlines its **own** copies of `srgbToLinear` (line 33), `linearToSrgb` (42) and
`clamp` (51), justified by a comment: *"inlined to avoid circular dep with utils.ts"*.
That justification is **stale**: G.W1 moved these to `conversions/transfer.ts`, which is a
**pure leaf** (`grep -c '^import' transfer.ts` → **0**) — importing it creates no cycle,
and `clamp` already lives in `../../math` (dispatch.ts imports it from there).

Consequences:
- The **same decode defect** exists in a second place (gamut.ts:36) and feeds the Ottosson
  gamut map + `srgbToOKLab`/`srgbToOKLabInto` (gamut.ts:335,393) → OKHSL + quantize.
- Fixing the P1 defect in one file silently leaves the other wrong. Deduping makes the fix
  **structural** (one source of truth).

**Candidate wave-item:** delete gamut.ts:25-52; `import { srgbToLinear, linearToSrgb }
from "./conversions/transfer"` and `import { clamp } from "../../math"`. Drops gamut.ts by
~28 LoC (also helps its 514-LoC over-cap, below).

---

## P2 — god-module caps (precept: >500 LoC hard)

| file | physical | code-only | verdict |
|---|---|---|---|
| `index.ts` | **968** | 573 | over on both — real |
| `constants.ts` | **613** | 510 | over — declarative |
| `dispatch.ts` | **522** | 275 | physical-only; comment-dense |
| `gamut.ts` | **514** | 313 | over; -28 after dedup above |

- **`index.ts` (968) — Root: `src`.** The 15 space-class defs are irreducible named-channel
  surface, BUT ~200 lines at the top are the **apply-path serializers** (`formatColor`,
  `formatAnimationColor`, `toAnimationString`, the `ANIMATION_SCRATCH` machinery,
  `asChannelWrapper`, number formatters) — a cohesion-honest **`color/serialize.ts`** lift
  brings index.ts back under 500 and gives serialization its own home. **Candidate item.**
- **`constants.ts` (613) — Root: `src`.** `color-names.ts` (91 LoC) already exists; the
  named-color table + `COLOR_FUNCTION_FORM` maps can migrate there. **Candidate item.**
- **`dispatch.ts` (522 / 275 code) — SPLIT VERDICT: do NOT structurally split.** 247 of the
  522 lines are historical provenance narration (VJ-Q2 / O.W5 / VJ-P1 / S2). The runtime is
  a single cohesive unit: `color2`, `color2Into`, `gamutMap`, `gamutMapToRgbSpace`, the
  `XYZ_FUNCTIONS`/`XYZ_FROM_INTO` tables. `gamutMap*` cannot move to gamut.ts without an
  import cycle (gamut→dispatch for `color2`). The honest cure for the >500 physical breach
  is a **comment diet** (collapse the redundant multi-paragraph journals to one line each),
  not fragmentation. **Candidate: prune comments to <500; keep the module whole.**
- **`gamut.ts` (514) — Root: `src`.** Absorbed by the dedup item above (-28 → 486).

## P2 — `colorFilter.ts` SPSA determinism

**Root: `src`.** `colorFilter.ts:208` uses `Math.random()` for the ±1 Rademacher
perturbation with **no seed**. The algorithm is the well-known CSS-filter solver and is
sound (23/23 `colorFilter-spsa.test.ts` pass, ~2.4s, converge within tolerance), but output
is **non-reproducible** call-to-call and untestable for exact values. `rgb2ColorFilter` is
a public export (index.ts:261). **Candidate (optional):** inject a seeded PRNG param for
determinism/reproducibility; otherwise document the non-determinism on the public API.

---

## What is CLEAN / verified sound (spot-checks)

- **`difference.ts` — bit-exact.** `deltaE2000` matches all 5 Sharma-Wu-Dalal reference
  pairs to 4 decimals (2.0425 / 2.8615 / 1.0000 / 1.0000 / 1.2644). `xyzToICtCp` white →
  I=0.5807, Ct=Cp=0 (correct achromatic). PQ + BT.2100 crosstalk constants correct.
- **`color2` / `color2Into` symmetry — bit-identical.** `OKLCH → display-p3` matches to 8
  decimals via both wrapper and out-param; same-space early-return + DIRECT_PATHS ordering
  are mirrored so the results cannot diverge in the last FP digit. The VJ-Q2 zero-alloc
  egress (`*Into` family, xyz-extended.ts) is math-identical to `xyz2rgbFamily`.
- **K-DISP aftermath — clean.** `mix.ts` imports `color2`/`color2Into`/`gamutMap` from
  `dispatch.ts`; `dispatch.ts` has **no** back-import of `mix` — the historical
  `mix→dispatch` inversion is fully resolved; `mix` is a leaf consumer.
- **`okhsl.ts`** single-sources all cusp geometry from `gamut.ts`
  (`computeMaxSaturation`/`findCusp`/`findGamutIntersection`/`oklabToLinearSRGB`) — no
  re-derived color science; achromatic `1e-6` guard is principled.
- **`ch<T>` / `ColorChannel<T>` brand** (index.ts:201-250) is a sound phantom-brand with
  typed `channelOf`/`setChannel` accessors. Minor nit: the 15 constructors write raw `as
  ColorChannel<T>` (≈45 casts) instead of the `ch()` helper — stylistic, policy-acceptable
  brand casts, not the `as any` the precept targets.
- **`normalize.ts`** `colorUnit2` correctly `unwrapDeep`s to prevent the historical
  progressive-ValueUnit-nesting stack overflow (MEMORY note) — the fix is in place.

---

## Ranked candidate wave-items (color half)

1. **[P1] Fix `srgbToLinear` decode threshold** (transfer.ts:30 → `SRGB_TRANSITION`) +
   dark-band + independent-oracle roundtrip regression tests.
2. **[P1] De-duplicate transfer/clamp in `gamut.ts`** (import from `conversions/transfer`
   + `../../math`; delete the stale inlined copies) — makes the fix structural.
3. **[P2] `index.ts` → extract `color/serialize.ts`** (apply-path serializers, ~200 LoC) to
   clear the 968-LoC cap honestly.
4. **[P2] `constants.ts` → migrate named-color table into `color-names.ts`** to clear 613.
5. **[P2] `dispatch.ts` comment-diet to <500** (keep the module whole — no structural split).
6. **[P2, optional] `colorFilter.ts` seeded PRNG** for deterministic/testable SPSA output.

**Note for the demo lanes:** the P1 dark-band error is sub-visual for isolated swatches but
degrades (a) OKLab interpolation through dark gradient stops, (b) OKHSL picking of very dark
colors, and (c) dominant-color quantization of dark image regions — relevant to ledger
items S-6/S-10/S-18 if those lanes rely on library truth for dark inputs.
