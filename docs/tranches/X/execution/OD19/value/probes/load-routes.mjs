#!/usr/bin/env node
// OD19 · load — every route, cold and warm, on a BUILT bundle (vite preview).
// usage: node load-routes.mjs <origin> <out.json> [width=1440] [cpu=4]
//
// Cells per route (one browser per run, a fresh context per route):
//   cold  — empty cache, direct load of #/<route>
//   warm  — same context reloaded (HTTP cache primed)
//   hop   — in-app: from a settled #/ (idle warm done) set the hash to the route
// Measures: JS bytes on the wire until route content (cold/warm), time to route
// content, long tasks (count / max / sum until content), and for the hop the
// rAF frame timing from the input to content + 700 ms (max frame, frames > 50 ms).
// "Route content": every scene region of the view holds a mounted pane (an
// element child with a box) and no region holds the loading plate.
// The tree is built with VITE_API_URL=http://localhost:3000 (the served API);
// web security is off so that origin needs no CORS row for the preview port.
// (No page.route: Playwright interception disables the HTTP cache, i.e. "warm".)
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = process.argv[2] ?? "http://localhost:8291";
const OUT = process.argv[3];
const WIDTH = Number(process.argv[4] ?? 1440);
const CPU = Number(process.argv[5] ?? 4);
const HEIGHT = WIDTH >= 1000 ? 900 : 844;
const API = "http://localhost:3000";

// [route path, regions]
const ROUTES = [
    ["", 2], ["palettes", 2], ["browse", 2], ["extract", 2], ["mix", 2],
    ["generate", 2], ["gradient", 2], ["atmosphere", 1], ["blob", 2],
    ["admin/users", 1], ["admin/names", 1], ["admin/audit", 1],
    ["admin/flagged", 1], ["admin/tags", 1], ["no-such-route", 1],
];

const INIT = () => {
    const w = window;
    w.__lt = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) w.__lt.push([e.startTime, e.duration]);
        }).observe({ type: "longtask", buffered: true });
    } catch {}
    try { localStorage.setItem("palette-admin-token", "od19-load-probe"); } catch {}
};

// Resolves performance.now() of the first frame whose DOM holds route content.
const WAIT_CONTENT = async ([regions, since, limit]) => {
    const ok = () => {
        const ws = document.querySelectorAll("main .pane-wrapper");
        if (ws.length < regions) return false;
        for (const w of ws) {
            if (w.querySelector(".pane-plate")) return false;
            const c = w.firstElementChild;
            if (!c || c.getBoundingClientRect().height < 8) return false;
        }
        return !!document.querySelector("main h1");
    };
    const frames = [];
    let last = performance.now();
    let hit = null;
    while (performance.now() - since < limit) {
        const t = await new Promise((r) => requestAnimationFrame(r));
        frames.push(t - last);
        last = t;
        if (hit == null && ok()) { hit = t; window.__hitAt = [location.hash, document.querySelector("main h1")?.textContent?.trim()]; }
        if (hit != null && t - hit > 700) break;
    }
    return { hit: hit == null ? null : hit - since, frames };
};

const browser = await chromium.launch({
    headless: true,
    args: ["--disable-web-security", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const rows = [];
try {
    {
        const ctx = await browser.newContext();
        const p = await ctx.newPage();
        await p.goto(`${ORIGIN}/#/`, { waitUntil: "load" }).catch(() => {});
        await p.waitForTimeout(3000);
        await ctx.close();
    }
    for (const [route, regions] of ROUTES) {
        const ctx = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT } });
        try {
            await ctx.addInitScript(INIT);
            const page = await ctx.newPage();
            const cdp = await ctx.newCDPSession(page);
            await cdp.send("Network.enable");
            await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });
            const reqType = new Map();
            let js = { bytes: 0, n: 0 };
            cdp.on("Network.responseReceived", (e) => reqType.set(e.requestId, e.type));
            cdp.on("Network.loadingFinished", (e) => {
                if (reqType.get(e.requestId) === "Script") { js.bytes += e.encodedDataLength; js.n++; }
            });
            const url = `${ORIGIN}/#/${route}`;
            const row = { route: route || "picker", width: WIDTH, cpu: CPU };
            for (const phase of ["cold", "warm"]) {
                js = { bytes: 0, n: 0 };
                if (phase === "cold") await page.goto(url, { waitUntil: "commit" });
                else await page.reload({ waitUntil: "commit" });
                const r = await page.evaluate(WAIT_CONTENT, [regions, 0, 30000]);
                const jsAt = { ...js };
                const lt = await page.evaluate((hit) => window.__lt.filter(([s]) => hit == null || s <= hit), r.hit);
                const at = await page.evaluate(() => window.__hitAt);
                row[phase] = { at,
                    contentMs: r.hit == null ? null : Math.round(r.hit),
                    jsKB: Math.round(jsAt.bytes / 1024), jsN: jsAt.n,
                    ltN: lt.length, ltMax: Math.round(Math.max(0, ...lt.map((x) => x[1]))),
                    ltSum: Math.round(lt.reduce((a, x) => a + x[1], 0)),
                };
                await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
            }
            // hop: from a settled home (the idle warm has run), in-app to the route
            if (route !== "") {
                await page.goto(`${ORIGIN}/#/`, { waitUntil: "commit" });
                await page.evaluate(WAIT_CONTENT, [2, 0, 30000]);
                await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
                await page.waitForTimeout(2500);
                const r = await page.evaluate(async ([regions, route]) => {
                    window.__lt.length = 0;
                    const since = performance.now();
                    location.hash = `#/${route}`;
                    return { since };
                }, [regions, route]);
                const w = await page.evaluate(WAIT_CONTENT, [regions, r.since, 15000]);
                const lt = await page.evaluate(() => window.__lt);
                row.hop = {
                    contentMs: w.hit == null ? null : Math.round(w.hit),
                    maxFrame: Math.round(Math.max(0, ...w.frames)),
                    over50: w.frames.filter((f) => f > 50).length,
                    frames: w.frames.length,
                    ltMax: Math.round(Math.max(0, ...lt.map((x) => x[1]))),
                };
            }
            rows.push(row);
            console.log(JSON.stringify(row));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
if (OUT) writeFileSync(OUT, JSON.stringify({ origin: ORIGIN, width: WIDTH, cpu: CPU, at: new Date().toISOString(), rows }, null, 1));
