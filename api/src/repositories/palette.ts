/**
 * PaletteRepository — owns ALL query/projection/write ops for the
 * `palettes` collection (D.W2 Lane C #2).
 *
 * Constructor-DI: the repository is passed its typed `Collection<Palette>`
 * handle by `middleware/inject-services.ts`. Routes never touch
 * `db.collection("palettes")` directly.
 *
 * Methods correspond 1:1 with the use-cases the existing routes expose
 * (palettes.ts + admin.ts). Lanes A + B will rewrite those routes to call
 * these methods.
 */

import type {
    ClientSession,
    Collection,
    Filter,
    Sort,
    UpdateFilter,
    WithId,
    WithoutId,
} from "mongodb";
import type { Palette } from "../models.js";

export class PaletteRepository {
    constructor(private readonly col: Collection<Palette>) {}

    // ---------- reads ----------

    findBySlug(slug: string, session?: ClientSession): Promise<WithId<Palette> | null> {
        return this.col.findOne({ slug }, session ? { session } : undefined);
    }

    /**
     * Cursor-page fetch: pulls `limit + 1` so the caller can detect whether
     * more pages exist (N.W3.D — the sole public-list pagination path; the
     * former offset `findManyByFilter` + `countByFilter` were dropped with the
     * dual-pagination collapse).
     */
    findManyForCursor(
        filter: Filter<Palette>,
        sort: Sort,
        limit: number,
    ): Promise<WithId<Palette>[]> {
        return this.col.find(filter).sort(sort).limit(limit + 1).toArray();
    }

    findByUserSlug(
        userSlug: string,
        skip: number,
        limit: number,
        session?: ClientSession,
    ): Promise<WithId<Palette>[]> {
        // I.W2: the owner's "my palettes" listing filters soft-deleted
        // (deletedAt: null) by default. A future I-wave can expose a
        // "show-deleted" toggle for restore workflows.
        return this.col
            .find({ userSlug, deletedAt: null }, session ? { session } : undefined)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByUserSlug(userSlug: string): Promise<number> {
        return this.col.countDocuments({ userSlug, deletedAt: null });
    }

    findForksOf(slug: string, skip: number, limit: number): Promise<WithId<Palette>[]> {
        return this.col
            .find({ forkOf: slug, deletedAt: null })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countForksOf(slug: string, session?: ClientSession): Promise<number> {
        return this.col.countDocuments(
            { forkOf: slug, deletedAt: null },
            session ? { session } : undefined,
        );
    }

    /** All palette slugs — used by cron to detect orphaned vote rows. */
    listAllSlugs(): Promise<string[]> {
        return this.col.distinct("slug");
    }

    /** I.W2 reaper: soft-deleted palettes whose grace window has expired.
     * Returns the slugs + forkOf so the caller can decrement parent fork-counts
     * (already done at soft-delete; here we just need slug for the cascade). */
    findPastGrace(cutoff: Date): Promise<WithId<Palette>[]> {
        return this.col
            .find({ deletedAt: { $lt: cutoff } })
            .toArray();
    }

    // ---------- writes ----------

    /** Returns the slug of the inserted palette (since slug is unique). */
    async insert(palette: WithoutId<Palette>, session?: ClientSession): Promise<string> {
        await this.col.insertOne(palette, session ? { session } : undefined);
        return palette.slug;
    }

    update(
        slug: string,
        update: UpdateFilter<Palette>,
        session?: ClientSession,
    ): Promise<void> {
        return this.col
            .updateOne({ slug }, update, session ? { session } : undefined)
            .then(() => undefined);
    }

    updateManyBySlugs(
        slugs: string[],
        update: UpdateFilter<Palette>,
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .updateMany(
                { slug: { $in: slugs } },
                update,
                session ? { session } : undefined,
            )
            .then((r) => r.modifiedCount);
    }

    delete(slug: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteOne({ slug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    deleteManyBySlugs(slugs: string[], session?: ClientSession): Promise<number> {
        return this.col
            .deleteMany({ slug: { $in: slugs } }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    deleteManyByUserSlug(userSlug: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteMany({ userSlug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    /** Gated vote-count increment (D.W2 Lane D F3 — only called after a true insert). */
    incrementVoteCount(
        slug: string,
        delta: 1 | -1,
        session?: ClientSession,
    ): Promise<void> {
        return this.col
            .updateOne(
                { slug },
                { $inc: { voteCount: delta } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    /**
     * Atomic vote-count increment that RETURNS the post-increment document
     * (N.W3.B). Folds the `$inc` + the follow-up re-read into one round-trip
     * via `findOneAndUpdate(returnDocument: "after")` — the document-level
     * atomicity the `voteCount` counter needs (no transaction). Returns `null`
     * iff the palette no longer exists (caller maps that to a 404). The
     * `voteCount` it carries is the value AFTER this increment committed.
     */
    findOneAndIncrementVoteCount(
        slug: string,
        delta: 1 | -1,
    ): Promise<WithId<Palette> | null> {
        return this.col.findOneAndUpdate(
            { slug },
            { $inc: { voteCount: delta } },
            { returnDocument: "after" },
        );
    }

    /** Bounded fork-count decrement (only if > 0 — preserves invariant). */
    decrementForkCount(slug: string, session?: ClientSession): Promise<void> {
        return this.col
            .updateOne(
                { slug, forkCount: { $gt: 0 } },
                { $inc: { forkCount: -1 } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    incrementForkCount(slug: string, session?: ClientSession): Promise<void> {
        return this.col
            .updateOne(
                { slug },
                { $inc: { forkCount: 1 } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    /**
     * Set `forkCount` to an absolute value — used by the restore path to
     * recompute the count from `countForksOf` truth rather than blind-bumping.
     * The blind `incrementForkCount` is safe at fork-CREATION (one genuinely
     * new live fork) but NOT on restore: the soft-delete decrement is gated
     * `{forkCount: {$gt: 0}}`, so a delete→restore round-trip that hit the
     * floor would inflate the count by 1. Recomputing closes that drift (N.W3.J).
     */
    setForkCount(
        slug: string,
        count: number,
        session?: ClientSession,
    ): Promise<void> {
        return this.col
            .updateOne(
                { slug },
                { $set: { forkCount: count } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    /**
     * Remove a tag from every palette that carries it (admin tag-delete cascade).
     * Returns the number of palettes touched.
     */
    pullTagFromAll(tag: string, session?: ClientSession): Promise<number> {
        return this.col
            .updateMany(
                { tags: tag },
                { $pull: { tags: tag } },
                session ? { session } : undefined,
            )
            .then((r) => r.modifiedCount);
    }
}
