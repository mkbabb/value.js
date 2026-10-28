// SS-8 · B21-gradient-easing — shared probe harness.
// One browser per run (caller), one context per cell, every context closed in finally.
import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B21-gradient-easing");
mkdirSync(EVID, { recursive: true });
export const BASE = "http://localhost:9000";

export async function launch(engine = "chromium") {
    return (engine === "webkit" ? webkit : chromium).launch({ headless: true });
}

/** One cell in a fresh context. opts: { w, h, dark, init(page-script), setup(ctx) } */
export async function cell(browser, opts, fn) {
    const { w = 1440, h = 900, dark = false, setup, ...ctxOpts } = opts;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: dark ? "dark" : "light", ...ctxOpts });
    try {
        await ctx.addInitScript((dark) => {
            try { localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light"); } catch {}
        }, dark);
        if (setup) await setup(ctx);
        const page = await ctx.newPage();
        const errors = [], consoleErr = [];
        page.on("pageerror", (e) => errors.push(String(e).slice(0, 240)));
        page.on("console", (m) => { if (m.type() === "error") consoleErr.push(m.text().slice(0, 240)); });
        const out = await fn(page, ctx);
        return { ...out, pageErrors: errors.slice(0, 6), consoleErrors: consoleErr.slice(0, 6) };
    } catch (e) {
        return { error: String(e).slice(0, 500) };
    } finally {
        await ctx.close().catch(() => {});
    }
}

export const EDITOR = '[role="textbox"][aria-label="Gradient CSS"]';

export async function goGradient(page) {
    await page.goto(`${BASE}/#/gradient`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(EDITOR, { timeout: 20000 });
    await page.waitForTimeout(1500);
}

/** Replace the editor text by keyboard (select-all + type), then wait out the 500 ms debounce. */
export async function typeCSS(page, text, { blur = false, wait = 800 } = {}) {
    await page.click(EDITOR);
    await page.keyboard.press("ControlOrMeta+a");
    await page.keyboard.press("Backspace");
    await page.keyboard.insertText(text);
    await page.waitForTimeout(wait);
    if (blur) { await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(300); }
}

export function save(name, obj) {
    const p = resolve(EVID, name);
    writeFileSync(p, JSON.stringify(obj, null, 1));
    return p;
}

// WCAG relative luminance contrast from [r,g,b] 0..255.
export function cr(a, b) {
    const L = ([r, g, bb]) => {
        const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bb);
    };
    const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
    return +((x + 0.05) / (y + 0.05)).toFixed(2);
}

// B21 helpers: open interval row i (0-based) and its authoring stage.
export async function openRow(page, i = 0) {
    const heads = page.locator(".easing-panel .interval-head");
    await heads.nth(i).click();
    await page.waitForTimeout(500);
}
export async function openTune(page, i = 0) {
    await page.locator(`button[aria-controls="easing-authoring-${i}"]`).click();
    await page.waitForTimeout(600);
}
export function argCells() { return process.argv.slice(2).join(",").split(",").filter(Boolean); }
