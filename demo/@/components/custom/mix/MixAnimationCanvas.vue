<script setup lang="ts">
import { useTemplateRef, computed } from "vue";
import { useMixingAnimation } from "@composables/useMixingAnimation";
import type { AnimationPhase } from "@composables/useMixingState";
import type { SelectedColor } from "@composables/useMixingState";

const props = defineProps<{
    phase: AnimationPhase;
    selectedColors: SelectedColor[];
}>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("mixCanvas");

const colorList = computed(() => props.selectedColors.map((sc) => sc.css));

const phaseRef = computed(() => props.phase);

useMixingAnimation(canvasRef, colorList, phaseRef);
</script>

<template>
    <canvas
        ref="mixCanvas"
        class="absolute inset-0 w-full h-full pointer-events-none z-[var(--z-controls)]"
    />
</template>
