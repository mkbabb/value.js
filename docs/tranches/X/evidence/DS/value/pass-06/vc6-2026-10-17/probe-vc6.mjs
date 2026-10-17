#!/usr/bin/env node
// X-DS · value · pass 6 (critic VC6, 2026-10-17) — VC6-01 probe: every dock-seated menu's top
// against the dock plate's bottom. Gate: menu.top >= dock.bottom + 4. Real Chrome, new
// headless (§0ei); one browser per cell, closed in a finally.
// usage: node probe-vc6.mjs [--base http://localhost:9241] [--out probe-vc6-after.json]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "../../pass-05/vp5-2026-10-17/harness.mjs";

const args = process.argv.slice(2);
const arg = (k, d) => (args.indexOf(k) >= 0 ? args[args.indexOf(k) + 1] : d);
const BASE = arg("--base", "http://localhost:9241");
const OUT = arg("--out", "probe-vc6-after.json");
const DIR = import.meta.dirname;
const TAG = arg("--tag", "");

const cells = [];
for (const theme of ["light", "dark"]) {
    cells.push({ name: `usermenu-1440-${theme}`, theme, width: 1440, url: "/#/", trigger: "@mbabb" });
    cells.push({ name: `dockmenu-390-${theme}`, theme, width: 390, url: "/#/", trigger: "Menu" });
    // GenericActionBar's overflow menu: shown only when the face cannot seat every action.
    for (const w of [390, 1440]) for (const r of ["/#/", "/#/mix", "/#/gradient", "/#/palettes", "/#/blob"])
        cells.push({ name: `moreactions-${w}-${theme}-${r.slice(3) || "picker"}`, theme, width: w, url: r, trigger: "More actions", optional: true, bar: true });
}

const results = [];
for (const c of cells) {
    let browser;
    try {
        browser = await chromium.launch({ channel: "chrome", headless: true });
        const page = await newPage(browser, c.width, c.theme);
        await bootRoute(page, BASE + c.url);
        if (c.bar) {
            const tog = page.getByRole("button", { name: "Toggle action bar" }).first();
            if (await tog.isVisible().catch(() => false)) { await tog.click(); await page.waitForTimeout(900); }
        }
        const t = page.getByRole("button", { name: c.trigger, exact: true }).first();
        if (c.optional && !(await t.isVisible().catch(() => false))) {
            results.push({ name: c.name, skipped: "trigger not shown" });
            console.log(JSON.stringify(results.at(-1)));
            continue;
        }
        await t.click();
        await page.getByRole("menu").first().waitFor();
        await page.waitForTimeout(700);
        const m = await page.evaluate((name) => {
            const r = (el) => { const b = el.getBoundingClientRect(); return { top: +b.top.toFixed(1), bottom: +b.bottom.toFixed(1), left: +b.left.toFixed(1), right: +b.right.toFixed(1) }; };
            const menu = document.querySelector('[role="menu"]');
            const dock = document.querySelector(".glass-dock");
            const trig = [...document.querySelectorAll("button,[role=button]")].find((b) => (b.getAttribute("aria-label") || b.textContent.trim()) === name && b.getAttribute("aria-expanded") === "true");
            return { menu: r(menu), dock: r(dock), trigger: trig ? r(trig) : null };
        }, c.trigger);
        const gap = +(m.menu.top - m.dock.bottom).toFixed(1);
        await page.screenshot({ path: path.join(DIR, `${c.name}${TAG}.png`) });
        results.push({ name: c.name, ...m, gap, pass: gap >= 4 });
    } catch (e) {
        results.push({ name: c.name, error: String(e).slice(0, 200) });
    } finally {
        try { await browser?.close(); } catch {}
    }
    console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(path.join(DIR, OUT), JSON.stringify({ base: BASE, results }, null, 2));
