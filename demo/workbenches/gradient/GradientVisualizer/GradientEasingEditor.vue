<script setup lang="ts">
/**
 * GradientEasingEditor (T.W6-3 / T-47 — the interval specimen bench, the
 * kf easing selector assayed DIRECTLY; re-authored from the S.W5-9
 * accordion). CLOSED ROWS are specimen labels: endpoint dots + the
 * interval-TRUE micro glyph + the curve's NAME (§6/§7 — `custom` when
 * unnamed). The OPEN ROW: the live ramp strip (kept — the row's ball);
 * the SPECIMEN STRIP (the kf T.E6 gallery at interval scale — selection);
 * ONE readout rail (the single literal + copy — the one-literal law); a
 * DISCLOSED authoring stage seating <EasingPicker> as a flat well (the kf
 * BG-8 division: the strip selects, the picker authors; zero-letterbox +
 * wells-flat + dot-rest seat laws in `easing/EasingAuthoringStage.vue`).
 * Each row strokes the interval's OWN ink — `--motion-accent` = the
 * certified eased ramp midpoint (§8: one ink per specimen).
 *
 * Picker instances stay ALIVE (v-show, never v-if) and consume the complete
 * interval through Glass's two-way model. Tile selection and direct authoring
 * therefore share one state path with no remount/echo discipline.
 *
 * The W5-9 regex autoplay drive (querySelector on the picker's play-button
 * text) DIED at T.W6.5 Row E (t33-research §3.4 — compactness by deletion:
 * the row's live ramp strip IS the motion preview; `:playback="false"`
 * keeps the pill off the surface). A demonstrate-itself behavior returns
 * only through P7's declarative `autoplay`/`playing` door — never a DOM
 * drive.
 */
import { computed, ref } from "vue";
import { Check, Copy, SlidersHorizontal } from "@lucide/vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@mkbabb/glass-ui";
import { useClipboard } from "@mkbabb/glass-ui/dom";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { serializeIntervalRamp } from "../composables/useGradientCSS";
import EasingAuthoringStage from "./easing/EasingAuthoringStage.vue";
import EasingSpecimenStrip from "./easing/EasingSpecimenStrip.vue";
import type { SpecimenTile } from "./easing/easingCatalogue";
import { useSpecimenRows } from "./easing/useSpecimenRows";
import type {
    GradientModelState,
    GradientStop,
} from "../model/types";

const { stops, modelState } = defineProps<{
    stops: GradientStop[];
    modelState: GradientModelState;
}>();

const emit = defineEmits<{
    "update-easing": [id: string, value: EasingPickerValue];
}>();

// X-W6 · X.W6.a — the intervals are no longer a parallel array the model has
// to keep in step; they are the PROJECTION of the stops that open them. Row i
// is the interval `stops[i] → stops[i+1]`, so its curve is `stops[i].easing`
// and an edit is addressed to that stop's ID, never to an ordinal index.
const openers = computed(() => stops.slice(0, -1));
const intervals = computed(() => openers.value.map((s) => s.easing));

// ── The specimen rows (identity derived from the interval, the truth;
// per-row ink = the certified eased ramp midpoint — useSpecimenRows) ──
const specimenRows = useSpecimenRows(
    () => stops,
    () => intervals.value,
    () => modelState,
);

// ── The accordion ──
// X.W12U.s3 · UIA-V-605: every interval rests CLOSED — an open first row
// added ~150 px of ramp, specimens and rail on load and pushed the gradient's
// CSS output below the fold. A row opens when its head is pressed.
const openInterval = ref<number | null>(null);

const openIntervalRamp = computed<string | null>(() =>
    openInterval.value === null
        ? null
        : serializeIntervalRamp(modelState, openInterval.value),
);

/** The Accordion's single-mode model: the open interval's index as its item
 *  value; "" (no item) is the closed state. */
const openValue = computed<string>({
    get: () => (openInterval.value === null ? "" : String(openInterval.value)),
    set: (v: string | undefined) => {
        openInterval.value = v === undefined || v === "" ? null : Number(v);
    },
});

function onTileSelect(index: number, tile: SpecimenTile) {
    // The tile and authoring canvas write the same complete interval value —
    // onto the stop that OPENS the interval, by identity.
    const opener = openers.value[index];
    if (opener) emit("update-easing", opener.id, tile.payload());
}

