// SERVED MODEL: claude-opus-5-5 · SS-8 B25 CURE — the live re-read of the cured rows (headless Chromium).
// Cells: dz (SS8-0713 dashed edge, light + dark) · geo (SS8-0715 bound + SS8-0722 modality, 1440x900 and 720x450)
//        · stalepin (SS8-0721 EY-20) · gen (SS8-0705 hook census).
// One browser per run, one context per cell, every context + the browser closed in finally.
// Writes only to evidence/B25-extract-inputs/cure/live-*.json (never the witness packet's files).
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { launch, open, makePng, feed, waitRail, ratio, RESOLVE, pixels, EVID, BASE } from "./lib.mjs";

const OUT = resolve(EVID, "cure");
mkdirSync(OUT, { recursive: true });
const save = (n, o) => writeFileSync(resolve(OUT, n), JSON.stringify(o, null, 1));
const which = process.argv.slice(2);
const want = (c) => which.length === 0 || which.includes(c);
const OV = '[data-slot="dialog-content"][role="dialog"]';
const VP = `${OV} [class*="flex-1 min-h-0"]`;
const TRANSFORM = `() => { const c = document.querySelector('${OV} canvas.eyedropper-canvas'); const mt = c.style.transform.match(/translate\\(([-\\d.e]+)px, ([-\\d.e]+)px\\) scale\\(([-\\d.e]+)\\)/); return { panX: +mt[1], panY: +mt[2], zoom: +mt[3], w: c.width, h: c.height }; }`;

async function openEye(p) {
    await feed(p, await makePng(p, 1600, 1000));
    await waitRail(p);
    await p.click('[aria-label="Sample colors from the image"]');
    await p.waitForSelector(`${OV} canvas.eyedropper-canvas`, { timeout: 30000 });
    await p.waitForTimeout(1200);
}

async function dzCell(b, theme) {
    const { ctx, p, errors } = await open(b, { theme });
    try {
        await p.mouse.move(5, 895);
        await p.waitForTimeout(400);
        const Z = '[aria-label="Upload image"]';
        const z = await p.evaluate(([Z, RES]) => {
            const res = eval(RES); const el = document.querySelector(Z); const cs = getComputedStyle(el);
            return { cls: el.className, rect: el.getBoundingClientRect().toJSON(), borderStyle: cs.borderTopStyle, borderWidth: cs.borderTopWidth, borderColor: cs.borderTopColor, borderBytes: res(cs.borderTopColor), inkMuted: getComputedStyle(document.documentElement).getPropertyValue("--ink-muted").trim() };
        }, [Z, RESOLVE]);
        const shot = await p.screenshot();
        const r = z.rect;
        const xs = Array.from({ length: 60 }, (_, i) => r.x + 20 + ((r.width - 40) * i) / 59);
        const edge = [...(await pixels(p, shot, xs.map((x) => [x, r.y + 0.5]))), ...(await pixels(p, shot, xs.map((x) => [x, r.y + 1.5])))];
        const outside = await pixels(p, shot, [[r.x + r.width / 2, r.y - 4], [r.x - 4, r.y + r.height / 2]]);
        const inside = await pixels(p, shot, [[r.x + 12, r.y + 12], [r.x + r.width - 12, r.y + r.height - 12]]);
        const strongest = edge.map((px) => ({ px, r: ratio(px, outside[0]) })).sort((a, c) => c.r - a.r)[0];
        const out = { theme, z, edgeMaxVsOutside: strongest, borderTokenVsOutside: ratio(z.borderBytes, outside[0]), borderTokenVsInside: ratio(z.borderBytes, inside[0]), outside, inside, errors };
        save(`live-dz-${theme}.json`, out);
        return { theme, borderColor: z.borderColor, edgeMax: strongest.r, tokOut: out.borderTokenVsOutside, tokIn: out.borderTokenVsInside };
    } finally { await ctx.close(); }
}

async function geoCell(b, viewport) {
    const { ctx, p, errors } = await open(b, { viewport });
    try {
        await openEye(p);
        const geo = await p.evaluate((OV) => {
            const ov = document.querySelector(OV);
            const wb = document.querySelector('[aria-label="Sample colors from the image"]')?.closest("[data-pane]");
            const named = ov.getAttribute("aria-labelledby");
            return { inner: [innerWidth, innerHeight], dialog: ov.getBoundingClientRect().toJSON(), position: getComputedStyle(ov).position, role: ov.getAttribute("role"), ariaModal: ov.getAttribute("aria-modal"), name: named ? document.getElementById(named)?.textContent : null, paneHidden: !!wb?.closest('[aria-hidden="true"]'), inPane: !!wb?.contains(ov) };
        }, OV);
        // Tab walk: 30 presses; where does focus land?
        const walk = [];
        for (let i = 0; i < 30; i++) {
            await p.keyboard.press("Tab");
            walk.push(await p.evaluate((OV) => { const a = document.activeElement; return { inDialog: !!document.querySelector(OV)?.contains(a), label: a?.getAttribute("title") ?? a?.getAttribute("aria-label") ?? a?.tagName }; }, OV));
        }
        const d = geo.dialog;
        const out = { viewport, geo, withinViewport: d.x >= 0 && d.y >= 0 && d.right <= geo.inner[0] && d.bottom <= geo.inner[1], overflowPastFold: Math.max(0, d.bottom - geo.inner[1]), tabWalk: { escapes: walk.filter((w) => !w.inDialog).length, stops: [...new Set(walk.map((w) => w.label))] }, errors };
        save(`live-geo-${viewport.width}x${viewport.height}.json`, out);
        return { viewport: `${viewport.width}x${viewport.height}`, dialog: [Math.round(d.x), Math.round(d.y), Math.round(d.width), Math.round(d.height)], position: geo.position, role: geo.role, ariaModal: geo.ariaModal, name: geo.name, paneHidden: geo.paneHidden, inPane: geo.inPane, within: out.withinViewport, overflow: out.overflowPastFold, tabEscapes: out.tabWalk.escapes, stops: out.tabWalk.stops };
    } finally { await ctx.close(); }
}

