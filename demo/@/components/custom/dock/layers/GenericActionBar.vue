<script setup lang="ts">
import { ref } from "vue";
import ActionButton from "@components/custom/color-picker/controls/ActionButton.vue";
import type { DockAction } from "../composables/useDockActionBar";

const props = defineProps<{
    actions: DockAction[];
    accentColor?: string;
}>();

const activeHover = ref<string | null>(null);
</script>

<template>
    <div class="flex items-center justify-around flex-1">
        <ActionButton
            v-for="act in actions"
            :key="act.key"
            :icon="act.icon"
            :hover-key="act.key"
            :active-hover="activeHover"
            :title="act.title"
            :description="act.description"
            :css-color-opaque="accentColor"
            :rotate-on-click="act.rotateOnClick"
            :icon-class="act.iconClass"
            :disabled="act.disabled"
            @action="act.handler()"
            @update:active-hover="(v) => activeHover = v"
        />
    </div>
</template>
