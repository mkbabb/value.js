import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import type { Palette, PaletteColor, PaletteStore } from "@lib/palette/types";
import { createSlug } from "@lib/palette/utils";

const STORAGE_KEY = "color-palettes";

const defaultStore: PaletteStore = { version: 1, palettes: [] };

export function usePaletteStore() {
    const store = useStorage<PaletteStore>(STORAGE_KEY, defaultStore, undefined, {
        deep: true,
        serializer: {
            read(raw: string): PaletteStore {
                try {
                    const parsed = JSON.parse(raw);
                    if (!parsed || typeof parsed.version !== "number") {
                        return defaultStore;
                    }
                    return parsed;
                } catch {
                    return defaultStore;
                }
            },
            write(value: PaletteStore): string {
                return JSON.stringify(value);
            },
        },
    });

    const savedPalettes = computed(() =>
        store.value.palettes.filter((p) => p.isLocal),
    );

    const publishedPalettes = computed(() =>
        store.value.palettes.filter((p) => !p.isLocal),
    );

    function colorsMatch(a: PaletteColor[], b: PaletteColor[]): boolean {
        if (a.length !== b.length) return false;
        return a.every((c, i) => c.css === b[i]?.css);
    }

    function createPalette(name: string, colors: PaletteColor[]): Palette {
        // Dedup: if same name + colors exist, move to front
        const existing = store.value.palettes.find(
            (p) =>
                p.isLocal &&
                p.name.toLowerCase() === name.toLowerCase() &&
                colorsMatch(p.colors, colors),
        );
        if (existing) {
            const idx = store.value.palettes.indexOf(existing);
            store.value.palettes.splice(idx, 1);
            store.value.palettes.unshift(existing);
            existing.updatedAt = new Date().toISOString();
            return existing;
        }

        const now = new Date().toISOString();
        const palette: Palette = {
            id: crypto.randomUUID(),
            name,
            slug: createSlug(name),
            colors,
            createdAt: now,
            updatedAt: now,
            isLocal: true,
        };
        store.value.palettes.unshift(palette);
        return palette;
    }

    function updatePalette(id: string, patch: Partial<Pick<Palette, "name" | "colors" | "isLocal">>): void {
        const idx = store.value.palettes.findIndex((p) => p.id === id);
        if (idx === -1) return;
        const palette = store.value.palettes[idx]!;
        if (patch.name != null) {
            palette.name = patch.name;
            palette.slug = createSlug(patch.name);
        }
        if (patch.colors != null) palette.colors = patch.colors;
        if (patch.isLocal != null) palette.isLocal = patch.isLocal;
        palette.updatedAt = new Date().toISOString();
    }

    function deletePalette(id: string): void {
        const idx = store.value.palettes.findIndex((p) => p.id === id);
        if (idx !== -1) store.value.palettes.splice(idx, 1);
    }

    function getPalette(id: string): Palette | undefined {
        return store.value.palettes.find((p) => p.id === id);
    }

    function addPublishedPalette(palette: Palette): void {
        // Dedup by name + colors
        const existing = store.value.palettes.find(
            (p) =>
                p.isLocal &&
                p.name.toLowerCase() === palette.name.toLowerCase() &&
                colorsMatch(p.colors, palette.colors),
        );
        if (existing) {
            // Move to front instead of duplicating
            const idx = store.value.palettes.indexOf(existing);
            store.value.palettes.splice(idx, 1);
            store.value.palettes.unshift(existing);
            return;
        }
        // Also check slug to avoid exact duplicates
        const slugExists = store.value.palettes.some((p) => p.slug === palette.slug);
        if (!slugExists) {
            store.value.palettes.unshift({ ...palette, isLocal: true });
        }
    }

    function reorderPalettes(orderedIds: string[]): void {
        const map = new Map(store.value.palettes.map((p) => [p.id, p]));
        const reordered: Palette[] = [];
        for (const id of orderedIds) {
            const p = map.get(id);
            if (p) reordered.push(p);
        }
        // Append any palettes not in the ordered list
        for (const p of store.value.palettes) {
            if (!orderedIds.includes(p.id)) reordered.push(p);
        }
        store.value.palettes = reordered;
    }

    return {
        store,
        savedPalettes,
        publishedPalettes,
        createPalette,
        updatePalette,
        deletePalette,
        getPalette,
        addPublishedPalette,
        reorderPalettes,
    };
}
