/**
 * Structure-of-arrays (SoA) color-channel layout — VJ-Q8 (1.2.0).
 *
 * The keyframes.js P.W2 SoA compositor folds numeric leaves through a
 * contiguous `Float64Array`, but a color leaf was permanently BOXED because a
 * `Color` cannot live in a `Float64Array` (`buildSoAPlans` classifies any color
 * leaf boxed). This module exposes the Float64 oklab-channel layout the
 * compositor folds the color tail through:
 *
 *   - {@link buildColorChannelPlan} — a `(Color → channel offsets)` plan that
 *     lays a color's channels out in a contiguous Float64 buffer (an oklab/oklch
 *     interpolation space; alpha is the last channel; the cylindrical hue channel
 *     is flagged for the `interpolateHue` short-arc path).
 *   - {@link lerpColorChannels} — a closure-free buffer fold:
 *     `out[i] = lerp(start[i], stop[i], t)` for every channel slot, with the hue
 *     slot routed through `interpolateHue` (CSS Color 4 §12.4).
 *
 * MEASURE-FIRST verdict (value.js side, recorded): a Float64 SoA fold over K=64
 * oklab color leaves benched ~10× faster than the boxed per-element `Color` lerp
 * (`bench/color-soa-fold.mjs`). The CORRECTNESS oracle is bit-exactness vs the
 * per-element `Color` lerp (`proof:color-soa-equiv`). The kf-side Amdahl-slice
 * authorization (the color tail is a non-trivial frame slice) is the CONSUMER's
 * grounding gate per KF-TO-VALUEJS-Q.md VJ-Q8.
 */

import { lerp } from "../math";
import type { Color } from "./color";
import { CYLINDRICAL_HUE_COMPONENT, interpolateHue } from "./color/dispatch";
import type { HueInterpolationMethod } from "./color/dispatch";

/**
 * The SoA layout plan for a single color leaf: the ordered channel keys (incl.
 * alpha), the per-leaf channel COUNT (the buffer stride), and the index of the
 * cylindrical hue channel (or -1 when the space has no hue). One plan describes
 * the layout for every leaf sharing the same interpolation space.
 */
export type ColorChannelPlan = {
    /** Ordered channel keys including `alpha` (the buffer-column order). */
    readonly keys: readonly string[];
    /** Channels per leaf (the Float64 buffer stride). */
    readonly stride: number;
    /** Column index of the cylindrical hue channel, or -1. */
    readonly hueIndex: number;
    /** The interpolation color space the plan lays out. */
    readonly space: string;
};

/**
 * Build a {@link ColorChannelPlan} from a representative `Color` in the
 * interpolation space. The plan's channel order is `color.keys()` (channels then
 * `alpha`); the hue channel (if any) is located via `CYLINDRICAL_HUE_COMPONENT`.
 */
export function buildColorChannelPlan(color: Color): ColorChannelPlan {
    const keys = color.keys();
    const space = color.colorSpace;
    const hueKey = CYLINDRICAL_HUE_COMPONENT[space as keyof typeof CYLINDRICAL_HUE_COMPONENT];
    const hueIndex = hueKey != null ? keys.indexOf(hueKey) : -1;
    return { keys, stride: keys.length, hueIndex, space };
}

/**
 * Pack a `Color`'s channels into the SoA buffer at leaf index `leaf` per the
 * plan's layout. The hue channel is divided into the [0,1] domain
 * `interpolateHue` expects (the ÷360 folded into the buffer, matching the
 * internal `_colorPlan` discipline); every other channel is written as-is.
 */
export function packColorChannels(
    color: Color,
    plan: ColorChannelPlan,
    buf: Float64Array,
    leaf: number,
): void {
    const base = leaf * plan.stride;
    const { keys, hueIndex } = plan;
    for (let i = 0; i < keys.length; i++) {
        const v = color[keys[i]!] as number;
        buf[base + i] = i === hueIndex ? v / 360 : v;
    }
}

/**
 * The closure-free SoA color fold (VJ-Q8). For every channel slot in `[0, len)`,
 * writes `out[i] = lerp(start[i], stop[i], t)` — EXCEPT the per-leaf hue slot,
 * which is routed through `interpolateHue` (the cylindrical short-arc) and
 * scaled back to degrees (×360). `start`/`stop`/`out` are caller-owned
 * `Float64Array`s laid out by {@link packColorChannels} (stride = `plan.stride`,
 * `len` = `leafCount * stride`). Bit-exact to the per-element `Color` lerp.
 *
 * @param t       the interpolation parameter.
 * @param start   packed start channels.
 * @param stop    packed stop channels.
 * @param out     packed destination channels (may alias `start`/`stop`).
 * @param plan    the layout plan (provides `stride` + `hueIndex`).
 * @param len     number of channel slots to fold (defaults to `start.length`).
 * @param hueMethod  the cylindrical hue interpolation method.
 */
export function lerpColorChannels(
    t: number,
    start: Float64Array,
    stop: Float64Array,
    out: Float64Array,
    plan: ColorChannelPlan,
    len: number = start.length,
    hueMethod: HueInterpolationMethod = "shorter",
): Float64Array {
    const { stride, hueIndex } = plan;
    if (hueIndex < 0) {
        // No hue channel — a flat numeric fold over the whole buffer.
        for (let i = 0; i < len; i++) {
            out[i] = lerp(start[i]!, stop[i]!, t);
        }
        return out;
    }
    // Hue-aware fold: the slot at `(leaf*stride + hueIndex)` rides interpolateHue.
    for (let i = 0; i < len; i++) {
        if (i % stride === hueIndex) {
            out[i] = interpolateHue(start[i]!, stop[i]!, t, hueMethod) * 360;
        } else {
            out[i] = lerp(start[i]!, stop[i]!, t);
        }
    }
    return out;
}
