import type { Component, ComputedRef, InjectionKey, ShallowRef } from "vue";
// S.W2 · W2-1 transposition: the injected color-state shape is the merged
// pipeline's return (superset of the former useColorModel + useAppColorModel).
import type { UseColorPipelineReturn } from "./useColorPipeline";
import type { EditTarget } from "./color-model";

export const COLOR_MODEL_KEY: InjectionKey<UseColorPipelineReturn> =
    Symbol("COLOR_MODEL_KEY");
export const CSS_COLOR_KEY: InjectionKey<ComputedRef<string>> = Symbol("CSS_COLOR_KEY");
export const SAFE_ACCENT_KEY: InjectionKey<ComputedRef<string>> =
    Symbol("SAFE_ACCENT_KEY");
/** D6 (T.W3-5): the atmosphere's LIVE derived lightness — the page-ambient
 *  contrast referent (M-15's exposed value), provided by the boot writer and
 *  consumed by `useSafeAccentFn`/`useMarkdownColors` (the ink-on-tier law:
 *  the referent is a property of the surface, never a global constant). */
export const INK_AMBIENT_KEY: InjectionKey<ComputedRef<number>> =
    Symbol("INK_AMBIENT_KEY");
export const EDIT_TARGET_KEY: InjectionKey<ShallowRef<EditTarget | null>> =
    Symbol("EDIT_TARGET_KEY");

// ───────────────────────────────────────────────────────────────────────────
// X-W4 · CC-043 — THE ONE SCENE-ACTION CONTRACT
//
// This block is the SUCCESSOR of the two contracts the wave collapses:
// `ActionBarContext` (nine members, which stood right here) and
// `DockActionBar`/`DockAction` (`shell/usePaneRouter.ts`). They were not two
// layers of one contract — they were two RIVALS, selected against each other
// at render time by the Dock's `v-if="actionBar"` / `v-else-if="genericBar"`
// priority, so the picker's bar MASKED whichever scene bar stood beside it
// (`VIEW_MAP.mix` is the view where both existed). Three of the nine members
// could never change a rendered byte; every scene command left the shell
// through a `ref<any>` and an optional-chained `?.()` that resolved to
// `undefined`, in silence, whenever the pane had not registered.
//
// The collapse makes both failures unrepresentable:
//
//   · ONE owner-tokened union (`SceneActionToken`) names every action the
//     shell can dispatch, so an unregistered name is a TYPE error and not a
//     dead button — that is the whole distinction between a token union and
//     `string`, and `W4.md` §6 D3 is the falsifier that proves it bites.
//
//   · a command's resolution is TOTAL — `ready` | `blocked` | `unavailable` |
//     `failed`. There is no fifth answer and no `undefined`: an action whose
//     target has not registered is a MODELLED, rendered, named state, never
//     an optional call that quietly returns.
//
// The contract lives here, beside the injection keys the same two surfaces
// already share, because both ends speak it: the scene panes SATISFY the
// target shapes and the dock CONSUMES the set. Homing it in the router would
// point `picker/ColorPicker.vue` back at a module that imports the picker.
// ───────────────────────────────────────────────────────────────────────────

/** The scenes that own dock-dispatchable commands. */
export type SceneActionScene = "color" | "generate" | "gradient" | "mix";

/**
 * Every action the shell can name — a CLOSED union, never `string`.
 *
 * The token is the action's identity across the whole path: the contract keys
 * its failure store by it, the renderer stamps it on the seat
 * (`data-scene-action`), and `scene-action-contract.spec.ts` reads it. A token
 * that no scene builds is a compile error at the site that spells it.
 */
export type SceneActionToken =
    | "color.reset"
    | "color.copy"
    | "color.random"
    | "color.palettes"
    | "color.extract"
    | "generate.regenerate"
    | "generate.save"
    | "generate.copyColors"
    | "gradient.reset"
    | "gradient.copyCSS"
    | "gradient.seedFromPalette"
    | "mix.clearSelection"
    | "mix.startMix"
    | "mix.copyResult";

/**
 * A scene target's member: a user command. It may be synchronous or
 * asynchronous, and it may THROW — `useMixingState.startMix` parses its
 * operands and is the one exposed member that can (MP-3). The contract's
 * dispatcher is what makes that honest instead of silent; see `failed`.
 */
