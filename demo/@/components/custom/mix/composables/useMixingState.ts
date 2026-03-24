/**
 * Mixing state machine — manages the workflow of selecting colors/palettes,
 * performing the mix, animating, and displaying results.
 */

import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import type { Palette, PaletteColor } from "@lib/palette/types";
import type { LeftoverStrategy } from "@lib/palette/mix";
import { mixPalettes } from "@lib/palette/mix";
import { mixColorsN } from "@src/units/color/mix";
import type { Color } from "@src/units/color";
import { cssToRawColor, rawColorToCSS } from "@lib/color-utils";

export interface SelectedColor {
    css: string;
    source: string; // palette name or "picker"
}

export type MixResultType = "color" | "palette";

export interface MixResult {
    type: MixResultType;
    css?: string;
    colors?: PaletteColor[];
}

export type AnimationPhase = "idle" | "gathering" | "mixing" | "revealing" | "done";

export function useMixingState() {
    const mode = ref<"colors" | "palettes">("colors");
    const selectedColors = ref<SelectedColor[]>([]);
    const selectedPalettes = ref<Palette[]>([]);
    const colorSpace = ref<ColorSpace>("oklab");
    const hueMethod = ref<HueInterpolationMethod>("shorter");
    const leftoverStrategy = ref<LeftoverStrategy>("discard");
    const mixResult = ref<MixResult | null>(null);
    const animationPhase = ref<AnimationPhase>("idle");

    const canMix = computed(() => {
        if (mode.value === "colors") return selectedColors.value.length >= 2;
        return selectedPalettes.value.length >= 2;
    });

    function addColor(css: string, source: string = "picker") {
        selectedColors.value = [...selectedColors.value, { css, source }];
    }

    function removeColor(index: number) {
        selectedColors.value = selectedColors.value.filter((_, i) => i !== index);
    }

    function addPalette(palette: Palette) {
        if (selectedPalettes.value.some((p) => p.id === palette.id)) return;
        selectedPalettes.value = [...selectedPalettes.value, palette];
    }

    function removePalette(id: string) {
        selectedPalettes.value = selectedPalettes.value.filter((p) => p.id !== id);
    }

    function startMix() {
        if (!canMix.value) return;

        animationPhase.value = "gathering";

        // Compute immediately (the animation runs in parallel)
        if (mode.value === "colors") {
            const colors = selectedColors.value
                .map((sc) => cssToRawColor(sc.css, colorSpace.value))
                .filter((c): c is Color<number> => c !== null);

            if (colors.length < 2) {
                animationPhase.value = "idle";
                return;
            }

            const mixed = mixColorsN(colors, undefined, colorSpace.value, hueMethod.value);
            const css = rawColorToCSS(mixed);

            // Schedule animation phases
            setTimeout(() => { animationPhase.value = "mixing"; }, 800);
            setTimeout(() => {
                animationPhase.value = "revealing";
                mixResult.value = { type: "color", css };
            }, 2300);
            setTimeout(() => { animationPhase.value = "done"; }, 2900);
        } else {
            const resultColors = mixPalettes(selectedPalettes.value, {
                space: colorSpace.value,
                hueMethod: hueMethod.value,
                leftoverStrategy: leftoverStrategy.value,
            });

            setTimeout(() => { animationPhase.value = "mixing"; }, 800);
            setTimeout(() => {
                animationPhase.value = "revealing";
                mixResult.value = { type: "palette", colors: resultColors };
            }, 2300);
            setTimeout(() => { animationPhase.value = "done"; }, 2900);
        }
    }

    function reset() {
        mixResult.value = null;
        animationPhase.value = "idle";
    }

    function clearSelection() {
        selectedColors.value = [];
        selectedPalettes.value = [];
        reset();
    }

    return {
        mode,
        selectedColors,
        selectedPalettes,
        colorSpace,
        hueMethod,
        leftoverStrategy,
        mixResult,
        animationPhase,
        canMix,
        addColor,
        removeColor,
        addPalette,
        removePalette,
        startMix,
        reset,
        clearSelection,
    };
}
