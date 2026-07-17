/**
 * The typed API-availability latch (R.W3 · the K-INV5 residual, adjudicated
 * at R.W2 §BOOKS — trigger: R.W3 dispatch).
 *
 * The functional kernel (backend-down save loses zero data) landed with
 * save-P0; what remained was the LATCH + the user-facing degraded state:
 *   - first NETWORK-level failure (fetch rejection — backend unreachable,
 *     never an HTTP status) trips the latch to `unavailable`;
 *   - while latched, transport calls short-circuit with a typed
 *     `ApiUnavailableError` instead of issuing repeated doomed requests
 *     (and re-polluting the console with CORS/network noise);
 *   - after `RETRY_COOLDOWN_MS` the next call is allowed through as the
 *     recovery probe — success flips the latch back to `available`;
 *   - `apiAvailability` is a reactive cell the save/publish surfaces read
 *     for the "backend offline — saved locally" affordance (a designed
 *     state in the instrument's register, never an apologetic toast).
 *
 * `VITE_API_URL` stays: it is idiomatic test-endpoint DI (adjudicated).
 *
 * ── S.W0 W0-1 (S-11.C) — origin-honest dev-misconfig ─────────────────────────
 * The `unavailable` latch cannot distinguish a CORS refusal from a network-down
 * at the fetch layer (browser security collapses both to a bare rejection). So
 * bare `npm run dev:web-only` on a loopback page with no `VITE_API_URL` targets
 * the cross-origin PROD api (`api.color.babb.dev`), whose CORS allow-list
 * excludes localhost → every request preflight-dies and the latch MISLABELS the
 * cause as "backend unreachable — working locally". That is the silent
 * prod-target footgun (api-broken-rootcause S-11).
 *
 * The cure is to detect the *precondition* up front — `VITE_API_URL` UNSET **and**
 * a loopback page origin **and** a cross-origin resolved BASE_URL — and enter a
 * DISTINCT, designed `misconfigured` state that fails LOUD (never the generic
 * degraded affordance). It never fires in production (prod runs on
 * `color.babb.dev`, not a loopback host) and never fires when `VITE_API_URL` is
 * set (an explicit endpoint means the operator owns the target). The honest fix
 * it names is `npm run dev` (the full local stack via `scripts/dev.sh up`).
 */

import { ref, type Ref } from "vue";

export type ApiAvailability =
    | "unknown"
    | "available"
    | "unavailable"
    | "misconfigured";

/** Reactive availability cell — read by the degraded-state affordances. */
export const apiAvailability: Ref<ApiAvailability> = ref("unknown");

/** Thrown when the latch short-circuits a call (no request was issued). */
export class ApiUnavailableError extends Error {
    override readonly name = "ApiUnavailableError";

    constructor() {
        super("Backend unreachable — working locally.");
    }
}

/** Cooldown before the latch admits a single recovery probe. */
const RETRY_COOLDOWN_MS = 30_000;

let unavailableSince = 0;

// ── Origin-honest dev-misconfig (S.W0 W0-1) ──────────────────────────────────

/** The concrete misconfig facts, retained so the loud error can name them. */
interface MisconfigDetail {
    pageOrigin: string;
    baseUrl: string;
}

let misconfigDetail: MisconfigDetail | null = null;

/** Loopback hosts a dev server binds — the pages that CORS-die against prod. */
export function isLoopbackHost(hostname: string): boolean {
    return (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1" ||
        hostname === "[::1]" ||
        hostname.endsWith(".localhost")
    );
}

/** True when `baseUrl` resolves to a different origin than the page. */
function isCrossOrigin(baseUrl: string, pageOrigin: string): boolean {
    try {
        // Absolute baseUrl ignores the base; a relative/proxied baseUrl (e.g.
        // "/api") resolves against the page origin → same-origin → honest.
        return new URL(baseUrl, pageOrigin).origin !== pageOrigin;
    } catch {
        return false;
    }
}

export interface DevMisconfigInputs {
    /** Whether `VITE_API_URL` was explicitly set (operator owns the endpoint). */
    viteApiUrlSet: boolean;
    /** The resolved API base URL the client will target. */
    baseUrl: string;
    /** The page origin the client runs in (e.g. `http://localhost:9000`). */
    pageOrigin: string;
    /** The page hostname (e.g. `localhost`). */
    pageHostname: string;
}

