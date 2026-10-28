// SS-8 · B22-gradient-specimen — shared probe harness.
// One browser per run (caller), one context per cell, every context closed in finally.
import { chromium, webkit } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const EVID = resolve(HERE, "../../evidence/B22-gradient-specimen");
mkdirSync(EVID, { recursive: true });
export const BASE = process.env.BASE || "http://localhost:9000";

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
        page.setDefaultNavigationTimeout(150000); page.setDefaultTimeout(60000);
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
    await page.waitForSelector(EDITOR, { timeout: 120000 });
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

