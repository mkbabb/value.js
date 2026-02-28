<template>
    <div class="grid grid-cols-1 gap-2">
        <div
            v-for="[component, value] in Object.entries(
                COLOR_SPACE_RANGES[currentColorSpace],
            )"
            :key="component"
            class="grid grid-cols-1 w-full items-start"
        >
            <Label class="font-bold text-md"
                >{{ component.toUpperCase()
                }}<span class="font-normal italic opacity-60">{{
                    ` ${currentColorRanges[component]}`
                }}</span></Label
            >

            <div
                :ref="(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }"
                :class="[
                    'touch-gate-target',
                    sliderGates[component]?.isActive.value ? 'touch-gate-active' : '',
                ]"
            >
                <SliderRoot
                    :min="0"
                    :max="1"
                    :step="0.001"
                    class="relative flex w-full select-none items-center"
                    :style="{ touchAction: spectrumGateIsTouchDevice ? (sliderGates[component]?.isActive.value ? 'none' : 'pan-y') : undefined }"
                    :model-value="[model.color.value[component].value]"
                    @update:model-value="
                        ([v]) => updateColorComponent(v, component, true)
                    "
                >
                    <SliderTrack
                        class="slider-track relative h-6 w-full grow overflow-hidden rounded-sm transition-shadow"
                        :style="{
                            background: `linear-gradient(to right, ${componentsSlidersStyle[
                                component
                            ].join(', ')})`,
                        }"
                    >
                        <SliderRange class="absolute h-full bg-transparent" />
                    </SliderTrack>
                    <TooltipProvider
                        :skip-delay-duration="0"
                        :delay-duration="100"
                    >
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <SliderThumb
                                    class="slider-thumb block h-full w-3 rounded-sm border-2 border-gray-200 bg-transparent transition-colors focus-visible:outline-none"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="fira-code">
                                {{
                                    denormalizedCurrentColor.value[
                                        component
                                    ].toFixed(2)
                                }}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </SliderRoot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, watchEffect } from "vue";
import Label from "@components/ui/label/Label.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
} from "reka-ui";
import { COLOR_SPACE_RANGES } from "@src/units/color/constants";
import { useTouchGate } from "@composables/useTouchGate";
import { COLOR_MODEL_KEY } from "./keys";

const {
    model,
    denormalizedCurrentColor,
    currentColorSpace,
    currentColorRanges,
    componentsSlidersStyle,
    updateColorComponent,
} = inject(COLOR_MODEL_KEY)!;

// Touch gate check — reuse the same detection as spectrum
const spectrumGateIsTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

// Slider touch gates — one per component across all color spaces
const ALL_COMPONENTS = new Set(
    Object.values(COLOR_SPACE_RANGES).flatMap((ranges) => Object.keys(ranges)),
);
const sliderGates: Record<string, ReturnType<typeof useTouchGate>> = {};
for (const comp of ALL_COMPONENTS) {
    sliderGates[comp] = useTouchGate();
}
const sliderWrapperEls = ref<Record<string, HTMLElement>>({});

// Capture-phase listeners on slider wrappers to intercept reka-ui's pointerdown
watchEffect((onCleanup) => {
    const cleanups: (() => void)[] = [];

    for (const [component, el] of Object.entries(sliderWrapperEls.value)) {
        const gate = sliderGates[component];
        if (!gate || !el) continue;

        const onPointerDown = (e: PointerEvent) => {
            if (!gate.isTouchDevice) return;
            if (!gate.isActive.value) {
                e.stopPropagation();
                gate.handleTouchStart(el, e.clientY);
            } else {
                gate.resetTimer();
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            gate.handleScrollCheck(e);
        };
        const onTouchEnd = () => {
            gate.handleTouchEnd();
        };

        el.addEventListener("pointerdown", onPointerDown, { capture: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });

        cleanups.push(() => {
            el.removeEventListener("pointerdown", onPointerDown, { capture: true });
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        });
    }

    onCleanup(() => cleanups.forEach((fn) => fn()));
});
</script>
