import { ref, computed, type Ref } from "vue";

import { copyToClipboard } from "@mkbabb/glass-ui";
import { useSession } from "../auth/useSession";
import { useUserAuth } from "../auth/useUserAuth";
import { createAndSavePalette } from "@lib/palette/api";
import { CURRENT_PALETTE_ID } from "@lib/palette/constants";
import type { Palette, PaletteColor } from "@lib/palette/types";

export function usePaletteActions(deps: {
    // K-PALID: saved palettes are local + carry their store key (`id: string`).
    savedPalettes: Ref<(Palette & { id: string })[]>;
    savedColorStrings: Ref<string[]>;
    createPalette: (name: string, colors: PaletteColor[]) => Palette;
    updatePalette: (id: string, patch: Partial<Palette>) => void;
    deletePalette: (id: string) => void;
    emitApply: (colors: string[]) => void;
    emitAddColor: (css: string) => void;
    emitStartEdit: (target: { paletteId: string; colorIndex: number; originalCss: string }) => void;
}) {
    const { ensureUser } = useUserAuth();
    const session = useSession();

    const expandedId = ref<string | null>(null);
    const showDeleteAllConfirm = ref(false);

    function toggleExpand(id: string) {
        expandedId.value = expandedId.value === id ? null : id;
    }

    function onDelete(palette: Palette) {
        // K-PALID: `onDelete` fires on a SAVED (local) palette — its local store
        // key is guaranteed present. The guard makes the local-only precondition
        // explicit (a remote palette, which has no local `id`, is not in the
        // store to delete).
        if (palette.id == null) return;
        deps.deletePalette(palette.id);
    }

    async function onPublish(palette: Palette): Promise<{ success: boolean; message: string }> {
        try {
            await ensureUser();
            await session.ensureSession();
        } catch {
            return { success: false, message: "Failed to create session" };
        }
        try {
            await createAndSavePalette({
                name: palette.name,
                slug: palette.slug,
                colors: palette.colors,
            });
            return { success: true, message: "Published!" };
        } catch (e: any) {
            const msg = e?.message ?? "unknown error";
            return { success: false, message: `Failed to publish: ${msg}` };
        }
    }

    function onRenameSaved(palette: Palette, newName: string) {
        if (palette.id == null) return;
        deps.updatePalette(palette.id, { name: newName });
    }

    function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
        // save-P0 (local-first inversion): a save is a local, destructive
        // gesture — `createPalette` must run UNCONDITIONALLY so a save with the
        // backend down loses zero data. `ensureUser()` (a network act that
        // throws when the backend is unreachable) is deferred to publish, where
        // `onPublish` already guards it in a try/catch. The prior `await
        // ensureUser()` here inverted the contract: on an unreachable backend it
        // threw before `createPalette` ran and the palette was silently destroyed.
        const palette = deps.createPalette(name, colors);
        // `createPalette` always mints a local `id`; the guard satisfies the
        // honest optional type without a coercion.
        if (palette.id != null) expandedId.value = palette.id;
    }

    function onCurrentPaletteUpdated(id: string, colors: PaletteColor[]) {
        deps.updatePalette(id, { colors });
        expandedId.value = id;
    }

    function onSwatchAddColor(css: string) {
        deps.emitAddColor(css);
    }

    function onEditColor(palette: Palette, colorIndex: number, css: string) {
        // K-PALID: in-place swatch editing writes through the LOCAL store
        // (`commitColorEdit` → `deps.updatePalette`), so it is meaningful only
        // for palettes that live in the store (a local `id`). A remote palette
        // has no local `id` and is not store-backed — editing it in place was a
        // no-op that keyed the store on `undefined`. Own that honestly: only a
        // local palette starts an edit here.
        if (palette.id == null) return;
        deps.emitStartEdit({ paletteId: palette.id, colorIndex, originalCss: css });
    }

    function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
        if (paletteId === CURRENT_PALETTE_ID) {
            const oldCss = deps.savedColorStrings.value[colorIndex];
            if (oldCss === newCss) return;
            const updated = [...deps.savedColorStrings.value];
            updated[colorIndex] = newCss;
            deps.emitApply(updated);
            return;
        }

        // K-PALID: `commitColorEdit` writes through the LOCAL store, so it
        // resolves against saved (local) palettes by their local `id` only. The
        // former `remotePalettes.find((p) => p.id === paletteId)` fallback was
        // dishonest — remote palettes have NO `id`, so it matched the first
        // remote by `undefined` and then no-op'd the store write.
        const palette = deps.savedPalettes.value.find((p) => p.id === paletteId);
        if (!palette) return;

        const oldCss = palette.colors[colorIndex]?.css;
        if (oldCss === newCss) return;

        const updatedColors = [...palette.colors];
        updatedColors[colorIndex] = { ...updatedColors[colorIndex]!, css: newCss };
        deps.updatePalette(paletteId, { colors: updatedColors });
    }

    function onDeleteAllSaved() {
        for (const p of [...deps.savedPalettes.value]) {
            deps.deletePalette(p.id);
        }
        expandedId.value = null;
        showDeleteAllConfirm.value = false;
    }

    function onDotClick(cssColorOpaque: string) {
        copyToClipboard(cssColorOpaque);
    }

    return {
        expandedId,
        showDeleteAllConfirm,
        toggleExpand,
        onDelete,
        onPublish,
        onRenameSaved,
        onCurrentPaletteSaved,
        onCurrentPaletteUpdated,
        onSwatchAddColor,
        onEditColor,
        commitColorEdit,
        onDeleteAllSaved,
        onDotClick,
    };
}
