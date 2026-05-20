/**
 * Zod schemas for the sessions routes (D.W2 Lane C #7).
 */

import { z } from "zod";

export const loginBody = z.object({
    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(1)
        .max(120),
});
