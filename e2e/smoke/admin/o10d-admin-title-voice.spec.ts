import { adminPopulatedTest as test, expect } from "./fixtures/admin-populated";

/**
 * T.W4 W4-6 · O-10d (admin half) — the display-voice family census row for
 * the admin-session-gated title surface: the AdminFlaggedPanel palette NAME
 * (a user-data name — t-title-typography F7's "admin panels" sibling).
 *
 * The main census lives at `oracles/o10d-display-voice-census.spec.ts`
 * (smoke project); this row rides the populated admin fixture (the S.W5-13
 * pattern) because the flagged panel only mounts behind admin auth. The law
 * is the same register: Fraunces (`font-display`), the ≤500 non-bold rung
 * (`font-medium`), NON-ITALIC (user data reads as a catalog entry, never the
 * instrument italic).
 */

test("O-10d (admin) — the flagged-panel palette name speaks the display voice, ≤500, non-italic", async ({
    page,
}) => {
    await page.goto("/#/admin/flagged");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Flagged" }).first(),
    ).toBeVisible();

    const name = page
        .getByText("Sunset Riot", { exact: true })
        .filter({ visible: true })
        .first();
    await expect(name).toBeVisible();
    const voice = await name.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
            fontFamily: cs.fontFamily,
            fontWeight: cs.fontWeight,
            fontStyle: cs.fontStyle,
        };
    });
    expect(voice.fontFamily, "flagged name off the display face").toMatch(
        /^"?Fraunces\b/,
    );
    expect(Number(voice.fontWeight)).toBeLessThanOrEqual(500);
    expect(voice.fontStyle).toBe("normal");
});
