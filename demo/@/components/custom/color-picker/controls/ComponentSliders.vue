<template>
    <div
        :key="animationKey"
        class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center stagger-children"
    >
            <!-- Channel label rail — a vertical, click-to-scroll, active-highlighted
                 channel index. The picker's primary navigational affordance; a static
                 3–5 item column, so it is a semantic tablist (not a carousel). -->
            <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Color channels"
                class="channel-rail self-stretch flex flex-col items-center justify-around"
                :style="{ gridRow: `1 / ${componentEntries.length + 1}`, gridColumn: '1' }"
            >
                <TooltipProvider :delay-duration="300">
                    <Tooltip v-for="[component] in componentEntries" :key="component">
                        <TooltipTrigger as-child>
                            <button
                                :ref="(el: any) => { if (el) railItemEls[component] = el as HTMLButtonElement }"
                                type="button"
                                role="tab"
                                :aria-selected="activeComponent === component"
                                :tabindex="railTabIndex(component)"
                                :aria-label="`${component} channel`"
                                class="channel-rail-item font-display text-subheading italic"
                                :style="{ color: labelColor(component) }"
                                @click="scrollToSlider(component)"
                                @keydown="onRailKeydown($event, component)"
                            >
                                {{ componentLabel(component) }}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="left" class="max-w-56">
                            <p class="font-display text-small font-semibold">{{ componentDescription(component) }}</p>
                            <p class="fira-code text-mono-caption opacity-60 mt-0.5">{{ currentColorRanges[component] }}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <!-- Sliders — one per row, column 2 -->
            <div
                v-for="([component], i) in componentEntries"
                :key="component"
                :style="{ gridRow: i + 1, gridColumn: '2' }"
                class="min-w-0 flex flex-col gap-0.5"
            >
                <span class="font-normal text-caption italic opacity-50 pl-1">{{
                    currentColorRanges[component]
                }}</span>
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
                            (payload: number[] | undefined) => {
                                const v = payload?.[0];
                                if (v === undefined) return;
                                updateColorComponent(v, component, true);
                                activeComponent = component;
                            }
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
                                <!-- A.W4: mono TooltipContent recipe — root fix pending glass-ui TooltipContent variant="mono" (coordination/Q.md §3) -->
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
import { computed, inject, ref, watch, nextTick, onMounted, onUnmounted } from "vue";
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
import { useSafeAccentFn } from "@composables/color/useContrastSafeColor";
import { colorSpaceInfo } from "../index";
import type { DisplayColorSpace } from "../index";
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

const { safeCss } = useSafeAccentFn();

// All components for the current color space (including alpha)
const componentEntries = computed(() =>
    Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value]),
);

// Active component — tracks which slider was last interacted with
const activeComponent = ref<string | null>(null);

// Reset active component when color space changes
watch(currentColorSpace, () => { activeComponent.value = null; });

// Animation key — increments on color space change to re-trigger stagger-children entrance
const animationKey = ref(0);
watch(currentColorSpace, () => { animationKey.value++; });

// Label: first letter of component name, uppercased
function componentLabel(component: string): string {
    return component.charAt(0).toUpperCase();
}

// Component description from colorSpaceInfo for tooltip
function componentDescription(component: string): string {
    const space = currentColorSpace.value as DisplayColorSpace;
    const info = (colorSpaceInfo as any)[space];
    if (!info?.components) return component;

    // Find the component description that starts with the component letter
    const upper = component.charAt(0).toUpperCase();
    const match = info.components.find((c: string) =>
        c.startsWith(upper) || c.startsWith(component),
    );
    return match ?? component;
}

// Label color: use the color at the current slider value, made contrast-safe
function labelColor(component: string): string {
    const stops = componentsSlidersStyle.value[component];
    if (!stops || stops.length === 0) return "var(--foreground)";
    // Current normalized value [0,1] → index into stops array (0..STEPS)
    const val = model.value.color.value[component]?.value ?? 0.5;
    const idx = Math.round(val * (stops.length - 1));
    const stop = stops[Math.min(idx, stops.length - 1)];
    if (stop === undefined) return "var(--foreground)";
    // Strip the position suffix (e.g., "oklch(0.5 0.1 180) 50%")
    const css = stop.replace(/\s+\d+(\.\d+)?%$/, "");
    return safeCss(css);
}

