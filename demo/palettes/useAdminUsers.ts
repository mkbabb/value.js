import { ref, computed, shallowRef, type Ref } from "vue";
import {
    listUsers,
    impersonateUser,
    setPaletteFeatured,
    deletePaletteAdmin,
    deleteUser,
    deleteUserPalettes,
    pruneEmptyUsers,
    getUserPalettes,
} from "./api";
import { useAdminAccess, useAdminNotice, latestRequest, type AdminResult } from "./api/admin-call";
import type { Palette, User } from "./types";

/**
 * The admin users domain — the roster, the one expanded user's palettes, and
 * every mutation over them (X.W7.d · G13).
 *
 * X.W7.d (fold W7.67 · L-1): this composable used to hold a component INSTANCE
 * (`adminUsersPanelRef`) and poke five imperative methods into it through `?.`,
 * each silently discarding its result. The expanded user's palettes are domain
 * state, so they live HERE; the panel renders them. That is also what cures DAG
 * §2.3 row 3 (W7.65): a roster refresh re-reads the open disclosure in the same
 * write path, instead of leaving the deleted palette on screen until collapse.
 *
 * Every mutation resolves to an `AdminResult` and settles ONE visible verdict
 * (`notice`) — DAG §2.3 row 1's absent mutation error, and S-13's "not a 3 s
 * unannounced flourish".
 */
