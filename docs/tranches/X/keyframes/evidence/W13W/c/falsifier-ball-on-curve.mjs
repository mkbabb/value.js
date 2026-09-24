// SERVED MODEL: claude-opus-5-5
// X.KF.W13W.c — THE served falsifier for the law (KF-W13.md :449-455, :464-467):
// on every plot of an easing or a simulation, the moving ball's centre lies on the
// plotted curve. For each census site it samples the ball's centre >= 12 times over
// one cycle and measures the distance to the RENDERED path (the path's own
// getPointAtLength polyline, 601 points, mapped to client px by getScreenCTM).
// A sample passes at <= 1.5 CSS px. A site is GREEN only if every sample passes.
//
// Usage (from any cwd; resolves playwright from value.js/node_modules):
//   node falsifier-ball-on-curve.mjs [--base http://localhost:5173] [--w 1440 --h 900]
//        [--theme light|dark] [--frames <dir>] [--tag <name>]
// Exit 0 = every site GREEN, 1 = at least one site RED, 2 = a site could not be measured.
//
// The site table is the census (.c receipt). `.b` moves every site onto one primitive;
// `.v` re-runs this file unchanged (1440 + 390, light + dark) and must read GREEN.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const arg = (k, d) => {
    const i = process.argv.indexOf(`--${k}`);
    return i > 0 ? process.argv[i + 1] : d;
};
const BASE = arg("base", "http://localhost:5173");
const W = +arg("w", 1440), H = +arg("h", 900);
const THEME = arg("theme", "light");
const FRAMES = arg("frames", null);
const TAG = arg("tag", `${W}-${THEME}`);
const SAMPLES = 16; // >= 12 per site (spec :465)
const TOL = 1.5; // CSS px (spec :466)

// Each site: route, how to start its motion, and (in-page) how to find every
// (ball, path) pair it draws. `pairs` runs in the page and returns
// [{ id, ball: Element, path: SVGPathElement }].
const SITES = [
    {
        id: "easing-gallery-tiles",
        file: "demo/scenes/easing/EasingTarget.vue",
        route: "#/easing",
        start: "play",
        pairs: `[...document.querySelectorAll('.specimen-tile')].map(t => ({
            id: t.querySelector('.tile-ball')?.dataset.curve ?? '?',
            ball: t.querySelector('.tile-ball'),
            path: t.querySelector('.tile-sparkline path') }))`,
    },
    {
        id: "dock-easing-mini",
        file: "demo/scenes/easing/EasingMini.vue",
        route: "#/easing",
        start: "play",
        pairs: `[...document.querySelectorAll('.scene-mini[data-live]')]
            .filter(m => m.querySelector('svg.curve path') && m.getClientRects().length)
            .map((m, i) => ({ id: 'live-mini-' + i,
                ball: m.querySelector('.ball'), path: m.querySelector('svg.curve path') }))`,
    },
    {
        id: "spring-sweep-sampler",
        file: "demo/scenes/spring/SpringTarget.vue (+ SpringTrace.vue)",
        route: "#/spring",
        start: "play",
        pairs: `[{ id: 'sampler-ball', ball: document.querySelector('.sampler-ball'),
            path: document.querySelector('.plot-trace') }]`,
    },
    {
        id: "spring-live-ball",
        file: "demo/scenes/spring/SpringTarget.vue (+ SpringTrace.vue)",
        route: "#/spring",
        start: "rail",
        pairs: `[{ id: 'spring-ball', ball: document.querySelector('.spring-ball'),
            path: document.querySelector('.plot-trace') }]`,
    },
];

// In-page: one sample of every pair of a site → [{ id, d, cx, cy }].
const measure = (pairsSrc) => {
    // eslint-disable-next-line no-new-func
    const pairs = new Function(`return ${pairsSrc}`)();
    return pairs.map(({ id, ball, path }) => {
        if (!ball || !path) return { id, err: !ball ? "no ball" : "no path" };
        const r = ball.getBoundingClientRect();
        if (!r.width) return { id, err: "ball not rendered" };
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
        const m = path.getScreenCTM(), L = path.getTotalLength();
        let best = Infinity;
        for (let i = 0; i <= 600; i++) {
            const q = path.getPointAtLength((L * i) / 600);
            const x = m.a * q.x + m.c * q.y + m.e, y = m.b * q.x + m.d * q.y + m.f;
            best = Math.min(best, Math.hypot(x - cx, y - cy));
        }
        return { id, d: +best.toFixed(2), cx: +cx.toFixed(1), cy: +cy.toFixed(1) };
    });
};

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: THEME });
const page = await ctx.newPage();
if (FRAMES) mkdirSync(FRAMES, { recursive: true });

const report = [];
let unmeasurable = false;
for (const site of SITES) {
    await page.goto(`${BASE}/${site.route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    if (site.start === "play") {
        const play = page.getByRole("button", { name: "Play animation", exact: true }).first();
        if (await play.isVisible().catch(() => false)) await play.click();
        await page.waitForTimeout(600);
    }
    if (site.start === "rail") {
        // the live spring moves when its target is set on the rail (click = new target)
        const rail = page.locator(".spring-rail");
        await rail.scrollIntoViewIfNeeded();
        const bb = await rail.boundingBox();
        await page.mouse.click(bb.x + bb.width * 0.85, bb.y + bb.height / 2);
        await page.waitForTimeout(60);
    }
    const rows = [];
    for (let s = 0; s < SAMPLES; s++) {
        rows.push(await page.evaluate(measure, site.pairs));
        await page.waitForTimeout(140);
    }
    const flat = rows.flat();
    const errs = flat.filter((x) => x.err);
    const ok = flat.filter((x) => !x.err);
    const pairIds = [...new Set(flat.map((x) => x.id))];
    // "moving": distinct ball centres per pair over the cycle
    const moved = pairIds.filter((id) => new Set(ok.filter((x) => x.id === id).map((x) => `${x.cx},${x.cy}`)).size > 1).length;
    const over = ok.filter((x) => x.d > TOL).length;
    const max = ok.reduce((a, x) => Math.max(a, x.d), 0);
    const minD = ok.reduce((a, x) => Math.min(a, x.d), Infinity);
    const verdict = errs.length || !ok.length ? "UNMEASURABLE" : over ? "RED" : "GREEN";
    if (verdict === "UNMEASURABLE") unmeasurable = true;
    report.push({ site: site.id, file: site.file, pairs: pairIds.length, samplesPerPair: SAMPLES,
        samples: ok.length, over1_5px: over, maxDistPx: max, minDistPx: minD === Infinity ? null : minD,
        pairsMoving: moved, errors: errs.length ? [...new Set(errs.map((e) => e.err))] : undefined, verdict });
    if (FRAMES) {
        await page.evaluate((src) => {
            const p = new Function(`return ${src}`)()[0];
            p?.ball?.scrollIntoView({ block: "center" });
        }, site.pairs);
        await page.waitForTimeout(200);
        await page.screenshot({ path: `${FRAMES}/${TAG}-${site.id}.png` });
    }
}
console.log(JSON.stringify({ base: BASE, viewport: `${W}x${H}`, theme: THEME, tolPx: TOL, report }, null, 1));
await browser.close();
process.exit(unmeasurable ? 2 : report.some((r) => r.verdict === "RED") ? 1 : 0);
