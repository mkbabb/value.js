/**
 * Gradient interpolation — color space selection, hue method,
 * and interpolated color computation between gradient stops.
 */

import { ref } from "vue";
import type { Ref } from "vue";
import type { AnyColor, HueInterpolationMethod } from "@mkbabb/value.js/color";
import { mixColors } from "@mkbabb/value.js/color";
import { colorToCss, parseColorIn } from "@lib/color-utils";
import type { PickerSpace } from "@lib/picker-color";

// ── Shared interpolation vocabulary — moved to its neutral `@lib/` home
// (S.W5-6 · F16: color-space facts, not gradient facts). Re-exported here so
// the gradient tree's own consumers (`useGradientModel` → visualizer) keep
// their import path.
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "@lib/color-space-meta";

// ── Helpers ──

/**
 * Mix two CSS colors at ratio `t` (0 = c0, 1 = c1) in the given space.
 * Both endpoints resolve through the single final-object parser/conversion
 * boundary. Invalid model state is an invariant violation, not a substitute
 * color request.
 */
export function interpolateStopColors(
    css0: string,
    css1: string,
    t: number,
    space: PickerSpace,
    hueMethod: HueInterpolationMethod,
): string {
    const c0 = parseColorIn(css0, space);
    const c1 = parseColorIn(css1, space);
    const mixed = mixColors(c0, c1, t, { space, hue: hueMethod });
    if (!mixed.ok) throw new Error(`Gradient color mix failed: ${mixed.error.code}`);
    return colorToCss(mixed.value as AnyColor);
}

// ── Composable ──

export interface UseGradientInterpolationReturn {
    interpolationSpace: Ref<PickerSpace>;
    hueMethod: Ref<HueInterpolationMethod>;
}

export function useGradientInterpolation(): UseGradientInterpolationReturn {
    const interpolationSpace = ref<PickerSpace>("oklch");
    const hueMethod = ref<HueInterpolationMethod>("shorter");

    return {
        interpolationSpace,
        hueMethod,
    };
}
