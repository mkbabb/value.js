/**
 * PaletteVersionRepository — owns all query/write ops for `palette_versions`.
 *
 * Document `_id` is the RELEASE hash (X-W3 · G-7); the content identity is the
 * `payloadHash` field. See `model.ts: PaletteVersion`.
 */

import type { ClientSession, Collection, WithoutId } from "mongodb";
import type { PaletteVersion } from "../model.js";

export class PaletteVersionRepository {
    constructor(private readonly col: Collection<PaletteVersion>) {}

    /**
     * The bare by-id primitive. Every SERVICE read of a revision goes through
     * `findByPaletteAndHash` instead (X-W3 · G-5/G-6): a revision is addressed
     * by `(paletteSlug, hash)`, never by hash alone, so no content can cross
     * an object boundary.
     */
    findByHash(hash: string, session?: ClientSession): Promise<PaletteVersion | null> {
        return this.col.findOne({ _id: hash }, session ? { session } : undefined);
    }

    /**
     * X-W3 · G-5/G-6 — the joined revision read: `{ _id: hash, paletteSlug }`.
     * A hash that names a row belonging to another palette resolves to `null`
     * here, which the service turns into `404`.
     */
    findByPaletteAndHash(
        paletteSlug: string,
        hash: string,
        session?: ClientSession,
    ): Promise<PaletteVersion | null> {
        return this.col.findOne(
            { _id: hash, paletteSlug },
            session ? { session } : undefined,
        );
    }

    /**
     * The palette's head release — its highest `revisionNo`, `_id` breaking a
     * tie. This is the successor's parent and the source of the next ordinal;
     * resolving it by MEMBERSHIP (not by a hash handed in from outside) is
     * what keeps the version chain unspoofable.
     */
    findHeadByPaletteSlug(
        paletteSlug: string,
        session?: ClientSession,
    ): Promise<PaletteVersion | null> {
        return this.col.findOne(
            { paletteSlug },
            { sort: { revisionNo: -1, _id: -1 }, ...(session ? { session } : {}) },
        );
    }

    findByPaletteSlug(
        paletteSlug: string,
        skip: number,
        limit: number,
    ): Promise<PaletteVersion[]> {
        // X-W3 · fold S-6: `revisionNo` is the total-order key, `_id` the
        // tiebreak. `createdAt` is not injective — two revisions written in
        // the same millisecond ordered arbitrarily, which is what made the
        // client's `v{{ total - i }}` ordinal drift.
        return this.col
            .find({ paletteSlug })
            .sort({ revisionNo: -1, _id: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByPaletteSlug(paletteSlug: string): Promise<number> {
        return this.col.countDocuments({ paletteSlug });
    }

    /**
     * Idempotent insert keyed by the document `_id` (the release hash). A
     * re-entrant write of the SAME release event is a no-op; two distinct
     * releases of the same payload are two rows, which is the point of the
     * X-W3 payload/release split. Returns the `_id` either way.
     */
    async insertIfAbsent(
        version: WithoutId<PaletteVersion> & { _id: string },
        session?: ClientSession,
    ): Promise<string> {
        const existing = await this.col.findOne(
            { _id: version._id },
            session ? { session } : undefined,
        );
        if (existing) return version._id;
        await this.col.insertOne(version, session ? { session } : undefined);
        return version._id;
    }
}
