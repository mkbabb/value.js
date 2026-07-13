# src/units/color/

17 color spaces, conversion via XYZ hub, gamut mapping, normalization, filter solving.

## Files

```
color/
├── index.ts        # color-subsystem BARREL (S.W1 W1-8): re-exports base + spaces
│                     + serialize's consumers + dispatch/mix/contrast. Every
│                     `import { Color, ch, RGBColor, … } from "."` resolves here.
├── base.ts         # Color<T> base class + ColorChannel<T> phantom brand +
│                     ch<T>/channelOf/setChannel typed accessors (W1-8 leaf split;
│                     spaces.ts extends this — must stay a leaf, no dispatch import)
├── spaces.ts       # the 17 space subclasses + ColorSpaceMap<T> (W1-8 split):
│                     RGBColor, HSLColor, HSVColor, HWBColor, LABColor, LCHColor,
│                     OKLABColor, OKLCHColor, XYZColor, KelvinColor,
│                     LinearSRGBColor, DisplayP3Color, AdobeRGBColor,
│                     ProPhotoRGBColor, Rec2020Color, ICtCpColor, JzazbzColor
│                     (ICtCp/Jzazbz: S.W1 3.1.0 Q9 HDR-space promotion, W1-6/W1-11)
├── serialize.ts    # apply-path serializers (W1-8 split): formatNumber/formatColor,
│                     toAnimationString helpers (B1 zero-alloc + B2 output-space
│                     emit); color2/gamutMap late-bound (registered by dispatch)
├── constants.ts    # color-space REFERENCE DATA (T.W1-src §4b — ranges + white pts)
│                     COLOR_SPACE_RANGES (per-component min/max for all 17 spaces)
│                     COLOR_SPACE_DENORM_UNITS (default output units per space)
│                     WHITE_POINT_D65, WHITE_POINT_D50 (Vec3) + WHITE_POINT_D65_D50/
│                     D50_D65 (the D65↔D50 white-adaptation matrices), WHITE_POINTS
│                     (the OKLab/LMS transform matrices → conversions/matrices.ts;
│                      GAMUT_SECTOR_COEFFICIENTS → gamut/gamut.ts, both §4b moves)
├── color-names.ts  # COLOR_NAMES (147 CSS named + 5 custom colors) data table
│                     (S.W1 W1-8 lift out of constants.ts) + the runtime custom
│                     color-name registry (registerColorNames/clear/get — O.W1 S1)
├── matrix.ts       # 3x3 matrix math (replaces gl-matrix)
│                     Vec3 = [number, number, number]
│                     Mat3 = 9-element tuple (ROW-MAJOR)
│                     transformMat3, transposeMat3, multiplyMat3, invertMat3
├── conversions/    # 10 focused {from}2{to} modules + matrices + index (G.W1 Lane B)
│   ├── hex.ts          # hex parse + serialize
│   ├── kelvin.ts       # temperature → RGB approximation
│   ├── cylindrical.ts  # HSL/HSV/HWB/LCH/OKLCH cluster (hsl2rgb closed-form)
│   ├── lab.ts          # Lab ↔ XYZ
│   ├── oklab.ts        # OKLab ↔ XYZ
│   ├── transfer.ts     # sRGB/AdobeRGB/ProPhoto/Rec2020 transfer + gamma helpers
│   ├── xyz-extended.ts # XYZ-D50 / D65 / RGB-linear (RGB↔XYZ matrices)
│   ├── ictcp.ts        # ICtCp ↔ XYZ (BT.2100 LMS + PQ; S.W1 3.1.0)
│   ├── jzazbz.ts       # Jzazbz ↔ XYZ (PQ-variant transfer; S.W1 3.1.0)
│   ├── direct.ts       # DIRECT_PATHS perf-critical chains (OKLab↔LMS↔linear-sRGB)
│   ├── matrices.ts     # OKLab/LMS transform matrices (T.W1-src §4b — the shared
│   │                     XYZ↔LMS↔OKLab↔linear-sRGB machinery, ex-constants.ts)
│   └── index.ts        # aggregate barrel re-exporting all conversion functions
├── dispatch.ts     # generic conversion dispatch core
│                     color2<T,C>() / color2Into() — any-space-to-any-space converter
│                     DIRECT_PATHS — performance-critical conversion-path table
│                     XYZ_FUNCTIONS — per-space XYZ-hub conversion registry
│                     gamutMap() — adaptive gamut mapping wrapper
│                     getFormattedColorSpaceRange
├── normalize.ts    # color normalization
│                     normalizeColorUnit() — ValueUnit<Color> → [0,1] range
│                     colorUnit2<C>() — convert + normalize color unit to target space
│                     normalizeColorUnits() — prepare two colors for interpolation
├── gamut/          # the Ottosson cusp / max-saturation family (T.W1-src §4a)
│   ├── gamut.ts        # analytical sRGB map (head): gamutMapSRGB, gamutMapOKLab,
│   │                     findCusp, findGamutIntersection, computeMaxSaturation,
│   │                     deltaEOK, srgb2oklab (direct LMS path) +
│   │                     GAMUT_SECTOR_COEFFICIENTS (§4b — colocated with its consumer)
│   ├── raytrace.ts     # exact-boundary reference twin (S.W1-10)
│   ├── boundary.ts     # sampleGamutBoundary/Into — sRGB-excess contour of an HSV
│   │                     plate (R.W1.5) + OKLCh slice cusp; zero-alloc Into twins
│   ├── okhsl.ts        # OKHSL/OKHSV perceptual pickers (reuse the cusp math)
│   └── index.ts        # barrel — re-exports the gamut.ts head (the `units/color/gamut`
│                         specifier's stable home; leaves reachable by leaf path)
├── colorFilter.ts  # CSS filter solver
│                     rgb2ColorFilter() — SPSA optimization
│                     Solves: invert → sepia → saturate → hue-rotate → brightness → contrast
│                     cssFiltersToString() — format filter array to CSS
├── contrast.ts     # OKLab contrast helpers
│                     computeSafeAccent() — lightness-shift away from background
│                     safeAccentColor() — Color → contrast-safe OKLCHColor
│                     needsContrastAdjustment(), getOklchLightness()
├── difference.ts   # perceptual ΔE metrics — deltaE2000 (CIEDE2000),
│                     deltaEITP + rawXyz2ictcp (BT.2100/BT.2124 ICtCp)
└── mix.ts          # color-mixing + hue interpolation (K-DISP home):
                      interpolateHue, CYLINDRICAL_HUE_COMPONENT, mixColors,
                      mixColorsInto, cssColorInterpKeyword, HueInterpolationMethod,
                      mixColorsN, sampleColorRamp/At (CSS color-mix() + N-stop ramps)
```

