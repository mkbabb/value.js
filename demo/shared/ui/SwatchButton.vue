<!-- SERVED MODEL: claude-opus-5-5 -->
<template>
    <!-- A2-VA-L1-15 — THE ONE SWATCH-WITH-A-VERB. A colour you can press is a
         glass `Button` (text emphasis, icon-only) whose face is the
         WatercolorDot: glass's WatercolorDot is paint only (inheritAttrs:false,
         pointer-events:none), so the verb lives on the Button and the dot fills
         it (X.W12.u2, UIA-V-40/41/43). The SIZE is a token, never a per-host
         class string; the VERB is the host's (`aria-label`, `title`, `@click`
         fall through to the Button, and a PopoverTrigger `as-child` merges its
         handlers the same way — SwatchHoverMenu composes this as its trigger);
         the FEEDBACK is one prop: `done` lays the check over the face in the
         swatch's own contrast ink (X-DS pass 1, V1C-11). The keyboard's focus
         ring is the glass Button's own, a rounded rectangle round the organic
         edge; this file adds none. A ring that follows the paint's silhouette
         is glass's to give (asked, with the press plate behind an icon-only
         face and the 1:1 icon-only seat). -->
    <Button
        emphasis="text"
        icon-only
        data-color-surface
        :data-swatch="size"
        class="swatch-button relative shrink-0 cursor-pointer"
    >
        <!-- The paper chip (owner 2026-11-10, "containers, like a watercolor
             swatch"): with `chip`, the paint sits inset on a paper card
             (`.swatch-chip`, utils.css). The dot inside is unchanged. -->
        <component
            :is="chip ? 'span' : Bare"
            :class="chip && 'swatch-chip paper-grain-overlay'"
        >
            <WatercolorDot
                :color="color"
                :variant="ghost ? 'ghost' : 'solid'"
                v-bind="seed !== undefined ? { seed } : {}"
                :animate="animate"
                class="w-full h-full"
            />
        </component>
        <Check
            v-if="done"
            class="absolute w-4 h-4 pointer-events-none"
            :class="chip && 'z-[2]'"
            :style="{ color: contrastInkFor(color) ?? 'var(--foreground)' }"
            aria-hidden="true"
        />
    </Button>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from "vue";
import { Check } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import { WatercolorDot } from "./watercolor-dot";
import { contrastInkFor } from "../../color-session/ink";

/** The swatch size tokens — the seats the app measures a swatch at:
 *  `sm` a dense add grid (Mix), `md` a palette card, `lg` the Current Palette
 *  row, `xl` the Extract result, and `fill` a RESULT row whose cells share the
 *  row's width (the Generate plate; X-DS pass 9, V9C-07: the result leads its
 *  plate). A `fill` cell grows from the `md` floor to a 5rem cap, square, and
 *  a long palette wraps at the floor. `fluid` is a seat the host sizes by
 *  `--swatch-size` (the embed's one-line strip: the dots shrink with the row,
 *  never wrap; owner 2026-11-11). Each token is ONE length, read on both axes
 *  through glass's own `--button-size` (the scoped style below). */
export type SwatchSize = "sm" | "md" | "lg" | "xl" | "fill" | "fluid";

/** No wrapper: the dot alone, as every unchipped swatch has it. */
const Bare: FunctionalComponent = (_, { slots }) => slots.default?.();
Bare.inheritAttrs = false;

const {
    color,
    size = "md",
    seed,
    ghost = false,
    done = false,
    animate = false,
    chip = false,
} = defineProps<{
    color: string;
    size?: SwatchSize;
    /** The organic edge's seed; omit to let the dot seed from its colour. */
    seed?: string;
    /** The glass ghost silhouette — a placeholder / being-edited slot. */
    ghost?: boolean;
    /** The verb's verdict: lays the check over the face. */
    done?: boolean;
    /** The dot's living register: its seeded compositor wobble (still under
     *  reduced motion). Off by default; a host that shows colours as specimens
     *  (the embed's picker slice) turns it on. */
    animate?: boolean;
    /** Seats the dot inset on a paper chip, the watercolour swatch card. Off
     *  by default; the embed's slices turn it on. */
    chip?: boolean;
}>();
</script>

<style scoped>
/* The host's seat (color-40 L-1): ONE length per size token, set as glass's
   own `--button-size`, which glass's icon-only Button reads for its inline
   size, its block size AND its `min-block-size`. A swatch is square at every
   pointer: per-axis size classes let the coarse `min-block-size` (the control
   rung times glass's coarse scale) stretch the block axis, so a phone drew
   44x66 and 56x60 ovals and a desk's Mix grid 32x36. On a coarse pointer no
   seat is under the 44 px touch target; the host sizes a `fluid` seat. */
.swatch-button {
    --button-size: var(--swatch-seat);
}
.swatch-button[data-swatch="sm"] {
    --swatch-seat: 2rem;
}
.swatch-button[data-swatch="md"],
.swatch-button[data-swatch="fill"] {
    --swatch-seat: 2.25rem;
}
.swatch-button[data-swatch="lg"] {
    --swatch-seat: 2.75rem;
}
.swatch-button[data-swatch="xl"] {
    --swatch-seat: 3rem;
}
@media (min-width: 40rem) {
    .swatch-button[data-swatch="md"],
    .swatch-button[data-swatch="fill"] {
        --swatch-seat: 2.5rem;
    }
    .swatch-button[data-swatch="lg"] {
        --swatch-seat: 3rem;
    }
    .swatch-button[data-swatch="xl"] {
        --swatch-seat: 3.5rem;
    }
}
.swatch-button[data-swatch="fluid"] {
    --swatch-seat: var(--swatch-size, 3rem);
}
@media (pointer: coarse) {
    .swatch-button:not([data-swatch="fluid"]) {
        --button-size: max(var(--swatch-seat), var(--touch-target, 2.75rem));
    }
}
/* A `fill` cell takes the row's share: it grows from its seat to a 5rem cap
   and stays square by its ratio, never by a second axis length. */
.swatch-button[data-swatch="fill"] {
    flex: 1 1 0;
    inline-size: auto;
    block-size: auto;
    min-block-size: 0;
    min-inline-size: var(--button-size);
    max-inline-size: 5rem;
    aspect-ratio: 1;
}

/* The paint (color-40 L-2 to L-4, his FORTIETH order: "a slight border, a bit
   more depth, and animate on click/hover like a subtle watercolour").
   - The rim: the dried edge of the paint, 1 px of its own colour stepped 15 %
     toward the foreground (so a navy still parts from a dark plate), riding
     the seeded silhouette under the dot's wet-edge filter; 24 % while wet.
   - The stamp: the house voice at its own small rung, one hard offset cast
     down-right with zero blur, 2 px (3 px on the two large seats); the
     shadow ink at 20 % in light, black at 40 % in dark so it stays darker
     than the band it falls on. It never moves on a press.
   - One wet number, the larger of the hover (0 to 1 on the dot's 0.6 s clock,
     fine pointers only) and glass's press (`--glass-btn-press-t`, which the
     Button writes on every spring frame and every pointer, a touch
     included). It scrubs the reshape between the dot's two seeded outlines
     and deepens the rim. No `:active`, no script of ours.
   A ghost (a placeholder slot) keeps its own dashed silhouette. */
@property --swatch-hover {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
}
.swatch-button {
    --swatch-stamp: 2px;
    --swatch-stamp-ink: color-mix(in srgb, var(--shadow-color) 20%, transparent);
}
.swatch-button[data-swatch="xl"],
.swatch-button[data-swatch="fill"] {
    --swatch-stamp: 3px;
}
:global(.dark) .swatch-button {
    --swatch-stamp-ink: rgb(0 0 0 / 0.4);
}
.swatch-button :deep(.watercolor-swatch[data-variant="solid"]) {
    --watercolor-wet: max(var(--swatch-hover), var(--glass-btn-press-t, 0));
    border: 1px solid
        color-mix(in oklab, var(--watercolor-color), var(--foreground) calc(15% + 9% * var(--watercolor-wet)));
    border-radius: var(--watercolor-radius-wet, var(--watercolor-radius));
    box-shadow: var(--swatch-stamp) var(--swatch-stamp) 0 0 var(--swatch-stamp-ink);
    /* The outline follows the wet number frame by frame, so the radius has no
       transition of its own; the hover's clock is the number's. */
    transition:
        transform var(--duration-fast) var(--ease-standard),
        scale var(--duration-fast) var(--ease-standard),
        --swatch-hover 0.6s var(--ease-standard),
        filter var(--duration-fast) var(--ease-standard);
}

/* The hover (the original's): the paint swells to 1.06 on its 0.2 s clock and
   wets on the 0.6 s one. `scale` is a transform, so the button, its row and
   its neighbours keep their boxes to the pixel. Fine pointers only, so a tap
   does not latch it. */
@media (hover: hover) {
    .swatch-button:hover :deep(.watercolor-swatch) {
        --swatch-hover: 1;
        scale: 1.06;
    }
}

/* Reduced motion: the rim's tone alone; the outline and the size hold. */
@media (prefers-reduced-motion: reduce) {
    .swatch-button :deep(.watercolor-swatch[data-variant="solid"]) {
        border-radius: var(--watercolor-radius);
    }
    .swatch-button:hover :deep(.watercolor-swatch) {
        scale: none;
    }
}
</style>
