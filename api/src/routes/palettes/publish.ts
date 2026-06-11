/**
 * Palette publish/unpublish routes (J.W1c) — the in-place visibility flip.
 *
 * `POST /palettes/:slug/publish`   → visibility = "public"
 * `POST /palettes/:slug/unpublish` → visibility = "private"
 *
 * A dedicated, intention-revealing verb pair (the `restore` family) — NOT a
 * PATCH-visibility overload (J.W1c §2.1): agent-legible, naturally idempotent,
 * audit-friendly. Owner-gated from the session (inv-14; anon → 401, non-owner →
 * 403, missing → 404) via the shared `requireOwnership` middleware; If-Match
 * ETag-guarded (428 absent / 412 stale), mirroring PATCH. The operation is an
 * idempotent in-place `$set` on the SAME row — NEVER a new document (§3).
 */

import { Hono, type Context } from "hono";
import type { AppEnv } from "../../types.js";
import { requireOwnership } from "../../middleware/require-ownership.js";
import { paletteOwnerExtractor } from "./crud.js";
import { assertIfMatch, paletteETag } from "../../middleware/etag.js";
import { setVisibility } from "../../services/palette/visibility.js";

export const publishRouter = new Hono<AppEnv>();

function flipVisibility(target: "public" | "private") {
    return async (c: Context<AppEnv>) => {
        const slug = c.req.param("slug");

        // If-Match guard (the PATCH precedent): a single pre-write optimistic-
        // concurrency check. The `requireOwnership` extractor already read the
        // palette and stashed it on `c.var.palette` (N.W3.E) — reuse that doc
        // for the ETag pre-check instead of re-reading the slug. `setVisibility`
        // performs NO in-txn ETag re-validation (it is single-collection,
        // deliberately un-wrapped), so a concurrent write between this read and
        // the service write is not fenced — an accepted narrow TOCTOU window
        // (ledger #16).
        const ifMatch = c.req.header("If-Match");
        const current = c.var.palette;
        if (current) {
            assertIfMatch(ifMatch, paletteETag(current));
        }

        const result = await setVisibility(c.var.services, { slug, target });
        c.header(
            "ETag",
            paletteETag({
                currentHash: result.currentHash,
                updatedAt: result.updatedAt,
            }),
        );
        return c.json(result);
    };
}

publishRouter.post(
    "/:slug/publish",
    requireOwnership(paletteOwnerExtractor),
    flipVisibility("public"),
);

publishRouter.post(
    "/:slug/unpublish",
    requireOwnership(paletteOwnerExtractor),
    flipVisibility("private"),
);
