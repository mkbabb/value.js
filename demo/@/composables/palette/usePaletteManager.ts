import { ref, computed, watch, provide } from "vue";
import type { Ref, InjectionKey } from "vue";

import { usePaletteStore } from "./usePaletteStore";
import { useAdminAuth } from "../auth/useAdminAuth";
import { useUserAuth } from "../auth/useUserAuth";
import { useBrowsePalettes } from "./useBrowsePalettes";
import { useAdminUsers, useColorNameQueue } from "../auth/useAdminOperations";
import { useSlugMigration } from "./useSlugMigration";
import { usePaletteActions } from "./usePaletteActions";
import { useFilteredList } from "../useFilteredList";
import type { Palette, PaletteColor } from "@lib/palette/types";
import type { ViewId } from "../useViewManager";
import type PaletteSlugBar from "@components/custom/palette-browser/PaletteSlugBar.vue";

export interface PaletteManager {
    // Auth
    isAdminAuthenticated: Ref<boolean>;
    userSlug: Ref<string | null>;
    userLogout: () => Promise<void>;

    // Palette store
    savedPalettes: Ref<Palette[]>;
    createPalette: (name: string, colors: PaletteColor[]) => Palette;
    updatePalette: (id: string, patch: Partial<Palette>) => void;
    deletePalette: (id: string) => void;
    reorderPalettes: (orderedIds: string[]) => void;

    // Browse
    remotePalettes: Ref<Palette[]>;
    browsing: Ref<boolean>;
    sortLoading: Ref<boolean>;
    sortMode: Ref<"newest" | "popular">;
    browseError: Ref<string | null>;
    filteredBrowse: Ref<Palette[]>;
    loadRemotePalettes: () => Promise<void>;
    onSortChange: (mode: string) => void;
    onSaveRemote: (palette: Palette) => void;
    onDeleteOwned: (palette: Palette) => Promise<{ success: boolean; message: string }>;
    onVote: (palette: Palette) => void;
    onRename: (palette: Palette, newName: string) => void;

    // Admin users
    adminUsers: Ref<any[]>;
    loadingUsers: Ref<boolean>;
    userSortMode: Ref<"slug" | "newest" | "palettes">;
    adminUsersPanelRef: Ref<any>;
    filteredAdminUsers: Ref<any[]>;
    onUserSortChange: (mode: string) => void;
    loadAdminUsers: () => Promise<void>;
    onFeaturePalette: (palette: Palette) => Promise<void>;
    onAdminDeletePalette: (palette: Palette) => Promise<void>;
    onAdminDeleteUserPalette: (palette: Palette, ownerSlug: string) => Promise<void>;
    onDeleteUserPalettes: (userId: string) => Promise<void>;
    onDeleteUser: (userId: string) => Promise<void>;
    onPruneEmpty: () => Promise<number>;

    // Admin color names
    adminColorQueue: Ref<any[]>;
    loadingColorQueue: Ref<boolean>;
    approvedColors: Ref<any[]>;
    loadingApproved: Ref<boolean>;
    approvedLoaded: Ref<boolean>;
    filteredColorQueue: Ref<any[]>;
    filteredApproved: Ref<any[]>;
    loadColorQueue: () => Promise<void>;
    loadApprovedColors: () => Promise<void>;
    onApproveColor: (item: any) => Promise<void>;
    onRejectColor: (item: any) => Promise<void>;
    onDeleteColor: (item: any) => Promise<void>;

    // Slug migration
    showMigrateDialog: Ref<boolean>;
    migrateMode: Ref<"switch" | "regenerate">;
    slugBarRef: Ref<InstanceType<typeof PaletteSlugBar> | null>;
    onSlugSwitch: (slug: string, isAdmin: boolean) => void;
    onRegenerateSlug: () => void;
    onMigrateRespond: (choice: "publish" | "transfer" | "discard") => Promise<void>;

    // Search & UI
    searchQuery: Ref<string>;
    expandedId: Ref<string | null>;
    filteredSaved: Ref<Palette[]>;
    searchPlaceholder: Ref<string>;

    // Actions
    toggleExpand: (id: string) => void;
    onDelete: (palette: Palette) => void;
    onPublish: (palette: Palette) => Promise<{ success: boolean; message: string }>;
    onRenameSaved: (palette: Palette, newName: string) => void;
    onCurrentPaletteSaved: (name: string, colors: PaletteColor[]) => Promise<void>;
    onCurrentPaletteUpdated: (id: string, colors: PaletteColor[]) => void;
    onEditColor: (palette: Palette, colorIndex: number, css: string) => void;
    onSwatchAddColor: (css: string) => void;
    commitColorEdit: (paletteId: string, colorIndex: number, newCss: string) => void;
    showDeleteAllConfirm: Ref<boolean>;
    onDeleteAllSaved: () => void;
    onPrune: () => Promise<void>;
    onDotClick: (cssColorOpaque: string) => void;

