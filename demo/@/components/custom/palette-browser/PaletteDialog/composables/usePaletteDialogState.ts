import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { Palette } from "@lib/palette/types";

/**
 * The 5 in-dialog tabs. The admin views NOT in this union (admin-audit,
 * admin-flagged, admin-tags) render in `AdminPane.vue` and are reached via
 * the dock view-select — see `PaletteControlsBar.vue` for the matching
 * trigger set (D.W3 Lane A).
 */
export type TabValue =
    | "saved"
    | "browse"
    | "extract"
    | "admin-users"
    | "admin-names";

export interface PaletteDialogStateDeps {
    /**
     * Saved palettes ref — kept on the signature for source-compat. Currently
     * unused inside the composable (filteredSaved lives on usePaletteManager
     * post-D.W3 Lane A); retained so future dialog-local derivations can plug in.
     */
    savedPalettes: Ref<Palette[]>;
    /** Whether the admin is currently authenticated (resets admin tabs on logout) */
    isAdminAuthenticated: Ref<boolean>;
}

/**
 * Dialog-internal active-tab state. The search/filter state and `filteredSaved`
 * computation used to also live here, but D.W3 Lane A migrated them to
 * `usePaletteManager` (the single source of truth for cross-pane state).
 */
export function usePaletteDialogState(deps: PaletteDialogStateDeps) {
    void deps.savedPalettes; // see JSDoc

    const activeTab = ref<TabValue>("saved");

    // Reset admin tabs when logged out
    watch(deps.isAdminAuthenticated, (auth) => {
        if (!auth && activeTab.value.startsWith("admin-")) {
            activeTab.value = "saved";
        }
    });

    function setActiveTab(tab: TabValue) {
        activeTab.value = tab;
    }

    return {
        activeTab,
        setActiveTab,
    };
}
