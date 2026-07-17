import { ref, computed, provide } from "vue";
import type { Ref, InjectionKey } from "vue";

import { usePaletteStore } from "./usePaletteStore";
import { useAdminAuth } from "../platform/auth/useAdminAuth";
import { useUserAuth } from "../platform/auth/useUserAuth";
import { useSession } from "../platform/auth/useSession";
import { useBrowsePalettes } from "./useBrowsePalettes";
import { useAdminUsers } from "../platform/auth/useAdminUsers";
import { useColorNameQueue } from "./useColorNameQueue";
import { useSlugMigration } from "./useSlugMigration";
import { usePaletteActions } from "./usePaletteActions";
import { useFilteredList } from "./useFilteredList";
import { useAdminAudit } from "./useAdminAudit";
import { useAdminFlagged } from "./useAdminFlagged";
import { useAdminTags } from "./useAdminTags";
import { useVersionHistory } from "./useVersionHistory";
import { useTagEdit } from "./useTagEdit";
import type { ViewId } from "../shell/useViewManager";

// ─────────────────────────────────────────────────────────────────────────────
// usePalettePorts — the RF-15 §b 6 dissolution of the old `usePaletteManager`
// god facade (153 L, ONE cross-everything injected blob) into FIVE narrow,
// feature-owned ports. Each port is a cohesive palette sub-domain surface
// (identity, local library, remote browse, admin operations, colour target);
// no consumer injects a member outside the port it named. The sub-composables
// this file wires already own their slices — the god module's only sin was
// aggregating them into one injected object every consumer over-depended on.
// No compatibility shim and no re-export of the retired `PaletteManager` name
// (standing no-backwards-compat law).
// ─────────────────────────────────────────────────────────────────────────────

export interface PalettePortsDeps {
    currentView: Ref<ViewId>;
    switchView: (id: ViewId) => void;
    savedColorStrings: Ref<string[]>;
    emitApply: (colors: string[]) => void;
    emitAddColor: (css: string) => void;
    emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => void;
    emitSetCurrentColor: (css: string) => void;
}

