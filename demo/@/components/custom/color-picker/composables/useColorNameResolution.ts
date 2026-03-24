import { computed, ref, watch, type ShallowRef, type ComputedRef } from "vue";
import { debounce } from "@src/utils";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import type { ColorModel } from "@components/custom/color-picker";
import type { DisplayColorSpace } from "@components/custom/color-picker";
import { colorToHexString } from "@components/custom/color-picker";
import { NORMALIZED_COLOR_NAMES } from "./useColorModel";

const DIGITS = 2;

export function useColorNameResolution(deps: {
    model: ShallowRef<ColorModel>;
    denormalizedCurrentColor: ComputedRef<ValueUnit<Color<ValueUnit<number>>, "color">>;
    currentColorSpace: ComputedRef<ColorSpace>;
}) {
    const { model, denormalizedCurrentColor } = deps;
    const selectedDisplaySpace = computed<DisplayColorSpace>(() => model.value.selectedColorSpace);
    const { findCustomName, getMetadata } = useCustomColorNames();

    // --- XYZ consolidation ---
    const currentXYZString = ref("");

    const recomputeXYZ = debounce(() => {
        const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
        currentXYZString.value = xyz.value.toFormattedString(DIGITS);
    }, 100, false);

    watch(() => model.value.color, () => recomputeXYZ(), { immediate: true });

    // --- Color name resolution ---

    const formattedCurrentColor = computed(() => {
        const colorString = currentXYZString.value;

        // Check built-in CSS color names first
        if (colorString) {
            const colorName = Object.entries(NORMALIZED_COLOR_NAMES).find(
                ([, value]) => value === colorString,
            );
            if (colorName) return colorName[0];

            // Check custom (approved) color names
            const customName = findCustomName(colorString);
            if (customName) return customName;
        }

        // Hex display format
        if (selectedDisplaySpace.value === "hex") {
            return colorToHexString(model.value.color);
        }

        return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
    });

    function savedColorLabel(color: ValueUnit<Color<ValueUnit<number>>, "color">): string {
        const xyz = colorUnit2(color, "xyz", true, false, false);
        const colorString = xyz.value.toFormattedString(DIGITS);
        const builtIn = Object.entries(NORMALIZED_COLOR_NAMES).find(([, v]) => v === colorString);
        if (builtIn) return builtIn[0];
        const custom = findCustomName(colorString);
        if (custom) return custom;
        return normalizeColorUnit(color, true, false).value.toFormattedString(DIGITS);
    }

    const currentColorMeta = computed(() => {
        const colorString = currentXYZString.value;
        const customName = findCustomName(colorString);
        if (!customName) return null;
        return getMetadata(customName) ?? null;
    });

    const crownKey = computed(() => currentColorMeta.value?.name ?? "");

    const canProposeName = computed(() => {
        const colorString = currentXYZString.value;
        const hasBuiltIn = Object.entries(NORMALIZED_COLOR_NAMES).some(
            ([, value]) => value === colorString,
        );
        const hasCustom = !!findCustomName(colorString);
        return !hasBuiltIn && !hasCustom;
    });

    return {
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
    };
}
