/**
 * Meta router — the constellation operator/consumer surface (N.W4.D):
 *
 *   GET /health       — liveness + REAL readiness: Mongo reachable AND a primary
 *                       is elected (V·W45 item 5). The deploy-hook health-gate
 *                       polls this for `{"status":"ok"}`; a Mongo outage OR a
 *                       primary-less replica set flips it to 503 so the gate
 *                       rolls the deploy back.
 *   GET /docs         — a human-legible HTML index of every mounted route.
 *   GET /openapi.json — an OpenAPI 3.1 machine spec, GENERATED from the mounted
 *                       typed route registry (V·W45 item 6) so it cannot drift
 *                       from the wire.
 *
 * `/docs` + `/openapi.json` are generated from the app's live route registry,
 * injected as a thunk by the composition root (`app.ts`) — there is no
 * hand-kept route table to fall out of sync (the retired `route-table.ts`).
 */

import { Hono } from "hono";
import type { AppEnv } from "../../types.js";
import { getDb } from "../../platform/db/db.js";
import {
    buildOpenApi,
    collectMountedRoutes,
    renderDocs,
    type RouteRegistry,
} from "./openapi.js";

/**
 * The deployed code lineage. `DEPLOY_COMMIT_SHA` is threaded by the deploy-hook
 * (`docker compose ... -e DEPLOY_COMMIT_SHA=...`); absent in local/dev it reads
 * `"dev"`. The api package version is the static contract version.
 */
const API_VERSION = "2.0.0";
const COMMIT_SHA = process.env.DEPLOY_COMMIT_SHA ?? "dev";

// --- Readiness -------------------------------------------------------------

export interface HealthChecks {
    mongo: "ok" | "down";
    /** A writable primary is elected (readiness, not mere reachability). */
    primary: boolean;
}

/**
 * Probe real readiness: Mongo reachable AND a writable primary elected. A bare
 * `ping` only proves reachability — a replica set mid-election answers `ping`
 * while refusing writes; `hello.isWritablePrimary` is the readiness truth.
 */
export async function probeReadiness(): Promise<HealthChecks> {
    try {
        const db = await getDb();
        const hello = (await db.admin().command({ hello: 1 })) as {
            isWritablePrimary?: boolean;
            ismaster?: boolean;
        };
        const primary = hello.isWritablePrimary === true || hello.ismaster === true;
        return { mongo: "ok", primary };
    } catch {
        return { mongo: "down", primary: false };
    }
}

/**
 * Pure health-envelope builder. Ready iff Mongo is reachable AND a primary is
 * elected; otherwise `degraded` + 503 (so a not-ready dependency fails the
 * gate). Kept pure so the not-ready path is unit-testable without a downed DB.
 */
export function buildHealthBody(
    checks: HealthChecks,
    meta: { version: string; commit: string; uptime: number },
): { status: 200 | 503; body: Record<string, unknown> } {
    const ready = checks.mongo === "ok" && checks.primary;
    return {
        status: ready ? 200 : 503,
        body: {
            status: ready ? "ok" : "degraded",
            service: "palette-api",
            version: meta.version,
            commit: meta.commit,
            checks,
            uptime: meta.uptime,
        },
    };
}

/**
 * Build the meta router. `getRegistry` yields the live app route registry
 * (injected by the composition root) — `/docs` + `/openapi.json` derive from it
 * at request time, when every route is mounted.
 */
export function createMeta(getRegistry: () => RouteRegistry): Hono<AppEnv> {
    const meta = new Hono<AppEnv>();

    meta.get("/health", async (c) => {
        const checks = await probeReadiness();
        const { status, body } = buildHealthBody(checks, {
            version: API_VERSION,
            commit: COMMIT_SHA,
            uptime: Math.round(process.uptime()),
        });
        return c.json(body, status);
    });

    meta.get("/docs", (c) => {
        const routes = collectMountedRoutes(getRegistry());
        return c.html(renderDocs(routes, API_VERSION, COMMIT_SHA));
    });

    meta.get("/openapi.json", (c) => {
        const routes = collectMountedRoutes(getRegistry());
        return c.json(buildOpenApi(routes, API_VERSION) as object);
    });

    return meta;
}
