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
import { useWatercolorBlob } from "./composables/useWatercolorBlob";

const props = withDefaults(
    defineProps<{
        color: string;
        animate?: boolean;
        tag?: "div" | "button";
        cycleDuration?: number;
        range?: [number, number];
        seed?: string;
    }>(),
    {
        animate: false,
        tag: "div",
        cycleDuration: 4000,
        range: () => [20, 80],
        seed: "",
    },
);

const colorRef = toRef(props, "color");
const hovered = ref(false);

const blob = useWatercolorBlob(colorRef, {
    animate: props.animate,
    cycleDuration: props.cycleDuration,
    range: props.range,
    seed: props.seed,
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

<style>
/* Watercolor swatch — organic pastel blobs */
.watercolor-swatch {
    border-radius: 48% 52% 55% 45% / 52% 48% 45% 55%;
    filter: url(#watercolor-filter);
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 35%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 2px 6px color-mix(in srgb, var(--foreground) 10%, transparent);
    transition: transform var(--duration-fast) var(--ease-standard),
                border-radius 0.6s var(--ease-standard),
                filter var(--duration-fast) var(--ease-standard),
                box-shadow var(--duration-fast) var(--ease-standard);
    position: relative;
}
/* Animated blobs: disable CSS transition so rAF-driven border-radius updates render immediately */
.watercolor-swatch.watercolor-animated {
    transition: transform var(--duration-fast) var(--ease-standard),
                filter var(--duration-fast) var(--ease-standard),
                box-shadow var(--duration-fast) var(--ease-standard);
}
.watercolor-swatch:hover {
    transform: scale(1.06);
    filter: url(#watercolor-filter) brightness(1.05);
    box-shadow:
        inset 0 0 8px color-mix(in srgb, var(--background) 40%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 4px 12px color-mix(in srgb, var(--foreground) 15%, transparent);
}
.watercolor-swatch:active {
    transform: scale(0.97);
}

/* Remove default button border from watercolor swatches (palette dots) */
button.watercolor-swatch {
    border: none;
    padding: 0;
    outline: none;
}
button.watercolor-swatch:focus-visible {
    outline: none;
    box-shadow:
        inset 0 0 6px color-mix(in srgb, var(--background) 35%, transparent),
        inset 0 -2px 4px color-mix(in srgb, var(--foreground) 6%, transparent),
        0 2px 8px color-mix(in srgb, var(--foreground) 20%, transparent);
}
</style>
