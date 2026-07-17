/**
 * Generic pagination query schema — the `limit`/`offset` query pair shared by
 * every paginated list endpoint (palette versions/forks/list AND admin
 * colors/flagged/users).
 *
 * Hoisted out of `palette/schema.ts` (W43 · RF-23): pagination is a generic
 * HTTP-transport concern, not a palette-domain schema. Homing it here lets the
 * admin routes stop reaching cross-capsule into `palette/` for a primitive that
 * has nothing to do with palettes — they now depend on the platform boundary.
 */

import { z } from "zod";

export const paginationQuery = z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
    offset: z.coerce.number().int().min(0).optional(),
});
