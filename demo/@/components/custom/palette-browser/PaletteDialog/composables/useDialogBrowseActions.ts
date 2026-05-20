/**
 * useDialogBrowseActions — dialog-local fork + revert + browse-filter wiring.
 *
 * Extracted from `PaletteDialog.vue` (D.W3 Lane A). The composable groups
 * three concerns that operate on `pm.remotePalettes` from the dialog side:
 *
 *  - Fork (`onFork`): clone a published palette into the current user's slug
 *    and prepend to `remotePalettes`.
 *  - Revert (`onRevert`): delegate to `modalStack.onRevert` with the
 *    `remotePalettes`-update callback wired in.
 *  - Browse filter handlers (`onStatusChange` / `onTagsChange` /
 *    `onClearFilters`): mutate `pm.statusFilter` / `pm.selectedTags` and
 *    reload remote palettes.
 *
 * The composable accepts the facade slice it touches + the modal-stack
 * handle so it stays free of injection (the dialog shell already injects pm).
 */
import { forkPalette } from "@lib/palette/api";
import type { Palette } from "@lib/palette/types";
import type { PaletteManager } from "@composables/palette/usePaletteManager";

export interface DialogBrowseActionsDeps {
    pm: PaletteManager;
    modalStack: { onRevert: (hash: string, deps: { updateRemote: (slug: string, updated: Palette) => void }) => Promise<void> };
}

export function useDialogBrowseActions(deps: DialogBrowseActionsDeps) {
    const { pm, modalStack } = deps;

    async function onFork(palette: Palette) {
        try {
            await pm.ensureUser();
            await pm.ensureSession();
            const forked = await forkPalette(palette.slug);
            pm.remotePalettes.value = [forked, ...pm.remotePalettes.value];
        } catch (e) {
            console.warn("Failed to fork palette:", e);
        }
    }

    async function onRevert(hash: string) {
        await modalStack.onRevert(hash, {
            updateRemote: (slug, updated) => {
                const idx = pm.remotePalettes.value.findIndex((p) => p.slug === slug);
                if (idx >= 0) pm.remotePalettes.value[idx] = updated;
            },
        });
    }

    function onStatusChange(status: string) {
        pm.statusFilter.value = status;
        pm.loadRemotePalettes(true);
    }

    function onTagsChange(tags: string[]) {
        pm.selectedTags.value = tags;
        pm.loadRemotePalettes(true);
    }

    function onClearFilters() {
        pm.statusFilter.value = "";
        pm.selectedTags.value = [];
        pm.loadRemotePalettes(true);
    }

    return {
        onFork,
        onRevert,
        onStatusChange,
        onTagsChange,
        onClearFilters,
    };
}
