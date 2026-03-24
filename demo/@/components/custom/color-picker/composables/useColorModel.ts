import { computed, ref, shallowRef, watch, type Ref, type ShallowRef, type WritableComputedRef } from "vue";
import { copyToClipboard } from "@composables/useClipboard";
import { debounce } from "@src/utils";
import { parseCSSColor } from "@src/parsing/color";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_RANGES,
    COLOR_NAMES,
} from "@src/units/color/constants";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@src/units/color/normalize";
import type { ColorModel } from "@components/custom/color-picker";
import { toCSSColorString, CSS_NATIVE_SPACES, resolveColorSpace, colorToHexString } from "@components/custom/color-picker";

import { useColorParsing } from "./useColorParsing";
import { useSliderGradients } from "./useSliderGradients";
import { useColorNameResolution } from "./useColorNameResolution";

const DIGITS = 2;

// Normalize built-in COLOR_NAMES to XYZ formatted strings (module-level, computed once)
export const NORMALIZED_COLOR_NAMES = Object.entries(COLOR_NAMES).reduce(
    (acc, [name, color]) => {
        const parsedColor = parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">;
        const xyz = colorUnit2(parsedColor, "xyz", false, false, false);
        acc[name] = xyz.value.toFormattedString(DIGITS);
        return acc;
    },
    {} as Record<string, string>,
);

