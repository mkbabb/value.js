// useSceneTargets — the scene-TARGET registry (X-W4 · CC-043) and the
// mount-report folding that feeds it. Moved out of `App.vue` into the shell at
// X.W12U.k (A2-VA-L1-10): the app root wired a shell concern by hand, and the
// pane router consumed what the root folded. ONE typed registry replaces the
// three `ref<any>` pane-instance refs the dock used to dispatch onto;
// `readScenePaneTarget` verifies the instance actually exposes the scene's
// commands, so "registered" is a measured fact — a pane that renamed a member
// surfaces as the contract's `unavailable` state, never a dead dock button.

import { ref, shallowRef, type Ref, type ShallowRef } from "vue";

import type {
    ScenePane,
    ScenePaneTargetMap,
    ScenePaneTargets,
} from "../color-session/keys";
import type { ColorPicker } from "../picker";
import { ROLE_PANES } from "./usePaneRouter";
import type { RegionRole } from "./viewSchema";

type ColorPickerInstance = InstanceType<typeof ColorPicker>;

/** The commands each lazy pane scene must expose to count as registered. */
const SCENE_PANE_COMMANDS: {
    readonly [S in ScenePane]: readonly (keyof ScenePaneTargetMap[S] & string)[];
} = {
    generate: ["regenerate", "save", "copyColors"],
    gradient: ["reset", "copyCSS", "seedFromPalette"],
    mix: ["clearSelection", "startMix", "copyResult"],
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

/** The picker instance, read back from the slot's mount report. */
function readColorPicker(instance: unknown): ColorPickerInstance | null {
    if (typeof instance !== "object" || instance === null) return null;
    const exposed = instance as Record<string, unknown>;
    if (typeof exposed.commitEdit !== "function") return null;
    if (
        typeof exposed.sceneActionTarget !== "object" ||
        exposed.sceneActionTarget === null
    ) {
        return null;
    }
    return instance as ColorPickerInstance;
}

export interface SceneTargets {
    /** The picker instance — the colour scene's target and the edit channel. */
    colorPicker: Ref<ColorPickerInstance | null>;
    scenePanes: ShallowRef<ScenePaneTargets>;
    /** Every region's mount report, carrying the seat and the LIVE pane key. */
    onPaneMount: (role: RegionRole, instance: unknown, key: string) => void;
}

export function useSceneTargets(): SceneTargets {
    const colorPicker = ref<ColorPickerInstance | null>(null);
    const scenePanes = shallowRef<ScenePaneTargets>({
        generate: null,
        gradient: null,
        mix: null,
    });

    /**
     * Publish a registry revision ONLY when a target actually changed.
     *
     * `PaneSlot` binds its mount report as an INLINE function ref
     * (`:ref="(el) => onMount(el)"`), so its identity differs on every render and
     * Vue re-invokes it on every patch of the slot. A `shallowRef` whose value is
     * replaced by a fresh object literal would therefore trigger on every patch —
     * and this registry is read by `sceneActions`, which App's own render reads, so
     * every such trigger re-enters App's render effect. The three `ref<any>` this
     * replaces were immune by accident (assigning the same instance to a `ref` is a
     * no-op write, and nothing rendered them); the registry earns it deliberately.
     */
    function publishScenePanes(next: ScenePaneTargets) {
        const current = scenePanes.value;
        if (
            current.generate === next.generate &&
            current.gradient === next.gradient &&
            current.mix === next.mix
        ) {
            return;
        }
        scenePanes.value = next;
    }

    /**
     * What ONE slot's mount report says about ONE scene.
     *
     * A slot reports through `PaneSlot`'s inline function ref
     * (`:ref="(el) => onMount(el)"`), so Vue re-invokes it on every patch of that
     * slot — and for a `defineAsyncComponent` pane inside `<KeepAlive>` the object
     * it hands back ALTERNATES between the resolved pane's exposed instance and the
     * wrapper's own bare public instance. Measured at this seat on `/#/mix`, in one
     * render pass: 102 reports carrying `clearSelection/startMix/copyResult` against
     * 53 carrying nothing at all.
     *
     * A report that is not this scene's pane is therefore NOT evidence that the pane
     * is gone. Reading it as a de-registration made the registry flip null↔target on
     * every patch — and the registry is read by `sceneActions`, which App's own
     * render reads, so App's render effect was mutating its own dependency:
     * *"Maximum recursive updates exceeded in component <App>"*, measured live.
     *
     * So a report means exactly what it says, and nothing more:
     *   · the slot no longer shows this scene → cleared;
     *   · an explicit unmount (`null`)        → cleared;
     *   · an instance exposing the scene's commands → registered;
     *   · anything else → not a fact about this scene; what is registered stands.
     *
     * The last arm is not a fallback over a defect: a pane that renamed a command
     * never satisfies `readScenePaneTarget`, so it never registers, and the contract
     * surfaces it as `unavailable` — which is the whole point of D4.
     */
    function foldSceneReport<S extends ScenePane>(
        scene: S,
        slotOwnsScene: boolean,
        instance: unknown,
    ): ScenePaneTargetMap[S] | null {
        if (!slotOwnsScene || instance === null) return null;
        return readScenePaneTarget(scene, instance) ?? scenePanes.value[scene];
    }

    /** The same reading for the colour scene, whose target is the picker itself. */
    function foldColorPickerReport(
        slotOwnsScene: boolean,
        instance: unknown,
    ): ColorPickerInstance | null {
        if (!slotOwnsScene || instance === null) return null;
        return readColorPicker(instance) ?? colorPicker.value;
    }

    /**
     * ONE mount report, for every seat, keyed by what actually reported.
     *
     * X.W5.a (fold W5F-02): the two callbacks this replaces re-derived the pane's
     * identity from the route-synchronous `currentConfig` while the slot renders
     * one rAF behind plus chunk latency — so the OUTGOING instance was filed under
     * the INCOMING pane's name for a measured 1275 ms window. The slot now reports
     * the LIVE key beside the instance and the derivation is gone.
     *
     * The scene-COMMAND registry (X-W4 · CC-043) is published from the two desktop
     * seats exactly as X-W4 authored it. The mobile seat's command channel is NOT
     * opened here: COHESION §0k.3 **S-1** rules that `bindPane` is "narrowed to
     * non-command instance uses" and that "the `DockCommand` provide/inject
     * registry lands at X-W8"; X-W5 holds A3's WITNESS and may not claim its cure.
     * What the mobile seat DOES gain is the narrowed channel itself — the edit
     * commit/cancel and the external-colour apply, which `bindPane` owns for all
     * three seats (`usePaneRouter`), and which were structurally dead below the
     * breakpoint because the mobile slot passed no mount report at all.
     */
    function onPaneMount(role: RegionRole, instance: unknown, key: string) {
        // What this ROLE can ever seat, derived from the scene table. A report is
        // only evidence about a scene the reporting seat could be showing — which
        // is what the retired `slot === "left"` / `slot === "right"` string tests
        // were approximating by hand, one physical side at a time.
        const seats = ROLE_PANES[role];
        if (seats.has("color-picker")) {
            colorPicker.value = foldColorPickerReport(key === "color-picker", instance);
        }
        const read = <S extends ScenePane>(scene: S): ScenePaneTargetMap[S] | null =>
            seats.has(scene)
                ? foldSceneReport(scene, key === scene, instance)
                : scenePanes.value[scene];
        publishScenePanes({
            generate: read("generate"),
            gradient: read("gradient"),
            mix: read("mix"),
        });
    }

    return { colorPicker, scenePanes, onPaneMount };
}
