<script setup lang="ts">
import { ref } from "vue";
import type { GradientStop } from "@composables/useGradientModel";

const props = defineProps<{
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

const barRef = ref<HTMLDivElement | null>(null);
const draggingId = ref<string | null>(null);

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
    for (let i = 0; i < props.stops.length; i++) {
        const dist = Math.abs(props.stops[i]!.position - pos);
        if (dist < closestDist) { // strict < means left wins ties
            closestDist = dist;
            closestIdx = i;
        }
    }

    const closestStop = props.stops[closestIdx]!;
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
    if (props.stops.length > 2) {
        emit("remove", id);
    }
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <!-- Gradient bar with draggable handles -->
        <div
            ref="barRef"
            :class="['relative h-10 rounded-lg glass select-none touch-none', draggingId ? 'cursor-grabbing' : 'cursor-crosshair']"
            :style="{ background: coalescedCSS }"
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
                class="absolute top-1/2 w-5 h-5 rounded-full border-2 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                :class="[
                    selectedId === stop.id
                        ? 'border-white ring-2 ring-primary z-10'
                        : 'border-white/80 z-0'
                ]"
                :style="{
                    left: `${stop.position}%`,
                    backgroundColor: stop.cssColor,
                    boxShadow: 'var(--shadow-sm)',
                    transform: `translate(-50%, -50%) scale(${selectedId === stop.id || draggingId === stop.id ? 1.25 : 1})`,
                    transition: 'box-shadow var(--duration-fast) var(--ease-standard), transform var(--duration-normal) var(--ease-spring)',
                }"
                @pointerdown="(e) => onHandlePointerDown(e, stop.id)"
                @pointermove="onHandlePointerMove"
                @pointerup="onHandlePointerUp"
                @pointercancel="onHandlePointerUp"
                @contextmenu="(e) => onHandleContextMenu(e, stop.id)"
            />
        </div>

        <!-- Hint text -->
        <p class="fira-code text-xs text-muted-foreground/40">
            Double-click to add · Right-click to remove · Drag to reposition
        </p>
    </div>
</template>