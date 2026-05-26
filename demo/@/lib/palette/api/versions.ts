/**
 * Palette history endpoints — versions, forks, provenance.
 *
 * Three cohering history concerns:
 *   - **Versions**: list/get/revert immutable version records
 *   - **Forks**: fork a palette into a new lineage + list direct forks
 *   - **Provenance**: walk the ancestry DAG via `ProvenanceNode[]`
 *
 * H.W3 Lane A — extracted from `api.ts §VERSIONING` + `§FORKING / PROVENANCE`.
 */

import type {
    Palette,
    PaletteVersion,
    ProvenanceNode,
    PaginatedResponse,
} from "../types";

import { request } from "./client";

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

export function getVersion(slug: string, hash: string): Promise<PaletteVersion> {
    return request(
        `/palettes/${encodeURIComponent(slug)}/versions/${encodeURIComponent(hash)}`,
    );
}

export function revertPalette(slug: string, hash: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}/revert`, {
        method: "POST",
        body: JSON.stringify({ hash }),
    });
}

// ---- Forks + provenance -----------------------------------------------------

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

export function listForks(
    slug: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<Palette>> {
    return request(
        `/palettes/${encodeURIComponent(slug)}/forks?limit=${limit}&offset=${offset}`,
    );
}

export function getProvenance(slug: string): Promise<ProvenanceNode[]> {
    return request(`/palettes/${encodeURIComponent(slug)}/provenance`);
}
