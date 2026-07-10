/**
 * Client IP resolution + hashing (E.W2 Lane E — extracted from the middleware
 * god module).
 *
 * Trust model: in production the API receives connections via a local Apache
 * reverse proxy (see `api/apache-vhost.conf`). Proxy-supplied headers are only
 * honoured when the immediate peer is loopback — anything else is treated as
 * a direct, untrusted connection and the proxy headers are ignored.
 *
 * `hashIP` uses `node:crypto`'s `createHash` for consistency with `hash.ts`
 * (D.W2 Lane D F6 — D-HARDEN-3 §1 dedupe). The previous `globalThis.crypto.
 * subtle.digest` shape works in the runtime but introduces a second crypto
 * API surface for no benefit.
 */

import { createHash } from "node:crypto";
import { type Context } from "hono";

const LOOPBACK_ADDRS = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

/**
 * Resolve client IP from trusted proxy headers when the immediate peer is the
 * local reverse proxy; otherwise fall back to the direct connection address.
 * Falls back to `X-Real-IP` (set by Apache) before the raw connection IP.
 */
export function resolveIP(c: Context): string {
    const remoteAddr: string =
        c.env?.incoming?.socket?.remoteAddress ?? // @hono/node-server exposes this
        "unknown";

    if (LOOPBACK_ADDRS.has(remoteAddr)) {
        return (
            c.req.header("X-Forwarded-For")?.split(",").at(-1)?.trim() ??
            c.req.header("X-Real-IP") ??
            remoteAddr
        );
    }

    // Untrusted: ignore proxy headers, use the direct connection IP.
    return remoteAddr;
}

/** SHA-256 hash of the resolved client IP (hex-encoded). */
export async function hashIP(ip: string): Promise<string> {
    return createHash("sha256").update(ip).digest("hex");
}