export type SceneCommand = () => void | Promise<void>;

/** The color session's dock commands plus the reactive state its seats read. */
export interface ColorSceneTarget {
    readonly isEditing: ComputedRef<boolean>;
    readonly canProposeName: ComputedRef<boolean>;
    readonly paletteActive: ComputedRef<boolean>;
    readonly reset: SceneCommand;
    readonly copy: SceneCommand;
    readonly random: SceneCommand;
}

export interface GenerateSceneTarget {
    readonly regenerate: SceneCommand;
    readonly save: SceneCommand;
    readonly copyColors: SceneCommand;
}

export interface GradientSceneTarget {
    readonly reset: SceneCommand;
    readonly copyCSS: SceneCommand;
    readonly seedFromPalette: SceneCommand;
}

export interface MixSceneTarget {
    readonly clearSelection: SceneCommand;
    readonly startMix: SceneCommand;
    readonly copyResult: SceneCommand;
}

/**
 * The three scenes whose target is a LAZY pane instance (`defineAsyncComponent`),
 * so the shell learns of them only when the slot reports a mount. The color
 * scene is deliberately NOT here: its target hangs off `App.vue`'s already-typed
 * `InstanceType<typeof ColorPicker>` ref and needs no registry.
 */
export interface ScenePaneTargetMap {
    generate: GenerateSceneTarget;
    gradient: GradientSceneTarget;
    mix: MixSceneTarget;
}

export type ScenePane = keyof ScenePaneTargetMap;

/** The ONE typed registry that replaces the three `ref<any>` pane refs. */
export type ScenePaneTargets = {
    readonly [S in ScenePane]: ScenePaneTargetMap[S] | null;
};

/**
 * What a named action resolves to. TOTAL by construction — this union is the
 * reason nothing on the action path can resolve to `undefined`.
 */
export type SceneActionState =
    /** The target has registered: the command exists and runs. */
    | { readonly kind: "ready"; readonly run: () => void }
    /** Present and registered, but refused right now (an open color edit). */
    | { readonly kind: "blocked"; readonly reason: string }
    /** The target has NOT registered: named, surfaced, inoperable — never silent. */
    | { readonly kind: "unavailable"; readonly reason: string }
    /**
     * The command ran and failed. It is ANNOUNCED here rather than left to the
     * app's only ErrorBoundary, which cannot see it: the dock band closes before
     * `<main>`, and the boundary lives inside `<main>` around `.pane-container`
     * (MP-3 / N10). The seat stays operable, so the state is recoverable.
     */
    | { readonly kind: "failed"; readonly detail: string; readonly run: () => void };

/** One named action, resolved against its scene's target. */
export interface SceneAction {
    readonly token: SceneActionToken;
    readonly icon: Component;
    readonly title: string;
    readonly description: string;
    readonly rotateOnClick?: boolean;
    readonly iconClass?: string;
    /**
     * AB-32 (binding on this collapse): the active/selected member. The
     * pre-collapse `ActionToolbar` fed the palette-open indicator through an
     * `:active-style` that `DockAction` had no member for — a collapse without
     * this field regresses the only palette-open indicator under a green gate.
     */
    readonly active?: boolean;
    readonly state: SceneActionState;
}

/**
 * The color scene's edit arm, expressed IN the contract rather than through an
 * escape hatch (`W4.md` §3a names exactly that failure: "D1 if a single
 * `SceneActionSet` cannot express the Picker's edit-mode arms without an escape
 * hatch"). Its presence is what mounts the dock's color-input sub-layer and its
 * mode toggle; its absence is why a workbench bar carries neither.
 */
export interface SceneInputArm {
    readonly canProposeName: boolean;
}

/** The ONE contract the Dock consumes. */
export interface SceneActionSet {
    readonly scene: SceneActionScene;
    /** The label beside the dock's Tools toggle. */
    readonly label: string;
    /** The icon on the dock's Tools toggle. */
    readonly icon: Component;
    readonly actions: readonly SceneAction[];
    readonly input?: SceneInputArm;
}
