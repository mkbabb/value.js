<template>
    <!-- SS8-0722 (EY-8 ≡ XP-9) · SS8-0715 (EY-15's bound): the eyedropper is a
         MODAL instrument, so it wears glass's dialog rather than a hand-rolled
         `div.absolute.inset-0` over the workbench root. The producer owns the
         modality the bare div never had: `role="dialog"` + `aria-modal` + a
         name, focus entry and return, the content behind it hidden from AT and
         pointer, and an Escape scoped to the layer (no window listener). Its
         content is `fixed` and sized to the VIEWPORT (the old overlay took the
         workbench root's height, 714 px, and ran 16 px past the fold at
         1440×900 and 312 px at 720×450). `deliberate`: Esc and an outside press
         dismiss; the bar's own Close is the ✕, so glass's is not drawn twice.
         Surface stays the true floating chrome (T.W3-1 Q4). -->
    <Dialog :open="true" @update:open="(open) => { if (!open) emit('close'); }">
        <DialogContent
            surface="glass"
            dismiss="deliberate"
            class="flex flex-col gap-0 p-0 rounded-panel overflow-hidden w-[min(100vw_-_2rem,64rem)] h-[min(100dvh_-_2rem,48rem)]"
            @escape-key-down="onEscape"
        >
            <DialogTitle class="sr-only font-display font-medium">Eyedropper</DialogTitle>
            <DialogDescription class="sr-only">{{ samplePrompt }}; Escape releases a pin, then closes.</DialogDescription>
            <!-- SS8-0726 (X-5): the confirmation's spoken twin. The swatch pulse
                 is the visual receipt; this polite region, inside the modal (the
                 page behind is hidden), says what the press did. -->
            <p class="sr-only" role="status" aria-live="polite" data-eyedropper-status>{{ confirmationText }}</p>
            <!-- Top bar -->
            <div class="flex items-center gap-2 px-3 py-2 shrink-0" :style="{ '--hover-color': sampledColor ?? '' }">
                <DockControl class="eyedropper-action-btn" title="Close eyedropper" @click="emit('close')">
                    <X class="w-4 h-4 transition-[transform,color]" />
                </DockControl>

                <DockSeparator />

                <!-- Sampled color swatch + label -->
                <!-- X.W12U.s3 · UIA-V-588: each Add / Apply REMOUNTS the swatch
                     (the key is the confirmation count), so every confirmation
                     replays the pop from its first frame; nothing waits on an
                     `animationend` the dot never delivered (the class used to
                     stay on, and a repeat Add gave no feedback). -->
                <WatercolorDot
                    v-if="sampledColor"
                    :key="confirmations"
                    :color="sampledColor"
                    :class="['shrink-0 transition-transform', confirmations > 0 ? 'swatch-pulse' : 'w-7 h-7']"
                />
                <!-- Not-yet-sampled slot — the shipped ghost variant (A3, U18):
                     the seeded silhouette the sampled color will fill. -->
                <WatercolorDot
                    v-else
                    color="var(--muted-foreground)"
                    variant="ghost"
                    seed="eyedropper-empty"
                    class="w-7 h-7 shrink-0"
                />

                <span class="text-mono-small text-muted-foreground truncate select-all">
                    {{ formattedColor ? formatCssCaption(formattedColor) : samplePrompt }}
                </span>

                <!-- Spacer -->
                <div class="flex-1" />

                <!-- Action buttons (visible after pinning) -->
                <template v-if="pinned">
                    <DockControl
                        class="eyedropper-action-btn"
                        title="Add to palette"
                        @click="onAddToPalette"
                    >
                        <Plus class="w-4 h-4 transition-[transform,color]" />
                    </DockControl>
                    <DockControl
                        class="eyedropper-action-btn"
                        title="Apply as current color"
                        @click="onApplyColor"
                    >
                        <Check class="w-4 h-4 transition-[transform,color]" />
                    </DockControl>
                </template>
            </div>

            <!-- Zoomable image viewport -->
            <div
                ref="viewportRef"
                class="flex-1 min-h-0 overflow-hidden relative"
                :class="pinned ? 'cursor-pointer' : 'cursor-crosshair'"
                style="touch-action: none;"
            >
                <!-- W5-a11y: pixel canvas is a decorative/interactive visual; hidden from AT -->
                <canvas
                    ref="canvasRef"
                    class="origin-top-left will-change-transform eyedropper-canvas"
                    :class="gesture.gestureActive.value ? 'no-transition' : ''"
                    :style="canvasStyle"
                    aria-hidden="true"
                />

                <!-- Magnifier loupe (inside viewport so coordinates align) -->
                <div
                    v-if="loupe.loupeVisible.value"
                    class="loupe"
                    :class="pinned ? 'loupe-pinned' : ''"
                    :style="loupeStyle"
                >
                    <!-- W5-a11y: loupe canvas is decorative -->
                    <canvas ref="loupeCanvasRef" width="110" height="110" class="w-full h-full rounded-full" aria-hidden="true" />
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick, useTemplateRef } from "vue";
import { X, Plus, Check } from "@lucide/vue";
import { useMediaQuery } from "@vueuse/core";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@mkbabb/glass-ui/dialog";
import { WatercolorDot } from "../../../shared/ui/watercolor-dot";

