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
import { Check, ChevronDown, Copy, SlidersHorizontal } from "@lucide/vue";
import { useClipboard } from "@mkbabb/glass-ui";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { serializeIntervalRamp } from "../composables/useGradientCSS";
import EasingAuthoringStage from "./easing/EasingAuthoringStage.vue";
import EasingSpecimenStrip from "./easing/EasingSpecimenStrip.vue";
import type { SpecimenTile } from "./easing/easingCatalogue";
import { useSpecimenRows } from "./easing/useSpecimenRows";
import type {
    GradientInterval,
    GradientModelState,
    GradientStop,
} from "../composables/useGradientModel";

const { stops, intervals, modelState } = defineProps<{
    stops: GradientStop[];
    intervals: GradientInterval[];
    modelState: GradientModelState;
}>();

const emit = defineEmits<{
    "update-interval": [index: number, value: EasingPickerValue];
}>();

// ── The specimen rows (identity derived from the interval, the truth;
// per-row ink = the certified eased ramp midpoint — useSpecimenRows) ──
const specimenRows = useSpecimenRows(
    () => stops,
    () => intervals,
    () => modelState,
);

// ── The accordion ──
const openInterval = ref<number | null>(0);

const openIntervalRamp = computed<string | null>(() =>
    openInterval.value === null
        ? null
        : serializeIntervalRamp(modelState, openInterval.value),
);

function toggleInterval(index: number) {
    openInterval.value = openInterval.value === index ? null : index;
}

function onTileSelect(index: number, tile: SpecimenTile) {
    // The tile and authoring canvas write the same complete interval value.
    emit("update-interval", index, tile.payload());
}

function onPickerAuthored(index: number, v: EasingPickerValue | undefined) {
    if (!v) return;
    emit("update-interval", index, v);
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
    <div class="flex flex-col gap-2">
        <!-- Z2 in-plate specimen rows: flat on the plate, --card-edge
             hairline, no shadow (DESIGN.md § Depth); each row strokes the
             interval's OWN ink through the producer's --motion-accent door. -->
        <div
            v-for="row in specimenRows"
            :key="row.index"
            class="rounded-card border border-card-edge overflow-hidden"
            :style="row.ink ? { '--motion-accent': row.ink } : undefined"
        >
            <button
                type="button"
                class="interval-head w-full flex items-center gap-2.5 px-3 py-2 text-left cursor-pointer"
                :aria-expanded="openInterval === row.index"
                :aria-controls="`easing-interval-${row.index}`"
                @click="toggleInterval(row.index)"
            >
                <span class="fira-code text-mono-small text-muted-foreground shrink-0">{{ row.label }}</span>
                <!-- The specimen label (t-easing-pane §7): endpoint dots +
                     the interval-true micro glyph + the curve's name. -->
                <span class="specimen-dots shrink-0" aria-hidden="true">
                    <span class="specimen-dot" :style="{ '--dot-c': row.c0 }" />
                    <span class="specimen-dot" :style="{ '--dot-c': row.c1 }" />
                </span>
                <svg class="head-glyph shrink-0" viewBox="0 0 1 1" aria-hidden="true">
                    <path :d="row.glyph" vector-effect="non-scaling-stroke" />
                </svg>
                <!-- text-mono-SMALL: curve identifiers are case-sensitive;
                     text-mono-caption would uppercase them (P1-7). -->
                <span class="fira-code text-mono-small text-muted-foreground truncate flex-1 min-w-0">{{ row.name }}</span>
                <ChevronDown
                    class="w-4 h-4 shrink-0 text-muted-foreground transition-transform"
                    :class="openInterval === row.index ? 'rotate-180' : ''"
                    aria-hidden="true"
                />
            </button>
            <div
                v-show="openInterval === row.index"
                :id="`easing-interval-${row.index}`"
                class="px-3 pb-3 flex flex-col gap-2.5"
            >
                <!-- The interval's live ramp (W5-9, kept verbatim): the
                     row's "ball" — its curve applied to ITS two colors,
                     sampled by the same law the gradient renders with. -->
                <div
                    v-if="openInterval === row.index && openIntervalRamp"
                    class="h-5 rounded-md border border-card-edge"
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
                <div class="readout-rail flex items-center gap-1.5 rounded-md bg-well px-2 py-1">
                    <code class="fira-code text-mono-small text-muted-foreground truncate flex-1 min-w-0" :title="row.css">{{ row.css }}</code>
                    <button
                        type="button"
                        class="rail-btn shrink-0"
                        :aria-label="copiedRow === row.index ? 'Copied' : `Copy ${row.css}`"
                        @click="copyLiteral(row.index, row.css)"
                    >
                        <Check v-if="copiedRow === row.index" class="w-3.5 h-3.5 rail-tick" />
                        <Copy v-else class="w-3.5 h-3.5" />
                    </button>
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
                        v-if="intervals[row.index]"
                        :value="intervals[row.index]!"
                        :label="`Easing curve ${row.label}`"
                        @authored="(v) => onPickerAuthored(row.index, v)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* The specimen-row head: a whisper hover + the house focus register (the
 * accent-aware ring the keystone mints — never a bespoke outline). */
.interval-head {
    transition: background-color var(--duration-fast) var(--ease-standard);
}
.interval-head:hover {
    background-color: color-mix(in oklab, var(--foreground) 4%, transparent);
}
.interval-head:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
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
    border-radius: var(--radius-input);
    color: var(--muted-foreground);
    cursor: pointer;
    transition:
        color var(--duration-fast) var(--ease-standard),
        background-color var(--duration-fast) var(--ease-standard);
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
</style>
