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
    defineComponent,
    h,
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
import PaneLoadingPlate from "./PaneLoadingPlate.vue";
import PaneErrorPlate, { PaneChunkError } from "./PaneErrorPlate.vue";
import type {
    PaneId,
    RegionRole,
    SceneRegion,
    ViewManager,
} from "./useViewManager";
import type {
    ColorSceneTarget,
    SceneActionSet,
    ScenePaneTargets,
} from "../color-session/keys";
import { useSceneActions } from "./useSceneActions";

// X.W5.c — the three SEATS (`"mobile" | "left" | "right"`) are gone with the
// breakpoint fork that invented them. A seat is now a region ROLE, and the
// schema names it: one scene, one ordered `regions[]`, one mount path.

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
export interface ResolvedRegion {
    /** What this region IS in the scene (stage / inspector / action). */
    role: RegionRole;
    /** The region's own accessible name, straight off the schema. */
    label: string;
    component: Component;
    key: PaneId;
    props: PaneRenderProps;
}

/**
 * Which panes each region role can ever seat — DERIVED from the scene table.
 *
 * Two consumers need it and neither may hand-count: the KeepAlive bound below,
 * and App's mount-report fold, which must know what a seat could be showing to
 * know that a report naming something else means "this seat no longer shows
 * that pane". The retired code answered both with literals — `:max="9"` /
 * `:max="6"` / `:max="4"` hand-counted against a table in another file, and a
 * `slot === "left"` string test — so a route added tomorrow silently re-broke
 * both.
 */
export const ROLE_PANES: Record<RegionRole, ReadonlySet<PaneId>> = (() => {
    const acc: Record<RegionRole, Set<PaneId>> = {
        stage: new Set(),
        inspector: new Set(),
        action: new Set(),
    };
    for (const config of Object.values(VIEW_MAP)) {
        for (const region of config.regions) acc[region.role].add(region.pane);
    }
    return acc;
})();

/**
 * The KeepAlive bound, DERIVED from the scene table (gate **N7**).
 *
 * Counting the schema's own distinct pane names per role means a route added
 * tomorrow cannot silently re-break the bound: correcting a literal would have
 * fixed today and nothing else.
 */
export const PANE_CACHE_MAX: Record<RegionRole, number> = (() => {
    const bound = { stage: 0, inspector: 0, action: 0 };
    for (const role of Object.keys(bound) as RegionRole[]) {
        bound[role] = ROLE_PANES[role].size;
    }
    return bound;
})();

// ── Component registry — one table, was duplicated across the two routers ──

// X.W5.d2 · P-3 (fold W5F-07 ≡ EB-4 · GEN-33): the ten lazy panes were bare
// `defineAsyncComponent(() => import(…))` — zero `loadingComponent`,
// `errorComponent`, `delay`, `onError`. Under the slot's `mode="out-in"` the
// region is EMPTY while a chunk is in flight, and a failed chunk ("Importing a
// module script failed." — the stale-chunk class) had no reload affordance and
// latched the region's boundary for the session. Every lazy pane now loads
// through ONE factory:
//   · `loadingComponent` + `delay` — the empty frame gets an honest occupant,
//     but only once the chunk is slow enough to be SEEN missing (a warm or
//     cached chunk never flashes a plate);
//   · `errorComponent` — the failed chunk's plate, with the reload that is
//     the only cure for a stale chunk;
//   · the loader's rejection is re-raised as a typed `PaneChunkError` naming
//     its pane, which is how the region's `<ErrorBoundary>` tells this
//     environment failure (the plate owns it) from a render throw (the
//     boundary owns it) — EB R-1: loader options alone do not stop the
//     error's propagation into the boundary, so EB-4 and EB-2 land together.
// No `timeout`: a slow network is not a failure, and a timed-out chunk that
// arrives later would be shown an error plate it had already outrun — the
// loading plate stays until the browser itself resolves or rejects the import.
//
// X.W5.d4 (COHESION §0az · ESC-W5d3-1, ruled (a)): the factory also PUBLISHES
// the loader's readiness. Before, one async wrapper swapped its loading plate
// for the resolved pane as its own root, inside the slot's ONE `<Transition>`
// child and under ONE key — out-in never governed that swap, and on a cold
// navigation Vue's enter guard (`leavingVNodesCache[key] === vnode`, the
// plate's leave filed under the pane's own key) dropped the pane's enter: the
// pane held `vj-enter-enter-from` for good (the gradient rail at x = −351).
// Now a lazy pane has two phases the slot keys apart (`PaneSlot`,
// `(pane, resolved)`), so out-in runs plate-leave THEN pane-enter:
//   · the PLATE PHASE — the component this factory returns, the table's entry
//     and the slot's occupant while the chunk is unresolved. It carries the
//     whole P-3 contract above unchanged (`loadingComponent` + `delay`,
//     `errorComponent`, the typed `PaneChunkError`), and it ENDS ON THE PLATE:
//     its wrapper resolves to `PaneLoadingPlate`, never to the pane, so a
//     leaving plate phase can never grow the pane inside itself (measured: a
//     wrapper that resolved to the pane under the pending key mounted the pane
//     inside its own leave — `insertBefore` NotFoundError, both regions latched
//     to their boundary). It is named `PANE_PLATE_PHASE`, which the slot's
//     `<KeepAlive>` excludes: a transient occupant is never cached;
//   · the RESOLVED PANE — the module's component, published through
//     `resolvedPane` the moment the loader's promise fulfils (the loader
//     itself, never a Vue-internal field of the wrapper).
export const PANE_LOAD_DELAY_MS = 200;