import { useInertiaGesture } from "./composables/useInertiaGesture";
import { useImageSampler, type DisplayColorSpace } from "./composables/useImageSampler";
import { useLoupeCanvas } from "./composables/useLoupeCanvas";
import { LOUPE_SIZE } from "./constants";
import { formatCssCaption } from "../../../color-session/format-color";

const { imageUrl, colorSpace = "hex" } = defineProps<{
    imageUrl: string;
    colorSpace?: DisplayColorSpace | undefined;
}>();

const emit = defineEmits<{
    close: [];
    pick: [cssColor: string];
    addToPalette: [cssColor: string];
}>();

const viewportRef = useTemplateRef<HTMLElement>("viewportRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// Sampled color
const sampledColor = ref<string | null>(null);
const formattedColor = ref<string | null>(null);

// Pinned state
const pinned = ref(false);
let justUnpinned = false;

// Swatch pulse animation
// UIA-V-588: the count of confirmed Add / Apply acts — the swatch's key.
const confirmations = ref(0);
// X.W12U.s3 · UIA-V-H2: the prompt names the gesture the pointer has —
// "Tap" on a coarse pointer, "Click" on a fine one.
const coarsePointer = useMediaQuery("(pointer: coarse)");
const samplePrompt = computed(() => (coarsePointer.value ? "Tap to sample" : "Click to sample"));

// --- Image sampler (offscreen canvas + sampleAt + formatInColorSpace) ---
const sampler = useImageSampler({
    canvasRef,
    getTransform: () => ({
        panX: gesture.panX.value,
        panY: gesture.panY.value,
        zoom: gesture.zoom.value,
    }),
    colorSpace: () => colorSpace,
});

// --- Loupe canvas (draw + visibility/position state) ---
const loupe = useLoupeCanvas({
    getImageCanvas: () => sampler.getImageCanvas(),
    viewportToImage: (rx, ry) => sampler.viewportToImage(rx, ry),
});

// --- Inertia gesture composable ---

const gesture = useInertiaGesture(viewportRef, {
    contentSize: () => ({ width: sampler.imgWidth.value, height: sampler.imgHeight.value }),
    maxZoom: 10,
    friction: 0.92,
    onTap(rx, ry) {
        if (justUnpinned) {
            justUnpinned = false;
            return;
        }
        const result = sampler.sampleAt(rx, ry);
        if (result) {
            sampledColor.value = result.hex;
            formattedColor.value = result.formatted;
            loupe.showLoupeAt(rx, ry);
            pinAnchor = {
                x: (rx - gesture.panX.value) / gesture.zoom.value,
                y: (ry - gesture.panY.value) / gesture.zoom.value,
            };
            pinned.value = true;
        }
    },
    onHover(rx, ry) {
        if (pinned.value) return;
        const result = sampler.sampleAt(rx, ry);
        if (result) {
            sampledColor.value = result.hex;
            formattedColor.value = result.formatted;
            loupe.showLoupeAt(rx, ry);
        }
    },
});

// SS8-0721 (EY-20): the pin holds an IMAGE point, not a viewport point. A
// wheel zoom while pinned moves the bitmap under the loupe, so the loupe is
// re-projected through the live transform onto the pixel it was pinned on
// (the pinned VALUE is by design; the ring's position claim must stay true).
let pinAnchor: { x: number; y: number } | null = null;
watch(
    () => [gesture.panX.value, gesture.panY.value, gesture.zoom.value] as const,
    ([panX, panY, zoom]) => {
        if (!pinned.value || !pinAnchor) return;
        loupe.showLoupeAt(panX + pinAnchor.x * zoom, panY + pinAnchor.y * zoom);
    },
);

function unpin() {
    pinned.value = false;
    pinAnchor = null;
    loupe.hideLoupe();
}

// Intercept pointerdown to handle unpin
watch(viewportRef, (el) => {
    if (!el) return;
    el.addEventListener("pointerdown", () => {
        if (pinned.value) {
            unpin();
            justUnpinned = true;
        }
    }, { capture: true }); // capture: runs before composable's handler
});

const canvasStyle = computed(() => ({
    transform: `translate(${gesture.panX.value}px, ${gesture.panY.value}px) scale(${gesture.zoom.value})`,
}));

const loupeStyle = computed(() => ({
    left: `${loupe.loupeRelX.value - LOUPE_SIZE / 2}px`,
    top: `${loupe.loupeRelY.value - LOUPE_SIZE / 2}px`,
    width: `${LOUPE_SIZE}px`,
    height: `${LOUPE_SIZE}px`,
}));

// --- Image loading ---

async function loadAndFit() {
    await sampler.loadImage(imageUrl);
    await nextTick();
    gesture.fitToViewport();
}

// --- Actions ---

// SS8-0726: each confirmation re-writes the status text (cleared first, so a
// repeat press of the same colour is announced again, not deduplicated).
const confirmationText = ref("");
async function confirm(verb: string) {
    const caption = formattedColor.value ? formatCssCaption(formattedColor.value) : "Color";
    confirmations.value++;
    confirmationText.value = "";
    await nextTick();
    confirmationText.value = `${caption} ${verb}`;
}

function onAddToPalette() {
    if (sampledColor.value) {
        emit("addToPalette", sampledColor.value);
        void confirm("added to palette");
    }
}

function onApplyColor() {
    if (sampledColor.value) {
        emit("pick", sampledColor.value);
        void confirm("applied as current color");
    }
}

// Escape is the dialog layer's (glass scopes it; no window listener — the
// parked-pane key leak of X.W5.a gate N1 has no listener left to leak): it
// releases a pin first, and only an unpinned Escape dismisses.
function onEscape(e: KeyboardEvent) {
    if (!pinned.value) return;
    e.preventDefault();
    unpin();
}

onMounted(loadAndFit);

onBeforeUnmount(() => {
    sampler.dispose();
});

watch(() => imageUrl, () => { loadAndFit(); });
</script>

<style scoped>
@reference "../../../styles/foundation.css";

/* Smooth zoom transition — always on, disabled during active gestures */
.eyedropper-canvas {
    transition: transform var(--duration-fast) var(--ease-decelerate);
}
.eyedropper-canvas.no-transition {
    transition: none;
}

/* Loupe */
.loupe {
    position: absolute;
    border-radius: 50%;
    border: 2px solid color-mix(in srgb, var(--shadow-color) 50%, transparent);
    /* X-DS pass 1 (V1-18): the loupe truly floats over the image — ONE neutral
     * shadow; the border above is its ring. */
    box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 15%, transparent);
    pointer-events: none;
    z-index: var(--z-controls);
    overflow: hidden;
    transition: opacity var(--duration-fast) var(--ease-standard);
}

/* X-DS pass 6: the pin speaks in the ring alone; the loupe keeps its one shadow. */
.loupe-pinned {
    border-color: var(--primary);
}

/* Action button hover → sampled color */
.eyedropper-action-btn:hover:not(:disabled) svg {
    color: var(--hover-color, var(--foreground));
    transform: scale(1.2);
}

/* Swatch pulse on successful add */
.swatch-pulse {
    width: 1.75rem;
    height: 1.75rem;
    animation: swatch-pop var(--duration-fast) var(--ease-standard) forwards;
}

/* X-DS VR3-07: one settle. The confirmation stays (a swatch was added); the
 * 70% overshoot with a double bounce on a spring was affected motion. */
@keyframes swatch-pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.15); }
    100% { transform: scale(1); }
}
</style>
