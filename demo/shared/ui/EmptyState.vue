<template>
    <div
        v-if="variant === 'error'"
        ref="root"
        :class="[
            'flex flex-col items-center justify-center gap-2.5 text-center',
            compact ? 'pb-8' : 'py-8',
        ]"
        role="alert"
    >
        <CircleAlert class="w-6 h-6 text-destructive" aria-hidden="true" />
        <p class="font-display text-subheading text-foreground max-w-[30ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <!-- UIA-V-53: machine truth wraps inside the plate at every width —
             the item is the column's width capped at 44ch (a centred flex item
             otherwise sizes to its 44ch max and overflows both card edges at
             390), and `wrap-anywhere` lets an unbroken URL break too.
             X-DS value pass 8 (V8C-02): the machine truth speaks Fira, the
             mono rung Generate's seed line uses (value-canon §2 Type). -->
        <p v-if="detail" class="text-mono-small plate-ink w-full min-w-0 max-w-[min(44ch,100%)] wrap-anywhere">
            {{ detail }}
        </p>
        <slot name="action" />
    </div>
    <div
        v-else-if="variant === 'filtered'"
        ref="root"
        class="flex flex-col items-center justify-center gap-2.5 py-6 text-center"
        role="status"
        data-empty-register="filtered"
    >
        <!-- X.W12U.s3 · UIA-V-635: a FILTERED zero is its own register — the
             query found nothing, the collection is not empty — so it never wears
             the true-empty ghost trio (the one voice of TRUE empty, below). A plain
             statement (body at 400, a weight under the true-empty line), plus the
             host's way out. -->
        <p class="font-display text-body text-foreground max-w-[36ch] text-balance leading-snug">
            <slot>{{ message }}</slot>
        </p>
        <slot name="action" />
    </div>
    <div
        v-else
        ref="root"
        :class="[
            'flex flex-col items-center justify-center text-center',
            compact ? 'gap-1.5' : 'gap-2.5 py-8',
        ]"
        role="status"
    >
        <!-- X-DS pass 8 (V3C-01): `compact` — a true-empty plate seated under its
             own section heading (Mix's "Saved palettes") drops the plate-scale
             vertical padding: the heading already spaces it, and the 64 px of air
             pushed the hint past the follow row's ceiling at 1440. -->
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
            <WatercolorDot color="var(--accent-live)" variant="ghost" seed="plate-a" class="w-8 h-8 opacity-80" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" seed="plate-b" class="w-11 h-11" />
            <WatercolorDot color="var(--accent-live)" variant="ghost" seed="plate-c" class="w-6 h-6 opacity-60" />
        </div>
        <!-- P4-R2 (T.W8 remediation_1): the hint threads the certified
             de-emphasis rung `--ink-muted` (boot-stamped, floor-clamped against
             the live resting plate; D6) — the STATIC `text-muted-foreground`
             composited 3.84:1 over the My Palettes plate in light (< the 4.5:1
             small-text floor).
             X-DS VC4-02: the true-empty statement speaks the body rung at 500,
             one step over the hint, at every host (Mix, Browse, My Palettes):
             under Mix's "Saved palettes" head (subheading, 600) it no longer
             ties with its own heading. One register, set here.
             X-DS value pass 6 (V6C-01): `compact` — seated under its own label
             (Mix's "Saved palettes", My Palettes' well label) — sets the
             statement at the hint rung at 400, still Fraunces (O-10d's
             three-voice law): the label above already speaks the head. -->
        <p
            :class="[
                'font-display text-foreground max-w-[30ch] text-balance leading-snug',
                compact ? 'text-small font-normal' : 'text-body font-medium',
            ]"
        >
            <slot>{{ message }}</slot>
        </p>
        <!-- X-DS pass 9 (V9C-08): the hint balances its lines, as the
             statement above does, so no line ends on an orphan word. -->
        <p v-if="hint" class="text-small plate-ink max-w-[36ch] text-balance">
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
 * destructive glyph (X-DS pass 18 · V18C-02: the plate's certified red at
 * full strength, `--ink-destructive`), the Fraunces statement of failure, the
 * machine truth in Fira, and a real Retry in the action slot.
 *
 * X.W12U.h · A2-VA-L3-1 (consumer half): the error statement sits on the
 * subheading rung (`text-subheading`, 600; the true-empty statement one rung
 * lower again, body at 500, since X-DS VC4-02), one step under the heading rung
 * that the pane title's `--type-display-1` clamp floors at on phones, so the
 * plate never out-ranks its pane title (it rendered 25.9 px/700 under a
 * 25.9 px/400 title at 390). The secondary line (hint, detail) speaks the
 * body sans at the small rung (the error detail speaks Fira's small rung,
 * X-DS value pass 8 · V8C-02). Since X-DS pass 9 (V9C-02) the pane title
 * floors one rung higher (`--pane-title-size`, PaneHeader), a full step
 * above this statement at 390 (32.9 px against 20.4 px).
 *
 * X.W7.g (crash-battery R14 · ES-2): this note lived as a leading <template>
 * comment, which the dev compiler turns into a sibling root — a multi-root
 * component, whose <Transition mode="out-in"> leave never completes. The
 * template now opens on its element; the note lives here.
 *
 * X-DS value pass 8 (V8C-03): `compact` on the error plate too — seated under
 * its pane's title (Not Found), the header already spaces it, so the plate
 * drops its top padding and keeps the bottom one.
 *
 * X.W11.api (§0eh limb (a)) — that V8C-03 note had re-entered as a leading
 * <template> comment (dc94d7745), and the same dev-compiler rule moves a comment
 * standing BETWEEN v-if branches into the following branch, so the `filtered`
 * and true-empty branches were fragments too. Every note now sits inside its
 * branch's element or here: each branch renders ONE element, so Browse's
 * out-in swap off the error plate completes and Retry repopulates the wall.
 */
import { useTemplateRef } from "vue";
import { CircleAlert } from "@lucide/vue";
import { WatercolorDot } from "./watercolor-dot";

withDefaults(
    defineProps<{
        message?: string | undefined;
        /** The two plate species — `empty` invitation vs `error` statement. */
        variant?: "empty" | "filtered" | "error" | undefined;
        /** Optional mono how-to line under the display line (empty variant). */
        hint?: string | undefined;
        /** The machine truth (error variant) — the caught message, in Fira. */
        detail?: string | undefined;
        /** A true-empty plate under its own label: no plate-scale vertical
         *  padding (X-DS pass 8 · V3C-01), and the statement at the hint rung
         *  at 400 (X-DS value pass 6 · V6C-01). An error plate under its pane
         *  title: no top padding (X-DS value pass 8 · V8C-03). */
        compact?: boolean | undefined;
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
