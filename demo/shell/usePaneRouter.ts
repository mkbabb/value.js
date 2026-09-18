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

import { ColorPicker } from "../picker";
// X-W3 · G-20 — the not-found pane is STATIC, unlike the ten lazy panes below.
// It is the fail-closed terminal: the view an unknown address resolves to and
// the one `router/guards.ts` refuses an admin deep-link to. A lazily-loaded
// terminal can fail to arrive, and a fallback that can fail is not a fallback.
// Being static also keeps it a single import shape — `router/index.ts` names the
// same component on the catch-all record, and a module that is both statically
// and dynamically imported is one module in two chunk shapes (the bundler says
// so: INEFFECTIVE_DYNAMIC_IMPORT).
import NotFoundPane from "../scenes/notfound/NotFoundPane.vue";
import type { ColorModel, EditTarget } from "../color-session/color-model";
import type { LeftPane, RightPane, ViewManager } from "./useViewManager";
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

const AboutPane = defineAsyncComponent(() => import("../scenes/about/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("../palettes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("../palettes/BrowsePane.vue"));
const ExtractPane = defineAsyncComponent(() => import("../workbenches/extract/ExtractPane.vue"));
const GeneratePane = defineAsyncComponent(() => import("../workbenches/generate/GeneratePane.vue"));
const GradientPane = defineAsyncComponent(() => import("../workbenches/gradient/GradientPane.vue"));
const MixPane = defineAsyncComponent(() => import("../workbenches/mix/MixPane.vue"));
const AdminPane = defineAsyncComponent(() => import("../palettes/admin/AdminPane.vue"));
const AuroraPane = defineAsyncComponent(() => import("../scenes/atmosphere/AuroraPane.vue"));
const BlobPane = defineAsyncComponent(() => import("../scenes/blob/BlobPane.vue"));

/**
 * The one name→component map this module's header promises — now TOTAL over the
 * schema's pane unions.
 *
 * X-W3 · G-19 (fold S-8). The predecessor was an `if`-chain over
 * `name: string | null` ending `return ColorPicker;`. That tail was a
 * fail-OPEN default: a pane name the schema grew without a component here
 * silently rendered the picker, and `usePaneRouter.ts:80`'s own doc comment
 * ("`null` for an unknown name") contradicted it. The gate is STRUCTURAL rather
 * than runtime because the tail was also provably unreachable — both call sites
 * pass `currentConfig.value.left/right`, already typed `LeftPane`/`RightPane`,
 * and `useViewManager.ts:43-45` clamps the route name through `isViewId` — so no
 * runtime probe could reach it. `Record<Exclude<…, null>, Component>` is what
 * makes the totality checkable: `vue-tsc` rejects this table the moment
 * `viewSchema.ts` names a pane it does not carry, and rejects a key the unions
 * do not name. The fail-closed answer for a genuinely unknown view now comes
 * from the schema instead — `not-found` is a real view with a real component.
 */
const PANE_COMPONENTS: Record<Exclude<LeftPane | RightPane, null>, Component> = {
    "color-picker": ColorPicker,
    browse: BrowsePane,
    extract: ExtractPane,
    generate: GeneratePane,
    gradient: GradientPane,
    atmosphere: AuroraPane,
    about: AboutPane,
    palettes: PalettesPane,
    mix: MixPane,
    blob: BlobPane,
    "admin-users": AdminPane,
    "admin-names": AdminPane,
    "admin-audit": AdminPane,
    "admin-flagged": AdminPane,
    "admin-tags": AdminPane,
    "not-found": NotFoundPane,
};

/** Maps a view-config slot name to its component. `null` only for an empty slot. */
function componentFor(name: LeftPane | RightPane): Component | null {
    return name === null ? null : PANE_COMPONENTS[name];
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
