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
 * mints it): the plate seats 7 segments (one golden plate, φ² em, over a
 * 0.374 em segment floor). Past that the strip follows the ONE compact
 * truncation policy (`./compact`, X realization V-D3 · BC-PCS-10): 6
 * segments and a `+k` count beside the plate, so drawn + k is the palette's
 * count — it reads as "and k more", never as a complete palette it isn't.
 * (The retired arm faded the 7th segment out with a mask: "continues", with
 * no count, one of five policies on one screen.)
 *
 * Proportion/material: the module's ONE recipe in `./chip.css` (1em tall,
 * one golden plate wide, `radius-sm`, the opaque specimen well, the outset
 * `--card-edge` ring); `aria-hidden`, static paint.
 */
import { computed } from "vue";
import { compactWindow } from "./compact";
import { stampStops } from "./sample";

/** The N-4 segment floor: the plate's capacity, φ² em / 0.374 em = 7. */
const STRIP_SEGMENT_CAPACITY = 7;

const { stops } = defineProps<{
    /** Serialized palette stops (the host truth function's own output). */
    stops: readonly string[];
}>();

const view = computed(() => compactWindow(stops.length, STRIP_SEGMENT_CAPACITY));
// BC-R-16: the stamp is computed once per stops change, not per render.
const stamped = computed(() => stampStops(stops));
const visible = computed(() => stops.slice(0, view.value.shown));
</script>

<template>
    <span
        v-if="stops.length >= 1"
        class="preview-strip-host"
        aria-hidden="true"
        :data-count="stops.length"
        :data-shown="view.shown"
    >
        <span class="preview-chip preview-strip" data-color-surface :data-stops="stamped">
            <span
                v-for="(stop, i) in visible"
                :key="i"
                class="preview-strip-segment"
                :style="{ backgroundColor: stop }"
            ></span>
        </span>
        <span v-if="view.more > 0" class="preview-strip-more" data-compact-more>+{{ view.more }}</span>
    </span>
</template>

<style scoped src="./chip.css"></style>

<style scoped>
.preview-strip-host {
    display: inline-flex;
    flex: none;
    align-items: center;
    gap: 0.25em;
}
.preview-strip-segment {
    flex: 1 1 0;
    block-size: 100%;
}
/* The count beside the plate, in the row's caption voice. */
.preview-strip-more {
    font-size: 0.75em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: var(--muted-foreground);
}
</style>
