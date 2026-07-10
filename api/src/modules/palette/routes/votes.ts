/**
 * Votes route for `/palettes` (D.W2 Lane A + Lane D F3).
 *
 *   POST /:slug/vote — toggle the current user's vote on a palette.
 *
 * The service uses the idempotent-upsert + gated-`$inc` primitives from the
 * Lane C repositories; this route handler is a thin adapter.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { AuthenticationError } from "../../../platform/http/errors/index.js";
import { toggleVote } from "../service/votes.js";

export const votesRouter = new Hono<AppEnv>();

votesRouter.post("/:slug/vote", async (c) => {
    const slug = c.req.param("slug");
    const userSlug = c.var.userSlug;
    if (!userSlug) {
        throw new AuthenticationError("User authentication required");
    }
    const result = await toggleVote(c.var.services, slug, userSlug);
    return c.json(result);
});
