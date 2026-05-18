<script setup lang="ts">
// BlobPane — metaball blob tuning pane. Consumes ConfigSliderPane (Ae-6
// merge). The slider definitions and section structure are unchanged; the
// slider-pane layout and copy/reset dock are now owned by ConfigSliderPane.

import { inject } from "vue";
import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@components/custom/goo-blob";
import type { BlobConfig } from "@components/custom/goo-blob";
import ConfigSliderPane from "./ConfigSliderPane.vue";
import type { SliderSection } from "./ConfigSliderPane.vue";

const cfg = inject(BLOB_CONFIG_KEY)!;

type NumericKey = {
    [K in keyof BlobConfig]: BlobConfig[K] extends number ? K : never
}[keyof BlobConfig];

// Helper to make the typed key assertion explicit for the section arrays.
function s(key: NumericKey, label: string, min: number, max: number, step: number) {
    return { key, label, min, max, step };
}

const SECTIONS: SliderSection[] = [
    {
        title: "Geometry",
        defs: [
            s("bodyRadius", "Body Radius", 0.08, 0.45, 0.005),
            s("satelliteCount", "Satellites", 0, 4, 1),
            s("satelliteRadius", "Sat Radius", 0.02, 0.20, 0.005),
            s("orbitRadius", "Orbit Radius", 0.15, 0.48, 0.005),
        ],
    },
    {
        title: "Gooey",
        defs: [s("smoothK", "Smooth K", 0.02, 0.45, 0.005)],
    },
    {
        title: "Surface Noise",
        defs: [
            s("noiseAmp", "Amplitude", 0.0, 0.10, 0.001),
            s("noiseFreq", "Frequency", 0.5, 10.0, 0.1),
            s("noiseSpeed", "Speed", 0.0, 0.5, 0.005),
        ],
    },
    {
        title: "Pulsation",
        defs: [
            s("pulseFreq", "Frequency", 0.0, 2.0, 0.01),
            s("pulseAmp", "Amplitude", 0.0, 0.06, 0.001),
        ],
    },
    {
        title: "Color",
        defs: [
            s("hueRange", "Hue Range", 0, 60, 1),
            s("satShift", "Saturation", -0.2, 0.2, 0.005),
            s("brightnessShift", "Brightness", -0.15, 0.15, 0.005),
            s("colorNoiseFreq", "Noise Freq", 0.5, 8.0, 0.1),
            s("colorNoiseSpeed", "Noise Speed", 0.0, 0.3, 0.005),
        ],
    },
    {
        title: "Pointer",
        defs: [
            s("pointerAttraction", "Attraction", -1.0, 1.0, 0.05),
            s("pointerStrength", "Strength", 0.0, 0.3, 0.005),
        ],
    },
    {
        title: "Orbit",
        defs: [
            s("eccentricity", "Eccentricity", 0.0, 0.5, 0.01),
            s("orbitSpeedScale", "Speed", 0.1, 3.0, 0.05),
            s("wobbleScale", "Wobble", 0.0, 3.0, 0.05),
            s("mergeRate", "Merge Rate", 0.1, 3.0, 0.05),
            s("mergeDuration", "Merge (ms)", 500, 5000, 100),
            s("emergeDuration", "Emerge (ms)", 500, 5000, 100),
        ],
    },
];
</script>

<template>
    <ConfigSliderPane
        :config="(cfg as unknown) as Record<string, unknown>"
        :sections="SECTIONS"
        :defaults="(BLOB_CONFIG_DEFAULTS as unknown) as Record<string, unknown>"
        title="Blob"
        description="Tune metaball geometry, gooey blend, noise, and satellite behavior."
    />
</template>
