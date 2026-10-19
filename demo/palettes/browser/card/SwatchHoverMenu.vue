<template>
    <!-- X.W12.u1 (UIA-V-25 · UIA-V-27 · UIA-V-43): one glass Popover for every
         pointer. `trigger="hover"` is glass's pointer-adaptive preview — a hover
         card on fine pointers, a click popover on coarse ones — so the retired
         `.floating-panel` Teleport fork (off-screen, unstyled, aria-hidden) is gone.
         The trigger is the app's one SwatchButton (A2-VA-L1-15: glass's Button
         with the WatercolorDot face): glass's WatercolorDot forwards only
         class/style, so a trigger bound on the dot itself received neither
         reka's handlers nor its name. -->
    <div class="relative">
        <Popover trigger="hover" :open="open" @update:open="$emit('update:open', $event)">
            <PopoverTrigger as-child>
                <SwatchButton
                    :color="color"
                    :size="size"
                    :ghost="ghost"
                    :aria-label="`Color swatch ${formatCssCaption(color)}`"
                />
            </PopoverTrigger>
            <PopoverContent
                class="w-auto"
                :class="PANEL_LAYOUT"
                :side-offset="8"
                :aria-label="`Actions for ${formatCssCaption(color)}`"
            >
                <slot name="actions" />
            </PopoverContent>
        </Popover>

        <!-- Optional overlay content (e.g., edit overlay) -->
        <slot name="overlay" />
    </div>
</template>

<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
import SwatchButton, { type SwatchSize } from "../../../shared/ui/SwatchButton.vue";
import { formatCssCaption } from "../../../color-session/format-color";

/** The action panel's layout. */
const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";

withDefaults(
    defineProps<{
        color: string;
        open: boolean;
        size?: SwatchSize | undefined;
        /** R.W4 Lane A / A3 (U18/U22): render the swatch as the glass-ui
         *  ghost variant — the seeded dashed silhouette — for placeholder /
         *  being-edited slots. One shape source; no dashed-outline fork. */
        ghost?: boolean | undefined;
    }>(),
    {
        size: "md",
    },
);

defineEmits<{
    "update:open": [value: boolean];
}>();
</script>
