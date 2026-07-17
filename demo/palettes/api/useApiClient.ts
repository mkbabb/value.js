/**
 * useApiClient — the demo's ONE api-transport DI seam (S.W2 W2-4).
 *
 * Collapses the three palette-api module singletons — the `request` /
 * `adminRequest` transport, the `sessionToken` cell, and the `apiAvailability`
 * latch — behind a single provide/inject key, the SAME idiomatic Vue seam
 * color-state already uses (`CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`, …). Provided
 * once at App root via `provideApiClient()`; injected by the surfaces that read
 * the availability latch (`ApiOfflineChip`, `PaletteCardMenu`) instead of
 * hard-importing the module global. No framework invention — a plain object
 * under an `InjectionKey` (KISS; `feedback_kiss_no_contrivance`).
 *
 * The module functions remain the single source of truth: the api sub-modules
 * call `request` / `adminRequest` directly, and the auth composables drive the
 * token via `setSessionToken`. This seam re-exposes that state reactively so
 * consumers depend on the provided client, not a hidden module import.
 */
import { inject, provide, type InjectionKey, type Ref } from "vue";
import { request, adminRequest, sessionTokenRef, BASE_URL } from "./client.js";
import { apiAvailability, type ApiAvailability } from "./availability.js";

export interface ApiClient {
    request: typeof request;
    adminRequest: typeof adminRequest;
    /** The live session-token cell (mutated app-side via `setSessionToken`). */
    sessionToken: Ref<string | null>;
    /** The reactive availability latch — read by the degraded-state affordances. */
    availability: Ref<ApiAvailability>;
    /** The resolved API base URL (frozen at client init). */
    baseUrl: string;
}

export const API_CLIENT_KEY: InjectionKey<ApiClient> = Symbol("api-client");

/** Build the client object over the shared module state. */
export function createApiClient(): ApiClient {
    return {
        request,
        adminRequest,
        sessionToken: sessionTokenRef,
        availability: apiAvailability,
        baseUrl: BASE_URL,
    };
}

/** Provide the api client at App root. Returns it for the provider's own use. */
export function provideApiClient(): ApiClient {
    const client = createApiClient();
    provide(API_CLIENT_KEY, client);
    return client;
}

/** Inject the provided api client. Throws if no provider stands above. */
export function useApiClient(): ApiClient {
    const client = inject(API_CLIENT_KEY);
    if (!client) {
        throw new Error(
            "useApiClient() requires an API_CLIENT_KEY provider — call provideApiClient() at App root.",
        );
    }
    return client;
}
