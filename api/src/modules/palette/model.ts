/**
 * Palette-domain document shapes (T.W1 — carved from `models.ts` per E-1/F4).
 *
 * The palette bounded context spans four collections — `palettes`,
 * `palette_versions`, `votes`, `flags` — plus the embedded value shapes and the
 * visibility/tier/flag-reason enums.
 */

import type { ObjectId } from "mongodb";

// ---------------------------------------------------------------
// Status enums
// ---------------------------------------------------------------

// I.W1 visibility split — CRUD-CONTRACT v2.0.0 §3 binding.
// `visibility` carries WHO-can-see (orthogonal to admin curation);
// `tier` carries WHAT-position-in-curation (orthogonal to visibility).
// The canonical 9-tuple curation state-machine.
export const PALETTE_VISIBILITIES = ["public", "unlisted", "private"] as const;
export type PaletteVisibility = (typeof PALETTE_VISIBILITIES)[number];

export const PALETTE_TIERS = ["standard", "featured", "archived"] as const;
export type PaletteTier = (typeof PALETTE_TIERS)[number];

export const FLAG_REASONS = ["inappropriate", "spam", "copyright", "other"] as const;
export type FlagReason = (typeof FLAG_REASONS)[number];

// ---------------------------------------------------------------
// Embedded value shapes
// ---------------------------------------------------------------

export interface PaletteColor {
    css: string;
    /**
     * Optional human-readable name. `undefined` is accepted alongside absent so
     * zod-parsed inputs (where `.optional()` emits `string | undefined`) flow
     * through without a normalization step.
     */
    name?: string | undefined;
    position: number;
}

export interface OklabTriple {
    L: number;
    a: number;
    b: number;
}

// ---------------------------------------------------------------
// 1. palettes
// ---------------------------------------------------------------

export interface Palette {
    name: string;
    slug: string;
    colors: PaletteColor[];
    oklabColors: OklabTriple[];
    tags: string[];
    voteCount: number;
    userSlug: string | null;
    /** I.W1 canonical visibility (3-state): `public`/`unlisted`/`private`. */
    visibility: PaletteVisibility;
    /** I.W1 canonical curation tier (3-state): `standard`/`featured`/`archived`. */
    tier: PaletteTier;
    /** I.W2 soft-delete timestamp. `null` means live; a Date means
     * soft-deleted-within-grace-window (default 30 days). Reaper cron hard-
     * deletes when (now - deletedAt) > grace. CRUD-CONTRACT v2.0.0 §4. */
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    /** Content-hash of (name, colors) for version dedup. */
    currentHash: string | null;
    /** Slug of the source palette this was forked from, if any. */
    forkOf: string | null;
    forkOfHash: string | null;
    forkCount: number;
    versionCount: number;
}

// ---------------------------------------------------------------
// 2. palette_versions
// ---------------------------------------------------------------

export interface PaletteVersion {
    /** _id is the content-hash. */
    _id: string;
    name: string;
    colors: PaletteColor[];
    /** Hash of immediate parent version (null = root). */
    parentHash: string | null;
    /** Hash of source-palette current-version at fork time (null = not a fork). */
    forkedFromHash: string | null;
    authorSlug: string;
    paletteSlug: string;
    createdAt: Date;
    rootHash: string;
    depth: number;
}

// ---------------------------------------------------------------
// 3. votes
// ---------------------------------------------------------------

export interface Vote {
    userSlug: string;
    paletteSlug: string;
    createdAt: Date;
}

// ---------------------------------------------------------------
// 4. flags
// ---------------------------------------------------------------

export interface Flag {
    _id?: ObjectId;
    paletteSlug: string;
    reporterSlug: string;
    reason: FlagReason;
    detail: string | null;
    createdAt: Date;
}
