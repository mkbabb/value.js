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
         swatch's own contrast ink (X-DS pass 1, V1C-11). T-28's outline law
         rides: no geometric focus ring is added on the organic edge. -->
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

/* The palette dot's hover (the original's): the paint swells to 1.06 and takes
   its second seeded outline, eased in and out on the dot's own clocks (0.2 s,
   0.6 s, the standard curve). Only the paint moves: `scale` is a transform, so
   the button, its row and its neighbours keep their boxes to the pixel. Fine
   pointers only, so a tap does not latch it. */
@media (hover: hover) {
    .swatch-button:hover :deep(.watercolor-swatch) {
        scale: 1.06;
        border-radius: var(--watercolor-radius-hover, var(--watercolor-radius));
    }
}

/* Reduced motion: the outline alone, no swell. */
@media (hover: hover) and (prefers-reduced-motion: reduce) {
    .swatch-button:hover :deep(.watercolor-swatch) {
        scale: none;
    }
}
</style>
