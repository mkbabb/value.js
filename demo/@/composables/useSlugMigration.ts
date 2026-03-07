import { ref, type Ref } from "vue";
import { useSession } from "./useSession";
import { publishPalette } from "@lib/palette/api";
import type { Palette } from "@lib/palette/types";
import type PaletteSlugBar from "@components/custom/palette-browser/PaletteSlugBar.vue";

export function useSlugMigration(deps: {
    savedPalettes: Ref<Palette[]>;
    userLogin: (slug: string) => Promise<void>;
    userLogout: () => Promise<void>;
    adminLogin: (token: string) => void;
    clearUserSlug: () => void;
    activeTab: Ref<string>;
}) {
    const session = useSession();

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
            deps.activeTab.value = "saved";
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
                deps.activeTab.value = "saved";
            };
            showMigrateDialog.value = true;
            return;
        }
        try {
            await deps.userLogin(value);
            deps.activeTab.value = "saved";
        } catch (e: any) {
            const msg = e?.message ?? "";
            if (msg.includes("409")) slugBarRef.value?.setError("Already signed in as this slug.");
            else if (msg.includes("404")) slugBarRef.value?.setError("Slug not found.");
            else if (msg.includes("429")) slugBarRef.value?.setError("Too many attempts.");
            else slugBarRef.value?.setError(msg || "Login failed");
        }
    }

    async function onRegenerateSlug() {
        if (deps.savedPalettes.value.length > 0) {
            migrateMode.value = "regenerate";
            pendingMigrateAction.value = async (choice) => {
                if (choice === "publish") {
                    await publishAllLocal();
                }
                await deps.userLogout();
            };
            showMigrateDialog.value = true;
        } else {
            await deps.userLogout();
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
