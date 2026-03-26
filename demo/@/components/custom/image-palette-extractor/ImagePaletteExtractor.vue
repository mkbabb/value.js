<template>
    <TabsContent value="extract" class="mt-0 w-full palette-tab-content" force-mount>
        <div class="pb-4">
            <!-- Single continuous flow on mobile, two-column on sm+ -->
            <div class="grid gap-4 sm:grid-cols-2">

                <!-- Left column: image + camera -->
                <div class="flex flex-col gap-3 sm:min-h-[280px]">
                    <ImageDropZone class="flex-1 min-h-0 sm:max-h-[min(400px,50dvh)]" :preview="previewDataUrl" @file="onFile" />

                    <!-- Camera viewfinder -->
                    <Transition name="fade-slide">
                        <div v-if="cameraActive" class="relative rounded-2xl overflow-hidden bg-black shrink-0">
                            <video
                                ref="videoRef"
                                autoplay
                                playsinline
                                muted
                                class="w-full max-h-[200px] object-cover"
                            />
                            <div class="absolute inset-x-0 bottom-0 flex justify-center p-2.5 bg-gradient-to-t from-black/50 to-transparent">
                                <button class="dock-icon-btn-compact p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-sm" @click="captureFrame">
                                    <Aperture class="w-4.5 h-4.5 text-white" />
                                </button>
                            </div>
                        </div>
                    </Transition>
                </div>

                <!-- Right column: controls + palette result -->
                <div class="flex flex-col gap-3 min-w-0">
                    <!-- Controls: K slider (own row) + camera/kC/reset row -->
                    <ExtractControls
                        class="shrink-0"
                        :k="colorCount"
                        :chroma-weight="chromaWeight"
                        :gradient="kSliderGradient"
                        :css-color="cssColorOpaque"
                        :disabled="isProcessing || cameraActive"
                        :has-image="!!previewDataUrl"
                        @update:k="onKChange"
                        @update:chroma-weight="onChromaChange"
                        @camera="startCamera"
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

                    <!-- Extracted palette as PaletteCard -->
                    <Transition name="fade-slide">
                        <PaletteCard
                            v-if="extractedPalette && !isProcessing"
                            :palette="extractedPalette"
                            :expanded="true"
                            :layout="isWide ? 'aside' : 'default'"
                            :css-color="cssColorOpaque"
                            swatch-class="w-12 h-12 sm:w-14 sm:h-14"
                            editable-name
                            @click="() => {}"
                            @save="onSave"
                            @rename="onRename"
                            @add-color="(css) => emit('addColor', css)"
                        />
                    </Transition>

                    <!-- Empty state -->
                    <div v-if="!extractedPalette && !isProcessing && !quantizeError" class="flex flex-col items-center justify-center gap-2 py-4 text-center">
                        <Pipette class="w-6 h-6 text-muted-foreground/30" />
                        <span class="fira-code text-xs text-muted-foreground/40">Upload an image to extract colors</span>
                    </div>
                </div>
            </div>
        </div>
    </TabsContent>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import { TabsContent } from "@components/ui/tabs";
import { Aperture, Pipette } from "lucide-vue-next";
import { useImageQuantize } from "./composables/useImageQuantize";
import { usePaletteStore } from "@composables/palette/usePaletteStore";
import type { Palette, PaletteColor } from "@lib/palette/types";

import ImageDropZone from "./ImageDropZone.vue";
import ExtractControls from "./ExtractControls.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";

const props = defineProps<{
    cssColorOpaque?: string;
}>();

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
}>();

const { palette, isProcessing, error: quantizeError, quantizeFromFile } = useImageQuantize();
const { createPalette } = usePaletteStore();

const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");

const previewDataUrl = ref<string | null>(null);
const colorCount = ref(5);
const chromaWeight = ref(0.5);
const cameraActive = ref(false);
const lastFile = shallowRef<File | null>(null);
const paletteName = ref("Extracted Palette");
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

function readAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function runQuantize() {
    if (lastFile.value) {
        quantizeFromFile(lastFile.value, colorCount.value);
    }
}

function debouncedReQuantize() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runQuantize, 300);
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
    if (lastFile.value) {
        runQuantize();
    }
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

function onSave(p: Palette) {
    createPalette(p.name, p.colors);
}

function onRename(_p: Palette, newName: string) {
    paletteName.value = newName;
}

onBeforeUnmount(() => {
    stopCamera();
    if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

