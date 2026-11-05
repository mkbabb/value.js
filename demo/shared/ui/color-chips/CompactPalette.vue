<script setup lang="ts">
/**
 * <CompactPalette> — THE ONE COMPACT PALETTE RENDER (X realization V-D3 ·
 * BC-PCS-10): a row of swatches in less room than the palette needs, under
 * the one truncation policy of `./compact` — every colour when it fits,
 * otherwise `capacity − 1` swatches and a `+k` seat, so drawn + k is always
 * the palette's count.
 *
 * GEOMETRY is two registered lengths on the root, so the capacity is read in
 * px from the render's own container (`cqi / swatch`), whatever unit a host
 * sets them in:
 *   - `--compact-size`  the swatch's inline (and block) size;
 *   - `--compact-step`  one swatch start to the next: size + gap, or
 *                       size − overlap (a stacked cluster).
 * The host gives the root its inline size (a fixed column, or the row).
 *
 * The swatch is the host's (`#swatch` slot — a WatercolorDot keeps its
 * identity); the default is a plain disc. `transition` names the host's
 * enter/leave family, so a host whose swatches arrive with motion keeps it.
 */
import { computed, shallowRef, TransitionGroup, useTemplateRef } from "vue";
import { unrefElement, useResizeObserver } from "@vueuse/core";
import { compactCapacity, compactWindow } from "./compact";

const { colors, transition = undefined } = defineProps<{
    /** The palette's colours, as paintable CSS. */
    colors: readonly string[];
    /** The host's TransitionGroup name, when its swatches move. */
    transition?: string;
}>();

// The root is a TransitionGroup instance or a plain element; either way the
// measured box is its element.
const root = useTemplateRef<HTMLElement>("root");
const capacity = shallowRef(Number.POSITIVE_INFINITY);

function measure(inline: number) {
    const el = unrefElement(root);
    if (!(el instanceof HTMLElement)) return;
    const cs = getComputedStyle(el);
    capacity.value = compactCapacity(
        inline,
        Number.parseFloat(cs.getPropertyValue("--compact-size")),
        Number.parseFloat(cs.getPropertyValue("--compact-step")),
    );
}
useResizeObserver(root, ([entry]) => measure(entry?.contentRect.width ?? 0));

const view = computed(() => compactWindow(colors.length, capacity.value));
const shown = computed(() => colors.slice(0, view.value.shown));

// A TransitionGroup takes its name and its tag; a plain host takes neither.
const host = computed(() => (transition ? TransitionGroup : "div"));
const hostAttrs = computed(() => (transition ? { name: transition, tag: "div" } : {}));
</script>

<template>
    <component
        :is="host"
        v-bind="hostAttrs"
        ref="root"
        class="compact-palette"
        :data-count="colors.length"
        :data-shown="view.shown"
    >
        <span
            v-for="(color, i) in shown"
            :key="i"
            class="compact-palette__seat"
            data-compact-swatch
        >
            <slot name="swatch" :color="color" :index="i">
                <span class="compact-palette__disc" :style="{ backgroundColor: color }"></span>
            </slot>
        </span>
        <span
            v-if="view.more > 0"
            key="__more__"
            class="compact-palette__seat compact-palette__more"
            data-compact-more
            :aria-label="`${view.more} more colours`"
            >+{{ view.more }}</span
        >
    </component>
</template>

<style>
/* Registered (and inherited, so each seat reads its root's geometry), so
 * `getComputedStyle` answers px whatever unit a host sets.
 * An initial value must be computationally independent (no `rem`), so the
 * registration carries px and the default seat is set on the root below. */
@property --compact-size {
    syntax: "<length>";
    inherits: true;
    initial-value: 20px;
}
@property --compact-step {
    syntax: "<length>";
    inherits: true;
    initial-value: 28px;
}
</style>

<style scoped>
/* The default seat, at the lowest specificity a host's own class beats. */
:where(.compact-palette) {
    --compact-size: 1.25rem;
    --compact-step: 1.75rem;
}
.compact-palette {
    display: flex;
    align-items: center;
    min-inline-size: 0;
}
.compact-palette__seat {
    display: inline-flex;
    flex: none;
    inline-size: var(--compact-size);
    block-size: var(--compact-size);
}
.compact-palette__seat + .compact-palette__seat {
    margin-inline-start: calc(var(--compact-step) - var(--compact-size));
}
.compact-palette__disc {
    inline-size: 100%;
    block-size: 100%;
    border-radius: 9999px;
    box-shadow: 0 0 0 1px var(--background);
}
/* The count seat: the swatch's own disc, in the plate's muted well, the
 * count in the caption voice — it reads as "and k more", never as a colour. */
.compact-palette__more {
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-color: var(--muted);
    box-shadow: 0 0 0 1px var(--background);
    color: var(--muted-foreground);
    font-size: max(0.625rem, calc(var(--compact-size) * 0.42));
    font-variant-numeric: tabular-nums;
    line-height: 1;
    position: relative;
}
</style>
