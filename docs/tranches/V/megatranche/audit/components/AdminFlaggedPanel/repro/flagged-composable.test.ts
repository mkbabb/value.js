import { describe, it, expect, vi } from "vitest";

const api = {
    getFlaggedPalettes: vi.fn(),
    dismissFlags: vi.fn(),
    deletePaletteAdmin: vi.fn(),
    flagPalette: vi.fn(),
};

vi.mock("/Users/mkbabb/Programming/value.js/demo/palettes/api/index.ts", () => api);
vi.mock("/Users/mkbabb/Programming/value.js/demo/platform/auth/useAdminAuth", () => ({
    useAdminAuth: () => ({ getToken: () => "admin-token" }),
}));

const { useAdminFlagged } = await import(
    "/Users/mkbabb/Programming/value.js/demo/palettes/useAdminFlagged"
);

const row = (slug: string) => ({ paletteSlug: slug, palette: null, flagCount: 1, flags: [] });
const defer = <T,>() => {
    let resolve!: (v: T) => void;
    const promise = new Promise<T>((r) => (resolve = r));
    return { promise, resolve };
};

describe("useAdminFlagged — challenge-C reproductions", () => {
    it("C1: out-of-order responses — the STALE page wins (no request sequencing)", async () => {
        const f = useAdminFlagged();
        const a = defer<any>();
        const b = defer<any>();
        api.getFlaggedPalettes.mockReturnValueOnce(a.promise).mockReturnValueOnce(b.promise);

        const p1 = f.loadFlagged(); // page 1 (slow)
        f.page.value = 2;
        const p2 = f.loadFlagged(); // page 2 (fast)

        b.resolve({ data: [row("page2-row")], total: 40 });
        await p2;
        a.resolve({ data: [row("page1-row")], total: 40 });
        await p1;

        console.log(
            "C1 page =", f.page.value,
            "| rendered slug =", f.items.value.map((i) => i.paletteSlug),
            "| loading =", f.loading.value,
        );
        expect(f.page.value).toBe(2);
        expect(f.items.value[0].paletteSlug).toBe("page1-row"); // WRONG page's rows on screen
    });

    it("C2: double-click Next skips a page and leaves two flights in the air", async () => {
        const f = useAdminFlagged();
        api.getFlaggedPalettes.mockResolvedValue({ data: [row("a")], total: 100 });
        await f.loadFlagged();
        api.getFlaggedPalettes.mockClear();
        f.nextPage();
        f.nextPage(); // second click before the first resolves
        const offsets = api.getFlaggedPalettes.mock.calls.map((c) => c[2]);
        console.log("C2 page =", f.page.value, "| offsets requested =", offsets);
        expect(f.page.value).toBe(3);
        expect(offsets).toEqual([20, 40]); // page 2 fetched then immediately superseded
    });

    it("C3: emptying the last page STRANDS the panel — empty list, total>0, pagination bar gone", async () => {
        const f = useAdminFlagged();
        api.getFlaggedPalettes.mockResolvedValue({ data: [row("last")], total: 21 });
        f.page.value = 2;
        await f.loadFlagged();
        api.dismissFlags.mockResolvedValue({ dismissed: 1 });
        await f.dismiss("last");

        const paginationBarRendered = f.pageCount.value > 1; // PaginationBar.vue:3 v-if
        console.log(
            "C3 page =", f.page.value,
            "| items =", f.items.value.length,
            "| total =", f.total.value,
            "| pageCount =", f.pageCount.value,
            "| hasPrev =", f.hasPrev.value,
            "| PaginationBar rendered =", paginationBarRendered,
        );
        expect(f.items.value).toHaveLength(0); // panel shows "No flagged palettes."
        expect(f.total.value).toBe(20); // …while 20 flagged palettes remain
        expect(paginationBarRendered).toBe(false); // and there is NO control to get back
    });

    it("C4: a failed dismiss/delete is silent — no error state, no signal, row stays", async () => {
        const f = useAdminFlagged();
        api.getFlaggedPalettes.mockResolvedValue({ data: [row("a"), row("b")], total: 2 });
        await f.loadFlagged();
        api.dismissFlags.mockRejectedValue(new Error("403 Forbidden"));
        api.deletePaletteAdmin.mockRejectedValue(new Error("500 Internal Server Error"));
        await f.dismiss("a");
        await f.deletePalette("b");
        console.log(
            "C4 after two FAILED moderation actions → loadError =", f.loadError.value,
            "| items =", f.items.value.length,
            "| total =", f.total.value,
        );
        expect(f.loadError.value).toBeNull(); // nothing to render: the failure is invisible
        expect(f.items.value).toHaveLength(2);
    });

    it("C5: no token → no request, no error, and the panel asserts an EMPTY queue", async () => {
        vi.resetModules();
        vi.doMock("/Users/mkbabb/Programming/value.js/demo/platform/auth/useAdminAuth", () => ({
            useAdminAuth: () => ({ getToken: () => null }),
        }));
        const { useAdminFlagged: fresh } = await import(
            "/Users/mkbabb/Programming/value.js/demo/palettes/useAdminFlagged"
        );
        const f = fresh();
        api.getFlaggedPalettes.mockClear();
        await f.loadFlagged();
        console.log(
            "C5 requests =", api.getFlaggedPalettes.mock.calls.length,
            "| loading =", f.loading.value,
            "| loadError =", f.loadError.value,
            "| items =", f.items.value.length,
            "→ template branch =",
            f.loading.value ? "skeletons" : f.loadError.value ? "error" : f.items.value.length === 0 ? '"No flagged palettes."' : "rows",
        );
        expect(api.getFlaggedPalettes).not.toHaveBeenCalled();
        expect(f.loadError.value).toBeNull();
    });

    it("C6: deletePalette drops the row locally, but the server keeps the FLAGS — the row returns on refresh", async () => {
        const f = useAdminFlagged();
        api.getFlaggedPalettes.mockResolvedValue({ data: [row("abuse-1")], total: 1 });
        await f.loadFlagged();
        api.deletePaletteAdmin.mockResolvedValue(undefined);
        await f.deletePalette("abuse-1");
        console.log("C6 after delete → items =", f.items.value.length, "| total =", f.total.value);
        // The server (api/src/modules/admin/service/palettes.ts:53-79) soft-deletes the
        // palette and NEVER touches the flags collection, so the queue is unchanged:
        api.getFlaggedPalettes.mockResolvedValue({ data: [row("abuse-1")], total: 1 });
        await f.loadFlagged();
        console.log("C6 after refresh → items =", f.items.value.length, "| total =", f.total.value);
        expect(f.items.value).toHaveLength(1);
    });
});
