/**
 * useVersionHistory — version drawer fetch + revert + fork.
 *
 * Wraps `listVersions`, `revertPalette`, `forkPalette` and owns the
 * version-drawer state (versions list, total, loading, paletteSlug). Exposed
 * at the facade as `pm.versions`.
 *
 * Migration source: `palette-browser/VersionHistoryDrawer.vue`,
 * `palette-browser/PaletteDialog/composables/useDialogModalStack.ts` (revert),
 * `palette-browser/PaletteDialog/composables/useDialogBrowseActions.ts` (fork),
 * `palettes/BrowsePane.vue` (fork + revert).
 */
import { ref, type Ref } from "vue";
import { listVersions, revertPalette, forkPalette } from "./api";
import type { Palette, PaletteVersion } from "./types";

export interface VersionsPage {
    data: PaletteVersion[];
    total: number;
}

export interface UseVersionHistory {
    versions: Ref<PaletteVersion[]>;
    total: Ref<number>;
    loading: Ref<boolean>;
    paletteSlug: Ref<string | null>;
    /** Fetch a single page of versions (raw; drawers manage their own list). */
    fetchVersions: (
        slug: string,
        limit?: number,
        offset?: number,
    ) => Promise<VersionsPage | undefined>;
    /** Facade-side accumulating load (loads into the shared `versions` ref). */
    loadVersions: (slug: string, offset?: number) => Promise<void>;
    loadMore: () => Promise<void>;
    revert: (slug: string, hash: string) => Promise<Palette | undefined>;
    fork: (
        slug: string,
        name?: string,
        forkSlug?: string,
    ) => Promise<Palette | undefined>;
    reset: () => void;
}

export function useVersionHistory(): UseVersionHistory {
    const versions = ref<PaletteVersion[]>([]);
    const total = ref(0);
    const loading = ref(false);
    const paletteSlug = ref<string | null>(null);

    async function fetchVersions(
        slug: string,
        limit = 20,
        offset = 0,
    ): Promise<VersionsPage | undefined> {
        try {
            const res = await listVersions(slug, limit, offset);
            return { data: res.data, total: res.total };
        } catch (e) {
            console.warn("Failed to load versions:", e);
            return undefined;
        }
    }

    async function loadVersions(slug: string, offset = 0) {
        loading.value = true;
        try {
            paletteSlug.value = slug;
            const page = await fetchVersions(slug, 20, offset);
            if (!page) return;
            if (offset === 0) {
                versions.value = page.data;
            } else {
                versions.value = [...versions.value, ...page.data];
            }
            total.value = page.total;
        } finally {
            loading.value = false;
        }
    }

    async function loadMore() {
        if (paletteSlug.value) {
            await loadVersions(paletteSlug.value, versions.value.length);
        }
    }

    async function revert(slug: string, hash: string): Promise<Palette | undefined> {
        try {
            return await revertPalette(slug, hash);
        } catch (e) {
            console.warn("Failed to revert:", e);
            return undefined;
        }
    }

    async function fork(
        slug: string,
        name?: string,
        forkSlug?: string,
    ): Promise<Palette | undefined> {
        try {
            return await forkPalette(slug, name, forkSlug);
        } catch (e) {
            console.warn("Failed to fork palette:", e);
            return undefined;
        }
    }

    function reset() {
        versions.value = [];
        total.value = 0;
        paletteSlug.value = null;
    }

    return {
        versions,
        total,
        loading,
        paletteSlug,
        fetchVersions,
        loadVersions,
        loadMore,
        revert,
        fork,
        reset,
    };
}
