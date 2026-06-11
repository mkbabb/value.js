/**
 * FlagRepository — owns query/write ops for the `flags` collection +
 * the flagged-palettes aggregation used by the admin moderation queue.
 */

import type { ClientSession, Collection, WithoutId } from "mongodb";
import type { Flag, Palette } from "../models.js";

/** One flag report as embedded by the `$group.$push` stage. */
export interface FlaggedReport {
    reporterSlug: string;
    reason: Flag["reason"];
    detail: string | null;
    createdAt: Date;
}

/**
 * Shape of one row emitted by `aggregateFlaggedPalettes`' `$project` stage:
 * flags grouped by `paletteSlug`, with the source palette joined via
 * `$lookup` + `$unwind` (`preserveNullAndEmptyArrays` → `palette` is absent
 * when the slug has no live palette row). The `$project` selects the named
 * `palette.*` subset, so this is the typed boundary the service consumes.
 */
export interface FlaggedPalette {
    paletteSlug: string;
    flagCount: number;
    flags: FlaggedReport[];
    palette?:
        | Pick<
              Palette,
              | "name"
              | "slug"
              | "colors"
              | "userSlug"
              | "visibility"
              | "tier"
              | "createdAt"
          >
        | undefined;
}

export class FlagRepository {
    constructor(private readonly col: Collection<Flag>) {}

    async insert(flag: WithoutId<Flag>): Promise<void> {
        await this.col.insertOne(flag as Flag);
    }

    deleteByPaletteSlug(
        paletteSlug: string,
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .deleteMany({ paletteSlug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
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
    aggregateFlaggedPalettes(skip: number, limit: number): Promise<FlaggedPalette[]> {
        return this.col
            .aggregate<FlaggedPalette>([
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
                            visibility: "$palette.visibility",
                            tier: "$palette.tier",
                            createdAt: "$palette.createdAt",
                        },
                    },
                },
            ])
            .toArray();
    }

    async countDistinctPalettes(): Promise<number> {
        // `$count` emits a single `{ total: number }` row (or zero rows on an
        // empty collection); type the pipeline output so no cast is needed.
        const result = await this.col
            .aggregate<{ total: number }>([
                { $group: { _id: "$paletteSlug" } },
                { $count: "total" },
            ])
            .toArray();
        return result[0]?.total ?? 0;
    }
}
