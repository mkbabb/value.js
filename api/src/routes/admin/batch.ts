/**
 * Admin batch router — bulk palette + user operations.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../errors/index.js";
import { batchPalettesBody, batchUsersBody } from "../../validation/admin.js";
import { batchPalettes, batchUsers } from "../../services/admin/batch.js";

const router = new Hono<AppEnv>();

// POST /admin/batch/palettes — bulk delete | feature | unfeature
router.post("/batch/palettes", async (c) => {
    const parsed = batchPalettesBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid batch palettes body", parsed.error.format());
    }
    const result = await batchPalettes(
        c.var.services,
        c.var.userSlug,
        parsed.data.action,
        parsed.data.slugs,
    );
    return c.json(result);
});

// POST /admin/batch/users — bulk delete | suspend | unsuspend
router.post("/batch/users", async (c) => {
    const parsed = batchUsersBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid batch users body", parsed.error.format());
    }
    const result = await batchUsers(
        c.var.services,
        c.var.userSlug,
        parsed.data.action,
        parsed.data.slugs,
    );
    return c.json(result);
});

export default router;
