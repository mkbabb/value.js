/**
 * Mixing state machine — manages the workflow of selecting colors/palettes,
 * performing the mix, and displaying results.
 *
 * ONE-CLOCK LAW (S.W3-6 / Q10): this machine owns NO timers. The mix
 * choreography's single clock lives in `useMixingAnimation` (the canvas
 * timeline); this machine only advances on its completion event:
 *
 *   idle ──startMix()──▶ mixing ──settleMix() (the canvas's onSettled)──▶ done
 *
 * The result is computed synchronously at `startMix` (the math is instant);
 * `mixing` is purely the narration window — the convergence animation — and
 * `done` is the inked-in plate. Under prefers-reduced-motion the animation
 * composable fires its completion event immediately, so the result appears
 * with zero dead time.
 */

import { ref, computed } from "vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { Palette, PaletteColor } from "../../../palettes/types";
import { mixColorSequence, mixPalettes, type LeftoverStrategy } from "../../../palettes/mix";
import { colorToCss, parseColorIn } from "../../../color-session/color-utils";
import type { PickerSpace } from "../../../color-session/picker-color";

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

export type AnimationPhase = "idle" | "mixing" | "done";

export function useMixingState() {
    const mode = ref<"colors" | "palettes">("colors");
    const selectedColors = ref<SelectedColor[]>([]);
    const selectedPalettes = ref<Palette[]>([]);
    const colorSpace = ref<PickerSpace>("oklab");
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

    // K-PALID: mix selection keys on `slug` (the universal palette identity),
    // never the local-only `id`.
    function addPalette(palette: Palette) {
        if (selectedPalettes.value.some((p) => p.slug === palette.slug)) return;
        selectedPalettes.value = [...selectedPalettes.value, palette];
    }

    function removePalette(slug: string) {
        selectedPalettes.value = selectedPalettes.value.filter((p) => p.slug !== slug);
    }

    /**
     * Compute the mix synchronously and open the narration window. The phase
     * lands in `done` only when the animation's completion event calls
     * `settleMix()` — never on a timer here.
     */
    function startMix() {
        if (!canMix.value) return;
        // Re-entry guard: the convergence is in flight; the animation clock
        // owns the window until it settles.
        if (animationPhase.value === "mixing") return;

        if (mode.value === "colors") {
            const colors = selectedColors.value.map((selection) =>
                parseColorIn(selection.css, colorSpace.value),
            );
            const mixed = mixColorSequence(colors, colorSpace.value, hueMethod.value);
            mixResult.value = { type: "color", css: colorToCss(mixed) };
        } else {
            const resultColors = mixPalettes(selectedPalettes.value, {
                space: colorSpace.value,
                hueMethod: hueMethod.value,
                leftoverStrategy: leftoverStrategy.value,
            });
            mixResult.value = { type: "palette", colors: resultColors };
        }

        animationPhase.value = "mixing";
    }

    /** The animation's completion event — the ONE clock's single downstream edge. */
    function settleMix() {
        if (animationPhase.value === "mixing") animationPhase.value = "done";
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
        settleMix,
        reset,
        clearSelection,
    };
}
