<template>
    <TooltipProvider :skip-delay-duration="0" :delay-duration="100">
        <Tooltip>
            <TooltipTrigger as-child>
                <GooBlob
                    ref="gooBlobRef"
                    :color="cssColorOpaque"
                    class="-ml-[2rem] -mb-[2rem]"
                    @click="onBlobClick"
                />
            </TooltipTrigger>
            <TooltipContent class="font-mono-code">
                {{ denormalizedCurrentColor.value.toFormattedString() }}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import { inject, useTemplateRef, watch, ref, onUnmounted } from "vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@components/ui/tooltip";
import { GooBlob } from "@components/custom/goo-blob";
import { COLOR_MODEL_KEY } from "../keys";

const { cssColorOpaque, denormalizedCurrentColor } = inject(COLOR_MODEL_KEY)!;

const emit = defineEmits<{ click: [] }>();

const gooBlobRef = useTemplateRef<InstanceType<typeof GooBlob>>("gooBlobRef");

// --- Mood triggers ---

let idleTimer: ReturnType<typeof setTimeout> | null = null;
let moodResetTimer: ReturnType<typeof setTimeout> | null = null;
const colorChangeTimestamps: number[] = [];

function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        gooBlobRef.value?.setMood("sleepy");
    }, 15000);
}

function cancelMoodAfter(ms: number) {
    if (moodResetTimer) clearTimeout(moodResetTimer);
    moodResetTimer = setTimeout(() => {
        gooBlobRef.value?.setMood("idle");
        resetIdleTimer();
    }, ms);
}

function onBlobClick() {
    emit("click");
    gooBlobRef.value?.setMood("happy");
    gooBlobRef.value?.nudge();
    cancelMoodAfter(3000);
    resetIdleTimer();
}

// Rapid color changes → excited
watch(cssColorOpaque, () => {
    resetIdleTimer();
    const now = Date.now();
    colorChangeTimestamps.push(now);
    // Keep only last 2 seconds
    while (colorChangeTimestamps.length > 0 && now - colorChangeTimestamps[0] > 2000) {
        colorChangeTimestamps.shift();
    }
    if (colorChangeTimestamps.length > 3) {
        gooBlobRef.value?.setMood("excited");
        cancelMoodAfter(4000);
    }
});

resetIdleTimer();

onUnmounted(() => {
    if (idleTimer) clearTimeout(idleTimer);
    if (moodResetTimer) clearTimeout(moodResetTimer);
});

function nudgeSatellites() {
    gooBlobRef.value?.nudge();
}

defineExpose({ nudgeSatellites });
</script>
