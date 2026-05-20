/**
 * `requireOwnership` middleware factory (D.W2 Lane C #6 — replaces the F2
 * `sessionToken === sessionToken` ownership shim per D-HARDEN-3 §3 F2).
 *
 * Usage (post-Lane-A wiring):
 *   palettes.delete(
 *     "/:slug",
 *     requireOwnership(async (c) => {
 *       const pal = await c.var.services.repositories.palettes.findBySlug(c.req.param("slug"));
 *       return pal?.userSlug ?? null;
 *     }),
 *     handler,
 *   );
 *
 * The factory takes an extractor that returns the owner-slug of the resource
 * (or `null` if the resource doesn't exist). The middleware throws typed
 * errors that the global `app.onError` envelope-maps:
 *   - no `c.var.userSlug`         → 401 AuthenticationError
 *   - extractor returns `null`    → 404 NotFoundError
 *   - owner !== current user      → 403 OwnershipError
 */

import type { Context, MiddlewareHandler } from "hono";
import type { AppEnv } from "../types.js";
import { AuthenticationError, NotFoundError, OwnershipError } from "../errors/index.js";

export type ResourceOwnerExtractor = (c: Context<AppEnv>) => Promise<string | null>;

export function requireOwnership(
    getResourceOwner: ResourceOwnerExtractor,
): MiddlewareHandler<AppEnv> {
    return async (c, next) => {
        const userSlug = c.var.userSlug;
        if (!userSlug) throw new AuthenticationError();

        const ownerSlug = await getResourceOwner(c);
        if (ownerSlug === null) throw new NotFoundError("Resource not found");
        if (ownerSlug !== userSlug) throw new OwnershipError("Forbidden");

        await next();
    };
}
