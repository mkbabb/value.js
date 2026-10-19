#!/usr/bin/env node
// X-DS · value · pass 5 (critic VP5, 2026-10-17) — AFTER frames for the critic's cells:
// /#/blob and /#/atmosphere (1440, 390), /#/mix Palettes tab (1440, 390), the dock profile
// menu at 1440 and the mobile menu at 390 (VP5-04), light and dark. Real Chrome, new
// headless (§0ei); one browser per cell, closed in a finally.
// usage: node capture-vp5.mjs [--base http://localhost:9231]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";

const args = process.argv.slice(2);
const BASE = args.indexOf("--base") >= 0 ? args[args.indexOf("--base") + 1] : "http://localhost:9231";
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
        await bootRoute(page, BASE + c.url);
        if (c.act) await c.act(page);
        const header = c.menu
            ? await page.evaluate(() => {
                const m = document.querySelector('[role="menu"]');
                const a = m?.querySelector('a[href="https://github.com/mkbabb"]');
                return { handle: a?.textContent.trim() ?? null, strapline: /Color space picker/.test(m?.textContent ?? "") };
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
fs.writeFileSync(path.join(DIR, "capture-vp5.json"), JSON.stringify({ base: BASE, results }, null, 2));
