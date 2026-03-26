<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import { Blend } from "lucide-vue-next";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/utils";
import type { LeftoverStrategy } from "@lib/palette/mix";
import { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "@components/custom/gradient/composables/useGradientModel";

const props = defineProps<{
    colorSpace: ColorSpace;
    hueMethod: HueInterpolationMethod;
    leftoverStrategy: LeftoverStrategy;
    showLeftoverStrategy: boolean;
    canMix: boolean;
}>();

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
            <div class="flex flex-col gap-1">
                <label class="section-label">Color space</label>
                <span class="section-subtitle">{{ INTERPOLATION_SPACES.find(s => s.value === colorSpace)?.description }}</span>
                <Select :model-value="colorSpace" @update:model-value="(v: string) => emit('update:colorSpace', v as ColorSpace)">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="s in INTERPOLATION_SPACES" :key="s.value" :value="s.value">
                            {{ s.label }}
                            <template #description>
                                <span class="text-2xs text-muted-foreground/60">{{ s.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <label class="section-label">Hue method</label>
                <span class="section-subtitle">{{ HUE_INTERPOLATION_METHODS.find(m => m.value === hueMethod)?.description }}</span>
                <Select :model-value="hueMethod" @update:model-value="(v: string) => emit('update:hueMethod', v as HueInterpolationMethod)">
                    <SelectTrigger class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="m in HUE_INTERPOLATION_METHODS" :key="m.value" :value="m.value">
                            {{ m.label }}
                            <template #description>
                                <span class="text-2xs text-muted-foreground/60">{{ m.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <!-- Leftover strategy (palette mode only) -->
        <div v-if="showLeftoverStrategy" class="flex flex-col gap-1">
            <label class="section-label">Size mismatch</label>
            <Select :model-value="leftoverStrategy" @update:model-value="(v: string) => emit('update:leftoverStrategy', v as LeftoverStrategy)">
                <SelectTrigger class="h-9">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="s in STRATEGIES" :key="s" :value="s">
                        {{ strategyLabels[s] }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>

        <!-- Mix button -->
        <Button
            :disabled="!canMix"
            class="h-10 gap-2 font-medium fraunces"
            @click="emit('mix')"
        >
            <Blend class="w-4 h-4" />
            Mix
        </Button>
    </div>
</template>
