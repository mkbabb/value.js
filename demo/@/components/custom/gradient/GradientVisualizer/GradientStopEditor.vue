<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import { X } from "@lucide/vue";
import type { GradientStop } from "../composables/useGradientModel";

const { stops, coalescedCSS, colorAt = undefined, rungs = undefined } = defineProps<{
    stops: GradientStop[];
    coalescedCSS: string;
    /** Ramp color at a position (0–100) — previews the ghost + seeds adds. */
    colorAt?: (position: number) => string | null;
    /**
     * iso-ΔE_OK rung positions (0–100) from `usePerceivedRamp` (W5-8):
     * equal perceptual arc-length ticks — bunched rungs = fast perceptual
     * change, open rungs = a flat zone; a steps() interval reads as
     * rung-free bands with clusters at the risers.
     */
    rungs?: number[];
}>();

const emit = defineEmits<{
    "update:position": [id: string, position: number];
    "add": [position: number];
    "remove": [id: string];
    "select": [id: string];
}>();

const selectedId = defineModel<string | null>("selectedId", { default: null });

const barRef = useTemplateRef<HTMLDivElement>("barRef");
const draggingId = ref<string | null>(null);
// S.W4 / W4-3: hover state for the handle scale — the inline `transform`
// shadows any `hover:` class utility, so hover must be modeled here and
// folded into the same inline expression.
const hoveredId = ref<string | null>(null);

// ── The add affordance (W5-11 / P1-3: the dblclick/warp truce) ──
// The old bar-pointerdown WARPED the nearest stop to the click point and
// started a drag — dblclick-to-add fired that twice first, corrupting a stop
// before adding one. The truce: the bar NEVER moves an existing stop. A bar
// click ADDS a stop at that position (a hover ghost previews exactly what
// will land — the gesture is self-evident, no instruction line needed);
// drags start ONLY on a handle.
const hoverPos = ref<number | null>(null);
let pendingAdd: { x: number; y: number } | null = null;

// ── Geometry (W5-11: end-handle truce) ──
// Handle CENTERS ride an inset track [HANDLE_HALF, width - HANDLE_HALF], so
// the 0%/100% handles sit fully INSIDE the bar instead of hanging half off
// its rounded corners.
const HANDLE_HALF = 10; // w-5 handle → 20px, half = 10

function handleLeft(position: number): string {
    return `calc(${HANDLE_HALF}px + (100% - ${HANDLE_HALF * 2}px) * ${position / 100})`;
}

// Handle scale ladder: selected/dragging (1.25) > hover (1.1) > rest (1).
function handleScale(id: string): number {
    if (selectedId.value === id || draggingId.value === id) return 1.25;
    return hoveredId.value === id ? 1.1 : 1;
}

// A stop is removable only when more than 2 stops exist.
const removable = computed(() => stops.length > 2);
const selectedStop = computed(
    () => stops.find((s) => s.id === selectedId.value) ?? null,
);

const ghostColor = computed(() =>
    hoverPos.value !== null ? (colorAt?.(hoverPos.value) ?? null) : null,
);

function getPosition(e: { clientX: number }): number {
    if (!barRef.value) return 0;
    const rect = barRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left - HANDLE_HALF;
    const span = Math.max(1, rect.width - HANDLE_HALF * 2);
    return Math.round(Math.max(0, Math.min(100, (x / span) * 100)) * 10) / 10;
}

// ── Bar gestures: hover ghost + click-to-add (never warp, never drag) ──

function onBarPointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("[data-stop-id]")) return; // handles own their gestures
    pendingAdd = { x: e.clientX, y: e.clientY };
}

function onBarPointerMove(e: PointerEvent) {
    if (draggingId.value) {
        // Fallback path while a handle drag is live (capture sits on the handle).
        emit("update:position", draggingId.value, getPosition(e));
        return;
    }
    const target = e.target as HTMLElement;
    hoverPos.value = target.closest("[data-stop-id]") ? null : getPosition(e);
}

function onBarPointerUp(e: PointerEvent) {
    if (pendingAdd) {
        const moved =
            Math.abs(e.clientX - pendingAdd.x) > 4 ||
            Math.abs(e.clientY - pendingAdd.y) > 4;
        if (!moved) emit("add", getPosition(e));
        pendingAdd = null;
    }
    draggingId.value = null;
}

function onBarPointerLeave() {
    hoverPos.value = null;
    pendingAdd = null;
}

// ── Handle gestures: drag / select / remove ──

function onHandlePointerDown(e: PointerEvent, id: string) {
    e.preventDefault();
    e.stopPropagation();
    draggingId.value = id;
    selectedId.value = id;
    emit("select", id);

    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
}

function onHandlePointerMove(e: PointerEvent) {
    if (!draggingId.value) return;
    emit("update:position", draggingId.value, getPosition(e));
}

function onHandlePointerUp() {
    draggingId.value = null;
}

function removeStop(id: string) {
    if (!removable.value) return;
    if (selectedId.value === id) selectedId.value = null;
    emit("remove", id);
}

function onHandleContextMenu(e: MouseEvent, id: string) {
    e.preventDefault();
    removeStop(id);
}

