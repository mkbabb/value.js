/**
 * User-facing palette CRUD + vote + flag endpoints.
 *
 * The primary palette surface: list/browse, fetch-by-slug, publish, patch,
 * rename, vote, delete, and flag-for-moderation. All operations are
 * session-scoped; admin counterparts live in `./admin-palettes.ts`.
 *
 * H.W3 Lane A — extracted from `api.ts §PALETTES — CRUD` + `§FLAGGING`.
 */

import type {
    Palette,
    PaletteColor,
    PaginatedResponse,
    CursorPaginatedResponse,
} from "../types";

import { request } from "./client";

export interface ListPalettesOptions {
    limit?: number;
    offset?: number;
    cursor?: string;
    sort?: "newest" | "popular" | "most-forked";
    q?: string;
    tier?: string;
    tags?: string[];
    userSlug?: string;
    colorL?: number;
    colorA?: number;
    colorB?: number;
    colorRadius?: number;
}

export function listPalettes(
    opts: ListPalettesOptions = {},
): Promise<PaginatedResponse<Palette> | CursorPaginatedResponse<Palette>> {
    const params = new URLSearchParams();
    if (opts.limit) params.set("limit", String(opts.limit));
    if (opts.offset != null && !opts.cursor) params.set("offset", String(opts.offset));
    if (opts.cursor) params.set("cursor", opts.cursor);
    if (opts.sort) params.set("sort", opts.sort);
    if (opts.q) params.set("q", opts.q);
    if (opts.tier) params.set("tier", opts.tier);
    if (opts.tags?.length) params.set("tags", opts.tags.join(","));
    if (opts.userSlug) params.set("userSlug", opts.userSlug);
    if (opts.colorL != null) params.set("colorL", String(opts.colorL));
    if (opts.colorA != null) params.set("colorA", String(opts.colorA));
    if (opts.colorB != null) params.set("colorB", String(opts.colorB));
    if (opts.colorRadius != null) params.set("colorRadius", String(opts.colorRadius));
    return request(`/palettes?${params}`);
}

export function getMyPalettes(
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<Palette>> {
    return request(`/palettes/mine?limit=${limit}&offset=${offset}`);
}

export function getPalette(slug: string): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`);
}

export function publishPalette(palette: {
    name: string;
    slug: string;
    colors: PaletteColor[];
    tags?: string[];
}): Promise<Palette> {
    return request("/palettes", {
        method: "POST",
        body: JSON.stringify(palette),
        // K.W2: a fresh idempotency key collapses a double-submit (e.g. a
        // network retry) into a single create on the API replay store.
        idempotencyKey: crypto.randomUUID(),
    });
}

/**
 * PATCH a palette. The API REQUIRES `If-Match` on PATCH (428 if absent) per
 * CRUD-CONTRACT v2 §5, so callers MUST pass the captured ETag derived from a
 * prior read — see `paletteETag()`. `ifMatch: "*"` is accepted by the API as
 * a "match any current resource" escape hatch (RFC 7232) when the caller has
 * no captured validator.
 */
export function updatePalette(
    slug: string,
    update: { name?: string; colors?: PaletteColor[]; tags?: string[] },
    ifMatch: string,
): Promise<Palette> {
    return request(`/palettes/${encodeURIComponent(slug)}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        ifMatch,
    });
}

export function renamePalette(
    slug: string,
    name: string,
    ifMatch: string,
): Promise<Palette> {
    return updatePalette(slug, { name }, ifMatch);
}

export function votePalette(
    slug: string,
): Promise<{ voted: boolean; voteCount: number }> {
    return request(`/palettes/${encodeURIComponent(slug)}/vote`, {
        method: "POST",
        idempotencyKey: crypto.randomUUID(),
    });
}

export function deletePaletteUser(slug: string): Promise<{ deleted: boolean }> {
    return request(`/palettes/${encodeURIComponent(slug)}`, { method: "DELETE" });
}

export function flagPalette(
    slug: string,
    reason: string,
    detail?: string,
): Promise<{ flagged: boolean }> {
    return request(`/palettes/${encodeURIComponent(slug)}/flag`, {
        method: "POST",
        body: JSON.stringify({ reason, detail }),
        idempotencyKey: crypto.randomUUID(),
    });
}

/**
 * Derive the strong ETag for a palette from its at-rest fields, mirroring the
 * API's `paletteETag()` (`api/src/middleware/etag.ts`): the `currentHash` when
 * present, else the `updatedAt` ISO timestamp, double-quoted per RFC 7232.
 * Used by PATCH callers to supply the required `If-Match` validator without an
 * extra round-trip when they already hold the palette object.
 */
export function paletteETag(palette: {
    currentHash?: string;
    updatedAt: string;
}): string {
    const value = palette.currentHash ?? palette.updatedAt;
    return `"${value}"`;
}
