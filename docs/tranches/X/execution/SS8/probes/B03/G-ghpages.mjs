// B03 · G — picker-heroblob L-1 production-chunk landing: the built gh-pages bundle (dist/gh-pages) served by
// an in-probe static server on :8097 (serve-built.mjs's SPA fallback), loaded headless. Static: which chunk carries
// the engine signatures, eager set (index.html script + modulepreload), gzip bytes. Live: which chunks load on
// #/atmosphere and on #/. One chromium browser; one context per route; server closed in finally.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { existsSync, statSync } from "node:fs";
import { readFileSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { save } from "./lib.mjs";

const REPO = "/Users/mkbabb/Programming/value.js";
const DIST = REPO + "/dist/gh-pages";
const PORT = 8097;
const html = readFileSync(DIST + "/index.html", "utf8");
const eager = [...html.matchAll(/(?:src|href)="\.\/assets\/([^"]+\.js)"/g)].map((m) => m[1]);
const files = readdirSync(DIST + "/assets").filter((f) => f.endsWith(".js"));
const SIG = ["goo-blob-canvas", "smin(", "webglcontextlost", "satelliteCount", "fissionAmp"];
const sigMap = Object.fromEntries(SIG.map((s) => [s, files.filter((f) => readFileSync(DIST + "/assets/" + f, "utf8").includes(s))]));
const size = (f) => { const b = readFileSync(DIST + "/assets/" + f); return { raw: b.length, gzip: gzipSync(b, { level: 9 }).length }; };
const out = { eager, eagerTotal: eager.reduce((a, f) => { const s = size(f); return { raw: a.raw + s.raw, gzip: a.gzip + s.gzip }; }, { raw: 0, gzip: 0 }), sigMap, engineChunks: {} };
for (const f of new Set(sigMap["goo-blob-canvas"].concat(sigMap["smin("]))) out.engineChunks[f] = { ...size(f), eager: eager.includes(f) };

// minimal static server over dist/gh-pages (same SPA fallback as e2e/smoke/perf/serve-built.mjs)
const MIME = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png" };
const srv = createServer((req, res) => { let p = decodeURIComponent((req.url ?? "/").split("?")[0]); let fp = DIST + p; if (p === "/" || !existsSync(fp) || statSync(fp).isDirectory()) fp = DIST + "/index.html"; const ext = fp.slice(fp.lastIndexOf(".")); res.writeHead(200, { "content-type": MIME[ext] ?? "application/octet-stream" }); res.end(readFileSync(fp)); });
await new Promise((r) => srv.listen(PORT, "127.0.0.1", r));
const browser = await chromium.launch();
try {
    out.live = {};
    for (const route of ["#/atmosphere", "#/"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        try {
            const page = await ctx.newPage();
            const js = [];
            page.on("response", (r) => { const u = r.url(); if (u.endsWith(".js")) js.push(u.split("/").pop()); });
            await page.goto(`http://127.0.0.1:${PORT}/${route}`, { waitUntil: "networkidle" });
            await page.waitForTimeout(3000);
            const engineLoaded = Object.keys(out.engineChunks).filter((f) => js.includes(f));
            out.live[route] = { jsCount: js.length, engineLoaded, heroCanvas: await page.locator(".goo-blob-canvas").count() };
        } finally { await ctx.close(); }
    }
} finally {
    await browser.close();
    srv.close();
}
save("G-ghpages.json", out);
console.log(JSON.stringify(out, null, 1).slice(0, 4000));
