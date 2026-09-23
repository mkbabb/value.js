import { ref, type Ref } from "vue";
import { useFilteredList } from "./useFilteredList";
import { useSession } from "../platform/auth/useSession";
import { usePaletteStore } from "./usePaletteStore";
import {
    listPalettes,
    votePalette,
    renamePalette,
    deletePaletteUser,
    publishPalette,
    unpublishPalette,
    paletteETag,
} from "./api";
import type { ListPalettesOptions } from "./api";
import type { Palette } from "./types";

/**
 * One browse mutation's visible result (W7-failure-dispositions rows 12-17:
 * SURFACE). Every act on a remote palette settles one of these, and the host
 * renders it on the inspector's rail — a failure is never a `console.warn`
 * alone and never a success-shaped return.
 */
export interface BrowseVerdict {
    readonly success: boolean;
    readonly message: string;
}

function failureOf(e: unknown, fallback: string): string {
    return e instanceof Error && e.message ? e.message : fallback;
}

/** The public-wall page size — the keyset cursor advances one of these at a time. */
const BROWSE_PAGE_SIZE = 50;

export function useBrowsePalettes(deps: {
    searchQuery: Ref<string>;
}) {
    const session = useSession();
    const { addPublishedPalette } = usePaletteStore();

    const remotePalettes = ref<Palette[]>([]);
    const browsing = ref(false);
    const sortLoading = ref(false);
    const loadingMore = ref(false);
    const sortMode = ref<"newest" | "popular" | "most-forked">("newest");
    const browseError = ref<string | null>(null);

    // F-1 keyset pagination: the cursor + more-flag from the last page fetched.
    // `GET /palettes` is cursor-only (N.W3.D); `nextCursor` feeds the next page
    // and `hasMore` gates the load-more affordance (wired by BrowsePane).
    const nextCursor = ref<string | null>(null);
    const hasMore = ref(false);

    // Filter state — set externally by PaletteDialog
    const tierFilter = ref("");
    const selectedTags = ref<string[]>([]);

    const filteredBrowse = useFilteredList(remotePalettes, deps.searchQuery, (p, q) =>
        p.name.toLowerCase().includes(q) || p.slug.includes(q),
    );

    let loadGeneration = 0;

    /** The shared filter params (sort + search + tier + tags) for one browse
     *  query — reused by the fresh load and the cursor continuation so the two
     *  can never drift apart. */
    function currentFilterOpts(): ListPalettesOptions {
        const q = deps.searchQuery.value.trim();
        return {
            limit: BROWSE_PAGE_SIZE,
            sort: sortMode.value,
            ...(q.length >= 2 ? { q } : {}),
            ...(tierFilter.value ? { tier: tierFilter.value } : {}),
            ...(selectedTags.value.length > 0 ? { tags: selectedTags.value } : {}),
        };
    }

    async function loadRemotePalettes(isSort = false) {
        const gen = ++loadGeneration;
        if (!isSort) {
            browsing.value = true;
        } else {
            sortLoading.value = true;
        }
        try {
            browseError.value = null;
            const res = await listPalettes(currentFilterOpts());
            if (gen !== loadGeneration) return; // stale response
            remotePalettes.value = Array.isArray(res.data) ? res.data : [];
            nextCursor.value = res.nextCursor ?? null;
            hasMore.value = res.hasMore === true && res.nextCursor != null;
        } catch (e) {
            if (gen !== loadGeneration) return;
            // Row 12: the pane renders `browseError` (the wall's error plate).
            browseError.value = `Failed to load palettes: ${failureOf(e, "backend unreachable")}`;
            nextCursor.value = null;
            hasMore.value = false;
        } finally {
            if (gen === loadGeneration) {
                browsing.value = false;
                sortLoading.value = false;
            }
        }
    }

    /**
     * F-1: advance one keyset page — fetch the next `nextCursor` slice and
     * APPEND it (never replaces the wall). No-op when there is no more to load
     * or a page is already in flight. A concurrent fresh load (which bumps
     * `loadGeneration`) discards this continuation's append.
     */
    async function loadMoreRemotePalettes(): Promise<BrowseVerdict | null> {
        if (!hasMore.value || nextCursor.value == null || loadingMore.value) return null;
        const gen = loadGeneration;
        const cursor = nextCursor.value;
        loadingMore.value = true;
        try {
            const res = await listPalettes({ ...currentFilterOpts(), cursor });
            if (gen !== loadGeneration) return null; // a fresh load superseded us
            const page = Array.isArray(res.data) ? res.data : [];
            remotePalettes.value = [...remotePalettes.value, ...page];
            nextCursor.value = res.nextCursor ?? null;
            hasMore.value = res.hasMore === true && res.nextCursor != null;
            return { success: true, message: `Loaded ${page.length} more` };
        } catch (e) {
            // Row 13: the pane renders this beside the More control.
            if (gen !== loadGeneration) return null;
            return {
                success: false,
                message: `More palettes could not load: ${failureOf(e, "backend unreachable")}`,
            };
        } finally {
            if (gen === loadGeneration) loadingMore.value = false;
        }
    }

    function onSortChange(value: string) {
        if (!value) return;
        sortMode.value = value as typeof sortMode.value;
        loadRemotePalettes(true);
    }

    function onSaveRemote(palette: Palette) {
        addPublishedPalette(palette);
    }

    async function onVote(palette: Palette): Promise<BrowseVerdict> {
        try {
            await session.ensureSession();
            const result = await votePalette(palette.slug);
            const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            const existing = remotePalettes.value[idx];
            if (idx !== -1 && existing) {
                remotePalettes.value[idx] = {
                    ...existing,
                    voted: result.voted,
                    voteCount: result.voteCount,
                };
            }
            return { success: true, message: result.voted ? "Voted" : "Vote removed" };
        } catch (e) {
            // Row 14.
            return { success: false, message: `Vote failed: ${failureOf(e, "backend unreachable")}` };
        }
    }

    async function onDeleteOwned(palette: Palette): Promise<BrowseVerdict> {
        try {
            await session.ensureSession();
            await deletePaletteUser(palette.slug);
            remotePalettes.value = remotePalettes.value.filter((p) => p.slug !== palette.slug);
            return { success: true, message: "Deleted" };
        } catch (e) {
            // Row 15.
            return { success: false, message: `Delete failed: ${failureOf(e, "backend unreachable")}` };
        }
    }

    async function onRename(palette: Palette, newName: string): Promise<BrowseVerdict> {
        try {
            await session.ensureSession();
            // K.W2: PATCH REQUIRES If-Match — derive the validator from the
            // palette we already hold (currentHash, else updatedAt).
            const updated = await renamePalette(
                palette.slug,
                newName,
                paletteETag(palette),
            );
            const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            const existing = remotePalettes.value[idx];
            if (idx !== -1 && existing) {
                remotePalettes.value[idx] = {
                    ...existing,
                    name: updated.name,
                };
            }
            return { success: true, message: "Renamed" };
        } catch (e) {
            // Row 16.
            return { success: false, message: `Rename failed: ${failureOf(e, "backend unreachable")}` };
        }
    }

    /**
     * Q1 (F-4) visibility flip — the data seam the card-menu visibility control
     * (Lane A) binds to. `publish` → public, `unpublish` → private, both
     * If-Match-guarded from the palette we already hold (no extra read). Updates
     * the browse row in place so the badge/menu reflects the new state; returns
     * a feedback verdict for the card surface (mirrors `onDeleteOwned`).
     */
    async function onSetVisibility(
        palette: Palette,
        target: "public" | "private",
    ): Promise<BrowseVerdict> {
        try {
            await session.ensureSession();
            const etag = paletteETag(palette);
            const updated =
                target === "public"
                    ? await publishPalette(palette.slug, etag)
                    : await unpublishPalette(palette.slug, etag);
            const idx = remotePalettes.value.findIndex((p) => p.slug === palette.slug);
            const existing = remotePalettes.value[idx];
            if (idx !== -1 && existing) {
                // Guarded patch — `exactOptionalPropertyTypes` forbids writing an
                // explicit `undefined` onto an optional field; only carry the
                // keys the response actually resolved.
                const patch: Partial<Palette> = { updatedAt: updated.updatedAt };
                if (updated.visibility !== undefined) patch.visibility = updated.visibility;
                if (updated.published !== undefined) patch.published = updated.published;
                if (updated.currentHash !== undefined) patch.currentHash = updated.currentHash;
                remotePalettes.value[idx] = { ...existing, ...patch };
            }
            return {
                success: true,
                message: target === "public" ? "Published" : "Made private",
            };
        } catch (e) {
            // Row 17.
            const act = target === "public" ? "Publish" : "Unpublish";
            return { success: false, message: `${act} failed: ${failureOf(e, "backend unreachable")}` };
        }
    }

    return {
        remotePalettes,
        browsing,
        sortLoading,
        loadingMore,
        sortMode,
        browseError,
        tierFilter,
        selectedTags,
        nextCursor,
        hasMore,
        filteredBrowse,
        loadRemotePalettes,
        loadMoreRemotePalettes,
        onSortChange,
        onSaveRemote,
        onDeleteOwned,
        onVote,
        onRename,
        onSetVisibility,
    };
}
