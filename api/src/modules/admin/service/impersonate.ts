/**
 * Admin impersonate service — create a session as another user.
 *
 * Owns:
 *   - POST /admin/impersonate  (privileged session-as-other-user)
 *
 * The session is minted through the session-service seam `createUserSession`
 * (W43 · RF-23) — admin depends on that capsule boundary rather than importing
 * `session/model.ts` token internals. The seam owns the CANONICAL 30-day TTL
 * (`expiresAt = now + SESSION_TTL_MS`, U-F36) and the at-rest token hash (U-F38).
 * Without the TTL the session was dead-on-arrival: the auth path filters
 * `expiresAt > now` (`SessionRepository.findAndTouch`), so a row with no
 * `expiresAt` never matched — the impersonation token returned 200 but was
 * functionally inert.
 *
 * Emits a typed audit event via `emitAuditEvent`; the actor is the resolved
 * admin identity threaded from the `adminAuth` bearer gate (U-F40), never null.
 *
 * W2-8 — `ipHash` is resolved by the ROUTE (which holds the raw Hono
 * `Context` for `resolveIP`) and passed in as a plain string; the service
 * itself never touches `Context`.
 */

import type { Services } from "../../../platform/http/inject-services.js";
import { NotFoundError } from "../../../platform/http/errors/index.js";
import { emitAuditEvent } from "../audit-log.js";
import { createUserSession } from "../../session/service/auth.js";

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
    const { users } = services.repositories;

    const user = await users.findBySlug(targetSlug);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    // Mint through the session-service seam — the raw uuid is hashed at rest
    // (U-F38) and stamped with the canonical 30-day `expiresAt` horizon (U-F36)
    // inside `session/`, so admin never touches the token internals directly.
    const { token } = await createUserSession(services, targetSlug, ipHash);

    await emitAuditEvent(services, actorSlug, "impersonate", { target: `slug=${targetSlug}` });
    return { token, userSlug: targetSlug };
}
