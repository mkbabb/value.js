import { test, expect } from "@playwright/test";

/**
 * T.W0 W0-5 · O-7 — CARD-MATERIAL CENSUS **SCAFFOLD** (SYNTHESIS §6.1 O-7;
 * AMENDED-AT-HARDENING h-exec-w0 S3).
 *
 * The full O-7 (W3) is the census the T-24 gate W5-2 never had: every pane +
 * named fixture resolves to its ONE material RUNG (membership, not a fixed
 * alpha), both schemes. At W0 this is the SCAFFOLD ONLY — the census loop + the
 * pane roster + the rung resolver — **asserting nothing about rung membership
 * yet** (the membership assertions arm at W3, once the rung tokens land).
 *
 * ── BORN-GREEN (a scaffold, not a defect probe): the only live assertion is
 *    that the census LOOP runs and finds a non-empty roster (else W3's census
 *    would silently walk nothing). The resolver + roster are LOGGED so W3 opens
 *    against a known surface, not a blank page.
 */

/** The rung resolver STUB — at W3 this maps a card's computed material to its
 *  named rung {resting, well, wash, stage}. At W0 it only records the signature. */
function materialSignature(bg: string, bgImage: string, opacity: string): string {
    return `bg=${bg} img=${bgImage === "none" ? "none" : "layered"} opacity=${opacity}`;
}

test("O-7 scaffold — the card-material census loop + roster + rung resolver run (asserts nothing yet)", async ({
    page,
}) => {
    test.setTimeout(30_000);
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible();

    // THE CENSUS LOOP + ROSTER: every card surface currently mounted. (At W3 the
    // loop opens each pane via the dock roster + the named fixtures, both
    // schemes; here it walks the default view's roster only.)
    const roster = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-slot="card"]')).map((el) => {
            const cs = getComputedStyle(el as HTMLElement);
            return {
                surface: (el as HTMLElement).dataset.surface ?? "(none)",
                tier: (el as HTMLElement).dataset.tier ?? "(none)",
                bg: cs.backgroundColor,
                bgImage: cs.backgroundImage,
                opacity: cs.opacity,
            };
        }),
    );

    // THE RUNG RESOLVER (stub): record each card's material signature.
    for (const c of roster) {
        console.log(
            `[O-7 scaffold] surface=${c.surface} tier=${c.tier} ${materialSignature(c.bg, c.bgImage, c.opacity)}`,
        );
    }

    // THE ONE LIVE ASSERTION (structural precondition for W3): the roster is
    // non-empty — the census walks real cards, not a blank page. Rung-MEMBERSHIP
    // assertions are DELIBERATELY absent at W0 (they arm at W3).
    expect(
        roster.length,
        "O-7 census found zero card surfaces — W3's material census would walk nothing",
    ).toBeGreaterThan(0);
});
