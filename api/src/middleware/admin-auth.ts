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
 */

import { timingSafeEqual } from "node:crypto";
import { type MiddlewareHandler } from "hono";

export const adminAuth: MiddlewareHandler = async (c, next) => {
    const token = process.env.ADMIN_TOKEN;
    if (!token) {
        return c.json({ error: "Admin not configured" }, 503);
    }
    const auth = c.req.header("Authorization");
    if (!auth) {
        return c.json({ error: "Unauthorized" }, 401);
    }
    const expected = `Bearer ${token}`;
    if (auth.length !== expected.length) {
        return c.json({ error: "Forbidden" }, 403);
    }
    if (!timingSafeEqual(Buffer.from(auth), Buffer.from(expected))) {
        return c.json({ error: "Forbidden" }, 403);
    }
    await next();
};
