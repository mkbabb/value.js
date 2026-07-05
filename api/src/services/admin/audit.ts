/**
 * Admin audit service — read-only paginated query over the `admin_audit`
 * collection.
 *
 * Owns:
 *   - GET /admin/audit  (paginated, filterable by action/target/date-range)
 *
 * **No audit event emitted**: this is a read-only operation; auditing audit
 * reads would be infinite. The original route also did not emit.
 */

import type { Filter, WithId } from "mongodb";
import type { Services } from "../../middleware/inject-services.js";
import { escapeRegex } from "../../regex.js";
import type { AdminAuditEvent } from "../../models.js";

export interface AuditEntryDTO {
    id: string;
    timestamp: Date;
    action: string;
    target?: string | undefined;
    ipHash?: string | undefined;
    actorSlug?: string | null | undefined;
    payload?: Record<string, unknown> | undefined;
}

export interface AuditPage {
    data: AuditEntryDTO[];
    total: number;
    limit: number;
    offset: number;
}

export interface AuditQuery {
    limit: number;
    offset: number;
    action?: string | undefined;
    target?: string | undefined;
    after?: string | undefined;
    before?: string | undefined;
}

function format(doc: WithId<AdminAuditEvent>): AuditEntryDTO {
    return {
        id: String(doc._id),
        timestamp: doc.timestamp,
        action: doc.action,
        target: doc.target,
        ipHash: doc.ipHash,
        actorSlug: doc.actorSlug,
        payload: doc.payload,
    };
}

export async function listAudit(
    services: Services,
    query: AuditQuery,
): Promise<AuditPage> {
    const { adminAudit } = services.repositories;
    const filter: Filter<AdminAuditEvent> = {};
    if (query.action) filter.action = query.action;
    if (query.target) {
        (filter as Record<string, unknown>).target = {
            $regex: escapeRegex(query.target),
            $options: "i",
        };
    }
    if (query.after || query.before) {
        const ts: Record<string, Date> = {};
        if (query.after) ts.$gte = new Date(query.after);
        if (query.before) ts.$lte = new Date(query.before);
        (filter as Record<string, unknown>).timestamp = ts;
    }

    const [rows, total] = await Promise.all([
        adminAudit.findManyByFilter(filter, query.offset, query.limit),
        adminAudit.countByFilter(filter),
    ]);

    return {
        data: rows.map((r) => format(r)),
        total,
        limit: query.limit,
        offset: query.offset,
    };
}
