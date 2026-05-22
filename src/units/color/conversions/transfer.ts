/**
 * Transfer functions — gamma encode/decode for the RGB-family color spaces.
 *
 * Each wide-gamut RGB space carries its own opto-electronic transfer function
 * (OETF) and its inverse. These are pure scalar functions — no color-class
 * dependency — consumed by `xyz-extended.ts` (the matrix-multiply converters)
 * and by the OKLab/RGB direct paths in `dispatch.ts`.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

// ── sRGB transfer function ──

const SRGB_GAMMA = 2.4; // sRGB gamma
const SRGB_OFFSET = 0.055; // sRGB offset
const SRGB_SLOPE = 12.92; // sRGB slope for low values

const SRGB_TRANSITION = 0.04045; // sRGB transition point
const SRGB_LINEAR_TRANSITION = SRGB_TRANSITION / SRGB_SLOPE; // sRGB linear transition point

/** Convert an sRGB channel to linear-light sRGB. */
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

/** Convert a linear-light sRGB channel back to gamma-encoded sRGB. */
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

/** Identity transfer (linear-light spaces — no gamma curve). */
export const linearTransfer = (c: number): number => c;

// ── Adobe RGB (1998) transfer function: simple gamma 2.19921875 (563/256) ──

const ADOBE_RGB_GAMMA = 563 / 256;

export function adobeRgbToLinear(c: number): number {
    const sign = c < 0 ? -1 : 1;
    return sign * Math.abs(c) ** ADOBE_RGB_GAMMA;
}

export function linearToAdobeRgb(c: number): number {
    const sign = c < 0 ? -1 : 1;
    return sign * Math.abs(c) ** (1 / ADOBE_RGB_GAMMA);
}

// ── ProPhoto RGB (ROMM) transfer function: piecewise, Et = 1/512 ──

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

// ── Rec. 2020 transfer function (BT.2020) ──

const REC2020_ALPHA = 1.09929682680944;
const REC2020_BETA = 0.018053968510807;

export function rec2020ToLinear(c: number): number {
    const sign = c < 0 ? -1 : 1;
    const abs = Math.abs(c);
    if (abs < REC2020_BETA * 4.5) {
        return (sign * abs) / 4.5;
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