/** Keyboard: arrows nudge (±1, shift ±10); Delete/Backspace removes. */
function onHandleKeydown(e: KeyboardEvent, stop: GradientStop) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const delta = (e.key === "ArrowLeft" ? -1 : 1) * (e.shiftKey ? 10 : 1);
        const next = Math.max(0, Math.min(100, stop.position + delta));
        selectedId.value = stop.id;
        emit("update:position", stop.id, Math.round(next * 10) / 10);
    } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removeStop(stop.id);
    }
}
</script>

<template>
    <!-- `relative`: the remove chip anchors to the RAIL root (the bar's
         contain:paint would clip a child chip — see below). -->
    <div class="relative flex flex-col gap-1">
        <!-- Gradient bar: hover ghost previews the add; handles drag; the
             selected handle carries a touch-true remove chip. -->
        <div
            ref="barRef"
            data-testid="gradient-stop-bar"
            :class="['relative h-10 rounded-lg glass-wash select-none touch-none', draggingId ? 'cursor-grabbing' : 'cursor-copy']"
            :style="{
                /* S owner-ruling 2026-07-05: the house `--alpha-checker`
                   ground layers UNDER the gradient, so translucent stops
                   read as transparency, not as a wash over the pane glass. */
                background: `${coalescedCSS}, var(--alpha-checker)`,
            }"
            @pointerdown="onBarPointerDown"
            @pointermove="onBarPointerMove"
            @pointerup="onBarPointerUp"
            @pointercancel="onBarPointerUp"
            @pointerleave="onBarPointerLeave"
        >
            <!-- The add ghost: a dashed twin of the handle species, filled
                 with the exact ramp color a click would mint (W5-11 — the
                 affordance replaces the instruction line). -->
            <div
                v-if="hoverPos !== null && !draggingId"
                class="absolute top-1/2 w-5 h-5 rounded-full border-2 border-dashed border-white/70 opacity-80 pointer-events-none z-0"
                :style="{
                    left: handleLeft(hoverPos),
                    background: ghostColor
                        ? `linear-gradient(${ghostColor}, ${ghostColor}), var(--alpha-checker)`
                        : 'var(--alpha-checker)',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 'var(--shadow-sm)',
                }"
                aria-hidden="true"
            />

            <!-- Stop handles -->
            <button
                v-for="stop in stops"
                :key="stop.id"
                :data-stop-id="stop.id"
                type="button"
                :aria-label="`Gradient stop at ${Math.round(stop.position)}%`"
                class="absolute top-1/2 w-5 h-5 rounded-full border-2 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                :class="[
                    selectedId === stop.id
                        ? 'border-white ring-2 ring-primary z-10'
                        : 'border-white/80 z-0'
                ]"
                :style="{
                    left: handleLeft(stop.position),
                    /* S owner-ruling 2026-07-05: the stop well paints its
                       color as a layer OVER the `--alpha-checker` ground
                       (background-color would sit UNDER background-image,
                       so the color rides a const-color gradient layer). */
                    background: `linear-gradient(${stop.cssColor}, ${stop.cssColor}), var(--alpha-checker)`,
                    boxShadow: 'var(--shadow-sm)',
                    /* S.W4 / W4-3: the hover scale rides the INLINE transform —
                       the `hover:scale-110` utility was DEAD, shadowed by this
                       inline `transform` (inline style always outranks the
                       class). Selected/dragging (1.25) outranks hover (1.1). */
                    transform: `translate(-50%, -50%) scale(${handleScale(stop.id)})`,
                    transition: 'box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-normal) var(--ease-spring)',
                }"
                @pointerdown="(e) => onHandlePointerDown(e, stop.id)"
                @pointermove="onHandlePointerMove"
                @pointerup="onHandlePointerUp"
                @pointercancel="onHandlePointerUp"
                @pointerenter="hoveredId = stop.id"
                @pointerleave="hoveredId = null"
                @contextmenu="(e) => onHandleContextMenu(e, stop.id)"
                @keydown="(e) => onHandleKeydown(e, stop)"
            />

        </div>

        <!-- The remove chip (W5-11 / P1-3: remove was right-click-ONLY —
             undiscoverable, impossible on touch). Floats BELOW the selected
             handle whenever removal is legal. A SIBLING of the bar, never a
             child: the bar's glass-wash recipe carries `contain: paint`,
             which clips any descendant outside the bar's box out of paint
             AND hit-testing (probed live — the same clipping class as the
             producer's documented R8-17 defect). -->
        <button
            v-if="selectedStop && removable"
            type="button"
            aria-label="Remove selected stop"
            class="absolute w-6 h-6 top-11 rounded-full border border-card-edge bg-well text-muted-foreground flex items-center justify-center z-20 cursor-pointer hover:text-destructive hover:border-destructive/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :style="{
                left: handleLeft(selectedStop.position),
                transform: 'translate(-50%, 0)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
            }"
            @click.stop="removeStop(selectedStop.id)"
        >
            <X class="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        <!-- The iso-ΔE_OK rung row (W5-8): perceptual pacing as visible
             netting on the editing rail, mapped to the same inset track as
             the handles so rungs, beads and handles agree on the axis. -->
        <div
            v-if="rungs && rungs.length"
            class="relative h-1.5"
            aria-hidden="true"
        >
            <span
                v-for="(r, i) in rungs"
                :key="i"
                class="absolute top-0 w-px h-full bg-muted-foreground/50"
                :style="{ left: handleLeft(r) }"
            />
        </div>
    </div>
</template>
