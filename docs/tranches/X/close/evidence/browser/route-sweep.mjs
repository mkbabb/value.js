// SERVED MODEL: claude-opus-5-5
//
// X.W11.d · G7 — the route x viewport sweep of the BROWSER cell (BROWSER-LIVE).
//
// Route list is GENERATED FROM THE ROUTER (fold W11.16): the `path:` records of
// demo/app/router/index.ts are read from the bytes at run time, never typed here.
// The wildcard record is exercised with one concrete unmatched path.
//
// Served: a built gh-pages bundle (see SWEEP_DIST below) at a
// BARE loopback origin, no SPA fallback (the demo uses hash history). One
// headless-shell Chromium per run, one context per cell, closed in `finally`.
//
// Per cell the report carries, apart from the exit code (fold S6 / W11.10):
//   executed · assertions-reached · nodes-matched (per assertion), and an
//   assertion that resolved ZERO nodes is a FAILURE, never a pass.
//
// Usage: node docs/tranches/X/close/evidence/browser/route-sweep.mjs <outDir>
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../../../../..",
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
        const png = path.join(OUT, `${route.name}-${vp.id}.png`);
        await page.screenshot({ path: png });
        return {
            route: route.path,
            visit: route.visit,
            name: route.name,
            viewport: vp.id,
            label: "BROWSER-LIVE",
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
const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
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
    browser: `chromium ${browser.version()} headless-shell swiftshader`,
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
