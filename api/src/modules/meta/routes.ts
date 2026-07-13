/**
 * Meta router — the constellation 4-endpoint vhost contract (N.W4.D /
 * inv-22-color). Mounts three operator/consumer surfaces alongside the
 * application routers:
 *
 *   GET /health       — liveness + a live MongoDB ping + the version/lineage
 *                       stamp. The deploy-hook health-gate (`scripts/deploy-hook.sh`)
 *                       polls this for `{"status":"ok"}`; a Mongo outage flips it
 *                       to 503 so the gate rolls the deploy back.
 *   GET /docs         — a human-legible HTML index of every shipped route.
 *   GET /openapi.json — an honest OpenAPI 3.1 machine spec of the SHIPPED routes,
 *                       generated from the same `ROUTES` table `/docs` renders, so
 *                       the two cannot drift from each other or from the wire.
 *
 * KISS: no new framework dep — the spec is authored from a flat route table and
 * the same `getDb()` singleton the app already owns. The table is hand-kept
 * faithful to `src/routes/**` (the source of truth a reviewer checks against).
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { getDb } from "../../platform/db/db.js";
import { ROUTES, type RouteDef } from "./route-table.js";

export const meta = new Hono<AppEnv>();

/**
 * The deployed code lineage. `DEPLOY_COMMIT_SHA` is threaded by the deploy-hook
 * (`docker compose ... -e DEPLOY_COMMIT_SHA=...` is the constellation idiom);
 * absent in local/dev it reads `"dev"`. The api package version is the static
 * contract version. Together they answer V3's "what code is on the wire?" — the
 * question that took a field-by-field envelope diff to answer before this stamp.
 */
const API_VERSION = "2.0.0";
const COMMIT_SHA = process.env.DEPLOY_COMMIT_SHA ?? "dev";

// --- GET /health — liveness + mongo ping + lineage stamp ---------------------

meta.get("/health", async (c) => {
    let mongo: "ok" | "down" = "down";
    try {
        const db = await getDb();
        await db.command({ ping: 1 });
        mongo = "ok";
    } catch {
        mongo = "down";
    }

    const ok = mongo === "ok";
    return c.json(
        {
            status: ok ? "ok" : "degraded",
            service: "palette-api",
            version: API_VERSION,
            commit: COMMIT_SHA,
            checks: { mongo },
            uptime: Math.round(process.uptime()),
        },
        ok ? 200 : 503,
    );
});

// --- GET /docs — human routes index ------------------------------------------

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function renderDocs(): string {
    const groups = new Map<string, RouteDef[]>();
    for (const r of ROUTES) {
        const g = groups.get(r.group) ?? [];
        g.push(r);
        groups.set(r.group, g);
    }

    const sections = [...groups.entries()]
        .map(([group, routes]) => {
            const rows = routes
                .map(
                    (r) =>
                        `      <tr><td class="m">${r.method}</td><td class="p">${escapeHtml(
                            r.path,
                        )}</td><td class="a">${r.auth}</td><td>${escapeHtml(
                            r.summary,
                        )}</td></tr>`,
                )
                .join("\n");
            return `    <h2>${escapeHtml(group)}</h2>\n    <table>\n      <thead><tr><th>Method</th><th>Path</th><th>Auth</th><th>Summary</th></tr></thead>\n      <tbody>\n${rows}\n      </tbody>\n    </table>`;
        })
        .join("\n");

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>palette-api — routes</title>
<style>
  :root { color-scheme: light dark; }
  body { font: 15px/1.5 ui-sans-serif, system-ui, sans-serif; max-width: 64rem; margin: 2rem auto; padding: 0 1rem; }
  h1 { margin-bottom: 0.25rem; }
  .sub { color: #888; margin-top: 0; }
  h2 { margin-top: 2rem; border-bottom: 1px solid #8884; padding-bottom: 0.25rem; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 0.3rem 0.5rem; border-bottom: 1px solid #8882; vertical-align: top; }
  td.m { font-weight: 600; white-space: nowrap; }
  td.p, code { font-family: ui-monospace, SFMono-Regular, monospace; }
  td.a { color: #888; white-space: nowrap; }
  a { color: inherit; }
</style>
</head>
<body>
  <h1>palette-api</h1>
  <p class="sub">v${API_VERSION} · commit ${escapeHtml(COMMIT_SHA)} ·
     <a href="/openapi.json">openapi.json</a> · <a href="/health">health</a></p>
${sections}
</body>
</html>`;
}

meta.get("/docs", (c) => c.html(renderDocs()));

// --- GET /openapi.json — honest machine spec of the SHIPPED routes -----------

interface OpenApiOperation {
    summary: string;
    tags: string[];
    security?: { sessionToken?: never[]; adminToken?: never[] }[];
    responses: Record<string, { description: string }>;
}

function buildOpenApi(): unknown {
    const paths: Record<string, Record<string, OpenApiOperation>> = {};

    for (const r of ROUTES) {
        // OpenAPI path params use `{slug}`, Hono uses `:slug`.
        const oaPath = r.path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
        const ops = (paths[oaPath] ??= {});

        const security: OpenApiOperation["security"] = [];
        if (r.auth === "session") security.push({ sessionToken: [] });
        if (r.auth === "admin") security.push({ adminToken: [] });

        ops[r.method.toLowerCase()] = {
            summary: r.summary,
            tags: [r.group],
            ...(security.length ? { security } : {}),
            responses: {
                "200": { description: "Success" },
                ...(r.auth !== "none"
                    ? { "401": { description: "Authentication required" } }
                    : {}),
            },
        };
    }

    return {
        openapi: "3.1.0",
        info: {
            title: "palette-api",
            version: API_VERSION,
            description:
                "Hono + MongoDB palette API. Errors are RFC 7807 application/problem+json with urn:contract:* type URNs.",
        },
        servers: [{ url: "https://api.color.babb.dev" }],
        components: {
            securitySchemes: {
                sessionToken: {
                    type: "apiKey",
                    in: "header",
                    name: "X-Session-Token",
                },
                adminToken: {
                    type: "http",
                    scheme: "bearer",
                    description: "Authorization: Bearer {ADMIN_TOKEN}",
                },
            },
        },
        paths,
    };
}

// Built once at module load — the route table is static.
const OPENAPI = buildOpenApi();

meta.get("/openapi.json", (c) => c.json(OPENAPI));
