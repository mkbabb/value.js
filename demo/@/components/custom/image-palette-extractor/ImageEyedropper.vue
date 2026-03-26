<template>
    <Transition name="eyedropper-fade" @after-enter="onTransitionEnd">
        <div class="absolute inset-0 z-20 flex flex-col bg-card/75 backdrop-blur-sm rounded-2xl overflow-hidden">
            <!-- Top bar -->
            <div class="flex items-center gap-2 px-3 py-2 shrink-0" :style="{ '--hover-color': sampledColor ?? '' }">
                <button class="dock-icon-btn eyedropper-action-btn" title="Close eyedropper" @click="emit('close')">
                    <X class="w-4 h-4 transition-[transform,color]" />
                </button>

                <div class="dock-separator" />

                <!-- Sampled color swatch + label -->
                <WatercolorDot
                    v-if="sampledColor"
                    :color="sampledColor"
                    :class="['shrink-0 transition-transform', swatchPulse ? 'swatch-pulse' : 'w-7 h-7']"
                    @animationend="swatchPulse = false"
                />
                <div v-else class="w-7 h-7 shrink-0 rounded-full border-2 border-dashed border-muted-foreground/30" />

                <span class="fira-code text-xs text-muted-foreground truncate select-all">
                    {{ formattedColor ?? 'Tap to sample' }}
                </span>

                <!-- Spacer -->
                <div class="flex-1" />

                <!-- Action buttons (visible after pinning) -->
                <template v-if="pinned">
                    <button
                        class="dock-icon-btn eyedropper-action-btn"
                        title="Add to palette"
                        @click="onAddToPalette"
                    >
                        <Plus class="w-4 h-4 transition-[transform,color]" />
                    </button>
                    <button
                        class="dock-icon-btn eyedropper-action-btn"
                        title="Apply as current color"
                        @click="onApplyColor"
                    >
                        <Check class="w-4 h-4 transition-[transform,color]" />
                    </button>
                </template>
            </div>

            <!-- Zoomable image viewport -->
            <div
                ref="viewportRef"
                class="flex-1 min-h-0 overflow-hidden relative"
                :class="pinned ? 'cursor-pointer' : 'cursor-crosshair'"
                style="touch-action: none;"
            >
                <canvas
                    ref="canvasRef"
                    class="origin-top-left will-change-transform eyedropper-canvas"
                    :class="gesture.gestureActive.value ? 'no-transition' : ''"
                    :style="canvasStyle"
                />

                <!-- Magnifier loupe (inside viewport so coordinates align) -->
                <div
                    v-if="loupeVisible"
                    class="loupe"
                    :class="pinned ? 'loupe-pinned' : ''"
                    :style="loupeStyle"
                >
                    <canvas ref="loupeCanvasRef" width="110" height="110" class="w-full h-full rounded-full" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick, useTemplateRef } from "vue";
import { X, Plus, Check } from "lucide-vue-next";
import WatercolorDot from "@components/custom/watercolor-dot/WatercolorDot.vue";
import type { ColorSpace } from "@src/units/color/constants";
import { parseCSSColor } from "@src/parsing/color";
import { colorUnit2, normalizeColorUnit } from "@src/units/color/normalize";
import { useInertiaGesture } from "./composables/useInertiaGesture";

type DisplayColorSpace = ColorSpace | "hex";

const props = withDefaults(defineProps<{
    imageUrl: string;
    colorSpace?: DisplayColorSpace;
}>(), {
    colorSpace: "hex",
});

const emit = defineEmits<{
    close: [];
    pick: [cssColor: string];
    addToPalette: [cssColor: string];
}>();

