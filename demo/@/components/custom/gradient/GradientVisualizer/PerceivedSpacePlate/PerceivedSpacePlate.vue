<script setup lang="ts">
/**
 * PerceivedSpacePlate (S.W5-8 / P1-6) — the gradient page's hero: an OKLCH
 * L×C slice at the ramp's running hue, painted like the picker's spectrum
 * plate, with the coalesced ramp inked as a trajectory and the stops sitting
 * ON the path. Replaces the old aria-hidden hero preview — the duplicated
 * hero/stop-bar pair dissolves (P2-16); the gradient itself renders on the
 * editing rail, the PERCEPTION of it renders here.
 *
 * The demo owns paint + scheduling; geometry is library-owned:
 * `sampleOKLChSliceBoundary(Into)` (the S.W1-6 sampler — the allocating call
 * once, the zero-alloc `Into` twin on every hue change), inks from the
 * `--gamut-*` tokens via the ONE probe home (`@lib/gamut-ink`).
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
    sampleOKLChSliceBoundary,
    sampleOKLChSliceBoundaryInto,
} from "@mkbabb/value.js/color";
import type { OKLChSliceBoundary } from "@mkbabb/value.js/color";
import { cancelAnimationFrame, requestAnimationFrame } from "@mkbabb/value.js";
import { createInkProbe, DPR_CAP } from "@lib/gamut-ink";
import type { ResolvedInks } from "@lib/gamut-ink";
import { paintPerceivedSpacePlate, paintSliceField } from "./perceivedSpacePaint";
import type { RampPoint, StopPoint } from "../../composables/usePerceivedRamp";

const COLUMNS = 96; // the validated geometry default (boundary-api §2)

const { points, stopPoints, hue, selectedId = null } = defineProps<{
    points: RampPoint[];
    stopPoints: StopPoint[];
    /** The running hue (deg) — always finite (usePerceivedRamp guarantees). */
    hue: number;
    selectedId?: string | null;
}>();

const hostRef = useTemplateRef<HTMLDivElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

const hueLabel = computed(() => `H ${Math.round(((hue % 360) + 360) % 360)}°`);

// ── Library geometry: one seed allocation, the Into twin thereafter ──
const boundary: OKLChSliceBoundary = sampleOKLChSliceBoundary(hue, COLUMNS);
let boundaryHue = hue;

// ── Ink probe (the one home) — cached per scheme ──
let probe: ReturnType<typeof createInkProbe> | null = null;
let inks: ResolvedInks | null = null;
let classObs: MutationObserver | null = null;

// ── The device-resolution field raster (repainted on hue/size/dpr change) ──
const fieldCanvas = document.createElement("canvas");
let fieldKey = "";

// ── Size cache (ResizeObserver-fed; the draw path never reflows) ──
const size = ref({ width: 0, height: 0 });
let ro: ResizeObserver | null = null;

// ── rAF-coalesced paint scheduling (P2-19 discipline for the new surface) ──
let rafId: number | null = null;

function paint() {
    rafId = null;
    const canvas = canvasRef.value;
    const host = hostRef.value;
    if (!canvas || !host) return;
    const { width, height } = size.value;
    if (width < 4 || height < 4) return;

    if (boundaryHue !== hue) {
        sampleOKLChSliceBoundaryInto(hue, boundary, COLUMNS);
        boundaryHue = hue;
    }
    if (!inks) {
        probe ??= createInkProbe(host);
        inks = probe.resolve();
    }
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
    const key = `${hue}:${width}x${height}@${dpr}`;
    if (fieldKey !== key) {
        paintSliceField(fieldCanvas, width, height, dpr, hue, boundary);
        fieldKey = key;
    }

    paintPerceivedSpacePlate(canvas, {
        width,
        height,
        dpr,
        hueDeg: hue,
        boundary,
        field: fieldCanvas,
        inks,
        points,
        stops: stopPoints,
        selectedId,
    });
}

function schedule() {
    rafId ??= requestAnimationFrame(paint);
}

watch(
    () => [points, stopPoints, hue, selectedId],
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
        :aria-label="`Perceived-space plate: OKLCH lightness–chroma slice at hue ${Math.round(hue)} degrees with the gradient's trajectory and stops`"
    >
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
        <!-- The instrument states its conditions: the slice's running hue. -->
        <span
            class="absolute top-1.5 right-2 fira-code text-mono-caption text-muted-foreground pointer-events-none select-none"
        >
            oklch · {{ hueLabel }}
        </span>
    </div>
</template>
