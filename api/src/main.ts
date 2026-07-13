/**
 * Composition root (T.W1 — carved from `index.ts` per E-1/F1).
 *
 * Env validation → DB connect (+ index creation) → migration smoke probe →
 * cron schedule → `serve()` → graceful-shutdown handlers. The Hono `app` it
 * serves is assembled in `app.ts`; this file owns only the process lifecycle.
 */

import { serve } from "@hono/node-server";
import cron from "node-cron";
import "dotenv/config";

import { getDb, closeDb } from "./platform/db/db.js";
import { assertMigrationsApplied } from "./platform/migrations/check.js";
import { cleanup } from "./cron.js";
import { app } from "./app.js";

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
