<template>
    <div class="relative flex flex-col">
        <div
            :class="
                layout === 'split'
                    ? 'grid gap-4 sm:grid-cols-2'
                    : 'flex flex-col gap-4'
            "
        >
            <!-- Image + camera column -->
            <div
                class="flex flex-col gap-3"
                :class="layout === 'split' ? 'sm:min-h-[280px]' : ''"
            >
                <ImageDropZone
                    ref="dropZoneRef"
                    :class="
                        layout === 'split'
                            ? 'flex-1 min-h-0 sm:max-h-[min(400px,50dvh)]'
                            : 'min-h-[180px] max-h-[min(320px,40dvh)]'
                    "
                    :preview="session.previewDataUrl.value"
                    :disable-click="!!session.previewDataUrl.value"
                    @file="onFile"
                    @click="session.previewDataUrl.value && (eyedropperActive = true)"
                />

                <!-- Camera viewfinder (unified capability — T20) -->
                <Transition name="vj-enter">
                    <div
                        v-if="cameraActive"
                        class="relative rounded-panel overflow-hidden bg-black shrink-0"
                    >
                        <video
                            ref="videoRef"
                            autoplay
                            playsinline
                            muted
                            class="w-full max-h-[200px] object-cover"
                        />
                        <div
                            class="absolute inset-x-0 bottom-0 flex justify-center p-2.5 bg-gradient-to-t from-black/50 to-transparent"
                        >
                            <DockIconButton
                                compact
                                class="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-sm"
                                title="Capture frame"
                                @click="captureFrame"
                            >
                                <Aperture class="w-4.5 h-4.5 text-white" />
                            </DockIconButton>
                        </div>
                    </div>
                </Transition>
            </div>

            <!-- Controls + result column -->
            <div class="flex flex-col gap-3 min-w-0">
                <ExtractControls
                    class="shrink-0"
                    :k="session.colorCount.value"
                    :chroma-weight="session.chromaWeight.value"
                    :gradient="session.kSliderGradient.value"
                    :css-color="cssColorOpaque ?? ''"
                    :disabled="session.isProcessing.value || cameraActive"
                    :has-image="!!session.previewDataUrl.value"
                    @update:k="session.onKChange"
                    @update:chroma-weight="session.onChromaChange"
                    @upload="openFilePicker"
                    @camera="startCamera"
                    @reset="session.onReset"
                />

                <!-- Processing indicator -->
                <div
                    v-if="session.isProcessing.value"
                    class="flex items-center gap-2 justify-center py-2"
                >
                    <div
                        class="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-primary animate-spin"
                    />
                    <span class="text-mono-small text-muted-foreground"
                        >Extracting...</span
                    >
                </div>

                <!-- Error -->
                <div
                    v-if="session.quantizeError.value"
                    class="text-mono-small text-destructive px-1"
                >
                    {{ session.quantizeError.value }}
                </div>

                <!-- Extracted result or the undeveloped plate -->
                <Transition name="vj-morph" mode="out-in">
                    <div
                        v-if="session.extractedPalette.value && !session.isProcessing.value"
                        key="extracted"
                        class="flex flex-col gap-3"
                    >
                        <!-- T19 — the dominance readout: the quantizer's
                             perceptual story made visible. The stat is the
                             audacious display voice; the numerals are the
                             Fira readout. -->
                        <div
                            v-if="session.dominant.value"
                            class="flex items-center gap-4"
                        >
                            <WatercolorDot
                                :color="session.dominant.value.css"
                                tag="div"
                                class="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                            />
                            <div class="flex flex-col min-w-0 gap-0.5">
                                <span
                                    class="text-mono-caption uppercase tracking-[0.18em] text-muted-foreground/70"
                                    >dominant</span
                                >
                                <span class="font-display text-display leading-none">
                                    {{ Math.round(session.dominantShare.value * 100)
                                    }}<span
                                        class="text-body font-normal text-muted-foreground"
                                        >% of the image</span
                                    >
                                </span>
                                <code
                                    class="fira-code text-mono-small text-muted-foreground truncate"
                                    >{{ session.dominant.value.css }}</code
                                >
                            </div>
                        </div>

                        <!-- T19 — the population-proportional strip (8% floor). -->
                        <PaletteColorStrip
                            :colors="session.extractedPalette.value.colors"
                            :weights="session.populationWeights.value"
                            class="h-3 rounded-input overflow-hidden border border-card-edge"
                        />

                        <PaletteCard
                            :palette="session.extractedPalette.value"
                            :expanded="true"
                            :layout="layout === 'split' && isWide ? 'aside' : 'default'"
                            :css-color="cssColorOpaque ?? ''"
                            swatch-class="w-12 h-12 sm:w-14 sm:h-14"
                            editable-name
                            @click="() => {}"
                            @save="session.onSave"
                            @rename="session.onRename"
                            @add-color="(css) => emit('addColor', css)"
                        />
                    </div>
                    <!-- The undeveloped plate (R.W4 Lane A / A4): the shimmer
                         bones ARE the specimen ghost; a Fira plate label makes
                         the empty state read as an invitation, not a stall. -->
                    <div
                        v-else-if="!session.isProcessing.value"
                        key="shadow"
                        class="flex flex-col gap-1.5"
                    >
                        <p
                            v-if="!session.previewDataUrl.value"
                            class="text-mono-caption uppercase tracking-[0.18em] text-muted-foreground/70 text-center"
                        >
                            · undeveloped plate — feed it an image ·
                        </p>
                        <PaletteCardSkeleton :count="session.colorCount.value" />
                    </div>
                </Transition>
            </div>
        </div>

        <!-- Eyedropper overlay (unified capability — T20) -->
        <ImageEyedropper
            v-if="eyedropperActive && session.previewDataUrl.value"
            :image-url="session.previewDataUrl.value"
            :color-space="colorSpace"
            @close="eyedropperActive = false"
            @pick="(css) => emit('pick', css)"
            @add-to-palette="(css) => emit('addColor', css)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onBeforeUnmount, useTemplateRef } from "vue";
