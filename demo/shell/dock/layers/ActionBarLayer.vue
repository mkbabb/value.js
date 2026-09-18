<script setup lang="ts">
import { computed, inject, provide, ref, useTemplateRef, watch, type Ref } from "vue";
import { EllipsisVertical, Type, Tag } from "@lucide/vue";
import { COLOR_MODEL_KEY, SAFE_ACCENT_KEY } from "../../../color-session/keys";
import type { ActionBarContext } from "../../../color-session/keys";
import ActionToolbar from "../ActionToolbar.vue";
import ColorInput from "../ColorInput.vue";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import type { EditTarget } from "../../../color-session/color-model";

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
// V-W44 (Glass 7): glass-ui removed the standalone `useLayerTransition`
// composable — the layer size-morph + crossfade folded INTO the DockCrossfade
// component, which internalizes the class/inert packaging this template hand-
// binds and offers no public composable successor. This local successor
// preserves the exact two-refs contract the template needs: `currentLayer`
// flips immediately on swap; `leavingLayer` holds the prior id for the
// crossfade window, then clears. (Relay note for glass: a public
// content-swap composable would retire this local shim.)
const SUB_LAYER_CROSSFADE_MS = 260;
function useLayerTransition(opts: {
    containerEl: Ref<HTMLElement | null>;
    activeLayer: Ref<string>;
}) {
    void opts.containerEl; // signature parity with the retired producer composable
    const currentLayer = ref(opts.activeLayer.value);
    const leavingLayer = ref<string | null>(null);
    let timer: ReturnType<typeof setTimeout> | null = null;
    watch(opts.activeLayer, (next, prev) => {
        if (next === prev) return;
        currentLayer.value = next;
        leavingLayer.value = prev ?? null;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            leavingLayer.value = null;
        }, SUB_LAYER_CROSSFADE_MS);
    });
    return { currentLayer, leavingLayer };
}

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
        <DockControl
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
        </DockControl>
    </div>
</template>

<style scoped>
@reference "../../../styles/foundation.css";

.toggle-btn:hover {
    stroke: var(--toggle-hover-color);
}

/* Toggle icon rides the morph family — scale-only geometry. */
.toggle-btn {
    --vj-morph-scale: 0.7;
    --vj-morph-y: 0px;
}
</style>
