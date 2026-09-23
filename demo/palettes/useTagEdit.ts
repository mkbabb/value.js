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
 * `palettes/BrowsePane.vue` (availableTags).
 */
import { ref, type Ref } from "vue";
import { getTags, updatePalette } from "./api";
import { preflightTags } from "./api/preflight";
import type { Palette, Tag } from "./types";

export interface UseTagEdit {
    allTags: Ref<Tag[]>;
    loading: Ref<boolean>;
    loaded: Ref<boolean>;
    /**
     * X.W7.d (W7-failure-dispositions rows 10-11): the last catalog-load or
     * tag-save failure, in words — `null` after a success. The pre-flight's
     * refusal (`tags ≤ 10`, the tag vocabulary) lands here before any request.
     */
    error: Ref<string | null>;
    loadAllTags: (force?: boolean) => Promise<void>;
    saveTags: (
        slug: string,
        tags: string[],
        ifMatch?: string,
    ) => Promise<Palette | undefined>;
}

export function useTagEdit(): UseTagEdit {
    const allTags = ref<Tag[]>([]);
    const loading = ref(false);
    const loaded = ref(false);
    const error = ref<string | null>(null);

    function messageOf(e: unknown, fallback: string): string {
        return e instanceof Error && e.message ? e.message : fallback;
    }

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
            error.value = null;
        } catch (e) {
            // Row 10: the editor must not open without its catalog in silence.
            error.value = `The tag catalog is unreachable: ${messageOf(e, "backend unreachable")}`;
        } finally {
            loading.value = false;
        }
    }

    async function saveTags(
        slug: string,
        tags: string[],
        ifMatch = "*",
    ): Promise<Palette | undefined> {
        // G10 · N_tags = 11: refused here, in words — never a 400 round-trip.
        const preflight = preflightTags(tags);
        if (!preflight.ok) {
            error.value = preflight.message;
            return undefined;
        }
        try {
            // K.W2: PATCH REQUIRES If-Match (428 if absent). W5-13 · F-9: the
            // caller now threads a CAPTURED validator (`paletteETag(palette)`)
            // when it holds the palette — closing the two-tab lost-update window.
            // The `"*"` RFC 7232 match-any default remains the fallback for the
            // rare caller with no palette in hand.
            const saved = await updatePalette(slug, { tags }, ifMatch);
            error.value = null;
            return saved;
        } catch (e) {
            error.value = `The tags were not saved: ${messageOf(e, "backend unreachable")}`;
            return undefined;
        }
    }

    return {
        allTags,
        loading,
        loaded,
        error,
        loadAllTags,
        saveTags,
    };
}
