// SERVED MODEL: claude-opus-5-5 — SS-8 Z1 prod cell: App G2 (built artifact mounts non-empty) and
// Dock G-K(iii) (the BUILT dock carries a polite live region). Serves DIST (argv[2]) with a tiny
// node static server on PORT, one headless Chromium, one context; server + browser closed in finally.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { save } from "./lib.mjs";
const DIST = process.argv[2]; const PORT = +(process.env.PORT ?? 9419);
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".wasm": "application/wasm" };
const srv = createServer(async (req, res) => { try { const u = decodeURIComponent(new URL(req.url, "http://x").pathname); const f = join(DIST, normalize(u === "/" ? "/index.html" : u)); const b = await readFile(f); res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" }); res.end(b); } catch { res.writeHead(404); res.end(); } });
await new Promise((r) => srv.listen(PORT, r));
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try { const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(String(e).slice(0, 200)));
        const out = {};
        for (const r of ["/", "/generate"]) { await p.goto("about:blank"); await p.goto(`http://localhost:${PORT}/#${r}`, { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(5000);
            out[r] = await p.evaluate(() => ({ main: document.querySelectorAll("main").length, text: (document.querySelector("main")?.innerText ?? "").length, h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()), href: location.href,
                dockLive: [...document.querySelectorAll(".glass-dock [role=status], .glass-dock [aria-live=polite], .glass-dock [role=alert]")].map((e) => e.getAttribute("role") + "/" + e.getAttribute("aria-live") + "/" + e.className.toString().slice(0, 40)),
                shellStatus: document.querySelectorAll("main > [role=status][aria-live=polite]").length })); }
        out.pageErrors = errs; save("r2-prod.json", out); console.log(JSON.stringify(out).slice(0, 600));
    } finally { await ctx.close(); }
} finally { await browser.close(); srv.close(); }
