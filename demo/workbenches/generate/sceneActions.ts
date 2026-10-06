// X.W12U.k (A2-VA-L1-10): this scene's dock verbs live with the feature that
// owns them. The builder is PURE — it reads a target and asks the shell's
// resolver for each seat's state (`shell/useSceneActions.ts` owns dispatch,
// the failure ledger and the view → scene table); it holds no state itself.
import { Copy, RefreshCw, Save } from "@lucide/vue";
import type {
    GenerateSceneTarget,
    ResolveSceneAction,
    SceneAction,
} from "../../color-session/keys";

/** The reason this scene's seats carry when its pane has not registered. */
const GENERATE_ABSENT = "the Generate pane is not registered in this layout";

export function generateSceneActions(
    target: GenerateSceneTarget | null,
    resolve: ResolveSceneAction,
): SceneAction[] {
    const absent = GENERATE_ABSENT;
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
