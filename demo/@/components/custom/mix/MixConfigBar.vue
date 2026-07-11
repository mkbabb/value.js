<script setup lang="ts">
import { computed } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { Blend } from "@lucide/vue";
import type { ColorSpace } from "@mkbabb/value.js/color";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { LeftoverStrategy } from "@lib/palette/mix";
import type { AcceptableValue } from "reka-ui";
// S.W5-6 · F16: the interpolation vocabulary lives in its neutral @lib/ home
// (color-space facts, not gradient facts) — no more cross-feature reach.
import { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "@lib/color-space-meta";
// T.W6 · W6-4 (T-17): the preview-chip module — library-sampled ramps in
// the Select #description lane. The chips render only while SelectContent
// is mounted (reka unmounts it closed — the ColorSpaceSelector precedent),
// so the sampling costs nothing at rest.
import { PreviewRamp, sampleInterpolationRamp } from "@components/custom/color-chips";

const {
    colorSpace,
    hueMethod,
    leftoverStrategy,
    showLeftoverStrategy,
    canMix,
    operandColors = [],
} = defineProps<{
    colorSpace: ColorSpace;
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

/**
 * T-17 (t-nav F6) — the preview ramps, library-sampled:
 *   - each SPACE row: the current operands interpolated through the
 *     CANDIDATE space (current hue arc);
 *   - each HUE row: the current space with the CANDIDATE arc — the
 *     four-arc quartet drawn with the user's own colors.
 * O-14 truth: the chip stamps the sampler's stops on `data-stops`; the
 * vitest oracle holds the sampler ≡ the library, the e2e leg holds the
 * paint ≡ the stamp.
 */
const spaceRamps = computed(
    () =>
        new Map(
            INTERPOLATION_SPACES.map((s) => [
                s.value,
                sampleInterpolationRamp(operandColors, s.value, hueMethod),
            ]),
        ),
);
const hueRamps = computed(
    () =>
        new Map(
            HUE_INTERPOLATION_METHODS.map((m) => [
                m.value,
                sampleInterpolationRamp(operandColors, colorSpace, m.value),
            ]),
        ),
);

const emit = defineEmits<{
    "update:colorSpace": [value: ColorSpace];
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
        <div class="grid grid-cols-2 gap-2">
            <!-- W5-7: the permanent subtitles died — the dropdown's own
                 #description rows already tell the story once, on demand. -->
            <div class="flex flex-col gap-1">
                <label class="section-label">Color space</label>
                <Select :model-value="colorSpace" @update:model-value="(v: AcceptableValue) => emit('update:colorSpace', v as ColorSpace)">
                    <SelectTrigger aria-label="Color space" class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <!-- T-17: chip leading, description after (F7 — the
                             producer #description lane, the one slot reka's
                             SelectValue does NOT clone into the trigger). -->
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
            </div>

            <div class="flex flex-col gap-1">
                <label class="section-label">Hue method</label>
                <Select :model-value="hueMethod" @update:model-value="(v: AcceptableValue) => emit('update:hueMethod', v as HueInterpolationMethod)">
                    <SelectTrigger aria-label="Hue method" class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <!-- T-17: the four-arc quartet, drawn with the user's
                             own colors (current space, candidate arc). -->
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
            </div>
        </div>

        <!-- Leftover strategy (palette mode only) -->
        <div v-if="showLeftoverStrategy" class="flex flex-col gap-1">
            <label class="section-label">Size mismatch</label>
            <Select :model-value="leftoverStrategy" @update:model-value="(v: AcceptableValue) => emit('update:leftoverStrategy', v as LeftoverStrategy)">
                <SelectTrigger aria-label="Size mismatch strategy" class="h-9">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="s in STRATEGIES" :key="s" :value="s">
                        {{ strategyLabels[s] }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>

        <!-- The page's ONE verb — the producer's deliberate-primary register
             (S.W5-6 · L6 rider: consumed at the root vocabulary, never a
             per-instance costume; `default` is the quiet glass capsule and
             read disabled-forever over the wash tier). -->
        <Button
            variant="primary-audacious"
            :disabled="!canMix"
            class="h-10 gap-2 font-medium font-display"
            @click="emit('mix')"
        >
            <Blend class="w-4 h-4" />
            Mix
        </Button>
    </div>
</template>
