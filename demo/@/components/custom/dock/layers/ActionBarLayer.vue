<script setup lang="ts">
import { computed, inject, provide, ref, useTemplateRef } from "vue";
import { EllipsisVertical, Type, Tag } from "@lucide/vue";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "@composables/color/keys";
import type { ActionBarContext } from "@composables/color/keys";
import ActionToolbar from "@components/custom/color-picker/controls/ActionToolbar.vue";
import ColorInput from "@components/custom/color-picker/controls/ColorInput.vue";
import { DockIconButton, DockSeparator, useLayerTransition } from "@mkbabb/glass-ui/dock";
import type { EditTarget } from "@components/custom/color-picker";

const { actionBar, editTarget } = defineProps<{
    actionBar: ActionBarContext;
    editTarget: EditTarget | null;
}>();

const emit = defineEmits<{
    openPalette: [];
    openExtract: [];
}>();

// Re-provide COLOR_MODEL_KEY so ColorInput works unchanged
provide(COLOR_MODEL_KEY, actionBar.colorModel);

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
        if (actionBar.canProposeName.value) {
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
    if (toolbarMode.value === "input") return actionBar.canProposeName.value ? Tag : EllipsisVertical;
    return EllipsisVertical;
});

// ── Sub-layer transition (actions ↔ input) ──
// glass-ui's `useLayerTransition` owns the size-morph + crossfade off ONE spring
// scalar (`--dock-morph-t`); it exposes the post-swap `currentLayer` + the fading
// `leavingLayer` refs. The per-id class/inert packaging the consumer template needs
// is the same binding glass-ui's own DockLayerGroup applies — derived here so the
// two call sites (`actions`/`input`) stay a single v-bind.
const subLayerGridEl = useTemplateRef<HTMLElement>("subLayerGridEl");
const activeSubLayer = computed(() => (showInput.value ? "input" : "actions"));
const { currentLayer: currentSubLayer, leavingLayer: leavingSubLayer } =
    useLayerTransition({ containerEl: subLayerGridEl, activeLayer: activeSubLayer });

function subLayerProps(id: "actions" | "input") {
    const isActive = currentSubLayer.value === id;
    return {
        class: ["dock-layer", { "is-active": isActive, "is-leaving": leavingSubLayer.value === id }],
        inert: isActive ? undefined : true,
    };
}

defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
</script>

<template>
    <div class="flex items-center gap-0 min-w-0">
        <div ref="subLayerGridEl" class="dock-layer-grid flex-1">
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

        <DockSeparator />

        <!-- Toggle button — E.W3 Lane A added aria-label so the role/label
             selectors in e2e/smoke/flows/color-propose.spec.ts can drive
             the actions→input→propose cycle. -->
        <DockIconButton
            class="shrink-0"
            :aria-label="toolbarMode === 'actions' ? 'Open color input' : toolbarMode === 'input' ? (actionBar.canProposeName.value ? 'Propose color name' : 'Close input') : 'Close propose'"
            @click="cycleToolbarMode"
        >
            <Transition name="vj-morph" mode="out-in">
                <component
                    :is="currentToggleIcon"
                    :key="toolbarMode"
                    class="toggle-btn w-6 h-6 stroke-foreground"
                    :style="{ '--toggle-hover-color': safeAccent }"
                />
            </Transition>
        </DockIconButton>
    </div>
</template>

<style scoped>
@reference "../../../../styles/style.css";

.toggle-btn:hover {
    stroke: var(--toggle-hover-color);
}

/* Toggle icon rides the morph family — scale-only geometry. */
.toggle-btn {
    --vj-morph-scale: 0.7;
    --vj-morph-y: 0px;
}
</style>
