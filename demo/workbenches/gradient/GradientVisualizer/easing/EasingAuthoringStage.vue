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
import { onMounted, ref, useTemplateRef, watch } from "vue";
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

function syncVbRatio() {
    const vb = rootEl.value?.querySelector<SVGSVGElement>(
        "svg[role='img']",
    )?.viewBox.baseVal;
    if (!vb || vb.width <= 0 || vb.height <= 0) return;
    vbRatio.value = vb.height / vb.width;
}

// Every geometry change routes through an emission (drag / preset / steps /
// term) — sync after each, plus mount and external model changes.
function onAuthored(v: EasingPickerValue | undefined) {
    requestAnimationFrame(syncVbRatio);
    emit("authored", v);
}

onMounted(syncVbRatio);
watch(
    () => value.css,
    () => requestAnimationFrame(syncVbRatio),
    { flush: "post" },
);
</script>

<template>
    <div
        ref="rootEl"
        class="easing-authoring"
        :style="{ '--vb-ratio': vbRatio }"
    >
        <EasingPicker
            :model-value="value"
            :readout="false"
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
    background: var(--well-bg);
    border: 1px solid var(--card-edge);
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
}

/* Law 3 — zero letterbox: aspect rides the live viewBox; the producer's
 * inline fixed-clamp carries the specificity, so the seat overrides carry
 * !important (retired at the P7 adopt). */
.easing-authoring :deep(svg[role="img"]) {
    inline-size: min(100%, 19rem);
    block-size: auto !important;
    aspect-ratio: calc(1 / var(--vb-ratio, 1.2)) !important;
    margin-inline: 0 !important;
    /* The liquid morph (T-48 bar): a regime flip (linear → back → steps)
     * re-shapes the live viewBox — the canvas EASES to its new ratio
     * instead of lurching the layout below. The wrapper retains its prior
     * ratio while the rAF sync reads the updated live viewBox. The global PRM carve-out
     * (animations.css) neutralizes it under reduced motion. */
    transition: aspect-ratio var(--duration-normal) var(--ease-standard);
}
</style>
