/**
 * VoteRepository — owns all query/write ops for the `votes` collection.
 *
 * The `upsertIdempotent` method is the D.W2 Lane D F3 primitive: it performs
 * an idempotent upsert on the unique `(userSlug, paletteSlug)` index and
 * reports whether the operation was a true insert. The caller (a service)
 * uses that signal to gate the `$inc` on the palette's `voteCount`,
 * preserving atomicity-like semantics under concurrency without requiring
 * a Mongo transaction.
 */

import type { Collection } from "mongodb";
import type { Vote } from "../models.js";

export interface VoteUpsertResult {
    /** True iff a NEW vote document was inserted (not just matched). */
    inserted: boolean;
}

export class VoteRepository {
    constructor(private readonly col: Collection<Vote>) {}

    findOne(userSlug: string, paletteSlug: string): Promise<Vote | null> {
        return this.col.findOne({ userSlug, paletteSlug });
    }

    findByUserAndPaletteSlugs(
        userSlug: string,
        paletteSlugs: string[],
    ): Promise<Vote[]> {
        return this.col
            .find({ userSlug, paletteSlug: { $in: paletteSlugs } })
            .toArray();
    }

    /**
     * Idempotent upsert keyed by `(userSlug, paletteSlug)`. Returns
     * `{ inserted: true }` only when a brand-new document was created.
     */
    async upsertIdempotent(
        userSlug: string,
        paletteSlug: string,
    ): Promise<VoteUpsertResult> {
        const result = await this.col.updateOne(
            { userSlug, paletteSlug },
            {
                $setOnInsert: {
                    userSlug,
                    paletteSlug,
                    createdAt: new Date(),
                },
            },
            { upsert: true },
        );
        return { inserted: result.upsertedCount === 1 };
    }

    /** Returns true iff a vote was found and deleted. */
    async deleteOne(userSlug: string, paletteSlug: string): Promise<boolean> {
        const result = await this.col.deleteOne({ userSlug, paletteSlug });
        return result.deletedCount > 0;
    }

    deleteByPaletteSlug(paletteSlug: string): Promise<number> {
        return this.col.deleteMany({ paletteSlug }).then((r) => r.deletedCount);
    }

    deleteByPaletteSlugs(paletteSlugs: string[]): Promise<number> {
        return this.col
            .deleteMany({ paletteSlug: { $in: paletteSlugs } })
            .then((r) => r.deletedCount);
    }
}
