<script setup lang="ts">
/**
 * EasingSpecimenStrip (T.W6-3 / T-47) — the compact named-curve SELECTION
 * surface: one horizontal fading-scroll line of sparkline-portrait tiles,
 * family-grouped under mono family labels. The kf T.E6 specimen gallery
 * (EasingTarget.vue, assayed read-only) transposed to gradient-interval
 * scale: pressed tile IS the interval's curve; portraits are static
 * library-sampled sparklines; the strip strokes the interval's OWN ink
 * (`--motion-accent`, inherited from the specimen row).
 */
import { nextTick, useTemplateRef, watch } from "vue";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import { Chip } from "@mkbabb/glass-ui/chip";
import { useReducedMotion } from "@mkbabb/glass-ui/motion-core";
import { SPECIMEN_FAMILIES } from "./easingCatalogue";
import type { SpecimenTile } from "./easingCatalogue";

const { selectedId, visible = true } = defineProps<{
    /** The pressed tile id (literal-identity match) — null = custom. */
    selectedId: string | null;
    /** Whether the host row is revealed (v-show) — a hidden strip has no
     *  boxes to scroll; the reveal re-kicks the pressed tile into view. */
    visible?: boolean;
}>();

const emit = defineEmits<{
    select: [tile: SpecimenTile];
}>();

// Single-select, owner-controlled: pressing selects; pressing the pressed
// tile again is a no-op (the controlled :model-value keeps it pressed — an
// interval always has a curve). The kf onTileToggle rule, verbatim.
function onTileToggle(tile: SpecimenTile, on: boolean) {
    if (on) emit("select", tile);
}

// The family heading in sentence case (X-DS value pass 14, V14C-02): "CSS"
// is an acronym, every other family is a word ("Sine", "Back", "Steps").
function familyName(family: string): string {
    return family === "css" ? "CSS" : family.charAt(0).toUpperCase() + family.slice(1);
}

// The selected specimen stays in view: on selection AND on reveal the
// pressed tile scrolls to its nearest edge — scoped to THIS strip's own
// subtree (sibling rows mount hidden twins of every data-specimen id) AND
// to the strip's OWN inline axis. Never `scrollIntoView`: even with
// `block: "nearest"` it walks EVERY scrollable ancestor, so the strip's
// mount-time reveal (below the fold) yanked the PANE's vertical scroll
// ~95px and buried the hero plate under the sticky header — the O-19
// desktop flat-netting root cause. The strip owns exactly one scroll axis
// (the FadingScroll port); it writes scrollLeft on that port and nothing
// else, so the page can never yank by construction.
// The ONE reduced-motion read: the producer's shared preference (one
// MediaQueryList listener for the whole app), never a local media query
// (X-W6 · X.W6.e — e2, fold W6·150: "the producer door already exists").
const prefersReducedMotion = useReducedMotion();
const rowEl = useTemplateRef<HTMLElement>("rowEl");

watch(
    () => [selectedId, visible] as const,
    () => {
        if (!visible || selectedId === null) return;
        void nextTick(() => {
            const el = rowEl.value?.querySelector<HTMLElement>(
                `[data-specimen="${selectedId}"]`,
            );
            // The FadingScroll root IS the scroll port (its documented DOM
            // contract) — the ONE element this reveal may scroll.
            const port = el?.closest<HTMLElement>(".fading-scroll");
            if (!el || !port) return;
            const pr = port.getBoundingClientRect();
            const er = el.getBoundingClientRect();
            // Nearest-edge semantics on the inline axis, by hand.
            const dx =
                er.left < pr.left
                    ? er.left - pr.left
                    : er.right > pr.right
                      ? er.right - pr.right
                      : 0;
            if (dx !== 0) {
                port.scrollBy({
                    left: dx,
                    behavior: prefersReducedMotion.value ? "auto" : "smooth",
                });
            }
        });
    },
    { immediate: true },
);
</script>

