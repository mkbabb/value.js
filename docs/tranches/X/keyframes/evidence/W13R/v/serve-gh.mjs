// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — serve a snapshot of keyframes.js dist/gh-pages (built at HEAD) on a fixed port for the headed gh-pages reads.
import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import http from "node:http";
const SRC = "/Users/mkbabb/Programming/keyframes.js/dist/gh-pages";
const snap = fs.mkdtempSync(path.join(os.tmpdir(), "kf-w13r-v-gh-")); fs.cpSync(SRC, snap, { recursive: true });
const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".woff2": "font/woff2", ".wasm": "application/wasm" };
http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let p = path.join(snap, u === "/" ? "index.html" : u);
  if (!p.startsWith(snap) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(snap, "index.html");
  res.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(res);
}).listen(5199, () => console.log("gh-pages snapshot", snap, "at http://localhost:5199/"));
