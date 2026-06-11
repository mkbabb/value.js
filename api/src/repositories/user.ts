/**
 * UserRepository — owns query/write ops for the `users` collection.
 *
 * User `_id` is the slug (string). The `aggregateUsersWithPaletteCount`
 * method backs the admin users-list view (palettes joined via $lookup).
 */

import type { ClientSession, Collection, Filter } from "mongodb";
import type { User, UserStatus } from "../models.js";
import { asUserSlug } from "../models.js";

/**
 * Shape of one row emitted by `aggregateUsersWithPaletteCount`'s `$project`
 * stage. The pipeline renames `_id` → `slug` and computes `paletteCount` via a
 * `$lookup` + `$size`, so the row no longer carries the raw `User` `_id`; this
 * interface is the typed boundary the service consumes directly (no field-wise
 * re-assertion). `lastSeenAt`/`status` are `$project`-projected straight from
 * the `User` document, so they keep that document's optionality.
 */
export interface UserWithPaletteCount {
    slug: string;
    createdAt: Date;
    lastSeenAt?: Date | undefined;
    status?: UserStatus | undefined;
    paletteCount: number;
}

export class UserRepository {
    constructor(private readonly col: Collection<User>) {}

    findBySlug(slug: string, session?: ClientSession): Promise<User | null> {
        return this.col.findOne(
            { _id: asUserSlug(slug) },
            session ? { session } : undefined,
        );
    }

    async insert(user: User, session?: ClientSession): Promise<void> {
        await this.col.insertOne(user, session ? { session } : undefined);
    }

    setStatus(
        slug: string,
        status: UserStatus,
        session?: ClientSession,
    ): Promise<void> {
        return this.col
            .updateOne(
                { _id: asUserSlug(slug) },
                { $set: { status } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    setStatusForSlugs(
        slugs: string[],
        status: UserStatus,
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .updateMany(
                { _id: { $in: slugs.map(asUserSlug) } },
                { $set: { status } },
                session ? { session } : undefined,
            )
            .then((r) => r.modifiedCount);
    }

    touchLastSeen(
        slug: string,
        when: Date,
        session?: ClientSession,
    ): Promise<void> {
        return this.col
            .updateOne(
                { _id: asUserSlug(slug) },
                { $set: { lastSeenAt: when } },
                session ? { session } : undefined,
            )
            .then(() => undefined);
    }

    delete(slug: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteOne({ _id: asUserSlug(slug) }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    deleteMany(slugs: string[], session?: ClientSession): Promise<number> {
        return this.col
            .deleteMany(
                { _id: { $in: slugs.map(asUserSlug) } },
                session ? { session } : undefined,
            )
            .then((r) => r.deletedCount);
    }

    /**
     * Admin users-list aggregation: paginate users + join palette count.
     * Returns the raw pipeline output; the service layer formats.
     */
    aggregateUsersWithPaletteCount(
        match: Filter<User>,
        skip: number,
        limit: number,
    ): Promise<UserWithPaletteCount[]> {
        return this.col
            .aggregate<UserWithPaletteCount>([
                { $match: match },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: "palettes",
                        localField: "_id",
                        foreignField: "userSlug",
                        as: "palettes",
                    },
                },
                {
                    $project: {
                        slug: "$_id",
                        createdAt: 1,
                        lastSeenAt: 1,
                        status: 1,
                        paletteCount: { $size: "$palettes" },
                    },
                },
            ])
            .toArray();
    }

    countByFilter(filter: Filter<User>): Promise<number> {
        return this.col.countDocuments(filter);
    }

    /**
     * Find users with zero palettes (prune-empty admin op). Returns slugs only.
     */
    async findEmptyUserSlugs(): Promise<string[]> {
        // The `$project: { _id: 1 }` stage emits only the user `_id`, which is
        // the slug (`User._id: UserSlug`). Type the pipeline output explicitly
        // so the slug flows through without a per-row re-assertion.
        const rows = await this.col
            .aggregate<Pick<User, "_id">>([
                {
                    $lookup: {
                        from: "palettes",
                        localField: "_id",
                        foreignField: "userSlug",
                        as: "palettes",
                    },
                },
                { $match: { palettes: { $size: 0 } } },
                { $project: { _id: 1 } },
            ])
            .toArray();
        return rows.map((row) => row._id);
    }
}
