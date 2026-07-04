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
 */

import { ref, type Ref } from "vue";

export type ApiAvailability = "unknown" | "available" | "unavailable";

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

/** Trip the latch: a network-level transport failure was observed. */
export function markApiUnreachable(): void {
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
 * Gate a transport attempt. Inside the cooldown window of a tripped latch,
 * throws `ApiUnavailableError` synchronously (the no-repeated-doomed-requests
 * clause); past the window, lets ONE probe through.
 */
export function assertApiAttemptAllowed(): void {
    if (apiAvailability.value !== "unavailable") return;
    if (Date.now() - unavailableSince >= RETRY_COOLDOWN_MS) return;
    throw new ApiUnavailableError();
}
