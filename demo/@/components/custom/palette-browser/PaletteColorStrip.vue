<template>
    <div
        :class="[
            'overflow-hidden',
            orientation === 'vertical'
                ? 'flex flex-col w-10 h-full'
                : 'flex h-10 w-full',
        ]"
    >
        <div
            v-for="(color, i) in colors"
            :key="i"
            class="shrink-0"
            :class="orientation === 'vertical' ? 'w-full' : 'h-full'"
            :style="{
                backgroundColor: color.css,
                [orientation === 'vertical' ? 'height' : 'width']:
                    `${Math.max(100 / colors.length, 0.5)}%`,
            }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import type { PaletteColor } from "@lib/palette/types";

withDefaults(
    defineProps<{
        colors: PaletteColor[];
        orientation?: "horizontal" | "vertical";
    }>(),
    { orientation: "horizontal" },
);
</script>
