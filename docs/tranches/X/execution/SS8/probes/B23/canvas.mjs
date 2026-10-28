// SERVED MODEL: claude-opus-5-5 · SS-8 B23 — wb-mix-animationcanvas live cells.
// usage: node canvas.mjs <cell...>   cells: landing deact nullctx seam contrast contrast2 admin
// One chromium per run, one context per cell, closed in finally. Evidence → evidence/B23-mix-canvas-result/.
import { launch, open, readyMix, addCurrent, mixButton, mixAndSettle, selectPalettes, pal, hues, save, samplePng, contrast, EVID } from "./lib.mjs";
import { resolve } from "node:path";

const want = new Set(process.argv.slice(2));
const b = await launch();
const out = {};
const cell = async (name, fn) => {
    if (!want.has(name)) return;
    try { out[name] = await fn(); } catch (e) { out[name] = { error: String(e).slice(0, 400) }; }
    save(`canvas-${name}.json`, out[name]);
    console.log(name, JSON.stringify(out[name]).slice(0, 1400));
};

/** Summarise one narration from the page log, from index marks. */
const narration = (p, from) => p.evaluate((from) => {
    const L = window.__mix;
    const g = L.gctx[from.g];
    const grads = L.grads.filter((x) => x.t >= g.t);
    const pool = grads[grads.length - 1];
    return { arm: g, wellAtArm: L.wellAtArm, poolCentroid: pool && { x: +pool.x.toFixed(1), y: +pool.y.toFixed(1), r: +pool.r.toFixed(1) }, gradCount: grads.length };
}, from);

