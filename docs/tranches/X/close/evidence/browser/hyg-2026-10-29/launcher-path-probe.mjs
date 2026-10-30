// SERVED MODEL: claude-opus-5-5 · X.W11.hyg (COHESION §0gw.5) — the GPU lhci cell's paint state, read on
// Lighthouse's own launch path: Chrome for Testing spawned with chrome-launcher's flag set (read from
// lhci-before/browser-flags.txt, the live process of the failing cell), its STARTUP tab driven over CDP
// (as Lighthouse drives it), dist/gh-pages served by a local static server. Per extra-flag set it reads
// document.visibilityState, rAF ticks in 1 s, and whether CDP's firstContentfulPaint lifecycle event fires.
// One browser per set, killed in `finally`; the server closes on exit.
// Usage: node launcher-path-probe.mjs '<extra flags json array>' ...  ("!--x" in a set drops base flags starting --x)
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(HERE, "../../../../../../..");
const DIST = path.join(REPO, "dist/gh-pages");
const BASE = readFileSync(path.join(HERE, "lhci-before/browser-flags.txt"), "utf8")
    .split("\n")
    .filter((f) => f && !/^--(user-data-dir|remote-debugging-port)=/.test(f));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png" };
const server = createServer((req, res) => {
    let p = path.join(DIST, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!existsSync(p) || statSync(p).isDirectory()) p = path.join(DIST, "index.html");
    res.writeHead(200, { "content-type": TYPES[path.extname(p)] ?? "application/octet-stream" });
    res.end(readFileSync(p));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/`;

const out = [];
try {
    for (const extra of process.argv.slice(2).map((a) => JSON.parse(a))) {
        const dir = mkdtempSync(path.join(tmpdir(), "hyg-probe-"));
        // An extra entry "!--x" removes every base flag starting with --x (to replace, not duplicate, a switch).
        const drop = extra.filter((f) => f.startsWith("!")).map((f) => f.slice(1));
        const flags = [...BASE.filter((f) => !drop.some((d) => f.startsWith(d))), ...extra.filter((f) => !f.startsWith("!"))];
        const proc = spawn(chromium.executablePath(), [...flags, `--user-data-dir=${dir}`, "--remote-debugging-port=0", "about:blank"], { stdio: "ignore" });
        let browser;
        try {
            const portFile = path.join(dir, "DevToolsActivePort");
            for (let i = 0; i < 100 && !existsSync(portFile); i++) await new Promise((r) => setTimeout(r, 100));
            const port = readFileSync(portFile, "utf8").split("\n")[0];
            browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
            const page = browser.contexts()[0].pages()[0];
            const cdp = await page.context().newCDPSession(page);
            await cdp.send("Page.enable");
            await cdp.send("Page.setLifecycleEventsEnabled", { enabled: true });
            let fcp = false;
            cdp.on("Page.lifecycleEvent", (e) => { if (e.name === "firstContentfulPaint") fcp = true; });
            await page.goto(url, { waitUntil: "load" });
            const r = await page.evaluate(async () => {
                let ticks = 0;
                const t0 = performance.now();
                await new Promise((done) => {
                    const step = () => (performance.now() - t0 < 1000 ? (ticks++, requestAnimationFrame(step)) : done());
                    requestAnimationFrame(step);
                    setTimeout(done, 1500);
                });
                const gl = document.createElement("canvas").getContext("webgl2");
                const ext = gl?.getExtension("WEBGL_debug_renderer_info");
                const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null;
                return { visibility: document.visibilityState, rafTicks1s: ticks, fcpEntry: performance.getEntriesByName("first-contentful-paint").length, renderer };
            });
            await new Promise((r) => setTimeout(r, 2000));
            out.push({ extra, ...r, cdpFirstContentfulPaint: fcp });
        } finally {
            await browser?.close().catch(() => {});
            proc.kill("SIGKILL");
            rmSync(dir, { recursive: true, force: true });
        }
    }
} finally {
    server.close();
}
console.log(JSON.stringify({ base: BASE, url, out }, null, 1));
