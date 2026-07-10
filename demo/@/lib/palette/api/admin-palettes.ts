/**
 * Admin palette moderation endpoints.
 *
 * Two cohering admin concerns over the palette corpus:
 *   - **Feature/delete**: single-palette moderation actions
 *   - **Flagged**: triage the flag queue + dismiss flags
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — PALETTES` +
 * `§ADMIN — BATCH ACTIONS` (palette half) + `§ADMIN — FLAGGED PALETTES`.
 * W5-13 · F-5: `batchPaletteAction` deleted — a wired wrapper with zero UI
 * consumers (nothing ever fed it batch calls; its would-be toolbar consumer
 * was itself excised at T.W0-3).
 */

import type { FlaggedPalette, PaginatedResponse } from "../types";

import { adminRequest } from "./client";

// ---- Single-palette moderation ---------------------------------------------

export function featurePalette(
    token: string,
    slug: string,
): Promise<{ slug: string; tier: string }> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}/feature`, token, {
        method: "POST",
    });
}

export function deletePaletteAdmin(token: string, slug: string): Promise<void> {
    return adminRequest(`/admin/palettes/${encodeURIComponent(slug)}`, token, {
        method: "DELETE",
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
