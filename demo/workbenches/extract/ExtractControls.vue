<template>
    <div class="flex flex-col gap-3">
        <!-- K slider — own row, full width, tall track with gradient.
             T-44a (T.W6.5 row 9): the rail's COLOR channel is the certified
             track ink. E1-R3 (T.W8 remediation_1): pre-image the track ink
             carries the rail (≥3:1 on its ground); once an image develops,
             the opaque palette gradient rides above as a DATA layer (C3) and
             fully occludes that fill — so the certified ink survives OUTWARD
             as a persistent hairline ring (the ShadowPalette hairline idiom
             turned outward), giving the component a certified identity edge
             independent of its gradient content in every state.
             The k label speaks its cluster's ONE mono voice (weight 400,
             matching kC — E1-R1), inked at the certified de-emphasis rung.
             X.W7.g3 · EC-9: never a lying readout — when the developed palette
             is shorter than the ask (the quantizer dedupes), the readout says
             found/requested, and its title says it in words. -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <span
                data-extract-k-readout
                class="text-mono-small plate-ink whitespace-nowrap tabular-nums min-w-5 text-right"
                :title="kReadout.title"
            >{{ kReadout.text }}</span>
            <div class="relative flex-1 h-6 flex items-center">
                <div
                    data-o18="extract-k-rail"
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="railStyle"
                />
                <Slider
                    aria-label="Number of colors"
                    variant="spectrum"
                    :model-value="kModel"
                    :disabled="standDown"
                    :min="1"
                    :max="16"
                    :step="1"
                    class="relative w-full"
                    :style="{ '--glass-slider-track-background': 'transparent' }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:k', v[0]!)"
                />
            </div>
        </div>

        <!-- Controls row: upload, kC slider, reset -->
        <div class="flex items-center gap-2">
            <!-- R-20 (X.W7.g3): one intake per state. With no image the drop
                 zone is the intake and this control stands down (present, so
                 the row holds its geometry); with an image it replaces it. -->
            <DockControl
                :title="hasImage ? 'Replace image' : 'Upload image'"
                :disabled="standDown || !hasImage"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('upload')"
            >
                <Upload class="w-5 h-5 transition-colors" />
            </DockControl>

            <!-- Camera capture (T20 — the unified workbench capability).
                 X.W7.g3 (XW-8 · EC-5): a two-way door — pressed while live, and
                 pressing it again closes the camera. -->
            <DockControl
                :title="cameraLive ? 'Close camera' : 'Open camera'"
                :active="cameraLive"
                :disabled="disabled"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('camera')"
            >
                <Camera class="w-5 h-5 transition-colors" />
            </DockControl>

            <DockSeparator />

            <!-- Chroma weight slider. T-44a (T.W6.5 row 9 · §6.7): the former
                 `--glass-slider-track-background: var(--muted)` was dark-on-dark against
                 the plate ground ("These sliders are un-readable", §0.6
                 t33-audit-11) — the track re-inks with the CONTRACT: the
                 live pick certified against its rung at the WCAG 1.4.11
                 graphics floor (the O-18 graphics leg is its born-RED gate). -->
            <div data-o18="extract-kc" class="flex items-center gap-1.5 flex-1 min-w-0">
                <label class="fira-code text-micro plate-ink whitespace-nowrap" title="Chroma weight">kC</label>
                <Slider
                    aria-label="Chroma weight"
                    variant="spectrum"
                    :model-value="chromaWeightModel"
                    :disabled="standDown"
                    :min="0"
                    :max="1.5"
                    :step="0.1"
                    class="flex-1"
                    :style="{ '--glass-slider-track-background': trackInk }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:chromaWeight', v[0]!)"
                />
                <span class="fira-code text-micro plate-ink tabular-nums w-5">{{ chromaWeight.toFixed(1) }}</span>
            </div>

            <DockSeparator />

            <DockControl
                :disabled="standDown || !hasImage"
                title="Reset"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('reset')"
            >
                <RotateCcw class="w-5 h-5 transition-colors" />
            </DockControl>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Upload, Camera, RotateCcw } from "@lucide/vue";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import { Slider } from "../../ui/slider";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";
import { GRAPHICS_CONTRAST_FLOOR } from "../../color-session/ink";

const { k, found = null, chromaWeight, gradient, cssColor, disabled, hasImage, cameraLive = false } =
    defineProps<{
        k: number;
        /** Colours the developed palette actually holds (null before a run develops). */
        found?: number | null;
        chromaWeight: number;
        /** The developed palette's rail image; null when nothing has developed (EC-25). */
        gradient: string | null;
        cssColor?: string | undefined;
        /** A run is in flight: every control stands down (XW-8 · EC-6). */
        disabled?: boolean | undefined;
        hasImage?: boolean | undefined;
        /** The camera is open: its own control is the exit, the rest stand down. */
        cameraLive?: boolean;
    }>();

/** XW-8: the whole-component contract — every control honours it, not one of five. */
const standDown = computed(() => !!disabled || cameraLive);

/** EC-9: the readout is the result when the result differs from the request. */
const kReadout = computed(() =>
    found !== null && found !== k
        ? { text: `${found}/${k}`, title: `${found} colors found of ${k} requested` }
        : { text: String(k), title: `${k} colors` },
);

// EC-46 (X-W7 Repair 2 · B-1): the Slider's array model is minted once per
// value change, not once per parent render — a stable identity lets the
// producer's prop-identity bailouts hold.
const kModel = computed(() => [k]);
const chromaWeightModel = computed(() => [chromaWeight]);

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

// EC-25 (X.W7.g3): the rail's two layers are two properties, never one
// shorthand racing a longhand by object key order. The certified track ink is
// the COLOR layer in every state; the developed gradient, when there is one,
// rides above it as the IMAGE layer.
const railStyle = computed(() => ({
    backgroundColor: trackInk.value,
    ...(gradient ? { backgroundImage: gradient } : {}),
    boxShadow: `inset 0 0 0 1.5px ${trackInk.value}`,
}));

defineEmits<{
    "update:k": [value: number];
    "update:chromaWeight": [value: number];
    upload: [];
    camera: [];
    reset: [];
}>();
</script>

<style scoped>
@reference "../../styles/foundation.css";

/* Touch gate styling for extract sliders */
.touch-gate-target {
    border-radius: var(--radius-pill);
}
</style>
