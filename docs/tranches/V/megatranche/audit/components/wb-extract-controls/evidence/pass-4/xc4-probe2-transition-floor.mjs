// CHALLENGE-C pass-4 probe 2 — the kC track's certified ink is applied through
// a CSS `transition: background`, driven at the live-colour tick rate.
// Question: does the PAINTED colour ever fall below the WCAG 1.4.11 3:1
// graphics floor the certification exists to hold?
// Read-only: samples computed styles. No source edits.
import { webkit } from "playwright";

const out = (t, v) => console.log(`\n=== ${t} ===\n` + JSON.stringify(v, null, 1));

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(String(e)));

await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForSelector('[data-o18="extract-kc"] .slider-track', { timeout: 20000 });
await page.waitForTimeout(3000);

// ---- 0. Confirm the transition is actually installed on the track -------
out("kC track — transition + declared track-bg", await page.evaluate(() => {
    const tr = document.querySelector('[data-o18="extract-kc"] .slider-track');
    const host = document.querySelector('[data-o18="extract-kc"] .glass-slider');
    const cs = getComputedStyle(tr);
    return {
        transitionProperty: cs.transitionProperty,
        transitionDuration: cs.transitionDuration,
        trackBgVar: getComputedStyle(host).getPropertyValue("--slider-track-bg").trim(),
        paintedBg: cs.backgroundColor,
        railTransition: getComputedStyle(document.querySelector('[data-o18="extract-k-rail"]')).transitionProperty,
    };
}));

// ---- 1. Resolve the PLATE the controls actually sit on ------------------
out("plate referent (first opaque painted ancestor)", await page.evaluate(() => {
    const cvs = document.createElement("canvas"); cvs.width = cvs.height = 1;
    const g = cvs.getContext("2d", { willReadFrequently: true });
    const resolve = (css) => {
        const draw = (ground) => {
            g.fillStyle = ground; g.fillRect(0, 0, 1, 1);
            g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1);
            return g.getImageData(0, 0, 1, 1).data;
        };
        const kb = draw("#000"), kw = draw("#fff");
        const a = 1 - (kw[0] - kb[0]) / 255;
        if (a <= 0.001) return null;
        return { r: kb[0] / a, g: kb[1] / a, b: kb[2] / a, a };
    };
    let n = document.querySelector('[data-o18="extract-kc"]');
    const chain = [];
    for (; n && n !== document.body; n = n.parentElement) {
        const c = resolve(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0) { chain.push({ tag: n.tagName.toLowerCase(), cls: String(n.className).split(" ").slice(0,2).join("."), bg: getComputedStyle(n).backgroundColor, alpha: +c.a.toFixed(3) }); }
        if (c && c.a > 0.98) break;
    }
    window.__plate = chain.length ? chain[chain.length - 1].bg : getComputedStyle(document.body).backgroundColor;
    return { chain, chosenPlate: window.__plate };
}));

// ---- 2. Sample the painted track colour every frame during a colour drive
await page.evaluate(() => {
    const cvs = document.createElement("canvas"); cvs.width = cvs.height = 1;
    const g = cvs.getContext("2d", { willReadFrequently: true });
    const flat = (css, ground) => {
        g.fillStyle = ground; g.fillRect(0, 0, 1, 1);
        g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1);
        const d = g.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2]];
    };
    const relL = ([r, gg, bb]) => {
        const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
        return 0.2126 * f(r) + 0.7152 * f(gg) + 0.0722 * f(bb);
    };
    const contrast = (a, b) => { const [x, y] = [relL(a), relL(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    window.__contrast = contrast; window.__flat = flat;

    const tr = document.querySelector('[data-o18="extract-kc"] .slider-track');
    const host = document.querySelector('[data-o18="extract-kc"] .glass-slider');
    window.__samples = [];
    window.__sampling = true;
    const plateRGB = flat(window.__plate, "#fff");
    const loop = () => {
        if (!window.__sampling) return;
        const painted = getComputedStyle(tr).backgroundColor;
        const target = getComputedStyle(host).getPropertyValue("--slider-track-bg").trim();
        const pRGB = flat(painted, window.__plate);
        window.__samples.push({
            t: Math.round(performance.now()),
            painted, target,
            contrastVsPlate: +contrast(pRGB, plateRGB).toFixed(3),
            targetContrast: target ? +contrast(flat(target, window.__plate), plateRGB).toFixed(3) : null,
        });
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
});

// Drive the live colour hard: focus the picker's hue slider in the dock and walk it.
const drove = await page.evaluate(() => {
    const s = [...document.querySelectorAll('[role="slider"]')]
        .find((el) => !el.closest('[data-o18="extract-kc"]') && !el.closest('[data-o18="extract-k-rail"]')
            && (el.getAttribute("aria-label") || "").toLowerCase().includes("hue"));
    const any = s ?? [...document.querySelectorAll('[role="slider"]')].find((el) => !el.closest('[data-o18]'));
    if (any) { any.focus(); return { focused: any.getAttribute("aria-label"), valuenow: any.getAttribute("aria-valuenow") }; }
    return { focused: null };
});
out("driven control", drove);

for (let i = 0; i < 90; i++) { await page.keyboard.press("ArrowRight"); await page.waitForTimeout(18); }
await page.waitForTimeout(1200);

const res = await page.evaluate(() => {
    window.__sampling = false;
    const s = window.__samples;
    const moving = s.filter((x) => x.target && x.painted !== x.target);
    const cs = s.map((x) => x.contrastVsPlate).filter((n) => Number.isFinite(n));
    const ts = s.map((x) => x.targetContrast).filter((n) => Number.isFinite(n));
    return {
        samples: s.length,
        distinctPainted: [...new Set(s.map((x) => x.painted))].length,
        distinctTargets: [...new Set(s.map((x) => x.target))].length,
        framesWherePaintedNotEqualTarget: moving.length,
        MIN_painted_contrast_vs_plate: Math.min(...cs),
        MAX_painted_contrast_vs_plate: Math.max(...cs),
        MIN_target_contrast_vs_plate: Math.min(...ts),
        GRAPHICS_FLOOR: 3,
        samplesBelowFloor: cs.filter((c) => c < 3).length,
        worstFive: [...s].sort((a, b) => a.contrastVsPlate - b.contrastVsPlate).slice(0, 5),
    };
});
out("kC TRACK — painted vs certified, during a live colour drive", res);

out("pageErrors", pageErrors);
await b.close();
