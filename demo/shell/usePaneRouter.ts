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
    shallowRef,
    type Component,
    type ComputedRef,
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
import { VIEW_MAP } from "./viewSchema";
import type { LeftPane, RightPane, ViewId, ViewManager } from "./useViewManager";
import type {
    ColorSceneTarget,
    SceneAction,
    SceneActionScene,
    SceneActionSet,
    SceneActionState,
    SceneActionToken,
    SceneCommand,
    ScenePane,
    ScenePaneTargetMap,
    ScenePaneTargets,
} from "../color-session/keys";
import {
    RefreshCw,
    Copy,
    Save,
    RotateCcw,
    Pipette,
    Blend,
    Paintbrush,
    Trash2,
    Dices,
    Palette,
    Camera,
} from "@lucide/vue";

/** The three seats a pane can be rendered in. */
export type PaneSlotId = "mobile" | "left" | "right";

/**
 * The declared prop + listener surface of one single-file component.
 *
 * X-W4 · CC-004 (fold W5F-56 → gate N3). The router's prop bags were
 * `Record<string, unknown>` object literals, so `"onCommit-edit"` — a key Vue's
 * emit resolver looks up for `update:*` listeners and for NOTHING else —
 * type-checked, linted and shipped as a dead end-to-end path (the desktop edit
 * overlay's Save/Cancel: `CurrentPaletteEditor` → `PalettesPane` → the void).
 * The bags below are derived FROM EACH PANE'S OWN CONTRACT, so deleting a
 * listener, misspelling one, or renaming the emit at the pane itself fails
 * `vue-tsc`. A hand-written twin of the same keys would only be spelled
 * correctly once — which is exactly what N3's falsifier refuses.
 */
type PropsOf<C> = C extends abstract new (...args: never[]) => { $props: infer P }
    ? P
    : never;

type EmptyPaneProps = Record<never, never>;

/** The picker seat: the edit-target relay + the reset emit, plus its shell class. */
type PickerSlotProps = Required<
    Pick<PropsOf<typeof ColorPicker>, "onUpdate:editTarget" | "onReset">
> & { class: string };

type ExtractSlotProps = Required<
    Pick<
        PropsOf<typeof import("../workbenches/extract/ExtractPane.vue").default>,
        "colorSpace"
    >
>;

type AdminSlotProps = Required<
    Pick<PropsOf<typeof import("../palettes/admin/AdminPane.vue").default>, "subView">
>;

type AboutSlotProps = Required<
    Pick<
        PropsOf<typeof import("../scenes/about/AboutPane.vue").default>,
        "modelValue" | "onUpdate:modelValue" | "cssColor"
    >
>;

type PalettesSlotProps = Required<
    Pick<
        PropsOf<typeof import("../palettes/PalettesPane.vue").default>,
        "savedColorStrings" | "onCommitEdit" | "onCancelEdit"
    >
>;

/** Every prop bag a slot can be rendered with — one member per pane family. */
export type PaneRenderProps =
    | EmptyPaneProps
    | PickerSlotProps
    | ExtractSlotProps
    | AdminSlotProps
    | AboutSlotProps
    | PalettesSlotProps;

/**
 * The resolved shape one pane slot renders.
 *
 * RENAMED at X.W5.a — gate **N8**, demanded by ⟨`shell-panesegmentedcontrol`
 * PSC-22⟩ ≡ ⟨`ErrorBoundary` EB-34⟩ ≡ LC-missed-3, and demanded BEFORE any
 * transposition: the former name `PaneSlot` shadowed `PaneSlot.vue` in this
 * same two-file directory, so the one module that renders slots from this
 * router's output could not import both under their own names.
 */
export interface ResolvedPane {
    component: Component | null;
    key: string;
    props: PaneRenderProps;
}

/**
 * The KeepAlive bound, DERIVED from the route table (gate **N7**).
 *
 * The three literals this replaces (`:max="9"` / `:max="6"` / `:max="4"`) were
 * hand-counted against a table in another file, and the LRU prunes the OLDEST
 * key on a miss — so an admin visit evicted the non-admin panes, the exact
 * inverse of what the comments beside them claimed. Counting the schema's own
 * distinct pane names means a route added tomorrow cannot silently re-break the
 * bound: correcting the literal would have fixed today and nothing else.
 */
