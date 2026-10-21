<script setup lang="ts">
/**
 * <PreviewRamp> — the CONTINUOUS preview chip (T-17 · t-nav F6/F7): a
 * library-sampled interpolation ramp for space/hue-method rows. The stops
 * arrive PRE-SAMPLED (the host calls `sampleInterpolationRamp` — the chip
 * never computes color); the chip stamps them on `data-stops` (the O-14
 * paint≡stops referent) and paints them as a discrete-stop linear gradient.
 *
 * PROPORTION + MATERIAL (F7/F8): the chip joins the description line; its
 * box, specimen well and outset `--card-edge` ring are the module's ONE
 * recipe in `./chip.css` (R-7 / PS-2 / R-13).
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

<style scoped src="./chip.css"></style>
