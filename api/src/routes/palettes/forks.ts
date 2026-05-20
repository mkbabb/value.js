/**
 * Forks routes for `/palettes` (D.W2 Lane A).
 *
 *   POST /:slug/fork         — fork a palette (cross-collection write)
 *   GET  /:slug/forks        — list direct forks
 *   GET  /:slug/provenance   — ancestry chain (up to depth 50)
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import {
    forkPaletteBody,
    paginationQuery,
} from "../../validation/palette.js";
import { AuthenticationError, ValidationError } from "../../errors/index.js";
import { formatPalette } from "../../format/palette.js";
import type { Palette } from "../../models.js";
import {
    forkPalette,
    getProvenance,
    listForks,
} from "../../services/palette/forks.js";

export const forksRouter = new Hono<AppEnv>();

forksRouter.post("/:slug/fork", async (c) => {
    const sourceSlug = c.req.param("slug");
    const sessionToken = c.var.sessionToken;
    const userSlug = c.var.userSlug;
    if (!sessionToken || !userSlug) {
        throw new AuthenticationError();
    }

    // F-W2 fix is in Lane D; for now we keep parity with the original surface
    // (the fork body is optional, all fields are optional).
    let raw: unknown;
    try {
        raw = await c.req.json();
    } catch {
        raw = {};
    }
    const parsed = forkPaletteBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid request body", parsed.error.format());
    }

    const { palette } = await forkPalette(c.var.services, {
        sourceSlug,
        name: parsed.data.name,
        slug: parsed.data.slug,
        sessionToken,
        userSlug,
    });
    return c.json(formatPalette(palette as Palette & { _id: unknown }), 201);
});

forksRouter.get("/:slug/forks", async (c) => {
    const slug = c.req.param("slug");
    const parsed = paginationQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);

    const { data, total } = await listForks(c.var.services, slug, offset, limit);
    return c.json({
        data: data.map((r) => formatPalette(r as Palette & { _id: unknown })),
        total,
        limit,
        offset,
    });
});

forksRouter.get("/:slug/provenance", async (c) => {
    const slug = c.req.param("slug");
    const chain = await getProvenance(c.var.services, slug);
    return c.json(chain);
});