function onPickerAuthored(index: number, v: EasingPickerValue | undefined) {
    if (!v) return;
    const opener = openers.value[index];
    if (opener) emit("update-easing", opener.id, v);
}

// ── The authoring disclosure (the strip selects; the canvas authors) ──
const tuneOpen = ref<Record<number, boolean>>({});

function toggleTune(index: number) {
    tuneOpen.value = { ...tuneOpen.value, [index]: !tuneOpen.value[index] };
}

// ── The readout copy (the row's ONE literal export) ──
// Glass 7: scope-owned confirmation state replaces the hand-rolled copy+timer.
// `copiedIndex` still tracks WHICH row copied; `copiedRow` gates it on the
// live success status so the tick clears itself when the status resets.
const { status: copyStatus, copy } = useClipboard({ resetMs: 1400 });
const copiedIndex = ref<number | null>(null);
const copiedRow = computed(() =>
    copyStatus.value === "success" ? copiedIndex.value : null,
);

async function copyLiteral(index: number, css: string) {
    copiedIndex.value = index;
    await copy(css);
}
</script>

<template>
    <!-- A2-VA-L1-12: the intervals are glass's Accordion (single, collapsible) —
         the app's one disclosure; the hand-rolled button + v-show copy is gone. -->
    <Accordion
        v-model="openValue"
        type="single"
        collapsible
        class="easing-panel flex flex-col border border-card-edge overflow-hidden"
    >
        <!-- Z2 in-plate specimen rows: ONE surface, divided by --card-edge
             hairlines (X-DS pass 13, V13C-02: no framed capsule per row, no
             gap, no shadow; DESIGN.md § Depth). The divider is glass's own
             item rule (`.disclosure-item`'s block-end hairline) in the
             card-edge ink; the last row drops it, since the panel's edge
             closes the list. Each row strokes the interval's OWN ink through
             the producer's --motion-accent door. -->
        <AccordionItem
            v-for="row in specimenRows"
            :key="row.index"
            :value="String(row.index)"
            class="easing-row border-card-edge last:border-b-0"
            :style="row.ink ? { '--motion-accent': row.ink } : undefined"
        >
            <!-- X-DS pass 7 (VC7-01): the inset rides the CLASS, which glass's
                 AccordionTrigger merges onto its <button>; this file's scoped
                 attribute lands on the trigger's root <h3>, so a scoped
                 `.interval-head` rule never reached the button. -->
            <AccordionTrigger class="interval-head w-full flex items-center gap-2.5 py-2 px-(--easing-inset) text-left">
                <span class="font-mono text-mono-small text-muted-foreground shrink-0">{{ row.label }}</span>
                <!-- The specimen label (t-easing-pane §7): endpoint dots +
                     the interval-true micro glyph + the curve's name. -->
                <span class="specimen-dots shrink-0" aria-hidden="true">
                    <span class="specimen-dot" :style="{ '--dot-c': row.c0 }" />
                    <span class="specimen-dot" :style="{ '--dot-c': row.c1 }" />
                </span>
                <!-- X-DS pass 18 (V18C-04): no frame. The card-edge hairline
                     read ~1.1:1 on the saturated ground (a smudge, not a plot
                     box); the glyph sits in a labelled row (dots, curve,
                     name), and the open interval shows the full plot. -->
                <svg class="head-glyph shrink-0" viewBox="0 0 1 1" aria-hidden="true">
                    <path :d="row.glyph" vector-effect="non-scaling-stroke" />
                </svg>
                <!-- text-mono-SMALL: curve identifiers are case-sensitive;
                     text-mono-caption would uppercase them (P1-7). -->
                <!-- X-DS pass 2 (V2C-07): the curve name is the live value, so it
                     reads at foreground; only the "1 → 2" index stays muted. -->
                <span class="font-mono text-mono-small text-foreground truncate flex-1 min-w-0">{{ row.name }}</span>
            </AccordionTrigger>
            <AccordionContent class="easing-row-body flex flex-col gap-2.5">
                <!-- The interval's live ramp (W5-9, kept verbatim): the
                     row's "ball" — its curve applied to ITS two colors,
                     sampled by the same law the gradient renders with. -->
                <div
                    v-if="openInterval === row.index && openIntervalRamp"
                    class="easing-inner-surface h-5 border border-card-edge"
                    :style="{ background: `${openIntervalRamp}, var(--alpha-checker)` }"
                    role="img"
                    :aria-label="`Eased ramp for interval ${row.label}`"
                />

                <!-- The specimen strip: the kf gallery at interval scale —
                     the named-curve SELECTION surface. -->
                <EasingSpecimenStrip
                    :selected-id="row.tileId"
                    :visible="openInterval === row.index"
                    @select="(tile) => onTileSelect(row.index, tile)"
                />

                <!-- The readout rail: the row's ONE literal + copy (the
                     one-literal law) + the authoring disclosure. The rail
                     carries the reservation-law WELL backing (P8-R1): the
                     literal is `text-muted-foreground`, and on the raw
                     translucent pane over the saturated atmosphere it
                     composited ~2.7:1 (fails AA); a `bg-well` well floors it
                     to the certified ink-on-well ratio (the condition chip's
                     precedent) AND visually unifies the rail with the canvas
                     plate below it. -->
                <!-- X-W12U .q2 (one-literal law at glass 10.1.0, X.W7L.m
                     `c8a4959dd`): the producer EasingPicker now prints the
                     literal itself, as its own "Copy curve literal" readout.
                     While the authoring stage is disclosed THAT readout is the
                     row's one literal + copy; the rail keeps only the
                     disclosure toggle, so the row never prints it twice. -->
                <!-- X-DS value pass 14 (V14C-03): the well floors the literal's
                     contrast, so it is drawn only while the rail holds the
                     literal. With the stage open the rail holds only the toggle,
                     flush right on the panel above the stage it opened.
                     Pass 15 (V15C-02): that row is labelled with what is open,
                     in the strip's caption voice, so the pressed toggle reads
                     as the row's close control, not a stray glyph. -->
                <div
                    class="readout-rail flex items-center gap-1.5"
                    :class="!tuneOpen[row.index] && 'rounded-md bg-well px-2 py-1'"
                >
                    <template v-if="!tuneOpen[row.index]">
                        <code class="font-mono text-mono-small text-muted-foreground truncate flex-1 min-w-0" :title="row.css">{{ row.css }}</code>
                        <button
                            type="button"
                            class="rail-btn shrink-0"
                            :aria-label="copiedRow === row.index ? 'Copied' : `Copy ${row.css}`"
                            @click="copyLiteral(row.index, row.css)"
                        >
                            <Check v-if="copiedRow === row.index" class="w-3.5 h-3.5 rail-tick" />
                            <Copy v-else class="w-3.5 h-3.5" />
                        </button>
                    </template>
                    <span v-else class="rail-caption flex-1 min-w-0 truncate">Custom curve</span>
                    <button
                        type="button"
                        class="rail-btn shrink-0"
                        :class="tuneOpen[row.index] ? 'rail-btn--on' : ''"
                        :aria-expanded="!!tuneOpen[row.index]"
                        :aria-controls="`easing-authoring-${row.index}`"
                        aria-label="Author a custom curve"
                        @click="toggleTune(row.index)"
                    >
                        <SlidersHorizontal class="w-3.5 h-3.5" />
                    </button>
                </div>

                <!-- The authoring stage (disclosed; alive via v-show): the
                     producer <EasingPicker> seated as a flat well — the kf
                     BG-8 division's editor half. -->
                <div
                    v-show="tuneOpen[row.index]"
                    :id="`easing-authoring-${row.index}`"
                >
                    <EasingAuthoringStage
                        v-if="openers[row.index]"
                        :value="openers[row.index]!.easing"
                        :label="`Easing curve ${row.label}`"
                        @authored="(v) => onPickerAuthored(row.index, v)"
                    />
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>

