<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
            <PaneHeader description="Pull palettes from any image.">Extract</PaneHeader>
            <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2">
                <!-- Image upload area — click opens eyedropper when image is loaded -->
                <ImageDropZone
                    ref="dropZoneRef"
                    class="min-h-[180px] max-h-[min(320px,40vh)]"
                    :preview="previewDataUrl"
                    :disable-click="!!previewDataUrl"
                    @file="onFile"
                    @click="previewDataUrl && (eyedropperActive = true)"
                />

                <!-- Controls below image -->
                <ExtractControls
                    class="shrink-0"
                    :k="colorCount"
                    :chroma-weight="chromaWeight"
                    :gradient="kSliderGradient"
                    :css-color="cssColorOpaque ?? ''"
                    :disabled="isProcessing"
                    :has-image="!!previewDataUrl"
                    @update:k="onKChange"
                    @update:chroma-weight="onChromaChange"
                    @upload="openFilePicker()"
                    @reset="onReset"
                />

                <!-- Processing indicator -->
                <div v-if="isProcessing" class="flex items-center gap-2 justify-center py-2">
                    <div class="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-primary animate-spin" />
                    <span class="fira-code text-xs text-muted-foreground">Extracting...</span>
                </div>

                <!-- Error -->
                <div v-if="quantizeError" class="fira-code text-xs text-destructive px-1">
                    {{ quantizeError }}
                </div>

                <!-- Extracted palette or shadow placeholder -->
                <Transition name="fade-slide" mode="out-in">
                    <PaletteCard
                        v-if="extractedPalette && !isProcessing"
                        key="extracted"
                        :palette="extractedPalette"
                        :expanded="true"
                        :css-color="cssColorOpaque ?? ''"
                        swatch-class="w-12 h-12 sm:w-14 sm:h-14"
                        editable-name
                        @click="() => {}"
                        @apply="onApply"
                        @save="onSave"
                        @rename="onRename"
                        @add-color="(css) => pm.emitAddColor(css)"
                    />
                    <PaletteCardSkeleton v-else-if="!isProcessing" key="shadow" :count="colorCount" />
                </Transition>
            </div>
        </Card>

        <!-- Eyedropper overlay — outside scrollable Card, covers the wrapper -->
        <ImageEyedropper
            v-if="eyedropperActive && previewDataUrl"
            :image-url="previewDataUrl"
            :color-space="colorSpace"
            @close="eyedropperActive = false"
            @pick="onEyedropperApply"
            @add-to-palette="onEyedropperAddToPalette"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onBeforeUnmount, onMounted, inject } from "vue";
import { Card } from "@components/ui/card";
import { useImageQuantize } from "@composables/useImageQuantize";
import { usePaletteStore } from "@composables/usePaletteStore";
import type { Palette, PaletteColor } from "@lib/palette/types";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import { VIEW_MANAGER_KEY } from "@composables/useViewManager";
import type { ColorSpace } from "@src/units/color/constants";
type DisplayColorSpace = ColorSpace | "hex";

import ImageDropZone from "@components/custom/image-palette-extractor/ImageDropZone.vue";
import ExtractControls from "@components/custom/image-palette-extractor/ExtractControls.vue";
import ImageEyedropper from "@components/custom/image-palette-extractor/ImageEyedropper.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardSkeleton from "@components/custom/palette-browser/PaletteCardSkeleton.vue";
import PaneHeader from "./PaneHeader.vue";

const props = withDefaults(defineProps<{
    cssColorOpaque?: string;
    colorSpace?: DisplayColorSpace;
}>(), {
    colorSpace: "hex",
});

const pm = inject(PALETTE_MANAGER_KEY)!;
const viewManager = inject(VIEW_MANAGER_KEY)!;

const { palette, isProcessing, error: quantizeError, quantizeFromFile } = useImageQuantize();
const { createPalette } = usePaletteStore();

const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);

const previewDataUrl = ref<string | null>(null);
const colorCount = ref(5);
const chromaWeight = ref(0.5);
const lastFile = shallowRef<File | null>(null);
const paletteName = ref("Extracted Palette");
const eyedropperActive = ref(false);
const isWide = ref(false);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let mediaQuery: MediaQueryList | null = null;

onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 640px)");
    isWide.value = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { isWide.value = e.matches; };
    mediaQuery.addEventListener("change", handler);
    onBeforeUnmount(() => mediaQuery?.removeEventListener("change", handler));
});


const extractedPalette = computed<Palette | null>(() => {
    if (palette.value.length === 0) return null;
    const colors: PaletteColor[] = palette.value.map((c, i) => ({
        css: c.css,
        position: i / Math.max(1, palette.value.length - 1),
    }));
    return {
        id: "__extracted__",
        name: paletteName.value,
        slug: "extracted",
        colors,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLocal: true,
    };
});

const kSliderGradient = computed(() => {
    if (palette.value.length === 0) return "hsl(var(--muted))";
    const stops = palette.value.map((c, i) => {
        const pct = palette.value.length === 1 ? 50 : (i / (palette.value.length - 1)) * 100;
        return `${c.css} ${pct.toFixed(0)}%`;
    });
    return `linear-gradient(to right, ${stops.join(", ")})`;
});

function runQuantize() {
    if (lastFile.value) {
        quantizeFromFile(lastFile.value, colorCount.value);
    }
}

function debouncedReQuantize() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runQuantize, 300);
}

function readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function openFilePicker() {
    dropZoneRef.value?.openFilePicker();
}

async function onFile(file: File) {
    lastFile.value = file;
    previewDataUrl.value = await readAsDataUrl(file);
    runQuantize();
}

function onKChange(k: number) {
    colorCount.value = k;
    debouncedReQuantize();
}

function onChromaChange(v: number) {
    chromaWeight.value = v;
    debouncedReQuantize();
}

function onReset() {
    colorCount.value = 5;
    chromaWeight.value = 0.5;
    if (lastFile.value) runQuantize();
}

function onApply(p: Palette) {
    pm.emitApply(p.colors.map((c) => c.css));
}

function onSave(p: Palette) {
    createPalette(p.name, p.colors);
}

function onRename(_p: Palette, newName: string) {
    paletteName.value = newName;
}

function onEyedropperApply(css: string) {
    pm.emitSetCurrentColor(css);
}

function onEyedropperAddToPalette(css: string) {
    // Add to current palette's saved colors
    pm.emitAddColor(css);
}

onBeforeUnmount(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

