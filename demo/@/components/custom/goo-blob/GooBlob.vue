<template>
    <div
        ref="wrapperRef"
        class="goo-blob-wrapper"
        :style="{ '--blob-color': color, '--blob-size': `${size}px` }"
        @click="emit('click')"
    >
        <canvas ref="canvasRef" class="goo-blob-canvas" />
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef, watch, toRef } from "vue";
import type { BlobMood } from "./types";
import { useBlobMood } from "./composables/useBlobMood";
import { useBlobPointer } from "./composables/useBlobPointer";
import { useBlobSatellites } from "./composables/useBlobSatellites";
import { useMetaballRenderer } from "./composables/useMetaballRenderer";

const props = withDefaults(
    defineProps<{
        color: string;
        size?: number;
        satellites?: number;
        seed?: string;
    }>(),
    {
        size: 150,
        satellites: 2,
        seed: "",
    },
);

const emit = defineEmits<{ click: [] }>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");

const mood = useBlobMood();
const pointer = useBlobPointer(wrapperRef);
const satelliteSystem = useBlobSatellites({
    count: props.satellites,
    color: props.color + props.seed,
});

const colorRef = toRef(props, "color");

useMetaballRenderer({
    canvasRef,
    color: colorRef,
    mood,
    pointer,
    satellites: satelliteSystem,
    size: props.size,
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
