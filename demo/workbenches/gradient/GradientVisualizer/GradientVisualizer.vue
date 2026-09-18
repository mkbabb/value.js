<script setup lang="ts">
import { inject, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
import { Slider } from "../../../ui/slider";
import { Copy } from "@lucide/vue";
import { writeClipboard } from "@mkbabb/glass-ui";
import { DockControl } from "@mkbabb/glass-ui/dock";
import GradientStopEditor from "./GradientStopEditor.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import GradientEasingEditor from "./GradientEasingEditor.vue";
import {
    useGradientModel,
    INTERPOLATION_SPACES,
    HUE_INTERPOLATION_METHODS,
} from "../composables/useGradientModel";
import type { GradientType } from "../composables/useGradientModel";
import { interpolateStopColors } from "../composables/useGradientInterpolation";
import { easingFnOf } from "../composables/useGradientCSS";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "../../../color-session/picker-color";
import { LIBRARY_PORT_KEY } from "../../../palettes/usePalettePorts";
import type { AcceptableValue } from "reka-ui";

const pm = inject(LIBRARY_PORT_KEY);

const {
    type,
    direction,
    stops,
    intervals,
    interpolationSpace,
    hueMethod,
    modelState,
    coalescedCSS,
    simpleCSS,
    railRampCSS,
    addStop,
    removeStop,
    updateStop,
    updateInterval,
    setStopsFromColors,
    applyCSS,
} = useGradientModel();

const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });

const GRADIENT_TYPES: { value: GradientType; label: string; description: string }[] = [
    { value: "linear", label: "Linear", description: "Left-to-right or angled" },
    { value: "radial", label: "Radial", description: "Center-outward circle" },
    { value: "conic", label: "Conic", description: "Angular sweep" },
];

/**
 * The ramp's color at a bar position (0–100), easing included — feeds the
 * stop editor's add ghost AND the color a bar-click mints (W5-11: the old
 * fixed-teal insert is dead; an added stop is invisible until moved).
 */
function colorAtPosition(position: number): string {
    const list = stops.value;
    if (list.length === 0) throw new Error("A gradient must retain at least one stop");
    if (position <= list[0]!.position) return list[0]!.cssColor;
    const last = list[list.length - 1]!;
    if (position >= last.position) return last.cssColor;
    for (let i = 0; i < list.length - 1; i++) {
        const s0 = list[i]!;
        const s1 = list[i + 1]!;
        if (position < s0.position || position > s1.position) continue;
        const span = s1.position - s0.position;
        const t = span > 0 ? (position - s0.position) / span : 0;
        const interval = intervals.value[i];
        if (!interval) throw new Error(`Gradient interval ${i} is missing`);
        const easedT = easingFnOf(interval)(t);
        return interpolateStopColors(
            s0.cssColor,
            s1.cssColor,
            easedT,
            interpolationSpace.value,
            hueMethod.value,
        );
    }
    throw new Error(`No gradient interval contains ${position}%`);
}

function onAddStop(position: number) {
    addStop(colorAtPosition(position), position);
}

function onStopPositionUpdate(id: string, position: number) {
    updateStop(id, { position });
}

// The one-line Fira verdict of the LAST editor parse (W5-11 / P0-1):
// null = applied; string = the explicit rejection reason.
const parseVerdict = ref<string | null>(null);

function onParseCSS(css: string) {
    // A successful parse re-seeds every interval to the `linear` preset
    // (easing-disposition §1.6/D3); the picker's two-way model follows the
    // complete replacement value directly.
    const result = applyCSS(css);
    parseVerdict.value = result.ok ? null : result.reason;
}

function seedFromPalette() {
    if (!pm) return;
    const colors = pm.savedPalettes.value[0]?.colors.map((c) => c.css);
    if (colors && colors.length >= 2) {
        setStopsFromColors(colors);
    }
}

function resetGradient() {
    setStopsFromColors(["oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)"]);
    type.value = "linear";
    direction.value = 90;
    interpolationSpace.value = "oklch";
    hueMethod.value = "shorter";
    parseVerdict.value = null;
}

async function copyCSS() {
    await writeClipboard(coalescedCSS.value);
}

defineExpose({ resetGradient, copyCSS, seedFromPalette });
</script>

