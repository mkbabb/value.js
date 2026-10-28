// SERVED MODEL: claude-opus-5-5 · SS-8 · Z2-picker-cohort — shared probe harness.
// One browser per run (the caller launches it), one context per cell, every
// context closed in `finally`; the caller closes the browser in its own finally.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/Z2-picker-cohort");
mkdirSync(EVID, { recursive: true });
export const ORIGIN = process.env.ORIGIN ?? "http://localhost:9000";

export const launch = () => chromium.launch({ headless: true });
export const r1 = (r) => r && { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
export function save(file, obj) { writeFileSync(resolve(EVID, file), typeof obj === "string" ? obj : JSON.stringify(obj, null, 1)); }

export async function cell(browser, name, opts, fn) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    const t0 = Date.now();
    const errors = [], consoleErrors = [], requests = [];
    try {
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 240)));
        page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleErrors.push(`${m.type()}: ${m.text().slice(0, 240)}`); });
        page.on("request", (r) => requests.push(r.url()));
        const out = await fn(page, ctx, { requests });
        return { cell: name, ms: Date.now() - t0, ...out, pageErrors: errors.slice(0, 8), console: consoleErrors.slice(0, 12) };
    } catch (e) {
        return { cell: name, ms: Date.now() - t0, error: String(e).slice(0, 600), pageErrors: errors.slice(0, 8), console: consoleErrors.slice(0, 12) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export async function boot(page, hash = "/", { scheme = "light", settle = 3000 } = {}) {
    await page.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, scheme);
    await page.goto(`${ORIGIN}/#${hash}`, { waitUntil: "load", timeout: 120000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(settle);
}

/** Picker readout state + URL + title (the four witnesses C-1/D-01 compare). */
export function pickerState(page) {
    return page.evaluate(() => {
        const ro = document.querySelector(".pane-shell .readout");
        const cells = ro ? [...ro.querySelectorAll(".readout-fig")].map((c) => c.textContent) : null;
        return { readout: cells, href: location.href, title: document.title };
    });
}
