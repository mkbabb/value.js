<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

import { clamp, createFpsReporter, getMotionScale, getVisualCapabilityProfile, rgba } from "../lib/helpers";
import type { AtmosphereHeroConfig, HeroPalettePreset } from "../lib/types";

const props = defineProps<{
    config: AtmosphereHeroConfig;
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
    const quality = getVisualCapabilityProfile();

    const render = (now: number) => {
        reportFps();

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const time = now * 0.001 * motionScale * props.config.speed;

        context.clearRect(0, 0, width, height);

        const base = context.createLinearGradient(0, 0, width, height);
        base.addColorStop(0, props.palette.surface);
        base.addColorStop(1, props.palette.surfaceAlt);
        context.fillStyle = base;
        context.fillRect(0, 0, width, height);

        context.save();
        context.filter = `blur(${props.config.blurRadius * quality.blurScale}px) saturate(135%)`;
        context.globalCompositeOperation = "source-over";

        const count = props.config.blobCount;
        const colors = props.palette.atmosphereStops;
        for (let index = 0; index < count; index += 1) {
            const color = colors[index % colors.length];
            const radius = Math.max(width, height) * (0.12 + index * 0.035) * props.config.intensity;
            const x = width * (0.15 + ((index * 0.21) % 0.65)) + Math.sin(time * (0.4 + index * 0.14)) * 48;
            const y = height * (0.18 + ((index * 0.17) % 0.6)) + Math.cos(time * (0.33 + index * 0.11)) * 36;
            const blob = context.createRadialGradient(x, y, 0, x, y, radius);
            blob.addColorStop(0, rgba(color, 1));
            blob.addColorStop(0.36, rgba(color, 0.78));
            blob.addColorStop(0.6, rgba(color, 0.34));
            blob.addColorStop(1, rgba(color, 0));
            context.fillStyle = blob;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2);
            context.fill();
        }

        context.restore();
        context.globalAlpha = 0.18;

        for (let index = 0; index < 70; index += 1) {
            const x = ((index * 91) % width) + Math.sin(time + index) * 6;
            const y = ((index * 53) % height) + Math.cos(time * 0.8 + index) * 4;
            const size = clamp(1 + (index % 3), 1, 3);
            context.fillStyle = index % 2 === 0 ? "rgba(255,255,255,0.22)" : "rgba(17,24,39,0.08)";
            context.fillRect(x, y, size, size);
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
