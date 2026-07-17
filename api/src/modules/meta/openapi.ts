/**
 * OpenAPI 3.1 + human `/docs` GENERATED from the mounted Hono route registry
 * (V·W45 item 6). This replaces the hand-kept `route-table.ts`, which PROVABLY
 * drifted — the `/palettes/:slug/restore` route was on the wire yet absent from
 * the table. The spec is now derived from `app.routes` by construction, so it
 * cannot drift from the wire: a route that is not mounted cannot appear, and
 * every mounted route appears.
 *
 * The registry carries method + path but not per-route auth/summary metadata,
 * so the generated spec is deliberately metadata-light: security is attached
 * only where it is path-derivable (`/admin/*` → bearer `ADMIN_TOKEN`); the
 * session + admin security *schemes* are still declared for consumers. Encoding
 * richer per-route auth would require re-introducing a hand table — the exact
 * drift source this wave retires.
 */

/** Only true HTTP endpoints enter the spec; `ALL`/`OPTIONS` wildcard
 * middleware mounts (e.g. `ALL /*`, `OPTIONS /*`) are excluded. */
const HTTP_METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);

export interface MountedRoute {
    /** Upper-case HTTP verb. */
    method: string;
    /** Hono path (`:slug` params). */
    path: string;
}

/** The minimal structural view of a Hono app this module reads. */
export interface RouteRegistry {
    routes: readonly { method: string; path: string }[];
}

/**
 * The single source of the mounted endpoint set — the SAME list the OpenAPI
 * spec and `/docs` render, and the list a parity test diffs the spec against.
 * Filters wildcard-middleware entries and dedupes (a path may register once per
 * matched handler layer).
 */
export function collectMountedRoutes(app: RouteRegistry): MountedRoute[] {
    const seen = new Set<string>();
    const out: MountedRoute[] = [];
    for (const r of app.routes) {
        const method = r.method.toUpperCase();
        if (!HTTP_METHODS.has(method)) continue;
        if (r.path.includes("*")) continue;
        const key = `${method} ${r.path}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ method, path: r.path });
    }
    out.sort((a, b) =>
        a.path === b.path ? a.method.localeCompare(b.method) : a.path.localeCompare(b.path),
    );
    return out;
}

/** Hono `:slug` → OpenAPI `{slug}`. */
export function toOpenApiPath(honoPath: string): string {
    return honoPath.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
}

function isAdminPath(oaPath: string): boolean {
    return oaPath === "/admin" || oaPath.startsWith("/admin/");
}

export function buildOpenApi(routes: MountedRoute[], version: string): unknown {
    const paths: Record<string, Record<string, unknown>> = {};
    for (const r of routes) {
        const oaPath = toOpenApiPath(r.path);
        const ops = (paths[oaPath] ??= {});
        const admin = isAdminPath(oaPath);
        ops[r.method.toLowerCase()] = {
            responses: {
                "200": { description: "Success" },
                ...(admin ? { "401": { description: "Authentication required" } } : {}),
            },
            ...(admin ? { security: [{ adminToken: [] }] } : {}),
        };
    }

    return {
        openapi: "3.1.0",
        info: {
            title: "palette-api",
            version,
            description:
                "Hono + MongoDB palette API. Errors are RFC 7807 application/problem+json with urn:contract:* type URNs. This spec is GENERATED from the mounted route registry (V·W45 item 6), so it cannot drift from the wire.",
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

function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function renderDocs(
    routes: MountedRoute[],
    version: string,
    commit: string,
): string {
    const rows = routes
        .map(
            (r) =>
                `      <tr><td class="m">${r.method}</td><td class="p">${escapeHtml(
                    r.path,
                )}</td></tr>`,
        )
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
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 0.3rem 0.5rem; border-bottom: 1px solid #8882; vertical-align: top; }
  td.m { font-weight: 600; white-space: nowrap; }
  td.p, code { font-family: ui-monospace, SFMono-Regular, monospace; }
  a { color: inherit; }
</style>
</head>
<body>
  <h1>palette-api</h1>
  <p class="sub">v${escapeHtml(version)} · commit ${escapeHtml(commit)} · generated from the mounted routes ·
     <a href="/openapi.json">openapi.json</a> · <a href="/health">health</a></p>
  <table>
    <thead><tr><th>Method</th><th>Path</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>`;
}
