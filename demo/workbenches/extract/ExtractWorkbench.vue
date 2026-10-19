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
                <!-- Camera cluster (X.W7.g3 · XW-8/9/35): the camera is a MODE of
                     the stage — the viewfinder takes the drop zone's seat, never
                     a second specimen stacked under it. -->
                <ImageDropZone
                    v-if="camera.state.value === 'off'"
                    :class="
                        layout === 'split'
                            ? 'flex-1 min-h-0 sm:max-h-[min(400px,50dvh)]'
                            : 'min-h-[180px] max-h-[min(320px,40dvh)]'
                    "
                    :preview="session.previewUrl.value"
                    :disabled="session.isProcessing.value"
                    @file="onFile"
                    @open="openFilePicker"
                    @sample="session.eyedropperOpen.value = true"
                />

                <!-- Camera viewfinder (unified capability — T20).
                     T.W3-1 (D1 rung-4 STAGE): the photographic ground + its
                     caption veil + on-stage chrome read the NAMED near-black
                     pair (--stage/--on-stage-chrome) — the raw bg-black/
                     bg-white literals die (census §1.E; CC-7). The chip's
                     backdrop-blur is TRUE glass: it floats over live video. -->
                <Transition name="vj-enter">
                    <div
                        v-if="camera.state.value !== 'off'"
                        class="relative rounded-panel overflow-hidden bg-stage shrink-0"
                        role="group"
                        aria-label="Camera"
                        @keydown.esc.prevent="camera.stop"
                    >
                        <!-- D2-23: the viewfinder shows the WHOLE frame the
                             capture takes (contain, never a cover crop). -->
                        <video
                            ref="videoRef"
                            autoplay
                            playsinline
                            muted
                            class="w-full max-h-[200px] object-contain"
                        />
                        <!-- XW-35: the producer's own control face and hit cell
                             (≥44px on coarse) — no compact, no hand-painted
                             plate over live video. Cancel is the exit (XW-8). -->
                        <div class="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-2.5">
                            <DockControl
                                title="Capture frame"
                                :disabled="camera.state.value !== 'live'"
                                @click="captureFrame"
                            >
                                <Aperture class="w-5 h-5" />
                            </DockControl>
                            <DockControl title="Cancel camera" @click="camera.stop">
                                <X class="w-5 h-5" />
                            </DockControl>
                        </div>
                    </div>
                </Transition>

                <!-- X-DS pass 9 (V9C-06): the image actions are SOURCE actions, so they
                     sit with the source — under the drop zone / viewfinder they replace,
                     in the image column — and the sliders lead straight into the
                     instrument they shape. (They sat in ExtractControls after the
                     sliders, away from the zone the camera substitutes for.)
                     X-DS pass 3 (V3C-05): the image actions are ONE labelled action row,
                     and only the live ones are shown. With no image the drop zone is
                     the one intake (R-20), so Replace and Reset are absent rather than
                     parked as dead glyphs; the camera is a two-way door (XW-8 · EC-5),
                     pressed while live. X-DS pass 5 (V5C-07): the actions wear the
                     text rung (as "Delete all" does), so the glyphs start at the
                     column edge with the labels and rails above them; the group pulls
                     back by the rung's own inline pad (glass's `--space-residue`).
                     X-DS pass 6 (V6C-08): ONE text-action ink per pane — the group
                     sets the certified muted plate ink ("Delete all"'s) on its enabled
                     actions once, so the dark scheme's accent (gold) rung ink no longer
                     reads as decoration beside it; disabled keeps glass's own ink. -->
                <div class="flex flex-wrap items-center gap-1 ms-[calc(-1*var(--space-residue))] *:enabled:text-(color:--ink-muted)" role="group" aria-label="Image actions">
                    <Button
                        v-if="!!session.previewUrl.value"
                        emphasis="text"
                        size="sm"
                        :disabled="actionsStandDown"
                        @click="openFilePicker()"
                    >
                        <Upload aria-hidden="true" />
                        Replace image
                    </Button>
                    <Button
                        emphasis="text"
                        size="sm"
                        :disabled="session.isProcessing.value"
                        :aria-pressed="cameraLive"
                        @click="toggleCamera()"
                    >
                        <Camera aria-hidden="true" />
                        {{ cameraLive ? "Close camera" : "Open camera" }}
                    </Button>
                    <Button
                        v-if="!!session.previewUrl.value"
                        emphasis="text"
                        size="sm"
                        :disabled="actionsStandDown"
                        @click="session.onReset()"
                    >
                        <RotateCcw aria-hidden="true" />
                        Reset
                    </Button>
                </div>
            </div>

            <!-- Controls + result column. X-DS VR3-02: the controls and the
                 result strip are two blocks, parted by the pane's section gap. -->
            <div class="flex flex-col gap-phi-3 min-w-0">
                <ExtractControls
                    class="shrink-0"
                    :k="session.colorCount.value"
                    :found="session.foundCount.value"
                    :chroma-weight="session.chromaWeight.value"
                    :gradient="session.kSliderGradient.value"
                    :css-color="cssColorOpaque ?? ''"
                    :disabled="session.isProcessing.value"
                    :camera-live="cameraLive"
                    @update:k="session.onKChange"
                    @update:chroma-weight="session.onChromaChange"
                />

                <!-- Error (error ≠ empty: an explicit destructive line). The
                     camera's fault is its own line, never written into the
                     quantizer's slot (XW-10 / the camera cluster). -->
                <div
                    v-if="session.quantizeError.value"
                    role="alert"
                    class="text-mono-small text-destructive px-1"
                >
                    {{ session.quantizeError.value }}
                </div>
                <div
                    v-if="camera.error.value"
                    role="alert"
                    class="text-mono-small text-destructive px-1"
                >
                    {{ camera.error.value }}
                </div>
                <!-- R-23: the extract tree's one live region — a loaded image is
                     announced, so a healthy preview is never AT-identical to a
                     broken one (the img's alt is presentational under the zone's
                     button role). -->
                <p role="status" class="sr-only">{{ intakeAnnouncement }}</p>

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
                     same seat. The ghost is aria-hidden and needs no
                     caption: the drop zone beside it is the pane's one
                     empty-state affordance and carries its accessible name
                     (X.W7.g · OM-15 §1.A #1 KILL — the caption restated the
                     drop zone, a third ghost register in one column); the
                     error line above stays its own explicit register
                     (error ≠ empty). -->
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
                        <!-- T19 folded as the card's label line (F7), seated
                             on the plate it describes. The duplicate dominant
                             dot died — the card's first swatch IS the dominant
                             specimen. X-DS pass 6 (V6C-07): two lines, one
                             voice each — the display stat on its own line, the
                             dominant readout in mono beneath it at full width,
                             so the data is never the part that is cut. -->
                        <div
                            v-if="session.dominant.value"
                            class="flex flex-col gap-0.5 min-w-0"
                        >
                            <span class="font-display text-display leading-none">
                                {{ Math.round(session.dominantShare.value * 100)
                                }}<span
                                    class="text-body font-normal plate-ink"
                                    >% of the image</span
                                >
                            </span>
                            <span class="flex items-baseline gap-2 min-w-0">
                                <span
                                    class="text-caption plate-ink shrink-0"
                                    >dominant</span
                                >
                                <!-- the caption register (format-color): the readout
                                     and its title read the same bounded spelling. -->
                                <code
                                    class="font-mono text-mono-small plate-ink truncate select-all"
                                    :title="formatCssCaption(session.dominant.value.serialized)"
                                    >{{ formatCssCaption(session.dominant.value.serialized) }}</code
                                >
                            </span>
                        </div>

                        <!-- X.W8.i (C3 layout fork): the split seats the aside
                             card at every width — one layout, no viewport rung
                             (the aside spine is sized for the half column, the
                             same measure the stacked column gives a phone). -->
                        <PaletteInspector
                            :palette="session.extractedPalette.value"
                            :expanded="true"
                            :collapsible="false"
                            :layout="layout === 'split' ? 'aside' : 'default'"
                            swatch-size="xl"
                            @click="() => {}"
                            @save="session.onSave"
                            @rename="session.onRename"
                            @add-color="(css) => emit('addColor', css)"
                        />
                    </div>
                    <!-- X-W7 Repair 1 (XW-22): a developed run with no opaque pixel is
                         said, never shown as the pre-image ghost beside the image. -->
                    <p
                        v-else-if="session.barren.value"
                        key="barren"
                        class="text-mono-small text-muted-foreground px-1"
                    >
                        This image has no opaque pixels to sample.
                    </p>
                    <PaletteCardSkeleton
                        v-else
                        key="shadow"
                        variant="instrument"
                        :count="session.colorCount.value"
                    />
                </Transition>
            </div>
        </div>

        <!-- Eyedropper overlay (unified capability — T20) -->
        <ImageEyedropper
            v-if="session.eyedropperOpen.value && session.previewUrl.value"
            :image-url="session.previewUrl.value"
            :color-space="colorSpace"
            @close="session.eyedropperOpen.value = false"
            @pick="(css) => emit('pick', css)"
            @add-to-palette="(css) => emit('addColor', css)"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onDeactivated, useTemplateRef, watch } from "vue";
