/**
 * Palette mixing — combine N palettes into a single result palette.
 *
 * Three strategies handle different-sized palettes:
 * - **discard**: only mix the common (shortest) rows
 * - **repeat**: wrap shorter palettes cyclically to match the longest
 * - **distribute**: linearly interpolate shorter palettes across the longest length
 */

import {
    mixColors,
    type AnyColor,
    type HueInterpolationMethod,
} from "@mkbabb/value.js/color";
import { colorToCss, parseColorIn } from "../color-session/color-utils";
import type { PickerColorIn, PickerSpace } from "../color-session/picker-color";
import type { Palette, PaletteColor } from "./types";

export type LeftoverStrategy = "distribute" | "repeat" | "discard";

export interface PaletteMixOptions {
    space?: PickerSpace;
    hueMethod?: HueInterpolationMethod;
    leftoverStrategy?: LeftoverStrategy;
    weights?: number[];
}

function mixedOrThrow<S extends PickerSpace>(
    from: AnyColor,
    to: AnyColor,
    progress: number,
    space: S,
    hueMethod: HueInterpolationMethod,
): PickerColorIn<S> {
    const result = mixColors(from, to, progress, { space, hue: hueMethod });
    if (!result.ok) throw new Error(`Color mix failed: ${result.error.code}`);
    return result.value as unknown as PickerColorIn<S>;
}

export function mixColorSequence(
    colors: readonly AnyColor[],
    space: PickerSpace,
    hueMethod: HueInterpolationMethod,
    weights: readonly number[] = colors.map(() => 1),
): AnyColor {
    if (colors.length === 0) throw new Error("At least one color is required");
    if (weights.length !== colors.length) {
        throw new Error("Each color requires a weight");
    }
    if (weights.some((weight) => !Number.isFinite(weight) || weight < 0)) {
        throw new Error("Color weights must be finite and nonnegative");
    }
    if (weights.every((weight) => weight === 0)) {
        throw new Error("At least one color weight must be positive");
    }

    let mixed = colors[0]!;
    let accumulated = weights[0]!;
    for (let index = 1; index < colors.length; index++) {
        const weight = weights[index]!;
        if (weight === 0) continue;
        const total = accumulated + weight;
        mixed = mixedOrThrow(mixed, colors[index]!, weight / total, space, hueMethod);
        accumulated = total;
    }
    return mixed;
}

function getColorAtIndex(
    palette: Palette,
    index: number,
    resultLength: number,
    strategy: LeftoverStrategy,
    space: PickerSpace,
    hueMethod: HueInterpolationMethod,
): AnyColor {
    const len = palette.colors.length;

    if (index < len) {
        return parseColorIn(palette.colors[index]!.css, space);
    }

    switch (strategy) {
        case "discard":
            throw new Error("Index out of bounds in discard mode");

        case "repeat":
            return parseColorIn(palette.colors[index % len]!.css, space);

        case "distribute": {
            const fracPos = (index * (len - 1)) / (resultLength - 1);
            const lo = Math.floor(fracPos);
            const hi = Math.min(lo + 1, len - 1);
            const t = fracPos - lo;

            if (t === 0 || lo === hi) {
                return parseColorIn(palette.colors[lo]!.css, space);
            }

            const c1 = parseColorIn(palette.colors[lo]!.css, space);
            const c2 = parseColorIn(palette.colors[hi]!.css, space);
            return mixedOrThrow(c1, c2, t, space, hueMethod);
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
            getColorAtIndex(
                palette,
                i,
                resultLength,
                leftoverStrategy,
                space,
                hueMethod,
            ),
        );

        const mixed = mixColorSequence(colors, space, hueMethod, weights);
        result.push({ css: colorToCss(mixed), position: i });
    }

    return result;
}
