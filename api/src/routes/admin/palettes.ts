/**
 * Admin palettes router — palette moderation.
 */

import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv } from "../../types.js";
import { deletePalette, setFeatured } from "../../services/admin/palettes.js";
import { ValidationError } from "../../errors/index.js";

const router = new Hono<AppEnv>();

const setFeaturedBody = z.object({ featured: z.boolean() });

// POST /admin/palettes/:slug/feature — I.W3 idempotent featured setter.
// Body: { "featured": true | false }. Re-POSTing with the same body is a
// no-op on state (the audit row still fires per call).
router.post("/palettes/:slug/feature", async (c) => {
    const raw = await c.req.json().catch(() => ({}));
    const parsed = setFeaturedBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError(
            "Invalid request body — expected { featured: boolean }",
            parsed.error.format(),
        );
    }
    const result = await setFeatured(c, c.req.param("slug"), parsed.data.featured);
    return c.json(result);
});

// DELETE /admin/palettes/:slug — I.W2: soft-delete (sets deletedAt;
// reaper hard-deletes past the grace window).
router.delete("/palettes/:slug", async (c) => {
    await deletePalette(c, c.req.param("slug"));
    return c.json({ deleted: true });
});

export default router;
