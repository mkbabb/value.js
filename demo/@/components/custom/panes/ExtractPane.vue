<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
            <div class="px-4 sm:px-6 pt-4 pb-2 sticky top-0 z-10 backdrop-blur-md">
                <h3 class="fraunces text-3xl sm:text-4xl tracking-tight">
                    Extract
                </h3>
                <p class="text-sm text-muted-foreground/60 fira-code">Pull palettes from any image.</p>
            </div>
            <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2">
                <!-- Image upload area -->
                <ImageDropZone class="min-h-[180px] max-h-[min(320px,40vh)]" :preview="previewDataUrl" @file="onFile" />

                <!-- Camera viewfinder -->
                <Transition name="expand-fade">
                    <div v-if="cameraActive" class="relative rounded-2xl overflow-hidden bg-black shrink-0">
                        <video
                            ref="videoRef"
                            autoplay
                            playsinline
                            muted
                            class="w-full max-h-[200px] object-cover"
                        />
                        <div class="absolute inset-x-0 bottom-0 flex justify-center p-2.5 bg-gradient-to-t from-black/50 to-transparent">
                            <button class="dock-icon-btn !w-9 !h-9 !bg-white/20 hover:!bg-white/40 backdrop-blur-sm" @click="captureFrame">
                                <Aperture class="w-4.5 h-4.5 text-white" />
                            </button>
                        </div>
                    </div>
                </Transition>

                <!-- Controls below image -->
                <ExtractControls
                    class="shrink-0"
                    :k="colorCount"
                    :chroma-weight="chromaWeight"
                    :gradient="kSliderGradient"
                    :css-color="cssColorOpaque ?? ''"
                    :disabled="isProcessing || cameraActive"
                    :has-image="!!previewDataUrl"
                    @update:k="onKChange"
                    @update:chroma-weight="onChromaChange"
                    @camera="startCamera"
                    @eyedropper="eyedropperActive = true"
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
                <Transition name="expand-fade" mode="out-in">
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
                    <!-- Shadow palette placeholder — mirrors PaletteCard structure -->
                    <div v-else-if="!isProcessing" key="shadow" class="rounded-2xl border border-border/50 bg-card overflow-hidden">
                        <!-- Shadow color strip -->
                        <div class="flex h-10 w-full">
                            <div v-for="i in colorCount" :key="i"
                                class="h-full animate-pulse"
                                :style="{
                                    width: `${100 / colorCount}%`,
                                    backgroundColor: 'hsl(var(--muted))',
                                    animationDelay: `${i * 0.12}s`,
                                }"
                            />
                        </div>
                        <!-- Shadow metadata row -->
                        <div class="px-3 py-2.5 flex items-center gap-2">
                            <div class="h-5 w-32 rounded-md bg-muted/60 animate-pulse" />
                            <div class="h-5 w-6 rounded-md bg-muted/40 animate-pulse" style="animation-delay: 0.1s" />
                        </div>
                        <!-- Shadow swatches -->
                        <div class="px-3 pb-3 flex flex-wrap gap-2">
                            <div v-for="i in colorCount" :key="i"
                                class="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl bg-muted/30 animate-pulse"
                                :style="{ animationDelay: `${i * 0.1}s` }"
                            />
                        </div>
                    </div>
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
import { ref, shallowRef, computed, onBeforeUnmount, onMounted, onActivated, onDeactivated, useTemplateRef, inject } from "vue";
import { Card } from "@components/ui/card";
import { Aperture, Pipette, Camera } from "lucide-vue-next";
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

const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");

const previewDataUrl = ref<string | null>(null);
const colorCount = ref(5);
const chromaWeight = ref(0.5);
const cameraActive = ref(false);
const lastFile = shallowRef<File | null>(null);
const paletteName = ref("Extracted Palette");
const eyedropperActive = ref(false);
const isWide = ref(false);

let cameraStream: MediaStream | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let mediaQuery: MediaQueryList | null = null;

onMounted(() => {
    mediaQuery = window.matchMedia("(min-width: 640px)");
    isWide.value = mediaQuery.matches;
    const handler = (e: MediaQueryListEvent) => { isWide.value = e.matches; };
    mediaQuery.addEventListener("change", handler);
    onBeforeUnmount(() => mediaQuery?.removeEventListener("change", handler));
});

// KeepAlive lifecycle: pause/resume camera
onDeactivated(() => {
    if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.enabled = false);
    }
});

onActivated(() => {
    if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.enabled = true);
    }
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

async function onFile(file: File) {
    lastFile.value = file;
    previewDataUrl.value = await readAsDataUrl(file);
    stopCamera();
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

async function startCamera() {
    try {
        cameraActive.value = true;
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        });
        await new Promise(requestAnimationFrame);
        if (videoRef.value) videoRef.value.srcObject = cameraStream;
    } catch (err) {
        quantizeError.value = `Camera access denied: ${err}`;
        cameraActive.value = false;
    }
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
        cameraStream = null;
    }
    cameraActive.value = false;
}

async function captureFrame() {
    const video = videoRef.value;
    if (!video || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")!.drawImage(video, 0, 0);

    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
    });
    const file = new File([blob], "camera-capture.png", { type: "image/png" });
    await onFile(file);
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
    stopCamera();
    if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<style scoped>
@reference "../../../styles/style.css";

.expand-fade-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate),
                transform var(--duration-normal) var(--ease-decelerate);
}
.expand-fade-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate),
                transform var(--duration-fast) var(--ease-accelerate);
}
.expand-fade-enter-from {
    opacity: 0;
    transform: translateY(-4px);
}
.expand-fade-leave-to {
    opacity: 0;
    transform: translateY(4px);
}
</style>
