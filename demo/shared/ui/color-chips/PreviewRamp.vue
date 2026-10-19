<script setup lang="ts">
/**
 * <PreviewRamp> — the CONTINUOUS preview chip (T-17 · t-nav F6/F7): a
 * library-sampled interpolation ramp for space/hue-method rows. The stops
 * arrive PRE-SAMPLED (the host calls `sampleInterpolationRamp` — the chip
 * never computes color); the chip stamps them on `data-stops` (the O-14
 * paint≡stops referent) and paints them as a discrete-stop linear gradient.
 *
 * PROPORTION (F7): the chip joins the description line — height 1em, width
 * one golden plate (φ² ≈ 2.618rem), `radius-sm`, an inset hairline ring
 * (`--foreground` 12%) so light chips survive light glass, dark chips dark
 * glass, and designed color out-ranks accidental bleed-through (F8).
 * `aria-hidden` decorative — the a11y truth stays label + description.
 * Static paint — no motion, PRM-neutral.
 */
import { computed } from "vue";
import { stampStops } from "./sample";

const { stops } = defineProps<{
    /** Serialized ramp stops (the sampler's own output — never re-derived). */
    stops: readonly string[];
}>();

const gradient = computed(
    () => `linear-gradient(90deg, ${stops.join(", ")})`,
);
</script>

<template>
    <span
        v-if="stops.length >= 2"
        class="preview-chip"
        aria-hidden="true"
        :data-stops="stampStops(stops)"
        :style="{ backgroundImage: gradient }"
    ></span>
</template>

<style scoped>
.preview-chip {
    display: inline-block;
    flex: none;
    inline-size: 2.618rem; /* one golden plate — φ² × 1em (F7) */
    block-size: 1em;
    border-radius: var(--radius-sm);
    /* The inset hairline ring (F7/F8): designed color out-ranks bleed. */
    box-shadow: inset 0 0 0 1px
        color-mix(in oklab, var(--foreground) 12%, transparent);
}
</style>
