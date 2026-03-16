<template>
    <div class="h-10 flex w-full overflow-hidden">
        <div
            v-for="(color, i) in colors"
            :key="i"
            class="h-full shrink-0"
            :style="{
                backgroundColor: color.css,
                width: `${Math.max(100 / colors.length, 0.5)}%`,
            }"
        ></div>
    </div>
</template>

<script setup lang="ts">
import type { PaletteColor } from "@lib/palette/types";

defineProps<{
    colors: PaletteColor[];
}>();
</script>
