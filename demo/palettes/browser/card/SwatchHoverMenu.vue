<template>
    <!-- X.W12.u1 (UIA-V-25 · UIA-V-27 · UIA-V-43): one glass Popover for every
         pointer. `trigger="hover"` is glass's pointer-adaptive preview — a hover
         card on fine pointers, a click popover on coarse ones — so the retired
         `.floating-panel` Teleport fork (off-screen, unstyled, aria-hidden) is gone.
         The trigger is glass's Button (text emphasis, icon-only): glass 7.0.0's
         WatercolorDot forwards only class/style, so a trigger bound on the dot
         itself received neither reka's handlers nor its name. -->
    <div class="relative">
        <Popover trigger="hover" :open="open" @update:open="$emit('update:open', $event)">
            <PopoverTrigger as-child>
                <Button
                    emphasis="text"
                    icon-only
                    :aria-label="`Color swatch ${formatCssCaption(color)}`"
                    :class="[sizeClass, 'relative shrink-0 cursor-pointer', swatchExtraClass]"
                >
                    <WatercolorDot
                        :color="color"
                        :variant="ghost ? 'ghost' : 'solid'"
                        class="w-full h-full"
                    />
                </Button>
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
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Button } from "../../../ui/button";
import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot";
import { formatCssCaption } from "../../../color-session/format-color";

/** The action panel's layout. */
const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";

withDefaults(
    defineProps<{
        color: string;
        open: boolean;
        sizeClass?: string | undefined;
        swatchExtraClass?: string | undefined;
        /** R.W4 Lane A / A3 (U18/U22): render the swatch as the glass-ui
         *  ghost variant — the seeded dashed silhouette — for placeholder /
         *  being-edited slots. One shape source; no dashed-outline fork. */
        ghost?: boolean | undefined;
    }>(),
    {
        sizeClass: "w-9 h-9 sm:w-10 sm:h-10",
    },
);

defineEmits<{
    "update:open": [value: boolean];
}>();
</script>
