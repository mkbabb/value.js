// B03 · H — #/ hero (picker-heroblob D-3 park timeline + KeepAlive re-arm, idle fps / GL draws / TBT at 1x & 4x,
// D-9 long tasks around the emerge, D-11 forced-colors chroma, row-16 bleed attribution). One chromium browser.
import { chromium } from "playwright";
import { BASE, EV, sha, save, decoder, oklab } from "./lib.mjs";

const out = {};
const browser = await chromium.launch();

const INIT = () => {
    window.__draws = 0; window.__lt = []; window.__emergeEnd = null;
    for (const P of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype]) {
        if (!P) continue;
        for (const fn of ["drawArrays", "drawElements"]) { const o = P[fn]; P[fn] = function (...a) { window.__draws++; return o.apply(this, a); }; }
    }
    try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]))).observe({ type: "longtask", buffered: true }); } catch {}
    addEventListener("animationend", (e) => { if (e.target?.classList?.contains?.("hero-blob-anchor") && window.__emergeEnd == null) window.__emergeEnd = Math.round(performance.now()); }, true);
};
const window5s = (page) => page.evaluate(() => new Promise((res) => { const d0 = window.__draws; let f = 0; const t0 = performance.now(); const tick = () => { f++; if (performance.now() - t0 < 5000) requestAnimationFrame(tick); else res({ fps: +(f / ((performance.now() - t0) / 1000)).toFixed(1), drawsPerS: +((window.__draws - d0) / 5).toFixed(1) }); }; requestAnimationFrame(tick); }));
const tbt = (lt) => lt.reduce((s, [, d]) => s + Math.max(0, d - 50), 0);

async function timelineCell() {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        const cdp = await ctx.newCDPSession(page);
        const t0 = Date.now();
        await page.goto(BASE + "#/", { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".goo-blob-canvas", { timeout: 15000 });
        const cb = await page.locator(".goo-blob-canvas").boundingBox();
        const clip = { x: cb.x, y: cb.y, width: cb.width, height: cb.height };
        const hs = [];
        while (Date.now() - t0 < 12000) { hs.push([Date.now() - t0, sha(await page.screenshot({ clip }))]); await page.waitForTimeout(200); }
        let lastChange = null; for (let i = 1; i < hs.length; i++) if (hs[i][1] !== hs[i - 1][1]) lastChange = hs[i][0];
        let firstFrozen = null; for (let i = hs.length - 1; i > 0 && hs[i][1] === hs[i - 1][1]; i--) firstFrozen = hs[i - 1][0];
        const r = { timeline: { samples: hs.length, distinct: new Set(hs.map((h) => h[1])).size, lastChangeMs: lastChange, firstFrozenMs: firstFrozen, tail: hs.slice(-4).map((h) => h[0] + ":" + h[1].slice(0, 6)) } };
        r.emergeEndMs = await page.evaluate(() => window.__emergeEnd);
        r.longTasks1x = await page.evaluate(() => window.__lt.slice());
        r.tbt1x = tbt(r.longTasks1x);
        r.idle1x = await window5s(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        r.idle4x = await window5s(page);
        // 4x cold load TBT
        await page.evaluate(() => { window.__lt = []; });
        await page.reload({ waitUntil: "domcontentloaded" });
        await page.waitForTimeout(10000);
        r.longTasks4x = await page.evaluate(() => window.__lt.slice());
        r.tbt4x = tbt(r.longTasks4x);
        r.emergeEndMs4x = await page.evaluate(() => window.__emergeEnd);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
        // KeepAlive re-arm: away to #/atmosphere, back to #/, hash 4 s
        await page.waitForTimeout(3000);
        await page.evaluate(() => { location.hash = "#/atmosphere"; });
        await page.waitForTimeout(2500);
        await page.evaluate(() => { location.hash = "#/"; });
        await page.waitForTimeout(150);
        const cb2 = await page.locator(".goo-blob-canvas").boundingBox();
        const clip2 = { x: cb2.x, y: cb2.y, width: cb2.width, height: cb2.height };
        const re = []; const t1 = Date.now();
        while (Date.now() - t1 < 4000) { re.push(sha(await page.screenshot({ clip: clip2 }))); await page.waitForTimeout(150); }
        r.rearm = { samples: re.length, distinct: new Set(re).size };
        return r;
    } finally { await ctx.close(); }
}

async function forcedCell() {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/", { waitUntil: "networkidle" });
        await page.waitForTimeout(3000);
        const dec = await decoder(ctx);
        const mm = await page.evaluate(() => matchMedia("(forced-colors: active)").matches);
        const cb = await page.locator(".goo-blob-canvas").boundingBox();
        const buf = await page.screenshot({ path: EV + "H-forced-colors-hero-1440.png" });
        const px = await dec(buf);
        const T = 32, tiles = [];
        for (let ty = 0; ty + T <= px.h; ty += T) for (let tx = 0; tx + T <= px.w; tx += T) {
            let c = 0; for (let y = ty; y < ty + T; y += 4) for (let x = tx; x < tx + T; x += 4) { const i = (y * px.w + x) * 4; const [, a, b] = oklab([px.d[i], px.d[i + 1], px.d[i + 2]]); c += Math.hypot(a, b); }
            tiles.push({ x: tx, y: ty, C: +(c / 64).toFixed(4) });
        }
        tiles.sort((a, b) => b.C - a.C);
        const inHero = (t) => t.x + T > cb.x && t.x < cb.x + cb.width && t.y + T > cb.y && t.y < cb.y + cb.height;
        const top = tiles.slice(0, 8).map((t) => ({ ...t, inHero: inHero(t) }));
        const bestOutside = tiles.find((t) => !inHero(t));
        return { matchMedia: mm, hero: cb, top, bestOutside, heroTileMax: tiles.find(inHero) };
    } finally { await ctx.close(); }
}

