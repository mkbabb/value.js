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
    <div class="palette-meta" @click.stop>
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
                    >{{ band.hidden > 0 ? `+${band.hidden}` : "" }}</span>
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

        <!-- Vote count -->
        <button
            v-if="!palette.isLocal"
            class="flex items-center gap-1 px-1.5 py-0.5 rounded-sm hover:bg-accent active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
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
import { computed, ref } from "vue";
import { Heart } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../ui/popover";
import type { Palette } from "../../../types";
import { formatCount } from "../../../../color-session/format-color";

const { palette } = defineProps<{ palette: Palette }>();

const emit = defineEmits<{ vote: [palette: Palette] }>();

/** The declared chip budget per width band (see the container rules below):
 *  band k shows the first k chips. MAX_CHIPS is the widest band's budget. */
const MAX_CHIPS = 3;

const tags = computed(() => palette.tags ?? []);
const shownTags = computed(() => tags.value.slice(0, MAX_CHIPS));
const allTagsOpen = ref(false);

/** X.W7.f · G17 — the count reads compact (`12.3k`); `title` keeps it exact. */
const votes = computed(() => formatCount(palette.voteCount ?? 0));

/** One `+N` label per band — the count of tags that band leaves unrendered. */
const bands = computed(() =>
    Array.from({ length: MAX_CHIPS + 1 }, (_, visible) => ({
        visible,
        hidden: tags.value.length - Math.min(visible, tags.value.length),
    })),
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
    grid-area: meta;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-inline-size: 0;
    overflow: hidden;
    margin-inline-start: 0.5rem;
}

/* The declared priority — width bands of the CARD (container `palette-card`):
 *   band 0  < 30rem   no chip  · `+N` = every tag
 *   band 1  30–36rem  1 chip
 *   band 2  36–42rem  2 chips
 *   band 3  ≥ 42rem   3 chips
 * Chip k renders from band k+1 up; exactly one `+N` label renders per band. */
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
