import type { Vec3, Mat3 } from "./matrix";
import { transformMat3, invertMat3 } from "./matrix";
import {
    AdobeRGBColor,
    Color,
    DisplayP3Color,
    HSLColor,
    HSVColor,
    HWBColor,
    KelvinColor,
    LABColor,
    LCHColor,
    LinearSRGBColor,
    OKLABColor,
    OKLCHColor,
    ProPhotoRGBColor,
    RGBColor,
    Rec2020Color,
    XYZColor,
} from ".";
import type { ColorSpaceMap } from ".";
import { clamp, lerp, scale } from "../../math";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_RANGES,
    LMS_TO_OKLAB_MATRIX,
    LMS_TO_XYZ_MATRIX,
    OKLAB_TO_LMS_MATRIX,
    RGBA_MAX,
    WHITE_POINTS,
    WHITE_POINT_D50_D65,
    WHITE_POINT_D65_D50,
    XYZ_TO_LMS_MATRIX,
} from "./constants";
import type { ColorSpace, WhitePoint } from "./constants";
import { memoize } from "@src/utils";
import { gamutMapSRGB } from "./gamut";

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

const normalizeColorComponent = (
    v: number,
    colorSpace: ColorSpace,
    component: string,
    inverse: boolean = false,
) => {
    const { min, max } = (COLOR_SPACE_RANGES[colorSpace] as any)[component]["number"];

    const [toMin, toMax, fromMin, fromMax] = inverse
        ? [min, max, 0, 1]
        : [0, 1, min, max];

    return scale(v, fromMin, fromMax, toMin, toMax);
};

const HEX_BASE = 16;

// Outputs values in range [0, 255], alpha in [0, 1]
export const hex2rgb = (hex: string): RGBColor => {
    hex = hex.slice(1);
    if (hex.length <= 4) {
        // Expand shorthand (e.g., "03F" to "0033FF")
        const r = parseInt(hex[0]! + hex[0]!, HEX_BASE);
        const g = parseInt(hex[1]! + hex[1]!, HEX_BASE);
        const b = parseInt(hex[2]! + hex[2]!, HEX_BASE);
        const alpha = hex[3] ? parseInt(hex[3] + hex[3], HEX_BASE) / RGBA_MAX : 1;

        return new RGBColor(r, g, b, alpha);
    } else {
        // Parse full form
        const r = parseInt(hex.slice(0, 2), HEX_BASE);
        const g = parseInt(hex.slice(2, 4), HEX_BASE);
        const b = parseInt(hex.slice(4, 6), HEX_BASE);
        const alpha =
            hex.length === 8 ? parseInt(hex.slice(6, 8), HEX_BASE) / RGBA_MAX : 1;

        return new RGBColor(r, g, b, alpha);
    }
};

