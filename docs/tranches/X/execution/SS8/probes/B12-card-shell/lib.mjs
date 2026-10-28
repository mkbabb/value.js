// SERVED MODEL: claude-opus-5-5 · SS-8 · B12-card-shell — shared probe harness.
// One browser per run (caller), one context per cell, every context closed in finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B12-card-shell");
mkdirSync(EVID, { recursive: true });
export const BASE = "http://localhost:9000";
export const API = "http://localhost:3000";

const HUES = ["#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#0891b2", "#db2777", "#65a30d"];
const NOW = "2026-10-19T00:00:00.000Z";
export function palette(name, n, extra = {}) {
    return {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        userSlug: "gallery",
        colors: Array.from({ length: n }, (_, i) => ({ css: HUES[i % HUES.length], position: i })),
        createdAt: NOW, updatedAt: NOW, isLocal: false, voteCount: 3, voted: false,
        visibility: "public", tier: "standard", published: true, tags: [], versionCount: 1, forkCount: 0,
        ...extra,
    };
}
export const WALL = [
    palette("Probe Featured", 5, { tier: "featured", tags: ["warm", "sunset"] }),
    palette("Probe Five", 5, { tags: ["ocean", "calm", "teal", "deep"] }),
    palette("Probe Long Tags", 5, { tags: ["a".repeat(30), "b".repeat(30), "c".repeat(30)] }),
    palette("Probe Three", 3),
    palette("Probe Eight", 8, { versionCount: 3 }),
    palette("Probe Two", 2),
];

const isApi = (url) =>
    !/\/(@fs|@id|@vite|node_modules)\//.test(url.pathname) && !/\.\w+$/.test(url.pathname) &&
    /(^|\/)palettes(\/|$)/.test(url.pathname);

/** Route GET /palettes (REST, never Vite modules) to `wall`; record non-GET calls. */
export async function routeWall(page, wall = WALL, log = []) {
    await page.route(isApi, (route) => {
        const req = route.request();
        if (req.method() !== "GET") { log.push(`${req.method()} ${new URL(req.url()).pathname}`); return route.fulfill({ status: 200, contentType: "application/json", body: "{}" }); }
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: wall, nextCursor: null, hasMore: false }) });
    });
}

export const launch = () => chromium.launch({ headless: true });

export async function cell(browser, name, opts, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const t0 = Date.now();
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
        const out = await fn(page, ctx);
        return { cell: name, ms: Date.now() - t0, ...out, pageErrors: errors.slice(0, 5) };
    } catch (e) {
        return { cell: name, error: String(e).slice(0, 400) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export async function openBrowse(page, { scheme = "light", wall = WALL, log } = {}) {
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, scheme);
    await routeWall(page, wall, log);
    await page.goto(`${BASE}/#/browse`, { timeout: 90000 });
    await page.locator('[role="article"].palette-card').first().waitFor({ timeout: 60000 });
    await page.waitForTimeout(1200);
}
export const card = (page, name) => page.locator(`[role="article"][aria-label="Palette: ${name}"]`);
export function save(file, obj) { writeFileSync(resolve(EVID, file), JSON.stringify(obj, null, 1)); }

/** Install colour helpers on window: __rgba(css) via a 1x1 canvas; __lum; __cr; __modePx(dataUrl). */
export async function installColor(page) {
    await page.evaluate(() => {
        const cv = document.createElement("canvas"); cv.width = cv.height = 1;
        const cx = cv.getContext("2d", { willReadFrequently: true });
        window.__rgba = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
        window.__over = (top, bot) => { const a = top[3]; return [0, 1, 2].map((i) => top[i] * a + bot[i] * (1 - a)).concat(1); };
        const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        window.__lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
        window.__cr = (a, b) => { const [x, y] = [window.__lum(a), window.__lum(b)].sort((p, q) => q - p); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100; };
        window.__modePx = (url, rect) => new Promise((res) => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const g = c.getContext("2d"); g.drawImage(im, 0, 0); const d = g.getImageData(0, 0, im.width, im.height).data; const m = new Map(); for (let i = 0; i < d.length; i += 4) { const k = `${d[i]},${d[i + 1]},${d[i + 2]}`; m.set(k, (m.get(k) || 0) + 1); } const top = [...m.entries()].sort((p, q) => q[1] - p[1]).slice(0, 3); res(top.map(([k, n]) => [k.split(",").map(Number), n])); }; im.src = url; });
    });
}
/** Dominant pixel colours of an element's painted box (screenshot read). */
export async function modePixels(page, locator) {
    const buf = await locator.screenshot();
    return page.evaluate((u) => window.__modePx(u), "data:image/png;base64," + buf.toString("base64"));
}