/**
 * X.W12U.s3 · UIA-V-606 / V-616 — the plate phase's way out. A chunk that
 * never settles (a stalled dev server, a hung network) used to hold "Loading
 * the scene…" forever: `defineAsyncComponent` had an `errorComponent` but no
 * `timeout`, so the error plate (and its recovery action) was unreachable for
 * a load that neither resolved nor rejected. Past this bound the wrapper's
 * loader rejects with the typed `PaneChunkError` — the one failure class the
 * region's `ErrorBoundary` lets `PaneErrorPlate` own (Vue's own `timeout`
 * option throws a bare Error, which the boundary latches as an "unexpected
 * error" with the raw message). The underlying load keeps running (one shared
 * `loadOnce`), so a late chunk still publishes the resolved pane.
 */
export const PANE_LOAD_TIMEOUT_MS = 20_000;

function withinLoadBound<T>(pane: string, load: Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(
            () =>
                reject(
                    new PaneChunkError(pane, {
                        cause: new Error(`pane chunk not settled after ${PANE_LOAD_TIMEOUT_MS} ms`),
                    }),
                ),
            PANE_LOAD_TIMEOUT_MS,
        );
        load.then(
            (value) => {
                clearTimeout(timer);
                resolve(value);
            },
            (cause: unknown) => {
                clearTimeout(timer);
                reject(cause);
            },
        );
    });
}

/** The name every lazy pane's plate phase carries — `PaneSlot`'s `<KeepAlive>` excludes it. */
export const PANE_PLATE_PHASE = "PanePlatePhase";

/** Plate phase → its pane's resolution (`null` until the loader fulfils). */
const PANE_RESOLUTION = new WeakMap<Component, Readonly<ShallowRef<Component | null>>>();

/** Plate phase → its ONE memoized chunk load (shared by the async wrapper and `preloadPane`). */
const PANE_LOAD = new WeakMap<Component, () => Promise<unknown>>();

/**
 * X.W12.b (OA-25 — one enter per region) — start a lazy pane's chunk BEFORE
 * the slot commits the swap, so a chunk that lands inside the plate's own
 * `delay` swaps straight to the pane: one leave, one enter. Measured before
 * (`w12-motion` census, W12-evidence/b/before): every swap to an unresolved
 * pane ran the region's travel twice — the plate phase slid in, slid out
 * under out-in, then the pane slid in — and the boot's inspector landed as a
 * plate, then flew in off-canvas on the pane-swap family instead of the
 * overture. Resolves when the pane is published; rejects with the loader's
 * typed `PaneChunkError`. `null` for an eager or already-resolved pane.
 */
export function preloadPane(component: Component): Promise<unknown> | null {
    if (resolvedPane(component) !== null) return null;
    return PANE_LOAD.get(component)?.() ?? null;
}

/**
 * The pane a table entry renders as, REACTIVELY: an eager pane is itself; a
 * lazy pane's plate phase is its resolved pane once the loader has fulfilled,
 * and `null` until then (the slot then renders the plate phase).
 */
export function resolvedPane(component: Component): Component | null {
    const resolution = PANE_RESOLUTION.get(component);
    return resolution === undefined ? component : resolution.value;
}

