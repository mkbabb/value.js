#!/usr/bin/env node
// X-DS · value · pass 8 — the V3C cure probe (headless real Chrome, §0ei).
// V3C-01 the Mix verb inside the card (and the footer's padding);
// V3C-02 the Extract instrument face's animations;
// V3C-03 Generate's name field (clip, family, fill);
// V3C-04 every header's veil (seated, ::before display/opacity);
// V3C-05 the Colors control on Generate and Extract.
// usage: node probe-v3c.mjs [--base http://localhost:9000] [--out file] [--shots dir]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";

const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = path.resolve(opt("out", path.join(import.meta.dirname, "probe-v3c.json")));
const SHOTS = opt("shots", "");

async function open(browser, route, width, theme) {
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

const headers = () => [...document.querySelectorAll("main .pane-header")].filter((h) => h.offsetParent).map((h) => {
    const cs = getComputedStyle(h, "::before");
    return { title: h.querySelector(".pane-header-title")?.textContent?.trim(), seated: h.matches(".card:has(> .pane-header ~ .pane-scroll-fade) > .pane-header"), veil: cs.display === "none" ? "none" : `opacity ${cs.opacity}` };
});

const out = {};
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
    for (const theme of ["light", "dark"]) for (const width of [1440, 390]) {
        const key = `${width}-${theme}`;
        // V3C-01 + V3C-04 (mix)
        {
            const { ctx, page } = await open(browser, "/#/mix", width, theme);
            out[`mix-${key}`] = await page.evaluate((hdr) => {
                const btn = [...document.querySelectorAll("main button")].find((b) => b.textContent.trim() === "Mix");
                const card = btn?.closest(".card");
                const b = btn?.getBoundingClientRect(), c = card?.getBoundingClientRect();
                const port = card?.querySelector(".pane-scroll-fade");
                return {
                    button: b && { top: Math.round(b.top), bottom: Math.round(b.bottom) },
                    card: c && { top: Math.round(c.top), bottom: Math.round(c.bottom) },
                    buttonInsideCard: !!(b && c && b.bottom <= c.bottom && b.top >= c.top),
                    buttonInPort: !!port?.contains(btn),
                    port: port && { scrollHeight: port.scrollHeight, clientHeight: port.clientHeight },
                    gapUnderButton: b && c ? Math.round(c.bottom - b.bottom) : null,
                    headers: new Function(`return (${hdr})()`)(),
                };
            }, headers.toString());
            if (SHOTS && theme === "light") await page.screenshot({ path: path.join(SHOTS, `mix-card-${width}-light.png`) });
            await ctx.close();
        }
        // V3C-03 + V3C-05 + V3C-04 (generate)
        {
            const { ctx, page } = await open(browser, "/#/generate", width, theme);
            out[`generate-${key}`] = await page.evaluate((hdr) => {
                const inp = document.querySelector("[data-generate-plate] input");
                const cs = inp && getComputedStyle(inp);
                const slider = document.querySelector('[aria-label="Number of colors"]')?.closest("[data-slot], .relative") ;
                const thumb = document.querySelector('[role="slider"][aria-label="Number of colors"]');
                return {
                    name: inp && { value: inp.value, scrollWidth: inp.scrollWidth, clientWidth: inp.clientWidth, clipped: inp.scrollWidth > inp.clientWidth, family: cs.fontFamily.split(",")[0], size: cs.fontSize, bg: cs.backgroundColor, plateBg: getComputedStyle(inp.closest("[data-generate-plate]")).backgroundColor },
                    countRail: !!document.querySelector("[data-generate-count-rail]"),
                    countVariant: thumb?.closest("[data-variant]")?.getAttribute("data-variant") ?? null,
                    headers: new Function(`return (${hdr})()`)(),
                };
            }, headers.toString());
            if (SHOTS && theme === "light") await page.screenshot({ path: path.join(SHOTS, `generate-plate-${width}-light.png`) });
            await ctx.close();
        }
        // V3C-02 + V3C-05 + V3C-04 (extract)
        {
            const { ctx, page } = await open(browser, "/#/extract", width, theme);
            out[`extract-${key}`] = await page.evaluate((hdr) => {
                const ghost = document.querySelector('[data-slot="shadow-palette"]');
                const thumb = document.querySelector('[role="slider"][aria-label="Number of colors"]');
                return {
                    looping: ghost ? [...ghost.querySelectorAll("*")].filter((e) => { const s = getComputedStyle(e); return s.animationName !== "none" && s.animationIterationCount === "infinite"; }).length : null,
                    countVariant: thumb?.closest("[data-variant]")?.getAttribute("data-variant") ?? null,
                    headers: new Function(`return (${hdr})()`)(),
                };
            }, headers.toString());
            await ctx.close();
        }
        // V3C-04 (browse, gradient)
        for (const r of ["browse", "gradient"]) {
            const { ctx, page } = await open(browser, `/#/${r}`, width, theme);
            out[`${r}-${key}`] = { headers: await page.evaluate((hdr) => new Function(`return (${hdr})()`)(), headers.toString()) };
            await ctx.close();
        }
        console.log("done", key);
    }
} finally {
    await browser.close();
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1).slice(0, 4000));
