<template>
    <!-- T.W6.5-P — THE CONSOLE ON THE VEIL (T-34 · t33-audit-02, owner
         verbatim: "use a glass-ui veil card, too"): the sliders + letter
         rail re-seat from the Q4 rung-2 WELL onto the producer's
         <Card surface="veil"> — the `veil-surface` @utility (glass-ui
         cards.css): quiet-rung glass with the border + rim STRIPPED by
         design. The owner's own word re-opens the RATIFIED Q4 on the
         MATERIAL axis — encoded here + MANDATE §0.6, never silent. The
         radius stays the in-plate panel rung (`rounded-panel` over the
         Card's `rounded-card` stamp); grain/shadow OFF — an instrument
         surface, not a paper register. The `.console-well` one-home class
         remains the SECOND slider population's seat (ConfigSliderPane —
         Q4's sibling assignments stand as ratified).

         THE INK REFERENT MOVED WITH THE MATERIAL (the W3-5 D6 contract):
         the rail letters certify against the VEIL rung (`ink.ts` "veil" —
         the live-probed quiet-α recipe composited over the resting plate),
         and the O-18 W4 census rows re-ran green on the new ground.

         THE CHASSIS-PERSISTENCE LAW (N-2): a space change re-keys the ROWS
         (and the rail's letters) ONLY — the console card and the rail ring
         are persistent chassis, never re-mounted scenery. The rail itself
         is the colocated ConsoleRail SFC (the exact seam the P5 letter-rail
         primitive swaps into — BOOKED). -->
    <Card
        surface="veil"
        tier="quiet"
        :shadow="false"
        :grain="false"
        class="sliders-console rounded-panel"
    >
        <div class="flex gap-x-2.5 items-stretch">
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
                class="channel-rows flex-1 min-w-0 flex flex-col justify-around stagger-children"
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
                            :model-value="[sliderValue(component)]"
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
    </Card>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";
import { Card } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
import { PICKER_CHANNELS, channelNumber, normalizedChannel } from "@lib/picker-color";
import { clamp } from "@mkbabb/value.js/math";
import { spectrumFieldIsLight } from "../spectrumLuma";
import { readoutDecimals } from "../../display/ColorComponentDisplay/readoutReservation";
import { POINTER_DEBUG_KEY } from "../../composables/usePointerDebug";
import { useSliderTouchGates } from "./composables/useSliderTouchGates";
import { useSliderAnnouncements } from "./composables/useSliderAnnouncements";
import ConsoleRail from "./ConsoleRail.vue";
import { COLOR_MODEL_KEY } from "@composables/color/keys";

const {
    model,
    currentColorSpace,
    currentColorComponentsFormatted,
    componentsSlidersStyle,
    cssColorOpaque,
    HSVCurrentColor,
    updateColorComponent,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

// All components for the current color space (including alpha)
const componentEntries = computed(() =>
    [
        ...PICKER_CHANNELS[currentColorSpace.value].map((meta) => [meta.key, meta] as [string, unknown]),
        ["alpha", { key: "alpha", min: 0, max: 1, unit: "%" }] as [string, unknown],
    ],
);

function sliderValue(component: string): number {
    if (component === "alpha") {
        return typeof model.value.color.alpha === "number" ? model.value.color.alpha : 1;
    }
    return normalizedChannel(model.value.color, component);
}

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
            ? {
                value: typeof model.value.color.alpha === "number" ? model.value.color.alpha * 100 : "none",
                unit: "%",
            }
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
    return spectrumFieldIsLight(
        clamp(channelNumber(HSVCurrentColor.value, "s"), 0, 1),
        clamp(channelNumber(HSVCurrentColor.value, "v"), 0, 1),
    )
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

// U.W-A11Y / U-F27 (BR-4): every channel slider announces a HUMAN-READABLE,
// unit-aware `aria-valuetext` ("Hue 210°", "Red 128", "Saturation 42%") off the
// SAME formatted meter cell (ONE voice), instead of the reka thumb's raw
// ≥16-digit `aria-valuenow`. The glass-ui `Slider` exposes no `aria-valuetext`
// prop, so the demo sets it on the rendered `[role="slider"]` thumb directly —
// the clean prop-through is the recorded producer RELAY.
useSliderAnnouncements({
    wrapperEls: sliderWrapperEls,
    currentColorSpace,
    valueText: meterText,
    reactiveKey: currentColorComponentsFormatted,
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

/* ── THE CONSOLE (T.W4-4 → T.W6.5-P re-seat) ─────────────────────────────
 * Material is the producer veil card (<Card surface="veil"> — T-34, the
 * owner's Q4 material re-cut; the `.console-well` one-home class stays the
 * SECOND slider population's home, ConfigSliderPane). THE AIR RECALIBRATION
 * (t33-audit-02 "a bit too tight … more spaced out"): padding steps up from
 * the well-era 0.5/0.625rem — and still reserves the 3px touch-gate outline
 * + 1px offset inside the plate. Row air rides the template's gap-y-1.5. */
.sliders-console {
    padding: 0.75rem 0.875rem;
    /* T.W8-WR-3 (T-50) — THE VEIL-SIGNAL CALIBRATION: the landed quiet-glass α
     * (0.50 light / 0.58 dark) read OPAQUE — only ~15% of the surviving field
     * variation survives the blur. The console tint α is lowered here (a
     * DIRECT `--glass-bg-quiet` override on the veil element, unambiguous
     * across the substitution chain — veil-surface reads `var(--glass-bg-quiet)`
     * for its `--veil-bg`) so more variation reads as glass. The D6 ink
     * referent re-threads BY THE LIVE PROBE, not an ink.ts edit: the rail's
     * `resolveMutedInk` reads this lowered-α veil recipe and walks its rest
     * ink to floor against the now-more-ambient ground (O-18 W4 rail-letter
     * census holds by the walk-to-floor contract). This α is the veil-clarity
     * bracket's near pole (roster); the deeper cure — a clarity window in the
     * PLATE behind the console so the blur has a live-field backdrop, not the
     * opaque cartoon plate — needs `ColorPicker.vue` (out of this lane's tree),
     * booked as the picker-plate half. */
    --glass-bg-quiet: color-mix(in srgb, var(--card) 42%, transparent);
}
.dark .sliders-console {
    --glass-bg-quiet: color-mix(in srgb, var(--card) 50%, transparent);
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

/* ── THE ONE-LAW RHYTHM REGIME (T.W8-WR-11 · T-59) ───────────────────────
 * The owner's "too tight on desktop, too spaced out on mobile" was ONE
 * divergent spacing regime with a hard `<lg` band switch (natural ~24px
 * desktop rows vs a 44px mobile min-height — a 1.83× discontinuity). It is
 * retired for ONE container-scaled law serving BOTH breakpoints: the row
 * block-size and the inter-row gap ride clamp()s of the pane container, so the
 * rhythm is a smooth function of width, never two hand-tuned states. The clamp
 * constants are the roster bracket (the owner's two shots — desktop-tight /
 * mobile-spaced — are the poles). Offered to the ConfigSliderPane population
 * (M-34) so the whole app has ONE rhythm source. */
.channel-rows {
    row-gap: clamp(0.375rem, 1.5cqi, 0.5rem);
}
.channel-strip {
    min-block-size: clamp(2rem, 7cqi, 2.625rem);
}

/* THE 44px TOUCH RUNG — preserved by HIT-AREA EXTENSION, not row inflation
 * (WR-11: "the touch-gate inflation idiom"). On coarse pointers a transparent
 * pseudo on the reka SliderRoot (`.channel-slider`) extends the tappable zone
 * to ≥44px centered on the track, WITHOUT growing the visual row — so the
 * mobile rows read tighter than a 44px row (the owner's t49-audit-03) while
 * the tap ergonomics hold. Generated content is part of the host box, so a
 * pointerdown on the pseudo dispatches to the SliderRoot it belongs to and
 * drives the slider exactly as a track tap does. Gated on `pointer: coarse`
 * (the input device), never viewport width — the discontinuity was the
 * width-keyed switch. */
@media (pointer: coarse) {
    .channel-slider {
        position: relative;
    }
    .channel-slider::before {
        content: "";
        position: absolute;
        inset-inline: 0;
        top: 50%;
        translate: 0 -50%;
        block-size: max(100%, var(--dock-touch-target, 2.75rem));
    }
}

/* R.W3 Lane C / C1 — the instrument-needle notch (treatment § MICRO-1).
 * A 1px center hairline on the glass-ui spectrum thumb, inked by the SAME
 * value-aware `--slider-thumb-border-color` feed as the border, so needle,
 * ring, and dot always agree about the live color's regime. */
.channel-slider .slider-thumb {
    position: relative;
    /* T.W8-P11-R2 (LAND · cursor grammar): the app's PRIMARY drag control
     * signalled no draggability — the four channel thumbs + track computed
     * `cursor: auto` while the gradient stop-thumb reads `grab`. The demo
     * already styles this reka-emitted class here (no `ui/slider` hand-edit,
     * no producer ask), so the drag cursor lands with it: `grab` at rest,
     * `grabbing` while held (the gradient precedent). */
    cursor: grab;
    transition: background-color var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
}
.channel-slider .slider-track {
    cursor: grab;
}
.channel-slider:active .slider-thumb,
.channel-slider[data-held] .slider-thumb,
.channel-slider:active .slider-track,
.channel-slider[data-held] .slider-track {
    cursor: grabbing;
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
