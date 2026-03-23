/**
 * Palette mixing — combine N palettes into a single result palette.
 *
 * Three strategies handle different-sized palettes:
 * - **discard**: only mix the common (shortest) rows
 * - **repeat**: wrap shorter palettes cyclically to match the longest
 * - **distribute**: linearly interpolate shorter palettes across the longest length
 */

import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { mixColorsN } from "@src/units/color/mix";
import { mixColors } from "@src/units/color/utils";
import type { Color } from "@src/units/color";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";
import type { Palette, PaletteColor } from "./types";

export type LeftoverStrategy = "distribute" | "repeat" | "discard";

export interface PaletteMixOptions {
    space?: ColorSpace;
    hueMethod?: HueInterpolationMethod;
    leftoverStrategy?: LeftoverStrategy;
    weights?: number[];
}

function cssToColor(css: string, space: ColorSpace): Color<number> {
    const color = cssToRawColor(css, space);
    if (!color) throw new Error(`Failed to parse color: "${css}"`);
    return color;
}

function getColorAtIndex(
    palette: Palette,
    index: number,
    resultLength: number,
    strategy: LeftoverStrategy,
    space: ColorSpace,
): Color<number> {
    const len = palette.colors.length;

    if (index < len) {
        return cssToColor(palette.colors[index]!.css, space);
    }

    switch (strategy) {
        case "discard":
            throw new Error("Index out of bounds in discard mode");

        case "repeat":
            return cssToColor(palette.colors[index % len]!.css, space);

        case "distribute": {
            const fracPos = (index * (len - 1)) / (resultLength - 1);
            const lo = Math.floor(fracPos);
            const hi = Math.min(lo + 1, len - 1);
            const t = fracPos - lo;

            if (t === 0 || lo === hi) {
                return cssToColor(palette.colors[lo]!.css, space);
            }

            const c1 = cssToColor(palette.colors[lo]!.css, space);
            const c2 = cssToColor(palette.colors[hi]!.css, space);
            return mixColors(c1, c2, 1 - t, t, space);
        }
    }
}

export function mixPalettes(
    palettes: Palette[],
    options: PaletteMixOptions = {},
): PaletteColor[] {
    const {
        space = "oklab",
        hueMethod = "shorter",
        leftoverStrategy = "discard",
        weights,
    } = options;

    if (palettes.length === 0) return [];
    if (palettes.length === 1) return [...palettes[0]!.colors];

    const lengths = palettes.map((p) => p.colors.length);
    const minLen = Math.min(...lengths);
    const maxLen = Math.max(...lengths);
    const resultLength = leftoverStrategy === "discard" ? minLen : maxLen;
    if (resultLength === 0) return [];

    const result: PaletteColor[] = [];

    for (let i = 0; i < resultLength; i++) {
        const colors = palettes.map((palette) =>
            getColorAtIndex(palette, i, resultLength, leftoverStrategy, space),
        );

        const mixed = mixColorsN(colors, weights, space, hueMethod);
        result.push({ css: rawColorToCSS(mixed), position: i });
    }

    return result;
}
