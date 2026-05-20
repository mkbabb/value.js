/**
 * UserRepository — owns query/write ops for the `users` collection.
 *
 * User `_id` is the slug (string). The `aggregateUsersWithPaletteCount`
 * method backs the admin users-list view (palettes joined via $lookup).
 */

import type { ClientSession, Collection, Document, Filter } from "mongodb";
import type { User, UserStatus } from "../models.js";

export class UserRepository {
    constructor(private readonly col: Collection<User>) {}

    findBySlug(slug: string, session?: ClientSession): Promise<User | null> {
        return this.col.findOne({ _id: slug }, session ? { session } : undefined);
    }

    async insert(user: User): Promise<void> {
        await this.col.insertOne(user);
    }

    setStatus(slug: string, status: UserStatus): Promise<void> {
        return this.col
            .updateOne({ _id: slug }, { $set: { status } })
            .then(() => undefined);
    }

    setStatusForSlugs(slugs: string[], status: UserStatus): Promise<number> {
        return this.col
            .updateMany({ _id: { $in: slugs } }, { $set: { status } })
            .then((r) => r.modifiedCount);
    }

    touchLastSeen(slug: string, when: Date): Promise<void> {
        return this.col
            .updateOne({ _id: slug }, { $set: { lastSeenAt: when } })
            .then(() => undefined);
    }

    delete(slug: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteOne({ _id: slug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    deleteMany(slugs: string[]): Promise<number> {
        return this.col.deleteMany({ _id: { $in: slugs } }).then((r) => r.deletedCount);
    }

    /**
     * Admin users-list aggregation: paginate users + join palette count.
     * Returns the raw pipeline output; the service layer formats.
     */
    aggregateUsersWithPaletteCount(
        match: Filter<User>,
        skip: number,
        limit: number,
    ): Promise<Document[]> {
        return this.col
            .aggregate([
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
        const rows = await this.col
            .aggregate([
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
        return rows.map((row) => row._id as string);
    }
}
