<template>
    <div class="flex flex-col gap-3">
        <!-- K slider — own row, full width, tall track with gradient -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <label class="fira-code text-sm font-bold text-muted-foreground whitespace-nowrap tabular-nums w-5 text-right">
                {{ k }}
            </label>
            <div
                ref="kSliderWrapperRef"
                :class="[
                    'touch-gate-target relative flex-1 h-6 flex items-center',
                    kGate.isActive.value && 'touch-gate-active',
                ]"
            >
                <div
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="{ background: gradient }"
                />
                <input
                    :value="k"
                    type="range"
                    min="1"
                    max="16"
                    class="extract-slider extract-slider--k relative w-full h-6 cursor-pointer appearance-none bg-transparent"
                    :style="{ touchAction: isTouchDevice ? (kGate.isActive.value ? 'none' : 'pan-y') : undefined }"
                    @input="$emit('update:k', Number(($event.target as HTMLInputElement).value))"
                    @pointerdown="onKPointerDown"
                    @touchmove.passive="kGate.handleScrollCheck($event)"
                    @touchend.passive="kGate.handleTouchEnd()"
                />
            </div>
        </div>

        <!-- Controls row: upload, kC slider, reset -->
        <div class="flex items-center gap-2">
            <button
                class="dock-icon-btn"
                title="Upload image"
                :style="{ '--hover-color': cssColor }"
                @click="$emit('upload')"
            >
                <Upload class="w-5 h-5 transition-colors" />
            </button>

            <div class="dock-separator" />

            <!-- Chroma weight slider -->
            <div class="flex items-center gap-1.5 flex-1 min-w-0">
                <label class="fira-code text-2xs text-muted-foreground/60 whitespace-nowrap" title="Chroma weight">kC</label>
                <div
                    ref="kcSliderWrapperRef"
                    :class="[
                        'touch-gate-target relative flex-1 h-5 flex items-center',
                        kcGate.isActive.value && 'touch-gate-active',
                    ]"
                >
                    <input
                        :value="chromaWeight"
                        type="range"
                        min="0"
                        max="1.5"
                        step="0.1"
                        class="extract-slider extract-slider--kc w-full h-5 cursor-pointer appearance-none bg-transparent"
                        :style="{
                            '--track-bg': 'hsl(var(--muted))',
                            touchAction: isTouchDevice ? (kcGate.isActive.value ? 'none' : 'pan-y') : undefined,
                        }"
                        @input="$emit('update:chromaWeight', Number(($event.target as HTMLInputElement).value))"
                        @pointerdown="onKcPointerDown"
                        @touchmove.passive="kcGate.handleScrollCheck($event)"
                        @touchend.passive="kcGate.handleTouchEnd()"
                    />
                </div>
                <span class="fira-code text-2xs text-muted-foreground/50 tabular-nums w-5">{{ chromaWeight.toFixed(1) }}</span>
            </div>

            <div class="dock-separator" />

            <button
                class="dock-icon-btn"
                :disabled="disabled || !hasImage"
                title="Reset"
                :style="{ '--hover-color': cssColor }"
                @click="$emit('reset')"
            >
                <RotateCcw class="w-5 h-5 transition-colors" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { Upload, RotateCcw } from "lucide-vue-next";
import { useTouchGate } from "@mkbabb/glass-ui";

defineProps<{
    k: number;
    chromaWeight: number;
    gradient: string;
    cssColor?: string;
    disabled?: boolean;
    hasImage?: boolean;
}>();

defineEmits<{
    "update:k": [value: number];
    "update:chromaWeight": [value: number];
    upload: [];
    reset: [];
}>();

const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

const kGate = useTouchGate();
const kcGate = useTouchGate();

const kSliderWrapperRef = useTemplateRef<HTMLElement>("kSliderWrapperRef");
const kcSliderWrapperRef = useTemplateRef<HTMLElement>("kcSliderWrapperRef");

function onKPointerDown(e: PointerEvent) {
    if (!isTouchDevice) return;
    const el = kSliderWrapperRef.value;
    if (!el) return;
    if (!kGate.isActive.value) {
        e.stopPropagation();
        e.preventDefault();
        kGate.handleTouchStart(el, e.clientY);
    } else {
        kGate.resetTimer();
    }
}

function onKcPointerDown(e: PointerEvent) {
    if (!isTouchDevice) return;
    const el = kcSliderWrapperRef.value;
    if (!el) return;
    if (!kcGate.isActive.value) {
        e.stopPropagation();
        e.preventDefault();
        kcGate.handleTouchStart(el, e.clientY);
    } else {
        kcGate.resetTimer();
    }
}
</script>

<style scoped>
@reference "../../../styles/style.css";

/* Camera/reset button hover → current color */
.dock-icon-btn:hover:not(:disabled) svg {
    color: var(--hover-color, hsl(var(--foreground)));
}

.extract-slider {
    -webkit-appearance: none;
    appearance: none;
}

/* K slider — tall pill track */
.extract-slider--k::-webkit-slider-runnable-track {
    height: 1.5rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider--k::-moz-range-track {
    height: 1.5rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider--k::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.75rem;
    height: 1.5rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-spring);
}
.extract-slider--k::-moz-range-thumb {
    width: 0.75rem;
    height: 1.5rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
}
.extract-slider--k:hover::-webkit-slider-thumb {
    border-color: hsl(var(--foreground) / 0.7);
    transform: scaleY(1.1);
}

/* kC slider — smaller track */
.extract-slider--kc::-webkit-slider-runnable-track {
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider--kc::-moz-range-track {
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider--kc::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.625rem;
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-spring);
}
.extract-slider--kc::-moz-range-thumb {
    width: 0.625rem;
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
}
.extract-slider--kc:hover::-webkit-slider-thumb {
    border-color: hsl(var(--foreground) / 0.7);
    transform: scaleY(1.1);
}

/* Touch gate styling for extract sliders */
.touch-gate-target:has(.extract-slider) {
    border-radius: var(--radius-pill);
}
</style>
