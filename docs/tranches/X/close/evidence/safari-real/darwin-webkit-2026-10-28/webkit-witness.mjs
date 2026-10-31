// SERVED MODEL: claude-opus-5-5
//
// X.W11.d · the darwin real-GPU WebKit witness (COHESION §0ge.2/.3: the cell of record that
// discharges the retired G8). A dated addendum-beside the immutable browser/route-sweep.mjs
// (E-3): the same router-generated 15 records x desktop/phone/short-landscape sweep, the same
// zero-node-is-failure rule, but on Playwright WebKit HEADLESS on this darwin host with NO
// software-GL flags, and each cell also reads the live WebGL2 renderer so the "real-GPU"
// claim is measured per cell, never assumed. Label: WEBKIT-ENGINE-REAL-GPU (I-20: this is not
// Safari.app and never fills a SAFARI column).
//
// Usage: SWEEP_ROOT=<tree> SWEEP_DIST=<gh-pages bundle> node webkit-witness.mjs <outDir>
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { webkit } from "playwright";

const ROOT = path.resolve(
    process.env.SWEEP_ROOT ??
        path.join(path.dirname(fileURLToPath(import.meta.url)), "../../../../../../.."),
);
// SWEEP_DIST: a private `vite build --mode gh-pages --outDir <dir>`. The checkout's own dist/ is
// shared with a standing `vite build --mode production --watch` (emptyOutDir), which wipes
// dist/gh-pages on every src change — measured during this cell's smoke-perf run.
const DIST = path.resolve(process.env.SWEEP_DIST ?? path.join(ROOT, "dist/gh-pages"));
const OUT = path.resolve(process.argv[2] ?? "route-sweep");
const HOST = "127.0.0.1";

const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900, isMobile: false, hasTouch: false },
    { id: "phone", width: 390, height: 844, isMobile: true, hasTouch: true },
    {
        id: "short-landscape",
        width: 720,
        height: 450,
        isMobile: false,
        hasTouch: false,
    },
];

function routerRecords() {
    const src = fs.readFileSync(path.join(ROOT, "demo/app/router/index.ts"), "utf8");
    const recs = [
        ...src.matchAll(/\{\s*path:\s*"([^"]+)",\s*name:\s*"([^"]+)"([^}]*)\}/g),
    ].map((m) => ({ path: m[1], name: m[2], admin: /admin:\s*true/.test(m[3]) }));
    return recs.map((r) =>
        r.path.startsWith("/:pathMatch")
            ? { ...r, visit: "/does-not-exist", wildcard: true }
            : { ...r, visit: r.path, wildcard: false },
    );
}

const TYPES = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".json": "application/json",
    ".woff2": "font/woff2",
    ".wasm": "application/wasm",
    ".webp": "image/webp",
};

function serve(root) {
    const server = http.createServer((req, res) => {
        const p = path.resolve(
            path.join(
                root,
                decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname),
            ),
        );
        if (p !== root && !p.startsWith(root + path.sep))
            return res.writeHead(403).end();
        const t =
            fs.existsSync(p) && fs.statSync(p).isDirectory()
                ? path.join(p, "index.html")
                : p;
        if (!fs.existsSync(t)) return res.writeHead(404).end("not found");
        res.writeHead(200, {
            "content-type": TYPES[path.extname(t)] ?? "application/octet-stream",
        });
        fs.createReadStream(t).pipe(res);
    });
    return new Promise((ok) => server.listen(0, HOST, () => ok(server)));
}

const sha256 = (f) =>
    crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");

