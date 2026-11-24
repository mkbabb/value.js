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
        class="sliders-console rounded-panel"
    >
        <div class="flex gap-x-2.5 items-stretch">
            <ConsoleRail
                :components="componentEntries.map(([c]) => c)"
                :active="activeComponent"
                :animation-key="animationKey"
                :cascade="cascade"
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
                class="channel-rows flex-1 min-w-0 flex flex-col justify-around"
                :class="cascade && 'stagger-children'"
            >
                <div
                    v-for="[component] in componentEntries"
                    :key="component"
                    class="channel-strip min-w-0 flex items-center gap-x-2"
                >
                    <div
                        :ref="(el: any) => { if (el) sliderWrapperEls[component] = el as HTMLElement }"
                        class="channel-slider-seat flex-1 min-w-0"
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
                                    onSliderInput(component, v);
                                }
                            "
                        />
                    </div>
                    <span v-text-in-place class="channel-meter font-mono" aria-live="off">{{
                        meterText(component)
                    }}</span>
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { computed, inject, onDeactivated, ref, watch } from "vue";
import { Card } from "@mkbabb/glass-ui/card";
import { Slider } from "@mkbabb/glass-ui/slider";
import { PICKER_CHANNELS, channelNumber, normalizedChannel } from "../../../color-session/picker-color";
import { clamp } from "@mkbabb/value.js/math";
import { spectrumFieldIsLight } from "../spectrumLuma";
import { readoutDecimals } from "../../display/ColorComponentDisplay/readoutReservation";
import { formatFixed } from "../../../color-session/channel-decimals";
import { POINTER_DEBUG_KEY } from "../../debug/usePointerDebug";
import { useSliderTouchIntent } from "./composables/useSliderTouchIntent";
import { useSliderAnnouncements } from "./composables/useSliderAnnouncements";
import { stopsToGradient } from "../../../shared/ui/color-chips";
import ConsoleRail from "./ConsoleRail.vue";
import { vTextInPlace } from "../../../shared/vTextInPlace";
import { COLOR_MODEL_KEY } from "../../../color-session/keys";
import { inOpeningBreath } from "../../../app/composables/boot/useOverture";

const {
    model,
    currentColorSpace,
    currentColorComponentsFormatted,
    componentsSlidersStyle,
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

// X.W11.v1 (BR-8): a hue channel's domain wraps 360° to 0° on write
// (`clampPickerColor`, held by test/value-domain-clamp.test.ts). Without the
// hold below, End drove the hue slider to 1, the model stored 0°, and the thumb
// fell back to the start, so End read as Home. The slider keeps the position
// it emitted while the model holds the same hue modulo 360. Any other write
// (a pick, a parse, a space change) shows the model's own position again.
const heldHuePosition = ref<{ component: string; position: number } | null>(null);

function isHueChannel(component: string): boolean {
    const meta = PICKER_CHANNELS[currentColorSpace.value].find((m) => m.key === component);
    return !!meta && "hue" in meta && meta.hue === true;
}

function sliderValue(component: string): number {
    if (component === "alpha") {
        return typeof model.value.color.alpha === "number" ? model.value.color.alpha : 1;
    }
    const position = normalizedChannel(model.value.color, component);
    const held = heldHuePosition.value;
    if (held && held.component === component && held.position === 1 && position === 0)
        return held.position;
    return position;
}

function onSliderInput(component: string, position: number): void {
    heldHuePosition.value = isHueChannel(component) ? { component, position } : null;
    updateColorComponent(position, component, true);
    activeComponent.value = component;
}

// Active component — tracks which slider was last interacted with
const activeComponent = ref<string | null>(null);

// Reset active component when color space changes
watch(currentColorSpace, () => {
    activeComponent.value = null;
    heldHuePosition.value = null;
});

// Animation key — re-keys the ROWS + rail letters on a space change (the
// chassis-persistence law: console card + ring never re-mount).
const animationKey = ref(0);
// X.W12.b (OA-25): the cascade voices a FRESH row set — the pane's first
// mount and every space-change re-key. A KeepAlive return re-inserts the SAME
// rows, and the browser restarts a CSS animation on a re-inserted element, so
// the cascade re-ran inside the pane-swap travel on every return (census,
// before: stagger-child-in in the gradient→picker window). Deactivation retires
// the class while the rows are detached; the next re-key re-arms it.
// C-18: the boot's arrival cascades; a first arrival after a view change
// brings its rows whole with the card (the pane swap moves it).
const cascade = ref(inOpeningBreath());
watch(currentColorSpace, () => {
    animationKey.value++;
    cascade.value = true;
});
onDeactivated(() => {
    cascade.value = false;
});

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
    return `${formatFixed(fmt.value, readoutDecimals(currentColorSpace.value, component))}${fmt.unit ?? ""}`;
}

