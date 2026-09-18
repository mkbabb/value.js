/**
 * JUROR-3 — witness harness #3: the MOTION and INTERACTION cost of the picker.
 *
 * Together with probe-j3-gestalt.mjs and probe-j3-gestalt-2.mjs this file IS the
 * π obligation of MT-W48-PRIME. Read-only. Requires the dev server on :9000.
 *
 *   node docs/tranches/V/megatranche/audit/components/picker-colorpicker/probe-j3-motion.mjs
 *
 * PINNED ROUTE  http://localhost:9000/#/?space=lab&color=lab(92%25+88.8+20+/+82.7%25)
 * PINNED MATRIX M1 1440x900 DPR 1, chromium
 * PINNED SELECTORS  .spectrum-picker · [role=slider] · .hero-blob-anchor · canvas
 *
 * ARM E  frame budget during a real pointer drag across the spectrum stage
 * ARM F  frame budget during a 20-step keyboard run on the L channel slider
 * ARM G  idle cost with the ornament composited (is the blob animating at rest?)
 */
import { chromium } from "playwright";

// GD-3 runs this against a PRODUCTION preview, not the dev server:
//   npm run build && npx vite preview --port 9100
//   node probe-j3-motion.mjs --origin http://localhost:9100
const argOrigin = process.argv.indexOf("--origin");
const ORIGIN = argOrigin > -1 ? process.argv[argOrigin + 1] : "http://localhost:9000";
const URL =
    ORIGIN + "/#/?space=lab&color=lab(92%25%2088.8%2020%20%2F%2082.7%25)";

const instrument = () => {
    window.__f = [];
    window.__lt = [];
    try {
        new PerformanceObserver((l) => {
            for (const e of l.getEntries()) window.__lt.push(+e.duration.toFixed(1));
        }).observe({ entryTypes: ["longtask"] });
    } catch {}
    let last = performance.now();
    const tick = (t) => {
        window.__f.push(+(t - last).toFixed(2));
        last = t;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const stats = () =>
    ({
        frames: window.__f.length,
        // a 60Hz budget is 16.67ms; count the frames that missed it
        over16: window.__f.filter((d) => d > 16.7).length,
        over33: window.__f.filter((d) => d > 33.4).length,
        over50: window.__f.filter((d) => d > 50).length,
        p50: window.__f.slice().sort((a, b) => a - b)[Math.floor(window.__f.length / 2)] ?? null,
        p95: window.__f.slice().sort((a, b) => a - b)[Math.floor(window.__f.length * 0.95)] ?? null,
        worst: window.__f.length ? Math.max(...window.__f) : null,
        longTasks: window.__lt,
        longTaskTotal: +window.__lt.reduce((a, b) => a + b, 0).toFixed(1),
    });

const reset = () => {
    window.__f = [];
    window.__lt = [];
};

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.addInitScript(instrument);
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(4000);

const out = {};

/* ARM G — idle, ornament composited */
await page.evaluate(reset);
await page.waitForTimeout(3000);
out.G_idle_3s = await page.evaluate(stats);
out.G_idle_3s.blobCanvasPresent = await page.evaluate(
    () => !!document.querySelector(".hero-blob-anchor canvas, canvas.goo-blob-canvas"),
);
out.G_idle_3s.canvases = await page.evaluate(() => document.querySelectorAll("canvas").length);

/* ARM E — pointer drag across the spectrum stage */
const box = await page.evaluate(() => {
    const el = document.querySelector(".spectrum-picker") || document.querySelector("canvas");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
});
out.E_stageBox = box;
if (box) {
    await page.evaluate(reset);
    await page.mouse.move(box.x + box.w * 0.15, box.y + box.h * 0.5);
    await page.mouse.down();
    for (let i = 1; i <= 40; i++) {
        await page.mouse.move(
            box.x + box.w * (0.15 + 0.7 * (i / 40)),
            box.y + box.h * (0.5 + 0.28 * Math.sin(i / 3)),
        );
        await page.waitForTimeout(16);
    }
    await page.mouse.up();
    await page.waitForTimeout(700);
    out.E_spectrumDrag = await page.evaluate(stats);
}

/* ARM F — 20-step keyboard run on the L channel slider */
await page.evaluate(reset);
await page.evaluate(() => document.querySelector("[role=slider]")?.focus());
for (let i = 0; i < 20; i++) {
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(24);
}
await page.waitForTimeout(900);
out.F_sliderKeyRun = await page.evaluate(stats);
out.F_after = await page.evaluate(() => ({
    valuetext: document.querySelector("[role=slider]")?.getAttribute("aria-valuetext"),
    hash: location.hash,
}));

console.log(JSON.stringify(out, null, 1));
await b.close();
