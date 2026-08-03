// pass 5 · probe 4 — what survives forced-colors (data vs decoration), the
// `.dashed-well` material, and the focus-ring composite contrast. Read-only.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const ROUTE = "http://localhost:9000/#/palettes";
const mkColors = (n, t) => Array.from({ length: n }, (_, i) => ({ css: `oklch(0.72 0.16 ${(i * 360) / n})`, name: `${t}-${i}`, position: i }));
const now = new Date().toISOString();
const p = (id, name, colors) => ({ id, name, slug: id, colors, createdAt: now, updatedAt: now, isLocal: true });
const STORE = { version: 1, palettes: [p("a", "Sunset Ridge", mkColors(5, "a")), p("b", "Fifty", mkColors(50, "b"))] };
const paneJs = `(() => { const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(e=>/My\\s*Palettes/.test(e.textContent||'')); return h ? h.closest("[class*='pane-scroll-fade']") : null; })()`;

const out = {};
const b = await chromium.launch();
async function boot(opts) {
    const ctx = await b.newContext(opts);
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", JSON.stringify(s)), STORE);
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1300);
    return { ctx, page };
}

const survey = (src) => {
    const pane = eval(src);
    const root = document.documentElement;
    const body = document.body;
    const g = (el, tag) => {
        if (!el) return { tag, missing: true };
        const c = getComputedStyle(el);
        return {
            tag,
            bg: c.backgroundColor,
            bgImage: (c.backgroundImage || "none").slice(0, 90),
            border: `${c.borderWidth} ${c.borderStyle} ${c.borderColor}`,
            color: c.color,
            fill: c.fill,
            rect: (() => { const r = el.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })(),
        };
    };
    const well = pane.querySelector(".dashed-well");
    const swatchDot = well ? well.querySelector("[class*='watercolor'], svg, canvas, [data-slot]") : null;
    const strip = pane.querySelector('[role="presentation"]');
    return {
        rootBgImage: getComputedStyle(root).backgroundImage.slice(0, 140),
        rootBg: getComputedStyle(root).backgroundColor,
        bodyBgImage: getComputedStyle(body).backgroundImage.slice(0, 140),
        groundSeed: getComputedStyle(root).getPropertyValue("--ground-seed").trim(),
        ambientLayer: (() => {
            const el = [...document.querySelectorAll("body > *, body > * > *")].find((e) => {
                const c = getComputedStyle(e);
                return /gradient/.test(c.backgroundImage) && e.getBoundingClientRect().width > 1000;
            });
            return el ? { cls: (el.className || "").toString().slice(0, 60), bgImage: getComputedStyle(el).backgroundImage.slice(0, 140) } : null;
        })(),
        dashedWell: g(well, ".dashed-well (CurrentPaletteEditor)"),
        dashedWellSwatch: g(swatchDot, "dashed-well first swatch child"),
        stripSegment: g(strip?.children[0], "PaletteColorStrip segment 0"),
        card: g(pane.querySelector('[role="article"]'), "PaletteCard"),
        pane: g(pane, "pane Card"),
    };
};

{
    const { ctx, page } = await boot({ viewport: { width: 1440, height: 900 }, colorScheme: "light", forcedColors: "active" });
    out.forced = await page.evaluate(survey, paneJs);
    await page.screenshot({ path: path.join(OUT, "chromium-fc-survival.png") });
    await ctx.close();
}
{
    const { ctx, page } = await boot({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    out.normal = await page.evaluate(survey, paneJs);
    // focus-ring composite contrast
    out.contrast = await page.evaluate((src) => {
        const pane = eval(src);
        const menu = pane.querySelector('[aria-label="Palette menu"]');
        menu.focus();
        const ringSpec = getComputedStyle(menu).boxShadow;
        // ring = color(srgb .6655 .0001 .2617 / .3), plate = the card bg
        const cv = document.createElement("canvas");
        cv.width = cv.height = 1;
        const g = cv.getContext("2d");
        const plate = getComputedStyle(pane.querySelector('[role="article"]')).backgroundColor;
        g.fillStyle = plate; g.fillRect(0, 0, 1, 1);
        const plateRGB = [...g.getImageData(0, 0, 1, 1).data].slice(0, 3);
        g.fillStyle = "color(srgb 0.665504 0.000101413 0.261748 / 0.3)"; g.fillRect(0, 0, 1, 1);
        const ringRGB = [...g.getImageData(0, 0, 1, 1).data].slice(0, 3);
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
        const ratio = (a, bb) => { const l1 = Math.max(L(a), L(bb)), l2 = Math.min(L(a), L(bb)); return (l1 + 0.05) / (l2 + 0.05); };
        return { ringSpec: ringSpec.slice(0, 120), plateRGB, ringRGB, contrastRingVsPlate: Math.round(ratio(ringRGB, plateRGB) * 100) / 100 };
    }, paneJs);
    await ctx.close();
}
await b.close();
fs.writeFileSync(path.join(OUT, "TELEMETRY-chromium-4.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
