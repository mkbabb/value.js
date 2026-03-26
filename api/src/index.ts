import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import cron from "node-cron";
import "dotenv/config";

import type { AppEnv } from "./types.js";
import { getDb } from "./db.js";
import { corsHeaders, rateLimit, resolveSession, sanitizeBody } from "./middleware.js";
import { cleanup } from "./cron.js";
import palettes from "./routes/palettes.js";
import sessions from "./routes/sessions.js";
import colors from "./routes/colors.js";
import admin from "./routes/admin.js";

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

// Session resolution
app.use("*", resolveSession);

// --- Routes ---

app.route("/palettes", palettes);
app.route("/sessions", sessions);
app.route("/colors", colors);
app.route("/admin", admin);

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "palette-api" }));

// 404 fallback
app.notFound((c) => c.json({ error: "Not found" }, 404));

// Global error handler
app.onError((err, c) => {
    console.error(err);
    return c.json({ error: "Internal server error" }, 500);
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
    await getDb();

    // Schedule daily cleanup at 3 AM UTC
    cron.schedule("0 3 * * *", () => {
        cleanup().catch(console.error);
    });

    serve({ fetch: app.fetch, port }, (info: { port: number }) => {
        console.log(`Palette API running on http://localhost:${info.port}`);
    });
}

main().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});