<template>
    <FadingScroll axis="x" class="specimen-strip">
        <div
            ref="rowEl"
            class="strip-row"
            role="group"
            aria-label="Easing curve specimens"
        >
            <div
                v-for="fam in SPECIMEN_FAMILIES"
                :key="fam.family"
                class="strip-family"
            >
                <span class="family-eyebrow" aria-hidden="true">{{ familyName(fam.family) }}</span>
                <div class="family-tiles">
                    <div
                        v-for="tile in fam.tiles"
                        :key="tile.id"
                        class="specimen-cell"
                    >
                        <Chip
                            mode="selectable"
                            shape="icon"
                            class="specimen-tile"
                            :model-value="tile.id === selectedId"
                            :aria-label="tile.id"
                            :title="tile.id"
                            :data-specimen="tile.id"
                            @update:model-value="(on: boolean) => onTileToggle(tile, on)"
                        >
                            <svg
                                class="tile-glyph"
                                viewBox="0 0 1 1"
                                aria-hidden="true"
                            >
                                <path :d="tile.glyph" vector-effect="non-scaling-stroke" />
                            </svg>
                        </Chip>
                        <span class="tile-label" aria-hidden="true">{{ tile.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </FadingScroll>
</template>

<style scoped>
/* The port is the query container: the strip's layout follows the pane's
   width, not the viewport's (V15C-03). */
.specimen-strip {
    container-type: inline-size;
}
.strip-row {
    /* The one gap between families, read by the hairline below (it is drawn
       in the middle of this gap). */
    --family-gap: 1.75rem;
    display: inline-flex;
    align-items: stretch;
    column-gap: var(--family-gap);
    row-gap: 0.625rem;
    width: max-content;
    /* Headroom so pressed rings + overshoot portraits never clip against
       the fade-scroll mask edges (the kf specimen-grid padding rule). */
    padding: 2px;
}
/* X-DS value pass 15 (V15C-03): where the pane can hold more than one family
   per line, the whole catalogue shows at once (a single 1480px row hid 6 of 8
   families behind a cue-less horizontal scroll). The narrow seat keeps the one
   scrolling line.
   X-DS value pass 16 (V16C-02): the wrapped families sit on ONE grid of shared
   tracks, not a flex-wrap, so every family head and its hairline share a
   column down the strip. A track holds the widest family below CSS (Cubic's
   four tiles); CSS's five take two tracks. The threshold is two tracks, one
   gap and the 2px headroom each side (2 x 12.5rem + 1.25rem + 4px), so the
   grid never falls to one column. */
@container (min-width: 26.5rem) {
    .strip-row {
        --family-gap: 1.25rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
        width: auto;
        /* Clips only the hairline of a family that opens a line: it sits in
           the gap, outside the 2px headroom. */
        overflow: clip;
    }
    .strip-family:first-child {
        grid-column: span 2;
    }
}

/* Each family: a family heading over its tile trio — the kf family filter's
   information architecture folded INTO the strip (compactness: no second
   control row). A hairline, centred in the gap, rules the family off its
   neighbour on the same line. */
.strip-family {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.strip-family + .strip-family::before {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline-start: calc(var(--family-gap) / -2 - 0.5px);
    border-inline-start: 1px solid var(--card-edge);
}
/* X-DS value pass 14 (V14C-02): the family heading and the tile names sit on
   the scale's caption rung (the route title's), in the certified de-emphasis
   ink. The kf gallery's 9px tracked mono eyebrow, dimmed by opacity, is
   retired: de-emphasis rides `--ink-muted`, never alpha (T.W4-4). */
.family-eyebrow,
.tile-label {
    font-size: var(--text-caption);
    line-height: 1.2;
    color: var(--ink-muted, var(--muted-foreground));
}
.family-tiles {
    display: flex;
    /* Not `stretch`: a stretched cross-size is definite and overrides the
       icon shape's aspect-square, which is what made a circle a 44×40 oval. */
    align-items: flex-start;
    gap: 0.25rem;
}

/* The cell: the disc, then its name under it, so the disc holds only the
   curve (V14C-02). The producer Chip
   (mode="selectable") carries press/hover semantics + the pressed wash; the
   seat sizes it to specimen scale. Its SHAPE is the glass icon circle
   (`shape="icon"`, aspect-square), chosen ONCE for every tile (X-W6 · X.W6.d —
   d1): the `cell` shape resolved to a capsule, so a 45px-wide tile beside a
   44px one read as a stadium beside a circle. */
.specimen-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
}
.specimen-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    /* The seat's size for the circle: both axes, so the icon shape's
       aspect-square is honoured at the specimen scale (a 44px target). */
    inline-size: 2.75rem;
    block-size: 2.75rem;
    padding: 0.25rem;
}

/* The portrait: unit-box sparkline, faint resting ink; overshoot curves
   (the back family) draw past the box — visible, never clipped (the kf
   18%-headroom rule carried by padding + visible overflow). */
.tile-glyph {
    inline-size: 1.375rem;
    block-size: 1.375rem;
    overflow: visible;
}
.tile-glyph path {
    fill: none;
    /* Resting portrait ink (P8-R2): 45% floated the sparkline under the
       WCAG 1.4.11 3:1 graphics floor (~2.6:1, both schemes) — the gallery's
       recognize-a-curve-by-its-shape thesis went faint. 65% clears 3:1 in
       both schemes while staying visibly de-emphasized under the pressed
       state (which inks to the full --motion-accent at a heavier weight). */
    stroke: color-mix(in oklab, var(--foreground) 65%, transparent);
    stroke-width: 1.25;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* Variant names read as-cased: they are the CSS keyword fragments
   (`ease`, `in-out`), the literal's own spelling (kf tile-name rule). */
.tile-label {
    white-space: nowrap;
}

/* Selection: the portrait inks up in the interval's OWN accent; the label
   takes the tone (the kf data-state="on" rule, re-inked per specimen). */
.specimen-tile[data-state="on"] .tile-glyph path {
    stroke: var(--motion-accent, var(--foreground));
    stroke-width: 1.75;
}
.specimen-cell:has(> .specimen-tile[data-state="on"]) .tile-label {
    color: var(--motion-accent, var(--foreground));
    font-weight: 600;
}
.specimen-cell:has(> .specimen-tile:hover) .tile-label {
    color: var(--foreground);
}
</style>
