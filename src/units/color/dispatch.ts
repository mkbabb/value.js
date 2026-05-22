/**
 * Color-space conversion dispatch + interpolation primitives.
 *
 * `color2()` is the generic any-space → any-space converter. It consults the
 * `DIRECT_PATHS` table for the hot interpolation pairs (oklab/oklch/hsl ↔ rgb;
 * the direct-path functions live in `conversions/direct.ts`) and otherwise
 * routes through XYZ D65 as the hub via `XYZ_FUNCTIONS`.
 *
 * Also hosts `gamutMap()` (adaptive sRGB gamut wrapper), `interpolateHue()`,
 * `mixColors()` (CSS `color-mix()`), and the `getFormattedColorSpaceRange`
 * range-formatting helper.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import { Color, RGBColor } from ".";
import type { ColorSpaceMap, HSLColor, XYZColor } from ".";
import { clamp, lerp } from "../../math";
import { COLOR_SPACE_DENORM_UNITS, COLOR_SPACE_RANGES } from "./constants";
import type { ColorSpace } from "./constants";
import { gamutMapSRGB } from "./gamut";
import { hex2rgb, rgb2hex } from "./conversions/hex";
import { kelvin2xyz, xyz2kelvin } from "./conversions/kelvin";
import {
    hsl2xyz,
    hsv2xyz,
    hwb2xyz,
    xyz2hsl,
    xyz2hsv,
    xyz2hwb,
} from "./conversions/cylindrical";
import { lab2xyz, lch2xyz, xyz2lab, xyz2lch } from "./conversions/lab";
import { oklab2xyz, oklch2xyz, xyz2oklab, xyz2oklch } from "./conversions/oklab";
import {
    adobeRgb2xyz,
    displayP32xyz,
    linearSrgb2xyz,
    proPhoto2xyz,
    rec20202xyz,
    rgb2xyz,
    xyz2adobeRgb,
    xyz2displayP3,
    xyz2linearSrgb,
    xyz2proPhoto,
    xyz2rec2020,
    xyz2rgb,
} from "./conversions/xyz-extended";
import {
    directHslToRgb,
    directOklabToRgb,
    directOklchToRgb,
    directRgbToHsl,
    directRgbToOklab,
    directRgbToOklch,
} from "./conversions/direct";

export { hex2rgb, rgb2hex };
export { deltaEOK, isInSRGBGamut, DELTA_E_OK_JND } from "./gamut";
export {
    computeSafeAccent,
    safeAccentColor,
    needsContrastAdjustment,
    getOklchLightness,
} from "./contrast";

// ── Color-space range formatting ──

export const getFormattedColorSpaceRange = <T extends ColorSpace>(colorSpace: T) => {
    const ranges = COLOR_SPACE_RANGES[colorSpace];
    const denormUnits = COLOR_SPACE_DENORM_UNITS[colorSpace];

    return Object.entries(ranges).reduce((acc: Record<string, any>, [component, range]) => {
        const units = (denormUnits as any)[component];
        let { min, max } = (range as any)[units] ?? (range as any)["number"];

        min = `${min}${units}`;
        max = `${max}${units}`;

        acc[component] = { min, max };

        return acc;
    }, {}) as ColorSpaceMap<{ min: string; max: string }>[T];
};

// ── XYZ-hub dispatch table ──

const XYZ_FUNCTIONS: Record<string, { to: (color: any) => XYZColor; from: (color: XYZColor) => any }> = {
    rgb: { to: rgb2xyz, from: xyz2rgb },

    hsl: { to: hsl2xyz, from: xyz2hsl },
    hsv: { to: hsv2xyz, from: xyz2hsv },
    hwb: { to: hwb2xyz, from: xyz2hwb },

    lab: { to: lab2xyz, from: xyz2lab },
    lch: { to: lch2xyz, from: xyz2lch },

    oklab: { to: oklab2xyz, from: xyz2oklab },
    oklch: { to: oklch2xyz, from: xyz2oklch },

    kelvin: { to: kelvin2xyz, from: xyz2kelvin },

    xyz: { to: (color: XYZColor) => color, from: (color: XYZColor) => color },

    "srgb-linear": { to: linearSrgb2xyz, from: xyz2linearSrgb },
    "display-p3": { to: displayP32xyz, from: xyz2displayP3 },
    "a98-rgb": { to: adobeRgb2xyz, from: xyz2adobeRgb },
    "prophoto-rgb": { to: proPhoto2xyz, from: xyz2proPhoto },
    rec2020: { to: rec20202xyz, from: xyz2rec2020 },
};

// ──────────────────────────────────────────────────────────────────────────────
// E.W1 Lane C — DIRECT_PATHS table for hot-path conversions.
//
// `color2(from, to)` routes EVERY conversion through XYZ as a hub by default.
// For the highest-frequency CSS interpolation pairs (`oklab↔rgb`, `oklch↔rgb`,
// `hsl↔rgb`), a direct path skips the XYZ intermediate — saving one matrix
// multiply + one XYZColor allocation per call. Numerically equivalent to the
// XYZ-hub path within floating-point epsilon (verified by `test/color-*`).
//
// The direct-path implementations live in `conversions/direct.ts`; this table
// wires them into `color2()` keyed by the `${from}->${to}` template literal.
// ──────────────────────────────────────────────────────────────────────────────

type DirectConversion = <T>(color: Color<T>) => Color<T>;

const DIRECT_PATHS: Partial<Record<`${ColorSpace}->${ColorSpace}`, DirectConversion>> = {
    // OKLab ↔ RGB — skips XYZ + chromatic adaptation. Highest-frequency
    // interpolation pair in the demo + library hot paths.
    "oklab->rgb": directOklabToRgb as unknown as DirectConversion,
    "rgb->oklab": directRgbToOklab as unknown as DirectConversion,
    // OKLCH ↔ RGB — polar form of OKLab; direct path inlines the polar
    // conversion + the OKLab→LMS→sRGB chain.
    "oklch->rgb": directOklchToRgb as unknown as DirectConversion,
    "rgb->oklch": directRgbToOklch as unknown as DirectConversion,
    // HSL ↔ RGB — closed-form cylindrical conversion (no XYZ at all).
    "hsl->rgb": directHslToRgb as unknown as DirectConversion,
    "rgb->hsl": directRgbToHsl as unknown as DirectConversion,
};

export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
    if (color.colorSpace === to) {
        return color;
    }

    // Hot-path shortcut: consult the DIRECT_PATHS table before falling through
    // to the XYZ-hub dispatch. For the 6 wired pairs, skips a matrix multiply
    // + one XYZColor allocation per call. Numerically equivalent to the
    // XYZ-hub path within floating-point epsilon.
    const directKey = `${color.colorSpace}->${to}` as `${ColorSpace}->${ColorSpace}`;
    const direct = DIRECT_PATHS[directKey];
    if (direct) {
        return direct(color) as unknown as ColorSpaceMap<T>[C];
    }

    const fromEntry = XYZ_FUNCTIONS[color.colorSpace];
    if (!fromEntry) {
        throw new Error(`Unknown source color space: "${color.colorSpace}"`);
    }

    const toEntry = XYZ_FUNCTIONS[to as ColorSpace];
    if (!toEntry) {
        throw new Error(`Unknown target color space: "${to}"`);
    }

    const xyz = fromEntry.to(color) as XYZColor<T>;

    const fromXYZFn = toEntry.from as unknown as (
        color: XYZColor<T>,
    ) => ColorSpaceMap<T>[C];

    return fromXYZFn(xyz);
}

const GAMUT_EPSILON = 1e-6;

export function gamutMap<C extends Color>(color: C): C {
    const rgb = color2(color, "rgb") as RGBColor;

    // Replace NaN ("none" keyword per CSS Color 4) with 0 for gamut purposes
    const r = Number.isNaN(rgb.r as number) ? 0 : rgb.r;
    const g = Number.isNaN(rgb.g as number) ? 0 : rgb.g;
    const b = Number.isNaN(rgb.b as number) ? 0 : rgb.b;

    // Strictly in gamut — pass through
    if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
        return color;
    }

    // Within epsilon of gamut — just clamp (avoids OKLab round-trip for tiny FP errors)
    if (
        r >= -GAMUT_EPSILON && r <= 1 + GAMUT_EPSILON &&
        g >= -GAMUT_EPSILON && g <= 1 + GAMUT_EPSILON &&
        b >= -GAMUT_EPSILON && b <= 1 + GAMUT_EPSILON
    ) {
        const clamped = new RGBColor(clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1), color.alpha);
        return color2(clamped, color.colorSpace) as C;
    }

    const [sR, sG, sB] = gamutMapSRGB(r, g, b);
    const mappedRGB = new RGBColor(sR, sG, sB, color.alpha);
    return color2(mappedRGB, color.colorSpace) as C;
}

// --- Phase 2: Hue interpolation ---

export type HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing";

export const CYLINDRICAL_HUE_COMPONENT: Partial<Record<ColorSpace, string>> = {
    hsl: "h",
    hsv: "h",
    hwb: "h",
    lch: "h",
    oklch: "h",
};

/**
 * Interpolate between two hue values using the given method.
 * Hues are in [0, 1] (normalized). Returns an interpolated hue in [0, 1].
 * Handles NaN (CSS `none`): if one hue is NaN, the other's value is used.
 */
