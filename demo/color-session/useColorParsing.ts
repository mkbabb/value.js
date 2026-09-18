import { computed, ref, type ShallowRef, type Ref, type ComputedRef } from "vue";
import { debounce } from "../shared/utils";
import { generateSingleColor } from "./generate-color";
import {
    PICKER_CHANNELS,
    channelNumber,
    convertPickerColor,
    mapPickerOklabToSrgb,
    parsePickerColor,
    serializePickerColor,
    withAlpha,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";
import type { ColorModel, DisplayColorSpace } from "./color-model";
import { resolveColorSpace } from "./color-model";

export function useColorParsing(deps: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
    stableHue: Ref<number>;
    currentColorSpace: ComputedRef<PickerSpace>;
}) {
    const { model, updateModel, stableHue } = deps;

    const parseColor = (source: string): PickerColor => parsePickerColor(source.trim().toLowerCase());

    const setCurrentColor = (
        color: PickerColor,
        colorSpace?: DisplayColorSpace,
        fromSpectrum = false,
    ) => {
        const converted = convertPickerColor(color, resolveColorSpace(colorSpace ?? color.space));
        updateModel({
            color: converted,
            selectedColorSpace: colorSpace ?? converted.space,
        });
        if (fromSpectrum) return;
        try {
            const hsv = convertPickerColor(converted, "hsv");
            const saturation = channelNumber(hsv, "s");
            const value = channelNumber(hsv, "v");
            if (saturation * value > 0.01) stableHue.value = channelNumber(hsv, "h");
        } catch {
            // Powerless colors have no numeric hue; retain the last deliberate hue.
        }
    };

    let previousInvalid = "";
    let initialParse = true;
    const parseError = ref(false);
    let parseErrorTimer: ReturnType<typeof setTimeout> | undefined;

    const flashParseError = () => {
        parseError.value = true;
        clearTimeout(parseErrorTimer);
        parseErrorTimer = setTimeout(() => { parseError.value = false; }, 2000);
    };

    const parseAndSetColor = (source: string) => {
        const input = source.trim().toLowerCase();
        if (!input || input === previousInvalid) return;
        try {
            const parsed = parseColor(input);
            const selected: DisplayColorSpace = parsed.space === "rgb" && input.startsWith("#")
                ? "hex"
                : parsed.space;
            const converted = convertPickerColor(parsed, resolveColorSpace(selected));
            if (serializePickerColor(converted) === serializePickerColor(model.value.color)) {
                parseError.value = false;
                return;
            }
            parseError.value = false;
            previousInvalid = "";
            updateModel({ inputColor: input, color: converted, selectedColorSpace: selected });
            try {
                const hsv = convertPickerColor(converted, "hsv");
                if (channelNumber(hsv, "s") * channelNumber(hsv, "v") > 0.01) {
                    stableHue.value = channelNumber(hsv, "h");
                }
            } catch {
                // Preserve stable hue for powerless colors.
            }
        } catch {
            previousInvalid = input;
            if (!initialParse) flashParseError();
        } finally {
            initialParse = false;
        }
    };

    const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000);

    const astEcho = computed<{ space: string; parts: string[] }>(() => {
        const color = model.value.color;
        const parts = PICKER_CHANNELS[color.space].map((meta) => {
            const value = channelNumber(color, meta.key);
            const display = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
            return `${meta.key} ${Number(display.toFixed(3))}${meta.unit}`;
        });
        if (typeof color.alpha === "number" && color.alpha < 1) {
            parts.push(`α ${Number(color.alpha.toFixed(3))}`);
        }
        return { space: color.space, parts };
    });

    const gamutVerdict = computed<{ clips: boolean }>(() => {
        const original = convertPickerColor(model.value.color, "oklab");
        const mapped = mapPickerOklabToSrgb(original);
        const clips = original.channels.some((value, index) => {
            const mappedValue = mapped.channels[index];
            return typeof value === "number"
                && typeof mappedValue === "number"
                && Math.abs(value - mappedValue) > 1e-6;
        });
        return { clips };
    });

    const generateRandomColor = (colorSpace: DisplayColorSpace): PickerColor => {
        const parsed = parseColor(generateSingleColor("vibrant"));
        return withAlpha(
            convertPickerColor(parsed, resolveColorSpace(colorSpace)),
            model.value.color.alpha,
        );
    };

    return {
        parseColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        generateRandomColor,
        astEcho,
        gamutVerdict,
    };
}
