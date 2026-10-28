<script setup lang="ts">
/**
 * <PreviewStrip> — the DISCRETE preview chip (T-17 · t-nav F5/F7): n hard
 * segments for palette-shaped previews (generate preset/harmony rows +
 * AuroraPane's admin harmony select as a family member). The stops arrive
 * PRE-COMPUTED from the host's truth function (seed-exact — the strip a row
 * shows is what selecting it yields; O-14's byte-identity law); the strip
 * stamps them on `data-stops` and paints them as equal hard segments.
 *
 * THE SEGMENT FLOOR (h-refine-console N-4 — a NAMED taste knob so no writer
 * mints it): preview segments cap at 7 with HONEST truncation — past the
 * cap the strip renders the first 7 and fades the tail segment out
 * (mask-image), reading as "continues", never as a complete palette it
 * isn't. (The N-4 alternative — the chip stepping up one width token past
 * count 8 — is not taken here; the cap arm keeps the description-lane
 * rhythm fixed.)
 *
 * Proportion/material: the module's ONE recipe in `./chip.css` (1em tall,
 * one golden plate wide, `radius-sm`, the opaque specimen well the masked
 * tail fades into, the outset `--card-edge` ring); `aria-hidden`, static paint.
 */
import { computed } from "vue";
import { stampStops } from "./sample";

/** The N-4 segment floor: ~7 with honest truncation. */
const STRIP_SEGMENT_CAP = 7;

const { stops } = defineProps<{
    /** Serialized palette stops (the host truth function's own output). */
    stops: readonly string[];
}>();

const truncated = computed(() => stops.length > STRIP_SEGMENT_CAP);
const visible = computed(() =>
    truncated.value ? stops.slice(0, STRIP_SEGMENT_CAP) : stops,
);
</script>

<template>
    <span
        v-if="stops.length >= 1"
        class="preview-chip preview-strip"
        :class="{ 'preview-strip--truncated': truncated }"
        aria-hidden="true"
        :data-stops="stampStops(stops)"
    >
        <span
            v-for="(stop, i) in visible"
            :key="i"
            class="preview-strip-segment"
            :style="{ backgroundColor: stop }"
        ></span>
    </span>
</template>

<style scoped src="./chip.css"></style>

<style scoped>
.preview-strip-segment {
    flex: 1 1 0;
    block-size: 100%;
}

/* Honest truncation (N-4): the tail segment fades out — "continues". */
.preview-strip--truncated .preview-strip-segment:last-child {
    mask-image: linear-gradient(90deg, black 20%, transparent 95%);
}
</style>
