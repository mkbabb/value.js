<template>
    <!-- The gradient slice: the rendered ribbon (vertical in a tall frame,
         horizontal in a wide one) over the app's own stop rail. -->
    <div
        ref="root"
        class="embed-gradient"
        :data-orientation="tall ? 'vertical' : 'horizontal'"
        :style="{ '--n': String(stops.length) }"
    >
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
            band="swatch-chip paper-grain-overlay"
            v-model:selected-id="selectedStopId"
            @update:position="setStopPosition"
            @add="(position: number) => (selectedStopId = mintStop(position))"
            @remove="removeStop"
        >
            <!-- The stops as watercolour swatches on the rail's one paper
                 strip (its band), as the picker slice's colours sit on theirs. -->
            <template #face="{ stop, selected }">
                <span class="stop-face" :data-selected="selected ? '' : undefined" aria-hidden="true">
                    <span class="stop-checker" />
                    <WatercolorDot
                        :color="stop.cssColor"
                        :seed="seeds.get(stop.id) ?? stop.id"
                        animate
                        class="w-full h-full"
                    />
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
// A stop's silhouette is seeded by the stop, never by its colour: a host stop
// keeps its colour's name from the moment it is set (the same silhouette as
// that colour's swatch in the picker slice) through every later edit, and a
// minted stop seeds from its own id.
const seeds = new Map<string, string>();
if (hostStops.length >= 2) {
    stops.value.forEach((stop, i) => seeds.set(stop.id, hostStops[i]?.name ?? stop.id));
}

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
/* The stops sit on one strip, sized by the picker row's own rule (the strip's
   width shared by the stop count, less the least gap, 1.5rem to 3.5rem), so
   the two rows read as one family. The rail's own tokens size and round its
   seats and it derives all its geometry from them; the band's strip stands
   0.5rem past the seats, inside this slice's padding, and 0.5rem clear of the
   ramp. */
.embed-gradient {
    container-type: inline-size;
    --gap: clamp(0.25rem, 1.5cqi, 0.5rem);
    --swatch-size: clamp(1.5rem, calc((100cqi - (var(--n) - 1) * var(--gap)) / var(--n)), 3.5rem);
    --rail-seat-size: var(--swatch-size);
    --rail-seat-radius: 50%;
    --rail-band-pad: 0.5rem;
    --rail-seat-gutter: calc(2 * var(--rail-band-pad));
}
/* The dot sits over the alpha checker (a translucent stop shows it, inside the
   dot's own silhouette), both in the face's one cell. */
.stop-face {
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    border-radius: 50%;
}
.stop-face > * {
    grid-area: 1 / 1;
}
.stop-checker {
    inline-size: 72%;
    block-size: 72%;
    border-radius: 50%;
    background: var(--alpha-checker);
}
/* The selected stop keeps the rail's dual-contrast ring, drawn round its dot. */
.stop-face[data-selected] {
    box-shadow:
        inset 0 0 0 1px var(--focus-ring-inner),
        0 0 0 2px var(--focus-ring-outer);
}
@media (forced-colors: active) {
    .stop-face[data-selected] {
        outline: 2px solid Highlight;
    }
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
