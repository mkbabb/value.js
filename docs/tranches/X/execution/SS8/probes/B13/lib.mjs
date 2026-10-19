// SS-8 · B13-card-swatches — shared probe harness.
// One browser per run (caller), one context per cell, all closed in finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B13-card-swatches");
mkdirSync(EVID, { recursive: true });
export const BASE = "http://localhost:9000";

const HUES = [
    "#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2",
    "#db2777", "#65a30d", "#ea580c", "#4f46e5", "#0d9488", "#ca8a04",
];
const colorsN = (n) =>
    Array.from({ length: n }, (_, i) => ({ css: HUES[i % HUES.length], position: i }));

const NOW = "2026-10-19T00:00:00.000Z";
export function palette(name, n, extra = {}) {
    return {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        userSlug: "gallery",
        colors: colorsN(n),
        createdAt: NOW,
        updatedAt: NOW,
        isLocal: false,
        voteCount: 1,
        visibility: "public",
        tier: "standard",
        published: true,
        ...extra,
    };
}

export const WALL = [
    palette("Probe Five", 5),
    palette("Probe Twentyfour", 24),
    palette("Probe Two", 2),
    palette("Probe Twelve", 12),
    palette("Probe Six", 6),
    palette("Probe Three", 3),
];

/** Route the REST `GET /palettes` (never Vite's source modules) to the wall. */
export async function routeWall(page, wall = WALL) {
    await page.route(
        (url) =>
            !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) &&
            !/\.\w+$/.test(url.pathname) &&
            /(^|\/)palettes(\/|$)/.test(url.pathname),
        (route) => {
            if (route.request().method() !== "GET") return route.continue();
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: wall, nextCursor: null, hasMore: false }),
            });
        },
    );
}

export async function launch() {
    return chromium.launch({ headless: true });
}

/** Run one cell in a fresh context; the context closes in finally. */
export async function cell(browser, opts, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page);
        return { ...out, pageErrors: errors.slice(0, 5) };
    } catch (e) {
        return { error: String(e).slice(0, 400) };
    } finally {
        await ctx.close();
    }
}

export function save(name, obj) {
    const p = resolve(EVID, name);
    writeFileSync(p, JSON.stringify(obj, null, 2));
    return p;
}

export async function gotoBrowse(page, route = "#/browse") {
    await page.goto(`${BASE}/${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('[role="article"][aria-label^="Palette: Probe"]', { timeout: 30000 });
    await page.waitForTimeout(800);
}
