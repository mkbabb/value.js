<template>
    <PaneShell
        follow
        :gutter="false"
        class="about-pane"
        card-class="about-card"
    >
        <!-- X.W12.c (OA-5 / OA-21) — THE ABOUT PANE FOLLOWS THE ROW. The card is
             the Picker pane's height: `pane-row-follow` is the shell's row
             contract (shell.css), under which this pane never sizes the row it
             shares. The body scrolls INSIDE the card on glass's scroll primitive
             (`FadingScroll`, the scroll port), and the card's `overflow-hidden`
             with its radius clips that port.
             X-DS pass 3 (V3C-01): the PaneHeader and its rule sit ABOVE the port,
             as its siblings, so the body never runs under the title. Sticky inside
             the port, the header relied on a 14%-alpha veil and a backdrop blur
             that never reached content in nested composited scrollers (the KaTeX
             rows printed crisp through the compact title). Seated, the title is
             occluded by construction, the port feathers both edges, and the
             header keeps its rest form (no compact state, so no dead band). A
             seated header paints no veil (the veil is deleted, SS8-0192).
             This comment sits INSIDE the root: a comment beside the root makes
             a dev-mode root fragment, which loses the pane swap's out-in
             continuation (§0ay ESC-W5t-2; measured again here — the next
             inspector pane never mounted). -->
        <!-- S.W4 W4-1 (the S-1 parity half): the de-capsuled selector inlines
             into the title as ONE display-voice line. Its specimen rows read
             the ONE App-provided pipeline (COLOR_MODEL_KEY, App.vue:
             `provide(COLOR_MODEL_KEY, pipeline)`) — ambient since S.W2's
             transposition — so About renders the live per-space conversions
             identically to the picker with NO second provider here (a local
             `useColorPipeline(model)` would double-instantiate the spine:
             a second storage writer + token sink against the W2-1 ONE-pipeline
             law). Both hosts get the W4-1 grammar verbatim (S-21). -->
        <!-- A2-VA-L1-1: the one pane shell, seated (the header above the
             FadingScroll port, X-DS V3C-01) and following the row. -->
        <template #title>
            About the color spaces,
            <!-- T.W4-1: `inline` = the sanctioned host SIZE prop (1em) — the
                 member rides the sentence's display-1 rung + compositor
                 shrink by construction; weight is trigger-owned (F2). -->
            <ColorSpaceSelector
                :model-value="model.selectedColorSpace"
                v-model:open="aboutSelectOpen"
                inline
                @update:model-value="
                    (colorSpace) => {
                        model = { ...model, selectedColorSpace: colorSpace };
                    }
                "
            />
        </template>

        <!-- X-DS pass 4 (V4C-06): no rule under the seated header. The header's
             block-end gap token (PaneHeader) is the one header-to-body rhythm on
             every pane, and the port's own top feather marks a scrolled body,
             as on My Palettes. -->

            <!-- R.W4 Lane C / C1 (U5): consistent sectional + divider padding from
                 the φ ladder — every section clears its Separator by φ (1.618rem),
                 the guide closes at φ² (2.618rem). S.W4-8: the rungs read the
                 promoted `--phi-*` tokens via the style.css spacing bridges,
                 never re-hardcoded arbitrary literals — and at SIDE tier
                 (`pt-*`/`pb-*`), never the `py-*` axis: CardContent carries its
                 own `pt-(--card-pad-section-gap) pb-(--card-pad-block)` defaults
                 and glass-ui's slim `cn` does not conflict-resolve, so an axis
                 utility sorts earlier and silently LOSES the cascade (the former
                 `py-[1.618rem]` here never painted — the card's cqi default did;
                 the W4 seed-rider-2 clause, generalized). -->
            <CardContent class="px-3 sm:px-6 pt-0 pb-phi-3">
                <ColorNutritionLabel class="w-full p-0 m-0" :space="model.selectedColorSpace" />
            </CardContent>

            <Separator />

            <!-- X-W6.f · X:CSS-1 (f3) — THE GUIDE SECTION STATES ITS OWN STATE.
                 Seven of the eighteen offered spaces have no authored long-form
                 guide, and the section used to render a bare "Detailed Guide"
                 heading over nothing: a `v-if` that silently produced an empty
                 section with a title promising content. The catalog now DECIDES —
                 `doc: null` is an authored decision, not a gap — and the section
                 renders that decision as a sentence, naming the space and pointing
                 at the facts that DO exist, one panel above. -->
            <CardContent
                class="px-3 sm:px-6 pt-phi-3 pb-phi-4"
                data-guide-section
                :data-guide-state="activeSpace.doc ? 'authored' : 'none-authored'"
            >
                <h2 class="font-display text-(length:--type-title) mb-phi-3">Detailed Guide</h2>
                <Markdown
                    v-if="activeSpace.doc"
                    :key="activeSpace.id"
                    :module="activeSpace.doc"
                    :cssColor="cssColor"
                />
                <p v-else class="text-small text-muted-foreground" data-guide-empty-state>
                    No long-form guide is written for {{ activeSpace.label }} yet — its
                    definition, white point, gamut, components and conversion paths are
                    stated in full above.
                </p>
            </CardContent>
    </PaneShell>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Separator } from "@mkbabb/glass-ui/separator";
