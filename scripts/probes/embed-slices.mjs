/**
 * The embed slices, read framed by their host: value.js's picker and gradient
 * (color.babb.dev/embed/) and keyframes.js's cube (keyframes.babb.dev/embed/),
 * over the `babb-embed` v1 contract (demo/app/embed/bridge.ts).
 *
 * Run ONLY through the machine guard, never --light (it launches a browser):
 *   ~/.claude/guard/guarded --timeout 15 -- node scripts/probes/embed-slices.mjs \
 *       [--color https://color.babb.dev] [--keyframes https://keyframes.babb.dev] \
 *       [--host https://daraksha.babb.dev] [--slices picker,gradient,cube] [--out FILE]
 *
 * The host document is served by the probe itself (a Playwright route on the
 * host origin), so the slices see the real host origin and their real response
 * headers decide whether they may be framed. For local builds pass loopback
 * bases and a loopback --host (a loopback slice admits a loopback host).
 *
 * Each cell (slice × viewport × scheme) reads:
 *   headers   /embed/ sends frame-ancestors naming the host and no X-Frame-Options
 *   ready     the `ready` message arrives (≤ 4236 ms), from the slice origin
 *   ground    the slice's root and body paint transparent; color-scheme = the host's
 *   size      the last `size`/`ready` height equals the slice's content height (±2 px)
 *   theme     a `set-theme` is acknowledged by `theme` within 120 ms and applied
 *   console   0 console errors and 0 page errors, host and slice
 *   requests  no request leaves the host and slice origins
 *
 * One browser per run, a new context per cell, every context and the browser
 * closed in `finally`.
 */
import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const arg = (name, fallback) => {
    const i = process.argv.indexOf(`--${name}`);
    return i > 0 ? process.argv[i + 1] : fallback;
};
const COLOR = arg("color", "https://color.babb.dev").replace(/\/$/, "");
const KEYFRAMES = arg("keyframes", "https://keyframes.babb.dev").replace(/\/$/, "");
const HOST = arg("host", "https://daraksha.babb.dev").replace(/\/$/, "");
const OUT = arg("out", null);
const ONLY = new Set(arg("slices", "picker,gradient,cube").split(","));

const HER = [
    "efflorescence:oklch(73% 0.185 2)",
    "gulabi:oklch(90% 0.055 18)",
    "haldi:oklch(82% 0.145 76)",
    "zari:oklch(72% 0.12 88)",
    "sheesham:oklch(55% 0.085 56)",
    "tulsi:oklch(72% 0.055 145)",
    "curry-leaf:oklch(43% 0.085 152)",
    "jamun:oklch(39% 0.1 356)",
];
const FIVE = HER.filter((s) => /^(efflorescence|gulabi|haldi|zari|tulsi):/.test(s));

const ALL_SLICES = [
    { name: "picker", base: COLOR, path: `picker?palette=${encodeURIComponent(HER.join(";"))}`, aspect: 0.833 },
    { name: "gradient", base: COLOR, path: `gradient?palette=${encodeURIComponent(FIVE.join(";"))}`, aspect: { wide: 0.382, narrow: 1.618 } },
    { name: "cube", base: KEYFRAMES, path: "cube?skin=daraksha", aspect: 1 },
];
const SLICES = ALL_SLICES.filter((s) => ONLY.has(s.name));
const VIEWPORTS = [
    { name: "desktop", width: 1440, height: 900, frameWidth: 420 },
    { name: "mobile", width: 390, height: 844, frameWidth: 358, mobile: true },
];
const SCHEMES = ["light", "dark"];

const hostPage = (src, w, h) => `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<body style="margin:0;background:transparent">
<script>
window.__msgs = [];
addEventListener("message", (e) => window.__msgs.push({ t: performance.now(), origin: e.origin, data: e.data }));
</script>
<iframe id="slice" title="Slice" src="${src}" style="display:block;border:0;width:${w}px;height:${h}px;background:transparent"></iframe>`;

async function readHeaders(url) {
    const res = await fetch(url, { redirect: "follow" });
    return {
        status: res.status,
        csp: res.headers.get("content-security-policy"),
        xfo: res.headers.get("x-frame-options"),
        cacheControl: res.headers.get("cache-control"),
    };
}