export const PANE_CACHE_MAX: Record<PaneSlotId, number> = (() => {
    const configs = Object.values(VIEW_MAP);
    const left = new Set<string>(configs.map((c) => c.left));
    const right = new Set<string>(
        configs.map((c) => c.right).filter((r): r is Exclude<RightPane, null> => r !== null),
    );
    return {
        left: left.size,
        right: right.size,
        mobile: new Set<string>([...left, ...right]).size,
    };
})();

// ── Component registry — one table, was duplicated across the two routers ──

const AboutPane = defineAsyncComponent(() => import("../scenes/about/AboutPane.vue"));
const PalettesPane = defineAsyncComponent(() => import("../palettes/PalettesPane.vue"));
const BrowsePane = defineAsyncComponent(() => import("../palettes/BrowsePane.vue"));
const ExtractPane = defineAsyncComponent(
    () => import("../workbenches/extract/ExtractPane.vue"),
);
const GeneratePane = defineAsyncComponent(
    () => import("../workbenches/generate/GeneratePane.vue"),
);
const GradientPane = defineAsyncComponent(
    () => import("../workbenches/gradient/GradientPane.vue"),
);
const MixPane = defineAsyncComponent(() => import("../workbenches/mix/MixPane.vue"));
const AdminPane = defineAsyncComponent(() => import("../palettes/admin/AdminPane.vue"));
const AuroraPane = defineAsyncComponent(
    () => import("../scenes/atmosphere/AuroraPane.vue"),
);
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

// ── X-W4 · CC-043 — the scene-action registry and the ONE set builder ───────
//
// The contract itself lives in `color-session/keys.ts` (both ends speak it);
// what lives HERE is the routing half: which scene a view owns, how a mounted
// pane instance becomes a typed target, and how a named action resolves against
// that target. The predecessor of this section dispatched through
// `paneRefs.<scene>.value?.<member>?.()` — nine optional-chained calls that
// resolved to `undefined`, in silence, on every mobile load.

/**
 * View → the scene whose actions the dock offers there. TOTAL over `ViewId`
 * by construction: `vue-tsc` rejects this table the moment `viewSchema.ts`
 * names a view it does not carry, so a new view cannot silently inherit a
 * neighbour's bar (the same structural idiom `PANE_COMPONENTS` above uses).
 *
 * `mix` is the row that cures the D1 defect: its `VIEW_MAP` entry is
 * `left: "color-picker", right: "mix"`, so BOTH contracts existed there and
 * the Dock's `v-if="actionBar"` priority masked the mix bar on every desktop
 * load. A view owns ONE scene, and the Mix view's scene is mix.
 */
const VIEW_SCENES: Record<ViewId, SceneActionScene | null> = {
    picker: "color",
    palettes: "color",
    blob: "color",
    mix: "mix",
    generate: "generate",
    gradient: "gradient",
    browse: null,
    extract: null,
    atmosphere: null,
    "admin-users": null,
    "admin-names": null,
    "admin-audit": null,
    "admin-flagged": null,
    "admin-tags": null,
    "not-found": null,
};

/** The commands each lazy pane scene must expose to count as registered. */
const SCENE_PANE_COMMANDS: {
    readonly [S in ScenePane]: readonly (keyof ScenePaneTargetMap[S] & string)[];
} = {
    generate: ["regenerate", "save", "copyColors"],
    gradient: ["reset", "copyCSS", "seedFromPalette"],
    mix: ["clearSelection", "startMix", "copyResult"],
};

/** The reason a scene's seats carry when its pane has not registered. */
const SCENE_ABSENT: Record<SceneActionScene, string> = {
    color: "the color picker is not registered in this layout",
    generate: "the Generate pane is not registered in this layout",
    gradient: "the Gradient pane is not registered in this layout",
    mix: "the Mix pane is not registered in this layout",
};

/**
 * Read a mounted pane instance as a typed scene target, or `null`.
 *
 * This is where "registered" becomes a MEASURED fact rather than an assumption:
 * the predecessor cast the instance to `any` and optional-chained every member,
 * so a renamed pane method degraded to a dead button with no signal anywhere.
 * A missing member now yields `null`, which the builder renders as the modelled
 * `unavailable` state.
 */
