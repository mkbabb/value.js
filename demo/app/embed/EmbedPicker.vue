<template>
    <!-- The picker slice: the app's own picker, whole (its space selector, hero
         readout, name line, field, channel console and hero blob), and the
         host's colours under it as the app's own watercolour swatches. -->
    <div class="embed-picker">
        <ColorPicker />
        <!-- Her colours on one line, in one paper strip: the dots shrink with
             the row and never wrap (owner 2026-11-11). -->
        <div
            v-if="stops.length > 0"
            class="embed-swatches swatch-chip paper-grain-overlay"
            role="group"
            aria-label="Colours"
            :style="{ '--n': String(stops.length) }"
        >
            <SwatchButton
                v-for="(stop, i) in stops"
                :key="i"
                :color="stop.css"
                :seed="stop.name ?? stop.css"
                size="fluid"
                animate
                :done="i === currentIndex"
                :aria-label="stop.name ? displayName(stop.name) : stop.css"
                :title="stop.name ? displayName(stop.name) : undefined"
                :aria-pressed="i === currentIndex"
                @click="pick(stop.css)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref, shallowRef, watch } from "vue";
import { resolveRenderMode } from "@mkbabb/glass-ui/aurora";
import { createDefaultColorModel, type ColorModel } from "../../color-session/color-model";
import { COLOR_MODEL_KEY, INK_AMBIENT_KEY, INK_PLATE_REFERENT_KEY, SAFE_ACCENT_KEY } from "../../color-session/keys";
import { useContrastSafeColor } from "../../color-session/useContrastSafeColor";
import { useColorPipeline } from "../../color-session/useColorPipeline";
import { namedColorEntry, nearestNamedColor, type NamedColorEntry } from "../../color-session/named-color-snap";
import { SOFTWARE_RASTER_KEY } from "../../scenes/atmosphere/aurora-atoms";
import { VIEW_MANAGER_KEY } from "../../shell/useViewManager";
import { VIEW_MAP, type ViewId } from "../../shell/viewSchema";
import { provideHeroBlobConfig } from "../../picker/visual/heroBlobConfig";
import ColorPicker from "../../picker/ColorPicker.vue";
import SwatchButton from "../../shared/ui/SwatchButton.vue";
import type { SliceStop } from "./params";

const { stops } = defineProps<{ stops: SliceStop[] }>();
const emit = defineEmits<{ color: [css: string] }>();

// The slice's own model and pipeline: the same spine the app runs, seeded with
// the host's first colour (or the app's opening colour when none is given).
const model = shallowRef<ColorModel>(createDefaultColorModel());
const pipeline = useColorPipeline(model);
provide(COLOR_MODEL_KEY, pipeline);

const { applyExternalColor, cssColorOpaque, cssColorOpaqueFrame } = pipeline;

// What the app's shell gives the picker, given here by the slice: the hero
// blob's palette-coupled config, the bead's raster tier, the accent certified
// against the host's ground, and a view manager that stands on the picker.
provideHeroBlobConfig(cssColorOpaqueFrame);
provide(SOFTWARE_RASTER_KEY, resolveRenderMode("auto") === "css");
const ground = inject(INK_AMBIENT_KEY)!;
const { safeAccentCss } = useContrastSafeColor(cssColorOpaque, ground, inject(INK_PLATE_REFERENT_KEY, ground));
provide(SAFE_ACCENT_KEY, safeAccentCss);
provide(VIEW_MANAGER_KEY, {
    currentView: computed<ViewId>(() => "picker"),
    previousView: ref<ViewId | null>(null),
    currentConfig: computed(() => VIEW_MAP.picker),
    switchView: () => undefined,
    goBack: () => undefined,
    viewMap: VIEW_MAP,
});

// A press is an external colour, as the app's palettes apply one: the colour
// and the picker's input line both take it.
const pick = (css: string) => applyExternalColor(css);
if (stops[0]) pick(stops[0].css);

// The swatch the colour sits on (the app's own name-snap margin): it is the one pressed.
const entries = computed<(NamedColorEntry | undefined)[]>(() =>
    stops.map((s) => namedColorEntry(s.name ?? s.css, s.css, "custom")),
);
const displayName = (name: string) => name.split("-").filter(Boolean).map((w) => w[0]!.toUpperCase() + w.slice(1)).join(" ");
const currentIndex = computed(() => {
    const match = nearestNamedColor(model.value.color, entries.value.filter((e) => e !== undefined));
    return match ? entries.value.indexOf(match.entry) : -1;
});

// The picked colour, one message per frame (the pipeline's frame-coalesced colour).
watch(cssColorOpaqueFrame, (css) => emit("color", css));
</script>

<style scoped>
/* The plate's shadow falls wholly inside the slice's own box: the frame's edge
   is never the shadow's edge. glass's resting cast (the under-shadow, 4px 4px
   16px, and --shadow-lg, 0 4px 20px) reaches ~18px right and ~24px down, past
   this padding, so the frame cut it into a hard dark sliver at the plate's
   bottom-right corner, worst where the slice is framed wide. In the slice the
   plate rests on glass's --shadow-sm alone (0 2px 8px), which the padding
   holds, and the host gives the elevation. The top padding seats the hero
   blob, which rides the plate's corner as it does in the app. */
.embed-picker {
    inline-size: 100%;
    box-sizing: border-box;
    padding: 0.25rem 0.75rem 1.5rem;
}
.embed-picker :deep(.picker-plate.card) {
    --glass-under-shadow-default: none;
    --card-cast-rung: none;
    --shadow-card: var(--shadow-sm);
}
/* One strip, one line: the row is the paper (the chip class once, here, never
   on a dot) and the query container its dots size against. A dot is the
   strip's width shared by its count, less the least gap, between a 1.5rem
   floor (24px, the target floor: at a 320px frame a dot is ~31px) and the
   3.5rem the chipped dot used to stand; space-between spends what is left. */
.embed-swatches {
    --gap: clamp(0.25rem, 1.5cqi, 0.5rem);
    --swatch-size: clamp(1.5rem, calc((100cqi - (var(--n) - 1) * var(--gap)) / var(--n)), 3.5rem);
    container-type: inline-size;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    inline-size: auto;
    block-size: auto;
    padding: 0.5rem;
    margin-block-start: 1.25rem;
}
</style>
