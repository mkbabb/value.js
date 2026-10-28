// SERVED MODEL: claude-opus-5-5 · SS-8 B24 U-5 / R-MP11 — run the two mix e2e gates as they stand at HEAD, against the
// static gh-pages build of the tree (served in-process on :8125; playwright's reuseExistingServer attaches to it via
// VJS_E2E_PORT/VJS_E2E_PERF_PORT), workers=1. argv: <project> <spec>. Run only under guarded (webkit: --exclusive webkit).
import http from "node:http";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
const REPO = new URL("../../../../../../../", import.meta.url).pathname;
const ROOT = `${REPO}demo/app/node_modules/.cache/ss8-b24-ghp/`;
const EVID = `${REPO}docs/tranches/X/execution/SS8/evidence/B24-mix-config/`;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".wasm": "application/wasm", ".webp": "image/webp" };
const srv = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const f = normalize(join(ROOT, p));
    if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    try { res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" }).end(await readFile(f)); } catch { res.writeHead(404).end(); }
});
await new Promise((r) => srv.listen(8125, "localhost", r));
const [project, spec] = process.argv.slice(2);
try {
    const r = spawnSync("npx", ["playwright", "test", spec, `--project=${project}`, "--workers=1", "--reporter=list", "--retries=0", `--output=${EVID}e2e-${project}-results`], {
        cwd: REPO, encoding: "utf8", timeout: 20 * 60000, env: { ...process.env, VJS_E2E_PORT: "8125", VJS_E2E_PERF_PORT: "8125", CI: "" } });
    const txt = `$ npx playwright test ${spec} --project=${project} --workers=1 (VJS_E2E_PORT=8125 static build)\nexit=${r.status}\n${r.stdout}\n${r.stderr}`;
    writeFileSync(`${EVID}e2e-${project}.txt`, txt);
    console.log(txt.slice(0, 6000));
} finally { srv.closeAllConnections?.(); srv.close(); }
