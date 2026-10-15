#!/usr/bin/env node
// X-DS · value · pass 5 (critic VC5) — probe for the VC5-02 / VC5-03 cures. Real Chrome, new headless (§0ei).
// VC5-03: on Home at 390, every About display-math row: overflow (scrollWidth > clientWidth), the
//   registered --katex-row-edge at rest and scrolled to the end, and a crop of the first overflowing row.
// VC5-02: the picker's Tools dock tooltips (Reset / Copy / Random): text and line count, plus a frame.
// usage: node probe-vc5-cure.mjs [--base http://localhost:9000]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const BASE = args.indexOf("--base") >= 0 ? args[args.indexOf("--base") + 1] : "http://localhost:9000";
const OUT = import.meta.dirname;
const out = { base: BASE, katex: {}, tooltips: {} };

async function boot(browser, width, theme) {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    const page = await ctx.newPage();
    await page.goto(BASE + "/#/", { waitUntil: "load", timeout: 300_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
    await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
    await page.waitForTimeout(4000);
    return page;
}

const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    for (const theme of (args.includes("--skip-katex") ? [] : ["light", "dark"])) {
        const page = await boot(browser, 390, theme);
        // the display rows mount under content-visibility:auto; walk them into view
        const rows = await page.evaluate(async () => {
            const sel = ".markdown-body > div.inline-block";
            const els = [...document.querySelectorAll(sel)].filter((el) => el.querySelector(":scope > .katex-display"));
            const res = [];
            for (const el of els) {
                el.scrollIntoView({ block: "center" });
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const over = el.scrollWidth > el.clientWidth + 1;
                const rest = getComputedStyle(el).getPropertyValue("--katex-row-edge").trim();
                let end = rest;
                if (over) {
                    el.scrollLeft = el.scrollWidth;
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                    end = getComputedStyle(el).getPropertyValue("--katex-row-edge").trim();
                    el.scrollLeft = 0;
                    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                }
                res.push({ text: (el.textContent || "").replace(/\s+/g, " ").slice(0, 48), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, overflows: over, edgeAtRest: rest, edgeAtEnd: end, maskImage: getComputedStyle(el).maskImage.slice(0, 90) });
            }
            return res;
        });
        out.katex[theme] = { rows: rows.length, overflowing: rows.filter((r) => r.overflows).length, detail: rows };
        const idx = await page.evaluate(() => {
            const els = [...document.querySelectorAll(".markdown-body > div.inline-block")].filter((el) => el.querySelector(":scope > .katex-display"));
            const i = els.findIndex((el) => el.scrollWidth > el.clientWidth + 1);
            if (i >= 0) { els[i].setAttribute("data-vc5-probe", ""); els[i].scrollIntoView({ block: "center" }); }
            return i;
        });
        if (idx >= 0) {
            await page.waitForTimeout(400);
            const row = page.locator("[data-vc5-probe]");
            const box = await row.boundingBox();
            await page.screenshot({ path: path.join(OUT, `katex-row-390-${theme}.png`), clip: { x: 0, y: Math.max(0, box.y - 120), width: 390, height: Math.min(844, box.height + 240) } });
        }
        await page.context().close();
        fs.writeFileSync(path.join(OUT, "probe-vc5-katex.json"), JSON.stringify(out.katex, null, 2));
    }
    for (const theme of ["light", "dark"]) {
        const page = await boot(browser, 1440, theme);
        const collapsed = page.locator(".glass-dock.collapsed");
        if (await collapsed.count()) { await collapsed.click(); await page.waitForTimeout(1500); }
        await page.getByRole("button", { name: "Toggle action bar" }).click({ timeout: 60_000 });
        await page.waitForFunction(() => !document.querySelector(".glass-dock[data-morphing]"), null, { timeout: 30_000 });
        await page.waitForTimeout(800);
        out.tooltips[theme] = {};
        for (const [name, token, desc] of [["Reset color", "color.reset", "Reset to the default color."], ["Copy color", "color.copy", "Copy the current color."], ["Random color", "color.random", "Pick a random color."]]) {
            const btn = page.locator(`[data-scene-action="${token}"]`).first();
            try {
                await btn.hover({ timeout: 10_000 });
                const tip = page.getByText(desc, { exact: true }).first();
                await tip.waitFor({ state: "visible", timeout: 10_000 });
                await page.waitForTimeout(400);
                const m = await tip.evaluate((p) => {
                    const lh = parseFloat(getComputedStyle(p).lineHeight) || 1;
                    const card = p.parentElement?.parentElement ?? p;
                    return { text: (p.textContent || "").trim(), descLines: Math.round(p.getBoundingClientRect().height / lh), descBox: p.getBoundingClientRect().toJSON(), cardText: (card.textContent || "").trim().slice(0, 80) };
                });
                out.tooltips[theme][name] = m;
                if (name === "Copy color") await page.screenshot({ path: path.join(OUT, `tools-1440-${theme}.png`) });
            } catch (e) {
                out.tooltips[theme][name] = { error: String(e).slice(0, 160) };
            }
            await page.mouse.move(5, 890);
            await page.waitForTimeout(500);
        }
        await page.context().close();
    }
} finally {
    await browser.close();
}
if (args.includes("--skip-katex")) { try { out.katex = JSON.parse(fs.readFileSync(path.join(OUT, "probe-vc5-katex.json"), "utf8")); } catch {} }
fs.writeFileSync(path.join(OUT, "probe-vc5-cure.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1).slice(0, 3000));