const viewportRef = useTemplateRef<HTMLElement>("viewportRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const loupeCanvasRef = useTemplateRef<HTMLCanvasElement>("loupeCanvasRef");

// Image data
let offscreenCanvas: HTMLCanvasElement | null = null;
let offscreenCtx: CanvasRenderingContext2D | null = null;
let imgWidth = 0;
let imgHeight = 0;
let imageLoaded = false;

// Sampled color
const sampledColor = ref<string | null>(null);
const formattedColor = ref<string | null>(null);

// Loupe
const loupeVisible = ref(false);
const loupeRelX = ref(0);
const loupeRelY = ref(0);

// Pinned state
const pinned = ref(false);
let justUnpinned = false;

// Swatch pulse animation
const swatchPulse = ref(false);

const LOUPE_SIZE = 110;
const LOUPE_PIXELS = 11;

// --- Inertia gesture composable ---

const gesture = useInertiaGesture(viewportRef, {
    contentSize: () => ({ width: imgWidth, height: imgHeight }),
    maxZoom: 10,
    friction: 0.92,
    onTap(rx, ry) {
        if (justUnpinned) {
            justUnpinned = false;
            return;
        }
        const result = sampleAt(rx, ry);
        if (result) {
            sampledColor.value = result.hex;
            formattedColor.value = result.formatted;
            loupeVisible.value = true;
            loupeRelX.value = rx;
            loupeRelY.value = ry;
            drawLoupe(rx, ry);
            pinned.value = true;
        }
    },
    onHover(rx, ry) {
        if (pinned.value) return;
        const result = sampleAt(rx, ry);
        if (result) {
            sampledColor.value = result.hex;
            formattedColor.value = result.formatted;
            loupeVisible.value = true;
            loupeRelX.value = rx;
            loupeRelY.value = ry;
            drawLoupe(rx, ry);
        }
    },
});

// Intercept pointerdown to handle unpin
const origPointerDown = viewportRef;
watch(viewportRef, (el) => {
    if (!el) return;
    el.addEventListener("pointerdown", (e) => {
        if (pinned.value) {
            pinned.value = false;
            loupeVisible.value = false;
            justUnpinned = true;
        }
    }, { capture: true }); // capture: runs before composable's handler
});

const canvasStyle = computed(() => ({
    transform: `translate(${gesture.panX.value}px, ${gesture.panY.value}px) scale(${gesture.zoom.value})`,
}));

const loupeStyle = computed(() => ({
    left: `${loupeRelX.value - LOUPE_SIZE / 2}px`,
    top: `${loupeRelY.value - LOUPE_SIZE / 2}px`,
    width: `${LOUPE_SIZE}px`,
    height: `${LOUPE_SIZE}px`,
}));

// --- Color formatting ---

function formatHex(r: number, g: number, b: number): string {
    const hex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function formatInColorSpace(hex: string): string {
    const space = props.colorSpace;
    if (space === "hex") return hex;
    try {
        const parsed = parseCSSColor(hex);
        if (!parsed) return hex;
        const resolved: ColorSpace = space === "hex" ? "rgb" : space;
        const converted = colorUnit2(parsed, resolved, false, false, false);
        const denorm = normalizeColorUnit(converted, true, false);
        return denorm.value.toFormattedString(2);
    } catch {
        return hex;
    }
}

// --- Image loading ---

async function loadImage() {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.imageUrl;
    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
    });

    imgWidth = img.naturalWidth;
    imgHeight = img.naturalHeight;

    offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = imgWidth;
    offscreenCanvas.height = imgHeight;
    offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })!;
    offscreenCtx.drawImage(img, 0, 0);

    const canvas = canvasRef.value;
    if (canvas) {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
    }

    imageLoaded = true;
    await nextTick();
    gesture.fitToViewport();
}

function onTransitionEnd() {
    if (imageLoaded) gesture.fitToViewport();
}

// --- Pixel sampling ---

function viewportToImage(rx: number, ry: number) {
    return {
        ix: Math.floor((rx - gesture.panX.value) / gesture.zoom.value),
        iy: Math.floor((ry - gesture.panY.value) / gesture.zoom.value),
    };
}

function sampleAt(rx: number, ry: number) {
    if (!offscreenCtx) return null;
    const { ix, iy } = viewportToImage(rx, ry);
    if (ix < 0 || iy < 0 || ix >= imgWidth || iy >= imgHeight) return null;
    const data = offscreenCtx.getImageData(ix, iy, 1, 1).data;
    const hex = formatHex(data[0], data[1], data[2]);
    return { hex, formatted: formatInColorSpace(hex) };
}

function drawLoupe(rx: number, ry: number) {
    const loupeCanvas = loupeCanvasRef.value;
    if (!loupeCanvas || !offscreenCtx) return;
    const ctx = loupeCanvas.getContext("2d")!;
    const { ix, iy } = viewportToImage(rx, ry);
    const half = Math.floor(LOUPE_PIXELS / 2);

    ctx.clearRect(0, 0, LOUPE_SIZE, LOUPE_SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.arc(LOUPE_SIZE / 2, LOUPE_SIZE / 2, LOUPE_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        offscreenCanvas!,
        ix - half, iy - half, LOUPE_PIXELS, LOUPE_PIXELS,
        0, 0, LOUPE_SIZE, LOUPE_SIZE,
    );
    ctx.restore();
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
            loupeVisible.value = false;
        } else {
            emit("close");
        }
    }
}

onMounted(() => {
    loadImage();
    window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
    offscreenCanvas = null;
    offscreenCtx = null;
});

watch(() => props.imageUrl, () => { loadImage(); });
</script>

<style scoped>
@reference "../../../styles/style.css";

/* Smooth zoom transition — always on, disabled during active gestures */
.eyedropper-canvas {
    transition: transform var(--duration-fast) var(--ease-decelerate);
}
.eyedropper-canvas.no-transition {
    transition: none;
}

/* Enter/exit transition — OPACITY ONLY */
.eyedropper-fade-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate);
}
.eyedropper-fade-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate);
}
.eyedropper-fade-enter-from,
.eyedropper-fade-leave-to {
    opacity: 0;
}

/* Loupe */
.loupe {
    position: absolute;
    border-radius: 50%;
    border: 2px solid hsl(var(--foreground) / 0.5);
    box-shadow: 0 4px 16px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--background) / 0.3);
    pointer-events: none;
    z-index: var(--z-controls);
    overflow: hidden;
    transition: opacity var(--duration-fast) var(--ease-standard);
}

.loupe-pinned {
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 2px hsl(var(--primary) / 0.4), 0 4px 16px hsl(var(--foreground) / 0.2);
}

/* Action button hover → sampled color */
.eyedropper-action-btn:hover:not(:disabled) svg {
    color: var(--hover-color, hsl(var(--foreground)));
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
