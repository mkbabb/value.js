<template>
    <!-- The gradient slice: the rendered ribbon (vertical in a tall frame,
         horizontal in a wide one) over the app's own stop rail. -->
    <div ref="root" class="embed-gradient" :data-orientation="tall ? 'vertical' : 'horizontal'">
        <div
            class="embed-gradient-ribbon rounded-card border border-card-edge"
            role="img"
            aria-label="Gradient"
            :style="{ '--ribbon': coalescedCSS }"
        />
        <GradientStopRail
            :stops="stops"
            :can-remove="canRemove"
            :rail-ramp="railRampCSS"
            :interpolation-space="interpolationSpace"
            :hue-method="hueMethod"
            v-model:selected-id="selectedStopId"
            @update:position="setStopPosition"
            @add="(position: number) => (selectedStopId = mintStop(position))"
            @remove="removeStop"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";
import { useGradientModel } from "../../workbenches/gradient/composables/useGradientModel";
import GradientStopRail from "../../workbenches/gradient/GradientVisualizer/GradientStopRail.vue";
import type { SliceStop } from "./params";

const { stops: hostStops } = defineProps<{ stops: SliceStop[] }>();

const {
    direction,
    stops,
    interpolationSpace,
    hueMethod,
    coalescedCSS,
    railRampCSS,
    canRemove,
    mintStop,
    removeStop,
    setStopPosition,
    setStopsFromColors,
} = useGradientModel();

if (hostStops.length >= 2) setStopsFromColors(hostStops.map((s) => s.css));

const selectedStopId = ref<string | null>(null);

// The ribbon runs along the frame's long axis.
const root = useTemplateRef<HTMLElement>("root");
const { width, height } = useElementSize(root);
const tall = computed(() => height.value > width.value);
watchEffect(() => {
    direction.value = tall.value ? 180 : 90;
});
</script>

<style scoped>
.embed-gradient {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    block-size: 100svh;
    padding: 0.75rem;
}
.embed-gradient-ribbon {
    flex: 1 1 auto;
    min-block-size: 4rem;
    background: var(--ribbon), var(--alpha-checker);
    background-repeat: no-repeat, repeat;
    background-size:
        100% 100%,
        16px 16px;
}
</style>
