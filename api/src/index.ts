import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import cron from "node-cron";
import "dotenv/config";

import type { AppEnv } from "./types.js";
import { getDb, closeDb } from "./db.js";
import { corsHeaders } from "./middleware/cors.js";
import { injectServices } from "./middleware/inject-services.js";
import { rateLimit } from "./middleware/rate-limit.js";
import { resolveSession } from "./middleware/resolve-session.js";
import { sanitizeBody } from "./middleware/sanitize-body.js";
import { toResponseEnvelope } from "./errors/index.js";
import { cleanup } from "./cron.js";
import { assertMigrationsApplied } from "./migrations/check.js";
import { palettes } from "./routes/palettes/index.js";
import sessions from "./routes/sessions.js";
import colors from "./routes/colors.js";
import admin from "./routes/admin/index.js";

const app = new Hono<AppEnv>();

// --- Global middleware ---

// CORS — resolve origin from request header
function resolveOrigin(c: any): string {
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
// Must run BEFORE resolveSession so the latter (when migrated) can use repositories.
app.use("*", injectServices);

// Session resolution
app.use("*", resolveSession);

// --- Routes ---

app.route("/palettes", palettes);
app.route("/sessions", sessions);
app.route("/colors", colors);
app.route("/admin", admin);

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "palette-api" }));

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

// 404 fallback — I.W4: RFC 7807 problem+json envelope.
app.notFound((c) =>
    problemResponse(
        {
            type: "urn:palette-api:problem:not_found",
            title: "Not Found",
            status: 404,
            instance: c.req.path,
        },
        404,
    ),
);

// Global error handler — I.W4 SOTA: RFC 7807 problem+json envelope. Maps
// ApiError subclasses to typed `urn:palette-api:problem:<code>` URNs;
// unrecognised throws become 500/"internal" with operator logs.
app.onError((err, c) => {
    const { status, body } = toResponseEnvelope(err, c.req.path);
    if (status >= 500) {
        console.error("[api] unhandled error", err);
    }
    return problemResponse(body, status);
});

// --- Start ---

async function main() {
    // Startup validation
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
        if (!process.env.ADMIN_TOKEN) {
            throw new Error("ADMIN_TOKEN is required in production");
        }
        if (!process.env.ALLOWED_ORIGINS) {
            throw new Error("ALLOWED_ORIGINS is required in production");
        }
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is required in production");
        }
    } else {
        if (!process.env.ADMIN_TOKEN) {
            console.warn("[WARN] ADMIN_TOKEN not set — admin endpoints will return 503");
        }
    }

    const port = parseInt(process.env.PORT ?? "3000");
    if (isNaN(port) || port < 1 || port > 65535) {
        throw new Error(`Invalid PORT: ${process.env.PORT}`);
    }

    // Connect to MongoDB (creates indexes)
    const db = await getDb();

    // Migration smoke probe (D.W2 Lane D F1) — asserts the schema invariants
    // the rest of the api code relies on. Exits non-zero on violation.
    await assertMigrationsApplied(db);

    // Schedule daily cleanup at 3 AM UTC
    cron.schedule("0 3 * * *", () => {
        cleanup().catch(console.error);
    });

    const server = serve({ fetch: app.fetch, port }, (info: { port: number }) => {
        console.log(`Palette API running on http://localhost:${info.port}`);
    });

    // --- Graceful shutdown (D.W2 Lane D C4) ---
    //
    // SIGTERM: orchestrator-initiated stop (docker compose down,
    // kubernetes pod eviction). Drain in-flight requests up to 5s grace,
    // close the Mongo client, then exit.
    // SIGINT: terminal Ctrl-C — same semantics.
    const SHUTDOWN_GRACE_MS = 5_000;
    let shuttingDown = false;
    const shutdown = (signal: NodeJS.Signals): void => {
        if (shuttingDown) return;
        shuttingDown = true;
        console.log(`[api] ${signal} received — graceful shutdown`);

        const forceExit = setTimeout(() => {
            console.error(`[api] grace period (${SHUTDOWN_GRACE_MS}ms) exceeded — forcing exit`);
            process.exit(1);
        }, SHUTDOWN_GRACE_MS);
        forceExit.unref();

        const closeServer = new Promise<void>((resolve) => {
            // @hono/node-server's `serve` returns a Node `http.Server`-compatible
            // handle exposing `.close()` (stops accepting new connections;
            // calls back once in-flight requests drain).
            (server as unknown as { close: (cb: () => void) => void }).close(() => resolve());
        });

        closeServer
            .then(() => closeDb())
            .then(() => {
                console.log("[api] shutdown complete");
                process.exit(0);
            })
            .catch((err) => {
                console.error("[api] shutdown error", err);
                process.exit(1);
            });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});
