<template>
    <div class="flex items-center gap-2">
        <button
            class="dock-icon-btn"
            :disabled="disabled"
            title="Camera"
            :style="{ '--hover-color': cssColor }"
            @click="$emit('camera')"
        >
            <Camera class="w-5 h-5 transition-colors" />
        </button>

        <div class="dock-separator" />

        <!-- K slider with gradient track -->
        <div class="flex items-center gap-2 flex-1 min-w-0">
            <label class="fira-code text-[11px] text-muted-foreground whitespace-nowrap tabular-nums">
                {{ k }}
            </label>
            <div class="relative flex-1 h-5 flex items-center">
                <div
                    class="absolute inset-0 rounded-full overflow-hidden h-5"
                    :style="{ background: gradient }"
                />
                <input
                    :value="k"
                    type="range"
                    min="1"
                    max="16"
                    class="extract-slider relative w-full h-5 cursor-pointer appearance-none bg-transparent"
                    @input="$emit('update:k', Number(($event.target as HTMLInputElement).value))"
                />
            </div>
        </div>

        <div class="dock-separator" />

        <!-- Chroma weight -->
        <div class="flex items-center gap-1.5">
            <label class="fira-code text-[10px] text-muted-foreground/60 whitespace-nowrap" title="Chroma weight">kC</label>
            <input
                :value="chromaWeight"
                type="range"
                min="0"
                max="1.5"
                step="0.1"
                class="extract-slider w-12 h-4 cursor-pointer appearance-none bg-transparent"
                :style="{ '--track-bg': 'hsl(var(--muted))' }"
                @input="$emit('update:chromaWeight', Number(($event.target as HTMLInputElement).value))"
            />
            <span class="fira-code text-[10px] text-muted-foreground/50 tabular-nums w-5">{{ chromaWeight.toFixed(1) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Camera } from "lucide-vue-next";

defineProps<{
    k: number;
    chromaWeight: number;
    gradient: string;
    cssColor?: string;
    disabled?: boolean;
}>();

defineEmits<{
    "update:k": [value: number];
    "update:chromaWeight": [value: number];
    camera: [];
}>();
</script>

<style scoped>
@reference "../../../styles/style.css";

/* Camera button hover → current color (matches ActionButton pattern) */
.dock-icon-btn:hover:not(:disabled) svg {
    color: var(--hover-color, hsl(var(--foreground)));
}

.extract-slider {
    -webkit-appearance: none;
    appearance: none;
}
.extract-slider::-webkit-slider-runnable-track {
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider::-moz-range-track {
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: var(--track-bg, transparent);
}
.extract-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.625rem;
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
    transition: border-color var(--duration-fast) ease, transform var(--duration-fast) var(--ease-spring);
}
.extract-slider::-moz-range-thumb {
    width: 0.625rem;
    height: 1.25rem;
    border-radius: var(--radius-pill);
    background: transparent;
    border: 2px solid hsl(var(--foreground) / 0.4);
    cursor: pointer;
}
.extract-slider:hover::-webkit-slider-thumb {
    border-color: hsl(var(--foreground) / 0.7);
    transform: scaleY(1.1);
}
</style>
