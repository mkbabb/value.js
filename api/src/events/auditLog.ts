/**
 * `emitAuditEvent` — the SINGLE canonical entry-point for admin-audit
 * writes (D.W2 Lane C #4 + Lane D W3 carve-out per D-HARDEN-3 §3).
 *
 * **Befitting-graceful carve-out (D3)**: audit-log writes do NOT fail the
 * originating request. The request is real and shouldn't be undone by an
 * audit-log infrastructure hiccup — this is the documented "befitting
 * graceful" disposition invariant D3 permits. The failure path is an
 * explicit structured `console.error` (operator-visible) NOT a silent swallow.
 *
 * Lane B's admin-route refactor calls this exclusively; the per-route
 * `try { await audit(...) } catch {}` shim deletes.
 */

import type { Context } from "hono";
import type { AppEnv } from "../types.js";

export interface AuditEmitOptions {
    /** Free-form structured payload. */
    payload?: Record<string, unknown>;
    /** Optional human-readable target — e.g. "slug=foo", "id=abc". */
    target?: string;
    /** Optional IP hash (admin middleware can pre-compute). */
    ipHash?: string;
}

export async function emitAuditEvent(
    c: Context<AppEnv>,
    action: string,
    options: AuditEmitOptions = {},
): Promise<void> {
    const services = c.var.services;
    const actorSlug = c.var.userSlug ?? null;

    try {
        await services.repositories.adminAudit.insert({
            action,
            actorSlug,
            timestamp: new Date(),
            ...(options.payload !== undefined ? { payload: options.payload } : {}),
            ...(options.target !== undefined ? { target: options.target } : {}),
            ...(options.ipHash !== undefined ? { ipHash: options.ipHash } : {}),
        });
    } catch (err) {
        // Befitting graceful per D3 + D-HARDEN-3 §3 W3 carve-out:
        // audit-log writes do NOT fail the originating request (the
        // request is real and shouldn't be undone by an audit-log
        // infrastructure hiccup). Explicit logger.error with structured
        // context — NOT a silent swallow.
        console.error("[audit-log] emit failed", {
            action,
            actorSlug,
            target: options.target,
            error: err instanceof Error ? err.message : String(err),
        });
    }
}
