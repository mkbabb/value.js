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
        <p class="font-display text-heading text-foreground max-w-[26ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <p v-if="detail" class="text-mono-small plate-ink max-w-[44ch] break-words">
            {{ detail }}
        </p>
        <slot name="action" />
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2.5 py-8 text-center" role="status">
        <!-- N-3, RE-AIMED (T.W6.5 · Lane S — R12, MANDATE §0.6
             t33-audit-08 "bring that iconset with the dashes back"): the
             clause stays TRUE — never two ghost registers at two scales —
             and the owner's ruling picks WHICH register speaks at
             TRUE EMPTY: this seeded dot trio (the R.W4 specimen-plate
             invitation, `4d8ad79`). The card-scale ShadowPalette no
             longer seats at empty hosts (it is solely the Extract
             standing-instrument face), so the trio is the one ghost
             voice of every true-empty plate; `dots` sheds it ONLY where
             a card-scale instrument ghost seats beside this caption. -->
        <div
            v-if="dots"
            data-slot="empty-state-trio"
            class="flex items-end gap-2"
            aria-hidden="true"
        >
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-a" class="w-8 h-8 opacity-80" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-b" class="w-11 h-11" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-c" class="w-6 h-6 opacity-60" />
        </div>
        <!-- P4-R2 (T.W8 remediation_1): the eyebrow/hint thread the certified
             de-emphasis rung `--ink-muted` (boot-stamped, floor-clamped against
             the live resting plate; D6) — the STATIC `text-muted-foreground`
             composited 3.84:1 over the My Palettes plate in light (< the 4.5:1
             small-text floor). The earlier /70 double-attenuation was already
             dead; this thread the rung the console's captions ride. -->
        <p class="text-mono-caption uppercase tracking-[0.18em] plate-ink">
            {{ eyebrow }}
        </p>
        <p class="font-display text-heading text-foreground max-w-[26ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <p v-if="hint" class="text-mono-small plate-ink max-w-[36ch]">
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
        /** The dot-scale ghost trio (empty variant) — TRUE EMPTY's one
         *  ghost register by owner ruling (R12/t33-audit-08). Shed
         *  (`false`) ONLY where a card-scale instrument ghost seats
         *  beside this caption — N-3 re-aimed: never two ghost registers
         *  at two scales. */
        dots?: boolean | undefined;
    }>(),
    { variant: "empty", eyebrow: "· empty plate ·", dots: true },
);
</script>

<style scoped>
/* P4-R2 + P11-R3 (T.W8 remediation_1): the shared empty/error plate's captions
 * — the eyebrow, the hint, the error detail line — thread the certified
 * de-emphasis rung (`--ink-muted` — boot-stamped, floor-clamped against the
 * live resting plate; D6). This is the ONE shared empty atom (8 consumers incl.
 * the admin walls), so every consumer inherits the cure. The primary display
 * line drops its `/85` guard-then-alpha (D6 retires the class by name) to the
 * full certified `--foreground`. */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
