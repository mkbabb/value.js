// SERVED MODEL: claude-opus-5-5 · B25 · wb-extract-controls cells (headless Chromium, 1440×900).
// Cells: light, dark (populated: rail ring/ground/sweep/focus/font/thumb/track) · park (KeepAlive rates) · twin (#/generate).
import { launch, open, makePng, feed, waitRail, save, ratio, RESOLVE, pixels, EVID } from "./lib.mjs";

const which = process.argv.slice(2);
const want = (c) => which.length === 0 || which.includes(c);
// Picks chosen to force a certification walk on each scheme's resting plate.
const PICK = { light: "oklch(0.86 0.12 85)", dark: "oklch(0.34 0.12 260)" };

// oklch → sRGB bytes (node), for the modelled achromatic referent oklch(L 0 0).
const greyBytes = (L) => { const l = L ** 3; const v = l <= 0.0031308 ? 12.92 * l : 1.055 * l ** (1 / 2.4) - 0.055; const c = Math.round(Math.max(0, Math.min(1, v)) * 255); return [c, c, c]; };
const solveReferent = (ink, target, lighter) => {
    let best = null;
    for (let i = 0; i <= 1000; i++) { const L = i / 1000; const g = greyBytes(L); const r = ratio(ink, g); const on = lighter ? g[0] >= ink[0] : g[0] <= ink[0]; if (on && (!best || Math.abs(r - target) < Math.abs(best.r - target))) best = { L, r, g }; }
    return best;
};
// sRGB bytes → OKLCH L (node).
const okL = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const [R, G, B] = [f(r), f(g), f(b)];
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    const L = 0.2104542553 * l + 0.793617813 * m - 0.0040720468 * s, a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return { L: +L.toFixed(4), C: +Math.hypot(a, bb).toFixed(4) }; };

