// useSceneActions — the ONE scene action set the dock renders (X-W4 · CC-043),
// split out of `usePaneRouter` at X.W12U.k (A2-VA-L1-10).
//
// The contract lives in `color-session/keys.ts` (both ends speak it). What
// lives HERE is the shell half: which scene a view owns, how a command is
// dispatched and its failure surfaced, and the selected-entity registry. Each
// scene's VERBS are built by the feature that owns them (`picker/`,
// `workbenches/{generate,gradient,mix}/`, `palettes/` — one `sceneActions.ts`
// each); `usePaneRouter` keeps region resolution and only consumes this.

import { computed, provide, shallowRef, type ComputedRef } from "vue";
import { Paintbrush, Palette } from "@lucide/vue";

import type {
    ColorSceneTarget,
    PaletteSceneTarget,
    SceneActionScene,
    SceneActionSet,
    SceneActionState,
    SceneActionToken,
    SceneCommand,
    ScenePaneTargets,
} from "../color-session/keys";
import { SELECTED_ENTITY_KEY } from "../color-session/keys";
import { paletteSceneActions } from "../palettes/sceneActions";
import { colorSceneActions } from "../picker/sceneActions";
import { generateSceneActions } from "../workbenches/generate/sceneActions";
import { gradientSceneActions } from "../workbenches/gradient/sceneActions";
import { mixSceneActions } from "../workbenches/mix/sceneActions";
import type { ViewId, ViewManager } from "./useViewManager";

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

export interface SceneActionDeps {
    /** The color scene's target — the picker's own exposed contract, or null. */
    colorSceneTarget: () => ColorSceneTarget | null;
    /** The ONE typed registry that replaced the three `ref<any>` pane refs. */
    scenePanes: () => ScenePaneTargets;
}

export function useSceneActions(
    viewManager: ViewManager,
    deps: SceneActionDeps,
): ComputedRef<SceneActionSet | null> {
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

    // ── The selected-entity inspector (X.W7.d2 · COHESION §0bk.1) ───────────
    //
    // The builder's one entity input. The shell provides the registry; a
    // palette inspector pushes its target while its palette is the selected
    // entity and removes exactly its own when it is deselected, deactivated or
    // unmounted. While an entity is selected, ITS verbs are the dock's set —
    // the `palette` scene of the same typed contract, built and resolved here
    // exactly as every other scene is, so a verb that throws is the modelled
    // `failed` state, never a silent seat.
    const selectedEntities = shallowRef<readonly PaletteSceneTarget[]>([]);
    provide(SELECTED_ENTITY_KEY, selectedEntities);

    const sceneActions = computed<SceneActionSet | null>(() => {
        const entity = selectedEntities.value.at(-1);
        if (entity !== undefined) {
            return {
                scene: "palette",
                label: entity.name,
                icon: Palette,
                actions: paletteSceneActions(entity, resolve),
            };
        }

        const scene = VIEW_SCENES[viewManager.currentView.value];
        if (scene === null) return null;

        if (scene === "color") {
            const target = deps.colorSceneTarget();
            const set: SceneActionSet = {
                scene,
                label: "Tools",
                icon: Paintbrush,
                actions: colorSceneActions(target, resolve, toggleTo),
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
                    ? generateSceneActions(deps.scenePanes().generate, resolve)
                    : scene === "gradient"
                      ? gradientSceneActions(deps.scenePanes().gradient, resolve)
                      : mixSceneActions(deps.scenePanes().mix, resolve),
        };
    });

    return sceneActions;
}
