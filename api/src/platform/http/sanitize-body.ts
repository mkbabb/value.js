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
import { ValidationError } from "./errors/index.js";

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
            // Parse inside the try so ONLY a malformed-JSON error is caught
            // (that path is downstream zod's job, befitting-keep). The $-key
            // detection + throw runs after the try so the catch can never
            // swallow the ValidationError we raise on injection.
            let body: unknown;
            let parsed = false;
            try {
                body = await c.req.json();
                parsed = true;
            } catch {
                // Malformed JSON — let downstream handlers deal with it.
            }
            if (parsed && hasDollarKeys(body)) {
                throw new ValidationError("Invalid input");
            }
        }
    }
    await next();
};
