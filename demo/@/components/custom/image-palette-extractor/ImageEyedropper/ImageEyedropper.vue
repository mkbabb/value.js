<template>
    <!-- enter/exit family — opacity-only geometry (--vj-enter-y pinned to 0). -->
    <Transition name="vj-enter" @after-enter="onTransitionEnd">
        <!-- T.W3-1 (D1 rung-3 CHROME, Q4-defaulted: "eyedropper overlay stays
             chrome"): a TRUE floating overlay over live image content — the
             producer floating rung replaces the hand-minted bg-card/75 glass
             (the T-CM-4 parallel-mint class). -->
        <div class="absolute inset-0 z-popover flex flex-col glass-floating rounded-panel overflow-hidden" style="--vj-enter-y: 0px">
            <!-- Top bar -->
            <div class="flex items-center gap-2 px-3 py-2 shrink-0" :style="{ '--hover-color': sampledColor ?? '' }">
                <DockIconButton class="eyedropper-action-btn" title="Close eyedropper" @click="emit('close')">
                    <X class="w-4 h-4 transition-[transform,color]" />
                </DockIconButton>

                <DockSeparator />

                <!-- Sampled color swatch + label -->
                <WatercolorDot
                    v-if="sampledColor"
                    :color="sampledColor"
                    :class="['shrink-0 transition-transform', swatchPulse ? 'swatch-pulse' : 'w-7 h-7']"
                    @animationend="swatchPulse = false"
                />
                <!-- Not-yet-sampled slot — the shipped ghost variant (A3, U18):
                     the seeded silhouette the sampled color will fill. -->
                <WatercolorDot
                    v-else
                    color="var(--muted-foreground)"
                    variant="ghost"
                    tag="div"
                    seed="eyedropper-empty"
                    class="w-7 h-7 shrink-0"
                />

                <span class="text-mono-small text-muted-foreground truncate select-all">
                    {{ formattedColor ?? 'Tap to sample' }}
                </span>

                <!-- Spacer -->
                <div class="flex-1" />

                <!-- Action buttons (visible after pinning) -->
                <template v-if="pinned">
                    <DockIconButton
                        class="eyedropper-action-btn"
                        title="Add to palette"
                        @click="onAddToPalette"
                    >
                        <Plus class="w-4 h-4 transition-[transform,color]" />
                    </DockIconButton>
                    <DockIconButton
                        class="eyedropper-action-btn"
                        title="Apply as current color"
                        @click="onApplyColor"
                    >
                        <Check class="w-4 h-4 transition-[transform,color]" />
                    </DockIconButton>
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
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick, useTemplateRef } from "vue";
import { X, Plus, Check } from "@lucide/vue";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";

import { useInertiaGesture } from "./composables/useInertiaGesture";
import { useImageSampler, type DisplayColorSpace } from "./composables/useImageSampler";
import { useLoupeCanvas } from "./composables/useLoupeCanvas";
import { LOUPE_SIZE } from "./constants";

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
const swatchPulse = ref(false);

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
    getOffscreenCanvas: () => sampler.getOffscreenCanvas(),
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

// Intercept pointerdown to handle unpin
watch(viewportRef, (el) => {
    if (!el) return;
    el.addEventListener("pointerdown", () => {
        if (pinned.value) {
            pinned.value = false;
            loupe.hideLoupe();
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

function onTransitionEnd() {
    if (sampler.imageLoaded.value) gesture.fitToViewport();
}

// --- Actions ---

function onAddToPalette() {
    if (sampledColor.value) {
        emit("addToPalette", sampledColor.value);
        swatchPulse.value = true;
    }
}

function onApplyColor() {
    if (sampledColor.value) {
        emit("pick", sampledColor.value);
        swatchPulse.value = true;
    }
}

function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
        if (pinned.value) {
            pinned.value = false;
            loupe.hideLoupe();
        } else {
            emit("close");
        }
    }
}

onMounted(() => {
    loadAndFit();
    window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
    sampler.dispose();
});

watch(() => imageUrl, () => { loadAndFit(); });
</script>

<style scoped>
@reference "../../../../../styles/foundation.css";

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
    box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 15%, transparent), 0 0 0 1px color-mix(in srgb, var(--shadow-color) 30%, transparent);
    pointer-events: none;
    z-index: var(--z-controls);
    overflow: hidden;
    transition: opacity var(--duration-fast) var(--ease-standard);
}

.loupe-pinned {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent), 0 4px 16px color-mix(in srgb, var(--shadow-color) 20%, transparent);
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
    animation: swatch-pop 0.65s var(--ease-spring) forwards;
}

@keyframes swatch-pop {
    0%   { transform: scale(1); }
    25%  { transform: scale(1.7); }
    50%  { transform: scale(0.85); }
    75%  { transform: scale(1.1); }
    100% { transform: scale(1); }
}
</style>
