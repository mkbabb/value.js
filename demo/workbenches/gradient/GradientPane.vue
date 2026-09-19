<script setup lang="ts">
import { ref } from "vue";
import { Card } from "../../ui/card";
import PaneHeader from "../../shared/ui/PaneHeader.vue";
import GradientVisualizer from "./GradientVisualizer/GradientVisualizer.vue";

// X-W6 · X.W6.a — the DEAD INJECTION is gone. This pane injected
// `CSS_COLOR_KEY` with a non-null assertion and never read it: an unused
// `inject(..)!` is a boot-order hazard with no consumer, and its assertion
// would have turned a missing provider into a silent `undefined` rather than
// the loud failure the key's owner intends.
const visualizerRef = ref<InstanceType<typeof GradientVisualizer> | null>(null);

defineExpose({
    reset: () => visualizerRef.value?.resetGradient?.(),
    copyCSS: () => visualizerRef.value?.copyCSS?.(),
    seedFromPalette: () => visualizerRef.value?.seedFromPalette?.(),
});
</script>

<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card tier="resting" class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
            <PaneHeader description="Build gradients with per-interval easing and CSS output.">
                Gradient
            </PaneHeader>
            <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2">
                <GradientVisualizer ref="visualizerRef" />
            </div>
        </Card>
    </div>
</template>
