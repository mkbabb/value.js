<script setup lang="ts">
import { Copy, Check, Save, RotateCcw } from "@lucide/vue";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import { computed } from "vue";
import { useClipboard } from "@mkbabb/glass-ui/dom";
import { WatercolorDot } from "../../shared/ui/watercolor-dot";
import { CompactPalette, stopsToGradient } from "../../shared/ui/color-chips";
import type { MixResult } from "./composables/useMixingState";
import { formatCssCaption } from "../../color-session/format-color";

/**
 * The result plate — the DESTINATION of the mix convergence (S.W3-6 / Q10).
 *
 * While the drops are in flight (`ghost`) the plate stands as the announced
 * destination: the specimen-plate grammar at reduced presence, holding the
 * awaiting well — a seeded WatercolorDot GHOST (`[data-mix-target]`, the
 * anchor the canvas convergence lands on). On settle the ghost flips live and
 * the SAME seed fills in: the silhouette the pigment poured into is the
 * silhouette the result wears. The swap rides `vj-morph` (one surface, new
 * content — the family law): the content enters on it at the settle, and the
 * well, under the dissolving pool, has no leave beat (X·§0ht (d)).
 */
const { result, ghost = false } = defineProps<{
    result: MixResult;
    ghost?: boolean;
}>();

const emit = defineEmits<{
    save: [];
    reset: [];
}>();

// Glass 7: scope-owned confirmation state replaces the hand-rolled copy+timer.
const { status, copy } = useClipboard({ resetMs: 1500 });
const copied = computed(() => status.value === "success");

// The well wears the pigment that is about to land: the result color, or the
// palette's first swatch (the pool lands on slot 0 — spatially true).
const wellColor = computed(() =>
    result.type === "color"
        ? result.css ?? "var(--muted-foreground)"
        : result.colors?.[0]?.css ?? "var(--muted-foreground)",
);

async function onCopy() {
    const text = result.type === "color"
        ? result.css ?? ""
        : result.colors?.map((c) => c.css).join(", ") ?? "";
    await copy(text);
}
</script>

<template>
    <!-- T.W3-1 (D1 rung-2 WELL): an in-plate fixture — the floating-rung
         glass (heavier than its host, the RC-2 inversion) drops to the
         opaque well tone-step. -->
    <div
        class="mix-plate flex flex-col gap-3 p-4 rounded-xl bg-well"
        :class="{ 'mix-plate--ghost': ghost }"
    >
        <!-- X.W12.u2 (UIA-V-137): every Mix section head (Selected · From palettes · Result) speaks ONE voice; X-DS pass 1 (V1C-04) makes it the app's Fraunces section head. -->
        <h3 class="font-display text-subheading">Result</h3>

        <!-- X·§0ht (d): the swap has no leave beat (scoped style below), so
             the content mounts in the settle's own patch. Out-in, it waited
             for the well's leave: two frames and a transition, 2.2 s at
             550 ms frames, the CI-only mix.spec RED. -->
        <Transition name="vj-morph">
            <!-- The awaiting well: the convergence target, announced before
                 the drops arrive. Same seed as the landed dot — one shape. -->
            <div v-if="ghost" key="well" class="flex items-center gap-3">
                <!-- X.W12.u2: glass 7.0.0's WatercolorDot forwards only
                     class/style, so `data-mix-target` rides a host span the
                     dot fills — the convergence stage (mixStage.ts) reads it. -->
                <span
                    data-mix-target
                    class="inline-flex shrink-0"
                    :class="result.type === 'color' ? 'w-14 h-14' : 'w-10 h-10'"
                    aria-hidden="true"
                >
                    <WatercolorDot
                        :color="wellColor"
                        variant="ghost"
                        seed="mix-result"
                        class="w-full h-full"
                    />
                </span>
            </div>

            <div v-else key="content" class="flex flex-col gap-3">
                <!-- Single color result -->
                <div v-if="result.type === 'color' && result.css" class="flex items-center gap-3">
                    <WatercolorDot
                        :color="result.css"
                        class="w-14 h-14 shrink-0"
                        seed="mix-result"
                    />
                    <span class="text-mono-small text-foreground select-all break-all">
                        {{ formatCssCaption(result.css) }}
                    </span>
                </div>

                <!-- Palette result -->
                <template v-if="result.type === 'palette' && result.colors">
                    <!-- V-D3 · BC-PCS-10: the result's swatches are the ONE
                         compact render — one row, as many 40 px dots as the
                         plate holds, then `+k` (the retired row wrapped
                         without bound). The strip below paints every colour. -->
                    <CompactPalette
                        class="mix-result__swatches"
                        :colors="result.colors.map((c) => c.css)"
                        transition="vj-enter"
                    >
                        <template #swatch="{ color, index }">
                            <span class="inline-flex w-full h-full" :title="formatCssCaption(color)">
                                <WatercolorDot
                                    :color="color"
                                    class="w-full h-full"
                                    :seed="index === 0 ? 'mix-result' : `mix-result-${index}`"
                                />
                            </span>
                        </template>
                    </CompactPalette>
                    <!-- Gradient preview (decorative) -->
                    <!-- W5-a11y: gradient strip is decorative -->
                    <div
                        class="h-4 rounded-full overflow-hidden"
                        :style="{
                            background: stopsToGradient(result.colors.map((c) => c.css)) ?? undefined,
                        }"
                        aria-hidden="true"
                        role="presentation"
                    />
                </template>

                <!-- Actions -->
                <div class="flex items-center gap-1">
                    <DockControl
                        compact
                        :title="copied ? 'Copied!' : 'Copy color'"
                        @click="onCopy"
                    >
                        <component :is="copied ? Check : Copy" class="w-5 h-5" />
                    </DockControl>
                    <DockControl
                        compact
                        title="Save to palettes"
                        @click="emit('save')"
                    >
                        <Save class="w-5 h-5" />
                    </DockControl>
                    <DockSeparator />
                    <DockControl
                        compact
                        title="Reset"
                        @click="emit('reset')"
                    >
                        <RotateCcw class="w-5 h-5" />
                    </DockControl>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* X·§0ht (d) — THE WELL HAS NO LEAVE BEAT. The canvas pool dissolves over it
 * (MIX_EPILOGUE_MS), so the leaving well leaves the plate at once and the
 * inked content morphs in in its place: the plate never holds both. */
.mix-plate > .vj-morph-leave-active {
    display: none;
}
/* The destination at reduced presence while the drops are in flight; full
 * presence as the pool dissolves into the inked plate. */
.mix-plate {
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.mix-plate--ghost {
    opacity: 0.55;
}
/* The result's seats: 40 px dots on the 8 px row gap the wrap used. */
.mix-result__swatches {
    --compact-size: 2.5rem;
    --compact-step: 3rem;
}
</style>
