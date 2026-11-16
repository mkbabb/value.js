import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mainPane, openView } from "./fixtures/dock";
import { routeBrowsePalettes } from "./fixtures/browse-palettes";

/**
 * Each view's state lives in the address (owner, 15 Nov 2026: "Each page should
 * have state defined in the URL"). `demo/shell/urlState.ts`.
 *
 *   · A deep link per view reopens cold with its state: the controls read the
 *     values the link carries, and the address keeps them.
 *   · A discrete change pushes an entry, so Back restores the previous state.
 *   · A view switch drops the leaving view's keys and keeps the colour; Back
 *     returns to exactly the view that was left.
 *   · Nothing private reaches the address.
 */

test.use({ viewport: { width: 1440, height: 900 } });
// A cold dev-server transform of a pane can exceed the 30s default.
test.describe.configure({ timeout: 90_000 });

const enc = encodeURIComponent;
const STOPS = "oklch(0.7 0.2 30)@0~b:0.42,0,0.58,1|oklch(0.8 0.1 120)@50|oklch(0.5 0.2 280)@100";

/** The address's query as a plain object (hash router: `/#/view?…`). */
async function query(page: Page): Promise<Record<string, string>> {
    const hash = await page.evaluate(() => location.hash);
    const at = hash.indexOf("?");
    return Object.fromEntries(new URLSearchParams(at < 0 ? "" : hash.slice(at + 1)));
}

async function open(page: Page, link: string) {
    await page.goto(link, { waitUntil: "domcontentloaded" });
    await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
}

function slider(page: Page, name: string) {
    return mainPane(page).getByRole("slider", { name, exact: true });
}

function combo(page: Page, text: string) {
    return mainPane(page).getByRole("combobox").filter({ hasText: text }).first();
}

test("gradient: type, angle, stops, space and hue reopen from the link", async ({ page }) => {
    await open(page, `/#/gradient?gt=radial&ga=45&gi=oklab&gh=longer&stops=${enc(STOPS)}`);
    await expect(slider(page, "Gradient stop 2 of 3")).toHaveAttribute("aria-valuenow", "50", { timeout: 30_000 });
    await expect(combo(page, "Radial")).toBeVisible();
    await expect(combo(page, "OKLab")).toBeVisible();
    await expect(combo(page, "Longer")).toBeVisible();
    const q = await query(page);
    expect(q).toMatchObject({ gt: "radial", ga: "45", gi: "oklab", gh: "longer" });
    // The stops settle on the model's literal dialect; positions and easing hold.
    expect(q.stops!.split("|").map((s) => s.slice(s.indexOf("@")))).toEqual(["@0~b:0.42,0,0.58,1", "@50", "@100"]);
});

test("generate: the same link draws the same palette", async ({ page }) => {
    const link = "/#/generate?preset=pastel&harmony=triadic&count=7&seed=12345";
    await open(page, link);
    await expect(slider(page, "Number of colors")).toHaveAttribute("aria-valuenow", "7", { timeout: 30_000 });
    await expect(combo(page, "Pastel")).toBeVisible();
    await expect(combo(page, "Triadic")).toBeVisible();
    const swatches = () =>
        mainPane(page).locator(".generate-swatch").evaluateAll((els) =>
            els.map((e) => getComputedStyle(e).backgroundColor),
        );
    await expect.poll(async () => (await swatches()).length).toBe(7);
    const first = await swatches();
    await open(page, link);
    await expect.poll(swatches).toEqual(first);
    expect(await query(page)).toMatchObject({ preset: "pastel", harmony: "triadic", count: "7", seed: "12345" });
});

test("mix, extract, atmosphere and blob reopen from their links", async ({ page }) => {
    await open(page, `/#/mix?mc=${enc("oklch(0.7 0.2 30)|oklch(0.5 0.2 280)")}&ms=oklch&mh=longer`);
    await expect(combo(page, "Longer")).toBeVisible({ timeout: 30_000 });
    expect(await query(page)).toMatchObject({ ms: "oklch", mh: "longer", mc: "oklch(0.7 0.2 30)|oklch(0.5 0.2 280)" });

    await open(page, "/#/extract?n=9&cw=1.2");
    await expect(slider(page, "Number of colors")).toHaveAttribute("aria-valuenow", "9", { timeout: 30_000 });
    await expect(slider(page, "Chroma weight")).toHaveAttribute("aria-valuenow", "1.2");

    await open(page, "/#/atmosphere?aurora=harmony:triad,noise:0.2,zones.count:3");
    await expect(slider(page, "Zones")).toHaveAttribute("aria-valuenow", "3", { timeout: 30_000 });
    await expect(slider(page, "Noise")).toHaveAttribute("aria-valuenow", "0.2");
    await expect(combo(page, "Triad")).toBeVisible();

    await open(page, "/#/blob?blob=tempo:1.5,geometry.satelliteCount:2");
    await expect(slider(page, "Satellites")).toHaveAttribute("aria-valuenow", "2", { timeout: 30_000 });
    await expect(slider(page, "Speed")).toHaveAttribute("aria-valuenow", "1.5");
});

