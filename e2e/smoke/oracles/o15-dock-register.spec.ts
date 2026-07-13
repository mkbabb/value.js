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

test.describe("O-15b · the Tools clip release + register pass (W6-8)", () => {
    test("settled rest releases the clip — the hover capsule + shadow render whole", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await expandDock(page);

        // The picker view carries an action bar, so the toggle slot is
        // present at first paint (boot-seated: the settle stamp rides the
        // same double-rAF that arms the transition). At settled-visible rest
        // the clip has NO job — the inner box computes `overflow: visible`.
        const slot = page.locator(".action-bar-toggle-slot");
        await expect(slot).toHaveClass(/is-visible/);
        await expect(slot).toHaveClass(/is-settled/, { timeout: 5000 });
        const inner = page.locator(".action-bar-toggle-inner");
        await expect(inner).toHaveCSS("overflow", "visible");

        // The whole-shadow assert: the producer's box-shadow states (the
        // shared :focus-visible ring — the one shadow the register paints by
        // default; --dock-active-shadow ships `none`) render on a box whose
        // clip is RELEASED, so nothing amputates them (the pre-cure clip box
        // fit the rest box exactly — 100% of any blur fell outside it).
        // Keyboard focus (Tab) gives honest :focus-visible modality.
        const tools = page.locator(".dock-tools-btn");
        let shadow = "none";
        for (let i = 0; i < 20; i++) {
            await page.keyboard.press("Tab");
            const isTools = await tools.evaluate(
                (el) => el === document.activeElement,
            );
            if (isTools) {
                shadow = await tools.evaluate(
                    (el) => getComputedStyle(el).boxShadow,
                );
                break;
            }
        }
        expect(shadow).not.toBe("none");
        // …and the shadow's canvas is unclipped (asserted above: the inner
        // computes overflow visible at settled rest).
    });

    test("T-36 (§0.6): the Tools trigger wears the true-button box-model", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await expandDock(page);
        const tools = page.locator(".dock-tools-btn");
        await expect(tools).toBeVisible();
        const box = await tools.evaluate((el) => {
            const cs = getComputedStyle(el);
            return {
                padding: cs.padding,
                marginLeft: cs.marginLeft,
                marginRight: cs.marginRight,
                gap: cs.gap,
            };
        });
        // The Button-primitive px-3/py-2 scale ("proper margin and padding
        // like a true button element"), never the compact 4px sticker seat —
        // delivered through the producer's own --dock-compact-control-padding
        // token hook, so a producer register change surfaces here.
        expect(box.padding).toBe("8px 12px");
        expect(box.marginLeft).toBe("4px");
        expect(box.marginRight).toBe("4px");
        expect(box.gap).not.toBe("normal");
    });

    test("zero native title on the dock set (the UA-slab retirement)", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await expandDock(page);
        const nav = page.locator('nav[aria-label="Application navigation"]');

        // Main layer (the Tools trigger's former title="Action bar").
        await expect(nav.locator("[title]")).toHaveCount(0);

        // The action-bar layer (the former title="Back").
        await page.locator(".dock-tools-btn").click();
        await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
        await expect(nav.locator("[title]")).toHaveCount(0);
        await page.getByRole("button", { name: "Back" }).click();

        // The conditional layers (mobile-edit, slug-edit) and the portaled
        // menus (DarkModeToggle rows) are retired at the same source pass;
        // the lane record carries the dock-tree grep-zero.
    });

    test("the separator folds into the slot's arrival — one presence grammar", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        await expandDock(page);
        // T-29 register pass row 3: the desktop separator lives INSIDE the
        // animated inner box now — it enters WITH the 0fr→1fr arrival instead
        // of popping via v-if beside it (two grammars for one arrival).
        await expect(
            page.locator(".action-bar-toggle-inner .dock-separator"),
        ).toHaveCount(1);
    });
});
