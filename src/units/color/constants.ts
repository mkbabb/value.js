// T.W1-src §4b: this module holds the color-space REFERENCE-DATA concern — the
// ranges/bounds + the illuminant white points (both broadly shared across the
// subsystem, the same class as COLOR_SPACE_RANGES). The OKLab/LMS TRANSFORM
// matrices (conversion machinery: XYZ↔LMS↔OKLab↔linear-sRGB) moved to
// `conversions/matrices.ts` (colocated with the conversion leaves + the gamut
// family that use them); GAMUT_SECTOR_COEFFICIENTS moved to `gamut/gamut.ts` (its
// sole consumer). Everything stays public under the same barrel names.
import type { Vec3, Mat3 } from "./matrix";
import { invertMat3 } from "./matrix";

export const RGBA_MAX = 255;

export const ALPHA_RANGE = {
    "%": { min: 0, max: 100 },
    number: { min: 0, max: 1 },
} as const;

export const RGB_RANGE = {
    "%": ALPHA_RANGE["%"],
    number: { min: 0, max: RGBA_MAX },
} as const;

export const UNIT_RANGE = {
    "%": ALPHA_RANGE["%"],
    number: ALPHA_RANGE.number,
} as const;

export const HUE_RANGE = {
    deg: { min: 0, max: 360 },
    number: { min: 0, max: 360 },
    "%": ALPHA_RANGE["%"],
} as const;

export const COLOR_SPACE_RANGES = {
    rgb: {
        r: RGB_RANGE,
        g: RGB_RANGE,
        b: RGB_RANGE,
        alpha: ALPHA_RANGE,
    },
    hsl: {
        h: HUE_RANGE,
        s: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        alpha: ALPHA_RANGE,
    },
    hsv: {
        h: HUE_RANGE,
        s: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        v: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        alpha: ALPHA_RANGE,
    },
    hwb: {
        h: HUE_RANGE,
        w: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        b: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        alpha: ALPHA_RANGE,
    },
    lab: {
        l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE["%"] },
        a: { number: { min: -125, max: 125 }, "%": { min: -100, max: 100 } },
        b: { number: { min: -125, max: 125 }, "%": { min: -100, max: 100 } },
        alpha: ALPHA_RANGE,
    },
    lch: {
        l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE["%"] },
        c: { number: { min: 0, max: 150 }, "%": ALPHA_RANGE["%"] },
        h: HUE_RANGE,
        alpha: ALPHA_RANGE,
    },
    oklab: {
        l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        a: { number: { min: -0.4, max: 0.4 }, "%": { min: -100, max: 100 } },
        b: { number: { min: -0.4, max: 0.4 }, "%": { min: -100, max: 100 } },
        alpha: ALPHA_RANGE,
    },
    oklch: {
        l: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        c: { number: { min: 0, max: 0.5 }, "%": ALPHA_RANGE["%"] },
        h: HUE_RANGE,
        alpha: ALPHA_RANGE,
    },
    xyz: {
        x: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        y: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        z: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        alpha: ALPHA_RANGE,
    },
    kelvin: {
        kelvin: { number: { min: 1000, max: 40000 } },
        alpha: ALPHA_RANGE,
    },
    "srgb-linear": {
        r: UNIT_RANGE,
        g: UNIT_RANGE,
        b: UNIT_RANGE,
        alpha: ALPHA_RANGE,
    },
    "display-p3": {
        r: UNIT_RANGE,
        g: UNIT_RANGE,
        b: UNIT_RANGE,
        alpha: ALPHA_RANGE,
    },
    "a98-rgb": {
        r: UNIT_RANGE,
        g: UNIT_RANGE,
        b: UNIT_RANGE,
        alpha: ALPHA_RANGE,
    },
    "prophoto-rgb": {
        r: UNIT_RANGE,
        g: UNIT_RANGE,
        b: UNIT_RANGE,
        alpha: ALPHA_RANGE,
    },
    rec2020: {
        r: UNIT_RANGE,
        g: UNIT_RANGE,
        b: UNIT_RANGE,
        alpha: ALPHA_RANGE,
    },
    // ICtCp (BT.2100) — S.W1-6/Q9 remediation (3.1.0). Physical coordinates:
    // I ∈ [0,1] (PQ-lightness), Ct/Cp ∈ ~[-0.5,0.5] (tritan/protan opponent
    // axes). The `%` views mirror the oklab a/b convention ([-100,100] ↔ the
    // physical opponent span). The forward wrapper (`conversions/ictcp.ts`)
    // normalizes physical → [0,1] against these exact bounds; the inverse
    // denormalizes back, so the roundtrip is bound-consistent by construction.
    ictcp: {
        i: { "%": ALPHA_RANGE["%"], number: ALPHA_RANGE.number },
        ct: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
        cp: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
        alpha: ALPHA_RANGE,
    },
    // Jzazbz (Safdar 2017) — S.W1-11/Q9 remediation (3.1.0). Physical
    // coordinates: Jz ∈ [0,0.222] (the colorjs `xyz-abs-d65` convention — D65
    // media white lands at Jz≈0.2220652, so the bound normalizes white to ~1),
    // az/bz ∈ ~[-0.5,0.5] (red-green / yellow-blue opponent axes).
    jzazbz: {
        jz: { "%": ALPHA_RANGE["%"], number: { min: 0, max: 0.222 } },
        az: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
        bz: { number: { min: -0.5, max: 0.5 }, "%": { min: -100, max: 100 } },
        alpha: ALPHA_RANGE,
    },
} as const;

