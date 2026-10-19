#!/usr/bin/env node
// X-DS · value · pass 11 (critic V11, 2026-10-16) — V11-T1: the dead hover-lift lighting tokens.
// Real Chrome, new headless (§0ei); one browser per cell, closed in a finally.
// Per theme at 1440: reads the root's --shadow-card-hover (expected empty: the alias is deleted),
// --shadow-cartoon-hover (expected glass's own default, no value.js override) and --shadow-cartoon
// (value's 8px stamp, kept), then hovers the plates, palette cards, swatches and the hero and
// records box-shadow before and after the hover (expected unchanged on every one).
// usage: node probe-v11.mjs [--base http://localhost:9000]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = import.meta.dirname;

const TARGETS = [
    ["picker", "/#/", ['[data-slot="card"]', "canvas", "button[aria-label*='watch' i]"]],
    ["browse", "/#/browse", ['[role="article"]', '[data-slot="card"]']],
    ["palettes", "/#/palettes", ['[data-slot="card"]', '[role="article"]', "button"]],
];

const results = [];
for (const theme of ["light", "dark"]) {
    for (const [name, route, sels] of TARGETS) {
        let browser;
        const cell = { theme, name, tokens: null, hovers: [], error: "" };
        try {
            browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
            const page = await newPage(browser, 1440, theme);
            if (name === "browse") await routeBrowseFixture(page);
            await bootRoute(page, BASE + route, { waitArticle: name === "browse" });
            cell.tokens = await page.evaluate(() => {
                const s = getComputedStyle(document.documentElement);
                const g = (k) => s.getPropertyValue(k).trim();
                return { shadowCardHover: g("--shadow-card-hover"), shadowCartoonHover: g("--shadow-cartoon-hover"), shadowCartoon: g("--shadow-cartoon"), shadowCard: g("--shadow-card") };
            });
            for (const sel of sels) {
                const loc = page.locator(sel);
                const n = Math.min(await loc.count(), 3);
                for (let i = 0; i < n; i++) {
                    const el = loc.nth(i);
                    if (!(await el.isVisible())) continue;
                    const before = await el.evaluate((e) => getComputedStyle(e).boxShadow);
                    await el.hover({ timeout: 3000 }).catch(() => {});
                    await page.waitForTimeout(600);
                    const after = await el.evaluate((e) => getComputedStyle(e).boxShadow);
                    cell.hovers.push({ sel, i, changed: before !== after, before, after });
                }
            }
            if (name === "picker") await page.screenshot({ path: path.join(OUT, `hover-picker-1440-${theme}.png`) });
        } catch (e) {
            cell.error = String(e).slice(0, 300);
        } finally {
            await browser?.close();
        }
        results.push(cell);
        console.log(theme, name, JSON.stringify(cell.tokens), "hovered", cell.hovers.length, "changed", cell.hovers.filter((h) => h.changed).length, cell.error);
    }
}
fs.writeFileSync(path.join(OUT, "probe-v11.json"), JSON.stringify(results, null, 2));
