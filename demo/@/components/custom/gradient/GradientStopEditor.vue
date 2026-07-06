<script setup lang="ts">
import { ref, computed, useTemplateRef } from "vue";
import type { GradientStop } from "./composables/useGradientModel";

const { stops, coalescedCSS } = defineProps<{
    stops: GradientStop[];
    coalescedCSS: string;
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

// Handle scale ladder: selected/dragging (1.25) > hover (1.1) > rest (1).
function handleScale(id: string): number {
    if (selectedId.value === id || draggingId.value === id) return 1.25;
    return hoveredId.value === id ? 1.1 : 1;
}

// A stop is removable only when more than 2 stops exist; matches onHandleContextMenu guard.
const removable = computed(() => stops.length > 2);

function getPosition(e: PointerEvent): number {
    if (!barRef.value) return 0;
    const rect = barRef.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    return Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)) * 10) / 10;
}

function onBarPointerDown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    if (target.dataset.stopId) return; // clicking a handle directly

    const pos = getPosition(e);

    // Find closest stop and warp it to click position
    let closestIdx = 0;
    let closestDist = Infinity;
    for (let i = 0; i < stops.length; i++) {
        const dist = Math.abs(stops[i]!.position - pos);
        if (dist < closestDist) { // strict < means left wins ties
            closestDist = dist;
            closestIdx = i;
        }
    }

    const closestStop = stops[closestIdx]!;
    selectedId.value = closestStop.id;
    emit("select", closestStop.id);
    emit("update:position", closestStop.id, pos);

    // Start dragging immediately
    draggingId.value = closestStop.id;
    const bar = barRef.value;
    if (bar) bar.setPointerCapture(e.pointerId);
}

function onBarDoubleClick(e: MouseEvent) {
    const pos = getPosition(e as unknown as PointerEvent);
    emit("add", pos);
}

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
    const pos = getPosition(e);
    emit("update:position", draggingId.value, pos);
}

function onHandlePointerUp() {
    draggingId.value = null;
}

function onBarPointerMove(e: PointerEvent) {
    if (!draggingId.value) return;
    const pos = getPosition(e);
    emit("update:position", draggingId.value, pos);
}

function onBarPointerUp() {
    draggingId.value = null;
}

function onHandleContextMenu(e: MouseEvent, id: string) {
    e.preventDefault();
    if (stops.length > 2) {
        emit("remove", id);
    }
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <!-- Gradient bar with draggable handles -->
        <div
            ref="barRef"
            :class="['relative h-10 rounded-lg glass-wash select-none touch-none', draggingId ? 'cursor-grabbing' : 'cursor-crosshair']"
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
            @dblclick="onBarDoubleClick"
        >
            <!-- Stop handles -->
            <button
                v-for="stop in stops"
                :key="stop.id"
                :data-stop-id="stop.id"
                :aria-label="`Gradient stop at ${Math.round(stop.position)}%`"
                :aria-disabled="!removable"
                class="absolute top-1/2 w-5 h-5 rounded-full border-2 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-disabled:opacity-50"
                :class="[
                    selectedId === stop.id
                        ? 'border-white ring-2 ring-primary z-popover'
                        : 'border-white/80 z-0'
                ]"
                :style="{
                    left: `${stop.position}%`,
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
            />
        </div>

        <!-- Hint text -->
        <p class="text-mono-small text-muted-foreground/40">
            Double-click to add · Right-click to remove · Drag to reposition
        </p>
    </div>
</template>