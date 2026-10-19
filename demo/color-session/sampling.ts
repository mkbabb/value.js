/**
 * THE SAMPLING LAW — its ONE owner (X.W12U.k, the unrowed "sampling law" pair).
 *
 * "The colour between two colours at t, in THIS space along THIS hue arc" has
 * one implementation in the demo, and it is here: THE LIBRARY's `mixColors`,
 * never CSS `in <space>` interpolation — a preview must show what the app
 * computes, not what the browser's engine would (and HSV/XYZ/kelvin are not
 * CSS-interpolable anyway).
 *
 * Before this module the same act was written four times, each with its own
 * failure text: the preview chips (`color-chips/sample.ts`), the gradient ramp
 * (`workbenches/gradient/model/sample.ts`), the palette mixer
 * (`workbenches/mix/mix.ts`) and the Mix canvas pigment ramp (`mixStage.ts`).
 * Each of those keeps what is its own — the chip's k-sample walk and stamp,
 * the gradient's easing curve and codomain guard, the mixer's weights, the
 * canvas's byte projection — and reads the colour itself from here.
 *
 * (`color-session/ink.ts` also calls `mixColors`, for a different job: an
 * alpha composite of a tint over a ground in sRGB. That is not a sample of a
 * user-chosen interpolation and stays with the ink.)
 */

import {
    mixColors,
    type AnyColor,
    type HueInterpolationMethod,
} from "@mkbabb/value.js/color";
import type { PickerColorIn, PickerSpace } from "./picker-color";

/**
 * `from → to` at progress `t` ∈ [0, 1], mixed in `space` along `hue`.
 * Throws on a refused mix — the library answers a typed error (for example a
 * progress outside [0, 1]), and a sample has no honest fallback colour.
 */
export function mixIn<S extends PickerSpace>(
    from: AnyColor,
    to: AnyColor,
    t: number,
    space: S,
    hue: HueInterpolationMethod,
): PickerColorIn<S> {
    const mixed = mixColors(from, to, t, { space, hue });
    if (!mixed.ok) throw new Error(`Color mix failed: ${mixed.error.code}`);
    // A runtime SpaceId keeps the discriminant/channel pair intact; TypeScript
    // cannot distribute the library's Color<SpaceId> back into the picker's.
    return mixed.value as unknown as PickerColorIn<S>;
}

/** One segment's colour as a function of its local parameter t ∈ [0, 1]. */
export type SegmentSampler<S extends PickerSpace = PickerSpace> = (
    t: number,
) => PickerColorIn<S>;

/** The segment `from → to` as a sampler; the endpoints are held, not re-read. */
export function segmentSampler<S extends PickerSpace>(
    from: AnyColor,
    to: AnyColor,
    space: S,
    hue: HueInterpolationMethod,
): SegmentSampler<S> {
    return (t) => mixIn(from, to, t, space, hue);
}
