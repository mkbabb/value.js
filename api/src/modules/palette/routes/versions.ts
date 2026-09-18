/**
 * Versions routes for `/palettes` (D.W2 Lane A).
 *
 *   GET  /:slug/versions          — paginated version list
 *   GET  /:slug/versions/:hash    — single version by content-hash
 *   POST /:slug/revert            — revert palette to a prior version (owner only)
 */

import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { revertPaletteBody } from "../schema.js";
import { paginationQuery } from "../../../platform/http/pagination.js";
import { ValidationError } from "../../../platform/http/errors/index.js";
import { requireOwnership } from "../require-ownership.js";
import { formatPalette } from "../format.js";
import {
    getVersionByHash,
    listVersions,
    revertToVersion,
} from "../service/versions.js";
import { assertPaletteReadable } from "../service/visibility.js";
import { paletteOwnerExtractor } from "./crud.js";

export const versionsRouter = new Hono<AppEnv>();

versionsRouter.get("/:slug/versions", async (c) => {
    const slug = c.req.param("slug");
    const parsed = paginationQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);

    // X-W3 · G-3: the release decision for this list is the ADDRESSING
    // palette's, and it is taken before any item is read, let alone formatted.
    // The list is strictly more disclosure than the detail route — it emits
    // every superseded `{name, colors, authorSlug, parentHash}` — so it cannot
    // be the one read path that authorizes nobody.
    await assertPaletteReadable(c.var.services, slug, c.var.userSlug);

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
    requireOwnership(paletteOwnerExtractor),
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
        return c.json(formatPalette(palette));
    },
);
