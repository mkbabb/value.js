import { ref, type Ref, type ComputedRef } from "vue";
import { useSession } from "../auth/useSession";
import { publishPalette } from "@lib/palette/api";
import { ApiProblem } from "@lib/palette/api/api-problem";
import type { Palette } from "@lib/palette/types";
import type PaletteSlugBar from "@components/custom/palette-browser/PaletteSlugBar.vue";

export function useSlugMigration(deps: {
    savedPalettes: Ref<Palette[]> | ComputedRef<Palette[]>;
    userLogin: (slug: string) => Promise<void>;
    userLogout: () => Promise<void>;
    userRegenerate: () => Promise<string>;
    adminLogin: (token: string) => void;
    clearUserSlug: () => void;
    ensureUser: () => Promise<string>;
    activeTab: Ref<string>;
    setActiveTab?: ((tab: string) => void) | undefined;
}) {
    const session = useSession();

    const setActiveTab = (tab: string) => {
        const fn = deps.setActiveTab;
        if (fn) fn(tab);
        else deps.activeTab.value = tab;
    };

    const showMigrateDialog = ref(false);
    const migrateMode = ref<"switch" | "regenerate">("switch");
    const pendingMigrateAction = ref<((choice: "publish" | "transfer" | "discard") => Promise<void>) | null>(null);
    const slugBarRef = ref<InstanceType<typeof PaletteSlugBar> | null>(null);

    async function publishAllLocal() {
        try {
            await session.ensureSession();
            for (const palette of deps.savedPalettes.value) {
                try {
                    await publishPalette({
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
            setActiveTab("saved");
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
                setActiveTab("saved");
            };
            showMigrateDialog.value = true;
            return;
        }
        try {
            await deps.userLogin(value);
            setActiveTab("saved");
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
