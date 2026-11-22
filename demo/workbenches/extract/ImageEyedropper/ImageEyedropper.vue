<template>
    <!-- SS8-0722 (EY-8 ≡ XP-9) · SS8-0715 (EY-15's bound): the eyedropper is a
         MODAL instrument, so it wears glass's dialog: `role="dialog"` +
         `aria-modal` + a name, focus entry and return, the content behind it
         hidden from AT and pointer, and an Escape scoped to the layer.
         `deliberate`: Esc and an outside press dismiss; the bar's own Close is
         the ✕, so glass's is not drawn twice.

         color-40 N (his FORTIETH order: "the pick a colour ui and ux is
         awful--the eyeglass lens view is slow and not intuitive--multitouch
         first--the header section should not have such a large chin, and the
         dot should be a palette"):
         · one finger samples at once and scrubs 1:1, the lens standing above
           the finger (lens A); the lift holds the pick; a new touch moves it;
           two fingers pan and zoom, and the held pick keeps its pixel. A
           mouse keeps hover, click to hold and drag to pan;
         · the dialog is the photo's size: no glass above, below or beside it;
         · the dot is the Palettes mark, its wells the picks;
         · "Add to palette" and "Use color" are labelled, each on one line, and
           always present, quiet until a pick is held: at the bar's end when the
           dialog is wide, in a foot under the thumb when it is narrow (a phone,
           or a portrait photo on a desk). -->
    <Dialog :open="open" @update:open="(next) => { if (!next) emit('close'); }">
        <DialogContent
            surface="glass"
            dismiss="deliberate"
            class="eyedropper-dialog flex flex-col gap-0 p-0 rounded-panel overflow-hidden h-auto"
            :style="frameVars"
            @escape-key-down="onEscape"
            @close-auto-focus="emit('closed')"
        >
            <DialogTitle class="sr-only font-display font-medium">Eyedropper</DialogTitle>
            <DialogDescription class="sr-only">{{ samplePrompt }}; Escape releases a pick, then closes.</DialogDescription>
            <!-- SS8-0726 (X-5): the confirmation's spoken twin, inside the modal. -->
            <p class="sr-only" role="status" aria-live="polite" data-eyedropper-status>{{ confirmationText }}</p>

            <!-- The bar: the mark, the readout, the acts on a desk, the close. -->
            <div
                ref="barRef"
                class="eyedropper-bar flex items-center gap-2 px-2 py-1 shrink-0"
                :style="{ '--hover-color': sampledColor ?? '' }"
            >
                <!-- The palette mark: the live sample in its first well, the
                     last three added in the others; the mark's own rainbow
                     before any pick. -->
                <span ref="markRef" class="eyedropper-mark shrink-0" data-eyedropper-mark aria-hidden="true">
                    <PalettesGlyph class="w-7 h-7" :style="wellVars" />
                </span>

                <span class="text-mono-small text-muted-foreground truncate select-all min-w-0" data-eyedropper-readout>
                    {{ formattedColor ? formatCssCaption(formattedColor) : samplePrompt }}
                </span>

                <div class="flex-1" />

                <!-- The acts at the bar's end while the dialog is wide enough
                     to hold them beside the whole readout; a narrower dialog
                     (a phone, or a portrait photo on a desk) seats them in the
                     foot. Keyed on the dialog's own width (a container query),
                     never the screen's. -->
                <div class="eyedropper-bar-acts items-center gap-2 shrink-0">
                    <Button emphasis="secondary" size="sm" class="eyedropper-act" :disabled="!held" @click="onUseColor">
                        <Check aria-hidden="true" />
                        Use color
                    </Button>
                    <Button emphasis="primary" size="sm" class="eyedropper-act" :disabled="!held" @click="onAddToPalette">
                        <Plus aria-hidden="true" />
                        Add to palette
                    </Button>
                </div>

                <DockControl class="eyedropper-action-btn" title="Close eyedropper" @click="emit('close')">
                    <X class="w-4 h-4 transition-[transform,color]" />
                </DockControl>
            </div>

            <!-- The stage: the photo's own shape. It takes every touch (a
                 modal with nothing to scroll). -->
            <div
                ref="viewportRef"
                class="eyedropper-stage relative overflow-hidden bg-stage min-h-0 shrink"
                :class="held ? 'cursor-pointer' : 'cursor-crosshair'"
                style="touch-action: none;"
                :style="stageStyle"
                @pointerleave="onStageLeave"
            >
                <canvas
                    ref="canvasRef"
                    class="origin-top-left will-change-transform eyedropper-canvas"
                    :class="gesture.gestureActive.value || !fitted ? 'no-transition' : ''"
                    :style="canvasStyle"
                    aria-hidden="true"
                />

                <!-- The held pick's mark on the photo. -->
                <span
                    class="pick-ring"
                    :data-state="held ? 'on' : 'off'"
                    :style="{ translate: `${at.x}px ${at.y}px` }"
                    aria-hidden="true"
                />

                <!-- The lens: above the finger, centred on a mouse pointer.
                     Always mounted, so its canvas is painted on the touch's own
                     frame; placed by `translate`, shown by scale and opacity.
                     Its ring is the sampled colour, written with the sample. -->
                <span
                    class="lens"
                    data-eyedropper-lens
                    :data-state="lensOn ? 'on' : 'off'"
                    :data-glide="glide ? '' : undefined"
                    :style="lensStyle"
                    @transitionend.self="glide = false"
                >
                    <canvas ref="loupeCanvasRef" :width="LENS_BACKING" :height="LENS_BACKING" class="w-full h-full" aria-hidden="true" />
                    <span class="lens__reticle" aria-hidden="true" />
                </span>
            </div>

            <!-- The foot (a narrow dialog): the two acts, labelled, under the
                 thumb. Shown in place of the bar's by the same container query. -->
            <div ref="footRef" class="eyedropper-foot grid-cols-2 gap-2 px-2 py-2 shrink-0">
                <Button emphasis="secondary" size="sm" class="eyedropper-act" :disabled="!held" @click="onUseColor">
                    <Check aria-hidden="true" />
                    Use color
                </Button>
                <Button emphasis="primary" size="sm" class="eyedropper-act" :disabled="!held" @click="onAddToPalette">
                    <Plus aria-hidden="true" />
                    Add to palette
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, useTemplateRef, watch } from "vue";
import { X, Plus, Check } from "@lucide/vue";
import { useElementSize, useMediaQuery } from "@vueuse/core";
import { Button } from "@mkbabb/glass-ui/button";
import { DockControl } from "@mkbabb/glass-ui/dock";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@mkbabb/glass-ui/dialog";
import PalettesGlyph from "../../../shared/ui/PalettesGlyph.vue";

