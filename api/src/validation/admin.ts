/**
 * Zod schemas for the admin routes (D.W2 Lane C #7).
 *
 * Lane B's admin-route split consumes these.
 */

import { z } from "zod";
import { USER_STATUSES } from "../models.js";
import { colorsArraySchema, paletteNameSchema, slugSchema } from "./palette.js";

// ---------------------------------------------------------------
// User management
// ---------------------------------------------------------------

export const setUserStatusBody = z.object({
    status: z.enum(USER_STATUSES),
});

export const impersonateBody = z.object({
    slug: z.string().trim().min(1),
});

// ---------------------------------------------------------------
// Tag management
// ---------------------------------------------------------------

export const createTagBody = z.object({
    name: z
        .string()
        .min(1)
        .max(30)
        .regex(/^[a-z0-9-]+$/, "must be lowercase alphanumeric with hyphens"),
    category: z.string().min(1).max(30),
});

// ---------------------------------------------------------------
// Batch ops
// ---------------------------------------------------------------

export const batchPalettesBody = z.object({
    action: z.enum(["delete", "feature", "unfeature"]),
    slugs: z.array(z.string()).min(1).max(50),
});

export const batchUsersBody = z.object({
    action: z.enum(["delete", "suspend", "unsuspend"]),
    slugs: z.array(z.string()).min(1).max(50),
});

// ---------------------------------------------------------------
// Palette import (admin gives palettes to a user)
// ---------------------------------------------------------------

export const importPaletteEntry = z.object({
    name: paletteNameSchema,
    slug: slugSchema,
    colors: colorsArraySchema,
});

export const importPalettesBody = z.object({
    palettes: z.array(importPaletteEntry).min(1),
});

// ---------------------------------------------------------------
// Audit log query
// ---------------------------------------------------------------

export const auditLogQuery = z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
    action: z.string().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    target: z.string().optional(),
});