async function bleedCell() {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    try {
        const page = await ctx.newPage();
        await page.goto(BASE + "#/", { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.evaluate(() => { window.__hero = document.querySelector(".goo-blob-canvas"); });
        const rows = [];
        for (const route of ["#/", "#/blob", "#/does-not-exist"]) {
            await page.evaluate((h) => { location.hash = h; }, route);
            await page.waitForTimeout(2000);
            rows.push({ route, ...(await page.evaluate(() => {
                const bleeders = [...document.querySelectorAll("body *")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && (b.right > innerWidth + 0.5 || b.left < -0.5) && getComputedStyle(e).visibility !== "hidden"; }).map((e) => { const b = e.getBoundingClientRect(); return `${e.tagName.toLowerCase()}.${e.className.toString().split(" ")[0]} [${Math.round(b.left)},${Math.round(b.right)}]`; });
                const c = document.querySelector(".goo-blob-canvas"); const b = c?.getBoundingClientRect();
                return { heroPresent: !!c, sameInstance: c === window.__hero, heroInPicker: !!c?.closest(".pane-shell")?.querySelector(".channel-strip"), heroRect: b && [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)], heroVisible: !!c && c.checkVisibility?.(), overflowX: document.documentElement.scrollWidth - innerWidth, bleeders: bleeders.slice(0, 6) };
            })) });
        }
        return rows;
    } finally { await ctx.close(); }
}

async function prmCell() {
    // control arm: prefers-reduced-motion — the emerge pose never runs (no animationend → no pause/resume re-measure)
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    try {
        await ctx.addInitScript(INIT);
        const page = await ctx.newPage();
        await page.goto(BASE + "#/", { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".goo-blob-canvas", { timeout: 15000 });
        await page.waitForTimeout(10000);
        const r = { prm: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), emergeEndMs: await page.evaluate(() => window.__emergeEnd) };
        r.longTasks = await page.evaluate(() => window.__lt.slice());
        r.tbt = tbt(r.longTasks);
        r.idle = await window5s(page);
        return r;
    } finally { await ctx.close(); }
}

try {
    out.timeline = await timelineCell();
    out.prm = await prmCell();
    const near = (lt, e) => (e == null ? null : lt.filter(([s, d]) => s <= e + 150 && s + d >= e - 150));
    out.emergeAttribution = { at1x: near(out.timeline.longTasks1x, out.timeline.emergeEndMs), at4x: near(out.timeline.longTasks4x, out.timeline.emergeEndMs4x) };
    out.forced = await forcedCell();
    out.bleed = await bleedCell();
} finally { await browser.close(); }
save("H-hero.json", out);
console.log(JSON.stringify(out, (k, v) => (k === "longTasks1x" || k === "longTasks4x" ? v.slice(0, 12) : v)).slice(0, 6000));