import { useInertiaGesture } from "./composables/useInertiaGesture";
import { useImageSampler, type DisplayColorSpace } from "./composables/useImageSampler";
import { useLoupeCanvas } from "./composables/useLoupeCanvas";
import { LOUPE_SIZE } from "./constants";
import { lensPlacement, rollSideFor } from "./lensPlacement";
import { formatCssCaption } from "../../../color-session/format-color";
import { useFrameCoalesce } from "../../../color-session/useAtmosphereFrameCoalesce";

const { open = true, imageUrl, colorSpace = "hex", aspect = null } = defineProps<{
    /** The host drives the dialog; it stays mounted through glass's leave. */
    open?: boolean;
    imageUrl: string;
    colorSpace?: DisplayColorSpace | undefined;
    /** The photo's width over its height, known to the host before the
     *  dialog opens, so the dialog opens at the photo's size. */
    aspect?: number | null;
}>();

const emit = defineEmits<{
    close: [];
    /** The dialog's leave has finished: its content is gone. */
    closed: [];
    pick: [cssColor: string];
    addToPalette: [cssColor: string];
}>();

/** The lens canvas's backing size: 2x the lens, for a crisp reticle field. */
const LENS_BACKING = LOUPE_SIZE * 2;

const viewportRef = useTemplateRef<HTMLElement>("viewportRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");
const markRef = useTemplateRef<HTMLElement>("markRef");
const barRef = useTemplateRef<HTMLElement>("barRef");
const footRef = useTemplateRef<HTMLElement>("footRef");
const { width: stageW } = useElementSize(viewportRef);
const { height: barH } = useElementSize(barRef, undefined, { box: "border-box" });
const { height: footH } = useElementSize(footRef, undefined, { box: "border-box" });

