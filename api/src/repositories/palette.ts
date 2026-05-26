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
    WithoutId,
} from "mongodb";
import type { Palette } from "../models.js";

export class PaletteRepository {
    constructor(private readonly col: Collection<Palette>) {}

    // ---------- reads ----------

    findBySlug(slug: string, session?: ClientSession): Promise<Palette | null> {
        return this.col.findOne({ slug }, session ? { session } : undefined);
    }

    findManyByFilter(
        filter: Filter<Palette>,
        sort: Sort,
        skip: number,
        limit: number,
    ): Promise<Palette[]> {
        return this.col.find(filter).sort(sort).skip(skip).limit(limit).toArray();
    }

    /** Like findManyByFilter but fetches limit+1 so the caller can detect hasMore. */
    findManyForCursor(
        filter: Filter<Palette>,
        sort: Sort,
        limit: number,
    ): Promise<Palette[]> {
        return this.col.find(filter).sort(sort).limit(limit + 1).toArray();
    }

    countByFilter(filter: Filter<Palette>): Promise<number> {
        return this.col.countDocuments(filter);
    }

    findByUserSlug(
        userSlug: string,
        skip: number,
        limit: number,
        session?: ClientSession,
    ): Promise<Palette[]> {
        return this.col
            .find({ userSlug }, session ? { session } : undefined)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByUserSlug(userSlug: string): Promise<number> {
        return this.col.countDocuments({ userSlug });
    }

    findForksOf(slug: string, skip: number, limit: number): Promise<Palette[]> {
        return this.col
            .find({ forkOf: slug })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countForksOf(slug: string): Promise<number> {
        return this.col.countDocuments({ forkOf: slug });
    }

    /** All palette slugs — used by cron to detect orphaned vote rows. */
    listAllSlugs(): Promise<string[]> {
        return this.col.distinct("slug");
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
