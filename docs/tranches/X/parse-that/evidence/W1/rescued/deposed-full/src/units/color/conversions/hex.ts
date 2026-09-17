/**
 * Hex color conversions — `#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa`
 * parse + serialize.
 *
 * G.W1 Lane B — extracted from `src/units/color/utils.ts` (G3 decomposition).
 */

import { RGBColor } from "..";
import { RGBA_MAX } from "../constants";

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
