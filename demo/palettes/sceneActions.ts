// X.W12U.k (A2-VA-L1-10): this scene's dock verbs live with the feature that
// owns them. The builder is PURE — it reads a target and asks the shell's
// resolver for each seat's state (`shell/useSceneActions.ts` owns dispatch,
// the failure ledger and the view → scene table); it holds no state itself.
import { Bookmark, Download, EyeOff, GitFork, Globe, Heart, History, Pencil, Tag, Trash2 } from "@lucide/vue";
import type {
    PaletteSceneTarget,
    ResolveSceneAction,
    SceneAction,
    SceneCommand,
} from "../color-session/keys";

export function paletteSceneActions(
    target: PaletteSceneTarget,
    resolve: ResolveSceneAction,
): SceneAction[] {
    const { commands } = target;
    const absent = "the palette does not offer this verb";
    const seat = (
        token: SceneAction["token"],
        command: SceneCommand | undefined,
        fields: Omit<SceneAction, "token" | "state">,
    ): SceneAction[] =>
        command === undefined
            ? []
            : [{ token, ...fields, state: resolve(token, command, absent) }];
    return [
        ...seat("palette.save", commands.save, {
            icon: Bookmark,
            title: "Save palette",
            description: "Save this palette to your library.",
        }),
        ...seat("palette.rename", commands.rename, {
            icon: Pencil,
            title: "Rename palette",
            description: "Rename the selected palette.",
        }),
        ...seat("palette.tags", commands.tags, {
            icon: Tag,
            title: "Edit tags",
            description: "Edit the selected palette's tags.",
        }),
        ...seat("palette.versions", commands.versions, {
            icon: History,
            title: "Version history",
            description: "Show the selected palette's versions.",
        }),
        ...seat("palette.publish", commands.publish, {
            icon: Globe,
            title: "Publish palette",
            description: "Publish the selected palette.",
        }),
        ...seat("palette.visibility", commands.visibility, {
            icon: target.isPublic ? EyeOff : Globe,
            title: target.isPublic ? "Make private" : "Make public",
            description: target.isPublic
                ? "Hide the selected palette from the public wall."
                : "Show the selected palette on the public wall.",
        }),
        ...seat("palette.fork", commands.fork, {
            icon: GitFork,
            title: "Remix palette",
            description: "Copy the selected palette into your library.",
        }),
        ...seat("palette.vote", commands.vote, {
            icon: Heart,
            title: target.voted ? "Remove vote" : "Vote",
            description: "Vote for the selected palette.",
            active: target.voted,
        }),
        ...seat("palette.export", commands.export, {
            icon: Download,
            title: "Export JSON",
            description: "Download the selected palette as JSON.",
        }),
        ...seat("palette.delete", commands.delete, {
            icon: Trash2,
            title: "Delete palette",
            description: "Delete the selected palette.",
        }),
    ];
}
