/**
 * Session resolution (E.W2 Lane E — extracted from the middleware god module).
 *
 * Reads `X-Session-Token`, validates the session against the DB (sliding
 * `lastSeenAt`), and — if the session names a `userSlug` — checks the user
 * isn't suspended. A 60s LRU cache (see `cache/lru.ts`, D.W2 Lane D — D-HARDEN-3
 * §1 C3) absorbs the suspended-user check.
 *
 * The middleware sets `sessionToken` + `userSlug` on `c.var`; downstream
 * handlers + the `requireOwnership` factory consume these. A 403 is returned
 * if the user is suspended; missing / invalid sessions fall through silently
 * (downstream `authn` callers throw `AuthenticationError` when they actually
 * require a session).
 *
 * Per `api/src/index.ts` ordering: `injectServices` runs first, so the future
 * migration to repository-pattern access (per E-AUDIT-6 §2.2 line 43) can
 * read `c.var.services.repositories.{sessions,users}` from here.
 */

import { type MiddlewareHandler } from "hono";
import { getDb } from "../db.js";
import { LRU } from "../cache/lru.js";
import { OwnershipError } from "../errors/index.js";

const SUSPENDED_CACHE_TTL_MS = 60_000;
const SUSPENDED_CACHE_CAP = 10_000;
const suspendedCache = new LRU<string, true>(SUSPENDED_CACHE_CAP, SUSPENDED_CACHE_TTL_MS);

export const resolveSession: MiddlewareHandler = async (c, next) => {
    const token = c.req.header("X-Session-Token");
    if (token && c.req.path !== "/") {
        const db = await getDb();
        const session = await db
            .collection("sessions")
            .findOneAndUpdate(
                { _id: token as any, expiresAt: { $gt: new Date() } },
                { $set: { lastSeenAt: new Date() } },
                { returnDocument: "after" },
            );
        if (session) {
            c.set("sessionToken", token);
            if (session.userSlug) {
                let isSuspended = suspendedCache.get(session.userSlug) === true;
                if (!isSuspended) {
                    // Cache miss or expired — check DB.
                    const user = await db
                        .collection("users")
                        .findOne({ _id: session.userSlug as any });
                    if (user?.status === "suspended") {
                        suspendedCache.set(session.userSlug, true);
                        isSuspended = true;
                    } else {
                        suspendedCache.delete(session.userSlug);
                    }
                }
                if (isSuspended) {
                    throw new OwnershipError("Account suspended");
                }
                c.set("userSlug", session.userSlug);
            }
        }
    }
    await next();
};
