/**
 * Shared palette response formatter (D.W2 Lane C #8 — D-HARDEN-3 §1 C1
 * extraction; Lane D F1 default-excision).
 *
 * One canonical place to convert a `Palette` document to its API envelope.
 *
 * Pre-migration `??` defaults were excised in Lane D (F1) — the
 * `assertMigrationsApplied` smoke probe at startup (`migrations/check.ts`)
 * verifies the at-rest data carries every field the `Palette` interface
 * declares. The formatter no longer compensates for missing fields; any
 * `undefined` at this point is a schema-invariant violation surfaced by the
 * startup probe, not silently defaulted here.
 */

import type { Palette } from "../models.js";
import { computeAtomSetHash } from "../hash.js";

export interface FormattedPalette {
    name: string;
    slug: string;
    colors: Palette["colors"];
    oklabColors: Palette["oklabColors"];
    tags: string[];
    voteCount: number;
    userSlug: string | null;
    /** I.W1 canonical visibility: `public`/`unlisted`/`private`. */
    visibility: Palette["visibility"];
    /** I.W1 canonical curation tier: `standard`/`featured`/`archived`. */
    tier: Palette["tier"];
    /** I.W2 soft-delete timestamp; null means live. */
    deletedAt: Palette["deletedAt"];
    createdAt: Date;
    updatedAt: Date;
    currentHash: string | null;
    forkOf: string | null;
    forkOfHash: string | null;
    forkCount: number;
    versionCount: number;
    /** J.W1c derived convenience: true ⟺ visibility === "public". NEVER a
     * persisted column — computed read-time from the visibility enum. */
    published: boolean;
    /** J.W2 atom-set-hash — the colors-only, order-independent fingerprint
     * (dedup hint + the `/diff` envelope's hash basis). */
    atomSetHash: string;
    isLocal: false;
    voted?: boolean | undefined;
}

/**
 * Format a palette document for API response.
 *
 * @param doc - the Palette document (with the driver-supplied `_id`)
 * @param votedSlugs - optional set of paletteSlugs the current user has voted on;
 *   when supplied, `voted` is set to true/false; when omitted, `voted` is undefined.
 */
export function formatPalette(
    doc: Palette & { _id: unknown },
    votedSlugs?: Set<string>,
): FormattedPalette {
    const { _id, ...rest } = doc;

    // Lane D F1: every field below is guaranteed-present by the
    // `assertMigrationsApplied` smoke probe at startup. The previous `??`
    // defaults were silent compensation for the in-flight migration window
    // and are no longer needed.
    return {
        name: rest.name,
        slug: rest.slug,
        colors: rest.colors,
        tags: rest.tags,
        versionCount: rest.versionCount,
        forkCount: rest.forkCount,
        forkOf: rest.forkOf,
        forkOfHash: rest.forkOfHash,
        currentHash: rest.currentHash,
        oklabColors: rest.oklabColors,
        voteCount: rest.voteCount,
        userSlug: rest.userSlug,
        visibility: rest.visibility,
        tier: rest.tier,
        deletedAt: rest.deletedAt,
        createdAt: rest.createdAt,
        updatedAt: rest.updatedAt,
        published: rest.visibility === "public",
        atomSetHash: computeAtomSetHash(rest.colors),
        isLocal: false,
        voted: votedSlugs ? votedSlugs.has(rest.slug) : undefined,
    };
}