import { useFileDialog } from "@vueuse/core";
import { Aperture, Camera, RotateCcw, Upload, X } from "@lucide/vue";
import { Button } from "@mkbabb/glass-ui/button";
import { DockControl } from "@mkbabb/glass-ui/dock";
import type { SpaceId } from "@mkbabb/value.js/color";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import { formatCssCaption } from "../../color-session/format-color";
import { useExtractSession } from "./composables/useExtractSession";
import { useCameraCapture } from "./composables/useCameraCapture";

import ImageDropZone from "./ImageDropZone.vue";
import ExtractControls from "./ExtractControls.vue";
import ImageEyedropper from "./ImageEyedropper/ImageEyedropper.vue";
import PaletteCardSkeleton from "../../shared/ui/PaletteCardSkeleton.vue";
import PaletteInspector from "../../palettes/inspector/PaletteInspector.vue";

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

const videoRef = useTemplateRef<HTMLVideoElement>("videoRef");

const camera = useCameraCapture(videoRef);
// The live stream reaches whichever <video> the viewfinder mounted.
watch([camera.stream, videoRef], ([stream, video]) => {
    if (video) video.srcObject = stream;
});

// R-16 / R-17 (X.W7.g3): the file dialog lives HERE, where both of its
// triggers (the empty zone, the toolbar's Replace) live — one owner, no
// `defineExpose` reach into a child — and it is `useFileDialog`'s, not a
// hand-rolled hidden input inside the zone's button (whose click bubbled into
// a sample: R-6).
const { open: openFileDialog, onChange: onFilesChosen } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
});
onFilesChosen((files) => {
    const file = files?.[0];
    if (file) void onFile(file);
});

