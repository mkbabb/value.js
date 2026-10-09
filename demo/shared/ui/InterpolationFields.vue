<script setup lang="ts">
/**
 * InterpolationFields — THE interpolation-space and hue-method pair
 * (A2-VA-L1-3). Gradient and Mix each authored this Select pair, and the copies
 * disagreed: Gradient said "Space"/"Hue" with text-only descriptions, Mix said
 * "Color space"/"Hue method" with PreviewRamp specimens, both over the one
 * INTERPOLATION_SPACES / HUE_INTERPOLATION_METHODS catalogue (deduped at
 * S.W5-6, the control never extracted). One control now, one label vocabulary
 * (Mix's, the one the o14 preview-truth oracle names), and the specimens for
 * both hosts.
 *
 * T.W6 · W6-4 (T-17): each row's PreviewRamp is library-sampled — a SPACE row
 * interpolates the operands through the CANDIDATE space (current hue arc), a
 * HUE row draws the current space with the CANDIDATE arc. With fewer than two
 * operands a row carries no chip (honest absence, never a canned swatch). The
 * chips render only while SelectContent is mounted (reka unmounts it closed),
 * so sampling costs nothing at rest.
 *
 * X-W4 · X.W4.b (CC-047): glass's LabeledField with `controlLabelable: false`
 * names the reka combobox through `aria-labelledby`. The root is
 * `display: contents`, so the two fields join the HOST's grid.
 */
import { computed } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@mkbabb/glass-ui/select";
import { LabeledField } from "@mkbabb/glass-ui/labeled-field";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { AcceptableValue } from "reka-ui";
import type { PickerSpace } from "../../color-session/picker-color";
import { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "../../color-session/color-space-meta";
import { PreviewRamp, sampleInterpolationRamp } from "./color-chips";
import { usePanePopups } from "../../shell/usePanePopups";

const space = defineModel<PickerSpace>("space", { required: true });
const hueMethod = defineModel<HueInterpolationMethod>("hueMethod", { required: true });

const { operandColors = [] } = defineProps<{
    /** The colours the ramps interpolate between (the specimens' truth input). */
    operandColors?: readonly string[];
}>();

// A2-VA-L2-11 — the pane's popups close when the pane deactivates.
const popups = usePanePopups();

const spaceRamps = computed(
    () =>
        new Map(
            INTERPOLATION_SPACES.map((s) => [
                s.value,
                sampleInterpolationRamp(operandColors, s.value, hueMethod.value),
            ]),
        ),
);
const hueRamps = computed(
    () =>
        new Map(
            HUE_INTERPOLATION_METHODS.map((m) => [
                m.value,
                sampleInterpolationRamp(operandColors, space.value, m.value),
            ]),
        ),
);
</script>

<template>
    <div class="contents">
        <LabeledField class="min-w-0" label="Color space" :control-labelable="false" v-slot="{ labelledBy }">
            <Select
                v-bind="popups.bind('interpolationSpace')"
                :model-value="space"
                @update:model-value="(v: AcceptableValue) => (space = v as PickerSpace)"
            >
                <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <!-- T-17: chip leading, description after (F7 — the producer
                         #description lane, the one slot reka's SelectValue does
                         NOT clone into the trigger). -->
                    <SelectItem v-for="s in INTERPOLATION_SPACES" :key="s.value" :value="s.value">
                        {{ s.label }}
                        <template #description>
                            <span class="flex items-center gap-2">
                                <PreviewRamp v-if="spaceRamps.get(s.value)" :stops="spaceRamps.get(s.value)!" />
                                <span class="text-micro text-muted-foreground">{{ s.description }}</span>
                            </span>
                        </template>
                    </SelectItem>
                </SelectContent>
            </Select>
        </LabeledField>

        <LabeledField class="min-w-0" label="Hue method" :control-labelable="false" v-slot="{ labelledBy }">
            <Select
                v-bind="popups.bind('hueMethod')"
                :model-value="hueMethod"
                @update:model-value="(v: AcceptableValue) => (hueMethod = v as HueInterpolationMethod)"
            >
                <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <!-- T-17: the four-arc quartet, drawn with the host's own
                         colours (current space, candidate arc). -->
                    <SelectItem v-for="m in HUE_INTERPOLATION_METHODS" :key="m.value" :value="m.value">
                        {{ m.label }}
                        <template #description>
                            <span class="flex items-center gap-2">
                                <PreviewRamp v-if="hueRamps.get(m.value)" :stops="hueRamps.get(m.value)!" />
                                <span class="text-micro text-muted-foreground">{{ m.description }}</span>
                            </span>
                        </template>
                    </SelectItem>
                </SelectContent>
            </Select>
        </LabeledField>
    </div>
</template>
