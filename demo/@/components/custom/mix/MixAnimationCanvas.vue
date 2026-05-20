<script setup lang="ts">
import { useTemplateRef, computed } from "vue";
import { useMixingAnimation } from "./composables/useMixingAnimation";
import type { AnimationPhase } from "./composables/useMixingState";
import type { SelectedColor } from "./composables/useMixingState";

const { phase, selectedColors } = defineProps<{
    phase: AnimationPhase;
    selectedColors: SelectedColor[];
}>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("mixCanvas");

const colorList = computed(() => selectedColors.map((sc) => sc.css));

const phaseRef = computed(() => phase);

useMixingAnimation(canvasRef, colorList, phaseRef);
</script>

<template>
    <!-- W5-a11y: decorative animation canvas — hidden from AT -->
    <canvas
        ref="mixCanvas"
        class="absolute inset-0 w-full h-full pointer-events-none z-controls"
        aria-hidden="true"
    />
</template>
