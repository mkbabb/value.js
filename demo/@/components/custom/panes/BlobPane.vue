<script setup lang="ts">
// BlobPane — metaball blob tuning pane. RE-AUTHORED at N.W5.A against
// glass-ui's goo-blob 8-atom nested `BlobConfig` (the old flat 30-key slider
// model is dead). Slider keys are now dot-paths into the cohesive atoms
// (`geometry.bodyRadius`, `membrane.smoothK`, `surface.specStrength`, …);
// ConfigSliderPane resolves them. Three keys the old pane drove —
// `orbitSpeedScale`, `wobbleScale`, `mergeRate` — were abrogated upstream to
// MoodParams-only and are GONE. `color.paletteStops` is omitted: it is the
// live picker-palette feed (App.vue's deriveBlobPalette watch), not a slider.

import { inject } from "vue";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/goo-blob";
import type { BlobConfig } from "@mkbabb/glass-ui/goo-blob";
import ConfigSliderPane from "./ConfigSliderPane.vue";
import type { SliderSection } from "./ConfigSliderPane.vue";

const cfg = inject(BLOB_CONFIG_KEY)!;

// Compile-time guard: every dot-path below addresses a real numeric atom on the
// nested BlobConfig. A typo or an abrogated key fails typecheck here rather than
// silently no-op'ing a slider (the abrogation-silencer the ledger §4 forbids).
type NumericAtomPath = {
    [A in keyof BlobConfig]: BlobConfig[A] extends number
        ? A & string
        : BlobConfig[A] extends readonly unknown[]
          ? never
          : BlobConfig[A] extends object
            ? {
                  [K in keyof BlobConfig[A]]: BlobConfig[A][K] extends number
                      ? `${A & string}.${K & string}`
                      : never;
              }[keyof BlobConfig[A]]
            : never;
}[keyof BlobConfig];

function s(key: NumericAtomPath, label: string, min: number, max: number, step: number) {
    return { key, label, min, max, step };
}

const SECTIONS: SliderSection[] = [
    {
        title: "Geometry",
        defs: [
            s("geometry.bodyRadius", "Body Radius", 0.08, 0.45, 0.005),
            s("geometry.satelliteCount", "Satellites", 0, 4, 1),
            s("geometry.satelliteRadius", "Sat Radius", 0.02, 0.20, 0.005),
            s("geometry.orbitRadius", "Orbit Radius", 0.15, 0.48, 0.005),
            s("geometry.eccentricity", "Eccentricity", 0.0, 0.5, 0.01),
        ],
    },
    {
        title: "Membrane",
        defs: [
            s("membrane.smoothK", "Smooth K", 0.02, 0.45, 0.005),
            s("membrane.warpAmp", "Warp", 0.0, 1.0, 0.01),
            s("membrane.noiseAmp", "Noise Amp", 0.0, 0.10, 0.001),
            s("membrane.noiseFreq", "Noise Freq", 0.5, 10.0, 0.1),
            s("membrane.noiseSpeed", "Noise Speed", 0.0, 0.5, 0.005),
            s("membrane.pulseFreq", "Pulse Freq", 0.0, 2.0, 0.01),
            s("membrane.pulseAmp", "Pulse Amp", 0.0, 0.06, 0.001),
        ],
    },
    {
        title: "Color",
        defs: [
            s("color.hueRange", "Hue Range", 0, 60, 1),
            s("color.satShift", "Saturation", -0.2, 0.2, 0.005),
            s("color.brightnessShift", "Brightness", -0.15, 0.15, 0.005),
            s("color.colorNoiseFreq", "Noise Freq", 0.5, 8.0, 0.1),
            s("color.colorNoiseSpeed", "Noise Speed", 0.0, 0.3, 0.005),
        ],
    },
    {
        title: "Lit Glass",
        defs: [
            s("surface.specStrength", "Specular", 0.0, 2.0, 0.02),
            s("surface.specShininess", "Shininess", 8, 64, 1),
            s("surface.rimStrength", "Rim", 0.0, 2.0, 0.02),
            s("surface.rimPower", "Rim Power", 1.0, 5.0, 0.05),
            s("surface.iridescence", "Iridescence", 0.0, 1.0, 0.01),
            s("surface.sssScale", "Sub-surface", 0.0, 1.0, 0.01),
            s("surface.coreGlow", "Core Glow", 0.0, 1.0, 0.01),
        ],
    },
    {
        title: "Pointer",
        defs: [
            s("interaction.pointerAttraction", "Attraction", -1.0, 1.0, 0.05),
            s("interaction.pointerStrength", "Strength", 0.0, 0.3, 0.005),
            s("interaction.stretch", "Stretch", 0.0, 1.5, 0.05),
            s("interaction.clickImpulse", "Click Impulse", 0.0, 1.0, 0.02),
        ],
    },
    {
        title: "Satellites",
        defs: [
            s("satellites.mergeDuration", "Merge (ms)", 500, 5000, 100),
            s("satellites.emergeDuration", "Emerge (ms)", 500, 5000, 100),
        ],
    },
    {
        title: "Tempo",
        defs: [s("tempo", "Speed", 0.25, 2.5, 0.05)],
    },
];
</script>

<template>
    <ConfigSliderPane
        :config="(cfg as unknown) as Record<string, unknown>"
        :sections="SECTIONS"
        :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
        title="Blob"
        description="Tune metaball geometry, membrane, lit-glass surface, and satellite behavior."
    />
</template>
