<script setup lang="ts">
// AuroraPane — the atmosphere tuning pane (REBUILT at N.W5.B).
//
// The W0 "under rework" stub is gone. This pane is now a real tuning surface
// over glass-ui's `AuroraAtoms` door — the ≤7-knob consumer-facing surface
// (`colorEnergy`/`noise`/`zones`/`harmony`/`medium`/`motion`). App.vue owns the
// reactive atoms (provided via `AURORA_ATOMS_KEY`), seeds `.seed` from the live
// picker colour, and derives the full `AuroraConfig` via `resolveAtoms`. So the
// `seed` is NOT a knob here (it is the picker's colour); this pane tunes the
// SHAPE of the atmosphere while the colour answers the picker.
//
// Numeric atoms (colour energy, noise, zone count) ride ConfigSliderPane's
// dot-path sliders. The enum atoms (harmony, arrangement, medium, motion) are
// Select rows in the default slot — ConfigSliderPane renders that slot above
// its slider sections (it exists for exactly this "extra controls" case).

import { inject } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import type { AcceptableValue } from "reka-ui";
import type {
    AuroraHarmony,
    AuroraMedium,
    AuroraMotionAtom,
    AuroraZoneArrangement,
} from "@mkbabb/glass-ui/aurora";
import { AURORA_ATOMS_KEY, DEFAULT_AURORA_ATOMS } from "@composables/color/aurora-atoms";
import ConfigSliderPane from "./ConfigSliderPane.vue";
import type { SliderSection } from "./ConfigSliderPane.vue";

const atoms = inject(AURORA_ATOMS_KEY)!;

// --- Enum vocabularies (each option = a real glass-ui atom value) ---
const HARMONIES: AuroraHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const ARRANGEMENTS: AuroraZoneArrangement[] = ["scattered", "composed", "centred"];
const MEDIA: AuroraMedium[] = [
    "smooth",
    "pastel",
    "watercolor",
    "oil",
    "crayon",
    "vangogh",
    "oil-pastel",
];
const MOTIONS: AuroraMotionAtom[] = ["still", "breathing", "drifting"];

function label(s: string): string {
    return s
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

// --- Enum read/write (the picker seed is never touched here) ---
const harmony = () => atoms.harmony ?? "analogous";
const arrangement = () => atoms.zones?.arrangement ?? "composed";
const medium = () => atoms.medium?.kind ?? "smooth";
const motion = () => atoms.motion ?? "breathing";

function setHarmony(v: AcceptableValue) {
    atoms.harmony = String(v) as AuroraHarmony;
}
function setArrangement(v: AcceptableValue) {
    const count = atoms.zones?.count ?? 4;
    atoms.zones = { count, arrangement: String(v) as AuroraZoneArrangement };
}
function setMedium(v: AcceptableValue) {
    // `smooth` carries no texture amount; textured mediums let glass-ui apply
    // its own default amount (the atom shape forbids an `amount` on `smooth`,
    // and an absent `amount` on a textured kind is valid — glass-ui defaults it).
    const kind = String(v) as AuroraMedium;
    atoms.medium = kind === "smooth" ? { kind } : { kind };
}
function setMotion(v: AcceptableValue) {
    atoms.motion = String(v) as AuroraMotionAtom;
}

// --- Numeric atoms (dot-path sliders) ---
const SECTIONS: SliderSection[] = [
    {
        title: "Field",
        defs: [
            { key: "colorEnergy", label: "Colour Energy", min: 0, max: 1, step: 0.01 },
            { key: "noise", label: "Noise", min: 0, max: 1, step: 0.01 },
            { key: "zones.count", label: "Zones", min: 1, max: 6, step: 1 },
        ],
    },
];
</script>

<template>
    <ConfigSliderPane
        :config="(atoms as unknown) as Record<string, unknown>"
        :sections="SECTIONS"
        :defaults="(DEFAULT_AURORA_ATOMS as unknown) as Record<string, unknown>"
        title="Atmosphere"
        description="The background aurora derives its palette from the picked colour. Tune the field's shape — colour energy, zones, noise, medium, and motion."
    >
        <!-- Enum atoms — Select rows above the numeric sliders -->
        <div class="flex flex-col gap-3 px-4 sm:px-6 pt-2 pb-1">
            <div class="aurora-row">
                <span class="aurora-row-label">Harmony</span>
                <Select :model-value="harmony()" @update:model-value="setHarmony">
                    <SelectTrigger aria-label="Palette harmony" class="h-9 text-caption min-w-menu">
                        <SelectValue>{{ label(harmony()) }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent class="max-h-[16rem] min-w-menu">
                        <SelectItem v-for="h in HARMONIES" :key="h" :value="h" class="text-caption">
                            {{ label(h) }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="aurora-row">
                <span class="aurora-row-label">Arrangement</span>
                <Select :model-value="arrangement()" @update:model-value="setArrangement">
                    <SelectTrigger aria-label="Zone arrangement" class="h-9 text-caption min-w-menu">
                        <SelectValue>{{ label(arrangement()) }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent class="max-h-[16rem] min-w-menu">
                        <SelectItem v-for="a in ARRANGEMENTS" :key="a" :value="a" class="text-caption">
                            {{ label(a) }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="aurora-row">
                <span class="aurora-row-label">Medium</span>
                <Select :model-value="medium()" @update:model-value="setMedium">
                    <SelectTrigger aria-label="Painterly medium" class="h-9 text-caption min-w-menu">
                        <SelectValue>{{ label(medium()) }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent class="max-h-[16rem] min-w-menu">
                        <SelectItem v-for="m in MEDIA" :key="m" :value="m" class="text-caption">
                            {{ label(m) }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="aurora-row">
                <span class="aurora-row-label">Motion</span>
                <Select :model-value="motion()" @update:model-value="setMotion">
                    <SelectTrigger aria-label="Motion register" class="h-9 text-caption min-w-menu">
                        <SelectValue>{{ label(motion()) }}</SelectValue>
                    </SelectTrigger>
                    <SelectContent class="max-h-[16rem] min-w-menu">
                        <SelectItem v-for="m in MOTIONS" :key="m" :value="m" class="text-caption">
                            {{ label(m) }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </ConfigSliderPane>
</template>

<style scoped>
@reference "../../../styles/style.css";

.aurora-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.aurora-row-label {
    font-family: var(--font-mono);
    font-size: var(--type-small);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps);
    color: var(--muted-foreground);
}
</style>
