<template>
    <!-- S.W5 Lane A / W5-1 (S-10): the loading grammar re-pointed to the
         `ec1b200` register — ONE muted-ink family (`--skeleton-ink`, a single
         `color-mix` recipe, scheme-true through the muted tokens), opaque
         enough to read unambiguously as SHADOW against the field, never as
         content. The shell speaks the same card grammar as PaletteCard
         (hairline + glass rung + chip-scale cartoon stamp) so the ghost reads
         as "a palette card developing", not a foreign grey box.

         Three temporal registers (S-10.4):
         · shadow     — flat unified ink blocks on the 6s breath rung; the
                        known-imminent wait (extract's undeveloped plate).
         · specimen   — shadow + a low-chroma hue rotation around
                        `--accent-live` on the strip segments (the ghost OF a
                        palette, still clearly shadow). One relative-color
                        recipe, per-segment `--i`.
         · developing — specimen + the sequential top-to-bottom sweep for the
                        unknown-duration network wait (Browse). The stagger
                        rides the producer's `--skeleton-shimmer-delay` /
                        `--skeleton-shimmer-tint` seams (letter L9): custom
                        properties inherit into `::after`, so the choreography
                        goes live the day glass-ui's shimmer reads them —
                        never re-defined here (§No-workaround). -->
    <div
        data-slot="palette-card-skeleton"
        class="skeleton-ink-register rounded-card border border-card-edge bg-card/75 backdrop-blur-sm overflow-hidden shadow-cartoon-sm"
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
                :class="variant !== 'shadow' && 'skeleton-seg'"
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
import { Skeleton } from "@components/ui/skeleton";

const { count = 5, variant = "shadow" } = defineProps<{
    count?: number;
    /** The three loading registers — see the template note. */
    variant?: "shadow" | "specimen" | "developing";
}>();

// `developing` sweeps (shimmer); `shadow`/`specimen` breathe (the 6s
// known-imminent rung). The breath animation lives on the HOST element, so
// its register needs no producer seam.
const blockVariant = computed(() => (variant === "developing" ? "shimmer" : "breath"));
</script>

<style scoped>
/* The ink base lives at the ONE recipe root (`utils.css
 * .skeleton-ink-register`); this block owns only the specimen tint. */

/* Specimen tint — the strip segments only: a low-chroma hue walk around the
 * live accent (fixed steps of 36°, C clamped low) mixed INTO the ink base so
 * the ghost stays shadow-first. Guarded: engines without relative-color
 * calc() keep the plain ink base (the recipe never falls to transparent). */
@supports (color: oklch(from red calc(l) c calc(h + 36deg))) {
    .skeleton-seg {
        --skeleton-glass-bg: color-mix(
            in oklab,
            var(--skeleton-ink) 78%,
            oklch(from var(--accent-live) l 0.12 calc(h + var(--i, 0) * 36deg))
        );
    }
}
</style>
