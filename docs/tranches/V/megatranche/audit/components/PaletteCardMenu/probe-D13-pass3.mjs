// CHALLENGE-D pass 3 — probe D13
// Resolve D12's anomaly exactly: scan the menu panel ROW BY ROW and report the
// modal (background) pixel per row, for a near-black neighbour palette vs a
// near-white one. The menu is translucent and align="end" drops its header band
// across the NEXT card's full-bleed colour strip.
// Also emit a 4x device-scale crop of the header band for the eye.
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:9000";
const OUT = new URL("./probe-D13-pass3-results.json", import.meta.url).pathname;
const EV = new URL("./evidence/", import.meta.url).pathname;

const owner = {
    id: "pal-1", name: "Muted Terracotta and Deep Sea Foam Study", slug: "owner",
    isLocal: true, tier: "featured", versionCount: 4,
    colors: [{ css: "#c1663f" }, { css: "#8ec9b0" }, { css: "#24444d" }, { css: "#e8dcc0" }, { css: "#7a4a32" }],
};
const neigh = (cols) => ({ id: "pal-2", name: "Neighbour", slug: "n", isLocal: true, versionCount: 1, colors: cols.map((c) => ({ css: c })) });

const R = {};
const browser = await chromium.launch();

for (const [tag, cols] of [
    ["black", ["#000000", "#020202", "#050505", "#010101", "#000000"]],
    ["white", ["#ffffff", "#ffffff", "#fefefe", "#ffffff", "#ffffff"]],
]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "light", deviceScaleFactor: 4 });
    const page = await ctx.newPage();
    await page.addInitScript((s) => localStorage.setItem("color-palettes", s), JSON.stringify({ version: 1, palettes: [owner, neigh(cols)] }));
    await page.goto(`${BASE}/#/palettes`, { waitUntil: "load" });
    await page.waitForTimeout(3200);
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.waitForTimeout(800);

    const geom = await page.evaluate(() => {
        const m = document.querySelector('[role="menu"]');
        const mr = m.getBoundingClientRect();
        const lbl = document.querySelector(".dropdown-menu__label");
        const lr = lbl.getBoundingClientRect();
        const strip = [...document.querySelectorAll('[role="article"]')][1].querySelector("div,span");
        const cards = [...document.querySelectorAll('[role="article"]')].map((c) => { const r = c.getBoundingClientRect(); return { label: c.getAttribute("aria-label"), y: +r.y.toFixed(1), bottom: +r.bottom.toFixed(1) }; });
        return {
            menu: { x: +mr.x.toFixed(1), y: +mr.y.toFixed(1), w: +mr.width.toFixed(1), h: +mr.height.toFixed(1) },
            labelBox: { x: +(lr.x - mr.x).toFixed(1), y: +(lr.y - mr.y).toFixed(1), w: +lr.width.toFixed(1), h: +lr.height.toFixed(1) },
            labelColor: getComputedStyle(lbl).color,
            labelFontSize: getComputedStyle(lbl).fontSize,
            cards,
        };
    });

    const buf = await page.locator('[role="menu"]').first().screenshot();
    fs.writeFileSync(EV + `pass3-rowscan-${tag}.png`, buf);
    const b64 = buf.toString("base64");

    const blank = await ctx.newPage();
    const rows = await blank.evaluate(async ([b64, geom]) => {
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = "data:image/png;base64," + b64; });
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d", { willReadFrequently: true }); g.drawImage(img, 0, 0);
        const dpr = img.width / geom.menu.w;
        const d = g.getImageData(0, 0, c.width, c.height).data;
        const px = (x, y) => { const i = (y * c.width + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
        const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
        const lum = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
        const ratio = (a, b) => { const x = lum(a), y = lum(b); const [h, l] = x > y ? [x, y] : [y, x]; return +((h + 0.05) / (l + 0.05)).toFixed(2); };
        const ink = geom.labelColor.match(/\d+/g).slice(0, 3).map(Number);
        const out = [];
        for (let cssY = 0; cssY < geom.menu.h; cssY += 2) {
            const y = Math.round(cssY * dpr);
            if (y >= c.height) break;
            const h = new Map();
            for (let x = Math.round(6 * dpr); x < Math.round((geom.menu.w - 6) * dpr); x++) { const k = px(x, y).join(","); h.set(k, (h.get(k) || 0) + 1); }
            let mk = null, mc = -1; for (const [k, v] of h) if (v > mc) { mc = v; mk = k; }
            const bg = mk.split(",").map(Number);
            out.push({ cssY, bg, contrastVsHeaderInk: ratio(ink, bg) });
        }
        return { headerInk: ink, rows: out };
    }, [b64, geom]);
    await blank.close();

    // header band summary: the rows the label box actually occupies
    const band = rows.rows.filter((r) => r.cssY >= geom.labelBox.y && r.cssY <= geom.labelBox.y + geom.labelBox.h);
    R[tag] = {
        geom,
        headerInk: rows.headerInk,
        headerBandRows: band,
        headerBandMinContrast: Math.min(...band.map((r) => r.contrastVsHeaderInk)),
        headerBandMaxContrast: Math.max(...band.map((r) => r.contrastVsHeaderInk)),
        allRowsSample: rows.rows.filter((_, i) => i % 6 === 0),
    };
    await ctx.close();
}

await browser.close();
fs.writeFileSync(OUT, JSON.stringify(R, null, 2));
for (const k of Object.keys(R)) {
    console.log(`=== neighbour ${k} ===  headerInk ${JSON.stringify(R[k].headerInk)}  labelBox ${JSON.stringify(R[k].geom.labelBox)}`);
    console.log(`  cards: ${JSON.stringify(R[k].geom.cards)}  menu ${JSON.stringify(R[k].geom.menu)}`);
    for (const r of R[k].headerBandRows) console.log(`   y=${String(r.cssY).padStart(3)}  bg ${JSON.stringify(r.bg).padEnd(18)} contrast vs header ink ${r.contrastVsHeaderInk}`);
    console.log(`  band contrast min ${R[k].headerBandMinContrast}  max ${R[k].headerBandMaxContrast}`);
}
