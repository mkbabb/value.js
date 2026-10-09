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
        :data-size="size"
        :class="['swatch-button relative shrink-0 cursor-pointer', SIZE[size]]"
    >
        <WatercolorDot
            :color="color"
            :variant="ghost ? 'ghost' : 'solid'"
            v-bind="seed !== undefined ? { seed } : {}"
            class="w-full h-full"
        />
        <Check
            v-if="done"
            class="absolute w-4 h-4 pointer-events-none"
            :style="{ color: contrastInkFor(color) ?? 'var(--foreground)' }"
            aria-hidden="true"
        />
    </Button>
</template>

<script setup lang="ts">
import { Check } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import { WatercolorDot } from "./watercolor-dot";
import { contrastInkFor } from "../../color-session/ink";

/** The swatch size tokens — the four seats the app measures a swatch at:
 *  `sm` a dense add grid (Mix), `md` a palette card and the Generate plate,
 *  `lg` the Current Palette row, `xl` the Extract result. */
export type SwatchSize = "sm" | "md" | "lg" | "xl";

const SIZE: Record<SwatchSize, string> = {
    sm: "w-8 h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-11 h-11 sm:w-12 sm:h-12",
    xl: "w-12 h-12 sm:w-14 sm:h-14",
};

const {
    color,
    size = "md",
    seed,
    ghost = false,
    done = false,
} = defineProps<{
    color: string;
    size?: SwatchSize;
    /** The organic edge's seed; omit to let the dot seed from its colour. */
    seed?: string;
    /** The glass ghost silhouette — a placeholder / being-edited slot. */
    ghost?: boolean;
    /** The verb's verdict: lays the check over the face. */
    done?: boolean;
}>();
</script>
