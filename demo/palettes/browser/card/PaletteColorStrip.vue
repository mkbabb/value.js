<template>
    <!-- W5-a11y: color strip is a decorative visual, hidden from AT -->
    <div
        aria-hidden="true"
        role="presentation"
        data-color-strip
        :data-orientation="orientation"
        :data-summary="summary || undefined"
        :class="[
            'overflow-hidden',
            orientation === 'vertical'
                ? 'flex flex-col w-10 h-full'
                : 'flex h-10 w-full',
        ]"
        :style="summary ? { backgroundImage: summaryGradient } : undefined"
    >
        <!-- X.W7.c (G10 · fold S-10 / PCS-1 / PCS-23): each band's flex-basis
             is 0 and its grow factor is its weight, so the N bands always share
             exactly the strip — no percentage floor that sums past 100% and
             clips the tail (the retired `Math.max(100 / n, 0.5)`: 201 × 0.5% =
             100.5%). Past the band-legibility threshold the strip summarizes
             instead (below). -->
        <template v-if="!summary">
            <div
                v-for="(color, i) in colors"
                :key="i"
                data-band
                :style="{
                    backgroundColor: color.css,
                    flex: `${shares[i] ?? 0} 1 0`,
                    [orientation === 'vertical' ? 'minHeight' : 'minWidth']: floor,
                }"
            ></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PaletteColor } from "../../types";

const {
    colors,
    orientation = "horizontal",
    weights = undefined,
} = defineProps<{
    colors: PaletteColor[];
    orientation?: "horizontal" | "vertical";
    /** Optional per-segment weights (e.g. quantizer populations — T19).
     *  Absent → the colors' own `weight` fields (S.W5-6 · F7 — an extracted
     *  palette carries its population story ON the palette); neither → equal
     *  shares. */
    weights?: number[];
}>();

/** The 8% legibility floor for weighted segments — applied as each band's
 *  `min-inline-size`, so flexbox honours it exactly (the prior renormalisation
 *  divided it back below 8%, PCS-1). A floor only exists while it can hold for
 *  every band (n × 8% ≤ 100%, i.e. n ≤ 12); past that the shares stand. */
const WEIGHT_FLOOR = 0.08;

/** The band-legibility threshold (OM-16 census: bands become illegible
 *  slivers at N ≥ 100). At or past it the strip stops drawing one band per
 *  colour and SUMMARIZES — the `MixResultDisplay` gradient idiom, one
 *  background with every colour placed at its weighted position. */
const SUMMARY_THRESHOLD = 100;

const summary = computed(() => colors.length >= SUMMARY_THRESHOLD);

/** Per-band grow factors: the effective weights, or equal shares. */
const shares = computed<number[]>(() => {
    const n = colors.length;
    const own = colors.map((c) => c.weight ?? 0);
    const effective =
        weights && weights.length === n
            ? weights
            : own.some((w) => w > 0)
              ? own
              : undefined;
    if (effective) {
        const clamped = effective.map((w) => Math.max(w, 0));
        if (clamped.some((w) => w > 0)) return clamped;
    }
    return colors.map(() => 1);
});

const weighted = computed(() => shares.value.some((w) => w !== 1));

const floor = computed(() =>
    weighted.value && colors.length * WEIGHT_FLOOR <= 1 ? `${WEIGHT_FLOOR * 100}%` : undefined,
);

/** Every colour at the centre of its weighted interval. */
const summaryGradient = computed(() => {
    const total = shares.value.reduce((sum, w) => sum + w, 0) || 1;
    let acc = 0;
    const stops = colors.map((c, i) => {
        const w = shares.value[i] ?? 0;
        const centre = ((acc + w / 2) / total) * 100;
        acc += w;
        return `${c.css} ${centre.toFixed(3)}%`;
    });
    const dir = orientation === "vertical" ? "to bottom" : "to right";
    return `linear-gradient(${dir}, ${stops.join(", ")})`;
});
</script>
