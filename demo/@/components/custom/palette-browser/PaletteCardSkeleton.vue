<template>
    <!-- R.W4 Lane A / A2+F3 (U20): the loading bones consume glass-ui
         Skeleton surface="glass" variant="shimmer" — glassy, light-passing,
         with a travelling sheen — replacing the former too-black opaque
         `animate-pulse` blocks. The shell itself speaks the same Z2 card
         grammar as PaletteCard (the --card-edge hairline + chip-scale
         cartoon rung), so the ghost reads as "a palette card developing",
         not as a foreign grey box. -->
    <div class="rounded-card border border-card-edge bg-card/60 overflow-hidden shadow-cartoon-sm">
        <!-- Shadow color strip -->
        <div class="flex h-10 w-full">
            <Skeleton
                v-for="i in count"
                :key="i"
                surface="glass"
                variant="shimmer"
                class="h-full rounded-none"
                :style="{
                    width: `${100 / (count ?? 5)}%`,
                    animationDelay: `${i * 0.12}s`,
                }"
            />
        </div>
        <!-- Shadow metadata row -->
        <div class="px-3 py-2.5 flex items-center gap-2">
            <Skeleton surface="glass" variant="shimmer" class="h-5 w-32 rounded-md" />
            <Skeleton surface="glass" variant="shimmer" class="h-5 w-6 rounded-md" style="animation-delay: 0.1s" />
        </div>
        <!-- Shadow swatches -->
        <div class="px-3 pb-3 flex flex-wrap gap-2">
            <Skeleton
                v-for="i in count"
                :key="i"
                surface="glass"
                variant="shimmer"
                class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-badge"
                :style="{ animationDelay: `${i * 0.1}s` }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Skeleton } from "@components/ui/skeleton";

withDefaults(defineProps<{
    count?: number;
}>(), {
    count: 5,
});
</script>
