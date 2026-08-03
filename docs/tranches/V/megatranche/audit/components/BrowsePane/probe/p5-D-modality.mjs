// CHALLENGE-D pass 5 · BrowsePane — the modality probe.
//
// Proves, on the LIVE populated Browse wall:
//   (1) forced-colors: active — the wall's PaletteColorStrip segments are OFF
//       demo/styles/foundation.css's color-surface roster, while the empty
//       plate's WatercolorDot ghosts and the EXPANDED card's SwatchHoverMenu
//       WatercolorDots are ON it. WHCM therefore substitutes the wall's real
//       palette colors and keeps the decorative/duplicate ones.
//   (2) @media print — the same roster is reused, so the wall does not print
//       its colors either, despite foundation.css:793 declaring "the palette IS
//       a printable artifact".
//   (3) the load-more trigger destroys focus when activated by keyboard.
//
// READ-ONLY. No mutating verb is issued (non-GET is aborted); the wall is
// fulfilled from a route stub, so nothing reaches the real commons.

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = process.env.ORIGIN ?? "http://localhost:9000";
// Measured: this dev server runs with VITE_API_URL=http://localhost:3000, so
// detectDevMisconfig CANNOT fire (availability.ts:112 `if (i.viteApiUrlSet)
// return false`). The live failure is a CORS-blocked cross-origin fetch →
// ApiUnavailableError. The stub below fulfills that same endpoint.
const API = "http://localhost:3000";
const OUT = new URL("../evidence/", import.meta.url).pathname;

// Field name is `css`, per demo/palettes/types.ts.
const mk = (slug, name, cssList, tags = ["warm"]) => ({
    slug,
    name,
    userSlug: "user-1",
    colors: cssList.map((css) => ({ css })),
    oklabColors: cssList.map(() => ({ L: 0.6, a: 0.05, b: 0.09 })),
    tags,
    votes: 7,
    forkCount: 1,
    visibility: "public",
    tier: "published",
    currentHash: "abc123",
});

const WALL = [
    mk("sunset-commons", "Sunset Commons", ["#e5533d", "#f2a65a", "#f7d6a0", "#8c5f4d", "#3b2c2a"]),
    mk("cold-open", "Cold Open", ["#22333b", "#5e7d7e"], ["cool"]),
    mk("a-very-long-palette-name-that-wraps", "A Very Long Palette Name That Wraps Twice", ["#123", "#456", "#789"]),
];

// BASE_URL = VITE_API_URL (client.ts:37) = http://localhost:3000 here; listPalettes reads
// `res.data` / `res.nextCursor` / `res.hasMore` (useBrowsePalettes.ts:72-74).
async function stub(ctx) {
    await ctx.route(`${API}/**`, async (route) => {
        const u = route.request().url();
        if (route.request().method() !== "GET") return route.abort();
        if (u.includes("/tags")) return route.fulfill({ json: [{ name: "warm", count: 3 }, { name: "cool", count: 1 }] });
        if (u.includes("/palettes")) return route.fulfill({ json: { data: WALL, nextCursor: "CURSOR-2", hasMore: true } });
        return route.fulfill({ status: 200, json: {} });
    });
}

// The exact roster from foundation.css:680-694 / :830-837.
const ROSTER = [
    "canvas", ".spectrum-picker", ".gamut-overlay", ".atmosphere-canvas",
    "[data-glass-field-canvas]", ".gradient-rail", ".rail-handle", ".readout-rail",
    ".swatch-row > *", ".generate-swatch", ".shadow-swatch", ".goo-blob-canvas",
    ".watercolor-swatch", '.glass-slider[data-variant="spectrum"] .slider-range',
    "[data-color-surface]",
];

const READ = (roster) => {
    const onRoster = (el) => roster.some((sel) => { try { return el.matches(sel); } catch { return false; } });
    const seg = (el) => ({
        tag: el.tagName.toLowerCase(),
        cls: el.className || null,
        onRoster: onRoster(el),
        bg: getComputedStyle(el).backgroundColor,
        fca: getComputedStyle(el).forcedColorAdjust,
        pca: getComputedStyle(el).printColorAdjust || getComputedStyle(el).webkitPrintColorAdjust,
    });
    const strip = document.querySelector('[role="presentation"][aria-hidden="true"]');
    const stripSegs = strip ? [...strip.children].map(seg) : [];
    const dots = [...document.querySelectorAll(".watercolor-swatch")].map(seg);
    return {
        stripSegCount: stripSegs.length,
        stripSegs: stripSegs.slice(0, 5),
        stripDistinctBg: [...new Set(stripSegs.map((s) => s.bg))],
        watercolorCount: dots.length,
        watercolorSample: dots.slice(0, 3),
        cardCount: document.querySelectorAll('[role="article"]').length,
    };
};

const out = {};

async function arm(label, ctxOpts, fn) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...ctxOpts });
    await stub(ctx);
    const page = await ctx.newPage();
    await page.goto(`${ORIGIN}/#/browse`, { waitUntil: "load" });
    await page.waitForSelector('[role="article"]', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);
    out[label] = await fn(page);
    await browser.close();
}

// ── arm 1: normal register — the baseline ───────────────────────────────────
await arm("normal", {}, async (page) => {
    const r = await page.evaluate(READ, ROSTER);
    await page.screenshot({ path: `${OUT}D-p5-wall-normal.png`, fullPage: false });
    return r;
});

// ── arm 2: forced-colors: active (WHCM) ─────────────────────────────────────
await arm("forcedColors", { forcedColors: "active", colorScheme: "light" }, async (page) => {
    const r = await page.evaluate(READ, ROSTER);
    // expand a card so the SwatchHoverMenu WatercolorDots mount
    await page.locator('[role="article"]').first().click();
    await page.waitForTimeout(900);
    const expanded = await page.evaluate(READ, ROSTER);
    await page.screenshot({ path: `${OUT}D-p5-wall-forcedcolors.png`, fullPage: false });
    return { collapsed: r, expanded };
});

// ── arm 3: @media print ─────────────────────────────────────────────────────
await arm("print", {}, async (page) => {
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(400);
    const r = await page.evaluate(READ, ROSTER);
    await page.screenshot({ path: `${OUT}D-p5-wall-print.png`, fullPage: false });
    return r;
});

// ── arm 4: load-more focus destruction ──────────────────────────────────────
await arm("loadMoreFocus", {}, async (page) => {
    const btn = page.getByRole("button", { name: /More from the commons/i });
    const present = await btn.count();
    if (!present) return { present: 0, note: "trigger absent — hasMore false" };
    await btn.focus();
    const before = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        name: document.activeElement?.textContent?.trim().slice(0, 40),
    }));
    await page.keyboard.press("Enter");
    await page.waitForTimeout(120);
    const during = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        isBody: document.activeElement === document.body,
        skeletons: document.querySelectorAll('[aria-label="Loading more palettes"] > *').length,
    }));
    await page.waitForTimeout(2500);
    const after = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        isBody: document.activeElement === document.body,
        name: document.activeElement?.textContent?.trim().slice(0, 40),
    }));
    return { present, before, during, after };
});

writeFileSync(`${OUT}D-p5-modality.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
