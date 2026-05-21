<script setup lang="ts">
import { inject, computed, watch, ref, TransitionGroup } from "vue";
import { Plus, X, ChevronDown } from "@lucide/vue";
import { BouncyTabs } from "@mkbabb/glass-ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@components/ui/collapsible";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import WatercolorDot from "@components/custom/watercolor-dot/WatercolorDot.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardSkeleton from "@components/custom/palette-browser/PaletteCardSkeleton.vue";
import PaletteColorStrip from "@components/custom/palette-browser/PaletteColorStrip.vue";
import type { Palette } from "@lib/palette/types";
import type { SelectedColor } from "./composables/useMixingState";

const {
    mode,
    selectedColors,
    selectedPalettes,
    cssColorOpaque,
} = defineProps<{
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

// Source guards: remove needs ≥ 1 remaining, add stops at a sensible upper bound.
const MIN_COLORS = 1;
const MAX_COLORS = 12;
const canRemoveColor = computed(() => selectedColors.length > MIN_COLORS);
const canAddColor = computed(() => selectedColors.length < MAX_COLORS);

const tabOptions = [
    { label: "Colors", value: "colors" },
    { label: "Palettes", value: "palettes" },
];

function onTabChange(value: string) {
    emit("update:mode", value as "colors" | "palettes");
}

function isPaletteSelected(id: string): boolean {
    return selectedPalettes.some((p) => p.id === id);
}

function togglePalette(palette: Palette) {
    if (isPaletteSelected(palette.id)) {
        emit("removePalette", palette.id);
    } else {
        emit("addPalette", palette);
    }
}

function addCurrentColor() {
    if (cssColorOpaque) {
        emit("addColor", cssColorOpaque, "picker");
    }
}

// --- Palette dropdown for "From palettes" in colors mode ---
const paletteDropdownOpen = ref(false);

// --- Stable keys for TransitionGroup ---
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) {
            swatchKeyMap.set(mapKey, swatchKeyCounter++);
        }
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(
    () => selectedColors,
    () => {
        const validKeys = new Set(selectedColors.map((sc, i) => `${sc.css}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
    },
);
</script>

<template>
    <div class="flex flex-col gap-3">
        <!-- Bouncy segmented control -->
        <div class="flex items-center justify-center pb-1">
            <BouncyTabs
                variant="pill"
                :options="tabOptions"
                :model-value="mode"
                @update:model-value="onTabChange"
            />
        </div>

        <!-- Colors mode -->
        <template v-if="mode === 'colors'">
            <!-- Selected colors + add button -->
            <div class="dashed-well">
                <div class="flex items-center justify-between">
                    <span class="text-small font-display font-semibold text-muted-foreground">Selected</span>
                    <span v-if="selectedColors.length > 0" class="text-mono-small text-muted-foreground">{{ selectedColors.length }} colors</span>
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
                            class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-popover active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                            :disabled="!canRemoveColor || undefined"
                            @click="emit('removeColor', i)"
                        >
                            <X class="w-2.5 h-2.5" />
                        </button>
                    </div>

                    <!-- Add current color swatch -->
                    <button
                        key="__add__"
                        class="w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer watercolor-swatch border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center hover:scale-110 hover:border-primary/60 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                        :disabled="!canAddColor || undefined"
                        @click="addCurrentColor"
                    >
                        <Plus class="w-5 h-5 text-primary/40" />
                    </button>
                </TransitionGroup>
            </div>

            <!-- From palettes — collapsible dropdown of PaletteCards -->
            <Collapsible v-if="savedPalettes.length > 0" v-model:open="paletteDropdownOpen">
                <CollapsibleTrigger class="flex items-center gap-2 w-full cursor-pointer group py-1">
                    <span class="section-label">From palettes</span>
                    <span class="text-micro text-muted-foreground">{{ savedPalettes.length }}</span>
                    <div class="flex-1" />
                    <ChevronDown
                        class="w-4 h-4 text-muted-foreground/50 transition-transform group-hover:text-foreground"
                        :class="paletteDropdownOpen && 'rotate-180'"
                    />
                </CollapsibleTrigger>
                <CollapsibleContent class="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                    <div class="flex flex-col gap-2 pt-2">
                        <div
                            v-for="palette in savedPalettes"
                            :key="palette.id"
                            class="rounded-card border border-border/30 overflow-hidden"
                        >
                            <!-- Compact palette header with color strip + name -->
                            <PaletteColorStrip :colors="palette.colors" />
                            <div class="px-3 py-2 flex items-center justify-between gap-2">
                                <span class="text-small font-display font-semibold truncate">{{ palette.name }}</span>
                                <span class="fira-code text-micro text-muted-foreground shrink-0">{{ palette.colors.length }}</span>
                            </div>
                            <!-- Clickable swatches -->
                            <div class="px-3 pb-3 flex flex-wrap gap-1.5">
                                <!-- W5-a11y: swatch button needs accessible name -->
                                <WatercolorDot
                                    v-for="(color, ci) in palette.colors"
                                    :key="ci"
                                    :color="color.css"
                                    tag="button"
                                    class="w-8 h-8 shrink-0 cursor-pointer"
                                    :title="color.css"
                                    :aria-label="`Add color ${color.css} from ${palette.name}`"
                                    :seed="`palette-${palette.id}-${ci}`"
                                    @click="emit('addColor', color.css, palette.name)"
                                />
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </template>

        <!-- Palettes mode -->
        <template v-else>
            <PaletteCardSkeleton v-if="savedPalettes.length === 0" :count="3" />
            <!-- W5-a11y: native <button> for keyboard reach + aria-pressed for selection state -->
            <button
                v-for="palette in savedPalettes"
                :key="palette.id"
                type="button"
                :aria-pressed="isPaletteSelected(palette.id)"
                :aria-label="`${isPaletteSelected(palette.id) ? 'Deselect' : 'Select'} palette ${palette.name}`"
                :class="[
                    'cursor-pointer transition-all rounded-card w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                    isPaletteSelected(palette.id)
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'opacity-75 hover:opacity-100',
                ]"
                @click="togglePalette(palette)"
            >
                <PaletteCard
                    :palette="palette"
                    :css-color="''"
                />
            </button>

            <div v-if="selectedPalettes.length > 0" class="text-mono-small text-muted-foreground">
                {{ selectedPalettes.length }} palette{{ selectedPalettes.length === 1 ? '' : 's' }} selected
            </div>
        </template>
    </div>
</template>
