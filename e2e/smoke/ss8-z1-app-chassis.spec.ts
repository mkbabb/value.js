// SERVED MODEL: claude-opus-5-5
/**
 * SS-8 Z1-app-chassis — the falsifiers for the batch's consumer cures
 * (docs/tranches/X/execution/SS8/packets/Z1-app-chassis.md § cures).
 *
 *   Z-Dock-5   Tools → "Open color input" moves focus into the colour field,
 *              and typed text lands there (Dock G-K(ii)).
 *   Z-Dock-10  The main dock layer shows no visible separator (Dock G-M).
 *   Z-Dock-13  The dock backdrop sampler is bound to the atmosphere field
 *              (Dock G-P, consumer half; the readback half is glass's).
 *   Z-chassis-2  Browse and Library compose preview-dominant (2:1, the field
 *                the major track).
 *   Z-chassis-3  Picker / Generate / Gradient / Extract / Mix compose golden
 *                (61.8 / 38.2, the stage the major track).
 *   Z-LG-3/4   The surplus reaches the stage: stage@3440 > stage@1440, and the
 *              pane row covers ≥ 90 % of a 3440 viewport.
 *   Z-LG-5     `--pane-max` (the page cap) is gone.
 *   Z-LG-6     The gutter is clamp(0.75rem, 2.5cqi, 3rem): 12 / 36 / 48 px at
 *              390 / 1440 / 3440.
 *
 * Widths are LAYOUT widths (`offsetWidth`): the pane-enter family moves the
 * regions by transform, which a bounding box would count.
 */
import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { expandDock, mainPane } from "./fixtures/dock";

const DESK = { width: 1440, height: 900 };
const ULTRA = { width: 3440, height: 1440 };

/** The two regions each two-region route seats, stage first (viewSchema). */
const ROUTES: Record<string, [string, string]> = {
    "/": ["color-picker", "about"],
    "/generate": ["generate", "palettes"],
    "/gradient": ["gradient", "palettes"],
    "/extract": ["extract", "palettes"],
    "/mix": ["color-picker", "mix"],
    "/browse": ["browse", "palettes"],
    "/palettes": ["color-picker", "palettes"],
};

const GOLDEN = 61.8033989 / 100;

async function go(page: Page, route: string) {
    const [stage, inspector] = ROUTES[route]!;
    await page.evaluate((r) => (location.hash = `#${r}`), route);
    await expect(
        page.locator(
            `.pane-container > .pane-wrapper--stage[data-pane="${stage}"] + .pane-wrapper--inspector[data-pane="${inspector}"]`,
        ),
    ).toHaveCount(1, { timeout: 20_000 });
}

function widths(page: Page) {
    return page.evaluate(() => {
        const w = (sel: string) =>
            (document.querySelector(sel) as HTMLElement | null)?.offsetWidth ?? 0;
        return {
            stage: w(".pane-container > .pane-wrapper--stage"),
            inspector: w(".pane-container > .pane-wrapper--inspector"),
            row: w(".pane-container"),
        };
    });
}

