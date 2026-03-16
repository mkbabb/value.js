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
