<template>
    <!-- T.W3-2 · D9 — THE SHADOW-PALETTE STATE GRAMMAR, the TRUE-EMPTY
         species: wherever a surface's absent content is a palette, the empty
         state displays the ghost of the artifact to come, at the artifact's
         own scale, in ALL cases. Born `ec1b200` as "the shadow palette",
         amputated twice in S.W5-6 (`e43601c` + `a34d20f`), OWNER-OVERRULED
         on material (R7) — this species is the return.

         It consumes, never duplicates: the palette card's exact bones
         (strip → meta → swatches, the skeleton's geometry, so the
         known-imminent swap is a MATERIAL change, not a layout jump) + the
         S.W5-1 `specimen` ink walk (utils.css `.specimen-seg` — the
         zero-consumer register finally consumed), letting the ghost breathe
         the app's living accent without impersonating content.

         The dashed hairline is the load-bearing distinction — the ghost
         vocabulary lifted from dot to card scale (WatercolorDot ghost, the
         drop zone, `.dashed-well`): the skeleton is the card DEVELOPING
         (solid edge, animated ink); the shadow palette is the card IMAGINED
         (dashed edge, quiet ink, STILL — motion promises work, empty
         promises nothing; PRM safety by construction).

         Semantics — R7's SURVIVING half (F-5): the ghost is `aria-hidden`,
         carries NO role="status" and NO "Loading" label (nothing is
         loading); the host's seated caption carries the text for AT, and
         that caption sheds its dot-ghost row here (N-3 — never two ghost
         registers at two scales). Error states never wear this species:
         error ≠ empty stands. -->
    <div
        data-slot="shadow-palette"
        class="shadow-palette skeleton-ink-register rounded-card bg-well overflow-hidden shadow-cartoon-sm"
        aria-hidden="true"
    >
        <!-- The imagined color strip — the specimen walk, per-segment. The
             real strip is flush (its colors carry the segmentation); the
             ghost's segmentation is STRUCTURAL — a hairline of the well
             ground between segments, the same interrupted-edge grammar as
             the dashes — so the count stays legible (the live-k leg: turn
             k and the ghost visibly re-segments) while the walk itself
             remains a whisper. -->
        <div class="shadow-strip flex h-10 w-full">
            <div
                v-for="i in count"
                :key="i"
                class="specimen-seg shadow-seg h-full min-w-0 flex-1"
                :style="{ '--i': hueOffset + i - 1 }"
            />
        </div>
        <!-- The imagined metadata row. -->
        <div class="px-3 py-2.5 flex items-center gap-2">
            <div class="shadow-block h-5 w-32 rounded-md" />
            <div class="shadow-block h-5 w-6 rounded-md" />
        </div>
        <!-- The imagined swatches. -->
        <div class="px-3 pb-3 flex flex-wrap gap-2">
            <div
                v-for="i in count"
                :key="i"
                class="shadow-block w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-badge"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { count = 5, hueOffset = 0 } = defineProps<{
    /** Ghost segment/swatch count — Extract threads the LIVE k here, so the
     *  instrument shows its output shape before any image exists. */
    count?: number;
    /** Offset (in 36° steps) into the specimen walk — sibling ghosts
     *  continue the rotation instead of reading as copies. */
    hueOffset?: number;
}>();
</script>

<style scoped>
/* The card imagined. The dashed hairline reads the ONE `--card-edge` mint
 * (hairline law — the `.dashed-well` / drop-zone dashed family, lifted to
 * card scale); the body sits ON the rung-2 WELL (`bg-well`, Q4: PaletteCard
 * = well) with the chip-scale cartoon stamp — exactly the skeleton's seat,
 * so ghost → skeleton → card is one plate developing in place. STILL by
 * construction: this species declares NO animation anywhere (the O-9
 * MOTION leg asserts computed animation-name `none`). */
.shadow-palette {
    border: 1.5px dashed var(--card-edge);
}

/* Hairline segmentation — sized to the dash weight (one hairline grammar). */
.shadow-strip {
    gap: 1.5px;
}

/* Ghost ink: the strip segments read the specimen walk; the meta + swatch
 * blocks read the plain ink base — both faded INTO the plate by a color-mix
 * step (never post-hoc opacity, D6) so the ghost sits a register quieter
 * than the developing skeleton it swaps with. */
.shadow-seg {
    background: color-mix(
        in oklab,
        var(--specimen-ink, var(--skeleton-ink)) 72%,
        transparent
    );
}
.shadow-block {
    background: color-mix(in oklab, var(--skeleton-ink) 55%, transparent);
}
</style>