async function cell(browser, slice, vp, scheme) {
    const frameWidth = vp.frameWidth;
    const aspect = typeof slice.aspect === "number" ? slice.aspect : vp.mobile ? slice.aspect.narrow : slice.aspect.wide;
    const frameHeight = Math.round(frameWidth / aspect);
    const src = `${slice.base}/embed/#/${slice.path}&scheme=${scheme}`;
    const sliceOrigin = new URL(slice.base).origin;
    const hostOrigin = new URL(HOST).origin;
    const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.mobile ? 3 : 1,
        isMobile: !!vp.mobile,
        hasTouch: !!vp.mobile,
        colorScheme: scheme,
    });
    const errors = [];
    const foreign = [];
    try {
        const page = await context.newPage();
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        page.on("pageerror", (e) => errors.push(String(e.message)));
        page.on("request", (r) => {
            const o = new URL(r.url()).origin;
            if (o !== sliceOrigin && o !== hostOrigin && !r.url().startsWith("data:")) foreign.push(r.url());
        });
        await page.route(`${hostOrigin}/__embed-probe`, (route) =>
            route.fulfill({ contentType: "text/html", body: hostPage(src, frameWidth, frameHeight) }),
        );
        const t0 = Date.now();
        await page.goto(`${hostOrigin}/__embed-probe`);
        const msgs = () => page.evaluate(() => window.__msgs);
        let ready;
        for (let i = 0; i < 100 && !ready; i++) {
            ready = (await msgs()).find((m) => m.data?.type === "ready");
            if (!ready) await page.waitForTimeout(50);
        }
        const readyMs = ready ? Date.now() - t0 : null;
        const frame = page.frames().find((f) => f.url().startsWith(sliceOrigin));
        const ground = frame
            ? await frame.evaluate(() => ({
                  html: getComputedStyle(document.documentElement).backgroundColor,
                  body: getComputedStyle(document.body).backgroundColor,
                  colorScheme: getComputedStyle(document.documentElement).colorScheme,
                  dark: document.documentElement.classList.contains("dark"),
                  contentHeight: Math.ceil(document.querySelector(".embed-slice")?.getBoundingClientRect().height ?? -1),
              }))
            : null;
        await page.waitForTimeout(400);
        const all = await msgs();
        const sizes = all.filter((m) => m.data?.type === "size" || m.data?.type === "ready");
        const lastHeight = sizes.at(-1)?.data.height ?? null;

        // Theme: flip to the other scheme, time the acknowledgement.
        const other = scheme === "dark" ? "light" : "dark";
        const sentAt = await page.evaluate(
            ([origin, s]) => {
                const t = performance.now();
                document.getElementById("slice").contentWindow.postMessage({ ns: "babb-embed", v: 1, type: "set-theme", scheme: s }, origin);
                return t;
            },
            [sliceOrigin, other],
        );
        await page.waitForTimeout(300);
        const ack = (await msgs()).find((m) => m.data?.type === "theme" && m.data.scheme === other);
        const applied = frame ? await frame.evaluate(() => document.documentElement.classList.contains("dark")) : null;
        const contract = (await msgs()).every((m) => m.data?.ns === "babb-embed" && m.data?.v === 1 && m.origin === sliceOrigin);

        const r = {
            slice: slice.name,
            viewport: vp.name,
            scheme,
            frame: [frameWidth, frameHeight],
            readyMs,
            readyFrom: ready?.origin ?? null,
            ground,
            lastHeight,
            ackMs: ack ? Math.round(ack.t - sentAt) : null,
            themeApplied: applied === (other === "dark"),
            contract,
            errors,
            foreign,
        };
        r.green =
            readyMs !== null &&
            readyMs <= 4236 &&
            r.readyFrom === sliceOrigin &&
            ground?.html === "rgba(0, 0, 0, 0)" &&
            ground?.body === "rgba(0, 0, 0, 0)" &&
            ground?.colorScheme === scheme &&
            ground?.dark === (scheme === "dark") &&
            lastHeight !== null &&
            Math.abs(lastHeight - ground.contentHeight) <= 2 &&
            r.ackMs !== null &&
            r.ackMs <= 120 &&
            r.themeApplied &&
            contract &&
            errors.length === 0 &&
            foreign.length === 0;
        return r;
    } finally {
        await context.close();
    }
}

const browser = await chromium.launch();
const report = { at: new Date().toISOString(), host: HOST, color: COLOR, keyframes: KEYFRAMES, headers: {}, cells: [] };
try {
    for (const base of new Set(SLICES.map((s) => s.base))) {
        const h = await readHeaders(`${base}/embed/`);
        const hostOrigin = new URL(HOST).origin;
        const loopback = /^http:\/\/(localhost|127\.0\.0\.1)/.test(base);
        h.green =
            h.status === 200 &&
            (loopback || (h.csp?.includes(`frame-ancestors ${hostOrigin}`) && !h.csp.includes("frame-ancestors 'none'") && !h.xfo));
        report.headers[base] = h;
    }
    for (const slice of SLICES)
        for (const vp of VIEWPORTS)
            for (const scheme of SCHEMES) report.cells.push(await cell(browser, slice, vp, scheme));
} finally {
    await browser.close();
}
report.green = Object.values(report.headers).every((h) => h.green) && report.cells.every((c) => c.green);
const text = JSON.stringify(report, null, 2);
if (OUT) writeFileSync(OUT, text);
for (const [base, h] of Object.entries(report.headers)) console.log(`${h.green ? "GREEN" : "RED  "} headers ${base}/embed/ csp-fa=${/frame-ancestors [^;]*/.exec(h.csp ?? "")?.[0] ?? "-"} xfo=${h.xfo ?? "-"}`);
for (const c of report.cells)
    console.log(
        `${c.green ? "GREEN" : "RED  "} ${c.slice.padEnd(8)} ${c.viewport.padEnd(7)} ${c.scheme.padEnd(5)} ready=${c.readyMs}ms h=${c.lastHeight}/${c.ground?.contentHeight} ack=${c.ackMs}ms errors=${c.errors.length} foreign=${c.foreign.length}`,
    );
console.log(report.green ? "ALL GREEN" : "RED");
process.exit(report.green ? 0 : 1);
