/**
 * Admin palette moderation endpoints.
 *
 * Three cohering admin concerns over the palette corpus:
 *   - **Feature/delete**: single-palette moderation actions
 *   - **Batch**: multi-palette delete/feature/unfeature
 *   - **Flagged**: triage the flag queue + dismiss flags
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — PALETTES` +
 * `§ADMIN — BATCH ACTIONS` (palette half) + `§ADMIN — FLAGGED PALETTES`.
 */

import type { FlaggedPalette, PaginatedResponse } from "../types";

import { adminRequest } from "./client";

// ---- Single-palette moderation ---------------------------------------------

export function featurePalette(
    token: string,
    slug: string,
): Promise<{ slug: string; status: string }> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}/feature`, token, {
        method: "POST",
    });
}

export function deletePaletteAdmin(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}`, token, {
        method: "DELETE",
    });
}

// ---- Batch actions ----------------------------------------------------------

export function batchPaletteAction(
    token: string,
    action: "delete" | "feature" | "unfeature",
    slugs: string[],
): Promise<{ processed: number }> {
    return adminRequest("/admin/batch/palettes", token, {
        method: "POST",
        body: JSON.stringify({ action, slugs }),
    });
}

// ---- Flagged-palette moderation --------------------------------------------

export function getFlaggedPalettes(
    token: string,
    limit = 20,
    offset = 0,
): Promise<PaginatedResponse<FlaggedPalette>> {
    return adminRequest(`/admin/flagged?limit=${limit}&offset=${offset}`, token);
}

export function dismissFlags(
    token: string,
    paletteSlug: string,
): Promise<{ dismissed: number }> {
    return adminRequest(`/admin/flags/${encodeURIComponent(paletteSlug)}`, token, {
        method: "DELETE",
    });
}
