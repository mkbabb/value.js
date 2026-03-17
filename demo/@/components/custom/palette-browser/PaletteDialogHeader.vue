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
                <WatercolorDot
                    :color="isAdminAuthenticated ? '#D4AF37' : cssColorOpaque"
                    :class="[
                        'w-10 sm:w-12 aspect-square shrink-0 cursor-pointer',
                        isAdminAuthenticated && 'admin-golden',
                    ]"
                    animate
                    tag="button"
                    :title="cssColorOpaque"
                    @click="$emit('dotClick')"
                />
                <div class="min-w-0">
                    <DialogTitle
                        class="fraunces text-3xl sm:text-5xl font-black tracking-tight"
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
                        class="fira-code text-xs sm:text-sm text-muted-foreground italic mt-0.5"
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
import { WatercolorDot } from "@components/custom/watercolor-dot";

defineProps<{
    cssColor: string;
    cssColorOpaque: string;
    isAdminAuthenticated: boolean;
}>();

defineEmits<{
    dotClick: [];
}>();
</script>

<style>
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
    animation: golden-shimmer 3s ease-in-out infinite;
    pointer-events: none;
    mix-blend-mode: overlay;
}

@keyframes golden-shimmer {
    0%, 100% { background-position: 100% 100%; }
    50% { background-position: 0% 0%; }
}

/* Pastel rainbow gradient for palette title */
.pastel-rainbow-text {
    background-image: linear-gradient(
        to right,
        oklch(75% 0.18 0deg),
        oklch(82% 0.16 60deg),
        oklch(85% 0.17 130deg),
        oklch(78% 0.14 200deg),
        oklch(72% 0.18 270deg),
        oklch(75% 0.16 330deg)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
