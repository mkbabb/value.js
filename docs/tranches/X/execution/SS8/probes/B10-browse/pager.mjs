// SS8 · B10-browse · PaginationBar cells on #/admin/flagged (stubbed admin API).
// usage: node pager.mjs <cell,...>   chromium headless; one browser, one context per cell.
import { chromium } from "playwright";
import path from "node:path";
import { APP, API_LOCAL, EVID, save, wcag, samplePixels, sleep } from "./lib.mjs";

const want = new Set((process.argv[2] ?? "").split(",").filter(Boolean));
const out = {};
const TOTAL = 45;

function row(i) {
    return { paletteSlug: `flagged-${i}`, palette: { name: `flagged row ${i}`, slug: `flagged-${i}`, colors: [{ css: "#336699", position: 0 }, { css: "#99ccff", position: 1 }], tags: [], visibility: "public", tier: "standard", userSlug: "author-x", voteCount: 0, forkCount: 0, versionCount: 1, createdAt: "2026-10-01T00:00:00Z", updatedAt: "2026-10-01T00:00:00Z" }, flagCount: 1, flags: [{ reporterSlug: "r", reason: "spam", createdAt: "2026-10-02T00:00:00Z" }] };
}

async function setup(browser, { delays = {}, vp = { width: 1280, height: 900 }, ctxOpts = {}, log = [] } = {}) {
    const ctx = await browser.newContext({ viewport: vp, ...ctxOpts });
    await ctx.addInitScript(() => { try { localStorage.setItem("palette-admin-token", "ss8-probe-token"); } catch {} });
    await ctx.route(`${API_LOCAL}/**`, async (route) => {
        const u = new URL(route.request().url());
        const t0 = Date.now();
        if (u.pathname === "/admin/flagged") {
            const off = +(u.searchParams.get("offset") ?? 0), lim = +(u.searchParams.get("limit") ?? 20);
            if (delays[off]) await sleep(delays[off]);
            log.push({ off, at: t0, done: Date.now() });
            const data = Array.from({ length: Math.max(0, Math.min(lim, TOTAL - off)) }, (_, k) => row(off + k));
            return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data, total: TOTAL }) });
        }
        if (u.pathname === "/palettes") return route.fulfill({ status: 200, contentType: "application/json", body: '{"data":[],"nextCursor":null,"hasMore":false}' });
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ data: [], total: 0 }) });
    });
    const page = await ctx.newPage();
    await page.goto(`${APP}/#/admin/flagged`, { waitUntil: "commit", timeout: 90000 });
    await page.waitForSelector('button[aria-label="Next page"]', { timeout: 60000 });
    await sleep(1000);
    return { ctx, page };
}
const caption = (page) => page.evaluate(() => [...document.querySelectorAll("[aria-live='polite']")].map((e) => e.innerText.trim()).find((t) => /^Page /.test(t)));
const firstRow = (page) => page.evaluate(() => (document.body.innerText.match(/flagged row (\d+)/) ?? [])[1] ?? null);

