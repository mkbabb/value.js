// SERVED MODEL: claude-opus-5-5 · SS-8 B15-palettes · PalettesPane U-1..U-7, U-11, U-12 (+ CPE U-9 matrix-seed arm).
// One browser per run; one context per cell; closed in finally. Headless Chromium (default shell).
// Usage: node b15-pp.mjs  → JSON to stdout; frames to ../evidence/B15-palettes/
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { open, hue, samplePng, contrast, okL, SAVED12 } from "./b15-seed.mjs";
const EV = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../evidence/B15-palettes");
const out = {};
const b = await chromium.launch();
const cell = async (name, fn) => { try { out[name] = await fn(); } catch (e) { out[name] = { ERROR: String(e).slice(0, 300) }; } };
// the pane plate = the PaneShell card holding the "My Palettes" H1
const PANE = `(() => { const h=[...document.querySelectorAll('h1,h2')].find(e=>/My\\s*Palettes/.test(e.textContent||'')); let n=h; while(n && !(n.matches && n.matches('[data-pane-shell], .pane-shell, [class*=pane-shell]'))) n=n.parentElement; return n || h?.closest('section,[role=region]'); })()`;
try {
    // U-1 / U-2: composited pixel identities + elevation sign (both schemes); U-5 metrics; U-7 crop
    for (const theme of ["light", "dark"]) {
        await cell(`U1U2-${theme}`, async () => {
            const { ctx, p, errors } = await open(b, { theme, current: hue(5, 10) });
            try {
                const g = await p.evaluate((src) => {
                    const pane = eval(src); const r = (e) => e.getBoundingClientRect();
                    const pr = r(pane), well = r(document.querySelector(".dashed-well")), search = r(document.querySelector(".search-seated"));
                    const card = document.querySelector('[role=article]'); const cr = r(card);
                    const strip = card.querySelector("[data-color-strip]"); const sr = r(strip);
                    const cs = getComputedStyle(pane);
                    return { paneClass: pane.className.slice(0, 120), paneBg: cs.backgroundColor, paneBackdrop: cs.backdropFilter,
                        cardBg: getComputedStyle(card).backgroundColor, wellBg: getComputedStyle(document.querySelector(".dashed-well")).backgroundColor,
                        searchBg: getComputedStyle(document.querySelector(".search-seated")).backgroundColor,
                        pts: { paneBare: { x: pr.right - 6, y: Math.min(pr.bottom - 8, pr.y + 140) }, well: { x: well.right - 24, y: well.bottom - 10 },
                            search: { x: search.right - 16, y: search.y + search.height / 2 }, cardBody: { x: cr.right - 70, y: cr.bottom - 8 } },
                        // U-5: specimen strip vs the rest of the card interior
                        card: { w: cr.width, h: cr.height, stripW: sr.width, stripH: sr.height,
                            headH: r(card.querySelector(".palette-specimen__head") ?? card).height } };
                }, PANE);
                const buf = await p.screenshot({ path: path.join(EV, `pp-composite-1440-${theme}.png`) });
                const px = await samplePng(b, buf, g.pts);
                const L = Object.fromEntries(Object.entries(px).map(([k, v]) => [k, okL(v)]));
                return { ...g, px, L, slipMinusHostL: Math.round((L.cardBody - L.paneBare) * 1e4) / 1e4, errors };
            } finally { await ctx.close(); }
        });
    }
    // U-2 (WHCM limb) + U-4 (WHCM + print): forced-colors substitution of the three wells + the strip
    await cell("U2U4-forced", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) }, { forcedColors: "active" });
        try {
            await p.emulateMedia({ forcedColors: "active" });
            await p.waitForTimeout(500);
            const r = await p.evaluate(() => {
                const bg = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).backgroundColor : null; };
                const seg = document.querySelector("[role=article] [data-color-strip] > *");
                const segCs = seg && getComputedStyle(seg);
                return { forced: matchMedia("(forced-colors: active)").matches, well: bg(".dashed-well"), search: bg(".search-seated"), card: bg("[role=article]"),
                    seg0Bg: segCs?.backgroundColor, seg0Adjust: segCs?.forcedColorAdjust, stripAdjust: getComputedStyle(document.querySelector("[data-color-strip]")).forcedColorAdjust,
                    currentSwatchAdjust: getComputedStyle(document.querySelector(".swatch-row > *")).forcedColorAdjust };
            });
            await p.screenshot({ path: path.join(EV, "pp-forced-colors-1440.png") });
            return r;
        } finally { await ctx.close(); }
    });
    await cell("U4-print", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            await p.emulateMedia({ media: "print" });
            await p.waitForTimeout(400);
            const r = await p.evaluate(() => {
                const seg = document.querySelector("[role=article] [data-color-strip] > *"); const cs = getComputedStyle(seg);
                const sw = getComputedStyle(document.querySelector(".swatch-row > *"));
                return { print: matchMedia("print").matches, seg0Bg: cs.backgroundColor, seg0PrintAdjust: cs.printColorAdjust, swatchRowPrintAdjust: sw.printColorAdjust,
                    articleVisible: document.querySelector("[role=article]").getBoundingClientRect().height };
            });
            await p.pdf({ path: path.join(EV, "pp-print.pdf"), printBackground: false, width: "1440px", height: "900px" });
            return r;
        } finally { await ctx.close(); }
    });
    // U-3: focus-ring composite on a saved card (keyboard focus) — ring pixel vs plate pixel
    for (const theme of ["light", "dark"]) {
        await cell(`U3-${theme}`, async () => {
            const { ctx, p } = await open(b, { theme, current: hue(5, 10) });
            try {
                await p.keyboard.press("Tab");
                await p.evaluate(() => document.querySelector("[role=article]").focus());
                await p.waitForTimeout(300);
                const g = await p.evaluate(() => {
                    const c = document.querySelector("[role=article]"); const cs = getComputedStyle(c); const r = c.getBoundingClientRect();
                    return { focusVisible: c.matches(":focus-visible"), boxShadow: cs.boxShadow, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`,
                        r: r.toJSON() };
                });
                const buf = await p.screenshot({ path: path.join(EV, `pp-card-focus-1440-${theme}.png`) });
                const y = g.r.y + g.r.height / 2;
                const pts = { ring1: { x: g.r.x - 1, y }, ring2: { x: g.r.x - 2, y }, ring3: { x: g.r.x - 3, y }, plate: { x: g.r.x - 12, y } };
                const px = await samplePng(b, buf, pts);
                return { ...g, px, ratios: { ring1: contrast(px.ring1, px.plate), ring2: contrast(px.ring2, px.plate), ring3: contrast(px.ring3, px.plate) } };
            } finally { await ctx.close(); }
        });
    }
    // U-6: tab-stop ordering through the pane (12 saved palettes)
    await cell("U6-tabwalk", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            await p.evaluate(() => document.querySelector("input[aria-label='Search your palettes']").focus());
            const stops = [];
            for (let i = 0; i < 80; i++) {
                await p.keyboard.press("Tab");
                const s = await p.evaluate(() => { const a = document.activeElement; const inPane = !!a.closest("[role=article], .dashed-well") || /palettes/i.test(a.getAttribute("aria-label") || "");
                    return { name: (a.getAttribute("aria-label") || a.innerText || a.tagName).trim().slice(0, 50), inArticle: !!a.closest("[role=article]"), inPane }; });
                stops.push(s.name + (s.inArticle ? " ·card" : ""));
            }
            const menu = stops.filter((s) => /^Palette menu/.test(s)).length;
            return { stops: stops.slice(0, 40), identicalPaletteMenuStops: menu, distinctStopNames: new Set(stops).size };
        } finally { await ctx.close(); }
    });
    // U-7: crop geometry of the library scroller at 1440×900, 12 palettes
    await cell("U7-crop", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            return await p.evaluate(() => {
                const card = document.querySelector("[role=article]");
                let sc = card.parentElement; while (sc && !(sc.scrollHeight > sc.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
                if (!sc) return { scroller: null };
                const sr = sc.getBoundingClientRect(); const cs = getComputedStyle(sc);
                const cards = [...document.querySelectorAll("[role=article]")].map((c) => c.getBoundingClientRect());
                const cut = cards.map((r, i) => ({ i, visiblePx: Math.round(Math.max(0, Math.min(r.bottom, sr.bottom) - Math.max(r.top, sr.top))), ofPx: Math.round(r.height) }))
                    .filter((c) => c.visiblePx > 0 && c.visiblePx < c.ofPx);
                return { scrollerClass: sc.className.slice(0, 100), mask: cs.maskImage.slice(0, 120), overflowY: cs.overflowY, scrollH: sc.scrollHeight, clientH: sc.clientHeight,
                    scrollbarWidth: sc.offsetWidth - sc.clientWidth - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth), croppedCards: cut };
            });
        } finally { await ctx.close(); }
    });
    // U-11: RTL strip mirroring
    await cell("U11-rtl", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            const read = () => p.evaluate(() => { const s = document.querySelector("[role=article] [data-color-strip]"); const r = s.getBoundingClientRect();
                const seg0 = s.firstElementChild.getBoundingClientRect(); return { stripX: Math.round(r.x), stripRight: Math.round(r.right), seg0X: Math.round(seg0.x), seg0Bg: getComputedStyle(s.firstElementChild).backgroundColor, flexDir: getComputedStyle(s).flexDirection }; });
            const ltr = await read();
            await p.evaluate(() => document.documentElement.setAttribute("dir", "rtl"));
            await p.waitForTimeout(400);
            const rtl = await read();
            await p.screenshot({ path: path.join(EV, "pp-rtl-1440.png") });
            return { ltr, rtl, seg0Moved: ltr.seg0X !== rtl.seg0X && Math.abs(rtl.seg0X - (rtl.stripRight - (ltr.seg0X - ltr.stripX) - 0)) < 200 };
        } finally { await ctx.close(); }
    });
    // U-12: a zero-match query — which controls remain?
    await cell("U12-zero-match", async () => {
        const { ctx, p } = await open(b, { current: hue(5, 10) });
        try {
            await p.fill("input[aria-label='Search your palettes']", "zzqx-no-such-palette");
            await p.waitForTimeout(600);
            const r = await p.evaluate((src) => { const pane = eval(src);
                return { buttons: [...pane.querySelectorAll("button, [role=button], input")].filter((e) => e.getBoundingClientRect().height > 0).map((e) => (e.getAttribute("aria-label") || e.innerText || e.tagName).trim().slice(0, 40)),
                    emptyText: pane.innerText.match(/No saved palette[^\n]*/)?.[0] ?? null }; }, PANE);
            await p.screenshot({ path: path.join(EV, "pp-zero-match-1440.png") });
            return r;
        } finally { await ctx.close(); }
    });
    // CPE U-9: the visual matrix's own seed (saved palettes only, e2e/visual/capture.ts seedSavedPalettes) — does it populate the CURRENT palette editor?
    await cell("CPE-U9-matrix-seed", async () => {
        const { ctx, p } = await open(b, { saved: SAVED12.slice(0, 3), current: null }, { viewport: { width: 1024, height: 768 } });
        try {
            const r = await p.evaluate(() => ({ label: document.querySelector("[data-well-label-row]")?.innerText.trim(), swatches: document.querySelectorAll(".swatch-row > *").length }));
            await p.screenshot({ path: path.join(EV, "cpe-u9-matrix-seed-1024-light.png") });
            return r;
        } finally { await ctx.close(); }
    });
} finally { await b.close(); }
fs.writeFileSync(path.join(EV, "b15-pp.out.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