import { Aperture } from "@lucide/vue";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import type { ColorSpace } from "@src/units/color/constants";
import { CSS_COLOR_KEY } from "@components/custom/color-picker/keys";
import { useExtractSession } from "./composables/useExtractSession";

import ImageDropZone from "./ImageDropZone.vue";
import ExtractControls from "./ExtractControls.vue";
import ImageEyedropper from "./ImageEyedropper/ImageEyedropper.vue";
import PaletteCard from "@components/custom/palette-browser/PaletteCard.vue";
import PaletteCardSkeleton from "@components/custom/palette-browser/PaletteCardSkeleton.vue";
import PaletteColorStrip from "@components/custom/palette-browser/PaletteColorStrip.vue";

type DisplayColorSpace = ColorSpace | "hex";

const { layout = "column", colorSpace = "hex" } = defineProps<{
    /** `column` — the pane's single flow; `split` — the dialog's two columns. */
    layout?: "column" | "split";
    /** Display space handed to the eyedropper readout. */
    colorSpace?: DisplayColorSpace;
}>();

const emit = defineEmits<{
    /** Eyedropper sample applied as the current color. */
    pick: [css: string];
    /** A swatch added to the working palette. */
    addColor: [css: string];
}>();

const cssColorOpaque = inject(CSS_COLOR_KEY, undefined);

const session = useExtractSession();

const dropZoneRef = ref<InstanceType<typeof ImageDropZone> | null>(null);
const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");
const eyedropperActive = ref(false);
const cameraActive = ref(false);
const { matches: isWide } = useBreakpoint("(min-width: 640px)");

let cameraStream: MediaStream | null = null;

function openFilePicker() {
    dropZoneRef.value?.openFilePicker();
}

async function onFile(file: File) {
    stopCamera();
    await session.onFile(file);
}

async function startCamera() {
    try {
        cameraActive.value = true;
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment",
                width: { ideal: 640 },
                height: { ideal: 480 },
            },
        });
        await new Promise(requestAnimationFrame);
        if (videoRef.value) videoRef.value.srcObject = cameraStream;
    } catch (err) {
        session.quantizeError.value = `Camera access denied: ${err}`;
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

onBeforeUnmount(stopCamera);
</script>
