import { computed, ref, watch, type ShallowRef, type ComputedRef } from "vue";
import { debounce } from "../shared/utils";
import {
    convertPickerColor,
    serializePickerColor,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";
import { useCustomColorNames } from "./useCustomColorNames";
import type { ColorModel } from "./color-model";
import type { DisplayColorSpace } from "./color-model";
import { colorToHexString } from "./color-model";

export function useColorNameResolution(deps: {
    model: ShallowRef<ColorModel>;
    currentPhysicalColor: ComputedRef<PickerColor>;
    currentColorSpace: ComputedRef<PickerSpace>;
}) {
    const { model, currentPhysicalColor } = deps;
    const selectedDisplaySpace = computed<DisplayColorSpace>(() => model.value.selectedColorSpace);
    const { findCustomName, getMetadata } = useCustomColorNames();

    // --- XYZ consolidation ---
    const currentXYZString = ref("");

    const recomputeXYZ = debounce(() => {
        currentXYZString.value = serializePickerColor(convertPickerColor(model.value.color, "xyz"));
    }, 100);

    watch(() => model.value.color, () => recomputeXYZ(), { immediate: true });

    // --- Color name resolution ---

    const formattedCurrentColor = computed(() => {
        const colorString = currentXYZString.value;

        if (colorString) {
            const customName = findCustomName(colorString);
            if (customName) return customName;
        }

        // Hex display format
        if (selectedDisplaySpace.value === "hex") {
            return colorToHexString(model.value.color);
        }

        return serializePickerColor(currentPhysicalColor.value);
    });

    function savedColorLabel(color: PickerColor): string {
        const colorString = serializePickerColor(convertPickerColor(color, "xyz"));
        const custom = findCustomName(colorString);
        if (custom) return custom;
        return serializePickerColor(color);
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
        const hasCustom = !!findCustomName(colorString);
        return !hasCustom;
    });

    return {
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
    };
}
