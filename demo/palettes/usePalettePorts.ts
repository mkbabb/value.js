import { ref, computed, provide, watch } from "vue";
import type { Ref, InjectionKey } from "vue";

import { usePaletteStore } from "./usePaletteStore";
import { useAdminAuth } from "../platform/auth/useAdminAuth";
import { useUserAuth } from "../platform/auth/useUserAuth";
import { useSession } from "../platform/auth/useSession";
import { useBrowsePalettes } from "./useBrowsePalettes";
import { useAdminUsers } from "./useAdminUsers";
import { useColorNameQueue } from "./useColorNameQueue";
import { useSlugMigration } from "./useSlugMigration";
import { usePaletteActions } from "./usePaletteActions";
import { useFilteredList } from "./useFilteredList";
import { useAdminAudit } from "./useAdminAudit";
import { useAdminFlagged } from "./useAdminFlagged";
import { useAdminTags } from "./useAdminTags";
import { useVersionHistory } from "./useVersionHistory";
import { useTagEdit } from "./useTagEdit";
import type { ComputedRef } from "vue";
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
    /**
     * X.W5.c · gate N2 — a READ-ONLY view identity, typed as the computed it
     * is. `useViewManager` used to hand this across as
     * `currentView as unknown as Ref<ViewId>` (⟨PSC-15(b)⟩), advertising a
     * read-only computed as writable; a consumer could type-check a write Vue
     * then silently dropped.
     */
    currentView: ComputedRef<ViewId>;
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

    // X.W7.d · N-4 (fold W7.7 ≡ BrowsePane M17): ONE query per domain. The four
    // surfaces used to share a single ref, so typing in Browse filtered My
    // Palettes and drove the admin roster, and nothing ever reset it. Every
    // admin view seats the library pane beside it (`viewSchema.ts`), which is
    // exactly where the bleed was visible.
    const librarySearch = ref("");
    const browseSearch = ref("");
    const adminUsersSearch = ref("");
    const adminNamesSearch = ref("");
    // A route change resets every domain's query — a query typed for one view
    // never filters the next one silently.
    watch(currentView, () => {
        librarySearch.value = "";
        browseSearch.value = "";
        adminUsersSearch.value = "";
        adminNamesSearch.value = "";
    });

    // --- Auth ---
    const { isAuthenticated: isAdminAuthenticated, login: adminLogin } = useAdminAuth();
    const { userSlug, ensureUser, login: userLogin, logout: userLogout, regenerate: userRegenerate, clearSlug } = useUserAuth();
    const session = useSession();

    // --- Palette store ---
    const { savedPalettes, createPalette, updatePalette, deletePalette, movePalette, storeRecovery } = usePaletteStore();

    // --- Browse palettes ---
    const browse = useBrowsePalettes({ searchQuery: browseSearch });

    // --- Admin operations ---
    const admin = useAdminUsers({ searchQuery: adminUsersSearch, remotePalettes: browse.remotePalettes });
    const colorQueue = useColorNameQueue({ searchQuery: adminNamesSearch });

    // --- Sub-composable facades (D.W3 Lane B) ---
    const audit = useAdminAudit();
    const flagged = useAdminFlagged();
    const versions = useVersionHistory();
    const tagEdit = useTagEdit();
    // W7.79 (ATP-19): an admin tag write re-reads the editor's catalog.
    const tags = useAdminTags({ onChange: () => void tagEdit.loadAllTags(true) });

    const ensureSession = async () => {
        await session.ensureSession();
    };

    // --- Slug migration ---
    //
    // X.W5.c · gate N2 — THE TWO CASTS ARE GONE. The first widened a writable,
    // invariant `Ref<ViewId>` to `Ref<string>`; the second was a setter that
    // took an arbitrary string and narrowed it straight back into the view
    // union, unchecked, with no guard — while the correct predicate
    // (`isViewId`) already shipped and was already used on the route→state
    // leg. Between them they defeated the type system at exactly the seam where the
    // composable then set a tab name that no route and no `ViewId` carries, and
    // the named push it reached threw SYNCHRONOUSLY out of vue-router's
    // resolve. (The retired literal is quoted once, in the wave record at
    // docs/tranches/X/execution/A/X-W5.md § X.W5.c, so the call-site census
    // reads zero in this tree and means it — a source comment that quotes the
    // defect is a source comment that keeps the census RED forever.) Three
    // live branches shipped
    // through that hole: the admin switch never switched, a SUCCESSFUL
    // user login was converted into a swallowed router error, and every
    // palette migration reported failure after succeeding. Typed deps make the
    // literal unspellable — `vue-tsc` is the enforcement, in all three places,
    // for free (gate N2's own assertion; correcting the literal alone would
    // have re-opened the hole on the next tab name).
    const migration = useSlugMigration({
        savedPalettes,
        userLogin,
        userRegenerate,
        adminLogin,
        clearUserSlug: clearSlug,
        ensureSession,
        setActiveView: depsSwitchView,
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

    const filteredSaved = useFilteredList(savedPalettes, librarySearch, (p, q) =>
        p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );


    // ── PORT 1 · Session — identity/auth surface ──────────────────────────────
    const sessionPort = {
        isAdminAuthenticated,
        userSlug,
        userLogout,
        ensureUser,
        ensureSession,
        onRegenerateSlug: migration.onRegenerateSlug,
        identity: migration.identity,
        dismissIdentity: migration.dismissIdentity,
        onSlugSwitch: migration.onSlugSwitch,
    };

    // ── PORT 2 · Library — the saved local palette inventory ──────────────────
    const libraryPort = {
        savedPalettes,
        filteredSaved,
        searchQuery: librarySearch,
        createPalette,
        movePalette,
        storeRecovery,
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
        searchQuery: browseSearch,
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
        usersAccess: admin.access,
        usersNotice: admin.notice,
        dismissUsersNotice: admin.dismissNotice,
        adminUsers: admin.adminUsers,
        adminUsersTotal: admin.adminUsersTotal,
        filteredAdminUsers: admin.filteredAdminUsers,
        emptyUserCount: admin.emptyUserCount,
        expandedUserSlug: admin.expandedUserSlug,
        userPalettes: admin.userPalettes,
        loadingUserPalettes: admin.loadingUserPalettes,
        userPalettesError: admin.userPalettesError,
        toggleUserExpand: admin.toggleUserExpand,
        loadAdminUsers: admin.loadAdminUsers,
        loadingUsers: admin.loadingUsers,
        usersLoadError: admin.usersLoadError,
        onDeleteUser: admin.onDeleteUser,
        onDeleteUserPalettes: admin.onDeleteUserPalettes,
        onAdminDeleteUserPalette: admin.onAdminDeleteUserPalette,
        onUserSortChange: admin.onUserSortChange,
        userSortMode: admin.userSortMode,
        onFeaturePalette: admin.onFeaturePalette,
        onPruneEmpty: admin.onPruneEmpty,
        // colour-name queue:
        namesAccess: colorQueue.namesAccess,
        namesNotice: colorQueue.namesNotice,
        dismissNamesNotice: colorQueue.dismissNamesNotice,
        busyNameIds: colorQueue.busyNameIds,
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
        usersSearch: adminUsersSearch,
        namesSearch: adminNamesSearch,
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
