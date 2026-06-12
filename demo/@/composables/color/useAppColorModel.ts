import { computed, watch, type ShallowRef } from "vue";
import { useStorage } from "@vueuse/core";
import type { ColorModel } from "@components/custom/color-picker";
import {
    defaultColorModel,
    createDefaultColorModel,
    toCSSColorString,
    colorToHexString,
    CSS_NATIVE_SPACES,
} from "@components/custom/color-picker";
import { normalizeColorUnit, colorUnit2 } from "@src/units/color/normalize";
import { parseCSSColor } from "@src/parsing/color";
import { debounce } from "@src/utils";

export function useAppColorModel(model: ShallowRef<ColorModel>) {
    const colorStore = useStorage("color-picker", defaultColorModel);

    const cssColor = computed(() => toCSSColorString(model.value.color));

    const cssColorOpaque = computed(() => {
        const color = model.value.color;
        if (CSS_NATIVE_SPACES.has(color.value.colorSpace)) {
            const denorm = normalizeColorUnit(color, true, false);
            const c = denorm.clone() as typeof denorm;
            c.value.alpha.value = 100;
            return c.value.toFormattedString(2);
        }
        const c = color.clone();
        c.value.alpha.value = 1;
        return toCSSColorString(c);
    });

    const savedColorStrings = computed(() =>
        model.value.savedColors.map((c) =>
            normalizeColorUnit(c as any, true, false).toString(),
        ),
    );

    const updateModel = (patch: Partial<ColorModel>) => {
        model.value = { ...model.value, ...patch };
    };

    const resetToDefaults = () => {
        model.value = createDefaultColorModel();
    };

    /** Parse a CSS string and apply it to the model. */
    const applyColorString = (css: string) => {
        try {
            const parsed = normalizeColorUnit(parseCSSColor(css));
            const resolvedSpace = model.value.selectedColorSpace === "hex" ? "rgb" : model.value.selectedColorSpace;
            const color = colorUnit2(parsed, resolvedSpace, true, false, false);
            const inputColor = model.value.selectedColorSpace === "hex"
                ? colorToHexString(color)
                : normalizeColorUnit(color, true, false).value.toFormattedString(2);
            updateModel({ color, inputColor, selectedColorSpace: model.value.selectedColorSpace });
        } catch { /* ignore parse errors */ }
    };

    // --- Storage sync ---

    const syncColorToStorage = debounce(
        (color: any) => { colorStore.value.inputColor = color?.toString() ?? ""; },
        200,
        false,
    );

    watch(() => model.value.color, (color) => { syncColorToStorage(color); });

    // Persist opaque color for flash-free page load background.
    watch(cssColorOpaque, (c) => {
        try { localStorage.setItem("color-picker-bg", c); } catch {}
        document.documentElement.style.background = "";
        document.body.style.background = "";
    }, { immediate: true });

    watch(() => model.value.savedColors, (colors) => {
        colorStore.value.savedColors = colors.map((c) =>
            normalizeColorUnit(c as any, true, false).toString(),
        );
    });

    return {
        cssColor,
        cssColorOpaque,
        savedColorStrings,
        updateModel,
        resetToDefaults,
        applyColorString,
    };
}
