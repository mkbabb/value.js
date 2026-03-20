<template>
    <div
        v-if="leftLabel && rightLabel"
        class="flex items-center justify-center gap-0 px-4 pb-2"
    >
        <div class="inline-flex rounded-full border border-border/60 bg-card/80 backdrop-blur-xl overflow-hidden">
            <button
                :class="[
                    'px-4 py-1.5 text-sm fraunces font-bold transition-all cursor-pointer focus-ring',
                    modelValue === 0
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                ]"
                @click="emit('update:modelValue', 0)"
            >
                {{ leftLabel }}
            </button>
            <button
                :class="[
                    'px-4 py-1.5 text-sm fraunces font-bold transition-all cursor-pointer focus-ring',
                    modelValue === 1
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                ]"
                @click="emit('update:modelValue', 1)"
            >
                {{ rightLabel }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: 0 | 1;
    leftLabel: string | null;
    rightLabel: string | null;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: 0 | 1];
}>();
</script>
