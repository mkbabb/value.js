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
 *
 * W2-8 — `ipHash` is resolved by the ROUTE (which holds the raw Hono
 * `Context` for `resolveIP`) and passed in as a plain string; the service
 * itself never touches `Context`.
 */

import crypto from "node:crypto";
import type { Services } from "../../../platform/http/inject-services.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import { emitAuditEvent } from "../audit-log.js";
import { asSessionToken } from "../../session/model.js";

export interface ImpersonateResult {
    token: string;
    userSlug: string;
}

export async function impersonate(
    services: Services,
    actorSlug: string | undefined,
    ipHash: string,
    targetSlug: string,
): Promise<ImpersonateResult> {
    const { users, sessions } = services.repositories;

    const user = await users.findBySlug(targetSlug);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const token = crypto.randomUUID();
    const now = new Date();

    await sessions.insert({
        // Construction mint: the freshly generated uuid becomes this new
        // session's branded `_id`.
        _id: asSessionToken(token),
        ipHash,
        userSlug: targetSlug,
        createdAt: now,
        lastSeenAt: now,
    });

    await emitAuditEvent(services, actorSlug, "impersonate", { target: `slug=${targetSlug}` });
    return { token, userSlug: targetSlug };
}
