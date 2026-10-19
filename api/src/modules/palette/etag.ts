/**
 * I.W4 ETag + If-Match helpers (CRUD-CONTRACT v2.0.0 §5).
 *
 * The palette ETag is a strong validator derived from the at-rest
 * `currentHash` (when present — content-hash of name + colors) OR the
 * `updatedAt` timestamp (when currentHash is null, e.g. pre-version
 * palette). Both are stable per-update; both flip every PATCH/restore/
 * vote that bumps `updatedAt`.
 *
 * The ETag is wrapped in double-quotes per RFC 7232.
 *
 * Resources without a meaningful version (lists, derived resources) do
 * NOT carry ETag — only the per-resource GETs (e.g. /palettes/{slug}).
 */

import type { Filter, UpdateResult } from "mongodb";
import type { Palette } from "./model.js";
import {
    PreconditionFailedError,
    PreconditionRequiredError,
} from "../../platform/http/errors/index.js";

/** The fields the palette ETag is derived from — the read a fenced write is
 * fenced against. */
export type PaletteETagSource = Pick<Palette, "currentHash" | "updatedAt">;

/** Compute the strong ETag for a palette doc. */
export function paletteETag(p: PaletteETagSource): string {
    const value = p.currentHash ?? p.updatedAt.toISOString();
    return `"${value}"`;
}

/**
 * X-W3 · G-8 — the ETag as a WRITE PREDICATE.
 *
 * `assertIfMatch` compares the caller's `If-Match` against a doc the route
 * READ; between that read and the service's write any other writer may land
 * (the TOCTOU window `routes/crud.ts:113-123` and `service/ownership.ts:33-37`
 * self-disclosed). Closing it needs the same equality expressed where the
 * write happens: as a filter clause, so the driver decides atomically whether
 * this writer still owns the state it read.
 *
 * The predicate is derived from the SAME two fields `paletteETag` reads, in
 * the same order, so the header a client holds and the clause a write is
 * fenced with can never drift:
 *   - `currentHash` present → the write requires that exact content hash;
 *   - `currentHash` null    → the ETag is the `updatedAt` stamp, so the write
 *     requires both (a hash appearing at all is itself a state change).
 *
 * Known limitation, recorded rather than hidden (`WRITE-CONTRACT.md §4`): a
 * tag-only PATCH leaves `currentHash` unchanged, so two concurrent tag-only
 * writes carry the same ETag and this fence admits both. The ETag's
 * representation coverage is the thing that would have to widen; that is a
 * contract change, not a silent filter change.
 */
export function paletteETagFilter(p: PaletteETagSource): Filter<Palette> {
    return p.currentHash === null || p.currentHash === undefined
        ? { currentHash: null, updatedAt: p.updatedAt }
        : { currentHash: p.currentHash };
}

/**
 * X-W3 · G-8 — read a fenced write's `UpdateResult` and map a lost race to
 * `412`, beside the `assertIfMatch` it completes.
 *
 * A fenced write matches either exactly one document (this writer still owned
 * the state it read) or zero (someone else wrote first, or the row is gone).
 * Zero is NOT "nothing to do": it is precisely the silent overwrite this gate
 * exists to refuse, so it becomes the same `412` a stale `If-Match` produces —
 * the client re-reads and retries against the state that actually won.
 */
export function assertFenceHeld(result: UpdateResult): void {
    if (result.matchedCount !== 1) {
        throw new PreconditionFailedError(
            "The palette changed between the read and this write (fenced update matched no document)",
        );
    }
}

/**
 * Validate an `If-Match` request header against the current resource ETag.
 * Per CRUD-CONTRACT §5: PATCH/PUT REQUIRE If-Match; absence → 428 Precondition
 * Required; mismatch → 412 Precondition Failed.
 *
 * @param ifMatch the raw `If-Match` header value (may include multiple comma-
 *                separated ETags; we accept any one matching)
 * @param current the current ETag value (including surrounding quotes)
 */
export function assertIfMatch(ifMatch: string | undefined, current: string): void {
    if (ifMatch === undefined || ifMatch.trim() === "") {
        throw new PreconditionRequiredError(
            "If-Match header is required for PATCH/PUT (per CRUD-CONTRACT §5)",
        );
    }
    // `*` matches any existing resource (per RFC 7232).
    if (ifMatch.trim() === "*") return;
    const candidates = ifMatch.split(",").map((s) => s.trim());
    if (!candidates.includes(current)) {
        throw new PreconditionFailedError(
            `If-Match (${ifMatch}) did not match current ETag (${current})`,
        );
    }
}
