// usePaneRouter — the single source of truth for the demo's pane-rendering
// surface. It replaces the parallel `useMobilePaneRouter` + `useDesktopPaneRouter`
// (two route tables for one logical concern — a precept §5 one-path violation)
// and folds in `useGenericActionBar` (per-view dock metadata for the very panes
// the router already dispatches). One component registry, one name→component
// map, one name→props map; the mobile single-slot and the desktop left/right
// slots are three views onto it.
//
// App.vue consumes the three slot shapes + the action bar; it no longer wires
// two routing sources and a separate action-bar composable.

import {
    computed,
    defineAsyncComponent,
    type Component,
    type ComputedRef,
    type Ref,
    type ShallowRef,
} from "vue";

import { ColorPicker, type ColorModel, type EditTarget } from "../@/components/custom/color-picker";
import type { ViewManager } from "./useViewManager";
import {
    RefreshCw,
    Copy,
    Save,
    RotateCcw,
    Pipette,
    Blend,
    Paintbrush,
    Trash2,
} from "@lucide/vue";

// ── DockActionBar types (folded from the retired useDockActionBar.ts — its
//    DOCK_ACTION_BAR_KEY injection symbol had zero consumers and was dropped) ──

export interface DockAction {
    key: string;
    icon: Component;
    title: string;
    description: string;
    rotateOnClick?: boolean;
    iconClass?: string;
    disabled?: boolean;
    handler: () => void;
}

export interface DockActionBar {
    /** The label shown next to the Tools toggle button. */
    label: string;
    /** Icon for the Tools toggle. */
    icon: Component;
    /** Accent color for the action bar. */
    accentColor?: string;
    /** The actions to display in the dock. */
    actions: Ref<DockAction[]>;
}

/** The resolved shape one pane slot renders. */
export interface PaneSlot {
    component: Component | null;
    key: string;
    props: Record<string, unknown>;
}

// ── Component registry — one table, was duplicated across the two routers ──

