/**
 * Cylindrical RGB-derived color spaces — HSL, HSV, HWB.
 *
 * HSL/HSV/HWB are closed-form cylindrical re-parameterizations of sRGB —
 * `rgb2hsl` / `hsl2rgb` need no XYZ intermediate at all. The XYZ-hub
 * compositions (`hsl2xyz`, `xyz2hsv`, …) route through sRGB to reach the hub.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import {
    HSLColor,
    HSVColor,
    HWBColor,
    RGBColor,
    XYZColor,
} from "..";
import { rgb2xyz, xyz2rgb } from "./xyz-extended";

// ── HSV ↔ HSL ↔ HWB (cylindrical-to-cylindrical, closed form) ──

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

// ── HSL ↔ RGB (closed-form cylindrical, no XYZ) ──

// Input and output values in range [0, 1]
export const rgb2hsl = ({ r, g, b, alpha }: RGBColor): HSLColor => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Lightness: average of the largest and smallest color components
    let [h, s, l] = [0, 0, (max + min) / 2];

    // Chroma: the "colorfulness" of the color
    const c = max - min;

    // Achromatic: no chroma means no hue or saturation
    if (c === 0) return new HSLColor(0, 0, l, alpha);

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

// ── XYZ-hub composition for the cylindrical spaces ──

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
