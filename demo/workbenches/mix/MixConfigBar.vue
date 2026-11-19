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
                <LabeledField
                    class="pt-3"
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
             act it says what it needs instead of sitting dim with no reason. -->
        <Button
            emphasis="primary"
            :disabled="!canMix"
            class="mt-3 h-10 gap-2 font-medium"
            @click="emit('mix')"
        >
            <Blend class="w-4 h-4" />
            <Transition name="vj-morph" mode="out-in">
                <span :key="canMix ? 'mix' : mixNeeds">{{ canMix ? "Mix" : mixNeeds }}</span>
            </Transition>
        </Button>
    </div>
</template>
