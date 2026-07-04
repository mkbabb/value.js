<template>
    <TabsContent value="extract" class="mt-0 w-full palette-tab-content" force-mount>
        <!-- The T20 collapse (R.W4 Lane E): the dialog tab is a thin shell
             over the ONE extract workbench (capabilities unified — this
             surface gains the eyedropper; the pane gains the camera). -->
        <ExtractWorkbench
            class="pb-4"
            layout="split"
            @pick="onPick"
            @add-color="(css) => emit('addColor', css)"
        />
    </TabsContent>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { TabsContent } from "reka-ui";
import ExtractWorkbench from "./ExtractWorkbench.vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";

const emit = defineEmits<{
    apply: [colors: string[]];
    addColor: [css: string];
}>();

const pm = inject(PALETTE_MANAGER_KEY, null);

function onPick(css: string) {
    pm?.emitSetCurrentColor(css);
}
</script>
