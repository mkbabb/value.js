<script setup lang="ts">
import { inject, computed, TransitionGroup } from "vue";
import { Plus, X, ChevronDown } from "@lucide/vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@mkbabb/glass-ui/collapsible";
import { LIBRARY_PORT_KEY } from "../../palettes";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import { Button } from "@mkbabb/glass-ui/button";
import PaletteSpecimen from "../../shared/ui/PaletteSpecimen.vue";
import SwatchButton from "../../shared/ui/SwatchButton.vue";
import EmptyState from "../../shared/ui/EmptyState.vue";
import type { Palette } from "../../palettes";
import type { SelectedColor } from "./composables/useMixingState";
import { formatCssCaption } from "../../color-session/format-color";
import { useSafeAccentFn } from "../../color-session/useContrastSafeColor";
import { contrastInkFor, GRAPHICS_CONTRAST_FLOOR } from "../../color-session/ink";

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

// SS-8 B24 · SS8-0678/SS8-0684 (MSS-20 · R-MP7 · U-1): the add slot's ghost
// stroke is the ONE affordance of the empty selection, and it painted the raw
// picker colour — a non-text contrast with no floor (1.08:1 measured on the
// light plate). The stroke is now the picker colour CERTIFIED to the 3:1
// graphics floor on the resting plate the slot sits on (the house walk): the
// hue survives, the floor holds for any picker colour.
const { safeCss } = useSafeAccentFn("resting");
const addSlotInk = computed(() =>
    cssColorOpaque ? safeCss(cssColorOpaque, GRAPHICS_CONTRAST_FLOOR) : "var(--muted-foreground)",
);
// The plus sits on the colour it adds, so it takes that colour's contrast ink.
const addSlotPlusInk = computed(
    () => (cssColorOpaque && contrastInkFor(cssColorOpaque)) || "var(--foreground)",
);

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
    <div class="flex flex-col gap-3">
        <!-- Bouncy segmented control. X-DS pass 4 (V4C-08): start-aligned on
             the content edge, the edge the title, the selection row and the
             labels hang from. -->
        <div class="flex items-center pb-1">
            <SegmentedTabs
                variant="pill"
                semantics="tabs"
                :options="tabOptions"
                :model-value="mode"
                @update:model-value="onTabChange"
            />
        </div>

        <!-- The mode swap tweens the column's height: each mode's panel is a
             row presence that grows from 0fr to 1fr while it fades in, and
             the other's shrinks as it fades out, both at once. The swap used
             to be `out-in`: the leaving panel faded, left a hole, and the hole
             closed in one frame (82 px at 1440). The inactive panel is inert
             and lends no mix sources. -->
        <div class="mix-modes">
            <!-- Colors mode -->
            <div
                class="row-presence mix-mode"
                :data-present="mode === 'colors' ? '' : undefined"
                :inert="mode !== 'colors'"
            >
                <div
                    id="mix-source-colors"
                    role="tabpanel"
                    aria-label="Colors"
                    class="mix-mode__body flex flex-col gap-3"
                >
                    <!-- Selected colors + add button. The row needs no head: the
                         chips are the selection, and the add slot carries the
                         colour it adds. -->
                    <div class="flex flex-col gap-2">
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
                                :data-mix-source="mode === 'colors' ? '' : undefined"
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
                                data-accent-reader
                                aria-label="Add current color to the mix"
                                :disabled="!canAddColor"
                                @click="addCurrentColor"
                            >
                                <!-- The silhouette is the dot the picker colour will
                                     become; its ink is that colour certified to 3:1. -->
                                <WatercolorDot
                                    :color="cssColorOpaque ?? addSlotInk"
                                    :ink="addSlotInk"
                                    variant="ghost"
                                    seed="mix-add-slot"
                                    class="w-full h-full"
                                />
                                <!-- The colour the press adds, inside the slot it
                                     will fill; the plus reads in that colour's ink. -->
                                <WatercolorDot
                                    v-if="cssColorOpaque"
                                    :color="cssColorOpaque"
                                    seed="mix-add-fill"
                                    class="add-slot-fill"
                                />
                                <Plus
                                    class="absolute w-4 h-4 pointer-events-none"
                                    :style="{ color: addSlotPlusInk }"
                                    aria-hidden="true"
                                />
                            </Button>
                        </TransitionGroup>
                    </div>

                </div>
            </div>

            <!-- Palettes mode -->
            <div
                class="row-presence mix-mode"
                :data-present="mode === 'palettes' ? '' : undefined"
                :inert="mode !== 'palettes'"
            >
                <div
                    id="mix-source-palettes"
                    role="tabpanel"
                    aria-label="Palettes"
                    class="mix-mode__body flex flex-col gap-3"
                >
                    <!-- A2-VA-L1-5: the palettes are chosen in the one list below
                         (its ring-lit rows ARE the selection, W5-7). The panel
                         carries no caption: the Mix verb says what the mix still
                         needs (M-02), and a line above saying it again was a
                         second prompt. -->
                </div>
            </div>
        </div>

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
        <section class="mix-saved flex flex-col gap-2 border-t border-seam pt-3" aria-label="Saved palettes">
            <h3 class="mix-section-head font-display">Saved palettes</h3>
            <EmptyState
                v-if="savedPalettes.length === 0"
                compact
                message="No saved palettes yet."
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
/* O16 (owner [65]): the source heads, one rung under the pane title's display
 * step and one over the field labels ("Color space", "Hue method"): the body
 * size in the section-head voice. */
.mix-section-head {
    font-size: var(--type-body);
    font-weight: 500;
    line-height: var(--type-leading-heading);
}

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
/* The mode swap: each panel is a row presence (utils.css), so the column's
   height travels with the swap; the panel also slides a little toward its own
   side of the tab strip (Colors start, Palettes end). */
.mix-modes {
    display: flex;
    flex-direction: column;
}
.mix-mode__body {
    translate: -1.5rem 0;
    transition: translate var(--spring-present-duration) var(--spring-present);
}
.mix-mode + .mix-mode > .mix-mode__body {
    translate: 1.5rem 0;
}
.mix-mode[data-present] > .mix-mode__body {
    translate: 0 0;
}
@media (prefers-reduced-motion: reduce) {
    .mix-mode__body,
    .mix-mode + .mix-mode > .mix-mode__body {
        translate: none;
    }
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

/* The add slot's fill: the current colour, inside the ghost it will fill. */
.add-slot-fill {
    position: absolute;
    inset: 24%;
    pointer-events: none;
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
