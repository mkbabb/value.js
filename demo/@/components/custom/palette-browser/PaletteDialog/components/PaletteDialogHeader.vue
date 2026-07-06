<template>
    <div class="shrink-0">
        <!-- Thick accent bar at top -->
        <div
            class="h-6 w-full"
            :style="{
                background: `linear-gradient(to right, ${cssColorOpaque}, ${cssColor})`,
            }"
        ></div>
        <div
            class="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3"
        >
            <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                <!-- Color swatch dot -->
                <!-- W5-a11y: swatch button needs accessible name -->
                <WatercolorDot
                    :color="isAdminAuthenticated ? 'var(--color-gold)' : cssColorOpaque"
                    :class="[
                        'w-10 sm:w-12 aspect-square shrink-0 cursor-pointer',
                        isAdminAuthenticated && 'admin-golden',
                    ]"
                    animate
                    tag="button"
                    :title="cssColorOpaque"
                    :aria-label="isAdminAuthenticated ? 'Admin palette header' : `Current color ${cssColorOpaque}`"
                    @click="$emit('dotClick')"
                />
                <div class="min-w-0">
                    <DialogTitle
                        class="font-display text-title sm:text-display-2 font-black tracking-tight"
                    >
                        <!-- S.W7-7: the admin headline consumes the producer's
                             ONE gold register (glass-ui `.gold-shimmer`); the
                             local static `.admin-golden-text` gradient fork is
                             retired. -->
                        <template v-if="isAdminAuthenticated">
                            Admin <span class="uppercase gold-shimmer">Palettes</span>
                        </template>
                        <template v-else>
                            <!-- S.W5-7 (Q4 EXCISE): ink, not candy ramp. -->
                            Color
                            <span class="uppercase">Palettes</span>
                        </template>
                    </DialogTitle>
                    <DialogDescription
                        class="text-mono-small text-muted-foreground italic mt-0.5"
                    >
                        Save, browse, and publish color palettes.
                    </DialogDescription>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DialogTitle, DialogDescription } from "@components/ui/dialog";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";

defineProps<{
    cssColor: string;
    cssColorOpaque: string;
    isAdminAuthenticated: boolean;
}>();

defineEmits<{
    dotClick: [];
}>();
</script>

<style scoped>
/* Admin golden shimmer — S.W7-7 (god-module census §2.2, one gold voice):
 * the TEXT half consumes glass-ui's `.gold-shimmer` register (template);
 * the BOX sheen below keeps its distinct overlay geometry but rides the
 * producer's `metal-shimmer-sweep` keyframe — the former `golden-shimmer`
 * keyframe was NEVER DEFINED anywhere in the tree (a silent no-op since
 * the E.W4 tokenize pass; verified by grep over demo + glass-ui src/dist),
 * so this is a defined-or-removed cure via the ONE producer clock, not a
 * new demo keyframe. */
.admin-golden {
    position: relative;
}
.admin-golden::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(135deg, transparent 20%, oklch(85% 0.15 85deg / 0.4) 40%, oklch(90% 0.12 55deg / 0.6) 50%, oklch(85% 0.15 85deg / 0.4) 60%, transparent 80%);
    background-size: 200% 200%;
    pointer-events: none;
    mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: no-preference) {
    .admin-golden::after {
        animation: metal-shimmer-sweep var(--duration-shimmer-fast) ease-in-out infinite;
    }
}

/* `.pastel-rainbow-text` EXCISED at S.W5-7 (Q4 RATIFIED EXCISE) — the
 * title speaks ink; see @styles/utils.css for the excise record. */
</style>