async function populatedCell(b, theme) {
    const { ctx, p, errors } = await open(b, { theme, color: PICK[theme] });
    try {
        await feed(p, await makePng(p, 1600, 1000));
        await waitRail(p);
        await p.mouse.move(5, 895);
        await p.waitForTimeout(600);
        const geo = await p.evaluate((RES) => {
            const res = eval(RES);
            const rail = document.querySelector('[data-o18="extract-k-rail"]');
            const cs = getComputedStyle(rail);
            const sh = cs.boxShadow;
            const shColor = sh.match(/(rgba?\([^)]*\)|oklch\([^)]*\)|color\([^)]*\)|lab\([^)]*\))/)?.[0];
            const kRoot = rail.parentElement.querySelector(".glass-slider") ?? rail.parentElement.querySelector('[data-slot="slider"]') ?? rail.nextElementSibling;
            const track = kRoot?.querySelector('[class*="track"]');
            const thumbs = [...document.querySelectorAll('[role="slider"]')].filter((t) => /Number of colors|Chroma weight/.test(t.getAttribute("aria-label") ?? ""));
            const readouts = [...document.querySelectorAll('[data-o18="extract-k"] span.text-mono-small, [data-o18="extract-kc"] span.text-mono-small')];
            const font = readouts.map((r) => { const s = document.createElement("span"); const rc = getComputedStyle(r); s.style.cssText = `font:${rc.font};position:absolute;white-space:pre;visibility:hidden;font-variant-numeric:tabular-nums`; s.textContent = "0000000000"; document.body.append(s); const w = s.getBoundingClientRect().width; s.remove();
                return { text: r.textContent, family: rc.fontFamily, size: rc.fontSize, color: rc.color, advanceEm: +(w / 10 / parseFloat(rc.fontSize)).toFixed(4), box: r.getBoundingClientRect().width, scroll: r.scrollWidth, fontReady: document.fonts.check(`${rc.fontSize} "Fira Code"`) }; });
            return {
                railStyle: rail.getAttribute("style"), railRect: rail.getBoundingClientRect().toJSON(), bg: cs.backgroundColor, boxShadow: sh, ringBytes: shColor ? res(shColor) : null, bgBytes: res(cs.backgroundColor),
                trackCls: track?.className?.slice?.(0, 100), trackBg: track && getComputedStyle(track).backgroundColor, trackBgImage: track && getComputedStyle(track).backgroundImage.slice(0, 60), trackTransition: track && getComputedStyle(track).transition,
                thumbs: thumbs.map((t) => ({ label: t.getAttribute("aria-label"), rect: t.getBoundingClientRect().toJSON(), root: (t.closest(".glass-slider") ?? t.closest('[data-orientation]'))?.getBoundingClientRect().toJSON(), thumbSizeVar: getComputedStyle(t).getPropertyValue("--slider-thumb-size") || null, rootThumbVar: getComputedStyle(t.parentElement).getPropertyValue("--slider-thumb-size") || null })),
                focusRingColor: getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-color"), focusRingBytes: res(getComputedStyle(document.documentElement).getPropertyValue("--focus-ring-color").trim() || "transparent"),
                font,
            };
        }, RESOLVE);
        const R = geo.railRect;
        const shot = await p.screenshot();
        // XC-1: 401-column sweep along the rail's centre row (the ramp) vs the inset ring; plus the painted top-edge row.
        const cols = Array.from({ length: 401 }, (_, i) => R.x + 3 + ((R.width - 6) * i) / 400);
        const ramp = await pixels(p, shot, cols.map((x) => [x, R.y + R.height / 2]));
        const edge = await pixels(p, shot, cols.map((x) => [x, R.y + 0.5]));
        const sweep = ramp.map((px) => ratio(px, geo.ringBytes));
        // D-2 / cross-axis: ground under the rail — hide rail + its slider, re-shoot, sample.
        await p.evaluate(() => { const rail = document.querySelector('[data-o18="extract-k-rail"]'); rail.parentElement.style.visibility = "hidden"; });
        await p.waitForTimeout(150);
        const shot2 = await p.screenshot();
        const ground = await pixels(p, shot2, [0.1, 0.3, 0.5, 0.7, 0.9].map((f) => [R.x + R.width * f, R.y + R.height / 2]));
        await p.evaluate(() => { const rail = document.querySelector('[data-o18="extract-k-rail"]'); rail.parentElement.style.visibility = ""; });
        const g = ground[2];
        const walked = !/0\.86 0\.12 85|0\.34 0\.12 260/.test(geo.railStyle);
        const referent = solveReferent(geo.ringBytes, 3.75, theme === "light");
        // D4-1: keyboard focus each thumb; sample the painted ring pixels around it and the adjacent surface.
        const focus = [];
        for (const t of geo.thumbs) {
            await p.evaluate((label) => { const btn = [...document.querySelectorAll("button")].find((x) => /Reset/.test(x.textContent)); btn?.focus(); }, t.label);
            await p.keyboard.press("Tab");
            if (t.label === "Chroma weight") await p.keyboard.press("Tab");
            await p.waitForTimeout(300);
            const st = await p.evaluate(() => { const a = document.activeElement; const cs = getComputedStyle(a); return { label: a.getAttribute("aria-label"), fv: a.matches(":focus-visible"), outline: cs.outline, outlineOffset: cs.outlineOffset, boxShadow: cs.boxShadow.slice(0, 200), rect: a.getBoundingClientRect().toJSON() }; });
            const s3 = await p.screenshot();
            const r = st.rect;
            const pts = [[r.x - 3, r.y + r.height / 2], [r.x + r.width + 3, r.y + r.height / 2], [r.x + r.width / 2, r.y - 3], [r.x + r.width / 2, r.y + r.height + 3]];
            const ringPx = await pixels(p, s3, pts);
            const adj = await pixels(p, s3, [[r.x - 12, r.y + r.height / 2], [r.x + r.width + 12, r.y + r.height / 2]]);
            focus.push({ ...st, ringPx, adjacentPx: adj, ringTokenVsAdjacent: adj.map((a) => ratio(geo.focusRingBytes, a)), paintedVsAdjacent: ringPx.slice(0, 2).map((px, i) => ratio(px, adj[i])), ringTokenVsGround: ratio(geo.focusRingBytes, g) });
        }
        const out = { theme, pick: PICK[theme], geo, walked, ringVsGround: ground.map((px) => ratio(geo.ringBytes, px)), ground, groundOk: okL(g), inkOk: okL(geo.ringBytes), modelledReferent: referent ? { L: referent.L, bytes: referent.g, ratioAtRef: referent.r } : null,
            sweep: { min: Math.min(...sweep), max: Math.max(...sweep), first: sweep[0], last: sweep[400] }, edgeSample: edge.filter((_, i) => i % 50 === 0), rampSample: ramp.filter((_, i) => i % 50 === 0), focus, errors };
        save(`controls-${theme}.json`, out);
        await p.screenshot({ path: `${EVID}/controls-${theme}.png`, clip: { x: R.x - 20, y: R.y - 60, width: R.width + 40, height: 160 } }).catch(() => {});
        return out;
    } finally { await ctx.close(); }
}

