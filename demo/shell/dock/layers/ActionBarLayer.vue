<script setup lang="ts">
/**
 * <ActionBarLayer> — the dock's action-bar LAYER.
 *
 * X-W4 · CC-043. It owns the arm crossfade (seats ↔ colour input) and the mode
 * toggle; it no longer owns a contract. Its predecessor took `ActionBarContext`
 * — the picker's private nine-member shape — and was therefore mountable for
 * exactly one scene, which is why `Dock.vue` needed a second layer component
 * and the `v-if`/`v-else-if` priority that masked it. It now takes the ONE
 * `SceneActionSet` and renders every scene.
 *
 * The input arm is the contract's, not a special case: `set.input` is present
 * only for the scene that owns a live colour-edit surface, so a workbench bar
 * carries neither the sub-layer nor its toggle, and the layer needs no scene
 * test of its own.
 */
import { computed, inject, ref, useTemplateRef, watch, type Ref } from "vue";
import { EllipsisVertical, Type, Tag } from "@lucide/vue";
import { SAFE_ACCENT_KEY } from "../../../color-session/keys";
import type { SceneActionSet } from "../../../color-session/keys";
import GenericActionBar from "./GenericActionBar.vue";
import ColorInput from "../ColorInput.vue";
import { DockControl, DockSeparator } from "@mkbabb/glass-ui/dock";
import type { EditTarget } from "../../../color-session/color-model";

const { actionSet, editTarget } = defineProps<{
    actionSet: SceneActionSet;
    editTarget: EditTarget | null;
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;

// --- Toolbar mode cycling (moved from ColorPicker) ---

const colorInputRef = ref<InstanceType<typeof ColorInput> | null>(null);
const toolbarMode = ref<"actions" | "input" | "propose">("actions");
const inputArm = computed(() => actionSet.input ?? null);
const showInput = computed(
    () => inputArm.value !== null && toolbarMode.value !== "actions",
);

// A scene without an input arm has no second mode to be parked in — switching
// to it while the input sub-layer is open must return the bar to its seats
// rather than leave it showing a sub-layer that no longer exists.
watch(inputArm, (arm) => {
    if (arm === null) toolbarMode.value = "actions";
});

function cycleToolbarMode() {
    const arm = inputArm.value;
    if (arm === null) {
        toolbarMode.value = "actions";
        return;
    }
    if (toolbarMode.value === "actions") {
        toolbarMode.value = "input";
    } else if (toolbarMode.value === "input") {
        toolbarMode.value = arm.canProposeName ? "propose" : "actions";
    } else {
        toolbarMode.value = "actions";
    }
}

const currentToggleIcon = computed(() => {
    if (toolbarMode.value === "actions") return Type;
    if (toolbarMode.value === "input") {
        return inputArm.value?.canProposeName === true ? Tag : EllipsisVertical;
    }
    return EllipsisVertical;
});

const toggleLabel = computed(() => {
    if (toolbarMode.value === "actions") return "Open color input";
    if (toolbarMode.value === "input") {
        return inputArm.value?.canProposeName === true
            ? "Propose color name"
            : "Close input";
    }
    return "Close propose";
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
    useLayerTransition({
        containerEl: subLayerGridEl,
        activeLayer: activeSubLayer,
    });

function subLayerProps(id: "actions" | "input") {
    const isActive = currentSubLayer.value === id;
    return {
        class: [
            "dock-layer",
            { "is-active": isActive, "is-leaving": leavingSubLayer.value === id },
        ],
        inert: isActive ? undefined : true,
    };
}

defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
</script>

<template>
    <div class="flex items-center gap-0 min-w-0">
        <div ref="subLayerGridEl" class="dock-layer-grid flex-1">
            <GenericActionBar
                v-bind="subLayerProps('actions')"
                :actions="actionSet.actions"
                :accent-color="safeAccent"
            />
            <ColorInput
                v-if="inputArm"
                ref="colorInputRef"
                v-bind="subLayerProps('input')"
                :edit-target="editTarget"
                :propose-mode="toolbarMode === 'propose'"
                class="min-w-0"
            />
        </div>

        <!-- The input arm's toggle rides the arm, not the layer: a scene that
             declares no input arm shows no control for it. -->
        <template v-if="inputArm">
            <DockSeparator />
            <!-- Toggle button — E.W3 Lane A added aria-label so the role/label
                 selectors in e2e/smoke/flows/color-propose.spec.ts can drive
                 the actions→input→propose cycle. -->
            <DockControl
                class="shrink-0"
                :aria-label="toggleLabel"
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
        </template>
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
