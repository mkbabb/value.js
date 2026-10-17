#!/usr/bin/env node
// X-DS · value · pass 5 (critic VP5, 2026-10-17) — the config pane's fold geometry (VP5-01)
// and the Mix Palettes tab's empty voice (VP5-02). Real Chrome, new headless (§0ei).
// usage: node probe-vp5.mjs [--base http://localhost:9231] [--out probe-vp5.json] [--shots 1]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9231");
const OUT = opt("out", "probe-vp5.json");
const SHOTS = opt("shots", "0") === "1";
const DIR = import.meta.dirname;
const out = { base: BASE, fold: [], mix: [] };

async function fold(browser, w, h, theme, route) {
    const page = await newPage(browser, w, theme);
    await page.setViewportSize({ width: w, height: h });
    await bootRoute(page, BASE + route);
    await page.waitForTimeout(1200);
    const r = await page.evaluate(() => {
        const well = document.querySelector(".config-console");
        const port = well?.closest(".fading-scroll");
        const foot = document.querySelector(".config-action-bar");
        if (!well || !port || !foot) return { error: "no pane" };
        const pr = port.getBoundingClientRect();
        const cs = getComputedStyle(port);
        const rows = [...well.querySelectorAll(".configurator-row, .config-section-title")].map((e) => {
            const b = e.getBoundingClientRect();
            return { top: Math.round(b.top), bottom: Math.round(b.bottom), text: e.textContent.trim().slice(0, 24) };
        });
        const pitch = rows.filter((x, i) => i && !rows[i - 1].text.match(/^[A-Z][a-z]+$/)).map((x, i, a) => i ? x.top - a[i - 1].top : 0);
        const cut = rows.find((x) => x.top < pr.bottom && x.bottom > pr.bottom);
        const lastFull = rows.filter((x) => x.bottom <= pr.bottom).pop() ?? null;
        return {
            footMarginTop: getComputedStyle(foot).marginBlockStart,
            lastFullRow: lastFull,
            portTop: Math.round(pr.top), portBottom: Math.round(pr.bottom), footTop: Math.round(foot.getBoundingClientRect().top),
            fadeWidth: cs.getPropertyValue("--fade-scroll-width").trim(), fadeEnd: port.style.getPropertyValue("--fade-end"),
            maskImage: cs.maskImage.slice(0, 140),
            cutRow: cut ? { ...cut, visiblePx: Math.round(pr.bottom - cut.top) } : null,
            rows: rows.slice(0, 12),
        };
    });
    const shot = `${route.replace("/#/", "")}-${w}x${h}-${theme}.png`;
    if (SHOTS) await page.screenshot({ path: path.join(DIR, shot) });
    // Pixel read: the well's side hairline alpha at the footer seam vs 60px above it.
    out.fold.push({ w, h, theme, route, shot: SHOTS ? shot : null, ...r });
    await page.context().close();
}

async function mixEmpty(browser, w, theme) {
    const page = await newPage(browser, w, theme);
    await bootRoute(page, BASE + "/#/mix");
    const tab = page.getByRole("tab", { name: "Palettes" }).first();
    await tab.click();
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
        const panel = document.getElementById("mix-source-palettes");
        const sec = document.querySelector('section[aria-label="Saved palettes"]');
        return {
            caption: panel?.querySelector("p")?.textContent.trim() ?? null,
            emptyState: sec?.textContent.replace(/\s+/g, " ").trim().slice(0, 140) ?? null,
            savedRows: sec?.querySelectorAll("li").length ?? -1,
        };
    });
    const shot = `mixpal-${w}-${theme}.png`;
    if (SHOTS) await page.screenshot({ path: path.join(DIR, shot) });
    out.mix.push({ w, theme, shot: SHOTS ? shot : null, ...r });
    await page.context().close();
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
    for (const theme of ["light", "dark"]) {
        for (const [w, h] of [[1440, 900], [1280, 800]]) {
            await fold(browser, w, h, theme, "/#/blob");
            await fold(browser, w, h, theme, "/#/atmosphere");
        }
        await mixEmpty(browser, 1440, theme);
    }
} finally {
    await browser.close();
}
fs.writeFileSync(path.join(DIR, OUT), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
