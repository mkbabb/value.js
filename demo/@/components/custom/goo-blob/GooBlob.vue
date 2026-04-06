<template>
    <div
        ref="wrapperRef"
        class="goo-blob-wrapper"
        :style="{ '--blob-color': color, '--blob-size': `${cfg.canvasSize}px` }"
        @click="emit('click')"
    >
        <canvas ref="canvasRef" class="goo-blob-canvas" />
    </div>
</template>

<script setup lang="ts">
import { inject, reactive, useTemplateRef, watch, toRef } from "vue";
import type { BlobMood, BlobConfig } from "./types";
import { BLOB_CONFIG_DEFAULTS, BLOB_CONFIG_KEY } from "./types";
import { useBlobMood } from "./composables/useBlobMood";
import { useBlobPointer } from "./composables/useBlobPointer";
import { useBlobSatellites } from "./composables/useBlobSatellites";
import { useMetaballRenderer } from "./composables/useMetaballRenderer";

const props = withDefaults(
    defineProps<{
        color: string;
        seed?: string;
    }>(),
    { seed: "" },
);

const emit = defineEmits<{ click: [] }>();

const injectedConfig = inject(BLOB_CONFIG_KEY, null);
const cfg: BlobConfig = injectedConfig ?? reactive({ ...BLOB_CONFIG_DEFAULTS });

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");

const mood = useBlobMood();
const pointer = useBlobPointer(wrapperRef);
const satelliteSystem = useBlobSatellites({
    count: cfg.satelliteCount,
    color: props.color + props.seed,
    orbitRadius: cfg.orbitRadius,
    satelliteRadius: cfg.satelliteRadius,
});

const colorRef = toRef(props, "color");

useMetaballRenderer({
    canvasRef,
    color: colorRef,
    mood,
    pointer,
    satellites: satelliteSystem,
    config: cfg,
});

watch(colorRef, (c) => {
    satelliteSystem.reseed(c + props.seed);
});

function nudge() {
    satelliteSystem.nudge();
}

function setMood(m: BlobMood) {
    mood.setMood(m);
}

defineExpose({ nudge, setMood, currentMood: mood.currentMood });
</script>

<style scoped>
.goo-blob-wrapper {
    width: var(--blob-size);
    height: var(--blob-size);
    position: relative;
    cursor: pointer;
    filter: drop-shadow(
        5px 5px 2.5px
            color-mix(
                in srgb,
                var(--blob-color, transparent) 20%,
                var(--foreground)
            )
    );
    transition: filter var(--duration-slow, 0.3s) var(--ease-standard, ease);
}

.goo-blob-wrapper:hover {
    filter: drop-shadow(
        7px 7px 3px
            color-mix(
                in srgb,
                var(--blob-color, transparent) 25%,
                var(--foreground)
            )
    );
}

.goo-blob-canvas {
    width: 100%;
    height: 100%;
    display: block;
    will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
    .goo-blob-wrapper {
        filter: drop-shadow(
            5px 5px 2.5px
                color-mix(
                    in srgb,
                    var(--blob-color, transparent) 20%,
                    var(--foreground)
                )
        ) !important;
        transition: none !important;
    }
}
</style>
