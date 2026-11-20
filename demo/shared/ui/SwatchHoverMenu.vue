<template>
    <!-- X.W12.u1 (UIA-V-25 · UIA-V-27 · UIA-V-43): one glass Popover for every
         pointer. `trigger="hover"` is glass's pointer-adaptive preview — a hover
         card on fine pointers, a click popover on coarse ones — so the retired
         `.floating-panel` Teleport fork (off-screen, unstyled, aria-hidden) is gone.
         The trigger is the app's one SwatchButton (A2-VA-L1-15: glass's Button
         with the WatercolorDot face): glass's WatercolorDot forwards only
         class/style, so a trigger bound on the dot itself received neither
         reka's handlers nor its name.
         SS-8 B13 L-1: the wrapper is a flex container, so the inline-block trigger
         sits on no line box and reserves no baseline descender under the swatch.
         color-40 L-6: the panel mounts on the swatch's first hover, focus or
         press (`engaged`); a list of 120 swatches no longer mounts 120 panels
         up front. The trigger is the same element throughout, so the press or
         hover that engages it is the one that opens it. -->
    <div
        class="relative flex"
        :data-engaged="mounted ? '' : undefined"
        @pointerenter="engage"
        @focusin="engage"
        @pointerdown.capture="engage"
    >
        <Popover trigger="hover" :open="open" @update:open="$emit('update:open', $event)">
            <PopoverTrigger as-child>
                <SwatchButton
                    :color="color"
                    :size="size"
                    :ghost="ghost"
                    v-bind="seed !== undefined ? { seed } : {}"
                    :done="done"
                    :aria-label="label ?? `Color swatch ${formatCssCaption(color)}`"
                    @click="$emit('press')"
                />
            </PopoverTrigger>
            <PopoverContent
                v-if="mounted"
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
import { computed, ref } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@mkbabb/glass-ui/popover";
import SwatchButton, { type SwatchSize } from "./SwatchButton.vue";
import { formatCssCaption } from "../../color-session/format-color";

/** The action panel's layout. */
const PANEL_LAYOUT = "p-1.5 flex items-center gap-1";

const props = withDefaults(
    defineProps<{
        color: string;
        open: boolean;
        size?: SwatchSize | undefined;
        /** R.W4 Lane A / A3 (U18/U22): render the swatch as the glass-ui
         *  ghost variant — the seeded dashed silhouette — for placeholder /
         *  being-edited slots. One shape source; no dashed-outline fork. */
        ghost?: boolean | undefined;
        /** The organic edge's seed (SwatchButton's); omit to seed from the colour. */
        seed?: string | undefined;
        /** The swatch's own verb's verdict (SwatchButton's check). */
        done?: boolean | undefined;
        /** The swatch's accessible name, when its press is a verb of its own
         *  (the Generate plate's copy); the default names the colour. */
        label?: string | undefined;
    }>(),
    {
        size: "md",
        done: false,
    },
);

/** The first hover, focus or press latches the panel's mount for good. */
const engaged = ref(false);
const engage = () => {
    engaged.value = true;
};
const mounted = computed(() => engaged.value || props.open);

defineEmits<{
    "update:open": [value: boolean];
    /** The swatch itself was pressed (the host's own verb, if it has one). */
    press: [];
}>();
</script>