// Scroll-to behavior when label is clicked
function scrollToSlider(component: string) {
    activeComponent.value = component;
    const el = sliderWrapperEls.value[component];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// --- Channel rail: tablist keyboard navigation (roving tabindex) ---
const railItemEls = ref<Record<string, HTMLButtonElement>>({});

// Roving tabindex: the selected tab is the single tab-stop; if none is selected
// yet, the first channel is the entry point.
function railTabIndex(component: string): number {
    const components = componentEntries.value.map(([c]) => c);
    const selected = activeComponent.value ?? components[0];
    return component === selected ? 0 : -1;
}

// Arrow-key navigation: Up/Down move along the vertical rail (with wrap),
// Home/End jump to the ends. Selecting a channel scrolls its slider into view
// and moves focus — the WAI-ARIA "selection follows focus" tablist idiom.
function onRailKeydown(e: KeyboardEvent, component: string) {
    const components = componentEntries.value.map(([c]) => c);
    const i = components.indexOf(component);
    if (i === -1) return;

    let next: string | undefined;
    switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
            next = components[(i + 1) % components.length];
            break;
        case "ArrowUp":
        case "ArrowLeft":
            next = components[(i - 1 + components.length) % components.length];
            break;
        case "Home":
            next = components[0];
            break;
        case "End":
            next = components[components.length - 1];
            break;
        default:
            return;
    }
    if (next === undefined) return;
    e.preventDefault();
    scrollToSlider(next);
    railItemEls.value[next]?.focus();
}

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
// that still holds it after pointercancel.
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

<style>
/* Touch-gate cluster (D.W4 Lane A §4: colocated from styles/style.css).
 *
 * Outline-based activation indicator avoids conflict with hover shadows.
 * The selectors target reka-ui's Slider markup classes (.slider-track,
 * .slider-thumb) which are emitted across multiple slider host components
 * (ComponentSliders, SpectrumCanvas, plus the ExtractControls/PointerDebug
 * touch-gate-target uses) — the block is intentionally UNSCOPED so the
 * cascade reaches consumers outside this SFC's data-v-* attribute scope.
 *
 * Cascade-preserving order: keep the four selectors in this sequence so
 * `:has(.slider-track)` is anchored on `.touch-gate-target`, the active
 * outline-color override follows the base, and the track/thumb cascades
 * (which read `.touch-gate-active` not `.touch-gate-target.touch-gate-active`)
 * are last. Source-order isomorphism with the pre-D.W4 style.css block. */
.touch-gate-target {
    outline: 3px solid transparent;
    outline-offset: 1px;
    transition: outline-color var(--duration-normal) var(--ease-standard);
}
.touch-gate-target:has(.slider-track) {
    border-radius: var(--radius-pill);
}
.touch-gate-target.touch-gate-active {
    outline-color: color-mix(in srgb, var(--foreground) 50%, transparent);
}

/* Slider track gets a foreground-colored border when gate is active */
.touch-gate-active .slider-track {
    box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--foreground) 50%, transparent);
}

/* Slider thumb: inverted fill when gate is active — dark knob in dark mode, light in light */
.touch-gate-active .slider-thumb {
    background-color: var(--background);
    border-color: var(--foreground);
}

/* Channel label rail (N.W1.A — replaces the non-existent GlassCarousel).
 * A vertical tablist: per-channel display-font letters in the live channel
 * color, with an active-channel highlight, hover lift, and a roving
 * keyboard focus ring. The carousel primitive was a category error (C1 P0-2);
 * the rail is a static 3–5 item navigational index. */
.channel-rail-item {
    appearance: none;
    background: transparent;
    border: 0;
    line-height: 1;
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-pill);
    cursor: pointer;
    opacity: 0.6;
    transition:
        opacity var(--duration-normal) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        background-color var(--duration-normal) var(--ease-standard);
}
.channel-rail-item:hover {
    opacity: 0.85;
    transform: scale(1.08);
}
.channel-rail-item[aria-selected="true"] {
    opacity: 1;
    background-color: color-mix(in srgb, var(--foreground) 8%, transparent);
}
.channel-rail-item:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--foreground) 50%, transparent);
    outline-offset: 1px;
    opacity: 1;
}
</style>

