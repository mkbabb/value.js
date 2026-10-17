#!/usr/bin/env node
// X-DS · value · pass 6 (critic VC6, 2026-10-17) — AFTER frames for the critic's cells:
// /#/blob and /#/atmosphere (1440, 390), /#/mix Palettes tab (1440, 390), the dock profile
// menu at 1440 and the mobile menu at 390 (VC6-01: the menus now hang below the dock), and /#/blob at
// 1440x900 + 1280x800 (VC6-T2, held), light and dark. Real Chrome, new
// headless (§0ei); one browser per cell, closed in a finally.
// usage: node capture-vc6.mjs [--base http://localhost:9241]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "../../pass-05/vp5-2026-10-17/harness.mjs";

const args = process.argv.slice(2);
const BASE = args.indexOf("--base") >= 0 ? args[args.indexOf("--base") + 1] : "http://localhost:9241";
const DIR = import.meta.dirname;
const cells = [];
for (const theme of ["light", "dark"]) {
    for (const width of [1440, 390]) {
        cells.push({ name: `blob-${width}-${theme}`, theme, width, url: "/#/blob" });
        cells.push({ name: `atmosphere-${width}-${theme}`, theme, width, url: "/#/atmosphere" });
        cells.push({ name: `mixpal-${width}-${theme}`, theme, width, url: "/#/mix", act: async (p) => {
            await p.getByRole("tab", { name: "Palettes" }).first().click();
            await p.waitForTimeout(900);
        } });
    }
    for (const [w, h] of [[1440, 900], [1280, 800]])
        cells.push({ name: `blob-${w}x${h}-${theme}`, theme, width: w, height: h, url: "/#/blob" });
    cells.push({ name: `usermenu-1440-${theme}`, theme, width: 1440, url: "/#/", act: async (p) => {
        await p.getByRole("button", { name: "@mbabb" }).first().click();
        await p.getByRole("menu").first().waitFor();
        await p.waitForTimeout(700);
    }, menu: true });
    cells.push({ name: `dockmenu-390-${theme}`, theme, width: 390, url: "/#/", act: async (p) => {
        await p.getByRole("button", { name: "Menu" }).first().click();
        await p.getByRole("menu").first().waitFor();
        await p.waitForTimeout(700);
    }, menu: true });
}
const results = [];
for (const c of cells) {
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true });
        const page = await newPage(browser, c.width, c.theme);
        if (c.height) await page.setViewportSize({ width: c.width, height: c.height });
        await bootRoute(page, BASE + c.url);
        if (c.act) await c.act(page);
        const header = c.menu
            ? await page.evaluate(() => {
                const m = document.querySelector('[role="menu"]');
                const a = m?.querySelector('a[href="https://github.com/mkbabb"]');
                const top = m.getBoundingClientRect().top, dock = document.querySelector(".glass-dock").getBoundingClientRect().bottom;
                return { handle: a?.textContent.trim() ?? null, menuTop: top, dockBottom: dock, gap: +(top - dock).toFixed(1) };
            })
            : null;
        await page.screenshot({ path: path.join(DIR, `${c.name}.png`) });
        results.push({ name: c.name, ok: true, header });
    } catch (e) {
        results.push({ name: c.name, ok: false, error: String(e).slice(0, 200) });
    } finally {
        try { await browser?.close(); } catch {}
    }
    console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(path.join(DIR, "capture-vc6.json"), JSON.stringify({ base: BASE, results }, null, 2));
