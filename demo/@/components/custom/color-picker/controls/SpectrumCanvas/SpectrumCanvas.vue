<template>
    <!-- Direct saturation/value field. -->
    <figure class="m-0 min-w-0 w-full flex flex-col">
        <!-- W5-a11y: 2D saturation×lightness picker — not a linear slider,
             so role="img" with a reactive descriptive label, not role="slider". -->
        <div
            ref="spectrumRef"
            role="img"
            :aria-label="spectrumAriaLabel"
            :class="[
                'spectrum-picker flex w-full h-[20dvh] min-h-24 max-h-40 lg:h-[14rem] lg:max-h-none cursor-crosshair relative touch-gate-target',
                spectrumGate.isActive.value && 'touch-gate-active',
            ]"
            :style="spectrumStyle"
            @pointerdown="handleSpectrumDown"
            @pointermove="handleSpectrumMove"
            @pointerup="handleSpectrumUp"
            @pointercancel="handleSpectrumCancel"
            @lostpointercapture="onLostPointerCapture"
            @touchmove.passive="spectrumGate.handleScrollCheck($event)"
            @touchend.passive="spectrumGate.handleTouchEnd()"
        >
            <WatercolorDot
                :color="cssColorOpaque"
                animate
                :cycle-duration="2000"
                :range="[15, 85]"
                class="spectrum-dot absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                :style="spectrumDotStyle"
            />
        </div>
    </figure>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, ref, useTemplateRef, watch } from "vue";
import { clamp } from "@mkbabb/value.js/math";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { useTouchGate } from "@mkbabb/glass-ui";
import { channelNumber, withChannel } from "../../../../../../color-session/picker-color";
import { POINTER_DEBUG_KEY } from "../../composables/usePointerDebug";
import { useSpectrumPlateStyle } from "./composables/useSpectrumPlateStyle";
import { COLOR_MODEL_KEY } from "../../../../../../color-session/keys";

const {
    model,
    cssColorOpaque,
    HSVCurrentColor,
    setCurrentColor,
} = inject(COLOR_MODEL_KEY)!;

const debug = inject(POINTER_DEBUG_KEY)!;

const spectrumGate = useTouchGate();
const isDragging = ref(false);
const spectrumRef = useTemplateRef<HTMLElement>("spectrumRef");

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

// rAF-based throttled spectrum update — store only primitive coords
let pendingCoords: { clientX: number; clientY: number } | null = null;
let spectrumRafId: ReturnType<typeof requestAnimationFrame> | null = null;

const scheduleSpectrumUpdate = (event: PointerEvent) => {
    pendingCoords = { clientX: event.clientX, clientY: event.clientY };
    if (spectrumRafId === null) {
        spectrumRafId = requestAnimationFrame(() => {
            spectrumRafId = null;
            if (pendingCoords) {
                updateSpectrumColor(pendingCoords);
                pendingCoords = null;
            }
        });
    }
};

const updateSpectrumColor = (
    coords: { clientX: number; clientY: number },
) => {
    if (!spectrumRef.value) return;
    const rect = spectrumRef.value.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = clamp(coords.clientX - rect.left, 0, rect.width);
    const y = clamp(coords.clientY - rect.top, 0, rect.height);

    const s = clamp(x / rect.width, 0, 1);
    const v = clamp(1 - y / rect.height, 0, 1);

    rawS.value = s;
    rawV.value = v;
    spectrumIsSource = true;

    const hsv = withChannel(withChannel(HSVCurrentColor.value, "s", s), "v", v);

    setCurrentColor(hsv, model.value.selectedColorSpace, true);
};

const handleSpectrumDown = (event: PointerEvent) => {
    debug.logEvent(event, "spec:down");

    const el = event.currentTarget as HTMLElement;

    // On touch devices, require tap-to-activate before allowing drag
    if (spectrumGate.isTouchDevice && !spectrumGate.isActive.value) {
        spectrumGate.handleTouchStart(el, event.clientY);
        debug.log("spec:gate-block", event.pointerId, event.target, false);
        return;
    }

    if (spectrumGate.isTouchDevice) {
        spectrumGate.resetTimer();
    }

    el.setPointerCapture(event.pointerId);
    capturedPointerId = event.pointerId;
    capturedElement = el;
    isDragging.value = true;

    debug.setGauge("spec.isDragging", true);
    debug.setGauge("spec.capturedPid", event.pointerId);

    updateSpectrumColor({ clientX: event.clientX, clientY: event.clientY });
};

const handleSpectrumMove = (event: PointerEvent) => {
    if (isDragging.value) {
        scheduleSpectrumUpdate(event);
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
    if (pendingCoords) {
        updateSpectrumColor(pendingCoords);
        pendingCoords = null;
    }
    if (spectrumRafId !== null) {
        cancelAnimationFrame(spectrumRafId);
        spectrumRafId = null;
    }
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
const { spectrumAriaLabel, spectrumStyle, spectrumDotStyle } =
    useSpectrumPlateStyle({ HSVCurrentColor, cssColorOpaque, dotPos, spectrumGate });

onUnmounted(() => {
    releaseCapture();
    if (spectrumRafId !== null) {
        cancelAnimationFrame(spectrumRafId);
        spectrumRafId = null;
    }
    pendingCoords = null;
});
</script>

<style scoped>
@reference "../../../../../styles/foundation.css";

.spectrum-picker {
    border-radius: var(--radius-xl);
    box-shadow: 0px 0px 0px 0px transparent;
    transition: box-shadow var(--duration-normal) var(--ease-standard);
    overflow: visible;
    &:hover {
        box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black);
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
    .spectrum-picker {
        animation: field-paint-in 420ms var(--ease-standard) 180ms both;
    }
}

.spectrum-dot {
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    border: 2px solid var(--dot-border, var(--background));
    box-shadow: var(--shadow-sm);
    /* The wet-edge filter is the WatercolorDot's own internalised per-instance
       <filter> (glass-ui superset) — no global #watercolor-filter override here. */
    &:hover {
        transform: none;
    }
}

</style>
