import { computed, ref, type ShallowRef } from "vue";
import { toast } from "vue-sonner";
import { debounce } from "@src/utils";
import { clamp } from "@src/math";
import { parseCSSColor } from "@src/parsing/color";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_DENORM_UNITS,
    COLOR_SPACE_NAMES,
    COLOR_SPACE_RANGES,
    COLOR_NAMES,
} from "@src/units/color/constants";
import {
    colorUnit2,
    normalizeColorUnit,
    normalizeColorUnitComponent,
} from "@src/units/color/normalize";
import { useCustomColorNames } from "@composables/useCustomColorNames";
import { proposeColorName } from "@lib/palette/api";
import type { ColorModel } from "@components/custom/color-picker";
import { toCSSColorString, CSS_NATIVE_SPACES } from "@components/custom/color-picker";

const DEFAULT_COLOR = "lavendi";
const DIGITS = 2;

// Normalize built-in COLOR_NAMES to XYZ formatted strings (module-level, computed once)
const NORMALIZED_COLOR_NAMES = Object.entries(COLOR_NAMES).reduce(
    (acc, [name, color]) => {
        const parsedColor = parseCSSColor(color) as ValueUnit<Color<ValueUnit<number>>, "color">;
        const xyz = colorUnit2(parsedColor, "xyz", false, false, false);
        acc[name] = xyz.value.toFormattedString(DIGITS);
        return acc;
    },
    {} as Record<string, string>,
);