export const ALPHA_DENORM_UNIT = "%";

export const COLOR_SPACE_DENORM_UNITS = {
    rgb: {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    hsl: {
        h: "deg",
        s: "%",
        l: "%",
        alpha: ALPHA_DENORM_UNIT,
    },
    hsv: {
        h: "deg",
        s: "%",
        v: "%",
        alpha: ALPHA_DENORM_UNIT,
    },
    hwb: {
        h: "deg",
        w: "%",
        b: "%",
        alpha: ALPHA_DENORM_UNIT,
    },
    lab: {
        l: "%",
        a: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    lch: {
        l: "%",
        c: "",
        h: "deg",
        alpha: ALPHA_DENORM_UNIT,
    },
    oklab: {
        l: "%",
        a: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    oklch: {
        l: "%",
        c: "",
        h: "deg",
        alpha: ALPHA_DENORM_UNIT,
    },
    xyz: {
        x: "%",
        y: "%",
        z: "%",
        alpha: ALPHA_DENORM_UNIT,
    },
    kelvin: {
        kelvin: "K",
        alpha: ALPHA_DENORM_UNIT,
    },
    "srgb-linear": {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    "display-p3": {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    "a98-rgb": {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    "prophoto-rgb": {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    rec2020: {
        r: "",
        g: "",
        b: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    // ICtCp / Jzazbz emit their true physical coordinates (bare numbers, unit
    // "") — a reader of `ictcp(0.58 0 0)` / `jzazbz(0.222 -0.0002 -0.0001)` sees
    // the actual I/Ct/Cp / Jz/az/bz, not a % re-scale (S.W1 remediation, 3.1.0).
    ictcp: {
        i: "",
        ct: "",
        cp: "",
        alpha: ALPHA_DENORM_UNIT,
    },
    jzazbz: {
        jz: "",
        az: "",
        bz: "",
        alpha: ALPHA_DENORM_UNIT,
    },
} as const;

export type ColorSpace = keyof typeof COLOR_SPACE_RANGES;

// ──────────────────────────────────────────────────────────────────────────────
// N.W7.A B2 — CSS color-syntax-family classification.
//
// The WAAPI implicit interpolation space is chosen by a keyframe color's
// *syntax family*, NOT by a settable property (CSS Color 4 §12 + the corrected
// emit-space rule, `r-color-l4-l5 §3`): the legacy comma forms (`rgb()`/`hsl()`/
// `hwb()`) interpolate in sRGB; every non-legacy functional syntax interpolates
// in OKLab. `toAnimationString(digits, outputSpace)` (B1/B2) reads this table to
// emit a color in a syntax family whose *implicit* interp space equals the
// caller's request — so a default `oklab` request emits a non-legacy family even
// when the stored color was authored `rgb(...)`.
//
// `COLOR_SYNTAX_FAMILY` tags each `ColorSpace` `"legacy"` (sRGB interp) or
// `"non-legacy"` (OKLab interp). `COLOR_FUNCTION_FORM` tags the *serialized
// shape*: `"named"` spaces emit `name(c1 c2 c3)`; `"color"` spaces emit the
// CSS-valid `color(<space> c1 c2 c3)` wrapper (CSS Color 4 §10 — the bare
// `display-p3(...)` form is not valid CSS).
// ──────────────────────────────────────────────────────────────────────────────

/** A color is interpolated in sRGB iff its keyframe syntax is a legacy family. */
export type ColorSyntaxFamily = "legacy" | "non-legacy";

export const COLOR_SYNTAX_FAMILY: Record<ColorSpace, ColorSyntaxFamily> = {
    rgb: "legacy",
    hsl: "legacy",
    hwb: "legacy",
    hsv: "non-legacy",
    lab: "non-legacy",
    lch: "non-legacy",
    oklab: "non-legacy",
    oklch: "non-legacy",
    xyz: "non-legacy",
    kelvin: "non-legacy",
    "srgb-linear": "non-legacy",
    "display-p3": "non-legacy",
    "a98-rgb": "non-legacy",
    "prophoto-rgb": "non-legacy",
    rec2020: "non-legacy",
    // Experimental HDR perceptual spaces — non-legacy (OKLab interp), matching
    // every other functional non-sRGB family.
    ictcp: "non-legacy",
    jzazbz: "non-legacy",
};

/** How a color space serializes: a bare `name(...)` vs a `color(name ...)` wrap. */
export type ColorFunctionForm = "named" | "color";

export const COLOR_FUNCTION_FORM: Record<ColorSpace, ColorFunctionForm> = {
    rgb: "named",
    hsl: "named",
    hwb: "named",
    hsv: "named",
    lab: "named",
    lch: "named",
    oklab: "named",
    oklch: "named",
    // CSS `color()` predefined / xyz spaces — the bare-name form is invalid CSS.
    xyz: "color",
    kelvin: "named",
    "srgb-linear": "color",
    "display-p3": "color",
    "a98-rgb": "color",
    "prophoto-rgb": "color",
    rec2020: "color",
    // Bare functional form `ictcp(…)` / `jzazbz(…)` (the CSS Color HDR draft
    // syntax; mirrors the `hsv(…)` non-CSS-native precedent).
    ictcp: "named",
    jzazbz: "named",
};

// ──────────────────────────────────────────────────────────────────────────────
// G.W2 Lane A (G-OPP-2) — typed color-space range/unit accessors.
//
// `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS` are `as const`, so each
// per-space record carries its full literal key set. Before G.W2, every
// `(space, component)` lookup widened to an untyped value — the lookup cast
// produced an untyped range object, which then leaked through the
// `{ min, max }` destructures + the `denormUnits` reads.
//
// The helpers below replace those untyped lookups: they keep `component` a
// plain `string` (color components ARE dynamic — sourced from `Color.keys()`
// or demo `currentColorSpace`) but return a precise `ColorSpaceBound` /
// `string`. The `Record<...>` assertion inside is the single dynamic-index
// boundary; callers stay cast-free and fully typed.
//
// ──────────────────────────────────────────────────────────────────────────────

/** A `{ min, max }` bound — the value type of every per-unit range entry. */
export interface ColorSpaceBound {
    readonly min: number;
    readonly max: number;
}

/**
 * Typed bound lookup for `(space, component)` at a given unit, with the CSS
 * `number` fallback. Replaces the former untyped `COLOR_SPACE_RANGES` index
 * + `ranges[unit] ?? ranges.number` idiom — returns a precise `ColorSpaceBound`
 * so the `{ min, max }` destructure at every call site is fully typed.
 */
export const getColorSpaceBound = (
    colorSpace: ColorSpace,
    component: string,
    unit: string,
): ColorSpaceBound => {
    const space = COLOR_SPACE_RANGES[colorSpace] as Record<
        string,
        Record<string, ColorSpaceBound | undefined> | undefined
    >;
    const ranges = space[component] ?? {};
    // Every range record carries a `number` entry — guaranteed by the
    // `COLOR_SPACE_RANGES` shape, so the fallback always resolves.
    return ranges[unit] ?? (ranges.number as ColorSpaceBound);
};

/**
 * Typed denorm-unit lookup for `(space, component)`. Replaces the former
 * untyped `COLOR_SPACE_DENORM_UNITS` index — returns a precise `string`.
 */
export const getColorSpaceDenormUnit = (
    colorSpace: ColorSpace,
    component: string,
): string => {
    const units = COLOR_SPACE_DENORM_UNITS[colorSpace] as Record<
        string,
        string | undefined
    >;
    return units[component] ?? "";
};

// pretty names of the color spaces:
export const COLOR_SPACE_NAMES = {
    rgb: "RGB",
    hsl: "HSL",
    hsv: "HSV",
    hwb: "HWB",
    lab: "Lab",
    lch: "LCh",
    oklab: "OKLab",
    oklch: "OKLCh",
    xyz: "XYZ",
    kelvin: "Kelvin",
    "srgb-linear": "sRGB Linear",
    "display-p3": "Display P3",
    "a98-rgb": "Adobe RGB",
    "prophoto-rgb": "ProPhoto RGB",
    rec2020: "Rec. 2020",
    ictcp: "ICtCp",
    jzazbz: "Jzazbz",
} as const;

// ─── Illuminant white points + the D65↔D50 white-adaptation matrices ────────
// Colorimetric reference data (broadly shared: base.ts, conversions/{lab,
// xyz-extended}.ts, gamut/boundary.ts), kept beside the ranges/names above.

// From CIE 15:2004 table T.3
export const WHITE_POINT_D65: Vec3 = [
    0.3127 / 0.329,
    1.0,
    (1.0 - 0.3127 - 0.329) / 0.329,
];
export const WHITE_POINT_D50: Vec3 = [
    0.3457 / 0.3585,
    1.0,
    (1.0 - 0.3457 - 0.3585) / 0.3585,
];

// For the conversion of XYZ from D65 to D50 (row-major)
export const WHITE_POINT_D65_D50: Mat3 = [
    1.0479297925449969, 0.022946870601609652, -0.05019226628920524,
    0.02962780877005599, 0.9904344267538799, -0.017073799063418826,
    -0.009243040646204504, 0.015055191490298152, 0.7518742814281371,
];

// For the conversion of XYZ from D50 to D65
export const WHITE_POINT_D50_D65: Mat3 = invertMat3(WHITE_POINT_D65_D50);

export const WHITE_POINTS = {
    D65: WHITE_POINT_D65,
    D50: WHITE_POINT_D50,
};

export type WhitePoint = keyof typeof WHITE_POINTS;