const CELLS = {
    // L-1 variant attr · NOT-defect caption contrast · D-5 screenshot
    async dom(browser) {
        const { ctx, page } = await setup(browser);
        try {
            const r = await page.evaluate(() => {
                const b = [...document.querySelectorAll('button[aria-label="Next page"], button[aria-label="Previous page"]')];
                return { buttons: b.map((x) => ({ attrs: [...x.attributes].map((a) => a.name + (a.name === "class" ? "" : "=" + a.value)), cls: x.className })), variantAttrCount: b.filter((x) => x.hasAttribute("variant")).length };
            });
            // seat 2: scroll the caption into view, resolve its ink to sRGB via canvas, and sample the
            // ground under the glyph box with the ink made transparent (same points, ink vs no ink).
            await page.evaluate(() => [...document.querySelectorAll("[aria-live='polite']")].find((x) => /^Page /.test(x.innerText.trim())).scrollIntoView({ block: "center" }));
            await sleep(500);
            const cap = await page.evaluate(() => { const e = [...document.querySelectorAll("[aria-live='polite']")].find((x) => /^Page /.test(x.innerText.trim())); const r = e.getBoundingClientRect(); const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true }); g.fillStyle = getComputedStyle(e).color; g.fillRect(0, 0, 1, 1); return { color: getComputedStyle(e).color, inkRGB: Array.from(g.getImageData(0, 0, 1, 1).data.slice(0, 3)), rect: [r.left, r.top, r.width, r.height] }; });
            const pts = []; for (let x = Math.ceil(cap.rect[0]); x < cap.rect[0] + cap.rect[2]; x += 2) for (let y = Math.ceil(cap.rect[1]); y < cap.rect[1] + cap.rect[3]; y += 2) pts.push([x, y]);
            const withInk = await samplePixels(page, pts);
            await page.evaluate(() => { [...document.querySelectorAll("[aria-live='polite']")].find((x) => /^Page /.test(x.innerText.trim())).style.color = "transparent"; });
            await sleep(200);
            const ground = await samplePixels(page, pts);
            const Y = (p) => 0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2];
            let bi = 0, bd = -1; withInk.forEach((p, i) => { const d = Math.abs(Y(p) - Y(ground[i])); if (d > bd) { bd = d; bi = i; } });
            r.caption = { ...cap, darkestInkPx: withInk[bi], groundPx: ground[bi], resolvedInkVsGround: wcag(cap.inkRGB, ground[bi]), renderedInkVsGround: wcag(withInk[bi], ground[bi]) };
            await page.evaluate(() => { [...document.querySelectorAll("[aria-live='polite']")].find((x) => /^Page /.test(x.innerText.trim())).style.color = ""; });
            r.caption.text = await caption(page);
            const bar = await page.evaluate(() => { const e = document.querySelector('button[aria-label="Next page"]').parentElement.getBoundingClientRect(); return [e.left, e.top, e.width, e.height]; });
            out.dom = r; r.barRect = bar;
            await page.screenshot({ path: path.join(EVID, "pager-1280-light.png") }).catch((e) => { r.shotError = String(e).slice(0, 120); });
        } finally { await ctx.close(); }
    },
    // C-4 — double activation inside one task + out-of-order completion
    async race(browser) {
        const log = [];
        // (a) two synchronous clicks in one task
        {
            const { ctx, page } = await setup(browser, { log });
            try {
                const before = await caption(page);
                await page.evaluate(() => { const b = document.querySelector('button[aria-label="Next page"]'); b.click(); b.click(); });
                await sleep(1500);
                out.doubleActivation = { before, after: await caption(page), firstRow: await firstRow(page), offsetsRequested: log.map((l) => l.off) };
            } finally { await ctx.close(); }
        }
        // (b) page-2 response slow (1500 ms), page-3 fast (100 ms): two real clicks 200 ms apart
        log.length = 0;
        {
            const { ctx, page } = await setup(browser, { delays: { 20: 1500, 40: 100 }, log });
            try {
                const tl = [];
                await page.click('button[aria-label="Next page"]');
                await sleep(200);
                const disabledAt200 = await page.evaluate(() => document.querySelector('button[aria-label="Next page"]').disabled);
                await page.click('button[aria-label="Next page"]', { timeout: 2000 }).catch((e) => tl.push(["click2-failed", String(e).slice(0, 80)]));
                for (let i = 0; i < 12; i++) { await sleep(200); tl.push([200 * (i + 1) + 200, await caption(page), await firstRow(page)]); }
                out.outOfOrder = { disabledAt200, timeline: tl, finalCaption: await caption(page), finalFirstRow: await firstRow(page), responses: log.map((l) => ({ off: l.off, ms: l.done - l.at })) };
            } finally { await ctx.close(); }
        }
    },
    // M5/M6 — coarse-pointer geometry (390, touch, mobile emulation)
    async coarse(browser) {
        const { ctx, page } = await setup(browser, { vp: { width: 390, height: 844 }, ctxOpts: { hasTouch: true, isMobile: true, deviceScaleFactor: 3 } });
        try {
            out.coarse = await page.evaluate(() => {
                const b = document.querySelector('button[aria-label="Next page"]');
                const r = b.getBoundingClientRect(), s = b.querySelector("svg").getBoundingClientRect();
                const cs = getComputedStyle(b);
                return { pointerCoarse: matchMedia("(pointer: coarse)").matches, button: { w: r.width, h: r.height, radius: cs.borderRadius, minH: cs.minHeight, minW: cs.minWidth, padding: cs.padding }, glyph: { w: s.width, h: s.height } };
            });
            const bar = await page.evaluate(() => { const e = document.querySelector('button[aria-label="Next page"]').parentElement.getBoundingClientRect(); return [e.left, e.top, e.width, e.height]; });
            await page.screenshot({ path: path.join(EVID, "pager-390-coarse.png"), clip: { x: 0, y: Math.max(0, bar[1] - 20), width: 390, height: bar[3] + 40 } });
        } finally { await ctx.close(); }
    },
};

const browser = await chromium.launch();
try {
    for (const [k, fn] of Object.entries(CELLS)) {
        if (want.size && !want.has(k)) continue;
        try { await fn(browser); } catch (e) { out[k + "_error"] = String(e).slice(0, 400); }
    }
} finally { await browser.close(); }
save(`pager-${[...want].join("+") || "all"}.json`, out);
console.log(JSON.stringify(out, null, 1).slice(0, 9000));
