/**
 * Admin palettes router — palette moderation.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { deletePalette, toggleFeature } from "../../services/admin/palettes.js";

const router = new Hono<AppEnv>();

// POST /admin/palettes/:slug/feature — toggle featured status
router.post("/palettes/:slug/feature", async (c) => {
    const result = await toggleFeature(c, c.req.param("slug"));
    return c.json(result);
});

// DELETE /admin/palettes/:slug — delete a palette + cascade votes/flags
router.delete("/palettes/:slug", async (c) => {
    await deletePalette(c, c.req.param("slug"));
    return c.json({ deleted: true });
});

export default router;
