<template>
    <!-- W5-a11y: color strip is a decorative visual, hidden from AT -->
    <div
        aria-hidden="true"
        role="presentation"
        :class="[
            'overflow-hidden',
            orientation === 'vertical'
                ? 'flex flex-col w-10 h-full'
                : 'flex h-10 w-full',
        ]"
    >
        <div
            v-for="(color, i) in colors"
            :key="i"
            class="shrink-0"
            :class="orientation === 'vertical' ? 'w-full' : 'h-full'"
            :style="{
                backgroundColor: color.css,
                [orientation === 'vertical' ? 'height' : 'width']:
                    `${segmentPcts[i] ?? 0}%`,
            }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PaletteColor } from "@lib/palette/types";

const {
    colors,
    orientation = "horizontal",
    weights = undefined,
} = defineProps<{
    colors: PaletteColor[];
    orientation?: "horizontal" | "vertical";
    /** Optional per-segment weights (e.g. quantizer populations — T19).
     *  Segments size proportionally with an 8% floor so small clusters stay
     *  legible; absent → equal widths (the pre-T19 behavior). */
    weights?: number[];
}>();

/** The 8% legibility floor for weighted segments. */
const WEIGHT_FLOOR = 0.08;

const segmentPcts = computed<number[]>(() => {
    const n = colors.length;
    if (n === 0) return [];
    if (weights && weights.length === n) {
        const total = weights.reduce((sum, w) => sum + Math.max(w, 0), 0);
        if (total > 0) {
            const floored = weights.map((w) =>
                Math.max(Math.max(w, 0) / total, WEIGHT_FLOOR),
            );
            const flooredTotal = floored.reduce((sum, x) => sum + x, 0);
            return floored.map((x) => (x / flooredTotal) * 100);
        }
    }
    return colors.map(() => Math.max(100 / n, 0.5));
});
</script>