try {
    // R-1 · R-5 · R-8 — first mix + two re-mixes, colors arm (the add slot is live at HEAD).
    await cell("landing", async () => {
        const { ctx, p, errors } = await open(b, {});
        try {
            await readyMix(p);
            await addCurrent(p, 2);
            const runs = [];
            for (let k = 0; k < 3; k++) {
                const mark = await p.evaluate(() => ({ g: window.__mix.gctx.length }));
                const tClick = await p.evaluate(() => performance.now());
                await mixButton(p).click();
                await p.waitForFunction((n) => window.__mix.gctx.length > n, mark.g, { timeout: 5000 });
                // well rect ~400 ms after arm (after any out-in hand-off) in canvas-local px
                await p.waitForTimeout(400);
                const wellLate = await p.evaluate(() => {
                    const t = document.querySelector("[data-mix-target]"); const c = document.querySelector("canvas.z-controls").getBoundingClientRect();
                    if (!t) return null; const r = t.getBoundingClientRect(); return { cx: r.left + r.width / 2 - c.left, cy: r.top + r.height / 2 - c.top };
                });
                await p.waitForFunction(() => !document.querySelector(".mix-plate--ghost"), null, { timeout: 8000 });
                await p.waitForTimeout(600);
                const n = await narration(p, mark);
                const ref = n.wellAtArm ?? wellLate;
                const miss = n.poolCentroid && wellLate ? +Math.hypot(n.poolCentroid.x - wellLate.cx, n.poolCentroid.y - wellLate.cy).toFixed(1) : null;
                const poolArea = n.poolCentroid ? Math.PI * n.poolCentroid.r ** 2 : null;
                runs.push({ k, clickToArmMs: +(n.arm.t - tClick).toFixed(1), anchorPresentAtArm: !!n.wellAtArm, wellLate, ...n, missVsWellPx: miss,
                    fallbackPredicted: { x: n.arm.pw / 2, y: +(n.arm.psh * 0.7).toFixed(1) },
                    paneDims: `${n.arm.pw}x${n.arm.psh}`, backingStore: { w: n.arm.w, h: n.arm.h, MB: +((n.arm.w * n.arm.h * 4) / 1048576).toFixed(3) },
                    lastPoolDiscAreaShare: poolArea ? +((100 * poolArea) / (n.arm.pw * n.arm.psh)).toFixed(3) : null, _ref: !!ref });
            }
            const after = await p.evaluate(() => ({ canvasW: document.querySelector("canvas.z-controls").width, canvasH: document.querySelector("canvas.z-controls").height, zIndex: getComputedStyle(document.querySelector("canvas.z-controls")).zIndex, nullCtx: window.__mix.gctx.filter((g) => g.isNull).length, arms: window.__mix.gctx.length }));
            await p.screenshot({ path: resolve(EVID, "landing-after-3-mixes-1440-light.png") });
            return { viewport: "1440x900 light dpr1", runs, after, errors };
        } finally { await ctx.close(); }
    });

    // R-3 · R-9 — deactivate mid-narration (hash route swap), count off-screen paints, reactivate.
    await cell("deact", async () => {
        const { ctx, p, errors } = await open(b, {});
        try {
            await readyMix(p);
            await addCurrent(p, 2);
            await mixButton(p).click();
            await p.waitForTimeout(300);
            const atSwap = await p.evaluate(() => { window.__swapT = performance.now(); location.hash = "#/gradient"; return { grads: window.__mix.grads.length }; });
            await p.waitForTimeout(1600);
            const parked = await p.evaluate(() => {
                const L = window.__mix; const cv = document.querySelector("canvas.z-controls");
                const post = L.grads.filter((g) => g.t > window.__swapT);
                const frames = L.clears.filter((c) => c.t > window.__swapT);
                return { gradsAfterSwap: post.length, framesAfterSwap: frames.length, detachedPaints: post.filter((g) => !g.attached).length,
                    canvasInDom: !!cv, canvasW: cv?.width ?? null, canvasH: cv?.height ?? null, styleH: cv?.style.height ?? null };
            });
            await p.evaluate(() => { location.hash = "#/mix"; });
            await p.waitForTimeout(900);
            const back = await p.evaluate(() => {
                const cv = document.querySelector("canvas.z-controls");
                let px = null;
                if (cv && cv.width > 0) { const g = cv.getContext("2d"); const d = g.getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 8) n++; px = n; }
                return { canvasW: cv?.width ?? null, canvasH: cv?.height ?? null, nonTransparentPx: px, plateGhost: !!document.querySelector(".mix-plate--ghost"), plate: !!document.querySelector(".mix-plate") };
            });
            await p.screenshot({ path: resolve(EVID, "deact-reactivated-1440-light.png") });
            return { atSwap, parked, back, errors };
        } finally { await ctx.close(); }
    });

    // R-6 — natural null rate is read from every cell's gctx; here force null and watch the phase machine.
    await cell("nullctx", async () => {
        const { ctx, p, errors } = await open(b, {});
        try {
            await readyMix(p);
            await addCurrent(p, 2);
            await p.evaluate(() => { window.__forceNull = true; });
            const t0 = Date.now();
            await mixButton(p).click();
            let settled = true;
            try { await p.waitForFunction(() => document.querySelector(".mix-plate") && !document.querySelector(".mix-plate--ghost"), null, { timeout: 4000 }); } catch { settled = false; }
            const ms = Date.now() - t0;
            const st = await p.evaluate(() => ({ arms: window.__mix.gctx.length, grads: window.__mix.grads.length, resultText: document.querySelector(".mix-plate")?.innerText.slice(0, 80) }));
            // can the page Mix again afterwards?
            await p.evaluate(() => { window.__forceNull = false; });
            await mixButton(p).click();
            await p.waitForTimeout(1600);
            const again = await p.evaluate(() => ({ arms: window.__mix.gctx.length, grads: window.__mix.grads.length, ghost: !!document.querySelector(".mix-plate--ghost") }));
            return { forcedNull: { settledWithin4s: settled, wallMs: ms, ...st }, remixAfter: again, errors };
        } finally { await ctx.close(); }
    });

    // R-10 — composite step at the arrival hand-off, N ∈ {2,3,8,12} (palettes arm; discard).
    await cell("seam", async () => {
        const res = {};
        const sets = { 2: [1, 1], 3: [1, 2], 8: [4, 4], 12: [4, 4, 4] };
        for (const [N, lens] of Object.entries(sets)) {
            const saved = lens.map((n, i) => pal(`s${i}`, `Seam ${i}`, hues(n, 0.66, 0.15, i * 40)));
            const { ctx, p, errors } = await open(b, { saved });
            try {
                await readyMix(p);
                await selectPalettes(p, saved.map((s) => s.name));
                const mark = await p.evaluate(() => window.__mix.gctx.length);
                await mixButton(p).click();
                await p.waitForFunction((n) => window.__mix.gctx.length > n, mark, { timeout: 5000 });
                await p.waitForFunction(() => !document.querySelector(".mix-plate--ghost"), null, { timeout: 8000 });
                await p.waitForTimeout(500);
                res[N] = await p.evaluate((mark) => {
                    const L = window.__mix; const a = L.gctx[mark].t;
                    const fr = L.clears.filter((c) => c.t >= a && c.px).map((c) => ({ t: +(c.t - a).toFixed(0), center: c.px[0], edge: c.px[1] }));
                    // drops per frame: gradients between consecutive clears
                    const gs = L.grads.filter((g) => g.t >= a);
                    let maxStep = { d: 0 }; let maxEdge = { d: 0 };
                    for (let i = 1; i < fr.length; i++) {
                        if (fr[i].t < 550 || fr[i].t > 900) continue;
                        const d = fr[i].center[3] - fr[i - 1].center[3];
                        if (Math.abs(d) > Math.abs(maxStep.d)) maxStep = { d, from: fr[i - 1], to: fr[i] };
                        const e = fr[i].edge[3] - fr[i - 1].edge[3];
                        if (Math.abs(e) > Math.abs(maxEdge.d)) maxEdge = { d: e, from: fr[i - 1], to: fr[i] };
                    }
                    return { drops: Math.min(12, (document.querySelectorAll("[data-mix-colors]").length ? [...document.querySelectorAll("[data-mix-colors]")].reduce((s, e) => s + JSON.parse(e.dataset.mixColors).length, 0) : 0)),
                        well: L.wellAtArm, frames: fr.length, window: fr.filter((f) => f.t >= 550 && f.t <= 900), maxCenterAlphaStep: maxStep, maxEdgeAlphaStep: maxEdge, grads: gs.length };
                }, mark);
                res[N].errors = errors;
            } finally { await ctx.close(); }
        }
        return res;
    });

    // R-12 — MX-42: the ghost plate's "Result" head contrast (0.55 opacity) — painted, light + dark.
    await cell("contrast", async () => {
        const r = {};
        for (const theme of ["light", "dark"]) {
            const { ctx, p, errors } = await open(b, { theme });
            try {
                await readyMix(p);
                await addCurrent(p, 2);
                await mixAndSettle(p, 600);
                for (const ghost of [false, true]) {
                    await p.evaluate((g) => document.querySelector(".mix-plate").classList.toggle("mix-plate--ghost", g), ghost);
                    await p.waitForTimeout(500);
                    const info = await p.evaluate(() => {
                        const pl = document.querySelector(".mix-plate"); const h = pl.querySelector("h3"); const r = h.getBoundingClientRect();
                        return { rect: r.toJSON(), headColor: getComputedStyle(h).color, headFont: getComputedStyle(h).fontSize + " " + getComputedStyle(h).fontWeight, plateOpacity: getComputedStyle(pl).opacity, headClass: h.className };
                    });
                    const clip = { x: info.rect.x, y: info.rect.y, width: Math.ceil(info.rect.width), height: Math.ceil(info.rect.height) };
                    const ink = await p.screenshot({ clip });
                    await p.evaluate(() => { document.querySelector(".mix-plate h3").style.color = "transparent"; });
                    const bg = await p.screenshot({ clip });
                    await p.evaluate(() => { document.querySelector(".mix-plate h3").style.color = ""; });
                    // per-pixel: darkest/lightest ink vs median bg
                    const pts = {}; const W = clip.width, H = clip.height;
                    for (let y = 2; y < H - 2; y += 2) for (let x = 2; x < W - 2; x += 2) pts[`${x}_${y}`] = { x, y };
                    const I = await samplePng(b, ink, pts); const B = await samplePng(b, bg, pts);
                    const bgs = Object.values(B).sort((a, c) => a[0] + a[1] + a[2] - (c[0] + c[1] + c[2])); const bgMed = bgs[bgs.length >> 1];
                    let best = null, bestC = 0;
                    for (const k of Object.keys(I)) { const c = contrast(I[k], bgMed); if (c > bestC) { bestC = c; best = I[k]; } }
                    r[`${theme}-${ghost ? "ghost" : "settled"}`] = { ...info, bgMedian: bgMed, inkCore: best, contrast: bestC };
                    if (ghost) await p.screenshot({ path: resolve(EVID, `contrast-ghost-${theme}-1440.png`), clip: { x: clip.x - 20, y: clip.y - 20, width: 360, height: 140 } });
                }
                r[`${theme}-errors`] = errors;
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-12 (re-take) — MX-42 painted ratio with the plate's transitions frozen (the first take's ink
    // capture raced the opacity transition: computed 0.55 but painted ink unchanged). Light + dark.
    await cell("contrast2", async () => {
        const r = {};
        for (const theme of ["light", "dark"]) {
            const { ctx, p, errors } = await open(b, { theme });
            try {
                await readyMix(p);
                await addCurrent(p, 2);
                await mixAndSettle(p, 600);
                await p.locator(".mix-plate").evaluate((e) => e.scrollIntoView({ block: "center" }));
                await p.waitForTimeout(400);
                r[`${theme}-plateTransition`] = await p.evaluate(() => { const cs = getComputedStyle(document.querySelector(".mix-plate")); return `${cs.transitionProperty} ${cs.transitionDuration}`; });
                await p.addStyleTag({ content: ".mix-plate, .mix-plate * { transition: none !important; animation: none !important; }" });
                for (const ghost of [false, true]) {
                    await p.evaluate((g) => document.querySelector(".mix-plate").classList.toggle("mix-plate--ghost", g), ghost);
                    await p.waitForTimeout(400);
                    const info = await p.evaluate(() => {
                        const pl = document.querySelector(".mix-plate"); const h = pl.querySelector("h3"); const r = h.getBoundingClientRect();
                        const rng = document.createRange(); rng.selectNodeContents(h); const tr = rng.getBoundingClientRect();
                        return { rect: tr.toJSON(), headColor: getComputedStyle(h).color, plateBg: getComputedStyle(pl).backgroundColor, plateOpacity: getComputedStyle(pl).opacity, headClass: h.className };
                    });
                    const clip = { x: Math.floor(info.rect.x) - 2, y: Math.floor(info.rect.y), width: Math.ceil(info.rect.width) + 4, height: Math.ceil(info.rect.height) };
                    const ink = await p.screenshot({ clip });
                    await p.evaluate(() => { document.querySelector(".mix-plate h3").style.color = "transparent"; });
                    const bg = await p.screenshot({ clip });
                    await p.evaluate(() => { document.querySelector(".mix-plate h3").style.color = ""; });
                    const pts = {}; const W = clip.width, H = clip.height;
                    for (let y = 1; y < H - 1; y += 1) for (let x = 1; x < W - 1; x += 1) pts[`${x}_${y}`] = { x, y };
                    const I = await samplePng(b, ink, pts); const B = await samplePng(b, bg, pts);
                    const bgs = Object.values(B).sort((a, c) => a[0] + a[1] + a[2] - (c[0] + c[1] + c[2])); const bgMed = bgs[bgs.length >> 1];
                    let best = null, bestC = 0;
                    for (const k of Object.keys(I)) { const c = contrast(I[k], B[k]); if (c > bestC) { bestC = c; best = { ink: I[k], bg: B[k], at: k }; } }
                    r[`${theme}-${ghost ? "ghost" : "settled"}`] = { ...info, bgMedian: bgMed, inkCore: best, contrast: bestC };
                    await p.screenshot({ path: resolve(EVID, `contrast2-${ghost ? "ghost" : "settled"}-${theme}-1440.png`), clip: { x: clip.x - 16, y: clip.y - 16, width: 300, height: clip.height + 32 } });
                }
                r[`${theme}-errors`] = errors.filter((e) => !/CORS|ERR_FAILED/.test(e));
            } finally { await ctx.close(); }
        }
        return r;
    });

    // R-2 — L-5: a non-admin `palette-admin-token` value in storage, cold load of /#/mix.
    await cell("admin", async () => {
        const r = {};
        for (const tok of ["probe-token", null]) {
            const { ctx, p, errors } = await open(b, { extra: tok ? { "palette-admin-token": tok } : null });
            try {
                await p.waitForTimeout(9000);
                r[tok ?? "none"] = await p.evaluate(() => ({ crashed: /unexpected error/i.test(document.body.innerText), alert: document.querySelector("[role=alert]")?.innerText.slice(0, 200) ?? null,
                    mixCanvas: !!document.querySelector("canvas.z-controls"), addSlot: !!document.querySelector(".add-slot-ghost"), tokenNow: localStorage.getItem("palette-admin-token") }));
                r[(tok ?? "none") + "-errors"] = errors;
            } finally { await ctx.close(); }
        }
        return r;
    });
} finally {
    await b.close();
}
