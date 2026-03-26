<template>
    <div class="flex flex-col relative min-w-0 w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-auto lg:h-full max-h-full lg:max-h-[var(--content-max-h)]">
        <AtmospherePane
            class="rounded-2xl lg:flex-1 lg:min-h-0"
            :config="cfg"
            :defaults="VALUE_JS_DEFAULTS"
        />
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { AtmospherePane } from "@mkbabb/glass-ui";
import type { AtmosphereConfig } from "@mkbabb/glass-ui";

const cfg = inject<AtmosphereConfig>("atmosphereConfig")!;

/** Value.js-specific defaults (more dramatic than glass-ui's subtle defaults) */
const VALUE_JS_DEFAULTS: AtmosphereConfig = {
    bgAlpha: 0.70,
    blur: 100,
    speed: 0.40,
    blobCount: 10,
    blobBaseRadius: 0.16,
    blobRadiusStep: 0.03,
    smallRadiusScale: 0.60,
    peakAlphaLarge: 0.80,
    peakAlphaSmall: 0.60,
    lShiftLarge: 0.15,
    lShiftSmall: 0.10,
    hueShiftLarge: 25,
    hueShiftSmall: 55,
    orbitX: 0.45,
    orbitY: 0.25,
    gradStop2: 0.30,
    gradStop3: 0.60,
    gradStop4: 1.00,
};
</script>

<style scoped>
@reference "../../../styles/style.css";
</style>
