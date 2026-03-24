<script setup lang="ts">
import { computed } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { GRADIENT_EASING_NAMES, resolveEasing } from "./composables/useGradientModel";

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const curvePoints = computed(() => {
    const fn = resolveEasing(props.modelValue);
    const steps = 30;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const v = fn(t);
        pts.push(`${t},${1 - v}`);
    }
    return pts.join(" ");
});

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
</script>

<template>
    <div class="flex items-center gap-2">
        <Select :model-value="modelValue" @update:model-value="(v: string) => emit('update:modelValue', v)">
            <SelectTrigger class="h-9 text-xs min-w-[9rem]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent class="max-h-[16rem] min-w-[10rem]">
                <SelectItem
                    v-for="name in GRADIENT_EASING_NAMES"
                    :key="name"
                    :value="name"
                    class="text-xs"
                >
                    {{ capitalize(name) }}
                </SelectItem>
            </SelectContent>
        </Select>
        <svg width="48" height="32" viewBox="-0.05 -0.3 1.1 1.6" preserveAspectRatio="none"
             class="rounded-md border border-border/30 shrink-0">
            <!-- Bounding box -->
            <rect x="0" y="0" width="1" height="1" fill="none" stroke="hsl(var(--border))" stroke-width="0.02" opacity="0.3" />
            <!-- Diagonal reference -->
            <line x1="0" y1="1" x2="1" y2="0" stroke="hsl(var(--border))" stroke-width="0.02" stroke-dasharray="0.04 0.03" opacity="0.3" />
            <!-- Easing curve -->
            <polyline :points="curvePoints" fill="none" stroke="hsl(248, 88%, 71%)" stroke-width="0.06" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
</template>
