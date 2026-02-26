<template>
    <component
        :is="tag"
        :class="['watercolor-swatch', animate && 'watercolor-animated']"
        :style="{
            backgroundColor: color,
            borderRadius: activeBorderRadius,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="hovered = false"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from "vue";
import { useWatercolorBlob } from "@composables/useWatercolorBlob";

const props = withDefaults(
    defineProps<{
        color: string;
        animate?: boolean;
        tag?: "div" | "button";
        cycleDuration?: number;
        range?: [number, number];
    }>(),
    {
        animate: false,
        tag: "div",
        cycleDuration: 4000,
        range: () => [20, 80],
    },
);

const colorRef = toRef(props, "color");
const hovered = ref(false);

const blob = useWatercolorBlob(colorRef, {
    animate: props.animate,
    cycleDuration: props.cycleDuration,
    range: props.range,
});

function onMouseEnter() {
    hovered.value = true;
    if (props.animate) blob.nudge();
}

// When animating passively, always use the rAF-driven borderRadius.
// When static, morph to hoverBorderRadius on hover (CSS transition handles smoothing).
const activeBorderRadius = computed(() => {
    if (props.animate) return blob.borderRadius.value;
    return hovered.value ? blob.hoverBorderRadius.value : blob.borderRadius.value;
});
</script>
