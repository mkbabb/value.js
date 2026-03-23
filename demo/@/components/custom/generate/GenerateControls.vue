<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { RefreshCw } from "lucide-vue-next";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import type { Palette } from "@lib/palette/types";
import {
    useColorGeneration,
    PRESET_NAMES,
    HARMONY_NAMES,
    GENERATION_PRESETS,
    HARMONY_DEFS,
} from "@composables/useColorGeneration";
import type { PresetName, HarmonyName } from "@composables/useColorGeneration";

const {
    preset,
    harmony,
    count,
    seed,
    palette,
    regenerate,
} = useColorGeneration();

const emit = defineEmits<{
    save: [colors: string[]];
}>();

const paletteName = ref("Generated Palette");

const generatedPalette = computed<Palette>(() => ({
    id: `gen-${seed.value}`,
    name: paletteName.value,
    slug: `gen-${seed.value}`,
    colors: palette.value.map((css, i) => ({ css, position: i })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true,
}));

function onPresetChange(value: string) {
    preset.value = value as PresetName;
}

function onHarmonyChange(value: string) {
    harmony.value = value as HarmonyName;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

function save() {
    emit("save", [...palette.value]);
}

function onRename(_palette: Palette, newName: string) {
    paletteName.value = newName;
}

async function copyColors() {
    const { copyToClipboard } = await import("@composables/useClipboard");
    await copyToClipboard(palette.value.join(", "));
}

defineExpose({ regenerate, save, copyColors });
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Controls -->
        <div class="rounded-2xl border border-border/20 p-4 flex flex-col gap-4">
            <h3 class="fraunces text-lg text-muted-foreground">Controls</h3>

            <!-- Preset & Harmony in 2-col grid -->
            <div class="grid grid-cols-2 gap-3 items-end">
                <div class="flex flex-col gap-1">
                    <span class="section-label">Preset</span>
                    <span class="section-subtitle">{{ GENERATION_PRESETS[preset].description }}</span>
                    <Select :model-value="preset" @update:model-value="onPresetChange">
                        <SelectTrigger class="h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent class="min-w-[14rem]">
                            <SelectItem
                                v-for="p in PRESET_NAMES"
                                :key="p"
                                :value="p"
                            >
                                {{ capitalize(p) }}
                                <template #description>
                                    <span class="text-[10px] text-muted-foreground/60">{{ GENERATION_PRESETS[p].description }}</span>
                                </template>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex flex-col gap-1">
                    <span class="section-label">Harmony</span>
                    <span class="section-subtitle">{{ HARMONY_DEFS[harmony].description }}</span>
                    <Select :model-value="harmony" @update:model-value="onHarmonyChange">
                        <SelectTrigger class="h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent class="min-w-[14rem]">
                            <SelectItem
                                v-for="h in HARMONY_NAMES"
                                :key="h"
                                :value="h"
                            >
                                {{ capitalize(h) }}
                                <template #description>
                                    <span class="text-[10px] text-muted-foreground/60">{{ HARMONY_DEFS[h].description }}</span>
                                </template>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <!-- Count slider -->
            <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                    <span class="section-label">Count</span>
                    <span class="fira-code text-xs text-muted-foreground tabular-nums">{{ count }}</span>
                </div>
                <Slider
                    :model-value="[count]"
                    :min="1"
                    :max="12"
                    :step="1"
                    @update:model-value="(v: number[]) => count = v[0]!"
                />
            </div>

            <!-- Seed row -->
            <div class="flex items-center gap-1">
                <span class="fira-code text-xs text-muted-foreground/60 tabular-nums select-all">
                    seed: {{ seed.toString(16).padStart(8, '0') }}
                </span>
                <button
                    class="dock-icon-btn-compact ml-auto"
                    title="Regenerate"
                    @click="regenerate()"
                >
                    <RefreshCw class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Generated palette -->
        <PaletteCard
            :palette="generatedPalette"
            :expanded="true"
            :css-color="''"
            editable-name
            @save="save"
            @rename="onRename"
        />
    </div>
</template>
