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
import { Button } from "@components/ui/button";
import { RefreshCw } from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import type { Palette } from "@lib/palette/types";
import {
    useColorGeneration,
    PRESET_NAMES,
    HARMONY_NAMES,
    GENERATION_PRESETS,
    HARMONY_DEFS,
} from "./composables/useColorGeneration";
import type { PresetName, HarmonyName } from "./composables/useColorGeneration";
import type { AcceptableValue } from "reka-ui";

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

// S.W5-6 · F8: the count slider carries the generated ramp itself — the
// extract k-slider pattern (the instrument shows its own state), replacing
// the dead grey spectrum capsule.
const countSliderGradient = computed(() => {
    const colors = palette.value;
    if (colors.length === 0) return "var(--muted)";
    const stops = colors.map((css, i) => {
        const pct = colors.length === 1 ? 50 : (i / (colors.length - 1)) * 100;
        return `${css} ${pct.toFixed(0)}%`;
    });
    return `linear-gradient(to right, ${stops.join(", ")})`;
});

function onPresetChange(value: AcceptableValue) {
    preset.value = value as PresetName;
}

function onHarmonyChange(value: AcceptableValue) {
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
    await copyToClipboard(palette.value.join(", "));
}

defineExpose({ regenerate, save, copyColors });
</script>

<template>
    <!-- S.W5-6 · F8: the deliverable LEADS — palette plate as hero, the page's
         one verb as a real action in the plate's toolbar, generation controls
         as marginalia beneath. The hierarchy inversion (product last, ghost
         verb parked in a metadata row) died here. -->
    <div class="flex flex-col gap-4">
        <PaletteCard
            :palette="generatedPalette"
            :expanded="true"
            :css-color="''"
            editable-name
            @save="save"
            @rename="onRename"
        />

        <!-- The plate's toolbar: the one verb in the deliberate-primary
             register (L6 rider — root vocabulary, no costume); the seed stays
             a Fira bench note, select-all kept. -->
        <div class="flex items-center gap-3 min-w-0">
            <Button
                variant="primary-audacious"
                class="h-10 gap-2 font-medium font-display"
                @click="regenerate()"
            >
                <RefreshCw class="w-4 h-4" />
                Regenerate
            </Button>
            <span
                class="ml-auto text-mono-small text-muted-foreground tabular-nums select-all truncate"
            >
                seed: {{ seed.toString(16).padStart(8, '0') }}
            </span>
        </div>

        <!-- Marginalia: preset & harmony. W5-7 — the permanent subtitles died;
             the dropdown's own #description rows tell the story on demand. -->
        <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
                <span class="section-label">Preset</span>
                <Select :model-value="preset" @update:model-value="onPresetChange">
                    <SelectTrigger aria-label="Generation preset" class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <!-- B.W1: kept wider than --menu-min-w — preset names + descriptions need the space -->
                    <SelectContent class="min-w-[14rem]">
                        <SelectItem
                            v-for="p in PRESET_NAMES"
                            :key="p"
                            :value="p"
                        >
                            {{ capitalize(p) }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ GENERATION_PRESETS[p].description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Harmony</span>
                <Select :model-value="harmony" @update:model-value="onHarmonyChange">
                    <SelectTrigger aria-label="Color harmony" class="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <!-- B.W1: kept wider than --menu-min-w — harmony names + descriptions need the space -->
                    <SelectContent class="min-w-[14rem]">
                        <SelectItem
                            v-for="h in HARMONY_NAMES"
                            :key="h"
                            :value="h"
                        >
                            {{ capitalize(h) }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ HARMONY_DEFS[h].description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <!-- Count — the extract k-slider pattern verbatim: the ramp IS the
             track (F8; S-2/S-16 family cure for the dead grey capsule). -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <label
                class="text-mono-small font-bold text-muted-foreground whitespace-nowrap tabular-nums w-5 text-right"
            >
                {{ count }}
            </label>
            <div class="relative flex-1 h-6 flex items-center">
                <div
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="{ background: countSliderGradient }"
                />
                <Slider
                    aria-label="Color count"
                    variant="spectrum"
                    :model-value="[count]"
                    :min="1"
                    :max="12"
                    :step="1"
                    class="relative w-full"
                    :style="{ '--slider-track-bg': 'transparent' }"
                    @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) count = v[0]; }"
                />
            </div>
        </div>
    </div>
</template>
