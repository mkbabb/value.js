/**
 * Colors router — pipeline-conformant (E.W2 Lane A).
 *
 * Closes the two-speed-backend deviation D recorded (per `E-AUDIT-3 §3.2` +
 * `E-AUDIT-6 §10 top-1`). The legacy implementation carried 8 raw `db.collection`
 * sites + 6 ad-hoc error envelopes + inline validation; this
 * rewrite obeys `validate → authn → authz → service → repository → format →
 * response` per `api/CLAUDE.md`.
 *
 * Per-route shape: parseValid (zod) → service call → respond. The query +
 * propose flows live in `services/color/{queries,proposals}.ts`; the
 * repository layer (`repositories/{proposedName,tag}.ts`) owns all DB access.
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { ValidationError } from "../../platform/http/errors/index.js";
import {
    approvedColorsQuery,
    colorSearchQuery,
    proposeColorBody,
} from "./schema.js";
import {
    listApprovedColors,
    listColorTags,
    searchApprovedColors,
} from "./service/queries.js";
import { proposeColor } from "./service/proposals.js";

const colors = new Hono<AppEnv>();

// GET /colors/approved — paginated approved color names
colors.get("/approved", async (c) => {
    const parsed = approvedColorsQuery.safeParse(c.req.query());
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 100, 500));
    const offset = Math.max(0, parsed.data.offset ?? 0);
    const result = await listApprovedColors(c.var.services, limit, offset);
    return c.json(result);
});

// GET /colors/search — indexed byte-prefix search of approved names
colors.get("/search", async (c) => {
    // Per the legacy behaviour (short queries are not an error — they return
    // an empty result set): only validate when a query is present.
    const rawQ = c.req.query("q")?.trim() ?? "";
    if (rawQ.length < 2) {
        return c.json({ data: [] });
    }
    const parsed = colorSearchQuery.safeParse({
        q: rawQ,
        limit: c.req.query("limit"),
    });
    if (!parsed.success) {
        throw new ValidationError("Invalid query parameters", parsed.error.format());
    }
    const limit = Math.max(1, Math.min(parsed.data.limit ?? 10, 20));
    const result = await searchApprovedColors(c.var.services, parsed.data.q, limit);
    return c.json(result);
});

// GET /colors/tags — all tags, sorted by name (raw array — no envelope wrapping)
colors.get("/tags", async (c) => {
    const result = await listColorTags(c.var.services);
    return c.json(result);
});

// POST /colors/propose — submit a new color name
colors.post("/propose", async (c) => {
    const raw = await c.req.json();
    const parsed = proposeColorBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid color body", parsed.error.format());
    }
    const result = await proposeColor(c.var.services, c.var.sessionToken, parsed.data);
    return c.json(result, 201);
});

export default colors;