async function stalepinCell(b) {
    const { ctx, p, errors } = await open(b, { viewport: { width: 1440, height: 900 } });
    try {
        await openEye(p);
        const v = await p.evaluate((VP) => document.querySelector(VP).getBoundingClientRect().toJSON(), VP);
        await p.mouse.click(v.x + v.width * 0.3, v.y + v.height * 0.4);
        await p.waitForTimeout(500);
        const read = () => p.evaluate(([OV, TR, vx, vy]) => {
            const ov = document.querySelector(OV); const cv = ov.querySelector("canvas.eyedropper-canvas"); const t = eval(TR)();
            const l = ov.querySelector(".loupe"); const lr = l?.getBoundingClientRect();
            const lcx = lr ? lr.x + lr.width / 2 - vx : null, lcy = lr ? lr.y + lr.height / 2 - vy : null;
            const ix = Math.floor((lcx - t.panX) / t.zoom), iy = Math.floor((lcy - t.panY) / t.zoom);
            const under = ix >= 0 && iy >= 0 && ix < t.w && iy < t.h ? Array.from(cv.getContext("2d").getImageData(ix, iy, 1, 1).data) : null;
            const lc = l?.querySelector("canvas"); const lcp = lc ? Array.from(lc.getContext("2d").getImageData(55, 55, 1, 1).data) : null;
            return { t, loupeCentre: [lcx, lcy], imagePx: [ix, iy], under, loupeCentrePx: lcp, pinned: !!ov.querySelector('button[title="Add to palette"]') };
        }, [OV, TRANSFORM, v.x, v.y]);
        const before = await read();
        for (let i = 0; i < 12; i++) await p.evaluate(([VP, x, y]) => { document.querySelector(VP).dispatchEvent(new WheelEvent("wheel", { deltaY: -100, ctrlKey: true, clientX: x, clientY: y, bubbles: true, cancelable: true })); }, [VP, v.x + v.width * 0.7, v.y + v.height * 0.6]);
        await p.waitForTimeout(1200);
        const after = await read();
        const dist = (a, c) => (a && c ? +Math.hypot(a[0] - c[0], a[1] - c[1], a[2] - c[2]).toFixed(1) : null);
        const out = { before, after, loupeVsUnderBefore: dist(before.loupeCentrePx, before.under), loupeVsUnderAfter: dist(after.loupeCentrePx, after.under), samePixel: before.imagePx.join() === after.imagePx.join(), errors };
        save("live-stalepin.json", out);
        return { zoom: [before.t.zoom, after.t.zoom], px: [before.imagePx, after.imagePx], loupe: [before.loupeCentrePx, after.loupeCentrePx], under: [before.under, after.under], dBefore: out.loupeVsUnderBefore, dAfter: out.loupeVsUnderAfter, pinned: after.pinned };
    } finally { await ctx.close(); }
}

async function genCell(b) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const p = await ctx.newPage();
        await p.goto(`${BASE}/#/generate`, { timeout: 240000, waitUntil: "domcontentloaded" });
        await p.waitForSelector('[aria-label="Number of colors"]', { timeout: 240000 });
        const out = await p.evaluate(() => ({ hooks: [...document.querySelectorAll("[data-o18]")].map((e) => e.getAttribute("data-o18")), range: !!document.querySelector('[data-o18="generate-count"] .slider-range') }));
        save("live-gen.json", out);
        return out;
    } finally { await ctx.close(); }
}

const b = await launch();
const res = {};
try {
    if (want("dz")) { res.dzLight = await dzCell(b, "light"); res.dzDark = await dzCell(b, "dark"); }
    if (want("geo")) { res.geo1440 = await geoCell(b, { width: 1440, height: 900 }); res.geo720 = await geoCell(b, { width: 720, height: 450 }); }
    if (want("stalepin")) res.stalepin = await stalepinCell(b);
    if (want("gen")) res.gen = await genCell(b);
} finally { await b.close(); }
for (const [k, v] of Object.entries(res)) console.log(k, JSON.stringify(v).slice(0, 900));
