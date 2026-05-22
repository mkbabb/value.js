/**
 * RGB-family ↔ XYZ conversions — sRGB, linear-sRGB, Display-P3, Adobe RGB,
 * ProPhoto RGB, Rec. 2020.
 *
 * Each RGB-family space differs only in its transfer function (see
 * `transfer.ts`) and its 3×3 RGB↔XYZ matrix. `rgbFamily2xyz` / `xyz2rgbFamily`
 * extract the shared "transfer-decode → matrix-multiply → wrap" shape;
 * the per-space converters reduce to a one-liner each.
 *
 * All matrices are stored row-major (CSS Color 4 spec values).
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 * E.W1 Lane C — `rgbFamily2xyz` / `xyz2rgbFamily` family-helper extraction.
 */

import type { Mat3, Vec3 } from "../matrix";
import { invertMat3, transformMat3 } from "../matrix";
import {
    AdobeRGBColor,
    DisplayP3Color,
    LinearSRGBColor,
    ProPhotoRGBColor,
    Rec2020Color,
    RGBColor,
    XYZColor,
} from "..";
import { WHITE_POINT_D50_D65, WHITE_POINT_D65_D50 } from "../constants";
import {
    adobeRgbToLinear,
    linearToAdobeRgb,
    linearToProPhoto,
    linearToRec2020,
    linearToSrgb,
    linearTransfer,
    proPhotoToLinear,
    rec2020ToLinear,
    srgbToLinear,
} from "./transfer";
import { gamutMap } from "../dispatch";

// Constants for RGB to XYZ conversion (row-major)
// The literal values are the mathematical matrix in row-major order.
const RGB_XYZ_MATRIX: Mat3 = [
    0.41239079926595934, 0.357584339383878, 0.1804807884018343,
    0.21263900587151027, 0.715168678767756, 0.07219231536073371,
    0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
];

const XYZ_RGB_MATRIX: Mat3 = invertMat3(RGB_XYZ_MATRIX);

export function rgb2xyz({ r, g, b, alpha }: RGBColor): XYZColor {
    // Convert sRGB values to linear RGB
    const linearRGB: Vec3 = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];

    // Transform linear RGB to XYZ using the standardized matrix
    const [x, y, z] = transformMat3(linearRGB, RGB_XYZ_MATRIX);

    return new XYZColor(x, y, z, alpha);
}

export const xyz2rgb = (
    { x, y, z, alpha }: XYZColor,
    correctGamut: boolean = true,
): RGBColor => {
    // Transform XYZ to linear RGB
    const linearRGB = transformMat3([x, y, z] as Vec3, XYZ_RGB_MATRIX);

    // Convert linear RGB to sRGB
    const r = linearToSrgb(linearRGB[0]);
    const g = linearToSrgb(linearRGB[1]);
    const b = linearToSrgb(linearRGB[2]);

    if (correctGamut) {
        const rgb = gamutMap(new RGBColor(r, g, b, alpha));
        return new RGBColor(rgb.r, rgb.g, rgb.b, alpha);
    } else {
        return new RGBColor(r, g, b, alpha);
    }
};

// --- Phase 6: Generic color() function — XYZ matrices for new color spaces ---
// (from CSS Color 4 spec, row-major)

// Display P3 to XYZ D65
const DISPLAY_P3_XYZ_MATRIX: Mat3 = [
    0.4865709486482162, 0.26566769316909306, 0.1982172852343625,
    0.22897456406974884, 0.6917385218365064, 0.079286914093745,
    0, 0.04511338185890264, 1.043944368900976,
];
const XYZ_DISPLAY_P3_MATRIX: Mat3 = invertMat3(DISPLAY_P3_XYZ_MATRIX);

// Adobe RGB (1998) to XYZ D65
const ADOBE_RGB_XYZ_MATRIX: Mat3 = [
    0.5766690429101305, 0.1855582379065463, 0.1882286462349947,
    0.29734497525053605, 0.6273635662554661, 0.07529145849399788,
    0.02703136138641234, 0.07068885253582723, 0.9913375368376388,
];
const XYZ_ADOBE_RGB_MATRIX: Mat3 = invertMat3(ADOBE_RGB_XYZ_MATRIX);

// ProPhoto RGB to XYZ D50 (note: D50 native, needs chromatic adaptation)
const PROPHOTO_XYZ_D50_MATRIX: Mat3 = [
    0.7977604896723027, 0.13518583717574031, 0.0313493495815248,
    0.2880711282292934, 0.7118432178101014, 0.00008565396060525902,
    0, 0, 0.8251046025104602,
];
const XYZ_D50_PROPHOTO_MATRIX: Mat3 = invertMat3(PROPHOTO_XYZ_D50_MATRIX);

// Rec. 2020 to XYZ D65
const REC2020_XYZ_MATRIX: Mat3 = [
    0.6369580483012914, 0.14461690358620832, 0.1688809751641721,
    0.2627002120112671, 0.6779980715188708, 0.05930171646986196,
    0, 0.028072693049087428, 1.0609850577107909,
];
const XYZ_REC2020_MATRIX: Mat3 = invertMat3(REC2020_XYZ_MATRIX);

// sRGB-linear uses the existing RGB_XYZ_MATRIX (already defined above)

