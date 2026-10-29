/**
 * Zod schemas for the palette routes (D.W2 Lane C #7 — D-HARDEN-3 §1 W1).
 *
 * Once Lane A migrates `routes/palettes.ts`, the per-route handlers will:
 *   const input = createPaletteBody.parse(await c.req.json());
 *
 * On parse failure, route handlers wrap zod's `.format()` issue map in
 * `ValidationError` so the global error middleware emits the canonical
 * `{ error: { code: "validation", message, detail } }` envelope.
 */

import { z } from "zod";
import { FLAG_REASONS, PALETTE_VISIBILITIES, PALETTE_TIERS } from "./model.js";

// ---------------------------------------------------------------
// Re-used field schemas
// ---------------------------------------------------------------

export const slugSchema = z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9][a-z0-9-]*$/, "must be lowercase alphanumeric with hyphens");

export const paletteNameSchema = z.string().trim().min(1).max(100);

/**
 * One colour of a palette — the PCS-3/PCS-11 contract (COHESION §0gt.5).
 *
 * - `position` is REQUIRED: the 0-based integer ORDER of the colour in the
 *   palette (`0, 1, 2, …`). It is the array index, stated on the wire; gradient
 *   stop offsets are not palette semantics (gradients carry their own stops),
 *   so a fractional encoding such as `i / (n - 1)` is refused.
 * - `weight` is OPTIONAL: a finite number ≥ 0, the colour's population share
 *   where the producer knows it (Extract). It is persisted as sent, never
 *   stripped; it is descriptive metadata and takes no part in the palette's
 *   content hash (`hash.ts: computeContentHash`).
 */
export const colorEntrySchema = z.object({
    css: z.string().min(1).max(200),
    name: z.string().max(64).optional(),
    position: z.number().int().nonnegative(),
    weight: z.number().finite().nonnegative().optional(),
});

/**
 * The colours of a palette, in order. Each entry's `position` must equal its
 * index, so the array order and the declared order are one order.
 */
export const colorsArraySchema = z
    .array(colorEntrySchema)
    .min(1)
    .max(50)
    .superRefine((colors, ctx) => {
        colors.forEach((c, i) => {
            if (c.position !== i) {
                ctx.addIssue({
                    code: "custom",
                    path: [i, "position"],
                    message: `position must be the colour's 0-based order (${i}), got ${c.position}`,
                });
            }
        });
    });

export const tagsArraySchema = z.array(z.string().min(1).max(30)).max(10);

// ---------------------------------------------------------------
// Bodies
// ---------------------------------------------------------------

export const createPaletteBody = z.object({
    name: paletteNameSchema,
    slug: slugSchema,
    colors: colorsArraySchema,
    tags: tagsArraySchema.optional(),
});

export const updatePaletteBody = z
    .object({
        name: paletteNameSchema.optional(),
        colors: colorsArraySchema.optional(),
        tags: tagsArraySchema.optional(),
    })
    .refine(
        (b) => b.name !== undefined || b.colors !== undefined || b.tags !== undefined,
        { message: "at least one of {name, colors, tags} must be supplied" },
    );

export const forkPaletteBody = z
    .object({
        name: paletteNameSchema.optional(),
        slug: slugSchema.optional(),
    })
    .default({});

export const revertPaletteBody = z.object({
    hash: z.string().min(1),
});

export const flagPaletteBody = z.object({
    reason: z.enum(FLAG_REASONS),
    detail: z.string().max(500).optional(),
});

// ---------------------------------------------------------------
// Query
// ---------------------------------------------------------------

export const listPalettesQuery = z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).max(10_000).optional(),
    cursor: z.string().optional(),
    sort: z.enum(["newest", "popular", "most-forked"]).optional(),
    q: z.string().min(1).optional(),
    visibility: z.enum([...PALETTE_VISIBILITIES]).optional(),
    tier: z.enum([...PALETTE_TIERS]).optional(),
    tags: z.string().optional(),
    userSlug: z.string().optional(),
    colorL: z.coerce.number().optional(),
    colorA: z.coerce.number().optional(),
    colorB: z.coerce.number().optional(),
    colorRadius: z.coerce.number().min(0).optional(),
});
