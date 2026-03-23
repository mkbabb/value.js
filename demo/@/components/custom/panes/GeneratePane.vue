<script setup lang="ts">
import { inject, ref } from "vue";
import { Card } from "@components/ui/card";
import PaneHeader from "./PaneHeader.vue";
import GenerateControls from "@components/custom/generate/GenerateControls.vue";
import { PALETTE_MANAGER_KEY } from "@composables/usePaletteManager";
import { copyToClipboard } from "@composables/useClipboard";
import type { PaletteColor } from "@lib/palette/types";

defineProps<{
    cssColorOpaque?: string;
}>();

const pm = inject(PALETTE_MANAGER_KEY)!;
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);

function onSave(colors: string[]) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({
        css,
        position: i,
    }));
    pm.createPalette("Generated Palette", paletteColors);
}

defineExpose({
    regenerate: () => controlsRef.value?.regenerate?.(),
    save: () => controlsRef.value?.save?.(),
    copyColors: () => controlsRef.value?.copyColors?.(),
});
</script>

<template>
    <div class="relative w-full max-w-3xl lg:max-w-[var(--desktop-pane-max-w)] mx-auto h-full min-w-0">
        <Card class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full bg-card/75 backdrop-blur-sm">
            <PaneHeader description="Create pleasing random palettes with aesthetic presets.">
                Generate
            </PaneHeader>
            <div class="flex flex-col gap-4 pb-4 px-4 sm:px-6 pt-2">
                <GenerateControls ref="controlsRef" @save="onSave" />
            </div>
        </Card>
    </div>
</template>
