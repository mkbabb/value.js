/**
 * AdminAuditRepository — owns query/write ops for the `admin_audit` collection.
 *
 * The `insert` method is the canonical sink for `events/auditLog.ts`. Lane B's
 * admin-route refactor calls `emitAuditEvent(c, ...)` which calls this method.
 */

import type { Collection, Filter, WithoutId } from "mongodb";
import type { AdminAuditEvent } from "../models.js";

export class AdminAuditRepository {
    constructor(private readonly col: Collection<AdminAuditEvent>) {}

    async insert(event: WithoutId<AdminAuditEvent>): Promise<void> {
        await this.col.insertOne(event as AdminAuditEvent);
    }

    findManyByFilter(
        filter: Filter<AdminAuditEvent>,
        skip: number,
        limit: number,
    ): Promise<AdminAuditEvent[]> {
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
}