async function cell(browser, origin, route, vp) {
    const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        isMobile: vp.isMobile,
        hasTouch: vp.hasTouch,
    });
    const errors = [];
    const asserts = [];
    try {
        const page = await ctx.newPage();
        page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
        await page.goto(`${origin}/#${route.visit}`, { waitUntil: "load" });
        await page
            .locator("main h1")
            .first()
            .waitFor({ state: "attached", timeout: 20000 })
            .catch(() => {});
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(600);
        const gl = await page.evaluate(() => {
            const c = document.createElement("canvas").getContext("webgl2");
            if (!c) return { webgl2: false, renderer: null, vendor: null };
            const ext = c.getExtension("WEBGL_debug_renderer_info");
            return {
                webgl2: true,
                renderer: c.getParameter(
                    ext ? ext.UNMASKED_RENDERER_WEBGL : c.RENDERER,
                ),
                vendor: c.getParameter(ext ? ext.UNMASKED_VENDOR_WEBGL : c.VENDOR),
            };
        });
        const r = await page.evaluate(() => ({
            app: document.querySelector("#app")?.childElementCount ?? 0,
            main: document.querySelectorAll("main").length,
            h1: [...document.querySelectorAll("main h1")].map((h) =>
                h.textContent.trim(),
            ),
            title: document.title,
            hash: location.hash,
            overflowX: document.documentElement.scrollWidth - window.innerWidth,
        }));
        const expectNotFound = route.wildcard || route.admin; // admin unauth'd -> guard -> not-found
        const isNF = r.h1.some((t) => /not found/i.test(t));
        const add = (name, nodes, pass) =>
            asserts.push({ name, nodesMatched: nodes, pass: pass && nodes > 0 });
        add("#app has element children", r.app, r.app > 0);
        add("exactly one <main>", r.main, r.main === 1);
        add("main h1 present", r.h1.length, r.h1.length >= 1);
        add(
            expectNotFound
                ? "h1 reads Not Found (guard/wildcard)"
                : "h1 is not Not Found",
            r.h1.length,
            expectNotFound ? isNF : !isNF,
        );
        add("pageerror []", 1, errors.length === 0);
        add(
            "WebGL2 renderer is a hardware GPU (not SwiftShader/llvmpipe/software)",
            gl.webgl2 ? 1 : 0,
            gl.webgl2 &&
                !/swiftshader|llvmpipe|software|softpipe/i.test(
                    `${gl.renderer} ${gl.vendor}`,
                ),
        );
        const png = path.join(OUT, `${route.name}-${vp.id}.png`);
        await page.screenshot({ path: png });
        return {
            route: route.path,
            visit: route.visit,
            name: route.name,
            viewport: vp.id,
            label: "WEBKIT-ENGINE-REAL-GPU",
            gl,
            ...r,
            pageerrors: errors,
            assertions: asserts,
            assertionsReached: asserts.length,
            pass: asserts.every((a) => a.pass),
            png: path.basename(png),
            sha256: sha256(png),
        };
    } finally {
        await ctx.close();
    }
}

const routes = routerRecords();
fs.mkdirSync(OUT, { recursive: true });
const server = await serve(DIST);
const origin = `http://${HOST}:${server.address().port}`;
const browser = await webkit.launch({ headless: true });
const cells = [];
try {
    for (const vp of VIEWPORTS)
        for (const r of routes) cells.push(await cell(browser, origin, r, vp));
} finally {
    await browser.close();
    server.close();
}
const expected = routes.length * VIEWPORTS.length;
const report = {
    origin: `${path.relative(ROOT, DIST) || DIST} @ bare loopback`,
    browser: `webkit ${browser.version()} headless (darwin ${process.platform} ${process.arch}, no GL flags)`,
    renderers: [...new Set(cells.map((c) => c.gl?.renderer))],
    routerRecords: routes.length,
    viewports: VIEWPORTS.map((v) => `${v.id} ${v.width}x${v.height}`),
    expectedCells: expected,
    executed: cells.length,
    passed: cells.filter((c) => c.pass).length,
    failed: cells.filter((c) => !c.pass).length,
    assertionsReached: cells.reduce((n, c) => n + c.assertionsReached, 0),
    zeroNodeAssertions: cells.flatMap((c) =>
        c.assertions
            .filter((a) => a.nodesMatched === 0)
            .map((a) => `${c.name}/${c.viewport}: ${a.name}`),
    ),
    cells,
};
fs.writeFileSync(
    path.join(OUT, "ROUTE-SWEEP.json"),
    JSON.stringify(report, null, 2) + "\n",
);
console.log(
    JSON.stringify({
        routerRecords: report.routerRecords,
        expectedCells: expected,
        executed: report.executed,
        passed: report.passed,
        failed: report.failed,
        assertionsReached: report.assertionsReached,
        zeroNodeAssertions: report.zeroNodeAssertions.length,
    }),
);
process.exit(
    report.executed === expected && report.failed === 0 && report.executed > 0 ? 0 : 1,
);
