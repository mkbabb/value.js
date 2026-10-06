// X.W12U.k (A2-VA-L1-10): this scene's dock verbs live with the feature that
// owns them. The builder is PURE — it reads a target and asks the shell's
// resolver for each seat's state (`shell/useSceneActions.ts` owns dispatch,
// the failure ledger and the view → scene table); it holds no state itself.
import { Copy, Pipette, RotateCcw } from "@lucide/vue";
import type {
    GradientSceneTarget,
    ResolveSceneAction,
    SceneAction,
} from "../../color-session/keys";

/** The reason this scene's seats carry when its pane has not registered. */
const GRADIENT_ABSENT = "the Gradient pane is not registered in this layout";

export function gradientSceneActions(
    target: GradientSceneTarget | null,
    resolve: ResolveSceneAction,
): SceneAction[] {
    const absent = GRADIENT_ABSENT;
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
