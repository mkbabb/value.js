<template>
    <!-- Direct saturation/value field. -->
    <figure class="spectrum-figure m-0 min-w-0 w-full flex flex-col @container">
        <!-- W5-a11y: 2D saturation×lightness picker — not a linear slider,
             so role="img" with a reactive descriptive label, not role="slider".
             The keyboard reaches it (tabindex): the arrows move saturation and
             value by 1, Shift by 10, and the label speaks both values. -->
        <div
            ref="spectrumRef"
            role="img"
            tabindex="0"
            :aria-label="spectrumAriaLabel"
            class="spectrum-picker flex w-full cursor-crosshair relative"
            :style="spectrumStyle"
            @keydown="handleSpectrumKey"
            @pointerdown="handleSpectrumDown"
            @pointermove="handleSpectrumMove"
            @pointerup="handleSpectrumUp"
            @pointercancel="handleSpectrumCancel"
            @lostpointercapture="onLostPointerCapture"
        >
            <!-- X-DS pass 3 (V3C-06): the thumb keeps its organic outline (the
                 identity, §0dm) and is STILL at rest. The perpetual 2s rAF
                 wobble carried no state; the outline re-seeds with the colour,
                 so it changes only while the user moves it. -->
            <div
                class="spectrum-travel absolute pointer-events-none"
                :data-glide="gliding || undefined"
                :style="spectrumTravelStyle"
                @transitionend.self="gliding = false"
                @animationend.self="gliding = false"
            >
                <WatercolorDot
                    :color="cssColorOpaque"
                    :range="[15, 85]"
                    class="spectrum-dot absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    :style="spectrumDotStyle"
                />
            </div>
            <!-- The dot's handle (DESIGN.md S-8): a touch that starts here is
                 the field's in both axes, vertical included; anywhere else on
                 the field a vertical swipe is the page's. Its centre follows
                 the dot, clamped so the 44 px target stays inside the field. -->
            <span class="spectrum-grip" data-spectrum-grip aria-hidden="true" :style="spectrumGripStyle" />
        </div>
    </figure>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue";
import { clamp } from "@mkbabb/value.js/math";
import { WatercolorDot } from "../../../shared/ui/watercolor-dot";
import { channelNumber, withChannel } from "../../../color-session/picker-color";
import { POINTER_DEBUG_KEY } from "../../debug/usePointerDebug";
import { useSpectrumPlateStyle } from "./composables/useSpectrumPlateStyle";
import { COLOR_MODEL_KEY } from "../../../color-session/keys";
import { useFrameCoalesce } from "../../../color-session/useAtmosphereFrameCoalesce";
import { attachTouchIntent, touchIntentKind } from "../../../shared/touch-intent/touchIntent";