    // Emitters — parent must bind these
    emitApply: (colors: string[]) => void;
    emitAddColor: (css: string) => void;
    emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => void;
    emitSetCurrentColor: (css: string) => void;
}

export const PALETTE_MANAGER_KEY: InjectionKey<PaletteManager> =
    Symbol("paletteManager");

export function usePaletteManager(deps: {
    currentView: Ref<ViewId>;
    savedColorStrings: Ref<string[]>;
    emitApply: (colors: string[]) => void;
    emitAddColor: (css: string) => void;
    emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => void;
    emitSetCurrentColor: (css: string) => void;
}): PaletteManager {
    const { currentView, savedColorStrings, emitApply, emitAddColor, emitStartEdit, emitSetCurrentColor } = deps;

    const searchQuery = ref("");

    // --- Auth ---
    const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
    const { userSlug, ensureUser, login: userLogin, logout: userLogout, regenerate: userRegenerate, clearSlug } = useUserAuth();

    // --- Palette store ---
    const { savedPalettes, createPalette, updatePalette, deletePalette, reorderPalettes } = usePaletteStore();

    // --- Browse palettes ---
    const browse = useBrowsePalettes({ searchQuery });

    // --- Admin operations ---
    const admin = useAdminUsers({ searchQuery, remotePalettes: browse.remotePalettes });
    const colorQueue = useColorNameQueue({ searchQuery });

    // --- Slug migration ---
    const migration = useSlugMigration({
        savedPalettes,
        userLogin,
        userLogout,
        userRegenerate,
        adminLogin,
        clearUserSlug: clearSlug,
        ensureUser,
        activeTab: currentView as Ref<string>,
    });

    // --- Palette actions (publish, edit, delete, expand) ---
    const actions = usePaletteActions({
        savedPalettes,
        remotePalettes: browse.remotePalettes,
        savedColorStrings,
        createPalette,
        updatePalette,
        deletePalette,
        emitApply,
        emitAddColor,
        emitStartEdit,
    });

    // --- Cross-module orchestration (watchers) ---

    // Reload browse palettes when slug changes (always reload if on browse tab)
    watch(userSlug, () => {
        if (currentView.value === "browse") {
            browse.loadRemotePalettes();
        }
    });

    // Load data when switching to a view (immediate: run on mount too)
    watch(currentView, (view) => {
        if (view === "browse") {
            browse.loadRemotePalettes();
        }
        if (view === "admin-users" && admin.adminUsers.value.length === 0) {
            admin.loadAdminUsers();
        }
        if (view === "admin-names") {
            if (colorQueue.adminColorQueue.value.length === 0) colorQueue.loadColorQueue();
            if (!colorQueue.approvedLoaded.value) colorQueue.loadApprovedColors();
        }
    }, { immediate: true });

    // Hide admin views when logged out
    watch(isAdminAuthenticated, (auth) => {
        if (!auth && currentView.value.startsWith("admin-")) {
            currentView.value = "picker" as ViewId;
        }
    });

    // --- Search UI ---

    const searchPlaceholder = computed(() => {
        switch (currentView.value) {
            case "admin-users": return "Search users...";
            case "admin-names": return "Search color names...";
            default: return "Search palettes...";
        }
    });

    const filteredSaved = useFilteredList(savedPalettes, searchQuery, (p, q) =>
        p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );

    // --- Prune (bridges admin + panel ref) ---

    async function onPrune() {
        const pruned = await admin.onPruneEmpty();
        admin.adminUsersPanelRef.value?.onPruneDone(pruned);
    }

    // --- Assemble facade ---

    const manager: PaletteManager = {
        // Auth
        isAdminAuthenticated,
        userSlug,
        userLogout,

        // Palette store
        savedPalettes,
        createPalette,
        updatePalette,
        deletePalette,
        reorderPalettes,

        // Browse
        ...browse,

        // Admin users
        ...admin,

        // Admin color names
        ...colorQueue,

        // Slug migration
        ...migration,

        // Actions (includes expandedId, showDeleteAllConfirm)
        ...actions,
        onPrune,

        // Search & UI
        searchQuery,
        filteredSaved,
        searchPlaceholder,

        // Emitters
        emitApply,
        emitAddColor,
        emitStartEdit,
        emitSetCurrentColor,
    };

    provide(PALETTE_MANAGER_KEY, manager);

    return manager;
}
