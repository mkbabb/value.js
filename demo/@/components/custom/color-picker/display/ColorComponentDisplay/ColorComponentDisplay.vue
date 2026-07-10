<template>
    <!-- R.W3 Lane D / D1 — the readout rhythm (treatment TYPOGRAPHY-1) under
         the card-lock law (demo/DESIGN.md §Type, A6/U31): the numbers are the
         picker's TYPOGRAPHIC hero on the display ramp — Fraunces with declared
         tabular figures — and a slider drag from min to max changes NO
         containing card rect: every cell reserves its worst-case `ch` width
         from the static readoutReservation table, cells are atomic (nowrap),
         and the block locks the SPACE'S own worst-case line count (S.W4-2 —
         the same table's static derivation; 1 for every space in today's
         catalog — never a blanket 2). -->
    <CardTitle
        class="readout flex h-fit w-full m-0 p-0 gap-x-3 flex-wrap items-baseline font-display focus-visible:outline-none"
        :style="{ '--readout-lines': lineCount }"
    >
        <template
            v-for="([component], ix) in colorComponents"
            :key="component"
        >
            <span
                class="readout-cell"
                :style="{ minWidth: `${readoutCh(space, component)}ch` }"
            >
                <span
                    contenteditable="true"
                    role="textbox"
                    :aria-label="`${component} component value`"
                    :class="[
                        'readout-fig',
                        formatted[component]?.monospace && 'fira-code',
                    ]"
                    @input="
                        (e) => {
                            const text = (e.target as any).innerText.trim();
                            emit('input', text, component);
                        }
                    "
                ><span class="fig-int">{{ figParts(component).int }}</span><span
                        v-if="figParts(component).frac"
                        class="fig-frac"
                    >{{ figParts(component).frac }}</span></span><span
                    v-if="formatted[component]?.unit"
                    class="fig-unit"
                >{{ formatted[component].unit }}</span><span
                    v-if="ix !== colorComponents.length - 1"
                    class="fig-comma"
                    aria-hidden="true"
                >,</span>
            </span>
        </template>
    </CardTitle>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CardTitle } from "@components/ui/card";
import { readoutCh, readoutLineCount } from "./readoutReservation";

export interface ComponentFormat {
    value: number | string;
    unit?: string;
    monospace?: boolean;
}

const { formatted, colorComponents, space } = defineProps<{
    colorComponents: [string, any][];
    formatted: Record<string, ComponentFormat>;
    /** The active display space — keys the `ch`-reservation table. */
    space: string;
}>();

/** The per-space line lock (S.W4-2) — the reservation table's own static
 *  derivation, bound as `--readout-lines` for the min-height calc. */
const lineCount = computed(() =>
    readoutLineCount(
        space,
        colorComponents.map(([component]) => component),
    ),
);

const emit = defineEmits<{
    update: [value: number, component: string];
    input: [text: string, component: string];
}>();

/**
 * The int/frac split of a component's rendering. Numbers ink a FIXED
 * 1-decimal instrument format (never a stripped `.0` — a meter holds its
 * least count), so the demoted fraction is a constant rhythm, not a
 * flicker. Strings (hex) pass through whole.
 */
function figParts(component: string): { int: string; frac: string } {
    const fmt = formatted[component];
    if (!fmt) return { int: "", frac: "" };
    if (typeof fmt.value === "string") return { int: fmt.value, frac: "" };
    const s = fmt.value.toFixed(1).replace(/^-(0\.0)$/, "$1");
    const dot = s.indexOf(".");
    return { int: s.slice(0, dot), frac: s.slice(dot) };
}
</script>

<style scoped>
/* The hero-number register: the display ramp, Fraunces voice, DECLARED
 * tabular figures (Fraunces is not tabular by default — card-lock law
 * mechanism 1), and the per-space line lock so wrap count is a constant of
 * the space, never of the value.
 *
 * The `cqi` display rung (S.W4-2 / S-19, the P1-1 third lever): the hero
 * rides the pane-slot container, not the viewport — font ∝ container width
 * means the line's capacity IN CH is a near-constant of the composition
 * (~20ch; full derivation in readoutReservation.ts), so one-line Lab is a
 * structural guarantee across the whole band, not a lucky viewport. Capped
 * by the --type-display-2 token (wide panes), floored at the display-1
 * rung's own 1.618rem floor so the voice never drops below the display
 * register. This narrows the "display rungs are viewport-fluid" exception
 * (style.css §pane-wrapper) for the one display surface that must MEASURE:
 * an instrument readout broken-lined mid-figure is a hierarchy defect. */
.readout {
    font-size: min(var(--type-display-2), max(7.2cqi, 1.618rem));
    line-height: 1.12;
    font-variant-numeric: tabular-nums lining-nums;
    /* The per-space lock (S.W4-2): `--readout-lines` is the space's own
     * worst-case line count from the static reservation table — never a
     * blanket 2 (the blank second line under hex was P1-1's pathology). */
    min-height: calc(var(--readout-lines, 1) * 1.12em);
    font-weight: 400;
}

/* Atomic cell: sign flips, digit swaps, and decimals re-ink the same
 * reserved box (min-width bound inline from the static table). */
.readout-cell {
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
}

.readout-fig:focus-visible {
    /* C5 — the accent-aware house focus register on the editable cells. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-sm, 0.25rem);
}

/* TYPOGRAPHY-1 — the instrument's typographic rhythm: integer heavy,
 * fraction light + demoted, unit as a muted small-cap index. */
.fig-int {
    font-weight: 600;
}
.fig-frac {
    font-weight: 300;
    opacity: 0.55;
}
.fig-unit {
    font-variant: small-caps;
    letter-spacing: 0.04em;
    opacity: 0.5;
    font-size: 0.55em;
    font-style: italic;
    margin-left: 0.08em;
}
.fig-comma {
    opacity: 0.4;
    font-weight: 300;
}
</style>
