#!/usr/bin/env node
// X-DS · value · pass 1 (critic V1C) — the cured surfaces, measured. Real
// Chrome, new headless (§0ei). Ink contrast is read against the PAINTED ground:
// the frame is screenshotted, decoded in-page on a canvas, and the ground is
// the pixel just inside the well's own padding (no glyph there).
// usage: node cure-probe.mjs [--base http://localhost:9000] [--out file.json]
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
    if (route.includes("atmosphere")) await page.locator(".config-console").first().waitFor({ timeout: 300_000 });
    await page.waitForTimeout(4000);
    return { ctx, page };
}

/** Contrast of `textSel`'s ink against the painted pixel at `groundSel`'s inner corner. */
async function inkOnGround(page, textSel, groundSel, { placeholder = false, dx = 3, dy = 3 } = {}) {
    const shot = (await page.screenshot()).toString("base64");
    return page.evaluate(async ({ textSel, groundSel, placeholder, shot, dx, dy }) => {
        const vis = (s) => [...document.querySelectorAll(s)].find((e) => e.getClientRects().length);
        const t = vis(textSel), g = vis(groundSel);
        if (!t || !g) return { missing: !t ? textSel : groundSel };
        const color = placeholder ? getComputedStyle(t, "::placeholder").color : getComputedStyle(t).color;
        const c = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        c.canvas.width = c.canvas.height = 1;
        c.fillStyle = color; c.fillRect(0, 0, 1, 1);
        const ink = [...c.getImageData(0, 0, 1, 1).data];
        const img = new Image(); img.src = "data:image/png;base64," + shot; await img.decode();
        const r = g.getBoundingClientRect();
        const k = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        k.canvas.width = img.width; k.canvas.height = img.height; k.drawImage(img, 0, 0);
        const dpr = img.width / innerWidth;
        const gx = dx === "mid" ? r.left + r.width / 2 : r.left + dx;
        const ground = [...k.getImageData(Math.round(gx * dpr), Math.round((r.top + dy) * dpr), 1, 1).data];
        // ink alpha composited over the ground
        const a = ink[3] / 255;
        const comp = [0, 1, 2].map((i) => ink[i] * a + ground[i] * (1 - a));
        const lum = (rgb) => { const f = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
        const L1 = lum(comp), L2 = lum(ground);
        return { ink: color, ground: `rgb(${ground.slice(0, 3).join(",")})`, ratio: +(((Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)).toFixed(2)) };
    }, { textSel, groundSel, placeholder, shot, dx, dy });
}
const row = (name, scheme, detail) => { out.rows.push({ name, scheme, ...detail }); console.log(JSON.stringify({ name, scheme, ...detail })); };

for (const scheme of ["light", "dark"]) {
    try {
        let { ctx, page } = await open("/#/palettes", scheme);
        row("V1C-01 'Start a new palette' in the dashed well", scheme, await inkOnGround(page, ".dashed-well span.text-muted-foreground", ".dashed-well", { dx: "mid", dy: 4 }));
        row("V1C-01 search placeholder in the seated field", scheme, await inkOnGround(page, ".search-seated input", ".search-seated", { placeholder: true, dx: "mid", dy: 4 }));
        await ctx.close();

        ({ ctx, page } = await open("/#/generate", scheme));
        row("V1C-01 generate seed line", scheme, await inkOnGround(page, "[data-generate-plate] p.select-all", "[data-generate-plate] p.select-all", { dx: 3, dy: 2 }));
        row("V1C-07 generate plate header strip", scheme, await page.evaluate(() => ({ strips: document.querySelectorAll("[data-generate-plate] [data-slot='palette-color-strip'], [data-generate-plate] .palette-color-strip").length, firstChild: document.querySelector("[data-generate-plate]")?.firstElementChild?.tagName })));
        await ctx.close();

        ({ ctx, page } = await open("/#/atmosphere", scheme));
        row("V1C-04 FIELD head ink on the console well", scheme, await inkOnGround(page, ".config-section-title", ".config-console", { dx: "mid", dy: 4 }));
        row("V1C-04 head voice", scheme, await page.evaluate(() => {
            const pick = (s) => { const e = [...document.querySelectorAll(s)].find((x) => x.getClientRects().length); if (!e) return null; const cs = getComputedStyle(e); return { tag: e.tagName, text: e.textContent.trim(), family: cs.fontFamily.split(",")[0], weight: cs.fontWeight, transform: cs.textTransform, tracking: cs.letterSpacing }; };
            return { section: pick(".config-section-title"), field: pick(".aurora-form label"), route: pick(".route-title") };
        }));
        row("V1C-05 aurora select triggers' left edges", scheme, await page.evaluate(() => ({ x: [...document.querySelectorAll(".aurora-form [role='combobox']")].map((e) => Math.round(e.getBoundingClientRect().left)) })));
        row("V1C-06 config slider range vs track", scheme, await page.evaluate(() => {
            const r = [...document.querySelectorAll(".config-console .slider-range")].find((e) => e.getClientRects().length);
            const t = [...document.querySelectorAll(".config-console .slider-track")].find((e) => e.getClientRects().length);
            return { variant: t?.closest(".glass-slider")?.getAttribute("data-variant"), rangeWidth: Math.round(r?.getBoundingClientRect().width ?? 0), trackWidth: Math.round(t?.getBoundingClientRect().width ?? 0), rangeTint: r ? getComputedStyle(r).getPropertyValue("--liquid-fill-tint").trim() : null, rangeBg: r ? getComputedStyle(r).backgroundColor : null, rangeImage: r ? getComputedStyle(r).backgroundImage.slice(0, 160) : null, trackBg: t ? getComputedStyle(t).backgroundColor : null };
        }));
        await ctx.close();

        ({ ctx, page } = await open("/#/extract", scheme));
        row("V1C-08 empty k rail height", scheme, await page.evaluate(() => ({ rail: Math.round(document.querySelector("[data-o18='extract-k-rail']")?.getBoundingClientRect().height ?? -1), kc: Math.round(document.querySelector("[data-o18='extract-kc'] .slider-track")?.getBoundingClientRect().height ?? -1) })));
        row("V1C-02 skeleton cells animating (refused; recorded)", scheme, await page.evaluate(() => ({ infinite: [...document.querySelectorAll("[data-slot='shadow-palette-cell']")].filter((e) => getComputedStyle(e).animationIterationCount === "infinite").length })));
        await ctx.close();

        for (const width of [1440, 390]) {
            ({ ctx, page } = await open("/#/", scheme, width));
            row(`V1C-09 spectrum stamp seat @${width}`, scheme, await page.evaluate(() => {
                const s = document.querySelector(".spectrum-picker").getBoundingClientRect();
                const con = document.querySelector(".picker-body > :nth-child(2)").getBoundingClientRect();
                const card = document.querySelector(".spectrum-picker").closest("[data-slot='card']")?.getBoundingClientRect();
                return { gapToConsole: Math.round(con.top - s.bottom), stampBottomBreath: Math.round(con.top - (s.bottom + 8)), stampRight: Math.round(s.right + 8), consoleRight: Math.round(con.right), cardRight: card ? Math.round(card.right) : null };
            }));
            await ctx.close();
        }

        ({ ctx, page } = await open("/#/", scheme));
        row("V1C-10 dock view trigger --dock-ring", scheme, await page.evaluate(() => {
            const e = [...document.querySelectorAll("[style*='--dock-ring']")][0];
            return { ring: e ? e.style.getPropertyValue("--dock-ring") : null };
        }));
        await ctx.close();
    } catch (e) { out.errors.push(`${scheme}: ${String(e).slice(0, 300)}`); }
}
await browser.close();
if (OUT) fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log("ERRORS", out.errors.length, out.errors);
