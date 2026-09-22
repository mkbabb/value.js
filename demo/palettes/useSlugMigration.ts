import { ref, type Ref, type ComputedRef } from "vue";
import { createAndSavePalette } from "./api";
import { ApiProblem } from "../platform/transport/api-problem";
import type { Palette } from "./types";
import type { ViewId } from "../shell/useViewManager";
import type { PaletteSlugBar } from "./browser/slug";

/**
 * The slug-migration composable's dependency contract.
 *
 * X.W5.c · gate N12 (⟨PaletteSlugBar · A-31⟩) — every member here has a live
 * READER. Four did not:
 *   · `userLogout` and `ensureUser` were REQUIRED deps this composable never
 *     called once (the complete `deps.` read-set excluded both), while it
 *     hard-imported `useSession` and reached past the injection for the
 *     session-ensure it actually used. A required dep with no reader is a
 *     contract the composable does not honour, and making it optional would
 *     only make it an optional phantom. `ensureSession` replaces the hard
 *     import: the one session capability this module uses, injected like
 *     everything else.
 *   · `activeTab` was the pre-router tab model's write target, reachable only
 *     through an else-branch the sole caller could never take (it always
 *     supplies the setter). Its only possible act was a write to a readonly
 *     computed.
 *   · `setActiveTab?: ((tab: string) => void)` was optional AND string-typed;
 *     it is now `setActiveView`, required, and speaks `ViewId` — which is
 *     what makes `"saved"` a compile error instead of a synchronous
 *     vue-router throw at runtime (gate N2).
 */
export interface SlugMigrationDeps {
    savedPalettes: Ref<Palette[]> | ComputedRef<Palette[]>;
    userLogin: (slug: string) => Promise<void>;
    userRegenerate: () => Promise<string>;
    adminLogin: (token: string) => void;
    clearUserSlug: () => void;
    ensureSession: () => Promise<void>;
    setActiveView: (id: ViewId) => void;
}

export function useSlugMigration(deps: SlugMigrationDeps) {

    const showMigrateDialog = ref(false);
    const migrateMode = ref<"switch" | "regenerate">("switch");
    const pendingMigrateAction = ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>(null);
    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);

    async function publishAllLocal() {
        try {
            await deps.ensureSession();
            for (const palette of deps.savedPalettes.value) {
                try {
                    await createAndSavePalette({
                        name: palette.name,
                        slug: palette.slug,
                        colors: palette.colors,
                    });
                } catch {
                    // Skip failures (e.g. duplicate slugs)
                }
            }
        } catch (e) {
            console.warn("Publish all failed:", e);
        }
    }

    async function onSlugSwitch(value: string, isAdmin: boolean) {
        if (isAdmin) {
            deps.clearUserSlug();
            deps.adminLogin(value);
            deps.setActiveView("palettes");
            return;
        }

        if (deps.savedPalettes.value.length > 0) {
            migrateMode.value = "switch";
            pendingMigrateAction.value = async (choice) => {
                if (choice === "publish") {
                    await publishAllLocal();
                }
                await deps.userLogin(value);
                if (choice === "transfer") {
                    await publishAllLocal();
                }
                deps.setActiveView("palettes");
            };
            showMigrateDialog.value = true;
            return;
        }
        try {
            await deps.userLogin(value);
            deps.setActiveView("palettes");
        } catch (e) {
            // S.W2 W2-6: branch on the typed `ApiProblem.status`, not `.message`
            // substrings — the server titles ("Already logged in as this user",
            // "User not found", "Rate limit exceeded") never contain "409"/"404"/
            // "429", so those branches matched nothing and the authored copy below
            // never showed.
            const status = e instanceof ApiProblem ? e.status : undefined;
            if (status === 409) slugBarRef.value?.setError("Already signed in as this slug.");
            else if (status === 404) slugBarRef.value?.setError("Slug not found.");
            else if (status === 429) slugBarRef.value?.setError("Too many attempts.");
            else slugBarRef.value?.setError((e instanceof Error ? e.message : "") || "Login failed");
        }
    }

    async function onRegenerateSlug() {
        if (deps.savedPalettes.value.length > 0) {
            migrateMode.value = "regenerate";
            pendingMigrateAction.value = async (choice) => {
                if (choice === "publish") {
                    await publishAllLocal();
                }
                await deps.userRegenerate();
            };
            showMigrateDialog.value = true;
        } else {
            await deps.userRegenerate();
        }
    }

    async function onMigrateRespond(choice: "publish" | "transfer" | "discard") {
        const action = pendingMigrateAction.value;
        pendingMigrateAction.value = null;
        if (action) {
            try {
                await action(choice);
            } catch (e: any) {
                console.warn("Migration action failed:", e?.message);
            }
        }
    }

    return {
        showMigrateDialog,
        migrateMode,
        slugBarRef,
        onSlugSwitch,
        onRegenerateSlug,
        onMigrateRespond,
    };
}
