import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { Palette } from "@lib/palette/types";
import type { ViewId } from "@composables/viewSchema";

/**
 * The 5 in-dialog tabs. The admin views NOT in this union (admin-audit,
 * admin-flagged, admin-tags) render in `AdminPane.vue` and are reached via
 * the dock view-select — see `PaletteControlsBar.vue` for the matching
 * trigger set (D.W3 Lane A).
 *
 * "saved" is dialog-internal; the other four ARE `ViewId`s. Per D.W3 Lane D
 * the `_TabValueShareWithViewId` assertion below catches drift between this
 * union and the canonical view schema — if anyone removes "browse" / "extract"
 * / "admin-users" / "admin-names" from `ViewId`, the type system flags it
 * here. Equally, if anyone re-introduces a stray `admin-audit` / `-flagged`
 * / `-tags` trigger to the controls bar, they must either add it to this
 * union (and re-implement the corresponding `<TabsContent>` block — the
 * shape Lane A removed) or violate the assertion.
 */
export type TabValue =
    | "saved"
    | "browse"
    | "extract"
    | "admin-users"
    | "admin-names";

// Type-level enforcement (D.W3 Lane D): every TabValue except the
// dialog-internal "saved" MUST be a known ViewId. If this fails, either
// ViewId drifted or someone added a stray TabValue without a matching
// route — fix the schema before the dialog.
type _TabValueShareWithViewId = Exclude<TabValue, "saved"> extends ViewId
    ? true
    : never;
// Materialise the assertion so the compiler runs it.
const _tabValueShareWithViewId: _TabValueShareWithViewId = true;
void _tabValueShareWithViewId;

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
