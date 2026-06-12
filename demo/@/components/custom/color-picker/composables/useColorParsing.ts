import { ref, type ShallowRef, type Ref, type ComputedRef } from "vue";
import { debounce } from "@src/utils";
import { generateSingleColor } from "./useColorGeneration";
import { parseCSSColor } from "@src/parsing/color";
import type { ParsedColorUnit } from "@src/parsing/color";
import type { ColorSpace } from "@src/units/color/constants";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import type { ColorModel } from "@components/custom/color-picker";
import type { DisplayColorSpace } from "@components/custom/color-picker";
import { resolveColorSpace } from "@components/custom/color-picker";

const DEFAULT_COLOR = "lavendi";

export function useColorParsing(deps: {
    model: ShallowRef<ColorModel>;
    updateModel: (patch: Partial<ColorModel>) => void;
    stableHue: Ref<number>;
    currentColorSpace: ComputedRef<ColorSpace>;
}) {
    const { model, updateModel, stableHue, currentColorSpace } = deps;

    const getColorSpace = (color: ParsedColorUnit) => {
        return color.value.colorSpace as ColorSpace;
    };

    const parseAndNormalizeColor = (value: string) => {
        let color: ParsedColorUnit;
        try {
            value = value.trim().toLowerCase();
            color = parseCSSColor(value);
        } catch (e) {
            console.warn("[useColorModel] Invalid color:", value, e);
            color = parseCSSColor(DEFAULT_COLOR);
        }
        return normalizeColorUnit(color);
    };

    const setCurrentColor = (
        color: ParsedColorUnit,
        colorSpace?: DisplayColorSpace,
        fromSpectrum?: boolean,
    ) => {
        const resolved = resolveColorSpace(colorSpace ?? getColorSpace(color));
        const converted = colorUnit2(
            color,
            resolved,
            true,
            false,
            false,
        );
        // Preserve the display space (e.g. "hex") rather than replacing with "rgb"
        updateModel({
            color: converted,
            selectedColorSpace: colorSpace ?? converted.value.colorSpace,
        });
        // When called from spectrum, hue is already stable -- don't overwrite
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

    // --- Parse error feedback ---
    const parseError = ref(false);
    let parseErrorTimer: ReturnType<typeof setTimeout> | undefined;

    const flashParseError = () => {
        parseError.value = true;
        clearTimeout(parseErrorTimer);
        parseErrorTimer = setTimeout(() => { parseError.value = false; }, 2000);
    };

    const parseAndSetColor = (newVal: string) => {
        try {
            newVal = newVal.trim().toLowerCase();
            if (!newVal || newVal === prevInvalidParsedValue) return;

            // Parse directly -- throws on invalid input (no silent fallback)
            const parsed = parseCSSColor(newVal);
            const normalized = normalizeColorUnit(parsed);

            if (normalized?.value?.toString() === model?.value?.color?.value?.toString()) {
                parseError.value = false;
                return;
            }

            const converted = colorUnit2(
                normalized,
                getColorSpace(normalized),
                true,
                false,
                false,
            );

            parseError.value = false;
            prevInvalidParsedValue = "";

            // If input is a hex string, select "hex" display mode rather than "rgb"
            const detectedSpace: DisplayColorSpace =
                converted.value.colorSpace === "rgb" && newVal.startsWith("#")
                    ? "hex"
                    : converted.value.colorSpace;

            updateModel({
                inputColor: newVal,
                color: converted,
                selectedColorSpace: detectedSpace,
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
                flashParseError();
            }
        } finally {
            isInitialParse = false;
        }
    };

    const parseAndSetColorDebounced = debounce(parseAndSetColor, 2000, false);

    // --- Random color ---

    const generateRandomColor = (
        colorSpace: DisplayColorSpace,
    ): ParsedColorUnit => {
        // Generate a pleasing random color using OKLCh-constrained generation
        const css = generateSingleColor("vibrant");
        const parsed = parseAndNormalizeColor(css);
        const color = colorUnit2(
            parsed,
            resolveColorSpace(colorSpace),
            true,
            false,
            true,
        );
        color.value.alpha = model.value.color.value.alpha;
        return color;
    };

    return {
        parseAndNormalizeColor,
        setCurrentColor,
        parseAndSetColor,
        parseAndSetColorDebounced,
        parseError,
        generateRandomColor,
    };
}
