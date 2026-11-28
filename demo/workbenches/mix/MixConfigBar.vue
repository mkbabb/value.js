<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@mkbabb/glass-ui/select";
import { Button } from "@mkbabb/glass-ui/button";
// X-W4 · X.W4.b (CC-047) — the producer's published field composition
// (`@mkbabb/glass-ui/labeled-field`, 7.0.0). `controlLabelable: false` drops the
// invalid `for` on a non-labelable composite root, and the slot's `labelledBy`
// names the reka combobox through `aria-labelledby` — so the caption that used to
// float unassociated above each trigger IS the trigger's accessible name, and the
// duplicated literal `aria-label` retires. Imported at the subpath the demo already
// consumes producer families through (dock / aurora / search / tabs / easing).
import { LabeledField } from "@mkbabb/glass-ui/labeled-field";
import { Blend } from "@lucide/vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "../../color-session/picker-color";
import type { LeftoverStrategy } from "./mix";
import type { AcceptableValue } from "reka-ui";
import InterpolationFields from "../../shared/ui/InterpolationFields.vue";
import { usePanePopups } from "../../shell/usePanePopups";

// A2-VA-L2-11 — this pane's popups close when the pane deactivates.
const popups = usePanePopups();

const {
    colorSpace,
    hueMethod,
    leftoverStrategy,
    showLeftoverStrategy,
    canMix,
    mixNeeds,
    operandColors = [],
} = defineProps<{
    colorSpace: PickerSpace;
    hueMethod: HueInterpolationMethod;
    leftoverStrategy: LeftoverStrategy;
    /** The chosen palettes differ in size, so the leftover rule applies. */
    showLeftoverStrategy: boolean;
    canMix: boolean;
    /** What the mix still needs, said on the verb while it cannot act. */
    mixNeeds: string;
    /**
     * T-17: the CURRENT mix operands (colors mode) — the preview ramps'
     * truth inputs. With fewer than 2 operands the rows carry NO chip
     * (honest absence — the preview has nothing true to say; never a
     * canned swatch). Palettes mode passes [] by the same restraint.
     */
    operandColors?: string[];
}>();

const emit = defineEmits<{
    "update:colorSpace": [value: PickerSpace];
    "update:hueMethod": [value: HueInterpolationMethod];
    "update:leftoverStrategy": [value: LeftoverStrategy];
    mix: [];
}>();

const STRATEGIES: LeftoverStrategy[] = ["discard", "repeat", "distribute"];

/** Every phrase the verb can wear (MixPane's `mixNeeds`, and the act itself):
 *  the box is sized by the longest. */
const VERB_WORDS = ["Mix", "Add two colors", "Add one more color", "Pick two palettes", "Pick one more palette"] as const;

const strategyLabels: Record<LeftoverStrategy, string> = {
    discard: "Discard extras",
    repeat: "Repeat to pad",
    distribute: "Distribute",
};
</script>

<template>
    <div class="flex flex-col">
        <!-- A2-VA-L1-3: the interpolation pair is the app's one
             InterpolationFields (shared with the gradient workbench). W5-7:
             the permanent subtitles died — each row's own #description tells
             the story once, on demand. -->
        <div class="grid grid-cols-2 gap-2">
            <InterpolationFields
                :space="colorSpace"
                :hue-method="hueMethod"
                :operand-colors="operandColors"
                @update:space="(v) => emit('update:colorSpace', v)"
                @update:hue-method="(v) => emit('update:hueMethod', v)"
            />
        </div>

        <!-- Leftover strategy: only when the chosen palettes differ in size.
             The row is a presence (utils.css), so it eases the verb down and
             back instead of pushing it 76 px in one frame. -->
        <div
            class="row-presence"
            :data-present="showLeftoverStrategy ? '' : undefined"
            :inert="!showLeftoverStrategy"
        >
            <div>
                <!-- O60 M: the field takes a column of the pair above, not the
                     footer's whole width. -->
                <LabeledField
                    class="pt-3 mix-field-column"
                    label="Size mismatch"
                    :control-labelable="false"
                    v-slot="{ labelledBy }"
                >
                    <Select v-bind="popups.bind('leftoverStrategy')" :model-value="leftoverStrategy" @update:model-value="(v: AcceptableValue) => emit('update:leftoverStrategy', v as LeftoverStrategy)">
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="s in STRATEGIES" :key="s" :value="s">
                                {{ strategyLabels[s] }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
            </div>
        </div>

        <!-- The page's ONE verb, on glass's primary emphasis. While it cannot
             act it says what it needs instead of sitting dim with no reason.
             O60 M (the owner, 23 Nov, on this button at the footer's full
             width: "audit for all absurdly wide buttons ... Larger text for
             some elements like this"): it sizes to its words at the footer's
             end, in the body's larger step. -->
        <Button
            emphasis="primary"
            :disabled="!canMix"
            class="mix-verb mt-3 h-11 px-5 gap-2 font-medium self-end"
            data-testid="mix-verb"
            @click="emit('mix')"
        >
            <!-- The words change ("Add two colors" … "Mix") inside one box: it
                 is as wide as the longest of them, so the button never jumps
                 in width as they swap (the swap itself is the morph), and the
                 glyph rides with the words, centred together. -->
            <span class="mix-verb-words">
                <span v-for="words in VERB_WORDS" :key="words" class="mix-verb-label mix-verb-sizer" aria-hidden="true">
                    <Blend class="w-5 h-5" />{{ words }}
                </span>
                <Transition name="vj-morph" mode="out-in">
                    <span :key="canMix ? 'mix' : mixNeeds" class="mix-verb-label">
                        <Blend class="w-5 h-5" aria-hidden="true" />{{ canMix ? "Mix" : mixNeeds }}
                    </span>
                </Transition>
            </span>
        </Button>
    </div>
</template>

<style scoped>
/* O60 M: the primary act reads a step larger than the fields above it. */
.mix-verb {
    font-size: var(--type-body);
}
.mix-verb-words {
    display: grid;
    justify-items: center;
}
.mix-verb-words > * {
    grid-area: 1 / 1;
}
.mix-verb-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}
.mix-verb-sizer {
    visibility: hidden;
}
/* One column of the interpolation pair's grid (two columns, a 0.5rem gap). */
.mix-field-column {
    inline-size: calc(50% - 0.25rem);
}
</style>