/**
 * The origin-honest dev-misconfig precondition (S-11.C): `VITE_API_URL` UNSET
 * **and** a loopback page **and** a cross-origin resolved BASE_URL. That triad
 * is the exact silent prod-target footgun — a loopback dev page pointed at the
 * cross-origin prod api whose CORS excludes localhost. Pure + total for testing.
 */
export function detectDevMisconfig(i: DevMisconfigInputs): boolean {
    if (i.viteApiUrlSet) return false; // explicit endpoint — not our call
    if (!isLoopbackHost(i.pageHostname)) return false; // never fires in prod
    return isCrossOrigin(i.baseUrl, i.pageOrigin);
}

/** The loud, actionable message — shared by the console warning + the error. */
export function devMisconfigMessage(detail: MisconfigDetail | null): string {
    const origin = detail?.pageOrigin ?? "this loopback page";
    const base = detail?.baseUrl ?? "the production API";
    return (
        `value.js dev is MISCONFIGURED: ${origin} has no VITE_API_URL and is ` +
        `targeting the cross-origin production API (${base}), whose CORS ` +
        `allow-list excludes localhost — every palette request will be blocked. ` +
        `Run \`npm run dev\` (the full local stack via scripts/dev.sh up) instead ` +
        `of \`npm run dev:web-only\`, or set VITE_API_URL to a reachable, ` +
        `CORS-permissive backend. This is a dev-config error, NOT "backend offline".`
    );
}

/**
 * Thrown when a transport call is short-circuited because dev is pointed at the
 * cross-origin prod api with no local backend — a designed, loud state distinct
 * from `ApiUnavailableError` (which means an actually-unreachable backend).
 */
export class DevMisconfigError extends Error {
    override readonly name = "DevMisconfigError";

    constructor() {
        super(devMisconfigMessage(misconfigDetail));
    }
}

/**
 * Resolve the dev-config truth once, at client init, BEFORE any fetch can trip
 * the latch. If the silent prod-target precondition holds, enter the designed
 * `misconfigured` state and warn LOUD. Idempotent + browser-guarded (a no-op in
 * SSR / non-DOM unit contexts). `baseUrl` is owned by the client (client.ts:35).
 */
export function initApiEnvironment(baseUrl: string): void {
    if (typeof window === "undefined") return; // SSR / non-DOM test context
    const inputs: DevMisconfigInputs = {
        viteApiUrlSet: Boolean(import.meta.env.VITE_API_URL),
        baseUrl,
        pageOrigin: window.location.origin,
        pageHostname: window.location.hostname,
    };
    if (!detectDevMisconfig(inputs)) return;
    misconfigDetail = { pageOrigin: inputs.pageOrigin, baseUrl };
    apiAvailability.value = "misconfigured";
    // Loud, dev-facing: developers live in the console. Never swallowed.
    console.error(`[value.js] ${devMisconfigMessage(misconfigDetail)}`);
}

/** Trip the latch: a network-level transport failure was observed. */
export function markApiUnreachable(): void {
    // A designed misconfig is NOT an unreachable backend — never mislabel it.
    if (apiAvailability.value === "misconfigured") return;
    unavailableSince = Date.now();
    apiAvailability.value = "unavailable";
}

/** Release the latch: a request reached the backend (any HTTP status). */
export function markApiReachable(): void {
    if (apiAvailability.value !== "available") {
        apiAvailability.value = "available";
    }
}

/**
 * Gate a transport attempt. In the designed `misconfigured` state, throw a loud
 * `DevMisconfigError` synchronously (no request is issued, the state never
 * degrades to the misleading `unavailable`). Otherwise: inside the cooldown
 * window of a tripped latch, throw `ApiUnavailableError`; past the window, let
 * ONE probe through.
 */
export function assertApiAttemptAllowed(): void {
    if (apiAvailability.value === "misconfigured") {
        throw new DevMisconfigError();
    }
    if (apiAvailability.value !== "unavailable") return;
    if (Date.now() - unavailableSince >= RETRY_COOLDOWN_MS) return;
    throw new ApiUnavailableError();
}
