// X.W12U.k (A2-VA-L1-10): this scene's dock verbs live with the feature that
// owns them. The builder is PURE — it reads a target and asks the shell's
// resolver for each seat's state (`shell/useSceneActions.ts` owns dispatch,
// the failure ledger and the view → scene table); it holds no state itself.
import { Blend, Copy, Trash2 } from "@lucide/vue";
import type {
    MixSceneTarget,
    ResolveSceneAction,
    SceneAction,
} from "../../color-session/keys";

/** The reason this scene's seats carry when its pane has not registered. */
const MIX_ABSENT = "the Mix pane is not registered in this layout";

export function mixSceneActions(
    target: MixSceneTarget | null,
    resolve: ResolveSceneAction,
): SceneAction[] {
    const absent = MIX_ABSENT;
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
