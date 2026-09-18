// CHALLENGE-C probe C-1 — `loadingMore` is never reset when a fresh browse load
// supersedes an in-flight cursor continuation.
//
// useBrowsePalettes.ts:112 —  finally { if (gen === loadGeneration) loadingMore.value = false; }
// The generation guard is correct for the APPEND (we must not append a stale
// page) but wrong for the FLAG: the flag is owned solely by this continuation,
// and no other code path ever writes `loadingMore = false`.
//
// Run:
//   npx vitest run --config <scratch>/probe-c.vitest.config.ts

import { describe, it, expect, vi, beforeEach } from "vitest";

const listPalettes = vi.fn();

vi.mock("../../../../../../../demo/palettes/api", () => ({
    listPalettes: (...a: unknown[]) => listPalettes(...a),
    votePalette: vi.fn(),
    renamePalette: vi.fn(),
    deletePaletteUser: vi.fn(),
    publishPalette: vi.fn(),
    unpublishPalette: vi.fn(),
    paletteETag: () => "etag",
}));
vi.mock("../../../../../../../demo/platform/auth/useSession", () => ({
    useSession: () => ({ ensureSession: vi.fn() }),
}));
vi.mock("../../../../../../../demo/palettes/usePaletteStore", () => ({
    usePaletteStore: () => ({ addPublishedPalette: vi.fn() }),
}));

import { ref } from "vue";
import { useBrowsePalettes } from "../../../../../../../demo/palettes/useBrowsePalettes";

function deferred<T>() {
    let resolve!: (v: T) => void;
    const promise = new Promise<T>((r) => (resolve = r));
    return { promise, resolve };
}

const page = (n: number, cursor: string | null) => ({
    data: Array.from({ length: n }, (_, i) => ({ slug: `p${i}`, name: `P${i}` })),
    nextCursor: cursor,
    hasMore: cursor != null,
});

describe("C-1 · loadingMore stuck-true", () => {
    beforeEach(() => listPalettes.mockReset());

    it("stays TRUE forever when a fresh load supersedes the in-flight continuation", async () => {
        // 1. initial page — hasMore true
        listPalettes.mockResolvedValueOnce(page(50, "cursor-1"));
        const b = useBrowsePalettes({ searchQuery: ref("") });
        await b.loadRemotePalettes();
        expect(b.hasMore.value).toBe(true);
        expect(b.loadingMore.value).toBe(false);

        // 2. user clicks "More from the commons" — continuation in flight
        const d = deferred<ReturnType<typeof page>>();
        listPalettes.mockReturnValueOnce(d.promise);
        const more = b.loadMoreRemotePalettes();
        expect(b.loadingMore.value).toBe(true);

        // 3. while it is in flight the user types in the search box / changes
        //    the sort — usePaletteWiring.ts:162 fires loadRemotePalettes(true),
        //    which bumps loadGeneration.
        listPalettes.mockResolvedValueOnce(page(3, null));
        await b.loadRemotePalettes(true);

        // 4. the continuation finally resolves
        d.resolve(page(50, "cursor-2"));
        await more;

        // the append is correctly discarded …
        expect(b.remotePalettes.value.length).toBe(3);
        // … but the flag is stranded:
        expect(b.loadingMore.value).toBe(true); // ← THE DEFECT

        // and load-more is now permanently dead: the guard at :98 rejects it.
        listPalettes.mockResolvedValueOnce(page(10, null));
        await b.loadMoreRemotePalettes();
        expect(listPalettes).toHaveBeenCalledTimes(3); // no 4th call was made
    });

    it("is also stranded when the superseding load is a tier/tag filter change", async () => {
        listPalettes.mockResolvedValueOnce(page(50, "c1"));
        const b = useBrowsePalettes({ searchQuery: ref("") });
        await b.loadRemotePalettes();

        const d = deferred<ReturnType<typeof page>>();
        listPalettes.mockReturnValueOnce(d.promise);
        const more = b.loadMoreRemotePalettes();

        listPalettes.mockResolvedValueOnce(page(1, null));
        b.onSortChange("popular"); // useDialogBrowseActions does the same via loadRemotePalettes(true)
        await Promise.resolve();
        await Promise.resolve();

        d.resolve(page(50, "c2"));
        await more;
        expect(b.loadingMore.value).toBe(true); // ← stranded again
    });

    it("C-2 · a failed load-more is silent: no browseError, no flag, no retry surface", async () => {
        listPalettes.mockResolvedValueOnce(page(50, "c1"));
        const b = useBrowsePalettes({ searchQuery: ref("") });
        await b.loadRemotePalettes();

        listPalettes.mockRejectedValueOnce(new Error("500 upstream"));
        await b.loadMoreRemotePalettes();

        expect(b.browseError.value).toBe(null); // nothing to render
        expect(b.remotePalettes.value.length).toBe(50); // wall unchanged
        expect(b.hasMore.value).toBe(true); // button still there, no message
    });

    it("C-3 · a failed RELOAD keeps the stale wall and hides the error", async () => {
        listPalettes.mockResolvedValueOnce(page(50, "c1"));
        const b = useBrowsePalettes({ searchQuery: ref("") });
        await b.loadRemotePalettes();

        listPalettes.mockRejectedValueOnce(new Error("network down"));
        await b.loadRemotePalettes(true); // the debounced search reload

        expect(b.browseError.value).toBe("Failed to load palettes");
        // BrowsePane.vue:62 gates the error plate on `displayedBrowse.length === 0`
        expect(b.filteredBrowse.value.length).toBe(50); // → the error plate NEVER renders
    });
});
