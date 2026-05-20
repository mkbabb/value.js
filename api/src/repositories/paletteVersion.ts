/**
 * PaletteVersionRepository — owns all query/write ops for `palette_versions`.
 *
 * Document `_id` is the content-hash; see `models.ts: PaletteVersion`.
 */

import type { Collection, WithoutId } from "mongodb";
import type { PaletteVersion } from "../models.js";

export class PaletteVersionRepository {
    constructor(private readonly col: Collection<PaletteVersion>) {}

    findByHash(hash: string): Promise<PaletteVersion | null> {
        return this.col.findOne({ _id: hash });
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
    async insertIfAbsent(version: WithoutId<PaletteVersion> & { _id: string }): Promise<string> {
        const existing = await this.col.findOne({ _id: version._id });
        if (existing) return version._id;
        await this.col.insertOne(version);
        return version._id;
    }
}
