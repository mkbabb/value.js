<template>
    <!-- T.W4-4 — THE CONSOLE (D5 · Q4 "The well." · C5): the sliders +
         letter rail seated in a rung-2 WELL sub-card (opaque tone-step, no
         blur, no second cartoon shadow — the .console-well one-home class;
         P3 swap booked). Bounding the ground is what makes the ink
         COMPUTABLE (t-sliders F-4): every letter/meter below certifies
         against the well's deterministic lightness (the W3-5 D6 contract).

         THE CHASSIS-PERSISTENCE LAW (N-2): a space change re-keys the ROWS
         (and the rail's letters) ONLY — the console card and the rail ring
         are persistent chassis, never re-mounted scenery. -->
    <div
        class="sliders-console console-well"
        :style="{ '--console-rest-ink': restInk }"
    >
        <div class="flex gap-x-2 items-stretch">
            <!-- The letter rail — a vertical micro-dock (D5): the enclosure
                 is THE SEAL RECIPE TURNED PORTRAIT (the interim ring —
                 Dock.vue's die-rim recipe verbatim, stadium radius; NEVER a
                 bespoke ring class; swaps onto the P5 letter-rail primitive
                 when it ships — BOOKED). Items ride the dock-trigger state
                 ladder (hover/press fills — the producer's own tokens); the
                 ACTIVE seat is the WatercolorDot in the live color — the
                 ONE live-color voice in the zone (ring says WHICH, dot-hue
                 says LIVE, enclosure says NAVIGATION, letters speak INK). -->
            <div
                role="tablist"
                aria-orientation="vertical"
                aria-label="Color channels"
                class="channel-rail self-stretch"
            >
                <div
                    :key="animationKey"
                    class="rail-letters h-full flex flex-col items-center justify-around stagger-children"
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
                                    :style="activeComponent === component ? { color: activeInk } : undefined"
                                    @click="scrollToSlider(component)"
                                    @keydown="onRailKeydown($event, component)"
                                >
                                    <!-- The ONE active indicator: the
                                         WatercolorDot seat under the active
                                         glyph (the live-color voice; the
                                         aria-selected neutral pill is
                                         retired). -->
                                    <WatercolorDot
                                        v-if="activeComponent === component"
                                        tag="div"
                                        :color="cssColorOpaque"
                                        class="rail-dot"
                                        aria-hidden="true"
                                    />
                                    <span class="rail-glyph">{{ componentGlyph(component) }}</span>
                                </button>
                            </TooltipTrigger>
                            <!-- The anatomy popover re-seats at touch bands
                                 (t-mobile F-5: side=left has no seat at 390);
                                 it is also the static range's retirement
                                 home #1 (W4-3 — the About card is #2). -->
                            <TooltipContent :side="isLgViewport ? 'left' : 'bottom'" class="max-w-56">
                                <p class="font-display text-small font-semibold">{{ componentDescription(component) }}</p>
                                <p class="fira-code text-mono-caption opacity-60 mt-0.5">{{ currentColorRanges[component] }}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { Slider } from "@components/ui/slider";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import { COLOR_SPACE_RANGES } from "@mkbabb/value.js/color";
import { clamp } from "@mkbabb/value.js/math";
import {
    contrastInkFor,
    resolveMutedInk,
} from "@composables/color/ink";
import { resolveSurfaceLightnessLive } from "@composables/color/useContrastSafeColor";
import { colorSpaceInfo } from "../../index";
import type { DisplayColorSpace } from "../../index";
import { spectrumFieldIsLight } from "../spectrumLuma";
import { readoutDecimals } from "../../display/ColorComponentDisplay/readoutReservation";
import { POINTER_DEBUG_KEY } from "../../composables/usePointerDebug";
import { useSliderTouchGates } from "./composables/useSliderTouchGates";
import { COLOR_MODEL_KEY, INK_AMBIENT_KEY } from "@composables/color/keys";

const {
    model,
    currentColorSpace,
    currentColorRanges,
    currentColorComponentsFormatted,
    componentsSlidersStyle,
    cssColorOpaque,
    HSVCurrentColor,
    updateColorComponent,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

// The tooltip's honest seat flips at the touch band (t-mobile F-5).
const { matches: isLgViewport } = useBreakpoint("(min-width: 1024px)");

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

// --- T.W4-4: THE INK SYSTEM (D5/D6 — the channel-color conceit is DEAD) ---
// The letters SPEAK INK. The retired labelColor() inked each letter in the
// ramp color at the current value — which is, for every channel at once,
// the LIVE color, on a card tinted by the SAME live color: self-camouflage
// by construction (t-sliders F-1; measured 1.01:1 dark). Rest letters wear
// the certified de-emphasis rung against the WELL's deterministic ground
// (the C5 dividend: an opaque tone-step makes the referent closed-form);
// hover/active lift to full foreground ink. Hue keeps living where it is
// honest — the ramps and the active WatercolorDot seat.
const { isDark } = useGlobalDark();
const inkAmbient = inject(INK_AMBIENT_KEY, null);
const restInk = computed(() =>
    resolveMutedInk(
        resolveSurfaceLightnessLive(
            "well",
            inkAmbient?.value ?? 0.5,
            isDark.value,
        ),
        isDark.value,
    ),
);
// The active glyph sits ON the WatercolorDot's live fill — its ink derives
// from the FILL (the F-3 split's dependent guard: contrast-color, a pass by
// construction), never a fixed foreground over an arbitrary hue.
const activeInk = computed(
    () => contrastInkFor(cssColorOpaque.value) ?? "var(--foreground)",
);

// --- T.W4-4: TRUE GLYPHS (N-1 — the A-collision dies) ---------------------
// The column speaks each space's OWN notation: `L a b α` for lab (CIELAB's
// lowercase a/b), `L C h` for the cylindrical pair, two-glyph channels for
// ictcp/jzazbz, α for alpha EVERYWHERE. The lab exemplar is not a stamp:
// unlisted spaces fall to their canonical uppercase initial.
const SPACE_GLYPHS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
    lab: { l: "L", a: "a", b: "b" },
    oklab: { l: "L", a: "a", b: "b" },
    lch: { l: "L", c: "C", h: "h" },
    oklch: { l: "L", c: "C", h: "h" },
    ictcp: { i: "I", ct: "Cᴛ", cp: "Cᴘ" },
    jzazbz: { jz: "Jᴢ", az: "aᴢ", bz: "bᴢ" },
    kelvin: { kelvin: "K" },
};
function componentGlyph(component: string): string {
    if (component === "alpha") return "α";
    const glyph = SPACE_GLYPHS[currentColorSpace.value]?.[component];
    return glyph ?? component.charAt(0).toUpperCase();
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

// --- W4-3: THE METER — the strip's persistent live reading -----------------
// The same formatted cell the header tuple consumes (currentColorComponents-
// Formatted) at the same per-space least count (readoutDecimals) — ONE
// voice, zero new state; updates synchronously with the drag. The static
// range captions retire to their two standing owners (rail tooltip + the
// About card); the hover-jailed thumb tooltip is DEAD.
function meterText(component: string): string {
    const fmt = currentColorComponentsFormatted.value[component];
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

/* ── THE LETTER RAIL RING (T.W4-4 · D5) ──────────────────────────────────
 * THE SEAL RECIPE TURNED PORTRAIT — Dock.vue's die-rim verbatim (1px
 * color-mix(in oklab, var(--accent-view) 60%, transparent), stadium
 * radius, 2px padding), the ONE navigation hue at its third scale (seal →
 * trigger → rail). NEVER a bespoke ring class; the enclosure's final
 * material is the P5 letter-rail primitive (BOOKED swap; T-28's register
 * law binds any future ring to the dot's own silhouette). */
.channel-rail {
    border: 1px solid color-mix(in oklab, var(--accent-view) 60%, transparent);
    border-radius: var(--radius-pill);
    padding: 2px;
}

/* Rail items — the dock-trigger STATE LADDER (the producer's own tokens:
 * hover/press fills; the bespoke opacity/scale hover + the 8% selected pill
 * are retired). Letters speak INK: rest = the certified de-emphasis rung on
 * the well (var(--console-rest-ink), computed per scheme/ambient); hover +
 * active lift to full ink; the ACTIVE letter's ink derives from the
 * WatercolorDot fill it sits on (:style binding). */
.channel-rail-item {
    appearance: none;
    background: transparent;
    border: 0;
    position: relative;
    line-height: 1;
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-pill);
    cursor: pointer;
    color: var(--console-rest-ink, var(--muted-foreground));
    transition:
        color var(--duration-normal) var(--ease-standard),
        background-color var(--duration-normal) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard);
}
.channel-rail-item:hover {
    color: var(--foreground);
    background-color: var(--dock-control-hover-bg);
}
.channel-rail-item:active {
    background-color: var(--dock-control-press-bg);
    transform: scale(0.96);
}
.channel-rail-item:focus-visible {
    /* R.W3 Lane C / C5: the accent-aware house focus register — never a
       bespoke gray outline. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

/* The ONE active indicator — the WatercolorDot seat under the active glyph
 * (the live-color voice; organic silhouette, per-instance filter). */
.rail-dot {
    position: absolute;
    inset: -1px;
    z-index: 0;
    pointer-events: none;
}
.rail-glyph {
    position: relative;
    z-index: 1;
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
 * glyphs do NOT (padding/min-box expansion inside the ring — the
 * .slider-thumb touch-hit-area idiom extended to the row). */
@media (max-width: 1023px) {
    .channel-rail-item {
        min-height: var(--dock-touch-target, 2.75rem);
        min-width: calc(var(--dock-touch-target, 2.75rem) * 0.72);
    }
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
