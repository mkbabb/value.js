#!/usr/bin/env node
// X-DS · value · pass 7 — the V7C cure probe (headless real Chrome, §0ei).
// Reads: V7C-01 the gradient tile's box against the Direction row (390 and 1440);
// V7C-02 the config labels; V7C-03 the Atmosphere well's section heads;
// V7C-04 each follow-companion's card against its content and its row
// (Mix beside the picker; My Palettes beside Generate and Browse; About; Blob).
// usage: node probe-v7c.mjs [--base http://localhost:9000] [--out file] [--shots dir]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = path.resolve(opt("out", path.join(import.meta.dirname, "probe-v7c.json")));
const SHOTS = opt("shots", "");

async function open(browser, route, width, theme = "light") {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: theme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, theme);
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "load", timeout: 300_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
    await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
    await page.waitForTimeout(4000);
    return { ctx, page };
}

const companion = () => {
    const w = document.querySelector(".pane-wrapper--inspector");
    const s = document.querySelector(".pane-wrapper--stage");
    if (!w) return null;
    const root = w.querySelector(":scope > .pane-row-follow");
    const card = root?.matches(".card") ? root : root?.querySelector(".card");
    const r = (el) => (el ? Math.round(el.getBoundingClientRect().height) : null);
    // the content's own extent: the last descendant's bottom inside the card's scroll
    let contentBottom = 0;
    if (card) for (const el of card.querySelectorAll("*")) {
        const b = el.getBoundingClientRect();
        if (b.height > 0 && b.width > 0 && getComputedStyle(el).position !== "absolute") contentBottom = Math.max(contentBottom, b.bottom);
    }
    const cr = card?.getBoundingClientRect();
    return {
        pane: w.getAttribute("data-pane"),
        wrapper: r(w), stage: r(s), stageCard: r(s?.querySelector(".card")),
        card: r(card), cardTop: cr ? Math.round(cr.top) : null,
        deadUnderContent: cr ? Math.round(cr.bottom - Math.min(contentBottom, cr.bottom)) : null,
        scrolls: card ? [...card.querySelectorAll("*"), card].some((e) => e.scrollHeight > e.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)) : null,
    };
};

const out = {};
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    for (const width of [390, 1440]) {
        const { ctx, page } = await open(browser, "/#/gradient", width);
        out[`gradient-${width}`] = await page.evaluate(() => {
            const t = document.querySelector('[data-testid="gradient-render-tile"]').getBoundingClientRect();
            const sl = document.querySelector('[aria-label="Gradient direction"]')?.closest(".flex.flex-col")?.getBoundingClientRect();
            const head = [...document.querySelectorAll("h2,h3")].find((h) => h.textContent.trim() === "Interpolation")?.getBoundingClientRect();
            const r = (b) => b && { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) };
            return { tile: r(t), directionRow: r(sl), interpolationHead: r(head) };
        });
        if (SHOTS && width === 390) {
            await page.locator('[data-testid="gradient-render-tile"]').scrollIntoViewIfNeeded();
            await page.screenshot({ path: path.join(SHOTS, `gradient-tile-390-light.png`) });
        }
        await ctx.close();
    }
    for (const route of ["/#/atmosphere", "/#/blob"]) {
        const { ctx, page } = await open(browser, route, 1440);
        out[route] = await page.evaluate(() => ({
            heads: [...document.querySelectorAll(".config-console .config-section-title")].map((h) => ({ text: h.textContent.trim(), font: getComputedStyle(h).fontFamily.split(",")[0], size: getComputedStyle(h).fontSize, color: getComputedStyle(h).color })),
            labels: [...document.querySelectorAll('.config-console [role="slider"]')].map((s) => s.getAttribute("aria-label")).filter(Boolean),
        }));
        if (SHOTS && route === "/#/atmosphere") await page.screenshot({ path: path.join(SHOTS, "atmosphere-well-1440-light.png") });
        await ctx.close();
    }
    for (const route of ["/#/mix", "/#/generate", "/#/browse", "/#/palettes", "/#/about", "/#/blob"]) {
        for (const theme of ["light"]) {
            const { ctx, page } = await open(browser, route, 1440, theme);
            out[`companion ${route}`] = await page.evaluate(companion);
            if (SHOTS && ["/#/mix", "/#/generate"].includes(route)) await page.screenshot({ path: path.join(SHOTS, `companion-${route.slice(3)}-1440-${theme}.png`) });
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
