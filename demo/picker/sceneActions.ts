// X.W12U.k (A2-VA-L1-10): this scene's dock verbs live with the feature that
// owns them. The builder is PURE — it reads a target and asks the shell's
// resolver for each seat's state (`shell/useSceneActions.ts` owns dispatch,
// the failure ledger and the view → scene table); it holds no state itself.
import { Camera, Copy, Dices, Palette, RotateCcw } from "@lucide/vue";
import type {
    ColorSceneTarget,
    ResolveSceneAction,
    SceneAction,
    SceneCommand,
} from "../color-session/keys";

/** The reason this scene's seats carry when its pane has not registered. */
const COLOR_ABSENT = "the color picker is not registered in this layout";

/**
 * @param toggleTo the shell's view switch for the two NAVIGATION seats
 *                 (Palettes, Extract) — a route act, not a picker command.
 */
export function colorSceneActions(
    target: ColorSceneTarget | null,
    resolve: ResolveSceneAction,
    toggleTo: (view: "palettes" | "extract") => SceneCommand,
): SceneAction[] {
    const absent = COLOR_ABSENT;
    // The pre-collapse `ActionToolbar` disabled the two navigation seats
    // while an edit was open; that refusal is now a MODELLED state with its
    // own reason, distinct from an unregistered target.
    const editing =
        target?.isEditing.value === true
            ? "finish the open color edit first"
            : undefined;
    // X.W12U.m3 (§0fh.4, X-13-RUN): the face's priority, DECLARED. The listed
    // order is the run's display order and stays; the priority says which
    // seats a narrow coarse run keeps. Commit first: Copy is the act that takes
    // the colour out of the picker. Then the most-used: Palettes (where a colour
    // is kept, and the seat that carries the palette-open indicator, AB-32),
    // Random, Extract; Reset last (the one undo-to-default verb).
    return [
        {
            token: "color.reset",
            priority: 5,
            icon: RotateCcw,
            title: "Reset color",
            description: "Reset to the default color.",
            iconClass: "hover:-rotate-180 duration-normal",
            rotateOnClick: true,
            state: resolve("color.reset", target?.reset ?? null, absent),
        },
        {
            token: "color.copy",
            priority: 1,
            icon: Copy,
            title: "Copy color",
            description: "Copy the current color.",
            state: resolve("color.copy", target?.copy ?? null, absent),
        },
        {
            token: "color.random",
            priority: 3,
            icon: Dices,
            title: "Random color",
            description: "Pick a random color.",
            state: resolve("color.random", target?.random ?? null, absent),
        },
        {
            token: "color.palettes",
            priority: 2,
            icon: Palette,
            title: "Palettes",
            description: "Save, browse, and publish color palettes.",
            // AB-32: the active/selected member the collapse must carry.
            active: target?.paletteActive.value === true,
            state: resolve("color.palettes", toggleTo("palettes"), absent, editing),
        },
        {
            token: "color.extract",
            priority: 4,
            icon: Camera,
            title: "Extract palette",
            description: "Open image palette extraction from a photo or camera.",
            state: resolve("color.extract", toggleTo("extract"), absent, editing),
        },
    ];
}
