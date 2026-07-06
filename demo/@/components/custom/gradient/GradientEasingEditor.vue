<script setup lang="ts">
/**
 * GradientEasingEditor (S.W5-9; lifted from GradientVisualizer at the ≤400
 * cap check — the third editing surface beside GradientStopEditor and
 * GradientCodeEditor) — the per-interval easing accordion: one specimen row
 * per interval, the OPEN row seating the glass-ui <EasingPicker> plus its
 * live ramp strip (the row's "ball" — its curve applied to ITS two colors,
 * sampled by the ONE law the rendered gradient uses).
 *
 * Picker instances stay ALIVE (v-show, never v-if) so an authored curve is
 * never re-seeded away by a row toggle — the drawn curve and the interval's
 * live fn cannot disagree. The one legitimate re-seed is a model-wide reset
 * (a successful CSS parse): the parent bumps `epoch`, which re-keys the rows
 * to remount re-seeded `linear` and clears the per-interval mode map.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useMediaQuery } from "@vueuse/core";
import { ChevronDown } from "@lucide/vue";
import { EasingPicker } from "@mkbabb/glass-ui/easing";
import type { EasingPickerMode, EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { serializeIntervalRamp } from "./composables/useGradientCSS";
import type {
    GradientInterval,
    GradientModelState,
    GradientStop,
} from "./composables/useGradientModel";

const { stops, intervals, modelState, epoch } = defineProps<{
    stops: GradientStop[];
    intervals: GradientInterval[];
    modelState: GradientModelState;
    /** Bumped by the parent on a model-wide re-seed (successful CSS parse). */
    epoch: number;
}>();

const emit = defineEmits<{
    "update-interval": [index: number, value: EasingPickerValue];
}>();

const intervalPairs = computed(() => {
    const pairs: { index: number; label: string; css: string }[] = [];
    for (let i = 0; i < intervals.length; i++) {
        const s0 = stops[i];
        const s1 = stops[i + 1];
        if (!s0 || !s1) continue;
        pairs.push({
            index: i,
            label: `${i + 1} → ${i + 2}`,
            css: intervals[i]!.css,
        });
    }
    return pairs;
});

// ── The easing accordion (R.W4 Lane D / D2 — the `/easing` consume) ──
const openInterval = ref<number | null>(0);

// The open row's live ramp strip (W5-9 / P1-5): the interval's own eased
// ramp, sampled by the ONE law the rendered gradient uses — the row shows
// what its curve does to ITS two colors without leaving the row.
const openIntervalRamp = computed<string | null>(() =>
    openInterval.value === null
        ? null
        : serializeIntervalRamp(modelState, openInterval.value),
);

// ── Auto-trace on open (W5-9): the row demonstrates itself ──
// The picker's travel affordance is its public play button; glass-ui does
// not defineExpose(playTravel) (producer-gap recorded on the L7 letter row),
// so the demo drives the affordance itself — found by its accessible text,
// PRM-gated, and a silent no-op if the L7 v2 reshapes the control.
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
const intervalBodyEls = new Map<number, HTMLElement>();
let traceTimer: ReturnType<typeof setTimeout> | null = null;

function setIntervalBodyEl(index: number, el: unknown) {
    if (el instanceof HTMLElement) intervalBodyEls.set(index, el);
    else intervalBodyEls.delete(index);
}

function autoTrace(index: number) {
    if (prefersReducedMotion.value) return;
    void nextTick(() => {
        if (traceTimer !== null) clearTimeout(traceTimer);
        // Let the row-open reveal land before the dot starts its run.
        traceTimer = setTimeout(() => {
            traceTimer = null;
            if (openInterval.value !== index) return;
            const host = intervalBodyEls.get(index);
            const btn = host
                ? Array.from(host.querySelectorAll("button")).find((b) =>
                      /trace the curve|climb the staircase/i.test(
                          b.textContent ?? "",
                      ),
                  )
                : undefined;
            btn?.click();
        }, 180);
    });
}

