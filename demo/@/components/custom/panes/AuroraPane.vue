<template>
    <div class="flex flex-col relative min-w-0 w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-auto lg:h-full max-h-full lg:max-h-[var(--content-max-h)]">
        <!-- TODO: Build config panel using Slider/Card/Collapsible from glass-ui -->
        <div class="rounded-2xl lg:flex-1 lg:min-h-0 p-4 text-sm text-muted-foreground">
            Aurora config
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { AuroraConfig } from "@mkbabb/glass-ui";

const cfg = inject<AuroraConfig>("auroraConfig")!;

/** Value.js-specific defaults (more dramatic than glass-ui's subtle defaults) */
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
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
};
</script>

<style scoped>
@reference "../../../styles/style.css";
</style>
