<template>
    <div
        :data-slot="instrument ? 'shadow-palette' : 'palette-card-skeleton'"
        class="skeleton-ink-register rounded-card border border-card-edge overflow-hidden bg-well"
        :class="instrument && ['shadow-palette', loading && 'shadow-palette--loading']"
        :role="announces ? 'status' : undefined"
        :aria-label="announces ? 'Loading palette' : undefined"
        :aria-hidden="announces ? undefined : 'true'"
    >
        <!-- The strip — the plate develops left to right. X-DS pass 8
             (V3C-02): the instrument face is STILL at rest. Nothing is loading
             at Extract's empty rest, so an idle pulse said "loading" where the
             truth is "empty"; it breathes only while a run is in flight
             (`loading`). color-40 O-2: its k cells are filled in the skeleton
             ink, the card's own hairline between them. -->
        <div class="flex h-10 w-full">
            <template v-if="instrument">
                <div
                    v-for="i in count"
                    :key="i"
                    data-slot="shadow-palette-cell"
                    class="shadow-seg shadow-ink h-full min-w-0 flex-1"
                />
            </template>
            <template v-else>
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
            </template>
        </div>
        <!-- color-40 O-2 (his FORTIETH order: "the pallete before filling should
             be a proper shadow palette skeleton"): the instrument face is the
             DEVELOPED card's silhouette — the strip, the name row (the name's
             line box, the count, the menu's seat) and k daubs on the card's
             swatch band at the card's own seat — so empty, loading and developed
             are one box and the swap fills in place. -->
        <template v-if="instrument">
            <div class="shadow-head" data-slot="shadow-palette-head">
                <span class="shadow-head__text">
                    <span class="shadow-ink shadow-name font-display text-subheading" />
                    <span class="shadow-ink shadow-count text-mono-small" />
                </span>
                <span class="shadow-head__menu" />
            </div>
            <div class="swatch-band border-t border-seam px-3 pb-3 pt-3 flex flex-wrap gap-2 items-start">
                <span
                    v-for="i in count"
                    :key="i"
                    data-slot="shadow-palette-daub"
                    data-swatch="xl"
                    class="swatch-seat shadow-daub"
                >
                    <WatercolorDot color="var(--skeleton-ink)" :seed="`shadow-${i}`" class="shadow-ink w-full h-full" />
                </span>
            </div>
        </template>
        <!-- The metadata row — develops after the strip (the LOADING
             registers: Browse's collapsed card). -->
        <div v-else class="px-3 py-2.5 flex items-center gap-2">
            <Skeleton
                class="text-subheading h-[1lh] w-32 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.1}s` }"
            />
            <Skeleton
                class="text-subheading h-[1lh] w-6 rounded-md"
                :style="{ '--skeleton-shimmer-delay': `${count * 0.12 + 0.22}s` }"
            />
        </div>
        <!-- X·§0hm D-24 (N-17): the settled card is one name row at every
             width (tags and vote sit on it), so the silhouette is one row:
             the narrow card's second meta row and its stand-in are gone. -->
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
import { computed } from "vue";
import { Skeleton } from "@mkbabb/glass-ui";
import { WatercolorDot } from "./watercolor-dot";
import "./swatch-band.css";

/*
 * X.W12U.k (A2-VA-L1-13): the palette-ghost job has ONE component. The
 * former sibling `ShadowPalette.vue` is the `instrument` variant here — the
 * R12 species kept whole, not re-designed: Extract's standing k-threaded
 * undeveloped plate (`data-slot="shadow-palette"`, the o9 oracle's seat), the
 * genesis `ec1b200` register (card-true material, solid hairline, muted
 * cells; its meta blocks retired at X-DS pass 9, V9C-04). X-DS pass 8 (V3C-02, the X-DS
 * canon and addendum (a): no idle pulse on chrome that carries no state):
 * the LIVING staggered pulse is retired, so the face is static; X-DS value
 * pass 5 (P5C-03) leaves it an outline (hairline card + hairline seams).
 * Its semantics stay R7's: `aria-hidden`, NO role="status",
 * NO "Loading" label — nothing is loading, so a shimmering plate does not lie
 * to AT. It is not a LOADING register and never a filler: true-empty hosts
 * speak the EmptyState dot trio; error ≠ empty.
 */
const { count = 5, variant = "shadow", loading = false } = defineProps<{
    /** Segment count — Extract threads the LIVE k here. */
    count?: number;
    /** `shadow` | `developing` are the two LOADING registers (see the note
     *  above); `instrument` is the Extract instrument face (T.W6.5 · R12). */
    variant?: "shadow" | "developing" | "instrument";
    /** The instrument face's run is in flight: it breathes and announces. */
    loading?: boolean;
}>();
const instrument = computed(() => variant === "instrument");
/** Work is happening: the loading registers, or the instrument mid-run. */
const announces = computed(() => !instrument.value || loading);
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

/* color-40 O-2 (K2; supersedes X-DS value pass 5's outline face, P5C-03): the
 * instrument is the developed card's silhouette in the site's live-tinted
 * skeleton ink (`--skeleton-ink`, the one recipe at `.skeleton-ink-register`),
 * never a grey. The live-k segmentation is the card's own hairline
 * (`--card-edge`) between cells, in both schemes. */
.shadow-ink {
    background-color: var(--skeleton-ink);
}
.shadow-seg + .shadow-seg {
    border-inline-start: 1px solid var(--card-edge);
}

/* The name row, at the developed card's geometry: the name's padded line box
 * (PaletteSpecimen's head) beside the menu trigger's seat (the inspector's
 * `xs` icon button and its margins), centred, so the row is as tall as the
 * card's at every pointer. */
.shadow-head {
    display: flex;
    align-items: center;
}
.shadow-head__text {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-inline-size: 0;
    padding-block: 0.625rem;
    padding-inline-start: 0.75rem;
}
.shadow-name {
    display: block;
    block-size: 1lh;
    inline-size: min(8rem, 60%);
    border-radius: var(--radius-sm, 0.375rem);
}
.shadow-count {
    display: block;
    block-size: 1lh;
    inline-size: 1.5rem;
    border-radius: var(--radius-sm, 0.375rem);
}
.shadow-head__menu {
    flex: none;
    inline-size: var(--control-h-xs);
    block-size: var(--control-h-xs);
    margin-inline: 0.5rem 0.75rem;
}
.shadow-daub {
    display: block;
    flex: none;
    inline-size: var(--swatch-seat-final);
    block-size: var(--swatch-seat-final);
}

/* The known-imminent breath (D9's calibration: 0.55 to 0.75 on the standard
 * curve over a 6 s period), only while a run is in flight. Reduced motion
 * holds the face still at the trough. */
@keyframes shadow-breath {
    from {
        opacity: 0.75;
    }
    to {
        opacity: 0.55;
    }
}
.shadow-palette--loading .shadow-ink {
    animation: shadow-breath 3s var(--ease-standard) infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
    .shadow-palette--loading .shadow-ink {
        animation: none;
        opacity: 0.55;
    }
}

</style>
