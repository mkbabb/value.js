<template>
    <!-- The card's meta cluster: tag chips + the vote control. (Provenance and
         history counts are the SPECIMEN's — X.W7.c moved them into
         `PaletteSpecimen.vue` with the name and the colour count.)

         X.W7.c (W7.md §5.c; G8/G9; A-20's ruled consumer interim):
         every tag is REACHABLE — the chips that fit render, the rest sit behind
         a `+N` chip that reveals the whole set (the `VersionHistoryDrawer`
         residue-mark idiom, made operable). How many chips fit is a DECLARED
         priority read from the card's own inline size (container `palette-card`
         on the card root) — composition, not masking; nothing is measured in
         JS and nothing is silently dropped. -->
    <!-- X·§0hm D-24: the root is `display: contents` (the Collapsible idiom
         PaletteInspector already uses), so its two cells are the CARD's grid
         cells: the tags (area `meta`) and the vote (area `vote`), both on the
         name row at every card width. -->
    <div class="palette-meta" @click.stop>
        <div v-if="tags.length > 0" class="palette-meta__tags">
        <span
            v-for="(tag, rank) in shownTags"
            :key="tag"
            data-tag-chip
            class="palette-meta__chip rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground truncate max-w-[9ch]"
            :class="`palette-meta__rank-${rank}`"
            :title="tag"
        >{{ tag }}</span>

        <Popover v-if="tags.length > 0" v-model:open="allTagsOpen">
            <PopoverTrigger as-child>
                <button
                    type="button"
                    data-tag-more
                    class="palette-meta__more rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground cursor-pointer shrink-0 hover:bg-accent"
                    :class="moreClasses"
                    :aria-label="`Show all ${tags.length} tags`"
                >
                    <span
                        v-for="band in bands"
                        :key="band.visible"
                        :class="`palette-meta__band palette-meta__band-${band.visible}`"
                    >{{ band.label }}</span>
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" class="w-auto max-w-64 p-2">
                <ul class="flex flex-wrap gap-1" :aria-label="`Tags of ${palette.name}`">
                    <li
                        v-for="tag in tags"
                        :key="tag"
                        data-tag-all
                        class="rounded-full bg-muted/60 px-1.5 py-0.5 text-micro text-muted-foreground"
                    >{{ tag }}</li>
                </ul>
            </PopoverContent>
        </Popover>
        </div>

        <!-- Vote count. SS-8 B10 (SS8-0288): the button speaks the count's
             rung itself, so its box is not sized by the meta row's inherited
             body size. -->
        <button
            v-if="!palette.isLocal"
            class="palette-meta__vote flex items-center gap-1 px-1.5 py-0.5 text-mono-small rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
            :aria-label="`${palette.voteCount ?? 0} votes, click to vote`"
            @click.stop="emit('vote', palette)"
        >
            <Heart
                class="w-3.5 h-3.5 transition-colors"
                :class="palette.voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'"
            />
            <span class="text-mono-small text-muted-foreground" :title="votes.title">{{ votes.text }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, onDeactivated, ref } from "vue";
import { Heart } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
import type { Palette } from "../types";
import { formatCount } from "../../color-session/format-color";

const { palette } = defineProps<{ palette: Palette }>();

const emit = defineEmits<{ vote: [palette: Palette] }>();

/** The declared chip budget per width band (see the container rules below):
 *  band k shows the first k chips. MAX_CHIPS is the widest band's budget. */
const MAX_CHIPS = 3;

const tags = computed(() => palette.tags ?? []);
const shownTags = computed(() => tags.value.slice(0, MAX_CHIPS));
const allTagsOpen = ref(false);
// A2-VA-L2-11 — a popup never outlives its pane (shell/usePanePopups.ts): close on deactivate.
onDeactivated(() => {
    allTagsOpen.value = false;
});

/** X.W7.f · G17 — the count reads compact (`12.3k`); `title` keeps it exact. */
const votes = computed(() => formatCount(palette.voteCount ?? 0));