test("browse: the search reopens from the link", async ({ page }) => {
    await open(page, "/#/browse?q=sun&sort=popular");
    await expect(mainPane(page).getByPlaceholder("Search palettes...")).toHaveValue("sun", { timeout: 30_000 });
    expect(await query(page)).toMatchObject({ q: "sun", sort: "popular" });
});

test("browse: the version history opens from the link; closing pushes, Back reopens", async ({ page }) => {
    await routeBrowsePalettes(page);
    await open(page, "/#/browse?hist=wall-palette-3");
    const drawer = page.getByRole("dialog", { name: "Version history" });
    await expect(drawer).toBeVisible({ timeout: 30_000 });
    expect(await query(page)).toMatchObject({ hist: "wall-palette-3" });

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect.poll(async () => (await query(page)).hist).toBeUndefined();

    await page.goBack();
    await expect(drawer).toBeVisible();
    expect(await query(page)).toMatchObject({ hist: "wall-palette-3" });
});

test("palettes: the opened palette reopens from the link", async ({ page }) => {
    const NOW = "2026-11-16T00:00:00.000Z";
    const saved = ["Dawn", "Dusk"].map((name, i) => ({
        id: `p${i}`,
        name,
        slug: `p${i}`,
        colors: ["oklch(0.7 0.15 30)", "oklch(0.6 0.15 200)"].map((css, position) => ({ css, position })),
        createdAt: NOW,
        updatedAt: NOW,
        isLocal: true,
        published: false,
        visibility: "private",
        tags: [],
    }));
    await page.addInitScript((palettes) => {
        try {
            localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes }));
        } catch {
            /* private window */
        }
    }, saved);
    await open(page, "/#/palettes?open=p1");
    const expanded = mainPane(page).locator("[data-selected]").filter({ hasText: "Dusk" });
    await expect(expanded.first()).toBeVisible({ timeout: 30_000 });
    expect(await query(page)).toMatchObject({ open: "p1" });
});

test("Back undoes a discrete change; a view switch drops the pane's keys and Back returns to it", async ({ page }) => {
    await open(page, "/#/gradient?gt=radial&color=" + enc("oklch(0.6 0.2 150)") + "&space=oklch");
    await expect(combo(page, "Radial")).toBeVisible({ timeout: 30_000 });

    // A select change pushes.
    await combo(page, "Radial").click();
    await page.getByRole("option", { name: /Conic/ }).click();
    await expect.poll(async () => (await query(page)).gt).toBe("conic");
    await page.goBack();
    await expect.poll(async () => (await query(page)).gt).toBe("radial");
    await expect(combo(page, "Radial")).toBeVisible();

    // A view switch keeps the colour and drops the gradient's keys.
    await openView(page, "Home");
    await expect.poll(() => page.evaluate(() => location.hash.split("?")[0])).toBe("#/");
    const home = await query(page);
    expect(home.gt).toBeUndefined();
    expect(home.color).toBe("oklch(0.6 0.2 150)");

    // Back returns to the gradient exactly as it was left.
    await page.goBack();
    await expect.poll(async () => (await query(page)).gt).toBe("radial");
    await expect(combo(page, "Radial")).toBeVisible();
});

test("nothing private reaches the address", async ({ page }) => {
    await page.addInitScript(() => {
        try {
            localStorage.setItem("palette-user-slug", "private-slug-xyz");
            localStorage.setItem("palette-user-token", "private-token-xyz");
        } catch {
            /* private window */
        }
    });
    for (const link of ["/#/", "/#/palettes", "/#/browse", "/#/gradient", "/#/generate"]) {
        await open(page, link);
        await page.waitForTimeout(600);
        const href = await page.evaluate(() => location.href);
        expect(href).not.toMatch(/token|session|private-slug/i);
    }
});
