import { computed, shallowRef, watch, type ShallowRef, type Ref, type ComputedRef } from "vue";
import { ValueUnit } from "@src/units";
import { Color } from "@src/units/color";
import type { ColorSpace } from "@src/units/color/constants";
import {
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "@src/units/color/constants";
import { normalizeColorUnit } from "@src/units/color/normalize";
import type { ColorModel } from "@components/custom/color-picker";
import { toCSSColorString, colorToHexString } from "@components/custom/color-picker";

const DIGITS = 2;

export function useSliderGradients(deps: {
    model: ShallowRef<ColorModel>;
    currentColorOpaque: ComputedRef<ValueUnit<Color<ValueUnit<number>>, "color">>;
    currentColorSpace: ComputedRef<ColorSpace>;
    stableHue: Ref<number>;
    denormalizedCurrentColor: ComputedRef<ValueUnit<Color<ValueUnit<number>>, "color">>;
}) {
    const { model, currentColorOpaque, currentColorSpace, stableHue, denormalizedCurrentColor } = deps;

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
            // Depend on all color components so gradients update when ANY value changes.
            const entries = currentColorOpaque.value.value
                .entries()
                .map(([k, v]: [string, any]) => `${k}:${v.value.toFixed(3)}`)
                .join("|");
            return `${currentColorSpace.value}:${entries}`;
        },
        () => {
            componentsSlidersStyle.value = computeSliderGradients();
        },
        { immediate: true },
    );

    const currentColorComponentsFormatted = computed(() => {
        // Hex mode: single component displaying the hex string
        if (model.value.selectedColorSpace === "hex") {
            const hex = colorToHexString(model.value.color);
            return { hex: { value: hex, unit: "", monospace: true } } as Record<string, { value: number | string; unit: string; monospace?: boolean }>;
        }

        return denormalizedCurrentColor.value.value
            .entries()
            .filter(([key]: [string, any]) => key !== "alpha")
            .map(([key, value]: [string, any]) => {
                return [key, { value: value.value, unit: value.unit ?? "" }] as const;
            })
            .reduce((acc: Record<string, { value: number | string; unit: string; monospace?: boolean }>, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    });

    const currentColorRanges = computed(() => {
        return model.value.color.value.keys().reduce((acc: Record<string, string>, key: string) => {
            // S.W2 W2-9: the typed `ColorSpace`-keyed accessors (G.W2 Lane A)
            // retire the former `(… as any)[space][key]` string-indexed lookups.
            const unit = getColorSpaceDenormUnit(currentColorSpace.value, key);
            const { min, max } = getColorSpaceBound(currentColorSpace.value, key, unit);
            acc[key] = `(${min}${unit} - ${max}${unit})`;
            return acc;
        }, {});
    });

    return {
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,
    };
}
