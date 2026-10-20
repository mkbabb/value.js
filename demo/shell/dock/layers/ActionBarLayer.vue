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
import {
    computed,
    defineAsyncComponent,
    inject,
    nextTick,
    onMounted,
    ref,
    useTemplateRef,
    watch,
} from "vue";
import { useEventListener, useResizeObserver } from "@vueuse/core";
import { EllipsisVertical, Type, Tag } from "@lucide/vue";
import { SAFE_ACCENT_KEY } from "../../../color-session/keys";
import type { SceneActionSet } from "../../../color-session/keys";
import GenericActionBar from "./GenericActionBar.vue";
import { DockControl, DockCrossfade, DockLayer, DockSeparator } from "@mkbabb/glass-ui/dock";

// X.W12U.g2d (COHESION §0fr.1): the colour-input sub-layer shows only when the
// mode toggle is pressed (`toolbarMode` starts at "actions"), so it is a LAZY
// import at its root and leaves the eager graph with its popover, tooltip and
// parse-echo dependencies (the eager-graph audit, W12U-evidence/g2d/).
const ColorInput = defineAsyncComponent(() => import("../ColorInput.vue"));

const { actionSet } = defineProps<{
    actionSet: SceneActionSet;
}>();

const safeAccent = inject(SAFE_ACCENT_KEY)!;

// --- Toolbar mode cycling (moved from ColorPicker) ---

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
// X.W12.e (OA-22): the sub-layer swap rides glass's own face-swap spine —
// `<DockCrossfade :active>` hosting two `<DockLayer>` faces — on the ONE dock
// spring (opacity overlap, peak reserve, inert + focus transfer all owned by
// the producer). The local layer-transition shim (a 260 ms timer copy of
// the retired producer composable, V-W44) is RETIRED with it: no
// consumer copy of producer motion (SS-6/S-17).
const activeSubLayer = computed(() => (showInput.value ? "input" : "actions"));

// UIA-V-12: a successful propose returns the bar to its seats and says so. The
// returned "Open color input" toggle is the sighted signal; the status line is
// the announced one (the same visually-hidden idiom as the seat row's).
const proposedMessage = ref("");
function onProposed(name: string) {
    toolbarMode.value = "actions";
    proposedMessage.value = `Name proposed: ${name}.`;
}
watch(toolbarMode, (mode) => {
    if (mode !== "actions") proposedMessage.value = "";
});

// ── X.W12U.m3 (COHESION §0fh.4, X-13-RUN): the run keeps the priority prefix ──
// At a coarse pointer every seat holds glass's 44 px floor, and a narrow phone's
// dock run cannot hold them all (360: 346 px of seats in a 304 px run). The
// face therefore keeps the priority-ranked PREFIX of seats that fits the run;
// the rest go to the face's menu (`GenericActionBar`). No seat shrinks.
//
// The measure lives here, above the crossfade, because glass's
// `<DockCrossfade reserve="inline">` latches the PEAK face width it has ever
// measured (it only grows): a face that drops seats keeps its old reserve. The
// crossfade is therefore keyed on the kept count, so each fit is measured from
// a fresh reserve. When glass O-85 DOCK-PRIORITY-OVERFLOW lands, this measure
// is retired for it.
const rootRef = useTemplateRef<HTMLElement>("root");
const kept = ref(actionSet.actions.length);

/** The dock run: the nearest ancestor that scrolls inline (glass's overflow contract). */
function scrollPort(el: HTMLElement): HTMLElement | null {
    for (let node = el.parentElement; node !== null; node = node.parentElement) {
        const overflow = getComputedStyle(node).overflowX;
        if (overflow === "auto" || overflow === "scroll") return node;
    }
    return null;
}

/**
 * Whether the run's content overflows it, read from LAYOUT boxes: the run's
 * children's extent against its content box. `scrollWidth` is not used — it
 * counts transforms, so a hover-scaled end seat (44 → 48 px) reads as overflow
 * and would cost a seat that fits.
 */
function overflows(run: HTMLElement): boolean {
    const box = run.getBoundingClientRect();
    const end =
        box.left +
        run.clientLeft +
        run.clientWidth -
        parseFloat(getComputedStyle(run).paddingInlineEnd);
    let right = -Infinity;
    for (const child of run.children) {
        right = Math.max(right, child.getBoundingClientRect().right);
    }
    return right + run.scrollLeft - end > 0.5;
}

/** The run's inline size the last fit settled on: a resize to it is our own. */
let settledWidth = -1;
let fitting = false;
/** A fit asked for while the input arm is open waits for the seats' return. */
let pending = false;

/**
 * Every seat back in the run, then the lowest-priority seat out while the run
 * overflows. Only the ACTIVE face measures: an inactive layer sits under an
 * `inert` ancestor and shares the run with the face on show. A fit never runs
 * while the colour input is open: re-keying the crossfade would remount the
 * field under the user's typing, so it waits for the seats to return.
 */
async function fit(): Promise<void> {
    const root = rootRef.value;
    if (root === null || fitting || root.closest("[inert]") !== null) return;
    if (toolbarMode.value !== "actions") {
        pending = true;
        return;
    }
    pending = false;
    const run = scrollPort(root);
    if (run === null) return;
    fitting = true;
    kept.value = actionSet.actions.length;
    await nextTick();
    while (kept.value > 0 && overflows(run)) {
        kept.value -= 1;
        await nextTick();
    }
    settledWidth = run.clientWidth;
    fitting = false;
}

onMounted(() => {
    const root = rootRef.value;
    const run = root === null ? null : scrollPort(root);
    // The run changes size when this face becomes the active layer.
    if (run !== null) {
        useResizeObserver(run, () => {
            if (run.clientWidth !== settledWidth) void fit();
        });
    }
    void fit();
});
// Only an INLINE resize is a new constraint: a soft keyboard changes the
// viewport's block size, and must not re-key the face under the field.
let viewportWidth = window.innerWidth;
useEventListener(window, "resize", () => {
    if (window.innerWidth === viewportWidth) return;
    viewportWidth = window.innerWidth;
    void fit();
});
watch(
    () => actionSet.actions.map((action) => action.token).join(" "),
    () => void fit(),
);
watch(toolbarMode, (mode) => {
    if (mode === "actions" && pending) void fit();
});

defineExpose({ currentToggleIcon, toolbarMode, cycleToolbarMode });
</script>

<template>
    <!-- SS-8 B05 · 0125 (MISS-1): the layer root breathes on the face's own
         `--dock-layer-gap`, so the trailing separator gets the same air as the
         leading one (the retired `gap-0` gave it half). -->
    <div ref="root" class="flex items-center gap-(--dock-layer-gap) min-w-0">
        <DockCrossfade
            :key="kept"
            :active="activeSubLayer"
            reserve="inline"
            class="dock-layer-grid flex-1"
        >
            <DockLayer id="actions">
                <GenericActionBar
                    :actions="actionSet.actions"
                    :accent-color="safeAccent"
                    :kept="kept"
                />
            </DockLayer>
            <DockLayer v-if="inputArm" id="input">
                <ColorInput
                    :propose-mode="toolbarMode === 'propose'"
                    class="min-w-0"
                    @proposed="onProposed"
                />
            </DockLayer>
        </DockCrossfade>

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
        <p v-if="proposedMessage" class="sr-only" role="status">{{ proposedMessage }}</p>
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
