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
        >
            <!-- The stops as watercolour swatches: the app's own dot on the
                 paper chip, as the picker slice's colours sit. -->
            <template #face="{ stop }">
                <span class="swatch-chip paper-grain-overlay" aria-hidden="true">
                    <WatercolorDot :color="stop.cssColor" v-bind="seedOf(stop)" animate class="w-full h-full" />
                </span>
            </template>
        </GradientStopRail>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";
import { useGradientModel } from "../../workbenches/gradient/composables/useGradientModel";
import GradientStopRail from "../../workbenches/gradient/GradientVisualizer/GradientStopRail.vue";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import type { GradientStop } from "../../workbenches/gradient/model/types";
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
// A stop's dot takes its host colour's name as its seed, so it wears the same
// silhouette as that colour's swatch in the picker slice.
const nameOf = new Map(hostStops.map((s) => [s.css, s.name ?? s.css]));
const seedOf = (stop: GradientStop) => {
    const seed = nameOf.get(stop.cssColor);
    return seed === undefined ? {} : { seed };
};

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
/* The stops are watercolour chips here, a size up from the workbench's disc
   seat so the dot reads as paint; the rail derives all its geometry from it. */
.embed-gradient :deep(.rail-seat) {
    --rail-handle-size: 1.75rem;
}
.embed-gradient :deep(.rail-handle) {
    border-radius: var(--radius-sm);
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
