/**
 * Admin users router — user listing, status, deletion, bulk import.
 *
 * **Route ordering note**: `/users/prune-empty` (static) MUST precede
 * `/users/:slug/*` (parametric) — Hono matches in declared order, and the
 * `:slug` route would otherwise capture "prune-empty" as a slug.
 */

import { Hono, type Context } from "hono";
import type { AppEnv } from "../../../types.js";
import { ValidationError } from "../../../platform/http/errors/index.js";
import {
    importPalettesBody,
    setUserStatusBody,
} from "../schema.js";
import { paginationQuery } from "../../palette/schema.js";
import {
    deleteUser,
    deleteUserPalettes,
    listUserPalettes,
    listUsers,
    pruneEmptyUsers,
    setUserStatus,
} from "../service/users.js";
import { importPalettes } from "../service/import.js";

const router = new Hono<AppEnv>();

function parsePagination(
    c: Context<AppEnv>,
    defaultLimit: number,
): { limit: number; offset: number } {
    const parsed = paginationQuery.safeParse({
        limit: c.req.query("limit"),
        offset: c.req.query("offset"),
    });
    if (!parsed.success) {
        throw new ValidationError("Invalid pagination", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? defaultLimit, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);
    return { limit, offset };
}

// GET /admin/users — paginated list with optional search query
router.get("/users", async (c) => {
    const { limit, offset } = parsePagination(c, 20);
    const q = c.req.query("q")?.trim() || undefined;
    const page = await listUsers(c.var.services, limit, offset, q);
    return c.json(page);
});

// POST /admin/users/prune-empty — delete all users with zero palettes
router.post("/users/prune-empty", async (c) => {
    const pruned = await pruneEmptyUsers(c.var.services, c.var.userSlug);
    return c.json({ pruned });
});

// GET /admin/users/:slug/palettes — list any user's palettes
router.get("/users/:slug/palettes", async (c) => {
    const data = await listUserPalettes(c.var.services, c.req.param("slug"));
    return c.json(data);
});

// POST /admin/users/:slug/status — set user status (active | suspended)
router.post("/users/:slug/status", async (c) => {
    const parsed = setUserStatusBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid status body", parsed.error.format());
    }
    await setUserStatus(c.var.services, c.var.userSlug, c.req.param("slug"), parsed.data.status);
    return c.json({ slug: c.req.param("slug"), status: parsed.data.status });
});

// DELETE /admin/users/:slug — delete a user + cascade
router.delete("/users/:slug", async (c) => {
    const result = await deleteUser(c.var.services, c.var.userSlug, c.req.param("slug"));
    return c.json({
        deleted: true,
        palettesDeleted: result?.palettesDeleted ?? 0,
    });
});

// DELETE /admin/users/:slug/palettes — delete all palettes for a user
router.delete("/users/:slug/palettes", async (c) => {
    const deleted = await deleteUserPalettes(c.var.services, c.var.userSlug, c.req.param("slug"));
    return c.json({ deleted });
});

// POST /admin/users/:slug/import — bulk import palettes to a user
router.post("/users/:slug/import", async (c) => {
    const parsed = importPalettesBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid import body", parsed.error.format());
    }
    const result = await importPalettes(
        c.var.services,
        c.var.userSlug,
        c.req.param("slug"),
        parsed.data.palettes,
    );
    return c.json(result);
});

export default router;
