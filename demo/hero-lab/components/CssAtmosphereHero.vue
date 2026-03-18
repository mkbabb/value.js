<script setup lang="ts">
import { CSSKeyframesAnimation } from "@mkbabb/keyframes.js";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { createFpsReporter, getMotionScale, getVisualCapabilityProfile, rgba } from "../lib/helpers";
import type { AtmosphereHeroConfig, HeroPalettePreset } from "../lib/types";

const props = defineProps<{
    config: AtmosphereHeroConfig;
    palette: HeroPalettePreset;
}>();

const emit = defineEmits<{
    fps: [value: number];
}>();

const blobRefs = ref<HTMLElement[]>([]);
const animations: CSSKeyframesAnimation[] = [];
let fpsFrame = 0;

const visibleBlobs = computed(() => Array.from({ length: props.config.blobCount }, (_, index) => index));

function setBlobRef(element: Element | null, index: number) {
    if (element instanceof HTMLElement) {
        blobRefs.value[index] = element;
    }
}

function restartAnimations() {
    while (animations.length > 0) {
        animations.pop()?.stop();
    }
    cancelAnimationFrame(fpsFrame);

    nextTick(() => {
        const reportFps = createFpsReporter((value) => emit("fps", value));
        const motionScale = getMotionScale(props.config.reducedMotion);
        const quality = getVisualCapabilityProfile();
        const stops = props.palette.atmosphereStops;
        const tickFps = () => {
            reportFps();
            fpsFrame = requestAnimationFrame(tickFps);
        };
        fpsFrame = requestAnimationFrame(tickFps);

        blobRefs.value.forEach((element, index) => {
            if (!element) {
                return;
            }

            const color = stops[index % stops.length];
            const alpha = 0.54 + (index % 3) * 0.08;
            const scaleA = 0.85 + index * 0.05;
            const scaleB = 1.1 + index * 0.06;
            const x = -28 + index * 9;
            const y = -18 + (index % 3) * 14;
            const duration = Math.round((2200 + index * 260) / Math.max(0.25, props.config.speed * motionScale));

            element.style.background = `radial-gradient(circle at 35% 35%, ${rgba(color, Math.min(1, alpha + 0.22))} 0%, ${rgba(color, alpha)} 32%, ${rgba(color, alpha * 0.45)} 55%, ${rgba(color, 0)} 78%)`;
            element.style.filter = `blur(${props.config.blurRadius * quality.blurScale}px)`;
            const animation = new CSSKeyframesAnimation({
                duration,
                iterationCount: Infinity,
                direction: "alternate",
                fillMode: "both",
                timingFunction: "ease-in-out",
                useWAAPI: true,
            }).fromString(/* css */ `
                @keyframes blob-drift-${index} {
                    0% {
                        transform: translate3d(${x}px, ${y}px, 0px) scale(${scaleA});
                        opacity: 0.42;
                    }
                    50% {
                        transform: translate3d(${x + 44}px, ${y - 32}px, 0px) scale(${scaleB});
                        opacity: 0.92;
                    }
                    100% {
                        transform: translate3d(${x - 18}px, ${y + 28}px, 0px) scale(${scaleA + 0.04});
                        opacity: 0.58;
                    }
                }
            `);

            animation.setTargets(element);
            void animation.play();
            animations.push(animation);
        });
    });
}

onMounted(restartAnimations);
onBeforeUnmount(() => {
    while (animations.length > 0) {
        animations.pop()?.stop();
    }
    cancelAnimationFrame(fpsFrame);
});

watch(
    () => [props.config, props.palette] as const,
    () => {
        restartAnimations();
    },
    { deep: true },
);
</script>

<template>
    <div class="hero-css hero-css--atmosphere">
        <div class="hero-css__wash" :style="{ background: `linear-gradient(145deg, ${palette.surface}, ${palette.surfaceAlt})` }" />
        <div
            v-for="index in visibleBlobs"
            :key="index"
            :ref="(element) => setBlobRef(element, index)"
            class="hero-css__blob"
            :style="{
                width: `${180 + index * 48}px`,
                height: `${180 + index * 48}px`,
                left: `${10 + index * 11}%`,
                top: `${8 + (index % 3) * 18}%`,
            }"
        />
        <div class="hero-css__noise" />
    </div>
</template>
