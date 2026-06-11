<template>
    <div
        v-if="leftLabel && rightLabel"
        class="flex items-center justify-center gap-0 px-4 pb-2"
    >
        <SegmentedTabs
            variant="pill"
            :options="tabOptions"
            :model-value="String(modelValue)"
            class="font-display"
            @update:model-value="(v) => emit('update:modelValue', Number(v) as 0 | 1)"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";

const { modelValue, leftLabel, rightLabel } = defineProps<{
    modelValue: 0 | 1;
    leftLabel: string | null;
    rightLabel: string | null;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: 0 | 1];
}>();

const tabOptions = computed(() => [
    { label: leftLabel ?? "", value: "0" },
    { label: rightLabel ?? "", value: "1" },
]);
</script>
