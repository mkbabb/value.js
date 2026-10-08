<template>
    <div class="flex flex-col gap-3">
        <!-- K slider — own row, full width, tall track with gradient.
             T-44a (T.W6.5 row 9): the developed rail's COLOR channel is the
             certified track ink. E1-R3 (T.W8 remediation_1): once an image
             develops, the opaque palette gradient rides above as a DATA layer (C3) and
             fully occludes that fill — so the certified ink survives OUTWARD
             as a persistent hairline ring (the ShadowPalette hairline idiom
             turned outward), giving the component a certified identity edge
             independent of its gradient content in every state.
             The k label speaks its cluster's ONE mono voice (weight 400,
             matching kC — E1-R1), inked at the certified de-emphasis rung.
             X.W7.g3 · EC-9: never a lying readout — when the developed palette
             is shorter than the ask (the quantizer dedupes), the readout says
             found/requested, and its title says it in words. -->
        <!-- X-DS pass 2 (V2C-02): the app's ONE scalar row — the name left,
             the value right in mono tabular figures, the track below (the
             Direction row's pattern). The bare numeral had no visible name. -->
        <!-- X-DS pass 3 (V3C-04): ONE slider register. A scalar with no colour
             data (K before a run develops, kC always) is glass's default RANGE
             variant at the `sm` rung, its range in the app's one scalar ink
             (`--slider-range-bg`, utils.css) over glass's quiet track — the
             config consoles' and Direction's register. The certified full-
             length track ink (T-44a) read as a FULL bar on a slider at 30%,
             and in dark it was the brightest thing on the pane while holding
             no data. The 24px data rail returns only when K carries the
             developed ramp (then it is the spectrum variant over the rail,
             with the rail's certified hairline ring, E1-R3). O-18's graphics
             leg reads the range, as the config leg does (V1C-06). -->
        <div data-o18="extract-k" class="flex flex-col gap-1 w-full min-w-0">
            <div class="flex items-center justify-between gap-2">
                <Label>Colors</Label>
                <span
                    data-extract-k-readout
                    class="text-mono-small plate-ink whitespace-nowrap tabular-nums"
                    :title="kReadout.title"
                >{{ kReadout.text }}</span>
            </div>
            <!-- The row keeps its 24px band in both states, so nothing below
                 it moves when the ramp develops. -->
            <div class="relative w-full h-6 flex items-center">
                <div
                    v-if="gradient"
                    data-o18="extract-k-rail"
                    class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 rounded-full overflow-hidden"
                    :style="railStyle"
                />
                <Slider
                    aria-label="Number of colors"
                    :variant="gradient ? 'spectrum' : 'scrubber'"
                    :size="gradient ? 'md' : 'sm'"
                    :model-value="kModel"
                    :disabled="standDown"
                    :min="1"
                    :max="16"
                    :step="1"
                    class="relative w-full"
                    :style="gradient ? { '--glass-slider-track-background': 'transparent' } : undefined"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:k', v[0]!)"
                />
            </div>
        </div>

        <!-- X-DS pass 3 (V3C-05): kC stands as a full-width scalar row, like
             "Colors" above it — one control stack, one left edge. -->
        <div data-o18="extract-kc" class="flex flex-col gap-1 w-full min-w-0">
            <div class="flex items-center justify-between gap-2">
                <Label class="truncate">Chroma weight</Label>
                <span class="text-mono-small plate-ink tabular-nums">{{ chromaWeight.toFixed(1) }}</span>
            </div>
            <Slider
                aria-label="Chroma weight"
                size="sm"
                :model-value="chromaWeightModel"
                :disabled="standDown"
                :min="0"
                :max="1.5"
                :step="0.1"
                class="w-full"
                @update:model-value="(v: number[] | undefined) => v && $emit('update:chromaWeight', v[0]!)"
            />
        </div>

        <!-- X-DS pass 3 (V3C-05): the image actions are ONE labelled action row,
             and only the live ones are shown. With no image the drop zone is
             the one intake (R-20), so Replace and Reset are absent rather than
             parked as dead glyphs; the camera is a two-way door (XW-8 · EC-5),
             pressed while live. -->
        <div class="flex flex-wrap items-center gap-1" role="group" aria-label="Image actions">
            <Button
                v-if="hasImage"
                emphasis="quiet"
                size="sm"
                :disabled="standDown"
                @click="$emit('upload')"
            >
                <Upload aria-hidden="true" />
                Replace image
            </Button>
            <Button
                emphasis="quiet"
                size="sm"
                :disabled="disabled"
                :aria-pressed="cameraLive"
                @click="$emit('camera')"
            >
                <Camera aria-hidden="true" />
                {{ cameraLive ? "Close camera" : "Open camera" }}
            </Button>
            <Button
                v-if="hasImage"
                emphasis="quiet"
                size="sm"
                :disabled="standDown"
                @click="$emit('reset')"
            >
                <RotateCcw aria-hidden="true" />
                Reset
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Upload, Camera, RotateCcw } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import { Slider } from "@mkbabb/glass-ui/slider";
import { Label } from "@mkbabb/glass-ui/label";
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
// X-DS pass 2 (V2C-03): a stood-down control (a run in flight, the camera
// open) recedes. The developed rail is painted here, so it takes glass's
// `--opacity-disabled` itself; the range sliders dim through glass.
const railStyle = computed(() => ({
    backgroundColor: trackInk.value,
    ...(gradient ? { backgroundImage: gradient } : {}),
    boxShadow: `inset 0 0 0 1.5px ${trackInk.value}`,
    ...(standDown.value ? { opacity: "var(--opacity-disabled)" } : {}),
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
