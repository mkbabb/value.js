// SS8 · B10-browse · U3 live: D-23's exact palette (#1a1512 #2f2a24 #e11d48 #2563eb) on a stubbed
// dark wall at DPR 2 (the record's frame), plus a 5-step neutral ramp; both metrics from pixels.
import { chromium } from "playwright";
import path from "node:path";
import { APP, EVID, save, routeStub, synth, wcag, dE, samplePixels, sleep } from "./lib.mjs";
const D23 = ["#1a1512", "#2f2a24", "#e11d48", "#2563eb"];
const RAMP = ["oklch(30% 0 0)", "oklch(45% 0 0)", "oklch(60% 0 0)", "oklch(75% 0 0)", "oklch(90% 0 0)"];
const out = {};
const browser = await chromium.launch();
try {
    for (const scheme of ["dark", "light"]) {
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
        try {
            await routeStub(ctx, { first: 2, hook: (u) => {
                if (u.pathname !== "/palettes" || u.searchParams.get("cursor")) return null;
                const a = synth(0, "d23"), b = synth(1, "ramp");
                a.colors = D23.map((css, position) => ({ css, position })); a.name = "D23 specimen";
                b.colors = RAMP.map((css, position) => ({ css, position })); b.name = "neutral ramp";
                return { json: { data: [a, b], nextCursor: null, hasMore: false } };
            } });
            const page = await ctx.newPage();
            await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
            await page.waitForFunction(() => document.querySelectorAll(".palette-card [data-color-strip] [data-band]").length >= 9, null, { timeout: 30000 });
            await sleep(1500);
            const geo = await page.evaluate(() => [...document.querySelectorAll(".palette-card")].map((c) => {
                const s = c.querySelector("[data-color-strip]"); const sr = s.getBoundingClientRect();
                const bands = [...s.querySelectorAll("[data-band]")].map((b) => { const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
                return { name: c.querySelector("[data-palette-name]")?.textContent?.trim(), html: document.documentElement.className.includes("dark"), stripGap: getComputedStyle(s).gap, stripBorder: getComputedStyle(s).borderStyle, bandBorders: [...s.querySelectorAll("[data-band]")].map((b) => getComputedStyle(b).borderRightWidth), bands, belowLeft: [sr.left + 6, sr.bottom + 4], leftOf: [sr.left - 4, sr.top + sr.height / 2] };
            }));
            const r = [];
            for (const g of geo) {
                const px = await samplePixels(page, [...g.bands, g.belowLeft, g.leftOf]);
                const leftOf = px.pop(), below = px.pop();
                const adj = px.slice(1).map((c, k) => ({ pair: `${k + 1}-${k + 2}`, dE: dE(px[k], c), wcag: wcag(px[k], c) }));
                r.push({ name: g.name, htmlDark: g.html, stripGap: g.stripGap, stripBorder: g.stripBorder, bandBorders: g.bandBorders, cellPx: px, stagePxBelow: below, stagePxLeft: leftOf, adjacent: adj, cell1VsStage: { dE: dE(px[0], leftOf), wcag: wcag(px[0], leftOf) }, cell2VsStage: { dE: dE(px[1], below), wcag: wcag(px[1], below) } });
            }
            out[scheme] = r;
            await page.screenshot({ path: path.join(EVID, `u3-d23-${scheme}.png`), clip: { x: 100, y: 200, width: 600, height: 340 } });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
save("u3-live.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 6000));
