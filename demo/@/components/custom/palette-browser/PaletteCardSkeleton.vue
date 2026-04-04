<template>
    <div class="rounded-[var(--radius-card)] border border-border bg-card overflow-hidden">
        <!-- Shadow color strip -->
        <div class="flex h-10 w-full">
            <div v-for="i in count" :key="i"
                class="h-full animate-pulse"
                :style="{
                    width: `${100 / count}%`,
                    backgroundColor: 'color-mix(in srgb, var(--muted-foreground) 10%, transparent)',
                    animationDelay: `${i * 0.12}s`,
                }"
            />
        </div>
        <!-- Shadow metadata row -->
        <div class="px-3 py-2.5 flex items-center gap-2">
            <div class="h-5 w-32 rounded-md bg-foreground/[0.06] animate-pulse" />
            <div class="h-5 w-6 rounded-md bg-foreground/[0.04] animate-pulse" style="animation-delay: 0.1s" />
        </div>
        <!-- Shadow swatches -->
        <div class="px-3 pb-3 flex flex-wrap gap-2">
            <div v-for="i in count" :key="i"
                class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-foreground/[0.04] animate-pulse"
                :style="{ animationDelay: `${i * 0.1}s` }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    count?: number;
}>(), {
    count: 5,
});
</script>
