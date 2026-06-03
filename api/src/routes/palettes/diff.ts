/**
 * Palette atom-diff route (J.W2) — the read-only `/diff` endpoint.
 *
 * `GET /palettes/:slug/diff?from={hash}[&to={hash}]` returns the canonical
 * WIRE envelope `{ fromHash, toHash, ops, identical }` (J-diff-shape §3.2).
 * Idempotent + cacheable: the diff for a `(fromHash, toHash)` pair is immutable
 * (content-hashes are stable), so it carries a strong ETag `"<from>:<to>"` and
 * `If-None-Match` short-circuits to 304. problem+json on 404 (slug/version not
 * found) and 422 (divergent chain, inv-J-1).
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../errors/index.js";
import { computePaletteDiff } from "../../services/palette/diff.js";

export const diffRouter = new Hono<AppEnv>();

diffRouter.get("/:slug/diff", async (c) => {
    const slug = c.req.param("slug");
    const from = c.req.query("from");
    const to = c.req.query("to");
    if (!from) {
        throw new ValidationError("query parameter `from` is required");
    }

    const result = await computePaletteDiff(c.var.services, slug, from, to);

    // The set-hashes ARE the from/to identifiers (J-diff-shape §2.4); the diff
    // for a pair is immutable, so the ETag is derived from them.
    const etag = `"${result.fromHash}:${result.toHash}"`;
    if (c.req.header("If-None-Match") === etag) {
        return c.body(null, 304);
    }
    c.header("ETag", etag);
    c.header("Cache-Control", "public, max-age=300");
    return c.json(result);
});
