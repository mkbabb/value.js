#!/usr/bin/env node
/**
 * S.W3 ORACLE — the BUILT-bundle static server for the `smoke-perf` project.
 *
 * The §6.2 frame budgets are BUILT-bundle numbers (SYNTHESIS §6.2). A dev-server
 * measurement is a corrupting substitution, not just a caveat: Vite's on-demand
 * module transform charges a one-time multi-hundred-ms task on the FIRST view
 * switch (measured: a 1064 ms long task on picker→Gradient under the dev server)
 * that the pre-built lazy chunks do NOT (built-bundle maxTask 0 ms). So the perf
 * project must drive the real `dist/gh-pages` output.
 *
 * This is a zero-dependency static file server (no `serve`/`vite preview` dep).
 * If `dist/gh-pages` is absent it builds it first (self-healing; gh-pages is a
 * standing hard-gate anyway, so the common path — dist already built — is a fast
 * static serve with no build coupling). Serves on PORT (default 8091).
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const PORT = Number(process.env.PERF_PORT ?? 8091);
const DIST = path.resolve(process.cwd(), "dist/gh-pages");

if (!existsSync(path.join(DIST, "index.html"))) {
    console.log("[serve-built] dist/gh-pages missing — building (npm run gh-pages)…");
    execSync("npm run gh-pages", { stdio: "inherit" });
}

const MIME = {
    ".js": "text/javascript",
    ".mjs": "text/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
    ".map": "application/json",
};

const server = createServer((req, res) => {
    let p = decodeURIComponent((req.url ?? "/").split("?")[0]);
    // SPA + hash-router: any non-file path falls back to index.html.
    const candidate = path.join(DIST, p);
    if (
        p === "/" ||
        !candidate.startsWith(DIST) ||
        !existsSync(candidate) ||
        statSync(candidate).isDirectory()
    ) {
        p = "/index.html";
    }
    const fp = path.join(DIST, p);
    if (!existsSync(fp)) {
        res.writeHead(404);
        res.end("not found");
        return;
    }
    res.writeHead(200, {
        "content-type": MIME[path.extname(fp)] ?? "application/octet-stream",
    });
    res.end(readFileSync(fp));
});

server.listen(PORT, "127.0.0.1", () => {
    console.log(`[serve-built] serving ${DIST} on http://127.0.0.1:${PORT}`);
});
