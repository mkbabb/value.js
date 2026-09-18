// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · SUBSTRATE INTEGRITY — the goldens' baseline is a WORKING app
 * ════════════════════════════════════════════════════════════════════════════
 *
 * This file exists because of a measured failure, not a hypothetical one.
 *
 * The first full mint of this matrix produced 205 goldens of an app in the
 * `misconfigured` state. Playwright's `webServer` had `reuseExistingServer:
 * true`, a dev server from an unrelated invocation was already on the port, and
 * `webServerPlugin` skips `env` entirely for a server it did not launch:
 *
 *     if (isAlreadyAvailable) { if (this._options.reuseExistingServer) return; }
 *
 * So `VITE_API_URL` never reached the app. That trips `detectDevMisconfig()`
 * (unset `VITE_API_URL` + loopback origin + cross-origin resolved BASE_URL),
 * lights the `misconfigured` lamp in the GLOBAL dock — i.e. in every single
 * cell — and short-circuits every transport call before a request is issued, so
 * the browse wall photographs "The commons is unreachable" where its content
 * belongs. All 205 were discarded and re-minted.
 *
 * Nothing about that failure was visible in the run: 210 tests passed. A visual
 * gate whose baseline is a broken app is green forever and measures nothing —
 * the exact disease this wave's Archaeology names, arriving through a door
 * nobody had thought to shut.
 *
 * `visual.config.ts` shuts the door (`reuseExistingServer: false`). These two
 * tests are the guard that the door STAYS shut: they assert the condition
 * itself, at the substrate, so a future config edit, a stale server or a changed
 * `.env` reds the run instead of quietly re-poisoning the baseline. They mint no
 * golden — they are preconditions for every golden that follows.
 */
import { expect, test } from "@playwright/test";

import { gotoRoute, requireQuiescence } from "./capture";

test("the dev-misconfig lamp is dark — VITE_API_URL reached the app", async ({
    page,
}) => {
    await gotoRoute(page, "/#/");

    // `resolveLampState()` renders `.dock-status-lamp[data-variant=…]`, and
    // `misconfigured` is the face that means the substrate is wrong. The
    // `unavailable` face is NOT asserted here: it is an honest degraded state
    // that `states.visual.spec.ts` deliberately photographs, and conflating the
    // two is the confusion `status-lamp.ts` was written to end.
    await expect(
        page.locator('.dock-status-lamp[data-variant="misconfigured"]'),
        "the dev-misconfig lamp is lit: this run's dev server has no VITE_API_URL, " +
            "so every golden minted against it photographs a misconfigured app. " +
            "Check that webServer.reuseExistingServer is false and that no stale " +
            "vite is holding the port.",
    ).toHaveCount(0);
});

test("no request leaves the page origin — inv-K-5 held at capture time", async ({
    page,
    baseURL,
}) => {
    const origin = new URL(baseURL!).origin;
    const foreign = new Set<string>();

    page.on("request", (request) => {
        const url = new URL(request.url());
        if (!url.protocol.startsWith("http")) return; // data:, blob:
        if (url.origin !== origin) foreign.add(url.origin + url.pathname);
    });

    // Browse is the surface that fetches: it is the one route whose content
    // comes from the palette API, so it is where a cross-origin BASE_URL shows.
    await gotoRoute(page, "/#/browse");
    await requireQuiescence(page, "substrate-integrity /#/browse");

    // Measured on a correctly-configured substrate: ZERO. The demo self-hosts
    // Fraunces (T.W2 · LS-6 struck the Google-Fonts actor), so there is no
    // legitimate third-party origin to allow, and an allowlist here would be the
    // masking fallback this wave forbids by name.
    expect(
        [...foreign],
        "a cross-origin request fired during capture. inv-K-5 (K.W2b) pins the " +
            "demo's API at the same-origin dev server precisely so no " +
            "api.color.babb.dev fetch — and no CORS failure — can perturb a golden.",
    ).toEqual([]);
});