const {
    model,
    cssColorOpaque,
    HSVCurrentColor,
    setCurrentColor,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

const isDragging = ref(false);
const spectrumRef = useTemplateRef<HTMLElement>("spectrumRef");

// The touch grammar (DESIGN.md S-8, "grab the dot"): the field idles at
// `touch-action: pan-y`, so a vertical swipe anywhere off the dot is the
// page's; a sideways-first drag takes the field from where the finger landed;
// a tap sets the colour and the dot glides there; the dot's handle is the
// field's in both axes from the first touch. A mouse or a pen is never held.
const GRIP = "[data-spectrum-grip]";
/** The dot travels to a tapped point instead of jumping there. */
const gliding = ref(false);
/** The finger's offset from the dot's centre for a drag that starts on the dot. */
let grab: { dx: number; dy: number } | null = null;
let detachTouchIntent: () => void = () => {};
onMounted(() => {
    const el = spectrumRef.value;
    if (el)
        detachTouchIntent = attachTouchIntent(el, {
            exempt: GRIP,
            log: (e, tag) => debug.logEvent(e as PointerEvent, `spec:intent:${tag}`),
        });
});
onUnmounted(() => detachTouchIntent());

// Raw spectrum coords to avoid HSV roundtrip jitter.
// Persists after mouseup so the dot stays where the user placed it.
// Cleared when color changes from a non-spectrum source (slider, input, space change).
const rawS = ref<number | null>(null);
const rawV = ref<number | null>(null);
let spectrumIsSource = false;

watch(
    () => model.value.color,
    () => {
        if (spectrumIsSource) {
            spectrumIsSource = false;
            return;
        }
        rawS.value = null;
        rawV.value = null;
        // A colour from elsewhere (a slider, the readout) is not a tap.
        gliding.value = false;
    },
);

// Pointer capture tracking
let capturedPointerId: number | null = null;
let capturedElement: HTMLElement | null = null;

function releaseCapture() {
    if (capturedPointerId !== null && capturedElement !== null) {
        try {
            capturedElement.releasePointerCapture(capturedPointerId);
        } catch {
            // Element may be detached — safe to ignore
        }
    }
    capturedPointerId = null;
    capturedElement = null;
}

// One spectrum write per animation frame, the latest coords win; release
// lands the pending write (`stopDragging`). The scope's end cancels it.
const spectrumWrite = useFrameCoalesce((coords: { clientX: number; clientY: number }) =>
    updateSpectrumColor(coords),
);

// X.W12U.p — the surface's rect is read ONCE per drag (at pointerdown) and
// held until the drag ends. Read inside the rAF update instead, it forced a
// synchronous style+layout every frame against the previous frame's recolour
// (the drag's own writes), before this frame's writes dirtied it again.
let dragRect: DOMRect | null = null;
// The thumb's radius in px, read with the rect (once per drag).
let dragInset: number | null = null;
const thumbInset = () =>
    (spectrumRef.value?.querySelector<HTMLElement>(".spectrum-dot")?.offsetHeight ?? 0) / 2;

const updateSpectrumColor = (
    coords: { clientX: number; clientY: number },
) => {
    if (!spectrumRef.value) return;
    const rect = dragRect ?? spectrumRef.value.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = clamp(coords.clientX - rect.left, 0, rect.width);
    // X-DS pass 3 (V3C-07): the thumb's VERTICAL travel is inset by its radius
    // (useSpectrumPlateStyle), so at full value it sits inside the plate rather
    // than riding half over the value readout above it. The pointer maps over
    // the same inset span, so the thumb stays under the pointer.
    const inset = dragInset ?? thumbInset();
    const span = Math.max(1, rect.height - 2 * inset);
    const y = clamp(coords.clientY - rect.top - inset, 0, span);

    setSpectrum(clamp(x / rect.width, 0, 1), clamp(1 - y / span, 0, 1));
};

/** The colour at saturation `s` and value `v` of the current hue. */
function setSpectrum(s: number, v: number) {
    rawS.value = s;
    rawV.value = v;
    spectrumIsSource = true;

    const hsv = withChannel(withChannel(HSVCurrentColor.value, "s", s), "v", v);

    setCurrentColor(hsv, model.value.selectedColorSpace, true);
}

// The keyboard path: the arrows move saturation (left, right) and value (up,
// down) by one percent, Shift by ten, on the percent grid the label speaks;
// the dot glides to each step.
const KEY_STEPS: Readonly<Record<string, readonly [number, number]>> = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, 1],
    ArrowDown: [0, -1],
};
function handleSpectrumKey(event: KeyboardEvent) {
    const step = KEY_STEPS[event.key];
    if (!step || event.altKey || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    const by = event.shiftKey ? 10 : 1;
    const toGrid = (f: number, d: number) => clamp(Math.round(f * 100) + d * by, 0, 100) / 100;
    gliding.value = true;
    setSpectrum(toGrid(dotPos.value.s, step[0]), toGrid(dotPos.value.v, step[1]));
}

/** The dot's centre in client px, over the rect read for this drag. */
function dotCentre(rect: DOMRect, inset: number) {
    const span = Math.max(1, rect.height - 2 * inset);
    return { x: rect.left + dotPos.value.s * rect.width, y: rect.top + inset + (1 - dotPos.value.v) * span };
}

/** Where the dot goes for a pointer at `p`: the grab offset kept, so a dot
 *  taken by its handle stays where it was under the finger. */
const aim = (p: { clientX: number; clientY: number }) =>
    grab ? { clientX: p.clientX - grab.dx, clientY: p.clientY - grab.dy } : p;

const handleSpectrumDown = (event: PointerEvent) => {
    debug.logEvent(event, "spec:down");

    // A touch reaches here when the touch-intent lock gives it to the field:
    // on the dot's handle at once, off it after a sideways start or a tap.
    // A mouse or a pen reaches here at once.
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    capturedPointerId = event.pointerId;
    capturedElement = el;
    isDragging.value = true;
    dragRect = spectrumRef.value?.getBoundingClientRect() ?? null;
    dragInset = thumbInset();
    gliding.value = event.pointerType === "touch" && touchIntentKind(event) === "tap";
    const onGrip = event.pointerType === "touch" && (event.target as Element | null)?.closest?.(GRIP) != null;
    if (onGrip && dragRect) {
        const centre = dotCentre(dragRect, dragInset);
        grab = { dx: event.clientX - centre.x, dy: event.clientY - centre.y };
    } else {
        grab = null;
    }

    debug.setGauge("spec.isDragging", true);
    debug.setGauge("spec.capturedPid", event.pointerId);

    updateSpectrumColor(aim(event));
};

const handleSpectrumMove = (event: PointerEvent) => {
    if (isDragging.value) {
        gliding.value = false;
        spectrumWrite.push(aim({ clientX: event.clientX, clientY: event.clientY }));
    }
    if (debug.state.enabled && Math.random() < 0.03) {
        debug.logEvent(event, "spec:move");
    }
};

const onLostPointerCapture = (event: PointerEvent) => {
    debug.logEvent(event, "spec:lostcap");
    capturedPointerId = null;
    capturedElement = null;
    if (isDragging.value) {
        stopDragging();
    }
};

const handleSpectrumUp = (event: PointerEvent) => {
    debug.logEvent(event, "spec:up");
    stopDragging();
};

const handleSpectrumCancel = (event: PointerEvent) => {
    debug.logEvent(event, "spec:cancel");
    stopDragging();
};

const stopDragging = () => {
    debug.setGauge("spec.isDragging", false);
    debug.setGauge("spec.capturedPid", "none");
    releaseCapture();
    spectrumWrite.flush();
    dragRect = null;
    dragInset = null;
    grab = null;
    isDragging.value = false;
};

// The dot's plate position: raw spectrum coords when the square is the
// source, the model's HSV otherwise. Shared by the aria label, the dot
// style, and the accessibility label.
const dotPos = computed(() => {
    return {
        s: rawS.value ?? clamp(channelNumber(HSVCurrentColor.value, "s"), 0, 1),
        v: rawV.value ?? clamp(channelNumber(HSVCurrentColor.value, "v"), 0, 1),
    };
});

// Plate presentation (style + dot needle + aria) — colocated composable
// (R.W3 Lane E cohesion lift; the B3 shared-luma regime lives there).
const { spectrumAriaLabel, spectrumStyle, spectrumDotStyle, spectrumTravelStyle, spectrumGripStyle } =
    useSpectrumPlateStyle({ HSVCurrentColor, cssColorOpaque, dotPos });

onUnmounted(releaseCapture);
</script>

<style scoped>
@reference "../../../styles/foundation.css";

.spectrum-picker {
    /* The thumb's size, read by the thumb and by its inset travel (V3C-07). */
    --spectrum-dot-size: 1.75rem;
    border-radius: var(--radius-xl);
    /* No stamp of its own: the picker card carries the one cartoon slab
     * (restraint 2026-11-09, C-3 "Less and more subtle shadowing"). */
    overflow: visible;
    /* The dot's travel is ink overflow, never scrollable overflow. Its travel
     * box is as wide as the plane and moved by its own percentages, so at
     * full saturation it reached a whole plane past the edge and widened the
     * card's scroll host (542 against 364 px at 390): the card slid sideways
     * under a swipe. Layout containment keeps every overhang of the plane's
     * contents out of its ancestors' scroll area; the dot still paints over
     * the edge. */
    contain: layout;
    /* The touch grammar (DESIGN.md S-8): a vertical pan over the field is the
     * page's, on the compositor; a sideways start, a tap and the dot's handle
     * are the field's (the touch-intent lock, handleSpectrumDown). */
    touch-action: pan-y;
}
/* Keyboard focus: glass's ring on the field's own corner, eased in and out. */
.spectrum-picker {
    transition: box-shadow var(--duration-fast) var(--ease-standard);
}
.spectrum-picker:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}
/* The dot's handle: glass's coarse touch floor, centred on the dot and kept
 * inside the field (useSpectrumPlateStyle clamps its centre), so it adds no
 * overflow. It is the field's in both axes: a touch that starts on it moves
 * the colour, vertical included, and never the page. Invisible. */
