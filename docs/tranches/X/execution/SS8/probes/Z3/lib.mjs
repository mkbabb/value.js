// SS-8 · Z3-workbench-about-cohort — shared probe harness.
// One browser per run (the caller launches it), one context per cell, every context closed in finally.
// ORIGIN defaults to the BUILT gh-pages artifact; Z3_ORIGIN=http://localhost:9000/ selects DEV.
import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/Z3-workbench-about-cohort");
mkdirSync(EVID, { recursive: true });
export const ORIGIN = process.env.Z3_ORIGIN || "http://127.0.0.1:4417/";
export const TAG = process.env.Z3_TAG || "";

export async function launch(engine = process.env.Z3_ENGINE || "chromium") {
    return (engine === "webkit" ? webkit : chromium).launch({ headless: true });
}

/** One cell in a fresh context. opts: { w, h, dark, touch, mobile, init, setup } */
export async function cell(browser, name, opts, fn) {
    const { w = 1440, h = 900, dark = false, touch = false, mobile = false, init, setup, ...rest } = opts;
    const ctx = await browser.newContext({
        viewport: { width: w, height: h },
        colorScheme: dark ? "dark" : "light",
        hasTouch: touch,
        isMobile: mobile,
        ...rest,
    });
    const errors = [];
    try {
        await ctx.addInitScript((dark) => {
            try { localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light"); } catch {}
        }, dark);
        if (init) await ctx.addInitScript(init);
        if (setup) await setup(ctx);
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push("pageerror: " + String(e.message || e).slice(0, 240)));
        page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 200)); });
        const out = await fn(page, ctx);
        return { cell: name, ...out, errors: errors.slice(0, 8) };
    } catch (e) {
        return { cell: name, error: String(e).slice(0, 600), errors: errors.slice(0, 8) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export async function go(page, hash, waitSel, settle = 1500) {
    await page.goto(ORIGIN + hash, { waitUntil: "load", timeout: 60000 });
    if (waitSel) await page.waitForSelector(waitSel, { timeout: 30000 });
    await page.waitForTimeout(settle);
}

export function save(name, obj) {
    const p = resolve(EVID, name + TAG + ".json");
    writeFileSync(p, JSON.stringify(obj, null, 1));
    return p;
}
export const png = (name) => resolve(EVID, name + TAG + ".png");

/** Run the named cells (argv filter) sequentially in one browser, closed in finally. */
export async function runCells(file, cells) {
    const want = process.argv.slice(2);
    const browser = await launch();
    const out = {};
    try {
        for (const [name, fn] of Object.entries(cells)) {
            if (want.length && !want.includes(name)) continue;
            const t0 = Date.now();
            out[name] = await fn(browser);
            out[name].ms = Date.now() - t0;
            console.log(name, JSON.stringify(out[name]).slice(0, 300));
        }
    } finally {
        await browser.close().catch(() => {});
    }
    save(file + (want.length ? "-" + want.join("_") : ""), { origin: ORIGIN, engine: process.env.Z3_ENGINE || "chromium", at: new Date().toISOString(), out });
}

// In-page helpers (stringified into evaluate).
export const RGB = `(s)=>{const m=String(s).match(/rgba?\\(([^)]+)\\)/);if(!m)return null;return m[1].split(/[ ,/]+/).filter(Boolean).map(Number);}`;
export function cr(a, b) {
    const L = ([r, g, bb]) => {
        const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bb);
    };
    const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
    return +((x + 0.05) / (y + 0.05)).toFixed(2);
}
