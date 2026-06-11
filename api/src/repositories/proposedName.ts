/**
 * ProposedNameRepository — owns query/write ops for `proposed_names`.
 *
 * The collection backs BOTH the public `colors/*` routes (status: "approved"
 * reads) and the admin moderation queue (status: "proposed" + transitions).
 */

import type { Collection, Filter, ObjectId, Sort, WithId, WithoutId } from "mongodb";
import type { ProposedName, ProposedNameStatus } from "../models.js";

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

    findManyByFilter(
        filter: Filter<ProposedName>,
        skip: number,
        limit: number,
    ): Promise<WithId<ProposedName>[]> {
        return this.col.find(filter).skip(skip).limit(limit).toArray();
    }

    /**
     * Text-search on the (name, css) compound text index defined in
     * `api/src/db.ts:53-56`. Returns the highest-scoring results first.
     */
    searchText(query: string, limit: number): Promise<WithId<ProposedName>[]> {
        return this.col
            .find(
                { status: "approved", $text: { $search: query } },
                { projection: { score: { $meta: "textScore" } } },
            )
            .sort({ score: { $meta: "textScore" } })
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
