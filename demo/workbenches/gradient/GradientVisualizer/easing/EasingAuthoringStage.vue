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
 * surface; `:readout="false"` keeps the row's literal in exactly ONE
 * place (the parent's readout rail — the one-literal law).
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
 * (`:label` → the svg's `aria-label`). It used to be found by `role="img"`; the
 * installed producer (glass 7.0.0) renders the canvas as `role="group"`, so that
 * selector matched nothing, the ratio never synced, and every Law-3 rule below
 * was dead (X-W6 · X.W6.e: found while removing the rAF sites, which were
 * re-reading a node that was not there).
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
/* Law 1 — one column: the 18rem chrome rail dies at this seat. */
.easing-authoring :deep([data-testid="easing-picker"]) {
    grid-template-columns: 1fr;
}

/* Law 2 — wells, not cards (nothing live sits behind an in-plate fixture). */
.easing-authoring :deep(.glass-card) {
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
 * !important (retired at the P7 adopt). */
.easing-authoring :deep(svg[aria-label]) {
    inline-size: min(100%, 19rem);
    block-size: auto !important;
    aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
    margin-inline: 0 !important;
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