// The live sample.
const sampledColor = ref<string | null>(null);
const formattedColor = ref<string | null>(null);
/** The sample point, relative to the stage. */
const at = reactive({ x: 0, y: 0 });
/** The lens shows. */
const lensOn = ref(false);
/** The lens stands above a finger (touch) or sits on the pointer (mouse). */
const byTouch = ref(false);
/** A held lens travels to a new touch instead of jumping. */
const glide = ref(false);
/** Which side the lens rolls to at the stage's top edge, fixed per touch. */
let rollSide: 1 | -1 = 1;

// The held pick: an IMAGE point, so a pan or zoom keeps it on its pixel
// (SS8-0721, EY-20).
const held = ref(false);
let heldPick: { hex: string; formatted: string; x: number; y: number } | null = null;
/** The colours added in this sitting, the newest first. */
const picks = ref<string[]>([]);

const coarsePointer = useMediaQuery("(pointer: coarse)");
// The photo is a control with no other label: the prompt names its gesture.
const samplePrompt = computed(() => (coarsePointer.value ? "Drag to sample" : "Click to sample"));

const sampler = useImageSampler({
    canvasRef,
    getTransform: () => ({
        panX: gesture.panX.value,
        panY: gesture.panY.value,
        zoom: gesture.zoom.value,
    }),
    colorSpace: () => colorSpace,
});

const loupe = useLoupeCanvas({
    getImageCanvas: () => sampler.getImageCanvas(),
    viewportToImage: (rx, ry) => sampler.viewportToImage(rx, ry),
});
/** The reticle's side in lens px: what is sampled. */
const reticle = computed(() => Math.max(10, loupe.lensScale(gesture.zoom.value)));

/** A stage point clamped onto the photo. */
function onPhoto(rx: number, ry: number) {
    const zoom = gesture.zoom.value;
    const x0 = gesture.panX.value;
    const y0 = gesture.panY.value;
    const x1 = x0 + sampler.imgWidth.value * zoom;
    const y1 = y0 + sampler.imgHeight.value * zoom;
    return {
        x: Math.min(Math.max(rx, x0), Math.max(x0, x1 - 0.01)),
        y: Math.min(Math.max(ry, y0), Math.max(y0, y1 - 0.01)),
    };
}

/** Sample at a stage point, move the lens there and paint it. The colour
 *  (the lens's ring, the readout, the mark's well) is written before the
 *  lens's pixels are drawn, so it can never lag a late frame. */
function sampleHere(rx: number, ry: number): boolean {
    const zoom = gesture.zoom.value;
    const scale = loupe.lensScale(zoom);
    const p = onPhoto(rx, ry);
    // The mean of what the reticle frames (its side in source px).
    const result = sampler.sampleAt(p.x, p.y, Math.max(10, scale) / scale);
    if (!result) return false;
    sampledColor.value = result.hex;
    formattedColor.value = result.formatted;
    at.x = p.x;
    at.y = p.y;
    lensOn.value = true;
    loupe.drawLoupe(p.x, p.y, zoom);
    return true;
}

/** Hold the live sample as the pick. */
function hold() {
    if (!sampledColor.value || !formattedColor.value) return;
    const zoom = gesture.zoom.value;
    heldPick = {
        hex: sampledColor.value,
        formatted: formattedColor.value,
        x: (at.x - gesture.panX.value) / zoom,
        y: (at.y - gesture.panY.value) / zoom,
    };
    held.value = true;
}

/** The held pick's stage point under the live pan and zoom. */
function project() {
    if (!heldPick) return;
    const zoom = gesture.zoom.value;
    at.x = gesture.panX.value + heldPick.x * zoom;
    at.y = gesture.panY.value + heldPick.y * zoom;
    loupe.drawLoupe(at.x, at.y, zoom);
}

