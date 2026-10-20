// SERVED MODEL: claude-opus-5-5 — static server for the BUILT gh-pages artifact (argv[2]) on PORT.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const DIST = process.argv[2]; const PORT = +(process.env.PORT ?? 9419);
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".wasm": "application/wasm" };
createServer(async (req, res) => { try { const u = decodeURIComponent(new URL(req.url, "http://x").pathname); const f = join(DIST, normalize(u === "/" ? "/index.html" : u)); const b = await readFile(f); res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" }); res.end(b); } catch { res.writeHead(404); res.end(); } }).listen(PORT, () => console.log("serving", DIST, PORT));
