/**
 * Admin colors router — color-name moderation.
 *
 * Mounted at `/admin` by `routes/admin/index.ts`. Auth: `adminAuth` is bound
 * once on the parent router; no per-route auth.
 */

import { Hono, type Context } from "hono";
import type { AppEnv } from "../../types.js";
import { paginationQuery } from "../../validation/palette.js";
import {
    approveColor,
    deleteColor,
    listByStatus,
    rejectColor,
} from "../../services/admin/colors.js";
import { ValidationError } from "../../errors/index.js";

const router = new Hono<AppEnv>();

function parsePagination(c: Context<AppEnv>): { limit: number; offset: number } {
    const parsed = paginationQuery.safeParse({
        limit: c.req.query("limit"),
        offset: c.req.query("offset"),
    });
    if (!parsed.success) {
        throw new ValidationError("Invalid pagination", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 50, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);
    return { limit, offset };
}

// GET /admin/queue — list proposed-status names
router.get("/queue", async (c) => {
    const { limit, offset } = parsePagination(c);
    const page = await listByStatus(c.var.services, "proposed", limit, offset);
    return c.json(page);
});

// GET /admin/colors/approved — list approved-status names
router.get("/colors/approved", async (c) => {
    const { limit, offset } = parsePagination(c);
    const page = await listByStatus(c.var.services, "approved", limit, offset);
    return c.json(page);
});

// DELETE /admin/colors/:id — delete a color name (any status)
router.delete("/colors/:id", async (c) => {
    await deleteColor(c.var.services, c.var.userSlug, c.req.param("id"));
    return c.json({ deleted: true });
});

// POST /admin/colors/:id/approve
router.post("/colors/:id/approve", async (c) => {
    await approveColor(c.var.services, c.var.userSlug, c.req.param("id"));
    return c.json({ approved: true });
});

// POST /admin/colors/:id/reject
router.post("/colors/:id/reject", async (c) => {
    await rejectColor(c.var.services, c.var.userSlug, c.req.param("id"));
    return c.json({ rejected: true });
});

export default router;
