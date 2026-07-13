/**
 * Admin impersonate service — create a session as another user.
 *
 * Owns:
 *   - POST /admin/impersonate  (privileged session-as-other-user)
 *
 * The created session is minted with the CANONICAL session TTL — `expiresAt =
 * now + SESSION_TTL_MS`, the same 30-day horizon `service/auth.ts` uses (U-F36).
 * Without it the session was dead-on-arrival: the auth path filters
 * `expiresAt > now` (`SessionRepository.findAndTouch`), so a row with no
 * `expiresAt` never matched — the impersonation token returned 200 but was
 * functionally inert. The token is hashed at rest via `hashSessionToken` (U-F38)
 * exactly as the auth service mints.
 *
 * Emits a typed audit event via `emitAuditEvent`; the actor is the resolved
 * admin identity threaded from the `adminAuth` bearer gate (U-F40), never null.
 *
 * W2-8 — `ipHash` is resolved by the ROUTE (which holds the raw Hono
 * `Context` for `resolveIP`) and passed in as a plain string; the service
 * itself never touches `Context`.
 */

import crypto from "node:crypto";
import type { Services } from "../../../platform/http/inject-services.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import { emitAuditEvent } from "../audit-log.js";
import { hashSessionToken, SESSION_TTL_MS } from "../../session/model.js";

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
        // Construction mint: the freshly generated uuid is hashed (U-F38) into
        // this new session's branded `_id`; the raw `token` is returned below.
        _id: hashSessionToken(token),
        ipHash,
        userSlug: targetSlug,
        createdAt: now,
        lastSeenAt: now,
        // U-F36 — the canonical 30-day horizon, single-sourced from the session
        // model. Without it the auth path's `expiresAt > now` filter drops the
        // row and the token is dead-on-arrival.
        expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    });

    await emitAuditEvent(services, actorSlug, "impersonate", { target: `slug=${targetSlug}` });
    return { token, userSlug: targetSlug };
}
