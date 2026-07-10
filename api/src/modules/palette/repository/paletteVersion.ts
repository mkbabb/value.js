/**
 * PaletteVersionRepository — owns all query/write ops for `palette_versions`.
 *
 * Document `_id` is the content-hash; see `models.ts: PaletteVersion`.
 */

import type { ClientSession, Collection, WithoutId } from "mongodb";
import type { PaletteVersion } from "../model.js";

export class PaletteVersionRepository {
    constructor(private readonly col: Collection<PaletteVersion>) {}

    findByHash(hash: string, session?: ClientSession): Promise<PaletteVersion | null> {
        return this.col.findOne({ _id: hash }, session ? { session } : undefined);
    }

    findByPaletteSlug(
        paletteSlug: string,
        skip: number,
        limit: number,
    ): Promise<PaletteVersion[]> {
        return this.col
            .find({ paletteSlug })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByPaletteSlug(paletteSlug: string): Promise<number> {
        return this.col.countDocuments({ paletteSlug });
    }

    /**
     * Idempotent insert keyed by content-hash. If a document with the same
     * hash already exists, the existing hash is returned (no write happens).
     * Returns the hash either way.
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
