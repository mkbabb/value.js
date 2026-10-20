// SERVED MODEL: claude-opus-5-5 — SS-8 Z1-app-chassis shared helpers (read-only instruments).
import { writeFileSync, mkdirSync } from "node:fs";
export const ORIGIN = process.env.ORIGIN ?? "http://localhost:9000";
export const EVID = new URL("../../evidence/Z1-app-chassis/", import.meta.url).pathname;
mkdirSync(EVID, { recursive: true });
export function save(name, data) {
    writeFileSync(EVID + name, typeof data === "string" ? data : JSON.stringify(data, null, 1));
}
export const r1 = (r) => r && { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
export async function boot(page, hash = "/", settle = 2500) {
    await page.goto("about:blank");
    await page.goto(`${ORIGIN}/#${hash}`, { waitUntil: "load", timeout: 180000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(settle);
}
export async function parkOnDock(page) {
    const b = await page.locator(".glass-dock").first().boundingBox();
    if (b) await page.mouse.move(b.x + 3, b.y + b.height / 2);
}
export const ROUTES = ["/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient", "/atmosphere", "/blob", "/admin/users", "/admin/names", "/admin/audit", "/admin/flagged", "/admin/tags"];
/** Run named cells: one browser per run, one context per cell, closed in finally. */
export async function runCells(launcher, CELLS, tag) {
    const pick = (process.env.CELLS ?? Object.keys(CELLS).join(",")).split(",");
    const browser = await launcher.launch({ headless: true });
    // BLOCK_REMOTE=1: every non-localhost request is aborted (the built artifact targets the
    // remote API by default; layout cells read no data and must not touch production).
    if (process.env.BLOCK_REMOTE) { const nc = browser.newContext.bind(browser); browser.newContext = async (o) => { const c = await nc(o); await c.route(/^https?:\/\/(?!localhost|127\.0\.0\.1)/, (r) => r.abort()); return c; }; }
    try {
        for (const c of pick) {
            const t0 = Date.now();
            let out;
            try { out = await CELLS[c](browser); } catch (e) { out = { error: String(e?.stack ?? e).slice(0, 800) }; }
            save(`${process.env.TAG ?? ""}${tag}-${c}.json`, { cell: c, ms: Date.now() - t0, at: new Date().toISOString(), out });
            console.log(c, JSON.stringify(out).slice(0, 300));
        }
    } finally { await browser.close(); }
}
