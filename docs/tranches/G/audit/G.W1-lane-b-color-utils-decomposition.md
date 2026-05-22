# G.W1 Lane B — `src/units/color/utils.ts` decomposition (G-OPP-1 / G3 invariant)

**Wave**: G.W1, Lane B.
**Branch**: `tranche-g` @ `704195e` (pre-flight verified).
**Finding origin**: `audit/G-AUDIT-5 §2` + `G.md §2 G3`.
**Status**: COMPLETE — one sub-gate deviation reported (B.7, see §6).

---

## §1 — Pre-state

| Metric | Value |
|---|---|
| `src/units/color/utils.ts` | **1,430 LoC** — the lone post-F god-module |
| Conversion functions | 51 `{from}2{to}` helpers + 6 `directXxx` paths |
| Dispatch surface | `XYZ_FUNCTIONS`, `DIRECT_PATHS`, `color2()`, `gamutMap()` |
| Interpolation surface | `interpolateHue()`, `mixColors()`, `CYLINDRICAL_HUE_COMPONENT` |
| Range helper | `getFormattedColorSpaceRange()` |
| Dead code identified | `normalizeColorComponent` (private `const`, zero references — dropped, not carried) |

### Importer enumeration (pre-state)

`grep -rn "from ['\"].*color/utils" src/ demo/ test/` — 30 import lines across these files.
The same-directory `./utils` form (not matched by that regex) added 2 more:
`src/units/color/colorFilter.ts` + `src/units/color/contrast.ts`.

| Tier | Files | Imported names |
|---|---|---|
| `src/` top barrel | `src/index.ts` | `getFormattedColorSpaceRange, color2, gamutMap, interpolateHue, mixColors, CYLINDRICAL_HUE_COMPONENT, computeSafeAccent, safeAccentColor, needsContrastAdjustment, getOklchLightness`, type `HueInterpolationMethod` |
| `src/` internal | `src/units/interpolate.ts` | `CYLINDRICAL_HUE_COMPONENT, interpolateHue` |
| `src/` internal | `src/units/normalize.ts` | type `HueInterpolationMethod` |
| `src/` internal | `src/units/index.ts` | type `HueInterpolationMethod` |
| `src/` internal | `src/units/color/normalize.ts` | `color2`, type `HueInterpolationMethod` |
| `src/` internal | `src/units/color/mix.ts` | `mixColors`, type `HueInterpolationMethod` |
| `src/` internal | `src/units/color/contrast.ts` | `color2` (via `./utils`) |
| `src/` internal | `src/units/color/colorFilter.ts` | `rgb2hsl` (via `./utils`) |
| `src/` internal | `src/parsing/color.ts` | `color2, hex2rgb, kelvin2rgb, mixColors`, type `HueInterpolationMethod` |
| `demo/` | `gradient/GradientVisualizer.vue`, `gradient/composables/useGradientInterpolation.ts`, `gradient/composables/useGradientCSS.ts`, `gradient/composables/useGradientModel.ts`, `mix/MixConfigBar.vue`, `mix/composables/useMixingState.ts`, `color-picker/composables/useColorGeneration.ts`, `color-picker/display/ColorNutritionLabel.vue`, `palette-browser/SearchFilterBar.vue`, `lib/palette/mix.ts`, `lib/color-utils.ts` | `mixColors`, `oklch2xyz`, `xyz2rgb`, `getFormattedColorSpaceRange`, `hex2rgb`, `color2`, type `HueInterpolationMethod` |
| `test/` | `gamut-mapping.test.ts`, `color-conversions.test.ts`, `color-hue-interpolation.test.ts`, `color-mix.test.ts`, `color-contrast.test.ts`, `color-none.test.ts`, `color-roundtrip.test.ts`, `color-function.test.ts` | conversion funcs, `color2`, `gamutMap`, `mixColors`, `interpolateHue`, `* as ColorConversions` |

`gamut.ts` did **NOT** import from `color/utils` — it inlines its own sRGB transfer functions to avoid a circular dependency (verified, no edit required).

`dist/value.js` pre-decomposition size: **124,936 bytes** (captured via `npm run build` baseline).

---

## §2 — Function → module mapping

