// SERVED MODEL: claude-opus-5-5 · SS-8 B24 CURES — before/after live witness of the batch's cures.
// usage (under guarded, browser pool): node cures-probe.mjs <build-dir-under-demo/app/node_modules/.cache> <label>
// Serves that gh-pages BUILD from an in-process static server on :8126, imports cures.mjs (ONE browser,
// a fresh context per cell, all closed in finally), closes the server in finally.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const [dir, label] = process.argv.slice(2);
if (!dir || !label) throw new Error("usage: cures-probe.mjs <build-dir> <label>");
const ROOT = new URL(`../../../../../../../demo/app/node_modules/.cache/${dir}/`, import.meta.url).pathname;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff", ".wasm": "application/wasm", ".webp": "image/webp", ".ico": "image/x-icon", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const srv = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = normalize(join(ROOT, p));
    if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    try { const b = await readFile(f); res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" }).end(b); }
    catch { res.writeHead(404).end(); }
});
await new Promise((r) => srv.listen(8126, "localhost", r));
process.env.B24_BASE = "http://localhost:8126";
process.env.B24_CURES_LABEL = label;
try { await import(new URL("./cures.mjs", import.meta.url)); }
finally { srv.closeAllConnections?.(); srv.close(); }
