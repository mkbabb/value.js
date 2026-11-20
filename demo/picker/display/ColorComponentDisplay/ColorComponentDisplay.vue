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
    <!-- V-D1.r4: the line holds the heading and the host's trailing mark
         side by side on one baseline, so the mark (the picker's colour badge)
         is never a word of the heading's name. -->
    <div
        class="readout-line flex max-w-full min-w-0 items-baseline font-display"
        :style="{ '--readout-measure': READOUT_MEASURE_EM }"
    >
    <CardTitle
        class="readout flex h-fit w-fit max-w-full min-w-0 m-0 p-0 flex-wrap items-baseline font-display focus-visible:outline-none"
        :style="{ '--readout-lines': lineCount }"
    >
        <template
            v-for="([component], ix) in colorComponents"
            :key="component"
        >
            <span class="readout-cell">
                <!-- One line of plain text, read on commit: Enter or leaving
                     the field commits, Escape restores the shown value. A
                     figure whose text was edited is re-rendered whole (its own
                     `epochs` entry), so an edit can never leave its own text
                     nodes behind; its siblings are never re-created, so Tab
                     walks figure to figure and on out of the readout. -->
                <span
                    :key="`${component}:${epochs[component] ?? 0}`"
                    contenteditable="plaintext-only"
                    role="textbox"
                    aria-multiline="false"
                    :aria-label="`${component} component value`"
                    :class="[
                        'readout-fig',
                        formatted[component]?.monospace && 'font-mono',
                    ]"
                    @focus="onFocus"
                    @beforeinput="onBeforeInput"
                    @keydown="(e) => onKeydown(e, component)"
                    @blur="(e) => onBlur(e, component)"
                ><span v-text-in-place class="fig-int">{{ figParts(component).int }}</span><span
                        v-if="figParts(component).frac"
                        v-text-in-place
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
    <!-- The tuple's trailing mark (the host's): the picker seats the colour
         badge here, on the readout's own baseline. -->
    <slot />
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { CardTitle } from "@mkbabb/glass-ui/card";
import { formatFixed } from "../../../color-session/channel-decimals";
import { vTextInPlace } from "../../../shared/vTextInPlace";
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
    /** The edited text of one figure, sent once, when the edit is committed. */
    commit: [text: string, component: string];
}>();

// ── Editing a figure ────────────────────────────────────────────────────────
// A figure is edited as one line of plain text and read once, on commit:
// Enter or leaving the field commits, Escape restores. A line break can never
// enter it (`plaintext-only`, and the paragraph inputs are refused), so the
// line, the card and everything under it hold still while it is edited. After
// an edit the figure re-renders from the model (its `epochs` entry): the
// committed value when the text read as one, the last valid value when it did
// not. Only the edited figure is re-created (color-40 G-4): one shared epoch
// re-created every figure on each blur, so the figure Tab had just moved to was
// destroyed under the focus and the keyboard could never pass the readout.
const epochs = reactive<Record<string, number>>({});
let shownText = "";
let settled = true;

const figureText = (el: HTMLElement) => (el.textContent ?? "").replace(/\s+/g, " ").trim();

function onFocus(e: FocusEvent) {
    shownText = figureText(e.target as HTMLElement);
    settled = false;
}

function onBeforeInput(e: InputEvent) {
    if (e.inputType === "insertParagraph" || e.inputType === "insertLineBreak") e.preventDefault();
}

function settle(el: HTMLElement, component: string, commit: boolean) {
    if (settled) return;
    settled = true;
    const typed = figureText(el);
    if (typed === shownText) return;
    if (commit) emit("commit", typed, component);
    epochs[component] = (epochs[component] ?? 0) + 1;
}

function onKeydown(e: KeyboardEvent, component: string) {
    if (e.key !== "Enter" && e.key !== "Escape") return;
    // The figure's own keys: the picker's palette-edit Enter/Escape never sees them.
    e.preventDefault();
    e.stopPropagation();
    const el = e.currentTarget as HTMLElement;
    settle(el, component, e.key === "Enter");
    el.blur();
}

function onBlur(e: FocusEvent, component: string) {
    settle(e.target as HTMLElement, component, true);
}

/**
 * The int/frac split of a component's rendering, at the one digit policy
 * (`readoutDecimals`). Strings (hex) pass through whole.
 */