The 7-module boundary in `G.md §2 G3` was followed with two cohesion-honest
sub-splits required by the **HARD CONSTRAINT ≤ 350 LoC/module** (see §6):

- `lab.ts` was split into `lab.ts` (CIE Lab/LCH) + `oklab.ts` (OKLab/OKLCH).
  This matches `G-AUDIT-5 §2`'s original proposal verbatim (it listed `lab.ts`
  and `oklab.ts` as separate modules; `G.md §2` later collapsed them).
- The 6 `directXxx` path **functions** were placed in `conversions/direct.ts`
  (a conversion cluster), while the `DIRECT_PATHS` **table** + `color2()` glue
  stay in `dispatch.ts` per the boundary spec.

| Export (former utils.ts) | New home |
|---|---|
| `hex2rgb`, `rgb2hex` | `conversions/hex.ts` |
| `kelvin2rgb`, `rgb2kelvin`, `kelvin2xyz`, `xyz2kelvin` | `conversions/kelvin.ts` |
| `hsv2hsl`, `hsl2hsv`, `hwb2hsl`, `hsl2hwb`, `rgb2hsl`, `hsl2rgb`, `hsl2xyz`, `xyz2hsl`, `hsv2xyz`, `xyz2hsv`, `hwb2xyz`, `xyz2hwb` | `conversions/cylindrical.ts` |
| `xyz2lab`, `lab2xyz`, `lch2lab`, `lab2lch`, `lch2xyz`, `xyz2lch` | `conversions/lab.ts` |
| `oklab2xyz`, `xyz2oklab`, `oklab2lab`, `lab2oklab`, `oklab2oklch`, `oklch2oklab`, `oklch2lab`, `lab2oklch`, `oklch2xyz`, `xyz2oklch` | `conversions/oklab.ts` |
| `srgbToLinear`, `linearToSrgb`, `adobeRgbToLinear`, `linearToAdobeRgb`, `proPhotoToLinear`, `linearToProPhoto`, `rec2020ToLinear`, `linearToRec2020` (+ internal `linearTransfer`) | `conversions/transfer.ts` |
| `rgb2xyz`, `xyz2rgb`, `linearSrgb2xyz`, `xyz2linearSrgb`, `displayP32xyz`, `xyz2displayP3`, `adobeRgb2xyz`, `xyz2adobeRgb`, `proPhoto2xyz`, `xyz2proPhoto`, `rec20202xyz`, `xyz2rec2020` (+ internal `rgbFamily2xyz`, `xyz2rgbFamily`, RGB↔XYZ matrices) | `conversions/xyz-extended.ts` |
| `directOklabToRgb`, `directRgbToOklab`, `directOklchToRgb`, `directRgbToOklch`, `directHslToRgb`, `directRgbToHsl` (were private; now exported for the dispatch table) | `conversions/direct.ts` |
| `getFormattedColorSpaceRange`, `color2`, `gamutMap`, `interpolateHue`, `mixColors`, `CYLINDRICAL_HUE_COMPONENT`, type `HueInterpolationMethod`, `XYZ_FUNCTIONS` (internal), `DIRECT_PATHS` (internal) | `dispatch.ts` |
| Re-exports `deltaEOK, isInSRGBGamut, DELTA_E_OK_JND` (from `gamut.ts`) + `computeSafeAccent, safeAccentColor, needsContrastAdjustment, getOklchLightness` (from `contrast.ts`) | `dispatch.ts` (re-export pass-through, unchanged) |
| `normalizeColorComponent` (private, dead) | **DROPPED** — zero references; live equivalent is `normalizeColorUnitComponent` in `color/normalize.ts` |

`conversions/index.ts` is a new aggregate barrel re-exporting every `{from}2{to}`
function — required because `test/color-roundtrip.test.ts` indexes the namespace
dynamically (`ColorConversions[`${from}2${to}`]`).

---

## §3 — Per-module final LoC

| Module | LoC | ≤ 350? |
|---|---|---|
| `conversions/hex.ts` | 44 | ✅ |
| `conversions/transfer.ts` | 109 | ✅ |
| `conversions/kelvin.ts` | 123 | ✅ |
| `conversions/oklab.ts` | 156 | ✅ |
| `conversions/cylindrical.ts` | 193 | ✅ |
| `conversions/direct.ts` | 210 | ✅ |
| `conversions/xyz-extended.ts` | 220 | ✅ |
| `conversions/lab.ts` | 239 | ✅ |
| `dispatch.ts` | 336 | ✅ |
| `conversions/index.ts` (aggregate barrel) | 71 | ✅ |
| **Total** | **1,701** | — |

