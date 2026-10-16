<template>
    <div
        :data-slot="instrument ? 'shadow-palette' : 'palette-card-skeleton'"
        class="skeleton-ink-register rounded-card border border-card-edge overflow-hidden"
        :class="instrument ? 'shadow-palette' : 'bg-well'"
        :role="instrument ? undefined : 'status'"
        :aria-label="instrument ? undefined : 'Loading palette'"
        :aria-hidden="instrument ? 'true' : undefined"
    >
        <!-- The strip — the plate develops left to right. X-DS pass 8
             (V3C-02): the instrument face is STILL. Nothing is loading at
             Extract's empty rest, so an idle pulse said "loading" where the
             truth is "empty"; motion stays on the loading registers below.
             X-DS value pass 5 (P5C-03): the instrument face is an OUTLINE —
             the card's one hairline and a hairline between its k cells, no
             well ground and no fill step — so the shape of the result reads
             without a filled slab waiting for content. -->
        <div class="flex h-10 w-full">
            <template v-if="instrument">
                <div
                    v-for="i in count"
                    :key="i"
                    data-slot="shadow-palette-cell"
                    class="shadow-seg h-full min-w-0 flex-1"
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
        <!-- The metadata row — develops after the strip. LOADING registers
             only: X-DS pass 9 (V9C-04) drops it from the instrument face,
             whose two blank slabs (a fake name, a fake count) changed with
             nothing and only mimicked a loading card. The k cells carry the
             instrument's meaning. -->
        <div v-if="!instrument" class="px-3 py-2.5 flex items-center gap-2">
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
        <div v-if="!instrument" class="skeleton-meta-row" aria-hidden="true">
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
import { computed } from "vue";
import { Skeleton } from "@mkbabb/glass-ui";

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
const { count = 5, variant = "shadow" } = defineProps<{
    /** Segment count — Extract threads the LIVE k here. */
    count?: number;
    /** `shadow` | `developing` are the two LOADING registers (see the note
     *  above); `instrument` is the Extract instrument face (T.W6.5 · R12). */
    variant?: "shadow" | "developing" | "instrument";
}>();
const instrument = computed(() => variant === "instrument");
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

/* X-DS value pass 5 (P5C-03): the idle instrument carries no state, so its
 * cells take no fill step (light: the heaviest-toned block in the card; dark:
 * a pill whose seams were lost). The live-k segmentation is the card's own
 * hairline (`--card-edge`) between cells, in both schemes. */
.shadow-seg + .shadow-seg {
    border-inline-start: 1px solid var(--card-edge);
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