function lazyPane<T extends Component>(
    pane: string,
    load: () => Promise<{ default: T }>,
): Component {
    const resolution = shallowRef<T | null>(null);
    // One load per pane, shared by the wrapper and `preloadPane`; a rejection
    // is not memoized, so the wrapper's own retry path is unchanged.
    let pending: Promise<T> | null = null;
    const loadOnce = (): Promise<T> =>
        (pending ??= load().then(
            (module) => {
                resolution.value = module.default;
                return module.default;
            },
            (cause: unknown) => {
                pending = null;
                return Promise.reject(new PaneChunkError(pane, { cause }));
            },
        ));
    const plate = defineAsyncComponent({
        loader: () => withinLoadBound(pane, loadOnce()).then(() => PaneLoadingPlate),
        loadingComponent: PaneLoadingPlate,
        errorComponent: PaneErrorPlate,
        delay: PANE_LOAD_DELAY_MS,
    });
    const platePhase = defineComponent({
        name: PANE_PLATE_PHASE,
        setup: () => () => h(plate),
    });
    PANE_RESOLUTION.set(platePhase, resolution);
    PANE_LOAD.set(platePhase, loadOnce);
    return platePhase;
}

const AboutPane = lazyPane("about", () => import("../scenes/about/AboutPane.vue"));
const PalettesPane = lazyPane("palettes", () => import("../palettes/PalettesPane.vue"));
const BrowsePane = lazyPane("browse", () => import("../palettes/BrowsePane.vue"));
const ExtractPane = lazyPane("extract", () => import("../workbenches/extract/ExtractPane.vue"));
const GeneratePane = lazyPane(
    "generate",
    () => import("../workbenches/generate/GeneratePane.vue"),
);
const GradientPane = lazyPane(
    "gradient",
    () => import("../workbenches/gradient/GradientPane.vue"),
);
const MixPane = lazyPane("mix", () => import("../workbenches/mix/MixPane.vue"));
const AdminPane = lazyPane("admin", () => import("../palettes/admin/AdminPane.vue"));
const AuroraPane = lazyPane("aurora", () => import("../scenes/atmosphere/AuroraPane.vue"));
const BlobPane = lazyPane("blob", () => import("../scenes/blob/BlobPane.vue"));

/**
 * The one name→component map this module's header promises — now TOTAL over the
 * schema's pane unions.
 *
 * X-W3 · G-19 (fold S-8). The predecessor was an `if`-chain over
 * `name: string | null` ending `return ColorPicker;`. That tail was a
 * fail-OPEN default: a pane name the schema grew without a component here
 * silently rendered the picker, and `usePaneRouter.ts:80`'s own doc comment
 * ("`null` for an unknown name") contradicted it. The gate is STRUCTURAL rather
 * than runtime because the tail was also provably unreachable — every call site
 * passes a `SceneRegion.pane`, already typed `PaneId`, and
 * `useViewManager`'s clamp runs the route name through `isViewId` — so no
 * runtime probe could reach it. `Record<PaneId, Component>` is what makes the
 * totality checkable: `vue-tsc` rejects this table the moment `viewSchema.ts`
 * names a pane it does not carry, and rejects a key the union does not name.
 * The fail-closed answer for a genuinely unknown view comes from the schema —
 * `not-found` is a real view with a real component.
 *
 * X.W5.c: the `| null` arm is gone with the empty right slot. A region that
 * exists has a pane; a region that does not exist is not in `regions[]`, so
 * "an empty slot" is no longer a state the shell can be in — which is what
 * retired the ghost wrapper and its `visibility:hidden` geometry.
 */