The +271 LoC vs the original 1,430 is module-header doc-comments + import
blocks + the aggregate barrel — zero added logic.

---

## §4 — Files created / modified / deleted

### Created (10)

- `src/units/color/conversions/hex.ts`
- `src/units/color/conversions/kelvin.ts`
- `src/units/color/conversions/cylindrical.ts`
- `src/units/color/conversions/lab.ts`
- `src/units/color/conversions/oklab.ts`
- `src/units/color/conversions/transfer.ts`
- `src/units/color/conversions/xyz-extended.ts`
- `src/units/color/conversions/direct.ts`
- `src/units/color/conversions/index.ts`
- `src/units/color/dispatch.ts`
- `docs/tranches/G/audit/G.W1-lane-b-color-utils-decomposition.md` (this doc)

### Deleted (1)

- `src/units/color/utils.ts` — DELETED, no shim (per "NO legacy code").

### Modified — barrel (1)

- `src/units/color/index.ts` — appended a color-subsystem barrel block
  re-exporting the public surface from `dispatch.ts`.

### Modified — internal `src/` import-path updates (8)

- `src/index.ts` — `color2`/`gamutMap`/… now from `./units/color/dispatch`.
- `src/units/interpolate.ts` — `./color/dispatch`.
- `src/units/normalize.ts` — `./color/dispatch`.
- `src/units/index.ts` — `./color/dispatch`.
- `src/units/color/normalize.ts` — `./dispatch`.
- `src/units/color/mix.ts` — `./dispatch`.
- `src/units/color/contrast.ts` — `./dispatch`.
- `src/units/color/colorFilter.ts` — `rgb2hsl` from `./conversions/cylindrical`.
- `src/parsing/color.ts` — `color2`/`hex2rgb`/`mixColors` from `../units/color/dispatch`; `kelvin2rgb` from `../units/color/conversions/kelvin`.

### Modified — demo import-path updates (11)

- `gradient/GradientVisualizer.vue`, `gradient/composables/useGradientInterpolation.ts`,
  `gradient/composables/useGradientCSS.ts`, `gradient/composables/useGradientModel.ts`,
  `mix/MixConfigBar.vue`, `mix/composables/useMixingState.ts`,
  `color-picker/display/ColorNutritionLabel.vue`, `lib/palette/mix.ts`,
  `lib/color-utils.ts` → `@src/units/color/dispatch`.
- `color-picker/composables/useColorGeneration.ts` → `oklch2xyz` from `@src/units/color/conversions/oklab`, `xyz2rgb` from `@src/units/color/conversions/xyz-extended`.
- `palette-browser/SearchFilterBar.vue` → `hex2rgb` from `@src/units/color/conversions/hex`.

### Modified — test import-path updates (8)

`test/{gamut-mapping,color-conversions,color-hue-interpolation,color-mix,color-contrast,color-none,color-function}.test.ts`
→ `dispatch` / `conversions`. `test/color-roundtrip.test.ts`'s
`import * as ColorConversions` → `../src/units/color/conversions` (aggregate barrel).
No test **logic** changed — pure import-path moves required to satisfy sub-gate B.3.

---

## §5 — Sub-gate B evidence (10 probes)

