/**
 * Shared probe browser: ONE browser per run (or per lane), one fresh context per cell.
 *
 *   import { withBrowser } from "./lib/probe-browser.mjs";
 *   await withBrowser(async (newCell) => {
 *       const ctx = await newCell({ viewport, colorScheme });
 *       try { ... } finally { await ctx.close(); }   // newCell's ctx is also
 *   }, { gpu: false });                               // closed by withBrowser
 *
 * Why: the per-cell pattern (launch a full Chrome per capture cell, retry up to 3x)
 * spawned a browser + GPU/renderer/network helpers for every cell, which on this
 * shared Mac piled up as dozens of "Google Chrome for Testing" processes. A
 * context gives each cell the same isolation (fresh storage, colour scheme,
 * viewport) for the price of one renderer.
 *
 * gpu:false (default)  Playwright's headless shell (chromium.launch({headless:true})):
 *                      no full-browser GPU process tree; fine for DOM / computed-style
 *                      readings.
 * gpu:true             the real Google Chrome binary in new-headless mode
 *                      (channel "chrome", COHESION §0ei) — for @gpu / ANGLE-Metal
 *                      witnesses where the GPU is actually being measured. Never headed.
 *
 * The browser is relaunched only when it disconnects (crash); a cell that throws
 * does not cost a relaunch. Every context and the browser close in `finally`.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export async function withBrowser(fn, { gpu = false, args = [], chromium: injected } = {}) {
    const chromium = injected ?? (await import(path.join(ROOT, "node_modules/playwright/index.mjs"))).chromium;
    const launchOpts = gpu
        ? { channel: "chrome", headless: true, args: ["--use-angle=metal", ...args] }
        : { headless: true, args };

    let browser = null;
    const contexts = new Set();
    const ensure = async () => {
        if (browser && browser.isConnected()) return browser;
        browser = await chromium.launch(launchOpts);
        return browser;
    };

    const newCell = async (opts = {}) => {
        const b = await ensure();
        const ctx = await b.newContext(opts);
        contexts.add(ctx);
        ctx.on("close", () => contexts.delete(ctx));
        return ctx;
    };

    try {
        return await fn(newCell);
    } finally {
        for (const ctx of contexts) await ctx.close().catch(() => {});
        if (browser) await browser.close().catch(() => {});
    }
}
