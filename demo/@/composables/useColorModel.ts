import { computed, ref, shallowRef, watch, type Ref, type ShallowRef, type WritableComputedRef } from "vue";
import { copyToClipboard } from "./useClipboard";
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
    const { findCustomName, getMetadata } = useCustomColorNames();

    // --- Local source of truth ---
    // The external model may be a defineModel() WritableComputedRef, which emits
    // update:modelValue to the parent and only reflects the new value AFTER the
    // parent's shallowRef round-trips back through props. This async lag means
    // reading externalModel.value right after writing returns STALE data — fatal
    // during rapid spectrum dragging (~60fps).
    //
    // Solution: maintain a local shallowRef that is written synchronously.
    // All computeds read from `model` (local). Writes go to both local (immediate)
    // and external (async propagation to parent). External→local sync handles
    // changes from outside (URL, localStorage, color space dropdown).

    const model = shallowRef<ColorModel>({ ...externalModel.value });

    // External → local sync (URL changes, localStorage restore, parent resets).
    // Use object identity to detect our own writes bouncing back through the
    // parent's v-model round-trip. The `localWriteInProgress` flag doesn't work
    // because Vue watcher callbacks fire asynchronously (pre-flush), by which time
    // the flag is already reset.
    let lastWrittenModel: ColorModel | null = null;
    watch(() => externalModel.value, (ext) => {
        // Skip if this is our own write bouncing back from the parent
        if (ext === lastWrittenModel) return;
        model.value = { ...ext };
        // Update stableHue from external color change (URL, localStorage, reset)
        if (ext.color) {
            try {
                const hsv = colorUnit2(ext.color, "hsv", true, false, false);
                const s = hsv.value.s.value;
                const v = hsv.value.v.value;
                if (s * v > 0.01) {
                    stableHue.value = hsv.value.h.value;
                }
            } catch { /* ignore — color may not be fully initialized */ }
        }
    });

    // --- Core model mutation ---

    const updateModel = (patch: Partial<ColorModel>) => {
        const next = { ...model.value, ...patch };
        // Synchronous local update — computeds see this immediately
        model.value = next;
        // Async propagation to parent (defineModel emit)
        lastWrittenModel = next;
        externalModel.value = next;
    };

    // --- Derived colors ---
    // PERF: denormalizedCurrentColor is the single source of truth for denormalized color.
    // cssColor, cssColorOpaque, and currentColorOpaque all derive from it to avoid
    // redundant clone+normalize cycles (was 5 per frame, now 1).

    const denormalizedCurrentColor = computed(() => {
        return normalizeColorUnit(model.value.color, true, false);
    });

    const cssColor = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            return denormalizedCurrentColor.value.value.toFormattedString(DIGITS);
        }
        // Non-native spaces (hsv, kelvin, xyz) need oklch conversion
        return toCSSColorString(model.value.color);
    });

    const cssColorOpaque = computed(() => {
        if (CSS_NATIVE_SPACES.has(model.value.color.value.colorSpace)) {
            // Clone the already-denormalized result instead of re-denormalizing from scratch
            const denorm = denormalizedCurrentColor.value;
            const c = denorm.clone() as typeof denorm;
            // Alpha is denormalized to % (0-100), set to 100% for opaque
            c.value.alpha.value = 100;
            return c.value.toFormattedString(DIGITS);
        }
        const c = model.value.color.clone();
        c.value.alpha.value = 1;
        return toCSSColorString(c);
    });

    // --- Stable HSV hue ---
    // The oklch roundtrip loses hue when chroma→0 (Math.atan2(0,0)=0).
    // stableHue is the source of truth; only updated EXPLICITLY by callers
    // that change the hue (setCurrentColor, updateColorComponent, parseAndSetColor).
    // NO watch — a watch on model.value.color fires during spectrum drag, causing
    // roundtrip float drift that triggers spurious slider gradient recomputations,
    // eventually blocking the main thread.

    const initHsv = colorUnit2(model.value.color, "hsv", true, false, false);
    const stableHue = ref(initHsv.value.h.value);

    const HSVCurrentColor = computed(() => {
        const hsv = colorUnit2(model.value.color, "hsv", true, false, false);
        // Inject the stable hue to prevent drift from lossy oklch roundtrip
        hsv.value.h.value = stableHue.value;
        return hsv;
    });

    const currentColorOpaque = computed(() => {
        // Clone from denormalizedCurrentColor instead of re-normalizing
        const denorm = denormalizedCurrentColor.value;
        const color = denorm.clone() as typeof denorm;
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

    // --- XYZ consolidation ---
    // Debounced: XYZ conversion + name resolution are expensive and not needed during drag.
    // During rapid spectrum dragging (~60fps), only the visual feedback (cssColor, spectrum dot,
    // slider values) needs real-time updates. Name resolution can wait until the user pauses.

    const currentXYZString = ref("");

    const recomputeXYZ = debounce(() => {
        const xyz = colorUnit2(model.value.color, "xyz", true, false, false);
        currentXYZString.value = xyz.value.toFormattedString(DIGITS);
    }, 100, false);

    // Trigger XYZ recompute when color changes, but debounced
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
            console.warn("[useColorModel] Invalid color:", value, e);
            color = parseCSSColor(DEFAULT_COLOR) as ValueUnit<Color<ValueUnit<number>>, "color">;
        }
        return normalizeColorUnit(color);
    };

    const setCurrentColor = (
        color: ValueUnit<Color<ValueUnit<number>>, "color">,
        colorSpace?: ColorSpace,
        fromSpectrum?: boolean,
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
        // When called from spectrum, hue is already stable — don't overwrite
        // from the lossy roundtrip. All other callers update stableHue.
        if (!fromSpectrum) {
            const hsv = colorUnit2(converted, "hsv", true, false, false);
            const s = hsv.value.s.value;
            const v = hsv.value.v.value;
            if (s * v > 0.01) {
                stableHue.value = hsv.value.h.value;
            }
        }
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

            // Update stableHue from parsed color
            const parsedHsv = colorUnit2(converted, "hsv", true, false, false);
            const ps = parsedHsv.value.s.value;
            const pv = parsedHsv.value.v.value;
            if (ps * pv > 0.01) {
                stableHue.value = parsedHsv.value.h.value;
            }

        } catch (e) {
            prevInvalidParsedValue = newVal;
            if (!isInitialParse) {
                console.warn("[useColorModel] Invalid color:", newVal);
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
    // During spectrum drag only s/v change — hue, alpha, and color space stay the same.
    // Use a watch keyed on those stable values so we skip the expensive 88-clone gradient
    // recomputation during pure spectrum dragging.

    const componentsSlidersStyle = shallowRef<Record<string, string[]>>({});

    const computeSliderGradients = () => {
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
    };

    watch(
        () => {
            // Depend on stableHue, alpha, and color space — NOT the lossy HSV hue.
            // This prevents spurious recomputation from hue drift during dark-area dragging.
            const alpha = model.value.color?.value?.alpha?.value ?? 1;
            return `${currentColorSpace.value}:${stableHue.value.toFixed(3)}:${alpha.toFixed(3)}`;
        },
        () => {
            componentsSlidersStyle.value = computeSliderGradients();
        },
        { immediate: true },
    );

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

        // If the user explicitly changes a hue-like component via slider/input,
        // force-update stableHue regardless of chroma (the user chose this hue).
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

    // --- Clipboard (re-exported from useClipboard) ---

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