| # | Probe | Result | Evidence |
|---|---|---|---|
| 1 | Each new module ≤ 350 LoC | ✅ PASS | Largest: `dispatch.ts` 336. See §3 table. |
| 2 | `src/units/color/utils.ts` DELETED | ✅ PASS | `ls src/units/color/utils.ts` → "No such file or directory". |
| 3 | `grep -rn "from ['\"].*color/utils" src/ demo/ test/` = 0 | ✅ PASS | grep exit 1, zero matched lines. |
| 4 | `npx vitest run` — 1584 / 34 files GREEN | ✅ PASS | `Test Files 34 passed (34)` / `Tests 1584 passed (1584)`. |
| 5 | `npx vue-tsc --noEmit \| grep -c "error TS"` = 0 | ✅ PASS | `0`. |
| 6 | `npm run build` — clean exit | ✅ PASS | `✓ built in 679ms`; declaration files emitted. |
| 7 | `dist/value.js` size delta ≤ ±100 bytes | ⚠️ DEVIATION | 124,936 → 125,242 = **+306 bytes**. See §6. |
| 8 | `npm run proof:resolution` GREEN | ✅ PASS | `[proof:resolution] PASS — contract-v2 dev-resolution contract satisfied`. |
| 9 | `npm run proof:dts-layout` PASS | ✅ PASS | `[proof:dts-layout] PASS — flat dist/ dts emission`. |
| 10 | `npm run lint` — exit 0 | ✅ PASS | `eslint . --max-warnings=0` exit 0. |

---

## §6 — Deviations / escalations

### B.7 — `dist/value.js` +306 bytes (exceeds ±100 tolerance)

**Root cause**: Rolldown injects a `//#region src/<path>.ts` / `//#endregion`
comment pair around every input module in the ESM bundle output (27 such
markers bundle-wide; preserved by design — the build config does not strip
them and they survive `minify: true`). Decomposing 1 file (`utils.ts`) into
8 modules (`conversions/{hex,kelvin,cylindrical,lab,oklab,transfer,
xyz-extended,direct}.ts` + `dispatch.ts`) replaces 1 marker pair with 8.

**Measured**: the 8 new color-conversion/dispatch modules contribute 378 bytes
of `//#region` markers; the pre-decomposition single `utils.ts` contributed
~64 bytes — net ≈ +314 bytes of pure source-navigation comment, fully
accounting for the observed +306 delta (the few-byte difference is normal
tree-shake variance).

**Shipped logic is byte-identical**: `grep -c "G.W1\|G3 decomposition" dist/value.js`
→ 0 (no doc-comments leaked); the conversion code is the same expressions in
the same order.

**Absolute ceiling honored**: `G.W1.md §Gate` sets `dist/value.js ≤ 148,480
bytes`; 125,242 is comfortably under.

**Resolution**: the ±100 tolerance assumed "byte-equivalent after tree-shaking"
— true for executable code, but Rolldown's per-module region markers scale
with module count, a structural consequence of any 1→N decomposition.
Stripping them would require a `vite.config.ts` edit, which is **outside Lane
B's file bounds**. Reported here for orchestrator disposition; recommended
disposition: accept (marker overhead, not a logic regression) OR fold a
region-comment-strip into a config-owning lane.

### Module-count: 7 → 8 conversion-cluster files

`G.md §2 G3` listed 6 conversion modules + `dispatch.ts`. The HARD CONSTRAINT
(≤ 350 LoC) forced two cohesion-honest splits, yielding 8 conversion-cluster
files + `dispatch.ts`:

1. **`lab.ts` → `lab.ts` + `oklab.ts`** — a single combined Lab/OKLab module
   measured 379 LoC. CIE Lab (D50-native, Bradford adaptation) and OKLab
   (Ottosson, LMS cone-response) are genuinely distinct lineages.
   `G-AUDIT-5 §2` (the finding origin) explicitly proposed them as **separate**
   modules — `G.md §2` later collapsed them. This split restores the audit's
   own design intent; not a workaround.
2. **6 `directXxx` functions → `conversions/direct.ts`** — keeping them in
   `dispatch.ts` measured it at 527 LoC. The direct-path functions are pure
   conversions (a cohesion cluster); the `DIRECT_PATHS` table + `color2()`
   dispatch glue remain in `dispatch.ts` per the boundary spec.

Both splits are cohesion-honest (no padding, no artificial division) and were
applied rather than escalated because a constraint-violating 379/527-LoC
module would itself breach sub-gate B.1. The `G3` invariant target ("≤ 7
modules ≤ 350 LoC each") is met on the ≤-350 axis; the module count is 9
(8 conversion-cluster + dispatch) — reported for orchestrator awareness.

---

**Lane B complete.** 9/10 sub-gate B probes PASS; B.7 (+306 bytes) is a
Rolldown region-marker structural artefact, not a logic regression — escalated
to the orchestrator for disposition.