export function interpolateHue(
    h1: number,
    h2: number,
    t: number,
    method: HueInterpolationMethod = "shorter",
): number {
    // NaN handling: missing hue adopts other color's value
    if (Number.isNaN(h1) && Number.isNaN(h2)) return 0;
    if (Number.isNaN(h1)) return h2;
    if (Number.isNaN(h2)) return h1;

    let diff = h2 - h1;

    switch (method) {
        case "shorter":
            if (diff > 0.5) h1 += 1;
            else if (diff < -0.5) h2 += 1;
            break;
        case "longer":
            if (diff > 0 && diff < 0.5) h1 += 1;
            else if (diff > -0.5 && diff <= 0) h2 += 1;
            break;
        case "increasing":
            if (diff < 0) h2 += 1;
            break;
        case "decreasing":
            if (diff > 0) h1 += 1;
            break;
    }

    let result = h1 + t * (h2 - h1);
    // Normalize to [0, 1)
    result = ((result % 1) + 1) % 1;
    return result;
}

// --- Phase 3: Color mixing ---

/**
 * Mix two colors per CSS color-mix() specification.
 * Both colors should be normalized (components in [0, 1]).
 * Percentages p1, p2 are in [0, 1] (e.g. 0.5 = 50%).
 */
export function mixColors(
    col1: Color,
    col2: Color,
    p1: number,
    p2: number,
    space: ColorSpace = "oklab",
    hueMethod: HueInterpolationMethod = "shorter",
): Color {
    // Convert both to interpolation space
    const c1 = color2(col1, space);
    const c2 = color2(col2, space);

    // Percentage normalization per CSS spec
    if (p1 < 0) p1 = 0;
    if (p2 < 0) p2 = 0;

    const sum = p1 + p2;
    if (sum === 0) {
        // Both zero — treat as equal
        p1 = 0.5;
        p2 = 0.5;
    } else if (sum !== 1) {
        // Normalize so they sum to 1
        p1 = p1 / sum;
        p2 = p2 / sum;
    }

    // Alpha multiplier when sum < 1 (original, un-normalized)
    const alphaMultiplier = Math.min(sum, 1);

    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];

    // Get component keys (excluding alpha)
    const keys = c1.keys().filter((k) => k !== "alpha");

    // Handle alpha
    const a1 = Number.isNaN(c1.alpha as number) ? (c2.alpha as number) : (c1.alpha as number);
    const a2 = Number.isNaN(c2.alpha as number) ? (c1.alpha as number) : (c2.alpha as number);
    const resultAlpha = (lerp(a1, a2, p2)) * alphaMultiplier;

    // Premultiplied alpha interpolation for non-hue components
    const resultComponents: number[] = [];

    for (const key of keys) {
        let v1 = c1[key] as number;
        let v2 = c2[key] as number;

        // NaN handling: missing component adopts other color's value
        if (Number.isNaN(v1) && Number.isNaN(v2)) {
            resultComponents.push(0);
            continue;
        }
        if (Number.isNaN(v1)) v1 = v2;
        if (Number.isNaN(v2)) v2 = v1;

        if (key === hueComponent) {
            // Hue: use hue interpolation method (not premultiplied)
            resultComponents.push(interpolateHue(v1, v2, p2, hueMethod));
        } else {
            // Premultiplied alpha interpolation
            const premul1 = v1 * a1;
            const premul2 = v2 * a2;
            const mixed = lerp(premul1, premul2, p2);
            resultComponents.push(resultAlpha > 0 ? mixed / resultAlpha : 0);
        }
    }

    // Create result color in the interpolation space
    const ResultClass = c1.constructor as new (...args: any[]) => Color;
    const result = new ResultClass(...resultComponents, resultAlpha);

    return result;
}
