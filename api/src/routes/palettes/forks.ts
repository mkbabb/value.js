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
    remixPaletteBody,
} from "../../validation/palette.js";
import { AuthenticationError, ValidationError } from "../../errors/index.js";
import { formatPalette } from "../../format/palette.js";
import type { Palette } from "../../models.js";
import {
    forkPalette,
    getProvenance,
    listForks,
    remixPalette,
} from "../../services/palette/forks.js";

export const forksRouter = new Hono<AppEnv>();

forksRouter.post("/:slug/fork", async (c) => {
    const sourceSlug = c.req.param("slug");
    const sessionToken = c.var.sessionToken;
    const userSlug = c.var.userSlug;
    if (!sessionToken || !userSlug) {
        throw new AuthenticationError();
    }

    // F-W2 fix (Lane D): the fork body is optional (`POST /:slug/fork` with
    // no body is valid → all parsed.data fields undefined → server-generated
    // slug + inherited name). Distinguish empty body (Content-Length: 0 →
    // hono's `c.req.json()` throws `SyntaxError`) from MALFORMED JSON
    // (non-empty body that fails to parse → explicit 400).
    let raw: unknown = {};
    const contentLength = c.req.header("Content-Length");
    const hasBody = contentLength !== undefined && contentLength !== "0";
    if (hasBody) {
        raw = await c.req.json().catch(() => {
            throw new ValidationError("Invalid JSON body");
        });
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

// POST /:slug/remix — fork + a recorded atom-diff (J.W2). Body (all optional):
// `{ name?, slug?, colors? }`. `colors` ABSENT → a plain fork (empty diff);
// PRESENT → the server diffs against `:slug`'s colors and records the atom-diff
// on the child version edge. Returns the formatted child + `remixedFrom` +
// `atomDiff`. (The same optional-body parsing as `/fork`.)
forksRouter.post("/:slug/remix", async (c) => {
    const sourceSlug = c.req.param("slug");
    const sessionToken = c.var.sessionToken;
    const userSlug = c.var.userSlug;
    if (!sessionToken || !userSlug) {
        throw new AuthenticationError();
    }

    let raw: unknown = {};
    const contentLength = c.req.header("Content-Length");
    const hasBody = contentLength !== undefined && contentLength !== "0";
    if (hasBody) {
        raw = await c.req.json().catch(() => {
            throw new ValidationError("Invalid JSON body");
        });
    }
    const parsed = remixPaletteBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid request body", parsed.error.format());
    }

    const { palette, atomDiff, remixedFrom } = await remixPalette(c.var.services, {
        sourceSlug,
        name: parsed.data.name,
        slug: parsed.data.slug,
        colors: parsed.data.colors,
        sessionToken,
        userSlug,
    });
    const formatted = formatPalette(palette as Palette & { _id: unknown });
    return c.json({ ...formatted, remixedFrom, atomDiff }, 201);
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
