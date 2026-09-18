/**
 * Zod schemas for the sessions routes (D.W2 Lane C #7).
 */

import { z } from "zod";
import { USER_STATUSES } from "./model.js";

export const loginBody = z.object({
    slug: z
        .string()
        .trim()
        .toLowerCase()
        .min(1)
        .max(120),
});

/**
 * The user-status vocabulary as a validation primitive, published at the
 * session capsule's schema boundary. Admin's `setUserStatusBody` consumes THIS
 * (W43 · RF-23) rather than importing the raw `USER_STATUSES` tuple from
 * `session/model.ts`, so admin depends on the session capsule boundary, not its
 * model internals. The tuple stays single-sourced in the model (intra-capsule).
 */
export const userStatusSchema = z.enum(USER_STATUSES);
