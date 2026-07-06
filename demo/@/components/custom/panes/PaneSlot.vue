<script setup lang="ts">
// PaneSlot — collapses the triple-nested Transition + KeepAlive + component:is
// pattern repeated three times in App.vue (Ae-3). Receives the resolved
// component, key, props, and transition name from the single route table that
// usePaneRouter provides so both mobile and desktop slots use one path.
//
// `onMount` is an optional callback that receives the mounted component
// instance (or null on unmount). This lets App.vue capture template refs
// (colorPickerRef, generatePaneRef, etc.) from components rendered inside
// the slot without fighting Vue's template-ref auto-unwrapping rules.
//
// TRANSITION MODE — the <Transition> below is the DEFAULT (simultaneous) mode,
// NOT `mode="out-in"`. Under `vite` DEV, Vue 3.5's out-in machinery fails to
// re-mount the incoming pane once the outgoing pane's leave transition has
// completed: the internal `afterLeave → instance.update()` re-render does not
// fire, so the slot is stranded on a bare comment placeholder forever (the
// incoming component's setup — even a *synchronous* one — is never invoked).
// The production build schedules the same handoff correctly, so the defect was
// dev-only and silent (R.W3 close blocker; see docs/tranches/R/audit/
// R.W3-visual-runtime/DELTA.md). The default mode mounts the incoming pane
// immediately and CROSS-FADES the two slides (the Lane-E space-switch intent),
// working identically in dev and build. The pane slots stay height-bounded
// (min-h-0 + --content-max-h), so the brief co-mount never jumps the layout.

import { onBeforeUnmount, ref, shallowRef, watch, type Component } from "vue";

const {
    component,
    componentKey,
    componentProps,
    transitionName,
    max = 5,
    onMount,
} = defineProps<{
    /** The resolved async component for this slot. */
    component: Component | null | undefined;
    /** Stable key passed to <component> for keep-alive identity. */
    componentKey: string;
    /** v-bind spread onto the resolved component. */
    componentProps?: Record<string, unknown>;
    /** Transition name (empty string suppresses animation). */
    transitionName: string;
    /** KeepAlive max cache size. */
    max?: number;
    /**
     * Optional mount callback. Called with the component instance on mount,
     * and with null on unmount. Provides a ref-capture path for App.vue
     * without relying on template ref auto-unwrapping.
     */
    onMount?: (instance: any) => void;
}>();

// W3-4 (S.W3 · pane-swap payload): the rendered triplet TRAILS the incoming
// props by one animation frame on a KEY change (a real pane swap), so the first
// post-click frame paints only the cheap container slide — the incoming pane's
// synchronous mount (the P1 long task, perf-transitions P1-1) lands on the NEXT
// frame, under cover of the enter transition instead of on the click frame.
// Same-key prop updates flow through LIVE (the active pane never lags its
// colour). The initial render and any swap with no enter animation mount
// immediately (no blank frame). Rapid A→B→C swaps coalesce — only the latest
// pane mounts. KEEP simultaneous mode (the fceed47 cure stands).
const liveComponent = shallowRef(component);
const liveKey = ref(componentKey);
const liveProps = shallowRef(componentProps);

let raf = 0;

function commit(key: string) {
    liveComponent.value = component;
    liveKey.value = key;
    liveProps.value = componentProps;
}

watch(
    () => componentKey,
    (key) => {
        cancelAnimationFrame(raf);
        if (!transitionName) {
            // No enter animation to cover a deferred mount — swap now.
            commit(key);
            return;
        }
        raf = requestAnimationFrame(() => commit(key));
    },
);

// Same-key prop updates stay live: while the rendered key matches the incoming
// key (i.e. NOT mid-swap), forward fresh props to the active pane every tick.
watch(
    () => componentProps,
    (p) => {
        if (componentKey === liveKey.value) liveProps.value = p;
    },
);

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<template>
    <Transition :name="transitionName">
        <KeepAlive :max="max">
            <component
                :is="liveComponent"
                :key="liveKey"
                :ref="onMount ? (el: any) => onMount!(el) : undefined"
                v-bind="liveProps"
            />
        </KeepAlive>
    </Transition>
</template>
