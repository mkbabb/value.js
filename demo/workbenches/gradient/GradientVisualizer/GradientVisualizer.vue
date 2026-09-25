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
import { Check, Copy } from "@lucide/vue";
import { useClipboard } from "@mkbabb/glass-ui";
// X-W4 · X.W4.b (CC-047) — the producer's published field composition
// (`@mkbabb/glass-ui/labeled-field`, 7.0.0): `controlLabelable: false` for the
// non-labelable combobox root, and the slot's `labelledBy` names the trigger. The
// three control-bar captions stop floating unassociated above their triggers and
// the duplicated literal `aria-label` retires.
import { LabeledField } from "@mkbabb/glass-ui/labeled-field";
import { DockControl } from "@mkbabb/glass-ui/dock";
import GradientStopEditor from "./GradientStopEditor.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import GradientEasingEditor from "./GradientEasingEditor.vue";
import { useGradientModel } from "../composables/useGradientModel";
import type { GradientType } from "../model/types";
import {
    INTERPOLATION_SPACES,
    HUE_INTERPOLATION_METHODS,
} from "../../../color-session/color-space-meta";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import type { PickerSpace } from "../../../color-session/picker-color";
import { LIBRARY_PORT_KEY } from "../../../palettes/usePalettePorts";
import type { AcceptableValue } from "reka-ui";

const pm = inject(LIBRARY_PORT_KEY);

const {
    type,
    direction,
    stops,
    interpolationSpace,
    hueMethod,
    modelState,
    coalescedCSS,
    simpleCSS,
    railRampCSS,
    mintStop,
    resetStops,
    canRemove,
    removeStop,
    setStopPosition,
    setStopEasing,
    setStopsFromColors,
    applyCSS,
} = useGradientModel();

// The selected stop is the visualizer's OWN state (X-W6 · X.W6.c — G4d): its
// one parent binds nothing, so a `defineModel` here was a local ref wearing a
// public-API costume.
const selectedStopId = ref<string | null>(null);

const GRADIENT_TYPES: { value: GradientType; label: string; description: string }[] = [
    { value: "linear", label: "Linear", description: "Left-to-right or angled" },
    { value: "radial", label: "Radial", description: "Center-outward circle" },
    { value: "conic", label: "Conic", description: "Angular sweep" },
];

// A bar press mints through the model's own mint path (X-W6 · X.W6.c): the
// model samples its ramp through the one sampling law and prints the stop in
// the one literal dialect — the visualizer no longer carries a second sampler.
// X.W12.u2 (UIA-V-373): the minted stop becomes the inspector's subject.
function onAddStop(position: number) {
    selectedStopId.value = mintStop(position);
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
    if (!colors) return;
    // `setStopsFromColors` validates every literal through the shipped
    // `parseCssColor` oracle and RETURNS its verdict; the seat surfaces the
    // reason in the same Fira line a bad paste lands in. No `try`/`catch`:
    // the oracle answers with a shape, and wrapping it would mask the answer.
    const seeded = setStopsFromColors(colors);
    parseVerdict.value = seeded.ok ? null : seeded.reason;
}

function resetGradient() {
    resetStops();
    type.value = "linear";
    direction.value = 90;
    interpolationSpace.value = "oklch";
    hueMethod.value = "shorter";
    parseVerdict.value = null;
}

// X.W12.u2 (UIA-V-145): the copy confirms itself on glass's scope-owned
// clipboard status (the easing rows' idiom), and says what it copies — the
// rendered CSS, easing baked in — rather than the editable source above it.
const { status: cssCopyStatus, copy } = useClipboard({ resetMs: 1400 });
async function copyCSS() {
    await copy(coalescedCSS.value);
}

