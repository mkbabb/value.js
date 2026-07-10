<template>
    <div class="relative w-full mx-auto h-full min-w-0">
        <Card
            tier="wash"
            :shadow="false"
            :grain="false"
            class="pane-scroll-fade w-full overflow-y-auto overflow-x-hidden min-w-0 h-full"
        >
            <PaneHeader description="Pull palettes from any image.">Extract</PaneHeader>
            <!-- The T20 collapse (R.W4 Lane E): the pane is a thin shell over
                 the ONE extract workbench — session, camera, eyedropper, and
                 the T19 dominance readout all live in ExtractWorkbench. -->
            <ExtractWorkbench
                class="pb-4 px-4 sm:px-6 pt-2"
                layout="column"
                :color-space="colorSpace"
                @pick="pm.emitSetCurrentColor"
                @add-color="pm.emitAddColor"
            />
        </Card>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Card } from "@components/ui/card";
import ExtractWorkbench from "@components/custom/image-palette-extractor/ExtractWorkbench.vue";
import PaneHeader from "./PaneHeader.vue";
import { PALETTE_MANAGER_KEY } from "@composables/palette/usePaletteManager";
import type { ColorSpace } from "@mkbabb/value.js/color";

type DisplayColorSpace = ColorSpace | "hex";

const { colorSpace = "hex" } = defineProps<{
    colorSpace?: DisplayColorSpace;
}>();

const pm = inject(PALETTE_MANAGER_KEY)!;
</script>
