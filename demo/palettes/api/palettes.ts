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
    CursorPaginatedResponse,
} from "../types";

import { request, type RequestOptions } from "../../platform/transport/client";
import { ApiProblem, toApiProblem } from "../../platform/transport/api-problem";
import {
    clearServiceProblem,
    reportServiceProblem,
} from "../../platform/transport/useApiClient";

/**
 * X.W11.api (COHESION §0eh limb (a)) — every palette request goes through
 * here, so a failure is never silent. A caught error is classified into the
 * one typed problem (`toApiProblem`); a SERVICE failure (network/TLS, 5xx, a
 * malformed body) is reported to the transport seam, which raises the glass
 * toast, and the typed problem is what the caller receives. A 4xx is the
 * service answering — its surface owns that verdict, so it is not toasted. An
 * error that is not a transport failure is rethrown as itself. A success
 * clears the reported failure: the service is serving again.
 *
 * `isShape`, when given, is the body's shape check: a 200 whose body is not
 * the shape asked for is a malformed answer, never an empty one.
 */
async function palettesRequest<T>(
    path: string,
    init?: RequestOptions,
    isShape?: (body: unknown) => body is T,
): Promise<T> {
    try {
        const body = await request<unknown>(path, init);
        if (isShape && !isShape(body)) {
            throw ApiProblem.malformed(`${path.split("?")[0]} did not return the palette list.`);
        }
        clearServiceProblem();
        return body as T;
    } catch (error) {
        const problem = toApiProblem(error);
        if (problem === null) throw error;
        if (problem.isServiceFailure) reportServiceProblem(problem);
        throw problem;
    }
}

/** The `GET /palettes` page shape: a `data` array (cursor fields optional). */
function isPalettePage(body: unknown): body is CursorPaginatedResponse<Palette> {
    return (
        typeof body === "object" &&
        body !== null &&
        Array.isArray((body as { data?: unknown }).data)
    );
}

export interface ListPalettesOptions {
    limit?: number;
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

/**
 * List the public community wall. `GET /palettes` is keyset-cursor-only since
 * N.W3.D — it returns `{ data, nextCursor, hasMore }`. Pass `cursor` (the
 * `nextCursor` of a prior page) to advance; the pre-N.W3.D `offset` param was
 * dead plumbing (the route stopped reading it) and is gone (W5-13 · F-8).
 */
export function listPalettes(
    opts: ListPalettesOptions = {},
): Promise<CursorPaginatedResponse<Palette>> {
    const params = new URLSearchParams();
    if (opts.limit) params.set("limit", String(opts.limit));
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
    return palettesRequest(`/palettes?${params}`, undefined, isPalettePage);
}

export function getPalette(slug: string): Promise<Palette> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}`);
}

/**
 * Create a palette on the server (`POST /palettes`). NOT the visibility verb —
 * the create endpoint mints a fresh `public` palette in one step.
 *
 * W5-13 · F-2: renamed from `publishPalette` to end the naming collision with
 * the real `POST /:slug/publish` visibility-flip verb (now `publishPalette`
 * below). Two same-named-different-meaning "publish" concepts no longer coexist.
 */
export function createAndSavePalette(palette: {
    name: string;
    slug: string;
    colors: PaletteColor[];
    tags?: string[];
}): Promise<Palette> {
    return palettesRequest("/palettes", {
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
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}`, {
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

/**
 * Publish a palette — flip `visibility` to `public` (`POST /:slug/publish`).
 *
 * W5-13 · F-4 (Q1 WIRE): the intention-revealing visibility verb, distinct from
 * `createAndSavePalette` (create). Owner-gated + If-Match-guarded exactly like
 * PATCH: the route runs `assertIfMatch` against the held palette (428 absent /
 * 412 stale), so callers MUST pass the captured ETag — derive it with
 * `paletteETag(palette)`. Idempotent in-place `$set` on the same row; returns
 * the updated palette envelope.
 */
export function publishPalette(slug: string, ifMatch: string): Promise<Palette> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}/publish`, {
        method: "POST",
        ifMatch,
    });
}

/**
 * Unpublish a palette — flip `visibility` to `private` (`POST /:slug/unpublish`).
 * The `unlisted` middle state is untouched (the flip only toggles public
 * membership). Owner-gated + If-Match-guarded; see `publishPalette`.
 */
export function unpublishPalette(slug: string, ifMatch: string): Promise<Palette> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}/unpublish`, {
        method: "POST",
        ifMatch,
    });
}

export function votePalette(
    slug: string,
): Promise<{ voted: boolean; voteCount: number }> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}/vote`, {
        method: "POST",
        idempotencyKey: crypto.randomUUID(),
    });
}

export function deletePaletteUser(slug: string): Promise<{ deleted: boolean }> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}`, { method: "DELETE" });
}

export function flagPalette(
    slug: string,
    reason: string,
    detail?: string,
): Promise<{ flagged: boolean }> {
    return palettesRequest(`/palettes/${encodeURIComponent(slug)}/flag`, {
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
