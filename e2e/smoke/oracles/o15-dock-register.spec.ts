import { test, expect } from "@playwright/test";
import { expandDock, openView } from "../fixtures/dock";

/**
 * T.W6 — O-15a/b: THE DOCK REGISTER ORACLE (SYNTHESIS §6.1; W6-7 + W6-8).
 *
 * O-15a (the seal, Q12 ABROGATE — the resurrection guard): the collapsed
 * dock's wax seal computes `border-style: none` — the T-28 die-rim (a 1px
 * geometric circle over the seeded organic wax edge, which crosses AND gaps
 * any circle by construction) is DEAD and must stay dead; identity is the
 * wax (live color) + the inked glyph (view), continuity is the GLYPH. The
 * cascade-dead `ring-2 ring-primary/50` sibling (MixSourceSelector) is
 * dispositioned the same way: the register law — rings on WatercolorDots
 * ride the dot's own silhouette (the P5 producer register) or do not exist.
 *
 * O-15b (the Tools clip, T-29): the settle-stamped clip release — at
 * settled-visible rest the toggle slot's inner box computes
 * `overflow: visible` (the hover capsule + its lift shadow render WHOLE);
 * the clip exists only while the 0fr↔1fr presence animation runs. Plus the
 * register pass: ZERO native `title` tooltips on the dock set (the dark UA
 * slab in the owner's shot — a foreign register on the liquid-glass dock).
 */

test.describe("O-15a · the seal abrogation (negative watch)", () => {
    test("the collapsed seal computes border-style none — no rim resurrection", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        // The desktop dock auto-collapses ~5s after the pointer leaves it
        // (probed live); the seal exists only in the collapsed summary.
        await page.locator(".glass-dock").hover();
        await page.mouse.move(700, 600);
        const seal = page.locator(".dock-seal");
        await expect(seal).toBeVisible({ timeout: 15000 });
        const computed = await seal.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                borderStyle: cs.borderStyle,
                borderWidth: cs.borderWidth,
                padding: cs.padding,
            };
        });
        expect(computed.borderStyle).toBe("none");
        expect(computed.borderWidth).toBe("0px");
        // T-37: the rim's 2px standoff died with it — the wax fills the seal.
        expect(computed.padding).toBe("0px");
    });

    test("the register-law sibling stays dispositioned — no geometric ring on mix dots", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await openView(page, "Mix");
        await page
            .getByRole("button", { name: "Add current color to the mix" })
            .click();
        const dot = page.locator("[data-mix-source] .watercolor-swatch").first();
        await expect(dot).toBeVisible();
        const cls = await dot.evaluate((el) => el.className);
        expect(cls).not.toMatch(/\bring-\d/);
    });
});