/** A dropped scrub (a second finger, a cancel): the last held pick comes
 *  back, or the lens goes. */
function restore() {
    if (heldPick) {
        sampledColor.value = heldPick.hex;
        formattedColor.value = heldPick.formatted;
        project();
        held.value = true;
        return;
    }
    release();
    sampledColor.value = null;
    formattedColor.value = null;
}

function release() {
    heldPick = null;
    held.value = false;
    lensOn.value = false;
}

// One sample and one lens draw per frame; the latest point wins.
const scrubWrite = useFrameCoalesce((p: { x: number; y: number }) => {
    sampleHere(p.x, p.y);
});

const gesture = useInertiaGesture(viewportRef, {
    contentSize: () => ({ width: sampler.imgWidth.value, height: sampler.imgHeight.value }),
    maxZoom: 10,
    friction: 0.92,
    onScrub(phase, rx, ry) {
        if (phase === "start") {
            byTouch.value = true;
            rollSide = rollSideFor(rx, stageW.value);
            glide.value = lensOn.value;
            held.value = false;
            sampleHere(rx, ry);
            return;
        }
        if (phase === "move") {
            glide.value = false;
            scrubWrite.push({ x: rx, y: ry });
            return;
        }
        scrubWrite.flush();
        if (phase === "end") hold();
        else restore();
    },
    // A mouse: a click holds the pick where it lands, wherever the last one was.
    onTap(rx, ry) {
        byTouch.value = false;
        glide.value = false;
        if (sampleHere(rx, ry)) hold();
    },
    onHover(rx, ry) {
        if (held.value) return;
        byTouch.value = false;
        sampleHere(rx, ry);
    },
});

watch(
    () => [gesture.panX.value, gesture.panY.value, gesture.zoom.value] as const,
    () => {
        if (held.value) project();
    },
);

// Reduced motion is a fade, never a cut. glass's guard zeroes every CSS
// transition under `reduce` (DESIGN.md 5.7 G4), so the lens's and the pick
// ring's fades run through the Web Animations API there.
const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
function fade(selector: string, on: boolean) {
    if (!reduceMotion.value) return;
    viewportRef.value
        ?.querySelector<HTMLElement>(selector)
        ?.animate([{ opacity: on ? 0 : 1 }, { opacity: on ? 1 : 0 }], { duration: 120, easing: "ease-out" });
}
watch(lensOn, (on) => fade(".lens", on), { flush: "sync" });
watch(held, (on) => fade(".pick-ring", on), { flush: "sync" });

function onStageLeave(e: PointerEvent) {
    // A hovering mouse that leaves takes its unheld lens with it.
    if (e.pointerType === "mouse" && !held.value) lensOn.value = false;
}

const canvasStyle = computed(() => ({
    transform: `translate(${gesture.panX.value}px, ${gesture.panY.value}px) scale(${gesture.zoom.value})`,
}));

const lensStyle = computed(() => {
    const r = LOUPE_SIZE / 2;
    const { cx, cy } = lensPlacement(at, stageW.value, byTouch.value, rollSide);
    return {
        translate: `${cx - r}px ${cy - r}px`,
        // It rises out of the touch point.
        transformOrigin: `${at.x - (cx - r)}px ${at.y - (cy - r)}px`,
        "--lens-color": sampledColor.value ?? "transparent",
        "--reticle": `${reticle.value}px`,
    };
});

// The dialog is the photo's size. The shape is clamped; a photo past the
// clamp is contained in the stage. The chrome (the bar, and the foot on a
// phone) is measured, so the photo takes exactly what is left.
const photoAspect = computed(() => {
    const own =
        sampler.imgWidth.value > 0 && sampler.imgHeight.value > 0
            ? sampler.imgWidth.value / sampler.imgHeight.value
            : null;
    return Math.min(3, Math.max(9 / 16, aspect ?? own ?? 4 / 3));
});
const frameVars = computed(() => ({
    "--ed-aspect": String(photoAspect.value),
    // The bar (52 px before its first measure) and the foot, which measures 0
    // while the container query hides it. A dialog sized without its foot is
    // the wider one, so the query settles on its first pass and never flips
    // back: the foot only shows when even that width is narrow.
    "--ed-chrome": `${Math.ceil((barH.value || 52) + footH.value)}px`,
}));
const stageStyle = computed(() => ({
    // The photo as the page shows it, until the canvas paints (the page warms
    // the canvas's decode when its own photo loads, so this is a fallback).
    backgroundImage: sampler.imageLoaded.value ? undefined : `url("${imageUrl}")`,
}));