<style scoped>
/* ── ONE RADIUS REGISTER (X-W6 · X.W6.d — d1; CC-060 · MT-F030) ──
   The panel used to speak four unrelated radii at once (OM-4): the row card at
   `--radius-card`, the ramp strip at a Tailwind `md`, the authoring well at a
   second card-scale corner one inset inside the first, and capsule chips
   beside true circles. The register is now DERIVED — two rungs and one inset,
   related by the concentric law:

     outer = the card radius                   (the one divided panel)
     inner = the readout rail's radius         (every surface nested one inset
                                                inside a row: the ramp strip,
                                                the readout rail, the authoring
                                                well)
     inset = outer − inner                     (the row's own padding)

   so every nested corner is concentric with its row's by construction. The
   inner rung is the READOUT RAIL's radius and not a new one because the readout
   is frozen: gate d2 routed its look to the dated glass-forward ask
   (`W6-glass-ask-easing-readout.md`) and bans a local restyle of it, so the
   register is derived AROUND it — the row's inset moves, the readout does not.
   Everything else in the panel is a declared CIRCLE: the specimen chips
   (`shape="icon"`, the glass icon-circle species, chosen ONCE for all of them)
   and the endpoint dots. Canon for the radius ladder itself is X-W10's; this
   panel applies the rungs it is given and mints none. */
