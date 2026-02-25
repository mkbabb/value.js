interface Env {
    DB: D1Database;
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
    });
}

function error(message: string, status = 400): Response {
    return json({ error: message }, status);
}

// Simple per-IP rate limiter (in-memory, resets on worker restart)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimits.get(ip);
    if (!entry || now > entry.resetAt) {
        rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return true;
    }
    entry.count++;
    return entry.count <= RATE_LIMIT;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        const url = new URL(request.url);
        const path = url.pathname;
        const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

        if (!checkRateLimit(ip)) {
            return error("Rate limit exceeded", 429);
        }

        try {
            // GET /palettes
            if (request.method === "GET" && path === "/palettes") {
                const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "20"), 100);
                const offset = parseInt(url.searchParams.get("offset") ?? "0");
                const { results } = await env.DB.prepare(
                    "SELECT * FROM palettes ORDER BY created_at DESC LIMIT ? OFFSET ?",
                ).bind(limit, offset).all();

                const { results: countResult } = await env.DB.prepare(
                    "SELECT COUNT(*) as total FROM palettes",
                ).all();

                const palettes = (results ?? []).map((row: any) => ({
                    ...row,
                    colors: JSON.parse(row.colors),
                    isLocal: false,
                }));

                return json({
                    data: palettes,
                    total: (countResult?.[0] as any)?.total ?? 0,
                    limit,
                    offset,
                });
            }

            // GET /palettes/:slug
            if (request.method === "GET" && path.startsWith("/palettes/")) {
                const slug = path.slice("/palettes/".length);
                const row = await env.DB.prepare(
                    "SELECT * FROM palettes WHERE slug = ?",
                ).bind(slug).first();

                if (!row) return error("Palette not found", 404);

                return json({
                    ...row,
                    colors: JSON.parse(row.colors as string),
                    isLocal: false,
                });
            }

            // POST /palettes
            if (request.method === "POST" && path === "/palettes") {
                const body = await request.json<{
                    name: string;
                    slug: string;
                    colors: { css: string; name?: string; position: number }[];
                }>();

                if (!body.name || !body.slug || !Array.isArray(body.colors) || body.colors.length === 0) {
                    return error("name, slug, and non-empty colors array required");
                }

                const id = crypto.randomUUID();
                await env.DB.prepare(
                    "INSERT INTO palettes (id, name, slug, colors) VALUES (?, ?, ?, ?)",
                ).bind(id, body.name, body.slug, JSON.stringify(body.colors)).run();

                const row = await env.DB.prepare("SELECT * FROM palettes WHERE id = ?").bind(id).first();
                return json({ ...row, colors: JSON.parse(row!.colors as string), isLocal: false }, 201);
            }

            // GET /colors/approved
            if (request.method === "GET" && path === "/colors/approved") {
                const { results } = await env.DB.prepare(
                    "SELECT * FROM proposed_names WHERE status = 'approved' ORDER BY name",
                ).all();
                return json(results ?? []);
            }

            // POST /colors/propose
            if (request.method === "POST" && path === "/colors/propose") {
                const body = await request.json<{
                    name: string;
                    css: string;
                    contributor?: string;
                }>();

                if (!body.name || !body.css) {
                    return error("name and css required");
                }

                const name = body.name.trim().toLowerCase();
                if (!/^[a-z][a-z0-9-]*$/.test(name)) {
                    return error("Name must be lowercase alphanumeric with hyphens, starting with a letter");
                }

                const existing = await env.DB.prepare(
                    "SELECT id FROM proposed_names WHERE name = ?",
                ).bind(name).first();

                if (existing) {
                    return error("A color with this name already exists", 409);
                }

                const id = crypto.randomUUID();
                await env.DB.prepare(
                    "INSERT INTO proposed_names (id, name, css, contributor) VALUES (?, ?, ?, ?)",
                ).bind(id, name, body.css, body.contributor ?? null).run();

                const row = await env.DB.prepare("SELECT * FROM proposed_names WHERE id = ?").bind(id).first();
                return json(row, 201);
            }

            return error("Not found", 404);
        } catch (e: any) {
            if (e?.message?.includes("UNIQUE constraint")) {
                return error("Duplicate entry", 409);
            }
            console.error(e);
            return error("Internal server error", 500);
        }
    },
};
