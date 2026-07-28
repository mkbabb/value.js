import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";


vi.mock("/Users/mkbabb/Programming/value.js/demo/palettes/api/index.ts", () => ({
    listPalettes: vi.fn(),
    votePalette: vi.fn(),
    renamePalette: vi.fn(),
    deletePaletteUser: vi.fn(),
    publishPalette: vi.fn(),
    unpublishPalette: vi.fn(),
    paletteETag: () => "etag",
}));
vi.mock("/Users/mkbabb/Programming/value.js/demo/platform/auth/useSession.ts", () => ({
    useSession: () => ({ ensureSession: async () => {} }),
}));
vi.mock("/Users/mkbabb/Programming/value.js/demo/palettes/usePaletteStore.ts", () => ({
    usePaletteStore: () => ({ addPublishedPalette: () => {} }),
}));

const { listPalettes } = await import("/Users/mkbabb/Programming/value.js/demo/palettes/api/index.ts");
const { useBrowsePalettes } = await import("/Users/mkbabb/Programming/value.js/demo/palettes/useBrowsePalettes.ts");

function deferred<T>() {
    let resolve!: (v: T) => void;
    let reject!: (e: unknown) => void;
    const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
}
const page = (n: number, hasMore: boolean, cursor: string | null) => ({
    data: Array.from({ length: n }, (_, i) => ({ slug: `p${cursor}-${i}`, name: `P${i}`, colors: [], createdAt: "", updatedAt: "", isLocal: false })),
    nextCursor: cursor,
    hasMore,
});

describe("C-1 loadingMore permanent stick", () => {
    it("leaves loadingMore=true forever when a fresh load supersedes an in-flight continuation", async () => {
        const searchQuery = ref("");
        const b = useBrowsePalettes({ searchQuery });
        const mock = listPalettes as unknown as ReturnType<typeof vi.fn>;

        // 1. initial load resolves with a full page + cursor
        mock.mockResolvedValueOnce(page(50, true, "c1"));
        await b.loadRemotePalettes();
        expect(b.hasMore.value).toBe(true);
        expect(b.loadingMore.value).toBe(false);

        // 2. user clicks "More from the commons" — continuation IN FLIGHT
        const more = deferred<any>();
        mock.mockReturnValueOnce(more.promise);
        const morePromise = b.loadMoreRemotePalettes();
        expect(b.loadingMore.value).toBe(true);

        // 3. user changes sort (or the 400ms search debounce fires) while it is in flight
        const fresh = deferred<any>();
        mock.mockReturnValueOnce(fresh.promise);
        const freshPromise = b.loadRemotePalettes(true);

        // 4. both settle, fresh last
        more.resolve(page(2, false, null));
        await morePromise;
        fresh.resolve(page(50, true, "c1"));
        await freshPromise;

        console.log("  loadingMore after both settle =", b.loadingMore.value);
        console.log("  hasMore =", b.hasMore.value, " rows =", b.remotePalettes.value.length);

        // THE DEFECT
        expect(b.loadingMore.value).toBe(true);

        // and load-more is dead for the rest of the session
        mock.mockResolvedValueOnce(page(50, true, "c2"));
        await b.loadMoreRemotePalettes();
        expect(b.remotePalettes.value.length).toBe(50); // no append happened
        console.log("  after a further loadMore attempt, rows =", b.remotePalettes.value.length, "(no append: the guard is latched)");
    });
});

beforeEach(() => { (listPalettes as any).mockReset(); });

describe("C-2 failed reload keeps stale rows + hides the error", () => {
    it("browseError is set but the pane's error branch cannot fire", async () => {
        const searchQuery = ref("");
        const b = useBrowsePalettes({ searchQuery });
        const mock = listPalettes as unknown as ReturnType<typeof vi.fn>;

        mock.mockResolvedValueOnce(page(3, false, null));
        await b.loadRemotePalettes();
        expect(b.remotePalettes.value.length).toBe(3);

        // sort change -> server 500
        mock.mockRejectedValueOnce(new Error("500"));
        await b.loadRemotePalettes(true);

        console.log("  browseError =", JSON.stringify(b.browseError.value));
        console.log("  rows still on the wall =", b.remotePalettes.value.length);
        // BrowsePane.vue:62  v-else-if="pm.browseError.value && displayedBrowse.length === 0"
        const errorBranchFires = !!b.browseError.value && b.filteredBrowse.value.length === 0;
        console.log("  BrowsePane error branch fires? ->", errorBranchFires);
        expect(b.browseError.value).toBeTruthy();
        expect(errorBranchFires).toBe(false);
    });
});

describe("C-3 error message discards the machine string", () => {
    it("browseError is a canned constant regardless of the real failure", async () => {
        const searchQuery = ref("");
        const b = useBrowsePalettes({ searchQuery });
        const mock = listPalettes as unknown as ReturnType<typeof vi.fn>;
        mock.mockRejectedValueOnce(new Error("HTTP 503 upstream mongo timeout"));
        await b.loadRemotePalettes();
        console.log("  detail line shown to the user =", JSON.stringify(b.browseError.value));
        expect(b.browseError.value).toBe("Failed to load palettes");
    });
});
