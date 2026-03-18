<script setup lang="ts">
import { computed } from "vue";

import { Label } from "@components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Switch } from "@components/ui/switch";

import { HERO_PALETTES } from "../lib/palettes";
import type { AtmosphereHeroConfig, TileHeroConfig } from "../lib/types";

const props = defineProps<{
    kind: "tile" | "atmosphere";
    modelValue: TileHeroConfig | AtmosphereHeroConfig;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: TileHeroConfig | AtmosphereHeroConfig];
}>();

const config = computed(() => props.modelValue);

function updateConfig(patch: Partial<TileHeroConfig & AtmosphereHeroConfig>) {
    emit("update:modelValue", {
        ...props.modelValue,
        ...patch,
    });
}
</script>

<template>
    <div class="hero-controls">
        <div class="hero-controls__field hero-controls__field--wide">
            <Label class="hero-controls__label">Palette</Label>
            <Select
                :model-value="config.paletteId"
                @update:model-value="(paletteId) => updateConfig({ paletteId: String(paletteId) })"
            >
                <SelectTrigger class="hero-controls__trigger w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="palette in HERO_PALETTES" :key="palette.id" :value="palette.id">
                            {{ palette.label }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>

        <div class="hero-controls__field">
            <Label class="hero-controls__label">Speed</Label>
            <Slider
                :model-value="[config.speed]"
                :min="0.4"
                :max="1.8"
                :step="0.05"
                @update:model-value="(value) => updateConfig({ speed: value[0] ?? config.speed })"
            />
        </div>

        <div class="hero-controls__field">
            <Label class="hero-controls__label">Intensity</Label>
            <Slider
                :model-value="[config.intensity]"
                :min="0.45"
                :max="1.35"
                :step="0.05"
                @update:model-value="(value) => updateConfig({ intensity: value[0] ?? config.intensity })"
            />
        </div>

        <div v-if="kind === 'tile'" class="hero-controls__field">
            <Label class="hero-controls__label">Tile Size</Label>
            <Slider
                :model-value="[config.tileSize]"
                :min="12"
                :max="42"
                :step="1"
                @update:model-value="(value) => updateConfig({ tileSize: value[0] ?? config.tileSize })"
            />
        </div>

        <div v-if="kind === 'tile'" class="hero-controls__field">
            <Label class="hero-controls__label">Bands</Label>
            <Slider
                :model-value="[config.bands]"
                :min="5"
                :max="7"
                :step="1"
                @update:model-value="(value) => updateConfig({ bands: value[0] ?? config.bands })"
            />
        </div>

        <div v-if="kind === 'tile'" class="hero-controls__field">
            <Label class="hero-controls__label">Pattern Density</Label>
            <Slider
                :model-value="[config.patternDensity]"
                :min="0.45"
                :max="1"
                :step="0.05"
                @update:model-value="(value) => updateConfig({ patternDensity: value[0] ?? config.patternDensity })"
            />
        </div>

        <div v-if="kind === 'tile'" class="hero-controls__field">
            <Label class="hero-controls__label">Dither</Label>
            <Slider
                :model-value="[config.ditherStrength]"
                :min="0"
                :max="1"
                :step="0.05"
                @update:model-value="(value) => updateConfig({ ditherStrength: value[0] ?? config.ditherStrength })"
            />
        </div>

        <div v-if="kind === 'tile'" class="hero-controls__field">
            <Label class="hero-controls__label">Reveal Speed</Label>
            <Slider
                :model-value="[config.revealSpeed]"
                :min="0.4"
                :max="1.8"
                :step="0.05"
                @update:model-value="(value) => updateConfig({ revealSpeed: value[0] ?? config.revealSpeed })"
            />
        </div>

        <div v-else class="hero-controls__field">
            <Label class="hero-controls__label">Blur Radius</Label>
            <Slider
                :model-value="[config.blurRadius]"
                :min="18"
                :max="90"
                :step="1"
                @update:model-value="(value) => updateConfig({ blurRadius: value[0] ?? config.blurRadius })"
            />
        </div>

        <div v-if="kind === 'atmosphere'" class="hero-controls__field">
            <Label class="hero-controls__label">Blob Count</Label>
            <Slider
                :model-value="[config.blobCount]"
                :min="3"
                :max="7"
                :step="1"
                @update:model-value="(value) => updateConfig({ blobCount: value[0] ?? config.blobCount })"
            />
        </div>

        <div class="hero-controls__field hero-controls__field--toggle">
            <Label class="hero-controls__label">Reduced Motion</Label>
            <Switch
                :model-value="config.reducedMotion"
                @update:model-value="(value) => updateConfig({ reducedMotion: Boolean(value) })"
            />
        </div>
    </div>
</template>
