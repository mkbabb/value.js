<script setup lang="ts">
/**
 * PerceivedSpacePlate (T.W6-2 / T-21, re-authored from the S.W5-8 slice) —
 * the gradient page's hero: the sRGB gamut ENVELOPE swept over the ramp's
 * own hues, with the coalesced ramp inked as a trajectory and the stops
 * sitting ON the path. Three truth regimes (solid / ambiguous belt / full
 * netting — see `envelopePlatePaint.ts`) replace the single-hue slice that
 * left the default seed ~⅔ permanent netting with "in-gamut" beads floating
 * in "out-of-gamut" hatch. Selecting a stop still PINS the plate to that
 * stop's single-hue slice (the stated special case; the belt vanishes).
 *
 * The demo owns paint + scheduling; geometry is library-owned:
 * `sampleOKLChHueSweepBoundary(Into)` (the T.W1-src sampler — the allocating
 * call once, the zero-alloc `Into` twin on every sweep change), inks from
 * the `--gamut-*` tokens via the ONE probe home (`@lib/gamut-ink`).
 *
 * The C axis is cusp-adaptive (quantized rungs + hysteresis in the paint
 * module; EASED here so hue drags never snap the frame), and the condition
 * label states the full instrument condition — space, swept hues, axis.
 * The label carries the plate's paper as a backing chip: the reservation
 * law (the picker readout's class), held regardless of where the field tip
 * parks.
 */
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    useTemplateRef,
} from "vue";
import {
    sampleOKLChHueSweepBoundary,
    sampleOKLChHueSweepBoundaryInto,
} from "@mkbabb/value.js/color";
import type { OKLChHueSweepBoundary } from "@mkbabb/value.js/color";
import { cancelAnimationFrame, requestAnimationFrame } from "@mkbabb/value.js";
import { createInkProbe, DPR_CAP } from "@lib/gamut-ink";
import type { ResolvedInks } from "@lib/gamut-ink";
import {
    nextAxisQuantum,
    paintEnvelopeField,
    paintEnvelopePlate,
    quantizedAxis,
} from "./envelopePlatePaint";
import type { RampPoint, StopPoint, SweptHues } from "../../composables/usePerceivedRamp";

const COLUMNS = 96; // the validated geometry default (boundary-api §2)
/** Hue samples across the sweep (the sampler's validated default). */
const HUE_STEPS = 16;
/** Per-frame axis easing factor (exponential approach to the quantum). */
const AXIS_EASE = 0.22;

const { points, stopPoints, hue, sweep, selectedId = null } = defineProps<{
    points: RampPoint[];
    stopPoints: StopPoint[];
    /** The running hue (deg) — the solid field's color voice; always finite. */
    hue: number;
    /** The swept hue interval (usePerceivedRamp.sweptHues). */
    sweep: SweptHues;
    selectedId?: string | null;
}>();

const hostRef = useTemplateRef<HTMLDivElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// ── The condition label: the instrument states space · hues · axis ──
const norm = (h: number) => Math.round(((h % 360) + 360) % 360);
const hueLabel = computed(() => {
    const a = norm(sweep.start);
    const b = norm(sweep.end);
    return a === b ? `H ${a}°` : `H ${a}–${b}°`;
});
// The settled axis rung (display truth — the eased paint axis lands here).
const axisQuantum = ref(quantizedAxis(0));
const axisLabel = computed(() => `C ≤ ${Number(axisQuantum.value.toFixed(2))}`);

// ── Library geometry: one seed allocation, the Into twin thereafter ──
const envelope: OKLChHueSweepBoundary = sampleOKLChHueSweepBoundary(
    sweep.start,
    sweep.end,
    COLUMNS,
    HUE_STEPS,
);
let envelopeKey = `${sweep.start}:${sweep.end}`;
axisQuantum.value = quantizedAxis(envelope.cuspCMax);

// The displayed axis eases toward the quantum (no axis-snap on hue drags).
let axisShown = axisQuantum.value;

// ── Ink probe (the one home) — cached per scheme ──
let probe: ReturnType<typeof createInkProbe> | null = null;
let inks: ResolvedInks | null = null;
let classObs: MutationObserver | null = null;