test.describe("Z1-app-chassis — the row composition", () => {
    test.setTimeout(180_000);

    test("Z-chassis-2/3 · Z-LG-3/4 — per-route tracks at 1440, surplus to the stage at 3440", async ({
        page,
    }) => {
        await page.setViewportSize(DESK);
        await page.goto("/#/", { timeout: 60_000 });
        await expect(mainPane(page)).toBeVisible({ timeout: 30_000 });

        const at1440: Record<string, { stage: number; inspector: number; row: number }> = {};
        for (const route of Object.keys(ROUTES)) {
            await go(page, route);
            at1440[route] = await widths(page);
        }
        const share = (r: string, side: "stage" | "inspector") =>
            at1440[r]![side] / (at1440[r]!.stage + at1440[r]!.inspector);

        // Z-chassis-3: the stage takes the golden major track.
        for (const r of ["/", "/generate", "/gradient", "/extract", "/mix"]) {
            expect(share(r, "stage"), `${r} stage share`).toBeCloseTo(GOLDEN, 2);
        }
        // Z-chassis-2: the FIELD takes 64–66.7 % — Browse's field is its stage,
        // Library's field is the palettes region beside the shared picker.
        for (const [r, side] of [
            ["/browse", "stage"],
            ["/palettes", "inspector"],
        ] as const) {
            const f = share(r, side);
            expect(f, `${r} field share`).toBeGreaterThanOrEqual(0.64);
            expect(f, `${r} field share`).toBeLessThanOrEqual(0.667);
        }

        await page.setViewportSize(ULTRA);
        for (const route of ["/", "/generate", "/browse", "/mix"]) {
            await go(page, route);
            const u = await widths(page);
            // Z-LG-3: the stage spends the surplus.
            expect(u.stage, `${route} stage@3440 vs @1440`).toBeGreaterThan(at1440[route]!.stage);
            // Z-LG-4: the row covers ≥ 90 % of the viewport.
            expect(u.row / ULTRA.width, `${route} row coverage`).toBeGreaterThanOrEqual(0.9);
        }
    });

    test("Z-LG-5 — no page cap token", async ({ page }) => {
        await page.setViewportSize(DESK);
        await page.goto("/#/", { timeout: 60_000 });
        await expect(mainPane(page)).toBeVisible({ timeout: 30_000 });
        expect(
            await page.evaluate(() =>
                getComputedStyle(document.documentElement).getPropertyValue("--pane-max").trim(),
            ),
        ).toBe("");
    });

    test("Z-LG-6 — the fluid gutter", async ({ page }) => {
        await page.setViewportSize(DESK);
        await page.goto("/#/", { timeout: 60_000 });
        await expect(mainPane(page)).toBeVisible({ timeout: 30_000 });
        for (const [width, px] of [
            [390, 12],
            [1440, 36],
            [3440, 48],
        ] as const) {
            await page.setViewportSize({ width, height: 900 });
            const pad = await page.evaluate(() =>
                parseFloat(getComputedStyle(document.querySelector(".app-layout")!).paddingLeft),
            );
            expect(pad, `gutter at ${width}`).toBeCloseTo(px, 0);
        }
    });
});

test.describe("Z1-app-chassis — the dock", () => {
    test.use({ viewport: DESK });
    test.setTimeout(90_000);

    test.beforeEach(async ({ page }) => {
        await page.goto("/#/", { timeout: 60_000 });
        await expect(mainPane(page)).toBeVisible({ timeout: 30_000 });
        await expandDock(page);
    });

    test("Z-Dock-10 — the main layer shows no visible separator", async ({ page }) => {
        const seps = await page.evaluate(() =>
            [...document.querySelectorAll(".glass-dock .dock-separator, .glass-dock [role=separator]")].filter((e) => {
                const r = e.getBoundingClientRect();
                return (
                    r.width > 0 &&
                    r.height > 0 &&
                    getComputedStyle(e).visibility !== "hidden" &&
                    !e.closest("[inert]")
                );
            }).length,
        );
        expect(seps).toBe(0);
    });

    test("Z-Dock-13 — the dock's sampler is bound to the atmosphere field", async ({ page }) => {
        // The consumer half of G-P: the live sampler FINDS the field canvas
        // (before the cure GlassDock's getter answered null: `source-unavailable`).
        // Whether the canvas's pixels are readable is the producer's half: in
        // headless Chromium the field paints as the canvas box's CSS gradient
        // fallback (backing store 300×150, untouched), the readback's mean alpha
        // is 0, and glass 10.1.0 reports `sample-unavailable` with no fall-back
        // to its static walk (packet § cures, Z-Dock-13 → glass O-row).
        const dock = page.locator(".glass-dock").first();
        await expect(dock).toHaveAttribute("data-backdrop-sample-state", /.+/, { timeout: 20_000 });
        await page.waitForTimeout(1500);
        await expect(dock).not.toHaveAttribute("data-backdrop-sample-reason", "source-unavailable");
    });

    test("Z-Dock-5 — Open color input focuses the field and typing lands in it", async ({
        page,
    }) => {
        await page.getByRole("button", { name: "Toggle action bar" }).click();
        await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
            timeout: 5000,
        });
        await page.getByRole("button", { name: "Open color input" }).click();
        const field = page.getByRole("textbox", { name: "Enter a CSS color" });
        await expect(field).toBeFocused({ timeout: 5000 });
        await page.keyboard.press("ControlOrMeta+A");
        await page.keyboard.type("red");
        await expect(field).toHaveText("red");
    });
});
