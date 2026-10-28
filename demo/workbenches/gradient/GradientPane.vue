<script setup lang="ts">
import { useTemplateRef } from "vue";
import PaneShell from "../../shell/PaneShell.vue";
import type { GradientSceneTarget } from "../../color-session/keys";
import GradientVisualizer from "./GradientVisualizer/GradientVisualizer.vue";

// X-W6 · X.W6.a — the DEAD INJECTION is gone. This pane injected
// `CSS_COLOR_KEY` with a non-null assertion and never read it: an unused
// `inject(..)!` is a boot-order hazard with no consumer, and its assertion
// would have turned a missing provider into a silent `undefined` rather than
// the loud failure the key's owner intends.
const visualizerRef =
    useTemplateRef<InstanceType<typeof GradientVisualizer>>("gradientVisualizer");

/**
 * X-W6 · X.W6.j (the Gradient PILOT, CC-056 · V·L3) — the pane adopts the
 * scene contract it registers under: X-W4's typed `GradientSceneTarget`, read
 * by `usePaneRouter.readScenePaneTarget("gradient", …)` and rendered as the
 * dock's three seats. The expose is checked against that type (`satisfies`),
 * and each command calls its visualizer member DIRECTLY: the retired
 * `visualizerRef.value?.resetGradient?.()` spelling made a renamed member a
 * seat that reads `ready` and does nothing — the dead-button species the
 * router's typed read exists to refuse. The visualizer is this pane's own
 * child, so an unmounted one is a defect, and it THROWS into the contract's
 * dispatcher (`SceneActionState` `failed`, announced) instead of going quiet.
 */
function visualizer(): InstanceType<typeof GradientVisualizer> {
    const v = visualizerRef.value;
    if (v === null) throw new Error("the Gradient visualizer is not mounted");
    return v;
}

defineExpose({
    reset: () => visualizer().resetGradient(),
    copyCSS: () => visualizer().copyCSS(),
    seedFromPalette: () => visualizer().seedFromPalette(),
} satisfies GradientSceneTarget);
</script>

<template>
    <PaneShell title="Gradient" description="Build gradients with per-interval easing and CSS output.">
        <!-- A2-VA-L1-1: the one pane shell. -->
        <GradientVisualizer ref="gradientVisualizer" />
    </PaneShell>
</template>
