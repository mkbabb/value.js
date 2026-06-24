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
import { color2, gamutMap, mixColors } from "./dispatch";
import type { HueInterpolationMethod } from "./dispatch";

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

// ── sampleColorRamp — the perceptual N-stop ramp sampler ──────────────────────
//
// The INVERSE SIBLING of `mixColorsN`: `mixColorsN` folds N colors → 1;
// `sampleColorRamp` expands 2 colors → N evenly-spaced perceptual stops. It is a
// COMPOSITION over already-shipped color kernels — `mixColors` (the per-step
// perceptual lerp, premul-alpha/NaN/hue all inherited) + `gamutMapOKLab` (the
// per-stop egress so no stop silently sRGB-clips). ZERO new color science.
// (value.js owns VALUES — the perceptual color science; keyframes.js K.W10 owns
// TIME — how many stops, where in the keyframe timeline. GRAMMAR-FOLD §I.)

/** Options for {@link sampleColorRamp}. */
export interface SampleRampOptions {
    /** Interpolation space; default `"oklab"`. `"oklch"` for cylindrical hue paths. */
    space?: ColorSpace;
    /** Cylindrical hue path; default `"shorter"` (the parameter bare two-stop
     *  `@keyframes` cannot encode — the thing the ramp exists to bake). */
    hueMethod?: HueInterpolationMethod;
    /** `"inclusive"` (default) — n stops INCLUDING from & to; `"exclusive"` —
     *  n stops at the bin centers `(i+0.5)/n` (endpoints not emitted). */
    endpoints?: "inclusive" | "exclusive";
    /** When true (default) each emitted stop is mapped in-sRGB-gamut via
     *  {@link gamutMapOKLab}, so no stop silently clips. */
    gamutMap?: boolean;
}

/**
 * Map a single ramp stop into the sRGB gamut, re-emitting in the ramp's
 * interpolation `space`.
 *
 * Routes through `gamutMap(stop, "rgb")` — the Color→Color egress kernel
 * (`dispatch.ts:269`) that (a) passes a strictly in-gamut stop through UNCHANGED
 * (so the endpoints survive identity-exact, gate clause 5), and (b) for an
 * out-of-gamut stop runs the Ottosson `gamutMapOKLab` map (`gamut.ts:247`) with
 * exact hue preservation. The ramp inherits whatever cusp/α policy that kernel
 * owns — if N.W11.A re-anchors the gamut policy, every ramp stop improves with
 * zero change here.
 */
function gamutMapStop(stop: Color, space: ColorSpace): Color {
    const mapped = gamutMap(stop, "rgb");
    return mapped.colorSpace === space
        ? mapped
        : (color2(mapped, space) as Color);
}

/**
 * Sample an N-stop perceptual ramp interpolating `from` → `to` in `space`.
 *
 * Returns `n` colors. With `endpoints:"inclusive"` (default) `stop[0]` is `from`
 * and `stop[n-1]` is `to`, with `n-2` evenly-spaced interior stops at
 * `t = i/(n-1)`; with `"exclusive"` the stops sit at the bin centers
 * `t = (i+0.5)/n`. Each stop is the `mixColors` perceptual lerp at its `t`
 * (premultiplied alpha, NaN propagation, and the `hueMethod` cylindrical hue
 * path all inherited from `mixColors`) and, when `gamutMap` is true (default),
 * mapped in-sRGB-gamut via `gamutMapOKLab`.
 *
 * @param from  start `Color` (the same shape `mixColors`/`mixColorsN` accept).
 * @param to    end `Color`.
 * @param n     stop count; `n ≥ 2` (throws otherwise — mirrors `mixColorsN`'s
 *              empty-input throw). `n = 2` returns the gamut-mapped endpoints.
 * @param opts  {@link SampleRampOptions}.
 * @returns     `Color[]` of length `n`, each in the interpolation `space`.
 *
 * @example
 * sampleColorRamp(red, blue, 8, { space: "oklch", hueMethod: "longer" })
 * // → 8 stops tracing the LONG hue arc (through green/yellow) — the path
 * //   bare two-stop `@keyframes` cannot encode.
 */
export function sampleColorRamp(
    from: Color,
    to: Color,
    n: number,
    opts: SampleRampOptions = {},
): Color[] {
    const {
        space = "oklab",
        hueMethod = "shorter",
        endpoints = "inclusive",
        gamutMap = true,
    } = opts;

    if (n < 2) {
        throw new Error(`sampleColorRamp requires n ≥ 2, got ${n}`);
    }

    // Hoist the space conversion OUT of the per-stop loop: `mixColors` re-converts
    // both endpoints every call, so a naive ramp pays the conversion 2n×. By
    // lifting both endpoints into `space` ONCE, each per-stop `mixColors` finds
    // its inputs already in `space` (its `color2` short-circuits on a same-space
    // input — dispatch.ts:165) and the ramp pays the conversion only 2×.
    const a = color2(from, space) as Color;
    const b = color2(to, space) as Color;

    const out: Color[] = new Array(n);
    for (let i = 0; i < n; i++) {
        const t =
            endpoints === "inclusive" ? i / (n - 1) : (i + 0.5) / n;
        let stop = mixColors(a, b, 1 - t, t, space, hueMethod);
        if (gamutMap) stop = gamutMapStop(stop, space);
        out[i] = stop;
    }
    return out;
}

/**
 * Sample a SINGLE perceptual ramp stop at parameter `t ∈ [0, 1]` — the
 * array-free, single-`t` sibling of {@link sampleColorRamp} (VJ-Q3, 1.2.0).
 *
 * `sampleColorRamp(from, to, n)[i]` rebuilds the WHOLE n-stop ramp (each stop a
 * `mixColors` + a `gamutMap`) — O(n) — even when a consumer needs ONE stop at a
 * known `t` (the keyframes.js `compile-color.ts` ΔE-proof inner loop called it
 * once per midpoint, paying the full n-stop rebuild per probe). `sampleColorRampAt`
 * computes exactly the stop at `t`, so the consumer hoists the ramp OUT of the
 * inner loop. The result is BIT-EXACT to the corresponding `sampleColorRamp`
 * stop: `sampleColorRampAt(a, b, i/(n-1)) === sampleColorRamp(a, b, n)[i]` (it
 * shares the same `space`-hoist, `mixColors(1-t, t)` call, and `gamutMapStop`).
 *
 * @param from  start `Color`.
 * @param to    end `Color`.
 * @param t     ramp parameter in `[0, 1]` (`0` → `from`, `1` → `to`).
 * @param opts  {@link SampleRampOptions} (the `endpoints` field is ignored — `t`
 *              is the explicit parameter; `space`/`hueMethod`/`gamutMap` apply).
 * @returns     a single `Color` in the interpolation `space`.
 */
export function sampleColorRampAt(
    from: Color,
    to: Color,
    t: number,
    opts: SampleRampOptions = {},
): Color {
    const {
        space = "oklab",
        hueMethod = "shorter",
        gamutMap = true,
    } = opts;

    // Mirror `sampleColorRamp`'s space-hoist so a single stop is bit-identical to
    // the corresponding indexed stop (the `color2` short-circuits same-space).
    const a = color2(from, space) as Color;
    const b = color2(to, space) as Color;

    let stop = mixColors(a, b, 1 - t, t, space, hueMethod);
    if (gamutMap) stop = gamutMapStop(stop, space);
    return stop;
}
