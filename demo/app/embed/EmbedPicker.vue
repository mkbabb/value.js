<template>
    <!-- The picker slice: the app's own plate, field and channel console, and
         the host's swatches. No readout, no menus. -->
    <div class="pane-shell embed-picker">
        <Card tier="resting" class="picker-plate paper-grain-overlay relative flex flex-col rounded-card min-w-0">
            <CardHeader class="embed-picker-header m-0 pb-0 [--card-pad:0.75rem] w-full px-[clamp(0.75rem,4cqi,1.5rem)] min-w-0">
                <!-- The colour's name when it is one of the host's own; the line
                     keeps its height either way, so the slice never jumps. -->
                <p class="picker-color-name" data-testid="embed-color-name">{{ currentName ?? " " }}</p>
            </CardHeader>
            <CardContent class="flex flex-col w-full px-[clamp(0.75rem,4cqi,1.5rem)] pt-3 pb-[clamp(1rem,3.5cqi,1.25rem)] min-w-0">
                <div class="picker-body flex flex-col">
                    <SpectrumCanvas />
                    <ComponentSliders />
                </div>
                <div
                    v-if="stops.length > 0"
                    ref="swatchRow"
                    class="embed-swatches"
                    role="group"
                    aria-label="Colours"
                    :style="{ '--cols': String(columns) }"
                >
                    <SwatchButton
                        v-for="(stop, i) in stops"
                        :key="i"
                        :color="stop.css"
                        size="md"
                        :aria-label="stop.name ? displayName(stop.name) : stop.css"
                        :title="stop.name ? displayName(stop.name) : undefined"
                        :aria-pressed="i === currentIndex"
                        @click="pick(stop.css)"
                    />
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, shallowRef, useTemplateRef, watch } from "vue";
import { Card, CardContent, CardHeader } from "@mkbabb/glass-ui/card";
import { createDefaultColorModel, type ColorModel } from "../../color-session/color-model";
import { COLOR_MODEL_KEY } from "../../color-session/keys";
import { useColorPipeline } from "../../color-session/useColorPipeline";
import { namedColorEntry, nearestNamedColor, type NamedColorEntry } from "../../color-session/named-color-snap";
import { usePointerDebug, POINTER_DEBUG_KEY } from "../../picker/debug/usePointerDebug";
import SpectrumCanvas from "../../picker/controls/SpectrumCanvas/SpectrumCanvas.vue";
import ComponentSliders from "../../picker/controls/ComponentSliders/ComponentSliders.vue";
import SwatchButton from "../../shared/ui/SwatchButton.vue";
import type { SliceStop } from "./params";
import { balancedColumns } from "./balance";
import "../../picker/seat.css";
import "../../picker/header.css";

const { stops } = defineProps<{ stops: SliceStop[] }>();
const emit = defineEmits<{ color: [css: string] }>();

// The slice's own model and pipeline: the same spine the app runs, seeded with
// the host's first colour (or the app's opening colour when none is given).
const model = shallowRef<ColorModel>(createDefaultColorModel());
const pipeline = useColorPipeline(model);
provide(COLOR_MODEL_KEY, pipeline);
provide(POINTER_DEBUG_KEY, usePointerDebug());

const { parseColor, setCurrentColor, cssColorOpaqueFrame } = pipeline;

function pick(css: string) {
    setCurrentColor(parseColor(css), model.value.selectedColorSpace);
}
if (stops[0]) pick(stops[0].css);

// The swatch the colour sits on (the app's own name-snap margin), and the name
// line, which speaks the host's names only.
const entries = computed<(NamedColorEntry | undefined)[]>(() =>
    stops.map((s) => namedColorEntry(s.name ?? s.css, s.css, "custom")),
);
const displayName = (name: string) => name.split("-").filter(Boolean).map((w) => w[0]!.toUpperCase() + w.slice(1)).join(" ");
const currentIndex = computed(() => {
    const match = nearestNamedColor(model.value.color, entries.value.filter((e) => e !== undefined));
    return match ? entries.value.indexOf(match.entry) : -1;
});
const currentName = computed(() => {
    const stop = stops[currentIndex.value];
    return stop?.name ? displayName(stop.name) : null;
});

// The swatches share their rows evenly: the row's width and the first
// swatch's size decide how many fit, and the count is spread over the rows.
const swatchRow = useTemplateRef<HTMLElement>("swatchRow");
const columns = ref(stops.length);
let rowObserver: ResizeObserver | null = null;
watch(
    swatchRow,
    (row) => {
        rowObserver?.disconnect();
        if (!row || typeof ResizeObserver === "undefined") return;
        rowObserver = new ResizeObserver(([entry]) => {
            const cell = (row.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
            const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
            columns.value = balancedColumns(stops.length, entry?.contentRect.width ?? row.clientWidth, cell, gap);
        });
        rowObserver.observe(row);
    },
    { flush: "post" },
);
onBeforeUnmount(() => rowObserver?.disconnect());

// The picked colour, one message per frame (the pipeline's frame-coalesced colour).
watch(cssColorOpaqueFrame, (css) => emit("color", css));
</script>

<style scoped>
/* The plate's resting shadow (glass --shadow-lg) falls inside the slice's own
   box: the frame's edge is never the shadow's edge. */
.embed-picker {
    inline-size: 100%;
    box-sizing: border-box;
    padding: 0.25rem 0.75rem 1.5rem;
}
.embed-swatches {
    display: grid;
    grid-template-columns: repeat(var(--cols), auto);
    justify-content: center;
    gap: 0.5rem;
    margin-block-start: 1.25rem;
}
</style>
