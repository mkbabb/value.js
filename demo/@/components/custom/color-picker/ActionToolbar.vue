<template>
    <div class="flex items-center gap-1.5 shrink-0">
        <ActionButton
            :icon="RotateCcw"
            hover-key="reset"
            :active-hover="activeHover"
            title="Reset color"
            description="Click to reset to the default color."
            icon-class="hover:-rotate-180 duration-300"
            :css-color-opaque="cssColorOpaque"
            rotate-on-click
            @action="emit('reset')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Copy"
            hover-key="copy"
            :active-hover="activeHover"
            title="Copy color"
            description="Click to copy the current color to the clipboard."

            :css-color-opaque="cssColorOpaque"
            @action="emit('copy')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Dices"
            hover-key="random"
            :active-hover="activeHover"
            title="Random color"
            description="Click to generate a random color."

            :css-color-opaque="cssColorOpaque"
            @action="emit('random')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Palette"
            hover-key="browse"
            :active-hover="activeHover"
            title="Palettes"
            description="Save, browse, and publish color palettes."

            :disabled="isEditing"
            :css-color-opaque="cssColorOpaque"
            :active-style="paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2' } : {}"
            @action="emit('openPalette')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Camera"
            hover-key="extract"
            :active-hover="activeHover"
            title="Extract palette"
            description="Open image palette extraction from a photo or camera."

            :disabled="isEditing"
            :css-color-opaque="cssColorOpaque"
            @action="emit('openExtract')"
            @update:active-hover="(v) => activeHover = v"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Dices, Copy, RotateCcw, Palette, Camera } from "lucide-vue-next";
import ActionButton from "./ActionButton.vue";

defineProps<{
    cssColorOpaque: string;
    canProposeName: boolean;
    isEditing: boolean;
    paletteActive: boolean;
}>();

const emit = defineEmits<{
    reset: [];
    copy: [];
    random: [];
    openPalette: [];
    openExtract: [];
}>();

const activeHover = ref<string | null>(null);

function clearHover() {
    activeHover.value = null;
}

defineExpose({ clearHover });
</script>
