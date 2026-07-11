<template>
    <!-- T.W4-4 — THE CONSOLE (D5 · Q4 "The well." · C5): the sliders +
         letter rail seated in a rung-2 WELL sub-card (opaque tone-step, no
         blur, no second cartoon shadow — the .console-well one-home class;
         P3 swap booked). Bounding the ground is what makes the ink
         COMPUTABLE (t-sliders F-4): the rail letters and meters certify
         against the well's deterministic lightness (the W3-5 D6 contract).

         THE CHASSIS-PERSISTENCE LAW (N-2): a space change re-keys the ROWS
         (and the rail's letters) ONLY — the console card and the rail ring
         are persistent chassis, never re-mounted scenery. The rail itself
         is the colocated ConsoleRail SFC (the exact seam the P5 letter-rail
         primitive swaps into — BOOKED). -->
    <div class="sliders-console console-well">
        <div class="flex gap-x-2 items-stretch">
            <ConsoleRail
                :components="componentEntries.map(([c]) => c)"
                :active="activeComponent"
                :animation-key="animationKey"
                @select="scrollToSlider"
            />

            <!-- The channel strips (W4-3 · T-4): name · signal · METER — the
                 rail letter names, the ramp signals, and the persistent LIVE
                 meter reads (the same formatted cell the header tuple
                 consumes — one voice, zero new state; the static range
                 captions retire to the rail tooltip + the About card; the
                 hover-jailed thumb tooltip is DEAD — one voice per fact). -->
            <div
                :key="animationKey"
                class="channel-rows flex-1 min-w-0 flex flex-col gap-y-1 justify-around stagger-children"
            >
                <div
                    v-for="[component] in componentEntries"
                    :key="component"
                    class="channel-strip min-w-0 flex items-center gap-x-2"
                >
                    <div
                        :ref="(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }"
                        :class="[
                            'touch-gate-target flex-1 min-w-0',
                            sliderGates[component]?.isActive.value ? 'touch-gate-active' : '',
                        ]"
                    >
                        <!-- R.W3 Lane C / C1: the glass-ui spectrum slider —
                             the demo owns three producer token feeds only
                             (ramp track, live thumb, value-aware needle). -->
                        <Slider
                            :aria-label="`${component.toUpperCase()} channel`"
                            variant="spectrum"
                            :min="0"
                            :max="1"
                            :step="0.001"
                            class="channel-slider"
                            :model-value="[model.color.value[component].value]"
                            :style="sliderVars(component)"
                            @update:model-value="
                                (payload: number[] | undefined) => {
                                    const v = payload?.[0];
                                    if (v === undefined) return;
                                    updateColorComponent(v, component, true);
                                    activeComponent = component;
                                }
                            "
                        />
                    </div>
                    <span class="channel-meter fira-code" aria-live="off">{{
                        meterText(component)
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { Slider } from "@components/ui/slider";
import { COLOR_SPACE_RANGES } from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";
import { spectrumFieldIsLight } from "../spectrumLuma";
import { readoutDecimals } from "../../display/ColorComponentDisplay/readoutReservation";
import { POINTER_DEBUG_KEY } from "../../composables/usePointerDebug";
import { useSliderTouchGates } from "./composables/useSliderTouchGates";
import ConsoleRail from "./ConsoleRail.vue";
import { COLOR_MODEL_KEY } from "@composables/color/keys";

const {
    model,
    currentColorSpace,
    currentColorComponentsFormatted,
    componentsSlidersStyle,
    cssColorOpaque,
    HSVCurrentColor,
    denormalizedCurrentColor,
    updateColorComponent,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

// All components for the current color space (including alpha)
const componentEntries = computed(() =>
    Object.entries(COLOR_SPACE_RANGES[currentColorSpace.value]),
);

// Active component — tracks which slider was last interacted with
const activeComponent = ref<string | null>(null);

// Reset active component when color space changes
watch(currentColorSpace, () => { activeComponent.value = null; });

// Animation key — re-keys the ROWS + rail letters on a space change (the
// chassis-persistence law: console card + ring never re-mount).
const animationKey = ref(0);
watch(currentColorSpace, () => { animationKey.value++; });

// --- W4-3: THE METER — the strip's persistent live reading -----------------
// The same formatted cell the header tuple consumes (currentColorComponents-
// Formatted) at the same per-space least count (readoutDecimals) — ONE
// voice, zero new state; updates synchronously with the drag. The static
// range captions retire to their two standing owners (rail tooltip + the
// About card); the hover-jailed thumb tooltip is DEAD.
// T.W4.5 C-1 — the ALPHA meter inks: the formatted-cell map deliberately
// carries no alpha (the header tuple never inks it — the C-2 bracket rides
// to W8 unruled), but the console row still owes its live datum (the W4-3
// gate text: "live meter present per row"). Alpha reads the SAME injected
// pipeline's denormalized color — one voice, zero new state — at the
// space's own least count (82.7% in lab; 83% in the integer spaces). Hex
// mode's single-cell map stays untouched (its console is not this row's).
function meterText(component: string): string {
    const fmt =
        currentColorComponentsFormatted.value[component] ??
        (component === "alpha" && model.value.selectedColorSpace !== "hex"
            ? denormalizedCurrentColor.value.value.alpha
            : undefined);
    if (!fmt) return "";
    if (typeof fmt.value === "string") return fmt.value;
    const d = readoutDecimals(currentColorSpace.value, component);
    let s = fmt.value.toFixed(d);
    if (Number.parseFloat(s) === 0) s = s.replace(/^-/, "");
    return `${s}${fmt.unit ?? ""}`;
}

// The needle's ink regime reads the SHARED plate-luma helper (B3 — one
// function, one threshold): the ramp color under the thumb IS the live color,
// so the thumb border, the WatercolorDot border, and the overlay contour ink
// can never disagree about the same color.
const thumbInk = computed(() => {
    const { s, v } = HSVCurrentColor.value.value;
    return spectrumFieldIsLight(clamp(s.value, 0, 1), clamp(v.value, 0, 1))
        ? "rgba(0, 0, 0, 0.55)"
        : "rgba(255, 255, 255, 0.8)";
});

// Producer token feed for the glass-ui spectrum slider: the perceptual ramp
// on the track, the LIVE color on the thumb, the value-aware needle ink on
// the border. Touch-action rides the same gate as the spectrum plate.
// The ALPHA row's ramp composes the house `--alpha-checker` ground UNDER it
// via the producer's own `--slider-track-bg` seam.
function sliderVars(component: string): Record<string, string | undefined> {
    const stops = componentsSlidersStyle.value[component];
    const ramp = stops ? `linear-gradient(to right, ${stops.join(", ")})` : undefined;
    return {
        "--slider-track-bg":
            ramp && component === "alpha"
                ? `${ramp}, var(--alpha-checker)`
                : ramp,
        "--slider-thumb-bg": cssColorOpaque.value,
        "--slider-thumb-border-color": thumbInk.value,
        touchAction: spectrumGateIsTouchDevice
            ? (sliderGates[component]?.isActive.value ? "none" : "pan-y")
            : undefined,
    };
}

// Scroll-to behavior when a rail letter selects a channel.
function scrollToSlider(component: string) {
    activeComponent.value = component;
    const el = sliderWrapperEls.value[component];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Touch-gate cluster — the capture-phase wrapper listeners + iOS pointer-
// capture leak recovery live in the colocated composable (R.W3 Lane C lift).
const {
    isTouchDevice: spectrumGateIsTouchDevice,
    sliderGates,
    sliderWrapperEls,
} = useSliderTouchGates({ currentColorSpace, debug });
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

/* ── THE CONSOLE (T.W4-4) ─────────────────────────────────────────────────
 * Material rides the one-home `.console-well` class (style.css — rung-2
 * WELL; P3 swap booked). Padding reserves the 3px touch-gate outline +
 * offset inside the well. */
.sliders-console {
    padding: 0.5rem 0.625rem;
}

/* ── THE METER (W4-3) — the strip's persistent live reading ──────────────
 * House mono voice, tabular by construction; full certified ink on the
 * well (never italic, never opacity — the t-2000-41 legibility class).
 * min-width in ch keeps the strip's geometry stable across digit swaps. */
.channel-meter {
    font-size: var(--type-mono-caption, var(--type-caption));
    font-variant-numeric: tabular-nums lining-nums;
    color: var(--foreground);
    min-width: 6ch;
    text-align: right;
    white-space: nowrap;
}

/* ── THE TOUCH RUNG (T.W4-4 · t-mobile F-5) — ≥44px hits <lg ─────────────
 * The producer's own --dock-touch-target (2.75rem = 44px); hit areas grow,
 * glyphs do NOT (the .slider-thumb touch-hit-area idiom extended to the
 * row). The rail items' rung lives with the rail (ConsoleRail.vue). */
@media (max-width: 1023px) {
    .channel-strip .touch-gate-target {
        min-height: var(--dock-touch-target, 2.75rem);
        display: flex;
        align-items: center;
    }
    .channel-strip .touch-gate-target > * {
        flex: 1;
    }
}

/* R.W3 Lane C / C1 — the instrument-needle notch (treatment § MICRO-1).
 * A 1px center hairline on the glass-ui spectrum thumb, inked by the SAME
 * value-aware `--slider-thumb-border-color` feed as the border, so needle,
 * ring, and dot always agree about the live color's regime. */
.channel-slider .slider-thumb {
    position: relative;
    transition: background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
}
.channel-slider .slider-thumb::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1px;
    height: 42%;
    transform: translate(-50%, -50%);
    background: var(--slider-thumb-border-color, var(--gamut-edge));
    pointer-events: none;
}
</style>
