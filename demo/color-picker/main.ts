/**
 * main — THE COMPOSITION ROOT (X.W5.a · gate A1; App C-1 · L-1 · MT-APP-1).
 *
 * What a composition root owns, and what App.vue owned until this unit: the
 * module entry, the app instance, the router install, the app-level provides,
 * the stylesheet cascade, the error net, and the ONE decision about WHEN to
 * mount. `c4af0ef9` created this file and moved the production entry; it did
 * not land any of the six below, so App carried five undeclared boot contracts
 * inside a component's setup — where "before the Dock mounts" was the only
 * ordering anyone could state, and the cascade order was an accident of import
 * position in a template file.
 *
 * THE CSS CASCADE ORDER IS LOAD-BEARING and travels here intact:
 *   utils → foundation → focus-ring → overture.
 * `focus-ring.css` defines the `--focus-ring-inner/-outer` recipe every
 * keyboard-operable control composes, and is imported AFTER foundation so a
 * later owner override there wins. `overture.css` is the boot chain's own
 * one-clock grammar sheet; App L-9's "move it out of boot/" is STRUCK — the
 * colocation is a documented, rationale-bearing choice, and only the IMPORT
 * rides here, preserving the order the former in-SFC blocks had (T.W2-3).
 */
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { API_CLIENT_KEY, createApiClient } from "../platform/transport/useApiClient";
import { initApiEnvironment } from "../platform/transport/availability";
import { BASE_URL } from "../platform/transport/client";

import "../styles/utils.css";
import "../styles/foundation.css";
import "../styles/focus-ring.css";
import "./composables/boot/overture.css";

const app = createApp(App);
app.use(router);

// --- Dark mode: the global store is constructed BEFORE the first render, so
//     the user's saved preference is in force by the time any surface paints
//     (it was previously constructed inside App's setup for the same reason —
//     the reason is real, the seat was not). `useGlobalDark` is a
//     `createGlobalState` singleton: it owns its own effect scope and needs no
//     component instance. ---
useGlobalDark();

// --- API transport (S.W2 W2-4): ONE client for {request, adminRequest,
//     sessionToken, availability}, provided at APP level rather than from a
//     component's setup — every consumer, including App itself, now injects
//     the same instance under the same key. `initApiEnvironment` resolves the
//     dev-config truth here (X.W3.7 · AP-24: it must run once, explicitly,
//     strictly before any surface can issue a request) and carries its own
//     idempotence guard. ---
initApiEnvironment(BASE_URL);
app.provide(API_CLIENT_KEY, createApiClient());

// --- THE ERROR NET (X.W5.a · gates N4/N5, fold W5F-54 / ⟨ErrorBoundary EB-3⟩) ---
// The pane boundaries OWN their failures and stop propagation, which is the
// correct call for an owning boundary — but until this unit nothing above them
// existed at all: no `errorHandler`, no `unhandledrejection`, no `window.error`.
// A throw outside a boundary's subtree (the dock band, the atmosphere canvas,
// a portalled dialog) and every rejected promise in the app went to the same
// place: nowhere. These three are the app's reporting floor. They report; they
// do not recover — recovery belongs to the boundary that owns the subtree.
function reportFailure(channel: string, thrown: unknown, info?: string): void {
    console.error(
        `[value.js] unhandled failure (${channel}${info ? ` · ${info}` : ""})`,
        thrown,
    );
}

app.config.errorHandler = (thrown, _instance, info) =>
    reportFailure("vue", thrown, info);

if (typeof window !== "undefined") {
    window.addEventListener("error", (event) =>
        reportFailure("window.error", event.error ?? event.message),
    );
    window.addEventListener("unhandledrejection", (event) =>
        reportFailure("unhandledrejection", event.reason),
    );
}

// --- THE ROUTE-TRUE MOUNT (gate A1) ---
// The app mounted BEFORE the router had resolved its initial navigation, so
// the first render answered a question the address bar had not yet asked:
// `useViewManager` seeded the wrong pane, PaneSlot's one-rAF commit swapped the
// child out from under the `appear` transition, and the plate-settlement report
// that gates the overture's B3 beat never fired — terminal for the session on
// ten of the fourteen routes. Awaiting `isReady()` makes the first render the
// TRUE route's render. It is wrapped in an async IIFE rather than written as a
// top-level await so the entry needs no build-target concession.
void (async () => {
    await router.isReady();
    app.mount("#app");
})();
