/**
 * T.W6 · W6-6 (T-9 re-home) — O-22's closed-form half: the STATUS LAMP
 * variant matrix + the S.W0-1 seed-rider CONTRACT VERIFICATION (R10's
 * survives column, executed as tests — the byte-preservation record's
 * runnable half; the prose record lives in the lane close artefacts).
 *
 * Two suites:
 *   1. The lamp matrix — `resolveLampState` over (availability × dev-gate):
 *      correct variant per precondition, dev-gated, misconfigured ≠
 *      unavailable (distinct variants, distinct roles).
 *   2. The S.W0-1 contract rows, asserted against the UNTOUCHED
 *      `availability.ts` (the lamp only reads the latch — these rows prove
 *      the re-home weakened nothing):
 *        - the misconfig precondition triad (`detectDevMisconfig`, pure);
 *        - the SYNCHRONOUS `DevMisconfigError` throw (`assertApiAttemptAllowed`
 *          throws, never resolves-later, never the generic unavailable error);
 *        - the loud `console.error` at `initApiEnvironment`;
 *        - misconfigured ≠ unavailable at the LATCH (`markApiUnreachable`
 *          never downgrades a designed misconfig to "backend offline").
 *
 * The e2e half (the LIVE render: first-paint band seat, the unavailable
 * variant under a real transport failure) is e2e/smoke/oracles/o22-status-lamp.spec.ts.
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import {
    apiAvailability,
    assertApiAttemptAllowed,
    detectDevMisconfig,
    DevMisconfigError,
    devMisconfigMessage,
    initApiEnvironment,
    markApiReachable,
    markApiUnreachable,
    type ApiAvailability,
} from "../demo/palettes/api/availability";
import {
    resolveLampState,
    type LampState,
} from "../demo/@/components/custom/dock/status-lamp";

afterEach(() => {
    // The latch is deliberate module state; reset between tests via its own
    // public transitions (available is the neutral resting state).
    markApiReachable();
    vi.restoreAllMocks();
});

describe("O-22 · the lamp variant matrix (resolveLampState)", () => {
    const matrix: Array<[ApiAvailability, boolean, LampState | null]> = [
        // dev: the two degraded preconditions light their OWN faces
        [
            "misconfigured",
            true,
            {
                variant: "misconfigured",
                role: "alert",
                label: "dev misconfigured — run `npm run dev`",
            },
        ],
        [
            "unavailable",
            true,
            {
                variant: "unavailable",
                role: "status",
                label: "backend offline — saved locally",
            },
        ],
        // dev: a healthy band carries no lamp
        ["unknown", true, null],
        ["available", true, null],
        // prod: dev-gated — the lamp ships dark for EVERY state
        ["misconfigured", false, null],
        ["unavailable", false, null],
        ["unknown", false, null],
        ["available", false, null],
    ];

    it.each(matrix)(
        "availability=%s isDev=%s → the correct face",
        (availability, isDev, expected) => {
            expect(resolveLampState(availability, isDev)).toEqual(expected);
        },
    );

    it("misconfigured ≠ unavailable — distinct variants AND distinct roles", () => {
        const mis = resolveLampState("misconfigured", true)!;
        const off = resolveLampState("unavailable", true)!;
        expect(mis.variant).not.toBe(off.variant);
        expect(mis.role).toBe("alert"); // the loud dev-config error
        expect(off.role).toBe("status"); // the quiet honest degradation
    });
});

describe("S.W0-1 seed-rider contract (byte-preserved under the W6-6 re-home)", () => {
    it("the misconfig precondition triad holds (detectDevMisconfig, pure)", () => {
        const base = {
            viteApiUrlSet: false,
            baseUrl: "https://api.color.babb.dev",
            pageOrigin: "http://localhost:9000",
            pageHostname: "localhost",
        };
        // The exact silent prod-target footgun fires…
        expect(detectDevMisconfig(base)).toBe(true);
        // …and each leg of the triad independently disarms it.
        expect(detectDevMisconfig({ ...base, viteApiUrlSet: true })).toBe(false);
        expect(
            detectDevMisconfig({
                ...base,
                pageOrigin: "https://color.babb.dev",
                pageHostname: "color.babb.dev",
            }),
        ).toBe(false);
        expect(
            detectDevMisconfig({ ...base, baseUrl: "http://localhost:9000/api" }),
        ).toBe(false);
    });

    it("misconfigured throws a SYNCHRONOUS DevMisconfigError at the transport gate", () => {
        apiAvailability.value = "misconfigured";
        // Synchronous: the throw happens inside the call frame — no request,
        // no promise, no later rejection.
        expect(() => assertApiAttemptAllowed()).toThrowError(DevMisconfigError);
        expect(() => assertApiAttemptAllowed()).toThrowError(
            /MISCONFIGURED|misconfigured/i,
        );
    });

    it("misconfigured ≠ unavailable at the latch — a transport failure never relabels it", () => {
        apiAvailability.value = "misconfigured";
        markApiUnreachable();
        expect(apiAvailability.value).toBe("misconfigured");
        // …and the error thrown stays the designed one, never ApiUnavailableError.
        expect(() => assertApiAttemptAllowed()).toThrowError(DevMisconfigError);
    });

    it("initApiEnvironment logs the LOUD console.error and latches misconfigured", () => {
        const consoleError = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});
        apiAvailability.value = "unknown";
        // jsdom's origin is loopback (http://localhost:3000) and vitest sets no
        // VITE_API_URL — the cross-origin prod base completes the triad.
        initApiEnvironment("https://api.color.babb.dev");
        expect(apiAvailability.value).toBe("misconfigured");
        expect(consoleError).toHaveBeenCalledTimes(1);
        const [message] = consoleError.mock.calls[0];
        expect(String(message)).toContain("MISCONFIGURED");
        expect(String(message)).toContain("npm run dev");
    });

    it("the loud message names the fix, the cause, and the non-conflation", () => {
        const msg = devMisconfigMessage(null);
        expect(msg).toMatch(/npm run dev/);
        expect(msg).toMatch(/VITE_API_URL/);
        expect(msg).toMatch(/NOT "backend offline"/);
    });
});
