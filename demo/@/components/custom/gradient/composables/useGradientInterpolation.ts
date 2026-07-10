/**
 * Gradient interpolation — color space selection, hue method,
 * and interpolated color computation between gradient stops.
 */

import { ref } from "vue";
import type { Ref } from "vue";
import type { ColorSpace } from "@mkbabb/value.js/color";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import { mixColors } from "@mkbabb/value.js/color";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";

// ── Shared interpolation vocabulary — moved to its neutral `@lib/` home
// (S.W5-6 · F16: color-space facts, not gradient facts). Re-exported here so
// the gradient tree's own consumers (`useGradientModel` → visualizer) keep
// their import path.
export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "@lib/color-space-meta";

// ── Helpers ──

/**
 * Mix two CSS colors at ratio `t` (0 = c0, 1 = c1) in the given space.
 * Returns the CSS string of the mixed color, or null on failure.
 *
 * Both endpoints resolve through `cssToRawColor` — the single library-backed
 * CSS-color→RGB resolution path (inv-N-3).
 */
export function interpolateStopColors(
    css0: string,
    css1: string,
    t: number,
    space: ColorSpace,
    hueMethod: HueInterpolationMethod,
): string | null {
    const c0 = cssToRawColor(css0, space);
    const c1 = cssToRawColor(css1, space);
    if (!c0 || !c1) return null;
    const mixed = mixColors(c0, c1, 1 - t, t, space, hueMethod);
    return rawColorToCSS(mixed);
}

// ── Composable ──

export interface UseGradientInterpolationReturn {
    interpolationSpace: Ref<ColorSpace>;
    hueMethod: Ref<HueInterpolationMethod>;
}

export function useGradientInterpolation(): UseGradientInterpolationReturn {
    const interpolationSpace = ref<ColorSpace>("oklch");
    const hueMethod = ref<HueInterpolationMethod>("shorter");

    return {
        interpolationSpace,
        hueMethod,
    };
}
