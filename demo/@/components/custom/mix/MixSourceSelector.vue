<script setup lang="ts">
import { inject, computed, watch, ref, TransitionGroup } from "vue";
import { Plus, X, Palette as PaletteIcon } from "lucide-vue-next";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import WatercolorDot from "@components/custom/watercolor-dot/WatercolorDot.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardSkeleton from "@components/custom/palette-browser/PaletteCardSkeleton.vue";
import type { Palette } from "@lib/palette/types";
import type { SelectedColor } from "./composables/useMixingState";

const props = defineProps<{
    mode: "colors" | "palettes";
    selectedColors: SelectedColor[];
    selectedPalettes: Palette[];
    cssColorOpaque?: string;
}>();

const emit = defineEmits<{
    "update:mode": [mode: "colors" | "palettes"];
    addColor: [css: string, source: string];
    removeColor: [index: number];
    addPalette: [palette: Palette];
    removePalette: [id: string];
}>();

const pm = inject(PALETTE_MANAGER_KEY);
const savedPalettes = computed(() => pm?.savedPalettes.value ?? []);

function isPaletteSelected(id: string): boolean {
    return props.selectedPalettes.some((p) => p.id === id);
}

function togglePalette(palette: Palette) {
    if (isPaletteSelected(palette.id)) {
        emit("removePalette", palette.id);
    } else {
        emit("addPalette", palette);
    }
}

function addCurrentColor() {
    if (props.cssColorOpaque) {
        emit("addColor", props.cssColorOpaque, "picker");
    }
}

// --- Stable keys for TransitionGroup ---
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    props.selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) {
            swatchKeyMap.set(mapKey, swatchKeyCounter++);
        }
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(
    () => props.selectedColors,
    () => {
        const validKeys = new Set(props.selectedColors.map((sc, i) => `${sc.css}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
    },
);
</script>

<template>
    <div class="flex flex-col gap-3">
        <!-- Inline segmented control -->
        <div class="flex items-center justify-center pb-1">
            <div class="flex items-center gap-0.5 rounded-full bg-foreground/5 p-0.5">
                <button
                    :class="[
                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer focus-ring',
                        mode === 'colors'
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    ]"
                    @click="emit('update:mode', 'colors')"
                >
                    Colors
                </button>
                <button
                    :class="[
                        'px-2.5 py-0.5 text-xs fraunces rounded-full transition-all cursor-pointer focus-ring',
                        mode === 'palettes'
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
                    ]"
                    @click="emit('update:mode', 'palettes')"
                >
                    Palettes
                </button>
            </div>
        </div>

        <!-- Colors mode -->
        <template v-if="mode === 'colors'">
            <!-- Selected colors + add button -->
            <div class="max-w-sm rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 grid gap-2">
                <div class="flex items-center justify-between">
                    <span class="fraunces text-sm font-bold text-muted-foreground">Selected</span>
                    <span v-if="selectedColors.length > 0" class="fira-code text-xs text-muted-foreground">{{ selectedColors.length }} colors</span>
                </div>
                <TransitionGroup
                    name="swatch-item"
                    tag="div"
                    class="flex items-center gap-2.5 flex-wrap"
                >
                    <div
                        v-for="(sc, i) in selectedColors"
                        :key="swatchKeys[i]"
                        class="group relative"
                    >
                        <WatercolorDot
                            :color="sc.css"
                            tag="div"
                            class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 ring-2 ring-primary/50"
                            :title="`${sc.css} (${sc.source})`"
                        />
                        <button
                            class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                            @click="emit('removeColor', i)"
                        >
                            <X class="w-2.5 h-2.5" />
                        </button>
                    </div>

                    <!-- Add current color swatch -->
                    <button
                        key="__add__"
                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer watercolor-swatch border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all"
                        @click="addCurrentColor"
                    >
                        <Plus class="w-5 h-5 text-primary/40" />
                    </button>
                </TransitionGroup>
            </div>

            <!-- Palette swatches to pick from -->
            <div v-if="savedPalettes.length > 0" class="flex flex-col gap-2">
                <span class="fira-code text-xs text-muted-foreground uppercase tracking-wide">From palettes</span>
                <div
                    v-for="palette in savedPalettes"
                    :key="palette.id"
                    class="flex flex-col gap-1.5"
                >
                    <span class="fraunces text-xs text-muted-foreground truncate">{{ palette.name }}</span>
                    <div class="flex flex-wrap gap-1.5">
                        <WatercolorDot
                            v-for="(color, ci) in palette.colors"
                            :key="ci"
                            :color="color.css"
                            tag="button"
                            class="w-8 h-8 shrink-0 cursor-pointer"
                            :title="color.css"
                            :seed="`palette-${palette.id}-${ci}`"
                            @click="emit('addColor', color.css, palette.name)"
                        />
                    </div>
                </div>
            </div>
        </template>

        <!-- Palettes mode -->
        <template v-else>
            <PaletteCardSkeleton v-if="savedPalettes.length === 0" :count="3" />
            <div
                v-for="palette in savedPalettes"
                :key="palette.id"
                :class="[
                    'cursor-pointer transition-all rounded-2xl',
                    isPaletteSelected(palette.id)
                        ? 'ring-2 ring-primary'
                        : 'hover:shadow-md',
                ]"
                @click="togglePalette(palette)"
            >
                <PaletteCard
                    :palette="palette"
                    :css-color="''"
                />
            </div>

            <div v-if="selectedPalettes.length > 0" class="fira-code text-xs text-muted-foreground">
                {{ selectedPalettes.length }} palette{{ selectedPalettes.length === 1 ? '' : 's' }} selected
            </div>
        </template>
    </div>
</template>
