<template>
    <div class="shrink-0">
        <!-- Thick accent bar at top -->
        <div
            class="h-3 w-full"
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
