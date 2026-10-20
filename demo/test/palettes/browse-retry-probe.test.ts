/**
 * X.W7.z1 · COHESION §0bt.1 (ESC-W7g2-R14-RECOVERY) — the Browse wall's Retry
 * is the latch's recovery probe.
 *
 * Before: a Retry pressed inside `RETRY_COOLDOWN_MS` (30 s) of the trip was
 * short-circuited with `ApiUnavailableError` and issued NO request, so a wall
 * whose backend had come back held its error plate (crash-battery R14 `:103`).
 * After: `admitRecoveryProbe` admits exactly the next attempt, through the same
 * branch as a scheduled probe — the one-probe law (AP-17) still holds for every
 * caller behind it.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    admitRecoveryProbe,
    ApiUnavailableError,
    apiAvailability,
    assertApiAttemptAllowed,
    markApiReachable,
    markApiUnreachable,
} from "../../platform/transport/availability";

afterEach(() => {
    markApiReachable();
    vi.useRealTimers();
});

describe("a user's Retry is admitted as the recovery probe", () => {
    it("inside the cooldown, an automatic attempt is still short-circuited", () => {
        markApiUnreachable();
        expect(() => assertApiAttemptAllowed()).toThrow(ApiUnavailableError);
    });

    it("admitRecoveryProbe lets exactly ONE attempt through, then the window re-arms", () => {
        markApiUnreachable();
        admitRecoveryProbe();
        expect(() => assertApiAttemptAllowed()).not.toThrow();
        expect(() => assertApiAttemptAllowed()).toThrow(ApiUnavailableError);
        expect(apiAvailability.value).toBe("unavailable");
    });

    it("is a no-op when the latch is not tripped", () => {
        markApiReachable();
        admitRecoveryProbe();
        expect(apiAvailability.value).toBe("available");
        expect(() => assertApiAttemptAllowed()).not.toThrow();
    });
});

// SS-8 B08 · SS8-0231 (AP U-7 / AP-17): past the cooldown, a burst of N
// callers against a hanging backend sends ONE probe, not N. The served witness
// (ap-latch: 8 callers -> 1 request) REFUTED the burst; this pins the gate
// that does it — the admitting branch re-arms the window as it admits.
describe("AP-17: the cooldown admits one probe per window, never a burst", () => {
    it("past the cooldown, 1 of 8 parallel callers is admitted and 7 are refused", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-10-20T12:00:00Z"));
        markApiUnreachable();
        vi.setSystemTime(new Date("2026-10-20T12:00:31Z"));
        const admitted = Array.from({ length: 8 }, () => {
            try {
                assertApiAttemptAllowed();
                return true;
            } catch (e) {
                expect(e).toBeInstanceOf(ApiUnavailableError);
                return false;
            }
        }).filter(Boolean).length;
        expect(admitted).toBe(1);
        expect(apiAvailability.value).toBe("unavailable");
    });
});
