<script setup lang="ts">
import { useTemplateRef, toRef } from "vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "../../../../../color-session/picker-color";
import { useMixingAnimation } from "./composables/useMixingAnimation";
import type { AnimationPhase, MixResult } from "../composables/useMixingState";

const { phase, result, space, hueMethod } = defineProps<{
    phase: AnimationPhase;
    result: MixResult | null;
    space: PickerSpace;
    hueMethod: HueInterpolationMethod;
}>();

// The ONE clock's completion event — the phase machine's only forward edge.
const emit = defineEmits<{ settled: [] }>();

const canvasRef = useTemplateRef<HTMLCanvasElement>("mixCanvas");

useMixingAnimation(canvasRef, toRef(() => phase), {
    result: toRef(() => result),
    space: toRef(() => space),
    hueMethod: toRef(() => hueMethod),
    onSettled: () => emit("settled"),
});
</script>

<template>
    <!-- W5-a11y: decorative animation canvas — hidden from AT -->
    <canvas
        ref="mixCanvas"
        class="absolute inset-0 w-full h-full pointer-events-none z-controls"
        aria-hidden="true"
    />
</template>