export function readScenePaneTarget<S extends ScenePane>(
    scene: S,
    instance: unknown,
): ScenePaneTargetMap[S] | null {
    if (typeof instance !== "object" || instance === null) return null;
    const members = instance as Record<string, unknown>;
    for (const name of SCENE_PANE_COMMANDS[scene]) {
        if (typeof members[name] !== "function") return null;
    }
    return instance as ScenePaneTargetMap[S];
}

/**
 * The NON-COMMAND instance contract this router owns.
 *
 * COHESION **§0k.3 S-1**, verbatim: *"`bindPane` narrowed to non-command
 * instance uses (applyExternalColor / commitEdit / cancelEdit); the
 * `DockCommand` provide/inject registry lands at **X-W8** (MT-DOCK-LAYERS-1);
 * X-W5 may not claim C-3; A3's witness stays X-W5's, A3's cure moves to X-W8."*
 *
 * So: command dispatch through instance refs is NOT resurrected here. Scene
 * commands travel through X-W4's typed `SceneActionSet`, and their mobile seat
 * is the registry's at X-W8. What lives here is the edit channel and the
 * external-colour apply — the three members S-1 names, and no fourth.
 */
export interface PaneInstanceHandle {
    commitEdit: () => void;
    cancelEdit: () => void;
    applyExternalColor: (cssColor: string) => void;
}

const PANE_INSTANCE_MEMBERS = ["commitEdit", "cancelEdit", "applyExternalColor"] as const;

/** Read a mount report as the non-command handle, or `null`. */
export function readPaneInstanceHandle(instance: unknown): PaneInstanceHandle | null {
    if (typeof instance !== "object" || instance === null) return null;
    const members = instance as Record<string, unknown>;
    for (const name of PANE_INSTANCE_MEMBERS) {
        if (typeof members[name] !== "function") return null;
    }
    return instance as PaneInstanceHandle;
}

export interface PaneRouterDeps {
    cssColor: () => string;
    savedColorStrings: () => string[];
    /** The color scene's target — the picker's own exposed contract, or null. */
    colorSceneTarget: () => ColorSceneTarget | null;
    /** The ONE typed registry that replaced the three `ref<any>` pane refs. */
    scenePanes: () => ScenePaneTargets;
    /**
     * Every slot's mount report, carrying the seat and the LIVE key of the pane
     * that reported (fold W5F-02: re-deriving the identity from the
     * route-synchronous config filed the OUTGOING instance under the INCOMING
     * pane's name for a measured 1275 ms).
     */
    onPaneMount: (slot: PaneSlotId, instance: unknown, key: string) => void;
    onEditTargetChange: (et: EditTarget | null) => void;
    resetToDefaults: () => void;
    updateModel: (v: ColorModel) => void;
}

