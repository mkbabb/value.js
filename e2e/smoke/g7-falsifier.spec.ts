import { test, expect } from "@playwright/test";

/**
 * SERVED MODEL: claude-opus-5[1m]
 *
 * X-W1 · G-7 — THE FALSIFIER, and nothing else.
 *
 * This file exists on the scratch branch `x-w1-falsifier-g7` ONLY. It is a
 * deliberately broken spec whose single job is to prove that the `e2e-smoke`
 * job introduced at X-W1 actually turns the run red.
 *
 * W1.md G-7: *"a deliberately broken spec on a scratch branch turns the e2e job
 * red; the run URL is committed… This gate IS the falsifier. It fails by the
 * scratch run going green — which would prove the jobs are decorative."*
 *
 * The two mechanisms that waived this gate three times before are forbidden by
 * name in `ci.yml`'s header: D48's `continue-on-error`, D55(iv)'s branch-push
 * substitution. Neither is used here — the branch push is the DEMONSTRATION
 * vehicle for G-7, not a substitute for running the suite on the real push.
 *
 * The failure carries a unique token so the job log can be searched for THIS
 * failure rather than for the ten product reds the suite already carries.
 */
const G7_TOKEN = "G7-FALSIFIER-CANARY-2026-09-18";

test("G-7 falsifier: this assertion is false on purpose", async () => {
    expect(
        G7_TOKEN,
        `${G7_TOKEN}: if this test passes, the e2e-smoke job is decorative`,
    ).toBe("this string is deliberately not the token");
});
