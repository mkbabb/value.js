#!/usr/bin/env node
// OD19 repair 3 (C3-V-01) — does turning Tailwind's automatic source detection off drop a utility the app uses?
// Loads every route at 1440 and 390, light and dark, with the dock's Tools face opened once per cell, unions every
// class token present in the DOM, and intersects it with the selectors the `source(none)` compile no longer
// emits (r3-tw-scan.mjs diff). The falsifier is an empty intersection.
// usage: node r3-dom-classes.mjs <origin> <tw-scan.json> <out.json>   (one headless browser, a context per cell)
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const [ORIGIN, SCAN, OUT] = process.argv.slice(2);
const lost = new Set(JSON.parse(readFileSync(SCAN, "utf8")).lostWithNone
    .map((s) => s.match(/^\.((?:\\.|[^\s:>+~,.[\]()])+)/)?.[1]).filter(Boolean).map((c) => c.replace(/\\(.)/g, "$1")));
const ROUTES = ["", "palettes", "browse", "extract", "mix", "generate", "gradient", "atmosphere", "blob", "admin/users"];
const all = new Set(); const cells = [];
const browser = await chromium.launch({ headless: true });
try {
    for (const [w, h] of [[1440, 900], [390, 844]]) for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
        try {
            await ctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "od19-r3-probe"); } catch {} });
            const page = await ctx.newPage();
            const grab = async () => { for (const c of await page.evaluate(() => [...new Set([...document.querySelectorAll("*")].flatMap((e) => [...e.classList]))])) all.add(c); };
            for (const r of ROUTES) {
                await page.goto(`${ORIGIN}/#/${r}`, { waitUntil: "load", timeout: 120000 });
                await page.waitForFunction(() => document.querySelectorAll("main .pane-wrapper").length > 0, null, { timeout: 60000 }).catch(() => {});
                await page.waitForTimeout(600);
                await grab();
            }
            await page.goto(`${ORIGIN}/#/`, { waitUntil: "load" });
            // the Tools face, then its colour-input face (each grabbed while open)
            for (const label of ["Toggle action bar", "Open color input"]) {
                const b = page.locator(`.glass-dock button[aria-label="${label}"]`).first();
                if (await b.count()) { await b.click().catch(() => {}); await page.waitForTimeout(900); await grab(); }
            }
            cells.push(`${scheme}-${w}`);
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
const hit = [...all].filter((c) => lost.has(c));
const res = { cells, domClasses: all.size, lostSelectors: lost.size, inDomAndLost: hit, verdict: hit.length === 0 ? "GREEN" : "RED" };
writeFileSync(OUT, JSON.stringify(res, null, 2));
console.log(JSON.stringify(res));
