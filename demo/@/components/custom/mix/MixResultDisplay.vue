<script setup lang="ts">
import { Copy, Check, Save, RotateCcw } from "@lucide/vue";
import { DockIconButton, DockSeparator } from "@mkbabb/glass-ui/dock";
import { computed, ref, TransitionGroup } from "vue";
import { copyToClipboard } from "@mkbabb/glass-ui";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import type { MixResult } from "./composables/useMixingState";

/**
 * The result plate — the DESTINATION of the mix convergence (S.W3-6 / Q10).
 *
 * While the drops are in flight (`ghost`) the plate stands as the announced
 * destination: the specimen-plate grammar at reduced presence, holding the
 * awaiting well — a seeded WatercolorDot GHOST (`[data-mix-target]`, the
 * anchor the canvas convergence lands on). On settle the ghost flips live and
 * the SAME seed fills in: the silhouette the pigment poured into is the
 * silhouette the result wears. The swap rides `vj-morph` (one surface, new
 * content — the family law).
 */
const { result, ghost = false } = defineProps<{
    result: MixResult;
    ghost?: boolean;
}>();

const emit = defineEmits<{
    save: [];
    reset: [];
}>();

const copied = ref(false);

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
    await copyToClipboard(text);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 1500);
}
</script>

<template>
    <div
        class="mix-plate flex flex-col gap-3 p-4 rounded-xl glass-floating"
        :class="{ 'mix-plate--ghost': ghost }"
    >
        <span class="font-display text-caption font-bold text-muted-foreground uppercase tracking-wide">Result</span>

        <Transition name="vj-morph" mode="out-in">
            <!-- The awaiting well: the convergence target, announced before
                 the drops arrive. Same seed as the landed dot — one shape. -->
            <div v-if="ghost" key="well" class="flex items-center gap-3">
                <WatercolorDot
                    :color="wellColor"
                    variant="ghost"
                    tag="div"
                    seed="mix-result"
                    data-mix-target
                    class="shrink-0"
                    :class="result.type === 'color' ? 'w-14 h-14' : 'w-10 h-10'"
                    aria-hidden="true"
                />
            </div>

            <div v-else key="content" class="flex flex-col gap-3">
                <!-- Single color result -->
                <div v-if="result.type === 'color' && result.css" class="flex items-center gap-3">
                    <WatercolorDot
                        :color="result.css"
                        tag="div"
                        class="w-14 h-14 shrink-0"
                        seed="mix-result"
                    />
                    <span class="text-mono-small text-foreground select-all break-all">
                        {{ result.css }}
                    </span>
                </div>

                <!-- Palette result -->
                <template v-if="result.type === 'palette' && result.colors">
                    <TransitionGroup
                        name="vj-enter"
                        tag="div"
                        class="swatch-row flex flex-wrap gap-2"
                    >
                        <WatercolorDot
                            v-for="(color, i) in result.colors"
                            :key="i"
                            :color="color.css"
                            tag="div"
                            class="w-10 h-10 shrink-0"
                            :title="color.css"
                            :seed="i === 0 ? 'mix-result' : `mix-result-${i}`"
                        />
                    </TransitionGroup>
                    <!-- Gradient preview (decorative) -->
                    <!-- W5-a11y: gradient strip is decorative -->
                    <div
                        class="h-4 rounded-full overflow-hidden"
                        :style="{
                            background: `linear-gradient(to right, ${result.colors.map(c => c.css).join(', ')})`,
                        }"
                        aria-hidden="true"
                        role="presentation"
                    />
                </template>

                <!-- Actions -->
                <div class="flex items-center gap-1">
                    <DockIconButton
                        compact
                        :title="copied ? 'Copied!' : 'Copy color'"
                        @click="onCopy"
                    >
                        <component :is="copied ? Check : Copy" class="w-5 h-5" />
                    </DockIconButton>
                    <DockIconButton
                        compact
                        title="Save to palettes"
                        @click="emit('save')"
                    >
                        <Save class="w-5 h-5" />
                    </DockIconButton>
                    <DockSeparator />
                    <DockIconButton
                        compact
                        title="Reset"
                        @click="emit('reset')"
                    >
                        <RotateCcw class="w-5 h-5" />
                    </DockIconButton>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* The destination at reduced presence while the drops are in flight; full
 * presence as the pool dissolves into the inked plate. */
.mix-plate {
    transition: opacity var(--duration-fast) var(--ease-standard);
}
.mix-plate--ghost {
    opacity: 0.55;
}
</style>