// The needle's ink regime reads the SHARED hue-aware plate helper (B3 — one
// function, one decision; X.W8.i2): the ramp color under the thumb IS the
// live color, so the thumb border and the WatercolorDot border can never
// disagree about the same color.
const thumbInk = computed(() => {
    return spectrumFieldIsLight(
        clamp(channelNumber(HSVCurrentColor.value, "h"), 0, 360),
        clamp(channelNumber(HSVCurrentColor.value, "s"), 0, 1),
        clamp(channelNumber(HSVCurrentColor.value, "v"), 0, 1),
    )
        ? "rgba(0, 0, 0, 0.55)"
        : "rgba(255, 255, 255, 0.8)";
});

// Producer token feed for the glass-ui spectrum slider: the perceptual ramp
// on the track and the value-aware needle ink on the ring. The spectrum thumb
// is a ring with no fill (glass paints it transparent), so the site writes no
// thumb colour. Touch-action is the gesture's, in CSS (style block below).
// The ALPHA row's ramp composes the house `--alpha-checker` ground UNDER it
// via the producer's own `--glass-slider-track-background` seam.
function sliderVars(component: string): Record<string, string | undefined> {
    const stops = componentsSlidersStyle.value[component];
    const ramp = stops ? (stopsToGradient(stops) ?? undefined) : undefined;
    return {
        "--glass-slider-track-background":
            ramp && component === "alpha"
                ? `${ramp}, var(--alpha-checker)`
                : ramp,
        "--slider-thumb-border-color": thumbInk.value,
    };
}

