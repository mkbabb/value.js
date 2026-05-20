/**
 * useTagEdit — shared tag catalog + tag-patch commit for the tag-edit popover.
 *
 * Wraps `getTags` (the public tag catalog) and `updatePalette({tags})` (the
 * tag-patch commit). Owns the shared `allTags` list with a `loaded` guard so
 * the catalog is fetched once and reused across consumers (BrowsePane,
 * PaletteDialog shell, TagEditPopover). Exposed at the facade as `pm.tagEdit`.
 *
 * Migration source: `palette-browser/TagEditPopover.vue`,
 * `palette-browser/PaletteDialog/PaletteDialog.vue` (availableTags),
 * `panes/BrowsePane.vue` (availableTags).
 */
import { ref, type Ref } from "vue";
import { getTags, updatePalette } from "@lib/palette/api";
import type { Palette, Tag } from "@lib/palette/types";

export interface UseTagEdit {
    allTags: Ref<Tag[]>;
    loading: Ref<boolean>;
    loaded: Ref<boolean>;
    loadAllTags: (force?: boolean) => Promise<void>;
    saveTags: (slug: string, tags: string[]) => Promise<Palette | undefined>;
}

export function useTagEdit(): UseTagEdit {
    const allTags = ref<Tag[]>([]);
    const loading = ref(false);
    const loaded = ref(false);

    async function loadAllTags(force = false) {
        if (loaded.value && !force) return;
        if (allTags.value.length > 0 && !force) {
            loaded.value = true;
            return;
        }
        loading.value = true;
        try {
            allTags.value = await getTags();
            loaded.value = true;
        } catch {
            // silent — tag catalog is best-effort
        } finally {
            loading.value = false;
        }
    }

    async function saveTags(
        slug: string,
        tags: string[],
    ): Promise<Palette | undefined> {
        try {
            return await updatePalette(slug, { tags });
        } catch (e) {
            console.warn("Failed to update tags:", e);
            return undefined;
        }
    }

    return {
        allTags,
        loading,
        loaded,
        loadAllTags,
        saveTags,
    };
}
