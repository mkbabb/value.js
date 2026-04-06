<script setup lang="ts">
import { inject } from "vue";
import { Card } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
import { Label } from "@components/ui/label";
import { Copy, RotateCcw } from "lucide-vue-next";
import PaneHeader from "./PaneHeader.vue";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@components/custom/goo-blob";
import type { BlobConfig } from "@components/custom/goo-blob";
import { copyToClipboard } from "@composables/useClipboard";

const cfg = inject(BLOB_CONFIG_KEY)!;

type NumericKey = { [K in keyof BlobConfig]: BlobConfig[K] extends number ? K : never }[keyof BlobConfig];

interface SliderDef {
    key: NumericKey;
    label: string;
    min: number;
    max: number;
    step: number;
}

const GEOMETRY: SliderDef[] = [
    { key: "canvasSize", label: "Canvas Size", min: 100, max: 400, step: 10 },
    { key: "bodyRadius", label: "Body Radius", min: 0.08, max: 0.45, step: 0.005 },
    { key: "satelliteCount", label: "Satellites", min: 0, max: 4, step: 1 },
    { key: "satelliteRadius", label: "Sat Radius", min: 0.02, max: 0.18, step: 0.005 },
    { key: "orbitRadius", label: "Orbit Radius", min: 0.15, max: 0.48, step: 0.005 },
];

const GOOEY: SliderDef[] = [
    { key: "smoothK", label: "Smooth K", min: 0.02, max: 0.45, step: 0.005 },
];

const NOISE: SliderDef[] = [
    { key: "noiseAmp", label: "Noise Amp", min: 0.0, max: 0.10, step: 0.001 },
    { key: "noiseFreq", label: "Noise Freq", min: 0.5, max: 10.0, step: 0.1 },
    { key: "noiseSpeed", label: "Noise Speed", min: 0.0, max: 0.5, step: 0.005 },
];

const PULSE: SliderDef[] = [
    { key: "pulseFreq", label: "Pulse Freq", min: 0.0, max: 2.0, step: 0.01 },
    { key: "pulseAmp", label: "Pulse Amp", min: 0.0, max: 0.06, step: 0.001 },
];

const COLOR: SliderDef[] = [
    { key: "hueRange", label: "Hue Range", min: 0, max: 60, step: 1 },
    { key: "satShift", label: "Sat Shift", min: -0.2, max: 0.2, step: 0.005 },
    { key: "brightnessShift", label: "Brightness", min: -0.15, max: 0.15, step: 0.005 },
    { key: "colorNoiseFreq", label: "Color Noise Freq", min: 0.5, max: 8.0, step: 0.1 },
    { key: "colorNoiseSpeed", label: "Color Noise Spd", min: 0.0, max: 0.3, step: 0.005 },
];

const POINTER: SliderDef[] = [
    { key: "pointerAttraction", label: "Attraction", min: -1.0, max: 1.0, step: 0.05 },
    { key: "pointerStrength", label: "Strength", min: 0.0, max: 0.3, step: 0.005 },
];

const ORBIT: SliderDef[] = [
    { key: "orbitSpeedScale", label: "Orbit Speed", min: 0.1, max: 3.0, step: 0.05 },
    { key: "wobbleScale", label: "Wobble", min: 0.0, max: 3.0, step: 0.05 },
    { key: "mergeRate", label: "Merge Rate", min: 0.1, max: 3.0, step: 0.05 },
    { key: "mergeDuration", label: "Merge Dur (ms)", min: 500, max: 5000, step: 100 },
    { key: "emergeDuration", label: "Emerge Dur (ms)", min: 500, max: 5000, step: 100 },
];

const SECTIONS = [
    { title: "Geometry", defs: GEOMETRY },
    { title: "Gooey", defs: GOOEY },
    { title: "Surface Noise", defs: NOISE },
    { title: "Pulsation", defs: PULSE },
    { title: "Color Perturbation", defs: COLOR },
    { title: "Pointer", defs: POINTER },
    { title: "Orbit / Satellites", defs: ORBIT },
];

function update(key: NumericKey, value: number) {
    (cfg as Record<string, number>)[key] = value;
}

function fmt(v: number): string {
    return Number.isInteger(v) ? String(v) : v.toFixed(3);
}

async function copyAsJson() {
    const snapshot: Record<string, unknown> = {};
    for (const k of Object.keys(BLOB_CONFIG_DEFAULTS) as (keyof BlobConfig)[]) {
        snapshot[k] = cfg[k];
    }
    await copyToClipboard(JSON.stringify(snapshot, null, 2));
}

function resetDefaults() {
    Object.assign(cfg, BLOB_CONFIG_DEFAULTS);
}
</script>

<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
            <PaneHeader description="Tune metaball geometry, gooey blend, noise, and satellite behavior.">
                Blob
            </PaneHeader>

            <div class="flex flex-col gap-5 pb-6 px-4 sm:px-6 pt-2">
                <!-- Actions -->
                <div class="flex items-center gap-2">
                    <button class="dock-icon-btn-compact" title="Copy config as JSON" @click="copyAsJson">
                        <Copy class="w-4 h-4" />
                        <span class="text-mono-small ml-1">Copy JSON</span>
                    </button>
                    <button class="dock-icon-btn-compact" title="Reset to defaults" @click="resetDefaults">
                        <RotateCcw class="w-4 h-4" />
                        <span class="text-mono-small ml-1">Reset</span>
                    </button>
                </div>

                <!-- Sections -->
                <div
                    v-for="section in SECTIONS"
                    :key="section.title"
                    class="flex flex-col gap-3"
                >
                    <span class="section-label">{{ section.title }}</span>

                    <div
                        v-for="def in section.defs"
                        :key="def.key"
                        class="flex flex-col gap-1"
                    >
                        <div class="flex items-center justify-between">
                            <Label class="text-mono-small text-muted-foreground">{{ def.label }}</Label>
                            <span class="text-mono-small text-muted-foreground tabular-nums">
                                {{ fmt(cfg[def.key] as number) }}
                            </span>
                        </div>
                        <Slider
                            :aria-label="def.label"
                            variant="spectrum"
                            :model-value="[cfg[def.key] as number]"
                            :min="def.min"
                            :max="def.max"
                            :step="def.step"
                            @update:model-value="(v: number[]) => update(def.key, v[0]!)"
                        />
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";
</style>
