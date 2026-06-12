<template>
    <div class="flex flex-col gap-3">
        <!-- K slider — own row, full width, tall track with gradient -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <label class="text-mono-small font-bold text-muted-foreground whitespace-nowrap tabular-nums w-5 text-right">
                {{ k }}
            </label>
            <div class="relative flex-1 h-6 flex items-center">
                <div
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="{ background: gradient }"
                />
                <Slider
                    aria-label="Number of colors"
                    variant="spectrum"
                    :model-value="[k]"
                    :min="1"
                    :max="16"
                    :step="1"
                    class="relative w-full"
                    :style="{ '--slider-track-bg': 'transparent' }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:k', v[0]!)"
                />
            </div>
        </div>

        <!-- Controls row: upload, kC slider, reset -->
        <div class="flex items-center gap-2">
            <DockIconButton
                title="Upload image"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('upload')"
            >
                <Upload class="w-5 h-5 transition-colors" />
            </DockIconButton>

            <DockSeparator />

            <!-- Chroma weight slider -->
            <div class="flex items-center gap-1.5 flex-1 min-w-0">
                <label class="fira-code text-micro text-muted-foreground whitespace-nowrap" title="Chroma weight">kC</label>
                <Slider
                    aria-label="Chroma weight"
                    variant="spectrum"
                    :model-value="[chromaWeight]"
                    :min="0"
                    :max="1.5"
                    :step="0.1"
                    class="flex-1"
                    :style="{ '--slider-track-bg': 'var(--muted)' }"
                    @update:model-value="(v: number[] | undefined) => v && $emit('update:chromaWeight', v[0]!)"
                />
                <span class="fira-code text-micro text-muted-foreground tabular-nums w-5">{{ chromaWeight.toFixed(1) }}</span>
            </div>

            <DockSeparator />

            <DockIconButton
                :disabled="disabled || !hasImage"
                title="Reset"
                :style="{ '--btn-hover-color': cssColor }"
                @click="$emit('reset')"
            >
                <RotateCcw class="w-5 h-5 transition-colors" />
            </DockIconButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Upload, RotateCcw } from "@lucide/vue";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { Slider } from "@components/ui/slider";

defineProps<{
    k: number;
    chromaWeight: number;
    gradient: string;
    cssColor?: string | undefined;
    disabled?: boolean | undefined;
    hasImage?: boolean | undefined;
}>();

defineEmits<{
    "update:k": [value: number];
    "update:chromaWeight": [value: number];
    upload: [];
    reset: [];
}>();
</script>

<style scoped>
@reference "../../../styles/style.css";

/* Touch gate styling for extract sliders */
.touch-gate-target {
    border-radius: var(--radius-pill);
}
</style>
