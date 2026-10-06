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
