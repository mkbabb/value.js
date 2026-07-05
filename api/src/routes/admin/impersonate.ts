/**
 * Admin impersonate router — privileged session-as-other-user op.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../errors/index.js";
import { hashIP, resolveIP } from "../../middleware/ip.js";
import { impersonateBody } from "../../validation/admin.js";
import { impersonate } from "../../services/admin/impersonate.js";

const router = new Hono<AppEnv>();

// POST /admin/impersonate — create a session as another user
router.post("/impersonate", async (c) => {
    const parsed = impersonateBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid impersonate body", parsed.error.format());
    }
    const ipHash = await hashIP(resolveIP(c));
    const result = await impersonate(c.var.services, c.var.userSlug, ipHash, parsed.data.slug);
    return c.json(result);
});

export default router;
