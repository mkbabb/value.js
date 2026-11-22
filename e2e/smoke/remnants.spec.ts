import { test, expect, type Locator } from "@playwright/test";
import { mainPane, paneSettled } from "./fixtures/dock";

/**
 * Small remnants (critique P-01, H-02, E-01).
 *
 * P-01: an empty library showed "Search your palettes" above "No saved
 * palettes yet": a search field over nothing to search.
 * H-02: at 390 the About card stood 16 px in from the picker card above it,
 * a third width on a phone whose other cards share one pair of edges.
 * E-01: Extract's second slider was "Chroma weight", a name that says nothing
 * of what it does to the result.
 */

/** The share of an element that is painted: its box clipped by every
 *  clipping ancestor, times the opacity it inherits. */
function paintedShare(el: Locator) {
    return el.evaluate((node) => {
        const box = node.getBoundingClientRect();
        let top = box.top, bottom = box.bottom, alpha = 1;
        for (let n: Element | null = node; n; n = n.parentElement) {
            const cs = getComputedStyle(n);
            alpha *= Number(cs.opacity);
            if (n !== node && cs.overflowY !== "visible") {
                const r = n.getBoundingClientRect();
                top = Math.max(top, r.top);
                bottom = Math.min(bottom, r.bottom);
            }
        }
        return box.height ? (Math.max(0, bottom - top) / box.height) * alpha : 0;
    });
}

test("H-02: at 390 the About card shares the picker card's edges", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#/");
    const picker = page.locator(".picker-plate").first();
    const about = page.locator(".about-pane .pane-shell__card").first();
    await expect(about).toBeAttached({ timeout: 60_000 });
    await expect(picker).toBeVisible();
    // The edges are read at rest: the cards arrive on a transform (the first
    // load's settle, a region's move), and a box read mid-arrival is a pose,
    // not the layout (at rest both stand at x 12, 366 wide).
    await paneSettled(page);
    const p = (await picker.boundingBox())!;
    const a = (await about.boundingBox())!;
    expect(Math.abs(a.x - p.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(a.x + a.width - (p.x + p.width))).toBeLessThanOrEqual(1);
});

test.describe("at the desk", () => {
test.use({ viewport: { width: 1440, height: 900 } });

test("P-01: an empty library shows no search field", async ({ page }) => {
    await page.goto("/#/palettes");
    await expect(mainPane(page).getByText("No saved palettes yet.")).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(600);
    const search = page.getByLabel("Search your palettes");
    expect(await paintedShare(search)).toBe(0);
    // The editor takes the row's place: no stray gap where the row was.
    const title = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
    const editor = (await mainPane(page).getByText("Start a new palette").boundingBox())!;
    expect(editor.y - (title.y + title.height)).toBeLessThan(80);
});

test("E-01: Extract's second slider is named by its effect", async ({ page }) => {
    await page.goto("/#/extract");
    await expect(page.getByRole("slider", { name: "Vividness", exact: true })).toBeVisible({ timeout: 60_000 });
    await expect(page.getByText("Chroma weight")).toHaveCount(0);
});
});
