/**
 * Color mixing + hue interpolation — the cohesion-honest home of the CSS
 * `color-mix()` machinery.
 *
 * This module owns the hue-interpolation + color-mixing cluster
 * (`interpolateHue`, `mixColors`, `mixColorsInto`, `cssColorInterpKeyword`,
 * `CYLINDRICAL_HUE_COMPONENT`, `HueInterpolationMethod`) extracted from
 * `dispatch.ts` — the K-DISP real decomposition (R.W1.6). The historical
 * `mix.ts → dispatch.ts` import of `mixColors` is thereby inverted: the mixing
 * layer now depends only on the pure conversion core (`color2`/`color2Into`/
 * `gamutMap`), never the reverse.
 *
 * On top of the 2-color `mixColors()` it builds the N-color fold (`mixColorsN`)
 * and the perceptual N-stop ramp samplers (`sampleColorRamp` /
 * `sampleColorRampAt`). All CSS Color Level 4 semantics (premultiplied alpha,
 * NaN propagation, hue-interpolation methods) live here.
 */

import { ch, setChannel } from ".";
import type { Color, ColorSpaceMap } from ".";
import { COLOR_SYNTAX_FAMILY } from "./constants";
import type { ColorSpace } from "./constants";
import { lerp } from "../../math";
import { color2, color2Into, gamutMap } from "./dispatch";

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
 * The WAAPI `<color-interpolation-method>` keyword for a target interp space
 * (N.W7.A B2 — the value.js half of the WAAPI color lift). Pairs with
 * `Color.toAnimationString(digits, outputSpace)`: the serializer emits a color
 * in the space's syntax family, and this produces the matching interp-method
 * keyword string a consumer (keyframes.js) hands to `KeyframeEffect` /
 * `easing`-adjacent APIs.
 *
 * For a polar space the hue-interpolation method is appended
 * (`oklch shorter hue`); legacy families have no interp keyword (sRGB is the
 * implicit default for `rgb()`/`hsl()`), so this returns `undefined` for them —
 * the legacy syntax family already pins sRGB interp without an explicit keyword.
 */
export function cssColorInterpKeyword(
    space: ColorSpace,
    hueMethod: HueInterpolationMethod = "shorter",
): string | undefined {
    if (COLOR_SYNTAX_FAMILY[space] === "legacy") return undefined;
    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];
    return hueComponent != null ? `${space} ${hueMethod} hue` : space;
}

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
    const resultAlpha = (lerp(a1, a2, p2)) * alphaMultiplier;

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
            const mixed = lerp(premul1, premul2, p2);
            resultComponents.push(resultAlpha > 0 ? mixed / resultAlpha : 0);
        }
    }

    // Create result color in the interpolation space
    const ResultClass = c1.constructor as new (...args: any[]) => Color;
    const result = new ResultClass(...resultComponents, resultAlpha);

    return result;
}

// VJ-Q3 (1.2.0) — the `mixColorsInto` OUT-PARAM twin of `mixColors`.
//
// `mixColors` allocates a `resultComponents:number[]` array, a `keys.filter()`
// array per call, AND constructs via the variadic spread
// `new ResultClass(...resultComponents, resultAlpha)` — a monomorphic-ctor
// megamorphic-spread deopt. `mixColorsInto` writes each channel DIRECTLY into a
// caller-owned `out` (which MUST already be in the interpolation `space`) via
// `setChannel`, killing both arrays + the spread. Arithmetic is byte-identical to
// `mixColors` (same premultiplied-alpha + hue-interpolation math).
//
// CONTRACT: `out.colorSpace === space` and `out` is caller-owned (never aliasing
// `c1Src`/`c2Src`'s converted forms). The caller hoists `out` across a ramp/loop.
const _mixIntoScratchC1: Partial<Record<ColorSpace, Color<number>>> = {};
const _mixIntoScratchC2: Partial<Record<ColorSpace, Color<number>>> = {};

export function mixColorsInto(
    col1: Color,
    col2: Color,
    p1: number,
    p2: number,
    space: ColorSpace,
    hueMethod: HueInterpolationMethod,
    out: Color<number>,
): Color<number> {
    // Convert both endpoints into the interpolation space using per-space
    // module scratches (no per-call endpoint wrapper alloc on the hot loop).
    let c1 = _mixIntoScratchC1[space] as Color<number> | undefined;
    if (c1 === undefined) {
        c1 = color2(col1, space) as Color<number>;
        _mixIntoScratchC1[space] = c1;
    } else {
        color2Into(col1, space, c1 as ColorSpaceMap<number>[ColorSpace]);
    }
    let c2 = _mixIntoScratchC2[space] as Color<number> | undefined;
    if (c2 === undefined) {
        c2 = color2(col2, space) as Color<number>;
        _mixIntoScratchC2[space] = c2;
    } else {
        color2Into(col2, space, c2 as ColorSpaceMap<number>[ColorSpace]);
    }

    if (p1 < 0) p1 = 0;
    if (p2 < 0) p2 = 0;

    const sum = p1 + p2;
    if (sum === 0) {
        p1 = 0.5;
        p2 = 0.5;
    } else if (sum !== 1) {
        p1 = p1 / sum;
        p2 = p2 / sum;
    }

    const alphaMultiplier = Math.min(sum, 1);
    const hueComponent = CYLINDRICAL_HUE_COMPONENT[space];

    const a1 = Number.isNaN(c1.alpha as number) ? (c2.alpha as number) : (c1.alpha as number);
    const a2 = Number.isNaN(c2.alpha as number) ? (c1.alpha as number) : (c2.alpha as number);
    const resultAlpha = lerp(a1, a2, p2) * alphaMultiplier;

    // `channels` is the frozen channels-without-alpha list (no filter alloc).
    const channels = c1.channels;
    for (let i = 0; i < channels.length; i++) {
        const key = channels[i]!;
        let v1 = c1[key] as number;
        let v2 = c2[key] as number;

        if (Number.isNaN(v1) && Number.isNaN(v2)) {
            setChannel(out, key, ch(0));
            continue;
        }
        if (Number.isNaN(v1)) v1 = v2;
        if (Number.isNaN(v2)) v2 = v1;

        if (key === hueComponent) {
            setChannel(out, key, ch(interpolateHue(v1, v2, p2, hueMethod)));
        } else {
            const premul1 = v1 * a1;
            const premul2 = v2 * a2;
            const mixed = lerp(premul1, premul2, p2);
            setChannel(out, key, ch(resultAlpha > 0 ? mixed / resultAlpha : 0));
        }
    }
    out.alpha = resultAlpha;
    return out;
}

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
