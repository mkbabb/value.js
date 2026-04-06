<script setup lang="ts">
import { inject } from "vue";
import { Card } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
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
    { key: "satelliteRadius", label: "Sat Radius", min: 0.02, max: 0.20, step: 0.005 },
    { key: "orbitRadius", label: "Orbit Radius", min: 0.15, max: 0.48, step: 0.005 },
];

const GOOEY: SliderDef[] = [
    { key: "smoothK", label: "Smooth K", min: 0.02, max: 0.45, step: 0.005 },
];

const NOISE: SliderDef[] = [
    { key: "noiseAmp", label: "Amplitude", min: 0.0, max: 0.10, step: 0.001 },
    { key: "noiseFreq", label: "Frequency", min: 0.5, max: 10.0, step: 0.1 },
    { key: "noiseSpeed", label: "Speed", min: 0.0, max: 0.5, step: 0.005 },
];

const PULSE: SliderDef[] = [
    { key: "pulseFreq", label: "Frequency", min: 0.0, max: 2.0, step: 0.01 },
    { key: "pulseAmp", label: "Amplitude", min: 0.0, max: 0.06, step: 0.001 },
];

const COLOR: SliderDef[] = [
    { key: "hueRange", label: "Hue Range", min: 0, max: 60, step: 1 },
    { key: "satShift", label: "Saturation", min: -0.2, max: 0.2, step: 0.005 },
    { key: "brightnessShift", label: "Brightness", min: -0.15, max: 0.15, step: 0.005 },
    { key: "colorNoiseFreq", label: "Noise Freq", min: 0.5, max: 8.0, step: 0.1 },
    { key: "colorNoiseSpeed", label: "Noise Speed", min: 0.0, max: 0.3, step: 0.005 },
];

const POINTER: SliderDef[] = [
    { key: "pointerAttraction", label: "Attraction", min: -1.0, max: 1.0, step: 0.05 },
    { key: "pointerStrength", label: "Strength", min: 0.0, max: 0.3, step: 0.005 },
];

const ORBIT: SliderDef[] = [
    { key: "orbitSpeedScale", label: "Orbit Speed", min: 0.1, max: 3.0, step: 0.05 },
    { key: "wobbleScale", label: "Wobble", min: 0.0, max: 3.0, step: 0.05 },
    { key: "mergeRate", label: "Merge Rate", min: 0.1, max: 3.0, step: 0.05 },
    { key: "mergeDuration", label: "Merge (ms)", min: 500, max: 5000, step: 100 },
    { key: "emergeDuration", label: "Emerge (ms)", min: 500, max: 5000, step: 100 },
];

const SECTIONS = [
    { title: "Geometry", defs: GEOMETRY },
    { title: "Gooey", defs: GOOEY },
    { title: "Surface Noise", defs: NOISE },
    { title: "Pulsation", defs: PULSE },
    { title: "Color", defs: COLOR },
    { title: "Pointer", defs: POINTER },
    { title: "Orbit", defs: ORBIT },
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
        <Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
            <PaneHeader description="Tune metaball geometry, gooey blend, noise, and satellite behavior.">
                Blob
            </PaneHeader>

            <div class="flex flex-col gap-5 px-4 sm:px-6 pt-2 pb-20">
                <div
                    v-for="section in SECTIONS"
                    :key="section.title"
                    class="flex flex-col gap-2.5"
                >
                    <span class="section-label">{{ section.title }}</span>

                    <div
                        v-for="def in section.defs"
                        :key="def.key"
                        class="flex flex-col gap-0.5"
                    >
                        <div class="flex items-center justify-between">
                            <span class="font-mono-code text-[length:var(--type-caption)] text-muted-foreground">{{ def.label }}</span>
                            <span class="font-mono-code text-[length:var(--type-caption)] text-muted-foreground tabular-nums">
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

            <!-- Floating bottom action dock -->
            <div class="blob-action-dock">
                <button class="dock-icon-btn-compact" title="Copy config as JSON" @click="copyAsJson">
                    <Copy class="w-4 h-4" />
                    <span class="font-mono-code text-[length:var(--type-caption)]">Copy JSON</span>
                </button>
                <div class="dock-separator" />
                <button class="dock-icon-btn-compact" title="Reset to defaults" @click="resetDefaults">
                    <RotateCcw class="w-4 h-4" />
                    <span class="font-mono-code text-[length:var(--type-caption)]">Reset</span>
                </button>
            </div>
        </Card>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.blob-action-dock {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: color-mix(in srgb, var(--card) 70%, transparent);
    border-top: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
    z-index: 2;
}
</style>
