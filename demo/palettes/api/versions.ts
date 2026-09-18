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

export function revertPalette(slug: string, hash: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
        method: "POST",
        body: JSON.stringify({ hash }),
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
    });
}