/** One label per band — the count of tags that band leaves unrendered. After a
 *  real chip it reads `+N`; in band 0 nothing precedes it, so the count carries
 *  its noun (`2 tags`) instead of a bare `+2` (X-DS pass 6 · VC6-01). */
const bands = computed(() =>
    Array.from({ length: MAX_CHIPS + 1 }, (_, visible) => {
        const hidden = tags.value.length - Math.min(visible, tags.value.length);
        const label =
            hidden === 0 ? "" : visible === 0 ? `${hidden} ${hidden === 1 ? "tag" : "tags"}` : `+${hidden}`;
        return { visible, hidden, label };
    }),
);

/** In a band that renders every tag the `+N` chip has nothing to reveal. */
const moreClasses = computed(() =>
    bands.value.filter((b) => b.hidden === 0).map((b) => `palette-meta__more--none-${b.visible}`),
);
</script>

<style scoped>
/* The meta cluster yields before the specimen's head does: it never grows,
 * and it clips rather than widen the card (the G9 backstop). */
.palette-meta {
    display: contents;
}
.palette-meta__tags {
    grid-area: meta;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-inline-size: 0;
    overflow: hidden;
    margin-inline-start: 0.5rem;
}
.palette-meta__vote {
    grid-area: vote;
    position: relative;
    margin-inline-start: 0.5rem;
}
/* X·§0hm D-31 — the vote's TARGET meets the coarse-pointer floor while its
 * painted pill keeps its 38×24 size: glass's corner-affordance idiom
 * (dissolve.css, G-COARSE-TARGET), a transparent child inset negatively to
 * `--touch-target` on each axis it falls short on. */
@media (pointer: coarse) {
    .palette-meta__vote::after {
        content: "";
        position: absolute;
        inset-block: min(0px, calc((100% - var(--touch-target, 2.75rem)) / 2));
        /* inline, the whole shortfall grows toward the name: the card's actions
         * abut the pill's end and own their own 44 px targets. */
        inset-inline: min(0px, calc(100% - var(--touch-target, 2.75rem))) 0;
    }
}

/* The declared priority — width bands of the CARD (container `palette-card`).
 * X·§0hm D-24: the cluster shares the name row at every card width (below
 * 30rem it used to take a row of its own), so the bands are the head row's:
 * a 9ch chip is ~4.5rem, and from 30rem of card one chip fits beside the
 * name, two from 36rem, three from 42rem. Below 30rem no chip renders and
 * the reveal carries its noun (`2 tags`); every tag stays reachable.
 *   band 0  < 30rem      no chip · `N tags`
 *   band 1  30–36rem     1 chip  · `+N`
 *   band 2  36–42rem     2 chips · `+N`
 *   band 3  ≥ 42rem      3 chips · `+N`
 * Exactly one label renders per band. */
.palette-meta__chip,
.palette-meta__band {
    display: none;
}
@container palette-card (width < 30rem) {
    .palette-meta__band-0 { display: inline; }
    .palette-meta__more--none-0 { display: none; }
}
@container palette-card (30rem <= width < 36rem) {
    .palette-meta__band-1 { display: inline; }
    .palette-meta__more--none-1 { display: none; }
}
@container palette-card (36rem <= width < 42rem) {
    .palette-meta__band-2 { display: inline; }
    .palette-meta__more--none-2 { display: none; }
}
@container palette-card (width >= 42rem) {
    .palette-meta__band-3 { display: inline; }
    .palette-meta__more--none-3 { display: none; }
}
@container palette-card (width >= 30rem) {
    .palette-meta__rank-0 { display: inline-block; }
}
@container palette-card (width >= 36rem) {
    .palette-meta__rank-1 { display: inline-block; }
}
@container palette-card (width >= 42rem) {
    .palette-meta__rank-2 { display: inline-block; }
}
</style>