// Input values in range [0, 1]
export const rgb2hex = ({ r, g, b, alpha }: RGBColor): string => {
    const hex = (value: number) => {
        const hex = value.toString(HEX_BASE);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${hex(r)}${hex(g)}${hex(b)}${alpha < 1 ? hex(Math.round(alpha * RGBA_MAX)) : ""}`;
};

const MIN_TEMP = 1000;
const MAX_TEMP = 40000;
const TEMP_SCALE = 100;

// Based on approximations by Tanner Helland: https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
// Valid for temperatures between 1000K and 40,000K
export const kelvin2rgb = ({ kelvin, alpha }: KelvinColor): RGBColor => {
    // Clamp temperature to valid range and scale down
    kelvin = clamp(kelvin, MIN_TEMP, MAX_TEMP) / TEMP_SCALE;
    let r, g, b;

    // Red calculation
    if (kelvin <= 66) {
        // Red is always 255 for temperatures up to 6600K
        r = RGBA_MAX;
    } else {
        // For higher temperatures, use a power function approximation
        // R-squared value for this approximation is 0.988
        r = kelvin - 60;
        r = 329.698727446 * r ** -0.1332047592;
    }
    r = clamp(r, 0, RGBA_MAX) / RGBA_MAX;

    // Green calculation
    if (kelvin <= 66) {
        // Below 6600K, use a logarithmic approximation
        // R-squared value for this approximation is 0.996
        g = kelvin;
        g = 99.4708025861 * Math.log(g) - 161.1195681661;
    } else {
        // Above 6600K, use a power function approximation
        // R-squared value for this approximation is 0.987
        g = kelvin - 60;
        g = 288.1221695283 * g ** -0.0755148492;
    }
    g = clamp(g, 0, RGBA_MAX) / RGBA_MAX;

    // Blue calculation
    if (kelvin >= 66) {
        // Blue is always 255 for temperatures 6600K and above
        b = RGBA_MAX;
    } else if (kelvin <= 19) {
        // Blue is always 0 for temperatures 1900K and below
        b = 0;
    } else {
        // Between 1900K and 6600K, use a logarithmic approximation
        // R-squared value for this approximation is 0.998
        b = kelvin - 10;
        b = 138.5177312231 * Math.log(b) - 305.0447927307;
    }
    b = clamp(b, 0, RGBA_MAX) / RGBA_MAX;

    return new RGBColor(r, g, b, alpha);
};

// Input values in range [0, 1]
export const rgb2kelvin = ({ r, g, b, alpha }: RGBColor): KelvinColor => {
    // Ensure input values are within valid range
    r = clamp(r * RGBA_MAX, 0, RGBA_MAX);
    g = clamp(g * RGBA_MAX, 0, RGBA_MAX);
    b = clamp(b * RGBA_MAX, 0, RGBA_MAX);

    let kelvin;

    // Determine temperature range based on blue value
    if (b === RGBA_MAX) {
        // Temperature is 6600K or above
        kelvin = 6600;
    } else if (b === 0) {
        // Temperature is 1900K or below
        kelvin = 1900;
    } else {
        // Temperature is between 1900K and 6600K
        // Reverse the blue calculation
        kelvin = Math.exp((b + 305.0447927307) / 138.5177312231) + 10;
    }

    // Refine temperature based on red value
    if (r < RGBA_MAX) {
        // Temperature is above 6600K
        const redTemp = (329.698727446 / r) ** (1 / -0.1332047592) + 60;
        kelvin = Math.max(kelvin, redTemp);
    }

    // Refine temperature based on green value
    const greenTemp =
        kelvin <= 6600
            ? Math.exp((g + 161.1195681661) / 99.4708025861)
            : (288.1221695283 / g) ** (1 / -0.0755148492) + 60;

    // Average the temperatures from different channels
    kelvin = (kelvin + greenTemp) / 2;

    // Scale and clamp the final temperature
    kelvin = clamp(Math.round(kelvin * TEMP_SCALE), MIN_TEMP, MAX_TEMP);

    return new KelvinColor(kelvin, alpha);
};

// Input and output values in range [0, 1]
export const hsv2hsl = ({ h, s, v, alpha }: HSVColor): HSLColor => {
    // L is average of highest and lowest RGB values
    const l = v - (v * s) / 2;

    // S is recalculated to match HSL's definition
    let sl: number;
    if (l === 0 || l === 1) {
        sl = 0;
    } else {
        sl = (v - l) / Math.min(l, 1 - l);
    }

    return new HSLColor(h, sl, l, alpha);
};

// Input and output values in range [0, 1]
export const hsl2hsv = ({ h, s, l, alpha }: HSLColor): HSVColor => {
    // V is the highest RGB value
    const v = l + s * Math.min(l, 1 - l);

    // S is recalculated to match HSV's definition
    let sv: number;
    if (v === 0) {
        sv = 0;
    } else {
        sv = 2 * (1 - l / v);
    }

    return new HSVColor(h, sv, v, alpha);
};

// Input and output values in range [0, 1]
export const hwb2hsl = ({ h, w, b, alpha }: HWBColor): HSLColor => {
    // Convert HWB to HSV first
    let s: number, v: number;

    const sum = w + b;
    if (sum >= 1) {
        v = w / sum;
        s = 0;
    } else {
        v = 1 - b;
        s = v === 0 ? 0 : 1 - w / v;
    }

    // Then convert HSV to HSL
    return hsv2hsl(new HSVColor(h, s, v, alpha));
};

// Input and output values in range [0, 1]
export const hsl2hwb = ({ h, s, l, alpha }: HSLColor): HWBColor => {
    // Convert HSL to HSV first
    const { h: hh, s: ss, v } = hsl2hsv(new HSLColor(h, s, l, alpha));

    return new HWBColor(hh, v * (1 - ss), 1 - v, alpha);
};

// Input and output values in range [0, 1]
export const rgb2hsl = ({ r, g, b, alpha }: RGBColor): HSLColor => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Lightness: average of the largest and smallest color components
    let [h, s, l] = [0, 0, (max + min) / 2];

    // Chroma: the "colorfulness" of the color
    const c = max - min;

    // Saturation: determined by lightness
    s = c / (1 - Math.abs(2 * l - 1));

    // Hue: determined by which color component is maximum
    // Initial calculation gives h in [0, 6) range
    switch (max) {
        case r:
            // Red is max: h in [0, 2)
            h = (g - b) / c + (g < b ? 6 : 0);
            break;
        case g:
            // Green is max: h in [2, 4)
            h = (b - r) / c + 2;
            break;
        case b:
            // Blue is max: h in [4, 6)
            h = (r - g) / c + 4;
            break;
    }

    // Normalize h to [0, 1) range
    h /= 6;

    if (s < 0) {
        h = (h + 0.5) % 1;
        s = Math.abs(s) % 1;
    }
    if (h >= 1) {
        h -= 1;
    }

    return new HSLColor(h, s, l, alpha);
};

// Input and output values in range [0, 1]
export function hsl2rgb({ h, s, l, alpha }: HSLColor): RGBColor {
    // Chroma: the "colorfulness" of the color
    const c = (1 - Math.abs(2 * l - 1)) * s;

    // Second largest component of the color
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));

    // Amount to add to each component to match lightness
    const m = l - c / 2;

    let r: number, g: number, b: number;

    // Determine RGB based on hue sector
    if (h < 1 / 6) {
        [r, g, b] = [c, x, 0]; // Red to Yellow
    } else if (h < 2 / 6) {
        [r, g, b] = [x, c, 0]; // Yellow to Green
    } else if (h < 3 / 6) {
        [r, g, b] = [0, c, x]; // Green to Cyan
    } else if (h < 4 / 6) {
        [r, g, b] = [0, x, c]; // Cyan to Blue
    } else if (h < 5 / 6) {
        [r, g, b] = [x, 0, c]; // Blue to Magenta
    } else {
        [r, g, b] = [c, 0, x]; // Magenta to Red
    }

    // Add lightness component to each RGB value
    // The resulting r, g, b values are guaranteed to be in the [0, 1] range
    return new RGBColor(r + m, g + m, b + m, alpha);
}

// Constants for LAB color space calculations
const LAB_EPSILON = 216 / 24389; // Actual value is (6/29)^3
const LAB_EPSILON_3 = 24 / 116;

const LAB_KAPPA = 24389 / 27; // Actual value is (29/3)^3

const LAB_KAPPA_EPSILON = 8; // Product of KAPPA and EPSILON; exactly 8

const LAB_OFFSET = 16; // Offset for L* calculation

// Constants for scaling factors in LAB calculations
const LAB_SCALE_L = 116;
const LAB_SCALE_A = 500;
const LAB_SCALE_B = 200;

function xyzToD50(xyz: XYZColor): Vec3 {
    if (xyz.whitePoint === "D50") return [xyz.x, xyz.y, xyz.z];
    if (xyz.whitePoint === "D65") return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D65_D50);
    throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}

function xyzToD65(xyz: XYZColor): Vec3 {
    if (xyz.whitePoint === "D65") return [xyz.x, xyz.y, xyz.z];
    if (xyz.whitePoint === "D50") return transformMat3([xyz.x, xyz.y, xyz.z], WHITE_POINT_D50_D65);
    throw new Error(`Unsupported white point: ${xyz.whitePoint}`);
}

export function xyz2lab(xyz: XYZColor, toWhitePoint: WhitePoint = "D50"): LABColor {
    const labFunction = (value: number) =>
        value > LAB_EPSILON
            ? Math.cbrt(value)
            : (LAB_KAPPA * value + LAB_OFFSET) / LAB_SCALE_L;

    const whitePoint = WHITE_POINTS[toWhitePoint];

    const [x, y, z] = xyzToD50(xyz);

    // Normalize XYZ values relative to the given white point
    const xr = x / whitePoint[0], yr = y / whitePoint[1], zr = z / whitePoint[2];

    const fx = labFunction(xr), fy = labFunction(yr), fz = labFunction(zr);

    // Calculate L*, a*, and b* values
    const l = LAB_SCALE_L * fy - LAB_OFFSET; // L* = 116 * f(Y/Yn) - 16
    const a = LAB_SCALE_A * (fx - fy); // a* = 500 * [f(X/Xn) - f(Y/Yn)]
    const b = LAB_SCALE_B * (fy - fz); // b* = 200 * [f(Y/Yn) - f(Z/Zn)]

    const lab = new LABColor(
        scale(
            l,
            COLOR_SPACE_RANGES.lab.l.number.min,
            COLOR_SPACE_RANGES.lab.l.number.max,
        ),
        scale(
            a,
            COLOR_SPACE_RANGES.lab.a.number.min,
            COLOR_SPACE_RANGES.lab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.lab.b.number.min,
            COLOR_SPACE_RANGES.lab.b.number.max,
        ),
        xyz.alpha,
    );

    lab.whitePoint = toWhitePoint;

    return lab;
}

export function lab2xyz(lab: LABColor): XYZColor {
    const labFunctionXZ = (value: number) =>
        value > LAB_EPSILON_3
            ? value ** 3
            : (LAB_SCALE_L * value - LAB_OFFSET) / LAB_KAPPA;

    const labFunctionY = (value: number) =>
        value > LAB_KAPPA_EPSILON
            ? ((value + LAB_OFFSET) / LAB_SCALE_L) ** 3
            : value / LAB_KAPPA;

    const whitePoint = WHITE_POINTS[lab.whitePoint];

    let { l, a, b, alpha } = lab;

    l = scale(
        l,
        0,
        1,
        COLOR_SPACE_RANGES.lab.l.number.min,
        COLOR_SPACE_RANGES.lab.l.number.max,
    );
    a = scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.lab.a.number.min,
        COLOR_SPACE_RANGES.lab.a.number.max,
    );
    b = scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.lab.b.number.min,
        COLOR_SPACE_RANGES.lab.b.number.max,
    );

    // Inverse of the xyz2lab function
    const fy = (l + LAB_OFFSET) / LAB_SCALE_L; // f(Y/Yn) = (L* + 16) / 116
    const fx = a / LAB_SCALE_A + fy; // f(X/Xn) = a* / 500 + f(Y/Yn)
    const fz = fy - b / LAB_SCALE_B; // f(Z/Zn) = f(Y/Yn) - b* / 200

    // Apply the inverse lab function to each value
    const [xr, yr, zr] = [labFunctionXZ(fx), labFunctionY(l), labFunctionXZ(fz)];

    // Denormalize XYZ values relative to the given white point
    let x = xr * whitePoint[0], y = yr * whitePoint[1], z = zr * whitePoint[2];

    const xyz = new XYZColor(x, y, z, alpha);
    xyz.whitePoint = lab.whitePoint;

    // All XYZ outputs are relative to D65:
    [x, y, z] = xyzToD65(xyz);

    xyz.whitePoint = "D65";

    xyz.x = x;
    xyz.y = y;
    xyz.z = z;

    return xyz;
}

// Constants for RGB to XYZ conversion (row-major)
// The literal values are the mathematical matrix in row-major order.
const RGB_XYZ_MATRIX: Mat3 = [
    0.41239079926595934, 0.357584339383878, 0.1804807884018343,
    0.21263900587151027, 0.715168678767756, 0.07219231536073371,
    0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
];

const XYZ_RGB_MATRIX: Mat3 = invertMat3(RGB_XYZ_MATRIX);

// Constants for sRGB to linear RGB conversion
const SRGB_GAMMA = 2.4; // sRGB gamma
const SRGB_OFFSET = 0.055; // sRGB offset
const SRGB_SLOPE = 12.92; // sRGB slope for low values

const SRGB_TRANSITION = 0.04045; // sRGB transition point
const SRGB_LINEAR_TRANSITION = SRGB_TRANSITION / SRGB_SLOPE; // sRGB linear transition point

// Helper function to convert sRGB to linear RGB
export function srgbToLinear(channel: number): number {
    // sRGB uses a piecewise function:
    // - A linear portion for low values (below the transition point)
    // - A power function for higher values
    // This accounts for the non-linear perception of brightness by human eyes
    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;

    if (abs <= SRGB_LINEAR_TRANSITION) {
        return channel / SRGB_SLOPE;
    } else {
        return sign * ((abs + SRGB_OFFSET) / (1 + SRGB_OFFSET)) ** SRGB_GAMMA;
    }
}

// Helper function to convert linear RGB to sRGB
export function linearToSrgb(channel: number): number {
    // This function is the inverse of srgbToLinear
    // It applies the sRGB transfer function to convert linear RGB values back to sRGB

    const sign = channel < 0 ? -1 : 1;
    const abs = channel * sign;

    if (abs <= SRGB_LINEAR_TRANSITION) {
        // Linear function for low values
        return channel * SRGB_SLOPE;
    } else {
        // Power function: applies gamma correction
        return sign * ((1 + SRGB_OFFSET) * abs ** (1 / SRGB_GAMMA) - SRGB_OFFSET);
    }
}

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
        return new RGBColor(rgb.r, rgb.g, rgb.b, alpha) as any;
    } else {
        return new RGBColor(r, g, b, alpha);
    }
};

// Input and output values in range [0, 1]
export function lch2lab({ l, c, h, alpha }: LCHColor): LABColor {
    c = scale(
        c,
        0,
        1,
        COLOR_SPACE_RANGES.lch.c.number.min,
        COLOR_SPACE_RANGES.lch.c.number.max,
    );

    const hRad = h * 2 * Math.PI;
    const a = Math.cos(hRad) * c;
    const b = Math.sin(hRad) * c;

    return new LABColor(
        l,
        scale(
            a,
            COLOR_SPACE_RANGES.lab.a.number.min,
            COLOR_SPACE_RANGES.lab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.lab.b.number.min,
            COLOR_SPACE_RANGES.lab.b.number.max,
        ),
        alpha,
    );
}

// Input and output values in range [0, 1]
export function lab2lch({ l, a, b, alpha }: LABColor): LCHColor {
    a = scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.lab.a.number.min,
        COLOR_SPACE_RANGES.lab.a.number.max,
    );
    b = scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.lab.b.number.min,
        COLOR_SPACE_RANGES.lab.b.number.max,
    );

    const c = Math.hypot(a, b);

    let h = Math.atan2(b, a) / (2 * Math.PI);
    if (h < 0) h += 1;

    return new LCHColor(
        l,
        scale(
            c,
            COLOR_SPACE_RANGES.lch.c.number.min,
            COLOR_SPACE_RANGES.lch.c.number.max,
        ),
        h,
        alpha,
    );
}


// Input and output values in range [0, 1]
export function oklab2xyz({ l, a, b, alpha }: OKLABColor): XYZColor {
    a = scale(
        a,
        0,
        1,
        COLOR_SPACE_RANGES.oklab.a.number.min,
        COLOR_SPACE_RANGES.oklab.a.number.max,
    );
    b = scale(
        b,
        0,
        1,
        COLOR_SPACE_RANGES.oklab.b.number.min,
        COLOR_SPACE_RANGES.oklab.b.number.max,
    );

    // Convert OKLab to LMS
    const lms = transformMat3([l, a, b] as Vec3, OKLAB_TO_LMS_MATRIX);

    // Apply non-linearity (LMS to linear LMS)
    const lmsLinear: Vec3 = [lms[0] * lms[0] * lms[0], lms[1] * lms[1] * lms[1], lms[2] * lms[2] * lms[2]];

    // Convert linear LMS to XYZ
    const [x, y, z] = transformMat3(lmsLinear, LMS_TO_XYZ_MATRIX);

    return new XYZColor(x, y, z, alpha);
}

// Input and output values in range [0, 1]
export function xyz2oklab(xyz: XYZColor): OKLABColor {
    const { x, y, z } = xyz;

    // Convert XYZ to linear LMS
    const lmsLinear = transformMat3([x, y, z] as Vec3, XYZ_TO_LMS_MATRIX);

    // Apply non-linearity (linear LMS to LMS)
    const lms: Vec3 = [Math.cbrt(lmsLinear[0]), Math.cbrt(lmsLinear[1]), Math.cbrt(lmsLinear[2])];

    // Convert LMS to OKLab
    const [l, a, b] = transformMat3(lms, LMS_TO_OKLAB_MATRIX);

    return new OKLABColor(
        l,
        scale(
            a,
            COLOR_SPACE_RANGES.oklab.a.number.min,
            COLOR_SPACE_RANGES.oklab.a.number.max,
        ),
        scale(
            b,
            COLOR_SPACE_RANGES.oklab.b.number.min,
            COLOR_SPACE_RANGES.oklab.b.number.max,
        ),
        xyz.alpha,
    );
}

// Input and output values in range [0, 1]
export function oklab2lab(oklab: OKLABColor): LABColor {
    const xyz = oklab2xyz(oklab);
    return xyz2lab(xyz);
}

// Input and output values in range [0, 1]
export function lab2oklab(lab: LABColor): OKLABColor {
    const xyz = lab2xyz(lab);
    return xyz2oklab(xyz);
}

// Input and output values in range [0, 1]
export function oklab2oklch({ l, a, b, alpha }: OKLABColor): OKLCHColor {
    // Denormalize a,b from [0,1] to OKLab range [-0.4, 0.4]
    a = scale(a, 0, 1, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max);
    b = scale(b, 0, 1, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max);

    const c = Math.hypot(a, b);

    let h = Math.atan2(b, a) / (2 * Math.PI);
    if (h < 0) h += 1;

    return new OKLCHColor(
        l,
        scale(c, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max),
        h,
        alpha,
    );
}

// Input and output values in range [0, 1]
export function oklch2oklab({ l, c, h, alpha }: OKLCHColor): OKLABColor {
    // Denormalize c from [0,1] to OKLCh range [0, 0.5]
    c = scale(c, 0, 1, COLOR_SPACE_RANGES.oklch.c.number.min, COLOR_SPACE_RANGES.oklch.c.number.max);

    const hRad = h * 2 * Math.PI;
    const a = Math.cos(hRad) * c;
    const b = Math.sin(hRad) * c;

    return new OKLABColor(
        l,
        scale(a, COLOR_SPACE_RANGES.oklab.a.number.min, COLOR_SPACE_RANGES.oklab.a.number.max),
        scale(b, COLOR_SPACE_RANGES.oklab.b.number.min, COLOR_SPACE_RANGES.oklab.b.number.max),
        alpha,
    );
}

// Input and output values in range [0, 1]
export function oklch2lab(oklch: OKLCHColor): LABColor {
    return oklab2lab(oklch2oklab(oklch));
}

export function lab2oklch(lab: LABColor): OKLCHColor {
    return oklab2oklch(lab2oklab(lab));
}

// Conversion functions to normalize any given space to XYZ and back

export function hsl2xyz(hsl: HSLColor) {
    const rgb = hsl2rgb(hsl);
    return rgb2xyz(rgb);
}

export function xyz2hsl(xyz: XYZColor) {
    const rgb = xyz2rgb(xyz);
    return rgb2hsl(rgb);
}

export function hsv2xyz(hsv: HSVColor): XYZColor {
    const hsl = hsv2hsl(hsv);
    return hsl2xyz(hsl);
}

export function xyz2hsv(xyz: XYZColor): HSVColor {
    const hsl = xyz2hsl(xyz);
    return hsl2hsv(hsl);
}

export function hwb2xyz(hwb: HWBColor): XYZColor {
    const hsl = hwb2hsl(hwb);
    return hsl2xyz(hsl);
}

export function xyz2hwb(xyz: XYZColor): HWBColor {
    const hsl = xyz2hsl(xyz);
    return hsl2hwb(hsl);
}

export function lch2xyz(lch: LCHColor): XYZColor {
    const lab = lch2lab(lch);
    return lab2xyz(lab);
}

export function xyz2lch(xyz: XYZColor): LCHColor {
    const lab = xyz2lab(xyz);
    return lab2lch(lab);
}

export function oklch2xyz(oklch: OKLCHColor): XYZColor {
    const oklab = oklch2oklab(oklch);
    return oklab2xyz(oklab);
}

export function xyz2oklch(xyz: XYZColor): OKLCHColor {
    const oklab = xyz2oklab(xyz);
    return oklab2oklch(oklab);
}

export function kelvin2xyz(kelvin: KelvinColor): XYZColor {
    const rgb = kelvin2rgb(kelvin);
    return rgb2xyz(rgb);
}

export function xyz2kelvin(xyz: XYZColor): KelvinColor {
    const rgb = xyz2rgb(xyz);
    return rgb2kelvin(rgb);
}

// --- Phase 6: Generic color() function — Transfer functions and matrices ---

// Adobe RGB (1998) transfer function: simple gamma 2.19921875 (563/256)
const ADOBE_RGB_GAMMA = 563 / 256;

export function adobeRgbToLinear(c: number): number {
    const sign = c < 0 ? -1 : 1;
    return sign * Math.abs(c) ** ADOBE_RGB_GAMMA;
}

export function linearToAdobeRgb(c: number): number {
    const sign = c < 0 ? -1 : 1;
    return sign * Math.abs(c) ** (1 / ADOBE_RGB_GAMMA);
}

// ProPhoto RGB (ROMM) transfer function: piecewise, Et = 1/512
const PROPHOTO_ET = 1 / 512;
const PROPHOTO_GAMMA = 1.8;

export function proPhotoToLinear(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const abs = Math.abs(c);
    return sign * (abs <= PROPHOTO_ET * 16 ? abs / 16 : abs ** PROPHOTO_GAMMA);
}

export function linearToProPhoto(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const abs = Math.abs(c);
    return sign * (abs >= PROPHOTO_ET ? abs ** (1 / PROPHOTO_GAMMA) : abs * 16);
}

// Rec. 2020 transfer function (BT.2020)
const REC2020_ALPHA = 1.09929682680944;
const REC2020_BETA = 0.018053968510807;

export function rec2020ToLinear(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const abs = Math.abs(c);
    if (abs < REC2020_BETA * 4.5) {
        return sign * abs / 4.5;
    }
    return sign * ((abs + REC2020_ALPHA - 1) / REC2020_ALPHA) ** (1 / 0.45);
}

export function linearToRec2020(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const abs = Math.abs(c);
    if (abs >= REC2020_BETA) {
        return sign * (REC2020_ALPHA * abs ** 0.45 - (REC2020_ALPHA - 1));
    }
    return sign * 4.5 * abs;
}

// XYZ matrices for new color spaces (from CSS Color 4 spec, row-major)

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

export function linearSrgb2xyz({ r, g, b, alpha }: LinearSRGBColor): XYZColor {
    const [x, y, z] = transformMat3([r, g, b] as Vec3, RGB_XYZ_MATRIX);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2linearSrgb({ x, y, z, alpha }: XYZColor): LinearSRGBColor {
    const [r, g, b] = transformMat3([x, y, z] as Vec3, XYZ_RGB_MATRIX);
    return new LinearSRGBColor(r, g, b, alpha);
}

export function displayP32xyz({ r, g, b, alpha }: DisplayP3Color): XYZColor {
    // Display P3 uses the same sRGB transfer function
    const linear: Vec3 = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
    const [x, y, z] = transformMat3(linear, DISPLAY_P3_XYZ_MATRIX);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2displayP3({ x, y, z, alpha }: XYZColor): DisplayP3Color {
    const linear = transformMat3([x, y, z] as Vec3, XYZ_DISPLAY_P3_MATRIX);
    return new DisplayP3Color(linearToSrgb(linear[0]), linearToSrgb(linear[1]), linearToSrgb(linear[2]), alpha);
}

export function adobeRgb2xyz({ r, g, b, alpha }: AdobeRGBColor): XYZColor {
    const linear: Vec3 = [adobeRgbToLinear(r), adobeRgbToLinear(g), adobeRgbToLinear(b)];
    const [x, y, z] = transformMat3(linear, ADOBE_RGB_XYZ_MATRIX);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2adobeRgb({ x, y, z, alpha }: XYZColor): AdobeRGBColor {
    const linear = transformMat3([x, y, z] as Vec3, XYZ_ADOBE_RGB_MATRIX);
    return new AdobeRGBColor(linearToAdobeRgb(linear[0]), linearToAdobeRgb(linear[1]), linearToAdobeRgb(linear[2]), alpha);
}

export function proPhoto2xyz({ r, g, b, alpha }: ProPhotoRGBColor): XYZColor {
    const linear: Vec3 = [proPhotoToLinear(r), proPhotoToLinear(g), proPhotoToLinear(b)];
    // ProPhoto is native D50 — multiply by D50 matrix, then adapt to D65
    const xyzD50 = transformMat3(linear, PROPHOTO_XYZ_D50_MATRIX);
    const [x, y, z] = transformMat3(xyzD50, WHITE_POINT_D50_D65);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2proPhoto({ x, y, z, alpha }: XYZColor): ProPhotoRGBColor {
    // Adapt from D65 to D50, then apply inverse matrix
    const xyzD50 = transformMat3([x, y, z] as Vec3, WHITE_POINT_D65_D50);
    const linear = transformMat3(xyzD50, XYZ_D50_PROPHOTO_MATRIX);
    return new ProPhotoRGBColor(linearToProPhoto(linear[0]), linearToProPhoto(linear[1]), linearToProPhoto(linear[2]), alpha);
}

export function rec20202xyz({ r, g, b, alpha }: Rec2020Color): XYZColor {
    const linear: Vec3 = [rec2020ToLinear(r), rec2020ToLinear(g), rec2020ToLinear(b)];
    const [x, y, z] = transformMat3(linear, REC2020_XYZ_MATRIX);
    return new XYZColor(x, y, z, alpha);
}

export function xyz2rec2020({ x, y, z, alpha }: XYZColor): Rec2020Color {
    const linear = transformMat3([x, y, z] as Vec3, XYZ_REC2020_MATRIX);
    return new Rec2020Color(linearToRec2020(linear[0]), linearToRec2020(linear[1]), linearToRec2020(linear[2]), alpha);
}

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

export function color2<T, C extends ColorSpace>(color: Color<T>, to: C) {
    if (color.colorSpace === to) {
        return color;
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

export { deltaEOK, isInSRGBGamut, DELTA_E_OK_JND } from "./gamut";

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
    const resultAlpha = (lerp(p2, a1, a2)) * alphaMultiplier;

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
            const mixed = lerp(p2, premul1, premul2);
            resultComponents.push(resultAlpha > 0 ? mixed / resultAlpha : 0);
        }
    }

    // Create result color in the interpolation space
    const ResultClass = c1.constructor as new (...args: any[]) => Color;
    const result = new ResultClass(...resultComponents, resultAlpha);

    return result;
}
