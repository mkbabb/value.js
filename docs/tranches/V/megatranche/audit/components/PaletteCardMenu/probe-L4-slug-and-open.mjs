// CHALLENGE-L pass 4 probe.
//
// Two questions, one page load, read-only against the live dev server:
//
//  Q1  Does the Export sub-menu produce a filename slug that DISAGREES with the
//      slug the palette is stored under? (utils.ts:3 slugify vs export.ts:9
//      slugify — two algorithms, one concept, both reachable from this menu.)
//  Q2  Is the controlled-open apparatus (menuOpen prop + updateOpen emit +
//      PaletteCard's ref + its `if (action !== "rename")` guard) load-bearing?
//      Specifically: after choosing Rename, is the menu still open, as
//      PaletteCard.vue:291-292 claims?
//
// Seeds two LOCAL saved palettes into the `color-palettes` localStorage key
// (usePaletteStore.ts:6) so /#/palettes renders cards with no network. The app
// is in the `misconfigured` availability state (no VITE_API_URL); local
// palettes are unaffected by that.

import { chromium } from "playwright";

const NAMES = ["Café Noir", "Ünderscore_Mix"];

// utils.ts:3-12 — the algorithm the STORE slug is minted with.
const storeSlugify = (s) =>
    s
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const seed = {
    version: 1,
    palettes: NAMES.map((name, i) => ({
        id: `probe-${i}`, // no gen-/mix-/__extracted__ prefix → kind "saved"
        name,
        slug: `${storeSlugify(name)}-aabbccdd`,
        colors: [
            { css: "#ff5555", position: 0 },
            { css: "#55ff55", position: 1 },
            { css: "#5555ff", position: 2 },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLocal: true,
    })),
};

const out = {
    seededSlugs: seed.palettes.map((p) => p.slug),
    topLevelMenuItems: [],
    menuInclSubmenu: [],
    downloadFilenames: [],
    downloadBodyHead: null,
    openMenusAfterRename: null,
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();

await page.addInitScript((store) => {
    localStorage.setItem("color-palettes", JSON.stringify(store));
    // export.ts:121-131 builds a Blob, an object URL, sets a.download and calls
    // a.click(). Intercept at the anchor so nothing is written to disk.
    window.__downloads = [];
    const realClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
        if (this.download) {
            window.__downloads.push({ filename: this.download, href: this.href });
            return;
        }
        return realClick.call(this);
    };
}, seed);

await page.goto("http://localhost:9000/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

const triggers = page.locator('button[aria-label="Palette menu"]');
out.menuButtonCount = await triggers.count();

if (out.menuButtonCount > 0) {
    // ---- Q1: Export → JSON on the first card ("Café Noir")
    await triggers.first().click({ force: true });
    await page.waitForTimeout(700);
    out.topLevelMenuItems = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"]')].map((n) => n.textContent.trim()),
    );

    await page.getByRole("menuitem", { name: "Export" }).first().hover();
    await page.waitForTimeout(900);
    out.menuInclSubmenu = await page.evaluate(() =>
        [...document.querySelectorAll('[role="menuitem"]')].map((n) => n.textContent.trim()),
    );

    const json = page.getByRole("menuitem", { name: "JSON", exact: true }).first();
    out.jsonItemFound = await json.count();
    if (out.jsonItemFound) {
        await json.click({ force: true });
        await page.waitForTimeout(1500);
    }
    const dl = await page.evaluate(() => window.__downloads || []);
    out.downloadFilenames = dl.map((d) => d.filename);
    // The blob body is NOT readable after the fact: export.ts:130 calls
    // URL.revokeObjectURL(url) on the line after a.click(), so the object URL is
    // dead by the time the probe returns. The filename is the evidence anyway.
    out.downloadBodyHead = "n/a — object URL revoked at export.ts:130";

    // ---- Q2: Rename on the second card; is the menu still open afterwards?
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    await triggers.nth(Math.min(1, out.menuButtonCount - 1)).click({ force: true });
    await page.waitForTimeout(700);
    out.menuStateBeforeRename = await page.evaluate(() =>
        [...document.querySelectorAll("[data-state]")]
            .filter((n) => n.getAttribute("role") === "menu")
            .map((n) => n.getAttribute("data-state")),
    );
    const rename = page.getByRole("menuitem", { name: "Rename", exact: true }).first();
    if (await rename.count()) {
        await rename.click({ force: true });
        await page.waitForTimeout(900);
    }
    out.openMenusAfterRename = await page.evaluate(
        () => [...document.querySelectorAll('[role="menu"]')].filter((n) => n.offsetParent !== null).length,
    );
    out.renameInputsVisible = await page.locator('input[type="text"], input:not([type])').count();
}

console.log(JSON.stringify(out, null, 2));
await browser.close();
