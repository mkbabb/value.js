import { test, expect } from "@playwright/test";

/**
 * T.W0 W0-5 · O-16 — COMPUTED-CASCADE CENSUS (SYNTHESIS §6.1 O-16; §1.2 T-14).
 *
 * The ONLY oracle class that catches a DIST CLOBBER: token-level checks stay
 * green through it because the DECLARED token file is fine — the regression is a
 * later-cascade rule (glass-ui's shipped `components.css` ships Tailwind's
 * `:root { --default-transition-duration: 150ms }`; the ~46 interactive sites
 * that use the bare `transition` utility resolve to that dead 150ms instead of a
 * house liquid curve — t-transitions-liquid F1). So the census reads the
 * COMPUTED transition off live surfaces, not the declarations.
 *
 * ── R1 ROW BORN-RED (EXPECTED-RED, PKT-1 cite; T.W0.md §BOOKS): the `:root
 *    --default-transition-duration: 150ms` clobber is PRODUCER-ROOT (glass-ui
 *    dist, VERIFIED present). It goes live-green the day PKT-1 (P2) lands the
 *    dist fix. `test.fail()` records the honest EXPECTED-RED and is the tripwire
 *    that flips when PKT-1 lands. NOT softened — the computed read is real and
 *    the clobber is real. The explicitly-styled card surfaces already compute
 *    the liquid 0.3s curves (recorded below) — so the census also proves the
 *    house tokens are RIGHT and it is only the cascade DEFAULT that is dead.
 *
 * ── CURE: PKT-1 (P2 — the PKT-1 P0 clobber) at W5 (T-14, W5-1..3); O-16 arms
 *    fully at W5 (the full house-token congruence census, both schemes).
 */

const CLOBBER = "150ms"; // the dead :root --default-transition-duration (raw custom-prop value)

test("O-16 computed-cascade — the dist :root 150ms transition-default clobber is not live", async ({
    page,
}) => {
    // R1 EXPECTED-RED (PKT-1 producer-root). Remove test.fail when P2 lands the
    // dist fix and the cascade default clears. See the file docstring.
    test.fail();
    test.setTimeout(30_000);

    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // The clobber SOURCE: the cascade default the ~46 dead sites resolve to.
    const defaultDur = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
            .getPropertyValue("--default-transition-duration")
            .trim(),
    );
    console.log(`[O-16] :root --default-transition-duration = ${defaultDur}`);

    // The MANIFESTATION census: every card surface's computed transition (proves
    // the house tokens are the liquid curves, not the default).
    const cards = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-slot="card"]')).map((el) => {
            const cs = getComputedStyle(el as HTMLElement);
            return {
                surface: (el as HTMLElement).dataset.surface ?? "(none)",
                duration: cs.transitionDuration,
                timing: cs.transitionTimingFunction,
            };
        }),
    );
    for (const c of cards) {
        console.log(
            `[O-16] card surface=${c.surface} dur=${c.duration} timing=${c.timing}`,
        );
    }
    expect(cards.length, "O-16 found zero card surfaces to walk").toBeGreaterThan(0);

    // R1: the dead 150ms default is the producer-root clobber. It is present in
    // the shipped dist today (EXPECTED-RED); PKT-1/P2 clears it.
    expect(
        defaultDur,
        `the dist :root transition default is the dead ${CLOBBER} clobber (T-14/R1, cured by PKT-1/P2) — the ~46 bare-transition sites resolve to it instead of a house liquid curve`,
    ).not.toBe(CLOBBER);
});
