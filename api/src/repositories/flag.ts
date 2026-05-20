/**
 * FlagRepository — owns query/write ops for the `flags` collection +
 * the flagged-palettes aggregation used by the admin moderation queue.
 */

import type { ClientSession, Collection, Document, WithoutId } from "mongodb";
import type { Flag } from "../models.js";

export class FlagRepository {
    constructor(private readonly col: Collection<Flag>) {}

    async insert(flag: WithoutId<Flag>): Promise<void> {
        await this.col.insertOne(flag as Flag);
    }

    deleteByPaletteSlug(paletteSlug: string): Promise<number> {
        return this.col.deleteMany({ paletteSlug }).then((r) => r.deletedCount);
    }

    deleteByPaletteSlugs(
        paletteSlugs: string[],
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .deleteMany(
                { paletteSlug: { $in: paletteSlugs } },
                session ? { session } : undefined,
            )
            .then((r) => r.deletedCount);
    }

    /**
     * Aggregation: group flags by paletteSlug, join the source palette,
     * paginate. Returns the raw aggregation pipeline output — the service
     * layer formats it.
     */
    aggregateFlaggedPalettes(skip: number, limit: number): Promise<Document[]> {
        return this.col
            .aggregate([
                {
                    $group: {
                        _id: "$paletteSlug",
                        flagCount: { $sum: 1 },
                        flags: {
                            $push: {
                                reporterSlug: "$reporterSlug",
                                reason: "$reason",
                                detail: "$detail",
                                createdAt: "$createdAt",
                            },
                        },
                    },
                },
                { $sort: { flagCount: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: "palettes",
                        localField: "_id",
                        foreignField: "slug",
                        as: "palette",
                    },
                },
                { $unwind: { path: "$palette", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        paletteSlug: "$_id",
                        flagCount: 1,
                        flags: 1,
                        palette: {
                            name: "$palette.name",
                            slug: "$palette.slug",
                            colors: "$palette.colors",
                            userSlug: "$palette.userSlug",
                            status: "$palette.status",
                            createdAt: "$palette.createdAt",
                        },
                    },
                },
            ])
            .toArray();
    }

    async countDistinctPalettes(): Promise<number> {
        const result = await this.col
            .aggregate([{ $group: { _id: "$paletteSlug" } }, { $count: "total" }])
            .toArray();
        return (result[0]?.total as number | undefined) ?? 0;
    }
}
