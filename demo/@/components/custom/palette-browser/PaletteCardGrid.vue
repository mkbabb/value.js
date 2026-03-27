<template>
    <div class="palette-card-grid grid grid-cols-1 gap-3 min-h-[120px]" :class="gridClass">
        <slot />
        <p
            v-if="empty"
            class="text-center text-muted-foreground py-8 font-mono-code text-base italic"
        >
            {{ emptyText }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    empty?: boolean;
    emptyText?: string;
    gridClass?: string;
}>();
</script>
