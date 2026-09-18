<template>
    <!-- S.W5 Lane A / W5-1 (S-10): the loading grammar re-pointed to the
         `ec1b200` register — ONE muted-ink family (`--skeleton-ink`, a single
         `color-mix` recipe, scheme-true through the muted tokens), opaque
         enough to read unambiguously as SHADOW against the field, never as
         content. The shell speaks the same card grammar as PaletteCard
         (hairline + glass rung + chip-scale cartoon stamp) so the ghost reads
         as "a palette card developing", not a foreign grey box.

         Two temporal registers (S-10.4, re-cut on D9's MOTION axis at
         T.W3-2 — this component is the LOADING family only):
         · shadow     — flat unified ink blocks on the breath rung (D9
                        calibration below); the KNOWN-IMMINENT wait — local
                        compute, seconds away (extract's plate developing).
         · developing — + the specimen accent seams + the sequential
                        top-to-bottom sweep for the unknown-duration NETWORK
                        wait (Browse). The stagger rides the producer's
                        `--skeleton-shimmer-delay` / `--skeleton-shimmer-tint`
                        seams (letter L9): custom properties inherit into
                        `::after`, so the choreography goes live the day
                        glass-ui's shimmer reads them — never re-defined here
                        (§No-workaround).
         The third S.W5-1 register — `specimen`, "the ghost OF a palette" —
         moved OUT of the loading family at T.W3-2 and OFF the sibling
         `ShadowPalette` at T.W6.5 (R12: the species was redesigned onto the
         genesis muted register, LIVING pulse, and seats solely at Extract's
         standing-instrument face; true-empty hosts speak the EmptyState dot
         trio instead). loading ≠ empty now splits on ANNOUNCEMENT, not
         motion: this shell keeps `role="status"` + "Loading palette"
         because HERE work IS happening; the aria-hidden ghost announces
         nothing. -->
    <div
        data-slot="palette-card-skeleton"
        class="skeleton-ink-register rounded-card border border-card-edge bg-well overflow-hidden shadow-cartoon-sm"
        role="status"
        aria-label="Loading palette"
    >
        <!-- Shadow color strip — the plate develops left to right. -->
        <div class="flex h-10 w-full">
            <Skeleton
                v-for="i in count"
                :key="i"
                surface="glass"
                :variant="blockVariant"
                class="h-full rounded-none"
                :class="variant === 'developing' && 'specimen-seg skeleton-seg'"
                :style="{
                    width: `${100 / count}%`,
                    '--i': i - 1,
                    '--skeleton-shimmer-delay': `${(i - 1) * 0.12}s`,
                }"
            />
        </div>
        <!-- Shadow metadata row — develops after the strip. -->
        <div class="px-3 py-2.5 flex items-center gap-2">
            <Skeleton
                surface="glass"
                :variant="blockVariant"
                class="h-5 w-32 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.1}s` }"
            />
            <Skeleton
                surface="glass"
                :variant="blockVariant"
                class="h-5 w-6 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.22}s` }"
            />
        </div>
        <!-- Shadow swatches — the last exposure pass. -->
        <div class="px-3 pb-3 flex flex-wrap gap-2">
            <Skeleton
                v-for="i in count"
                :key="i"
                surface="glass"
                :variant="blockVariant"
                class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-badge"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.34 + (i - 1) * 0.1}s` }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Skeleton } from "../../../ui/skeleton";

const { count = 5, variant = "shadow" } = defineProps<{
    count?: number;
    /** The two LOADING registers — see the template note. TRUE EMPTY is not
     *  a register here: empty hosts speak the EmptyState dot trio, and the
     *  sibling `ShadowPalette` species is the Extract instrument face
     *  (T.W6.5 · R12). */
    variant?: "shadow" | "developing";
}>();

// `developing` sweeps (shimmer); `shadow` breathes (the known-imminent
// rung, calibrated below). The breath animation lives on each block, so
// its register needs no producer seam.
const blockVariant = computed(() => (variant === "developing" ? "shimmer" : "breath"));
</script>

<style scoped>
/* The ink base lives at the ONE recipe root (`utils.css
 * .skeleton-ink-register`); the specimen walk likewise (`.specimen-seg`,
 * lifted there at T.W3-2 — since T.W6.5/R12 this developing strip is its
 * sole consumer: the redesigned ShadowPalette reads the plain genesis
 * muted ladder, not the walk). This block only bridges the walk into
 * glass-ui's over-glass seam for the developing strip, and calibrates the
 * D9 known-imminent breath. */
.skeleton-seg {
    --skeleton-glass-bg: var(--specimen-ink);
}

/* D9 known-imminent breath (T.W3-2): 0.55 ↔ 0.75 on `--ease-standard` over
 * the producer's 6s ambient period — a quieter swell than the 0.95
 * producer default, tuned ONLY through the published seams
 * (`--pulse-aura-opacity-max`, `--animate-ambient-pulse-easing`), never a
 * demo re-declaration of the producer keyframes. PRM stillness rides the
 * producer's media query (parked at the 0.55 trough). */
[data-slot="palette-card-skeleton"] {
    --pulse-aura-opacity-max: 0.75;
    --animate-ambient-pulse-easing: var(--ease-standard);
}
</style>
