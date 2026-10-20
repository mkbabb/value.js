<script setup lang="ts">
/**
 * EasingAuthoringStage (T.W6-3 / T-47) — the authoring half of the kf BG-8
 * division: the glass-ui <EasingPicker> (bezier drag / steps n+term) seated
 * as a flat WELL at gradient-interval scale. The strip selects; THIS stage
 * authors. One instance per specimen row, alive from birth and bound
 * directly to the interval's complete authored value.
 *
 * The seat imposes three laws on the consumed producer chrome
 * (t-easing-pane §2/§3, census CC-4 — each recorded on the P7
 * EasingPicker-v2 packet; the overrides retire at the adopt):
 * 1. ONE column — the `lg:` 18rem chrome rail starves the canvas inside a
 *    ~430px pane row (a viewport breakpoint driving a container-seated
 *    component).
 * 2. Wells, not cards — the hardcoded `.glass-card` internals become flat
 *    opaque tone-steps of the plate: zero drop shadow, zero
 *    backdrop-filter; both schemes ride the SAME paper register.
 * 3. Zero letterbox (O-17) — the canvas sizes by ONE law: inline-size
 *    driven, aspect ≡ the LIVE viewBox ratio (`--vb-ratio`, synced from
 *    the DOM attribute — never re-derived curve math), no fixed
 *    block-size. The drawn plot IS the element box.
 *
 * `:playback="false"` keeps the producer's travel dot (parks ON the
 * endpoint — L7) and the R8-17 `btn-pill`×`glass-btn` blob OFF the
 * surface. The producer prints the row's one literal itself while the stage
 * is open (see GradientEasingEditor's readout-rail note).
 */
import { onMounted, ref, useTemplateRef } from "vue";
import { useMutationObserver } from "@vueuse/core";
import { EasingPicker } from "@mkbabb/glass-ui/easing";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";

const { value, label } = defineProps<{
    /** The interval truth; Glass owns exact two-way authoring. */
    value: EasingPickerValue;
    /** A11y label for the canvas. */
    label: string;
}>();

const emit = defineEmits<{
    authored: [value: EasingPickerValue | undefined];
}>();

// ── The zero-letterbox law: --vb-ratio ≡ the live viewBox h/w ──
const rootEl = useTemplateRef<HTMLElement>("rootEl");
const vbRatio = ref(1.2); // linear's padded box (1 + 2·VIEW_PAD)

/**
 * The producer's curve canvas, found by the accessible name THIS seat gives it
 * (`:label` → the svg's `aria-label`) — the seat's own name, never the
 * producer's role, which is not the seat's contract. The role census is a
 * measured fact held by `demo/test/gradient/ss8-b21-cures.test.ts` (SS8-0612).
 */
function canvasSvg(): SVGSVGElement | null {
    return (
        rootEl.value?.querySelector<SVGSVGElement>(
            `svg[aria-label="${CSS.escape(label)}"]`,
        ) ?? null
    );
}

function syncVbRatio() {
    const vb = canvasSvg()?.viewBox.baseVal;
    if (!vb || vb.width <= 0 || vb.height <= 0) return;
    vbRatio.value = vb.height / vb.width;
}

// The ratio is read when the attribute it mirrors CHANGES (X-W6 · X.W6.e — e2).
// It used to be read one animation frame after every emission and every
// external model change: two animation-frame callbacks that were not a
// clock but a guess at WHEN the producer's svg would carry its new viewBox.
// Observing the viewBox attribute itself (and the svg's replacement, on a
// regime flip) reads it exactly when it moves — no frame callback, nothing to
// gate under reduced motion, and no emission path that can forget to re-sync.
function onAuthored(v: EasingPickerValue | undefined) {
    emit("authored", v);
}

onMounted(syncVbRatio);
useMutationObserver(rootEl, syncVbRatio, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["viewBox"],
});
</script>

<template>
    <div
        ref="rootEl"
        class="easing-authoring"
        :style="{ '--vb-ratio': vbRatio }"
    >
        <EasingPicker
            :model-value="value"
            :playback="false"
            :label="label"
            @update:model-value="onAuthored"
        />
    </div>
</template>

<style scoped>
/* Law 1 — one column: the 18rem chrome rail dies at this seat. Held BY
 * CONSTRUCTION since glass 10.1.0 (X.W7L.m `c8a4959dd`): the EasingPicker root
 * is a single `flex flex-col` (`[data-slot="easing-picker"]`), with no grid
 * rail to collapse, so the seat's former `[data-testid]` grid override (a
 * hook 10.1.0 no longer emits) is retired (X-W12U .q2). */

/* Law 2 — wells, not cards (nothing live sits behind an in-plate fixture).
 * The hook is the picker root's own `[data-slot="easing-picker"]`: at glass
 * 10.1.0 the root wears `glass-resting` and no `.glass-card` exists, so the
 * former `.glass-card` selector matched nothing and the well painted as a
 * resting card with its rim shadow (X-W12U .q2, o17 :152 falsifier). */
.easing-authoring :deep([data-slot="easing-picker"]) {
    /* The well is a surface nested one inset inside the interval row, so it
       takes the panel register's INNER radius (X-W6 · X.W6.d — d1), inherited
       from `.easing-panel` — never a second card-scale corner on a card-scale
       surface one inset apart. */
    border-radius: var(--easing-radius-inner);
    background: var(--well-bg);
    border: 1px solid var(--card-edge);
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

/* Law 3 — zero letterbox: aspect rides the live viewBox; the producer's
 * inline fixed-clamp carries the specificity, so the seat overrides carry
 * !important (retired at the P7 adopt).
 *
 * X-DS value pass 14 (V14C-01): the 19rem cap sizes the box the plot's layers
 * SHARE, not one layer. The producer's canvas wrapper (the picker root's first
 * child, `relative`) holds the curve (`[data-slot=easing-curve]`, which also
 * positions the 0/1 axis labels) and the absolute `easing-handles` overlay
 * (`inset-0`). Capping only the labelled svg drew one component in two boxes at
 * 1440: the plot 304px wide, the handles and the "1" laid out on the 426px
 * wrapper. Capped here, the curve's svg fills the wrapper at `w-full`, and the
 * handles, the labels and the plot are one box at every width.
 * Pass 15 (V15C-01): the capped box centres in the well, on the axis of the
 * full-width controls below it (one rule; the layers move together). */
.easing-authoring :deep([data-slot="easing-picker"] > div:has(> [data-slot="easing-curve"])) {
    inline-size: min(100%, 19rem);
    margin-inline: auto;
}
.easing-authoring :deep(svg[aria-label]) {
    block-size: auto !important;
    aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
}

/* The liquid morph (T-48 bar): a regime flip (linear → back → steps)
 * re-shapes the live viewBox — the canvas EASES to its new ratio instead of
 * lurching the layout below. PRM is honoured STRUCTURALLY (X-W6 · X.W6.e —
 * e2): the motion is declared only where motion is wanted, so a reduced-motion
 * reader gets the new ratio at once without leaning on the global guard. */
@media (prefers-reduced-motion: no-preference) {
    .easing-authoring :deep(svg[aria-label]) {
        transition: aspect-ratio var(--duration-normal) var(--ease-standard);
    }
}
</style>
