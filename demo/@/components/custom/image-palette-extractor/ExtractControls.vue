<template>
    <div class="flex flex-col gap-3">
        <!-- K slider — own row, full width, tall track with gradient.
             T-44a (T.W6.5 row 9): the rail's COLOR channel is the certified
             track ink (the session's palette gradient rides above as the
             image layer when present) — the rail reads ≥3:1 on its ground by
             construction, never only as legible as its gradient content. -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <label class="text-mono-small font-bold text-muted-foreground whitespace-nowrap tabular-nums w-5 text-right">
                {{ k }}
            </label>
            <div class="relative flex-1 h-6 flex items-center">
                <div
                    data-o18="extract-k-rail"
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="{ background: gradient, backgroundColor: trackInk }"
                />
                <Slider
                    aria-label="Number of colors"
                    variant="spectrum"
                    :model-value="[k]"
                    :min="1"
                    :max="16"
                    :step="1"
                    class="relative w-full"
                    :style="{ '--slider-track-bg': 'transparent' }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:k', v[0]!)"
                />
            </div>
        </div>

        <!-- Controls row: upload, kC slider, reset -->
        <div class="flex items-center gap-2">
            <DockIconButton
                title="Upload image"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('upload')"
            >
                <Upload class="w-5 h-5 transition-colors" />
            </DockIconButton>

            <!-- Camera capture (T20 — the unified workbench capability) -->
            <DockIconButton
                title="Open camera"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('camera')"
            >
                <Camera class="w-5 h-5 transition-colors" />
            </DockIconButton>

            <DockSeparator />

            <!-- Chroma weight slider. T-44a (T.W6.5 row 9 · §6.7): the former
                 `--slider-track-bg: var(--muted)` was dark-on-dark against
                 the plate ground ("These sliders are un-readable", §0.6
                 t33-audit-11) — the track re-inks with the CONTRACT: the
                 live pick certified against its rung at the WCAG 1.4.11
                 graphics floor (the O-18 graphics leg is its born-RED gate). -->
            <div data-o18="extract-kc" class="flex items-center gap-1.5 flex-1 min-w-0">
                <label class="fira-code text-micro text-muted-foreground whitespace-nowrap" title="Chroma weight">kC</label>
                <Slider
                    aria-label="Chroma weight"
                    variant="spectrum"
                    :model-value="[chromaWeight]"
                    :min="0"
                    :max="1.5"
                    :step="0.1"
                    class="flex-1"
                    :style="{ '--slider-track-bg': trackInk }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:chromaWeight', v[0]!)"
                />
                <span class="fira-code text-micro text-muted-foreground tabular-nums w-5">{{ chromaWeight.toFixed(1) }}</span>
            </div>

            <DockSeparator />

            <DockIconButton
                :disabled="disabled || !hasImage"
                title="Reset"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('reset')"
            >
                <RotateCcw class="w-5 h-5 transition-colors" />
            </DockIconButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Upload, Camera, RotateCcw } from "@lucide/vue";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { Slider } from "@components/ui/slider";
import { useSafeAccentFn } from "@composables/color/useContrastSafeColor";
import { GRAPHICS_CONTRAST_FLOOR } from "@composables/color/ink";

const { k, chromaWeight, gradient, cssColor, disabled, hasImage } =
    defineProps<{
        k: number;
        chromaWeight: number;
        gradient: string;
        cssColor?: string | undefined;
        disabled?: boolean | undefined;
        hasImage?: boolean | undefined;
    }>();

// T-44a (T.W6.5 row 9): the track material is CONTRACT ink — the live pick
// certified against the rung the controls actually seat on (the extract
// pane's resting plate, Card tier="resting") at the WCAG 1.4.11 graphics
// floor. NEVER a per-site color pin (E-3 by owner order): the certified
// de-emphasis token is the degenerate fallback when no live pick threads.
const { safeCss } = useSafeAccentFn("resting");
// BORN-RED record (the leg's own capture, 2026-07-11, pre-cure pin
// `var(--muted)`): light — fill rgb(246 243 239) vs ground rgb(184 179 174)
// = 1.88; dark — fill rgb(31 28 25) vs ground rgb(78 70 65) = 1.85. Both
// under the 3:1 graphics floor: the owner's "un-readable" sliders, measured.
const trackInk = computed(() =>
    cssColor ? safeCss(cssColor, GRAPHICS_CONTRAST_FLOOR) : "var(--ink-muted)",
);

defineEmits<{
    "update:k": [value: number];
    "update:chromaWeight": [value: number];
    upload: [];
    camera: [];
    reset: [];
}>();
</script>

<style scoped>
@reference "../../../styles/style.css";

/* Touch gate styling for extract sliders */
.touch-gate-target {
    border-radius: var(--radius-pill);
}
</style>
