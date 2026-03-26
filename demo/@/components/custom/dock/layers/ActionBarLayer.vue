<script setup lang="ts">
import { computed, inject, provide, ref, useTemplateRef } from "vue";
import { EllipsisVertical, Type, Tag } from "lucide-vue-next";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "@components/custom/color-picker/keys";
import type { ActionBarContext } from "@components/custom/color-picker/keys";
import ActionToolbar from "@components/custom/color-picker/controls/ActionToolbar.vue";
import ColorInput from "@components/custom/color-picker/controls/ColorInput.vue";
import { useLayerTransition } from "../composables/useLayerTransition";
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

const safeAccent = inject(SAFE_ACCENT_KEY)!;

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

// ── Sub-layer transition (actions ↔ input) ──
const subLayerGridEl = useTemplateRef<HTMLElement>("subLayerGridEl");
const activeSubLayer = computed(() => (showInput.value ? "input" : "actions"));
const { layerProps: subLayerProps, onTransitionEnd: onSubLayerTransitionEnd } =
    useLayerTransition({ containerEl: subLayerGridEl, activeLayer: activeSubLayer });

defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
</script>

<template>
    <div class="flex items-center gap-0 min-w-0 w-full">
        <div ref="subLayerGridEl" class="dock-layer-grid flex-1" @transitionend="onSubLayerTransitionEnd">
            <ActionToolbar
                ref="actionToolbarRef"
                v-bind="subLayerProps('actions')"
                :css-color-opaque="safeAccent"
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
                ref="colorInputRef"
                v-bind="subLayerProps('input')"
                :edit-target="editTarget"
                :propose-mode="toolbarMode === 'propose'"
                class="min-w-0"
            />
        </div>

        <div class="dock-separator"></div>

        <!-- Toggle button -->
        <button class="dock-icon-btn shrink-0" @click="cycleToolbarMode">
            <Transition name="toggle-icon" mode="out-in">
                <component
                    :is="currentToggleIcon"
                    :key="toolbarMode"
                    class="toggle-btn w-6 h-6 stroke-foreground"
                    :style="{ '--toggle-hover-color': safeAccent }"
                />
            </Transition>
        </button>
    </div>
</template>

<style scoped>
@reference "../../../../styles/style.css";

.toggle-btn:hover {
    stroke: var(--toggle-hover-color);
}

/* Toggle icon transition */
.toggle-icon-enter-active,
.toggle-icon-leave-active {
    transition: opacity var(--duration-fast) var(--ease-standard),
                transform var(--duration-fast) var(--ease-standard);
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
