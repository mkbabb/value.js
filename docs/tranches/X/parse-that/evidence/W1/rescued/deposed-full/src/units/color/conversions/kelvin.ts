/**
 * Kelvin (color temperature) conversions.
 *
 * `kelvin2rgb` / `rgb2kelvin` approximate the blackbody-radiation curve;
 * `kelvin2xyz` / `xyz2kelvin` compose those with the sRGB↔XYZ matrix path.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import { ch, KelvinColor, RGBColor } from "..";
import type { XYZColor } from "..";
import { clamp } from "../../../math";
import { RGBA_MAX } from "../constants";
import { rgb2xyz, xyz2rgb } from "./xyz-extended";

const MIN_TEMP = 1000;
const MAX_TEMP = 40000;
const TEMP_SCALE = 100;

// Based on approximations by Tanner Helland: https://tannerhelland.com/2012/09/18/convert-temperature-rgb-algorithm-code.html
// Valid for temperatures between 1000K and 40,000K
export const kelvin2rgb = ({ kelvin, alpha }: KelvinColor): RGBColor => {
    // Clamp temperature to valid range and scale down
    kelvin = ch(clamp(kelvin, MIN_TEMP, MAX_TEMP) / TEMP_SCALE);
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
    r = ch(clamp(r * RGBA_MAX, 0, RGBA_MAX));
    g = ch(clamp(g * RGBA_MAX, 0, RGBA_MAX));
    b = ch(clamp(b * RGBA_MAX, 0, RGBA_MAX));

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

export function kelvin2xyz(kelvin: KelvinColor): XYZColor {
    const rgb = kelvin2rgb(kelvin);
    return rgb2xyz(rgb);
}

export function xyz2kelvin(xyz: XYZColor): KelvinColor {
    const rgb = xyz2rgb(xyz);
    return rgb2kelvin(rgb);
}
