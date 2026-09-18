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

import type { WithId } from "mongodb";
import type { Palette } from "./model.js";
import { computeAtomSetHash } from "./hash.js";

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
    /**
     * X-W3 · G-14 — the viewer-filtered count of this palette's live children,
     * computed at format time from the same filtered join the fork list pages
     * over. It is NOT `palettes.forkCount`: that stored counter is maintained
     * by blind `$inc`/`$dec`, counts children the viewer may not see, and is
     * documented APPROXIMATE (`repository/palette.ts`) — it survives only as
     * the `most-forked` sort key. Publishing it here made the envelope disclose
     * the existence of private children the fork list correctly refuses to name.
     */
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
 * The read-time facts the envelope carries that the DOCUMENT does not hold —
 * X-W3 · G-14.
 *
 * `forkCount` is REQUIRED, deliberately and with no default: an optional one
 * would fall back to the stored approximation at every call site that forgot
 * it, which is precisely the gate's defect wearing a nicer signature. Every
 * caller states which viewer's count it is publishing, so the question "whose
 * count is this?" always has an answer at the call site.
 */
export interface FormatPaletteContext {
    /** The viewer-filtered live child count — see `FormattedPalette.forkCount`. */
    forkCount: number;
    /** paletteSlugs the current user has voted on; omitted ⇒ `voted` is undefined. */
    votedSlugs?: Set<string> | undefined;
}

/**
 * Format a palette document for API response.
 *
 * @param doc - the Palette document (with the driver-supplied `_id`) as returned
 *   by the repository read boundary (`WithId<Palette>`).
 * @param ctx - the read-time facts the document does not carry.
 */
export function formatPalette(
    doc: WithId<Palette>,
    ctx: FormatPaletteContext,
): FormattedPalette {
    const { _id, ...rest } = doc;
    const { forkCount, votedSlugs } = ctx;

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
        // X-W3 · G-14: the computed count, never `rest.forkCount`.
        forkCount,
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
