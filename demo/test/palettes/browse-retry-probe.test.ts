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
import { afterEach, describe, expect, it } from "vitest";
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
