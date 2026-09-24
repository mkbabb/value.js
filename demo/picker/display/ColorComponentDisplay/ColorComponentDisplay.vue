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
        :style="{
            '--readout-lines': lineCount,
            '--readout-measure': READOUT_MEASURE_EM,
        }"
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
import { CardTitle } from "../../../ui/card";
import {
    READOUT_MEASURE_EM,
    readoutDecimals,
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
/* The hero-number register: Fraunces voice, VERIFIED tabular figures (the
 * minted tnum face — O-10c asserts the rendered digit-advance, never the
 * declaration), and the line lock so wrap count is a constant of the space,
 * never of the value.
 *
 * X.W12.d (OA-24 · owner frame 4 — "maybe the dropdown title should be
 * larger? … the color number components larger with less padding? why so
 * much blank space") — THE CARD'S HIERARCHY:
 *   · the TITLE is the card's display step: `--type-display-2` on the space
 *     trigger, the largest type in the card at every viewport;
 *   · the NUMERALS take the space: the rung is fitted to THE MEASURE — the
 *     catalog's widest worst-case tuple (readoutReservation.ts
 *     `READOUT_MEASURE_EM`, lab `100.0, -125.0, -125.0`) — so the widest
 *     space fills the header's line, and it is capped one ladder step below
 *     the title (`--type-display-1`) so the hierarchy never inverts. The
 *     retired ×φ display-4 rung (11.65cqi) sat ABOVE the title and forced
 *     lab/oklab/oklch onto a reserved second line, which at every one-line
 *     value painted as the 61px dead band of frame 4 (g1 RESIDUE 61.22px);
 *   · no empty interval: every shown space is ONE line by construction, so
 *     `min-height` (the lock) is the painted line and nothing is reserved
 *     that does not ink — the title row, the 7px header rhythm and the
 *     numerals stack with no band between them. */
.readout {
    font-size: min(
        var(--type-display-1),
        calc(100cqi / var(--readout-measure))
    );
    line-height: 1.12;
    /* THE CONTIGUOUS GAP (T.W4-2): 0.75ch — the SAME quantity the packing
     * arithmetic reserves (READOUT_GAP_CH), so paint and derivation can
     * never disagree. */
    column-gap: 0.75ch;
    font-variant-numeric: tabular-nums lining-nums;
    /* The per-space lock (S.W4-2): `--readout-lines` is the space's derived
     * line count — 1 for every shown space since the measure law. */
    min-height: calc(var(--readout-lines, 1) * 1.12em);
    align-content: flex-end;
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
 * fraction light + demoted, unit as a muted small-cap index.
 *
 * T.W4-4 — THE GUARD-THEN-ALPHA CURE (the W3-5 D6 contract handed here,
 * h-dag D-4): the demotions were post-hoc opacity multiplies over an
 * uncontrolled live-tinted ground — un-certifiable by construction
 * (t-a11y F-4). De-emphasis now rides the CERTIFIED de-emphasis rung: the
 * boot writer's `--ink-muted` (floor-clamped against the resting plate —
 * exactly the tier these figures sit on). Weight demotion stays (weight is
 * rhythm, not contrast); alpha dies. O-18's readout-frac row asserts. */
.fig-int {
    font-weight: 600;
}
.fig-frac {
    font-weight: 300;
    color: var(--ink-muted, var(--muted-foreground));
}
.fig-unit {
    font-variant: small-caps;
    letter-spacing: 0.04em;
    color: var(--ink-muted, var(--muted-foreground));
    font-size: 0.55em;
    font-style: italic;
    margin-left: 0.08em;
}
.fig-comma {
    color: var(--ink-muted, var(--muted-foreground));
    font-weight: 300;
}
</style>
