/**
 * CORS header construction (E.W2 Lane E — extracted from the middleware god
 * module).
 *
 * Allow-list policy:
 *   - Empty `ALLOWED_ORIGINS` env var → reflect the request origin (open CORS,
 *     suitable for local dev).
 *   - Non-empty allow-list → reflect only matching origins; otherwise fall back
 *     to the first allowed origin (so the browser still gets a valid header
 *     but the response is unusable cross-origin from a disallowed source).
 *
 * Consumed by `api/src/index.ts`: the preflight handler returns 204 with these
 * headers, and the global response-header middleware copies them onto every
 * outgoing response.
 */

const ALLOWED_ORIGINS = new Set(
    (process.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
);

export function corsHeaders(requestOrigin?: string): Record<string, string> {
    const origin =
        ALLOWED_ORIGINS.size === 0
            ? (requestOrigin ?? "*")
            : requestOrigin && ALLOWED_ORIGINS.has(requestOrigin)
              ? requestOrigin
              : (ALLOWED_ORIGINS.values().next().value ?? "");
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Session-Token, Authorization",
        "Access-Control-Allow-Credentials": "true",
    };
}
