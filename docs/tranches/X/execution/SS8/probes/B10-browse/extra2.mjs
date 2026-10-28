// SS8 · B10-browse · seat-2 cells: R-2 at the record's own denominators (browse pane, 1440×900 + 390×844 DPR3)
// and the U9 print limb's inheritance (where does the band's print-color-adjust come from?).
import { chromium } from "playwright";
import path from "node:path";
import { APP, EVID, save, routeStub, sleep } from "./lib.mjs";
const out = {};
const TAGS = Array.from({ length: 10 }, (_, i) => ({ id: `t${i}`, name: `tag${i}`, category: "mood" }));
const browser = await chromium.launch();
try {
    for (const [vp, dsf] of [[{ width: 1440, height: 900 }, 1], [{ width: 390, height: 844 }, 3]]) {
        const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: dsf, hasTouch: dsf === 3, isMobile: dsf === 3 });
        try {
            await routeStub(ctx, { first: 12, tags: TAGS });
            const page = await ctx.newPage();
            await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
            await page.waitForFunction(() => document.querySelectorAll(".palette-card").length >= 12, null, { timeout: 30000 });
            await sleep(1200);
            await page.click('button[aria-label^="Filters"]');
            await page.waitForSelector('[role="dialog"]'); await sleep(800);
            out[`r2_${vp.width}`] = await page.evaluate(() => {
                const d = [...document.querySelectorAll('[role="dialog"]')].pop().getBoundingClientRect();
                const pane = document.querySelector(".palette-card").closest(".pane-shell__card, .pane-shell") ?? document.body;
                const p = pane.getBoundingClientRect();
                const vis = (r) => ({ l: Math.max(0, r.left), t: Math.max(0, r.top), r: Math.min(innerWidth, r.right), b: Math.min(innerHeight, r.bottom) });
                const inter = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
                const pv = vis(p), dv = vis(d);
                const cards = [...document.querySelectorAll(".palette-card")].map((c) => c.getBoundingClientRect()).filter((r) => r.bottom > 0 && r.top < innerHeight);
                const covered = cards.filter((r) => inter(dv, vis(r)) > 0).length;
                const over50 = cards.filter((r) => inter(dv, vis(r)) / ((vis(r).r - vis(r).l) * (vis(r).b - vis(r).t)) > 0.5).length;
                return { popover: [d.width, +d.height.toFixed(2)], paneCls: String(pane.className).slice(0, 40), browsePanePct: +(100 * inter(dv, pv) / ((pv.r - pv.l) * (pv.b - pv.t))).toFixed(1), cardsInVP: cards.length, cardsCovered: covered, over50, pastFoldPx: +(d.bottom - innerHeight).toFixed(2) };
            });
            await page.screenshot({ path: path.join(EVID, `r2-pane-${vp.width}.png`) });
        } finally { await ctx.close(); }
    }
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    try {
        await routeStub(ctx, { first: 3 });
        const page = await ctx.newPage();
        await page.goto(`${APP}/#/browse`, { waitUntil: "domcontentloaded" });
        await page.waitForFunction(() => document.querySelectorAll("[data-color-strip] [data-band]").length > 0, null, { timeout: 30000 });
        await sleep(800);
        const read = () => page.evaluate(() => {
            const b = document.querySelector("[data-color-strip] [data-band]");
            const chain = []; let e = b;
            while (e) { const s = getComputedStyle(e); chain.push(`${e.tagName}.${String(e.className).split(" ")[0] ?? ""}:${s.printColorAdjust}/${s.forcedColorAdjust}`); e = e.parentElement; }
            return chain;
        });
        out.screenChain = await read();
        await page.emulateMedia({ media: "print" }); await sleep(300);
        out.printChain = await read();
    } finally { await ctx.close(); }
} finally { await browser.close(); }
save("extra2.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 5000));
