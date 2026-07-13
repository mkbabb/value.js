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

import type { Palette } from "./model.js";
import {
    PreconditionFailedError,
    PreconditionRequiredError,
} from "../../platform/http/errors/index.js";

/** Compute the strong ETag for a palette doc. */
export function paletteETag(p: Pick<Palette, "currentHash" | "updatedAt">): string {
    const value = p.currentHash ?? p.updatedAt.toISOString();
    return `"${value}"`;
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
