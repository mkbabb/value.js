/**
 * useDialogModalStack — stack-of-overlays bookkeeping for the palette dialog.
 *
 * Owns the open/payload state for the three nested modals reachable from the
 * dialog:
 *   - DeleteAllConfirm   (confirm-delete-all-saved-palettes)
 *   - VersionHistoryDrawer (per-palette version list + revert)
 *   - FlagReportDialog   (user-facing flag/report a published palette)
 *
 * Extracted from `PaletteDialog.vue` (D.W3 Lane A). The dialog shell calls
 * `openVersions(palette)` / `openFlag(palette)` etc. and binds the returned
 * refs to v-model:open on each sub-dialog. Side-effect handlers
 * (`onRevert`, `onFlagSubmit`, `onDeleteAllSaved`) take their dependencies
 * as args so the composable stays free of injection/coupling — see usage in
 * the outer shell.
 */
import { ref } from "vue";
import { flagPalette, revertPalette } from "@lib/palette/api";
import type { Palette } from "@lib/palette/types";

export function useDialogModalStack() {
    // --- Delete-all-saved confirm ---
    const showDeleteAllConfirm = ref(false);

    // --- Version history drawer ---
    const versionDrawerOpen = ref(false);
    const versionDrawerPalette = ref<Palette | null>(null);

    function openVersions(palette: Palette) {
        versionDrawerPalette.value = palette;
        versionDrawerOpen.value = true;
    }

    async function onRevert(
        hash: string,
        deps: {
            updateRemote: (slug: string, updated: Palette) => void;
        },
    ) {
        if (!versionDrawerPalette.value) return;
        try {
            const updated = await revertPalette(versionDrawerPalette.value.slug, hash);
            deps.updateRemote(updated.slug, updated);
            versionDrawerPalette.value = updated;
        } catch (e) {
            console.warn("Failed to revert:", e);
        }
    }

    // --- Flag report dialog ---
    const flagDialogOpen = ref(false);
    const flagDialogPalette = ref<Palette | null>(null);

    function openFlag(palette: Palette) {
        flagDialogPalette.value = palette;
        flagDialogOpen.value = true;
    }

    async function onFlagSubmit(reason: string, detail: string | undefined) {
        if (!flagDialogPalette.value) return;
        try {
            await flagPalette(flagDialogPalette.value.slug, reason, detail);
        } catch (e) {
            console.warn("Failed to flag palette:", e);
        }
        flagDialogOpen.value = false;
    }

    return {
        // delete-all
        showDeleteAllConfirm,
        // version drawer
        versionDrawerOpen,
        versionDrawerPalette,
        openVersions,
        onRevert,
        // flag dialog
        flagDialogOpen,
        flagDialogPalette,
        openFlag,
        onFlagSubmit,
    };
}