export function useColorModel(externalModel: ShallowRef<ColorModel> | WritableComputedRef<ColorModel> | Ref<ColorModel>) {
    // --- Local source of truth ---
    const model = shallowRef<ColorModel>({ ...externalModel.value });

    // External -> local sync
    let lastWrittenModel: ColorModel | null = null;
    watch(() => externalModel.value, (ext) => {
        if (ext === lastWrittenModel) return;
        model.value = { ...ext };
        if (ext.color) {
            try {
                const hsv = colorUnit2(ext.color, "hsv", true, false, false);
                const s = hsv.value.s.value;
                const v = hsv.value.v.value;
                if (s * v > 0.01) {
                    stableHue.value = hsv.value.h.value;
                }
            } catch { /* ignore */ }
        }
    });

    // --- Core model mutation ---

    const updateModel = (patch: Partial<ColorModel>) => {
        const next = { ...model.value, ...patch };
        model.value = next;
        lastWrittenModel = next;
        externalModel.value = next;
    };

    // --- Derived colors ---

    const denormalizedCurrentColor = computed(() => {
        return normalizeColorUnit(model.value.color, true, false);
    });

    const cssColor = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        }
        return toCSSColorString(model.value.color);
    });

    const cssColorOpaque = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            const denorm = denormalizedCurrentColor.value;
            const c = denorm.clone() as typeof denorm;
            c.value.alpha.value = 100;
            return c.value.toFormattedString(DIGITS);
        }
        const c = model.value.color.clone();
        c.value.alpha.value = 1;
        return toCSSColorString(c);
    });

    // --- Stable HSV hue ---

    const initHsv = colorUnit2(model.value.color, "hsv", true, false, false);
    const stableHue = ref(initHsv.value.h.value);

    const HSVCurrentColor = computed(() => {
        const hsv = colorUnit2(model.value.color, "hsv", true, false, false);
        hsv.value.h.value = stableHue.value;
        return hsv;
    });

    const currentColorOpaque = computed(() => {
        const denorm = denormalizedCurrentColor.value;
        const color = denorm.clone() as typeof denorm;
        color.value.alpha.value = 100;
        return color;
    });

    const getColorSpace = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
        return color.value.colorSpace as ColorSpace;
    };

    const currentColorSpace = computed(() => resolveColorSpace(model.value.selectedColorSpace));

    const colorComponents = computed(() => {
        // Hex mode: single "hex" component for the heading display
        if (model.value.selectedColorSpace === "hex") {
            return [["hex", 0]] as [string, any][];
        }
        return Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value])
            .filter(([key]) => key !== "alpha");
    });

    // --- Delegated composables ---

    const {
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        generateRandomColor,
    } = useColorParsing({ model, updateModel, stableHue, currentColorSpace });

    const {
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,
    } = useSliderGradients({ model, currentColorOpaque, currentColorSpace, stableHue, denormalizedCurrentColor });

    const {
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,
    } = useColorNameResolution({ model, denormalizedCurrentColor, currentColorSpace });

    // --- Saved colors ---

    const savedColorStrings = computed(() =>
        model.value.savedColors
            .filter((c: any) => c instanceof ValueUnit)
            .map((c: any) => {
                const normalized = CSS_NATIVE_SPACES.has(c.value.colorSpace)
                    ? normalizeColorUnit(c, true, false)
                    : colorUnit2(c, "oklch", true, true, false);
                return normalized.value.toFormattedString(DIGITS);
            }),
    );

    // --- Component updates ---

    const updateToColorSpace = (to: ColorSpace) => {
        const color = colorUnit2(model.value.color, to, true, false, false);
        // Preserve the display space (e.g. "hex") rather than letting setCurrentColor
        // overwrite it with the resolved color space ("rgb")
        setCurrentColor(color, model.value.selectedColorSpace);
    };

    const formatForSelectedDisplaySpace = (
        color: ValueUnit<Color<ValueUnit<number>>, "color">,
    ) => {
        if (model.value.selectedColorSpace === "hex") {
            return colorToHexString(color);
        }
        return normalizeColorUnit(color, true, false).value.toFormattedString(DIGITS);
    };

    const applyExternalColor = (cssColor: string) => {
        const parsed = parseAndNormalizeColor(cssColor);
        const resolved = resolveColorSpace(model.value.selectedColorSpace);
        const converted = colorUnit2(parsed, resolved, true, false, false);
        setCurrentColor(parsed, model.value.selectedColorSpace);
        updateModel({ inputColor: formatForSelectedDisplaySpace(converted) });
    };

    const updateColorComponent = (
        value: number,
        component: string,
        normalized: boolean = false,
    ) => {
        if (Number.isNaN(value) || !Number.isFinite(value)) return;
        const color = model.value.color.clone();
        if (normalized) {
            color.value[component].value = value;
        } else {
            const normalizedValue = normalizeColorUnitComponent(
                value,
                denormalizedCurrentColor.value.value[component].unit,
                currentColorSpace.value,
                component,
                false,
            );
            color.value[component].value = normalizedValue.value;
        }
        updateModel({ color });

        if (component === "h" || component === "hue") {
            const hsv = colorUnit2(color, "hsv", true, false, false);
            stableHue.value = hsv.value.h.value;
        }
    };

    const updateColorComponentDebounced = debounce(updateColorComponent, 500);

    // --- Palette handlers ---

    function onPaletteAddColor(cssColor: string) {
        const savedColors = [...model.value.savedColors];
        const currentStr = toCSSColorString(model.value.color);

        const alreadyExists = savedColors.some(
            (c: any) => c instanceof ValueUnit && toCSSColorString(c) === currentStr,
        );
        if (alreadyExists) return;

        try {
            savedColors.push(parseAndNormalizeColor(cssColor));
            updateModel({ savedColors });
        } catch { /* ignore */ }
    }

    function onPaletteApply(colors: string[]) {
        const parsed = colors.map((css) => {
            try { return parseAndNormalizeColor(css); } catch { return null; }
        }).filter(Boolean) as typeof model.value.savedColors;

        updateModel({ savedColors: parsed });
    }

    return {
        // Model
        model,
        updateModel,

        // Derived colors
        denormalizedCurrentColor,
        cssColor,
        cssColorOpaque,
        HSVCurrentColor,
        stableHue,
        currentColorOpaque,
        currentColorSpace,
        colorComponents,

        // Name resolution
        formattedCurrentColor,
        savedColorLabel,
        currentColorMeta,
        crownKey,
        canProposeName,

        // Saved colors
        savedColorStrings,
        onPaletteAddColor,
        onPaletteApply,

        // Parsing / setting
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        applyExternalColor,

        // Random
        generateRandomColor,

        // Slider styles
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,

        // Component updates
        updateToColorSpace,
        updateColorComponent,
        updateColorComponentDebounced,

        // Clipboard
        copyToClipboard,

        // Constants (re-exported for convenience)
        DIGITS,
    };
}

export type UseColorModelReturn = ReturnType<typeof useColorModel>;