const PANE_COMPONENTS: Record<PaneId, Component> = {
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

/** Maps a region's pane name to its component. TOTAL over `PaneId`. */
function componentFor(pane: PaneId): Component {
    return PANE_COMPONENTS[pane];
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

const PANE_INSTANCE_MEMBERS = [
    "commitEdit",
    "cancelEdit",
    "applyExternalColor",
] as const;

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
    onPaneMount: (role: RegionRole, instance: unknown, key: string) => void;
    onEditTargetChange: (et: EditTarget | null) => void;
    resetToDefaults: () => void;
    updateModel: (v: ColorModel) => void;
}

export function usePaneRouter(
    viewManager: ViewManager,
    model: ShallowRef<ColorModel>,
    deps: PaneRouterDeps,
): {
    /** The current scene's regions, IN ORDER — the shell's one mount path. */
    regions: ComputedRef<ResolvedRegion[]>;
    sceneActions: ComputedRef<SceneActionSet | null>;
    /** Register one region's mount reports. Required at every `PaneSlot`. */
    bindPane: (role: RegionRole) => (instance: unknown, key: string) => void;
    /** The ONE edit-commit home (fold W5F-59) — the dock seat and the palettes
     *  editor both call these; there is no second wiring to drift from. */
    commitEdit: () => void;
    cancelEdit: () => void;
} {
    const currentConfig = computed(() => viewManager.currentConfig.value);

    // ── The non-command instance channel (S-1) ──────────────────────────────
    //
    // `bindPane` is bound at EVERY region, not at a privileged pair: the mobile
    // slot passed no `:on-mount` at all, which is why the edit channel was
    // structurally dead below the breakpoint — the dock's Save/Cancel settled
    // the pane index while the edit was DISCARDED (⟨ActionBarToggle ABT-2⟩'s
    // limb). Uniform registration is also why the KILLED cut-step
    // ⟨GenericActionBar GAB-11⟩ ("retain the left mount callback only for
    // `colorPickerRef`") is not what this is: no seat is privileged. With one
    // mount path there is no second seat to privilege.
    const paneInstance = shallowRef<PaneInstanceHandle | null>(null);
    const paneInstanceSeat = shallowRef<RegionRole | null>(null);

    function releaseSeat(role: RegionRole): void {
        if (paneInstanceSeat.value !== role) return;
        paneInstance.value = null;
        paneInstanceSeat.value = null;
    }

    function bindPane(role: RegionRole): (instance: unknown, key: string) => void {
        return (instance: unknown, key: string) => {
            deps.onPaneMount(role, instance, key);
            // The region no longer shows the pane that owns this channel, or an
            // explicit unmount arrived → the channel is gone from this seat.
            if (key !== "color-picker" || instance === null) {
                releaseSeat(role);
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
            paneInstanceSeat.value = role;
        };
    }

    /**
     * Commit the open colour edit — ONE home.
     *
     * Fold W5F-59: this pair was implemented twice with drifted wirings (the
     * dock seat added the pane settle, the palettes prop bag did not). With no
     * registered pane there is nothing to commit, and the UI says nothing
     * rather than reporting a success that did not happen (Dock structure (f) —
     * "an absent capability is ABSENT").
     *
     * X.W5.c: the pane SETTLE that used to ride these two calls
     * (a write of the mobile pane index) is gone with the index itself. It was the
     * visible success signal of ⟨ActionBarToggle ABT-2⟩'s limb — the UI
     * reporting a commit by flipping which pane the phone could see, whether or
     * not the edit landed. Both regions are on screen now, so the commit's only
     * report is the commit.
     */
    function commitEdit(): void {
        const handle = paneInstance.value;
        if (handle === null) return;
        handle.commitEdit();
    }

    function cancelEdit(): void {
        const handle = paneInstance.value;
        if (handle === null) return;
        handle.cancelEdit();
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

    /**
     * The prop bag for ONE pane — one path, TOTAL over `PaneId`.
     *
     * X.W5.c: `leftProps` and `rightProps` were two functions over two physical
     * unions, and each had its own `noProps()` tail. A pane's props depend on
     * the pane, never on which side of a grid it landed on, so the fork was
     * never expressing anything; it was the schema's physical axis reaching
     * into the router. The switch is exhaustive, so `vue-tsc` names the pane
     * the day `viewSchema.ts` grows one.
     */
    function propsFor(pane: PaneId): PaneRenderProps {
        switch (pane) {
            case "color-picker":
                return pickerProps();
            case "extract":
                return extractProps();
            case "about":
                return aboutProps();
            case "palettes":
                return palettesProps();
            case "admin-users":
            case "admin-names":
            case "admin-audit":
            case "admin-flagged":
            case "admin-tags":
                return adminProps(pane);
            case "browse":
            case "generate":
            case "gradient":
            case "atmosphere":
            case "mix":
            case "blob":
            case "not-found":
                return noProps();
        }
    }

    /** One region, resolved. */
    function resolveRegion(region: SceneRegion): ResolvedRegion {
        return {
            role: region.role,
            label: region.label,
            component: componentFor(region.pane),
            key: region.pane,
            props: propsFor(region.pane),
        };
    }

    /**
     * THE MOUNT PATH (V·L2 · gates C1/C3/C5).
     *
     * One computed, one order, every region of every scene. The three it
     * replaces — `mobile`, `desktopLeft`, `desktopRight` — were one logical
     * concern rendered through a breakpoint-predicate v-if fork, and the fork is
     * what made a region a subtree a viewport could remount out of existence:
     * crossing the compound query destroyed every `<KeepAlive>` cache and every
     * WebGL context on the way past (gate C5's born-RED: canvas identity kept
     * 1 of 2, pane-root identity 0 of 2). Nothing decides WHICH regions render
     * any more, so nothing can decide to render fewer of them.
     */
    const regions = computed<ResolvedRegion[]>(() =>
        currentConfig.value.regions.map(resolveRegion),
    );

    // The ONE scene action set (X-W4 · CC-043) is the shell's `useSceneActions`;
    // each scene's verbs are built by the feature that owns them (A2-VA-L1-10).
    const sceneActions = useSceneActions(viewManager, deps);

    return { regions, sceneActions, bindPane, commitEdit, cancelEdit };
}
