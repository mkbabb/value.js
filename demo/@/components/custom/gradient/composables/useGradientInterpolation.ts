/**
 * Gradient interpolation — color space selection, hue method,
 * and interpolated color computation between gradient stops.
 */

import { ref } from "vue";
import type { Ref } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import { mixColors } from "@src/units/color/utils";
import type { Color } from "@src/units/color";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";

// ── Shared interpolation constants (used by Gradient + Mix views) ──

export const INTERPOLATION_SPACES: { value: ColorSpace; label: string; description: string }[] = [
    { value: "oklch", label: "OKLCh", description: "Perceptual, hue-preserving" },
    { value: "oklab", label: "OKLab", description: "Perceptual, smooth" },
    { value: "lab",   label: "Lab",   description: "CIE perceptual" },
    { value: "lch",   label: "LCh",   description: "CIE cylindrical" },
    { value: "hsl",   label: "HSL",   description: "Web-native cylindrical" },
    { value: "hsv",   label: "HSV",   description: "Hue-saturation-value" },
    { value: "hwb",   label: "HWB",   description: "Hue-whiteness-blackness" },
    { value: "rgb",   label: "RGB",   description: "Device linear" },
    { value: "xyz",   label: "XYZ",   description: "CIE absolute" },
];

export const HUE_INTERPOLATION_METHODS: { value: HueInterpolationMethod; label: string; description: string }[] = [
    { value: "shorter",    label: "Shorter",    description: "Nearest arc" },
    { value: "longer",     label: "Longer",     description: "Far arc" },
    { value: "increasing", label: "Increasing", description: "Always clockwise" },
    { value: "decreasing", label: "Decreasing", description: "Counter-clockwise" },
];

// ── Helpers ──

export function resolveColor(css: string, space: ColorSpace): Color<number> | null {
    return cssToRawColor(css, space);
}

/**
 * Mix two CSS colors at ratio `t` (0 = c0, 1 = c1) in the given space.
 * Returns the CSS string of the mixed color, or null on failure.
 */
export function interpolateStopColors(
    css0: string,
    css1: string,
    t: number,
    space: ColorSpace,
    hueMethod: HueInterpolationMethod,
): string | null {
    const c0 = resolveColor(css0, space);
    const c1 = resolveColor(css1, space);
    if (!c0 || !c1) return null;
    const mixed = mixColors(c0, c1, 1 - t, t, space, hueMethod);
    return rawColorToCSS(mixed);
}

// ── Composable ──

export interface UseGradientInterpolationReturn {
    interpolationSpace: Ref<ColorSpace>;
    hueMethod: Ref<HueInterpolationMethod>;
    resolution: Ref<number>;
}

export function useGradientInterpolation(): UseGradientInterpolationReturn {
    const interpolationSpace = ref<ColorSpace>("oklch");
    const hueMethod = ref<HueInterpolationMethod>("shorter");
    const resolution = ref(32);

    return {
        interpolationSpace,
        hueMethod,
        resolution,
    };
}
