<script setup lang="ts">
/**
 * EasingSpecimenStrip (T.W6-3 / T-47) — the compact named-curve SELECTION
 * surface: one horizontal fading-scroll line of sparkline-portrait tiles,
 * family-grouped under mono eyebrows. The kf T.E6 specimen gallery
 * (EasingTarget.vue, assayed read-only) transposed to gradient-interval
 * scale: pressed tile IS the interval's curve; portraits are static
 * library-sampled sparklines; the strip strokes the interval's OWN ink
 * (`--motion-accent`, inherited from the specimen row).
 */
import { nextTick, useTemplateRef, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { FadingScroll } from "@mkbabb/glass-ui/fading-scroll";
import { ToggleChip } from "@mkbabb/glass-ui/toggle-chip";
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
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
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
                <span class="family-eyebrow" aria-hidden="true">{{ fam.family }}</span>
                <div class="family-tiles">
                    <ToggleChip
                        v-for="tile in fam.tiles"
                        :key="tile.id"
                        variant="cell"
                        class="specimen-tile"
                        :model-value="tile.id === selectedId"
                        :aria-label="tile.id"
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
                        <span class="tile-label">{{ tile.label }}</span>
                    </ToggleChip>
                </div>
            </div>
        </div>
    </FadingScroll>
</template>

<style scoped>
.strip-row {
    display: inline-flex;
    align-items: stretch;
    gap: 0.875rem;
    width: max-content;
    /* Headroom so pressed rings + overshoot portraits never clip against
       the fade-scroll mask edges (the kf specimen-grid padding rule). */
    padding: 2px;
}

/* Each family: a mono eyebrow over its tile trio — the kf family filter's
   information architecture folded INTO the strip (compactness: no second
   control row). A hairline rules the family off its neighbor. */
.strip-family {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.strip-family + .strip-family {
    border-left: 1px solid var(--card-edge);
    padding-left: 0.875rem;
}
.family-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.5625rem;
    line-height: 1;
    letter-spacing: 0.08em;
    color: var(--muted-foreground);
    opacity: 0.75;
}
.family-tiles {
    display: flex;
    gap: 0.25rem;
}

/* The tile: a micro cell — portrait over variant label. The producer
   ToggleChip cell recipe carries press/hover semantics + the pressed wash;
   the seat sizes it to specimen scale. */
.specimen-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
    padding: 0.3125rem 0.375rem 0.25rem;
    min-width: 2.75rem;
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

.tile-label {
    font-family: var(--font-mono);
    font-size: 0.5625rem;
    line-height: 1.2;
    text-transform: none; /* variant labels read as-cased (kf tile-name rule) */
    color: var(--muted-foreground);
    white-space: nowrap;
}

/* Selection: the portrait inks up in the interval's OWN accent; the label
   takes the tone (the kf data-state="on" rule, re-inked per specimen). */
.specimen-tile[data-state="on"] .tile-glyph path {
    stroke: var(--motion-accent, var(--foreground));
    stroke-width: 1.75;
}
.specimen-tile[data-state="on"] .tile-label {
    color: var(--motion-accent, var(--foreground));
    font-weight: 600;
}
.specimen-tile:hover .tile-label {
    color: var(--foreground);
}
</style>