function figParts(component: string): { int: string; frac: string } {
    const fmt = formatted[component];
    if (!fmt) return { int: "", frac: "" };
    if (typeof fmt.value === "string") return { int: fmt.value, frac: "" };
    // One digit policy, trailing zeros dropped, never a negative zero; the
    // card box holds still because the line lock is the worst case's.
    const s = formatFixed(fmt.value, readoutDecimals(space, component));
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
 * color-40 G (his FORTIETH order: "the header numbers of the components should
 * be a bit larger and audacious"; CONVERGE: "a number that is the hero is
 * larger and bolder") — THE CARD'S HIERARCHY, retiring X.W12.d's cap one ladder
 * step below the title:
 *   · the NUMERALS stand at the TITLE'S rung (`--type-display-2`, the space
 *     trigger's), integer 700 and fraction 400;
 *   · they are fitted to THE MEASURE — the catalog's widest worst-case tuple
 *     (readoutReservation.ts `READOUT_MEASURE_EM`, lab `100.0, -125.0,
 *     -125.0`, re-taken at these weights) — over the HEADER'S CONTENT BOX: the
 *     line is its own inline-size container, so `100cqi` is the box the line
 *     has, not the pane wrapper's (whose cqi overran by the header's padding).
 *     On a desk the title's rung binds (53.3 px at 1440); on a phone the box
 *     does (about 30.9 px at 390);
 *   · no empty interval: every shown space is ONE line by construction, so
 *     `min-height` (the lock) is the painted line and nothing is reserved
 *     that does not ink — the title row, the 7px header rhythm and the
 *     numerals stack with no band between them.
 *
 * CANON (X.W10.g1): this is `demo/DESIGN.md` §3 "Proportion and derivation",
 * Law P-1 (vertical rhythm, OM-3) — a min-height remainder is flex slack and a
 * defect whatever it measures — applied under §6.2's card-lock law: the lock
 * is the painted line, so the reservation and the rhythm never disagree. */
.readout-line {
    container-type: inline-size;
    align-self: stretch;
    --readout-size: min(var(--type-display-2), calc(100cqi / var(--readout-measure)));
}
.readout-line > :slotted(*) {
    font-size: var(--readout-size);
    margin-inline-start: 0.75ch;
}
.readout {
    font-size: var(--readout-size);
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

/* color-40 G-3: on a touch screen each figure is a 44 px target by slop. The
 * padding grows the figure's own box (its hit area and its focus ring) and the
 * equal negative margin gives it back, so the line, its baseline and the card
 * hold still. */
@media (pointer: coarse) {
    .readout-fig {
        --fig-slop: max(0px, calc((var(--touch-target, 2.75rem) - 1lh) / 2));
        padding-block: var(--fig-slop);
        margin-block: calc(-1 * var(--fig-slop));
    }
}

.readout-fig:focus-visible {
    /* C5 — the accent-aware house focus register on the editable cells. */
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-sm, 0.25rem);
}

/* TYPOGRAPHY-1 — the instrument's typographic rhythm: integer heavy,
 * fraction light + demoted, unit as a muted italic index.
 *
 * T.W4-4 — THE GUARD-THEN-ALPHA CURE (the W3-5 D6 contract handed here,
 * h-dag D-4): the demotions were post-hoc opacity multiplies over an
 * uncontrolled live-tinted ground — un-certifiable by construction
 * (t-a11y F-4). De-emphasis now rides the CERTIFIED de-emphasis rung: the
 * boot writer's `--ink-muted` (floor-clamped against the resting plate —
 * exactly the tier these figures sit on). Weight demotion stays (weight is
 * rhythm, not contrast); alpha dies. O-18's readout-frac row asserts. */
.fig-int {
    font-weight: 700;
}
.fig-frac {
    font-weight: 400;
    color: var(--ink-muted);
}
/* X-DS value pass 14 (V14C-04): the unit is a muted italic index in the
 * console's own lowercase spelling ("9.8 deg"). The small-caps and tracking
 * are retired (value-canon §2 Type: no small-caps labels). */
.fig-unit {
    color: var(--ink-muted);
    font-size: 0.55em;
    font-style: italic;
    margin-left: 0.08em;
}
.fig-comma {
    color: var(--ink-muted);
    font-weight: 400;
}
</style>
