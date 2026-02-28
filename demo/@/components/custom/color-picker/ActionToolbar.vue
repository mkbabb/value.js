<template>
    <div class="flex flex-wrap gap-2 sm:gap-4 w-full justify-evenly items-center mt-1">
        <ActionButton
            :icon="RotateCcw"
            hover-key="reset"
            :active-hover="activeHover"
            title="Reset color 🔄"
            description="Click to reset to the default color."
            icon-class="hover:-rotate-180 duration-300"
            @action="emit('reset')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Copy"
            hover-key="copy"
            :active-hover="activeHover"
            title="Copy color 📋"
            description="Click to copy the current color to the clipboard."
            @action="emit('copy')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Shuffle"
            hover-key="random"
            :active-hover="activeHover"
            title="Random color 🎲"
            description="Click to generate a random color."
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
            :active-style="paletteActive ? { stroke: cssColorOpaque, strokeWidth: '2.75' } : {}"
            @action="emit('openPalette')"
            @update:active-hover="(v) => activeHover = v"
        />
        <ActionButton
            :icon="Tag"
            hover-key="propose"
            :active-hover="activeHover"
            :hidden="!canProposeName"
            title="Propose a name ✨"
            description="This color doesn't have a name yet. Propose one for the global registry."
            icon-class="rounded-md"
            :active-style="proposeFormOpen ? { stroke: cssColorOpaque, strokeWidth: '2.75' } : {}"
            @action="emit('togglePropose')"
            @update:active-hover="(v) => activeHover = v"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Shuffle, Copy, RotateCcw, Palette, Tag } from "lucide-vue-next";
import ActionButton from "./ActionButton.vue";

defineProps<{
    cssColorOpaque: string;
    canProposeName: boolean;
    isEditing: boolean;
    paletteActive: boolean;
    proposeFormOpen: boolean;
}>();

const emit = defineEmits<{
    reset: [];
    copy: [];
    random: [];
    openPalette: [];
    togglePropose: [];
}>();

const activeHover = ref<string | null>(null);
</script>
