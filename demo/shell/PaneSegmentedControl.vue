<template>
    <div
        v-if="leftLabel && rightLabel"
        class="pane-segmented-control flex items-center justify-center"
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

<style scoped>
/* S.W7-2 (S-7, design-dock-shell P0-2) — the ROOT-LEVEL compact variant.
 * This control lives inside the dock's mobile aperture (312px at 390w);
 * the full-word labels were the space hog that pushed the ⋮ overflow
 * trigger past the pill's edge. Below sm the control compacts AT THE ROOT
 * (never per-instance): tighter tab padding + the caption type rung on
 * the producer's own .segmented-tab hook. The former wrapper `px-4 pb-2`
 * (32px of dead horizontal padding inside the pill) is deleted — the dock
 * owns its item gaps. NO truncation, NO clamp: the labels stay whole
 * (the Ad-18 clampLabel class of workaround must not spread — L8). */
@media (max-width: 639px) {
    .pane-segmented-control :deep(.segmented-tab) {
        padding: 0.25rem 0.375rem;
        font-size: var(--type-caption);
    }
}
</style>
