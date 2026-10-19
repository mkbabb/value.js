/**
 * The gradient's domain types — a LEAF module (X-W6 · X.W6.c, CC-058 ·
 * MT-GRADSTOP-3). It imports nothing from the gradient tree, so every module
 * that needs the shape of a stop reads it here instead of type-importing the
 * reactive factory that value-imports it. That is what dissolves the two
 * declaration-graph cycles (`useGradientCSS → useGradientModel → useGradientCSS`
 * and `gradientParse → useGradientModel → gradientParse`): the factory builds
 * state, this file says what the state is, and the factory re-exports nothing.
 */

import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import type { PickerSpace } from "../../../color-session/picker-color";

/**
 * A gradient interval carries the <EasingPicker> payload (the R.W4 `/easing`
 * consume — easing-disposition.md §2.3): the re-parseable CSS literal (the
 * persisted TRUTH) plus the live value.js callable and authoring parameters.
 * Literal-only reads still parse through `/css` and evaluate through
 * `/easing`; editable model state stays complete for two-way picker binding.
 */
export type GradientInterval = EasingPickerValue;

/**
 * A colour stop. The stop OWNS the easing of the interval it opens (X.W6.a,
 * GRADSTOP-A §14) — this stop to the one after it in ordinal order — so a
 * re-sort or an insert carries each curve with the stop it was drawn for. The
 * LAST stop opens no interval and its easing is inert; it is still carried,
 * because a stop that stops being last must already own the curve after it.
 */
export interface GradientStop {
    id: string;
    cssColor: string;
    position: number; // 0–100%
    easing: GradientInterval;
}

export type GradientType = "linear" | "radial" | "conic";

export interface GradientModelState {
    type: GradientType;
    direction: number; // degrees (for linear); ignored for radial
    stops: GradientStop[];
    interpolationSpace: PickerSpace;
    hueMethod: HueInterpolationMethod;
}

/**
 * What the sampling law reads: the ordered stops and the space + hue method the
 * colours travel through. Type and direction are geometry, not colour, so a
 * sampler never needs them — which is why the stop rail (which paints every
 * type at 90°) and the render tile can share one sampler.
 */
export type GradientSampleSource = Pick<
    GradientModelState,
    "stops" | "interpolationSpace" | "hueMethod"
>;
