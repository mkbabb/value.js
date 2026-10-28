#!/usr/bin/env node
// OD19 repair 3 (C3-V-01) — load every route of a served dev origin so the dev server's module graph
// (and so its file watcher) holds what an owner's preview session loads; report time-to-response per route.
// usage: node r3-crawl.mjs <origin> [out.json]   (one headless browser, one context, closed in finally)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const ORIGIN = process.argv[2];
const ROUTES = ["", "palettes", "browse", "extract", "mix", "generate", "gradient", "atmosphere", "blob", "admin/users"];
const browser = await chromium.launch({ headless: true });
const rows = [];
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    for (const r of ROUTES) {
        const t0 = Date.now();
        let ok = true;
        try {
            await page.goto(`${ORIGIN}/#/${r}`, { waitUntil: "load", timeout: 90_000 });
            await page.waitForFunction(() => document.querySelectorAll("main .pane-wrapper").length > 0, null, { timeout: 60_000 });
        } catch (e) { ok = false; }
        rows.push({ route: r, ok, ms: Date.now() - t0 });
        console.log(JSON.stringify(rows.at(-1)));
    }
    await ctx.close();
} finally { await browser.close(); }
if (process.argv[3]) writeFileSync(process.argv[3], JSON.stringify(rows, null, 2));
