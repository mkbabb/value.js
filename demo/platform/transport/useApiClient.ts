/**
 * useApiClient — the demo's ONE api-transport DI seam (S.W2 W2-4).
 *
 * Collapses the three palette-api module singletons — the `request` /
 * `adminRequest` transport, the `sessionToken` cell, and the `apiAvailability`
 * latch — behind a single provide/inject key, the SAME idiomatic Vue seam
 * color-state already uses (`CSS_COLOR_KEY`, `SAFE_ACCENT_KEY`, …). Provided
 * once at App root via `provideApiClient()`; injected by the surfaces that read
 * the availability latch (`ApiStatusChip`, `PaletteCardMenu`) instead of
 * hard-importing the module global. No framework invention — a plain object
 * under an `InjectionKey` (KISS; `feedback_kiss_no_contrivance`).
 *
 * The module functions remain the single source of truth: the api sub-modules
 * call `request` / `adminRequest` directly, and the auth composables drive the
 * token via `setSessionToken`. This seam re-exposes that state reactively so
 * consumers depend on the provided client, not a hidden module import.
 *
 * X.W3.7 · AP-29 — the seam also carried a `baseUrl: string` member that no
 * consumer read; its sole "consumer" was a comment. Deleted, so the object is
 * exactly the three singletons its own first paragraph names.
 *
 * X.W11.api (§0eh limb (a)) — the seam gains the palette-service failure state
 * (`serviceProblem`) and its Retry registry (`onServiceRetry`); the failure
 * toast itself is raised here, by `reportServiceProblem`, below.
 */
import { h, inject, provide, ref, type InjectionKey, type Ref } from "vue";
import { toast, ToastAction, type ToastHandle } from "@mkbabb/glass-ui/toast";
import { request, adminRequest, sessionTokenRef, BASE_URL } from "./client.js";
import {
    admitRecoveryProbe,
    apiAvailability,
    initApiEnvironment,
    type ApiAvailability,
} from "./availability.js";
import type { ApiProblem } from "./api-problem.js";

// ── X.W11.api (COHESION §0eh limb (a)) — the service failure, said once ──────
// The palette service failed silently for ~6 weeks behind an expired
// certificate. A request module that classifies a SERVICE failure
// (`ApiProblem#isServiceFailure`: network/TLS, 5xx, malformed body) reports it
// here; this seam tells the person with glass's own toast (the one `Toaster`
// App.vue mounts) and holds the problem reactively for the surfaces that must
// word their empty state by it (Browse: "couldn't reach" ≠ "no palettes").

/** The service failure in effect, or `null` once a palette request succeeds. */
export const serviceProblem: Ref<ApiProblem | null> = ref(null);

/** How long one failure toast stands — and the burst it absorbs. */
const SERVICE_TOAST_MS = 10_000;

/** The toast of the current burst: later failures inside it update, never stack. */
let burst: { handle: ToastHandle; until: number } | null = null;

/** Surfaces that re-load their remote data when the person presses Retry. */
const retryHandlers = new Set<() => unknown>();

/**
 * Register a reload for the toast's Retry while a surface shows remote data.
 * Returns the unregister function (call it on unmount).
 */
export function onServiceRetry(reload: () => unknown): () => void {
    retryHandlers.add(reload);
    return () => {
        retryHandlers.delete(reload);
    };
}

/**
 * The toast's Retry: a person asking for one request now. It closes the
 * burst's toast, admits the latch's recovery probe (never refused by the
 * automatic cooldown — `admitRecoveryProbe`), and re-runs every registered
 * reload; a reload that fails again reports again and opens a fresh toast.
 */
function retryService(): void {
    burst?.handle.dismiss();
    burst = null;
    admitRecoveryProbe();
    for (const reload of retryHandlers) reload();
}

/**
 * Report a palette-service failure: one glass toast per burst, naming the
 * failure, with a Retry action. Reports inside a standing toast's window
 * update that toast's line instead of stacking another.
 */
export function reportServiceProblem(problem: ApiProblem): void {
    serviceProblem.value = problem;
    const options = {
        title: "Couldn't reach the palette service",
        description: problem.summary,
        tone: "destructive" as const,
        duration: SERVICE_TOAST_MS,
        action: h(
            ToastAction,
            { altText: "Retry the palette service", onClick: retryService },
            () => "Retry",
        ),
    };
    const now = Date.now();
    if (burst && now < burst.until) {
        burst.handle.update(options);
        return;
    }
    burst = { handle: toast(options), until: now + SERVICE_TOAST_MS };
}

/** A palette request succeeded: the service is serving again. */
export function clearServiceProblem(): void {
    serviceProblem.value = null;
}

export interface ApiClient {
    request: typeof request;
    adminRequest: typeof adminRequest;
    /** The live session-token cell (mutated app-side via `setSessionToken`). */
    sessionToken: Ref<string | null>;
    /** The reactive availability latch — read by the degraded-state affordances. */
    availability: Ref<ApiAvailability>;
    /** The palette-service failure in effect (X.W11.api), `null` while serving. */
    serviceProblem: Ref<ApiProblem | null>;
    /** Register a surface's reload for the failure toast's Retry. */
    onServiceRetry: typeof onServiceRetry;
}

export const API_CLIENT_KEY: InjectionKey<ApiClient> = Symbol("api-client");

/** Build the client object over the shared module state. */
export function createApiClient(): ApiClient {
    return {
        request,
        adminRequest,
        sessionToken: sessionTokenRef,
        availability: apiAvailability,
        serviceProblem,
        onServiceRetry,
    };
}

/**
 * Provide the api client at App root. Returns it for the provider's own use.
 *
 * X.W3.7 · AP-24 — this is also where the dev-config truth is resolved. It used
 * to run at `client.ts`'s module eval, so importing the transport module for
 * ANY reason mutated global state and could `console.error`; the App-root
 * provider is the explicit seat, called once, strictly before any surface can
 * issue a request. `initApiEnvironment` carries its own idempotence guard
 * (AP-33, landed first), so a second provider — a test harness, a second app
 * instance — re-latches and re-shouts nothing.
 */
export function provideApiClient(): ApiClient {
    initApiEnvironment(BASE_URL);
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
