<script setup lang="ts">
import { inject, computed, watch, ref, TransitionGroup } from "vue";
import { Plus, X, ChevronDown } from "@lucide/vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { PaletteCard, PaletteColorStrip } from "../../palettes/browser/card";
import EmptyState from "../../shared/ui/EmptyState.vue";
import type { Palette } from "../../palettes/types";
import type { SelectedColor } from "./composables/useMixingState";

const {
    mode,
    selectedColors,
    selectedPalettes,
    cssColorOpaque,
} = defineProps<{
    mode: "colors" | "palettes";
    selectedColors: SelectedColor[];
    selectedPalettes: Palette[];
    cssColorOpaque?: string;
}>();

const emit = defineEmits<{
    "update:mode": [mode: "colors" | "palettes"];
    addColor: [css: string, source: string];
    removeColor: [index: number];
    addPalette: [palette: Palette];
    removePalette: [slug: string];
}>();

const pm = inject(LIBRARY_PORT_KEY);
const savedPalettes = computed(() => pm?.savedPalettes.value ?? []);

// Source guards: remove needs ≥ 1 remaining, add stops at a sensible upper bound.
const MIN_COLORS = 1;
const MAX_COLORS = 12;
const canRemoveColor = computed(() => selectedColors.length > MIN_COLORS);
const canAddColor = computed(() => selectedColors.length < MAX_COLORS);

const tabOptions = [
    { label: "Colors", value: "colors" },
    { label: "Palettes", value: "palettes" },
];

// X.W5.d · gate D4 — the mode swap's direction token, read from the strip's
// OWN option order: a move to a later tab is `forward`, to an earlier one
// `back`. Updated in the pre-flush, so the token and the swap render together.
const MODE_ORDER: readonly string[] = tabOptions.map((o) => o.value);
const modeDirection = ref<"forward" | "back">("forward");
watch(
    () => mode,
    (to, from) => {
        modeDirection.value =
            MODE_ORDER.indexOf(to) >= MODE_ORDER.indexOf(from) ? "forward" : "back";
    },
);

function onTabChange(value: string | string[]) {
    // Single-select tabs always emit a string; guard the union honestly.
    const next = Array.isArray(value) ? value[0] : value;
    if (next === "colors" || next === "palettes") {
        emit("update:mode", next);
    }
}

// K-PALID: mix selection keys on `slug` — the universal palette identity
// present on every palette (local + remote), never the local-only `id`.
function isPaletteSelected(slug: string): boolean {
    return selectedPalettes.some((p) => p.slug === slug);
}

function togglePalette(palette: Palette) {
    if (isPaletteSelected(palette.slug)) {
        emit("removePalette", palette.slug);
    } else {
        emit("addPalette", palette);
    }
}

function addCurrentColor() {
    if (cssColorOpaque) {
        emit("addColor", cssColorOpaque, "picker");
    }
}

// --- Palette dropdown for "From palettes" in colors mode ---
const paletteDropdownOpen = ref(false);

// --- Stable keys for TransitionGroup ---
let swatchKeyCounter = 0;
const swatchKeyMap = new Map<string, number>();
const swatchKeys = computed(() =>
    selectedColors.map((sc, i) => {
        const mapKey = `${sc.css}::${i}`;
        if (!swatchKeyMap.has(mapKey)) {
            swatchKeyMap.set(mapKey, swatchKeyCounter++);
        }
        return swatchKeyMap.get(mapKey)!;
    }),
);
watch(
    () => selectedColors,
    () => {
        const validKeys = new Set(selectedColors.map((sc, i) => `${sc.css}::${i}`));
        for (const key of swatchKeyMap.keys()) {
            if (!validKeys.has(key)) swatchKeyMap.delete(key);
        }
    },
);
</script>