<template>
    <div class="flex flex-col gap-5">
        <GradientStopEditor
            :stops="stops"
            :rail-ramp="railRampCSS"
            :color-at="colorAtPosition"
            v-model:selected-id="selectedStopId"
            @update:position="onStopPositionUpdate"
            @add="onAddStop"
            @remove="removeStop"
            @select="(id) => selectedStopId = id"
        />

        <!-- ── Interpolation ── -->
        <hr class="border-border" />
        <h3 class="font-display text-subheading text-muted-foreground">Interpolation</h3>

        <!-- T.W6-2 / T-21b: the controls band carries the RENDER TILE as its
             right rail — the honest surface for what Type + Direction DO
             (the rail below normalizes to 90° for editing; before this tile
             the direction slider's only visible effect was corrupting the
             rail). One sampling law feeds both; the tile paints the
             CSS-output truth (`coalescedCSS`). -->
        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-5">
        <div class="grid grid-cols-3 gap-3 min-w-0">
            <!-- W5-7 (P1-11): the per-select subtitle rows are EXCISED — they
                 truncated at every viewport and duplicated the descriptions
                 already carried inside each dropdown's items. -->
            <div class="flex flex-col gap-1">
                <span class="section-label">Type</span>
                <Select :model-value="type" @update:model-value="(v: AcceptableValue) => type = v as GradientType">
                    <SelectTrigger class="h-9" aria-label="Gradient type">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="t in GRADIENT_TYPES" :key="t.value" :value="t.value">
                            {{ t.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ t.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Space</span>
                <Select :model-value="interpolationSpace" @update:model-value="(v: AcceptableValue) => interpolationSpace = v as PickerSpace">
                    <SelectTrigger class="h-9" aria-label="Interpolation space">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="s in INTERPOLATION_SPACES" :key="s.value" :value="s.value">
                            {{ s.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ s.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Hue</span>
                <Select :model-value="hueMethod" @update:model-value="(v: AcceptableValue) => hueMethod = v as HueInterpolationMethod">
                    <SelectTrigger class="h-9" aria-label="Hue interpolation">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="m in HUE_INTERPOLATION_METHODS" :key="m.value" :value="m.value">
                            {{ m.label }}
                            <template #description>
                                <span class="text-micro text-muted-foreground">{{ m.description }}</span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <!-- The render tile: type + direction APPLIED — a square-ish surface
             spanning both control rows (an angled/radial/conic render cannot
             live in a horizontal strip). Same owned paint-stack contract as
             the rail: render layer no-repeat over the full border-box,
             alpha-checker ground beneath. -->
        <div
            data-testid="gradient-render-tile"
            role="img"
            aria-label="Gradient render with type and direction applied"
            class="gradient-render-tile row-span-2 w-20 sm:w-24 rounded-card border border-card-edge"
            :style="{ '--tile-render': coalescedCSS }"
        />

        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
                <span class="section-label">Direction</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">{{ direction }}&deg;</span>
            </div>
            <Slider aria-label="Gradient direction" :model-value="[direction]" :min="0" :max="360" :step="1"
                @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) direction = v[0]; }" />
        </div>
        </div>

        <!-- ── Easing (R.W4 Lane D — the glass-ui <EasingPicker> consume;
             the accordion itself is GradientEasingEditor, W5-9) ── -->
        <template v-if="intervals.length > 0 && stops.length >= 2">
            <hr class="border-border" />
            <h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
            <GradientEasingEditor
                :stops="stops"
                :intervals="intervals"
                :model-state="modelState"
                @update-interval="updateInterval"
            />
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="font-display text-subheading text-muted-foreground">CSS</h3>
            <DockControl compact title="Copy CSS" @click="copyCSS">
                <Copy class="w-5 h-5" />
            </DockControl>
        </div>
        <GradientCodeEditor
            :model-value="simpleCSS"
            :parse-verdict="parseVerdict"
            @parse="onParseCSS"
        />
    </div>
</template>

<style scoped>
/* The render tile's owned paint stack (T.W6-2 — the rail's material
   contract, same shape): the render string is a border-box layer, no-repeat,
   over the alpha-checker ground; silhouette and render agree at every edge.
   Never a per-callsite `background` shorthand assembly. */
.gradient-render-tile {
    background: var(--tile-render), var(--alpha-checker);
    background-origin: border-box;
    background-clip: border-box;
    background-repeat: no-repeat, repeat;
    background-size: 100% 100%, 16px 16px;
    box-shadow: var(--shadow-sm);
}
</style>
