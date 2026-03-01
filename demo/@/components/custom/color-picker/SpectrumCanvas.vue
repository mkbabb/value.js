<template>
    <div
        ref="spectrumRef"
        :class="[
            'spectrum-picker flex w-full h-48 cursor-crosshair relative touch-gate-target',
            spectrumGate.isActive.value ? 'touch-gate-active' : '',
        ]"
        :style="spectrumStyle"
        @pointerdown="handleSpectrumDown"
        @pointermove="handleSpectrumMove"
        @pointerup="stopDragging"
        @pointercancel="stopDragging"
        @lostpointercapture="onLostPointerCapture"
        @touchmove.passive="(e: TouchEvent) => spectrumGate.handleScrollCheck(e)"
    >
        <WatercolorDot
            :color="cssColorOpaque"
            animate
            :cycle-duration="2000"
            :range="[15, 85]"
            tag="div"
            :class="[
                'spectrum-dot absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none',
                spectrumGate.isActive.value ? 'spectrum-dot-active' : '',
            ]"
            :style="spectrumDotStyle"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, ref, useTemplateRef } from "vue";
import { clamp } from "@src/math";
import { cancelAnimationFrame, requestAnimationFrame } from "@src/utils";
import { WatercolorDot } from "@components/custom/watercolor-dot";
import { useTouchGate } from "@composables/useTouchGate";
import { toCSSColorString } from ".";
import { COLOR_MODEL_KEY } from "./keys";

const {
    model,
    cssColor,
    cssColorOpaque,
    HSVCurrentColor,
    setCurrentColor,
} = inject(COLOR_MODEL_KEY)!;

const isDragging = ref(false);
const spectrumRef = useTemplateRef<HTMLElement>("spectrumRef");
const spectrumGate = useTouchGate();

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

const updateSpectrumColor = (coords: { clientX: number; clientY: number }) => {
    if (!spectrumRef.value) return;
    const rect = spectrumRef.value.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = clamp(coords.clientX - rect.left, 0, rect.width);
    const y = clamp(coords.clientY - rect.top, 0, rect.height);

    const s = x / rect.width;
    const v = 1 - y / rect.height;

    const hsv = HSVCurrentColor.value.clone();
    hsv.value.s.value = s;
    hsv.value.v.value = v;

    setCurrentColor(hsv, model.value.selectedColorSpace);
};

const handleSpectrumDown = (event: PointerEvent) => {
    if (spectrumGate.isTouchDevice && spectrumRef.value) {
        if (!spectrumGate.handleTouchStart(spectrumRef.value, event.clientY)) return;
    }
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    capturedPointerId = event.pointerId;
    capturedElement = el;
    isDragging.value = true;
    updateSpectrumColor({ clientX: event.clientX, clientY: event.clientY });
};

const handleSpectrumMove = (event: PointerEvent) => {
    if (spectrumGate.isTouchDevice) {
        if (!spectrumGate.isActive.value) return;
        spectrumGate.resetTimer();
    }
    if (isDragging.value) {
        scheduleSpectrumUpdate(event);
    }
};

const onLostPointerCapture = () => {
    capturedPointerId = null;
    capturedElement = null;
    if (isDragging.value) {
        stopDragging();
    }
};

const stopDragging = () => {
    releaseCapture();
    spectrumGate.handleTouchEnd();
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

const spectrumStyle = computed(() => {
    const { h, alpha } = HSVCurrentColor.value.value;
    const hClamped = clamp(h.value, 0, 1);

    const shadowClone = model.value.color.clone();
    shadowClone.value.alpha.value = 0.3;
    const shadowStr = toCSSColorString(shadowClone);

    return {
        background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, #fff, hsl(${hClamped * 360}deg, 100%, 50%))
      `,
        "--spectrum-shadow": shadowStr,
    };
});

const spectrumDotStyle = computed(() => {
    const { s, v } = HSVCurrentColor.value.value;
    const sClamped = clamp(s.value, 0, 1);
    const vClamped = clamp(v.value, 0, 1);

    const luma = vClamped * (1 - sClamped * 0.5);
    const borderAlpha = luma > 0.5 ? 0.8 : 0.9;
    const borderColor = luma > 0.5
        ? `rgba(0, 0, 0, ${borderAlpha})`
        : `rgba(255, 255, 255, ${borderAlpha})`;

    return {
        left: `${100 * sClamped}%`,
        top: `${100 * (1 - vClamped)}%`,
        backgroundColor: cssColorOpaque.value,
        '--dot-border': borderColor,
    };
});

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
@reference "../../../styles/style.css";

.spectrum-picker {
    border-radius: 0.375rem;
    box-shadow: 0px 0px 0px 0px transparent;
    transition: box-shadow 0.25s ease;
    overflow: visible;
    &:hover {
        box-shadow: 8px 8px 0px 0px color-mix(in srgb, var(--spectrum-shadow, transparent) 50%, black);
    }
}

.spectrum-dot {
    width: 1.75rem;
    height: 1.75rem;
    border: 2px solid var(--dot-border, hsl(var(--background)));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    filter: url(#watercolor-filter);
    &:hover {
        transform: none;
    }
}
</style>
