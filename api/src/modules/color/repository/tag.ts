/**
 * TagRepository — owns query/write ops for the `tags` collection.
 */

import type { ClientSession, Collection, ObjectId, WithId, WithoutId } from "mongodb";
import type { Tag } from "../model.js";

export class TagRepository {
    constructor(private readonly col: Collection<Tag>) {}

    findAllSorted(): Promise<WithId<Tag>[]> {
        return this.col.find().sort({ name: 1 }).toArray();
    }

    findByName(name: string): Promise<WithId<Tag> | null> {
        return this.col.findOne({ name });
    }

    async insert(tag: WithoutId<Tag>): Promise<ObjectId> {
        const result = await this.col.insertOne(tag as Tag);
        return result.insertedId;
    }

    deleteByName(name: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteOne({ name }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }
}