export function useAdminUsers(deps: {
    searchQuery: Ref<string>;
    remotePalettes: Ref<Palette[]>;
}) {
    const { access, call } = useAdminAccess();
    const { notice, settle, dismiss: dismissNotice } = useAdminNotice();

    const adminUsers = ref<User[]>([]);
    /** The server's roster total (the page holds at most `PAGE_SIZE` of it). */
    const adminUsersTotal = ref(0);
    const loadingUsers = ref(false);
    // W5-5 (F-2): load failure, surfaced — error ≠ empty at the panel.
    const usersLoadError = ref<string | null>(null);
    const userSortMode = ref<"slug" | "newest" | "palettes">("newest");
    const rosterRead = latestRequest();

    // The one open disclosure (W7.65 · DAG row 3).
    const expandedUserSlug = ref<string | null>(null);
    const userPalettes = shallowRef<Palette[]>([]);
    const loadingUserPalettes = ref(false);
    const userPalettesError = ref<string | null>(null);
    const palettesRead = latestRequest();

    const PAGE_SIZE = 50;

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

    /**
     * N-3 — the prune confirm's number is read from the UNFILTERED loaded
     * roster, never the search-filtered list; the confirm also names the
     * server-global scope, because the loaded page is not the whole roster.
     */
    const emptyUserCount = computed(
        () => adminUsers.value.filter((u) => !(u.paletteCount ?? 0)).length,
    );

    function onUserSortChange(value: string) {
        userSortMode.value = value as "slug" | "newest" | "palettes";
    }

    async function loadAdminUsers() {
        const ticket = rosterRead.issue();
        loadingUsers.value = true;
        const result = await call((token) => listUsers(token, PAGE_SIZE));
        if (!rosterRead.isCurrent(ticket)) return;
        loadingUsers.value = false;
        if (result.ok) {
            adminUsers.value = result.value.data;
            adminUsersTotal.value = result.value.total;
            usersLoadError.value = null;
            // W7.65: the refresh reaches the open disclosure too.
            if (expandedUserSlug.value !== null) await readUserPalettes(expandedUserSlug.value);
        } else if (result.kind === "failed") {
            // W5-5 (F-2): a dead backend must never read as "No users found."
            usersLoadError.value = result.message;
        }
    }

    async function readUserPalettes(slug: string) {
        const ticket = palettesRead.issue();
        loadingUserPalettes.value = true;
        const result = await call((token) => getUserPalettes(token, slug));
        if (!palettesRead.isCurrent(ticket) || expandedUserSlug.value !== slug) return;
        loadingUserPalettes.value = false;
        // W7.86: a failed read is an error, never "No palettes."
        userPalettes.value = result.ok ? result.value : [];
        userPalettesError.value = result.ok ? null : result.message;
    }

    async function toggleUserExpand(slug: string) {
        if (expandedUserSlug.value === slug) {
            expandedUserSlug.value = null;
            userPalettes.value = [];
            userPalettesError.value = null;
            return;
        }
        expandedUserSlug.value = slug;
        userPalettes.value = [];
        userPalettesError.value = null;
        await readUserPalettes(slug);
    }

    function patchPalette(slug: string, patch: Partial<Palette>) {
        userPalettes.value = userPalettes.value.map((p) => (p.slug === slug ? { ...p, ...patch } : p));
        deps.remotePalettes.value = deps.remotePalettes.value.map((p) =>
            p.slug === slug ? { ...p, ...patch } : p,
        );
    }

    function dropPalette(slug: string) {
        userPalettes.value = userPalettes.value.filter((p) => p.slug !== slug);
        deps.remotePalettes.value = deps.remotePalettes.value.filter((p) => p.slug !== slug);
    }

    /** The impersonation mutation (no UI seat — X-W8's CC-076 row 7 rules it). */
    async function onImpersonate(slug: string): Promise<AdminResult<unknown>> {
        const result = await call((token) => impersonateUser(token, slug));
        settle(result, `Impersonation token issued for ${slug}`, "Impersonation failed");
        return result;
    }

    async function onFeaturePalette(palette: Palette): Promise<AdminResult<unknown>> {
        const featured = palette.tier !== "featured";
        const result = await call((token) => setPaletteFeatured(token, palette.slug, featured));
        if (result.ok) patchPalette(palette.slug, { tier: result.value.tier });
        settle(
            result,
            featured ? `Featured “${palette.name}”` : `Unfeatured “${palette.name}”`,
            featured ? "Could not feature the palette" : "Could not unfeature the palette",
        );
        return result;
    }

    /**
     * G13 — the ONE call site of the admin palette delete. The browse wall, the
     * expanded user row and the flag queue all delete through here, so every
     * list that shows the palette drops it in the same act.
     */
    async function adminDeletePalette(slug: string): Promise<AdminResult<unknown>> {
        const result = await call((token) => deletePaletteAdmin(token, slug));
        if (result.ok) {
            const owner = userPalettes.value.some((p) => p.slug === slug) ? expandedUserSlug.value : null;
            dropPalette(slug);
            const user = owner ? adminUsers.value.find((u) => u.slug === owner) : undefined;
            if (user && user.paletteCount) user.paletteCount--;
        }
        return result;
    }

    /** The users scene's delete: the one delete, plus this scene's verdict. */
    async function onAdminDeletePalette(palette: Palette): Promise<AdminResult<unknown>> {
        const result = await adminDeletePalette(palette.slug);
        settle(result, `Deleted “${palette.name}”`, "Could not delete the palette");
        return result;
    }

    function closeDisclosureOf(slug: string) {
        if (expandedUserSlug.value !== slug) return;
        expandedUserSlug.value = null;
        userPalettes.value = [];
        userPalettesError.value = null;
    }

    async function onDeleteUserPalettes(slug: string): Promise<AdminResult<unknown>> {
        const result = await call((token) => deleteUserPalettes(token, slug));
        if (result.ok) {
            closeDisclosureOf(slug);
            const user = adminUsers.value.find((u) => u.slug === slug);
            if (user) user.paletteCount = 0;
        }
        settle(
            result,
            result.ok ? `Deleted ${result.value.deleted} palette${result.value.deleted === 1 ? "" : "s"} of ${slug}` : "",
            "Could not delete the user's palettes",
        );
        return result;
    }

    async function onDeleteUser(slug: string): Promise<AdminResult<unknown>> {
        const result = await call((token) => deleteUser(token, slug));
        if (result.ok) {
            adminUsers.value = adminUsers.value.filter((u) => u.slug !== slug);
            adminUsersTotal.value = Math.max(0, adminUsersTotal.value - 1);
            closeDisclosureOf(slug);
        }
        settle(result, `Deleted user ${slug}`, "Could not delete the user");
        return result;
    }

    /**
     * W7.86 · Δ-2 — a failed prune is a failure, never the success register
     * "No empty users to prune". The server prunes EVERY empty user; the roster
     * is re-read so the count on screen is the server's after the act.
     */
    async function onPruneEmpty(): Promise<AdminResult<{ pruned: number }>> {
        const result = await call((token) => pruneEmptyUsers(token));
        settle(
            result,
            result.ok
                ? result.value.pruned > 0
                    ? `Pruned ${result.value.pruned} empty user${result.value.pruned === 1 ? "" : "s"}`
                    : "No empty users to prune"
                : "",
            "Prune failed",
        );
        if (result.ok && result.value.pruned > 0) await loadAdminUsers();
        return result;
    }

    return {
        access,
        notice,
        dismissNotice,
        adminUsers,
        adminUsersTotal,
        loadingUsers,
        usersLoadError,
        userSortMode,
        filteredAdminUsers,
        emptyUserCount,
        expandedUserSlug,
        userPalettes,
        loadingUserPalettes,
        userPalettesError,
        toggleUserExpand,
        onUserSortChange,
        loadAdminUsers,
        onImpersonate,
        onFeaturePalette,
        adminDeletePalette,
        onAdminDeletePalette,
        onDeleteUserPalettes,
        onDeleteUser,
        onPruneEmpty,
    };
}
