import { ref, computed, watch, provide } from "vue";
import type { Ref, InjectionKey } from "vue";

import { copyToClipboard } from "./useClipboard";
import { usePaletteStore } from "./usePaletteStore";
import { useAdminAuth } from "./useAdminAuth";
import { useUserAuth } from "./useUserAuth";
import { useSession } from "./useSession";
import { useBrowsePalettes } from "./useBrowsePalettes";
import { useAdminUsers, useColorNameQueue } from "./useAdminOperations";
import { useSlugMigration } from "./useSlugMigration";
import { publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";
import type { ViewId } from "./useViewManager";
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

    // Browse
    remotePalettes: Ref<Palette[]>;
    browsing: Ref<boolean>;
    sortLoading: Ref<boolean>;
    sortMode: Ref<"newest" | "popular">;
    filteredBrowse: Ref<Palette[]>;
    loadRemotePalettes: () => Promise<void>;
    onSortChange: (mode: string) => void;
    onSaveRemote: (palette: Palette) => void;
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
    onApply: (palette: Palette) => void;
    onDelete: (palette: Palette) => void;
    onPublish: (palette: Palette) => Promise<void>;
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
    const expandedId = ref<string | null>(null);
    const showDeleteAllConfirm = ref(false);

    // --- Auth ---
    const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
    const { userSlug, ensureUser, login: userLogin, logout: userLogout, regenerate: userRegenerate, clearSlug } = useUserAuth();
    const session = useSession();

    // --- Palette store ---
    const {
        savedPalettes,
        createPalette,
        updatePalette,
        deletePalette,
    } = usePaletteStore();

    // --- Browse palettes ---
    const {
        remotePalettes,
        browsing,
        sortLoading,
        sortMode,
        filteredBrowse,
        loadRemotePalettes,
        onSortChange,
        onSaveRemote,
        onVote,
        onRename,
    } = useBrowsePalettes({ searchQuery });

    // --- Admin operations ---
    const {
        adminUsers,
        loadingUsers,
        userSortMode,
        adminUsersPanelRef,
        filteredAdminUsers,
        onUserSortChange,
        loadAdminUsers,
        onFeaturePalette,
        onAdminDeletePalette,
        onAdminDeleteUserPalette,
        onDeleteUserPalettes,
        onDeleteUser,
        onPruneEmpty,
    } = useAdminUsers({ searchQuery, remotePalettes });

    const {
        adminColorQueue,
        loadingColorQueue,
        approvedColors,
        loadingApproved,
        approvedLoaded,
        filteredColorQueue,
        filteredApproved,
        loadColorQueue,
        loadApprovedColors,
        onApproveColor,
        onRejectColor,
        onDeleteColor,
    } = useColorNameQueue({ searchQuery });

    // --- Slug migration ---
    const {
        showMigrateDialog,
        migrateMode,
        slugBarRef,
        onSlugSwitch,
        onRegenerateSlug,
        onMigrateRespond,
    } = useSlugMigration({
        savedPalettes,
        userLogin,
        userLogout,
        userRegenerate,
        adminLogin,
        clearUserSlug: clearSlug,
        ensureUser,
        activeTab: currentView as Ref<string>,
    });

    // Reload browse palettes when slug changes
    watch(userSlug, () => {
        if (remotePalettes.value.length > 0) {
            loadRemotePalettes();
        }
    });

    // Lazy load data based on view
    watch(currentView, (view) => {
        if (view === "browse" && remotePalettes.value.length === 0) {
            loadRemotePalettes();
        }
        if (view === "admin-users" && adminUsers.value.length === 0) {
            loadAdminUsers();
        }
        if (view === "admin-names") {
            if (adminColorQueue.value.length === 0) loadColorQueue();
            if (!approvedLoaded.value) loadApprovedColors();
        }
    });

    // Hide admin views when logged out
    watch(isAdminAuthenticated, (auth) => {
        if (!auth && currentView.value.startsWith("admin-")) {
            currentView.value = "picker" as ViewId;
        }
    });

    const searchPlaceholder = computed(() => {
        switch (currentView.value) {
            case "admin-users": return "Search users...";
            case "admin-names": return "Search color names...";
            default: return "Search palettes...";
        }
    });

    const filteredSaved = computed(() => {
        const q = searchQuery.value.toLowerCase();
        if (!q) return savedPalettes.value;
        return savedPalettes.value.filter(
            (p) => p.name.toLowerCase().includes(q) || p.slug.includes(q),
        );
    });

    // --- Actions ---

    function toggleExpand(id: string) {
        expandedId.value = expandedId.value === id ? null : id;
    }

    function onApply(palette: Palette) {
        emitApply(palette.colors.map((c) => c.css));
    }

    function onDelete(palette: Palette) {
        deletePalette(palette.id);
    }

    async function onPublish(palette: Palette) {
        try {
            await ensureUser();
            await session.ensureSession();
        } catch {
            console.warn("Failed to create session — check your network connection");
            return;
        }
        try {
            await publishPalette({
                name: palette.name,
                slug: palette.slug,
                colors: palette.colors,
            });
        } catch (e: any) {
            const msg = e?.message ?? "";
            console.warn(`Failed to publish: ${msg || "unknown error"}`);
        }
    }

    function onRenameSaved(palette: Palette, newName: string) {
        updatePalette(palette.id, { name: newName });
    }

    async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
        await ensureUser();
        const palette = createPalette(name, colors);
        expandedId.value = palette.id;
    }

    function onCurrentPaletteUpdated(id: string, colors: PaletteColor[]) {
        updatePalette(id, { colors });
        expandedId.value = id;
    }

    function onSwatchAddColor(css: string) {
        emitAddColor(css);
    }

    function onEditColor(palette: Palette, colorIndex: number, css: string) {
        emitStartEdit({ paletteId: palette.id, colorIndex, originalCss: css });
    }

    function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
        if (paletteId === "__current__") {
            const oldCss = savedColorStrings.value[colorIndex];
            if (oldCss === newCss) return;
            const updated = [...savedColorStrings.value];
            updated[colorIndex] = newCss;
            emitApply(updated);
            return;
        }

        const palette =
            savedPalettes.value.find((p) => p.id === paletteId) ??
            remotePalettes.value.find((p) => p.id === paletteId);
        if (!palette) return;

        const oldCss = palette.colors[colorIndex]?.css;
        if (oldCss === newCss) return;

        const updatedColors = [...palette.colors];
        updatedColors[colorIndex] = { ...updatedColors[colorIndex]!, css: newCss };
        updatePalette(paletteId, { colors: updatedColors });
    }

    function onDeleteAllSaved() {
        for (const p of [...savedPalettes.value]) {
            deletePalette(p.id);
        }
        expandedId.value = null;
        showDeleteAllConfirm.value = false;
    }

    async function onPrune() {
        const pruned = await onPruneEmpty();
        adminUsersPanelRef.value?.onPruneDone(pruned);
    }

    function onDotClick(cssColorOpaque: string) {
        copyToClipboard(cssColorOpaque);
    }

    const manager: PaletteManager = {
        isAdminAuthenticated,
        userSlug,
        userLogout,
        savedPalettes,
        createPalette,
        updatePalette,
        deletePalette,
        remotePalettes,
        browsing,
        sortLoading,
        sortMode,
        filteredBrowse,
        loadRemotePalettes,
        onSortChange,
        onSaveRemote,
        onVote,
        onRename,
        adminUsers,
        loadingUsers,
        userSortMode,
        adminUsersPanelRef,
        filteredAdminUsers,
        onUserSortChange,
        loadAdminUsers,
        onFeaturePalette,
        onAdminDeletePalette,
        onAdminDeleteUserPalette,
        onDeleteUserPalettes,
        onDeleteUser,
        onPruneEmpty,
        adminColorQueue,
        loadingColorQueue,
        approvedColors,
        loadingApproved,
        approvedLoaded,
        filteredColorQueue,
        filteredApproved,
        loadColorQueue,
        loadApprovedColors,
        onApproveColor,
        onRejectColor,
        onDeleteColor,
        showMigrateDialog,
        migrateMode,
        slugBarRef,
        onSlugSwitch,
        onRegenerateSlug,
        onMigrateRespond,
        searchQuery,
        expandedId,
        filteredSaved,
        searchPlaceholder,
        toggleExpand,
        onApply,
        onDelete,
        onPublish,
        onRenameSaved,
        onCurrentPaletteSaved,
        onCurrentPaletteUpdated,
        onEditColor,
        onSwatchAddColor,
        commitColorEdit,
        showDeleteAllConfirm,
        onDeleteAllSaved,
        onPrune,
        onDotClick,
        emitApply,
        emitAddColor,
        emitStartEdit,
        emitSetCurrentColor,
    };

    provide(PALETTE_MANAGER_KEY, manager);

    return manager;
}
