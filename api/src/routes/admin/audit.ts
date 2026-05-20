/**
 * Admin audit router — read-only paginated audit log query.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../errors/index.js";
import { auditLogQuery } from "../../validation/admin.js";
import { listAudit } from "../../services/admin/audit.js";

const router = new Hono<AppEnv>();

// GET /admin/audit — paginated, filterable audit log
router.get("/audit", async (c) => {
    const parsed = auditLogQuery.safeParse({
        limit: c.req.query("limit"),
        offset: c.req.query("offset"),
        action: c.req.query("action"),
        target: c.req.query("target"),
        after: c.req.query("after"),
        before: c.req.query("before"),
    });
    if (!parsed.success) {
        throw new ValidationError("Invalid audit query", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);

    const page = await listAudit(c, {
        limit,
        offset,
        action: parsed.data.action,
        target: parsed.data.target,
        after: parsed.data.after,
        before: parsed.data.before,
    });
    return c.json(page);
});

export default router;