async function parkCell(b) {
    const { ctx, p, errors } = await open(b, { theme: "light", color: "oklch(0.7 0.15 40)" });
    try {
        await feed(p, await makePng(p, 1600, 1000));
        await waitRail(p);
        await p.evaluate(() => {
            const rail = document.querySelector('[data-o18="extract-k-rail"]');
            window.__park = { rail, muts: 0, chars: 0 };
            new MutationObserver((ms) => { for (const m of ms) if (m.attributeName === "style") { window.__park.muts++; window.__park.chars += (m.target.getAttribute("style") || "").length; } }).observe(rail, { attributes: true });
        });
        await p.evaluate(() => { location.hash = "#/"; });
        await p.waitForTimeout(2500);
        const cv = await p.evaluate(() => { const c = [...document.querySelectorAll("canvas")].map((x) => ({ r: x.getBoundingClientRect().toJSON() })).sort((a, b) => b.r.width * b.r.height - a.r.width * a.r.height)[0]; return { c, connected: window.__park.rail.isConnected, panes: [...document.querySelectorAll("[data-pane]")].map((e) => e.getAttribute("data-pane")) }; });
        const r = cv.c.r;
        await p.evaluate(() => { window.__park.muts = 0; window.__park.chars = 0; });
        const t0 = Date.now();
        await p.mouse.move(r.x + r.width * 0.2, r.y + r.height * 0.5);
        await p.mouse.down();
        for (let i = 0; i < 120; i++) { await p.mouse.move(r.x + r.width * (0.2 + 0.6 * (i % 60) / 60), r.y + r.height * (0.3 + 0.4 * ((i * 7) % 60) / 60)); await p.waitForTimeout(16); }
        await p.mouse.up();
        const dt = (Date.now() - t0) / 1000;
        const st = await p.evaluate(() => ({ muts: window.__park.muts, chars: window.__park.chars, connected: window.__park.rail.isConnected, inputColor: JSON.parse(localStorage.getItem("color-picker") || "{}").inputColor }));
        const out = { cv, dragSeconds: dt, ...st, mutsPerSec: +(st.muts / dt).toFixed(2), charsPerSec: +(st.chars / dt).toFixed(0), errors };
        save("controls-park.json", out);
        return out;
    } finally { await ctx.close(); }
}

async function twinCell(b) {
    const { ctx, p, errors } = await open(b, { theme: "light", color: "oklch(0.7 0.15 40)" });
    try {
        const ex = await p.evaluate(() => { const s = document.querySelector("[data-extract-k-readout]"); return { color: getComputedStyle(s).color, cls: s.className }; });
        await p.evaluate(() => { location.hash = "#/generate"; });
        await p.waitForTimeout(3000);
        const gen = await p.evaluate(() => {
            const labels = [...document.querySelectorAll("label")].filter((l) => l.textContent.trim() === "Colors");
            return labels.map((l) => { const row = l.parentElement; const s = row.querySelector("span"); return s ? { inExtract: !!l.closest('[data-o18^="extract"]'), text: s.textContent, color: getComputedStyle(s).color, cls: s.className, o18: !!row.closest("[data-o18]") } : null; });
        });
        const o18 = await p.evaluate(() => [...document.querySelectorAll("[data-o18]")].map((e) => e.getAttribute("data-o18")));
        const out = { extractReadout: ex, generateCountReadouts: gen, o18OnGenerate: o18, errors };
        save("controls-twin.json", out);
        return out;
    } finally { await ctx.close(); }
}