// Scroll-to behavior when a rail letter selects a channel.
function scrollToSlider(component: string) {
    activeComponent.value = component;
    const el = sliderWrapperEls.value[component];
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// The touch gesture's direction lock (a sideways drag is the slider's, a
// vertical swipe the page's) and the iOS pointer-capture leak recovery live
// in the colocated composable.
const { sliderWrapperEls } = useSliderTouchIntent({ currentColorSpace, debug });

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
/* The touch gesture (useSliderTouchIntent): a channel slider takes a
 * sideways touch and leaves a vertical one to the page, which pans on the
 * block axis and cancels the slider's pointer. `touch-action` only ever reads
 * a touch, so the rule needs no pointer-class query: a mouse or a pen drives
 * the slider as before. Unscoped, as the reka-emitted root is the target. */
.channel-slider-seat .channel-slider {
    touch-action: pan-y;
}

/* ── THE CONSOLE (T.W4-4 → T.W6.5-P re-seat) ─────────────────────────────
 * Material is the producer veil card (<Card surface="veil"> — T-34, the
 * owner's Q4 material re-cut; the `.console-well` one-home class stays the
 * SECOND slider population's home, ConfigSliderPane). THE AIR RECALIBRATION
 * (t33-audit-02 "a bit too tight … more spaced out"): padding steps up from
 * the well-era 0.5/0.625rem. Row air rides the template's gap-y-1.5. */
.sliders-console {
    padding: 0.75rem 0.875rem;
    /* T.W8-WR-3 (T-50) — THE VEIL-SIGNAL CALIBRATION: the landed quiet-glass α
     * (0.50 light / 0.58 dark) read OPAQUE — only ~15% of the surviving field
     * variation survives the blur. The console tint α is lowered here so more
     * variation reads as glass. X-W7L (glass 10.1.0): the veil surface now picks
     * its α off the veil ladder (`[data-surface="veil"]` sets
     * `--glass-veil-tier: var(--glass-veil-quiet)`, `glass-plate` reads it), and
     * `--glass-plate-quiet` has no declaration; the one-rung-lower α is the ladder's
     * own `wash` rung, which re-resolves per scheme (the old `.dark` arm folds in). The D6 ink
     * referent re-threads BY THE LIVE PROBE, not an ink.ts edit: the rail's
     * `resolveMutedInk` reads this lowered-α veil recipe and walks its rest
     * ink to floor against the now-more-ambient ground (O-18 W4 rail-letter
     * census holds by the walk-to-floor contract). This α is the veil-clarity
     * bracket's near pole (roster); the deeper cure — a clarity window in the
     * PLATE behind the console so the blur has a live-field backdrop, not the
     * opaque cartoon plate — needs `ColorPicker.vue` (out of this lane's tree),
     * booked as the picker-plate half. */
    --glass-veil-tier: var(--glass-veil-wash);
    /* No blur inside the plate (restraint, 2026-11-09: never a blur inside a
     * blur; foundation.css already says the well carries none). The veil is
     * its tint alone. */
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
}

/* ── THE METER (W4-3) — the strip's persistent live reading ──────────────
 * House mono voice, tabular by construction; full certified ink on the
 * well (never italic, never opacity — the t-2000-41 legibility class).
 * min-width in ch keeps the strip's geometry stable across digit swaps.
 * The small rung (14 px at 390): the caption rung set the figures at
 * 12.2 px there, under the 14 px floor for text that is read. */
.channel-meter {
    font-size: var(--type-small);
    line-height: var(--type-leading-small);
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
 * block-size and the inter-row gap ride clamp()s of the pane container (its
 * inline size as `--pane-inline`, published by the picker body: seat.css), so the
 * rhythm is a smooth function of width, never two hand-tuned states. The clamp
 * constants are the roster bracket (the owner's two shots — desktop-tight /
 * mobile-spaced — are the poles). Offered to the ConfigSliderPane population
 * (M-34) so the whole app has ONE rhythm source. */
.channel-rows {
    row-gap: clamp(0.375rem, calc(var(--pane-inline) * 0.015), 0.5rem);
}
.channel-strip {
    min-block-size: clamp(2rem, calc(var(--pane-inline) * 0.07), 2.625rem);
}

/* THE TOUCH RUNG — glass's own slider target, not row inflation (WR-11: "the
 * touch-gate inflation idiom"). Glass's placement for his FORTY-SECOND C names
 * the picker's channels for its `--slider-touch-target` (theming glass
 * sanctions; the look does not change). Glass seats a coarse-pointer slider in
 * that target by `min-block-size`, which alone would grow every channel row;
 * the seat gives the extra back as block margin, as the scalar sliders' does
 * (foundation.css), so the rows keep their pitch and the target overlaps the
 * row's own air. The rows' pitch is 47 px at every phone size measured (375 to
 * 844 wide), so the target is 46 px: it reaches 23 px either side of the rail
 * and never overlaps the next one (at glass's 2.75rem, and the site's old
 * transparent pseudo on the dock's token, a touch 22 px off a rail fell in a
 * 3 px seam between two targets). Gated on `pointer: coarse` (the input
 * device), never viewport width.
 * The margin is figured from the rail's band, a value the site owns: glass's
 * spectrum rail is 1.5rem at the channels' rung (its thumb, 1rem, times 1.5),
 * read on a phone as 24 px at 375, 390, 430 and 844 wide. The seat read glass's
 * own track-height variable, one glass declares for itself and may rename or
 * resize (the B3 fence, `a11y-select-title`, reads the source text, so the
 * name is not spelled here). */
.channel-slider-seat .channel-slider {
    --channel-rail-band: 1.5rem;
}
@media (pointer: coarse) {
    .channel-slider-seat .channel-slider {
        --slider-touch-target: 2.875rem;
        margin-block: calc((var(--channel-rail-band) - var(--slider-touch-target)) / 2);
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
    /* owner-1112 hover law — EXTEND glass's thumb list, never replace it.
     * Glass gives the thumb `transform` on its press spring; this rule had
     * dropped it, and the hover / held / focus ring (`box-shadow`, glass's
     * spectrum-thumb rules) was in neither list, so it cut in and out on
     * every thumb hover. A ring that eases is a fade under reduced motion. */
    transition: transform var(--spring-press-duration) var(--spring-press),
        box-shadow var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard),
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
    border-radius: var(--radius-pill);
    transform: translate(-50%, -50%);
    background: var(--slider-thumb-border-color, var(--gamut-edge));
    pointer-events: none;
}
</style>
