<template>
    <!-- T.W6.5 · Lane S — THE SHADOW-PALETTE SPECIES, redesigned from first
         principles (R12: the owner overrule of the landed W3-2/D9 design;
         MANDATE §0.6 t33-audit-07/11 — "poorly designed and do not shimmer
         properly as a proper skeleton" · "The style we had many many
         versions ago, when the extract feature was first introduced, was
         closer to what we want").

         The GENESIS register, assayed directly (`ec1b200`, 2026-03-20 —
         t33-research §2.2): card-true material with a SOLID hairline edge;
         count equal-width muted cells, each `animate-pulse` on a staggered
         `animation-delay` — a LIVING cascading shimmer that travels the
         plate (strip → meta → swatches, one wave); meta blocks at 60/40,
         swatches at 30 of the muted ink. The dashed-edge still-species this
         replaces retired with R12; its as-filler deployment at the empty
         hosts died with it (TRUE EMPTY speaks the EmptyState dot trio —
         N-3 re-aimed).

         ONE seat: the standing INSTRUMENT face — Extract's k-threaded
         undeveloped plate, where the ghost is the instrument showing its
         output shape before any image exists (the live-k leg: turn k and
         the plate re-segments). The living register belongs HERE because
         the plate is a standing instrument face, not a filler; PRM degrades
         it static for free (`animate-pulse` rides the global
         prefers-reduced-motion guard, animations.css).

         Materials in TODAY'S grammar, not a xerox: the genesis `bg-card` +
         `border-border/50` reads as the developed PaletteCard's own ratified
         seat (Q4: PaletteCard = well) — `bg-well` + the solid `--card-edge`
         hairline + `rounded-card` + the chip-scale cartoon stamp — so
         ghost → skeleton → card stays ONE plate developing in place. The
         genesis `hsl(var(--muted))` block ink reads through the house's ONE
         loading-ink recipe (`--skeleton-ink`, utils.css — "the ec1b200
         register, modernized"), scheme-true through the muted tokens.

         Semantics — R7's SURVIVING stack (announcement, NOT motion): the
         ghost is `aria-hidden`, carries NO role="status" and NO "Loading"
         label (nothing is loading — a shimmering aria-hidden plate does not
         lie to AT); the host's seated caption carries the text. Error
         states never wear this species: error ≠ empty stands. -->
    <div
        data-slot="shadow-palette"
        class="shadow-palette skeleton-ink-register rounded-card border border-card-edge bg-well overflow-hidden shadow-cartoon-sm"
        aria-hidden="true"
    >
        <!-- The imagined color strip — count equal-width cells, the wave's
             leading edge (delay i × 0.12s). A hairline of the well ground
             between cells keeps the segmentation legible AT REST (the
             live-k readout survives PRM stillness); in motion the stagger
             makes each cell breathe in sequence. -->
        <div class="flex h-10 w-full gap-px">
            <div
                v-for="i in count"
                :key="i"
                class="shadow-seg animate-pulse h-full min-w-0 flex-1"
                :style="{ animationDelay: `${((i - 1) * 0.12).toFixed(2)}s` }"
            />
        </div>
        <!-- The imagined metadata row — the wave arrives after the strip. -->
        <div class="px-3 py-2.5 flex items-center gap-2">
            <div
                class="shadow-block-name animate-pulse h-5 w-32 rounded-md"
                :style="{ animationDelay: `${(count * 0.12 + 0.1).toFixed(2)}s` }"
            />
            <div
                class="shadow-block-count animate-pulse h-5 w-6 rounded-md"
                :style="{ animationDelay: `${(count * 0.12 + 0.22).toFixed(2)}s` }"
            />
        </div>
        <!-- The imagined swatches — the wave's last exposure pass. -->
        <div class="px-3 pb-3 flex flex-wrap gap-2">
            <div
                v-for="i in count"
                :key="i"
                class="shadow-swatch animate-pulse w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-badge"
                :style="{
                    animationDelay: `${(count * 0.12 + 0.34 + (i - 1) * 0.1).toFixed(2)}s`,
                }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { count = 5 } = defineProps<{
    /** Ghost segment/swatch count — Extract threads the LIVE k here, so the
     *  instrument shows its output shape before any image exists. */
    count?: number;
}>();
</script>

<style scoped>
/* The genesis ink ladder (`ec1b200`: strip = muted · meta = muted/60,/40 ·
 * swatches = muted/30), spoken through the ONE loading-ink recipe root
 * (`--skeleton-ink`, utils.css `.skeleton-ink-register`). E1-R2 (T.W8
 * remediation_1): that recipe now CERTIFIES the block as a bounded tone-step
 * of this plate's `bg-well` ground, so the "hairline of the well ground
 * between cells keeps the segmentation legible AT REST" contract (above) holds
 * in BOTH schemes — the dark seg-vs-well collapse (1.02:1) is dead; the strip
 * reads as BLOCKS whether the plate is light or dark. The ladder steps fade
 * INTO the plate by a color-mix step (never element opacity — D6); the pulse's
 * opacity swing is MOTION on top of the ink, not the ink itself. */
.shadow-seg {
    background: var(--skeleton-ink);
}
.shadow-block-name {
    background: color-mix(in oklab, var(--skeleton-ink) 60%, transparent);
}
.shadow-block-count {
    background: color-mix(in oklab, var(--skeleton-ink) 40%, transparent);
}
.shadow-swatch {
    background: color-mix(in oklab, var(--skeleton-ink) 30%, transparent);
}
</style>
