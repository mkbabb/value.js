/**
 * Versions routes for `/palettes` (D.W2 Lane A).
 *
 *   GET  /:slug/versions          — paginated version list
 *   GET  /:slug/versions/:hash    — single revision, JOINED to `:slug` (X-W3 · G-5)
 *   POST /:slug/revert            — revert palette to a prior version (owner only;
 *                                   strong If-Match REQUIRED, `Idempotency-Key`
 *                                   REQUIRED, answers 201 with the appended
 *                                   revision — X-W3 · G-9 · G-10 · G-11)
 *
 * X-W3 · X.W3.2: a revision's identity is the pair `(paletteSlug, hash)`. The
 * `hash` is the RELEASE id (`palette_versions._id`); the content identity is
 * the row's `payloadHash`, and the list carries both plus `revisionNo`.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import { revertPaletteBody } from "../schema.js";
import { paginationQuery } from "../../../platform/http/pagination.js";
import { ValidationError } from "../../../platform/http/errors/index.js";
import { requireOwnership } from "../require-ownership.js";
import { formatPalette } from "../format.js";
import { assertIfMatch, paletteETag } from "../etag.js";
import {
    getPaletteVersion,
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
    // X-W3 · G-5: the route reads BOTH parameters. It used to read `:hash`
    // alone and drop `:slug` on the floor, so `/palettes/A/versions/<hash-of-B>`
    // served B's content under A's address.
    const slug = c.req.param("slug");
    const hash = c.req.param("hash");
    const version = await getPaletteVersion(c.var.services, slug, hash, c.var.userSlug);
    return c.json({ hash: version._id, ...version, _id: undefined });
});

versionsRouter.post(
    "/:slug/revert",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");

        // X-W3 · G-9 — revert is the third mutating verb on this resource and
        // was the only one without a precondition: PATCH (`routes/crud.ts:122`)
        // and publish (`routes/publish.ts:39`) have required a strong If-Match
        // since I.W4, while the verb that REPLACES a palette's whole payload
        // took whatever state it found. Same call, same two failures: absent →
        // 428, stale → 412. `requireOwnership`'s extractor already read the
        // palette and stashed it on `c.var.palette` (N.W3.E), so this costs no
        // extra read.
        const ifMatch = c.req.header("If-Match");
        const current = c.var.palette;
        if (current) {
            assertIfMatch(ifMatch, paletteETag(current));
        }

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

        // X-W3 · G-11 (fold §B) — a revert CREATES a release; it answers 201,
        // and it carries the release it created. The payload clause is
        // load-bearing, not cosmetic: X-W7's VHD-4 cure is specified to consume
        // it ("the version mutation's one visible result IS the refreshed
        // history"), so a bare 201 would close this gate and strand that one.
        //
        // The appended release is the palette's head — `listVersions` sorts
        // `{revisionNo: -1, _id: -1}` (X.W3.2 · fold S-6), and `revertToVersion`
        // always appends for an attributable caller, which `requireOwnership`
        // above guarantees. The revision is emitted in the same envelope the
        // list and detail routes use, and it rides BESIDE the palette fields
        // rather than nesting them, so an existing consumer reading the
        // FormattedPalette keeps reading it.
        const { data } = await listVersions(c.var.services, slug, 0, 1);
        const appended = data[0];
        if (!appended) {
            // Not a client error: the caller is attributable and the revert
            // committed, so an empty head means the palette and its release log
            // disagree — a server-side invariant break.
            throw new Error(`revert appended no revision for palette ${slug}`);
        }
        return c.json(
            {
                ...formatPalette(palette),
                revision: { hash: appended._id, ...appended, _id: undefined },
            },
            201,
        );
    },
);
