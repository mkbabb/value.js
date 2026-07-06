<script setup lang="ts">
import { computed, inject, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Copy, ChevronDown } from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import { EasingPicker } from "@mkbabb/glass-ui/easing";
import type { EasingPickerMode, EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import GradientStopEditor from "./GradientStopEditor.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import PerceivedSpacePlate from "./PerceivedSpacePlate.vue";
import {
    useGradientModel,
    INTERPOLATION_SPACES,
    HUE_INTERPOLATION_METHODS,
} from "./composables/useGradientModel";
import type { GradientType } from "./composables/useGradientModel";
import { interpolateStopColors } from "./composables/useGradientInterpolation";
import { usePerceivedRamp } from "./composables/usePerceivedRamp";
import { linear } from "@src/easing";
import type { ColorSpace } from "@src/units/color/constants";
import type { HueInterpolationMethod } from "@src/units/color/mix";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import type { AcceptableValue } from "reka-ui";

const pm = inject(PALETTE_MANAGER_KEY);

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
    addStop,
    removeStop,
    updateStop,
    updateInterval,
    setStopsFromColors,
    applyCSS,
} = useGradientModel();

const selectedStopId = defineModel<string | null>("selectedStopId", { default: null });

// ── The perceived-space projection (W5-8): plate trajectory + rail rungs ──
const ramp = usePerceivedRamp(modelState, selectedStopId);

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
function colorAtPosition(position: number): string | null {
    const list = stops.value;
    if (list.length === 0) return null;
    if (position <= list[0]!.position) return list[0]!.cssColor;
    const last = list[list.length - 1]!;
    if (position >= last.position) return last.cssColor;
    for (let i = 0; i < list.length - 1; i++) {
        const s0 = list[i]!;
        const s1 = list[i + 1]!;
        if (position < s0.position || position > s1.position) continue;
        const span = s1.position - s0.position;
        const t = span > 0 ? (position - s0.position) / span : 0;
        const easedT = (intervals.value[i]?.fn ?? linear)(t);
        return interpolateStopColors(
            s0.cssColor,
            s1.cssColor,
            easedT,
            interpolationSpace.value,
            hueMethod.value,
        );
    }
    return null;
}

function onAddStop(position: number) {
    addStop(colorAtPosition(position) ?? "oklch(0.7 0.1 180)", position);
}

function onStopPositionUpdate(id: string, position: number) {
    updateStop(id, { position });
}

// The one-line Fira verdict of the LAST editor parse (W5-11 / P0-1):
// null = applied; string = the explicit rejection reason.
const parseVerdict = ref<string | null>(null);

