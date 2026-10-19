/**
 * X.W12U.s2 · UIA-V-38 — the revert and fork requests carry the headers the API
 * requires. `POST /:slug/revert` is If-Match-guarded (`assertIfMatch`: 428 when
 * absent, 412 when stale) and both it and the fork-create sit in the API's
 * idempotency-required table (`api/src/platform/http/idempotency.ts`), so a
 * request without a key is refused before routing.
 *
 * The transport runs real; only `fetch` is stubbed, and it enforces both
 * requirements the way the API does.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { useVersionHistory } from "../../palettes/useVersionHistory";
import type { Palette } from "../../palettes/types";

const HELD: Palette = {
    name: "Held",
    slug: "held",
    colors: [{ css: "#123456", position: 0 }],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
    isLocal: false,
    userSlug: "me",
    visibility: "public",
    currentHash: "h-2",
};

function stubApi() {
    const seen: Headers[] = [];
    vi.stubGlobal(
        "fetch",
        vi.fn(async (_url: string, init: RequestInit) => {
            const h = new Headers(init.headers);
            seen.push(h);
            if (!h.get("Idempotency-Key")) {
                return new Response('{"error":"Idempotency-Key required"}', { status: 428 });
            }
            if (init.body && String(init.body).includes('"hash"') && h.get("If-Match") !== '"h-2"') {
                return new Response('{"error":"If-Match required"}', { status: 428 });
            }
            return new Response(JSON.stringify(HELD), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            });
        }),
    );
    return seen;
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("revert and fork carry the API's required headers", () => {
    it("revert sends the held palette's ETag as If-Match and a fresh Idempotency-Key", async () => {
        const seen = stubApi();
        const { revert } = useVersionHistory();
        const a = await revert(HELD, "held-v0");
        const b = await revert(HELD, "held-v0");
        expect(a.ok).toBe(true);
        expect(b.ok).toBe(true);
        expect(seen[0]!.get("If-Match")).toBe('"h-2"');
        expect(seen[0]!.get("Idempotency-Key")).toBeTruthy();
        expect(seen[1]!.get("Idempotency-Key")).not.toBe(seen[0]!.get("Idempotency-Key"));
    });

    it("fork sends an Idempotency-Key", async () => {
        const seen = stubApi();
        const { fork } = useVersionHistory();
        const r = await fork("held", "Remix");
        expect(r.ok).toBe(true);
        expect(seen[0]!.get("Idempotency-Key")).toBeTruthy();
    });
});
