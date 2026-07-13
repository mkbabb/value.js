/**
 * The Hono application assembly (T.W1 — carved from `index.ts` per E-1/F1).
 *
 * Owns the global middleware stack (from `platform/http/`) + the route mounting
 * (each domain module contributes its own router) + the 404 / error envelope
 * handlers. The composition root (`main.ts`) imports this `app`, wires the DB +
 * cron, and starts the listener. Keeping assembly here (no `serve()`, no
 * `process` handlers) makes the mounted shape testable in isolation.
 */

import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";

import type { AppEnv } from "./types.js";
import { corsHeaders } from "./platform/http/cors.js";
import { idempotency } from "./platform/http/idempotency.js";
import { injectServices } from "./platform/http/inject-services.js";
import { rateLimit } from "./platform/http/rate-limit.js";
import { resolveSession } from "./modules/session/resolve-session.js";
import { sanitizeBody } from "./platform/http/sanitize-body.js";
import { toResponseEnvelope } from "./platform/http/errors/index.js";
import { palettes } from "./modules/palette/routes/index.js";
import sessions from "./modules/session/routes.js";
import colors from "./modules/color/routes.js";
import admin from "./modules/admin/routes/index.js";
import { meta } from "./modules/meta/routes.js";

export const app = new Hono<AppEnv>();

// --- Global middleware ---

// CORS — resolve origin from request header. The minimal structural type
// (inv-L-8) makes the contract explicit without importing Hono's `Context`.
function resolveOrigin(c: { req: { header: (name: string) => string | undefined } }): string {
    return c.req.header("Origin") ?? "";
}

// CORS preflight
app.options("*", (c) => {
    const origin = resolveOrigin(c);
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
});

// Add CORS headers to all responses
app.use("*", async (c, next) => {
    await next();
    const origin = resolveOrigin(c);
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
        c.res.headers.set(key, value);
    }
});

// Body size limit (64 KB)
app.use("*", bodyLimit({ maxSize: 64 * 1024 }));

// Rate limiting
app.use("*", rateLimit);

// MongoDB operator injection guard
app.use("*", sanitizeBody);

// DI: hang typed `services` off c.var (D.W2 Lane C — D-HARDEN-3 §2.2).
// Must run BEFORE resolveSession, which reads repositories off the seam (L.W2).
app.use("*", injectServices);

// Session resolution
app.use("*", resolveSession);

// Idempotency-Key replay store (K.W2). Runs AFTER injectServices (so it can
// reach c.var.services if ever Mongo-backed) and AFTER resolveSession (the
// replay key is scoped by sessionToken/userSlug). Opt-in: a no-op when the
// header is absent.
app.use("*", idempotency);

// --- Routes ---

app.route("/palettes", palettes);
app.route("/sessions", sessions);
app.route("/colors", colors);
app.route("/admin", admin);

// Liveness sentinel (the bare root). The richer /health (mongo ping + lineage
// stamp), /docs, and /openapi.json live in the meta router (N.W4.D — the
// constellation 4-endpoint vhost contract / inv-22-color).
app.get("/", (c) => c.json({ status: "ok", service: "palette-api" }));
app.route("/", meta);

/**
 * I.W4 SOTA: emit problem+json responses with the correct
 * `application/problem+json` content-type. Hono's `c.json()` always sets
 * `application/json`, so we use `new Response(...)` directly for typed errors.
 */
function problemResponse(body: unknown, status: number): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/problem+json" },
    });
}

// 404 fallback — I.W4: RFC 7807 problem+json envelope. N.W3.H: the type URI
// binds the shared contract catalog (`urn:contract:not-found`), matching the
// `NotFoundError` class so an unmatched route and a typed 404 are legible as
// the same contract problem type.
app.notFound((c) =>
    problemResponse(
        {
            type: "urn:contract:not-found",
            title: "Not Found",
            status: 404,
            instance: c.req.path,
        },
        404,
    ),
);

// Global error handler — I.W4 SOTA: RFC 7807 problem+json envelope. Maps
// ApiError subclasses to their shared-contract `urn:contract:<kebab>` URNs
// (N.W3.H convergence); unrecognised throws become 500 with the
// `urn:palette-api:problem:internal` sentinel + operator logs.
app.onError((err, c) => {
    const { status, body } = toResponseEnvelope(err, c.req.path);
    if (status >= 500) {
        console.error("[api] unhandled error", err);
    }
    return problemResponse(body, status);
});
