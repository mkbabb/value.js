<template>
    <PaneShell seated title="Extract" description="Pull palettes from any image.">
        <!-- A2-VA-L1-1: the one pane shell (its body gutter replaces the
             per-pane class string this workbench carried).
             The T20 collapse (R.W4 Lane E): the pane is a thin shell over
             the ONE extract workbench — session, camera, eyedropper, and
             the T19 dominance readout all live in ExtractWorkbench. -->
        <ExtractWorkbench
            layout="column"
            :color-space="colorSpace"
            @pick="pm.emitSetCurrentColor"
            @add-color="pm.emitAddColor"
        />
    </PaneShell>
</template>

<script setup lang="ts">
import { inject } from "vue";
import ExtractWorkbench from "./ExtractWorkbench.vue";
import PaneShell from "../../shell/PaneShell.vue";
import { COLOR_TARGET_PORT_KEY } from "../../palettes/usePalettePorts";
import type { SpaceId } from "@mkbabb/value.js/color";

type DisplayColorSpace = SpaceId | "hex";

const { colorSpace = "hex" } = defineProps<{
    colorSpace?: DisplayColorSpace;
}>();

const pm = inject(COLOR_TARGET_PORT_KEY)!;
</script>
