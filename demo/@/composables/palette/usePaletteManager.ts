import { ref, computed, provide } from "vue";
import type { Ref, InjectionKey } from "vue";

import { usePaletteStore } from "./usePaletteStore";
import { useAdminAuth } from "../auth/useAdminAuth";
import { useUserAuth } from "../auth/useUserAuth";
import { useSession } from "../auth/useSession";
import { useBrowsePalettes } from "./useBrowsePalettes";
import { useAdminUsers } from "../auth/useAdminUsers";
import { useColorNameQueue } from "./useColorNameQueue";
import { useSlugMigration } from "./useSlugMigration";
import { usePaletteActions } from "./usePaletteActions";
import { useFilteredList } from "../useFilteredList";
import { useAdminAudit } from "./useAdminAudit";
import { useAdminFlagged } from "./useAdminFlagged";
import { useAdminTags } from "./useAdminTags";
import { useVersionHistory } from "./useVersionHistory";
import { useTagEdit } from "./useTagEdit";
import type { ViewId } from "../useViewManager";

// `PaletteManager` is the public contract of this facade. We derive it from
// the function's return-type rather than re-declaring 100+ members by hand —
// each sub-composable already owns its own slice of the shape (E.W2 Lane D).
// The InjectionKey is declared after the function for the same reason.
export type PaletteManager = ReturnType<typeof usePaletteManager>;

export interface PaletteManagerDeps {
    currentView: Ref<ViewId>;
    switchView: (id: ViewId) => void;
    savedColorStrings: Ref<string[]>;
    emitApply: (colors: string[]) => void;
    emitAddColor: (css: string) => void;
    emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => void;
    emitSetCurrentColor: (css: string) => void;
}

export function usePaletteManager(deps: PaletteManagerDeps) {
    const { currentView, switchView: depsSwitchView, savedColorStrings, emitApply, emitAddColor, emitStartEdit, emitSetCurrentColor } = deps;

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

    // --- Prune (bridges admin + panel ref) ---

    async function onPrune() {
        const pruned = await admin.onPruneEmpty();
        admin.adminUsersPanelRef.value?.onPruneDone(pruned);
    }

    // --- Assemble facade ---
    // Sub-composable spreads preserve their full return types; ReturnType<>
    // inference rebuilds the public contract from these slices.
    const manager = {
        isAdminAuthenticated,
        userSlug,
        userLogout,
        savedPalettes,
        createPalette,
        updatePalette,
        deletePalette,
        reorderPalettes,
        ensureUser,
        ensureSession: async () => {
            await session.ensureSession();
        },
        ...browse,
        ...admin,
        ...colorQueue,
        ...migration,
        ...actions,
        onPrune,
        searchQuery,
        filteredSaved,
        searchPlaceholder,
        emitApply,
        emitAddColor,
        emitStartEdit,
        emitSetCurrentColor,
        // Sub-object facades (D.W3 Lane B)
        audit,
        flagged,
        tags,
        versions,
        tagEdit,
    };

    provide(PALETTE_MANAGER_KEY, manager);

    return manager;
}

export const PALETTE_MANAGER_KEY: InjectionKey<PaletteManager> =
    Symbol("paletteManager");
