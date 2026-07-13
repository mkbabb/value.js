/**
 * Admin flagged router — flagged-palette moderation queue.
 */

import { Hono, type Context } from "hono";
import type { AppEnv } from "../../../types.js";
import { ValidationError } from "../../../platform/http/errors/index.js";
import { paginationQuery } from "../../palette/schema.js";
import { dismissFlags, listFlagged } from "../service/flagged.js";

const router = new Hono<AppEnv>();

function parsePagination(c: Context<AppEnv>): { limit: number; offset: number } {
    const parsed = paginationQuery.safeParse({
        limit: c.req.query("limit"),
        offset: c.req.query("offset"),
    });
    if (!parsed.success) {
        throw new ValidationError("Invalid pagination", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 20, 100));
    const offset = Math.max(0, parsed.data.offset ?? 0);
    return { limit, offset };
}

// GET /admin/flagged — list flagged palettes with flag counts
router.get("/flagged", async (c) => {
    const { limit, offset } = parsePagination(c);
    const page = await listFlagged(c.var.services, limit, offset);
    return c.json(page);
});

// DELETE /admin/flags/:paletteSlug — dismiss all flags for a palette
router.delete("/flags/:paletteSlug", async (c) => {
    const result = await dismissFlags(c.var.services, c.var.adminActor, c.req.param("paletteSlug"));
    return c.json(result);
});

export default router;
