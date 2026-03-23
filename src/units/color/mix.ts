/**
 * N-color mixing — extends the 2-color `mixColors()` to arbitrary counts.
 *
 * Uses pairwise left-fold: mix(c0, c1) → mix(result, c2) → … with
 * accumulated weight ratios so that each color's original weight is
 * respected across the chain. All CSS Color Level 4 semantics (premultiplied
 * alpha, NaN propagation, hue interpolation methods) are inherited from
 * the underlying `mixColors()`.
 */

import type { Color } from ".";
import type { ColorSpace } from "./constants";
import { mixColors } from "./utils";
import type { HueInterpolationMethod } from "./utils";

/**
 * Mix N colors with optional per-color weights.
 *
 * @param colors  Array of Color objects (must be ≥ 1). All should be
 *                normalized (components in [0, 1]).
 * @param weights Optional per-color weights (same length as `colors`).
 *                Defaults to equal weighting. Values need not sum to 1 —
 *                they are normalized internally.
 * @param space   Interpolation color space (default "oklab").
 * @param hueMethod  Hue interpolation for cylindrical spaces (default "shorter").
 * @returns A single Color in the interpolation space.
 */
export function mixColorsN(
    colors: Color[],
    weights?: number[],
    space: ColorSpace = "oklab",
    hueMethod: HueInterpolationMethod = "shorter",
): Color {
    if (colors.length === 0) {
        throw new Error("mixColorsN requires at least one color");
    }
    if (colors.length === 1) {
        return colors[0]!;
    }

    // Default to equal weights
    const w = weights ?? colors.map(() => 1);
    if (w.length !== colors.length) {
        throw new Error(
            `Weight count (${w.length}) must match color count (${colors.length})`,
        );
    }

    // Normalize weights to sum to 1
    const totalWeight = w.reduce((sum, wi) => sum + Math.max(0, wi), 0);
    if (totalWeight === 0) {
        // All zero weights — treat as equal
        const equal = 1 / colors.length;
        w.fill(equal);
    } else {
        for (let i = 0; i < w.length; i++) {
            w[i] = Math.max(0, w[i]!) / totalWeight;
        }
    }

    // Pairwise left-fold.
    // At each step we mix the running result with the next color.
    // Running weight accumulates so the ratio is correct:
    //   mix(running, next, accum / (accum + w_next), w_next / (accum + w_next))
    let result = colors[0]!;
    let accum = w[0]!;

    for (let i = 1; i < colors.length; i++) {
        const wi = w[i]!;
        const sum = accum + wi;
        if (sum === 0) continue;

        // p1 = proportion of running result, p2 = proportion of new color
        const p1 = accum / sum;
        const p2 = wi / sum;
        result = mixColors(result, colors[i]!, p1, p2, space, hueMethod);
        accum = sum;
    }

    return result;
}
