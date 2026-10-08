#!/usr/bin/env node
// X-DS · value · pass 2 (critic V2C) — the cured surfaces, measured. Real
// Chrome, new headless (§0ei). usage: node cure-probe.mjs [--base http://localhost:9000] [--out file.json]
import fs from "node:fs";
import { chromium } from "@playwright/test";
const args = process.argv.slice(2);
const opt = (k, d) => (args.indexOf(`--${k}`) >= 0 ? args[args.indexOf(`--${k}`) + 1] : d);
const BASE = opt("base", "http://localhost:9000");
const OUT = opt("out", "");
const out = { base: BASE, at: new Date().toISOString(), rows: [], errors: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
async function open(route, scheme, width = 1440) {
    const ctx = await browser.newContext({ viewport: { width, height: width <= 500 ? 844 : 900 }, colorScheme: scheme });
    await ctx.addInitScript((th) => { try { localStorage.setItem("vueuse-color-scheme", th); } catch {} }, scheme);
    const page = await ctx.newPage();
    page.on("pageerror", (e) => out.errors.push(`${route} ${scheme}: ${String(e).slice(0, 200)}`));
    await page.goto(BASE + route, { waitUntil: "load", timeout: 300_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 300_000 });
    await page.locator(".pane-wrapper .card").first().waitFor({ timeout: 300_000 });
    await page.waitForFunction(() => !document.querySelector('main [aria-busy="true"]'), null, { timeout: 300_000 });
    await page.waitForTimeout(4000);
    return { ctx, page };
}
const row = (name, scheme, detail) => { out.rows.push({ name, scheme, ...detail }); console.log(JSON.stringify({ name, scheme, ...detail })); };
// a scalar row: the visible name, the value, and where they sit against the track
const SCALAR = `(sel) => [...document.querySelectorAll(sel)].filter((e) => e.getClientRects().length).slice(0, 3).map((row) => {
    const r = (e) => e && e.getBoundingClientRect();
    const name = row.querySelector("label"); const track = row.querySelector(".slider-track");
    const val = [...row.querySelectorAll("span")].reverse().find((s) => /\\d/.test(s.textContent) && !s.closest(".glass-slider"));
    const range = row.querySelector(".slider-range");
    return { name: name?.textContent.trim(), value: val?.textContent.trim(), nameLeft: Math.round(r(name)?.left ?? -1), valueRight: Math.round(r(val)?.right ?? -1), trackLeft: Math.round(r(track)?.left ?? -1), trackRight: Math.round(r(track)?.right ?? -1), valueAboveTrack: r(val) && r(track) ? r(val).bottom <= r(track).top + 1 : null, valueTabular: val && getComputedStyle(val).fontVariantNumeric, rangeTint: range && getComputedStyle(range).getPropertyValue("--liquid-fill-tint").trim().slice(0, 90) };
})`;
for (const scheme of ["light", "dark"]) {
    try {
        let { ctx, page } = await open("/#/browse", scheme);
        row("V2C-01 My Palettes companion (browse)", scheme, await page.evaluate(() => {
            const card = [...document.querySelectorAll(".pane-row-follow")].find((e) => e.querySelector(".palette-card-grid"));
            const sc = card.querySelector(".fading-scroll--y"); const cr = card.getBoundingClientRect();
            const ps = card.querySelectorAll(".palette-card-grid [role=status] p");
            return { cardH: Math.round(cr.height), scrollH: sc?.scrollHeight, mask: sc && getComputedStyle(sc).maskImage.slice(0, 120), feather: sc && getComputedStyle(sc).getPropertyValue("--fade-scroll-width"), messageBottomBelowCardTop: ps[0] && Math.round(ps[0].getBoundingClientRect().bottom - cr.top), featherStartBelowCardTop: Math.round(cr.height - 24), wellBorder: getComputedStyle(card.querySelector(".dashed-well")).borderTopStyle + " " + getComputedStyle(card.querySelector(".dashed-well")).borderTopWidth };
        }));
        await ctx.close();
        ({ ctx, page } = await open("/#/generate", scheme));
        row("V2C-01 My Palettes companion (generate)", scheme, await page.evaluate(() => {
            const card = [...document.querySelectorAll(".pane-row-follow")].find((e) => e.querySelector(".palette-card-grid"));
            const cr = card.getBoundingClientRect(); const ps = card.querySelectorAll(".palette-card-grid [role=status] p");
            return { cardH: Math.round(cr.height), messageBottomBelowCardTop: ps[0] && Math.round(ps[0].getBoundingClientRect().bottom - cr.top) };
        }));
        row("V2C-02 generate count row", scheme, await page.evaluate(`(${SCALAR})("[data-generate-plate] ~ div.flex-col, .flex.flex-col.gap-1:has([data-generate-count-rail])")`));
        await ctx.close();
        ({ ctx, page } = await open("/#/extract", scheme));
        row("V2C-02 extract K and kC rows", scheme, await page.evaluate(`(${SCALAR})(".flex.flex-col.gap-1:has([data-o18=extract-k-rail]), [data-o18=extract-kc]")`));
        row("V2C-03 extract sliders with no image", scheme, await page.evaluate(() => ({ disabled: [...document.querySelectorAll(".glass-slider")].map((e) => e.hasAttribute("data-disabled")), railOpacity: getComputedStyle(document.querySelector("[data-o18=extract-k-rail]")).opacity })));
        row("V2C-14 'Upload image' voice", scheme, await page.evaluate(() => { const s = [...document.querySelectorAll("span")].find((e) => e.textContent.trim() === "Upload image"); const cs = getComputedStyle(s); return { family: cs.fontFamily.split(",")[0], size: cs.fontSize }; }));
        await ctx.close();
        ({ ctx, page } = await open("/#/atmosphere", scheme));
        await page.locator(".config-console").first().waitFor({ timeout: 300_000 });
        row("V2C-02/09 atmosphere config rows", scheme, await page.evaluate(`(${SCALAR})(".config-console .configurator-row")`));
        row("V2C-12 aurora triggers", scheme, await page.evaluate(() => ({ widths: [...document.querySelectorAll(".aurora-form [role='combobox']")].map((e) => Math.round(e.getBoundingClientRect().width)), lefts: [...document.querySelectorAll(".aurora-form [role='combobox']")].map((e) => Math.round(e.getBoundingClientRect().left)) })));
        await ctx.close();
        ({ ctx, page } = await open("/#/gradient", scheme));
        row("V2C-02/06 gradient Direction row", scheme, await page.evaluate(`(${SCALAR})(".flex.flex-col.gap-1:has(> .flex > label)")`));
        row("V2C-06 Direction readout ink", scheme, await page.evaluate(() => { const s = [...document.querySelectorAll("span.tabular-nums")].find((e) => /°$/.test(e.textContent.trim())); return { classes: s?.className, color: s && getComputedStyle(s).color }; }));
        row("V2C-07 easing summary inks", scheme, await page.evaluate(() => { const h = document.querySelector(".interval-head"); const sp = h ? [...h.querySelectorAll(":scope > span.font-mono")] : []; return sp.map((e) => ({ text: e.textContent.trim(), color: getComputedStyle(e).color })); }));
        row("V2C-08 CSS output wrapping", scheme, await page.evaluate(() => { const e = document.querySelector(".code-editor"); const cs = getComputedStyle(e); return { wordBreak: cs.wordBreak, overflowWrap: cs.overflowWrap, text: e.innerText.slice(0, 120) }; }));
        await ctx.close();
        ({ ctx, page } = await open("/#/mix", scheme));
        row("V2C-13 Mix selected well edge", scheme, await page.evaluate(() => { const w = document.querySelector(".dashed-well:has(.add-slot-ghost)"); const cs = w && getComputedStyle(w); return w ? { border: `${cs.borderTopStyle} ${cs.borderTopWidth}` } : { missing: true }; }));
        await ctx.close();
        ({ ctx, page } = await open("/#/", scheme));
        row("V2C-17 About fade feather", scheme, await page.evaluate(() => { const e = document.querySelector(".about-card .fading-scroll--y"); const cs = getComputedStyle(e); return { feather: cs.getPropertyValue("--fade-scroll-width").trim(), mask: cs.maskImage.slice(0, 120) }; }));
        await ctx.close();
    } catch (e) { out.errors.push(`${scheme}: ${String(e).slice(0, 300)}`); console.error(e); }
}
await browser.close();
if (OUT) fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
