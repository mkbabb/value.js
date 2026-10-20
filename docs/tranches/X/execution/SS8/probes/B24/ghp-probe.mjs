// SERVED MODEL: claude-opus-5-5 · SS-8 B24 — both live dev servers wedged on 2026-10-20 (shared :9000 and this seat's
// own vite :8124: page.goto 150 s timeouts; own vite at 7.8 GB RSS under the concurrent foundation.css HMR churn).
// This runner serves the gh-pages BUILD of the same tree (HEAD a40ab6613 + the dirty working tree as of 15:27,
// built to demo/app/node_modules/.cache/ss8-b24-ghp — see evidence/ghp-build.txt) from an in-process static
// server on :8124, imports each named probe module in turn (each = ONE browser, closed in its own finally),
// and closes the server in finally. Run only under guarded.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const ROOT = new URL("../../../../../../../demo/app/node_modules/.cache/ss8-b24-ghp/", import.meta.url).pathname;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".wasm": "application/wasm", ".webp": "image/webp", ".ico": "image/x-icon", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const srv = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = normalize(join(ROOT, p));
    if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    try { const b = await readFile(f); res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" }).end(b); }
    catch { res.writeHead(404).end(); }
});
await new Promise((r) => srv.listen(8124, "localhost", r));
process.env.B24_BASE = "http://localhost:8124";
try {
    for (const f of process.argv.slice(2)) {
        console.log(`== ${f} ${new Date().toTimeString().slice(0, 8)}`);
        try { await import(new URL(f, import.meta.url)); } catch (e) { console.log(`== ${f} FAILED ${String(e).slice(0, 300)}`); }
    }
} finally { srv.closeAllConnections?.(); srv.close(); }
