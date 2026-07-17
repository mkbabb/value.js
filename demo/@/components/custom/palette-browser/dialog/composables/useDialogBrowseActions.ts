/**
 * useDialogBrowseActions — host-agnostic fork + revert + browse-filter wiring.
 *
 * Extracted from `PaletteDialog.vue` (D.W3 Lane A); collapsed to the ONE shared
 * implementation at S.W2 W2-5 (F1/F2) — `BrowsePane` no longer hand-rolls a
 * drifted second copy. The composable groups three concerns that operate on
 * `pm.remotePalettes`:
 *
 *  - Fork (`onFork`): clone a published palette into the current user's slug,
 *    prepend to `remotePalettes`, AND bump the source palette's `forkCount`
 *    (the increment lives HERE now, not just in the pane copy — F1); a failure
 *    routes through the host's `onForkError` feedback surface (F2), never a
 *    silent console-only swallow on the pane path.
 *  - Revert (`onRevert`): delegate to `modalStack.onRevert` with the
 *    `remotePalettes`-update callback wired in (dialog-only; the pane keeps its
 *    version-drawer revert).
 *  - Browse filter handlers (`onTierChange` / `onTagsChange` /
 *    `onClearFilters`): mutate `pm.tierFilter` / `pm.selectedTags` and reload.
 *
 * The composable accepts the facade slice it touches + the optional modal-stack
 * handle so it stays free of injection (each host already injects pm).
 */
import type { Palette } from "../../../../../../palettes/types";
import type { BrowsePort } from "../../../../../../palettes/usePalettePorts";

export interface DialogBrowseActionsDeps {
    pm: Pick<
        BrowsePort,
        | "ensureUser"
        | "ensureSession"
        | "versions"
        | "remotePalettes"
        | "loadRemotePalettes"
        | "tierFilter"
        | "selectedTags"
    >;
    /** Dialog-only; the pane host omits it (keeps its own version-drawer revert). */
    modalStack?: { onRevert: (hash: string, deps: { updateRemote: (slug: string, updated: Palette) => void }) => Promise<void> };
    /**
     * F2: host-supplied surface for a failed fork. `BrowsePane` routes this onto
     * the palette card's `showFeedback` (the same surface `onSave`/`onDeleteOwned`
     * use). When absent (the dialog host today), a fork failure logs — never a
     * silent swallow on the pane path.
     */
    onForkError?: (palette: Palette, message: string) => void;
}

export function useDialogBrowseActions(deps: DialogBrowseActionsDeps) {
    const { pm, modalStack } = deps;

    async function onFork(palette: Palette) {
        try {
            await pm.ensureUser();
            await pm.ensureSession();
            const forked = await pm.versions.fork(palette.slug);
            if (!forked) return;
            pm.remotePalettes.value = [forked, ...pm.remotePalettes.value];
            // F1: bump the source palette's fork-count badge (ported from the
            // BrowsePane copy so both hosts observe the same state).
            const idx = pm.remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            const source = pm.remotePalettes.value[idx];
            if (idx >= 0 && source) {
                pm.remotePalettes.value[idx] = {
                    ...source,
                    forkCount: (source.forkCount ?? 0) + 1,
                };
            }
        } catch (e) {
            // F2: a user-triggered remote mutation must surface its failure.
            const message = e instanceof Error ? e.message : "Failed to remix palette.";
            if (deps.onForkError) deps.onForkError(palette, message);
            else console.warn("Failed to remix palette:", e);
        }
    }

    async function onRevert(hash: string) {
        if (!modalStack) return;
        await modalStack.onRevert(hash, {
            updateRemote: (slug, updated) => {
                const idx = pm.remotePalettes.value.findIndex((p) => p.slug === slug);
                if (idx >= 0) pm.remotePalettes.value[idx] = updated;
            },
        });
    }

    function onTierChange(tier: string) {
        pm.tierFilter.value = tier;
        pm.loadRemotePalettes(true);
    }

    function onTagsChange(tags: string[]) {
        pm.selectedTags.value = tags;
        pm.loadRemotePalettes(true);
    }

    function onClearFilters() {
        pm.tierFilter.value = "";
        pm.selectedTags.value = [];
        pm.loadRemotePalettes(true);
    }

    return {
        onFork,
        onRevert,
        onTierChange,
        onTagsChange,
        onClearFilters,
    };
}
