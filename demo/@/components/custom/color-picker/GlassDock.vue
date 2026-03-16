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

// Child components (e.g. DockPopover, Select) can hold the dock open
let keepOpenCount = 0;

provide("dockKeepOpen", () => {
    keepOpenCount++;
    clearTimer();
});

provide("dockRelease", () => {
    keepOpenCount = Math.max(0, keepOpenCount - 1);
    if (keepOpenCount === 0) scheduleCollapse();
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

function scheduleCollapse() {
    if (keepOpenCount > 0) return;
    clearTimer();
    collapseTimer = setTimeout(() => {
        expanded.value = false;
    }, props.collapseDelay);
}

function onEnter() {
    if (ignoreEvents) return;
    clearTimer();
    expanded.value = true;
}

function onLeave(e: MouseEvent) {
    const root = dockEl.value;
    if (root && e.relatedTarget instanceof Node && root.contains(e.relatedTarget)) return;
    if (keepOpenCount > 0) return;
    scheduleCollapse();
}

function onFocusOut(e: FocusEvent) {
    const root = e.currentTarget as HTMLElement;
    if (e.relatedTarget && root.contains(e.relatedTarget as Node)) return;
    if (keepOpenCount > 0) return;
    scheduleCollapse();
}

function onClickSummary() {
    clearTimer();
    expanded.value = true;
    scheduleCollapse();
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
        @focusin="onEnter"
        @focusout="onFocusOut"
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
