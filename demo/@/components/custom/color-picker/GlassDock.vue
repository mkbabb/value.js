<script setup lang="ts">
import { useTemplateRef } from "vue";
import { useDockState } from "@composables/useDockState";

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

const dockEl = useTemplateRef<HTMLElement>("dockEl");

const {
    expanded,
    isPinned,
    onMouseEnter,
    onMouseLeave,
    onFocusIn,
    onFocusOut,
    onClickCollapsed,
    keepOpen,
    release,
    expand,
    collapse,
} = useDockState({
    collapseDelay: props.collapseDelay,
    rootEl: dockEl,
});

// If startCollapsed is false, expand immediately after mount
if (!props.startCollapsed) {
    expand();
}

defineExpose({ expanded, isPinned, expand, collapse, keepOpen, release });
</script>

<template>
    <div
        ref="dockEl"
        class="glass-dock"
        :class="[
            { expanded, collapsed: !expanded, pinned: isPinned, 'fit-content': fitContent },
            position === 'fixed' ? 'fixed bottom-4 left-1/2 -translate-x-1/2' : 'dock-inline',
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave($event)"
        @focusin="onFocusIn"
        @focusout="onFocusOut"
    >
        <div class="dock-layers">
            <div
                :class="['dock-layer dock-layer--full', { 'layer-active': expanded }]"
                :inert="!expanded || undefined"
            >
                <slot />
            </div>
            <div
                :class="['dock-layer dock-layer--summary', { 'layer-active': !expanded }]"
                :inert="expanded || undefined"
                @click="onClickCollapsed"
            >
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
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1.5px solid hsl(var(--foreground) / 0.25);
    box-shadow:
        0 4px 20px hsl(var(--foreground) / 0.25),
        0 0 0 1px hsl(var(--foreground) / 0.15);
    overflow: hidden;
    white-space: nowrap;

    /* Single spring transition for all properties */
    transition:
        width 0.3s cubic-bezier(0.22, 1.6, 0.36, 1),
        max-width 0.3s cubic-bezier(0.22, 1.6, 0.36, 1),
        padding 0.2s cubic-bezier(0.22, 1.6, 0.36, 1),
        box-shadow 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease,
        transform 0.2s cubic-bezier(0.22, 1.6, 0.36, 1);
}

/* Expanded: concrete max width */
.glass-dock.expanded {
    width: auto;
    max-width: min(600px, calc(100vw - 1rem));
}

/* Collapsed: small pill */
.glass-dock.collapsed {
    width: auto;
    max-width: 5rem;
    min-width: 3rem;
    padding: 0.375rem 0.5rem;
    cursor: pointer;
    background: hsl(var(--card) / 0.92);
    border-color: hsl(var(--foreground) / 0.3);
    box-shadow:
        0 2px 12px hsl(var(--foreground) / 0.2),
        0 0 0 1px hsl(var(--foreground) / 0.15);
}

.glass-dock.collapsed:hover {
    background: hsl(var(--card) / 0.96);
    border-color: hsl(var(--foreground) / 0.4);
}

.glass-dock:where(.fixed) {
    z-index: var(--z-dock);
}

.dock-inline {
    margin: 0 auto;
}

/* Layer container */
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

/* Full layer always in flow — drives the container height */
.dock-layer--full {
    position: relative;
}

/* Summary layer always absolutely positioned — never affects height */
.dock-layer--summary {
    position: absolute;
    inset: 0;
}

.dock-layer.layer-active {
    opacity: 1;
    pointer-events: auto;
}

.dock-layer:not(.layer-active) {
    opacity: 0;
    pointer-events: none;
}
</style>
