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

    function createPalette(name: string, colors: PaletteColor[]): Palette {
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
        store.value.palettes.push(palette);
        return palette;
    }

    function updatePalette(id: string, patch: Partial<Pick<Palette, "name" | "colors" | "isLocal">>): void {
        const idx = store.value.palettes.findIndex((p) => p.id === id);
        if (idx === -1) return;
        const palette = store.value.palettes[idx];
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
        const exists = store.value.palettes.some((p) => p.slug === palette.slug);
        if (!exists) {
            store.value.palettes.push({ ...palette, isLocal: true });
        }
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
    };
}
