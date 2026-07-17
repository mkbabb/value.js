/**
 * AdminAuditRepository — owns query/write ops for the `admin_audit` collection.
 *
 * The `insert` method is the canonical sink for `events/auditLog.ts`. Admin
 * services call `emitAuditEvent(services, actorSlug, ...)` which calls this
 * method.
 */

import type { ClientSession, Collection, Filter, WithId, WithoutId } from "mongodb";
import type { AdminAuditEvent } from "../model.js";

export class AdminAuditRepository {
    constructor(private readonly col: Collection<AdminAuditEvent>) {}

    async insert(event: WithoutId<AdminAuditEvent>): Promise<void> {
        await this.col.insertOne(event as AdminAuditEvent);
    }

    findManyByFilter(
        filter: Filter<AdminAuditEvent>,
        skip: number,
        limit: number,
    ): Promise<WithId<AdminAuditEvent>[]> {
        return this.col
            .find(filter)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    countByFilter(filter: Filter<AdminAuditEvent>): Promise<number> {
        return this.col.countDocuments(filter);
    }

    /**
     * Scrub all audit-trail entries authored by the given actor (E.W2 Lane B
     * — called from `deleteUser` cascade inside the transactional boundary).
     * If the deleted user never produced any audit events (the common case
     * for non-admin users), this is a zero-row no-op.
     */
    deleteByActorSlug(
        actorSlug: string,
        session?: ClientSession,
    ): Promise<number> {
        return this.col
            .deleteMany({ actorSlug }, session ? { session } : undefined)
            .then((r) => r.deletedCount);
    }
}
