<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@mkbabb/glass-ui/select";
import { Slider } from "@mkbabb/glass-ui/slider";
import { Label } from "@mkbabb/glass-ui/label";
import { Button } from "@mkbabb/glass-ui/button";
import { RefreshCw, Save, Copy } from "@lucide/vue";
import { useClipboard, writeClipboard } from "@mkbabb/glass-ui";
// X-W4 · X.W4.b (CC-047) — the producer's published field composition
// (`@mkbabb/glass-ui/labeled-field`, 7.0.0): `controlLabelable: false` for the
// non-labelable combobox root, and the slot's `labelledBy` names the trigger, so
// the marginalia captions below stop floating unassociated and the duplicated
// literal `aria-label` retires.
import { LabeledField } from "@mkbabb/glass-ui/labeled-field";
import SwatchButton from "../../shared/ui/SwatchButton.vue";
import PaletteNameInput from "../../shared/ui/PaletteNameInput.vue";
// T.W6 · W6-4→N (T-17, the intra-wave single-writer clause): Lane D authored
// the chip module + spec; the GenerateControls consume routes through Lane
// N's queue — recorded in both lane logs.
import { PreviewStrip } from "../../shared/ui/color-chips";
import { formatCssCaption } from "../../color-session/format-color";
import { useColorGeneration } from "./composables/useColorGeneration";
// U.W-DEMO · U-F47: the pure generation core relocated DOWN to the shared color
// layer; the feature consumes it UP-from-shared (feature → shared, correct).
import {
    generatePalette,
    PRESET_NAMES,
    HARMONY_NAMES,
    GENERATION_PRESETS,
    HARMONY_DEFS,
} from "../../color-session/generate-color";
import type { PresetName, HarmonyName } from "../../color-session/generate-color";
import type { AcceptableValue } from "reka-ui";
import { usePanePopups } from "../../shell/usePanePopups";

// A2-VA-L2-11 — this pane's popups close when the pane deactivates.
const popups = usePanePopups();

const {
    preset,
    harmony,
    count,
    seed,
    palette,
    regenerate,
} = useColorGeneration();

// T.W6 · W6-5 (T-16/F2): the save carries the plate's own name — the bench
// title is provenance FOR the save, never display-only chrome. (The pane's
// `createPalette` name-wire is its owner's one-liner; recorded in the lane
// record — this emit is already truthful.)
const emit = defineEmits<{
    save: [colors: string[], name: string];
}>();

const paletteName = ref("Generated Palette");

/** The bench-note seed — fixed-width hex, a specimen label's provenance. */
const seedHex = computed(() => seed.value.toString(16).padStart(8, "0"));

function onPresetChange(value: AcceptableValue) {
    preset.value = value as PresetName;
}

