/**
 * Zod schemas for the color-name routes (D.W2 Lane C #7).
 */

import { z } from "zod";

export const proposeColorBody = z.object({
    name: z
        .string()
        .trim()
        .toLowerCase()
        .min(1)
        .max(50)
        .regex(
            /^[a-z][a-z0-9-]*$/,
            "name must be lowercase alphanumeric with hyphens, starting with a letter",
        ),
    css: z.string().min(1).max(200),
    // V·W45 item 3: NO caller-controlled attribution. The proposer is derived
    // server-side from the authenticated session, never accepted from the body.
});

export const colorSearchQuery = z.object({
    q: z.string().min(2),
    limit: z.coerce.number().int().min(1).max(20).optional(),
});

export const approvedColorsQuery = z.object({
    limit: z.coerce.number().int().min(1).max(500).optional(),
    offset: z.coerce.number().int().min(0).optional(),
});
