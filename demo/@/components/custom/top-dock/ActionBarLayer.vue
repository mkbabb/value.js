<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { EllipsisVertical, Type, Tag } from "lucide-vue-next";
import { COLOR_MODEL_KEY } from "@components/custom/color-picker/keys";
import type { ActionBarContext } from "@components/custom/color-picker/keys";
import ActionToolbar from "@components/custom/color-picker/ActionToolbar.vue";
import ColorInput from "@components/custom/color-picker/ColorInput.vue";
import type { EditTarget } from "@components/custom/color-picker";

const props = defineProps<{
    actionBar: ActionBarContext;
    editTarget: EditTarget | null;
}>();

const emit = defineEmits<{
    openPalette: [];
    openExtract: [];
}>();

// Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
provide(COLOR_MODEL_KEY, props.actionBar.colorModel);

// --- Toolbar mode cycling (moved from ColorPicker) ---

const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
const actionToolbarRef = ref<InstanceType<typeof ActionToolbar> | null>(null);
const toolbarMode = ref<"actions" | "input" | "propose">("actions");
const showInput = computed(() => toolbarMode.value !== "actions");

function cycleToolbarMode() {
    if (toolbarMode.value === "actions") {
        toolbarMode.value = "input";
    } else if (toolbarMode.value === "input") {
        if (props.actionBar.canProposeName.value) {
            toolbarMode.value = "propose";
        } else {
            toolbarMode.value = "actions";
        }
    } else {
        toolbarMode.value = "actions";
    }
}

const currentToggleIcon = computed(() => {
    if (toolbarMode.value === "actions") return Type;
    if (toolbarMode.value === "input") return props.actionBar.canProposeName.value ? Tag : EllipsisVertical;
    return EllipsisVertical;
});

defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
</script>

<template>
    <div class="flex items-center gap-0">
        <div class="grid relative items-center flex-1">
            <ActionToolbar
                ref="actionToolbarRef"
                :inert="showInput || undefined"
                :class="[
                    '[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out',
                    showInput ? 'opacity-0 -translate-y-1 pointer-events-none' : 'opacity-100 translate-y-0',
                ]"
                :css-color-opaque="actionBar.cssColorOpaque.value"
                :can-propose-name="actionBar.canProposeName.value"
                :is-editing="actionBar.isEditing.value"
                :palette-active="actionBar.paletteActive.value"
                @reset="actionBar.reset()"
                @copy="actionBar.copy()"
                @random="actionBar.random()"
                @open-palette="emit('openPalette')"
                @open-extract="emit('openExtract')"
            />
            <ColorInput
                :inert="!showInput || undefined"
                ref="colorInputRef"
                :edit-target="editTarget"
                :propose-mode="toolbarMode === 'propose'"
                :class="[
                    '[grid-area:1/1] transition-[opacity,transform] duration-200 ease-out',
                    showInput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none',
                ]"
            />
        </div>

        <div class="dock-separator"></div>

        <!-- Toggle button -->
        <button class="dock-icon-btn shrink-0" @click="cycleToolbarMode">
            <Transition name="toggle-icon" mode="out-in">
                <component
                    :is="currentToggleIcon"
                    :key="toolbarMode"
                    class="toggle-btn w-5 h-5 stroke-foreground"
                    :style="{ '--toggle-hover-color': actionBar.cssColorOpaque.value }"
                />
            </Transition>
        </button>
    </div>
</template>

<style scoped>
@reference "../../../styles/style.css";

.toggle-btn:hover {
    stroke: var(--toggle-hover-color);
}

/* Toggle icon transition */
.toggle-icon-enter-active,
.toggle-icon-leave-active {
    transition: opacity 0.12s ease, transform 0.12s ease;
}
.toggle-icon-enter-from {
    opacity: 0;
    transform: scale(0.7);
}
.toggle-icon-leave-to {
    opacity: 0;
    transform: scale(0.7);
}
</style>
