/**
 * ProposedNameRepository — owns query/write ops for `proposed_names`.
 *
 * The collection backs BOTH the public `colors/*` routes (status: "approved"
 * reads) and the admin moderation queue (status: "proposed" + transitions).
 */

import type { Collection, ObjectId, Sort, WithId, WithoutId } from "mongodb";
import type { ProposedName, ProposedNameStatus } from "../model.js";

export class ProposedNameRepository {
    constructor(private readonly col: Collection<ProposedName>) {}

    findById(id: ObjectId): Promise<WithId<ProposedName> | null> {
        return this.col.findOne({ _id: id });
    }

    findByName(name: string): Promise<WithId<ProposedName> | null> {
        return this.col.findOne({ name });
    }

    findByStatus(
        status: ProposedNameStatus,
        skip: number,
        limit: number,
    ): Promise<WithId<ProposedName>[]> {
        const sort: Sort = status === "approved" ? { name: 1 } : { createdAt: -1 };
        return this.col
            .find({ status })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByStatus(status: ProposedNameStatus): Promise<number> {
        return this.col.countDocuments({ status });
    }

    /**
     * Indexed byte-prefix search over the unique `{name:1}` index (V·W45 item
     * 2). A bounded half-open range `[prefix, prefix + U+FFFF)` the planner
     * serves as an index scan — NOT a `$text` rank + `$regex` substring
     * fallback. `prefix` is already normalized (trimmed, lowercase) by the
     * caller; stored names are lowercase at rest. Names are ASCII `[a-z0-9-]`,
     * so the `￿` sentinel cleanly bounds every name that starts with the
     * prefix. Ordered by name for a stable, non-ranked result.
     */
    searchByNamePrefix(prefix: string, limit: number): Promise<WithId<ProposedName>[]> {
        return this.col
            .find({
                status: "approved",
                name: { $gte: prefix, $lt: `${prefix}￿` },
            })
            .sort({ name: 1 })
            .limit(limit)
            .toArray();
    }

    async insert(name: WithoutId<ProposedName>): Promise<ObjectId> {
        const result = await this.col.insertOne(name as ProposedName);
        return result.insertedId;
    }

    /**
     * Transition status only if currently in the expected source state.
     * Returns true if the transition happened.
     */
    async transitionStatus(
        id: ObjectId,
        from: ProposedNameStatus,
        to: ProposedNameStatus,
        extra: Partial<ProposedName> = {},
    ): Promise<boolean> {
        const result = await this.col.updateOne(
            { _id: id, status: from },
            { $set: { status: to, ...extra } },
        );
        return result.matchedCount > 0;
    }

    delete(id: ObjectId): Promise<number> {
        return this.col.deleteOne({ _id: id }).then((r) => r.deletedCount);
    }
}