export function usePaneRouter(
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    deps: PaneRouterDeps,
): {
    mobile: ComputedRef<ResolvedPane>;
    desktopLeft: ComputedRef<ResolvedPane>;
    desktopRight: ComputedRef<ResolvedPane>;
    sceneActions: ComputedRef<SceneActionSet | null>;
    /** Register one slot's mount reports. Required at every `PaneSlot`. */
    bindPane: (slot: PaneSlotId) => (instance: unknown, key: string) => void;
    /** The ONE edit-commit home (fold W5F-59) — the dock seat and the palettes
     *  editor both call these; there is no second wiring to drift from. */
    commitEdit: () => void;
    cancelEdit: () => void;
} {
    const currentConfig = computed(() => viewManager.currentConfig.value);

    // ── The non-command instance channel (S-1) ──────────────────────────────
    //
    // `bindPane` is bound at ALL THREE seats, not at the desktop pair: the
    // mobile slot passed no `:on-mount` at all, which is why the edit channel
    // was structurally dead below the breakpoint — the dock's Save/Cancel
    // settled the pane index while the edit was DISCARDED (⟨ActionBarToggle
    // ABT-2⟩'s limb). Uniform registration is also why the KILLED cut-step
    // ⟨GenericActionBar GAB-11⟩ ("retain the left mount callback only for
    // `colorPickerRef`") is not what this is: no seat is privileged.
    const paneInstance = shallowRef<PaneInstanceHandle | null>(null);
    const paneInstanceSeat = shallowRef<PaneSlotId | null>(null);

    function releaseSeat(slot: PaneSlotId): void {
        if (paneInstanceSeat.value !== slot) return;
        paneInstance.value = null;
        paneInstanceSeat.value = null;
    }

    function bindPane(slot: PaneSlotId): (instance: unknown, key: string) => void {
        return (instance: unknown, key: string) => {
            deps.onPaneMount(slot, instance, key);
            // The seat no longer shows the pane that owns this channel, or an
            // explicit unmount arrived → the channel is gone from this seat.
            if (key !== "color-picker" || instance === null) {
                releaseSeat(slot);
                return;
            }
            const handle = readPaneInstanceHandle(instance);
            // A report that is not the pane is NOT evidence the pane is gone:
            // inside `<KeepAlive>` a `defineAsyncComponent` alternates between
            // the resolved instance and the wrapper's own bare public instance
            // (measured at X-W4: 102 reports carrying the members against 53
            // carrying nothing, in one render pass).
            if (handle === null) return;
            paneInstance.value = handle;
            paneInstanceSeat.value = slot;
        };
    }

    /**
     * Commit the open colour edit — ONE home.
     *
     * Fold W5F-59: this pair was implemented twice with drifted wirings (the
     * dock seat added the pane settle, the palettes prop bag did not). The
     * settle now RIDES the commit: with no registered pane there is nothing to
     * commit, and the UI says nothing rather than reporting a success that did
     * not happen (Dock structure (f) — "an absent capability is ABSENT").
     */
    function commitEdit(): void {
        const handle = paneInstance.value;
        if (handle === null) return;
        handle.commitEdit();
        viewManager.mobilePaneIndex.value = 1;
    }

    function cancelEdit(): void {
        const handle = paneInstance.value;
        if (handle === null) return;
        handle.cancelEdit();
        viewManager.mobilePaneIndex.value = 1;
    }

    // ── One typed builder per pane family (gates N3 / A4) ───────────────────
    //
    // Each builder DECLARES the bag it returns, so its object literal is
    // checked against exactly one contract: a deleted key is a missing
    // property, a misspelled key is both an excess property and a missing one.
    // Returning the union directly would not bite — an object literal only has
    // to satisfy ONE member of a union, and a bag with a key dropped satisfies
    // the empty one.

    /** S.W2 · W2-1: the picker takes no model prop — it injects the ONE
     *  pipeline (COLOR_MODEL_KEY) App provides. Its edit/reset emits are all
     *  that is wired here. */
    function pickerProps(): PickerSlotProps {
        return {
            class: "picker-shell w-full",
            "onUpdate:editTarget": deps.onEditTargetChange,
            onReset: deps.resetToDefaults,
        };
    }

    function extractProps(): ExtractSlotProps {
        return { colorSpace: model.value.selectedColorSpace };
    }

    function adminProps(subView: AdminSlotProps["subView"]): AdminSlotProps {
        return { subView };
    }

    function aboutProps(): AboutSlotProps {
        return {
            modelValue: model.value,
            "onUpdate:modelValue": (v: ColorModel) => deps.updateModel(v),
            cssColor: deps.cssColor(),
        };
    }

    function palettesProps(): PalettesSlotProps {
        return {
            savedColorStrings: deps.savedColorStrings(),
            onCommitEdit: commitEdit,
            onCancelEdit: cancelEdit,
        };
    }

    function noProps(): EmptyPaneProps {
        return {};
    }

    /** Props for a "left" slot component (mobile single-slot and desktop-left
     *  resolve the same way — one path). */
    function leftProps(name: LeftPane): PaneRenderProps {
        if (name === "color-picker") return pickerProps();
        if (name === "extract") return extractProps();
        if (name.startsWith("admin-")) {
            return adminProps(name as AdminSlotProps["subView"]);
        }
        return noProps();
    }

    /** Props for a "right" slot component (mobile pane-index 1 and desktop-right). */
    function rightProps(name: Exclude<RightPane, null>): PaneRenderProps {
        if (name === "about") return aboutProps();
        if (name === "palettes") return palettesProps();
        return noProps();
    }

    const desktopLeft = computed<ResolvedPane>(() => {
        const left = currentConfig.value.left;
        return { component: componentFor(left), key: left, props: leftProps(left) };
    });

    const desktopRight = computed<ResolvedPane>(() => {
        const right = currentConfig.value.right;
        return {
            component: componentFor(right),
            key: right ?? "empty",
            props: right ? rightProps(right) : {},
        };
    });

    const mobile = computed<ResolvedPane>(() => {
        const cfg = currentConfig.value;
        // pane-index 1 shows the right pane when the view has one
        if (cfg.right !== null && viewManager.mobilePaneIndex.value === 1) {
            return desktopRight.value;
        }
        return desktopLeft.value;
    });

    // ── The ONE scene action set (X-W4 · CC-043) ───────────────────────────
    //
    // Two rival contracts, nine `?.()` dispatches and a Picker-priority
    // `v-if`/`v-else-if` stood here. What stands now is one builder: the
    // current view names its scene, the scene's target is looked up in the
    // typed registry, and each named action resolves to ONE of four states.

    /**
     * Commands that FAILED, keyed by token. `startMix` is the one exposed
     * member that throws (MP-3), and its dock dispatch sits OUTSIDE the
     * application's only ErrorBoundary — the dock band closes before `<main>`
     * and the boundary is inside it, around `.pane-container`. So a throw from
     * a dock seat could reach no boundary at all and would surface only as a
     * Vue-internal console line: a SILENT failure, which is precisely what this
     * wave exists to make unrepresentable. It is recorded here instead and
     * RENDERED as the `failed` state — announced, and recoverable because the
     * seat stays operable. This is a surfacing seam, not a swallow: nothing is
     * discarded, and the boundary RESCOPE (the other arm MP-3 allows) belongs
     * to X-W5, which owns the containment altitude (COHESION §0k.3 S-7).
     */
    const failures = shallowRef<Partial<Record<SceneActionToken, string>>>({});

    function forget(token: SceneActionToken): void {
        if (failures.value[token] === undefined) return;
        const next = { ...failures.value };
        delete next[token];
        failures.value = next;
    }

    function record(token: SceneActionToken, thrown: unknown): void {
        failures.value = {
            ...failures.value,
            [token]: thrown instanceof Error ? thrown.message : String(thrown),
        };
    }

    function dispatch(token: SceneActionToken, command: SceneCommand): void {
        try {
            const settled = command();
            if (settled instanceof Promise) {
                void settled.then(
                    () => forget(token),
                    (thrown: unknown) => record(token, thrown),
                );
                return;
            }
            forget(token);
        } catch (thrown) {
            record(token, thrown);
        }
    }

    /**
     * Resolve one named action against its target. TOTAL — every path returns a
     * modelled state, so there is no branch on which a seat can be rendered
     * without one.
     */
    function resolve(
        token: SceneActionToken,
        command: SceneCommand | null,
        absent: string,
        blocked?: string,
    ): SceneActionState {
        if (command === null) return { kind: "unavailable", reason: absent };
        if (blocked !== undefined) return { kind: "blocked", reason: blocked };
        const run = () => dispatch(token, command);
        const detail = failures.value[token];
        return detail === undefined
            ? { kind: "ready", run }
            : { kind: "failed", detail, run };
    }

    /** The two color-scene actions that are view switches, not pane commands. */
    function toggleTo(view: ViewId): SceneCommand {
        return () =>
            viewManager.switchView(
                viewManager.currentView.value === view ? "picker" : view,
            );
    }

    function colorActions(): SceneAction[] {
        const target = deps.colorSceneTarget();
        const absent = SCENE_ABSENT.color;
        // The pre-collapse `ActionToolbar` disabled the two navigation seats
        // while an edit was open; that refusal is now a MODELLED state with its
        // own reason, distinct from an unregistered target.
        const editing =
            target?.isEditing.value === true
                ? "finish the open color edit first"
                : undefined;
        return [
            {
                token: "color.reset",
                icon: RotateCcw,
                title: "Reset color",
                description: "Click to reset to the default color.",
                iconClass: "hover:-rotate-180 duration-normal",
                rotateOnClick: true,
                state: resolve("color.reset", target?.reset ?? null, absent),
            },
            {
                token: "color.copy",
                icon: Copy,
                title: "Copy color",
                description: "Click to copy the current color to the clipboard.",
                state: resolve("color.copy", target?.copy ?? null, absent),
            },
            {
                token: "color.random",
                icon: Dices,
                title: "Random color",
                description: "Click to generate a random color.",
                state: resolve("color.random", target?.random ?? null, absent),
            },
            {
                token: "color.palettes",
                icon: Palette,
                title: "Palettes",
                description: "Save, browse, and publish color palettes.",
                // AB-32: the active/selected member the collapse must carry.
                active: target?.paletteActive.value === true,
                state: resolve("color.palettes", toggleTo("palettes"), absent, editing),
            },
            {
                token: "color.extract",
                icon: Camera,
                title: "Extract palette",
                description: "Open image palette extraction from a photo or camera.",
                state: resolve("color.extract", toggleTo("extract"), absent, editing),
            },
        ];
    }

    function generateActions(): SceneAction[] {
        const target = deps.scenePanes().generate;
        const absent = SCENE_ABSENT.generate;
        return [
            {
                token: "generate.regenerate",
                icon: RefreshCw,
                title: "Regenerate",
                description: "New random palette with current settings.",
                rotateOnClick: true,
                state: resolve(
                    "generate.regenerate",
                    target?.regenerate ?? null,
                    absent,
                ),
            },
            {
                token: "generate.save",
                icon: Save,
                title: "Save palette",
                description: "Save the generated palette.",
                state: resolve("generate.save", target?.save ?? null, absent),
            },
            {
                token: "generate.copyColors",
                icon: Copy,
                title: "Copy colors",
                description: "Copy palette colors to clipboard.",
                state: resolve(
                    "generate.copyColors",
                    target?.copyColors ?? null,
                    absent,
                ),
            },
        ];
    }

    function gradientActions(): SceneAction[] {
        const target = deps.scenePanes().gradient;
        const absent = SCENE_ABSENT.gradient;
        return [
            {
                token: "gradient.reset",
                icon: RotateCcw,
                title: "Reset",
                description: "Reset gradient to defaults.",
                rotateOnClick: true,
                state: resolve("gradient.reset", target?.reset ?? null, absent),
            },
            {
                token: "gradient.copyCSS",
                icon: Copy,
                title: "Copy CSS",
                description: "Copy the gradient CSS to clipboard.",
                state: resolve("gradient.copyCSS", target?.copyCSS ?? null, absent),
            },
            {
                token: "gradient.seedFromPalette",
                icon: Pipette,
                title: "Seed from palette",
                description: "Seed gradient stops from a saved palette.",
                state: resolve(
                    "gradient.seedFromPalette",
                    target?.seedFromPalette ?? null,
                    absent,
                ),
            },
        ];
    }

    function mixActions(): SceneAction[] {
        const target = deps.scenePanes().mix;
        const absent = SCENE_ABSENT.mix;
        return [
            {
                token: "mix.clearSelection",
                icon: Trash2,
                title: "Clear",
                description: "Clear all selected colors.",
                state: resolve(
                    "mix.clearSelection",
                    target?.clearSelection ?? null,
                    absent,
                ),
            },
            {
                token: "mix.startMix",
                icon: Blend,
                title: "Mix",
                description: "Mix the selected colors.",
                state: resolve("mix.startMix", target?.startMix ?? null, absent),
            },
            {
                token: "mix.copyResult",
                icon: Copy,
                title: "Copy result",
                description: "Copy the mixed color result.",
                state: resolve("mix.copyResult", target?.copyResult ?? null, absent),
            },
        ];
    }

    const sceneActions = computed<SceneActionSet | null>(() => {
        const scene = VIEW_SCENES[viewManager.currentView.value];
        if (scene === null) return null;

        if (scene === "color") {
            const target = deps.colorSceneTarget();
            const set: SceneActionSet = {
                scene,
                label: "Tools",
                icon: Paintbrush,
                actions: colorActions(),
            };
            // The edit arm is EXPRESSED in the contract, never smuggled in as an
            // escape hatch: its presence mounts the dock's color-input sub-layer
            // and its mode toggle, its absence is why a workbench bar carries
            // neither. It rides the picker's registration, so an unregistered
            // color scene surfaces its seats and nothing else — the pre-collapse
            // behaviour, now stated rather than implied by a null ref.
            return target === null
                ? set
                : { ...set, input: { canProposeName: target.canProposeName.value } };
        }

        return {
            scene,
            label: "Tools",
            icon: Paintbrush,
            actions:
                scene === "generate"
                    ? generateActions()
                    : scene === "gradient"
                      ? gradientActions()
                      : mixActions(),
        };
    });

    return { mobile, desktopLeft, desktopRight, sceneActions, bindPane, commitEdit, cancelEdit };
}
