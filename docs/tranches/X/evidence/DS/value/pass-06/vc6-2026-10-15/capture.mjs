#!/usr/bin/env node
// X-DS · value · pass 6 (critic VC6, 2026-10-15) — AFTER frames for the VC6 cure, the same
// cells as pass-00 (9 routes x light/dark x 1440/390). Real Chrome, new headless (§0ei).
// Carried from pass-05/vc5-2026-10-15/capture.mjs; the boot + body-voice gate + role=alert
// refusal now live in ./harness.mjs, shared with this pass's probes (VC6-02).
// VC6-03: /#/browse is shot on the fixture wall (harness routeBrowseFixture — an in-page
// fetch answer; this host has no API) and only once a role=article card stands, so the
// Browse set frames real community cards rather than the loading skeletons.
// usage: node capture.mjs [--base http://localhost:9000] [--only browse] [--par 2]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = path.resolve(opt("out", import.meta.dirname));
const ONLY = opt("only", "");
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
    let error = "";
    for (let attempt = 1; attempt <= 3; attempt++) {
        let browser;
        try {
            browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
            const page = await newPage(browser, width, theme);
            if (name === "browse") await routeBrowseFixture(page);
            await bootRoute(page, BASE + ROUTES[name], { waitArticle: name === "browse" });
            await page.screenshot({ path: path.join(OUT, file) });
            return { name: file, ok: true, attempt };
        } catch (e) {
            error = String(e).slice(0, 200);
        } finally {
            try { await browser?.close(); } catch {}
        }
    }
    return { name: file, ok: false, error };
}

let next = 0;
await Promise.all(Array.from({ length: Number(opt("par", "2")) }, async () => {
    while (next < jobs.length) {
        const r = await shoot(jobs[next++]);
        results.push(r);
        console.log(JSON.stringify(r));
    }
}));
results.sort((a, b) => a.name.localeCompare(b.name));
if (!ONLY) fs.writeFileSync(path.join(OUT, "capture-manifest.json"), JSON.stringify({ base: BASE, routes: Object.values(ROUTES), results }, null, 2));
console.log("FAILED", results.filter((r) => !r.ok).length, "OF", results.length);
