<script setup lang="ts">
import { computed, ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Slider } from "../../ui/slider";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { RefreshCw, Save, Copy } from "@lucide/vue";
import { writeClipboard } from "@mkbabb/glass-ui";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { PaletteColorStrip } from "../../palettes/browser/card";
// T.W6 · W6-4→N (T-17, the intra-wave single-writer clause): Lane D authored
// the chip module + spec; the GenerateControls consume routes through Lane
// N's queue — recorded in both lane logs.
import { PreviewStrip } from "../../color-session/color-chips";
import type { PaletteColor } from "../../palettes/types";
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

/** The specimen strip's PaletteColor shape (css + position). */
const stripColors = computed<PaletteColor[]>(() =>
    palette.value.map((css, i) => ({ css, position: i })),
);

/** The bench-note seed — fixed-width hex, a specimen label's provenance. */
const seedHex = computed(() => seed.value.toString(16).padStart(8, "0"));

// S.W5-6 · F8: the count slider carries the generated ramp itself — the
// extract k-slider pattern (the instrument shows its own state), replacing
// the dead grey spectrum capsule.
const countSliderGradient = computed(() => {
    const colors = palette.value;
    if (colors.length === 0) return "var(--muted)";
    const stops = colors.map((css, i) => {
        const pct = colors.length === 1 ? 50 : (i / (colors.length - 1)) * 100;
        return `${css} ${pct.toFixed(0)}%`;
    });
    return `linear-gradient(to right, ${stops.join(", ")})`;
});

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

/** Per-swatch copy — the specimen face's one direct verb. */
async function copyColor(css: string) {
    await writeClipboard(css);
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
            class="rounded-card border border-card-edge bg-well shadow-cartoon-sm min-w-0"
        >
            <!-- The specimen face — full-bleed strip, corners its own. -->
            <PaletteColorStrip :colors="stripColors" class="rounded-t-card" />

            <!-- Plate chrome: name — count — regenerate — actions. The name
                 is the plate title (editable in place — the card family's
                 dashed-underline affordance), not a form field. The row
                 WRAPS gracefully: name+count lead, the verb cluster rides
                 `ml-auto` right — at 390 the verbs settle onto their own
                 right-aligned line, never a clipped title. -->
            <div class="px-3 py-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5 min-w-0">
                <input
                    v-model="paletteName"
                    type="text"
                    aria-label="Palette name"
                    class="flex-1 basis-[10rem] min-w-0 bg-transparent font-display font-medium text-subheading cursor-text rounded-sm hover:underline decoration-dashed underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                <Badge variant="secondary" class="text-mono-small shrink-0">
                    {{ count }}
                </Badge>
                <!-- The verb cluster wraps as ONE unit, right-seated. The
                     one verb rides the deliberate-primary register (L6
                     rider — root vocabulary, no costume), AS plate chrome. -->
                <div class="ml-auto flex items-center gap-2 shrink-0">
                    <Button
                        variant="primary-audacious"
                        class="h-9 gap-2 font-medium font-display shrink-0"
                        @click="regenerate()"
                    >
                        <RefreshCw class="w-4 h-4" />
                        Regenerate
                    </Button>
                    <Button
                        icon-only
                        variant="ghost"
                        size="sm"
                        aria-label="Save palette"
                        class="shrink-0"
                        @click="save"
                    >
                        <Save class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </Button>
                    <Button
                        icon-only
                        variant="ghost"
                        size="sm"
                        aria-label="Copy all colors"
                        class="shrink-0"
                        @click="copyColors"
                    >
                        <Copy class="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </Button>
                </div>
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
                <WatercolorDot
                    v-for="(css, i) in palette"
                    :key="i"
                    :color="css"
                    tag="button"
                    :seed="`gen-${css}-${i}`"
                    class="generate-swatch w-9 h-9 sm:w-10 sm:h-10 shrink-0 cursor-pointer active:scale-95 transition-transform focus-visible:outline-none"
                    :aria-label="`Copy ${css}`"
                    @click="copyColor(css)"
                />
            </div>

            <!-- The bench note: seed as provenance, select-all kept. -->
            <p class="px-3 pb-2.5 pt-1 text-mono-small text-muted-foreground tabular-nums select-all">
                seed: {{ seedHex }}
            </p>
        </section>

        <!-- Marginalia: preset & harmony. W5-7 — the permanent subtitles died;
             the dropdown's own #description rows tell the story on demand. -->
        <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
                <span class="section-label">Preset</span>
                <Select :model-value="preset" @update:model-value="onPresetChange">
                    <SelectTrigger aria-label="Generation preset" class="h-9">
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
            </div>

            <div class="flex flex-col gap-1">
                <span class="section-label">Harmony</span>
                <Select :model-value="harmony" @update:model-value="onHarmonyChange">
                    <SelectTrigger aria-label="Color harmony" class="h-9">
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
            </div>
        </div>

        <!-- Count — the extract k-slider pattern verbatim: the ramp IS the
             track (F8; S-2/S-16 family cure for the dead grey capsule). -->
        <div class="flex items-center gap-2 w-full min-w-0">
            <label
                class="text-mono-small font-bold text-muted-foreground whitespace-nowrap tabular-nums w-5 text-right"
            >
                {{ count }}
            </label>
            <div class="relative flex-1 h-6 flex items-center">
                <div
                    class="absolute inset-0 rounded-full overflow-hidden h-6"
                    :style="{ background: countSliderGradient }"
                />
                <Slider
                    aria-label="Color count"
                    variant="spectrum"
                    :model-value="[count]"
                    :min="1"
                    :max="12"
                    :step="1"
                    class="relative w-full"
                    :style="{ '--slider-track-bg': 'transparent' }"
                    @update:model-value="(v: number[] | undefined) => { if (v?.[0] !== undefined) count = v[0]; }"
                />
            </div>
        </div>
    </div>
</template>