defineExpose({ resetGradient, copyCSS, seedFromPalette });
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- X-W6 · X.W6.b: the outline was FLAT — "Interpolation", "Easing" and
             "CSS" each announced themselves while the instrument's protagonist,
             the stop rail, was the one unnamed section on the route. It is named
             here, at the same rank as the sections that serve it. -->
        <section class="flex flex-col gap-2">
            <h3 class="font-display text-subheading text-muted-foreground">Stops</h3>
            <GradientStopEditor
                :stops="stops"
                :can-remove="canRemove"
                :rail-ramp="railRampCSS"
                :interpolation-space="interpolationSpace"
                :hue-method="hueMethod"
                v-model:selected-id="selectedStopId"
                @update:position="setStopPosition"
                @add="onAddStop"
                @remove="removeStop"
            />
        </section>

        <!-- ── Interpolation ── -->
        <hr class="border-border" />
        <h3 class="font-display text-subheading text-muted-foreground">
            Interpolation
        </h3>

        <!-- T.W6-2 / T-21b: the controls band carries the RENDER TILE as its
             right rail — the honest surface for what Type + Direction DO
             (the rail below normalizes to 90° for editing; before this tile
             the direction slider's only visible effect was corrupting the
             rail). One sampling law feeds both; the tile paints the
             CSS-output truth (`coalescedCSS`). -->
        <!-- X.W12.u2 (UIA-V-44, consumer half): below sm the band stacks —
             the render tile full-width on top, the three fields in one column
             — so no trigger overlaps its neighbour or the tile at phone width.
             (The glass half — SelectTrigger's value span cannot shrink — is O-59.) -->
        <div class="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                <!-- W5-7 (P1-11): the per-select subtitle rows are EXCISED — they
                 truncated at every viewport and duplicated the descriptions
                 already carried inside each dropdown's items. -->
                <LabeledField
                    class="min-w-0"
                    label="Type"
                    :control-labelable="false"
                    v-slot="{ labelledBy }"
                >
                    <Select
                        :model-value="type"
                        @update:model-value="
                            (v: AcceptableValue) => (type = v as GradientType)
                        "
                    >
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="t in GRADIENT_TYPES"
                                :key="t.value"
                                :value="t.value"
                            >
                                {{ t.label }}
                                <template #description>
                                    <span class="text-micro text-muted-foreground">{{
                                        t.description
                                    }}</span>
                                </template>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>

                <LabeledField
                    class="min-w-0"
                    label="Space"
                    :control-labelable="false"
                    v-slot="{ labelledBy }"
                >
                    <Select
                        :model-value="interpolationSpace"
                        @update:model-value="
                            (v: AcceptableValue) =>
                                (interpolationSpace = v as PickerSpace)
                        "
                    >
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="s in INTERPOLATION_SPACES"
                                :key="s.value"
                                :value="s.value"
                            >
                                {{ s.label }}
                                <template #description>
                                    <span class="text-micro text-muted-foreground">{{
                                        s.description
                                    }}</span>
                                </template>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>

                <LabeledField
                    class="min-w-0"
                    label="Hue"
                    :control-labelable="false"
                    v-slot="{ labelledBy }"
                >
                    <Select
                        :model-value="hueMethod"
                        @update:model-value="
                            (v: AcceptableValue) =>
                                (hueMethod = v as HueInterpolationMethod)
                        "
                    >
                        <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="m in HUE_INTERPOLATION_METHODS"
                                :key="m.value"
                                :value="m.value"
                            >
                                {{ m.label }}
                                <template #description>
                                    <span class="text-micro text-muted-foreground">{{
                                        m.description
                                    }}</span>
                                </template>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </LabeledField>
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
                class="gradient-render-tile order-first sm:order-none h-20 sm:h-auto w-full sm:w-24 sm:row-span-2 rounded-card border border-card-edge"
                :style="{ '--tile-render': coalescedCSS }"
            />

            <!-- X.W12.u2 (UIA-V-147): a radial render takes no angle, so the
                 control leaves; for conic the angle is the sweep's start ("From"). -->
            <div v-if="type !== 'radial'" class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                    <span class="section-label">{{ type === "conic" ? "From" : "Direction" }}</span>
                    <span class="text-mono-small text-muted-foreground tabular-nums"
                        >{{ direction }}&deg;</span
                    >
                </div>
                <Slider
                    :aria-label="type === 'conic' ? 'Conic start angle' : 'Gradient direction'"
                    :model-value="[direction]"
                    :min="0"
                    :max="360"
                    :step="1"
                    @update:model-value="
                        (v: number[] | undefined) => {
                            if (v?.[0] !== undefined) direction = v[0];
                        }
                    "
                />
            </div>
        </div>

        <!-- ── Easing (R.W4 Lane D — the glass-ui <EasingPicker> consume;
             the accordion itself is GradientEasingEditor, W5-9) ── -->
        <template v-if="stops.length >= 2">
            <hr class="border-border" />
            <h3 class="font-display text-subheading text-muted-foreground">Easing</h3>
            <GradientEasingEditor
                :stops="stops"
                :model-state="modelState"
                @update-easing="setStopEasing"
            />
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="font-display text-subheading text-muted-foreground">CSS</h3>
            <DockControl
                compact
                :title="cssCopyStatus === 'success' ? 'Copied rendered CSS' : 'Copy rendered CSS (easing baked in)'"
                @click="copyCSS"
            >
                <Check v-if="cssCopyStatus === 'success'" class="w-5 h-5" />
                <Copy v-else class="w-5 h-5" />
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
    background-size:
        100% 100%,
        16px 16px;
    box-shadow: var(--shadow-sm);
}
</style>
