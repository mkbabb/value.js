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

                <!-- Camera viewfinder (unified capability — T20).
                     T.W3-1 (D1 rung-4 STAGE): the photographic ground + its
                     caption veil + on-stage chrome read the NAMED near-black
                     pair (--stage/--on-stage-chrome) — the raw bg-black/
                     bg-white literals die (census §1.E; CC-7). The chip's
                     backdrop-blur is TRUE glass: it floats over live video. -->
                <Transition name="vj-enter">
                    <div
                        v-if="cameraActive"
                        class="relative rounded-panel overflow-hidden bg-stage shrink-0"
                    >
                        <video
                            ref="videoRef"
                            autoplay
                            playsinline
                            muted
                            class="w-full max-h-[200px] object-cover"
                        />
                        <div
                            class="absolute inset-x-0 bottom-0 flex justify-center p-2.5 bg-gradient-to-t from-stage/50 to-transparent"
                        >
                            <DockControl
                                compact
                                class="p-1.5 bg-on-stage-chrome/20 hover:bg-on-stage-chrome/40 backdrop-blur-sm"
                                title="Capture frame"
                                @click="captureFrame"
                            >
                                <Aperture class="w-4.5 h-4.5 text-on-stage-chrome" />
                            </DockControl>
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

                <!-- Error (error ≠ empty: an explicit destructive line) -->
                <div
                    v-if="session.quantizeError.value"
                    class="text-mono-small text-destructive px-1"
                >
                    {{ session.quantizeError.value }}
                </div>

                <!-- The result plate — D9's species grammar (T.W3-2; the T-13
                     owner overrule R7 returns the material S.W5-6 F1/F2
                     amputated, keeping its semantics). TRUE EMPTY wears the
                     shadow palette: the instrument shows the shape of what
                     it produces — `count` rides the k-slider LIVE, so k is
                     legible before any image exists and the ghost
                     re-segments under the slider. `isProcessing` swaps
                     ghost → KNOWN-IMMINENT skeleton IN PLACE (same bones —
                     a material change, not a layout jump; the `shadow`
                     breath register, local compute — never the network
                     `developing` sweep, whose name the old key mis-wore);
                     the developed card (F7's one-card story) lands in the
                     same seat. The caption carries the text for AT (the
                     ghost is aria-hidden); the error line above stays its
                     own explicit register (error ≠ empty). -->
                <Transition name="vj-morph" mode="out-in">
                    <PaletteCardSkeleton
                        v-if="session.isProcessing.value"
                        key="imminent"
                        :count="session.colorCount.value"
                    />
                    <div
                        v-else-if="session.extractedPalette.value"
                        key="extracted"
                        class="flex flex-col gap-1.5"
                    >
                        <!-- T19 folded as the card's label line (F7): the
                             display-voice stat + eyebrow + Fira readout on
                             one baseline, seated on the plate it describes.
                             The duplicate dominant dot died — the card's
                             first swatch IS the dominant specimen. -->
                        <div
                            v-if="session.dominant.value"
                            class="flex items-baseline gap-2 min-w-0 px-1"
                        >
                            <span class="font-display text-display leading-none shrink-0">
                                {{ Math.round(session.dominantShare.value * 100)
                                }}<span
                                    class="text-body font-normal plate-ink"
                                    >% of the image</span
                                >
                            </span>
                            <span class="flex items-baseline gap-2 min-w-0 ml-auto">
                                <span
                                    class="text-mono-caption uppercase tracking-[0.18em] plate-ink shrink-0"
                                    >dominant</span
                                >
                                <!-- truncate may trim trailing digits at narrow
                                     widths; the full readout rides title +
                                     select-all (never a lying readout). -->
                                <code
                                    class="fira-code text-mono-small plate-ink truncate select-all"
                                    :title="session.dominant.value.serialized"
                                    >{{ session.dominant.value.serialized }}</code
                                >
                            </span>
                        </div>

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
                    <div v-else key="shadow" class="flex flex-col gap-2">
                        <ShadowPalette :count="session.colorCount.value" />
                        <!-- The resurrected `ec1b200` caption — the AT text
                             for the aria-hidden ghost above. -->
                        <p
                            class="text-mono-caption uppercase tracking-[0.18em] plate-ink text-center"
                        >
                            · undeveloped plate — feed it an image ·
                        </p>
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
import { DockControl } from "@mkbabb/glass-ui/dock";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import type { SpaceId } from "@mkbabb/value.js/color";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import { useExtractSession } from "./composables/useExtractSession";

import ImageDropZone from "./ImageDropZone.vue";
import ExtractControls from "./ExtractControls.vue";
import ImageEyedropper from "./ImageEyedropper/ImageEyedropper.vue";
import {
    PaletteCard,
    PaletteCardSkeleton,
    ShadowPalette,
} from "../../palettes/browser/card";

type DisplayColorSpace = SpaceId | "hex";

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

<style scoped>
/* E1-R1 (T.W8 remediation_1): the dominance row + the undeveloped-plate ghost
 * caption thread the certified de-emphasis rung (`--ink-muted` — boot-stamped,
 * floor-clamped against the live resting plate; D6), never the STATIC
 * `text-muted-foreground` that failed the text floor over the live-ambient
 * plate in light. */
.plate-ink {
    color: var(--ink-muted, var(--muted-foreground));
}
</style>
