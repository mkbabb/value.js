<template>
    <!-- R.W4 Lane A / A4 (the N.W14 empty-state half): the empty state is a
         designed invitation in the specimen-plate register — a trio of seeded
         WatercolorDot ghosts (specimens not yet pinned, reading the LIVE
         accent), a Fira eyebrow, a Fraunces display line, and an optional CTA
         slot — never a grey italic apology. -->
    <div class="flex flex-col items-center justify-center gap-2.5 py-8 text-center" role="status">
        <div class="flex items-end gap-2" aria-hidden="true">
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-a" class="w-8 h-8 opacity-80" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-b" class="w-11 h-11" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-c" class="w-6 h-6 opacity-60" />
        </div>
        <p class="text-mono-caption uppercase tracking-[0.18em] text-muted-foreground/70">
            {{ eyebrow }}
        </p>
        <p class="font-display text-heading text-foreground/85 max-w-[26ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <p v-if="hint" class="text-mono-small text-muted-foreground max-w-[36ch]">
            {{ hint }}
        </p>
        <slot name="action" />
    </div>
</template>

<script setup lang="ts">
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";

withDefaults(
    defineProps<{
        message?: string | undefined;
        /** Fira caps caption above the display line — the plate label. */
        eyebrow?: string | undefined;
        /** Optional mono how-to line under the display line. */
        hint?: string | undefined;
    }>(),
    { eyebrow: "· empty plate ·" },
);
</script>