> LoC counts intentionally omitted — `wc -l` is the source of truth.
> Inline numbers drifted past 70 lines on `index.ts` across the L8 + Lane B + Lane C
> waves; E.W1 Lane E stripped them.

## Color spaces

| Space | Class | Components | White point | Range |
|-------|-------|-----------|------------|-------|
| rgb | RGBColor | r, g, b | D65 | [0,255] or [0,1] |
| hsl | HSLColor | h, s, l | D65 | h:[0,360], s/l:[0,1] |
| hsv | HSVColor | h, s, v | D65 | h:[0,360], s/v:[0,1] |
| hwb | HWBColor | h, w, b | D65 | h:[0,360], w/b:[0,1] |
| lab | LABColor | l, a, b | D50 | l:[0,100], a/b:[-125,125] |
| lch | LCHColor | l, c, h | D50 | l:[0,100], c:[0,150], h:[0,360] |
| oklab | OKLABColor | l, a, b | D50 | l:[0,1], a/b:[-0.4,0.4] |
| oklch | OKLCHColor | l, c, h | D50 | l:[0,1], c:[0,0.4], h:[0,360] |
| xyz | XYZColor | x, y, z | D65/D50 | unbounded |
| kelvin | KelvinColor | kelvin | — | [1000,40000] |
| srgb-linear | LinearSRGBColor | r, g, b | D65 | [0,1] |
| display-p3 | DisplayP3Color | r, g, b | D65 | [0,1] |
| a98-rgb | AdobeRGBColor | r, g, b | D65 | [0,1] |
| prophoto-rgb | ProPhotoRGBColor | r, g, b | D50 | [0,1] |
| rec2020 | Rec2020Color | r, g, b | D65 | [0,1] |
| ictcp | ICtCpColor | i, ct, cp | D65 (BT.2100) | i:[0,1], ct/cp:[-0.5,0.5] |
| jzazbz | JzazbzColor | jz, az, bz | D65 | jz:[0,0.222], az/bz:[-0.5,0.5] |

## Conversion architecture

All conversions route through **XYZ D65** as the hub. D50-native spaces (Lab, OKLab, ProPhoto) use Bradford chromatic adaptation. Direct paths exist for performance-critical chains (OKLab↔LMS↔linear-sRGB).

Naming convention: `{from}2{to}` (e.g., `rgb2hsl`, `xyz2oklab`). Each `{from}2{to}` family lives in its own `conversions/*.ts` module (G.W1 Lane B decomposition); `dispatch.ts` owns `color2()` + the `DIRECT_PATHS` table; `conversions/direct.ts` holds the direct-path implementations.

## Key patterns

- `Color<T>` is generic over component type (`number` for math, `ValueUnit` for parsing)
- All matrices stored **row-major** (9-element tuple)—no transpose needed
- Components normalized to [0,1] internally; physical ranges on output
- Gamut mapping: Ottosson's analytical method—polynomial guess + one Halley step, zero-iteration
- NaN (`none`) propagates through conversions per CSS Color Level 4 spec
