<script setup lang="ts">
import { inject } from "vue";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { Slider } from "@components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Copy, RotateCcw } from "lucide-vue-next";
import { GlassDock } from "@mkbabb/glass-ui/dock";
import PaneHeader from "./PaneHeader.vue";
import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
import { copyToClipboard } from "@mkbabb/glass-ui";

const cfg = inject<AuroraConfig>("auroraConfig")!;

const VALUE_JS_DEFAULTS: Partial<AuroraConfig> = {
    colorMode: "derived",
    surfaceMode: "color",
    surfaceAlpha: 0.70,
    blur: 100,
    speed: 0.40,
    blobCount: 10,
    baseRadius: 0.16,
    radiusVariance: 0.03,
    viewportAnchorRatio: 1.0,
    alphaLight: 0.80,
    alphaDark: 0.60,
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
    orbitAmplitude: 0.25,
    blendMode: "source-over",
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
};

type NumericKey = { [K in keyof AuroraConfig]: AuroraConfig[K] extends number ? K : never }[keyof AuroraConfig];

interface SliderDef {
    key: NumericKey;
    label: string;
    min: number;
    max: number;
    step: number;
}

const BLOBS: SliderDef[] = [
    { key: "blobCount", label: "Count", min: 2, max: 20, step: 1 },
    { key: "baseRadius", label: "Base Radius", min: 0.05, max: 0.50, step: 0.01 },
    { key: "radiusVariance", label: "Radius Variance", min: 0.0, max: 0.20, step: 0.005 },
    { key: "viewportAnchorRatio", label: "Viewport Anchor", min: 0.0, max: 1.0, step: 0.05 },
];

const MOTION: SliderDef[] = [
    { key: "speed", label: "Speed", min: 0.05, max: 2.0, step: 0.05 },
    { key: "orbitAmplitude", label: "Orbit Amplitude", min: 0.0, max: 0.6, step: 0.01 },
    { key: "blur", label: "Blur", min: 20, max: 200, step: 5 },
];

const COLOR_SHIFTS: SliderDef[] = [
    { key: "lShiftLarge", label: "L Shift (Large)", min: 0.0, max: 0.40, step: 0.005 },
    { key: "lShiftSmall", label: "L Shift (Small)", min: 0.0, max: 0.40, step: 0.005 },
    { key: "hueShiftLarge", label: "Hue Shift (Large)", min: 0, max: 120, step: 1 },
    { key: "hueShiftSmall", label: "Hue Shift (Small)", min: 0, max: 120, step: 1 },
];

const SURFACE: SliderDef[] = [
    { key: "surfaceAlpha", label: "Surface Alpha", min: 0.0, max: 1.0, step: 0.01 },
    { key: "alphaLight", label: "Alpha (Light)", min: 0.0, max: 1.0, step: 0.01 },
    { key: "alphaDark", label: "Alpha (Dark)", min: 0.0, max: 1.0, step: 0.01 },
];

const GRADIENT: SliderDef[] = [
    { key: "gradStop2", label: "Stop 2", min: 0.0, max: 1.0, step: 0.01 },
    { key: "gradStop3", label: "Stop 3", min: 0.0, max: 1.0, step: 0.01 },
    { key: "gradStop4", label: "Stop 4", min: 0.0, max: 1.0, step: 0.01 },
];

const SECTIONS = [
    { title: "Blobs", defs: BLOBS },
    { title: "Motion", defs: MOTION },
    { title: "Color Shifts", defs: COLOR_SHIFTS },
    { title: "Surface", defs: SURFACE },
    { title: "Gradient Stops", defs: GRADIENT },
];

function update(key: NumericKey, value: number) {
    (cfg as Record<string, number>)[key] = value;
}

function fmt(v: number): string {
    return Number.isInteger(v) ? String(v) : v.toFixed(3);
}

async function copyAsJson() {
    const snapshot: Record<string, unknown> = {};
    for (const k of Object.keys(VALUE_JS_DEFAULTS) as (keyof AuroraConfig)[]) {
        snapshot[k] = cfg[k];
    }
    await copyToClipboard(JSON.stringify(snapshot, null, 2));
}

function resetDefaults() {
    Object.assign(cfg, VALUE_JS_DEFAULTS);
}
</script>

<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card variant="pane" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full relative">
            <PaneHeader description="Tune the background aurora atmosphere canvas.">
                Atmosphere
            </PaneHeader>

            <div class="flex flex-col gap-5 px-4 sm:px-6 pt-2 pb-20">
                <!-- Selects row -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="flex flex-col gap-1">
                        <span class="section-label normal-case tracking-normal">Color Mode</span>
                        <Select
                            :model-value="cfg.colorMode"
                            @update:model-value="(v: string) => { cfg.colorMode = v as AuroraConfig['colorMode']; }"
                        >
                            <SelectTrigger aria-label="Color mode" class="h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="derived">Derived</SelectItem>
                                <SelectItem value="explicit">Explicit</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="section-label normal-case tracking-normal">Surface Mode</span>
                        <Select
                            :model-value="cfg.surfaceMode"
                            @update:model-value="(v: string) => { cfg.surfaceMode = v as AuroraConfig['surfaceMode']; }"
                        >
                            <SelectTrigger aria-label="Surface mode" class="h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="theme">Theme</SelectItem>
                                <SelectItem value="color">Color</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <!-- Slider sections -->
                <div
                    v-for="section in SECTIONS"
                    :key="section.title"
                    class="flex flex-col gap-2.5"
                >
                    <div class="config-section-header">
                        <span class="config-section-title">{{ section.title }}</span>
                    </div>

                    <div
                        v-for="def in section.defs"
                        :key="def.key"
                        class="flex flex-col gap-0.5"
                    >
                        <div class="flex items-center justify-between">
                            <span class="section-label normal-case tracking-normal">{{ def.label }}</span>
                            <span class="section-label normal-case tracking-normal tabular-nums">
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

            <!-- Floating glass dock at bottom -->
            <div class="config-dock-anchor">
                <GlassDock :always-expanded="true" :fit-content="true">
                    <Button variant="ghost" size="sm" @click="copyAsJson">
                        <Copy class="w-3.5 h-3.5" />
                        Copy JSON
                    </Button>
                    <Button variant="ghost" size="sm" @click="resetDefaults">
                        <RotateCcw class="w-3.5 h-3.5" />
                        Reset
                    </Button>
                </GlassDock>
            </div>
        </Card>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.config-section-header {
    border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
    padding-bottom: 0.375rem;
}

.config-section-title {
    font-family: var(--font-mono);
    font-size: var(--type-small);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    color: var(--muted-foreground);
}

.config-dock-anchor {
    position: sticky;
    bottom: 0.75rem;
    display: flex;
    justify-content: center;
    z-index: 2;
    pointer-events: none;
}

.config-dock-anchor > * {
    pointer-events: auto;
}
</style>
