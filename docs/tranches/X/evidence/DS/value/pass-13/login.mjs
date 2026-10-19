#!/usr/bin/env node
// X-DS · value · pass 13 (critic V13, 2026-10-16) — the dock login layer (V13-01/V13-02):
// frames login-{1440,390}-{light,dark}.png and a probe of the slug field's computed fill
// against the Browse search pill's (the seated-well register it must match), plus the
// placeholder's ink (V13-02, glass-owned, measured only). Real Chrome, new headless (§0ei).
// usage: node login.mjs [--base http://localhost:9011]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage, routeBrowseFixture } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9011");
const OUT = import.meta.dirname;
const out = [];

for (const theme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
        const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
        try {
            const page = await newPage(browser, width, theme);
            await routeBrowseFixture(page);
            await bootRoute(page, BASE + "/#/browse", { waitArticle: true });
            const pill = await page.evaluate(() => {
                const el = document.querySelector(".search-seated");
                return el ? getComputedStyle(el).backgroundColor : null;
            });
            let login = page.getByRole("button", { name: /Login/ }).first();
            if (!(await login.isVisible().catch(() => false))) {
                // 390: the login lives behind the overflow menu
                await page.getByRole("button", { name: /more|menu/i }).first().click();
                await page.waitForTimeout(600);
                login = page.getByRole("menuitem", { name: /Login/ }).first();
            }
            await login.click();
            await page.waitForTimeout(1200);
            const field = await page.evaluate(() => {
                const el = document.querySelector("input[aria-label='Slug or admin token']");
                if (!el) return null;
                const cs = getComputedStyle(el);
                const ph = getComputedStyle(el, "::placeholder");
                const dock = el.closest(".glass-dock");
                return {
                    background: cs.backgroundColor,
                    backdrop: cs.backdropFilter,
                    color: cs.color,
                    placeholder: ph.color,
                    inputOnGlass: dock ? getComputedStyle(dock).getPropertyValue("--input-on-glass").trim() : null,
                    inDock: !!dock,
                };
            });
            const file = `login-${width}-${theme}.png`;
            await page.screenshot({ path: path.join(OUT, file) });
            out.push({ theme, width, file, browseSearchPill: pill, field, match: !!field && field.background === pill });
        } catch (e) {
            out.push({ theme, width, error: String(e).slice(0, 300) });
        } finally {
            await browser.close();
        }
    }
}
fs.writeFileSync(path.join(OUT, "login.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