// The mark's wells: the live sample, then the last three added.
const wellVars = computed(() => {
    const colours = [sampledColor.value, ...picks.value];
    const vars: Record<string, string> = {};
    colours.slice(0, 4).forEach((css, i) => {
        if (css) vars[`--palettes-well-${i}`] = css;
    });
    return vars;
});

/** The photo has had its first fit and the dialog its first frames: from
 *  here a pan or zoom eases. Until then every fit lands at once, so the
 *  opening shows the photo at its fitted size from the first frame (the
 *  chrome's measures can refit it once before the first paint). */
const fitted = ref(false);
async function loadAndFit() {
    fitted.value = false;
    await sampler.loadImage(imageUrl);
    await nextTick();
    gesture.fitToViewport();
    requestAnimationFrame(() => requestAnimationFrame(() => (fitted.value = true)));
}

// SS8-0726: each confirmation re-writes the status text (cleared first, so a
// repeat press of the same colour is announced again).
const confirmationText = ref("");
async function confirm(verb: string) {
    const caption = formattedColor.value ? formatCssCaption(formattedColor.value) : "Color";
    confirmationText.value = "";
    await nextTick();
    confirmationText.value = `${caption} ${verb}`;
}

/** The mark settles once on an Add (X-DS VR3-07: one settle, no bounce). */
function settleMark() {
    if (reduceMotion.value) return;
    markRef.value?.animate([{ scale: 1 }, { scale: 1.15 }, { scale: 1 }], {
        duration: 200,
        easing: "ease",
    });
}

function onAddToPalette() {
    if (!held.value || !sampledColor.value) return;
    emit("addToPalette", sampledColor.value);
    picks.value = [sampledColor.value, ...picks.value].slice(0, 3);
    settleMark();
    void confirm("added to palette");
}

function onUseColor() {
    if (!held.value || !sampledColor.value) return;
    emit("pick", sampledColor.value);
    void confirm("applied as current color");
    // The pick is in hand: the instrument closes.
    emit("close");
}

// Escape releases a held pick first; an Escape with nothing held dismisses.
function onEscape(e: KeyboardEvent) {
    if (!held.value) return;
    e.preventDefault();
    release();
}

onMounted(loadAndFit);

onBeforeUnmount(() => {
    sampler.dispose();
});

watch(() => imageUrl, () => { loadAndFit(); });
</script>

<style>
/* The dialog is the photo's width: the photo's shape times the height left
 * under the dialog's cap once the chrome is taken, within the screen. It is
 * the container its acts' seat is keyed on. Unscoped: the dialog's root is
 * glass's, teleported out of this tree, so it carries none of this file's
 * scope attributes, and a scoped rule never reached it (the dialog stayed at
 * glass's 32rem default for every photo). */
[data-slot="dialog-content"].eyedropper-dialog {
    container: eyedropper / inline-size;
    --ed-cap: min(100svh - 2rem, 48rem);
    inline-size: max(
        20rem,
        min(100vw - 2rem, 64rem, calc((var(--ed-cap) - var(--ed-chrome, 3.25rem)) * var(--ed-aspect, 4 / 3)))
    );
    max-inline-size: none;
    max-block-size: var(--ed-cap);
}
</style>

<style scoped>
@reference "../../../styles/foundation.css";

