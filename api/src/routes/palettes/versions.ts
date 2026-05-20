/**
 * Versions routes for `/palettes` (D.W2 Lane A).
 *
 *   GET  /:slug/versions          — paginated version list
 *   GET  /:slug/versions/:hash    — single version by content-hash
 *   POST /:slug/revert            — revert palette to a prior version (owner only)
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import {
    paginationQuery,
    revertPaletteBody,
} from "../../validation/palette.js";
import { ValidationError } from "../../errors/index.js";
import { requireOwnership } from "../../middleware/require-ownership.js";
import { formatPalette } from "../../format/palette.js";
import type { Palette } from "../../models.js";
import {
    getVersionByHash,
    listVersions,
    revertToVersion,
} from "../../services/palette/versions.js";

export const versionsRouter = new Hono<AppEnv>();

versionsRouter.get("/:slug/versions", async (c) => {
    const slug = c.req.param("slug");
    const parsed = paginationQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);

    const { data, total } = await listVersions(c.var.services, slug, offset, limit);
    return c.json({
        data: data.map((v) => ({ hash: v._id, ...v, _id: undefined })),
        total,
        limit,
        offset,
    });
});

versionsRouter.get("/:slug/versions/:hash", async (c) => {
    const hash = c.req.param("hash");
    const version = await getVersionByHash(c.var.services, hash);
    return c.json({ hash: version._id, ...version, _id: undefined });
});

versionsRouter.post(
    "/:slug/revert",
    requireOwnership(async (c) => {
        const palette = await c.var.services.repositories.palettes.findBySlug(
            c.req.param("slug"),
        );
        return palette?.userSlug ?? null;
    }),
    async (c) => {
        const slug = c.req.param("slug");

        const raw = await c.req.json();
        const parsed = revertPaletteBody.safeParse(raw);
        if (!parsed.success) {
            throw new ValidationError("Invalid request body", parsed.error.format());
        }

        const { palette } = await revertToVersion(c.var.services, {
            slug,
            hash: parsed.data.hash,
            userSlug: c.var.userSlug,
        });
        return c.json(formatPalette(palette as Palette & { _id: unknown }));
    },
);