import { CardContent } from "@mkbabb/glass-ui/card";
import PaneShell from "../../shell/PaneShell.vue";
import ColorNutritionLabel from "./ColorNutritionLabel.vue";
import type { ColorModel } from "../../color-session/color-model";
import { SPACE_CATALOG } from "../../color-session/space-catalog";
import ColorSpaceSelector from "../../shared/ui/ColorSpaceSelector.vue";
import { Markdown } from "./markdown";
const model = defineModel<ColorModel>({ required: true });
const aboutSelectOpen = ref(false);

defineProps<{
    cssColor: string;
}>();

/**
 * X-W6.f · X:CSS-1 — the guide table lived HERE, keyed by a hand-maintained
 * `MarkdownSpace` union of eleven names, while the selector offered eighteen
 * and the facts table documented thirteen. Three registries, three different
 * answers to "which spaces exist". The catalog is now the one home and the
 * entry carries its own guide decision, so About reads a row rather than
 * indexing a partial map with a cast.
 */
const activeSpace = computed(() => SPACE_CATALOG[model.value.selectedColorSpace]);
</script>

<style scoped>
/* O1109 · about-pane (owner 2026-11-09: "the picker explanation pane is too
 * large--they should be contained a bit more and centred") — THE COMPANION
 * TAKES THE PICKER'S MEASURE. The inspector is the row's `1fr` remainder
 * (shell.css, THE PER-ROUTE TRACK RATIO), so About stood as wide as the
 * picker's ceiling left over: 699 px at 1440 and 779 px in the one-track 820
 * band, its guide prose running 70 to 78ch. Its ceiling is now the measure the
 * picker plate already stands at (`--picker-measure`, foundation.css), so the
 * pair read as two cards of one measure, and the shell's `mx-auto` centres the
 * pane in whatever column it is handed (a leaving About is `inset: 0 0 auto 0`
 * in the deck, so it centres the same way). The cap sits on the pane ROOT,
 * not the plate: the T-45 blur carrier is the plate's parent's `::before`
 * (shell.css), so a plate narrower than its parent left the carrier's blur
 * band painting the full column behind it. The block axis is unchanged: the
 * row contract (`pane-row-follow`) still sets its height and the body scrolls
 * in its own port. */
.about-pane {
    max-inline-size: var(--picker-measure);
}

/* O1109 repair (adversary defects 1 and 2) — STACKED, THE COMPANION IS THE
 * NEXT CARD OF THE DECK. In one track the picker fills the column, so the
 * two-track cap above bound only at 820 (a 651 px card 64 px in from a 779 px
 * picker, its edges matching nothing) and not at all on phones (the card the
 * picker's exact width, a screen tall: 366 x 732 at 390). Under the picker it
 * now sits one token in from the picker's edges on both sides at every
 * stacked width (`--phi-2`), on the picker's centre line, and its port is the
 * scene band over sqrt(phi) (the step `--picker-measure` takes off the card
 * measure), so the plate reads as a card under the picker rather than a
 * second screen. The query is the row contract's one-track condition
 * (shell.css), the token values written out as it does; the selector names
 * the row contract's class on this root, one class stronger than the
 * contract's own (`.pane-wrapper--inspector > .pane-row-follow`), so the band
 * ceiling it sets for every companion is narrowed here only. */
@container pane-row not (inline-size >= calc(2 * min(25rem, 100svh) + clamp(0.5rem, 1.25vw, 1.618rem))) {
    .about-pane.pane-row-follow {
        max-inline-size: calc(100% - 2 * var(--phi-2));
        max-block-size: calc(var(--scene-band-block) / 1.272);
    }
}
</style>
