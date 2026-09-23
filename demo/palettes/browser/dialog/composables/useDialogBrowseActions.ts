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
import type { Palette } from "../../../types";
import type { BrowsePort } from "../../../usePalettePorts";

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
     * F2 · X.W7.d2 (W7-failure-dispositions row 47): the host's surface for a
     * failed fork — `BrowsePane` renders it on the palette inspector's rail.
     * REQUIRED: a fork is a user-initiated mutation, so there is no host for
     * which its failure may go unrendered (the retired `console.warn` arm).
     */
    onForkError: (palette: Palette, message: string) => void;
}

export function useDialogBrowseActions(deps: DialogBrowseActionsDeps) {
    const { pm, modalStack } = deps;

    async function onFork(palette: Palette) {
        try {
            await pm.ensureUser();
            await pm.ensureSession();
            const forked = await pm.versions.fork(palette.slug);
            if (!forked) {
                // `useVersionHistory.fork` settles a transport failure as
                // `undefined`; it is this act's failure, rendered here.
                deps.onForkError(palette, "Remix failed: the fork did not reach the server.");
                return;
            }
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
            const reason = e instanceof Error && e.message ? e.message : "backend unreachable";
            deps.onForkError(palette, `Remix failed: ${reason}`);
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
