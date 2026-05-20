/**
 * Admin impersonate service — create a session as another user.
 *
 * Owns:
 *   - POST /admin/impersonate  (privileged session-as-other-user)
 *
 * The created session has no `expiresAt` set — same shape as the legacy
 * route. Lane D may revisit expiry policy alongside the F2 ownership work.
 *
 * Emits a typed audit event via `emitAuditEvent`.
 */

import crypto from "node:crypto";
import type { Context } from "hono";
import type { AppEnv } from "../../types.js";
import { NotFoundError } from "../../errors/index.js";
import { emitAuditEvent } from "../../events/auditLog.js";
import { hashIP, resolveIP } from "../../middleware/ip.js";

export interface ImpersonateResult {
    token: string;
    userSlug: string;
}

export async function impersonate(
    c: Context<AppEnv>,
    targetSlug: string,
): Promise<ImpersonateResult> {
    const { users, sessions } = c.var.services.repositories;

    const user = await users.findBySlug(targetSlug);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const ip = resolveIP(c);
    const ipHash = await hashIP(ip);
    const token = crypto.randomUUID();
    const now = new Date();

    await sessions.insert({
        _id: token,
        ipHash,
        userSlug: targetSlug,
        createdAt: now,
        lastSeenAt: now,
    });

    await emitAuditEvent(c, "impersonate", { target: `slug=${targetSlug}` });
    return { token, userSlug: targetSlug };
}
