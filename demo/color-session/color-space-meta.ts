/**
 * Interpolation-space vocabulary — the shared label/description metadata for
 * every surface that offers a color-space + hue-method choice (Gradient, Mix).
 *
 * S.W5-6 · F16: these are color-space FACTS, not gradient facts — they lived
 * inside `gradient/composables/useGradientInterpolation.ts` while Mix imported
 * them across feature trees (DRY-correct, cohesion-wrong). This `@lib/` module
 * is the neutral home; the gradient composable re-exports for its own tree.
 */

import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "./picker-color";
import { resolveColorSpace } from "./color-model";
import { SPACE_CATALOG_ENTRIES } from "./space-catalog";

export interface InterpolationSpaceMeta {
    value: PickerSpace;
    label: string;
    description: string;
}

export interface HueInterpolationMeta {
    value: HueInterpolationMethod;
    label: string;
    description: string;
}

/**
 * X.W6.c · c4 (COHESION §0an grant): the interpolation SET derives from the
 * catalog — membership is `SPACE_CATALOG`'s `interpolatable` decision and the
 * label is the catalog's own, in the catalog's order. Nothing here restates
 * either (the former hand-kept 9-row list duplicated both). What this module
 * still owns is the one fact the catalog does not carry: how each space
 * BEHAVES as an interpolation space. A catalog space marked interpolatable
 * with no behaviour line here is a module-load error, never a blank option.
 */
const INTERPOLATION_BEHAVIOUR: Readonly<Partial<Record<PickerSpace, string>>> = {
    oklch: "Perceptual, hue-preserving",
    oklab: "Perceptual, smooth",
    lab: "CIE perceptual",
    lch: "CIE cylindrical",
    hsl: "Web-native cylindrical",
    hsv: "Hue-saturation-value",
    hwb: "Hue-whiteness-blackness",
    rgb: "Device linear",
    xyz: "CIE absolute",
};

export const INTERPOLATION_SPACES: readonly InterpolationSpaceMeta[] =
    SPACE_CATALOG_ENTRIES.filter((entry) => entry.interpolatable).map((entry) => {
        const value = resolveColorSpace(entry.id);
        const description = INTERPOLATION_BEHAVIOUR[value];
        if (description === undefined) {
            throw new Error(
                `color-space-meta: catalog space "${entry.id}" is interpolatable but has no interpolation behaviour line`,
            );
        }
        return { value, label: entry.label, description };
    });

export const HUE_INTERPOLATION_METHODS: HueInterpolationMeta[] = [
    { value: "shorter", label: "Shorter", description: "Nearest arc" },
    { value: "longer", label: "Longer", description: "Far arc" },
    { value: "increasing", label: "Increasing", description: "Always clockwise" },
    { value: "decreasing", label: "Decreasing", description: "Counter-clockwise" },
];
