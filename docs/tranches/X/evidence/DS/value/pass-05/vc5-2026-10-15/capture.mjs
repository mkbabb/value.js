#!/usr/bin/env node
// X-DS · value · pass 5 (critic VC5, 2026-10-15) — AFTER frames for the VC5 cure, the same cells as pass-00
// (harness carried unchanged from pass-04/vc4-2026-10-15/capture.mjs)
// (9 routes x light/dark x 1440/390). Real Chrome, new headless (§0ei).
// VC4-05 (harness half): a LOADED Jakarta face is not enough under glass's
// `font-display: optional` — a page that missed the ~100 ms block period keeps
// the fallback for its lifetime even after the face loads. The gate now asks
// what the page RENDERS: a probe span in "Plus Jakarta Sans", monospace must
// measure differently from one in monospace alone; if not, the page is
// reloaded (the face is then warm) up to 4 times, and the attempt fails
// rather than ship a fallback-voiced frame.
// VR3-01: a frame is shot only once document.fonts holds a LOADED real
// 'Plus Jakarta Sans' face (never only the Arial-metric '… Fallback').
// VR3-10: a frame that carries a role=alert pane plate (a lazy chunk that
// missed its deadline) FAILS; it is never saved as evidence.
// One browser per frame, three attempts each, --par frames at a time (default 2): the host
// ran at load > 300 with other seats' browsers coming and going.
// usage: node capture.mjs [--base http://localhost:9173] [--only atmosphere,blob] [--out dir] [--skip-existing-after <epoch ms>]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = path.resolve(opt("out", import.meta.dirname));
const ONLY = opt("only", "");
const FRESH = Number(opt("skip-existing-after", "0"));
const ROUTES = {
    picker: "/#/", palettes: "/#/palettes", browse: "/#/browse", extract: "/#/extract",
    mix: "/#/mix", generate: "/#/generate", gradient: "/#/gradient",
    atmosphere: "/#/atmosphere", blob: "/#/blob",
};
const names = ONLY ? ONLY.split(",") : Object.keys(ROUTES);
const jobs = [];
for (const theme of ["light", "dark"]) for (const width of [1440, 390]) for (const name of names) jobs.push({ theme, width, name });
const results = [];

async function shoot({ theme, width, name }) {
    const file = `${name}-${width}-${theme}.png`;
    const target = path.join(OUT, file);
    if (FRESH && fs.existsSync(target) && fs.statSync(target).mtimeMs > FRESH) return { name: file, ok: true };
    let error = "";
    for (let attempt = 1; attempt <= 3; attempt++) {
        let browser;
        try {
            browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
            const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
            await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
            const page = await ctx.newPage();
            await page.goto(BASE + ROUTES[name], { waitUntil: "load", timeout: 300_000 });
            // the boot overture ends when the dock mounts; then let the panes land
            await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
            await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
            // lazy pane chunks: no "Loading the scene" plate may be standing
            await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
            await page.waitForTimeout(5000);
            // VR3-01: the true body face, loaded
            await page.evaluate(() => document.fonts.ready);
            await page.waitForFunction(
                () => [...document.fonts].some((f) => f.family.replace(/["']/g, "") === "Plus Jakarta Sans" && f.status === "loaded"),
                null, { timeout: 120_000 });
            const rendersJakarta = () => page.evaluate(() => {
                const mk = (ff) => {
                    const s = document.createElement("span");
                    s.textContent = "Hamburgefonstiv 0123456789";
                    s.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:40px;font-family:${ff}`;
                    document.body.appendChild(s);
                    const w = s.getBoundingClientRect().width;
                    s.remove();
                    return w;
                };
                return Math.abs(mk('"Plus Jakarta Sans", monospace') - mk("monospace")) > 1;
            });
            for (let r = 0; r < 4 && !(await rendersJakarta()); r++) {
                await page.reload({ waitUntil: "load", timeout: 300_000 });
                await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
                await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
                await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
                await page.waitForTimeout(3000);
            }
            if (!(await rendersJakarta())) throw new Error("body voice renders the fallback (font-display: optional missed)");
            // VR3-10 / VC3-04: an error plate also clears aria-busy and is a resting
            // card; it is not the scene. ANY main [role=alert] (EmptyState's error
            // variant, PaneErrorPlate) fails the attempt, which is then retried.
            const plate = await page.evaluate(() => {
                const el = document.querySelector('main [role="alert"]');
                return el ? (el.textContent || "role=alert").trim().slice(0, 80) : "";
            });
            if (plate) throw new Error("pane error plate: " + plate);
            await page.screenshot({ path: target });
            await browser.close();
            return { name: file, ok: true, attempt };
        } catch (e) {
            error = String(e).slice(0, 200);
            try { await browser?.close(); } catch {}
        }
    }
    return { name: file, ok: false, error };
}

let next = 0;
await Promise.all(Array.from({ length: Number(opt("par", "2")) }, async () => {
    while (next < jobs.length) {
        const job = jobs[next++];
        const r = await shoot(job);
        results.push(r);
        console.log(JSON.stringify(r));
    }
}));
results.sort((a, b) => a.name.localeCompare(b.name));
if (!ONLY) fs.writeFileSync(path.join(OUT, "capture-manifest.json"), JSON.stringify({ base: BASE, routes: Object.values(ROUTES), results }, null, 2));
console.log("FAILED", results.filter((r) => !r.ok).length, "OF", results.length);
