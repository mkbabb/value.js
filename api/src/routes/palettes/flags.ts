/**
 * Flags route for `/palettes` (D.W2 Lane A).
 *
 *   POST /:slug/flag — flag a palette for admin review.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { flagPaletteBody } from "../../validation/palette.js";
import { AuthenticationError, ValidationError } from "../../errors/index.js";
import { flagPalette } from "../../services/palette/flags.js";

export const flagsRouter = new Hono<AppEnv>();

flagsRouter.post("/:slug/flag", async (c) => {
    const slug = c.req.param("slug");
    const userSlug = c.var.userSlug;
    if (!userSlug) throw new AuthenticationError();

    const raw = await c.req.json();
    const parsed = flagPaletteBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid request body", parsed.error.format());
    }

    await flagPalette(c.var.services, {
        paletteSlug: slug,
        reporterSlug: userSlug,
        reason: parsed.data.reason,
        detail: parsed.data.detail,
    });
    return c.json({ flagged: true }, 201);
});