// ── The device-resolution field raster (repainted on hue/sweep/axis/size/dpr
//    change; rastered at the SETTLED axis rung — the compositor rescales
//    during easing) ──
const fieldCanvas = document.createElement("canvas");
let fieldKey = "";

// ── Size cache (ResizeObserver-fed; the draw path never reflows) ──
const size = ref({ width: 0, height: 0 });
let ro: ResizeObserver | null = null;

// ── rAF-coalesced paint scheduling (P2-19 discipline) ──
let rafId: number | null = null;

function paint() {
    rafId = null;
    const canvas = canvasRef.value;
    const host = hostRef.value;
    if (!canvas || !host) return;
    const { width, height } = size.value;
    if (width < 4 || height < 4) return;

    const key = `${sweep.start}:${sweep.end}`;
    if (envelopeKey !== key) {
        sampleOKLChHueSweepBoundaryInto(
            sweep.start,
            sweep.end,
            envelope,
            COLUMNS,
            HUE_STEPS,
        );
        envelopeKey = key;
        axisQuantum.value = nextAxisQuantum(axisQuantum.value, envelope.cuspCMax);
    }
    if (!inks) {
        probe ??= createInkProbe(host);
        inks = probe.resolve();
    }

    // Ease the displayed axis toward the settled rung; keep painting frames
    // until it lands (the field rescale keeps C-coordinates true throughout).
    const target = axisQuantum.value;
    if (Math.abs(target - axisShown) > 1e-3) {
        axisShown += (target - axisShown) * AXIS_EASE;
        if (Math.abs(target - axisShown) <= 1e-3) axisShown = target;
    } else {
        axisShown = target;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const fKey = `${hue}:${key}:${target}:${width}x${height}@${dpr}`;
    if (fieldKey !== fKey) {
        paintEnvelopeField(
            fieldCanvas,
            width,
            height,
            dpr,
            hue,
            envelope,
            target,
        );
        fieldKey = fKey;
    }

    paintEnvelopePlate(canvas, {
        width,
        height,
        dpr,
        envelope,
        axisCMax: axisShown,
        fieldAxisCMax: target,
        field: fieldCanvas,
        inks,
        points,
        stops: stopPoints,
        selectedId,
    });

    if (axisShown !== target) schedule();
}

function schedule() {
    rafId ??= requestAnimationFrame(paint);
}

watch(
    () => [points, stopPoints, hue, sweep, selectedId],
    schedule,
    { deep: false },
);

onMounted(() => {
    const host = hostRef.value;
    if (!host) return;

    ro = new ResizeObserver((entries) => {
        const rect = entries[0]?.contentRect;
        if (!rect) return;
        size.value = { width: rect.width, height: rect.height };
        schedule();
    });
    ro.observe(host);

    // Scheme flips re-resolve the token inks (the spectrum-plate idiom).
    classObs = new MutationObserver(() => {
        inks = null;
        schedule();
    });
    classObs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });

    schedule();
});

onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    ro?.disconnect();
    classObs?.disconnect();
    probe?.dispose();
});
</script>

<template>
    <!-- T.W3-1 (D1 rung-2 WELL, Q4-defaulted): the plate DROPS to the well —
         an opaque tone-step of the host; the nested-protagonist double-stamp
         (a full `shadow-card` cartoon rung inside a host plate) dies (T-18,
         t-card-material RC-2). `paper-grain-overlay` (W5-10) survives on its
         own rationale: dither over the page's banding-prone smooth field
         (S-15-B) — a paint-quality register, not a material stamp. -->
    <div
        ref="hostRef"
        class="relative h-28 sm:h-32 rounded-card border border-card-edge bg-well overflow-hidden paper-grain-overlay"
        role="img"
        :aria-label="`Perceived-space plate: OKLCH gamut envelope across hues ${hueLabel} with the gradient's trajectory and stops`"
    >
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
        <!-- The instrument states its conditions — space · swept hues · axis.
             The chip carries the plate's paper as backing: the reservation
             law (t-gradient-surfaces §3) — legible over field and netting at
             every axis, never a coincidence of where the tip parks. -->
        <span
            class="absolute top-1.5 right-2 fira-code text-mono-caption text-muted-foreground pointer-events-none select-none rounded-input bg-well/90 px-1.5 py-0.5"
        >
            oklch · {{ hueLabel }} · {{ axisLabel }}
        </span>
    </div>
</template>
