import { serve } from "@hono/node-server";
import { Hono } from "hono";
import cron from "node-cron";
import "dotenv/config";

import type { AppEnv } from "./types.js";
import { getDb } from "./db.js";
import { corsHeaders, rateLimit, resolveSession } from "./middleware.js";
import { cleanup } from "./cron.js";
import palettes from "./routes/palettes.js";
import sessions from "./routes/sessions.js";
import colors from "./routes/colors.js";
import admin from "./routes/admin.js";

const app = new Hono<AppEnv>();

// --- Global middleware ---

// CORS preflight
app.options("*", (c) => {
    return new Response(null, { status: 204, headers: corsHeaders() });
});

// Add CORS headers to all responses
app.use("*", async (c, next) => {
    await next();
    const headers = corsHeaders();
    for (const [key, value] of Object.entries(headers)) {
        c.res.headers.set(key, value);
    }
});

// Rate limiting
app.use("*", rateLimit);

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

const port = parseInt(process.env.PORT ?? "3000");

async function main() {
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
