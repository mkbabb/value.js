<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import {
    clamp,
    createAsciiTileSample,
    createFpsReporter,
    getMotionScale,
    getVisualCapabilityProfile,
    sampleGradient,
} from "../lib/helpers";
import type { HeroPalettePreset, TileHeroConfig } from "../lib/types";

const props = defineProps<{
    config: TileHeroConfig;
    palette: HeroPalettePreset;
}>();

const emit = defineEmits<{
    fps: [value: number];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let frame = 0;
let observer: ResizeObserver | null = null;

function mountScene() {
    cancelAnimationFrame(frame);
    observer?.disconnect();

    const canvas = canvasRef.value;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
        return;
    }

    const resize = () => {
        const { clientWidth, clientHeight } = canvas;
        const dpr = Math.min(window.devicePixelRatio || 1, getVisualCapabilityProfile().dprMax);
        canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
        canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
    };

    resize();
    observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reportFps = createFpsReporter((value) => emit("fps", value));
    const motionScale = getMotionScale(props.config.reducedMotion);

    const render = (now: number) => {
        reportFps();

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        context.clearRect(0, 0, width, height);

        const gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, props.palette.surface);
        gradient.addColorStop(1, props.palette.surfaceAlt);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        const tile = props.config.tileSize;
        const gap = Math.max(2, Math.round(tile * 0.14));
        const cols = Math.ceil(width / tile);
        const rows = Math.ceil(height / tile);
        const time = now * motionScale;

        for (let row = 0; row < rows; row += 1) {
            for (let col = 0; col < cols; col += 1) {
                const x = col * tile;
                const y = row * tile;
                const sample = createAsciiTileSample(col, row, cols, rows, time, props.config);
                const size = clamp(tile - gap, 6, tile);
                const inset = (tile - size) * 0.5;
                const baseColor = sampleGradient(props.palette.tileStops, sample.quantized * 0.75 + 0.08);
                const inkColor = sampleGradient(props.palette.tileStops, clamp(sample.quantized * 0.94 + sample.reveal * 0.12, 0, 1));
                const cellGap = Math.max(1, Math.floor(size * 0.05));
                const cellSize = Math.max(2, Math.floor((size - cellGap * 2) / 3));

                context.fillStyle = baseColor;
                context.globalAlpha = 0.16 + sample.reveal * 0.18;
                context.fillRect(x + inset, y + inset, size, size);

                context.globalAlpha = 0.14;
                context.fillStyle = "#ffffff";
                context.fillRect(x + inset, y + inset, size, Math.max(1, size * 0.1));

                context.fillStyle = inkColor;
                context.globalAlpha = 0.28 + sample.reveal * 0.64;

                for (let index = 0; index < sample.pattern.length; index += 1) {
                    if (!sample.pattern[index]) {
                        continue;
                    }

                    const cellX = index % 3;
                    const cellY = Math.floor(index / 3);
                    context.fillRect(
                        x + inset + cellX * (cellSize + cellGap),
                        y + inset + cellY * (cellSize + cellGap),
                        cellSize,
                        cellSize,
                    );
                }
            }
        }

        context.globalAlpha = 1;
        frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
}

onMounted(mountScene);
onBeforeUnmount(() => {
    cancelAnimationFrame(frame);
    observer?.disconnect();
});
watch(
    () => [props.config, props.palette] as const,
    () => {
        mountScene();
    },
    { deep: true },
);
</script>

<template>
    <canvas ref="canvasRef" class="hero-canvas" />
</template>
