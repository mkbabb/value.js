/**
 * The FORTIETH order, K (the dock, the site's share) and B-2: what the site
 * adds to a page change in the dock, read every animation frame.
 *
 *   K-6 / B-2  The press is answered before the work: the trigger names the
 *              chosen view, and the menu is closing, on a frame BEFORE the
 *              one the route lands on (the switch used to run inside the
 *              input's own task, so the two always shared a frame).
 */
import { test, expect, type Page } from "@playwright/test";
import { expandDock, dockAtRest } from "./fixtures/dock";

interface Frame {
    t: number;
    /** the trigger's visible name */
    label: string;
    /** the route's view, as the shell stamps it */
    view: string;
    /** the view menu's listbox is still open */
    menu: boolean;
}

async function openHome(page: Page, width: number, height: number) {
    await page.setViewportSize({ width, height });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
    await dockAtRest(page);
    await expandDock(page);
}

/** Start a per-frame trace of the trigger, the route and the menu. */
async function startTrace(page: Page) {
    await page.evaluate(() => {
        const w = window as unknown as { __trace: Frame[]; __tracing: boolean };
        w.__trace = [];
        w.__tracing = true;
        const t0 = performance.now();
        const tick = () => {
            const trigger = document.querySelector<HTMLElement>(".view-select-trigger");
            w.__trace.push({
                t: performance.now() - t0,
                label: trigger?.innerText.trim() ?? "",
                view: document.querySelector<HTMLElement>(".app-layout")?.dataset.view ?? "",
                menu: document.querySelector('[role="listbox"][data-state="open"]') !== null,
            });
            if (w.__tracing) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

async function stopTrace(page: Page): Promise<Frame[]> {
    return page.evaluate(() => {
        const w = window as unknown as { __trace: Frame[]; __tracing: boolean };
        w.__tracing = false;
        return w.__trace;
    });
}

test.describe("c40 · the dock's share of a page change", () => {
    test.setTimeout(120_000);

    test("K-6 / B-2: the trigger names the chosen view, and the menu closes, before the route lands", async ({
        page,
    }) => {
        await openHome(page, 1440, 900);
        await page.getByRole("combobox", { name: "Select view" }).click();
        const option = page.getByRole("option", { name: "Palettes", exact: true });
        await expect(option).toBeVisible();
        await startTrace(page);
        await option.click();
        await expect(page.locator(".app-layout")).toHaveAttribute("data-view", "palettes");
        await page.waitForTimeout(300);
        const frames = await stopTrace(page);

        const named = frames.findIndex((f) => /Palettes/.test(f.label));
        const landed = frames.findIndex((f) => f.view === "palettes");
        const closed = frames.findIndex((f, i) => i > 0 && !f.menu);
        const summary = frames
            .slice(Math.max(0, named - 2), landed + 2)
            .map((f) => `${f.t.toFixed(0)}ms ${f.label}/${f.view}/${f.menu ? "open" : "closed"}`)
            .join(" · ");
        expect(named, `the trigger named Palettes (${summary})`).toBeGreaterThan(0);
        expect(landed, `the route landed (${summary})`).toBeGreaterThan(0);
        expect(named, `the chosen view is painted on a frame before the route lands (${summary})`).toBeLessThan(
            landed,
        );
        expect(closed, `the menu is closing by the frame the press is named (${summary})`).toBeLessThanOrEqual(
            named,
        );
    });
});