function onHarmonyChange(value: AcceptableValue) {
    harmony.value = value as HarmonyName;
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

// T-17 · the F5 TRUTH LAW (seed-exact strips): each option row previews the
// EXACT palette selecting it yields — `generatePalette` is pure and
// mulberry32-seeded, so the strip and the future selection are the same
// bytes. Computed only while the SelectContent renders (it unmounts closed
// — the ColorSpaceSelector precedent), so zero rest cost; 10 rows × 5-12
// library generations is sub-millisecond. A preview that lies (random per
// open, or a canned swatch) is worse than none.
function presetStops(candidate: PresetName): string[] {
    return generatePalette(count.value, candidate, harmony.value, seed.value);
}

function harmonyStops(candidate: HarmonyName): string[] {
    return generatePalette(count.value, preset.value, candidate, seed.value);
}

function save() {
    emit("save", [...palette.value], paletteName.value);
}

async function copyColors() {
    await writeClipboard(palette.value.join(", "));
}

/** Per-swatch copy — the specimen face's one direct verb; the copied swatch
 *  shows a check (and its name reads "Copied …") for a beat. */
// Glass's scope-owned clipboard status (the gradient easing rows' idiom): the
// tick clears itself when the status resets — no local timer.
const { status: swatchCopyStatus, copy } = useClipboard({ resetMs: 1200 });
const lastCopied = ref<number | null>(null);
const copiedIndex = computed(() =>
    swatchCopyStatus.value === "success" ? lastCopied.value : null,
);
async function copyColor(css: string, i: number) {
    lastCopied.value = i;
    await copy(css);
}

defineExpose({ regenerate, save, copyColors });
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- T.W6 · W6-5 (T-16 / t-misc-elements F2): THE SPECIMEN PLATE owns
             its chrome. F8's hierarchy-inversion finally lands as written —
             the verb lives ON the plate it acts on (name — count — regenerate
             — actions), the seed is the plate's bench note (provenance, like
             a specimen label), and the orphan toolbar row is DEAD. The plate
             is the rung-2 WELL species (Q4: PaletteCard → well), an
             instrument fixture — static at rest, never a clickable catalog
             card. NO card-level overflow clip (S.W5-10 / T-45 class): the
             strip clips its OWN corners. -->
        <section
            data-generate-plate
            aria-label="Generated palette"
            class="rounded-card border border-card-edge bg-well min-w-0"
        >
            <!-- X-DS pass 1 (V1C-07): the full-bleed header strip is gone — it
                 drew the same colours a third time (strip, swatch row, count
                 rail) and meant nothing the swatches do not. The title opens
                 the plate. -->
            <!-- Plate chrome: the name is the plate title, editable in place
                 through the app's one name field (A2-VA-L1-14). X-DS pass 4
                 (V4C-09) and pass 6 (V6C-12) kept the verbs on the title's row
                 and stepped the name down a rung below `sm`; pass 8 supersedes
                 both. -->
            <!-- X-DS pass 8 (V3C-03): the name has the row to itself, so the
                 plate's title is never the one element cut short (the verb
                 cluster beside it left ~190 px at 1440 and clipped the at-rest
                 default). One display voice at every width: the max-sm step to
                 `text-body` swapped the family as well as the size, and with the
                 whole row the default fits at 390 on the same rung. -->
            <div class="px-3 py-2.5 flex items-center min-w-0">
                <!-- A2-VA-L1-14: the plate title is the app's one name field
                     (shared/ui/PaletteNameInput, live mode) in the title voice. -->
                <PaletteNameInput
                    v-model="paletteName"
                    class="flex-1"
                    input-class="font-display font-medium text-subheading"
                />
            </div>

            <!-- Specimen swatches — each a direct copy verb (the catalog
                 card's popover-copy, collapsed to one honest click; the
                 dead add/edit emits die with the borrowed card). WR-6 / T-54:
                 the plain rounded-rects join the ruled WatercolorDot register
                 (the 9-consumer species) — the button stays the copy-verb
                 seat (`tag="button"`), the dot its organic face, seeded stable
                 per (color,i). T-28's outline law rides: NO geometric focus
                 ring on the organic edge (the filled-dot register — rings ride
                 the silhouette via the producer P5 register, or do not exist —
                 the MixSourceSelector precedent). -->
            <div class="px-3 pb-1 flex flex-wrap gap-1.5">
                <!-- A2-VA-L1-15: the app's one SwatchButton; its `done` check
                     is the copy verb's verdict. -->
                <SwatchButton
                    v-for="(css, i) in palette"
                    :key="i"
                    :color="css"
                    size="md"
                    :seed="`gen-${css}-${i}`"
                    :done="copiedIndex === i"
                    class="generate-swatch active:scale-95 transition-transform"
                    :aria-label="copiedIndex === i ? `Copied ${formatCssCaption(css)}` : `Copy ${formatCssCaption(css)}`"
                    :title="formatCssCaption(css)"
                    @click="copyColor(css, i)"
                />
            </div>

            <!-- The bench note: seed as provenance, select-all kept. X-DS pass 8
                 (V3C-03): the plate's verbs seat on this row, right of the seed
                 that Regenerate re-rolls — the provenance and the verb that
                 changes it share one line, and the title row stays whole. -->
            <div class="px-3 pb-2.5 pt-1 flex items-center gap-2 min-w-0">
                <p class="min-w-0 truncate text-mono-small text-muted-foreground tabular-nums select-all">
                    seed: {{ seedHex }}
                </p>
                <div class="ml-auto flex items-center gap-2 shrink-0">
                    <!-- X-DS pass 1 (V1-09): seated commands wear the quiet and
                         text rungs — no floating capsule (and no halo) on a
                         well. -->
                    <Button
                        emphasis="quiet"
                        class="h-9 gap-2 font-medium font-display text-foreground shrink-0"
                        @click="regenerate()"
                    >
                        <RefreshCw class="w-4 h-4" aria-hidden="true" />
                        <span class="max-sm:sr-only">Regenerate</span>
                    </Button>
                    <Button
                        icon-only
                        emphasis="text"
                        size="sm"
                        aria-label="Save palette"
                        class="shrink-0"
                        @click="save"
                    >
                        <Save class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </Button>
                    <Button
                        icon-only
                        emphasis="text"
                        size="sm"
                        aria-label="Copy all colors"
                        class="shrink-0"
                        @click="copyColors"
                    >
                        <Copy class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </section>

        <!-- Marginalia: preset & harmony. W5-7 — the permanent subtitles died;
             the dropdown's own #description rows tell the story on demand. -->
        <div class="grid grid-cols-2 gap-3">
            <LabeledField label="Preset" :control-labelable="false" v-slot="{ labelledBy }">
                <Select v-bind="popups.bind('preset')" :model-value="preset" @update:model-value="onPresetChange">
                    <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                        <SelectValue />
                    </SelectTrigger>
                    <!-- B.W1 width, re-verified at the T-17 chip landing (F7:
                         keep the width comments honest): 17rem seats the
                         golden-plate chip + the longest description. -->
                    <SelectContent class="min-w-[17rem]">
                        <SelectItem
                            v-for="p in PRESET_NAMES"
                            :key="p"
                            :value="p"
                        >
                            <!-- P9-R5: the NAME lane joins the dropdown family's
                                 DISPLAY voice (the ColorSpaceSelector precedent,
                                 weight-inherited 400 per T-40) — the bare-sans
                                 name-lane fork is closed; the description lane
                                 stays micro sans. -->
                            <span class="font-display">{{ capitalize(p) }}</span>
                            <!-- T-17/F5+F7: chip leading, description after —
                                 the strip is the row's own seed-exact truth. -->
                            <template #description>
                                <span class="flex items-center gap-2 min-w-0">
                                    <PreviewStrip :stops="presetStops(p)" />
                                    <span class="text-micro text-muted-foreground">{{ GENERATION_PRESETS[p].description }}</span>
                                </span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </LabeledField>

            <LabeledField label="Harmony" :control-labelable="false" v-slot="{ labelledBy }">
                <Select v-bind="popups.bind('harmony')" :model-value="harmony" @update:model-value="onHarmonyChange">
                    <SelectTrigger class="h-(--control-h-sm)" :aria-labelledby="labelledBy">
                        <SelectValue />
                    </SelectTrigger>
                    <!-- B.W1 width, re-verified at the T-17 chip landing (F7):
                         17rem seats the chip + "Base + two flanking
                         complements", the family's longest line. -->
                    <SelectContent class="min-w-[17rem]">
                        <SelectItem
                            v-for="h in HARMONY_NAMES"
                            :key="h"
                            :value="h"
                        >
                            <!-- P9-R5: the NAME lane joins the display voice. -->
                            <span class="font-display">{{ capitalize(h) }}</span>
                            <!-- T-17/F5+F7: chip leading, description after. -->
                            <template #description>
                                <span class="flex items-center gap-2 min-w-0">
                                    <PreviewStrip :stops="harmonyStops(h)" />
                                    <span class="text-micro text-muted-foreground">{{ HARMONY_DEFS[h].description }}</span>
                                </span>
                            </template>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </LabeledField>
        </div>

        <!-- Count. X-DS pass 2 (V2C-02): the app's ONE scalar row — the name
             left, the value right in mono tabular figures, the track below.
             X-DS pass 8 (V3C-05): ONE count control. The generated swatches
             painted as the track (content-as-track) set "Colors" in a second
             voice from Extract's, with a thumb that sat mid-segment rather than
             on a count. The swatches already show on the plate above, so the
             count is glass's scrubber at the `sm` rung, Extract's idle
             register. -->
        <div class="flex flex-col gap-1 w-full min-w-0">
            <div class="flex items-center justify-between gap-2">
                <Label>Colors</Label>
                <span class="text-mono-small plate-ink tabular-nums">{{ count }}</span>
            </div>
            <Slider
                aria-label="Number of colors"
                variant="scrubber"
                size="sm"
                :model-value="[count]"
                :min="1"
                :max="12"
                :step="1"
                class="w-full"
                @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) count = v[0]; }"
            />
        </div>
    </div>
</template>

<style scoped>
/* X-DS pass 8 (V3C-03): the name field sits ON the plate's rung-2 well, so it
 * wears the well (shell.css seats `--input-on-glass` at the well tone for
 * fields on glass; on a well that laid a second tone step, the heaviest fill
 * on the card). Token only — glass's field edge stays (O-87). */
[data-generate-plate] {
    --input-on-glass: transparent;
}
</style>
