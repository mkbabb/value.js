<template>
    <!-- X.W7.c (W7.md §5.c; G12) — the palette SPECIMEN: strip + name + counts,
         props-only. No emit, no port, no control: a specimen renders a
         palette's truth and owns none of its mutations (those stay with the
         host — the card today, the entity inspector at X.W7.d).

         `display: contents` — the specimen contributes its two parts (the
         strip and the head) straight to the HOST's layout, so a host can seat
         its own controls in the head's row without the specimen's subtree
         containing a single interactive descendant. -->
    <div class="palette-specimen" data-palette-specimen>
        <PaletteColorStrip
            class="palette-specimen__strip"
            :colors="palette.colors"
            :orientation="layout === 'aside' ? 'vertical' : 'horizontal'"
        />
        <!-- The head is its own inline-size container: its children's collapse
             priority reads the width the host gives it, in any host (A-20's
             ruled consumer interim — container queries + min-inline-size: 0 +
             declared priority; composition, not masking). -->
        <div class="palette-specimen__head">
            <!-- Priority 1 (last to yield): the name. Truncates, never zero. -->
            <span
                data-palette-name
                class="palette-specimen__name font-display font-medium text-subheading"
                :title="palette.name"
            >{{ palette.name }}</span>
            <!-- S.W7-7: the featured badge's gold TEXT shimmer consumes the
                 producer's ONE metal register (glass-ui `.gold-shimmer`).
                 Priority 3: the label yields before the mark. -->
            <Badge
                v-if="palette.tier === 'featured'"
                variant="outline"
                class="featured-badge gold-shimmer text-mono-small shrink-0 gap-1 border-gold"
            >
                <span class="featured-badge__icon inline-flex" title="Featured">
                    <Award class="w-3 h-3" aria-hidden="true" />
                </span>
                <span class="palette-specimen__yield-3">Featured</span>
            </Badge>
            <!-- Priority 2: the colour count — the N every fixture asserts. -->
            <Badge variant="secondary" class="text-mono-small shrink-0">
                <span
                    data-count="colors"
                    :title="`${palette.colors.length} color${palette.colors.length === 1 ? '' : 's'}`"
                >{{ palette.colors.length }}</span>
            </Badge>
            <!-- Priority 4 (first to yield): provenance + history counts. -->
            <span
                v-if="palette.forkOf"
                class="palette-specimen__yield-4 items-center text-micro text-muted-foreground shrink-0"
                :title="`Remixed from ${palette.forkOf}`"
            >
                <GitFork class="w-3 h-3" aria-hidden="true" />
            </span>
            <span
                v-if="(palette.forkCount ?? 0) > 0"
                class="palette-specimen__yield-4 items-center gap-0.5 text-micro text-muted-foreground shrink-0"
                data-count="forks"
                :title="`${palette.forkCount} remix${palette.forkCount === 1 ? '' : 'es'}`"
            >
                <GitFork class="w-3 h-3" aria-hidden="true" />
                <span class="fira-code">{{ palette.forkCount }}</span>
            </span>
            <span
                v-if="(palette.versionCount ?? 0) > 1"
                class="palette-specimen__yield-4 items-center gap-0.5 text-micro text-muted-foreground shrink-0"
                data-count="versions"
                :title="`${palette.versionCount} versions`"
            >
                <History class="w-3 h-3" aria-hidden="true" />
                <span class="fira-code">{{ palette.versionCount }}</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Award, GitFork, History } from "@lucide/vue";
import { Badge } from "../../../ui/badge";
import type { Palette } from "../../types";
import PaletteColorStrip from "./PaletteColorStrip.vue";

const { palette, layout = "default" } = defineProps<{
    palette: Palette;
    /** "default" = strip on top; "aside" = vertical strip on the left. */
    layout?: "default" | "aside";
}>();
</script>

<style scoped>
.palette-specimen {
    display: contents;
}
/* The strip carries its own corners (the host does not clip — S.W5-10: a
 * card-level radius clip rasterizes 1-bit). */
.palette-specimen__strip {
    grid-area: strip;
    align-self: stretch;
    --strip-r: var(--radius-card);
}
.palette-specimen__strip[data-orientation="horizontal"] {
    border-start-start-radius: var(--strip-r);
    border-start-end-radius: var(--strip-r);
}
.palette-specimen__strip[data-orientation="vertical"] {
    border-start-start-radius: var(--strip-r);
    border-end-start-radius: var(--strip-r);
}

/* The head row. `min-inline-size: 0` + `overflow: hidden` are the backstop —
 * the declared priority below is the design; the clip only guarantees the
 * row can never widen its host (G9). */
.palette-specimen__head {
    grid-area: head;
    container: specimen-head / inline-size;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-inline-size: 0;
    overflow: hidden;
    padding-block: 0.625rem;
    padding-inline-start: 0.75rem;
}

/* Priority 1 — the name shrinks, truncates, and keeps a floor. */
.palette-specimen__name {
    flex: 0 1 auto;
    min-inline-size: min(5rem, 100%);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Priority 4 yields first, priority 3 next; the colour count (2) and the
 * name (1) always stay. Thresholds are the head's own inline size. */
.palette-specimen__yield-4 {
    display: none;
}
.palette-specimen__yield-3 {
    display: none;
}
@container specimen-head (min-width: 16rem) {
    .palette-specimen__yield-3 {
        display: inline;
    }
}
@container specimen-head (min-width: 20rem) {
    .palette-specimen__yield-4 {
        display: inline-flex;
    }
}

/* S.W7-7 (god-module census §2.2): the badge's gold text shimmer is the
 * producer's `.gold-shimmer` metal register; this block keeps only what the
 * register doesn't own — the outline hue and the icon ink. (Moved here from
 * PaletteCard.vue with the badge, X.W7.c.) */
.featured-badge {
    border-color: var(--color-gold);
}
.featured-badge__icon svg {
    stroke: var(--color-gold);
    filter: drop-shadow(0 0 1px color-mix(in srgb, var(--color-gold) 40%, transparent));
}
</style>
