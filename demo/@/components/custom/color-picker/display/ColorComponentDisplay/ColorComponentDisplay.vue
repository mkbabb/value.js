<template>
    <!-- T.W4-2 (T-7 · R4) — THE CONTIGUOUS TUPLE under the re-scoped
         card-lock law: the numbers are the picker's TYPOGRAPHIC hero on the
         display ramp — Fraunces with VERIFIED tabular figures — reading as
         true values, contiguously: x, y, z. The per-cell worst-case `ch`
         min-width is RETIRED (R4 — the reservation rendered as dead air
         between the values, the owner's t-2002-52 spread); cells are
         INTRINSIC and atomic (nowrap), and the card-lock GOAL is re-earned
         at tuple/line level: real tnum + the fixed per-space least-count
         format (readoutDecimals) ⇒ widths move only at digit-count
         boundaries; the block locks the SPACE'S own worst-case line count
         (never a blanket 2). -->
    <CardTitle
        class="readout flex h-fit w-fit max-w-full m-0 p-0 flex-wrap items-baseline font-display focus-visible:outline-none"
        :style="{ '--readout-lines': lineCount, '--readout-fit': fit }"
    >
        <template
            v-for="([component], ix) in colorComponents"
            :key="component"
        >
            <span class="readout-cell">
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
import {
    readoutDecimals,
    readoutFit,
    readoutLineCount,
} from "./readoutReservation";

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

/** The per-space line lock (T.W4-2 · Q11b) — the reservation table's own
 *  static derivation, bound as `--readout-lines` for the min-height calc. */
const lineCount = computed(() =>
    readoutLineCount(
        space,
        colorComponents.map(([component]) => component),
    ),
);

/** Q11b lever 2 — the per-space fit coefficient (≤3% shave holding the
 *  one-line lock for the ictcp-class overhang; 1 everywhere else). */
const fit = computed(() =>
    readoutFit(
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
 * per-space least-count format (Q11b lever 1 — `readoutDecimals`; never a
 * stripped `.0` and never a value-dependent precision: a meter holds its
 * least count), so the demoted fraction is a constant rhythm, not a
 * flicker. Strings (hex) pass through whole.
 */
function figParts(component: string): { int: string; frac: string } {
    const fmt = formatted[component];
    if (!fmt) return { int: "", frac: "" };
    if (typeof fmt.value === "string") return { int: fmt.value, frac: "" };
    const d = readoutDecimals(space, component);
    let s = fmt.value.toFixed(d);
    // Negative zero never inks (at any least count).
    if (Number.parseFloat(s) === 0) s = s.replace(/^-/, "");
    const dot = s.indexOf(".");
    if (dot === -1) return { int: s, frac: "" };
    return { int: s.slice(0, dot), frac: s.slice(dot) };
}
</script>

<style scoped>
/* The hero-number register: the display ramp, Fraunces voice, VERIFIED
 * tabular figures (the minted tnum face — O-10c asserts the rendered
 * digit-advance, never the declaration; the F5 declared-but-dead class is
 * dead), and the per-space line lock so wrap count is a constant of the
 * space, never of the value.
 *
 * The ×φ `cqi` display rung (T.W4-2 · Q11a — every bound exactly ×φ of the
 * S rung: display-2→display-4 · 7.2→11.65cqi · 1.618→2.618rem): the hero
 * rides the pane-slot container, not the viewport — font ∝ container width
 * means the line's capacity IN CH is a near-constant of the composition
 * (~11.7 tabular-ch; full derivation in readoutReservation.ts), so each
 * space's line lock is a structural guarantee across the whole band, not a
 * lucky viewport. `--readout-fit` is Q11b lever 2 — the derived ≤3% shave
 * that holds the ictcp-class one-line lock (1 everywhere else). This
 * narrows the "display rungs are viewport-fluid" exception (style.css
 * §pane-wrapper) for the one display surface that must MEASURE: an
 * instrument readout broken-lined mid-figure is a hierarchy defect. */
.readout {
    font-size: calc(
        min(var(--type-display-4), max(11.65cqi, 2.618rem)) *
            var(--readout-fit, 1)
    );
    line-height: 1.12;
    /* THE CONTIGUOUS GAP (T.W4-2): 0.75ch — the SAME quantity the line-lock
     * packing arithmetic reserves (READOUT_GAP_CH), so paint and derivation
     * can never disagree. Replaces the retired gap-x-3 + per-cell slack (the
     * "spread apart" dead air, R4). */
    column-gap: 0.75ch;
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
