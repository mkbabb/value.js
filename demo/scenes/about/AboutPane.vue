<template>
    <Card
        tier="resting"
        class="about-card pane-scroll-fade w-full mx-auto overflow-y-auto overflow-x-hidden min-w-0 h-full"
    >
        <!-- S.W4 W4-1 (the S-1 parity half): the de-capsuled selector inlines
             into the title as ONE display-voice line. Its specimen rows read
             the ONE App-provided pipeline (COLOR_MODEL_KEY, App.vue:
             `provide(COLOR_MODEL_KEY, pipeline)`) — ambient since S.W2's
             transposition — so About renders the live per-space conversions
             identically to the picker with NO second provider here (a local
             `useColorPipeline(model)` would double-instantiate the spine:
             a second storage writer + token sink against the W2-1 ONE-pipeline
             law). Both hosts get the W4-1 grammar verbatim (S-21). -->
        <PaneHeader description="The math, the science, the art, the beauty of color spaces.">
            About the color spaces,
            <!-- T.W4-1: `inline` = the sanctioned host SIZE prop (1em) — the
                 member rides the sentence's display-1 rung + compositor
                 shrink by construction; weight is trigger-owned (F2). -->
            <ColorSpaceSelector
                :model-value="model.selectedColorSpace"
                v-model:open="aboutSelectOpen"
                :css-color="cssColor"
                inline
                @update:model-value="
                    (colorSpace) => {
                        model = { ...model, selectedColorSpace: colorSpace };
                    }
                "
            />
        </PaneHeader>

        <Separator />

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
        <CardContent class="px-3 sm:px-6 pt-phi-3 pb-phi-3">
            <ColorNutritionLabel class="w-full p-0 m-0" v-model="model" />
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
            <h2 class="font-display text-title mb-phi-3">Detailed Guide</h2>
            <Markdown
                v-if="activeSpace.doc"
                :key="activeSpace.id"
                :module="activeSpace.doc"
                :cssColor="cssColor"
                :colorSpaceName="activeSpace.label"
            />
            <p v-else class="text-small text-muted-foreground" data-guide-empty-state>
                No long-form guide is written for {{ activeSpace.label }} yet — its
                definition, white point, gamut, components and conversion paths are
                stated in full above.
            </p>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Separator } from "../../ui/separator";
import { Card, CardContent } from "../../ui/card";
import PaneHeader from "../../shared/ui/PaneHeader.vue";
import ColorNutritionLabel from "./ColorNutritionLabel.vue";
import type { ColorModel } from "../../color-session/color-model";
import { SPACE_CATALOG } from "../../color-session/space-catalog";
import ColorSpaceSelector from "../../color-session/ColorSpaceSelector.vue";
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

