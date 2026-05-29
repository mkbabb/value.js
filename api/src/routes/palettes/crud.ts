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
import type { AppEnv } from "../../types.js";
import {
    createPaletteBody,
    listPalettesQuery,
    paginationQuery,
    updatePaletteBody,
} from "../../validation/palette.js";
import { AuthenticationError, ValidationError } from "../../errors/index.js";
import { requireOwnership } from "../../middleware/require-ownership.js";
import {
    createPalette,
    deletePalette,
    getPaletteBySlug,
    listMine,
    listPalettes,
    patchPalette,
    restorePalette,
} from "../../services/palette/crud.js";

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

// GET /palettes/:slug — single palette
crudRouter.get("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const result = await getPaletteBySlug(c.var.services, slug, c.var.userSlug);
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
        sessionToken,
        userSlug: c.var.userSlug ?? null,
    });
    return c.json(result, 201);
});

// Owner-extractor shared by PATCH + DELETE — reads the palette's `userSlug`.
// Returns `null` to signal "not found" (middleware → 404); the caller's
// `userSlug` must match for the request to proceed (middleware → 403).
const paletteOwnerExtractor = async (
    c: Parameters<Parameters<typeof requireOwnership>[0]>[0],
): Promise<string | null> => {
    const palette = await c.var.services.repositories.palettes.findBySlug(
        c.req.param("slug"),
    );
    return palette?.userSlug ?? null;
};

// PATCH /palettes/:slug — update (owner only; gated by requireOwnership)
crudRouter.patch(
    "/:slug",
    requireOwnership(paletteOwnerExtractor),
    async (c) => {
        const slug = c.req.param("slug");

        const raw = await c.req.json();
        const parsed = updatePaletteBody.safeParse(raw);
        if (!parsed.success) {
            throw new ValidationError("Invalid request body", parsed.error.format());
        }

        const result = await patchPalette(c.var.services, {
            slug,
            body: parsed.data,
            userSlug: c.var.userSlug,
        });
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
