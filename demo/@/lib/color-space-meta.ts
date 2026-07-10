/**
 * Interpolation-space vocabulary — the shared label/description metadata for
 * every surface that offers a color-space + hue-method choice (Gradient, Mix).
 *
 * S.W5-6 · F16: these are color-space FACTS, not gradient facts — they lived
 * inside `gradient/composables/useGradientInterpolation.ts` while Mix imported
 * them across feature trees (DRY-correct, cohesion-wrong). This `@lib/` module
 * is the neutral home; the gradient composable re-exports for its own tree.
 */

import type { ColorSpace } from "@mkbabb/value.js/color";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";

export interface InterpolationSpaceMeta {
    value: ColorSpace;
    label: string;
    description: string;
}

export interface HueInterpolationMeta {
    value: HueInterpolationMethod;
    label: string;
    description: string;
}

export const INTERPOLATION_SPACES: InterpolationSpaceMeta[] = [
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

export const HUE_INTERPOLATION_METHODS: HueInterpolationMeta[] = [
    { value: "shorter",    label: "Shorter",    description: "Nearest arc" },
    { value: "longer",     label: "Longer",     description: "Far arc" },
    { value: "increasing", label: "Increasing", description: "Always clockwise" },
    { value: "decreasing", label: "Decreasing", description: "Counter-clockwise" },
];