// Follow-up cells: (a) rail ring vs painted ground across further picks; (b) the K thumb's focus ring sampled
// pixel-by-pixel across its edge (0..8px outside), and the rail's own transition.
async function picksCell(b, theme, pick) {
    const { ctx, p, errors } = await open(b, { theme, color: pick });
    try {
        await feed(p, await makePng(p, 1600, 1000));
        await waitRail(p);
        await p.mouse.move(5, 895); await p.waitForTimeout(500);
        const g = await p.evaluate((RES) => { const rail = document.querySelector('[data-o18="extract-k-rail"]'); const cs = getComputedStyle(rail); return { style: rail.getAttribute("style").slice(0, 60), ring: eval(RES)(cs.backgroundColor), railTransition: cs.transition, rect: rail.getBoundingClientRect().toJSON() }; }, RESOLVE);
        const R = g.rect;
        await p.evaluate(() => { document.querySelector('[data-o18="extract-k-rail"]').parentElement.style.visibility = "hidden"; });
        await p.waitForTimeout(120);
        const ground = await pixels(p, await p.screenshot(), [0.1, 0.5, 0.9].map((f) => [R.x + R.width * f, R.y + R.height / 2]));
        await p.evaluate(() => { document.querySelector('[data-o18="extract-k-rail"]').parentElement.style.visibility = ""; });
        // focus ring across the thumb edge
        await p.evaluate(() => [...document.querySelectorAll("button")].find((x) => /Reset/.test(x.textContent))?.focus());
        await p.keyboard.press("Tab"); await p.waitForTimeout(300);
        const t = await p.evaluate(() => { const a = document.activeElement; return { label: a.getAttribute("aria-label"), fv: a.matches(":focus-visible"), rect: a.getBoundingClientRect().toJSON(), bs: getComputedStyle(a).boxShadow }; });
        const s1 = await p.screenshot();
        await p.evaluate(() => document.activeElement.blur()); await p.waitForTimeout(300);
        const s0 = await p.screenshot();
        const r = t.rect; const y = r.y + r.height / 2;
        const xs = [0, 1, 2, 3, 4, 6, 8].map((d) => [r.x - 0.5 - d, y]);
        const focused = await pixels(p, s1, xs), blurred = await pixels(p, s0, xs);
        const far = focused.at(-1);
        const ringVsAdj = focused.map((px) => ratio(px, far)), changed = focused.map((px, i) => ratio(px, blurred[i]));
        const out = { theme, pick, ...g, ringVsGround: ground.map((px) => ratio(g.ring, px)), inkOk: okL(g.ring), focus: { ...t, offsets: [0, 1, 2, 3, 4, 6, 8], focused, blurred, ringVsAdj, focusedVsBlurred: changed, maxRingVsAdj: Math.max(...ringVsAdj) }, errors };
        return out;
    } finally { await ctx.close(); }
}

const b = await launch();
try {
    const res = {};
    if (want("light")) res.light = await populatedCell(b, "light");
    if (want("dark")) res.dark = await populatedCell(b, "dark");
    if (want("park")) res.park = await parkCell(b);
    if (want("twin")) res.twin = await twinCell(b);
    if (which.includes("picks")) { res.picks = []; for (const theme of ["light", "dark"]) for (const pick of [null, "oklch(0.78 0.147 85)", "oklch(0.55 0.2 145)"]) res.picks.push(await picksCell(b, theme, pick)); save("controls-picks.json", res.picks);
        res.picks = res.picks.map((v) => ({ theme: v.theme, pick: v.pick, style: v.style, ink: v.inkOk, ringVsGround: v.ringVsGround, railTransition: v.railTransition, focus: { fv: v.focus.fv, bs: v.focus.bs.slice(0, 160), ringVsAdj: v.focus.ringVsAdj, focusedVsBlurred: v.focus.focusedVsBlurred } })); }
    for (const [k, v] of Object.entries(res)) {
        const brief = k === "light" || k === "dark" ? { walked: v.walked, rail: v.railStyle ?? v.geo.railStyle, ringVsGround: v.ringVsGround, ground: v.groundOk, ink: v.inkOk, ref: v.modelledReferent, sweep: v.sweep, focus: v.focus.map((f) => ({ l: f.label, fv: f.fv, outline: f.outline, bs: f.boxShadow.slice(0, 90), tokVsAdj: f.ringTokenVsAdjacent, paintVsAdj: f.paintedVsAdjacent, tokVsGround: f.ringTokenVsGround })), font: v.geo.font, thumbs: v.geo.thumbs.map((t) => ({ l: t.label, w: t.rect.width, h: t.rect.height, var: t.thumbSizeVar, rootVar: t.rootThumbVar, root: t.root && [t.root.width, t.root.height] })), track: [v.geo.trackCls, v.geo.trackBg, v.geo.trackBgImage, v.geo.trackTransition], focusRing: v.geo.focusRingColor, errors: v.errors } : v;
        console.log(k, JSON.stringify(brief));
    }
} finally { await b.close(); }
