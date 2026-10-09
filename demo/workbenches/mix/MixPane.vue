<script setup lang="ts">
import { inject, computed } from "vue";
import PaneShell from "../../shell/PaneShell.vue";
import MixSourceSelector from "./MixSourceSelector.vue";
import MixConfigBar from "./MixConfigBar.vue";
import MixResultDisplay from "./MixResultDisplay.vue";
import MixAnimationCanvas from "./MixAnimationCanvas/MixAnimationCanvas.vue";
import { useMixingState } from "./composables/useMixingState";
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import type { MixSceneTarget } from "../../color-session/keys";
import { writeClipboard } from "@mkbabb/glass-ui";
import type { PaletteColor } from "../../palettes/types";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(LIBRARY_PORT_KEY)!;

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
    await writeClipboard(text);
}

// X-W6 · X.W6.j (the Mix canary) — the pane's scene contract is X-W4's typed
// `MixSceneTarget`, checked here (`satisfies`) rather than discovered by the
// router's member probe at mount time: a renamed command is a compile error in
// this file, never a dock seat that reads `unavailable` at runtime.
defineExpose({ clearSelection, startMix, copyResult } satisfies MixSceneTarget);
</script>

<template>
    <PaneShell title="Mix" description="Mix colors and palettes together." seated follow>
        <!-- X.W12U.h · A2-VA-L3-5: the Mix companion follows the picker's row
             (shell.css row contract) and scrolls inside its own card.
             A2-VA-L1-1: the one pane shell.
             X-DS pass 8 (V3C-01/V3C-04): SEATED. The header sits above the
             port (no rest veil), and the mixing controls with the page's one
             verb sit in the shell's footer seat, below the port: when the
             sources outgrow the row they scroll, and Mix never does. -->
        <!-- The mix convergence overlay (S.W3-6 / Q10): drops from the
             selected chips arc to the result plate's awaiting well. Its rAF
             timeline is the ONE clock; @settled is the phase machine's only
             forward edge. It is a plate-level overlay, outside the scroll
             owner. -->
        <template #overlay>
            <MixAnimationCanvas
                :phase="animationPhase"
                :result="mixResult"
                :space="colorSpace"
                :hue-method="hueMethod"
                @settled="settleMix"
            />
        </template>

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
        <template #footer>
            <!-- Mixing controls. T.W6 · W6-4 (T-17): the operand colors
                 feed the Space/Hue preview ramps (colors mode only —
                 palettes mode passes [] so the rows carry no chip:
                 honest restraint, the column-wise palette mix has no
                 single ramp to preview). The seat carries the body's gutter
                 and the config pane's footer hairline (one footer grammar). -->
            <div class="flex-none px-4 sm:px-6 pt-3 pb-4 border-t border-border/35">
                <MixConfigBar
                    v-model:color-space="colorSpace"
                    v-model:hue-method="hueMethod"
                    v-model:leftover-strategy="leftoverStrategy"
                    :show-leftover-strategy="mode === 'palettes'"
                    :can-mix="canMix"
                    :operand-colors="mode === 'colors' ? selectedColors.map((sc) => sc.css) : []"
                    @mix="startMix"
                />
            </div>
        </template>
    </PaneShell>
</template>
