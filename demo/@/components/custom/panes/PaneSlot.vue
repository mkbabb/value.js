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

import { type Component } from "vue";

defineProps<{
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
</script>

<template>
    <Transition :name="transitionName" mode="out-in">
        <KeepAlive :max="max ?? 5">
            <component
                :is="component"
                :key="componentKey"
                :ref="onMount ? (el: any) => onMount!(el) : undefined"
                v-bind="componentProps"
            />
        </KeepAlive>
    </Transition>
</template>
