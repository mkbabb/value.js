/**
 * Session resolution (E.W2 Lane E — extracted from the middleware god module).
 *
 * Reads `X-Session-Token`, validates the session against the DB (sliding
 * `lastSeenAt`), and — if the session names a `userSlug` — checks the user
 * isn't suspended. A 60s LRU cache (see `cache/lru.ts`, D.W2 Lane D — D-HARDEN-3
 * §1 C3) absorbs the suspended-user check.
 *
 * Data access goes through the DI seam: `c.var.services.repositories.{sessions,
 * users}` (L.W2 Lane B). `injectServices` runs before `resolveSession` in
 * `index.ts`, so `c.var.services` is guaranteed present here. The branded
 * `SessionToken`/`UserSlug` ids let the repository filters typecheck without an
 * ObjectId cast — the former raw-driver DI-bypass and its two type-escape
 * casts are gone (L.W2, ledger #13/#17).
 *
 * The middleware sets `sessionToken` on `c.var` when the session is valid and
 * `userSlug` only when the named user is not suspended. A suspended user throws
 * `OwnershipError` (Account suspended); missing / invalid sessions fall through
 * silently — downstream `authn` callers throw `AuthenticationError` when they
 * actually require a session.
 */

import { type MiddlewareHandler } from "hono";
import type { AppEnv } from "../types.js";
import { LRU } from "../cache/lru.js";
import { OwnershipError } from "../errors/index.js";

const SUSPENDED_CACHE_TTL_MS = 60_000;
const SUSPENDED_CACHE_CAP = 10_000;
const suspendedCache = new LRU<string, true>(SUSPENDED_CACHE_CAP, SUSPENDED_CACHE_TTL_MS);

export const resolveSession: MiddlewareHandler<AppEnv> = async (c, next) => {
    const token = c.req.header("X-Session-Token");
    if (token && c.req.path !== "/") {
        const { sessions, users } = c.var.services.repositories;
        const session = await sessions.findAndTouch(token);
        if (session) {
            c.set("sessionToken", token);
            if (session.userSlug) {
                let isSuspended = suspendedCache.get(session.userSlug) === true;
                if (!isSuspended) {
                    // Cache miss or expired — check DB.
                    const user = await users.findBySlug(session.userSlug);
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
