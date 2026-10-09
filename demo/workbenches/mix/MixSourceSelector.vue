<script setup lang="ts">
import { inject, computed, watch, ref, TransitionGroup } from "vue";
import { Plus, X, ChevronDown } from "@lucide/vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@mkbabb/glass-ui/collapsible";
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import { Button } from "@mkbabb/glass-ui/button";
import { PaletteSpecimen } from "../../palettes/browser/card";
import SwatchButton from "../../shared/ui/SwatchButton.vue";
import EmptyState from "../../shared/ui/EmptyState.vue";
import type { Palette } from "../../palettes/types";
import type { SelectedColor } from "./composables/useMixingState";
import { formatCssCaption } from "../../color-session/format-color";

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

// Source guards: remove down to empty, add stops at a sensible upper bound.
// X.W12U.s3 · UIA-V-597: the lone chip is removable too — an empty selection
// is a state the pane already speaks (the Selected well's empty face), and
// `canMix` alone gates the Mix verb.
const MIN_COLORS = 0;
const MAX_COLORS = 12;
const canRemoveColor = computed(() => selectedColors.length > MIN_COLORS);
const canAddColor = computed(() => selectedColors.length < MAX_COLORS);

// X.W12U.s3 · UIA-V-355: the strip swaps whole source panels, so it is a
// tablist (glass `semantics="tabs"`) whose tabs control the branch tabpanels.
const tabOptions = [
    { label: "Colors", value: "colors", controls: "mix-source-colors" },
    { label: "Palettes", value: "palettes", controls: "mix-source-palettes" },
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

/** The row's press: the whole palette, so the mix turns to Palettes. */
function onPalettePress(palette: Palette) {
    if (mode !== "palettes") emit("update:mode", "palettes");
    togglePalette(palette);
}

/** A disclosed swatch: one colour, so the mix turns to Colors. */
function onSwatchAdd(css: string, source: string) {
    if (mode !== "colors") emit("update:mode", "colors");
    emit("addColor", css, source);
}

function addCurrentColor() {
    if (cssColorOpaque) {
        emit("addColor", cssColorOpaque, "picker");
    }
}


// --- Identity keys for TransitionGroup ---
// X.W7.f (fold N-5 · MSS-3 ≡ C-9 ≡ SH-7 — the two-site cure's second site;
// the first is `useSwatchActions`, X.W7.c): a chip's key is its IDENTITY,
// never its index. The retired colour-plus-index key map re-minted every
// survivor's key on any non-tail removal (each index after the cut shifts),
// so Vue replaced chips that had not changed and the swatch-row move was
// unreachable by construction. `SelectedColor { css, source }` carries no id,
// so each new list is matched against the previous one BY VALUE, in order (a
// repeated selection pairs with its earliest unclaimed predecessor): a
// survivor keeps its key wherever it lands; only a new selection mints one.
let nextSwatchKey = 0;
let previousSwatches: { identity: string; key: number }[] = [];
const swatchKeys = computed(() => {
    const unclaimed = new Map<string, number[]>();
    for (const { identity, key } of previousSwatches) {
        const keys = unclaimed.get(identity);
        if (keys) keys.push(key);
        else unclaimed.set(identity, [key]);
    }
    const next = selectedColors.map((sc) => {
        const identity = `${sc.css}\u0000${sc.source}`;
        return { identity, key: unclaimed.get(identity)?.shift() ?? nextSwatchKey++ };
    });
    previousSwatches = next;
    return next.map((swatch) => swatch.key);
});
</script>

<template>
    <div class="flex flex-col gap-3" :data-mix-direction="modeDirection">
        <!-- Bouncy segmented control. X-DS pass 4 (V4C-08): start-aligned on
             the content edge, the edge the title, the Selected well and the
             labels hang from; centred, it floated between header and well. -->
        <div class="flex items-center pb-1">
            <SegmentedTabs
                variant="pill"
                semantics="tabs"
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
            <div
                v-if="mode === 'colors'"
                id="mix-source-colors"
                key="colors"
                role="tabpanel"
                aria-label="Colors"
                class="flex flex-col gap-3"
            >
                <!-- Selected colors + add button -->
                <div class="dashed-well">
                    <!-- W5-7: the "N colors" counter died — it restated the
                         visible chips (and read "1 colors" at one). -->
                    <!-- X-DS pass 1 (V1C-04): a Mix section speaks the app's ONE section-head voice (Fraunces sentence case, as the gradient's "Stops"). -->
                    <h3 class="font-display text-subheading">Selected</h3>
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
                            :title="`${formatCssCaption(sc.css)} (${sc.source})`"
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
                            <!-- X.W12.u2 (UIA-V-40): glass 7.0.0's WatercolorDot forwards
                                 only class/style — the chip's title lives on its host div. -->
                            <!-- X-DS pass 6 (V6C-05): the chip IS its removal —
                                 a press removes it (the add slot's shape: glass's
                                 text rung, icon-only, the dot painted inside).
                                 The red corner disc is gone; the x sits inside
                                 the chip's own frame, in plate ink, on hover or
                                 focus, while the dot recedes beneath it. -->
                            <Button
                                emphasis="text"
                                icon-only
                                size="lg"
                                class="mix-chip relative shrink-0 cursor-pointer active:scale-95 transition-transform"
                                :aria-label="`Remove ${formatCssCaption(sc.css)} from the mix`"
                                :disabled="!canRemoveColor"
                                @click="emit('removeColor', i)"
                            >
                                <WatercolorDot
                                    :color="sc.css"
                                    class="mix-chip__dot w-full h-full"
                                />
                                <X class="mix-chip__x absolute w-4 h-4 pointer-events-none" aria-hidden="true" />
                            </Button>
                        </div>

                        <!-- Add current color swatch — the shipped WatercolorDot
                             ghost (R.W4 Lane A / A3, U18): the seeded dashed
                             silhouette the next selection will fill.
                             X.W12.u2 (UIA-V-40/43): glass 7.0.0's WatercolorDot is a
                             visual primitive (inheritAttrs:false, no `tag`, no slot),
                             so the command lives on glass's Button (text emphasis,
                             icon-only) and the dot paints inside it — the u1 add-slot
                             shape (bed4ce3a/24caf8fd). -->
                        <Button
                            key="__add__"
                            emphasis="text"
                            icon-only
                            size="lg"
                            class="add-slot-ghost shrink-0 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                            aria-label="Add current color to the mix"
                            :disabled="!canAddColor"
                            @click="addCurrentColor"
                        >
                            <WatercolorDot
                                :color="cssColorOpaque ?? 'var(--muted-foreground)'"
                                variant="ghost"
                                seed="mix-add-slot"
                                class="w-full h-full"
                            />
                            <Plus class="absolute w-5 h-5 text-primary/60 pointer-events-none" aria-hidden="true" />
                        </Button>
                    </TransitionGroup>
                </div>

            </div>

            <!-- Palettes mode -->
            <div
                v-else
                id="mix-source-palettes"
                key="palettes"
                role="tabpanel"
                aria-label="Palettes"
                class="flex flex-col gap-3"
            >
                <!-- A2-VA-L1-5: the palettes are chosen in the one list below
                     (its ring-lit rows ARE the selection, W5-7); this panel
                     only says what the mode wants. -->
                <p class="text-caption text-muted-foreground">
                    {{ selectedPalettes.length < 2
                        ? "Pick two or more palettes below to pour together."
                        : "Press a palette again to take it out of the mix." }}
                </p>
            </div>
        </Transition>

        <!-- A2-VA-L1-5 — THE ONE PALETTE LIST. The saved palettes were listed
             twice in this pane (the Colors tab's "From palettes" collapsible
             for single-colour adds; the Palettes tab's rows for whole-palette
             selection): two lists, two row recipes, two empty states for one
             collection. Now one list, one row, two verbs. Each row's face is
             the props-only PaletteSpecimen (A2-VA-L1-4: strip + name + the
             app's one count idiom, no hand-typed head); pressing the row
             selects the whole palette (and turns the mix to Palettes); its
             disclosure reveals the swatches, each adding one colour (and
             turning the mix to Colors). X-W6 · X.W6.j's one-interaction-owner
             law holds: the select press is the row's overlay button and the
             disclosure is its sibling — no control nests in another. This
             store is synchronous; TRUE EMPTY speaks the EmptyState alone
             (T.W6.5 · Lane S). -->
        <section class="flex flex-col gap-2" aria-label="Saved palettes">
            <h3 class="font-display text-subheading">Saved palettes</h3>
            <EmptyState
                v-if="savedPalettes.length === 0"
                message="No saved palettes yet."
                hint="Save a palette, then pour it — or its colours — in here."
            />
            <ul v-else class="grid gap-2">
                <li
                    v-for="palette in savedPalettes"
                    :key="palette.slug"
                    class="mix-palette rounded-card border border-card-edge bg-well"
                    :data-selected="isPaletteSelected(palette.slug) ? '' : undefined"
                    :data-mix-source="mode === 'palettes' && isPaletteSelected(palette.slug) ? '' : undefined"
                    :data-mix-colors="mode === 'palettes' && isPaletteSelected(palette.slug)
                        ? JSON.stringify(palette.colors.slice(0, 4).map((c) => c.css))
                        : undefined"
                >
                    <PaletteSpecimen :palette="palette" />
                    <!-- W5-a11y: a native button for keyboard reach + aria-pressed
                         for the selection state. -->
                    <button
                        type="button"
                        class="mix-palette__select rounded-card cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                        :aria-pressed="isPaletteSelected(palette.slug)"
                        :aria-label="`${isPaletteSelected(palette.slug) ? 'Deselect' : 'Select'} palette ${palette.name}`"
                        @click="onPalettePress(palette)"
                    />
                    <Collapsible class="contents">
                        <div class="mix-palette__actions pe-2">
                            <CollapsibleTrigger as-child>
                                <Button
                                    icon-only
                                    emphasis="quiet"
                                    size="sm"
                                    :aria-label="`Colors of ${palette.name}`"
                                >
                                    <ChevronDown class="mix-palette__chevron w-4 h-4 text-muted-foreground" aria-hidden="true" />
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent class="mix-palette__detail">
                            <div class="px-3 pb-3 flex flex-wrap gap-1.5">
                                <!-- W5-a11y: swatch button needs accessible name.
                                     A2-VA-L1-15: the app's one SwatchButton. -->
                                <SwatchButton
                                    v-for="(color, ci) in palette.colors"
                                    :key="ci"
                                    :color="color.css"
                                    size="sm"
                                    :seed="`palette-${palette.slug}-${ci}`"
                                    class="palette-swatch-add"
                                    :title="formatCssCaption(color.css)"
                                    :aria-label="`Add color ${formatCssCaption(color.css)} from ${palette.name}`"
                                    @click="onSwatchAdd(color.css, palette.name)"
                                />
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
/* X-DS pass 6 (V6C-05): the chip's removal cue lives inside the chip — the
   x in the certified plate ink, the dot receding beneath it. State motion
   only (hover / focus), no plate, no red. */
.mix-chip__x {
    color: var(--ink-primary, var(--foreground));
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.mix-chip__dot {
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.mix-chip:focus-visible .mix-chip__x {
    opacity: 1;
}
.mix-chip:focus-visible .mix-chip__dot {
    opacity: 0.4;
}
@media (hover: hover) {
    .mix-chip:hover:not(:disabled) .mix-chip__x {
        opacity: 1;
    }
    .mix-chip:hover:not(:disabled) .mix-chip__dot {
        opacity: 0.4;
    }
}
/* X.W5.d · gate D4 — the mode swap's travel. The direction token sets the
   `vj-morph` inline offset ON THE BRANCH ROOT ONLY and only while its
   enter-from / leave-to class is on it, so the offset never inherits into a
   nested `vj-morph` outside the swap. The leave
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

/* A2-VA-L1-5 — the one palette row hosts the props-only specimen (strip +
 * head), the select press laid over both, and the disclosure beside the head
 * (the admin palette row's grid, AdminUsersPanel). The overlay press is a grid
 * item spanning the strip and head rows; the actions cell paints above it. */
.mix-palette {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
        "strip strip"
        "head actions"
        "detail detail";
    align-items: center;
    --specimen-radius: calc(var(--radius-card) - 1px);
}
.mix-palette__select {
    grid-row: 1 / 3;
    grid-column: 1 / -1;
    align-self: stretch;
    background: transparent;
}
.mix-palette__actions {
    grid-area: actions;
    position: relative;
    z-index: 1;
}
.mix-palette__detail {
    grid-area: detail;
    min-inline-size: 0;
}
.mix-palette[data-selected] {
    box-shadow:
        0 0 0 2px var(--background),
        0 0 0 4px var(--primary);
}
/* X.W12.u2 (UIA-V-351): the rest state speaks through the name's ink only —
 * an unselected palette never dims its strip. */
.mix-palette:not([data-selected]) :deep([data-palette-name]) {
    color: var(--muted-foreground);
}
.mix-palette:not([data-selected]):hover :deep([data-palette-name]) {
    color: var(--foreground);
}
[data-state="open"] > .mix-palette__chevron {
    rotate: 180deg;
}

/* R.W4 Lane A / A3 — the add-slot ghost hosts a centred Plus glyph.
 * X.W12.u2: the host is glass's Button; the dot fills it by w/h (its own inline
 * style pins position:relative) and the Plus is the absolutely placed child. */
.add-slot-ghost {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style>
