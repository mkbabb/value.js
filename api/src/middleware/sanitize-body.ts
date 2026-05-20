/**
 * MongoDB operator-injection guard (E.W2 Lane E — extracted from the
 * middleware god module).
 *
 * Rejects POST / PATCH / PUT JSON bodies that contain any key beginning with
 * `$` — the marker for a MongoDB query / update operator. Without this check,
 * a payload like `{ "slug": { "$gt": "" } }` would match every document if a
 * downstream handler passed it directly into a filter. Malformed JSON is left
 * alone so downstream handlers can produce their own ValidationError.
 */

import { type MiddlewareHandler } from "hono";

/** Recursively check for keys starting with `$` in parsed JSON body. */
function hasDollarKeys(obj: unknown): boolean {
    if (obj === null || typeof obj !== "object") return false;
    if (Array.isArray(obj)) return obj.some(hasDollarKeys);
    for (const key of Object.keys(obj as Record<string, unknown>)) {
        if (key.startsWith("$")) return true;
        if (hasDollarKeys((obj as Record<string, unknown>)[key])) return true;
    }
    return false;
}

export const sanitizeBody: MiddlewareHandler = async (c, next) => {
    const method = c.req.method;
    if (method === "POST" || method === "PATCH" || method === "PUT") {
        const contentType = c.req.header("Content-Type") ?? "";
        if (contentType.includes("application/json")) {
            try {
                const body = await c.req.json();
                if (hasDollarKeys(body)) {
                    return c.json({ error: "Invalid input" }, 400);
                }
            } catch {
                // Malformed JSON — let downstream handlers deal with it.
            }
        }
    }
    await next();
};
