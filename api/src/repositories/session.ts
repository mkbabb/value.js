/**
 * SessionRepository — owns all query/write ops for the `sessions` collection.
 *
 * Session `_id` is the session token (uuid), branded `SessionToken` at the
 * model boundary (L.W2). The `findAndTouch` method IS the session-validation
 * read `middleware/resolve-session.ts` consumes via the DI seam — an atomic
 * find + `lastSeenAt` touch.
 */

import type { ClientSession, Collection } from "mongodb";
import type { Session } from "../models.js";
import { asSessionToken } from "../models.js";

export class SessionRepository {
    constructor(private readonly col: Collection<Session>) {}

    findByToken(token: string): Promise<Session | null> {
        return this.col.findOne({ _id: asSessionToken(token) });
    }

    /**
     * Atomic find-and-touch: returns the session document if (1) the token
     * matches and (2) `expiresAt > now`, while also bumping `lastSeenAt`.
     */
    findAndTouch(token: string): Promise<Session | null> {
        return this.col.findOneAndUpdate(
            { _id: asSessionToken(token), expiresAt: { $gt: new Date() } },
            { $set: { lastSeenAt: new Date() } },
            { returnDocument: "after" },
        );
    }

    async insert(
        session: Session,
        clientSession?: ClientSession,
    ): Promise<void> {
        await this.col.insertOne(
            session,
            clientSession ? { session: clientSession } : undefined,
        );
    }

    delete(token: string): Promise<number> {
        return this.col
            .deleteOne({ _id: asSessionToken(token) })
            .then((r) => r.deletedCount);
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

    // Note: there is no application-level expiry/stale sweep. Sessions are
    // reaped by the `sessions.expiresAt` TTL index (`db.ts`,
    // `expireAfterSeconds: 0`) at their 30-day mint horizon (CRUD-CONTRACT §6).
    // The former `deleteExpired`/`deleteStale` methods + their cron arms were
    // dead once the TTL index landed (N.W3.C/I).
}
