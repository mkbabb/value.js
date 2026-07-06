<script setup lang="ts">
import { inject, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Slider } from "@components/ui/slider";
import { Copy } from "@lucide/vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { DockIconButton } from "@mkbabb/glass-ui/dock";
import GradientStopEditor from "./GradientStopEditor.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import GradientEasingEditor from "./GradientEasingEditor.vue";
import PerceivedSpacePlate from "./PerceivedSpacePlate.vue";
import {
    useGradientModel,
    INTERPOLATION_SPACES,
    HUE_INTERPOLATION_METHODS,
} from "./composables/useGradientModel";
import type { GradientType } from "./composables/useGradientModel";
import { interpolateStopColors } from "./composables/useGradientInterpolation";
import { usePerceivedRamp } from "./composables/usePerceivedRamp";
import { easingFnOf } from "./composables/useGradientCSS";
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
        const easedT = easingFnOf(intervals.value[i])(t);
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
    // (easing-disposition §1.6/D3). Bump the epoch so the easing editor's
    // alive picker instances remount re-seeded `linear` — the drawn curve
    // and the interval's live fn must never disagree after a reset.
    const result = applyCSS(css);
    parseVerdict.value = result.ok ? null : result.reason;
    if (result.ok) easingEpoch.value++;
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

// The easing editor's re-seed signal (a successful CSS parse re-keys its
// rows; the accordion itself lives in GradientEasingEditor — the W5-9
// surface, lifted at the ≤400 cap check).
const easingEpoch = ref(0);

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

        <!-- ── Easing (R.W4 Lane D — the glass-ui <EasingPicker> consume;
             the accordion itself is GradientEasingEditor, W5-9) ── -->
        <template v-if="intervals.length > 0 && stops.length >= 2">
            <hr class="border-border" />
            <h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
            <GradientEasingEditor
                :stops="stops"
                :intervals="intervals"
                :model-state="modelState"
                :epoch="easingEpoch"
                @update-interval="updateInterval"
            />
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
