/**
 * Admin audit-log endpoint.
 *
 * Cross-cutting admin observability — the audit log spans every admin
 * mutation (palettes, users, colours, tags, flags) and is consumed
 * exclusively by `useAdminAudit.ts` (exposed as `pm.audit`).
 *
 * H.W3 Lane A — extracted from `api.ts §ADMIN — AUDIT LOG`.
 */

import type { AuditEntry, PaginatedResponse } from "../types";

import { adminRequest } from "../../platform/transport/client";

export interface AuditLogOptions {
    action?: string;
    after?: string;
    before?: string;
    target?: string;
    limit?: number;
    offset?: number;
}

export function getAuditLog(
    token: string,
    opts: AuditLogOptions = {},
): Promise<PaginatedResponse<AuditEntry>> {
    const params = new URLSearchParams();
    if (opts.limit != null) params.set("limit", String(opts.limit));
    if (opts.offset != null) params.set("offset", String(opts.offset));
    if (opts.action) params.set("action", opts.action);
    if (opts.after) params.set("after", opts.after);
    if (opts.before) params.set("before", opts.before);
    if (opts.target) params.set("target", opts.target);
    return adminRequest(`/admin/audit?${params}`, token);
}