.spectrum-grip {
    --spectrum-grip-size: var(--touch-target, 2.75rem);
    position: absolute;
    inline-size: var(--spectrum-grip-size);
    block-size: var(--spectrum-grip-size);
    translate: -50% -50%;
    border-radius: 50%;
    touch-action: none;
}
@media (prefers-reduced-motion: no-preference) {
    /* A tap's travel: the dot goes to the tapped point on the bar's spring. */
    .spectrum-travel[data-glide] {
        transition: transform var(--spring-dock-duration) var(--spring-dock);
    }
    /* Held under a finger, the dot rises a little on its own scale transition
     * (WatercolorDot), and settles back on release. No ring, no words. */
    .spectrum-picker[data-touch-intent="drag"] .spectrum-dot {
        scale: 1.18;
    }
}
@media (prefers-reduced-motion: reduce) {
    /* Reduced motion: the dot does not travel to a tap; it fades in there. */
    .spectrum-travel[data-glide] {
        animation: spectrum-dot-arrive var(--duration-control) var(--ease-out);
    }
    @keyframes spectrum-dot-arrive {
        from {
            opacity: 0;
        }
    }
}
/* X realization V-D1 (OD-19-SPECTRUM, after §0hr `7904869ce`) — THE PLANE'S
 * SHAPE BELONGS TO THE PICKER MEASURE, NOT TO THE VIEWPORT HEIGHT.
 * The inline size follows the measure; the block size used to follow `20dvh`
 * (floored 6rem, capped 10rem) below lg and a measure term at lg — two scales,
 * so the aspect was whatever they divided to: 3.74 : 1 at 844×390 (20dvh = 78
 * hits the 6rem floor), 2.38–2.65 : 1 at 1440+. One rule now, no breakpoint:
 * the figure is the size container (`cqi` = the plane's own inline size), and
 * the block size is the old 20svh breath held between two ASPECT bounds from
 * the φ ladder — φ ≤ w/h ≤ φ·√φ ≈ 2.058 (the √φ half-step the OD-19 measure
 * took). Tokens: `--spectrum-aspect-min/max` (foundation.css, DESIGN §3.1).
 * The pointer mapping reads the rect, so it is size-agnostic.
 *
 * V-D1.r2 (§0hw.14; supersedes §0hw.13's static 34svh budget): at lg the
 * shell is one viewport tall and the page must not scroll on the block axis
 * (X.W12.c), and the picker card holds a DATA-DEPENDENT row (the approved
 * name under the readout, +33 px on prod) that no static budget can see. So
 * at lg the plane is the card's ELASTIC member: the card is bounded by the
 * scene band (ColorPicker.vue), the column chain down to this figure may
 * shrink (`min-block-size: 0`), and the plane takes its aspect-bound size as
 * its basis and gives back block size when the card's other rows need it,
 * down to the ruled bar. Where the card fits (1440×900 and taller) nothing
 * shrinks and the aspect bound holds unchanged. Below lg the page scrolls,
 * and the aspect bound is whole.
 *
 * V-D1.r4 (§0hz.mt2.value.r): the give's floor was `min(20svh, …)`, a
 * viewport term, so a desktop window's real block flattened the plane past
 * the bar (prod: 4.425 at 1366×657, 2.965 at 1280×720). The floor is the bar
 * itself now (`--spectrum-aspect-bar`, R-1), and where the card's rows still
 * outgrow the block the plate scrolls its own body (ColorPicker.vue), as it
 * does below lg. The floor sits on the FIGURE, the box the column shrinks: a
 * column flexbox reads its children's preferred size as their minimum, so a
 * floor on the plane alone let the figure collapse past it and the plane ran
 * over the sliders. The figure's measure is the picker body's (seat.css makes
 * the body the query container at lg); the plane is that less the stamp. The
 * floor is rounded up to the whole pixel the plane lays out in, so a
 * sub-pixel never crosses the bar (593 / 237.2 lays out as 237). */
