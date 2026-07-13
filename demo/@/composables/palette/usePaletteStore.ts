import { useStorage } from "@vueuse/core";
import { computed } from "vue";
import type { Palette, PaletteColor, PaletteStore } from "@lib/palette/types";
import { createSlug } from "@lib/palette/utils";

const STORAGE_KEY = "color-palettes";

const defaultStore: PaletteStore = { version: 1, palettes: [] };

// ── Module-level singleton (U-F48) ──
// The ONE localStorage binding, shared across every caller — the same lazy-init
// module-ref pattern as useSession/useUserAuth. Before this, `usePaletteStore()`
// re-created a fresh `useStorage` binding (a fresh localStorage round-trip) on
// EVERY call at its three sites (usePaletteManager / useBrowsePalettes /
// useExtractSession). Lazy so `useStorage` is not evaluated at import time
// (SSR safety + Safari private-browsing), and created OUTSIDE the exported
// function body so there is exactly one binding for the app's lifetime.
function createStore() {
    return useStorage<PaletteStore>(STORAGE_KEY, defaultStore, undefined, {
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
}

let _store: ReturnType<typeof createStore> | null = null;

function getStore(): ReturnType<typeof createStore> {
    if (!_store) _store = createStore();
    return _store;
}

// K-PALID: a "saved" palette is a LOCAL palette that carries its local store
// key. The type predicate encodes the store invariant — every stored local
// palette is minted an `id` (`createPalette` / `addPublishedPalette`) — so
// downstream consumers read `id` as a definite `string` with no coercion.
const savedPalettes = computed(() =>
    getStore().value.palettes.filter(
        (p): p is Palette & { id: string } => p.isLocal && p.id != null,
    ),
);

const publishedPalettes = computed(() =>
    getStore().value.palettes.filter((p) => !p.isLocal),
);

function colorsMatch(a: PaletteColor[], b: PaletteColor[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((c, i) => c.css === b[i]?.css);
}

function createPalette(name: string, colors: PaletteColor[]): Palette {
    const store = getStore();
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
    const store = getStore();
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
    const store = getStore();
    const idx = store.value.palettes.findIndex((p) => p.id === id);
    if (idx !== -1) store.value.palettes.splice(idx, 1);
}

function getPalette(id: string): Palette | undefined {
    return getStore().value.palettes.find((p) => p.id === id);
}

function addPublishedPalette(palette: Palette): void {
    const store = getStore();
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
        // K-PALID: absorbing a remote palette (slug-identified, NO server
        // `id`) into the local store makes a NEW local palette — it must be
        // minted a local store key so the local-store invariant "every
        // stored palette has an `id`" holds. The remote original keeps being
        // slug-identified in `remotePalettes`; this is a distinct local copy.
        store.value.palettes.unshift({
            ...palette,
            id: palette.id ?? crypto.randomUUID(),
            isLocal: true,
        });
    }
}

function reorderPalettes(orderedIds: string[]): void {
    const store = getStore();
    const map = new Map(store.value.palettes.map((p) => [p.id, p]));
    const reordered: Palette[] = [];
    for (const id of orderedIds) {
        const p = map.get(id);
        if (p) reordered.push(p);
    }
    // Append any palettes not in the ordered list (a palette with no local
    // `id` is definitionally not in `orderedIds` → appended).
    for (const p of store.value.palettes) {
        if (p.id == null || !orderedIds.includes(p.id)) reordered.push(p);
    }
    store.value.palettes = reordered;
}

/**
 * Module-level singleton: the store binding + its derived state are shared
 * across all callers (the lazy-init pattern of useSession/useUserAuth). The
 * public return surface is unchanged, so the three call sites are untouched.
 */
export function usePaletteStore() {
    return {
        store: getStore(),
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
