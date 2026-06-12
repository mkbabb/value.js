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
                        <template v-if="isAdminAuthenticated">
                            Admin <span class="uppercase admin-golden-text">Palettes</span>
                        </template>
                        <template v-else>
                            Color
                            <span class="uppercase pastel-rainbow-text"
                                >Palettes</span
                            >
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
/* Admin golden shimmer */
.admin-golden-text {
    background-image: linear-gradient(to right, var(--color-gold), var(--color-gold-light), var(--color-gold));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

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
    /* E.W4 Lane E: tokenize 3s shimmer to glass-ui canon `--duration-shimmer-fast`. */
    animation: golden-shimmer var(--duration-shimmer-fast) ease-in-out infinite;
    pointer-events: none;
    mix-blend-mode: overlay;
}

/* `.pastel-rainbow-text` lifted to the shared @styles/utils.css recipe at
 * N.W5.E — scoped here could never reach its PalettesPane / DockViewSelect
 * consumers (inv-N-7). */
</style>
