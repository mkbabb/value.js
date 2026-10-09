#!/usr/bin/env node
// X-DS · value · pass 8 — AFTER frames (critic V3C cure), the same cells as pass-00
// (9 routes x light/dark x 1440/390). Real Chrome, new headless (§0ei).
// One browser per frame, three attempts each, four frames at a time: the host
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
await Promise.all(Array.from({ length: 4 }, async () => {
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
