/**
 * Admin colors service — color-name moderation workflows.
 *
 * Owns:
 *   - GET /admin/queue            (list proposed-status names)
 *   - GET /admin/colors/approved  (list approved-status names)
 *   - DELETE /admin/colors/:id    (delete any status)
 *   - POST /admin/colors/:id/approve
 *   - POST /admin/colors/:id/reject
 *
 * All admin actions emit a typed audit event via `emitAuditEvent`.
 */

import type { Context } from "hono";
import { ObjectId } from "mongodb";
import type { WithId } from "mongodb";
import type { AppEnv } from "../../types.js";
import { NotFoundError, ValidationError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import type { ProposedName, ProposedNameStatus } from "../../models.js";

export interface ProposedNameDTO {
    id: string;
    name: string;
    css: string;
    status: ProposedNameStatus;
    contributor: string | null;
    createdAt: Date;
    approvedAt: Date | null;
}

export interface ListPage {
    data: ProposedNameDTO[];
    total: number;
    limit: number;
    offset: number;
}

function format(doc: WithId<ProposedName>): ProposedNameDTO {
    return {
        id: String(doc._id),
        name: doc.name,
        css: doc.css,
        status: doc.status,
        contributor: doc.contributor,
        createdAt: doc.createdAt,
        approvedAt: doc.approvedAt,
    };
}

function parseObjectId(raw: string): ObjectId {
    try {
        return new ObjectId(raw);
    } catch {
        throw new ValidationError("Invalid ID");
    }
}

export async function listByStatus(
    c: Context<AppEnv>,
    status: ProposedNameStatus,
    limit: number,
    offset: number,
): Promise<ListPage> {
    const { proposedNames } = c.var.services.repositories;
    const [results, total] = await Promise.all([
        proposedNames.findByStatus(status, offset, limit),
        proposedNames.countByStatus(status),
    ]);
    return { data: results.map((r) => format(r)), total, limit, offset };
}

export async function deleteColor(c: Context<AppEnv>, id: string): Promise<void> {
    const objectId = parseObjectId(id);
    const { proposedNames } = c.var.services.repositories;
    const deleted = await proposedNames.delete(objectId);
    if (deleted === 0) {
        throw new NotFoundError("Color name not found");
    }
    await emitAuditEvent(c, "delete-color", { target: `id=${id}` });
}

export async function approveColor(c: Context<AppEnv>, id: string): Promise<void> {
    const objectId = parseObjectId(id);
    const { proposedNames } = c.var.services.repositories;
    const ok = await proposedNames.transitionStatus(objectId, "proposed", "approved", {
        approvedAt: new Date(),
    });
    if (!ok) {
        throw new NotFoundError("Proposed name not found or already processed");
    }
    await emitAuditEvent(c, "approve-color", { target: `id=${id}` });
}

export async function rejectColor(c: Context<AppEnv>, id: string): Promise<void> {
    const objectId = parseObjectId(id);
    const { proposedNames } = c.var.services.repositories;
    const ok = await proposedNames.transitionStatus(objectId, "proposed", "rejected");
    if (!ok) {
        throw new NotFoundError("Proposed name not found or already processed");
    }
    await emitAuditEvent(c, "reject-color", { target: `id=${id}` });
}
