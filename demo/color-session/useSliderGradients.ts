import { computed, shallowRef, watch, type ShallowRef, type Ref, type ComputedRef } from "vue";
import {
    PICKER_CHANNELS,
    channelNumber,
    serializePickerColor,
    withAlpha,
    withNormalizedChannel,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";
import type { ColorModel } from "../@/components/custom/color-picker";
import { colorToHexString } from "../@/components/custom/color-picker";

const DIGITS = 2;

export function useSliderGradients(deps: {
    model: ShallowRef<ColorModel>;
    currentColorOpaque: ComputedRef<PickerColor>;
    currentColorSpace: ComputedRef<PickerSpace>;
    stableHue: Ref<number>;
    currentPhysicalColor: ComputedRef<PickerColor>;
}) {
    const { model, currentColorOpaque, currentColorSpace, currentPhysicalColor } = deps;

    const componentsSlidersStyle = shallowRef<Record<string, string[]>>({});

    const computeSliderGradients = () => {
        const STEPS = 10;
        const sourceColor = currentColorOpaque.value;
        const gradients: Record<string, string[]> = {};

        for (const { key: component } of PICKER_CHANNELS[sourceColor.space]) {
            const stops: string[] = [];
            for (let i = 0; i <= STEPS; i++) {
                const t = i / STEPS;
                const step = withNormalizedChannel(sourceColor, component, t);
                const cssStr = serializePickerColor(step);
                stops.push(`${cssStr} ${(t * 100)}%`);
            }
            gradients[component] = stops;
        }
        gradients.alpha = Array.from({ length: STEPS + 1 }, (_, index) => {
            const t = index / STEPS;
            return `${serializePickerColor(withAlpha(sourceColor, t))} ${t * 100}%`;
        });
        return gradients;
    };

    watch(
        () => {
            // Depend on all color components so gradients update when ANY value changes.
            const entries = PICKER_CHANNELS[currentColorOpaque.value.space]
                .map(({ key }) => `${key}:${channelNumber(currentColorOpaque.value, key).toFixed(3)}`)
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

        return PICKER_CHANNELS[currentPhysicalColor.value.space]
            .map((meta) => {
                const value = channelNumber(currentPhysicalColor.value, meta.key);
                const displayed = meta.unit === "%" && meta.max <= 1 ? value * 100 : value;
                return [meta.key, { value: displayed, unit: meta.unit }] as const;
            })
            .reduce((acc: Record<string, { value: number | string; unit: string; monospace?: boolean }>, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    });

    const currentColorRanges = computed(() => {
        return PICKER_CHANNELS[currentColorSpace.value].reduce((acc: Record<string, string>, meta) => {
            const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
            acc[meta.key] = `(${meta.min * scale}${meta.unit} - ${meta.max * scale}${meta.unit})`;
            return acc;
        }, {});
    });

    return {
        componentsSlidersStyle,
        currentColorComponentsFormatted,
        currentColorRanges,
    };
}