.spectrum-figure {
    @variant lg {
        min-block-size: round(
            up,
            calc(100cqi / var(--spectrum-aspect-bar)),
            1px
        );
    }
}
.spectrum-picker {
    block-size: clamp(
        calc(100cqi / var(--spectrum-aspect-max)),
        20svh,
        calc(100cqi / var(--spectrum-aspect-min))
    );
    @variant lg {
        flex: 0 1 auto;
    }
}
/* R.W3 Lane E / E1 — beat two: the field paints in ~180ms after the plate
 * lands (opacity + a background 120%→100% settle — the gradients breathe
 * into register). One-shot on mount; PRM-gated whole. */
@media (prefers-reduced-motion: no-preference) {
    @keyframes field-paint-in {
        from {
            opacity: 0;
            background-size: 120% 120%, 120% 120%;
        }
        to {
            opacity: 1;
            background-size: 100% 100%, 100% 100%;
        }
    }
    /* X.W12.b — the boot's arrival only (`data-arrival`, ColorPicker.vue):
     * a KeepAlive return re-inserts this field, which restarted the paint-in
     * under the pane-swap travel; a first arrival after a view change comes
     * whole (C-18).
     * o1109 repair (adversary defect 5): `backwards`, the overture's one-shot
     * release law (overture.css): the `to` pose is the field's natural one (a
     * gradient layer's `auto` size is its positioning area, 100 %), so the
     * finished beat retires instead of holding the field in effect forever,
     * where anything that rewinds the document's animations blanked it. */
    .pane-shell[data-arrival="boot"] .spectrum-picker {
        animation: field-paint-in 420ms var(--ease-standard) 180ms backwards;
    }
}

/* o1105 U3: the thumb's travel box, moved by its transform (useSpectrumPlateStyle).
   The plate is physical (saturation runs left to right in every direction, as the
   pointer map reads it), so the thumb's origin is the physical top-left: a logical
   start would sit it on the right edge under dir="rtl" and the transform would
   carry it off the plate (R-21 physical-inset pin). */
.spectrum-travel {
    left: 0;
    right: 0;
    inset-block: calc(var(--spectrum-dot-size) / 2);
    will-change: transform;
}
.spectrum-dot {
    position: absolute;
    left: 0;
    top: 0;
    width: var(--spectrum-dot-size);
    height: var(--spectrum-dot-size);
    border: 2px solid var(--dot-border, var(--background));
    /* The wet-edge filter is the WatercolorDot's own internalised per-instance
       <filter> (glass-ui superset) — no global #watercolor-filter override here. */
    &:hover {
        transform: none;
    }
}

</style>