.easing-panel {
    --easing-radius-outer: var(--radius-card);
    --easing-radius-inner: var(--radius-md);
    --easing-inset: calc(var(--easing-radius-outer) - var(--easing-radius-inner));
}
/* The one edge is the panel's (V13C-02): its corner is the outer rung and its
   overflow clips the first and last rows' square hover plates to it. */
.easing-panel {
    border-radius: var(--easing-radius-outer);
}
.easing-row-body {
    padding-inline: var(--easing-inset);
    padding-block-end: var(--easing-inset);
}
.easing-inner-surface {
    border-radius: var(--easing-radius-inner);
}

/* The specimen-row head: a whisper hover on the ROW's radius (X-DS pass 7,
 * VC7-01). The head is glass's trigger <button>, which this file's scoped
 * attribute never reaches, so the rule pierces from the row. It is square: a
 * divided list's plate, which the panel's `overflow-hidden` clips at the
 * panel's outer radius for the first and last rows, instead of
 * glass's pill `--radius-control` plate floating inside a 16px card. The focus
 * register is glass's own (`.disclosure-trigger:focus-visible`, the house
 * ring); this file's copy of it was dead and is gone. */
.easing-row :deep(.interval-head) {
    border-radius: 0;
}
.easing-row :deep(.interval-head:hover) {
    background-color: color-mix(in oklab, var(--foreground) 4%, transparent);
}

/* The endpoint dots: the interval's two stop colors over the checker
 * ground (alpha-honest), hairline-edged, slightly overlapped — a pair. */
.specimen-dots {
    display: inline-flex;
    align-items: center;
}
.specimen-dot {
    inline-size: 0.625rem;
    block-size: 0.625rem;
    border-radius: 9999px;
    border: 1px solid var(--card-edge);
    background:
        linear-gradient(var(--dot-c), var(--dot-c)),
        var(--alpha-checker);
    background-size: cover, 6px 6px;
}
.specimen-dot + .specimen-dot {
    margin-left: -3px;
}

/* The head's micro portrait — the interval-TRUE curve, stroked in the
 * specimen's own ink (overshoot draws past the box, never clipped). */
.head-glyph {
    inline-size: 1rem;
    block-size: 1rem;
    overflow: visible;
}
.head-glyph path {
    fill: none;
    stroke: var(--motion-accent, var(--muted-foreground));
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* The readout-rail ghost controls: quiet icons, house focus ring. */
.rail-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.3125rem;
    border-radius: var(--radius-media);
    color: var(--muted-foreground);
    cursor: pointer;
}
.rail-btn:hover {
    color: var(--foreground);
    background-color: color-mix(in oklab, var(--foreground) 6%, transparent);
}
.rail-btn:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}
.rail-btn--on {
    color: var(--motion-accent, var(--foreground));
}
.rail-tick {
    color: var(--motion-accent, var(--foreground));
}
/* The open rail's label (V15C-02): the specimen strip's caption voice. */
.rail-caption {
    font-size: var(--text-caption);
    line-height: 1.2;
    color: var(--ink-muted, var(--muted-foreground));
}

/* ── Motion, declared only where motion is wanted (X-W6 · X.W6.e — e2) ──
   Every transition in the panel lives here, so a reduced-motion reader gets
   each state change at once BY CONSTRUCTION — never by the global guard
   zeroing durations after the fact. The readout's controls are moved, not
   restyled: the same two eased properties, now inside the block. */
@media (prefers-reduced-motion: no-preference) {
    .interval-head {
        transition: background-color var(--duration-fast) var(--ease-standard);
    }
    .rail-btn {
        transition:
            color var(--duration-fast) var(--ease-standard),
            background-color var(--duration-fast) var(--ease-standard);
    }
}
</style>
