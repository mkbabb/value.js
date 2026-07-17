/**
 * Admin authentication (E.W2 Lane E — extracted from the middleware god
 * module).
 *
 * Requires `Authorization: Bearer ${ADMIN_TOKEN}` on every admin route.
 * Uses `node:crypto`'s `timingSafeEqual` for the comparison to avoid leaking
 * the token length / prefix via a timing side-channel. Returns:
 *   - 503 if `ADMIN_TOKEN` is not configured (operator error, not the caller's).
 *   - 401 if the header is missing.
 *   - 403 on length mismatch OR byte-content mismatch.
 *
 * Mounted once on the admin sub-app (see `routes/admin/index.ts`).
 *
 * On success the gate surfaces the admin identity on `c.var.adminActor` (U-F40)
 * so every bearer-only admin op attributes a resolvable actor to `admin_audit`
 * — the routes thread `c.var.adminActor` into their audit-emitting services
 * instead of the session `userSlug` that is `undefined` for a pure-bearer call.
 */

import { timingSafeEqual } from "node:crypto";
import { type MiddlewareHandler } from "hono";
import type { AppEnv } from "../../types.js";
import {
    AuthenticationError,
    ConfigurationError,
    ForbiddenError,
} from "../../platform/http/errors/index.js";

/**
 * The synthetic admin actor recorded for bearer-only privileged ops (U-F40).
 * The `:`-delimited form can never collide with a generated user slug (slugs are
 * lowercase word-joins, colon-free), so it is an unambiguous, resolvable
 * sentinel identity for "the ADMIN_TOKEN bearer".
 */
export const ADMIN_ACTOR_SLUG = "system:admin";

export const adminAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
    const token = process.env.ADMIN_TOKEN;
    if (!token) {
        throw new ConfigurationError("Admin not configured");
    }
    const auth = c.req.header("Authorization");
    if (!auth) {
        throw new AuthenticationError("Unauthorized");
    }
    const expected = `Bearer ${token}`;
    if (auth.length !== expected.length) {
        throw new ForbiddenError();
    }
    if (!timingSafeEqual(Buffer.from(auth), Buffer.from(expected))) {
        throw new ForbiddenError();
    }
    // The bearer validated — this IS the admin. Surface a resolvable actor
    // identity so downstream audit emits attribute it (U-F40).
    c.set("adminActor", ADMIN_ACTOR_SLUG);
    await next();
};