function toggleInterval(index: number) {
    const opening = openInterval.value !== index;
    openInterval.value = opening ? index : null;
    if (opening) autoTrace(index);
}

onMounted(() => {
    // First-row auto-trace on open: the pane arrives demonstrating itself.
    if (openInterval.value !== null) autoTrace(openInterval.value);
});

onBeforeUnmount(() => {
    if (traceTimer !== null) clearTimeout(traceTimer);
});

// Q12 (RATIFIED): steps mode is ALLOWED — banded gradients are a design
// tool. The mode rides the picker's `mode` prop, toggled per interval.
const intervalModes = ref<Record<number, EasingPickerMode>>({});
const EASING_MODE_OPTIONS = [
    { label: "Curve", value: "bezier" },
    { label: "Steps", value: "steps" },
];

// The parse re-seed signal: remounted rows arrive back in curve mode.
watch(
    () => epoch,
    () => {
        intervalModes.value = {};
    },
);

function intervalMode(index: number): EasingPickerMode {
    return intervalModes.value[index] ?? "bezier";
}

function onModeChange(index: number, value: string | string[]) {
    const next = Array.isArray(value) ? value[0] : value;
    if (next === "bezier" || next === "steps") {
        intervalModes.value = { ...intervalModes.value, [index]: next };
    }
}

function onIntervalAuthored(index: number, value: EasingPickerValue | undefined) {
    if (value) emit("update-interval", index, value);
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <!-- Z2 in-plate specimen rows: flat on the plate, --card-edge
             hairline, no shadow (DESIGN.md § Depth). -->
        <div
            v-for="pair in intervalPairs"
            :key="`${pair.index}:${epoch}`"
            class="rounded-card border border-card-edge overflow-hidden"
        >
            <button
                type="button"
                class="interval-head w-full flex items-center gap-3 px-3 py-2 text-left cursor-pointer"
                :aria-expanded="openInterval === pair.index"
                :aria-controls="`easing-interval-${pair.index}`"
                @click="toggleInterval(pair.index)"
            >
                <span class="fira-code text-mono-small text-muted-foreground shrink-0">{{ pair.label }}</span>
                <!-- text-mono-SMALL: the literal is case-sensitive code;
                     text-mono-caption would uppercase it (P1-7). -->
                <code class="fira-code text-mono-small text-muted-foreground/70 truncate flex-1 min-w-0">{{ pair.css }}</code>
                <ChevronDown
                    class="w-4 h-4 shrink-0 text-muted-foreground transition-transform"
                    :class="openInterval === pair.index ? 'rotate-180' : ''"
                    aria-hidden="true"
                />
            </button>
            <div
                v-show="openInterval === pair.index"
                :id="`easing-interval-${pair.index}`"
                :ref="(el) => setIntervalBodyEl(pair.index, el)"
                class="px-3 pb-3 flex flex-col gap-3"
            >
                <!-- The interval's live ramp (W5-9): the row's "ball" —
                     its curve applied to ITS two colors, sampled by
                     the same law the gradient renders with. -->
                <div
                    v-if="openInterval === pair.index && openIntervalRamp"
                    class="h-5 rounded-md border border-card-edge"
                    :style="{ background: `${openIntervalRamp}, var(--alpha-checker)` }"
                    role="img"
                    :aria-label="`Eased ramp for interval ${pair.label}`"
                />
                <div class="flex justify-start">
                    <SegmentedTabs
                        variant="pill"
                        :options="EASING_MODE_OPTIONS"
                        :model-value="intervalMode(pair.index)"
                        aria-label="Easing mode"
                        @update:model-value="(v: string | string[]) => onModeChange(pair.index, v)"
                    />
                </div>
                <EasingPicker
                    :mode="intervalMode(pair.index)"
                    preset="linear"
                    :label="`Easing curve ${pair.label}`"
                    @update:model-value="(v: EasingPickerValue | undefined) => onIntervalAuthored(pair.index, v)"
                />
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
</style>
