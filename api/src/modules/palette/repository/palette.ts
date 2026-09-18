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
    UpdateResult,
    WithId,
    WithoutId,
} from "mongodb";
import type { Palette } from "../model.js";
import { paletteETagFilter, type PaletteETagSource } from "../etag.js";
import { paletteReadableFilter } from "../service/visibility.js";

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

    /**
     * X-W3 · G-13 — the live children of `slug` THIS VIEWER MAY READ.
     *
     * The filter is `{forkOf, deletedAt: null}` ∧ `paletteReadableFilter(viewer)`:
     * the liveness axis this listing has always carried, composed with the
     * policy's OWN query spelling. The clause is imported, never re-derived —
     * a second spelling of "who may see this row" is the drift the policy
     * kernel exists to close, and it is how an unfiltered `find({forkOf})`
     * came to disclose every private child to an anonymous caller.
     */
    findForksOf(
        slug: string,
        skip: number,
        limit: number,
        viewer: string | null | undefined,
    ): Promise<WithId<Palette>[]> {
        return this.col
            .find({ forkOf: slug, deletedAt: null, ...paletteReadableFilter(viewer) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    /**
     * The count of the SAME filtered join `findForksOf` pages over, so a
     * response's `total` can never exceed what its rows are allowed to show.
     */
    countForksOf(
        slug: string,
        viewer: string | null | undefined,
        session?: ClientSession,
    ): Promise<number> {
        return this.col.countDocuments(
            { forkOf: slug, deletedAt: null, ...paletteReadableFilter(viewer) },
            session ? { session } : undefined,
        );
    }

    /**
     * X-W3 · G-14 — the same viewer-filtered count for MANY parents in one
     * round trip, keyed by parent slug. A page of palettes each needs its
     * `forkCount` computed at format time; doing that with one
     * `countForksOf` per row would be an N+1 the browse list cannot afford,
     * and publishing the stored approximation instead is the drift G-14
     * refuses. Parents with zero readable children are simply absent from the
     * map — the caller reads a miss as `0`.
     */
    async countForksOfMany(
        slugs: string[],
        viewer: string | null | undefined,
    ): Promise<Map<string, number>> {
        if (slugs.length === 0) return new Map();
        const rows = await this.col
            .aggregate<{ _id: string; n: number }>([
                {
                    $match: {
                        forkOf: { $in: slugs },
                        deletedAt: null,
                        ...paletteReadableFilter(viewer),
                    },
                },
                { $group: { _id: "$forkOf", n: { $sum: 1 } } },
            ])
            .toArray();
        return new Map(rows.map((r) => [r._id, r.n]));
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

    /**
     * Update one palette by slug, OPTIONALLY fenced against the state the
     * caller read (X-W3 · G-8).
     *
     * The driver's `UpdateResult` is RETURNED, not discarded: `matchedCount`
     * is the only honest answer to "did my write land?", and throwing it away
     * (`.then(() => undefined)`) is what made every palette write unable to
     * tell a committed update from a lost race.
     *
     * Pass `expect` — the palette document the caller read — to fence the
     * write: `paletteETagFilter` turns that read into a filter clause, so the
     * update applies only while the document still carries the ETag the caller
     * validated `If-Match` against, and `matchedCount === 0` means another
     * writer won. Callers map that zero to `412` with `assertFenceHeld`
     * (`../etag.js`), beside the `assertIfMatch` it completes.
     *
     * The guard is a filter clause rather than a repository throw because that
     * is this codebase's existing CAS shape (`color/repository/proposedName.ts:73-79`
     * guards `{_id, status: from}` and returns the result); HTTP semantics stay
     * in the domain/HTTP layer, and the repository stays free of `ApiError`.
     *
     * `expect` is the FOURTH parameter, after `session`, so the three product
     * call sites — `service/crud.ts:224` (PATCH), `service/versions.ts:215`
     * (revert), `service/visibility.ts:174` (publish) — keep compiling
     * unchanged while they are outside X.W3.3's writable set; wiring them is
     * `ESC-W3.3-CAS-CALLERS`, and until it is ruled those three writes remain
     * unfenced (the gate reads RED, not green-by-apparatus).
     */
    update(
        slug: string,
        update: UpdateFilter<Palette>,
        session?: ClientSession,
        expect?: PaletteETagSource,
    ): Promise<UpdateResult<Palette>> {
        const filter: Filter<Palette> =
            expect === undefined ? { slug } : { slug, ...paletteETagFilter(expect) };
        return this.col.updateOne(filter, update, session ? { session } : undefined);
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
     * Set the STORED, approximate `forkCount` to an absolute value — used by
     * the restore path to recompute it rather than blind-bumping.
     *
     * X-W3 · G-14: the stored field is no longer an authority. It is the
     * `most-forked` sort key and nothing else (`service/crud-list.ts:
     * sortSpecFor`); what a response PUBLISHES as `forkCount` is the
     * viewer-filtered count computed at format time. Recomputing it here from
     * the unfiltered live-child count is therefore still right for its one
     * remaining job — a ranking must not vary by who is looking.
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
