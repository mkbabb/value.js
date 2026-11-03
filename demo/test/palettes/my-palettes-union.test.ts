/**
 * X·§0hi item 1 (OD-3b) — My Palettes is LOCAL ∪ ACCOUNT.
 *
 * Before: the pane listed `savedPalettes` (localStorage) alone, so a palette the
 * session user owns on the server but never saved in this browser was absent —
 * the owner's account was invisible from their own library. After: the list is
 * the union, deduped by slug with the server row winning, local-only rows kept,
 * and each row's verbs routed by its own `isLocal` discriminant.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";

import type { Palette } from "../../palettes/types";
import { ApiProblem } from "../../platform/transport/api-problem";

const listMyPalettes = vi.fn();
vi.mock("../../palettes/api", async (orig) => ({
    ...(await orig<typeof import("../../palettes/api")>()),
    listMyPalettes: (...args: unknown[]) => listMyPalettes(...args),
}));

const { createOwnedPalettes, mergeMyPalettes, routeMyPaletteVerbs, myPaletteKey } = await import(
    "../../palettes/useOwnedPalettes"
);

const STAMP = "2026-11-03T00:00:00.000Z";
const local = (id: string, slug = id): Palette => ({
    id, name: id, slug, colors: [], isLocal: true, createdAt: STAMP, updatedAt: STAMP,
});
const server = (slug: string, userSlug = "me"): Palette => ({
    name: slug, slug, userSlug, colors: [], isLocal: false, createdAt: STAMP, updatedAt: STAMP,
});
const page = (data: Palette[], total = data.length) => ({ data, total, limit: 100, offset: 0 });
const flush = async () => {
    for (let i = 0; i < 6; i++) await nextTick();
    await new Promise((r) => setTimeout(r, 0));
};

beforeEach(() => listMyPalettes.mockReset());
afterEach(() => vi.restoreAllMocks());

describe("mergeMyPalettes — one list, one source per row", () => {
    it("lists a server palette owned by the user that is not in localStorage", () => {
        const merged = mergeMyPalettes([local("a")], [server("daraksha")]);
        expect(merged.map((p) => p.slug)).toEqual(["a", "daraksha"]);
        expect(merged[1]!.isLocal).toBe(false);
    });

    it("dedupes a palette present in both, the server row winning", () => {
        const merged = mergeMyPalettes([local("x", "daraksha"), local("b")], [server("daraksha")]);
        expect(merged.map((p) => p.slug)).toEqual(["b", "daraksha"]);
        expect(merged.find((p) => p.slug === "daraksha")!.isLocal).toBe(false);
    });

    it("keeps local-only rows, in store order, ahead of account rows", () => {
        const merged = mergeMyPalettes([local("c"), local("a"), local("b")], []);
        expect(merged.map((p) => p.id)).toEqual(["c", "a", "b"]);
    });

    it("keys local rows by id and account rows by slug, never colliding", () => {
        expect(myPaletteKey(local("a"))).toBe("a");
        expect(myPaletteKey(server("a"))).toBe("srv:a");
    });
});

describe("createOwnedPalettes — the session user's account shelf", () => {
    it("is idle and fetches nothing when there is no user slug", async () => {
        const owned = createOwnedPalettes({ userSlug: ref(null) });
        await flush();
        expect(listMyPalettes).not.toHaveBeenCalled();
        expect(owned.status.value).toBe("idle");
        expect(owned.ownedPalettes.value).toEqual([]);
    });

    it("loads every page for the user's slug", async () => {
        listMyPalettes
            .mockResolvedValueOnce({ ...page([server("p1")], 2), limit: 1 })
            .mockResolvedValueOnce({ ...page([server("p2")], 2), limit: 1, offset: 1 });
        const owned = createOwnedPalettes({ userSlug: ref("me"), pageSize: 1 });
        await flush();
        expect(owned.status.value).toBe("ready");
        expect(owned.ownedPalettes.value.map((p) => p.slug)).toEqual(["p1", "p2"]);
    });

    it("re-fetches on a slug change and drops a stale response", async () => {
        let resolveOld!: (v: unknown) => void;
        listMyPalettes
            .mockImplementationOnce(() => new Promise((r) => (resolveOld = r)))
            .mockResolvedValueOnce(page([server("theirs", "you")]));
        const slug = ref<string | null>("me");
        const owned = createOwnedPalettes({ userSlug: slug });
        await flush();
        slug.value = "you";
        await flush();
        resolveOld(page([server("mine")]));
        await flush();
        expect(owned.ownedPalettes.value.map((p) => p.slug)).toEqual(["theirs"]);
    });

    it("a 401 resolves to idle with no rows, never an error", async () => {
        listMyPalettes.mockRejectedValueOnce(new ApiProblem("urn:contract:session-invalid", "Unauthorized", 401));
        const owned = createOwnedPalettes({ userSlug: ref("me") });
        await flush();
        expect(owned.status.value).toBe("idle");
        expect(owned.error.value).toBeNull();
    });

    it("a 5xx is an error with the problem's title, and refresh recovers", async () => {
        listMyPalettes
            .mockRejectedValueOnce(new ApiProblem("about:blank", "Service exploded", 503))
            .mockResolvedValueOnce(page([server("back")]));
        const owned = createOwnedPalettes({ userSlug: ref("me") });
        await flush();
        expect(owned.status.value).toBe("error");
        expect(owned.error.value).toBe("Service exploded");
        await owned.refresh();
        expect(owned.status.value).toBe("ready");
        expect(owned.ownedPalettes.value.map((p) => p.slug)).toEqual(["back"]);
    });
});

describe("routeMyPaletteVerbs — each row's verbs go to its own source", () => {
    function harness() {
        const localVerbs = {
            onDelete: vi.fn(),
            onRenameSaved: vi.fn(),
            onPublish: vi.fn(async () => ({ success: true, message: "Published!" })),
        };
        const accountVerbs = {
            onDeleteOwned: vi.fn(async () => ({ success: true, message: "Deleted" })),
            onRename: vi.fn(async () => ({ success: true, message: "Renamed" })),
            onSetVisibility: vi.fn(async () => ({ success: true, message: "Made private" })),
        };
        const refresh = vi.fn(async () => {});
        return { localVerbs, accountVerbs, refresh, verbs: routeMyPaletteVerbs({ local: localVerbs, account: accountVerbs, refresh }) };
    }

    it("an account-row delete goes to the API and never to the local store", async () => {
        const h = harness();
        const verdict = await h.verbs.onDelete(server("daraksha"));
        expect(h.accountVerbs.onDeleteOwned).toHaveBeenCalledOnce();
        expect(h.localVerbs.onDelete).not.toHaveBeenCalled();
        expect(h.refresh).toHaveBeenCalledOnce();
        expect(verdict).toEqual({ success: true, message: "Deleted" });
    });

    it("a local-row delete goes to the store and never to the API", async () => {
        const h = harness();
        await h.verbs.onDelete(local("a"));
        expect(h.localVerbs.onDelete).toHaveBeenCalledOnce();
        expect(h.accountVerbs.onDeleteOwned).not.toHaveBeenCalled();
    });

    it("renames route by isLocal", async () => {
        const h = harness();
        await h.verbs.onRename(local("a"), "A");
        await h.verbs.onRename(server("s"), "S");
        expect(h.localVerbs.onRenameSaved).toHaveBeenCalledWith(expect.objectContaining({ id: "a" }), "A");
        expect(h.accountVerbs.onRename).toHaveBeenCalledWith(expect.objectContaining({ slug: "s" }), "S");
    });

    it("a successful publish re-reads the account shelf, so the slug twin dedupes", async () => {
        const h = harness();
        await h.verbs.onPublish(local("a"));
        expect(h.refresh).toHaveBeenCalledOnce();
    });

    it("a failed account write does not re-read", async () => {
        const h = harness();
        h.accountVerbs.onDeleteOwned.mockResolvedValueOnce({ success: false, message: "Delete failed: x" });
        const verdict = await h.verbs.onDelete(server("s"));
        expect(verdict?.success).toBe(false);
        expect(h.refresh).not.toHaveBeenCalled();
    });
});
