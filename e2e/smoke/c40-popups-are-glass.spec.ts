/**
 * The FORTIETH order, D ("menus and popups should be glass"): the six desk
 * surfaces stay glass.
 *
 * Measured on production at 1440 against glass's own demo: the dock's view
 * select, the colour-space select, the rail tooltip, Browse's card menu, the
 * Filters popover and Generate's swatch popover all wear glass's material
 * number for number (a veil of 0.18 to 0.26 over a blurred backdrop); no site
 * rule lowers blur or alpha. This guard keeps that true through the page-change
 * work: at 1440, in both schemes, each surface's material (the surface or the
 * first of its descendants that paints a background or a backdrop) has a
 * background alpha of 0.30 or less and a backdrop filter.
 */
import { test, expect, type Locator, type Page } from "@playwright/test";
import { expandDock, mainPane } from "./fixtures/dock";
import { routeBrowsePalettes } from "./fixtures/browse-palettes";

interface Material {
    alpha: number;
    backdrop: string;
    bg: string;
}

/** The material of the last visible surface that matches `selector`. */
async function material(page: Page, selector: string): Promise<Material> {
    await expect(page.locator(selector).last()).toBeVisible({ timeout: 10_000 });
    // the surface's reveal has played (its opacity and veil settle with it)
    await page.waitForTimeout(500);
    return page.evaluate(
        (selector) => {
            // the alpha of a computed colour (`rgba()`, `color(... / a)`,
            // `oklab(... / a)`), 1 when it has none
            const alpha = (c: string) => {
                if (c === "transparent") return 0;
                const slash = c.match(/\/\s*([\d.]+)(%?)\s*\)$/);
                if (slash) return slash[2] ? parseFloat(slash[1]!) / 100 : parseFloat(slash[1]!);
                const rgba = c.match(/^rgba\([^)]*,\s*([\d.]+)\)$/);
                return rgba ? parseFloat(rgba[1]!) : 1;
            };
            const visible = [...document.querySelectorAll<HTMLElement>(selector)].filter((n) => {
                const r = n.getBoundingClientRect();
                return r.width > 4 && r.height > 4;
            });
            const root = visible[visible.length - 1]!;
            const paints = (n: Element) => {
                const cs = getComputedStyle(n);
                const bf = cs.backdropFilter || (cs as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter || "none";
                return bf !== "none" || alpha(cs.backgroundColor) > 0 || cs.backgroundImage !== "none";
            };
            const queue: [Element, number][] = [[root, 0]];
            let found: Element = root;
            while (queue.length) {
                const [n, depth] = queue.shift()!;
                if (paints(n)) {
                    found = n;
                    break;
                }
                if (depth < 3) for (const c of n.children) queue.push([c, depth + 1]);
            }
            const cs = getComputedStyle(found);
            const backdrop =
                cs.backdropFilter || (cs as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter || "none";
            return { alpha: alpha(cs.backgroundColor), backdrop, bg: cs.backgroundColor };
        },
        selector,
    );
}

async function close(page: Page) {
    await page.keyboard.press("Escape");
    await page.mouse.move(5, 450);
    await page.waitForTimeout(400);
}

async function press(trigger: Locator) {
    await expect(trigger).toBeVisible({ timeout: 30_000 });
    await trigger.click();
}

for (const scheme of ["light", "dark"] as const) {
    test(`D · 1440 · ${scheme}: the six desk surfaces are glass`, async ({ browser }) => {
        test.setTimeout(180_000);
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        const read: Record<string, Material> = {};
        try {
            const page = await ctx.newPage();
            await routeBrowsePalettes(page);
            await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
            await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });

            // 1. the dock's view select
            await expandDock(page);
            await press(page.getByRole("combobox", { name: "Select view" }));
            read["dock view select"] = await material(page, '[data-slot="select-content"]');
            await close(page);

            // 2. the colour-space select (the picker's; About names its space
            // with a select of its own)
            await press(page.getByRole("region", { name: "Picker" }).getByRole("combobox", { name: "Select color space" }));
            read["colour-space select"] = await material(page, '[data-slot="select-content"]');
            await close(page);

            // 3. the rail tooltip (hover a channel letter: the rail's tabs are
            // named for their act, "Go to L (Lightness)", so read them by role)
            const rail = page.locator('[aria-label="Color channels"] [role="tab"]').first();
            await expect(rail).toBeVisible({ timeout: 30_000 });
            await rail.hover();
            read["rail tooltip"] = await material(page, '[data-slot="tooltip-content"], [role="tooltip"]');
            await close(page);

            // 4, 5. Browse: a card's menu, the Filters popover
            await page.evaluate(() => (location.hash = "#/browse"));
            await expect(mainPane(page).getByRole("article").first()).toBeVisible({ timeout: 60_000 });
            await press(mainPane(page).getByRole("button", { name: /^Palette menu for / }).first());
            read["Browse card menu"] = await material(page, '[role="menu"]');
            await close(page);
            await press(mainPane(page).getByRole("button", { name: /^Filters/ }).first());
            read["Filters popover"] = await material(page, '[data-slot="popover-content"]');
            await close(page);

            // 6. Generate: a swatch's hover popover
            await page.evaluate(() => (location.hash = "#/generate"));
            // Generate's swatches are named by their verb (Copy <colour>)
            const swatch = page.locator('[aria-label="Generated palette"] .swatch-button').first();
            await expect(swatch).toBeVisible({ timeout: 60_000 });
            await swatch.hover();
            read["Generate swatch popover"] = await material(page, '[data-slot="popover-content"]');
            await close(page);
        } finally {
            // a context already gone must not mask the error that ended it
            await ctx.close().catch(() => {});
        }
        test.info().annotations.push({ type: "reading", description: JSON.stringify(read) });
        const faults = Object.entries(read)
            .filter(([, m]) => m.alpha > 0.3 || m.backdrop === "none")
            .map(([name, m]) => `${name}: alpha ${m.alpha} (${m.bg}), backdrop ${m.backdrop}`);
        expect(Object.keys(read)).toHaveLength(6);
        expect(faults, "desk surfaces that are not glass").toEqual([]);
    });
}
