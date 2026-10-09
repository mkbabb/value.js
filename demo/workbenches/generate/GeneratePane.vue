<script setup lang="ts">
import { inject, ref } from "vue";
import PaneShell from "../../shell/PaneShell.vue";
import GenerateControls from "./GenerateControls.vue";
import { LIBRARY_PORT_KEY } from "../../palettes/usePalettePorts";
import { CSS_COLOR_KEY } from "../../color-session/keys";
import type { PaletteColor } from "../../palettes/types";

const cssColorOpaque = inject(CSS_COLOR_KEY)!;
const pm = inject(LIBRARY_PORT_KEY)!;
const controlsRef = ref<InstanceType<typeof GenerateControls> | null>(null);

// X.W12.u2 (UIA-V-42): the save carries the plate's own name (GenerateControls
// emits it); the dock's generate.save routes through the same emit.
function onSave(colors: string[], name: string) {
    const paletteColors: PaletteColor[] = colors.map((css, i) => ({
        css,
        position: i,
    }));
    pm.createPalette(name.trim() || "Generated Palette", paletteColors);
}

defineExpose({
    regenerate: () => controlsRef.value?.regenerate?.(),
    save: () => controlsRef.value?.save?.(),
    copyColors: () => controlsRef.value?.copyColors?.(),
});
</script>

<template>
    <PaneShell title="Generate" description="Create pleasing random palettes with aesthetic presets.">
        <!-- A2-VA-L1-1: the one pane shell. -->
        <GenerateControls ref="controlsRef" @save="onSave" />
    </PaneShell>
</template>
