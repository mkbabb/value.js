<script setup lang="ts">
import { inject, computed } from "vue";
import { Card } from "@components/ui/card";
import PaneHeader from "./PaneHeader.vue";
import MixSourceSelector from "@components/custom/mix/MixSourceSelector.vue";
import MixConfigBar from "@components/custom/mix/MixConfigBar.vue";
import MixResultDisplay from "@components/custom/mix/MixResultDisplay.vue";
import MixAnimationCanvas from "@components/custom/mix/MixAnimationCanvas/MixAnimationCanvas.vue";
import { useMixingState } from "@components/custom/mix/composables/useMixingState";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import { CSS_COLOR_KEY } from "@composables/color/keys";
import { copyToClipboard } from "@mkbabb/glass-ui";
import type { PaletteColor } from "@lib/palette/types";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(PALETTE_MANAGER_KEY)!;

const {
    mode,
    selectedColors,
    selectedPalettes,
    colorSpace,
    hueMethod,
    leftoverStrategy,
    mixResult,
    animationPhase,
    canMix,
    addColor,
    removeColor,
    addPalette,
    removePalette,
    startMix,
    settleMix,
    reset,
    clearSelection,
} = useMixingState();

function onSave() {
    if (!mixResult.value) return;

    if (mixResult.value.type === "color" && mixResult.value.css) {
        const colors: PaletteColor[] = [{ css: mixResult.value.css, position: 0 }];
        pm.createPalette("Mixed Color", colors);
    } else if (mixResult.value.type === "palette" && mixResult.value.colors) {
        pm.createPalette("Mixed Palette", mixResult.value.colors);
    }
}

async function copyResult() {
    if (!mixResult.value) return;
    const text = mixResult.value.type === "color"
        ? mixResult.value.css ?? ""
        : mixResult.value.colors?.map((c) => c.css).join(", ") ?? "";
    await copyToClipboard(text);
}

defineExpose({ clearSelection, startMix, copyResult });
</script>

<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card tier="resting" class="relative pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full">
            <!-- The mix convergence overlay (S.W3-6 / Q10): drops from the
                 selected chips arc to the result plate's awaiting well. Its
                 rAF timeline is the ONE clock; @settled is the phase
                 machine's only forward edge. -->
            <MixAnimationCanvas
                :phase="animationPhase"
                :result="mixResult"
                :space="colorSpace"
                :hue-method="hueMethod"
                @settled="settleMix"
            />

            <PaneHeader description="Mix colors and palettes together.">
                Mix
            </PaneHeader>
            <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2">
                <!-- Source selection -->
                <MixSourceSelector
                    :mode="mode"
                    :selected-colors="selectedColors"
                    :selected-palettes="selectedPalettes"
                    :css-color-opaque="cssColorOpaque"
                    @update:mode="(v) => mode = v"
                    @add-color="addColor"
                    @remove-color="removeColor"
                    @add-palette="addPalette"
                    @remove-palette="removePalette"
                />

                <!-- Mixing controls -->
                <MixConfigBar
                    v-model:color-space="colorSpace"
                    v-model:hue-method="hueMethod"
                    v-model:leftover-strategy="leftoverStrategy"
                    :show-leftover-strategy="mode === 'palettes'"
                    :can-mix="canMix"
                    @mix="startMix"
                />

                <!-- Result plate — mounts GHOSTED the moment the mix starts
                     (the announced destination the convergence lands on);
                     inks in on the canvas clock's settle. No spinner row:
                     the animation IS the progress (Q10). -->
                <Transition name="vj-morph" mode="out-in">
                    <MixResultDisplay
                        v-if="mixResult"
                        :result="mixResult"
                        :ghost="animationPhase === 'mixing'"
                        @save="onSave"
                        @reset="reset"
                    />
                </Transition>
            </div>
        </Card>
    </div>
</template>
