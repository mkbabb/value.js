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
    operandColors = [],
} = defineProps<{
    colorSpace: PickerSpace;
    hueMethod: HueInterpolationMethod;
    leftoverStrategy: LeftoverStrategy;
    showLeftoverStrategy: boolean;
    canMix: boolean;
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
    <div class="flex flex-col gap-3">
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

        <!-- Leftover strategy (palette mode only) -->
        <LabeledField
            v-if="showLeftoverStrategy"
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

        <!-- The page's ONE verb. glass 7 `Button` declares no `variant`, so the
             deliberate-primary register (S.W5-6 · L6) is an X-W10 intent, not
             a binding here (X.W7.z2: the inert prop deleted). -->
        <Button
            :disabled="!canMix"
            class="h-10 gap-2 font-medium font-display"
            @click="emit('mix')"
        >
            <Blend class="w-4 h-4" />
            Mix
        </Button>
    </div>
</template>
