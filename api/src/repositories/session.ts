/**
 * SessionRepository — owns all query/write ops for the `sessions` collection.
 *
 * Session `_id` is the session token (uuid). The `findAndTouch` method
 * mirrors the `findOneAndUpdate` pattern used in `middleware.ts:resolveSession`
 * for cache-friendly atomic touch.
 */

import type { ClientSession, Collection } from "mongodb";
import type { Session } from "../models.js";

export class SessionRepository {
    constructor(private readonly col: Collection<Session>) {}

    findByToken(token: string): Promise<Session | null> {
        return this.col.findOne({ _id: token });
    }

    /**
     * Atomic find-and-touch: returns the session document if (1) the token
     * matches and (2) `expiresAt > now`, while also bumping `lastSeenAt`.
     */
    findAndTouch(token: string): Promise<Session | null> {
        return this.col.findOneAndUpdate(
            { _id: token, expiresAt: { $gt: new Date() } },
            { $set: { lastSeenAt: new Date() } },
            { returnDocument: "after" },
        );
    }

    async insert(session: Session): Promise<void> {
        await this.col.insertOne(session);
    }

    delete(token: string): Promise<number> {
        return this.col.deleteOne({ _id: token }).then((r) => r.deletedCount);
    }

    deleteByUserSlug(userSlug: string, session?: ClientSession): Promise<number> {
        return this.col
            .deleteMany({ userSlug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }

    deleteByUserSlugs(
        userSlugs: string[],
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .deleteMany(
                { userSlug: { $in: userSlugs } },
                session ? { session } : undefined,
            )
            .then((r) => r.deletedCount);
    }

    /** Delete sessions whose `expiresAt` is earlier than `now`. */
    deleteExpired(now: Date): Promise<number> {
        return this.col
            .deleteMany({ expiresAt: { $lt: now } })
            .then((r) => r.deletedCount);
    }

    /** Delete sessions whose `lastSeenAt` is earlier than `threshold`. */
    deleteStale(threshold: Date): Promise<number> {
        return this.col
            .deleteMany({ lastSeenAt: { $lt: threshold } })
            .then((r) => r.deletedCount);
    }
}