<template>
    <div class="flex flex-col gap-3" :data-mix-direction="modeDirection">
        <!-- Bouncy segmented control -->
        <div class="flex items-center justify-center pb-1">
            <SegmentedTabs
                variant="pill"
                :options="tabOptions"
                :model-value="mode"
                @update:model-value="onTabChange"
            />
        </div>

        <!-- X.W5.d · gate D4 (fold W5F-46 / MSS-17 · OM-8): the mode swap is a
             NAMED transition, never a bare `v-if` cut. `<template v-if>`
             fragments cannot host a `<Transition>`, so each branch is ONE
             root element carrying the column rhythm the fragments borrowed
             from the parent. `out-in`, as the parent's own result swap
             (MixPane `vj-morph`): the two modes never share the column.
             The direction token (`data-mix-direction` above, read from the
             tab strip's own option order) sets which way the content travels:
             toward Palettes enters from the inline end, back toward Colors
             from the inline start. The inner `TransitionGroup` (the swatch
             row) is a LIST inside a branch, not the branch swap. -->
        <Transition name="vj-morph" mode="out-in">
            <!-- Colors mode -->
            <div v-if="mode === 'colors'" key="colors" class="flex flex-col gap-3">
                <!-- Selected colors + add button -->
                <div class="dashed-well">
                    <!-- W5-7: the "N colors" counter died — it restated the
                         visible chips (and read "1 colors" at one). -->
                    <span class="text-small font-display font-semibold text-muted-foreground">Selected</span>
                    <TransitionGroup
                        name="vj-enter"
                        tag="div"
                        class="swatch-row flex items-center gap-2.5 flex-wrap"
                    >
                        <!-- data-mix-source/-color: the convergence animation lifts
                             a pigment drop from each chip's real position (W3-6). -->
                        <div
                            v-for="(sc, i) in selectedColors"
                            :key="swatchKeys[i]"
                            class="group relative"
                            data-mix-source
                            :data-mix-color="sc.css"
                        >
                            <!-- T.W6 · W6-7 (T-28's register-law sibling): the
                                 former `ring-2 ring-primary/50` here was
                                 CASCADE-DEAD — Tailwind ring utilities compose
                                 the box-shadow channel in @layer utilities and
                                 the dot's own UNLAYERED material shadow wins the
                                 cascade; probed live 2026-07-11 (computed
                                 box-shadow = the dot's 3-layer material only, no
                                 ring component). The register law: rings on
                                 WatercolorDots ride the dot's own silhouette
                                 (the P5 producer solid-ring register) or do not
                                 exist — the dead utility is excised, never
                                 re-minted geometric. -->
                            <WatercolorDot
                                :color="sc.css"
                                tag="div"
                                class="w-11 h-11 sm:w-12 sm:h-12 shrink-0"
                                :title="`${sc.css} (${sc.source})`"
                            />
                            <button
                                class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-popover active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                                :disabled="!canRemoveColor || undefined"
                                @click="emit('removeColor', i)"
                            >
                                <X class="w-2.5 h-2.5" />
                            </button>
                        </div>

                        <!-- Add current color swatch — the shipped WatercolorDot
                             ghost (R.W4 Lane A / A3, U18): the seeded dashed
                             silhouette the next selection will fill. -->
                        <WatercolorDot
                            key="__add__"
                            :color="cssColorOpaque ?? 'var(--muted-foreground)'"
                            variant="ghost"
                            tag="button"
                            seed="mix-add-slot"
                            class="add-slot-ghost w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer hover:scale-110 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                            aria-label="Add current color to the mix"
                            :disabled="!canAddColor || undefined"
                            @click="addCurrentColor"
                        >
                            <Plus class="w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
                        </WatercolorDot>
                    </TransitionGroup>
                </div>

                <!-- From palettes — collapsible dropdown of PaletteCards -->
                <Collapsible v-if="savedPalettes.length > 0" v-model:open="paletteDropdownOpen">
                    <CollapsibleTrigger class="flex items-center gap-2 w-full cursor-pointer group py-1">
                        <span class="section-label">From palettes</span>
                        <span class="text-micro text-muted-foreground">{{ savedPalettes.length }}</span>
                        <div class="flex-1" />
                        <!-- T.W6.5 row 8 (F-4 sweep): the /50 post-hoc alpha over
                             the muted rung dies — the token IS the de-emphasis
                             rung; attenuating it further is the guard-then-alpha
                             class ("quieter" and "illegible" must never collapse). -->
                        <ChevronDown
                            class="w-4 h-4 text-muted-foreground transition-transform group-hover:text-foreground"
                            :class="paletteDropdownOpen && 'rotate-180'"
                        />
                    </CollapsibleTrigger>
                    <CollapsibleContent class="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                        <div class="flex flex-col gap-2 pt-2">
                            <div
                                v-for="palette in savedPalettes"
                                :key="palette.slug"
                                class="rounded-card border border-border/30 overflow-hidden"
                            >
                                <!-- Compact palette header with color strip + name -->
                                <PaletteColorStrip :colors="palette.colors" />
                                <div class="px-3 py-2 flex items-center justify-between gap-2">
                                    <span class="text-small font-display font-semibold truncate">{{ palette.name }}</span>
                                    <span class="fira-code text-micro text-muted-foreground shrink-0">{{ palette.colors.length }}</span>
                                </div>
                                <!-- Clickable swatches -->
                                <div class="px-3 pb-3 flex flex-wrap gap-1.5">
                                    <!-- W5-a11y: swatch button needs accessible name -->
                                    <WatercolorDot
                                        v-for="(color, ci) in palette.colors"
                                        :key="ci"
                                        :color="color.css"
                                        tag="button"
                                        class="w-8 h-8 shrink-0 cursor-pointer"
                                        :title="color.css"
                                        :aria-label="`Add color ${color.css} from ${palette.name}`"
                                        :seed="`palette-${palette.slug}-${ci}`"
                                        @click="emit('addColor', color.css, palette.name)"
                                    />
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <!-- Palettes mode -->
            <div v-else key="palettes" class="flex flex-col gap-3">
                <!-- T.W6.5 · Lane S (R12 — the owner overrule of the D9
                     as-filler deployment; MANDATE §0.6 t33-audit-12
                     "superfluous shadow palettes everywhere"): TRUE EMPTY
                     speaks the EmptyState invitation ALONE — the watercolor
                     dot trio + dashes (its default register, N-3 re-aimed),
                     never ghost cards before the caption. This store is
                     synchronous — no loading species exists here, and none
                     is announced (F3's semantics survive, honest). -->
                <EmptyState
                    v-if="savedPalettes.length === 0"
                    eyebrow="· nothing to mix ·"
                    message="No saved palettes yet."
                    hint="Save two or more palettes, then pour them together here."
                />
                <!-- W5-a11y: native <button> for keyboard reach + aria-pressed for selection state -->
                <button
                    v-for="palette in savedPalettes"
                    :key="palette.slug"
                    type="button"
                    :aria-pressed="isPaletteSelected(palette.slug)"
                    :aria-label="`${isPaletteSelected(palette.slug) ? 'Deselect' : 'Select'} palette ${palette.name}`"
                    :data-mix-source="isPaletteSelected(palette.slug) ? '' : undefined"
                    :data-mix-colors="isPaletteSelected(palette.slug)
                        ? JSON.stringify(palette.colors.slice(0, 4).map((c) => c.css))
                        : undefined"
                    :class="[
                        'cursor-pointer transition-all rounded-card w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                        isPaletteSelected(palette.slug)
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                            : 'opacity-75 hover:opacity-100',
                    ]"
                    @click="togglePalette(palette)"
                >
                    <PaletteCard
                        :palette="palette"
                        :css-color="''"
                    />
                </button>
                <!-- W5-7: the "N palettes selected" line died — the ring-lit
                     cards ARE the selection state. -->
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* X.W5.d · gate D4 — the mode swap's travel. The direction token sets the
   `vj-morph` inline offset ON THE BRANCH ROOT ONLY and only while its
   enter-from / leave-to class is on it, so the offset never inherits into a
   nested `vj-morph` (PaletteCard's rename unfurl) outside the swap. The leave
   mirrors the offset (the family's `--vj-morph-exit-x` default), so the
   outgoing mode leaves toward the side the incoming one did not come from.
   Motion only: the global reduced-motion guard (animations.css) zeroes it. */
[data-mix-direction="forward"] > .vj-morph-enter-from,
[data-mix-direction="forward"] > .vj-morph-leave-to {
    --vj-morph-x: 1.5rem;
    --vj-morph-y: 0px;
}
[data-mix-direction="back"] > .vj-morph-enter-from,
[data-mix-direction="back"] > .vj-morph-leave-to {
    --vj-morph-x: -1.5rem;
    --vj-morph-y: 0px;
}

/* R.W4 Lane A / A3 — the add-slot ghost hosts a centred Plus glyph. */
.add-slot-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
