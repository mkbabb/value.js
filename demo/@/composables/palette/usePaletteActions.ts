import { ref, computed, type Ref } from "vue";

import { copyToClipboard } from "./useClipboard";
import { useSession } from "./useSession";
import { useUserAuth } from "./useUserAuth";
import { publishPalette } from "@lib/palette/api";
import type { Palette, PaletteColor } from "@lib/palette/types";

export function usePaletteActions(deps: {
    savedPalettes: Ref<Palette[]>;
    remotePalettes: Ref<Palette[]>;
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

    function onApply(palette: Palette) {
        deps.emitApply(palette.colors.map((c) => c.css));
    }

    function onDelete(palette: Palette) {
        deps.deletePalette(palette.id);
    }

    async function onPublish(palette: Palette) {
        try {
            await ensureUser();
            await session.ensureSession();
        } catch {
            console.warn("Failed to create session — check your network connection");
            return;
        }
        try {
            await publishPalette({
                name: palette.name,
                slug: palette.slug,
                colors: palette.colors,
            });
        } catch (e: any) {
            const msg = e?.message ?? "";
            console.warn(`Failed to publish: ${msg || "unknown error"}`);
        }
    }

    function onRenameSaved(palette: Palette, newName: string) {
        deps.updatePalette(palette.id, { name: newName });
    }

    async function onCurrentPaletteSaved(name: string, colors: PaletteColor[]) {
        await ensureUser();
        const palette = deps.createPalette(name, colors);
        expandedId.value = palette.id;
    }

    function onCurrentPaletteUpdated(id: string, colors: PaletteColor[]) {
        deps.updatePalette(id, { colors });
        expandedId.value = id;
    }

    function onSwatchAddColor(css: string) {
        deps.emitAddColor(css);
    }

    function onEditColor(palette: Palette, colorIndex: number, css: string) {
        deps.emitStartEdit({ paletteId: palette.id, colorIndex, originalCss: css });
    }

    function commitColorEdit(paletteId: string, colorIndex: number, newCss: string) {
        if (paletteId === "__current__") {
            const oldCss = deps.savedColorStrings.value[colorIndex];
            if (oldCss === newCss) return;
            const updated = [...deps.savedColorStrings.value];
            updated[colorIndex] = newCss;
            deps.emitApply(updated);
            return;
        }

        const palette =
            deps.savedPalettes.value.find((p) => p.id === paletteId) ??
            deps.remotePalettes.value.find((p) => p.id === paletteId);
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
        onApply,
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