export function providePalettePorts(deps: PalettePortsDeps) {
    const {
        currentView,
        switchView: depsSwitchView,
        savedColorStrings,
        emitApply,
        emitAddColor,
        emitStartEdit,
        emitSetCurrentColor,
    } = deps;

    const searchQuery = ref("");

    // --- Auth ---
    const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
    const { userSlug, ensureUser, login: userLogin, logout: userLogout, regenerate: userRegenerate, clearSlug } = useUserAuth();
    const session = useSession();

    // --- Palette store ---
    const { savedPalettes, createPalette, updatePalette, deletePalette, reorderPalettes } = usePaletteStore();

    // --- Browse palettes ---
    const browse = useBrowsePalettes({ searchQuery });

    // --- Admin operations ---
    const admin = useAdminUsers({ searchQuery, remotePalettes: browse.remotePalettes });
    const colorQueue = useColorNameQueue({ searchQuery });

    // --- Sub-composable facades (D.W3 Lane B) ---
    const audit = useAdminAudit();
    const flagged = useAdminFlagged();
    const tags = useAdminTags();
    const versions = useVersionHistory();
    const tagEdit = useTagEdit();

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
        setActiveTab: (tab: string) => depsSwitchView(tab as ViewId),
    });

    // --- Palette actions (publish, edit, delete, expand) ---
    const actions = usePaletteActions({
        savedPalettes,
        savedColorStrings,
        createPalette,
        updatePalette,
        deletePalette,
        emitApply,
        emitAddColor,
        emitStartEdit,
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

    const ensureSession = async () => {
        await session.ensureSession();
    };

    // --- Prune (bridges admin + panel ref) ---
    async function onPrune() {
        const pruned = await admin.onPruneEmpty();
        admin.adminUsersPanelRef.value?.onPruneDone(pruned);
    }

    // ── PORT 1 · Session — identity/auth surface ──────────────────────────────
    const sessionPort = {
        isAdminAuthenticated,
        userSlug,
        userLogout,
        ensureUser,
        ensureSession,
        onRegenerateSlug: migration.onRegenerateSlug,
        onSlugSwitch: migration.onSlugSwitch,
    };

    // ── PORT 2 · Library — the saved local palette inventory ──────────────────
    const libraryPort = {
        savedPalettes,
        filteredSaved,
        searchQuery,
        createPalette,
        reorderPalettes,
        expandedId: actions.expandedId,
        toggleExpand: actions.toggleExpand,
        onEditColor: actions.onEditColor,
        onDelete: actions.onDelete,
        onDeleteAllSaved: actions.onDeleteAllSaved,
        onPublish: actions.onPublish,
        onRenameSaved: actions.onRenameSaved,
        onCurrentPaletteSaved: actions.onCurrentPaletteSaved,
        onCurrentPaletteUpdated: actions.onCurrentPaletteUpdated,
        showDeleteAllConfirm: actions.showDeleteAllConfirm,
    };

    // ── PORT 3 · Browse — the remote/community palette surface + its actions ──
    const browsePort = {
        remotePalettes: browse.remotePalettes,
        browsing: browse.browsing,
        browseError: browse.browseError,
        hasMore: browse.hasMore,
        loadingMore: browse.loadingMore,
        loadRemotePalettes: browse.loadRemotePalettes,
        loadMoreRemotePalettes: browse.loadMoreRemotePalettes,
        filteredBrowse: browse.filteredBrowse,
        sortMode: browse.sortMode,
        sortLoading: browse.sortLoading,
        onSortChange: browse.onSortChange,
        tierFilter: browse.tierFilter,
        selectedTags: browse.selectedTags,
        onSaveRemote: browse.onSaveRemote,
        onSetVisibility: browse.onSetVisibility,
        onVote: browse.onVote,
        onRename: browse.onRename,
        onDeleteOwned: browse.onDeleteOwned,
        // colocated cross-slice members the browse surface composes:
        expandedId: actions.expandedId,
        toggleExpand: actions.toggleExpand,
        onEditColor: actions.onEditColor,
        onSwatchAddColor: actions.onSwatchAddColor,
        onFeaturePalette: admin.onFeaturePalette,
        onAdminDeletePalette: admin.onAdminDeletePalette,
        searchQuery,
        isAdminAuthenticated,
        userSlug,
        // the fork dialog action ensures a session before writing:
        ensureUser,
        ensureSession,
        versions,
        tagEdit,
        flagged,
    };

    // ── PORT 4 · Admin — the operational-console surface ──────────────────────
    const adminPort = {
        adminUsers: admin.adminUsers,
        adminUsersPanelRef: admin.adminUsersPanelRef,
        filteredAdminUsers: admin.filteredAdminUsers,
        loadAdminUsers: admin.loadAdminUsers,
        loadUserPalettes: admin.loadUserPalettes,
        loadingUsers: admin.loadingUsers,
        usersLoadError: admin.usersLoadError,
        onDeleteUser: admin.onDeleteUser,
        onDeleteUserPalettes: admin.onDeleteUserPalettes,
        onAdminDeleteUserPalette: admin.onAdminDeleteUserPalette,
        onUserSortChange: admin.onUserSortChange,
        userSortMode: admin.userSortMode,
        onFeaturePalette: admin.onFeaturePalette,
        onPrune,
        // colour-name queue:
        adminColorQueue: colorQueue.adminColorQueue,
        filteredColorQueue: colorQueue.filteredColorQueue,
        loadColorQueue: colorQueue.loadColorQueue,
        loadingColorQueue: colorQueue.loadingColorQueue,
        queueLoadError: colorQueue.queueLoadError,
        filteredApproved: colorQueue.filteredApproved,
        loadApprovedColors: colorQueue.loadApprovedColors,
        loadingApproved: colorQueue.loadingApproved,
        approvedLoadError: colorQueue.approvedLoadError,
        approvedLoaded: colorQueue.approvedLoaded,
        onApproveColor: colorQueue.onApproveColor,
        onRejectColor: colorQueue.onRejectColor,
        onDeleteColor: colorQueue.onDeleteColor,
        searchQuery,
        searchPlaceholder,
        expandedId: actions.expandedId,
        toggleExpand: actions.toggleExpand,
        audit,
        flagged,
        tags,
    };

    // ── PORT 5 · ColorTarget — the picker/edit emit surface ───────────────────
    const colorTargetPort = {
        emitApply,
        emitAddColor,
        emitStartEdit,
        emitSetCurrentColor,
        commitColorEdit: actions.commitColorEdit,
    };

    provide(SESSION_PORT_KEY, sessionPort);
    provide(LIBRARY_PORT_KEY, libraryPort);
    provide(BROWSE_PORT_KEY, browsePort);
    provide(ADMIN_PORT_KEY, adminPort);
    provide(COLOR_TARGET_PORT_KEY, colorTargetPort);

    return {
        session: sessionPort,
        library: libraryPort,
        browse: browsePort,
        admin: adminPort,
        colorTarget: colorTargetPort,
        // The slug-migration handle is NOT an injected port: the migrate dialog
        // is a composition-root concern (App.vue) that reads it directly from
        // this return, not across an inject boundary.
        migration,
    };
}

// Port types are derived from the assembled objects (each sub-composable owns
// its own slice; ReturnType rebuilds the public surface from these).
/** The five ports, provided at the composition root and returned for wiring. */
export type PalettePorts = ReturnType<typeof providePalettePorts>;
export type SessionPort = PalettePorts["session"];
export type LibraryPort = PalettePorts["library"];
export type BrowsePort = PalettePorts["browse"];
export type AdminPort = PalettePorts["admin"];
export type ColorTargetPort = PalettePorts["colorTarget"];

export const SESSION_PORT_KEY: InjectionKey<SessionPort> = Symbol("palette.session");
export const LIBRARY_PORT_KEY: InjectionKey<LibraryPort> = Symbol("palette.library");
export const BROWSE_PORT_KEY: InjectionKey<BrowsePort> = Symbol("palette.browse");
export const ADMIN_PORT_KEY: InjectionKey<AdminPort> = Symbol("palette.admin");
export const COLOR_TARGET_PORT_KEY: InjectionKey<ColorTargetPort> = Symbol("palette.colorTarget");