// --- Conversion functions for new color spaces ---
//
// E.W1 Lane C — `rgbFamily2xyz` / `xyz2rgbFamily` helpers extract the shared
// "transfer-decode → matrix-multiply → wrap" shape across the 5 wide-gamut
// RGB-family classes (LinearSRGB, DisplayP3, AdobeRGB, ProPhotoRGB, Rec2020).
// Each space differs ONLY in its transfer function and its 3×3 RGB↔XYZ matrix;
// the rest is identical structurally. Extracting the common shape eliminates
// 10+ duplicated `transformMat3` invocations and ~40 LoC of mechanical
// repetition. See `docs/tranches/E/audit/E.W1-lane-c-direct-paths.md`.

/**
 * Generic RGB-family → XYZ converter. Decodes each channel via `transferDecode`
 * (gamma → linear), multiplies by `toXyzMatrix`, returns an XYZColor.
 *
 * The 5 wide-gamut family converters reduce to a one-liner each.
 */
function rgbFamily2xyz<C extends { r: any; g: any; b: any; alpha: any }>(
    { r, g, b, alpha }: C,
    transferDecode: (c: number) => number,
    toXyzMatrix: Mat3,
): XYZColor {
    const linear: Vec3 = [transferDecode(r), transferDecode(g), transferDecode(b)];
    const [x, y, z] = transformMat3(linear, toXyzMatrix);
    return new XYZColor(x, y, z, alpha);
}

/**
 * Generic XYZ → RGB-family converter. Multiplies XYZ by `fromXyzMatrix`,
 * encodes each linear channel via `transferEncode` (linear → gamma), wraps
 * the result with `wrap(r, g, b, alpha)`.
 */
function xyz2rgbFamily<R>(
    { x, y, z, alpha }: XYZColor,
    fromXyzMatrix: Mat3,
    transferEncode: (c: number) => number,
    wrap: (r: number, g: number, b: number, alpha: number) => R,
): R {
    const linear = transformMat3([x, y, z] as Vec3, fromXyzMatrix);
    return wrap(
        transferEncode(linear[0]),
        transferEncode(linear[1]),
        transferEncode(linear[2]),
        alpha,
    );
}

export function linearSrgb2xyz(color: LinearSRGBColor): XYZColor {
    return rgbFamily2xyz(color, linearTransfer, RGB_XYZ_MATRIX);
}

export function xyz2linearSrgb(xyz: XYZColor): LinearSRGBColor {
    return xyz2rgbFamily(xyz, XYZ_RGB_MATRIX, linearTransfer,
        (r, g, b, a) => new LinearSRGBColor(r, g, b, a));
}

export function displayP32xyz(color: DisplayP3Color): XYZColor {
    // Display P3 uses the same sRGB transfer function.
    return rgbFamily2xyz(color, srgbToLinear, DISPLAY_P3_XYZ_MATRIX);
}

export function xyz2displayP3(xyz: XYZColor): DisplayP3Color {
    return xyz2rgbFamily(xyz, XYZ_DISPLAY_P3_MATRIX, linearToSrgb,
        (r, g, b, a) => new DisplayP3Color(r, g, b, a));
}

export function adobeRgb2xyz(color: AdobeRGBColor): XYZColor {
    return rgbFamily2xyz(color, adobeRgbToLinear, ADOBE_RGB_XYZ_MATRIX);
}

export function xyz2adobeRgb(xyz: XYZColor): AdobeRGBColor {
    return xyz2rgbFamily(xyz, XYZ_ADOBE_RGB_MATRIX, linearToAdobeRgb,
        (r, g, b, a) => new AdobeRGBColor(r, g, b, a));
}

export function proPhoto2xyz({ r, g, b, alpha }: ProPhotoRGBColor): XYZColor {
    // ProPhoto is native D50 — apply the family helper to get XYZ-D50, then
    // adapt to D65 via the Bradford matrix.
    const linear: Vec3 = [proPhotoToLinear(r), proPhotoToLinear(g), proPhotoToLinear(b)];
    const xyzD50 = transformMat3(linear, PROPHOTO_XYZ_D50_MATRIX);
    const [x, y, z] = transformMat3(xyzD50, WHITE_POINT_D50_D65);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2proPhoto({ x, y, z, alpha }: XYZColor): ProPhotoRGBColor {
    // Adapt from D65 to D50, then apply inverse matrix and encode transfer.
    const xyzD50 = transformMat3([x, y, z] as Vec3, WHITE_POINT_D65_D50);
    const linear = transformMat3(xyzD50, XYZ_D50_PROPHOTO_MATRIX);
    return new ProPhotoRGBColor(
        linearToProPhoto(linear[0]),
        linearToProPhoto(linear[1]),
        linearToProPhoto(linear[2]),
        alpha,
    );
}

export function rec20202xyz(color: Rec2020Color): XYZColor {
    return rgbFamily2xyz(color, rec2020ToLinear, REC2020_XYZ_MATRIX);
}

export function xyz2rec2020(xyz: XYZColor): Rec2020Color {
    return xyz2rgbFamily(xyz, XYZ_REC2020_MATRIX, linearToRec2020,
        (r, g, b, a) => new Rec2020Color(r, g, b, a));
}