export function useColorModel(model: ShallowRef<ColorModel>) {
    const { findCustomName, getMetadata } = useCustomColorNames();

    // --- Core model mutation ---

    const updateModel = (patch: Partial<ColorModel>) => {
        model.value = { ...model.value, ...patch };
    };

    // --- Derived colors ---

    const denormalizedCurrentColor = computed(() => {
        return normalizeColorUnit(model.value.color, true, false);
    });

    const cssColor = computed(() => toCSSColorString(model.value.color));

    const cssColorOpaque = computed(() => {
        const c = model.value.color.clone();
        c.value.alpha.value = 1;
        return toCSSColorString(c);
    });

    const HSVCurrentColor = computed(() => {
        return colorUnit2(model.value.color, "hsv", true, false, false);
    });

    const currentColorOpaque = computed(() => {
        const color = normalizeColorUnit(model.value.color, true, false);
        color.value.alpha.value = 100;
        return color;
    });

    const getColorSpace = (color: ValueUnit<Color<ValueUnit<number>>, "color">) => {
        return color.value.colorSpace as ColorSpace;
    };

    const currentColorSpace = computed(() => getColorSpace(model.value.color));

    const colorComponents = computed(() =>
        Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value])
            .filter(([key]) => key !== "alpha"),
    );

    // --- XYZ consolidation (eliminates 2 redundant conversions per color change) ---

    const currentXYZString = computed(() => {
        const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
        return xyz.value.toFormattedString(DIGITS);
    });

    // --- Color name resolution ---

    const formattedCurrentColor = computed(() => {
        const colorString = currentXYZString.value;

        // Check built-in CSS color names first
        const colorName = Object.entries(NORMALIZED_COLOR_NAMES).find(
            ([, value]) => value === colorString,
        );
        if (colorName) return colorName[0];

        // Check custom (approved) color names
        const customName = findCustomName(colorString);
        if (customName) return customName;

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

    // --- Parsing ---

    const parseAndNormalizeColor = (value: string) => {
        let color: ValueUnit<Color<ValueUnit<number>>, "color">;
        try {
            value = value.trim().toLowerCase();
            color = parseCSSColor(value) as ValueUnit<Color<ValueUnit<number>>, "color">;
        } catch (e) {
            console.error(e);
            toast.error(`Invalid color: ${value}`);
            color = parseCSSColor(DEFAULT_COLOR) as ValueUnit<Color<ValueUnit<number>>, "color">;
        }
        return normalizeColorUnit(color);
    };

    const setCurrentColor = (
        color: ValueUnit<Color<ValueUnit<number>>, "color">,
        colorSpace?: ColorSpace,
    ) => {
        const converted = colorUnit2(
            color,
            colorSpace ?? getColorSpace(color),
            true,
            false,
            false,
        );
        updateModel({
            color: converted,
            selectedColorSpace: converted.value.colorSpace,
        });
    };

    let prevInvalidParsedValue = "";
    let isInitialParse = true;

    const parseAndSetColor = (newVal: string) => {
        try {
            newVal = newVal.trim().toLowerCase();
            if (newVal === prevInvalidParsedValue) return;

            const color = parseAndNormalizeColor(newVal);
            if (color?.value?.toString() === model?.value?.color?.value?.toString()) return;

            const converted = colorUnit2(
                color,
                getColorSpace(color),
                true,
                false,
                false,
            );

            updateModel({
                inputColor: newVal,
                color: converted,
                selectedColorSpace: converted.value.colorSpace,
            });

            if (!isInitialParse) {
                toast.success(`Parsed ${savedColorLabel(converted)} 🎨`);
            }
        } catch (e) {
            prevInvalidParsedValue = newVal;
            if (!isInitialParse) {
                toast.error(`Invalid color: ${newVal}`);
            }
        } finally {
            isInitialParse = false;
        }
    };

    const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

    // --- Random color ---

    const generateRandomColor = (
        colorSpace: ColorSpace,
    ): ValueUnit<Color<ValueUnit<number>>> => {
        let color = parseAndNormalizeColor("white");
        color = colorUnit2(color, colorSpace, true, false, true);

        color.value
            .entries()
            .filter(([component]) => component !== "alpha")
            .forEach(([component, value]) => {
                value.value = Math.random();
            });

        color.value.alpha = model.value.color.value.alpha;
        return color;
    };

    // --- Slider styles ---

    const componentsSlidersStyle = computed(() => {
        const STEPS = 10;
        const sourceColor = normalizeColorUnit(currentColorOpaque.value, false, false);
        const gradients: Record<string, string[]> = {};

        for (const [component] of sourceColor.value.entries()) {
            const stops: string[] = [];
            for (let i = 0; i <= STEPS; i++) {
                const t = i / STEPS;
                const step = sourceColor.clone() as typeof sourceColor;
                step.value[component].value = t;
                const cssStr = toCSSColorString(step);
                stops.push(`${cssStr} ${(t * 100)}%`);
            }
            gradients[component] = stops;
        }
        return gradients;
    });

    const currentColorComponentsFormatted = computed(() => {
        return denormalizedCurrentColor.value.value
            .entries()
            .filter(([key]: [string, any]) => key !== "alpha")
            .map(([key, value]: [string, any]) => {
                return [key, { value: value.value, unit: value.unit ?? "" }] as const;
            })
            .reduce((acc: Record<string, { value: number; unit: string }>, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    });

    const currentColorRanges = computed(() => {
        return model.value.color.value.keys().reduce((acc: Record<string, string>, key: string) => {
            const unit = (COLOR_SPACE_DENORM_UNITS as any)[currentColorSpace.value][key];
            const range = (COLOR_SPACE_RANGES as any)[currentColorSpace.value][key];
            const { min, max } = range[unit] ?? range["number"];
            acc[key] = `(${min}${unit} - ${max}${unit})`;
            return acc;
        }, {});
    });

    // --- Component updates ---

    const updateToColorSpace = (to: ColorSpace) => {
        const color = colorUnit2(model.value.color, to, true, false, false);
        setCurrentColor(color);
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

    // --- Clipboard ---

    const copyToClipboard = (text: string) => {
        if (!navigator.clipboard) {
            toast.error("Clipboard API not supported");
            return;
        }
        if (!text) {
            toast.error("No text to copy");
            return;
        }
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.success(`Copied ${text} to clipboard 📋`);
            })
            .catch((err) => {
                toast.error("Could not copy to clipboard: " + err);
            });
    };

    return {
        // Model
        model,
        updateModel,

        // Derived colors
        denormalizedCurrentColor,
        cssColor,
        cssColorOpaque,
        HSVCurrentColor,
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
