<template>
    <div class="grid grid-cols-1 gap-1">
        <div
            v-for="[component, value] in Object.entries(
                COLOR_SPACE_RANGES[currentColorSpace],
            )"
            :key="component"
            class="grid grid-cols-1 w-full items-start"
        >
            <Label class="font-normal text-base"
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
                        class="slider-track relative h-6 w-full grow overflow-hidden rounded-full transition-shadow"
                        :style="{
                            background: componentsSlidersStyle[component]
                                ? `linear-gradient(to right, ${componentsSlidersStyle[component].join(', ')})`
                                : undefined,
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
                                    :aria-label="`${component.toUpperCase()} channel`"
                                    class="slider-thumb block h-full w-3 rounded-full border-2 border-gray-200 bg-transparent transition-colors focus-visible:outline-none"
                                />
                            </TooltipTrigger>
                            <TooltipContent class="font-mono-code">
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
import { inject, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { Label } from "@components/ui/label";
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
import { useTouchGate } from "@mkbabb/glass-ui";
import { POINTER_DEBUG_KEY } from "../composables/usePointerDebug";
import { COLOR_MODEL_KEY } from "../keys";

const {
    model,
    denormalizedCurrentColor,
    currentColorSpace,
    currentColorRanges,
    componentsSlidersStyle,
    updateColorComponent,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

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

// Capture-phase listeners on slider wrappers to intercept reka-ui's pointerdown.
// Only re-attach when color space changes (not on every reactive tick).
let listenerCleanups: (() => void)[] = [];

function attachSliderListeners() {
    // Clean up old listeners first
    listenerCleanups.forEach((fn) => fn());
    listenerCleanups = [];

    for (const [component, el] of Object.entries(sliderWrapperEls.value)) {
        const gate = sliderGates[component];
        if (!gate || !el) continue;

        const onPointerDown = (e: PointerEvent) => {
            debug.logEvent(e, `sl:${component}:down`);
            debug.setGauge(`sl.${component}.gate`, gate.isActive.value);
            if (!gate.isTouchDevice) return;
            if (!gate.isActive.value) {
                e.stopPropagation();
                gate.handleTouchStart(el, e.clientY);
                debug.log(`sl:${component}:gate-block`, e.pointerId, e.target, false);
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

        // Recover from reka-ui pointer capture leak: SliderImpl.vue calls
        // setPointerCapture but has no pointercancel/lostpointercapture handlers.
        // On iOS Safari, pointercancel fires frequently during rapid gestures.
        const onPointerCancel = (e: PointerEvent) => {
            debug.logEvent(e, `sl:${component}:cancel`);
            const target = e.target as HTMLElement;
            const hadCapture = target?.hasPointerCapture?.(e.pointerId) ?? false;
            debug.log(`sl:${component}:cancel-release`, e.pointerId, e.target, hadCapture, hadCapture ? "released" : "no-cap");
            try { target.releasePointerCapture(e.pointerId); } catch {}
        };
        const onLostPointerCapture = (e: Event) => {
            debug.log(`sl:${component}:lostcap`, (e as PointerEvent).pointerId ?? -1, e.target, false);
            gate.resetTimer();
        };

        el.addEventListener("pointerdown", onPointerDown, { capture: true });
        el.addEventListener("touchmove", onTouchMove, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        el.addEventListener("pointercancel", onPointerCancel);
        el.addEventListener("lostpointercapture", onLostPointerCapture);

        listenerCleanups.push(() => {
            el.removeEventListener("pointerdown", onPointerDown, { capture: true });
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
            el.removeEventListener("pointercancel", onPointerCancel);
            el.removeEventListener("lostpointercapture", onLostPointerCapture);
        });
    }
}

// Re-attach listeners when color space changes (which re-renders the slider list)
watch(currentColorSpace, () => {
    nextTick(attachSliderListeners);
}, { immediate: true });

// Document-level safety net: force-release pointer capture on any element
// that still holds it after pointercancel. Prevents the full-page freeze on iOS Safari
// when reka-ui's SliderImpl leaks a captured pointer.
function onDocPointerCancel(e: PointerEvent) {
    const t = e.target as HTMLElement;
    const hasCap = t?.hasPointerCapture?.(e.pointerId) ?? false;
    if (hasCap) {
        debug.log("doc:cancel-release", e.pointerId, e.target, true, "force-released");
        try { t.releasePointerCapture(e.pointerId); } catch {}
    } else {
        debug.logEvent(e, "doc:cancel");
    }
}

onMounted(() => {
    document.addEventListener("pointercancel", onDocPointerCancel);
});
onUnmounted(() => {
    document.removeEventListener("pointercancel", onDocPointerCancel);
    listenerCleanups.forEach((fn) => fn());
    listenerCleanups = [];
});
</script>
