/**
 * Forks routes for `/palettes` (D.W2 Lane A).
 *
 *   POST /:slug/forks        — fork a palette (cross-collection write)
 *   GET  /:slug/forks        — list direct forks
 *   GET  /:slug/provenance   — ancestry chain (up to depth 50)
 *
 * X-W3 · G-12: the create verb is `POST /:slug/forks` — the plural collection
 * the sibling GET already names. The singular `POST /:slug/fork` is GONE, with
 * no alias and no redirect: a legacy spelling kept alive "for existing
 * clients" is exactly the compatibility shim the no-legacy law forbids, and it
 * would mean two paths whose idempotency + policy rules must be kept in step
 * forever. Consumers are migrated at the consumer.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { forkPaletteBody } from "../schema.js";
import { paginationQuery } from "../../../platform/http/pagination.js";
import { AuthenticationError, ValidationError } from "../../../platform/http/errors/index.js";
import { formatPalette } from "../format.js";
import { forkPalette, getProvenance, listForks } from "../service/forks.js";

export const forksRouter = new Hono<AppEnv>();

forksRouter.post("/:slug/forks", async (c) => {
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
        userSlug,
    });
    // X-W3 · G-14: the child's own viewer-filtered child count, for the caller
    // who just created it and owns it.
    const forkCount = await c.var.services.repositories.palettes.countForksOf(
        palette.slug,
        userSlug,
    );
    return c.json(formatPalette(palette, { forkCount }), 201);
});

forksRouter.get("/:slug/forks", async (c) => {
    const slug = c.req.param("slug");
    const parsed = paginationQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);

    // X-W3 · G-13: the viewer decides which children exist for this response —
    // rows AND `total` come from the one filtered join.
    const viewer = c.var.userSlug;
    const { data, total } = await listForks(c.var.services, slug, offset, limit, viewer);
    // X-W3 · G-14: each listed child's own filtered child count, in one join.
    const forkCounts = await c.var.services.repositories.palettes.countForksOfMany(
        data.map((r) => r.slug),
        viewer,
    );
    return c.json({
        data: data.map((r) =>
            formatPalette(r, { forkCount: forkCounts.get(r.slug) ?? 0 }),
        ),
        total,
        limit,
        offset,
    });
});

forksRouter.get("/:slug/provenance", async (c) => {
    const slug = c.req.param("slug");
    // X-W3 · G-4: the viewer reaches the policy. Without it the route
    // authorized nobody and every hop was judged against the anonymous
    // reading, so an owner's own lineage came back redacted to the owner.
    const chain = await getProvenance(c.var.services, slug, c.var.userSlug);
    return c.json(chain);
});
