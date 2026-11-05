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
import { stampStops, stopsToGradient } from "./sample";

const { stops } = defineProps<{
    /** Serialized ramp stops (the sampler's own output — never re-derived). */
    stops: readonly string[];
}>();

// BC-R-18: the one serializer; BC-R-26: unpaintable stops dropped, and an
// absent ramp stamps `data-absent` and shows the well (honest absence).
const gradient = computed(() => stopsToGradient(stops));
// BC-R-16: the stamp is computed once per stops change, not per render.
const stamped = computed(() => stampStops(stops));
</script>

<template>
    <span
        v-if="stops.length >= 2"
        class="preview-chip"
        data-color-surface
        aria-hidden="true"
        :data-stops="stamped"
        :data-absent="gradient ? undefined : ''"
        :style="gradient ? { backgroundImage: gradient } : undefined"
    ></span>
</template>

<style scoped src="./chip.css"></style>