const AboutPane = defineAsyncComponent(() => import("../@/components/custom/panes/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("../@/components/custom/panes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("../@/components/custom/panes/BrowsePane.vue"));
const ExtractPane = defineAsyncComponent(() => import("../@/components/custom/panes/ExtractPane.vue"));
const GeneratePane = defineAsyncComponent(() => import("../@/components/custom/panes/GeneratePane.vue"));
const GradientPane = defineAsyncComponent(() => import("../@/components/custom/panes/GradientPane.vue"));
const MixPane = defineAsyncComponent(() => import("../@/components/custom/panes/MixPane.vue"));
const AdminPane = defineAsyncComponent(() => import("../@/components/custom/panes/AdminPane.vue"));
const AuroraPane = defineAsyncComponent(() => import("../@/components/custom/panes/AuroraPane.vue"));
const BlobPane = defineAsyncComponent(() => import("../@/components/custom/panes/BlobPane.vue"));

/** Maps a view-config slot name to its component. `null` for an unknown name. */
function componentFor(name: string | null): Component | null {
    if (name === null) return null;
    if (name === "color-picker") return ColorPicker;
    if (name === "browse") return BrowsePane;
    if (name === "extract") return ExtractPane;
    if (name === "generate") return GeneratePane;
    if (name === "gradient") return GradientPane;
    if (name === "atmosphere") return AuroraPane;
    if (name === "about") return AboutPane;
    if (name === "palettes") return PalettesPane;
    if (name === "mix") return MixPane;
    if (name === "blob") return BlobPane;
    if (name.startsWith("admin-")) return AdminPane;
    return ColorPicker;
}

export interface PaneRouterDeps {
    cssColor: () => string;
    savedColorStrings: () => string[];
    colorPickerRef: () => { commitEdit: () => void; cancelEdit: () => void } | null;
    onEditTargetChange: (et: EditTarget | null) => void;
    resetToDefaults: () => void;
    updateModel: (v: ColorModel) => void;
}

/** Pane-component instance refs the action bar dispatches its handlers onto. */
export interface PaneActionRefs {
    generate: Ref<any>;
    gradient: Ref<any>;
    mix: Ref<any>;
}

export function usePaneRouter(
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    deps: PaneRouterDeps,
    paneRefs: PaneActionRefs,
): {
    mobile: ComputedRef<PaneSlot>;
    desktopLeft: ComputedRef<PaneSlot>;
    desktopRight: ComputedRef<PaneSlot>;
    actionBar: ComputedRef<DockActionBar | null>;
} {
    const currentConfig = computed(() => viewManager.currentConfig.value);

    /** Props for a "left" slot component (mobile single-slot and desktop-left
     *  resolve the same way — one path). */
    function leftProps(name: string): Record<string, unknown> {
        if (name === "color-picker") {
            // S.W2 · W2-1: the picker no longer takes the model as a prop — it
            // injects the ONE pipeline (COLOR_MODEL_KEY) App provides. Only its
            // edit/reset emits remain wired here.
            return {
                class: "picker-shell w-full",
                "onUpdate:editTarget": deps.onEditTargetChange,
                onReset: deps.resetToDefaults,
            };
        }
        if (name === "extract") return { colorSpace: model.value.selectedColorSpace };
        if (name.startsWith("admin-")) return { subView: name };
        return {};
    }

    /** Props for a "right" slot component (mobile pane-index 1 and desktop-right). */
    function rightProps(name: string): Record<string, unknown> {
        if (name === "about") {
            return {
                modelValue: model.value,
                "onUpdate:modelValue": (v: ColorModel) => deps.updateModel(v),
                cssColor: deps.cssColor(),
            };
        }
        if (name === "palettes") {
            return {
                savedColorStrings: deps.savedColorStrings(),
                "onCommit-edit": () => deps.colorPickerRef()?.commitEdit(),
                "onCancel-edit": () => deps.colorPickerRef()?.cancelEdit(),
            };
        }
        return {};
    }

    const desktopLeft = computed<PaneSlot>(() => {
        const left = currentConfig.value.left;
        return { component: componentFor(left), key: left, props: leftProps(left) };
    });

    const desktopRight = computed<PaneSlot>(() => {
        const right = currentConfig.value.right;
        return {
            component: componentFor(right),
            key: right ?? "empty",
            props: right ? rightProps(right) : {},
        };
    });

    const mobile = computed<PaneSlot>(() => {
        const cfg = currentConfig.value;
        // pane-index 1 shows the right pane when the view has one
        if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
            return desktopRight.value;
        }
        return desktopLeft.value;
    });

    // ── Action bar — per-view dock metadata for the generate/gradient/mix
    //    panes the router already dispatches (folded from useGenericActionBar) ──
    const actionBar = computed<DockActionBar | null>(() => {
        const view = viewManager.currentView.value;

        if (view === "generate") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "regenerate", icon: RefreshCw, title: "Regenerate", description: "New random palette with current settings.", rotateOnClick: true, handler: () => paneRefs.generate.value?.regenerate?.() },
                    { key: "save", icon: Save, title: "Save palette", description: "Save the generated palette.", handler: () => paneRefs.generate.value?.save?.() },
                    { key: "copy", icon: Copy, title: "Copy colors", description: "Copy palette colors to clipboard.", handler: () => paneRefs.generate.value?.copyColors?.() },
                ]),
            };
        }

        if (view === "gradient") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "reset", icon: RotateCcw, title: "Reset", description: "Reset gradient to defaults.", rotateOnClick: true, handler: () => paneRefs.gradient.value?.reset?.() },
                    { key: "copy", icon: Copy, title: "Copy CSS", description: "Copy the gradient CSS to clipboard.", handler: () => paneRefs.gradient.value?.copyCSS?.() },
                    { key: "seed", icon: Pipette, title: "Seed from palette", description: "Seed gradient stops from a saved palette.", handler: () => paneRefs.gradient.value?.seedFromPalette?.() },
                ]),
            };
        }

        if (view === "mix") {
            return {
                label: "Tools",
                icon: Paintbrush,
                actions: computed(() => [
                    { key: "clear", icon: Trash2, title: "Clear", description: "Clear all selected colors.", handler: () => paneRefs.mix.value?.clearSelection?.() },
                    { key: "mix", icon: Blend, title: "Mix", description: "Mix the selected colors.", handler: () => paneRefs.mix.value?.startMix?.() },
                    { key: "copy", icon: Copy, title: "Copy result", description: "Copy the mixed color result.", handler: () => paneRefs.mix.value?.copyResult?.() },
                ]),
            };
        }

        return null;
    });

    return { mobile, desktopLeft, desktopRight, actionBar };
}