function openFilePicker() {
    openFileDialog();
}

const intakeAnnouncement = computed(() =>
    session.previewUrl.value && session.lastFile.value
        ? `Image loaded: ${session.lastFile.value.name}`
        : "",
);

async function onFile(file: File) {
    camera.stop();
    await session.onFile(file);
}

/** The camera is open: its own control is the exit (XW-8 · EC-5). */
const cameraLive = computed(() => camera.state.value !== "off");
/** XW-8: a run in flight or a live camera stands the image actions down. */
const actionsStandDown = computed(
    () => session.isProcessing.value || cameraLive.value,
);

function toggleCamera() {
    if (camera.state.value === "off") void camera.start();
    else camera.stop();
}

async function captureFrame() {
    const file = await camera.capture();
    if (file) await onFile(file);
}

// X.W5.a · gate N1 — the DEACTIVATION contract (PaneSlot's header states it).
// This subtree lives under the app's one `<KeepAlive>`, whose bound is a
// distinct-pane count, so the extract pane is parked on every navigation away
// and evicted by essentially nothing: `onBeforeUnmount` alone left the camera
// LIVE — the capture indicator on, the device held — for the rest of the
// session. Parking releases the device; it is never silently re-acquired on
// return, because re-opening the camera is the user's act, not the router's.
onDeactivated(camera.stop);
onBeforeUnmount(camera.stop);
</script>
