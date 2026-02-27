# src/units/color/

15 color spaces, conversion via XYZ hub, gamut mapping, normalization, filter solving.

## Files

```
color/
├── index.ts        # 475 loc — Color<T> base class + 15 space classes
│                     RGBColor, HSLColor, HSVColor, HWBColor
│                     LABColor, LCHColor, OKLABColor, OKLCHColor
│                     XYZColor, KelvinColor
│                     LinearSRGBColor, DisplayP3Color, AdobeRGBColor
│                     ProPhotoRGBColor, Rec2020Color
│                     ColorSpaceMap<T> discriminated union type
├── constants.ts    # 481 loc — ranges, matrices, white points, named colors
│                     COLOR_SPACE_RANGES (per-component min/max for all 15 spaces)
│                     COLOR_SPACE_DENORM_UNITS (default output units per space)
│                     WHITE_POINT_D65, WHITE_POINT_D50 (Vec3)
│                     Chromatic adaptation matrices (D65↔D50, Bradford)
│                     XYZ↔LMS, LMS↔OKLab, RGB↔XYZ matrices (all 15 spaces)
│                     GAMUT_SECTOR_COEFFICIENTS (Red/Green/Blue polynomial k0-k4)
│                     COLOR_NAMES — 147 CSS named + 5 custom colors
├── matrix.ts       # 75 loc — 3x3 matrix math (replaces gl-matrix)
│                     Vec3 = [number, number, number]
│                     Mat3 = 9-element tuple (ROW-MAJOR)
│                     transformMat3, transposeMat3, multiplyMat3, invertMat3
├── utils.ts        # 1160 loc — all color conversions + interpolation
│                     100+ conversion functions via XYZ hub
│                     Transfer functions: srgb, adobeRgb, proPhoto, rec2020
│                     color2<T,C>() — generic any-space-to-any-space converter
│                     mixColors() — CSS color-mix() with premultiplied alpha
│                     interpolateHue() — shorter/longer/increasing/decreasing methods
│                     gamutMap() — adaptive gamut mapping wrapper
├── normalize.ts    # 122 loc — color normalization
│                     normalizeColorUnit() — ValueUnit<Color> → [0,1] range
│                     colorUnit2<C>() — convert + normalize color unit to target space
│                     normalizeColorUnits() — prepare two colors for interpolation
├── gamut.ts        # 321 loc — Ottosson analytical sRGB gamut mapping
│                     gamutMapSRGB() — main entry point
│                     gamutMapOKLab() — core mapping in raw OKLab space
│                     findCusp(), findGamutIntersection() — boundary computation
│                     computeMaxSaturation() — polynomial + Halley's method
│                     deltaEOK() — Euclidean ΔE in OKLab (JND ≈ 0.02)
│                     srgbToOKLab() — direct path via LMS (no XYZ intermediary)
└── colorFilter.ts  # 305 loc — CSS filter solver
                      rgb2ColorFilter() — SPSA optimization
                      Solves: invert → sepia → saturate → hue-rotate → brightness → contrast
                      cssFiltersToString() — format filter array to CSS
```

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

## Conversion architecture

All conversions route through **XYZ D65** as the hub. D50-native spaces (Lab, OKLab, ProPhoto) use Bradford chromatic adaptation. Direct paths exist for performance-critical chains (OKLab↔LMS↔linear-sRGB).

Naming convention: `{from}2{to}` (e.g., `rgb2hsl`, `xyz2oklab`).

## Key patterns

- `Color<T>` is generic over component type (`number` for math, `ValueUnit` for parsing)
- All matrices stored **row-major** (9-element tuple)—no transpose needed
- Components normalized to [0,1] internally; physical ranges on output
- Gamut mapping: Ottosson's analytical method—polynomial guess + one Halley step, zero-iteration
- NaN (`none`) propagates through conversions per CSS Color Level 4 spec
