<script setup lang="ts">
import { computed, inject, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@mkbabb/glass-ui/select";
import { Slider } from "@mkbabb/glass-ui/slider";
import { Check, Copy } from "@lucide/vue";
import { useClipboard } from "@mkbabb/glass-ui";
// X-W4 · X.W4.b (CC-047) — the producer's published field composition
// (`@mkbabb/glass-ui/labeled-field`, 7.0.0): `controlLabelable: false` for the
// non-labelable combobox root, and the slot's `labelledBy` names the trigger. The
// three control-bar captions stop floating unassociated above their triggers and
// the duplicated literal `aria-label` retires.
import { LabeledField } from "@mkbabb/glass-ui/labeled-field";
import { Label } from "@mkbabb/glass-ui/label";
import { DockControl } from "@mkbabb/glass-ui/dock";
import GradientStopRail from "./GradientStopRail.vue";
import GradientStopInspector from "./GradientStopInspector.vue";
import GradientCodeEditor from "./GradientCodeEditor.vue";
import GradientEasingEditor from "./GradientEasingEditor.vue";
import { useGradientModel } from "../composables/useGradientModel";
import type { GradientType } from "../model/types";
import InterpolationFields from "../../../shared/ui/InterpolationFields.vue";
import { LIBRARY_PORT_KEY } from "../../../palettes/usePalettePorts";
import type { AcceptableValue } from "reka-ui";
import { usePanePopups } from "../../../shell/usePanePopups";

// A2-VA-L2-11 — this pane's popups close when the pane deactivates.
const popups = usePanePopups();

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

/** The interpolation specimens' operands: this gradient's stops, in order. */
const operandColors = computed(() => stops.value.map((s) => s.cssColor));

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
            <h3 class="font-display text-subheading">Stops</h3>
            <GradientStopRail
                :stops="stops"
                :can-remove="canRemove"
                :rail-ramp="railRampCSS"
                :interpolation-space="interpolationSpace"
                :hue-method="hueMethod"
                v-model:selected-id="selectedStopId"
                @update:position="setStopPosition"
                @add="onAddStop"
                @remove="removeStop"
                v-slot="seat"
            >
                <!-- A2-VA-L1-11: the rail owns the stops, the selection, the
                     removal rule and the polite channel; the inspector is its
                     own component, seated in the rail's slot. -->
                <GradientStopInspector
                    :stop="seat.selectedStop"
                    :index="seat.selectedIndex"
                    :count="seat.count"
                    :refusal="seat.removalRefusal"
                    :notice="seat.notice"
                    @position="seat.commitPosition"
                    @remove="seat.requestRemove()"
                />
            </GradientStopRail>
        </section>

        <!-- ── Interpolation ── -->
        <hr class="border-border" />
        <h3 class="font-display text-subheading">
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
             (The glass half — SelectTrigger's value span cannot shrink — is O-59.)
             X-DS pass 7 (V7C-01): the tile no longer LEADS the band at phone
             width, where it stood as a second full-width slab under the Stops
             rail and showed the result before the controls that shape it. The
             fields span the band's two tracks; the tile follows them, a small
             tile beside the Direction row it illustrates (the row sets its
             height). From sm the layout is unchanged: the tile spans both rows
             of the right track. -->
        <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-5">
            <div class="col-span-2 sm:col-span-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
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
                        v-bind="popups.bind('type')"
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

                <!-- A2-VA-L1-3: the space + hue pair is the app's one
                     InterpolationFields (shared with Mix): one label
                     vocabulary, and the library-sampled specimens drawn with
                     this gradient's own stops. -->
                <InterpolationFields
                    v-model:space="interpolationSpace"
                    v-model:hue-method="hueMethod"
                    :operand-colors="operandColors"
                />
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
                class="gradient-render-tile order-last sm:order-none col-start-2 w-12 min-h-10 sm:w-24 sm:row-span-2 rounded-card border border-card-edge"
                :style="{ '--tile-render': coalescedCSS }"
            />

            <!-- X.W12.u2 (UIA-V-147): a radial render takes no angle, so the
                 control leaves; for conic the angle is the sweep's start ("From"). -->
            <div v-if="type !== 'radial'" class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                    <!-- X-DS pass 1 (V1C-04): an inline field label speaks glass's plain label voice.
                         X-DS pass 2 (V2C-02 / V2C-06): this is the app's ONE scalar row (name
                         left, value right, track below); the readout sits at plate ink and the
                         range takes the one scalar range ink (utils.css). -->
                    <Label>{{ type === "conic" ? "From" : "Direction" }}</Label>
                    <span class="text-mono-small plate-ink tabular-nums"
                        >{{ direction }}&deg;</span
                    >
                </div>
                <!-- X-DS pass 5 (V5C-09): the scalar rail rung (utils.css). -->
                <Slider
                    :aria-label="type === 'conic' ? 'Conic start angle' : 'Gradient direction'"
                    size="sm"
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
            <h3 class="font-display text-subheading">Easing</h3>
            <GradientEasingEditor
                :stops="stops"
                :model-state="modelState"
                @update-easing="setStopEasing"
            />
        </template>

        <!-- ── CSS ── -->
        <hr class="border-border" />
        <div class="flex items-center justify-between">
            <h3 class="font-display text-subheading">CSS</h3>
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
}
</style>
