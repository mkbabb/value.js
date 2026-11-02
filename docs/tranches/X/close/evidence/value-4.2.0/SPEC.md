# value.js 4.2.0: the colour-vision palette surface (judged spec)

**Ruling:** COHESION §0hf (2026-11-02). **Inputs:** two blind designs, correctness-first (A) and consumer-first (B). **Judge:** this file. It is the one design §0hf.2 requires. Implementation follows this file, and where it disagrees with either design, this file wins.

The designs were checked against the code at `ab57f5743`: `src/color/{index,model,operations,anchors}.ts`, `src/subpaths/color.ts`, `src/css/bbnf/color.ts:24`, `demo/color-session/ink.ts:220-270`, `test/ink.test.ts:434-`, `scripts/ci/verify-packed-surface.mjs:35-47`, `test/v4-c1.test.ts:472-504`, and `gregg/src/style.css:31-38,78-85`.

---

## 0. What each design contributed, and the resolutions

| # | Dimension | A | B | Ruling | Reason |
|---|---|---|---|---|---|
| R1 | String inputs to the palette check | AnyColor only | `AnyColor \| string`, function outside `src/color/`, forwarded from `subpaths/color.ts` | **B** | §0hf.2 says inputs are "any CSS `<color>` value.js parses". Gregg and atlas hold hex strings. `subpaths/color.ts` already forwards `parseCssColor` outside the barrel for this exact cycle reason, so the exception has a documented precedent. No cycle: `src/palette.ts` → `css/bbnf/color-parse` → `color/index`, and nothing in `src/color/` imports `src/palette.ts`. |
| R2 | String inputs to the three primitives | AnyColor | AnyColor | **both** | They match `convertColor`/`safeAccentColor` and must sit in the barrel (PSL-1). A string reaches them through `parseCssColor`, whose `CssColor` is a subset of `AnyColor`. |
| R3 | ΔE scale | unit | unit | **both** | This is CSS Color 4's scale (gamut-mapping JND 0.02) and atlas's `deltaEOK`. Validator figures are ×100. Every doc row says "ΔEOK (×100 = validate_palette.js)". |
| R4 | `contrastRatio` out-of-sRGB input | `mapColorToGamut(·,"srgb")` first, private `contrast()` untouched | no mapping; harden the private float arm (sign-symmetric EOTF, clamp Y ≥ 0) | **A** | WCAG 2.x luminance is defined on sRGB. Mapping makes B's hardening unnecessary, and B's hardening edits the private predicate that `safeAccentColor` runs with `gamut: "display-p3"` candidates, so it risks moving 4.1.0 outputs. A leaves `contrast()` byte-for-byte unchanged. |
| R5 | Where the predicate body lives | stays in `operations.ts` | moves to `vision.ts`, and `safeAccentColor` calls the export | **A** | `safeAccentColor` must keep calling the private `contrast()` on its own already-mapped candidates and its unmapped surface. Routing it through the export would add a gamut map to its surface arm and change its 4.1.0 behaviour on P3 surfaces. One body, two callers. |
| R6 | Viénot tritan | refused (`color_invalid_input`) | ships DaltonLens's red/cyan plane | **A** | The cited paper (Viénot, Brettel & Mollon 1999) defines protan and deutan only. DaltonLens's own author marks the tritan extension as inaccurate and points to Brettel 1997. Shipping it under the 1999 citation would be a mis-citation. Enforced in the type and at runtime. |
| R7 | Viénot severity | 1 only | `(1−s)·I + s·V` | **A** | §0hf.2 calls Viénot "the dichromat form". The linear blend is a heuristic with no published table behind it. Severity for anomalous trichromacy is Machado's job. |
| R8 | Machado interpolation | `i = min(floor(10s), 9)` | the same plus `+1e-9` | **A** | Interpolation is continuous at every tenth, so a float edge such as `0.3*10 = 3.0000000000000004` costs at most 4e-16 per element, and the epsilon buys nothing. s = 0 and s = 1 stay bit-exact. |
| R9 | Simulation knobs inside the palette check | fixed at Machado, s = 1 | `method`/`severity` options | **A** | The CVD thresholds (0.08 and 0.06) are calibrated on Machado s = 1 with clipping. A knob would let a caller get verdicts against bars that were never calibrated for that model. The report's `settings` records `method: "machado", severity: 1`. A caller who wants another model calls `simulateColorVision` and `deltaEOK` directly. |
| R10 | Pair modes | `adjacent` \| `all` | adds `cyclic` and an explicit list | **B** | atlas needs `cyclic` for pie and donut wrap, and an explicit list for legend orders that differ from array order. |
| R11 | Threshold option shape | flat numbers | `PaletteBand { target, floor }` | **B** | Every banded check gets one verdict rule (pass ≥ target, warn in [floor, target), fail below floor). A dashboard can hard-gate contrast with `{target: 3, floor: 3}` without a new option. |
| R12 | Finding taxonomy | `cvd`/`normal` checks | one `separation` check with `vision` | **B** | Gives one shape per pair and one `worst.separation[vision]` table. |
| R13 | Ungated verdict name | `"report"` | `"info"` | **B** | "info" says plainly that the value is not a pass or a fail. |
| R14 | Gate selection | `cvdKinds: CvdKind[]` | `gate: Partial<Record<kind, boolean>>` | **B** | An override names only the kinds it changes, and the default is visible per kind. |
| R15 | Report extras | `ok`, findings, worst | adds `verdict`, `colors`, `ground`, `settings`, and an exported `CATEGORICAL_PALETTE_DEFAULTS` | **B, without the const** | `verdict` separates warn from pass. `colors`/`ground` give dashboards the resolved swatches for string inputs. `settings` makes each report describe its own bars, which makes the extra runtime const redundant. Dropping it means one less frozen runtime name whose value change would be a semver event. |
| R16 | New issue codes | none | `palette_empty`, `palette_option_invalid`, `palette_color_unparsed` | **one new code, on PaletteIssue only** | `ColorIssue` gains no codes, since that would break exhaustive switches in a minor. `PaletteIssue` is a new type, so it may carry exactly the one case `ColorIssue` cannot express: `palette_color_unparsed`, with `ParseIssue` diagnostics. An empty list or a bad option uses existing codes plus `at: "options"`, which already places the fault. |
| R17 | Viénot constants | full float64 from the DaltonLens derivation | 12-digit literals | **A** | Full precision is what lets the test hold 1e-12 against DaltonLens. |
| R18 | Gregg fixture membership | 7 colours per scheme | 8 (`--src-collections` #D65A04 / #E47000 included) | **B** | `gregg/src/style.css:31-38,78-85` has eight `--src-*` tokens per scheme. A's dark normal-vision figure (0.16250) is a 7-colour artefact. |
| R19 | §0gw.4 drift lock after R-ink-1 | stays unchanged | "becomes an identity assertion" | **A** | §0gw.4 compares the certify walk against `safeAccentColor` walks, not the predicates. It stays byte-unchanged and GREEN. A new predicate-equality test is added alongside it (§7 G). |
| R20 | Gamut handling in simulation | always `mapColorToGamut` (in-gamut returns unchanged) | map only if out of [0,1] | **equivalent; A's wording** | `mapColorToGamut` already returns in-gamut input unchanged (`operations.ts:160`). |

### The ruling restatement this judge makes (§0hf.3 property 2)

"Severity 1 equals the dichromat form within tolerance" is false as worded across models. Both seats measured Machado s = 1 against Viénot at up to 0.105 ΔEOK, which is above the 0.08 CVD target itself. The property is enforced per model instead:

- (a) Machado s = 1 is bit-equal to the published 1.0 row, which is Machado's own dichromat form.
- (b) Viénot is idempotent (V·V = V), fixes black, white, blue and yellow, and equals DaltonLens to 1e-12.
- (c) Cross-model agreement is a committed regression bound on a 33³ sRGB cube, for protan and deutan each: median ≤ 0.03, p95 ≤ 0.085, max ≤ 0.11.

This is reported upward to the orchestrator as a §0hf.3 reading. It is not a waiver.

---

## 1. Files

| File | Content |
|---|---|
| `src/color/operations.ts` | `contrastRatio` and `deltaEOK`, next to the private `luminance()`/`contrast()` (:196-216). Those two are unchanged. |
| `src/color/vision.ts` (new) | The Machado table, the Viénot constants, interpolation, `simulateColorVision`, the `ColorVision*` types, and an internal (unexported from the barrel) `simulateLinearUnclipped` for tests. |
| `src/color/index.ts` | Lists `contrastRatio`, `deltaEOK`, `simulateColorVision`, and the types `ColorVisionKind`, `ColorVisionMethod`, `ColorVisionOptions`. |
| `src/palette.ts` (new, top level like `src/quantize.ts`) | `checkCategoricalPalette` and its types. It imports `parseCssColor` from `./css/bbnf/color-parse` and the primitives from `./color/index`. |
| `src/subpaths/color.ts` | Forwards `checkCategoricalPalette` and its types beside `parseCssColor`. The comment extends the existing cycle note: a string-accepting function cannot sit in the barrel. |

No module under `src/color/` imports `parseCssColor`.

## 2. Types

```ts
// src/color/vision.ts (barrel)
export type ColorVisionKind = "protan" | "deutan" | "tritan";
export type ColorVisionMethod = "machado" | "vienot";
export type ColorVisionOptions =
    | Readonly<{ kind: ColorVisionKind; method?: "machado"; severity?: number }>   // severity ∈ [0,1], default 1
    | Readonly<{ kind: "protan" | "deutan"; method: "vienot"; severity?: 1 }>;

// src/palette.ts (forwarded from subpaths/color.ts)
export type ColorInput = AnyColor | string;          // any CSS <color> parseCssColor accepts
export type PaletteBand = Readonly<{ target: number; floor: number }>;
export type PalettePairs =
    | "adjacent" | "cyclic" | "all"
    | readonly (readonly [number, number])[];
export type CategoricalPaletteOptions = Readonly<{
    ground: ColorInput;                               // REQUIRED, opaque
    scheme: "light" | "dark";                         // REQUIRED; picks the default lightness band
    pairs?: PalettePairs;                             // default "adjacent"
    lightness?: readonly [min: number, max: number];  // replaces the scheme band
    chroma?: PaletteBand;
    contrast?: PaletteBand;
    normal?: PaletteBand;
    cvd?: PaletteBand;                                // applies to every simulated kind
    gate?: Readonly<Partial<Record<ColorVisionKind, boolean>>>;  // false → verdict "info"
}>;  // an override replaces that key whole; there is no deep merge
export type PaletteVision = "normal" | ColorVisionKind;
export type PaletteVerdict = "pass" | "warn" | "fail" | "info";
export type PaletteFinding =
    | Readonly<{ check: "lightness"; index: number; value: number; threshold: readonly [number, number]; verdict: "pass" | "fail" }>
    | Readonly<{ check: "chroma" | "contrast"; index: number; value: number; threshold: PaletteBand; verdict: "pass" | "warn" | "fail" }>
    | Readonly<{ check: "separation"; vision: PaletteVision; pair: readonly [number, number]; value: number; threshold: PaletteBand; verdict: PaletteVerdict }>;
export type CategoricalPaletteReport = Readonly<{
    verdict: "pass" | "warn" | "fail";     // worst non-"info" verdict
    ok: boolean;                           // verdict !== "fail"
    findings: readonly PaletteFinding[];   // every measurement, nothing elided (order below)
    worst: Readonly<{
        lightness: PaletteFinding | null;  // the finding furthest outside, or closest to, the band edge
        chroma: PaletteFinding | null;
        contrast: PaletteFinding | null;
        separation: Readonly<Record<PaletteVision, PaletteFinding | null>>;  // null when there are no pairs
    }>;
    colors: readonly Color<"oklch">[];     // resolved inputs, in input order
    ground: Color<"oklch">;
    settings: Readonly<{
        scheme: "light" | "dark"; pairs: PalettePairs; lightness: readonly [number, number];
        chroma: PaletteBand; contrast: PaletteBand; normal: PaletteBand; cvd: PaletteBand;
        gate: Readonly<Record<ColorVisionKind, boolean>>;
        method: "machado"; severity: 1;
    }>;
}>;
export type PaletteIssue = Readonly<{
    code: ColorIssue["code"] | "palette_color_unparsed";
    at: number | "ground" | "options";
    diagnostics?: readonly [ParseIssue, ...ParseIssue[]];  // present iff code is palette_color_unparsed
}>;
```

All of these are nameable from `@mkbabb/value.js/color` (PSL-2) and are added to `fixtures/public-types/value-v4.ts`.

## 3. Functions

Every function returns a `Result` and never throws. `ColorIssue` gains no codes.

### `contrastRatio(a: AnyColor, b: AnyColor): Result<number, ColorIssue>`
1. Opacity check, in `safeAccentColor`'s order: `alpha === "none"` gives `color_missing_alpha`; `alpha !== 1` gives `color_invalid_input`.
2. `mapColorToGamut(x, "srgb")`, then `convertColor(·, "rgb")`.
3. Return `min(contrast(a,b,false), contrast(a,b,true))` with the existing private `contrast()`, unchanged.
- The result lies in [1, 21] and is **never rounded**. WCAG Understanding SC 1.4.3 says a ratio is not rounded up to meet a threshold.
- Symmetric. For hex inputs the float and byte arms are equal.
- Missing channels propagate as `color_missing_channel`.

### `deltaEOK(a: AnyColor, b: AnyColor): Result<number, ColorIssue>`
- `convertColor(x, "oklab")` on both, then `Math.hypot(ΔL, Δa, Δb)`.
- Alpha is ignored, including `"none"`. There is no gamut mapping, since OKLab is defined everywhere.
- Unit scale: black to white = 1.0. TSDoc: "CSS Color 4 scale; JND 0.02; multiply by 100 to read validate_palette.js".
- The OKLab is value.js's own CSS Color 4 path (`anchors.ts:207-221`). It agrees with Ottosson's direct linear-sRGB form to 3.78e-8 (measured by A on a 17³ cube).

### `simulateColorVision(color: AnyColor, options: ColorVisionOptions): Result<Color<"srgb-linear">, ColorIssue>`
Validation, in this order:
1. `options` missing, or `kind`/`method` unknown: `color_invalid_input`.
2. `severity` (default 1) not finite: `color_non_finite`.
3. `severity` outside [0,1]: `color_out_of_range`.
4. `method === "vienot"` with `kind === "tritan"` or `severity !== 1`: `color_invalid_input`.

Pipeline:
1. `mapColorToGamut(color, "srgb")`, the hue- and lightness-preserving OKLCh chroma bisection.
2. `convertColor(·, "srgb-linear")`. A `"none"` channel gives `color_missing_channel`.
3. `out = M · [r,g,b]ᵀ`, row-major.
4. Clip each channel to [0,1].
5. `linearSrgb(r, g, b, alpha)`, with alpha passed through as is, `"none"` included.

The output is in srgb-linear, the space the model and the clip are defined in. One `convertColor` reaches any other space.

### `checkCategoricalPalette(colors: readonly ColorInput[], options: CategoricalPaletteOptions): Result<CategoricalPaletteReport, PaletteIssue>`

**Input errors** (the first one found is returned):

| Condition | code | at |
|---|---|---|
| `colors.length === 0` | `color_invalid_input` | `"options"` |
| string fails `parseCssColor` (e.g. `var(--src-k12)` → `color_context_required`) | `palette_color_unparsed` + diagnostics | index / `"ground"` |
| non-`AnyColor` object | `color_invalid_input` | index / `"ground"` |
| alpha `"none"` | `color_missing_alpha` | index / `"ground"` |
| alpha ≠ 1 (incl. `transparent`) | `color_invalid_input` | index / `"ground"` |
| `"none"` channel | `color_missing_channel` | index / `"ground"` |
| any threshold not finite | `color_non_finite` | `"options"` |
| `lightness` outside [0,1] or min > max; `floor > target`; contrast band outside [1,21]; chroma/ΔE band < 0 | `color_out_of_range` | `"options"` |
| explicit pair index out of range or non-integer | `color_out_of_range` | `"options"` |
| explicit pair with i === j; unknown `scheme`/`pairs` string | `color_invalid_input` | `"options"` |

A palette that **fails its checks** is `ok(report)` with `verdict: "fail"`. `err` means only that the input was unusable.

**Pairs:**
- `adjacent`: (i, i+1).
- `cyclic`: adjacent plus (n−1, 0) when n ≥ 3.
- `all`: every i < j.
- An explicit list is used verbatim, in the given order.

With one colour there are no pairs, the per-colour checks still run, and each `worst.separation` entry is `null`.

**Measurements**, with L and C read from `convertColor(·,"oklch")` of the opaque input:
- lightness: pass iff `band[0] ≤ L ≤ band[1]` (inclusive).
- chroma, contrast and every separation: banded. `value ≥ target` → pass, `floor ≤ value < target` → warn, `value < floor` → fail. Raw floats are compared, never rounded ones.
- contrast is `contrastRatio(color, ground)`.
- normal separation is `deltaEOK(ci, cj)` on the unmapped colours.
- each kind's separation is `deltaEOK(sim(ci), sim(cj))`, with `sim` = `simulateColorVision(·, {kind, method: "machado", severity: 1})`.
- A kind whose `gate` is false is measured, but its verdict is `"info"`.

**Finding order:**
1. For each colour i: lightness, chroma, contrast.
2. Then for each pair in pair order: normal, protan, deutan, tritan.

## 4. Numerics

### Machado, Oliveira & Fernandes 2009

Source: *A physiologically-based model for simulation of color vision deficiency*, IEEE TVCG 15(6):1291-1298, doi:10.1109/TVCG.2009.113. The table is the authors' supplementary one: 3 kinds × 11 severities, 6 decimals.

- Shipped verbatim: no renormalisation and no extra digits. Severity 0 is written as the exact identity, with −0 normalised to 0.
- Row sums deviate from 1 by ≤ 1e-6, so the grey axis holds to 2e-6. This is documented as a published fact.
- Severity 1.0 rows (out = M·[r,g,b]ᵀ):
  - protan `[[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]]`
  - deutan `[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]]`
  - tritan `[[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]]`
- Interpolation: `t = 10·s; i = min(floor(t), 9); f = t − i; M = (1−f)·T[i] + f·T[i+1]`, element by element.
  - This is colorspacious `machado_et_al_2009_matrix`'s rule. It is attributed to that implementation, not to the paper.
  - s = 0 gives T[0] bit-exactly. s = 1 gives T[10] bit-exactly.
- Tritan is documented as the model's least-validated case.

### Viénot, Brettel & Mollon 1999

Source: *Digital video colourmaps for checking the legibility of displays by dichromats*, Color Res. Appl. 24(4):243-252. Protan and deutan only.

- Construction: `M = RGB←LMS · P · LMS←RGB`.
  - LMS←XYZ is Smith & Pokorny 1975: `[[0.15514,0.54312,-0.03286],[-0.15514,0.45684,0.03286],[0,0,0.01608]]`.
  - XYZ←RGB is BT.709: `[[0.412456,0.3575761,0.1804375],[0.212672,0.7151522,0.072175],[0.019333,0.119192,0.9503041]]`.
  - P projects along the missing cone axis onto the plane through black, white, blue and yellow.
  - This is DaltonLens `Simulator_Vienot1999` with `LMSModel_sRGB_SmithPokorny75`: modern sRGB primaries in place of the paper's CRT phosphors, which the TSDoc states.
- Shipped at full float64, with entries of order 1e-17 written as 0:
  - protan `[[0.10888931102535530,0.89111068897464407,0],[0.10888931102535536,0.89111068897464463,0],[0.0044713141721819880,-0.0044713141721819489,1]]`
  - deutan `[[0.29030532126555281,0.70969467873444692,0],[0.29030532126555286,0.70969467873444692,0],[-0.021973539447331349,0.021973539447331363,1]]`
- The constants are frozen from DaltonLens's sRGB matrix, which differs from value.js's CSS Color 4 matrix at about 1e-6. Freezing keeps the 1e-12 reference agreement, and the TSDoc says so.

### Common to both models

- **Space.** The matrices apply in linear sRGB, never to gamma-encoded values. This matches colorspacious, DaltonLens and validate_palette.js.
- **Clip.** Each channel is clipped to [0,1] after the matrix (e.g. Machado protan sends `#0000ff`'s R to −0.204868). DaltonLens and validate_palette.js clip; colorspacious does not. The thresholds were calibrated on clipped output, so the clip stays even though it shifts hue for saturated inputs. Documented.
- **Contrast.** WCAG 2.x relative luminance, `Y = 0.2126R + 0.7152G + 0.0722B`, EOTF knee 0.04045 (IEC 61966-2-1, WCAG 2.2). atlas's WCAG 2.0 knee of 0.03928 yields the same byte arm, because no 8-bit value lies between the two knees (10/255 = 0.039216 and 11/255 = 0.043137). The result is min(float arm, byte arm), where the byte arm is roundHalfEven(clamp 0..255), the same as `toRgba8`. Example: oklch(0.62 0.15 250) on #1a1a19 measures float 4.792247 and byte 4.801888, so value.js reports 4.792247.

## 5. Default thresholds, each with a source or a stated rationale

| Option | Default | Source / rationale |
|---|---|---|
| `lightness`, scheme light | [0.43, 0.77] OKLCh L, inclusive | **Design choice**, adopted verbatim from the dataviz skill's validate_palette.js `BAND.light`, which Gregg and atlas A8 already pass. It keeps categorical marks mid-tone, where the sRGB chroma ceiling peaks, and off a near-white ground. Not a standard. |
| `lightness`, scheme dark | [0.48, 0.67] | **Design choice**, validate_palette.js `BAND.dark` (tuned there to #1a1a19). Gregg dark #E47000 sits at 0.6698, a boundary fixture. |
| `chroma` | {target 0.10, floor 0.10} (hard gate) | **Design choice**, validate_palette.js `CHROMA_FLOOR`: below it a hue reads as grey at mark size. Gregg light #7C4D00 (C 0.1004) and #A88F42 (0.1010) are boundary fixtures. |
| `contrast` | {target 3.0, floor 1.0} (below 3:1 warns, never fails) | The 3:1 target is **WCAG 2.1/2.2 SC 1.4.11** Non-text Contrast. The warn-not-fail floor is a **design choice** mirroring the validator's "relief" state: SC 1.4.11 is met another way when labels or a table carry the information, and a colour check cannot see that. `{3,3}` makes it a hard gate. |
| `normal` | {target 0.15, floor 0.15} ΔEOK (hard gate) | **Design choice**, validate_palette.js `NORMAL_FLOOR` 15 (×100). It is 7.5 JND at CSS Color 4's 0.02. |
| `cvd` | {target 0.08, floor 0.06} ΔEOK | validate_palette.js `CVD_TARGET` 8 / `CVD_FLOOR` 6 (×100), **calibrated by that skill on Machado 2009, s = 1.0, clipped**. That is why the check fixes the model (R9). It is 3-4 JND. The warn band is legal only with secondary encoding (labels, gaps, texture). |
| `gate` | {protan: true, deutan: true, tritan: false} | **Design choice**, matching the validator (it gates min(protan, deutan) and reports tritan). Two grounds: (1) prevalence, about 8% of men for protan/deutan against about 0.01% for tritan (Sharpe et al. 1999, *Color Vision: From Genes to Perception*); (2) tritan is Machado's least-validated case. Tritan is still simulated and reported per pair (§0hf.1). Gregg dark's tritan 0.0387 is shown as `info`, and `gate.tritan: true` flips it to fail. |
| `pairs` | "adjacent" | **Design choice**, the validator's default. Stacks, bars and lines put neighbours side by side in palette order, and Gregg validated in stacking order. Use `cyclic` for pies, `all` for scatter plots, maps and small multiples. |
| check simulation | Machado, s = 1 (fixed) | This is where the cvd thresholds are calibrated (R9). |
| `simulateColorVision` severity | 1 | §0hf.2. It is the dichromat end of the Machado table. |
| `simulateColorVision` method | "machado" | §0hf.2. It is the only model with a severity table, and the calibration model. |
| `ground`, `scheme` | none (required) | **Design choice.** A wrong default ground would make contrast verdicts wrong without any visible sign, and §0hf.2 forbids silent defaults. The validator's #fcfcfb and #1a1a19 are not built in. |
| gamut | map to sRGB before simulating; clip linear output | **Design choice.** The models are defined on display RGB. The clip matches the calibration. |

## 6. R-ink-1 (same cut)

- `demo/color-session/ink.ts:220-258`: delete `srgbLinear`, `guardLuminance`, `guardRatio`, `guardLuminances` and `guardContrast`. The call sites at :263-268, :480-481, :530-531, :576 and :591 call `contrastRatio(candidate, surface)`, unwrapping `err` into the existing `Ink guard probe failed:` throw.
- The surface-luminance precompute is lost. That is a small cost, and accepted.
- The equivalence holds bit for bit:
  - candidates come from `mapColorToGamut(·,"srgb")` and surfaces are `oklch(L,0,0)`, so the export's gamut map is a no-op on both;
  - the byte arm of `toRgba8(·,{gamut:"clip"})` is `roundHalfEven(clamp(rgb))`, the same as the private byte arm.
- `test/ink.test.ts` §0gw.4 stays byte-unchanged and GREEN (R19).

## 7. Tests

**Reference generation.**
- A Python generator in `test/support/` runs in a pinned venv: colorspacious==1.1.2, daltonlens==0.1.5, numpy.
- It is run with `python -I`, with the wheels in their own directory. It is not run in CI.
- Its output is frozen JSON under `test/fixtures/cvd/`, with a header naming the script, the library versions and the command.
- Seat-produced numbers below are **seeds**. The real-library generator must reproduce them, or the fixture wins and this file is amended.
- Off-grid Machado references come from colorspacious only. B reports that DaltonLens `Simulator_Machado2009` interpolates off-grid as `alpha = severity − lower/10`. A did not observe this. The generator records both libraries at s = 0.55, and the gate notes which one is right.

**A. Table fidelity.** All 33 matrices equal colorspacious `MACHADO_ET_AL_MATRICES` with tolerance 0, and equal DaltonLens `machado_2009_matrices` to 1e-12. That cross-check catches a transcription error.

**B. Matrix application against colorspacious, pre-clip, through the internal helper.**
- Tolerance 1e-12 on grid and 1e-9 off grid.
- Seeds (A):

  | kind | s | input | linear output |
  |---|---|---|---|
  | protan | 1 | #982a6b | [0.04206574280415923, 0.068745158832376, 0.15233943874858644] |
  | deutan | 1 | #338c00 | [0.2378650884666536, 0.18563597798438458, 0.010869744893457295] |
  | tritan | 1 | #982a6b | [0.36615923594921057, 0.0186327112039554, 0.06217516818348805] |
  | deutan | 0.55 | #1a5fa0 | [0.02098334062072909, 0.10336499963915147, 0.3483029543646553] |
  | protan | 0.05 | #a88f42 | [0.3873721004393177, 0.27468104701404633, 0.05382277968922447] |
  | tritan | 0.93 | #008e84 | [-0.06713320805100162, 0.28761067500499243, 0.25554860406878593] |

- Interpolated deutan s = 0.55 matrix (B): `[[0.523179,0.641253,-0.164432],[0.193446,0.768307,0.038248],[-0.010771,0.029122,0.981649]]`.
- Grid: the 8 primaries and secondaries, #808080, #982a6b and #1a5fa0, × 3 kinds × s ∈ {0, 0.1, 0.25, 0.5, 0.55, 0.7, 0.9, 0.93, 1}.
- Post-clip linear output is checked to 1e-6: #0000ff protan s = 1 → [0, 0.099216, 1].

**C. Viénot.**
- The shipped constants equal DaltonLens `Simulator_Vienot1999().cvd_linear_rgb` to 1e-12, and the derivation is re-run in the test to the same tolerance.
- Black, white, blue and yellow are fixed to 1e-12. Rows 0 and 1 are equal. V·V = V to 1e-15.
- Tritan and severity ≠ 1 return `color_invalid_input`.

**D. End to end.** `simulateColorVision` → `toRgba8` matches DaltonLens `simulate_cvd` uint8 to ±1 byte (DaltonLens computes in float32):
- machado protan #338c00 → [144,126,0]
- vienot protan #338c00 → [133,133,0]
- machado deutan #982a6b → [89,93,104]
- vienot deutan #982a6b → [92,92,104]

**E. Properties.** Over a 9³ cube plus seeded random oklch samples mapped into sRGB:
- s = 0 is bit-identical in srgb-linear.
- Machado s = 1 is bit-equal to T[10]·x, then clip.
- The interpolation is continuous at every tenth, both sides agreeing to 1e-12, and the midpoint equals the mean of its neighbours.
- Achromatic inputs stay achromatic: Machado to 2e-6, Viénot to 1e-12.
- Output lies in [0,1]³, and alpha passes through, `"none"` included.
- Errors: severity NaN → `color_non_finite`, 1.01 → `color_out_of_range`, kind "achromat" → `color_invalid_input`.
- The §0 cross-model bound (c) holds on a 33³ cube for protan and deutan: median ≤ 0.03, p95 ≤ 0.085, max ≤ 0.11.

**F. deltaEOK.**
- Matches Ottosson's direct linear-sRGB OKLab to 1e-7 on a 17³ cube.
- white↔black = 1 ± 1e-12. red↔blue = 0.5370898 ± 1e-6.
- Symmetric, zero on identical input, satisfies the triangle inequality on seeded triples, ignores alpha, and accepts out-of-gamut input without mapping it.

**G. contrastRatio.**
- Fixed values:
  - #767676/#fff = 4.542225 and #777777/#fff = 4.478089, not rounded.
  - #000/#fff = 21 exactly. An identical pair = 1 exactly.
  - #982a6b on #fcfcfb = 7.106388.
  - oklch(0.62 0.15 250) on #1a1a19 = 4.792247.
- Matches atlas `wcagContrast` to 1e-9 on 256 greys × a 6³ cube.
- **Bit-equal to the private predicate** for 10⁴ seeded in-gamut pairs. The test reaches the private function through the internal export used for B.
- Before R-ink-1 deletes them, a one-shot check confirms the old `guardContrast` equals the new call over the ink suite's ground sweep. It is committed as part of the new test, with the old function body inlined as reference.
- Alpha `"none"` and alpha < 1 return the same codes `safeAccentColor` uses.
- `safeAccentColor` outputs across `test/ink*.test.ts` and `test/v4-*` are unchanged.

**H. checkCategoricalPalette against validate_palette.js.**
- The parity run feeds the same hexes to the borrowed validator and to value.js:
  - ΔE: value.js ×100 = validator within 1e-4;
  - contrast within 1e-9;
  - L and C within 1e-6.
- Gregg, 8 colours per scheme, read from `gregg/src/style.css`:
  - **Light** on #fcfcfb: verdict pass. min C 0.1004 (#7C4D00), min contrast ≈ 3.066 (#A88F42), normal 0.1672, protan 0.1050 (#008E84↔#A88F42), deutan ≈ 0.1398, tritan info 0.0816. These agree with SCI-PARITY A8's 16.7 / 10.5 / 8.2.
  - **Dark** on #1a1a19: verdict pass. max L 0.6698 (#E47000), min contrast ≈ 3.268 (#A45448), normal ≈ 0.1541, protan 0.1150, deutan ≈ 0.1235, tritan info 0.0387 (#50A95C↔#069892). With `gate.tritan: true` the verdict is `fail`.
  - These are B's seeds. The parity run is authoritative.
- With `pairs: "all"` both Gregg schemes fail. Seeds: dark protan 0.0344 (#EB3C3A↔#A45448); light deutan 0.0439 (#A88F42↔#D65A04).
- ECharts 5 default palette on #ffffff, light scheme: verdict fail. The exact failing finding indices are asserted from the parity fixture.
- Pairs: `cyclic` adds exactly (n−1, 0). An explicit list is used verbatim.
- Boundaries:
  - C exactly 0.10 passes; L exactly at a band edge passes;
  - ΔE exactly 0.08 passes and exactly 0.06 warns;
  - a duplicate colour gives normal 0, a fail;
  - one colour gives `ok` with `separation` worst all null.
- Errors:
  - an empty list → `color_invalid_input` at "options";
  - `"transparent"` → `color_invalid_input` at its index;
  - `"var(--src-k12)"` → `palette_color_unparsed` with `color_context_required` diagnostics;
  - `cvd: {target: 0.06, floor: 0.08}` → `color_out_of_range` at "options";
  - pair [2, 2] → `color_invalid_input`.

**I. Release gates (§0hf.3).**
- Existing suite GREEN ×2 via `~/.claude/guard/guarded -- npx vitest run --maxWorkers=2`.
- `vue-tsc`/`tsc` and eslint clean.
- `scripts/ci/verify-packed-surface.mjs` `expected.color` gains `checkCategoricalPalette`, `contrastRatio`, `deltaEOK` and `simulateColorVision`, plus runtime rows:
  - `contrastRatio(#767676,#fff)` ≈ 4.542225;
  - `deltaEOK(black,white)` = 1 ± 1e-12;
  - simulate(#808080) stays grey to 2e-6;
  - Gregg-light verdict "pass".
- The sorted list in `test/v4-c1.test.ts` (:474-505) gains the four names.
- `fixtures/public-types/value-v4.ts` names every new type.
- README `## Color` gains a "Colour vision and palette checks" subsection. It covers: the ΔEOK scale (×100 = validator); matrix provenance; the clip; tritan's status; the threshold table of §5 with sources; `var()` must be resolved before calling; and the Gregg call.
- CI GREEN → `release.yml` with provenance → `npm view @mkbabb/value.js@4.2.0` read back.
- Then reply to sci-report-82 and sci-report-a4 (§0hf.4). The reply notes two things: `var()` tokens must be passed as literal hexes or computed values, and units move from ×100 to unit (16.7 → 0.167).

## 8. Adoption

- **Gregg:** `checkCategoricalPalette(SRC_LIGHT, { ground: "#fcfcfb", scheme: "light" })` plus the dark twin. Both pass with no tuning.
- **atlas:** `checkCategoricalPalette(hexes, { ground, scheme, pairs: isPie ? "cyclic" : "adjacent" })`. atlas deletes its local `deltaEOK`/`wcagContrast` onto these. Its numbers do not move, since `deltaEOK` is unit-scale and the byte arm matches for hex inputs.

## 9. Residual risks (accepted, documented)

1. **Threshold provenance.** Only the 3:1 contrast target (SC 1.4.11) and the simulation (Machado 2009) are literature-cited. The band, the chroma floor and the ΔE floors come from one borrowed skill. Any change to a default changes verdicts, so it is treated as at least a minor version and recorded in the changelog.
2. **Wide-gamut palettes.** P3 colours are mapped to sRGB before simulation, while the normal check uses them unmapped. On wide-gamut palettes the two checks can therefore disagree. Documented.
3. **Out-of-sRGB contrast inputs.** `contrastRatio` maps them before measuring, while `safeAccentColor`'s surface arm does not. The two are identical for in-gamut input, which covers every current caller.
4. **The byte arm** makes `contrastRatio` slightly more conservative than atlas's single quantised ratio for non-hex input near a threshold.
5. **The clip** is a model artefact: it shifts hue on saturated inputs. It is kept for calibration fidelity.
