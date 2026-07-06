/**
 * Admin tags router — tag CRUD.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../errors/index.js";
import { createTagBody } from "../../validation/admin.js";
import { createTag, deleteTag, listTags } from "../../services/admin/tags.js";

const router = new Hono<AppEnv>();

// GET /admin/tags — list all tags, sorted by name
router.get("/tags", async (c) => {
    const data = await listTags(c.var.services);
    return c.json(data);
});

// POST /admin/tags — create a tag
router.post("/tags", async (c) => {
    const parsed = createTagBody.safeParse(await c.req.json());
    if (!parsed.success) {
        throw new ValidationError("Invalid tag body", parsed.error.format());
    }
    const result = await createTag(
        c.var.services,
        c.var.userSlug,
        parsed.data.name,
        parsed.data.category,
    );
    return c.json(result, 201);
});

// DELETE /admin/tags/:name — delete a tag + cascade $pull from palettes
router.delete("/tags/:name", async (c) => {
    await deleteTag(c.var.services, c.var.userSlug, c.req.param("name"));
    return c.json({ deleted: true });
});

export default router;
