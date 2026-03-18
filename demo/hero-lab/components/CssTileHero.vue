<script setup lang="ts">
import { CSSKeyframesAnimation } from "@mkbabb/keyframes.js";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import {
    createAsciiTileSample,
    createFpsReporter,
    getMotionScale,
    sampleGradient,
} from "../lib/helpers";
import type { HeroPalettePreset, TileHeroConfig } from "../lib/types";

interface CssTileState {
    id: number;
    tileStyle: Record<string, string | number>;
    fragments: Array<Record<string, string | number>>;
}

const props = defineProps<{
    config: TileHeroConfig;
    palette: HeroPalettePreset;
}>();

const emit = defineEmits<{
    fps: [value: number];
}>();

const tileCount = 120;
const tileColumns = 12;
const tileRows = Math.ceil(tileCount / tileColumns);
const tileRefs = ref<HTMLElement[]>([]);
const tileStates = ref<CssTileState[]>([]);
const animations: CSSKeyframesAnimation[] = [];
let fpsFrame = 0;
let patternFrame = 0;
let lastPatternUpdate = 0;

const tileStyle = computed(() => ({
    "--hero-tile-size": `${props.config.tileSize}px`,
}));

function setTileRef(element: Element | null, index: number) {
    if (element instanceof HTMLElement) {
        tileRefs.value[index] = element;
    }
}

function buildTileStates(time: number) {
    const motionScale = getMotionScale(props.config.reducedMotion);
    return Array.from({ length: tileCount }, (_, index) => {
        const col = index % tileColumns;
        const row = Math.floor(index / tileColumns);
        const sample = createAsciiTileSample(col, row, tileColumns, tileRows, time * motionScale, props.config);
        const ink = sampleGradient(props.palette.tileStops, Math.min(1, sample.quantized * 0.92 + sample.reveal * 0.14));
        const shadow = sampleGradient(props.palette.tileStops, Math.min(1, sample.quantized * 0.65 + 0.1));

        return {
            id: index,
            tileStyle: {
                background: `linear-gradient(180deg, rgba(255,255,255,${(0.12 + sample.reveal * 0.08).toFixed(3)}), rgba(255,255,255,0) 32%), linear-gradient(145deg, ${props.palette.surface}, ${props.palette.surfaceAlt})`,
                border: `1px solid rgba(255,255,255,${(0.16 + sample.reveal * 0.1).toFixed(3)})`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 20px ${props.palette.shadow}`,
                opacity: (0.86 + sample.reveal * 0.1).toFixed(3),
            },
            fragments: sample.pattern.map((active, fragmentIndex) => ({
                background: `linear-gradient(160deg, ${ink}, ${shadow})`,
                opacity: active ? (0.22 + sample.reveal * 0.7).toFixed(3) : "0.04",
                transform: active
                    ? `scale(${(0.84 + sample.reveal * 0.22).toFixed(3)})`
                    : `scale(${(0.58 + (fragmentIndex % 3) * 0.05).toFixed(3)})`,
            })),
        };
    });
}

function updatePatternStates(now: number) {
    tileStates.value = buildTileStates(now);
}

function restartAnimations() {
    while (animations.length > 0) {
        animations.pop()?.stop();
    }
    cancelAnimationFrame(fpsFrame);
    cancelAnimationFrame(patternFrame);
    lastPatternUpdate = 0;
    updatePatternStates(performance.now());

    nextTick(() => {
        const reportFps = createFpsReporter((value) => emit("fps", value));
        const motionScale = getMotionScale(props.config.reducedMotion);
        const tickFps = () => {
            reportFps();
            fpsFrame = requestAnimationFrame(tickFps);
        };
        fpsFrame = requestAnimationFrame(tickFps);

        const tickPattern = (now: number) => {
            if (now - lastPatternUpdate >= 90) {
                updatePatternStates(now);
                lastPatternUpdate = now;
            }
            patternFrame = requestAnimationFrame(tickPattern);
        };
        patternFrame = requestAnimationFrame(tickPattern);

        tileRefs.value.forEach((element, index) => {
            if (!element) {
                return;
            }

            const band = (index % 7) / 6;
            const amplitude = 2 + band * 6 * props.config.intensity;
            const opacityA = 0.72 + band * 0.08;
            const opacityB = 0.92 + band * 0.05;
            const scaleA = 0.96 + band * 0.02;
            const scaleB = 1.02 + band * 0.04;
            const duration = Math.round((1800 + index * 24) / Math.max(0.25, props.config.speed * motionScale));
            const drift = ((index % 5) - 2) * 1.2;
            const animation = new CSSKeyframesAnimation({
                duration,
                iterationCount: Infinity,
                direction: "alternate",
                fillMode: "both",
                timingFunction: "ease-in-out",
                useWAAPI: true,
            }).fromString(/* css */ `
                @keyframes tile-wave-${index} {
                    0% {
                        transform: translate3d(0px, 0px, 0px) scale(${scaleA});
                        opacity: ${opacityA};
                    }
                    50% {
                        transform: translate3d(${drift}px, -${amplitude}px, 0px) scale(${scaleB});
                        opacity: ${opacityB};
                    }
                    100% {
                        transform: translate3d(${-drift}px, ${Math.max(0, amplitude * 0.22)}px, 0px) scale(${scaleA});
                        opacity: ${opacityA};
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
    cancelAnimationFrame(patternFrame);
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
    <div class="hero-css hero-css--tiles" :style="tileStyle">
        <div
            v-for="(tile, index) in tileStates"
            :key="tile.id"
            :ref="(element) => setTileRef(element, index)"
            class="hero-css__tile"
            :style="tile.tileStyle"
        >
            <span
                v-for="(fragmentStyle, fragmentIndex) in tile.fragments"
                :key="fragmentIndex"
                class="hero-css__fragment"
                :style="fragmentStyle"
            />
        </div>
    </div>
</template>
