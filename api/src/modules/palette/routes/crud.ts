/**
 * CRUD routes for `/palettes` (D.W2 Lane A).
 *
 * Thin controller layer: parseValid → service call → respond. Validation goes
 * through the zod schemas in `validation/palette.ts`; errors propagate as
 * typed `ApiError`s, mapped to the envelope by `app.onError`.
 *
 * Route order: `/mine` MUST be registered before `/:slug` (otherwise the
 * `:slug` matcher swallows "mine"). The concern-router-level mount in
 * `index.ts` preserves this by mounting the CRUD router first.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../../types.js";
import {
    createPaletteBody,
    listPalettesQuery,
    paginationQuery,
    updatePaletteBody,
} from "../schema.js";
import { AuthenticationError, ValidationError } from "../../../platform/http/errors/index.js";
import { requireOwnership } from "../require-ownership.js";
import { assertIfMatch, paletteETag } from "../etag.js";
import {
    createPalette,
    deletePalette,
    getPaletteBySlug,
    listMine,
    listPalettes,
    patchPalette,
    restorePalette,
} from "../service/crud.js";
import { getOwnedPalette } from "../service/ownership.js";

export const crudRouter = new Hono<AppEnv>();

// GET /palettes — paginated list (cursor or offset)
crudRouter.get("/", async (c) => {
    const parsed = listPalettesQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const result = await listPalettes(c.var.services, parsed.data, c.var.userSlug);
    return c.json(result);
});

// GET /palettes/mine — current user's palettes
crudRouter.get("/mine", async (c) => {
    const userSlug = c.var.userSlug;
    if (!userSlug) throw new AuthenticationError();

    const parsed = paginationQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = parsed.data.limit ?? 20;
    const offset = parsed.data.offset ?? 0;
    const result = await listMine(c.var.services, userSlug, limit, offset);
    return c.json(result);
});

// GET /palettes/:slug — single palette. I.W4: emits strong ETag.
crudRouter.get("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const result = await getPaletteBySlug(c.var.services, slug, c.var.userSlug);
    c.header("ETag", paletteETag({
        currentHash: result.currentHash,
        updatedAt: result.updatedAt,
    }));
    return c.json(result);
});

// POST /palettes — create new
crudRouter.post("/", async (c) => {
    const sessionToken = c.var.sessionToken;
    if (!sessionToken) throw new AuthenticationError("Session token required");

    const raw = await c.req.json();
    const parsed = createPaletteBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid request body", parsed.error.format());
    }

    const result = await createPalette(c.var.services, {
        body: parsed.data,
        userSlug: c.var.userSlug ?? null,
    });
    return c.json(result, 201);
});

// Owner-extractor shared by PATCH + DELETE + restore — reads the FULL palette
// via the service-owned `getOwnedPalette` (inv-L-5: routes never reach into
// the repository) and STASHES it on `c.var.palette` so the gated handler can
// reuse that single read for the ETag pre-check + the service write (N.W3.E:
// PATCH read-amplification 4 → 2). Returns `null` to signal "not found"
// (middleware → 404); the caller's `userSlug` must match (middleware → 403).
export const paletteOwnerExtractor = async (
    c: Parameters<Parameters<typeof requireOwnership>[0]>[0],
): Promise<string | null> => {
    const palette = await getOwnedPalette(c.var.services, c.req.param("slug"));
    c.set("palette", palette ?? undefined);
    return palette?.userSlug ?? null;
};

// PATCH /palettes/:slug — update (owner only; gated by requireOwnership).
// I.W4: If-Match REQUIRED. 428 if absent; 412 if stale.
crudRouter.patch(
    "/:slug",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");
        const ifMatch = c.req.header("If-Match");

        // The `requireOwnership` extractor already read the palette and stashed
        // it on `c.var.palette` (N.W3.E) — reuse that doc for the ETag
        // pre-check instead of re-reading the slug. This route pre-check is the
        // SINGLE pre-write optimistic-concurrency check: it fast-fails a stale
        // If-Match. `patchPalette` performs no in-txn ETag re-validation, so a
        // concurrent write between this read and the service write is not
        // fenced — an accepted narrow TOCTOU window (ledger #16).
        const current = c.var.palette;
        if (current) {
            assertIfMatch(ifMatch, paletteETag(current));
        }

        const raw = await c.req.json();
        const parsed = updatePaletteBody.safeParse(raw);
        if (!parsed.success) {
            throw new ValidationError("Invalid request body", parsed.error.format());
        }

        const result = await patchPalette(c.var.services, {
            slug,
            body: parsed.data,
            userSlug: c.var.userSlug,
            // The middleware-read palette — `patchPalette` reuses it for the
            // content-hash diff instead of a third read of the same slug.
            palette: current,
        });
        c.header("ETag", paletteETag({
            currentHash: result.currentHash,
            updatedAt: result.updatedAt,
        }));
        return c.json(result);
    },
);

// DELETE /palettes/:slug — soft-delete (owner only; gated by requireOwnership).
// I.W2: sets `deletedAt: <now>`; the reaper cron hard-deletes after the grace
// window expires (default 30 days; override via PALETTE_GRACE_MS env).
crudRouter.delete(
    "/:slug",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");
        const result = await deletePalette(c.var.services, { slug });
        return c.json(result);
    },
);

// POST /palettes/:slug/restore — restore soft-deleted palette (owner only).
// I.W2: clears `deletedAt`; restores the palette's fork-count contribution
// to its parent (if any). Idempotent: restoring a live palette is a no-op.
crudRouter.post(
    "/:slug/restore",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");
        const result = await restorePalette(c.var.services, { slug });
        return c.json(result);
    },
);
