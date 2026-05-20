/**
 * Sessions router — pipeline-conformant (E.W2 Lane A).
 *
 * Closes the two-speed-backend deviation D recorded (per `E-AUDIT-3 §3.2` +
 * `E-AUDIT-6 §10 top-1`). The legacy implementation carried 7 raw `db.collection`
 * sites + 6 ad-hoc `c.json({ error })` envelopes + inline validation; this
 * rewrite obeys `validate → authn → authz → service → repository → format →
 * response` per `api/CLAUDE.md`.
 *
 * Per-route shape: parseValid (zod) → service call → respond. The service
 * layer (`services/session/auth.ts`) owns the domain logic; the repository
 * layer (`repositories/{users,sessions}.ts`) owns all DB access; the route is
 * a thin controller.
 */

import { Hono } from "hono";
import type { AppEnv } from "../types.js";
import { ValidationError } from "../errors/index.js";
import { loginRateLimit, registrationRateLimit } from "../middleware.js";
import { loginBody } from "../validation/session.js";
import {
    getMe,
    loginSession,
    registerSession,
    revokeSession,
} from "../services/session/auth.js";

const sessions = new Hono<AppEnv>();

// POST /sessions — register a new user + session
sessions.post("/", registrationRateLimit, async (c) => {
    const result = await registerSession(c);
    return c.json(result, 201);
});

// POST /sessions/login — log in with an existing slug
sessions.post("/login", loginRateLimit, async (c) => {
    const raw = await c.req.json();
    const parsed = loginBody.safeParse(raw);
    if (!parsed.success) {
        throw new ValidationError("Invalid login body", parsed.error.format());
    }
    const result = await loginSession(c, { slug: parsed.data.slug });
    return c.json(result);
});

// DELETE /sessions — revoke current session
sessions.delete("/", async (c) => {
    const result = await revokeSession(c);
    return c.json(result);
});

// GET /sessions/me — current user info
sessions.get("/me", async (c) => {
    const result = await getMe(c);
    return c.json(result);
});

export default sessions;
