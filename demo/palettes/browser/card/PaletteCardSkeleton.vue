<template>
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
                class="text-subheading h-[1lh] w-32 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.1}s` }"
            />
            <Skeleton
                class="text-subheading h-[1lh] w-6 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.22}s` }"
            />
        </div>
        <!-- X.W12U.s2 (N-17 after UIA-V-30): below 30rem the settled card
             seats its meta cluster (tags, vote) on its own row beneath the
             name, so the silhouette carries that row too. -->
        <div class="skeleton-meta-row" aria-hidden="true">
            <Skeleton
                class="text-mono-small h-[calc(1lh+0.25rem)] w-10 rounded-sm"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.34}s` }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
/*
 * S.W5 Lane A / W5-1 (S-10): the loading grammar re-pointed to the
 * `ec1b200` register — ONE muted-ink family (`--skeleton-ink`, a single
 * `color-mix` recipe, scheme-true through the muted tokens), opaque
 * enough to read unambiguously as SHADOW against the field, never as
 * content. The shell speaks the same card grammar as PaletteCard
 * (hairline + glass rung + chip-scale cartoon stamp) so the ghost reads
 * as "a palette card developing", not a foreign grey box.
 *
 * Two temporal registers (S-10.4, re-cut on D9's MOTION axis at
 * T.W3-2 — this component is the LOADING family only):
 * · shadow     — flat unified ink blocks on the breath rung (D9
 * calibration below); the KNOWN-IMMINENT wait — local
 * compute, seconds away (extract's plate developing).
 * · developing — + the specimen accent seams + the sequential
 * top-to-bottom sweep for the unknown-duration NETWORK
 * wait (Browse). The stagger rides the producer's
 * `--skeleton-shimmer-delay` / `--skeleton-shimmer-tint`
 * seams (letter L9): custom properties inherit into
 * `::after`, so the choreography goes live the day
 * glass-ui's shimmer reads them — never re-defined here
 * (§No-workaround).
 * The third S.W5-1 register — `specimen`, "the ghost OF a palette" —
 * moved OUT of the loading family at T.W3-2 and OFF the sibling
 * `ShadowPalette` at T.W6.5 (R12: the species was redesigned onto the
 * genesis muted register, LIVING pulse, and seats solely at Extract's
 * standing-instrument face; true-empty hosts speak the EmptyState dot
 * trio instead). loading ≠ empty now splits on ANNOUNCEMENT, not
 * motion: this shell keeps `role="status"` + "Loading palette"
 * because HERE work IS happening; the aria-hidden ghost announces
 * nothing.
 * X.W7.g (G20 · N-17): the loading shell is the silhouette of the
 * SETTLED collapsed card it stands in for — strip + meta row. The
 * swatch row it carried is a region the collapsed card never renders
 * (+50 % height at 390 px, PCS-4) and grew with k (254 px at k = 16);
 * it is deleted, the meta blocks take the specimen name's own line box
 * (`text-subheading` · `1lh`), and the height is k-invariant.
 *
 * X.W7.g (crash-battery R14 · ES-2): this note lived as a leading <template>
 * comment, which the dev compiler turns into a sibling root — a multi-root
 * component, whose <Transition mode="out-in"> leave never completes. The
 * template now opens on its element; the note lives here.
 */
import { Skeleton } from "../../../ui/skeleton";

const { count = 5, variant = "shadow" } = defineProps<{
    count?: number;
    /** The two LOADING registers — see the template note. TRUE EMPTY is not
     *  a register here: empty hosts speak the EmptyState dot trio, and the
     *  sibling `ShadowPalette` species is the Extract instrument face
     *  (T.W6.5 · R12). */
    variant?: "shadow" | "developing";
}>();
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
    container: palette-card-skeleton / inline-size;
    --pulse-aura-opacity-max: 0.75;
    --animate-ambient-pulse-easing: var(--ease-standard);
}

/* The meta row of a narrow settled card (PaletteInspector's < 30rem rule). */
.skeleton-meta-row {
    display: none;
    padding: 0 0.75rem 0.5rem;
}
@container palette-card-skeleton (width < 30rem) {
    .skeleton-meta-row {
        display: flex;
    }
}
</style>
