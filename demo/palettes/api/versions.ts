/**
 * Palette history endpoints — versions + forks.
 *
 * Two cohering history concerns:
 *   - **Versions**: list/revert immutable version records
 *   - **Forks**: fork a palette into a new lineage
 *
 * H.W3 Lane A — extracted from `api.ts §VERSIONING` + `§FORKING / PROVENANCE`.
 * W5-13 · F-5: `getVersion`, `listForks`, `getProvenance` deleted — each was a
 * fully-wired wrapper with zero UI consumers (grep-proven). The server routes
 * remain; a future lineage-browser re-adds the wrapper it needs.
 */

import type {
    Palette,
    PaletteVersion,
    PaginatedResponse,
} from "../types";

import { request } from "../../platform/transport/client";

// ---- Versions ---------------------------------------------------------------

export function listVersions(
    slug: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<PaletteVersion>> {
    return request(
        `/palettes/${encodeURIComponent(slug)}/versions?limit=${limit}&offset=${offset}`,
    );
}

/**
 * Revert a palette to one of its releases (`POST /:slug/revert`).
 *
 * X.W12U.s2 · UIA-V-38: the route is If-Match-guarded exactly like PATCH
 * (`assertIfMatch` — 428 absent / 412 stale) and sits in the API's
 * idempotency-required table (`api/src/platform/http/idempotency.ts`), so the
 * caller passes the captured validator (`paletteETag(palette)`) and each revert
 * carries a fresh key.
 */
export function revertPalette(
    slug: string,
    hash: string,
    ifMatch: string,
): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
        method: "POST",
        body: JSON.stringify({ hash }),
        ifMatch,
        idempotencyKey: crypto.randomUUID(),
    });
}

// ---- Forks ------------------------------------------------------------------

export function forkPalette(
    slug: string,
    name?: string,
    forkSlug?: string,
): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/fork`, {
        method: "POST",
        body: JSON.stringify({ name, slug: forkSlug }),
        // The fork-create is in the same idempotency-required table as revert.
        idempotencyKey: crypto.randomUUID(),
    });
}