/* The stage is the photo's shape. */
.eyedropper-stage {
    aspect-ratio: var(--ed-aspect, 4 / 3);
    max-block-size: calc(var(--ed-cap) - var(--ed-chrome, 3.25rem));
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

/* "tracked = bezier" (DESIGN.md 5.5 KEEP): off during a gesture. */
.eyedropper-canvas {
    transition: transform var(--duration-fast) var(--ease-decelerate);
}
.eyedropper-canvas.no-transition {
    transition: none;
}

/* The lens. Its ring is the sampled colour; the hairline outside it is the
 * stage's own chrome ink, so it parts from a like-coloured photo. One shadow. */
.lens {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    z-index: var(--z-controls);
    display: block;
    inline-size: 7.5rem;
    block-size: 7.5rem;
    border-radius: 50%;
    border: 5px solid var(--lens-color, transparent);
    outline: 1px solid color-mix(in srgb, var(--on-stage-chrome) 70%, transparent);
    background: var(--stage);
    overflow: hidden;
    pointer-events: none;
    box-shadow: 0 4px 16px color-mix(in srgb, var(--shadow-color) 15%, transparent);
    opacity: 0;
    scale: 0.6;
    /* Out: a short fade, quicker than the entrance. */
    transition:
        opacity var(--duration-control) var(--ease-out),
        scale var(--duration-control) var(--ease-out);
}
.lens[data-state="on"] {
    opacity: 1;
    scale: 1;
    /* In: it rises out of the touch point on the press spring. */
    transition:
        opacity var(--duration-control) var(--ease-standard),
        scale var(--spring-press-duration, 120ms) var(--spring-press, ease-out);
}
/* A held lens carried to a new touch: a short travel, then 1:1. */
.lens[data-state="on"][data-glide] {
    transition:
        translate var(--duration-control) var(--ease-out),
        opacity var(--duration-control) var(--ease-standard),
        scale var(--spring-press-duration, 120ms) var(--spring-press, ease-out);
}
.lens__reticle {
    position: absolute;
    inset-block-start: 50%;
    inset-inline-start: 50%;
    inline-size: var(--reticle, 10px);
    block-size: var(--reticle, 10px);
    translate: -50% -50%;
    border: 1.5px solid var(--on-stage-chrome);
    outline: 1px solid color-mix(in srgb, var(--stage) 70%, transparent);
    border-radius: 2px;
}

/* The held pick's mark on the photo. */
.pick-ring {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    inline-size: 14px;
    block-size: 14px;
    margin: -7px 0 0 -7px;
    border-radius: 50%;
    border: 1.5px solid var(--on-stage-chrome);
    outline: 1px solid color-mix(in srgb, var(--stage) 70%, transparent);
    pointer-events: none;
    opacity: 0;
    scale: 0.6;
    transition:
        opacity var(--duration-control) var(--ease-out),
        scale var(--duration-control) var(--ease-out);
}
.pick-ring[data-state="on"] {
    opacity: 1;
    scale: 1;
}

/* The mark's seat: glass's coarse target. */
.eyedropper-mark {
    display: inline-grid;
    place-items: center;
    min-inline-size: 2.75rem;
    min-block-size: 2.75rem;
}

/* The acts' seat. At the bar's end they need about 25rem with the mark and
 * the close, so from 40rem the readout keeps a whole caption beside them
 * ("oklch(37.9% 0.138 266deg)" and longer); under that the foot takes them. */
.eyedropper-bar-acts {
    display: flex;
}
.eyedropper-foot {
    display: none;
}
@container eyedropper (width < 40rem) {
    .eyedropper-bar-acts {
        display: none;
    }
    .eyedropper-foot {
        display: grid;
    }
}

/* The acts take their ink as a pick is held, on the fast clock. A label
 * never wraps inside its pill. */
.eyedropper-act {
    white-space: nowrap;
    transition:
        opacity var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard);
}

/* The close seat's hover: the sampled colour. */
.eyedropper-action-btn:hover:not(:disabled) svg {
    color: var(--hover-color, var(--foreground));
    transform: scale(1.2);
}

@media (prefers-reduced-motion: reduce) {
    /* A fade, never a cut and never travel or scale. */
    .lens,
    .pick-ring {
        scale: 1;
    }
}
</style>
