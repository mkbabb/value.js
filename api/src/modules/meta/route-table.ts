/**
 * The SHIPPED route table — the single source of truth `/docs` and
 * `/openapi.json` both render (N.W4.D). Hand-kept faithful to `src/routes/**`
 * (a reviewer checks this table against the routers; it carries no behaviour,
 * so it cannot diverge from the wire at runtime — only from the source, which
 * review catches). `auth` is the strongest gate a request must pass:
 *   - "none"    — public.
 *   - "session" — requires a resolved `X-Session-Token` (+ ownership where the
 *                 handler additionally calls `requireOwnership`, noted in the
 *                 summary).
 *   - "admin"   — requires `Authorization: Bearer {ADMIN_TOKEN}`.
 */

export interface RouteDef {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    path: string;
    auth: "none" | "session" | "admin";
    group: string;
    summary: string;
}

export const ROUTES: readonly RouteDef[] = [
    // --- Meta ---
    { method: "GET", path: "/", auth: "none", group: "Meta", summary: "Service liveness sentinel" },
    { method: "GET", path: "/health", auth: "none", group: "Meta", summary: "Liveness + mongo ping + version/lineage stamp" },
    { method: "GET", path: "/docs", auth: "none", group: "Meta", summary: "This human routes index" },
    { method: "GET", path: "/openapi.json", auth: "none", group: "Meta", summary: "OpenAPI 3.1 machine spec" },

    // --- Sessions ---
    { method: "POST", path: "/sessions", auth: "none", group: "Sessions", summary: "Register (creates user + session)" },
    { method: "POST", path: "/sessions/login", auth: "none", group: "Sessions", summary: "Log in with an existing slug" },
    { method: "GET", path: "/sessions/me", auth: "session", group: "Sessions", summary: "Current user info" },
    { method: "DELETE", path: "/sessions", auth: "session", group: "Sessions", summary: "Log out (delete session token)" },

    // --- Palettes ---
    { method: "GET", path: "/palettes", auth: "none", group: "Palettes", summary: "List (cursor/offset; sort + color-distance filter)" },
    { method: "GET", path: "/palettes/mine", auth: "session", group: "Palettes", summary: "List my palettes" },
    { method: "GET", path: "/palettes/:slug", auth: "none", group: "Palettes", summary: "Get by slug (emits ETag)" },
    { method: "POST", path: "/palettes", auth: "session", group: "Palettes", summary: "Create palette" },
    { method: "PATCH", path: "/palettes/:slug", auth: "session", group: "Palettes", summary: "Edit palette (owner; If-Match required)" },
    { method: "DELETE", path: "/palettes/:slug", auth: "session", group: "Palettes", summary: "Soft-delete palette (owner)" },
    { method: "POST", path: "/palettes/:slug/vote", auth: "session", group: "Palettes", summary: "Toggle vote (idempotent)" },
    { method: "POST", path: "/palettes/:slug/flag", auth: "session", group: "Palettes", summary: "Flag for moderation" },
    { method: "POST", path: "/palettes/:slug/fork", auth: "session", group: "Palettes", summary: "Fork (cross-collection write)" },
    { method: "GET", path: "/palettes/:slug/forks", auth: "none", group: "Palettes", summary: "List direct forks" },
    { method: "GET", path: "/palettes/:slug/provenance", auth: "none", group: "Palettes", summary: "Ancestry chain (≤50 depth)" },
    { method: "GET", path: "/palettes/:slug/versions", auth: "none", group: "Palettes", summary: "List versions" },
    { method: "GET", path: "/palettes/:slug/versions/:hash", auth: "none", group: "Palettes", summary: "Get a specific version" },
    { method: "POST", path: "/palettes/:slug/revert", auth: "session", group: "Palettes", summary: "Revert to a prior version (owner)" },
    { method: "POST", path: "/palettes/:slug/publish", auth: "session", group: "Palettes", summary: "Publish (owner; idempotent flip)" },
    { method: "POST", path: "/palettes/:slug/unpublish", auth: "session", group: "Palettes", summary: "Unpublish (owner; idempotent flip)" },

    // --- Colors ---
    { method: "GET", path: "/colors/approved", auth: "none", group: "Colors", summary: "List approved color names" },
    { method: "GET", path: "/colors/search", auth: "none", group: "Colors", summary: "Search approved color names" },
    { method: "GET", path: "/colors/tags", auth: "none", group: "Colors", summary: "List color tags" },
    { method: "POST", path: "/colors/propose", auth: "session", group: "Colors", summary: "Propose a color name" },

    // --- Admin (all require Authorization: Bearer {ADMIN_TOKEN}) ---
    { method: "GET", path: "/admin/audit", auth: "admin", group: "Admin", summary: "List audit-log entries" },
    { method: "GET", path: "/admin/queue", auth: "admin", group: "Admin", summary: "List pending color-name proposals" },
    { method: "GET", path: "/admin/colors/approved", auth: "admin", group: "Admin", summary: "List approved color names" },
    { method: "DELETE", path: "/admin/colors/:id", auth: "admin", group: "Admin", summary: "Delete color name" },
    { method: "POST", path: "/admin/colors/:id/approve", auth: "admin", group: "Admin", summary: "Approve color name" },
    { method: "POST", path: "/admin/colors/:id/reject", auth: "admin", group: "Admin", summary: "Reject color name" },
    { method: "POST", path: "/admin/palettes/:slug/feature", auth: "admin", group: "Admin", summary: "Toggle featured status" },
    { method: "DELETE", path: "/admin/palettes/:slug", auth: "admin", group: "Admin", summary: "Delete palette + votes" },
    { method: "GET", path: "/admin/users", auth: "admin", group: "Admin", summary: "List users" },
    { method: "POST", path: "/admin/users/prune-empty", auth: "admin", group: "Admin", summary: "Prune users with 0 palettes" },
    { method: "GET", path: "/admin/users/:slug/palettes", auth: "admin", group: "Admin", summary: "List a user's palettes" },
    { method: "POST", path: "/admin/users/:slug/status", auth: "admin", group: "Admin", summary: "Suspend / unsuspend user" },
    { method: "DELETE", path: "/admin/users/:slug", auth: "admin", group: "Admin", summary: "Delete user + all data" },
    { method: "DELETE", path: "/admin/users/:slug/palettes", auth: "admin", group: "Admin", summary: "Delete a user's palettes" },
    { method: "POST", path: "/admin/users/:slug/import", auth: "admin", group: "Admin", summary: "Import palettes to user" },
    { method: "POST", path: "/admin/impersonate", auth: "admin", group: "Admin", summary: "Create a session as a user" },
    { method: "GET", path: "/admin/tags", auth: "admin", group: "Admin", summary: "List tags" },
    { method: "POST", path: "/admin/tags", auth: "admin", group: "Admin", summary: "Create tag" },
    { method: "DELETE", path: "/admin/tags/:name", auth: "admin", group: "Admin", summary: "Delete tag" },
    { method: "GET", path: "/admin/flagged", auth: "admin", group: "Admin", summary: "List flagged palettes" },
    { method: "DELETE", path: "/admin/flags/:paletteSlug", auth: "admin", group: "Admin", summary: "Dismiss flags for a palette" },
    { method: "POST", path: "/admin/batch/palettes", auth: "admin", group: "Admin", summary: "Batch palette operation" },
    { method: "POST", path: "/admin/batch/users", auth: "admin", group: "Admin", summary: "Batch user operation" },
] as const;
