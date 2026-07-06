<template>
    <!-- S.W5-5: TWO species, never conflated (SYNTHESIS §2.4 — loading ≠
         empty, error ≠ empty).

         · empty (default) — the R.W4 specimen-plate invitation: seeded
           WatercolorDot ghosts reading the LIVE accent, a Fira eyebrow (the
           plate label — Q6 RATIFIED-NARROWED: this annotation class survives
           ONLY here, on TRUE EMPTY), a Fraunces display line, optional hint
           + CTA slot.
         · error — the PLAIN register (Q6: error surfaces DROP the
           annotations; no eyebrow, no ghosts, never a second invitation): a
           quiet destructive glyph, the Fraunces statement of failure, the
           machine truth in Fira, and a real Retry in the action slot. -->
    <div
        v-if="variant === 'error'"
        class="flex flex-col items-center justify-center gap-2.5 py-8 text-center"
        role="alert"
    >
        <CircleAlert class="w-6 h-6 text-destructive/80" aria-hidden="true" />
        <p class="font-display text-heading text-foreground/85 max-w-[26ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <p v-if="detail" class="text-mono-small text-muted-foreground max-w-[44ch] break-words">
            {{ detail }}
        </p>
        <slot name="action" />
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2.5 py-8 text-center" role="status">
        <div class="flex items-end gap-2" aria-hidden="true">
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-a" class="w-8 h-8 opacity-80" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-b" class="w-11 h-11" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-c" class="w-6 h-6 opacity-60" />
        </div>
        <!-- W5-5: the /70 double-attenuation is dead — --muted-foreground is
             already the scheme-tuned quiet rung; halving it again made the
             eyebrow invisible over dark glass. -->
        <p class="text-mono-caption uppercase tracking-[0.18em] text-muted-foreground">
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
import { CircleAlert } from "@lucide/vue";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";

withDefaults(
    defineProps<{
        message?: string | undefined;
        /** The two plate species — `empty` invitation vs `error` statement. */
        variant?: "empty" | "error" | undefined;
        /** Fira caps caption above the display line — TRUE-EMPTY only (Q6). */
        eyebrow?: string | undefined;
        /** Optional mono how-to line under the display line (empty variant). */
        hint?: string | undefined;
        /** The machine truth (error variant) — the caught message, in Fira. */
        detail?: string | undefined;
    }>(),
    { variant: "empty", eyebrow: "· empty plate ·" },
);
</script>
