<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, useTemplateRef, provide } from "vue";

const props = withDefaults(
    defineProps<{
        collapseDelay?: number;
        startCollapsed?: boolean;
        fitContent?: boolean;
        position?: "fixed" | "inline";
    }>(),
    {
        collapseDelay: 2000,
        startCollapsed: true,
        fitContent: false,
        position: "inline",
    },
);

const expanded = ref(!props.startCollapsed);
let collapseTimer: ReturnType<typeof setTimeout> | null = null;
let ignoreEvents = true;

const dockEl = useTemplateRef<HTMLElement>("dockEl");

// --- Hold-open bookkeeping ---
// Child components (e.g. DockPopover, Select) can hold the dock open
let keepOpenCount = 0;
// True while any descendant has focus
let hasFocus = false;
// True while the pointer is hovering the dock
let hovered = false;

provide("dockKeepOpen", () => {
    keepOpenCount++;
    clearTimer();
});

provide("dockRelease", () => {
    keepOpenCount = Math.max(0, keepOpenCount - 1);
    if (keepOpenCount === 0) maybeScheduleCollapse();
});

onMounted(() => {
    setTimeout(() => {
        ignoreEvents = false;
    }, 600);
});

function clearTimer() {
    if (collapseTimer) {
        clearTimeout(collapseTimer);
        collapseTimer = null;
    }
}

/** Only schedule collapse when nothing is actively holding the dock open. */
function maybeScheduleCollapse() {
    if (keepOpenCount > 0 || hasFocus || hovered) return;
    clearTimer();
    collapseTimer = setTimeout(() => {
        expanded.value = false;
    }, props.collapseDelay);
}

function onEnter() {
    if (ignoreEvents) return;
    hovered = true;
    clearTimer();
    expanded.value = true;
}

function onLeave(e: MouseEvent) {
    // relatedTarget inside the dock → pointer is still here
    const root = dockEl.value;
    if (root && e.relatedTarget instanceof Node && root.contains(e.relatedTarget)) return;

    // Fallback: when relatedTarget is null (child removed during Vue Transition,
    // SVG edge cases, mobile), check if cursor is still within bounds.
    if (root && !e.relatedTarget) {
        const rect = root.getBoundingClientRect();
        if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        ) return;
    }

    hovered = false;
    maybeScheduleCollapse();
}

function onFocusIn() {
    if (ignoreEvents) return;
    hasFocus = true;
    clearTimer();
    expanded.value = true;
}

function onFocusOut(e: FocusEvent) {
    const root = e.currentTarget as HTMLElement;
    // Focus moving to another element inside the dock — still focused
    if (e.relatedTarget && root.contains(e.relatedTarget as Node)) return;
    hasFocus = false;
    maybeScheduleCollapse();
}

/** Any pointer activity inside the dock resets the collapse timer. */
function onPointerDownDock() {
    if (ignoreEvents) return;
    clearTimer();
    expanded.value = true;
}

function onClickSummary() {
    clearTimer();
    expanded.value = true;
    // On mobile the summary tap is the only entry point — don't
    // immediately schedule collapse; wait for pointer/focus/hover
    // to leave the dock instead.
}

// Click-away collapse
function onPointerDownOutside(e: PointerEvent) {
    const root = dockEl.value;
    if (!root || root.contains(e.target as Node)) return;
    if (keepOpenCount > 0) return;
    clearTimer();
    expanded.value = false;
}

let removeClickAway: (() => void) | null = null;

watch(expanded, (isExpanded) => {
    if (isExpanded) {
        document.addEventListener("pointerdown", onPointerDownOutside, true);
        removeClickAway = () => {
            document.removeEventListener("pointerdown", onPointerDownOutside, true);
            removeClickAway = null;
        };
    } else {
        removeClickAway?.();
        hovered = false;
        hasFocus = false;
    }
});

defineExpose({ expanded, expand: onEnter, collapse: () => { expanded.value = false; } });
onUnmounted(() => {
    clearTimer();
    removeClickAway?.();
});
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            { expanded, collapsed: !expanded, 'fit-content': fitContent },
            position === 'fixed' ? 'fixed bottom-4 left-1/2 -translate-x-1/2' : 'dock-inline',
        ]"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
        @pointerdown="onPointerDownDock"
    >
        <div class="dock-layers">
            <div :class="['dock-layer dock-layer--full', { 'layer-active': expanded }]">
                <slot />
            </div>
            <div :class="['dock-layer dock-layer--summary', { 'layer-active': !expanded }]" @click="onClickSummary">
                <slot name="collapsed" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.glass-dock {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-pill);
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    white-space: nowrap;
    transition:
        background 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease;
}

.glass-dock:where(.fixed) {
    z-index: var(--z-dock);
}

.dock-inline {
    margin: 0 auto;
}

.glass-dock.collapsed {
    cursor: pointer;
    background: hsl(var(--card) / 0.92);
    border-color: hsl(var(--border) / 0.7);
    box-shadow:
        var(--shadow-sm),
        0 0 0 1px hsl(var(--foreground) / 0.06);
}

.glass-dock.collapsed:hover {
    background: hsl(var(--card) / 0.96);
    border-color: hsl(var(--border));
}

.dock-layers {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dock-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2rem;
    white-space: nowrap;
    transition: opacity 0.2s ease;
}

.dock-layer.layer-active {
    opacity: 1;
    pointer-events: auto;
    position: relative;
}

.dock-layer:not(.layer-active) {
    opacity: 0;
    pointer-events: none;
    position: absolute;
}
</style>