function onParseCSS(css: string) {
    // A successful parse re-seeds every interval to the `linear` preset
    // (easing-disposition §1.6/D3). Bump the epoch so the alive picker
    // instances remount re-seeded `linear` — the drawn curve and the
    // interval's live fn must never disagree after a reset.
    const result = applyCSS(css);
    parseVerdict.value = result.ok ? null : result.reason;
    if (result.ok) {
        easingEpoch.value++;
        intervalModes.value = {};
    }
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

const intervalPairs = computed(() => {
    const pairs: { index: number; label: string; css: string }[] = [];
    for (let i = 0; i < intervals.value.length; i++) {
        const s0 = stops.value[i];
        const s1 = stops.value[i + 1];
        if (!s0 || !s1) continue;
        pairs.push({
            index: i,
            label: `${i + 1} → ${i + 2}`,
            css: intervals.value[i]!.css,
        });
    }
    return pairs;
});

// ── The easing accordion (R.W4 Lane D / D2 — the `/easing` consume) ──
// One specimen row per interval; the OPEN row seats the glass-ui
// <EasingPicker> (curve math 100% value.js — CSSCubicBezier / steppedEase
// through the producer's composable). Instances stay ALIVE (v-show, never
// v-if) so an authored curve is never re-seeded away by a row toggle — the
// drawn curve and the interval's live fn cannot disagree. The one legitimate
// re-seed is a model-wide reset (a successful CSS parse), keyed by epoch.
const openInterval = ref<number | null>(0);
const easingEpoch = ref(0);

function toggleInterval(index: number) {
    openInterval.value = openInterval.value === index ? null : index;
}

// Q12 (RATIFIED): steps mode is ALLOWED — banded gradients are a design
// tool. The mode rides the picker's `mode` prop, toggled per interval.
const intervalModes = ref<Record<number, EasingPickerMode>>({});
const EASING_MODE_OPTIONS = [
    { label: "Curve", value: "bezier" },
    { label: "Steps", value: "steps" },
];

function intervalMode(index: number): EasingPickerMode {
    return intervalModes.value[index] ?? "bezier";
}

function onModeChange(index: number, value: string | string[]) {
    const next = Array.isArray(value) ? value[0] : value;
    if (next === "bezier" || next === "steps") {
        intervalModes.value = { ...intervalModes.value, [index]: next };
    }
}

function onIntervalAuthored(index: number, value: EasingPickerValue | undefined) {
    if (value) updateInterval(index, value);
}

const activeTypeDesc = computed(() =>
    GRADIENT_TYPES.find((t) => t.value === type.value)?.description ?? "",
);
const activeSpaceDesc = computed(() =>
    INTERPOLATION_SPACES.find((s) => s.value === interpolationSpace.value)?.description ?? "",
);
const activeHueDesc = computed(() =>
    HUE_INTERPOLATION_METHODS.find((m) => m.value === hueMethod.value)?.description ?? "",
);

async function copyCSS() {
    await copyToClipboard(coalescedCSS.value);
}

defineExpose({ resetGradient, copyCSS, seedFromPalette });
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Hero: the perceived-space plate (W5-8). The old aria-hidden
             preview swatch is DISSOLVED (P2-16 — it duplicated the editing
             rail below): the rail renders the gradient itself; the plate
             renders what the ramp DOES in perceptual space. -->
        <PerceivedSpacePlate
            :points="ramp.points.value"
            :stop-points="ramp.stopPoints.value"
            :hue="ramp.runningHue.value"
            :selected-id="selectedStopId"
        />

        <GradientStopEditor
            :stops="stops"
            :coalesced-c-s-s="coalescedCSS"
            :color-at="colorAtPosition"
            :rungs="ramp.rungs.value"
            v-model:selected-id="selectedStopId"
            @update:position="onStopPositionUpdate"
            @add="onAddStop"
            @remove="removeStop"
            @select="(id) => selectedStopId = id"
        />

        <!-- ── Interpolation ── -->
        <hr class="border-border" />
        <h3 class="font-display text-subheading text-muted-foreground">Interpolation</h3>

        <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
                <span class="section-label">Type</span>
                <span class="section-subtitle">{{ activeTypeDesc }}</span>
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
                <span class="section-subtitle">{{ activeSpaceDesc }}</span>
                <Select :model-value="interpolationSpace" @update:model-value="(v: AcceptableValue) => interpolationSpace = v as ColorSpace">
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
                <span class="section-subtitle">{{ activeHueDesc }}</span>
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

        <div class="flex flex-col gap-1">
            <div class="flex items-center justify-between">
                <span class="section-label">Direction</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">{{ direction }}&deg;</span>
            </div>
            <Slider aria-label="Gradient direction" :model-value="[direction]" :min="0" :max="360" :step="1"
                @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) direction = v[0]; }" />
        </div>

        <!-- ── Easing (R.W4 Lane D — the glass-ui <EasingPicker> consume) ── -->
        <template v-if="intervalPairs.length > 0">
            <hr class="border-border" />
            <h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
            <div class="flex flex-col gap-2">
                <!-- Z2 in-plate specimen rows: flat on the plate, --card-edge
                     hairline, no shadow (DESIGN.md § Depth). -->
                <div
                    v-for="pair in intervalPairs"
                    :key="`${pair.index}:${easingEpoch}`"
                    class="rounded-card border border-card-edge overflow-hidden"
                >
                    <button
                        type="button"
                        class="interval-head w-full flex items-center gap-3 px-3 py-2 text-left cursor-pointer"
                        :aria-expanded="openInterval === pair.index"
                        :aria-controls="`easing-interval-${pair.index}`"
                        @click="toggleInterval(pair.index)"
                    >
                        <span class="fira-code text-mono-small text-muted-foreground shrink-0">{{ pair.label }}</span>
                        <code class="fira-code text-mono-caption text-muted-foreground/70 truncate flex-1 min-w-0">{{ pair.css }}</code>
                        <ChevronDown
                            class="w-4 h-4 shrink-0 text-muted-foreground transition-transform"
                            :class="openInterval === pair.index ? 'rotate-180' : ''"
                            aria-hidden="true"
                        />
                    </button>
                    <div
                        v-show="openInterval === pair.index"
                        :id="`easing-interval-${pair.index}`"
                        class="px-3 pb-3 flex flex-col gap-3"
                    >
                        <div class="flex justify-start">
                            <SegmentedTabs
                                variant="pill"
                                :options="EASING_MODE_OPTIONS"
                                :model-value="intervalMode(pair.index)"
                                aria-label="Easing mode"
                                @update:model-value="(v: string | string[]) => onModeChange(pair.index, v)"
                            />
                        </div>
                        <EasingPicker
                            :mode="intervalMode(pair.index)"
                            preset="linear"
                            :label="`Easing curve ${pair.label}`"
                            @update:model-value="(v: EasingPickerValue | undefined) => onIntervalAuthored(pair.index, v)"
                        />
                    </div>
                </div>
            </div>
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="font-display text-subheading text-muted-foreground">CSS</h3>
            <DockIconButton compact title="Copy CSS" @click="copyCSS">
                <Copy class="w-5 h-5" />
            </DockIconButton>
        </div>
        <GradientCodeEditor
            :model-value="simpleCSS"
            :parse-verdict="parseVerdict"
            @parse="onParseCSS"
        />
    </div>
</template>

<style scoped>
/* The specimen-row head: a whisper hover + the house focus register (the
 * accent-aware ring the keystone mints — never a bespoke outline). */
.interval-head {
    transition: background-color var(--duration-fast) var(--ease-standard);
}
.interval-head:hover {
    background-color: color-mix(in oklab, var(--foreground) 4%, transparent);
}
.interval-head:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}
</style>
