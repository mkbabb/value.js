import { ref, computed, type Ref } from "vue";
import { useAdminAuth } from "./useAdminAuth";
import {
    listUsers,
    impersonateUser,
    featurePalette,
    deletePaletteAdmin,
    deleteUser,
    deleteUserPalettes,
    pruneEmptyUsers,
} from "@lib/palette/api";
import type { Palette, User } from "@lib/palette/types";
import type AdminUsersPanel from "@components/custom/palette-browser/AdminUsersPanel.vue";

export function useAdminUsers(deps: {
    searchQuery: Ref<string>;
    remotePalettes: Ref<Palette[]>;
}) {
    const { getToken: getAdminToken } = useAdminAuth();

    const adminUsers = ref<User[]>([]);
    const loadingUsers = ref(false);
    const userSortMode = ref<"slug" | "newest" | "palettes">("newest");
    const adminUsersPanelRef = ref<InstanceType<typeof AdminUsersPanel> | null>(null);

    const filteredAdminUsers = computed(() => {
        const q = deps.searchQuery.value.toLowerCase();
        let users = adminUsers.value;
        if (q) {
            users = users.filter((u) => u.slug.toLowerCase().includes(q));
        }
        const sorted = [...users];
        switch (userSortMode.value) {
            case "slug":
                sorted.sort((a, b) => a.slug.localeCompare(b.slug));
                break;
            case "newest":
                sorted.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
                break;
            case "palettes":
                sorted.sort((a, b) => (b.paletteCount ?? 0) - (a.paletteCount ?? 0));
                break;
        }
        return sorted;
    });

    function onUserSortChange(value: string) {
        userSortMode.value = value as "slug" | "newest" | "palettes";
    }

    async function loadAdminUsers() {
        const token = getAdminToken();
        if (!token) return;
        loadingUsers.value = true;
        try {
            const res = await listUsers(token, 50);
            adminUsers.value = res.data;
        } catch (e) {
            console.warn("Failed to load users:", e);
        } finally {
            loadingUsers.value = false;
        }
    }

    async function onImpersonate(slug: string) {
        const token = getAdminToken();
        if (!token) return;
        try {
            const res = await impersonateUser(token, slug);
            console.warn(`Impersonating ${slug} — token: ${res.token.slice(0, 8)}...`);
        } catch (e: any) {
            console.warn("Failed to impersonate:", e?.message);
        }
    }

    async function onFeaturePalette(palette: Palette) {
        const token = getAdminToken();
        if (!token) return;
        try {
            const result = await featurePalette(token, palette.slug);
            const idx = deps.remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            if (idx !== -1) {
                deps.remotePalettes.value[idx] = {
                    ...deps.remotePalettes.value[idx],
                    status: result.status as "published" | "featured",
                };
            }
            adminUsersPanelRef.value?.updatePaletteStatus(palette.slug, result.status);
        } catch (e: any) {
            console.warn("Failed to feature palette:", e?.message);
        }
    }

    async function onAdminDeletePalette(palette: Palette) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await deletePaletteAdmin(token, palette.slug);
            deps.remotePalettes.value = deps.remotePalettes.value.filter((p) => p.slug !== palette.slug);
        } catch (e: any) {
            console.warn("Failed to delete palette:", e?.message);
        }
    }

    async function onAdminDeleteUserPalette(palette: Palette, ownerSlug: string) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await deletePaletteAdmin(token, palette.slug);
            adminUsersPanelRef.value?.removeUserPalette(palette.slug);
            const user = adminUsers.value.find((u) => u.slug === ownerSlug);
            if (user && user.paletteCount) {
                user.paletteCount--;
            }
        } catch (e: any) {
            console.warn("Failed to delete palette:", e?.message);
        }
    }

    async function onDeleteUserPalettes(slug: string) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await deleteUserPalettes(token, slug);
            adminUsersPanelRef.value?.clearUserPalettes(slug);
            const user = adminUsers.value.find((u) => u.slug === slug);
            if (user) user.paletteCount = 0;
        } catch (e: any) {
            console.warn("Failed to delete user palettes:", e?.message);
        }
    }

    async function onDeleteUser(slug: string) {
        const token = getAdminToken();
        if (!token) return;
        try {
            await deleteUser(token, slug);
            adminUsers.value = adminUsers.value.filter((u) => u.slug !== slug);
            adminUsersPanelRef.value?.clearUserPalettes(slug);
        } catch (e: any) {
            console.warn("Failed to delete user:", e?.message);
        }
    }

    async function onPruneEmpty(): Promise<number> {
        const token = getAdminToken();
        if (!token) return 0;
        try {
            const result = await pruneEmptyUsers(token);
            if (result.pruned > 0) {
                adminUsers.value = adminUsers.value.filter((u) => (u.paletteCount ?? 0) > 0);
            }
            return result.pruned;
        } catch (e: any) {
            console.warn("Failed to prune empty users:", e?.message);
            return 0;
        }
    }

    return {
        adminUsers,
        loadingUsers,
        userSortMode,
        adminUsersPanelRef,
        filteredAdminUsers,
        onUserSortChange,
        loadAdminUsers,
        onImpersonate,
        onFeaturePalette,
        onAdminDeletePalette,
        onAdminDeleteUserPalette,
        onDeleteUserPalettes,
        onDeleteUser,
        onPruneEmpty,
    };
}
