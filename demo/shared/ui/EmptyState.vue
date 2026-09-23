<template>
    <div
        v-if="variant === 'error'"
        ref="root"
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
    <div v-else ref="root" class="flex flex-col items-center justify-center gap-2.5 py-8 text-center" role="status">
        <!-- N-3, RE-AIMED (T.W6.5 · Lane S — R12, MANDATE §0.6
             t33-audit-08 "bring that iconset with the dashes back"): the
             clause stays TRUE — never two ghost registers at two scales —
             and the owner's ruling picks WHICH register speaks at
             TRUE EMPTY: this seeded dot trio (the R.W4 specimen-plate
             invitation, `4d8ad79`). The card-scale ShadowPalette no
             longer seats at empty hosts (it is solely the Extract
             standing-instrument face), so the trio is the one ghost
             voice of every true-empty plate. X.W7.g (ES-4): the `dots`
             axis that could shed it was never set by any consumer and only
             an oracle held it in place; it is deleted with that oracle's
             re-ruling. -->
        <div
            data-slot="empty-state-trio"
            class="flex items-end gap-2"
            aria-hidden="true"
        >
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-a" class="w-8 h-8 opacity-80" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-b" class="w-11 h-11" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" tag="div" seed="plate-c" class="w-6 h-6 opacity-60" />
        </div>
        <!-- P4-R2 (T.W8 remediation_1): the hint threads the certified
             de-emphasis rung `--ink-muted` (boot-stamped, floor-clamped against
             the live resting plate; D6) — the STATIC `text-muted-foreground`
             composited 3.84:1 over the My Palettes plate in light (< the 4.5:1
             small-text floor). -->
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
/*
 * S.W5-5: TWO species, never conflated (SYNTHESIS §2.4 — loading ≠
 * empty, error ≠ empty).
 *
 * · empty (default) — the R.W4 specimen-plate invitation: seeded
 * WatercolorDot ghosts reading the LIVE accent, a Fraunces display
 * line, optional hint + CTA slot. X.W7.g (OM-15 §1.A #2/#13 · G19):
 * the Fira caps caption prop — a DEFAULT that birthed a contrived
 * caption restating the message at every consumer, and an announced
 * string inside this polite region (ES-11) — is deleted as prop,
 * default AND element, so the idiom cannot regrow.
 * · error — the PLAIN register (Q6: error surfaces DROP the
 * annotations; no ghosts, never a second invitation): a
 * quiet destructive glyph, the Fraunces statement of failure, the
 * machine truth in Fira, and a real Retry in the action slot.
 *
 * X.W7.g (crash-battery R14 · ES-2): this note lived as a leading <template>
 * comment, which the dev compiler turns into a sibling root — a multi-root
 * component, whose <Transition mode="out-in"> leave never completes. The
 * template now opens on its element; the note lives here.
 */
import { useTemplateRef } from "vue";
import { CircleAlert } from "@lucide/vue";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";

withDefaults(
    defineProps<{
        message?: string | undefined;
        /** The two plate species — `empty` invitation vs `error` statement. */
        variant?: "empty" | "error" | undefined;
        /** Optional mono how-to line under the display line (empty variant). */
        hint?: string | undefined;
        /** The machine truth (error variant) — the caught message, in Fira. */
        detail?: string | undefined;
    }>(),
    { variant: "empty" },
);

// The plate's rendered root. Each branch is ONE element carrying this ref, so
// a host that owns focus (ErrorBoundary moves focus INTO its plate on catch)
// reaches the element itself — never `$el`, which the dev build's leading
// template comment turns into a fragment anchor. The two roots stay separate
// elements (ES-35's lock: no single root with a patched `role`).
const root = useTemplateRef<HTMLElement>("root");
defineExpose({ focus: () => root.value?.focus() });
</script>

<style scoped>
/* P4-R2 + P11-R3 (T.W8 remediation_1): the shared empty/error plate's captions
 * — the hint, the error detail line — thread the certified
 * de-emphasis rung (`--ink-muted` — boot-stamped, floor-clamped against the
 * live resting plate; D6). This is the ONE shared empty atom (8 consumers incl.
 * the admin walls), so every consumer inherits the cure. The primary display
 * line drops its `/85` guard-then-alpha (D6 retires the class by name) to the
 * full certified `--foreground`. */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
